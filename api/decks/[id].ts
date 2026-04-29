import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../../src/db/index.js';
import { decks } from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';
import { serializeDeckRow } from '../../src/lib/deck-row-serialize.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const deckId = req.query.id as string;

  if (!deckId) {
    return res.status(400).json({ error: 'Deck ID is required' });
  }

  try {
    if (req.method === 'PATCH') {
      const { title, subtitle, description, theme } = req.body || {};
      const patch: Record<string, unknown> = { updatedAt: new Date() };
      if (title !== undefined) patch.title = title;
      if (subtitle !== undefined) patch.subtitle = subtitle;
      if (description !== undefined) patch.description = description;
      if (theme !== undefined) patch.theme = theme;

      const [updatedDeck] = await db
        .update(decks)
        .set(patch as any)
        .where(eq(decks.id, deckId))
        .returning();

      return res.status(200).json(serializeDeckRow(updatedDeck as unknown as Record<string, unknown>));
    }

    if (req.method === 'DELETE') {
      await db.delete(decks).where(eq(decks.id, deckId));
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Decks API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
