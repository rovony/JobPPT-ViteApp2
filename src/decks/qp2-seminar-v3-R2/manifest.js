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
import Cs1Question from './slides/06-cs1-question';
import Cs1Context from './slides/07-cs1-context';
import Cs1Mechanism from './slides/07b-cs1-mechanism';
import Cs1Trial from './slides/08-cs1-trial';
import Cs1Architecture from './slides/09-cs1-architecture';
import Cs1Results from './slides/10-cs1-results';
import Cs1Outcome from './slides/11-cs1-outcome';
import Cs1Bracket from './slides/12-cs1-bracket';
import Cs1Verdict from './slides/13-cs1-verdict';
import Cs1Lesson from './slides/14-cs1-lesson';
import Cs1Bridge from './slides/15-cs1-bridge';
import CS2Divider from './slides/cs2-01-divider';
import CS2BackgroundDisease from './slides/cs2-02-background-disease';
import CS2DiseaseBackground from './slides/cs2-disease-background';
import CS2BackgroundRegulatory from './slides/cs2-03-background-regulatory';
import CS2Setup from './slides/cs2-04-setup';
import CS2Architecture from './slides/cs2-05-architecture';
import CS2Pillars from './slides/cs2-05b-pillars';
import CS2Reversal from './slides/cs2-06-reversal';
import CS2Velocity from './slides/cs2-07-velocity';
import CS2Reckoning from './slides/cs2-07b-reckoning';
import CS2Outcome from './slides/cs2-08-outcome';
import CS2Leadership from './slides/cs2-09-leadership';
import CS2BridgeRecap from './slides/cs2-10-bridge-recap';
import CS3Divider from './slides/cs3-01-divider';
import CS3Question from './slides/cs3-02-question';
import CS3Problem from './slides/cs3-03-problem';
import CS3Architecture from './slides/cs3-04-architecture';
import CS3DecisiveMove from './slides/cs3-05-decisive-move';
import CS3Pilot from './slides/cs3-06-pilot';
import CS3Bracket from './slides/cs3-07-bracket';
import CS3Portable from './slides/cs3-08-portable';
import Cs1BackupTimelineContext from './slides/cs1-backup-01-timeline-context';
import Cs1BackupTimelineAmbOnly from './slides/cs1-backup-02-timeline-amb-only';
import Cs1BackupTimelineProgramDetail from './slides/cs1-backup-03-timeline-program-detail';
import Cs1BackupStartsDetail from './slides/cs1-B1-starts-detail';
import Cs1BackupRatFinding from './slides/cs1-B2-rat-finding';
import Cs1BackupDosingScheme from './slides/cs1-B3-dosing-scheme';
import Cs1BackupFdaGap from './slides/cs1-B4-fda-gap';
import Cs1BackupAllometry from './slides/cs1-B5-allometry';
import Cs1BackupB6_6mwd from './slides/cs1-B6-6mwd';
import Cs1BackupB7Lte from './slides/cs1-B7-lte';
import Cs1BackupB8Ddi from './slides/cs1-B8-ddi';
import Cs1BackupB9E11a from './slides/cs1-B9-e11a';
import Cs1BackupB10EndpointHistory from './slides/cs1-B10-endpoint-history';
import Cs1BackupB11GarnettFlorian from './slides/cs1-B11-garnett-florian';
import Cs1BackupB12Hemodynamic from './slides/cs1-B12-hemodynamic';
import Cs1BackupB13PipArchitecture from './slides/cs1-B13-pip-architecture';
import Cs1BackupB14Bayesian from './slides/cs1-B14-bayesian';
import StubSlide from './slides/_StubSlide';

