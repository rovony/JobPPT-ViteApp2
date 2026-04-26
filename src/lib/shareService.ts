// @ts-nocheck
/**
 * Deck share links — localStorage in standalone builds; can be swapped
 * for base44 `DeckShare` + `ShareComment` entities when a backend is active.
 */
import { hashPassword, makeShareToken, verifyPassword, encodeSharePayload, decodeSharePayload } from './sharePassword';
import { DECKS } from '@/decks/registry';

const STORAGE = 'merck_deck_shares_v1';
const SESS = (token) => `merck_deck_share_unlock_${token}`;

function load() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return { shares: {}, comments: {}, activity: {} };
    return JSON.parse(raw);
  } catch {
    return { shares: {}, comments: {}, activity: {} };
  }
}

function save(data) {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(data));
  } catch (e) {
    console.error('[shareService] persist failed', e);
  }
}

function withStore(fn) {
  const data = load();
  const out = fn(data);
  if (out !== false) save(data);
  return out;
}

/**
 * @typedef {'view' | 'comment'} SharePermission
 * @typedef {object} ShareRecord
 * @property {string} token
 * @property {string} deckId
 * @property {string} label
 * @property {SharePermission} permission
 * @property {null | { salt: string, hash: string }} password
 * @property {number | null} expiresAt — ms epoch, null = no expiry
 * @property {boolean} allowDownload
 * @property {number} createdAt
 * @property {boolean} revoked
 * @property {number} viewCount
 * @property {number | null} lastViewedAt
 */

/**
 * @param {object} opts
 * @param {string} opts.deckId
 * @param {string} [opts.label]
 * @param {SharePermission} [opts.permission]
 * @param {string} [opts.password] — if set, hashed before storage
 * @param {number | null} [opts.expiresAt] — Date.now() or null
 * @param {boolean} [opts.allowDownload]
 */
export async function createShare(opts) {
  const permission = opts.permission === 'comment' ? 'comment' : 'view';
  const allowDownload = !!opts.allowDownload;

  // Self-contained token: encodes deckId + permission + download flag
  // so the link works in any browser without localStorage.
  const token = encodeSharePayload({
    deckId: opts.deckId,
    permission,
    allowDownload,
  });

  let password = null;
  if (opts.password && String(opts.password).length > 0) {
    password = await hashPassword(String(opts.password));
  }
  /** @type {ShareRecord} */
  const rec = {
    token,
    deckId: opts.deckId,
    label: opts.label || 'Shared view',
    permission,
    password,
    expiresAt: opts.expiresAt == null ? null : Number(opts.expiresAt),
    allowDownload,
    createdAt: Date.now(),
    revoked: false,
    viewCount: 0,
    lastViewedAt: null,
  };
  withStore((data) => {
    data.shares = data.shares || {};
    data.shares[token] = rec;
    return true;
  });
  return rec;
}

export function getShare(token) {
  if (!token) return null;
  const data = load();
  const stored = data.shares?.[token];
  if (stored) return stored;

  // Token not in localStorage — try decoding it as a self-contained payload.
  const decoded = decodeSharePayload(token);
  if (decoded) {
    return _syntheticRec(token, decoded.deckId, decoded.permission, decoded.allowDownload);
  }

  // Legacy random token that can't be decoded — fall back to the deck
  // with the most slides so old share links still work. View-only access.
  const fallbackDeck = DECKS.reduce((best, d) =>
    d?.slides?.length > (best?.slides?.length ?? 0) ? d : best, null as any);
  if (fallbackDeck) {
    return _syntheticRec(token, fallbackDeck.id, 'view', false);
  }

  return null;
}

function _syntheticRec(token, deckId, permission = 'view', allowDownload = false) {
  return {
    token,
    deckId,
    label: 'Shared view',
    permission,
    password: null,
    expiresAt: null,
    allowDownload,
    createdAt: 0,
    revoked: false,
    viewCount: 0,
    lastViewedAt: null,
  };
}

export function listSharesForDeck(deckId) {
  const data = load();
  return Object.values(data.shares || {})
    .filter((s) => s.deckId === deckId && !s.revoked);
}

export function revokeShare(token) {
  withStore((data) => {
    if (!data.shares?.[token]) return false;
    data.shares[token].revoked = true;
    return true;
  });
}

export function isShareUnlockedInSession(token) {
  if (!token) return false;
  try {
    return sessionStorage.getItem(SESS(token)) === '1';
  } catch {
    return false;
  }
}

export function setShareUnlockedInSession(token) {
  try {
    sessionStorage.setItem(SESS(token), '1');
  } catch { /* no-op */ }
}

export function clearShareUnlock(token) {
  try {
    sessionStorage.removeItem(SESS(token));
  } catch { /* no-op */ }
}

/** @returns {boolean} */
export async function validateSharePassword(token, password) {
  const s = getShare(token);
  if (!s || !s.password) return !s?.password;
  const ok = await verifyPassword(String(password), s.password);
  if (ok) setShareUnlockedInSession(token);
  return ok;
}

export function isShareUsable(rec) {
  if (!rec || rec.revoked) return { ok: false, reason: 'revoked' };
  if (rec.expiresAt && Date.now() > rec.expiresAt) return { ok: false, reason: 'expired' };
  return { ok: true, reason: null };
}

/**
 * @param {string} token
 * @param {object} [meta]
 * @param {string} [meta.ua] — for activity (browser hint only)
 */
export function recordView(token, meta = {}) {
  withStore((data) => {
    const s = data.shares?.[token];
    if (!s) return false;
    s.viewCount = (s.viewCount || 0) + 1;
    s.lastViewedAt = Date.now();
    data.activity = data.activity || {};
    const log = (data.activity[token] = data.activity[token] || []);
    log.push({ t: Date.now(), type: 'view', ...meta });
    if (log.length > 200) data.activity[token] = log.slice(-200);
    return true;
  });
}

export function getActivity(token, limit = 50) {
  const data = load();
  return (data.activity?.[token] || []).slice(-limit);
}

/**
 * @param {string} token
 * @param {string} text
 * @param {string} [author] — display name, optional
 */
export function addComment(token, text, author = '') {
  if (!getShare(token)) return null;
  const id = `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const entry = { id, text: String(text).trim(), author: String(author || 'Viewer').trim(), t: Date.now() };
  if (!entry.text) return null;
  withStore((data) => {
    data.comments = data.comments || {};
    const arr = (data.comments[token] = data.comments[token] || []);
    arr.push(entry);
    if (arr.length > 500) data.comments[token] = arr.slice(-500);
    data.activity = data.activity || {};
    const log = (data.activity[token] = data.activity[token] || []);
    log.push({ t: entry.t, type: 'comment', author: entry.author, id });
    if (log.length > 200) data.activity[token] = log.slice(-200);
  });
  return entry;
}

export function listComments(token) {
  const data = load();
  return [...(data.comments?.[token] || [])].sort((a, b) => a.t - b.t);
}

export function exportShareState() {
  return load();
}

/** Triggers a browser download of the full local share store (backup / migration). */
export function downloadShareBackupFile() {
  const blob = new Blob([JSON.stringify(load(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `deck-shares-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/** @param {object} data — from exportShareState / file import */
export function importShareState(data) {
  if (!data || typeof data !== 'object') return;
  withStore((cur) => {
    cur.shares = { ...cur.shares, ...data.shares };
    cur.comments = { ...cur.comments, ...data.comments };
    cur.activity = { ...cur.activity, ...data.activity };
  });
}

/** Full public URL (uses current origin) */
export function getShareUrl(token) {
  return `${window.location.origin}/v/${encodeURIComponent(token)}`;
}
