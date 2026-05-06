import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the v5-ultragenyx auth gate. Spins up the
 * Vercel dev server (which runs Vite + serverless functions + edge
 * middleware) so tests exercise the FULL stack, not just the SPA.
 *
 * Required env vars (loaded from .env.local for local runs):
 *   SITE_PASSWORD — what tests POST to /api/auth/site-login
 *   SITE_SECRET   — server signing key
 *
 * The dev server is reused across runs to keep tests fast.
 */
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5176',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        // Use `vercel dev` so middleware + serverless functions run.
        // Falls back to `npm run dev` if vercel CLI not available, but
        // auth tests will fail without the API + middleware.
        command: 'npx vercel dev --listen 5176 --yes',
        url: 'http://localhost:5176/login',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        env: {
          // Test-only credentials. The real production values live in
          // Vercel project settings, not in this repo.
          SITE_PASSWORD: process.env.SITE_PASSWORD || 'test-password-do-not-deploy',
          SITE_SECRET: process.env.SITE_SECRET || 'test-secret-min-32-chars-XXXXXXXX',
        },
      },
});
