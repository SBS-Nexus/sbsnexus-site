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
