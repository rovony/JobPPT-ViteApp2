import type { VercelRequest, VercelResponse } from '@vercel/node';
import { signSiteToken, SITE_COOKIE_NAME } from '../_lib/site-token.js';

const SITE_PASSWORD = process.env.SITE_PASSWORD;
const SITE_SECRET = process.env.SITE_SECRET;
const COOKIE_NAME = SITE_COOKIE_NAME;
const COOKIE_MAX_AGE_DAYS = 30;

/**
 * Shared-password gate. POST { password } — if matches SITE_PASSWORD,
 * sets HTTPOnly signed cookie 'site-session'. Pure HMAC-SHA256 over
 * SITE_SECRET; no JWT, no DB, no per-user state.
 *
 * Required env vars (set in Vercel project settings, NOT committed):
 *   SITE_PASSWORD — what the visitor types
 *   SITE_SECRET   — server signing key (any random 32+ char string)
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!SITE_PASSWORD || !SITE_SECRET) {
    return res.status(500).json({ error: 'Auth not configured (missing env vars)' });
  }

  const { password } = (req.body ?? {}) as { password?: string };
  if (typeof password !== 'string' || password.length === 0) {
    return res.status(400).json({ error: 'Password required' });
  }

  // Constant-time compare against env var
  if (!constantTimeEqual(password, SITE_PASSWORD)) {
    // Tiny delay to discourage credential stuffing
    await new Promise((r) => setTimeout(r, 250));
    return res.status(401).json({ error: 'Incorrect password' });
  }

  const token = await signSiteToken(SITE_SECRET);
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

  res.setHeader(
    'Set-Cookie',
    [
      `${COOKIE_NAME}=${token}`,
      `Max-Age=${maxAge}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      isProd ? 'Secure' : '',
    ]
      .filter(Boolean)
      .join('; ')
  );

  return res.status(200).json({ ok: true });
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}
