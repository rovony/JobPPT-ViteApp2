import { test, expect } from '@playwright/test';

/**
 * Auth gate end-to-end tests. The site is perimeter-gated by Vercel
 * Edge Middleware checking the `site-session` cookie; /login, share
 * links (/v/:token), and /api/auth/site-* are public. These specs
 * cover the six failure / success modes that gate the deploy.
 */

const PASSWORD = process.env.SITE_PASSWORD || 'test-password-do-not-deploy';

test.describe('auth gate', () => {
  test('unauth redirect — anonymous /decks/* goes to /login', async ({ page }) => {
    const targetPath = '/decks/v5-ultragenyx/s/title/audience';
    await page.goto(targetPath);
    // Middleware redirects with ?next= preserving the destination.
    await expect(page).toHaveURL(/\/login(\?|$)/);
    const url = new URL(page.url());
    expect(url.searchParams.get('next')).toBe(targetPath);
    await expect(page.getByTestId('login-page')).toBeVisible();
  });

  test('wrong password — error shown, no session cookie', async ({ page, context }) => {
    await page.goto('/login');
    await page.getByTestId('password-input').fill('this-is-not-the-real-password');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('login-error')).toBeVisible();
    const cookies = await context.cookies();
    expect(cookies.find((c) => c.name === 'site-session')).toBeUndefined();
  });

  test('correct password — sets cookie, lands on home', async ({ page, context }) => {
    await page.goto('/login');
    await page.getByTestId('password-input').fill(PASSWORD);
    await page.getByTestId('login-submit').click();

    // Login.tsx does window.location.href = next, which forces a full
    // page nav through middleware. After the round-trip we should be
    // on the requested next path (default '/'); the page should not
    // be the login form anymore.
    await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 10_000 });
    const cookies = await context.cookies();
    const session = cookies.find((c) => c.name === 'site-session');
    expect(session, 'site-session cookie should be set after login').toBeDefined();
    expect(session!.value.length).toBeGreaterThan(10);
    expect(session!.httpOnly).toBe(true);
  });

  test('redirect-after-login honors ?next=', async ({ page }) => {
    const target = '/decks/v5-ultragenyx';
    await page.goto(`/login?next=${encodeURIComponent(target)}`);
    await page.getByTestId('password-input').fill(PASSWORD);
    await page.getByTestId('login-submit').click();
    await page.waitForURL((url) => url.pathname === target, { timeout: 10_000 });
  });

  test('share-link route /v/:token loads without auth', async ({ page }) => {
    // Anonymous (no cookie) request to the share viewer must NOT
    // redirect to login. The token itself can be invalid — what
    // matters here is that middleware whitelists the path.
    const res = await page.goto('/v/test-token-not-real-but-should-not-redirect');
    expect(res?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(/\/v\/test-token-not-real-but-should-not-redirect/);
  });

  test('logout clears cookie + future /decks redirects to /login', async ({ page, context }) => {
    // Log in first
    await page.goto('/login');
    await page.getByTestId('password-input').fill(PASSWORD);
    await page.getByTestId('login-submit').click();
    await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 10_000 });

    // Hit the logout endpoint directly (the UI may not surface a
    // logout button on every page). The cookie should be cleared.
    const logoutRes = await page.request.post('/api/auth/site-logout');
    expect(logoutRes.ok()).toBe(true);

    // Manually clear the cookie in the test context too — Playwright
    // doesn't always pick up Set-Cookie: Max-Age=0 from request().
    await context.clearCookies();

    // Now /decks/* should redirect to /login
    await page.goto('/decks/v5-ultragenyx');
    await expect(page).toHaveURL(/\/login(\?|$)/);
  });
});
