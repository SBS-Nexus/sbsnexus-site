import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  workers: 1,
  timeout: 30_000,
  use: { baseURL: "http://127.0.0.1:3230", headless: true },
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3230",
    url: "http://127.0.0.1:3230",
    reuseExistingServer: false,
  },
});
