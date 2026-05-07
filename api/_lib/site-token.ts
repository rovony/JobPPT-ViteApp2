/**
 * Site-session token — HMAC-SHA256 of a fixed payload, signed with
 * SITE_SECRET. Verifiable in Node (api/*) AND Edge (middleware.ts)
 * runtimes via the Web Crypto API. No JWT lib, no DB, no expiry baked
 * in (cookie Max-Age handles expiry at the transport layer).
 *
 * Imported by both api/auth/* (Node runtime) and middleware.ts (Edge).
 * Keep this file dependency-free.
 */

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
  // base64url: '+' → '-', '/' → '_', strip padding
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function signSiteToken(secret: string): Promise<string> {
  const key = await getKey(secret);
  const enc = new TextEncoder();
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(TOKEN_PAYLOAD));
  return bufToBase64Url(sig);
}

/**
 * Constant-time verify. Returns true iff `token` matches a fresh sign
 * with the same secret.
 */
export async function verifySiteToken(token: string, secret: string): Promise<boolean> {
  if (typeof token !== 'string' || token.length === 0) return false;
  const expected = await signSiteToken(secret);
  if (token.length !== expected.length) return false;
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return result === 0;
}

/** Read cookie value from a 'Cookie' header string. Returns empty string if missing. */
export function readCookie(cookieHeader: string | null | undefined, name: string): string {
  if (!cookieHeader) return '';
  const parts = cookieHeader.split(/;\s*/);
  const prefix = `${name}=`;
  for (const part of parts) {
    if (part.startsWith(prefix)) return part.slice(prefix.length);
  }
  return '';
}

export const SITE_COOKIE_NAME = 'site-session';
