/**
 * aiRagIndex — collects every piece of indexable content from a deck,
 * embeds it, and upserts into Qdrant.
 *
 * What gets indexed for each deck:
 *
 *   kind='note'    every entry in <deck>/notes.js  (one chunk per slide)
 *   kind='qa'      every entry in <deck>/qa.js     (one chunk per slide;
 *                                                   if multiple ## Q\d:
 *                                                   blocks, split into
 *                                                   sub-chunks)
 *   kind='reading' every reading item content      (split into ~600-token
 *                                                   windows so a single
 *                                                   long doc returns tight
 *                                                   matches instead of one
 *                                                   diffuse vector)
 *   kind='slide'   slide titles + ids              (so navigation Q's
 *                                                   like "where's the dose
 *                                                   slide" return useful
 *                                                   pointers)
 *
 * Live-edit hooks (useSpeakerNotes, useAnticipatedQA) call
 * `reindexLiveEdit(deck, slideId, kind, text)` so localStorage edits stay
 * in sync — the static manifest content is just the seed.
 *
 * Idempotency: every chunk has a deterministic UUID derived from
 * (deck_id, kind, slide_id, chunk_idx). We store the SHA-16 hash of the
 * chunk content in localStorage under
 *   rag-index:<deck_id>:<chunk_id>
 * and skip re-embedding when the hash matches — saves OpenAI cost and
 * Qdrant churn.
 *
 * All operations are best-effort. If Qdrant or OpenAI are down, the
 * indexer logs a warning and the assistant degrades to inline-context
 * mode without throwing.
 */

import {
  ensureCollection,
  upsertPoints,
  deleteByFilter,
  contentHash,
  deterministicUUID,
  isQdrantConfigured,
  QdrantError,
} from './qdrantClient';
import { getOpenAIKey } from './aiLocalClient';

const EMBED_URL = 'https://api.openai.com/v1/embeddings';
const EMBED_MODEL = 'text-embedding-3-small';
const READING_CHUNK_CHARS = 2400;
const READING_CHUNK_OVERLAP = 240;
const HASH_KEY = (deckId, chunkId) => `rag-index:${deckId}:${chunkId}`;
const STATUS_KEY = (deckId) => `rag-index:${deckId}:_status`;

/* ============================================================
 * Public API
 * ============================================================ */

/** Run a full index pass for a deck. Returns a summary
 *  { skipped, upserted, errors }. Safe to call on every mount —
 *  unchanged chunks are skipped via content hash. */
export async function indexDeck(deck) {
  if (!isQdrantConfigured()) {
    return { ok: false, reason: 'qdrant-not-configured' };
  }
  if (!getOpenAIKey()) {
    return { ok: false, reason: 'no-openai-key' };
  }
  if (!deck?.id) {
    return { ok: false, reason: 'no-deck-id' };
  }

  setStatus(deck.id, 'indexing');
  try {
    await ensureCollection();
    const chunks = collectChunks(deck);
    const result = await upsertChanged(deck.id, chunks);
    setStatus(deck.id, 'ready', result);
    return { ok: true, ...result };
  } catch (err) {
    console.warn('[aiRagIndex] indexDeck failed:', err);
    setStatus(deck.id, 'error', { error: err.message });
    return { ok: false, error: err.message };
  }
}

/** Re-index a single chunk after a live edit (speaker notes / qa pane
 *  autosave). `kind` is 'note' or 'qa'; `text` is the new body. Falls
 *  through silently if Qdrant isn't configured. */
export async function reindexLiveEdit({ deckId, slideId, kind, text }) {
  if (!isQdrantConfigured() || !getOpenAIKey()) return { ok: false };
  if (!deckId || !slideId || !kind) return { ok: false };
  try {
    await ensureCollection();
    const chunkId = `${kind}:${slideId}:0`;
    const trimmed = (text || '').trim();
    if (!trimmed) {
      // Empty edits → drop existing point so retrieval doesn't return
      // stale content that the user just deleted.
      await deletePointsForChunk(deckId, chunkId).catch(() => {});
      localStorage.removeItem(HASH_KEY(deckId, chunkId));
      return { ok: true, deleted: true };
    }
    const result = await upsertChanged(deckId, [{
      id: chunkId,
      kind,
      slideId,
      slideIndex: -1,
      text: trimmed,
    }]);
    return { ok: true, ...result };
  } catch (err) {
    console.warn('[aiRagIndex] reindexLiveEdit failed:', err);
    return { ok: false, error: err.message };
  }
}

/** Read the most recent indexing status from localStorage. */
export function getIndexStatus(deckId) {
  try {
    const raw = localStorage.getItem(STATUS_KEY(deckId));
    if (!raw) return { state: 'unknown' };
    return JSON.parse(raw);
  } catch {
    return { state: 'unknown' };
  }
}

/* ============================================================
 * Chunk collection — walks the deck manifest
 * ============================================================ */

