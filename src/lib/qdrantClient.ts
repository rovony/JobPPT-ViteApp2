// @ts-nocheck
/**
 * qdrantClient — thin browser-side wrapper over the Qdrant REST API.
 *
 * Why not the @qdrant/js-client-rest SDK?
 *   The SDK is Node-first and bundles a fair bit of legacy http machinery.
 *   For our use (CRUD on points + similarity search) the REST surface is
 *   trivially small and we keep the bundle slim.
 *
 * Reads config from Vite env:
 *   VITE_QDRANT_URL         cluster REST endpoint (https://<id>.qdrant.io:6333)
 *   VITE_QDRANT_API_KEY     JWT API key
 *   VITE_QDRANT_COLLECTION  collection name (default: merck-deck)
 *
 * If VITE_QDRANT_URL is empty the wrapper reports "not configured" via
 * isQdrantConfigured() and every call short-circuits — callers degrade
 * gracefully to inline-context mode.
 *
 * Keep all calls idempotent. Collection creation is a no-op if the
 * collection already exists; upserts use deterministic point IDs so
 * re-runs don't duplicate.
 */

const VECTOR_SIZE = 1536; // text-embedding-3-small
const VECTOR_DISTANCE = 'Cosine';
const DEFAULT_COLLECTION = 'merck-deck';

function readEnv() {
  try {
    const env = import.meta.env || {};
    return {
      url: (env.VITE_QDRANT_URL || '').trim().replace(/\/$/, ''),
      apiKey: (env.VITE_QDRANT_API_KEY || '').trim(),
      collection: (env.VITE_QDRANT_COLLECTION || DEFAULT_COLLECTION).trim(),
    };
  } catch {
    return { url: '', apiKey: '', collection: DEFAULT_COLLECTION };
  }
}

export function isQdrantConfigured() {
  const { url, apiKey } = readEnv();
  return !!(url && apiKey);
}

export function getQdrantConfig() {
  return readEnv();
}

async function qdrantFetch(path, init = {}) {
  const { url, apiKey } = readEnv();
  if (!url || !apiKey) {
    throw new QdrantError('not-configured', 'Qdrant URL or API key missing in env');
  }
  const res = await fetch(`${url}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new QdrantError(
      `http-${res.status}`,
      `Qdrant ${res.status}: ${body.slice(0, 300) || res.statusText}`,
    );
  }
  // Some Qdrant endpoints (DELETE) return empty bodies — guard the parse.
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

/* ============================================================
 * Collection management
 * ============================================================ */

/** Create the collection if it doesn't exist. Safe to call repeatedly. */
export async function ensureCollection() {
  const { collection } = readEnv();

  // Probe — Qdrant returns 200 + collection info, or 404.
  try {
    await qdrantFetch(`/collections/${encodeURIComponent(collection)}`, { method: 'GET' });
    return { created: false };
  } catch (err) {
    if (!(err instanceof QdrantError) || !err.code.startsWith('http-404')) {
      throw err;
    }
  }

  await qdrantFetch(`/collections/${encodeURIComponent(collection)}`, {
    method: 'PUT',
    body: JSON.stringify({
      vectors: { size: VECTOR_SIZE, distance: VECTOR_DISTANCE },
    }),
  });
  return { created: true };
}

/* ============================================================
 * Points (upsert + search + delete)
 * ============================================================ */

/**
 * Upsert a batch of points. Each point:
 *   { id: string|number, vector: number[1536], payload: { ... } }
 *
 * Qdrant doesn't accept arbitrary string ids on the default config —
 * it wants either an unsigned integer OR a UUID string. We use UUIDs
 * derived from a hash of (deck_id, kind, slide_id, chunk_idx) so the
 * id is deterministic across re-indexing without duplicating.
 */
export async function upsertPoints(points) {
  if (!points.length) return { upserted: 0 };
  const { collection } = readEnv();
  const res = await qdrantFetch(
    `/collections/${encodeURIComponent(collection)}/points?wait=true`,
    {
      method: 'PUT',
      body: JSON.stringify({ points }),
    },
  );
  return { upserted: points.length, ...res?.result };
}

/** Delete points by filter (typically used to drop stale points after a
 *  content edit before re-upserting fresh ones). */
export async function deleteByFilter(filter) {
  const { collection } = readEnv();
  return qdrantFetch(
    `/collections/${encodeURIComponent(collection)}/points/delete?wait=true`,
    {
      method: 'POST',
      body: JSON.stringify({ filter }),
    },
  );
}

/** Similarity search. Returns the raw Qdrant result.points array,
 *  each entry shaped { id, score, payload, version }. */
export async function search({ vector, limit = 5, filter = null, scoreThreshold = null }) {
  const { collection } = readEnv();
  const body = { vector, limit, with_payload: true, with_vector: false };
  if (filter) body.filter = filter;
  if (typeof scoreThreshold === 'number') body.score_threshold = scoreThreshold;
  const res = await qdrantFetch(
    `/collections/${encodeURIComponent(collection)}/points/search`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );
  return res?.result || [];
}

/* ============================================================
 * Errors + helpers
 * ============================================================ */

export class QdrantError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = 'QdrantError';
  }
}

/** Stable UUID derived from a string (so the same logical chunk always
 *  produces the same point id — keeps the upsert path idempotent). */
export async function deterministicUUID(input) {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  const bytes = new Uint8Array(buf);
  // Format the first 16 bytes as a UUIDv4-shaped string. Set version &
  // variant bits so it conforms enough that Qdrant's UUID parser is happy.
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant
  const hex = Array.from(bytes.slice(0, 16))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return (
    `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-` +
    `${hex.slice(16, 20)}-${hex.slice(20, 32)}`
  );
}

/** Quick content hash so the indexer can skip chunks whose text didn't
 *  change since the last upsert. Stored in localStorage by the indexer. */
export async function contentHash(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16);
}
