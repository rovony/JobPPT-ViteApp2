/**
 * qp2-seminar-v2 — pre-talk reading material.
 *
 * One markdown file per topic. Vite's ?raw import inlines the file
 * contents at build time so the bundle is hermetic — no fetch at
 * runtime. Add a new entry by:
 *   1. Drop a `.md` file in this folder
 *   2. Import it as `?raw` below
 *   3. Add an entry to the array with the metadata fields
 *
 * Metadata fields:
 *   slug        — URL-safe id, must match filename without extension
 *   title       — human-readable title shown in the Reading panel TOC
 *   attachedTo  — 'deck' | 'cs1' | 'cs2' | 'cs3' | <slide-id> | array
 *                 Phase 4 will use this to surface "Reading for this
 *                 slide" — for now it's metadata only
 *   minutes     — estimated read time, shown in the TOC
 */

import intro from './00-intro.md?raw';
import cs1 from './01-cs1-pediatric-pah.md?raw';
import cs2 from './02-cs2-oncology.md?raw';
import cs3 from './03-cs3-cmd.md?raw';

const reading = [
  { slug: '00-intro',                title: 'Overview',                       attachedTo: 'deck', minutes: 5, content: intro },
  { slug: '01-cs1-pediatric-pah',    title: 'CS1 · Pediatric PAH',            attachedTo: 'cs1',  minutes: 8, content: cs1 },
  { slug: '02-cs2-oncology',         title: 'CS2 · Oncology · India',         attachedTo: 'cs2',  minutes: 7, content: cs2 },
  { slug: '03-cs3-cmd',              title: 'CS3 · CMD pipeline',             attachedTo: 'cs3',  minutes: 7, content: cs3 },
];

export default reading;
