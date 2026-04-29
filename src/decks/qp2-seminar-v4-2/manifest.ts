/**
 * qp2-seminar-v4-2 — exact copy of qp2-seminar-v4 on 2026-04-28 as a
 * follow-on iteration target. v4 stays frozen for reference. V5 build
 * conventions still apply (layout system opt-in, fluid font tokens,
 * case-color contract).
 *
 * Original v3-R2 docstring follows for full lineage context.
 *
 * qp2-seminar-v3-R2 — V5 build target. Layout system opt-in active.
 *
 * Slide arc (live, as of 2026-04-26 — all main slides real components,
 * no stubs in main flow):
 *   01            title cover (TitleSlide, all chrome off)
 *   02            hook-A (TitleLayout, deck-neutral, amber default)
 *   03            career-arc (BodyLayout)
 *   04            roadmap (BodyLayout)
 *   05 → 16       CS1 · ambrisentan       — 12 slides — coral cascade
 *                  (added cs1-poppk 2026-04-26 per cs1.md "no PK/PD charts")
 *   17 → 27       CS2 · ivosidenib        — 11 slides — cyan  cascade
 *                  (was 13 · cs2-decisive-move + cs2-outcome archived 2026-04-26
 *                   for dedup; backups in slides/_backup/)
 *   28 → 34       CS3 · PharmAgent        —  7 slides — sage  cascade
 *   35 → 37       Closing                 —  3 slides — amber default
 *                  (synthesis · Merck fit · thanks/Q&A — added 2026-04-26
 *                   per Phase 0 audit "no closer slide currently registered")
 *
 * Backup slides (23 CS1 + 4 CS2 + 4 CS3):
 *   3 timeline backups (1995–2026 / 2004–2024 amb-only / program-detail)
 *   14 deep-dive backups B1–B14 (STARTS, rat finding, dosing, FDA gap,
 *   allometry, 6MWD, LTE, DDI, E11A, endpoints, Garnett-Florian,
 *   hemodynamic, PIP architecture, Bayesian)
 *   No CS2 or CS3 backups built yet — flagged 2026-04-26 Phase 0 audit.
 *
 * Slide IDs are SEMANTIC (per Brief §11.3) — they survive reorder and
 * map to case/section, not slide position. Numbering in chrome is
 * recomputed live from the slides[] array order.
 *
 * This deck OPTS IN to the standard layout system via
 * `standardLayout.enabled = true`. v1 and v2 deliberately do NOT set
 * this flag — they keep their per-slide layouts unchanged.
 *
 * `time:` field on each slide entry = target delivery time in seconds
 * (see Notes-And-QA-Structure.md §1.5). Drives word-count discipline
 * for `notes.js` Spoken blocks.
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
import Cs1History from './slides/cs1-history';
import Cs1Trial from './slides/08-cs1-trial';
import Cs1Architecture from './slides/09-cs1-architecture';
import Cs1Poppk from './slides/09b-cs1-poppk';
import Cs1Pkpd from './slides/09c-cs1-pkpd';
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
import CS2ArchitectureV2 from './slides/cs2-05-architecture-v2';
import CS2Pillars from './slides/cs2-05b-pillars';
import CS2Reversal from './slides/cs2-06-reversal';
import CS2Reckoning from './slides/cs2-07b-reckoning';
// cs2-08-outcome ARCHIVED 2026-04-26 — dedup: duplicated cs2-reversal's date
// + cs2-pillars 0.18 hero. "First IDH1 inhibitor in India" beat folded into
// cs2-09-leadership bottom thesis. Backup at _backup/cs2-08-outcome.pre-dedup-2026-04-26.tsx
import CS2Leadership from './slides/cs2-09-leadership';
import CS2BridgeRecap from './slides/cs2-10-bridge-recap';
import CS2Competitors from './slides/cs2-competitors';
import CS3Divider from './slides/cs3-01-divider';
import CS3Question from './slides/cs3-02-question';
import CS3Problem from './slides/cs3-03-problem';
import CS3Architecture from './slides/cs3-04-architecture';
import CS3ArchitectureOLD from './slides/cs3-04-architecture.OLD';
import CS3Architecture638 from './slides/cs3-04-architecture-v3-638';
import CS3DecisiveMove from './slides/cs3-05-decisive-move';
import CS3Pilot from './slides/cs3-06-pilot';
// import CS3PilotOld from './slides/cs3-06-pilot.old';
import CS3PilotV2 from './slides/cs3-06-pilot-v2';
import CS3InteractiveDossier from './slides/cs3-06b-interactive-dossier';
import CS3Bracket from './slides/cs3-07-bracket';
import CS3Portable from './slides/cs3-08-portable';
// ══════════════════════════════════════════════════════════════
// CS4 — PharmAgent · cinematic 13-slide arc · AMBER
// 13-act spine: divider → objective → problem → why-now →
// landscape → primitive → at-a-glance → architecture → privacy →
// audit → end-to-end → novelty → closer.
// Added 2026-04-29 per CS4 16-min flagship spec.
// ══════════════════════════════════════════════════════════════
import CS4Divider        from './slides/cs4-01-divider';
import CS4Objective      from './slides/cs4-02-objective';
import CS4Problem        from './slides/cs4-03-problem';
import CS4WhyNow         from './slides/cs4-04-why-now';
import CS4Landscape      from './slides/cs4-05-landscape';
import CS4AgentPrimitive from './slides/cs4-06-agent-primitive';
import CS4AtAGlance      from './slides/cs4-07-at-a-glance';
import CS4Architecture   from './slides/cs4-08-architecture';
import CS4Privacy        from './slides/cs4-09-privacy';
import CS4Audit          from './slides/cs4-10-audit';
import CS4EndToEnd       from './slides/cs4-11-end-to-end';
import CS4Novelty        from './slides/cs4-12-novelty';
import CS4Closer         from './slides/cs4-13-closer';
// Closing slides — added 2026-04-26 per Phase 0 audit (manifest flagged
// "no closer slide currently registered"). Synthesis + fit + Q&A.
import ClosingThread from './slides/closing-01-thread';
import ClosingMerck from './slides/closing-02-merck';
import ClosingThanks from './slides/closing-03-thanks';
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
// CS1 backup organization (V6 framework — added 2026-04-26)
import Cs1BackupMasterDivider from './slides/cs1-backup-master-divider';
import Cs1BackupTypeHistorical from './slides/cs1-backup-type-1-historical';
import Cs1BackupTypeMethodology from './slides/cs1-backup-type-2-methodology';
import Cs1BackupTypeDataCuts from './slides/cs1-backup-type-3-data-cuts';
import Cs1BackupTypeRiskMitigation from './slides/cs1-backup-type-4-risk-mitigation';
import Cs1BackupTypeRegulatoryPrecedent from './slides/cs1-backup-type-5-regulatory-precedent';
// CS1 backups ported from HTML deck (Slides-Backup/) 2026-04-26
import Cs1BackupB15PopPkParameters from './slides/cs1-B15-poppk-parameters';
import Cs1BackupB16ModelDiagnostics from './slides/cs1-B16-model-diagnostics';
import Cs1BackupB17CovariateAnalysis from './slides/cs1-B17-covariate-analysis';
import Cs1BackupB18ExposureMatching from './slides/cs1-B18-exposure-matching';
import Cs1BackupB19EmaAddendum2026 from './slides/cs1-B19-ema-addendum-2026';
import Cs1BackupB20FullStory from './slides/cs1-B20-full-story';
// CS2 backup organization (V6 framework — added 2026-04-26)
import Cs2BackupMasterDivider from './slides/cs2-backup-master-divider';
import Cs2BackupTypeHistorical from './slides/cs2-backup-type-1-historical';
import Cs2BackupTypeMethodology from './slides/cs2-backup-type-2-methodology';
import Cs2BackupTypeDataCuts from './slides/cs2-backup-type-3-data-cuts';
import Cs2BackupB1CdscoTimeline from './slides/cs2-B1-cdsco-timeline';
import Cs2BackupB2SixPillarPackage from './slides/cs2-B2-six-pillar-package';
import Cs2BackupB3Phase1DoseRationale from './slides/cs2-B3-phase1-dose-rationale';
import Cs2BackupB4PopulationEvidence from './slides/cs2-B4-population-evidence';
// CS3 backup organization (V6 framework — added 2026-04-26)
import Cs3BackupMasterDivider from './slides/cs3-backup-master-divider';
import Cs3BackupTypeMethodology from './slides/cs3-backup-type-2-methodology';
import Cs3BackupTypeRiskMitigation from './slides/cs3-backup-type-4-risk-mitigation';
import Cs3BackupTypeRegulatoryPrecedent from './slides/cs3-backup-type-5-regulatory-precedent';
import Cs3BackupB1OptimalDesign from './slides/cs3-B1-optimal-design';
import Cs3BackupB2SimulatedEndpoint from './slides/cs3-B2-simulated-endpoint';
import Cs3BackupB3TrialStatus from './slides/cs3-B3-trial-status';
import Cs3BackupB4PediatricAnchor from './slides/cs3-B4-pediatric-anchor';
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

const Cs1CovariateStrategy = () =>
  createElement(Cs1BackupB17CovariateAnalysis, { live: true });

const manifest = {
  id: 'qp2-seminar-v4-2',
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
      text: 'Quantitative Pharmacology in Action · Spring 2026',
      showSlideNumber: true,
      showTime: false,
    },
  },

  /**
   * PDF/PPT export — iframe capture per slide. Lower default = faster runs;
   * only slides with long entrance / timeline / GSAP need higher `slideSettleMs`.
   */
  export: {
    defaultSettleMs: 1300,
    slideSettleMs: {
      title: 2200,
      // hook-A: marks now reveal early for normal viewing; speaker pacing is
      // handled in notes, not by a 55s export wait.
      'hook-A-trial-not-answer': 3500,
      'career-arc': 3200,
      roadmap: 2600,
      'cs1-divider': 1700,
      'cs1-question': 1600,
      'cs1-context': 1800,
      'cs1-mechanism': 2000,
      'cs1-history': 2400,
      'cs1-trial': 2600,
      'cs1-architecture': 2200,
      'cs1-results': 2600,
      'cs1-outcome': 2400,
      'cs1-bracket': 3000,
      'cs1-verdict': 2600,
      'cs1-lesson': 2200,
      'cs1-bridge': 5200,
      'cs2-divider': 1700,
      'cs2-reversal': 2800,
      'cs2-bridge-recap': 5200,
      'cs3-divider': 1700,
      'cs1-backup-timeline-context': 5200,
      'cs1-backup-timeline-amb-only': 5200,
      'cs1-backup-timeline-program-detail': 5600,
      'cs1-B20-full-story': 2600,
      // CS4 — settle times scale with each slide's animation budget.
      // Architecture is the slowest live build (top-down + chip slides);
      // end-to-end + audit + novelty also have multi-stage entrances.
      'cs4-divider':      1800,
      'cs4-objective':    2400,
      'cs4-problem':      2200,
      'cs4-why-now':      2200,
      'cs4-landscape':    2400,
      'cs4-primitive':    2200,
      'cs4-at-a-glance':  3600,
      'cs4-architecture': 3000,
      'cs4-privacy':      2400,
      'cs4-audit':        2400,
      'cs4-end-to-end':   4200,
      'cs4-novelty':      2400,
      'cs4-closer':       2400,
    },
  },

  slides: [
    // 01 — real cover
    {
      id: 'title',
      title: 'Quantitative Pharmacology in Action',
      component: TitleSlide,
      isTitle: true,
      /** Target delivery time (sec) — see Notes-And-QA-Structure.md §1.5 */
      time: 45,
    },

    // 02 — Hook (single, not the back-to-back comparison anymore).
    // Hook B parked 2026-04-25; only Hook A is in the live deck.
    // time: 75 sec — speaker-paced reveal: marks land at 5/25/45 sec on
    // the spoken "untrialable / unavailable / unbuilt" beats. Phase A
    // audit 2026-04-26.
    { id: 'hook-A-trial-not-answer', title: 'Hook A · When the trial isn\'t the answer', component: HookATrialNotAnswer, isTitle: true, transition: 'fade', time: 75 },

    // 03 — career arc (pre-roadmap orientation: who's giving this talk)
    { id: 'career-arc', title: 'Career arc · five stops, one question', component: CareerArc, isTitle: false, time: 90 },

    // 04 — roadmap (the agenda — names CS1 amb / CS2 ivo / CS3 AI/ML)
    { id: 'roadmap', title: 'Roadmap · three cases, one discipline', component: Roadmap, isTitle: false, time: 75 },

    // ══════════════════════════════════════════════════════════════
    // CS1 — Ambrisentan · post flow refactor (2026-04-25)
    // Order: divider → question → context → trial → architecture →
    // results → outcome → bracket → verdict → lesson → bridge.
    // Question front-loaded; Bracket Method earns the verdict; bridge
    // tagline hook-aware via top-of-file constant.
    // ══════════════════════════════════════════════════════════════

    // 05 — CS1 case divider (coral cascade starts here; lung morph source)
    { id: 'cs1-divider', title: 'Case 01 · Ambrisentan', component: Cs1Divider, isTitle: true, transition: 'fade', time: 20 },

    // 06 — CS1 the Clin Pharm question (lung morph destination)
    { id: 'cs1-question', title: 'CS1 · the question', component: Cs1Question, isTitle: false, transition: 'fade', time: 45 },

    // 07 — CS1 context (merged disease + class)
    { id: 'cs1-context', title: 'CS1 · why the question is hard', component: Cs1Context, isTitle: false, transition: 'fade', time: 45 },

    // 07b — CS1 mechanism (4 PAH pathways + ambrisentan ETA blocker; Merck/sotatercept anchor)
    { id: 'cs1-mechanism', title: 'CS1 · pathway + drug', component: Cs1Mechanism, isTitle: false, transition: 'fade', time: 35 },

    // 07c — CS1 PAH treatment history (HIDDEN from live v4 timing pass;
    //      retained as backup/context because it made Case 1 run long).
    // { id: 'cs1-history', title: 'CS1 · PAH treatment history', component: Cs1History, isTitle: false, transition: 'fade', time: 75 },

    // 08 — CS1 trial design + LTE
    { id: 'cs1-trial', title: 'CS1 · AMB112529 + LTE', component: Cs1Trial, isTitle: false, transition: 'fade', time: 50 },

    // 09 — CS1 architecture (drug profile + 5 pediatric trial constraints —
    //      sets up why a 41-patient trial had to carry the dose)
    { id: 'cs1-architecture', title: 'CS1 · drug + 5 constraints', component: Cs1Architecture, isTitle: false, transition: 'fade', time: 55 },

    // 09a — CS1 full covariate model / fixed allometry defense.
    //       Promoted from B17 for v4 timing pass at user request.
    { id: 'cs1-covariate-strategy', title: 'CS1 · full covariate model', component: Cs1CovariateStrategy, isTitle: false, transition: 'fade', time: 55 },

    // 09b — CS1 PopPK build + fit (added 2026-04-26 per cs1.md "no PK/PD charts")
    //       2-cmt schematic · param table · pcVPC · exposure-match strip
    { id: 'cs1-poppk', title: 'CS1 · PopPK · build + fit', component: Cs1Poppk, isTitle: false, transition: 'fade', time: 65 },

    // 09c — CS1 PKPD + Bridging
    { id: 'cs1-pkpd', title: 'CS1 · PopPK · build + fit PART 2', component: Cs1Pkpd, isTitle: false, transition: 'fade', time: 55 },

    // 10 — CS1 results / two precedent architectures (HIDDEN from live v4
    //      timing pass; keep for backup/Q&A if the panel asks EMA vs FDA).
    // { id: 'cs1-results', title: 'CS1 · within 3% of adult', component: Cs1Results, isTitle: false, transition: 'fade', time: 60 },

    // 13 — CS1 clinical outcome (3 disruptions absorbed)
    { id: 'cs1-outcome', title: 'CS1 · the numbers', component: Cs1Outcome, isTitle: false, transition: 'fade', time: 45 },

    // 11 — CS1 Bracket Method (leadership ownership before the verdict)
    { id: 'cs1-bracket', title: 'CS1 · ownership', component: Cs1Bracket, isTitle: false, transition: 'fade', time: 45 },

    // 12 — CS1 what this case proves (portable Director-level lessons)
    { id: 'cs1-lesson', title: 'CS1 · what this case proves', component: Cs1Lesson, isTitle: false, transition: 'fade', time: 50 },

    // 14 — CS1 regulatory verdicts (HIDDEN: Merged into cs1-bracket)
    // { id: 'cs1-verdict', title: 'CS1 · regulatory verdicts', component: Cs1Verdict, isTitle: false, transition: 'fade', time: 60 },

    // 15 — CS1 → CS2 bridge (hook-aware tagline)
    { id: 'cs1-bridge', title: 'CS1 → CS2 bridge', component: Cs1Bridge, isTitle: false, transition: 'fade', time: 30 },

    // ══════════════════════════════════════════════════════════════
    // CS2 — Ivosidenib · India CDSCO regulatory waiver · CYAN
    // ══════════════════════════════════════════════════════════════

    { id: 'cs2-divider', title: 'Case 02 · Ivosidenib', component: CS2Divider, isTitle: true },
    { id: 'cs2-bg-disease', title: 'CS2 · 42 countries · India empty', component: CS2BackgroundDisease, isTitle: false },
    { id: 'cs2-disease', title: 'CS2 · Disease — IDH1 mechanism & epidemiology', component: CS2DiseaseBackground, isTitle: false },
    { id: 'cs2-competitors', title: 'CS2 · IDH inhibitor landscape · history + competitors', component: CS2Competitors, isTitle: false },
    { id: 'cs2-bg-regulatory', title: 'CS2 · Rule 101 reform', component: CS2BackgroundRegulatory, isTitle: false },
    { id: 'cs2-setup', title: 'CS2 · Can the dossier replace a local trial?', component: CS2Setup, isTitle: false },
    // Promoted 2026-04-26: single-canvas MOA slide replaces the earlier
    // duplicate architecture slide. Do not present both mechanism variants live.
    { id: 'cs2-architecture-v2', title: 'CS2 · MOA — one frame, full mechanism', component: CS2ArchitectureV2, isTitle: false },
    { id: 'cs2-pillars', title: 'CS2 · Six convergent pillars', component: CS2Pillars, isTitle: false },
    { id: 'cs2-reversal', title: 'CS2 · CDSCO approved 14 May 2025', component: CS2Reversal, isTitle: false },
    // cs2-velocity archived from live flow 2026-04-27 — public timeline merged into cs2-reversal.
    { id: 'cs2-reckoning', title: 'CS2 · What we shipped, what we did not', component: CS2Reckoning, isTitle: false },
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
    { id: 'cs3-architecture-old', title: 'CS3 · Architecture (4-Quadrant)', component: CS3ArchitectureOLD, isTitle: false },
    { id: 'cs3-architecture-v3', title: 'CS3 · Architecture (638-line version)', component: CS3Architecture638, isTitle: false },
    { id: 'cs3-decisive-move', title: 'CS3 · Privacy & audit by construction', component: CS3DecisiveMove, isTitle: false },
    { id: 'cs3-pilot', title: 'CS3 · Pilot evidence', component: CS3Pilot, isTitle: false },
    // { id: 'cs3-pilot-old', title: 'CS3 · Pilot evidence (Old)', component: CS3PilotOld, isTitle: false },
    { id: 'cs3-pilot-v2', title: 'CS3 · Pilot evidence (V2)', component: CS3PilotV2, isTitle: false },
    { id: 'cs3-interactive-dossier', title: 'CS3 · Interactive Dossier', component: CS3InteractiveDossier, isTitle: false },
    { id: 'cs3-bracket', title: 'CS3 · Bracket Method', component: CS3Bracket, isTitle: false },
    { id: 'cs3-portable', title: 'CS3 · Portable principle', component: CS3Portable, isTitle: false },

    // ══════════════════════════════════════════════════════════════
    // CS4 — PharmAgent · cinematic 13-slide arc · AMBER
    // 13-act spine: divider → objective → problem → why-now →
    // landscape → primitive → at-a-glance → architecture → privacy →
    // audit → end-to-end → novelty → closer.
    // Added 2026-04-29 per CS4 16-min flagship spec.
    // ══════════════════════════════════════════════════════════════
    { id: 'cs4-divider',     title: 'Case 04 · AI/ML in Clinical Pharmacology', component: CS4Divider,        isTitle: true,  transition: 'fade', time: 15 },
    { id: 'cs4-objective',   title: 'CS4 · Objective — the contract',           component: CS4Objective,      isTitle: false, transition: 'fade', time: 60 },
    { id: 'cs4-problem',     title: 'CS4 · 80% scaffolding, 20% science',       component: CS4Problem,        isTitle: false, transition: 'fade', time: 60 },
    { id: 'cs4-why-now',     title: 'CS4 · Why now — ICH M15',                  component: CS4WhyNow,         isTitle: false, transition: 'fade', time: 60 },
    { id: 'cs4-landscape',   title: 'CS4 · Landscape — slices of the workflow', component: CS4Landscape,      isTitle: false, transition: 'fade', time: 75 },
    { id: 'cs4-primitive',   title: 'CS4 · What an agent actually is',          component: CS4AgentPrimitive, isTitle: false, transition: 'fade', time: 60 },
    { id: 'cs4-at-a-glance', title: 'CS4 · PharmAgent at a glance',             component: CS4AtAGlance,      isTitle: false, transition: 'fade', time: 60 },
    { id: 'cs4-architecture',title: 'CS4 · Three levels, centralized topology', component: CS4Architecture,   isTitle: false, transition: 'fade', time: 120 },
    { id: 'cs4-privacy',     title: 'CS4 · Privacy by architecture',            component: CS4Privacy,        isTitle: false, transition: 'fade', time: 90 },
    { id: 'cs4-audit',       title: 'CS4 · Audit by cryptographic chain',       component: CS4Audit,          isTitle: false, transition: 'fade', time: 90 },
    { id: 'cs4-end-to-end',  title: 'CS4 · One workflow, end-to-end',           component: CS4EndToEnd,       isTitle: false, transition: 'fade', time: 90 },
    { id: 'cs4-novelty',     title: "CS4 · What's novel here",                  component: CS4Novelty,        isTitle: false, transition: 'fade', time: 60 },
    { id: 'cs4-closer',      title: 'CS4 · Where this lands',                   component: CS4Closer,         isTitle: false, transition: 'fade', time: 60 },

    // ══════════════════════════════════════════════════════════════
    // CLOSING — synthesis · Merck fit · Q&A invitation
    // Added 2026-04-26 per Phase 0 audit. Three slides closing the
    // live arc before the backup library opens.
    // ══════════════════════════════════════════════════════════════
    { id: 'closing-thread',  title: 'Closing · The common thread', component: ClosingThread, isTitle: false, transition: 'fade', time: 60 },
    { id: 'closing-merck',   title: 'Closing · The fit',         component: ClosingMerck,  isTitle: false, transition: 'fade', time: 75 },
    { id: 'closing-thanks',  title: 'Thank you · Q&A',           component: ClosingThanks, isTitle: true,  transition: 'fade', time: 30 },

    // ══════════════════════════════════════════════════════════════
    // BACKUP · CS1 — Defense library (parked at end of deck so it
    // doesn't interfere with the live arc but remains navigable for
    // hostile-question defense).
    //
    // V6 framework reorganization (2026-04-26): backup zone is opened
    // by a Master divider then sub-divided under the V6 5-type
    // framework (Audit_Slides_V6.md §Phase 2). Lane assignments:
    //   Type 1 · Historical Context     → 5 slides
    //   Type 2 · Methodology            → 8 slides
    //   Type 3 · Data Cuts              → 3 slides
    //   Type 4 · Risk Mitigation        → 3 slides
    //   Type 5 · Regulatory Precedent   → 4 slides
    //   Total                           → 23 backup slides
    //
    // Slides keep their original B-codes (B1..B14 from the original
    // 4-Backup-And-QA-CS1-v2.md package; B15..B19 ported from the
    // HTML deck Slides-Backup/ directory 2026-04-26). The order
    // below is the navigation order — semantic ids are preserved
    // so notes.ts / qa.ts references continue to resolve.
    //
    // Show/hide for any slide is handled at runtime via deck overrides;
    // count is intentionally above V6's 5-10 cap because the panel
    // can probe an unbounded space and the speaker show/hides as
    // rehearsed (see CLAUDE.md "drag-drop reorder drives presentation order").
    // ══════════════════════════════════════════════════════════════

    // ── CS1 BACKUP · MASTER DIVIDER ───────────────────────────────
    { id: 'cs1-backup-master',                   title: 'BACKUP · Case Study 01 · Ambrisentan',                       component: Cs1BackupMasterDivider,             isTitle: true,  transition: 'fade' },

    // ── CS1 BACKUP · TYPE 1 · HISTORICAL CONTEXT ──────────────────
    { id: 'cs1-backup-type-1-historical',        title: 'BACKUP TYPE 1 · Historical Context',                         component: Cs1BackupTypeHistorical,            isTitle: true,  transition: 'fade' },
    { id: 'cs1-backup-timeline-context',         title: 'Backup · CS1 timeline · 1995–2026',                          component: Cs1BackupTimelineContext,           isTitle: false, transition: 'fade' },
    { id: 'cs1-backup-timeline-amb-only',        title: 'Backup · CS1 timeline · ambrisentan-only 2004–2024',         component: Cs1BackupTimelineAmbOnly,           isTitle: false, transition: 'fade' },
    { id: 'cs1-backup-timeline-program-detail',  title: 'Backup · CS1 timeline · program detail (adult + AMB112529)', component: Cs1BackupTimelineProgramDetail,     isTitle: false, transition: 'fade' },
    { id: 'cs1-B10-endpoints',                   title: 'Backup B10 · Endpoint evolution timeline',                   component: Cs1BackupB10EndpointHistory,        isTitle: false, transition: 'fade' },
    { id: 'cs1-B20-full-story',                  title: 'Backup B20 · Full CS1 story',                                component: Cs1BackupB20FullStory,              isTitle: false, transition: 'fade' },

    // ── CS1 BACKUP · TYPE 2 · METHODOLOGY ─────────────────────────
    { id: 'cs1-backup-type-2-methodology',       title: 'BACKUP TYPE 2 · Methodology',                                component: Cs1BackupTypeMethodology,           isTitle: true,  transition: 'fade' },
    { id: 'cs1-B3-dosing',                       title: 'Backup B3 · Dosing scheme (3×2 matrix)',                     component: Cs1BackupDosingScheme,              isTitle: false, transition: 'fade' },
    { id: 'cs1-B5-allometry',                    title: 'Backup B5 · Allometric scaling defense',                     component: Cs1BackupAllometry,                 isTitle: false, transition: 'fade' },
    { id: 'cs1-B6-6mwd',                         title: 'Backup B6 · 6MWD endpoint validity',                         component: Cs1BackupB6_6mwd,                   isTitle: false, transition: 'fade' },
    { id: 'cs1-B14-bayesian',                    title: 'Backup B14 · Bayesian borrowing framework',                  component: Cs1BackupB14Bayesian,               isTitle: false, transition: 'fade' },
    { id: 'cs1-B15-poppk-parameters',            title: 'Backup B15 · PopPK parameter table',                         component: Cs1BackupB15PopPkParameters,        isTitle: false, transition: 'fade' },
    { id: 'cs1-B16-model-diagnostics',           title: 'Backup B16 · Model diagnostics + robustness',                component: Cs1BackupB16ModelDiagnostics,       isTitle: false, transition: 'fade' },
    { id: 'cs1-B17-covariate-analysis',          title: 'Backup B17 · Covariate analysis',                            component: Cs1BackupB17CovariateAnalysis,      isTitle: false, transition: 'fade' },
    { id: 'cs1-B18-exposure-matching',           title: 'Backup B18 · Weight-band exposure matching',                 component: Cs1BackupB18ExposureMatching,       isTitle: false, transition: 'fade' },

    // ── CS1 BACKUP · TYPE 3 · DATA CUTS ───────────────────────────
    { id: 'cs1-backup-type-3-data-cuts',         title: 'BACKUP TYPE 3 · Data Cuts',                                  component: Cs1BackupTypeDataCuts,              isTitle: true,  transition: 'fade' },
    { id: 'cs1-B7-lte',                          title: 'Backup B7 · Long-term extension',                            component: Cs1BackupB7Lte,                     isTitle: false, transition: 'fade' },
    { id: 'cs1-B8-ddi',                          title: 'Backup B8 · DDI + PDE-5i',                                   component: Cs1BackupB8Ddi,                     isTitle: false, transition: 'fade' },
    { id: 'cs1-B12-hemodynamic',                 title: 'Backup B12 · Hemodynamic substudy',                          component: Cs1BackupB12Hemodynamic,            isTitle: false, transition: 'fade' },

    // ── CS1 BACKUP · TYPE 4 · RISK MITIGATION ─────────────────────
    { id: 'cs1-backup-type-4-risk-mitigation',   title: 'BACKUP TYPE 4 · Risk Mitigation',                            component: Cs1BackupTypeRiskMitigation,        isTitle: true,  transition: 'fade' },
    { id: 'cs1-B1-starts',                       title: 'Backup B1 · STARTS-1/STARTS-2 detail',                       component: Cs1BackupStartsDetail,              isTitle: false, transition: 'fade' },
    { id: 'cs1-B2-rat-finding',                  title: 'Backup B2 · Juvenile rat finding',                           component: Cs1BackupRatFinding,                isTitle: false, transition: 'fade' },
    { id: 'cs1-B4-fda-gap',                      title: 'Backup B4 · FDA submission gap',                             component: Cs1BackupFdaGap,                    isTitle: false, transition: 'fade' },

    // ── CS1 BACKUP · TYPE 5 · REGULATORY PRECEDENT ────────────────
    { id: 'cs1-backup-type-5-regulatory',        title: 'BACKUP TYPE 5 · Regulatory Precedent',                       component: Cs1BackupTypeRegulatoryPrecedent,   isTitle: true,  transition: 'fade' },
    { id: 'cs1-B9-e11a',                         title: 'Backup B9 · ICH E11A extrapolation',                         component: Cs1BackupB9E11a,                    isTitle: false, transition: 'fade' },
    { id: 'cs1-B11-garnett-florian',             title: 'Backup B11 · Garnett-Florian framework',                     component: Cs1BackupB11GarnettFlorian,         isTitle: false, transition: 'fade' },
    { id: 'cs1-B13-pip',                         title: 'Backup B13 · PIP architecture & age coverage',               component: Cs1BackupB13PipArchitecture,        isTitle: false, transition: 'fade' },
    { id: 'cs1-B19-ema-addendum-2026',           title: 'Backup B19 · EMA Pediatric PAH Addendum (March 2026)',       component: Cs1BackupB19EmaAddendum2026,        isTitle: false, transition: 'fade' },

    // ══════════════════════════════════════════════════════════════
    // BACKUP · CS2 — Defense library · cyan cascade
    // V6 framework: Historical Context (1) · Methodology (2) ·
    // Data Cuts (1) · Total 4 ported from HTML deck 2026-04-26.
    // Source files: Slides-Backup/41-44 in HTMLApp/HTML/.
    // ══════════════════════════════════════════════════════════════

    // ── CS2 BACKUP · MASTER DIVIDER ───────────────────────────────
    { id: 'cs2-backup-master',                   title: 'BACKUP · Case Study 02 · Ivosidenib',                        component: Cs2BackupMasterDivider,             isTitle: true,  transition: 'fade' },

    // ── CS2 BACKUP · TYPE 1 · HISTORICAL CONTEXT ──────────────────
    { id: 'cs2-backup-type-1-historical',        title: 'BACKUP TYPE 1 · Historical Context',                         component: Cs2BackupTypeHistorical,            isTitle: true,  transition: 'fade' },
    { id: 'cs2-B1-cdsco-timeline',               title: 'Backup B1 · CDSCO engagement timeline',                      component: Cs2BackupB1CdscoTimeline,           isTitle: false, transition: 'fade' },

    // ── CS2 BACKUP · TYPE 2 · METHODOLOGY ─────────────────────────
    { id: 'cs2-backup-type-2-methodology',       title: 'BACKUP TYPE 2 · Methodology',                                component: Cs2BackupTypeMethodology,           isTitle: true,  transition: 'fade' },
    { id: 'cs2-B2-six-pillar-package',           title: 'Backup B2 · Six-Pillar Package',                             component: Cs2BackupB2SixPillarPackage,        isTitle: false, transition: 'fade' },
    { id: 'cs2-B3-phase1-dose-rationale',        title: 'Backup B3 · Phase 1 dose rationale (500 mg QD)',             component: Cs2BackupB3Phase1DoseRationale,     isTitle: false, transition: 'fade' },

    // ── CS2 BACKUP · TYPE 3 · DATA CUTS ───────────────────────────
    { id: 'cs2-backup-type-3-data-cuts',         title: 'BACKUP TYPE 3 · Data Cuts',                                  component: Cs2BackupTypeDataCuts,              isTitle: true,  transition: 'fade' },
    { id: 'cs2-B4-population-evidence',          title: 'Backup B4 · Population evidence (IDH1 + DME polymorphisms)', component: Cs2BackupB4PopulationEvidence,      isTitle: false, transition: 'fade' },

    // ══════════════════════════════════════════════════════════════
    // BACKUP · CS3 — Defense library · sage cascade
    // V6 framework: Methodology (2) · Risk Mitigation (1) ·
    // Regulatory Precedent (1) · Total 4 ported from HTML deck 2026-04-26.
    // Source files: Slides-Backup/45-48 in HTMLApp/HTML/.
    // ══════════════════════════════════════════════════════════════

    // ── CS3 BACKUP · MASTER DIVIDER ───────────────────────────────
    { id: 'cs3-backup-master',                   title: 'BACKUP · Case Study 03 · PharmAgent',                        component: Cs3BackupMasterDivider,             isTitle: true,  transition: 'fade' },

    // ── CS3 BACKUP · TYPE 2 · METHODOLOGY ─────────────────────────
    { id: 'cs3-backup-type-2-methodology',       title: 'BACKUP TYPE 2 · Methodology',                                component: Cs3BackupTypeMethodology,           isTitle: true,  transition: 'fade' },
    { id: 'cs3-B1-optimal-design',               title: 'Backup B1 · Optimal design (D-optimality on PopED)',         component: Cs3BackupB1OptimalDesign,           isTitle: false, transition: 'fade' },
    { id: 'cs3-B2-simulated-endpoint',           title: 'Backup B2 · Simulated primary endpoint (NPAA ≥ 0.1 U/mL)',   component: Cs3BackupB2SimulatedEndpoint,       isTitle: false, transition: 'fade' },

    // ── CS3 BACKUP · TYPE 4 · RISK MITIGATION ─────────────────────
    { id: 'cs3-backup-type-4-risk-mitigation',   title: 'BACKUP TYPE 4 · Risk Mitigation',                            component: Cs3BackupTypeRiskMitigation,        isTitle: true,  transition: 'fade' },
    { id: 'cs3-B3-trial-status',                 title: 'Backup B3 · Trial status (SPARK-ALL terminated)',            component: Cs3BackupB3TrialStatus,             isTitle: false, transition: 'fade' },

    // ── CS3 BACKUP · TYPE 5 · REGULATORY PRECEDENT ────────────────
    { id: 'cs3-backup-type-5-regulatory',        title: 'BACKUP TYPE 5 · Regulatory Precedent',                       component: Cs3BackupTypeRegulatoryPrecedent,   isTitle: true,  transition: 'fade' },
    { id: 'cs3-B4-pediatric-anchor',             title: 'Backup B4 · Pediatric anchor (Asparlas)',                    component: Cs3BackupB4PediatricAnchor,         isTitle: false, transition: 'fade' },
  ],
};

export default manifest;
