import qp2Notes from '../qp2-seminar-v4/notes';
import pharosNotes from '../pharos-seminar/notes';

/**
 * Map pharos-seminar slide IDs → v5-ultragenyx CS2 slot IDs.
 * Updated 2026-05-06 after the pharazi → pharos source swap.
 * Slides that aren't represented in v5-ultragenyx (01-title, 02-hook,
 * 02-5-agenda, 22-5-closing-recap, 23-qa) are intentionally absent —
 * we have our own framing slides for those moments.
 */
const pharosIdMap: Record<string, string> = {
  '03-regulatory-floor': 'cs2-regulatory-floor',
  '04-market-moving': 'cs2-market-moving',
  '05-gap': 'cs2-gap',
  '06-transition': 'cs2-transition',
  '07-principle1': 'cs2-principle1',
  '08-principle2': 'cs2-principle2',
  '09-principle3': 'cs2-principle3',
  '10-principle4': 'cs2-principle4',
  '11-principle5': 'cs2-principle5',
  '12-5-m3-begins': 'cs2-m3-begins',
  '12a-working-overview': 'cs2-working-overview',
  '12b-working-audit': 'cs2-working-audit',
  '13-component-nca': 'cs2-component-nca',
  '14-component-dataflow': 'cs2-component-dataflow',
  '15-component-audit': 'cs2-component-audit',
  '16-poppk-dashboard': 'cs2-poppk-dashboard',
  '17-component-sop': 'cs2-component-sop',
  '18-regulatory-dashboard': 'cs2-regulatory-dashboard',
  '19-e2e-audit-dashboard': 'cs2-e2e-audit',
  '20-synthesis-dossier': 'cs2-synthesis-dossier',
  '21-synthesis-trace': 'cs2-synthesis-trace',
  '22-publication-close': 'cs2-publication-close',
};

// Map Pharos notes to their new CS2 slot IDs
const mappedPharosNotes = Object.entries(pharosNotes).reduce((acc, [key, value]) => {
  if (pharosIdMap[key]) {
    acc[pharosIdMap[key]] = value;
  }
  return acc;
}, {} as Record<string, string>);

import cs3Notes from './cs3-notes';
import { overrideNotes } from './override-notes';

// Merge all notes
const notes = {
  ...qp2Notes, // Retains Intro, CS1, Closing, and all CS1 backups
  ...cs3Notes, // Adds expanded CS3 (Ivosidenib)
  ...mappedPharosNotes, // Adds CS2 (Pharos source)
  ...overrideNotes, // Overrides roadmap, cs1-bridge, cs2-pharazi-divider
};

export default notes;
