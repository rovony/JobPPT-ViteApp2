/**
 * qp2-seminar-v3-R2 — empty deck cloned from qp2-seminar-v2.
 *
 * No slides shipped at clone time except a single placeholder. Add real
 * slides in `./slides/` and register them in the array below as you
 * build them out.
 *
 * This deck OPTS IN to the standard layout system via
 * `standardLayout.enabled = true`. Slides authored against the
 * <TitleLayout> / <BodyLayout> components in
 * `src/components/deck/layouts/` automatically inherit:
 *   • Consistent header chrome
 *   • Footer hairline + footer text (configurable per deck)
 *   • Dynamic NN / TT slide numbering (bottom-right)
 *   • Spacing, font scale, and responsiveness audited deck-wide
 *
 * v1 (qp2-seminar) and v2 (qp2-seminar-v2) deliberately do NOT set this
 * flag — they keep their existing per-slide layouts unchanged.
 */

import PlaceholderSlide from './slides/00-placeholder';

import notes from './notes';
import qa from './qa';
import reading from './reading';

const manifest = {
  id: 'qp2-seminar-v3-R2',
  title: 'Quantitative Pharmacology in Action · v3-R2',
  subtitle: 'Working draft · QP2 Seminar (R2 build)',
  theme: 'clinical',
  notes,
  qa,
  reading,
  defaultTransition: 'card',

  /**
   * Standard layout system — opt-in flag for v3+ decks.
   *
   * When `enabled: true`, slides authored with <TitleLayout> and
   * <BodyLayout> inherit consistent footer / numbering / spacing.
   * Existing legacy slides (v1, v2) leave this absent or false and
   * keep their own per-slide chrome.
   *
   * The footer config is read by BodyLayout and surfaces on every
   * non-title slide; change `text` per deck without touching individual
   * slide files.
   */
  standardLayout: {
    enabled: true,
    footer: {
      line: true,
      text: 'QP2 Seminar · v3-R2 · Spring 2026',
      showSlideNumber: true, // NN / TT on the bottom-right
      showTime: false,
    },
  },

  slides: [
    {
      id: 'placeholder',
      title: 'Placeholder · v3-R2',
      component: PlaceholderSlide,
      // Mark slides as `isTitle: true` to skip BodyLayout's footer chrome
      // and use TitleLayout's hero treatment instead. The placeholder
      // slide is a hero, so we tag it as a title.
      isTitle: true,
    },
  ],
};

export default manifest;
