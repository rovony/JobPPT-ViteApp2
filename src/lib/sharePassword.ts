/**
 * Client-side password hash for share links.
 * For production cross-device shares, move verification server-side; this
 * matches common “link + password” UX when only static hosting is available.
 */
const enc = new TextEncoder();

function bytesToB64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function randomSalt() {
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  return bytesToB64(a.buffer);
}

/** @param {string} password */
export async function hashPassword(password) {
  const salt = randomSalt();
  const digest = await crypto.subtle.digest('SHA-256', enc.encode(salt + ':' + password));
  return { salt, hash: bytesToB64(digest) };
}

/** @param {string} password @param {{ salt: string, hash: string }} stored */
export async function verifyPassword(password, stored) {
  if (!stored?.salt || !stored?.hash) return false;
  const digest = await crypto.subtle.digest('SHA-256', enc.encode(stored.salt + ':' + password));
  return bytesToB64(digest) === stored.hash;
}

export function makeShareToken() {
  const a = new Uint8Array(20);
  crypto.getRandomValues(a);
  return btoa(String.fromCharCode(...a)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Encode share params into a self-contained URL-safe token so the link
 * works in any browser without localStorage lookup.
 */
export function encodeSharePayload({ deckId, permission = 'view', allowDownload = false }) {
  const json = JSON.stringify({ d: deckId, p: permission, dl: allowDownload ? 1 : 0 });
  return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeSharePayload(token) {
  try {
    let b64 = token.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const json = atob(b64);
    const obj = JSON.parse(json);
    if (!obj?.d) return null;
    return {
      deckId: obj.d,
      permission: obj.p === 'comment' ? 'comment' : 'view',
      allowDownload: !!obj.dl,
    };
  } catch {
    return null;
  }
}
