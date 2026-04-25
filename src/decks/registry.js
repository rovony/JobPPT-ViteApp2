// Deck registry — single source of truth for all registered decks.
// Each deck module default-exports a DeckManifest: { id, title, subtitle, theme, slides: [...] }
import qp2Seminar from './qp2-seminar/manifest';
import qp2SeminarV2 from './qp2-seminar-v2/manifest';
import qp2SeminarV3R2 from './qp2-seminar-v3-R2/manifest';
import launchKeynote from './launch-keynote/manifest';
import templateBlank from './template-blank/manifest';

export const DECKS = [qp2Seminar, qp2SeminarV2, qp2SeminarV3R2, launchKeynote, templateBlank];

export function getDeck(id) {
  return DECKS.find((d) => d.id === id) || null;
}