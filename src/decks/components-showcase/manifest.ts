// @ts-nocheck
/**
 * components-showcase — reference deck demonstrating Magic UI primitives
 * + framer-motion patterns with multiple design variants per component.
 * Use this deck as a swatchbook when composing real slides.
 *
 * Each slide demos ONE component with 2–3 design variants.
 */

import Slide01 from './slides/01-intro';
import Slide02 from './slides/02-beam-pathway';
import Slide03 from './slides/03-border-beam';
import Slide04 from './slides/04-number-ticker';
import Slide05 from './slides/05-particles';
import Slide06 from './slides/06-magic-card';
import Slide07 from './slides/07-bento-grid';
import Slide08 from './slides/08-smiles-drawer';
import Slide09 from './slides/09-vessel-morph';
import Slide10 from './slides/10-combined';
import notes from './notes';

const manifest = {
  id: 'components-showcase',
  title: 'Components showcase',
  subtitle: 'Magic UI + framer-motion variants for the merck-deck',
  theme: 'keynote-noir',
  themeMode: 'dark',
  defaultTransition: 'card',
  notes,
  slides: [
    { id: 'intro',         title: 'Intro · components showcase',           component: Slide01 },
    { id: 'beam-pathway',  title: 'AnimatedBeam · 3 variants',             component: Slide02 },
    { id: 'border-beam',   title: 'BorderBeam · 3 variants',               component: Slide03 },
    { id: 'ticker',        title: 'NumberTicker · 3 variants',             component: Slide04 },
    { id: 'particles',     title: 'Particles · 2 variants',                component: Slide05 },
    { id: 'magic-card',    title: 'MagicCard · 3 variants',                component: Slide06 },
    { id: 'bento',         title: 'BentoGrid · 3 variants',                component: Slide07 },
    { id: 'smiles',        title: 'smiles-drawer · 2 variants',            component: Slide08 },
    { id: 'vessel',        title: 'Vessel narrow→open · framer path morph', component: Slide09 },
    { id: 'combined',      title: 'Combined · cs1-mechanism rebuilt',       component: Slide10 },
  ],
};

export default manifest;
