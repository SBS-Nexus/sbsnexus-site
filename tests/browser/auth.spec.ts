import { expect, test, type BrowserContext, type Page } from "@playwright/test";

const profile = { id: "17", name: "Synthetic Reviewer", email: "review@example.invalid", company: "Synthetic", tenant_id: "tenant-test", role: "user" };
const api = "https://app.sbsdeutschland.com/api/erechnung";

async function seed(context: BrowserContext, refresh = true) {
  await context.addInitScript(({ user, refresh }) => {
    localStorage.setItem("sbs_user", JSON.stringify(user));
    localStorage.setItem("sbs_token", "synthetic-expired-access");
    if (refresh) localStorage.setItem("sbs_refresh", "synthetic-refresh");
  }, { user: profile, refresh });
}

async function validProfile(page: Page) {
  await page.route(`${api}/users/profile`, route => route.fulfill({ json: profile }));
}

test.beforeEach(async ({ context }) => {
  // No backend, provider or email request may leave this isolated browser suite.
  await context.route("**/*", route => {
    const url = new URL(route.request().url());
    return url.origin === "http://127.0.0.1:3230" ? route.continue() : route.abort();
  });
});

test("anonymous dashboard redirects to login", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
});

test("valid profile opens the dashboard", async ({ context, page }) => {
  await seed(context);
  await validProfile(page);
  await page.goto("/dashboard");
  await expect(page.getByText(profile.name, { exact: true })).toBeVisible();
});

test("expired access refreshes and revalidates the profile", async ({ context, page }) => {
  await seed(context);
  let validatedRenewedToken = false;
  await page.route(`${api}/users/profile`, route => {
    if (route.request().headers().authorization === "Bearer synthetic-renewed-access") {
      validatedRenewedToken = true;
      return route.fulfill({ json: profile });
    }
    return route.fulfill({ status: 401, json: {} });
  });
  await page.route(`${api}/auth/refresh`, route => {
    expect(route.request().postDataJSON()).toEqual({ refresh_token: "synthetic-refresh" });
    return route.fulfill({ json: { access_token: "synthetic-renewed-access", refresh_token: "synthetic-renewed-refresh" } });
  });
  await page.goto("/dashboard");
  await expect(page.getByText(profile.name, { exact: true })).toBeVisible();
  expect(validatedRenewedToken).toBe(true);
  expect(await page.evaluate(() => localStorage.getItem("sbs_token"))).toBe("synthetic-renewed-access");
});

for (const failure of ["missing", "rejected", "network"] as const) {
  test(`rejected access with ${failure} refresh redirects to login`, async ({ context, page }) => {
    await seed(context, failure !== "missing");
    await page.route(`${api}/users/profile`, route => route.fulfill({ status: 401, json: {} }));
    await page.route(`${api}/auth/refresh`, route => failure === "network" ? route.abort() : route.fulfill({ status: 401, json: {} }));
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
    expect(await page.evaluate(() => localStorage.getItem("sbs_token"))).toBeNull();
  });
}

test("a forged cached admin profile without a token redirects", async ({ context, page }) => {
  await context.addInitScript(() => localStorage.setItem("sbs_user", JSON.stringify({ name: "Forged", is_admin: true })));
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login$/);
});

test("a regular session never requests admin data", async ({ context, page }) => {
  await seed(context);
  await validProfile(page);
  const adminRequests: string[] = [];
  await page.route("https://app.sbsdeutschland.com/api/nexus/admin/**", route => {
    adminRequests.push(route.request().url());
    return route.fulfill({ status: 403, json: {} });
  });
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByText(profile.name, { exact: true })).toBeVisible();
  expect(adminRequests).toEqual([]);
});

test("maintenance uses the signed-in user token", async ({ context, page }) => {
  await seed(context);
  const authorizations: string[] = [];
  await page.route("https://app.sbsdeutschland.com/api/nexus/maintenance/**", route => {
    authorizations.push(route.request().headers().authorization);
    return route.fulfill({ json: route.request().url().endsWith("/stats") ? { total_requests: 0, this_month: 0, by_status: {}, by_urgency: {} } : { requests: [] } });
  });
  await page.goto("/maintenance");
  await expect(page.getByText("Gesamt Alerts", { exact: true })).toBeVisible();
  expect(authorizations).toHaveLength(2);
  expect(authorizations.every(value => value === "Bearer synthetic-expired-access")).toBe(true);
});

test("public pages render without runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const path of ["/", "/login", "/register", "/datenschutz", "/impressum", "/about", "/partner", "/verify-email"]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("body")).not.toHaveText("");
  }
  await expect(page.getByText("Ungültiger Link", { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("invoice loading uses the current session tenant without repeated fetches", async ({ context, page }) => {
  await seed(context);
  await validProfile(page);
  const tenants: string[] = [];
  await page.route(`${api}/invoices?**`, route => {
    tenants.push(route.request().headers()["x-tenant-id"]);
    return route.fulfill({ json: { items: [] } });
  });
  await page.goto("/dashboard/rechnungen");
  await expect(page.getByText(profile.name, { exact: true })).toBeVisible();
  await expect.poll(() => tenants.length).toBe(1);
  expect(tenants).toEqual(["tenant-17"]);
});

test("copilot sends the current tenant and renders the simulated reply", async ({ context, page }) => {
  await seed(context);
  await validProfile(page);
  await page.route(`${api}/copilot/chat`, route => {
    expect(route.request().headers()["x-tenant-id"]).toBe("tenant-17");
    expect(route.request().postDataJSON().question).toBe("Synthetic question");
    return route.fulfill({ json: { answer: "Synthetic reply", model: "mock", suggested_questions: [] } });
  });
  await page.goto("/dashboard/copilot");
  await page.getByPlaceholder("Frage zu Rechnungen, Kontierungen, DATEV...").fill("Synthetic question");
  await page.getByRole("button", { name: "Senden", exact: true }).click();
  await expect(page.getByText("Synthetic reply", { exact: true })).toBeVisible();
});

test("analytics starts with the session tenant instead of a demo fallback", async ({ context, page }) => {
  await seed(context);
  await validProfile(page);
  const tenants: string[] = [];
  await page.route(`${api}/analytics/dashboard?**`, route => {
    tenants.push(route.request().headers()["x-tenant-id"]);
    return route.fulfill({ json: {
      kpis: { total_invoices: 0, period_invoices: 0, pending_review: 0, approved: 0, exported: 0, completion_rate: 0 },
      status_distribution: [], timeline: [], recent_activity: [], processing_speed: { formatted: "0s" },
      kontierung_performance: { total: 0, avg_confidence: 0, confidence_distribution: { high: 0, medium: 0, low: 0 }, models: {}, top_konten: [] },
    } });
  });
  await page.goto("/dashboard/analytics");
  await expect(page.getByRole("heading", { name: "Analytics", exact: true })).toBeVisible();
  expect(tenants).toEqual(["tenant-17"]);
});
