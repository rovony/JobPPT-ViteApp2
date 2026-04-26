/**
 * aiLocalClient — direct OpenAI calls from the browser.
 *
 * The repo's base44 client (src/api/base44Client.js) is currently an
 * offline stub: every function call returns `{ stub: true, data: null }`.
 * That's the actual root cause of the presenter assistant's "no response",
 * "voice not heard", and "RAG not working" symptoms reported by the user.
 *
 * Rather than tear up the offline-stub design, we add a parallel local
 * path here. PresenterAssistant tries base44 first; if it gets a stub
 * sentinel back (or a thrown error), it falls through to these helpers.
 *
 * The user provides their own OpenAI API key via the assistant's
 * settings popover; we store it in localStorage under
 *   merck-deck:openai-key
 * keys never leave the browser. Single-user, single-machine deck app —
 * acceptable trade-off for the interview-prep use case. A multi-user
 * product would never ship this pattern.
 *
 * What gets injected as inline context (Phase 14 scope expansion):
 *   · current slide title + speaker notes
 *   · the entire deck's slide map (titles + ids) so the AI can reference
 *     "go to the dose-finding slide" / "the next case study"
 *   · all reading material (titles + content) — capped at ~12k chars
 *     total so we don't blow out the context window
 *   · last 6 messages of conversation history
 *
 * No vector RAG locally (would require a browser vector store); reading
 * material is small enough that inline context is the right choice.
 */

import { isQdrantConfigured, search as qdrantSearch } from './qdrantClient';

const KEY_STORAGE = 'merck-deck:openai-key';
const CHAT_URL = 'https://api.openai.com/v1/chat/completions';
const EMBED_URL = 'https://api.openai.com/v1/embeddings';
const WHISPER_URL = 'https://api.openai.com/v1/audio/transcriptions';
const CHAT_MODEL = 'gpt-4o-mini'; // cheap, fast, accurate enough for stage co-pilot
const EMBED_MODEL = 'text-embedding-3-small';
const WHISPER_MODEL = 'whisper-1';

const READING_BUDGET_CHARS = 12000;
const RAG_TOP_K = 5;
const RAG_THRESHOLD = 0.30;

/* Key resolution priority:
 *   1. VITE_OPENAI_API_KEY from .env.local (build-time inlined by Vite)
 *   2. localStorage `merck-deck:openai-key` (user pasted into AIKeySettings)
 * The env var wins so a developer can ship a "just works" build for
 * personal use without exposing the settings UI workflow. localStorage
 * remains the user-facing override for browsers without the env var
 * baked in. */
function readEnvKey() {
  try {
    // import.meta.env is statically replaced by Vite — the access has to
    // be inline (not via a variable) for the substitution to fire, but
    // we wrap in try/catch in case the runtime is bare Node.
    const k = import.meta.env?.VITE_OPENAI_API_KEY;
    return typeof k === 'string' ? k.trim() : '';
  } catch {
    return '';
  }
}

export function getOpenAIKey() {
  const env = readEnvKey();
  if (env) return env;
  if (typeof window === 'undefined') return '';
  return (localStorage.getItem(KEY_STORAGE) || '').trim();
}

export function setOpenAIKey(key) {
  if (typeof window === 'undefined') return;
  const cleaned = (key || '').trim();
  if (cleaned) localStorage.setItem(KEY_STORAGE, cleaned);
  else localStorage.removeItem(KEY_STORAGE);
}

export function hasOpenAIKey() {
  return !!getOpenAIKey();
}

/** Where the active key came from — useful for the assistant header
 *  badge so the user can tell at a glance whether they're using the
 *  env-baked key or a localStorage override. */
export function getKeySource() {
  if (readEnvKey()) return 'env';
  if (typeof window !== 'undefined' && localStorage.getItem(KEY_STORAGE)) return 'localStorage';
  return null;
}

/** Sentinel for callers — true when a base44 response is the offline stub. */
export function isStubResponse(res) {
  return !!(res && (res.stub === true || res?.data?.stub === true));
}

/* ============================================================
 * askPresenter (local path)
 *
 * Two retrieval strategies, decided at runtime:
 *
 *   • If Qdrant is configured (VITE_QDRANT_URL + VITE_QDRANT_API_KEY)
 *     and returns at least one chunk above the cosine threshold,
 *     ground the model in those retrieved chunks and emit citations.
 *     The reading-material inline block is dropped from the prompt
 *     so the retrieved context isn't drowned out.
 *
 *   • Otherwise, fall back to inline-context mode (Phase 14): full
 *     reading material + slide notes injected directly. No citations.
 *
 * Either way the user sees a coherent answer; the assistant just
 * gets sharper grounding when Qdrant is healthy.
 * ============================================================ */
