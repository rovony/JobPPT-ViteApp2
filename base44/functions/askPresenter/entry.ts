/**
 * askPresenter — RAG + web-fallback answer for the presenter assistant.
 *
 * Flow:
 *   1. Embed the question with text-embedding-3-small
 *   2. Fetch this deck's SourceChunks, rank by cosine similarity
 *   3. If the top score is strong (>= 0.30), answer from chunks with citations
 *      If weak (or no sources), fall back to web search via InvokeLLM
 *   4. Also always include the current slide's speaker notes as context
 *
 * Response shape:
 *   {
 *     answer: string,              // <=90 words, stage-ready
 *     mode: 'rag' | 'web' | 'notes-only',
 *     citations: [{ source_title, chunk_index, score }]
 *   }
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const EMBED_MODEL = 'text-embedding-3-small';
const OPENAI_EMBED_URL = 'https://api.openai.com/v1/embeddings';
const TOP_K = 5;
const RAG_THRESHOLD = 0.30; // cosine similarity with text-embedding-3-small

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { deck_id, deck_title, slide_title, slide_id, slide_note, question, history } = await req.json();
    if (!deck_id || !question) {
      return Response.json({ error: 'deck_id and question required' }, { status: 400 });
    }

    // 1. Embed the question
    const [qVec] = await embedBatch([question]);

    // 2. Pull chunks for this deck and rank
    const chunks = await base44.asServiceRole.entities.SourceChunk.filter({ deck_id });
    let top = [];
    if (chunks.length) {
      const scored = chunks
        .filter((c) => Array.isArray(c.embedding) && c.embedding.length)
        .map((c) => ({ chunk: c, score: cosine(qVec, c.embedding) }))
        .sort((a, b) => b.score - a.score);
      top = scored.slice(0, TOP_K);
    }

    const bestScore = top[0]?.score ?? 0;
    const hasStrongRag = bestScore >= RAG_THRESHOLD;

    const recent = (history || []).slice(-6)
      .map((m) => `${m.role === 'user' ? 'PRESENTER' : 'ASSISTANT'}: ${m.content}`)
      .join('\n\n');

    // 3a. RAG path — ground the model in retrieved chunks
    if (hasStrongRag) {
      const context = top.map((t, i) =>
        `[${i + 1}] ${t.chunk.source_title} (chunk ${t.chunk.chunk_index}, score ${t.score.toFixed(2)})\n${t.chunk.content}`
      ).join('\n\n---\n\n');

      const prompt = buildPrompt({
        deck_title, slide_title, slide_note, recent, question,
        sourcesBlock:
`RETRIEVED SOURCES (cite by bracket number when used):
${context}`,
        rules:
`• Ground every factual claim in the retrieved sources. If the sources don't cover it, say so briefly.
• Cite sources inline as [1], [2], etc. Only cite what you actually used.`,
      });

      const reply = await base44.asServiceRole.integrations.Core.InvokeLLM({ prompt });
      return Response.json({
        answer: toText(reply),
        mode: 'rag',
        citations: top.map((t, i) => ({
          n: i + 1,
          source_title: t.chunk.source_title,
          chunk_index: t.chunk.chunk_index,
          score: Number(t.score.toFixed(3)),
        })),
      });
    }

    // 3b. Web-fallback path — no strong source match. Let the model search.
    const prompt = buildPrompt({
      deck_title, slide_title, slide_note, recent, question,
      sourcesBlock: chunks.length
        ? `(This deck has sources, but none matched the question strongly. Best score: ${bestScore.toFixed(2)}.)`
        : `(This deck has no uploaded sources yet.)`,
      rules:
`• You may use general knowledge and web context to answer.
• Do NOT fabricate citations. If you state a specific fact, briefly hint at the kind of source ("per FDA label", "per recent trial data").`,
    });

    const reply = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      add_context_from_internet: true,
      model: 'gemini_3_flash',
    });

    return Response.json({
      answer: toText(reply),
      mode: chunks.length ? 'web' : 'notes-only',
      citations: [],
    });
  } catch (error) {
    console.error('askPresenter failed:', error);
    return Response.json({ error: String(error?.message || error) }, { status: 500 });
  }
});

/* ========================================================
   Helpers
   ======================================================== */
function buildPrompt({ deck_title, slide_title, slide_note, recent, question, sourcesBlock, rules }) {
  return `You are an on-stage co-pilot for a live presenter. The presenter is delivering a talk right now and needs a short, stage-ready answer they can say out loud.

STYLE RULES
• Under 90 words, plain spoken language, no preamble ("Great question…").
• Lead with the answer. One or two supporting points max.
• If the presenter asks to rephrase or recap, respond in first person as them.
${rules}

DECK: ${deck_title || '(untitled deck)'}
CURRENT SLIDE: ${slide_title || '(untitled slide)'}

SPEAKER NOTES FOR THIS SLIDE:
"""
${slide_note || '(no notes)'}
"""

${sourcesBlock}

RECENT EXCHANGE:
${recent || '(none)'}

PRESENTER'S QUESTION:
${question}

ASSISTANT:`;
}

function toText(r) {
  if (typeof r === 'string') return r.trim();
  if (r?.response) return String(r.response).trim();
  if (r?.text) return String(r.text).trim();
  return String(r || '').trim();
}

function cosine(a, b) {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom ? dot / denom : 0;
}

async function embedBatch(inputs) {
  const key = Deno.env.get('OPENAI_API_KEY');
  if (!key) throw new Error('OPENAI_API_KEY is not set');
  const res = await fetch(OPENAI_EMBED_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: EMBED_MODEL, input: inputs }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI embedding failed (${res.status}): ${text.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.data.map((d) => d.embedding);
}