function collectChunks(deck) {
  const out = [];

  // 1) Speaker notes — one chunk per slide that has notes.
  for (let i = 0; i < deck.slides.length; i++) {
    const slide = deck.slides[i];
    const note = (deck.notes?.[slide.id] || '').trim();
    if (note) {
      out.push({
        id: `note:${slide.id}:0`,
        kind: 'note',
        slideId: slide.id,
        slideIndex: i,
        text: note,
      });
    }
  }

  // 2) Anticipated Q&A — one chunk per slide that has qa entries. We
  // keep the full per-slide block as a single chunk; the prompt sees
  // all sibling Qs together, which is usually what the presenter
  // actually wants when retrieval matches one of them.
  for (let i = 0; i < deck.slides.length; i++) {
    const slide = deck.slides[i];
    const qa = (deck.qa?.[slide.id] || '').trim();
    if (qa) {
      out.push({
        id: `qa:${slide.id}:0`,
        kind: 'qa',
        slideId: slide.id,
        slideIndex: i,
        text: qa,
      });
    }
  }

  // 3) Reading material — chunked at ~600 tokens with 60-token overlap.
  const reading = deck.reading || [];
  for (const item of reading) {
    const sub = chunkText(item.content || '', READING_CHUNK_CHARS, READING_CHUNK_OVERLAP);
    for (let j = 0; j < sub.length; j++) {
      out.push({
        id: `reading:${item.slug}:${j}`,
        kind: 'reading',
        slideId: null,
        slideIndex: null,
        readingSlug: item.slug,
        readingTitle: item.title,
        text: sub[j],
      });
    }
  }

  // 4) Slide map — one chunk per slide for navigation-style retrieval.
  for (let i = 0; i < deck.slides.length; i++) {
    const slide = deck.slides[i];
    out.push({
      id: `slide:${slide.id}:0`,
      kind: 'slide',
      slideId: slide.id,
      slideIndex: i,
      text: `Slide ${String(i + 1).padStart(2, '0')}: ${slide.title || slide.id}`,
    });
  }

  return out;
}

function chunkText(text, size, overlap) {
  const clean = (text || '').replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');
  const out = [];
  let i = 0;
  while (i < clean.length) {
    const end = Math.min(i + size, clean.length);
    let slice = clean.slice(i, end);
    if (end < clean.length) {
      const lastBreak = Math.max(
        slice.lastIndexOf('\n\n'),
        slice.lastIndexOf('. '),
        slice.lastIndexOf('! '),
        slice.lastIndexOf('? '),
      );
      if (lastBreak > size * 0.6) slice = slice.slice(0, lastBreak + 1);
    }
    const trimmed = slice.trim();
    if (trimmed.length) out.push(trimmed);
    i += Math.max(slice.length - overlap, 1);
  }
  return out;
}

/* ============================================================
 * Embed + upsert (only for chunks whose content hash changed)
 * ============================================================ */

async function upsertChanged(deckId, chunks) {
  const toEmbed = [];
  let skipped = 0;

  for (const c of chunks) {
    const hash = await contentHash(c.text);
    const cached = localStorage.getItem(HASH_KEY(deckId, c.id));
    if (cached === hash) {
      skipped++;
      continue;
    }
    c._hash = hash;
    toEmbed.push(c);
  }

  if (!toEmbed.length) {
    return { upserted: 0, skipped, total: chunks.length };
  }

  // Embed in batches; OpenAI accepts up to 2048 inputs per call but
  // batches of 64 keep request sizes sane and let us recover from
  // partial failures.
  const BATCH = 64;
  const points = [];
  for (let i = 0; i < toEmbed.length; i += BATCH) {
    const slice = toEmbed.slice(i, i + BATCH);
    const vectors = await embedBatch(slice.map((c) => c.text));
    for (let j = 0; j < slice.length; j++) {
      const c = slice[j];
      const id = await deterministicUUID(`${deckId}:${c.id}`);
      points.push({
        id,
        vector: vectors[j],
        payload: {
          deck_id: deckId,
          kind: c.kind,
          slide_id: c.slideId,
          slide_index: c.slideIndex,
          reading_slug: c.readingSlug || null,
          reading_title: c.readingTitle || null,
          chunk_id: c.id,
          text: c.text,
        },
      });
    }
  }

  await upsertPoints(points);
  // Persist hashes only after a successful upsert.
  for (const c of toEmbed) {
    localStorage.setItem(HASH_KEY(deckId, c.id), c._hash);
  }

  return { upserted: points.length, skipped, total: chunks.length };
}

async function embedBatch(inputs) {
  const key = getOpenAIKey();
  if (!key) throw new Error('No OpenAI key for embeddings');
  const res = await fetch(EMBED_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBED_MODEL, input: inputs }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Embedding failed (${res.status}): ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.data.map((d) => d.embedding);
}

async function deletePointsForChunk(deckId, chunkId) {
  return deleteByFilter({
    must: [
      { key: 'deck_id', match: { value: deckId } },
      { key: 'chunk_id', match: { value: chunkId } },
    ],
  });
}

/* ============================================================
 * Status — lightweight metadata for the UI badge
 * ============================================================ */

function setStatus(deckId, state, extra = {}) {
  try {
    localStorage.setItem(
      STATUS_KEY(deckId),
      JSON.stringify({ state, at: Date.now(), ...extra }),
    );
  } catch {
    /* localStorage quota — ignore */
  }
}
