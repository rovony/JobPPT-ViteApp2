// Deck registry — single source of truth for all registered decks.
// Each deck module default-exports a DeckManifest: { id, title, subtitle, theme, slides: [...] }
import qp2Seminar from './qp2-seminar/manifest';
import qp2SeminarV2 from './qp2-seminar-v2/manifest';
import qp2SeminarV3R2 from './qp2-seminar-v3-R2/manifest';
import qp2SeminarV4 from './qp2-seminar-v4/manifest';
import qp2SeminarV42 from './qp2-seminar-v4-2/manifest';
import v5Pharazi from './v5-pharazi/manifest';
import cs4FlagshipV1 from './cs4-flagship-v1/manifest';
import cs4CanvasFlagship from './cs4-canvas-flagship/manifest';
import launchKeynote from './launch-keynote/manifest';
import templateBlank from './template-blank/manifest';
import slideTemplates from './slide-templates/manifest';
import componentsShowcase from './components-showcase/manifest';
import zajDesignShowcase from './zaj-design-showcase/manifest';
import editorialMotionTemplate from './editorial-motion-template/manifest';
import pharaziSeminar from './pharazi-seminar/manifest';
import pharosSeminar from './pharos-seminar/manifest';
import deckCatalogGit from './deck-catalog-git.json';

const RAW_DECKS = [qp2Seminar, qp2SeminarV2, qp2SeminarV3R2, qp2SeminarV4, qp2SeminarV42, v5Pharazi, cs4FlagshipV1, cs4CanvasFlagship, launchKeynote, templateBlank, slideTemplates, componentsShowcase, zajDesignShowcase, editorialMotionTemplate, pharaziSeminar, pharosSeminar];

/** First commit touching each manifest (regenerate: `npm run gen:deck-catalog-git`). */
export const DECKS = RAW_DECKS.map((d) => ({
  ...d,
  catalogGitFirstCommittedAt: (deckCatalogGit as Record<string, string>)[d.id] ?? null,
}));

export function getDeck(id: string | undefined): any {
  return DECKS.find((d) => d.id === id) || null;
}