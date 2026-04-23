import React from 'react';
import DeckRunner from '@/components/deck/DeckRunner';

/**
 * Deck page — thin wrapper around DeckRunner so the URL follows the
 * Base44 page-name convention (/Deck?id=<deckId>).
 */
export default function Deck() {
  return <DeckRunner />;
}