import notes from './notes';
import qa from './qa';
import reading from './reading/index';

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

    // ══════════════════════════════════════════════════════════════
    // CS1 — Ambrisentan · post flow refactor (2026-04-25)
    // Order: divider → question → context → trial → architecture →
    // results → outcome → bracket → verdict → lesson → bridge.
    // Question front-loaded; Bracket Method earns the verdict; bridge
    // tagline hook-aware via top-of-file constant.
    // ══════════════════════════════════════════════════════════════

    // 05 — CS1 case divider (coral cascade starts here; lung morph source)
    { id: 'cs1-divider', title: 'Case 01 · Ambrisentan', component: Cs1Divider, isTitle: true, transition: 'fade' },

    // 06 — CS1 the Clin Pharm question (lung morph destination)
    { id: 'cs1-question', title: 'CS1 · the question', component: Cs1Question, isTitle: false, transition: 'fade' },

    // 07 — CS1 context (merged disease + class)
    { id: 'cs1-context', title: 'CS1 · why the question is hard', component: Cs1Context, isTitle: false, transition: 'fade' },

    // 07b — CS1 mechanism (4 PAH pathways + ambrisentan ETA blocker; Merck/sotatercept anchor)
    { id: 'cs1-mechanism', title: 'CS1 · pathway + drug', component: Cs1Mechanism, isTitle: false, transition: 'fade' },

    // 08 — CS1 trial design + LTE
    { id: 'cs1-trial', title: 'CS1 · AMB112529 + LTE', component: Cs1Trial, isTitle: false, transition: 'fade' },

    // 09 — CS1 architecture (three pillars; ends pointing forward)
    { id: 'cs1-architecture', title: 'CS1 · three pillars', component: Cs1Architecture, isTitle: false, transition: 'fade' },

    // 10 — CS1 results (the 3% match — single hero numeral)
    { id: 'cs1-results', title: 'CS1 · within 3% of adult', component: Cs1Results, isTitle: false, transition: 'fade' },

    // 11 — CS1 clinical outcome
    { id: 'cs1-outcome', title: 'CS1 · the numbers', component: Cs1Outcome, isTitle: false, transition: 'fade' },

    // 12 — CS1 Bracket Method (leadership ownership before the verdict)
    { id: 'cs1-bracket', title: 'CS1 · ownership', component: Cs1Bracket, isTitle: false, transition: 'fade' },

    // 13 — CS1 regulatory verdicts
    { id: 'cs1-verdict', title: 'CS1 · regulatory verdicts', component: Cs1Verdict, isTitle: false, transition: 'fade' },

    // 14 — CS1 what this case proves (portable Director-level lessons)
    { id: 'cs1-lesson', title: 'CS1 · what this case proves', component: Cs1Lesson, isTitle: false, transition: 'fade' },

    // 15 — CS1 → CS2 bridge (hook-aware tagline)
    { id: 'cs1-bridge', title: 'CS1 → CS2 bridge', component: Cs1Bridge, isTitle: false, transition: 'fade' },

    // ══════════════════════════════════════════════════════════════
    // CS2 — Ivosidenib · India CDSCO regulatory waiver · CYAN
    // ══════════════════════════════════════════════════════════════

    { id: 'cs2-divider', title: 'Case 02 · Ivosidenib', component: CS2Divider, isTitle: true },
    { id: 'cs2-bg-disease', title: 'CS2 · 42 countries · India empty', component: CS2BackgroundDisease, isTitle: false },
    { id: 'cs2-disease', title: 'CS2 · Disease — IDH1 mechanism & epidemiology', component: CS2DiseaseBackground, isTitle: false },
    { id: 'cs2-bg-regulatory', title: 'CS2 · Rule 101 reform', component: CS2BackgroundRegulatory, isTitle: false },
    { id: 'cs2-setup', title: 'CS2 · Can the dossier replace a local trial?', component: CS2Setup, isTitle: false },
    { id: 'cs2-architecture', title: 'CS2 · MOA is the foundation', component: CS2Architecture, isTitle: false },
    { id: 'cs2-pillars', title: 'CS2 · Six convergent pillars', component: CS2Pillars, isTitle: false },
    { id: 'cs2-reversal', title: 'CS2 · CDSCO approved 14 May 2025', component: CS2Reversal, isTitle: false },
    { id: 'cs2-velocity', title: 'CS2 · Seven years → one pivot', component: CS2Velocity, isTitle: false },
    { id: 'cs2-reckoning', title: 'CS2 · What we shipped, what we did not', component: CS2Reckoning, isTitle: false },
    { id: 'cs2-outcome', title: 'CS2 · India approval May 2025', component: CS2Outcome, isTitle: false },
    { id: 'cs2-leadership', title: 'CS2 · Bracket Method ownership', component: CS2Leadership, isTitle: false },
    { id: 'cs2-bridge-recap', title: 'CS2 · The science was the bridge', component: CS2BridgeRecap, isTitle: false },

    // ══════════════════════════════════════════════════════════════
    // CS3 — PharmAgent · AI/ML workflow infrastructure · SAGE
    // 7-act spine: divider → question → problem → architecture →
    // decisive move → pilot → bracket → portable principle.
    // ══════════════════════════════════════════════════════════════

    { id: 'cs3-divider', title: 'Case 03 · PharmAgent', component: CS3Divider, isTitle: true, transition: 'fade' },
    { id: 'cs3-question', title: 'CS3 · The question', component: CS3Question, isTitle: false },
    { id: 'cs3-problem', title: 'CS3 · 80% scaffolding', component: CS3Problem, isTitle: false },
    { id: 'cs3-architecture', title: 'CS3 · PharmAgent platform', component: CS3Architecture, isTitle: false },
    { id: 'cs3-decisive-move', title: 'CS3 · Privacy & audit by construction', component: CS3DecisiveMove, isTitle: false },
    { id: 'cs3-pilot', title: 'CS3 · Pilot evidence', component: CS3Pilot, isTitle: false },
    { id: 'cs3-bracket', title: 'CS3 · Bracket Method', component: CS3Bracket, isTitle: false },
    { id: 'cs3-portable', title: 'CS3 · Portable principle', component: CS3Portable, isTitle: false },

    // ══════════════════════════════════════════════════════════════
    // BACKUP · CS1 — Q&A timeline slides (parked at end of deck so
    // they don't interfere with the 35-slide live arc but remain
    // navigable for hostile-question defense). Source for the first
    // two slides: 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/
    // V2/inputs/Mariam/timeline.md  (Gamma prompts #1 + #2).
    // 1995→2026 = full PAH context with two precedent frameworks
    //   (FUTURE-1 EMA path 2009 + Garnett-Florian FDA path 2017).
    // 2004→2024 = ambrisentan-only zoom with denser ticks and
    //   emphasised causal chains incl. upward methodological arc.
    // 2004→2024 program-detail = stacked dual-timeline (compact
    //   adult lifecycle on top + expanded AMB112529 pediatric arc
    //   below) with PIP architecture / trial events / fracture
    //   columns / regulatory outputs, plus a right-side dosing
    //   matrix + target-vs-actual callout pair. Source: chat
    //   prompt 2026-04-25 (Gamma prompt #3, "what the program
    //   actually did").
    // ══════════════════════════════════════════════════════════════
    { id: 'cs1-backup-timeline-context',        title: 'Backup · CS1 timeline · 1995–2026',                       component: Cs1BackupTimelineContext,       isTitle: false, transition: 'fade' },
    { id: 'cs1-backup-timeline-amb-only',       title: 'Backup · CS1 timeline · ambrisentan-only 2004–2024',     component: Cs1BackupTimelineAmbOnly,       isTitle: false, transition: 'fade' },
    { id: 'cs1-backup-timeline-program-detail', title: 'Backup · CS1 timeline · program detail (adult + AMB112529)', component: Cs1BackupTimelineProgramDetail, isTitle: false, transition: 'fade' },

    // ══════════════════════════════════════════════════════════════
    // BACKUP · CS1 — B1–B14: deep-dive defense slides sourced from
    // 4-Backup-And-QA-CS1-v2.md + additionstoBackups.md + amd1.md
    // + part2.md. Pull up during hostile Q&A.
    // ══════════════════════════════════════════════════════════════
    { id: 'cs1-B1-starts',          title: 'Backup B1 · STARTS-1/STARTS-2 detail',        component: Cs1BackupStartsDetail,      isTitle: false, transition: 'fade' },
    { id: 'cs1-B2-rat-finding',     title: 'Backup B2 · Juvenile rat finding',             component: Cs1BackupRatFinding,        isTitle: false, transition: 'fade' },
    { id: 'cs1-B3-dosing',          title: 'Backup B3 · Dosing scheme (3×2 matrix)',       component: Cs1BackupDosingScheme,      isTitle: false, transition: 'fade' },
    { id: 'cs1-B4-fda-gap',         title: 'Backup B4 · FDA submission gap',               component: Cs1BackupFdaGap,            isTitle: false, transition: 'fade' },
    { id: 'cs1-B5-allometry',       title: 'Backup B5 · Allometric scaling defense',       component: Cs1BackupAllometry,         isTitle: false, transition: 'fade' },
    { id: 'cs1-B6-6mwd',            title: 'Backup B6 · 6MWD endpoint validity',           component: Cs1BackupB6_6mwd,           isTitle: false, transition: 'fade' },
    { id: 'cs1-B7-lte',             title: 'Backup B7 · Long-term extension',              component: Cs1BackupB7Lte,             isTitle: false, transition: 'fade' },
    { id: 'cs1-B8-ddi',             title: 'Backup B8 · DDI + PDE-5i',                     component: Cs1BackupB8Ddi,             isTitle: false, transition: 'fade' },
    { id: 'cs1-B9-e11a',            title: 'Backup B9 · ICH E11A extrapolation',           component: Cs1BackupB9E11a,            isTitle: false, transition: 'fade' },
    { id: 'cs1-B10-endpoints',      title: 'Backup B10 · Endpoint evolution timeline',     component: Cs1BackupB10EndpointHistory, isTitle: false, transition: 'fade' },
    { id: 'cs1-B11-garnett-florian', title: 'Backup B11 · Garnett-Florian framework',      component: Cs1BackupB11GarnettFlorian, isTitle: false, transition: 'fade' },
    { id: 'cs1-B12-hemodynamic',    title: 'Backup B12 · Hemodynamic substudy',            component: Cs1BackupB12Hemodynamic,    isTitle: false, transition: 'fade' },
    { id: 'cs1-B13-pip',            title: 'Backup B13 · PIP architecture & age coverage', component: Cs1BackupB13PipArchitecture, isTitle: false, transition: 'fade' },
    { id: 'cs1-B14-bayesian',       title: 'Backup B14 · Bayesian borrowing framework',    component: Cs1BackupB14Bayesian,       isTitle: false, transition: 'fade' },
  ],
};

export default manifest;
