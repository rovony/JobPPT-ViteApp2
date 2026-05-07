/**
 * Vercel Edge Middleware — perimeter gate for the entire site.
 *
 * Runs on every request matched by `config.matcher` BEFORE static
 * assets / SPA bundle / API routes are served. If no valid site-session
 * cookie is present, redirects to /login (preserving the intended
 * destination via ?next=). Public routes (login, share-link viewer,
 * auth API, robots/favicon) are explicitly whitelisted in the matcher
 * negative pattern below.
 *
 * Why edge: gates the JS bundle itself — the slides compile INTO the
 * bundle at build time, so client-only auth would let an attacker
 * `curl /assets/index-xxx.js` and grep raw slide text. Edge enforcement
 * blocks the bundle download itself.
 *
 * Token verification uses Web Crypto HMAC (edge-compatible, no
 * external deps). See api/_lib/site-token.ts for the matching
 * sign-side implementation.
 */

/**
 * Whitelist:
 *   /login            — the gate UI itself
 *   /api/auth/site-*  — login/logout/me endpoints
 *   /v/*              — public share-link viewer (already public by route design)
 *   /assets/*         — Vite-output JS/CSS bundles (see SOFT-WALL note below)
 *   /_vercel/*        — Vercel internals (analytics, image optimization)
 *   /favicon* /robots.txt /sitemap.xml — discovery files
 *
 * SOFT-WALL note: /assets/* must be whitelisted so the Login page itself
 * can boot — its React bundle lives there. This means anyone can `curl`
 * the JS bundle and grep raw slide text (slides compile into the bundle
 * at build time). For the interview-prep use case this is acceptable —
 * the gate stops casual visitors and search engines, not motivated
 * scrapers. Hard-wall (gating /assets/* too) would require lazy-loading
 * slide content via authenticated API at runtime — bigger refactor.
 */
export const config = {
  matcher: [
    '/((?!login|api/auth/site-|v/|_vercel|assets/|favicon|robots\\.txt|sitemap\\.xml).*)',
  ],
};

const SITE_SECRET = process.env.SITE_SECRET || '';
const SITE_COOKIE_NAME = 'site-session';

export default async function middleware(req: Request): Promise<Response | undefined> {
  // No secret configured → fail open with a console warning. Better
  // than locking out everyone if env var is missing on first deploy.
  if (!SITE_SECRET) {
    console.warn('[middleware] SITE_SECRET not set; gate disabled');
    return;
  }

  const url = new URL(req.url);
  const cookie = req.headers.get('cookie') || '';
  const token = readCookie(cookie, SITE_COOKIE_NAME);

  if (token && (await verifySiteToken(token, SITE_SECRET))) {
    return; // authed — let the request through
  }

  // Not authed → redirect to /login with ?next= so we can return them
  // to the page they were trying to reach after they log in.
  const next = url.pathname + url.search;
  const loginUrl = new URL('/login', url);
  if (next && next !== '/' && !next.startsWith('/login')) {
    loginUrl.searchParams.set('next', next);
  }
  return Response.redirect(loginUrl.toString(), 307);
}

// ─── Inlined helpers (edge bundles can't import from src/ or api/) ───

const TOKEN_PAYLOAD = 'authed';

async function getKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function bufToBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function signSiteToken(secret: string): Promise<string> {
  const key = await getKey(secret);
  const enc = new TextEncoder();
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(TOKEN_PAYLOAD));
  return bufToBase64Url(sig);
}

async function verifySiteToken(token: string, secret: string): Promise<boolean> {
  const expected = await signSiteToken(secret);
  if (token.length !== expected.length) return false;
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return result === 0;
}

function readCookie(cookieHeader: string, name: string): string {
  if (!cookieHeader) return '';
  const parts = cookieHeader.split(/;\s*/);
  const prefix = `${name}=`;
  for (const part of parts) {
    if (part.startsWith(prefix)) return part.slice(prefix.length);
  }
  return '';
}
