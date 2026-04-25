/**
 * qp2-seminar-v3-R2 — V5 build target. Layout system opt-in active.
 *
 * Slide arc (v0.1 — stubs to validate chrome at scale):
 *   01            real cover (TitleSlide, all chrome off)
 *   02            hook (TitleLayout, deck-neutral)
 *   03            agenda (BodyLayout)
 *   04 → 13       CS1 stubs (10) — coral case-color cascade
 *   14 → 23       CS2 stubs (10) — cyan case-color cascade
 *   24 → 33       CS3 stubs (10) — violet case-color cascade
 *   34            cross-case synthesis (BodyLayout)
 *   35            closer (TitleLayout)
 *
 * 34 of these are placeholders pointing at `_StubSlide.jsx` with
 * different props. To author a real slide for a given slot:
 *   1. Drop a new file at `slides/NN-<id>.jsx`.
 *   2. Replace the slot's `component` reference (and adjust id/title if
 *      semantics change).
 *   3. Add the slide's `notes.js` + `qa.js` entries keyed by slide id.
 *
 * Slide IDs are SEMANTIC (per Brief §11.3) — they survive reorder and
 * map to case/section, not slide position. Numbering in chrome is
 * recomputed live from the slides[] array order.
 *
 * This deck OPTS IN to the standard layout system via
 * `standardLayout.enabled = true`. v1 and v2 deliberately do NOT set
 * this flag — they keep their per-slide layouts unchanged.
 */

import { createElement } from 'react';
import TitleSlide from './slides/01-title';
import HookATrialNotAnswer from './slides/02-hook-A-trial-not-answer';
// hook-B parked 2026-04-25 — file stays on disk at slides/02-hook-B-eighteen-months.jsx
// for the v2 design pass; not currently registered in the deck flow.
// import HookBEighteenMonths from './slides/02-hook-B-eighteen-months';
import CareerArc from './slides/03-career-arc';
import Roadmap from './slides/04-roadmap';
import Cs1Divider from './slides/05-cs1-divider';
import Cs1Disease from './slides/06-cs1-disease';
import Cs1Class from './slides/07-cs1-class';
import Cs1Question from './slides/08-cs1-question';
import Cs1Trial from './slides/09-cs1-trial';
import Cs1Method from './slides/10-cs1-method';
import Cs1Results from './slides/11-cs1-results';
import Cs1Decision from './slides/12-cs1-decision';
import Cs1Outcome from './slides/13-cs1-outcome';
import Cs1Lesson from './slides/14-cs1-lesson';
import Cs1Bridge from './slides/15-cs1-bridge';
import CS2Divider from './slides/cs2-01-divider';
import CS2BackgroundDisease from './slides/cs2-02-background-disease';
import CS2BackgroundRegulatory from './slides/cs2-03-background-regulatory';
import CS2Setup from './slides/cs2-04-setup';
import CS2Architecture from './slides/cs2-05-architecture';
import CS2DecisiveMove from './slides/cs2-06-decisive-move';
import CS2Velocity from './slides/cs2-07-velocity';
import CS2Outcome from './slides/cs2-08-outcome';
import CS2Leadership from './slides/cs2-09-leadership';
import CS2BridgeRecap from './slides/cs2-10-bridge-recap';
import StubSlide from './slides/_StubSlide';

import notes from './notes';
import qa from './qa';
import reading from './reading';

/** Helper: build a stub manifest entry whose `component` is a stable
 *  wrapper around the shared StubSlide with the given props baked in.
 *  Stable component references are required so React doesn't remount
 *  on every deck re-render (which would break shared-element transitions
 *  and animation state). The arrow function is created once at module
 *  load — same instance reused across every render. */
const stub = ({ id, title, layout = 'body', eyebrow, headline, caseColor, note }) => {
  const stubProps = { layout, eyebrow, headline, caseColor, slideKey: id, note };
  const Wrapped = (props) => createElement(StubSlide, { ...props, ...stubProps });
  Wrapped.displayName = `Stub(${id})`;
  return {
    id,
    title,
    component: Wrapped,
    isTitle: layout === 'title',
  };
};

