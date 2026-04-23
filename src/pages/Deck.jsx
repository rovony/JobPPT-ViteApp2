import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import DeckRunner from '@/components/deck/DeckRunner';

/**
 * Deck page — wrapper for the legacy /Deck?id=<deckId> route.
 *
 * If the query string carries an `id`, redirect to the modern
 * /decks/:deckId/s/:slideId path so URL-state persistence (deck, slide,
 * presenter) kicks in. The redirect runs BEFORE DeckRunner mounts, so
 * it doesn't trigger the keypress-swallow bug that motivated leaving
 * the legacy route alone inside DeckRunner itself.
 *
 * If there's no id, fall through to DeckRunner which handles the
 * param-less case (shows an empty state or reads from wherever).
 * Presenter query param is preserved on the redirect.
 */
export default function Deck() {
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get('id');

  if (deckId) {
    const carryQuery = new URLSearchParams();
    const presenter = searchParams.get('presenter');
    if (presenter) carryQuery.set('presenter', presenter);
    const search = carryQuery.toString();
    const to = `/decks/${encodeURIComponent(deckId)}${search ? `?${search}` : ''}`;
    return <Navigate to={to} replace />;
  }

  return <DeckRunner />;
}
