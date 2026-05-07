# Site auth — setup + validation runbook

> **Branch:** `feat/site-auth-gate` (do NOT merge to `main` until Playwright suite is green against the preview URL).

## What this implements

A single shared-password gate over the entire site, enforced at the Vercel **edge** (not just client-side). Public routes:

- `/login` — the gate UI
- `/v/:token` and `/v/:token/s/:slideId` — share-link viewer (already public by design)
- `/api/auth/site-{login,logout,me}` — auth endpoints
- `/assets/*` — Vite output bundles (see soft-wall note below)

Everything else (`/`, `/decks/*`, `/Home`, `/dev`, …) requires a valid `site-session` cookie. Failed-auth requests are redirected to `/login?next=<original-path>`.

### Soft-wall vs hard-wall

Slides compile **into the JS bundle** at build time. To let `/login` boot, the middleware whitelists `/assets/*`. That means a determined attacker can `curl https://.../assets/index-XXX.js` and grep raw slide content. For interview-prep this is acceptable — the gate keeps casual visitors and search-engine crawlers out. Hard-wall (gating `/assets/*` too) would require lazy-loading slide content via authenticated API at runtime — a larger refactor we can do later if needed.

## Required Vercel env vars

Set these on **Production** AND **Preview** environments at https://vercel.com/dashboard → JobPPT-ViteApp2 → Settings → Environment Variables:

| Variable | Example | Notes |
| --- | --- | --- |
| `SITE_PASSWORD` | `pharma2026` | What viewers type at `/login`. Rotate by updating this var on Vercel; no code change needed. |
| `SITE_SECRET` | random 32+ char hex string | HMAC signing key for the session cookie. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Rotating invalidates all live sessions. |

After setting, redeploy. The first request will set/read the cookie; the env vars are read at function invocation time, not at build.

## Local development

```bash
cp .env.local.example .env.local
# edit .env.local — set SITE_PASSWORD + SITE_SECRET
npm run dev    # vite only — middleware does NOT run
```

`vite dev` does not execute Vercel middleware or the `/api/*` functions. To run the full stack locally (required for Playwright), install Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel link
vercel dev --listen 5176
```

## Run the test suite

After Vercel CLI is set up locally OR after the preview URL is live with env vars set:

```bash
# Local (requires vercel dev running):
npm run test:e2e

# Against a live URL (skips local server boot):
PLAYWRIGHT_BASE_URL=https://your-preview-url.vercel.app SITE_PASSWORD=<the-real-pwd> npm run test:e2e
```

## Six specs, what they cover

[`tests/e2e/auth.spec.ts`](../tests/e2e/auth.spec.ts):

1. **unauth-redirect** — anonymous → `/decks/v5-ultragenyx/s/title/audience` → `/login?next=…`
2. **wrong-password** — bad password POST → error visible, no `site-session` cookie set
3. **correct-password** — good password → cookie set, HTTPOnly, lands on `/`
4. **redirect-after-login** — `/login?next=/decks/X` → after login lands on `/decks/X`
5. **share-link-public** — anonymous → `/v/some-token` → no redirect (route whitelisted)
6. **logout-clears** — logout → cookie cleared → `/decks/*` redirects to `/login`

(I dropped a planned dual-screen spec — multi-window cookie-carry is browser default behavior; not meaningful to test as a spec without a real second display.)

## Promotion checklist

Don't merge `feat/site-auth-gate` → `main` until:

- [ ] `SITE_PASSWORD` + `SITE_SECRET` set on Vercel for **Production AND Preview**
- [ ] Preview deploy succeeds (no middleware compile errors)
- [ ] Playwright suite green against preview URL
- [ ] Manual smoke: `https://<preview>.vercel.app/decks/v5-ultragenyx/s/title/audience` redirects to `/login`
- [ ] Manual smoke: log in with the password → land on Home
- [ ] Manual smoke: share-link route still loads anonymously

After all green, merge → push `main` → Vercel auto-deploys to production.