export async function localAskPresenter({
  deck,
  currentSlide,
  currentNote,
  question,
  history,
  presenterMode = 'live', // 'live' | 'rehearse'  — shapes response length/depth
}) {
  const key = getOpenAIKey();
  if (!key) {
    throw new LocalAIError(
      'no-key',
      'No OpenAI API key configured. Open the assistant settings to add one.',
    );
  }

  // Try RAG retrieval first if Qdrant is configured. Failure is non-fatal —
  // we fall through to the inline-context path on any error.
  let retrieved = [];
  let ragMode = false;
  if (isQdrantConfigured() && deck?.id) {
    try {
      const qVec = await embedOne(question);
      const hits = await qdrantSearch({
        vector: qVec,
        limit: RAG_TOP_K,
        filter: {
          must: [{ key: 'deck_id', match: { value: deck.id } }],
        },
        scoreThreshold: RAG_THRESHOLD,
      });
      retrieved = hits.map((h, i) => ({
        n: i + 1,
        score: Number((h.score || 0).toFixed(3)),
        text: h.payload?.text || '',
        kind: h.payload?.kind || 'unknown',
        slideId: h.payload?.slide_id || null,
        readingTitle: h.payload?.reading_title || null,
      }));
      ragMode = retrieved.length > 0;
    } catch (err) {
      console.warn('[aiLocalClient] RAG retrieval failed, falling back:', err.message);
    }
  }

  const slideMap = buildSlideMap(deck);
  const recent = buildRecentExchange(history);

  const sourcesBlock = ragMode
    ? buildRetrievedBlock(retrieved)
    : buildReadingBlock(deck);

  const groundingRules = ragMode
    ? `• Use ONLY the retrieved sources above for facts. Cite them as [R1], [R2], … inline whenever you use one.
• If the retrieved sources don't cover the question, say so briefly — never fabricate numbers, dates, or citations.`
    : `• Use the reading material above for facts when relevant. If it doesn't cover the question, say so briefly — never fabricate numbers or sources.`;

  const isLive = presenterMode === 'live';
  const lengthRule = isLive
    ? `• "quick" must be ONE sentence ≤ 15 words. Stage-deliverable, ready to say out loud.
• "details" must be 2–3 short bullets (one fact per bullet, ≤ 15 words each).`
    : `• "quick" must be ONE sentence ≤ 25 words — tighter than rehearsal but not telegraphic.
• "details" should be 3–5 bullets giving fuller reasoning, numbers, citations.`;

  const systemPrompt = `You are an on-stage co-pilot for a live presenter. Mode: ${isLive ? 'LIVE (talk in progress — answer must be instantly usable on stage)' : 'REHEARSE (preparation — fuller reasoning is welcome)'}.

The presenter may type only a few words ("dose?", "why amber?") — interpret short input as a question about the CURRENT SLIDE unless context makes another scope obvious.

OUTPUT FORMAT (strict)
Return ONLY a JSON object with this shape — no prose around it, no markdown fences:
{
  "quick":   "<one-line headline answer, the thing to SAY OUT LOUD>",
  "details": ["<bullet 1>", "<bullet 2>", ...],
  "tags":    ["<short tag>", ...]
}

STYLE RULES
${lengthRule}
• Plain spoken language, no preamble ("Great question…").
• If asked to rephrase or recap, write "quick" in first person AS the presenter.
• Tags are short single-word labels for visual grouping (e.g. "number", "rebuttal", "framing", "citation", "method", "regulatory"). 1–3 tags max.
${groundingRules}

DECK: ${deck?.title || '(untitled)'}
CURRENT SLIDE: ${currentSlide?.title || '(untitled)'} (id: ${currentSlide?.id || '—'})

SPEAKER NOTES FOR THIS SLIDE:
"""
${currentNote || '(no notes for this slide)'}
"""

DECK SLIDE MAP (so you can reference other slides if useful):
${slideMap}

${sourcesBlock}`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...buildHistoryMessages(history),
    { role: 'user', content: question },
  ];

  const res = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages,
      // response_format: json_object forces the model to return parseable
      // JSON; combined with our schema in the prompt this is reliable.
      response_format: { type: 'json_object' },
      max_tokens: isLive ? 320 : 600,
      temperature: 0.35,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    if (res.status === 401) {
      throw new LocalAIError(
        'bad-key',
        'OpenAI rejected the API key. Check it in assistant settings.',
      );
    }
    throw new LocalAIError(
      'http',
      `OpenAI error ${res.status}: ${body.slice(0, 200) || res.statusText}`,
    );
  }

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content?.trim() || '';
  const parsed = parseStructuredAnswer(raw);

  return {
    answer: parsed.quick || raw || '(no response)',
    quick: parsed.quick,
    details: parsed.details,
    tags: parsed.tags,
    mode: ragMode ? 'rag' : 'local',
    presenterMode,
    citations: retrieved.map((r) => ({
      n: r.n,
      source_title: r.readingTitle || `${r.kind}:${r.slideId || '—'}`,
      chunk_index: 0,
      score: r.score,
    })),
  };
}

