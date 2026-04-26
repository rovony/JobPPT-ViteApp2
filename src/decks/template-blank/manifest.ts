/**
 * template-blank — minimal starter deck.
 *
 * Duplicate this folder, rename to your deck id, and register in
 * src/decks/registry.js. See ./README.md for the full quickstart.
 *
 * Required fields: id, title, slides.
 *
 * Optional fields (DeckRunner reads if present):
 *   subtitle           — shown on the Home card below the title
 *   theme              — must match a [data-deck-theme="..."] CSS
 *                        block in src/index.css. Registered today:
 *                        'clinical' | 'keynote-noir' | 'light-editorial'
 *   themeMode          — 'light' | 'dark' — force default; user can
 *                        still toggle per-deck (persists in localStorage)
 *   defaultTransition  — 'card' | 'cube' | 'flip' | 'depth' | 'pan'
 *   notes              — imported from ./notes.js; keys match slide ids
 *
 * Per-slide optional fields:
 *   steps: N           — enable step-through; component reads `step` prop
 *   transition: '<p>'  — override defaultTransition for this slide
 */

import Slide01 from './slides/01-title';
import Slide02 from './slides/02-section';
import Slide03 from './slides/03-closing';
import notes from './notes';

const manifest = {
  id: 'template-blank',
  title: 'Blank template',
  subtitle: 'Starter deck — duplicate and customize',
  theme: 'light-editorial',
  themeMode: 'light',
  defaultTransition: 'card',
  notes,
  slides: [
    { id: 'title', title: 'Title', component: Slide01 },
    { id: 'section', title: 'Section', component: Slide02 },
    { id: 'closing', title: 'Closing', component: Slide03 },
  ],
};

export default manifest;