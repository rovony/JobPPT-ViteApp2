/**
 * deleteDeckSource — remove a DeckSource and all its SourceChunk rows.
 * Called by DeckSourcesDialog when the user clicks the trash icon.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { source_id } = await req.json();
    if (!source_id) return Response.json({ error: 'source_id required' }, { status: 400 });

    // Delete chunks first (best-effort — chunks may not exist if ingestion failed)
    const chunks = await base44.asServiceRole.entities.SourceChunk.filter({ source_id });
    await Promise.all(chunks.map((c) =>
      base44.asServiceRole.entities.SourceChunk.delete(c.id).catch(() => {})
    ));

    // Then delete the parent
    await base44.asServiceRole.entities.DeckSource.delete(source_id);

    return Response.json({ ok: true, deleted_chunks: chunks.length });
  } catch (error) {
    console.error('deleteDeckSource failed:', error);
    return Response.json({ error: String(error?.message || error) }, { status: 500 });
  }
});