const manifest = {
  id: 'qp2-seminar-v3-R2',
  title: 'Quantitative Pharmacology in Action',
  subtitle:
    'Strategies for Dose Selection and Regulatory Impact Across Therapeutic Areas',
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
   * Footer text + numbering format are deck-wide; change here once,
   * every body slide updates.
   */
  standardLayout: {
    enabled: true,
    footer: {
      line: true,
      text: 'QP2 Seminar · v3-R2 · Spring 2026',
      showSlideNumber: true,
      showTime: false,
    },
  },

  slides: [
    // 01 — real cover
    {
      id: 'title',
      title: 'Quantitative Pharmacology in Action',
      component: TitleSlide,
      isTitle: true,
    },

    // 02 — Hook (single, not the back-to-back comparison anymore).
    // Hook B parked 2026-04-25; only Hook A is in the live deck.
    { id: 'hook-A-trial-not-answer', title: 'Hook A · When the trial isn\'t the answer', component: HookATrialNotAnswer, isTitle: true, transition: 'fade' },

    // 03 — career arc (pre-roadmap orientation: who's giving this talk)
    { id: 'career-arc', title: 'Career arc · five stops, one question', component: CareerArc, isTitle: false },

    // 04 — roadmap (the agenda — names CS1 amb / CS2 ivo / CS3 AI/ML)
    { id: 'roadmap', title: 'Roadmap · three cases, one discipline', component: Roadmap, isTitle: false },

    // 05 — CS1 case divider (coral cascade starts here)
    { id: 'cs1-divider', title: 'Case 01 · Ambrisentan', component: Cs1Divider, isTitle: true },

    // 06 — CS1 disease backstory (BG-1)
    { id: 'cs1-disease', title: 'CS1 · disease + unmet need', component: Cs1Disease, isTitle: false },

    // 07 — CS1 class history (BG-2)
    { id: 'cs1-class', title: 'CS1 · class history', component: Cs1Class, isTitle: false },

    // 08 — CS1 the Clin Pharm question (Act 1 Setup)
    { id: 'cs1-question', title: 'CS1 · the Clin Pharm question', component: Cs1Question, isTitle: false },

    // 09 — CS1 trial design + LTE (Act 4 Velocity)
    { id: 'cs1-trial', title: 'CS1 · AMB112529 + LTE', component: Cs1Trial, isTitle: false },

    // 10 — CS1 architecture (Act 2 — three pillars)
    { id: 'cs1-method', title: 'CS1 · three pillars', component: Cs1Method, isTitle: false },

    // 11 — CS1 decisive move (Act 3 — exposure-match within 3%)
    { id: 'cs1-results', title: 'CS1 · within 3% of adult', component: Cs1Results, isTitle: false },

    // 12 — CS1 regulatory verdicts (Act 5a — EMA/PMDA approved · FDA never filed)
    { id: 'cs1-decision', title: 'CS1 · regulatory verdicts', component: Cs1Decision, isTitle: false },

    // 13 — CS1 clinical numbers + honest framing (Act 5b — 17%, 7/38 LTE)
    { id: 'cs1-outcome', title: 'CS1 · the numbers', component: Cs1Outcome, isTitle: false },

    // 14 — CS1 what this case proves (Act 7 — three Director-level lessons)
    { id: 'cs1-lesson', title: 'CS1 · what this case proves', component: Cs1Lesson, isTitle: false },

    // 15 — CS1 → CS2 bridge
    { id: 'cs1-bridge', title: 'CS1 → CS2 bridge', component: Cs1Bridge, isTitle: false },

    // ══════════════════════════════════════════════════════════════
    // CS2 — Ivosidenib · India CDSCO regulatory waiver · CYAN
    // ══════════════════════════════════════════════════════════════

    { id: 'cs2-divider', title: 'Case 02 · Ivosidenib', component: CS2Divider, isTitle: true },
    { id: 'cs2-bg-disease', title: 'CS2 · IDH1-mutant AML & CCA', component: CS2BackgroundDisease, isTitle: false },
    { id: 'cs2-bg-regulatory', title: 'CS2 · Rule 101 reform', component: CS2BackgroundRegulatory, isTitle: false },
    { id: 'cs2-setup', title: 'CS2 · Can the dossier replace a local trial?', component: CS2Setup, isTitle: false },
    { id: 'cs2-architecture', title: 'CS2 · Three pillars', component: CS2Architecture, isTitle: false },
    { id: 'cs2-decisive-move', title: 'CS2 · PBPK went into the label', component: CS2DecisiveMove, isTitle: false },
    { id: 'cs2-velocity', title: 'CS2 · Seven years → one pivot', component: CS2Velocity, isTitle: false },
    { id: 'cs2-outcome', title: 'CS2 · India approval May 2025', component: CS2Outcome, isTitle: false },
    { id: 'cs2-leadership', title: 'CS2 · Bracket Method ownership', component: CS2Leadership, isTitle: false },
    { id: 'cs2-bridge-recap', title: 'CS2 · What this case proves', component: CS2BridgeRecap, isTitle: false },

    /*
     * CS3 (AI/ML pharmacometric tools) + cross-case synthesis + closer
     * to be added as content is locked.
     *
     * Note: CS3 was Calaspargase in v1/v2; revised to AI/ML for v3-R2.
     * Per zaj-slides skill: AI tools framed as personal research
     * projects demonstrating capability, NOT as products for transfer.
     */
  ],
};

export default manifest;
