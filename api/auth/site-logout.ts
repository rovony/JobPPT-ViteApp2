import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SITE_COOKIE_NAME } from '../_lib/site-token.js';

/**
 * Clears the site-session cookie. POST. No body required.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

  res.setHeader(
    'Set-Cookie',
    [
      `${SITE_COOKIE_NAME}=`,
      'Max-Age=0',
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