/* Parse the model's JSON output. Tolerates unexpected wrapping (some
 * models still emit ```json fences even with response_format set, and
 * gpt-4o-mini occasionally produces near-JSON). Falls back to
 * { quick: rawText } so the assistant never shows nothing. */
function parseStructuredAnswer(raw) {
  if (!raw) return { quick: '', details: [], tags: [] };
  // Strip ``` fences if any.
  let cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
  try {
    const obj = JSON.parse(cleaned);
    return {
      quick: typeof obj.quick === 'string' ? obj.quick.trim() : '',
      details: Array.isArray(obj.details)
        ? obj.details.filter((x) => typeof x === 'string').map((s) => s.trim())
        : [],
      tags: Array.isArray(obj.tags)
        ? obj.tags.filter((x) => typeof x === 'string').slice(0, 3).map((s) => s.trim())
        : [],
    };
  } catch {
    // Last-resort: treat the whole thing as the quick answer.
    return { quick: raw.trim(), details: [], tags: [] };
  }
}

async function embedOne(text) {
  const key = getOpenAIKey();
  const res = await fetch(EMBED_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBED_MODEL, input: text }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Embedding failed (${res.status}): ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.data[0].embedding;
}

function buildRetrievedBlock(retrieved) {
  if (!retrieved.length) return 'RETRIEVED SOURCES: (none)';
  const blocks = retrieved.map((r) => {
    const head = r.kind === 'reading' && r.readingTitle
      ? `[R${r.n}] reading · ${r.readingTitle} (score ${r.score})`
      : `[R${r.n}] ${r.kind}${r.slideId ? ` · ${r.slideId}` : ''} (score ${r.score})`;
    return `${head}\n${r.text}`;
  });
  return `RETRIEVED SOURCES (cite by [R…] when used):\n${blocks.join('\n\n---\n\n')}`;
}

/* ============================================================
 * transcribeAudio (local path)
 * ============================================================ */
export async function localTranscribeAudio(blob) {
  const key = getOpenAIKey();
  if (!key) {
    throw new LocalAIError(
      'no-key',
      'No OpenAI API key configured. Open the assistant settings to add one.',
    );
  }
  if (!blob || blob.size < 1024) {
    throw new LocalAIError(
      'too-short',
      'Recording too short — hold the mic for at least half a second.',
    );
  }

  const form = new FormData();
  // Whisper requires a filename with extension to infer the codec.
  const ext = (blob.type || 'audio/webm').includes('ogg') ? 'ogg'
            : (blob.type || 'audio/webm').includes('mp4') ? 'm4a'
            : 'webm';
  form.append('file', blob, `audio.${ext}`);
  form.append('model', WHISPER_MODEL);
  form.append('response_format', 'json');

  const res = await fetch(WHISPER_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}` },
    body: form,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    if (res.status === 401) {
      throw new LocalAIError(
        'bad-key',
        'OpenAI rejected the API key. Check it in assistant settings.',
      );
    }
    throw new LocalAIError(
      'http',
      `Whisper error ${res.status}: ${body.slice(0, 200) || res.statusText}`,
    );
  }

  const data = await res.json();
  return (data?.text || '').trim();
}

/* ============================================================
 * Helpers
 * ============================================================ */
export class LocalAIError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = 'LocalAIError';
  }
}

function buildSlideMap(deck) {
  if (!deck?.slides?.length) return '(no slides)';
  return deck.slides
    .map((s, i) => `${String(i + 1).padStart(2, '0')}. ${s.title || s.id} (id: ${s.id})`)
    .join('\n');
}

function buildReadingBlock(deck) {
  const items = deck?.reading || [];
  if (!items.length) {
    return 'READING MATERIAL FOR THIS DECK: (none uploaded)';
  }

  // Per-item budget so one giant doc doesn't crowd the rest out.
  const perItem = Math.max(1500, Math.floor(READING_BUDGET_CHARS / items.length));
  const blocks = items.map((item, i) => {
    const content = (item.content || '').slice(0, perItem);
    const truncated = (item.content || '').length > perItem ? '\n[... truncated]' : '';
    return `[R${i + 1}] ${item.title} (slug: ${item.slug}, ~${item.minutes ?? '?'} min)
${content}${truncated}`;
  });

  return `READING MATERIAL FOR THIS DECK (use as authoritative context, cite as [R1], [R2], … when relevant):
${blocks.join('\n\n---\n\n')}`;
}

function buildHistoryMessages(history) {
  if (!Array.isArray(history)) return [];
  return history.slice(-6).map((m) => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: typeof m.content === 'string' ? m.content : String(m.content || ''),
  }));
}

function buildRecentExchange(history) {
  if (!Array.isArray(history) || !history.length) return '(none)';
  return history.slice(-6)
    .map((m) => `${m.role === 'user' ? 'PRESENTER' : 'ASSISTANT'}: ${m.content}`)
    .join('\n\n');
}
