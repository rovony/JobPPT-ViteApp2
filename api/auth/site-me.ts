import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifySiteToken, readCookie, SITE_COOKIE_NAME } from '../_lib/site-token.js';

const SITE_SECRET = process.env.SITE_SECRET;

/**
 * Returns 200 { authed: true } when site-session cookie is valid,
 * else 401 { authed: false }. AuthContext polls this on app boot
 * to decide whether to render protected routes.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!SITE_SECRET) {
    return res.status(500).json({ authed: false, error: 'Auth not configured' });
  }

  const token = readCookie(req.headers.cookie, SITE_COOKIE_NAME);
  if (!token) return res.status(401).json({ authed: false });

  const ok = await verifySiteToken(token, SITE_SECRET);
  if (!ok) return res.status(401).json({ authed: false });

  return res.status(200).json({ authed: true });
}
