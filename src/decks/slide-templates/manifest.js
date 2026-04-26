/**
 * SLIDE TEMPLATES DECK
 *
 * This deck is NOT part of the seminar. It is a living reference library
 * of reusable slide patterns. Agents building new slides should:
 *
 * 1. Browse this deck at /decks/slide-templates
 * 2. Find the template closest to their content type
 * 3. Copy the template file to the target deck's slides/ directory
 * 4. Rename, adapt content, register in that deck's manifest
 *
 * Each template demonstrates ONE canonical pattern with placeholder
 * content. The patterns, tokens, animation timing, and card styles
 * are the canonical versions — do not deviate without documenting why
 * in HowToDesignSlide.md.
 */

import TplCardGrid from './slides/tpl-card-grid';
import TplTwoCol from './slides/tpl-two-col';
import TplFlow from './slides/tpl-flow';
import TplStackedList from './slides/tpl-stacked-list';
import TplHeroStat from './slides/tpl-hero-stat';
import TplBackup from './slides/tpl-backup';

const manifest = {
  id: 'slide-templates',
  title: 'Slide Templates — Agent Reference',
  subtitle: 'Copy these. Rename. Adapt. Never build from scratch.',
  standardLayout: {
    enabled: true,
    footer: {
      line: true,
      text: 'Template Reference Deck',
      showSlideNumber: true,
    },
  },
  slides: [
    { component: TplCardGrid,    id: 'tpl-card-grid',    title: 'Template: Card Grid',    time: 60 },
    { component: TplTwoCol,      id: 'tpl-two-col',      title: 'Template: Two-Column',   time: 60 },
    { component: TplFlow,        id: 'tpl-flow',          title: 'Template: Flow Diagram', time: 60 },
    { component: TplStackedList, id: 'tpl-stacked-list',  title: 'Template: Stacked List', time: 60 },
    { component: TplHeroStat,    id: 'tpl-hero-stat',     title: 'Template: Hero Stat',    time: 60 },
    { component: TplBackup,      id: 'tpl-backup',        title: 'Template: Backup Slide', time: 60 },
  ],
};

export default manifest;
