/**
 * editorial-motion-template — runnable showcase of the zaj-design system.
 *
 * Source of truth: ~/.claude/skills/zaj-design/references/templates/deck-react-vite/
 * The standalone template (under the skill folder) is the canonical, theme-toggleable
 * reference. This deck mirrors the same 16 slides into the merck-deck app so the
 * editorial-motion patterns are demonstrable inside the production deck runner.
 *
 * Integration choices for merck-deck:
 *   - Tokens scoped under [data-zaj-design] (assets/editorial-motion.css). The
 *     standalone --space-5/--bg/--case values DIFFER from merck-deck's globals;
 *     scoping prevents either deck from accidentally inheriting the other's values.
 *   - Dark-only register. The standalone template ships with a 3-state theme toggle;
 *     here we commit to the editorial-noir register so the merck-deck per-deck theme
 *     override stays simple. (Add a [data-zaj-design][data-theme="light"] block to
 *     editorial-motion.css if a light variant is ever needed.)
 *   - standardLayout disabled. Slides use clamp() typography + container queries and
 *     fill 100% of the runner's stage naturally — no FitStage 1920×1080 letterbox.
 *   - Co-located components and assets. Every primitive lives under this folder so
 *     the deck is portable: drop the folder into another merck-deck instance and add
 *     one line to the registry.
 *
 * Sync rule: when the standalone template changes (new slide, renamed pattern), mirror
 * the change into this folder. Anything imported from "../components/..." resolves to
 * the local copy here, not the skill folder, so the standalone template can evolve
 * independently if needed.
 */

import Slide01 from './slides/01-cover';
import Slide02 from './slides/02-catalog';
import Slide03 from './slides/03-header-stack';
import Slide04 from './slides/04-stat-and-facts';
import Slide05 from './slides/05-newspaper-reveal';
import Slide06 from './slides/06-before-after';
import Slide07 from './slides/07-particles';
import Slide08 from './slides/08-d3-chart';
import Slide09 from './slides/09-divider';
import Slide10 from './slides/10-magic-arrival';
import Slide11 from './slides/11-composed-dashboard';
import Slide12 from './slides/12-glass';
import Slide13 from './slides/13-scroll-driven';
import Slide14 from './slides/14-stepper';
import Slide15 from './slides/15-data-dossier';
import Slide16 from './slides/16-closing';

const manifest = {
  id: 'editorial-motion-template',
  title: 'Editorial-Motion Template',
  subtitle: 'zaj-design · runnable showcase of every named pattern',
  theme: 'keynote-noir',
  themeMode: 'dark',
  defaultTransition: 'fade',
  // standardLayout intentionally omitted — slides are responsive (clamp() + container queries),
  // no fixed 1920×1080 canvas.
  slides: [
    { id: '01-cover',              title: 'Cover',                    patterns: 'A1 · A2 · B1 · B2 · B6 · C1 · C2 · C3 · C10',                   component: Slide01 },
    { id: '02-catalog',            title: 'Pattern Catalog',          patterns: 'A1 · B1 · B6 · C2 · C3',                                        component: Slide02 },
    { id: '03-header-stack',       title: 'Editorial Header Stack',   patterns: 'A1 · B1 · B2 · B3 · B5 · B6 · C1 · C2 · C3',                   component: Slide03 },
    { id: '04-stat-and-facts',     title: 'Stat Register + Facts',    patterns: 'A1 · B1 · B4 · B5 · B6 · B8 · C2 · C3 · C7 · C9 · D5',         component: Slide04 },
    { id: '05-newspaper-reveal',   title: 'Newspaper / Word Reveal',  patterns: 'A1 · B1 · B3 · C4 · A4 spring · C10',                          component: Slide05 },
    { id: '06-before-after',       title: 'Before / After Flow',      patterns: 'A1 · B1 · B6 · C1 · C2 · C3 · C6 · C9 · C10 · D3',             component: Slide06 },
    { id: '07-particles',          title: 'Continuous Particles',     patterns: 'A1 · B1 · B6 · C1 · C8 · C9 · C10',                            component: Slide07 },
    { id: '08-d3-chart',           title: 'Hand-Composed Chart (D3)', patterns: 'A1 · B1 · B5 · B6 · C1 · C2 · C3 · C6 · C10 · D1',             component: Slide08 },
    { id: '09-divider',            title: 'Cinematic Divider',        patterns: 'A1 · A2 · A3 · B1 · B6 · C1 · C5 setup · E3',                  component: Slide09 },
    { id: '10-magic-arrival',      title: 'Magic-Move Arrival',       patterns: 'A1 · B1 · B2 · B6 · C1 · C5 · E3 · C10',                       component: Slide10 },
    { id: '11-composed-dashboard', title: 'Composed Dashboard',       patterns: 'A1 · A5 · B1 · B6 · C1 · C2 · C10 · D2',                       component: Slide11 },
    { id: '12-glass',              title: 'Glass Callout',            patterns: 'A1 · B1 · B6 · B7 · B8 · C1 · C10',                            component: Slide12 },
    { id: '13-scroll-driven',      title: 'Scroll-Driven (CSS)',      patterns: 'A1 · B1 · B6 · C1 · C10 · Addenda § A5',                       component: Slide13 },
    { id: '14-stepper',            title: 'Cinematic Stepper',        patterns: 'A1 · B1 · B6 · C1 · C7 · C10 · E1 · Addenda § B3',             component: Slide14 },
    { id: '15-data-dossier',       title: 'Data Dossier (E2)',        patterns: 'A1 · B1 · B6 · C1 · C7 · C10 · E2 · Addenda § B1',             component: Slide15 },
    { id: '16-closing',            title: 'Closing',                  patterns: 'A1 · A4 · B1 · B3 · B6 · C1 · C4 · C10 · Addenda § A4',        component: Slide16 },
  ],
};

export default manifest;
