// Deck registry — single source of truth for all registered decks.
// Each deck module default-exports a DeckManifest: { id, title, subtitle, theme, slides: [...] }
import qp2Seminar from './qp2-seminar/manifest';
import launchKeynote from './launch-keynote/manifest';
import templateBlank from './template-blank/manifest';

export const DECKS = [qp2Seminar, launchKeynote, templateBlank];

export function getDeck(id) {
  return DECKS.find((d) => d.id === id) || null;
}