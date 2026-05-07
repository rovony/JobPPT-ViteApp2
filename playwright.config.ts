import { config as dotenvConfig } from 'dotenv';
// `.env.local` is the source of truth for test creds. The Vercel-stored
// SITE_PASSWORD has been kept in sync with .env.local so tests against
// preview / production URLs use matching credentials. (Earlier we tried
// `vercel env pull --environment=preview .env.preview` but Sensitive-
// marked vars come back empty, which blocked dotenv from loading the
// real values from .env.local — dotenv's default is "don't override".)
dotenvConfig({ path: '.env.local' });

import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the v5-ultragenyx auth gate.
 *
 * Two run modes:
 *   1. **Preview-URL mode (recommended):** set
 *      `PLAYWRIGHT_BASE_URL=https://<preview>.vercel.app` and the
 *      webServer block is skipped — tests run against a real Vercel
 *      preview that exercises edge middleware + serverless functions
 *      end-to-end.
 *   2. **Local mode:** webServer auto-spins `vercel dev`. Note this
 *      requires the cloud Vercel project to NOT have a stale
 *      `devCommand` set — otherwise vercel dev shells out to plain
 *      Vite and middleware never fires. Preview-URL mode sidesteps
 *      this entirely.
 *
 * Env vars (loaded automatically from .env.local via dotenv):
 *   SITE_PASSWORD — what tests POST to /api/auth/site-login
 *   SITE_SECRET   — server signing key (only used by webServer mode)
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
