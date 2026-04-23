/**
 * ingestDeckSource — extract, chunk, and embed an uploaded DeckSource.
 *
 * Flow:
 *   1. Mark row as "indexing"
 *   2. Fetch the file URL and extract plain text via
 *      ExtractDataFromUploadedFile (JSON schema: { text: string })
 *   3. Chunk the text into ~600-token windows with 60-token overlap
 *   4. Embed each chunk with OpenAI text-embedding-3-small (1536-dim)
 *   5. Bulk-create SourceChunk rows
 *   6. Mark row as "ready" with chunk_count (or "failed" with error)
 *
 * Called from the client right after DeckSource.create. The client polls
 * the DeckSource.status until it becomes "ready" or "failed".
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const EMBED_MODEL = 'text-embedding-3-small';
const OPENAI_EMBED_URL = 'https://api.openai.com/v1/embeddings';

// Rough char-based chunker: ~600 tokens ≈ ~2400 chars. Keeps a 240-char
// overlap so context isn't lost at boundaries. Cheap, deterministic.
const CHUNK_CHARS = 2400;
const CHUNK_OVERLAP = 240;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { source_id } = await req.json();
    if (!source_id) return Response.json({ error: 'source_id required' }, { status: 400 });

    const src = await base44.asServiceRole.entities.DeckSource.get(source_id);
    if (!src) return Response.json({ error: 'Source not found' }, { status: 404 });

    await base44.asServiceRole.entities.DeckSource.update(source_id, { status: 'indexing', error: '' });

    // 1. Extract text from the uploaded file
    const extracted = await base44.asServiceRole.integrations.Core.ExtractDataFromUploadedFile({
      file_url: src.file_url,
      json_schema: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'The full plain-text content of the document, preserving paragraph breaks.' },
        },
        required: ['text'],
      },
    });

    if (extracted?.status !== 'success' || !extracted.output?.text) {
      const msg = extracted?.details || 'Failed to extract text from file';
      await base44.asServiceRole.entities.DeckSource.update(source_id, { status: 'failed', error: msg });
      return Response.json({ ok: false, error: msg });
    }

    const fullText = String(extracted.output.text).trim();
    if (!fullText) {
      await base44.asServiceRole.entities.DeckSource.update(source_id, {
        status: 'failed', error: 'Extracted text was empty',
      });
      return Response.json({ ok: false, error: 'Empty document' });
    }

    // 2. Chunk
    const chunks = chunkText(fullText, CHUNK_CHARS, CHUNK_OVERLAP);
    if (!chunks.length) {
      await base44.asServiceRole.entities.DeckSource.update(source_id, {
        status: 'failed', error: 'No chunks produced',
      });
      return Response.json({ ok: false, error: 'No chunks' });
    }

    // 3. Embed in batches (OpenAI accepts arrays; keep under token limit)
    const BATCH = 64;
    const rows = [];
    for (let i = 0; i < chunks.length; i += BATCH) {
      const batch = chunks.slice(i, i + BATCH);
      const vectors = await embedBatch(batch);
      batch.forEach((content, j) => {
        rows.push({
          deck_id: src.deck_id,
          source_id: src.id,
          source_title: src.title,
          chunk_index: i + j,
          content,
          embedding: vectors[j],
        });
      });
    }

    // 4. Persist chunks
    await base44.asServiceRole.entities.SourceChunk.bulkCreate(rows);

    // 5. Mark ready
    await base44.asServiceRole.entities.DeckSource.update(source_id, {
      status: 'ready', chunk_count: rows.length, error: '',
    });

    return Response.json({ ok: true, chunks: rows.length });
  } catch (error) {
    console.error('ingestDeckSource failed:', error);
    // Best-effort: mark the row as failed so the UI stops spinning
    try {
      const body = await req.clone().json().catch(() => ({}));
      if (body?.source_id) {
        const base44 = createClientFromRequest(req);
        await base44.asServiceRole.entities.DeckSource.update(body.source_id, {
          status: 'failed', error: String(error?.message || error).slice(0, 500),
        });
      }
    } catch (_) { /* swallow */ }
    return Response.json({ error: String(error?.message || error) }, { status: 500 });
  }
});

/* ========================================================
   Helpers
   ======================================================== */
function chunkText(text, size, overlap) {
  const clean = text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');
  const out = [];
  let i = 0;
  while (i < clean.length) {
    const end = Math.min(i + size, clean.length);
    let slice = clean.slice(i, end);
    // Try to break on a paragraph or sentence boundary near the end
    if (end < clean.length) {
      const lastBreak = Math.max(
        slice.lastIndexOf('\n\n'),
        slice.lastIndexOf('. '),
        slice.lastIndexOf('! '),
        slice.lastIndexOf('? ')
      );
      if (lastBreak > size * 0.6) slice = slice.slice(0, lastBreak + 1);
    }
    const trimmed = slice.trim();
    if (trimmed.length) out.push(trimmed);
    i += Math.max(slice.length - overlap, 1);
  }
  return out;
}

async function embedBatch(inputs) {
  const key = Deno.env.get('OPENAI_API_KEY');
  if (!key) throw new Error('OPENAI_API_KEY is not set');
  const res = await fetch(OPENAI_EMBED_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBED_MODEL, input: inputs }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI embedding failed (${res.status}): ${text.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.data.map((d) => d.embedding);
}