import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../../src/db/index.js';
import { decks } from '../../src/db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const allDecks = await db.select().from(decks);
      return res.status(200).json(allDecks);
    } 
    
    if (req.method === 'POST') {
      const { title, subtitle, description, theme } = req.body;
      const [newDeck] = await db.insert(decks).values({
        title: title || 'Untitled Deck',
        subtitle: subtitle || '',
        description: description || '',
        theme: theme || 'clinical',
      }).returning();
      
      return res.status(201).json(newDeck);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Decks API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
