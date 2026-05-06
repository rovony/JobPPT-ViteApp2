// @ts-nocheck
/**
 * components-showcase — reference deck demonstrating every library named in
 * _Docs/React-Stack-Directory.md, with the library + category + npm install
 * command in a uniform header on every slide.
 *
 * Slides 01–10: Magic UI / framer-motion primitives (original showcase).
 * Slides 11–36: full sweep of the directory's §3–§17 libraries.
 *               Each demo is a working live render; uniform LibraryShowcase
 *               chrome surfaces the library name + npm install + URL.
 *
 * Coverage map at the bottom (slide 36) lists what's covered + intentionally
 * skipped with directory rationale.
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
import Slide11 from './slides/11-motion-lucide';
import Slide12 from './slides/12-recharts';
import Slide13 from './slides/13-xyflow';
import Slide14 from './slides/14-katex';
import Slide15 from './slides/15-tremor';
import Slide16 from './slides/16-maps';
import Slide17 from './slides/17-tanstack-table';
import Slide18 from './slides/18-lottie';
import Slide19 from './slides/19-shaders';
import Slide20 from './slides/20-xarrows-balancer';
import Slide21 from './slides/21-html-to-image';
import Slide22 from './slides/22-sonner-vaul';
import Slide23 from './slides/23-shiki-player';
import Slide24 from './slides/24-zustand-rhf';
import Slide25 from './slides/25-cmdk-confetti';
import Slide26 from './slides/26-leaflet-gsap';
import Slide27 from './slides/27-d3-roughjs';
import Slide28 from './slides/28-embla-gesture';
import Slide29 from './slides/29-tanstack-query';
import Slide30 from './slides/30-shadcn-radix';
import Slide31 from './slides/31-three-r3f';
import Slide32 from './slides/32-intersection-nuqs';
import Slide33 from './slides/33-export-pptx-pdf';
import Slide34 from './slides/34-lenis-day-picker';
import Slide35 from './slides/35-markdown-quill';
import Slide36 from './slides/36-summary-skipped';
import notes from './notes';

const manifest = {
  id: 'components-showcase',
  title: 'Components showcase',
  subtitle: 'Every library in React-Stack-Directory.md, demoed live',
  theme: 'keynote-noir',
  themeMode: 'dark',
  defaultTransition: 'card',
  notes,
  slides: [
    { id: 'intro',          title: 'Intro · components showcase',                                 component: Slide01 },
    { id: 'beam-pathway',   title: 'AnimatedBeam · Magic UI · 3 variants',                        component: Slide02 },
    { id: 'border-beam',    title: 'BorderBeam · Magic UI · 3 variants',                          component: Slide03 },
    { id: 'ticker',         title: 'NumberTicker · Magic UI · 3 variants',                        component: Slide04 },
    { id: 'particles',      title: 'Particles · Magic UI · 2 variants',                           component: Slide05 },
    { id: 'magic-card',     title: 'MagicCard · Magic UI · 3 variants',                           component: Slide06 },
    { id: 'bento',          title: 'BentoGrid · Magic UI · 3 variants',                           component: Slide07 },
    { id: 'smiles',         title: 'smiles-drawer · 2 variants',                                  component: Slide08 },
    { id: 'vessel',         title: 'Vessel narrow→open · framer path morph',                      component: Slide09 },
    { id: 'combined',       title: 'Combined · cs1-mechanism rebuilt',                            component: Slide10 },

    // Directory §4 · Core
    { id: 'motion-lucide',  title: '§4 · motion + lucide-react',                                  component: Slide11 },

    // Directory §5A · Presentation deck add-ons
    { id: 'recharts',       title: '§5A · recharts — PK + exposure-response',                     component: Slide12 },
    { id: 'xyflow',         title: '§5A · @xyflow/react — process workflows',                     component: Slide13 },
    { id: 'katex',          title: '§5A · katex + react-katex — equations',                       component: Slide14 },
    { id: 'tremor',         title: '§5A · @tremor/react — KPI cards',                             component: Slide15 },
    { id: 'maps',           title: '§5A · inline world-map.svg + react-world-flags',              component: Slide16 },
    { id: 'tanstack-table', title: '§5A · @tanstack/react-table — sortable',                      component: Slide17 },
    { id: 'lottie',         title: '§5A · lottie-react — vector animations',                      component: Slide18 },
    { id: 'shaders',        title: '§5A · @paper-design/shaders-react — WebGL gradients',         component: Slide19 },
    { id: 'xarrows-bal',    title: '§5A · react-xarrows + react-wrap-balancer',                   component: Slide20 },
    { id: 'html-to-image',  title: '§5A/§11 · html-to-image + downloadjs — DOM→PNG',              component: Slide21 },
    { id: 'embla-gesture',  title: '§5A · embla + use-gesture — carousel + drag',                 component: Slide28 },

    // Directory §5B · Marketing chrome
    { id: 'sonner-vaul',    title: '§5B · sonner + vaul — toasts + drawer',                       component: Slide22 },

    // Directory §5C · Course / content
    { id: 'shiki-player',   title: '§5C · shiki + react-player — code + video',                   component: Slide23 },
    { id: 'markdown',       title: '§5C · react-markdown + remark-gfm',                           component: Slide35 },

    // Directory §5D / §5E · Apps + state
    { id: 'tanstack-query', title: '§5D · @tanstack/react-query — server state',                  component: Slide29 },
    { id: 'zustand-rhf',    title: '§5D/§5E · zustand + react-hook-form + zod',                   component: Slide24 },
    { id: 'shadcn-radix',   title: '§3 · @radix-ui/* (shadcn primitives)',                        component: Slide30 },

    // Directory §5A / §5D · Smooth scroll + dates
    { id: 'lenis-dates',    title: '§5A/§5D · lenis + react-day-picker + date-fns',               component: Slide34 },

    // Directory §6 · Install when needed
    { id: 'cmdk-confetti',  title: '§6/§9 · cmdk + canvas-confetti',                              component: Slide25 },
    { id: 'leaflet-gsap',   title: '§6/§5A · react-leaflet + gsap',                               component: Slide26 },
    { id: 'd3-roughjs',     title: '§6 · d3 + roughjs — raw + sketchy SVG',                       component: Slide27 },
    { id: 'three-r3f',      title: '§6/§17C · three.js (+ r3f recommended)',                      component: Slide31 },

    // Directory §5A · URL state + scroll
    { id: 'intersection',   title: '§5A · react-intersection-observer + nuqs',                    component: Slide32 },

    // Directory §11 · Export pipeline alternatives
    { id: 'export-pdf-pptx',title: '§11 · jspdf + pptxgenjs — PDF + PPTX',                        component: Slide33 },

    // Coverage map
    { id: 'summary',        title: 'Summary · directory coverage map',                            component: Slide36 },
  ],
};

export default manifest;
