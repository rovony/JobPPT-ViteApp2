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

const KEY_STORAGE = 'merck-deck:openai-key';
const CHAT_URL = 'https://api.openai.com/v1/chat/completions';
const WHISPER_URL = 'https://api.openai.com/v1/audio/transcriptions';
const CHAT_MODEL = 'gpt-4o-mini'; // cheap, fast, accurate enough for stage co-pilot
const WHISPER_MODEL = 'whisper-1';

const READING_BUDGET_CHARS = 12000;

export function getOpenAIKey() {
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

/** Sentinel for callers — true when a base44 response is the offline stub. */
export function isStubResponse(res) {
  return !!(res && (res.stub === true || res?.data?.stub === true));
}

/* ============================================================
 * askPresenter (local path)
 * ============================================================ */
export async function localAskPresenter({
  deck,
  currentSlide,
  currentNote,
  question,
  history,
}) {
  const key = getOpenAIKey();
  if (!key) {
    throw new LocalAIError(
      'no-key',
      'No OpenAI API key configured. Open the assistant settings to add one.',
    );
  }

  const slideMap = buildSlideMap(deck);
  const readingBlock = buildReadingBlock(deck);
  const recent = buildRecentExchange(history);

  const systemPrompt = `You are an on-stage co-pilot for a live presenter. They are delivering a talk right now and need a short, stage-ready answer they can say out loud.

STYLE RULES
• Under 90 words, plain spoken language, no preamble ("Great question…").
• Lead with the answer. One or two supporting points max.
• If the presenter asks to rephrase or recap, respond in first person as them.
• Ground every factual claim in the materials below. If they don't cover it, say so briefly — do not fabricate sources or numbers.

DECK: ${deck?.title || '(untitled)'}
CURRENT SLIDE: ${currentSlide?.title || '(untitled)'} (id: ${currentSlide?.id || '—'})

SPEAKER NOTES FOR THIS SLIDE:
"""
${currentNote || '(no notes for this slide)'}
"""

DECK SLIDE MAP (so you can reference other slides if useful):
${slideMap}

${readingBlock}`;

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
      max_tokens: 400,
      temperature: 0.4,
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
  const answer = data?.choices?.[0]?.message?.content?.trim() || '(no response)';
  return {
    answer,
    mode: 'local',
    citations: [], // no RAG locally; reading material is inline context
  };
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
