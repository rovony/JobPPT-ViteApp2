import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../../src/db/index.js';
import { decks } from '../../src/db/schema.js';
import { desc } from 'drizzle-orm';
import { serializeDeckRows, serializeDeckRow } from '../../src/lib/deck-row-serialize.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const allDecks = await db.select().from(decks).orderBy(desc(decks.createdAt));
      return res.status(200).json(serializeDeckRows(allDecks as unknown as Record<string, unknown>[]));
    }

    if (req.method === 'POST') {
      const { title, subtitle, description, theme } = req.body || {};
      const [newDeck] = await db
        .insert(decks)
        .values({
          title: title || 'Untitled Deck',
          subtitle: subtitle || null,
          description: description || null,
          theme: theme || 'clinical',
        })
        .returning();

      return res.status(201).json(serializeDeckRow(newDeck as unknown as Record<string, unknown>));
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Decks API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
