/**
 * qp2-seminar-v2 manifest — V3-inspired refactor of qp2-seminar.
 *
 * V2 reorders the pre-CS slides to align with the inspiration markdown
 * (Pre-CS1 V3) and expands Case Study 01 from 10 → 12 slides by
 * inserting two analytical-context slides:
 *
 *   • 07b  CS1 Precedents          — Sildenafil (trauma) · Bosentan (template)
 *   • 13b  CS1 Commercial geography — Letairis (US) · Volibris (EU+JP+RoW)
 *
 * Both new slides use the SlideFrame-based two-column + synthesis-ribbon
 * idiom so the case reads with one consistent rhetorical pattern.
 *
 * The existing CS2/CS3/closing arcs (slides 15-35 in their existing
 * file numbering) carry forward unchanged for now — they will iterate
 * in subsequent passes.
 *
 * NOTE: Sub-component folders that hang off a slide (e.g. `cs1-build/`,
 * `closing-divider/`, `hook/`) are NOT renumbered — they're keyed by
 * case/section, not by slide position, so their names survive future
 * re-orderings.
 */

import Slide01Title from './slides/01-title';
import Slide02Hook from './slides/02-hook';
import Slide03CareerArc from './slides/03-career-arc';
import Slide04FrameworkThemes from './slides/04-framework-themes';

import Slide05CaseDivider from './slides/05-case-divider';
import Slide06CaseBackground from './slides/06-case-background';
import Slide07CaseChallenge from './slides/07-case-challenge';
import Slide07bCasePrecedents from './slides/07b-case-precedents';
import Slide08CaseStrategy from './slides/08-case-strategy';
import Slide08cCaseStrategyVisuals from './slides/08c-case-strategy-visuals';
// Slide08bCaseTrialDesign · 2026-04-25 D2 insert: AMB112529 protocol slide.
//   Slots between strategy (S08) and build (S09). Absorbs the data-constraint
//   beat that used to be S07 Card 03 — now reads as a standalone trial-design
//   slide with population/design/sampling/endpoints + sparse-PK contrast.
import Slide08bCaseTrialDesign from './slides/08b-case-trial-design';
import Slide09CaseBuild from './slides/09-case-build';
// Slide10CaseFitBridge · 2026-04-25 modeling-results consolidation:
//   3 result-chart slides → 2. The pcVPC fit panel (was slide 10) and the
//   AUC × body-weight bridge panel (was slide 11) now live side-by-side on
//   slide 10 (case-fit-bridge); the Cmax box-plot panel + n=8 subgroup flag
//   moved to the safety E-R slide (now slide 11) where the box-plot grammar
//   is reused. Net flow: build (S09) → fit-bridge (S10) → safety (S11).
import Slide10CaseFitBridge from './slides/10-case-fit-bridge';
import Slide11CaseExposureResponse from './slides/11-case-exposure-response';
import Slide13CaseImpact from './slides/13-case-impact';
import Slide13bCaseGeography from './slides/13b-case-geography';
import Slide14CaseBridge from './slides/14-case-bridge';
// Slide14bCaseRecap · 2026-04-25 D5 insert: V3 S16 framework recap.
//   Closes CS1 by mapping the case back to S04's five-theme framework.
//   Sits AFTER the bridge so the chronological narrative closes first
//   ("methodology travels to ICH E11A"), then the analytical narrative
//   closes second ("four themes exercised — same five judgments coming").
import Slide14bCaseRecap from './slides/14b-case-recap';

import Slide15Case2Divider from './slides/15-case2-divider';
import Slide16Case2Background from './slides/16-case2-background';
import Slide17Case2ChallengeTurn from './slides/17-case2-challenge-turn';
import Slide18Case2Strategy from './slides/18-case2-strategy';
import Slide19Case2Pillar6 from './slides/19-case2-pillar6';
import Slide20Case2Pillars15 from './slides/20-case2-pillars-1-5';
import Slide21Case2Response from './slides/21-case2-response';
import Slide22Case2ImpactBridge from './slides/22-case2-impact-bridge';

import Slide23Case3Divider from './slides/23-case3-divider';
import Slide24Case3Challenge from './slides/24-case3-challenge';
import Slide25Case3Strategy from './slides/25-case3-strategy';
import Slide26Case3FdaEngagement from './slides/26-case3-fda-engagement';
import Slide27Case3Fit from './slides/27-case3-fit';
import Slide28Case3Impact from './slides/28-case3-impact';
import Slide29Case3Bridge from './slides/29-case3-bridge';

import Slide30ClosingDivider from './slides/30-closing-divider';
import Slide31BreadthTherapeuticAreas from './slides/31-breadth-therapeutic-areas';
import Slide32RecordAtScale from './slides/32-record-at-scale';
import Slide33LeadershipPrinciples from './slides/33-leadership-principles';
import Slide34InClosing from './slides/34-in-closing';
import Slide35ThankYou from './slides/35-thank-you';

import notes from './notes';

const manifest = {
  id: 'qp2-seminar-v2',
  title: 'Quantitative Pharmacology in Action · v2',
  subtitle: 'Working draft · QP2 Seminar · Spring 2026',
  theme: 'clinical',
  notes,
  defaultTransition: 'card',
  /**
   * Export timing — only long-motion slides need a high `slideSettleMs`.
   * Everything else uses `defaultSettleMs` (fast path). Two new entries
   * for the V2 inserts (07b precedents · 13b geography) — both use the
   * SlideFrame two-column idiom which fully settles by ~3.0s.
   */
  export: {
    defaultSettleMs: 2400,
    slideSettleMs: {
      title: 1800,
      hook: 4800,
      'case-divider': 1500,
      'case2-divider': 1500,
      'case3-divider': 1500,
      'closing-divider': 1600,
      'case-precedents': 3000,
      'case-trial-design': 3200,
      'case-strategy-evidence': 3200,
      'case-fit-bridge': 4400,
      'case-bridge': 5200,
      'case-recap': 2800,
      'case-geography': 3000,
      'case2-impact-bridge': 5200,
      'case3-bridge': 5200,
      'thank-you': 5800,
      'career-arc': 4000,
      'framework-themes': 3000,
      'case-challenge': 3500,
      'case2-response': 3600,
      'case3-strategy': 3200,
      'record-at-scale': 4000,
      'in-closing': 4000,
    },
  },
  slides: [
    { id: 'title', title: 'Three cases · the model becomes the evidence', component: Slide01Title },
    { id: 'hook', title: 'Sildenafil trauma · STARTS-2 · HR 3.95', component: Slide02Hook },
    { id: 'career-arc', title: 'Career arc · one through-line question', component: Slide03CareerArc },
    { id: 'framework-themes', title: 'Framework · five recurring themes', component: Slide04FrameworkThemes },

    { id: 'case-divider', title: 'CS1 · Ambrisentan · pediatric PAH', component: Slide05CaseDivider },
    { id: 'case-background', title: 'CS1 · adult standard of care · pediatric question open', component: Slide06CaseBackground },
    { id: 'case-challenge', title: 'CS1 · the challenge — rarity · ethics', component: Slide07CaseChallenge },
    { id: 'case-precedents', title: 'CS1 · precedents — Sildenafil · Bosentan', component: Slide07bCasePrecedents },
    { id: 'case-strategy', title: 'CS1 · strategy — ICH E11 extrapolation', component: Slide08CaseStrategy },
    { id: 'case-strategy-evidence', title: 'CS1 · strategy evidence — decision diagnostics', component: Slide08cCaseStrategyVisuals },
    { id: 'case-trial-design', title: 'CS1 · trial design — AMB112529 protocol', component: Slide08bCaseTrialDesign },
    { id: 'case-build', title: 'CS1 · build — sequential PopPK with allometry', component: Slide09CaseBuild },
    // case-fit-bridge (2026-04-25) — collapses the old pcVPC slide + AUC-only
    // panel of the exposure-match slide into a single two-panel "fit + bridge"
    // beat. Cmax box plots + subgroup flag moved to the next slide (safety).
    { id: 'case-fit-bridge', title: 'CS1 · fit + bridge — pcVPC validates · AUC inside adult envelope', component: Slide10CaseFitBridge },
    { id: 'case-exposure-response', title: 'CS1 · safety E-R — flat across exposure range', component: Slide11CaseExposureResponse },
    { id: 'case-geography', title: 'CS1 · commercial geography — Letairis vs Volibris', component: Slide13bCaseGeography },
    { id: 'case-impact-numerals', title: 'CS1 · impact — two regulators converged', component: Slide13CaseImpact },
    { id: 'case-bridge', title: 'CS1 · bridge — Sotatercept · MOONBEAM · ICH E11A', component: Slide14CaseBridge },
    { id: 'case-recap', title: 'CS1 · recap — four framework themes exercised', component: Slide14bCaseRecap },

    { id: 'case2-divider', title: 'Case 02 · Tibsovo · India', component: Slide15Case2Divider },
    { id: 'case2-background', title: 'CS2 background · 42 countries · India empty', component: Slide16Case2Background },
    { id: 'case2-challenge-turn', title: 'CS2 the turn · 10 Dec 2024 SEC objection', component: Slide17Case2ChallengeTurn },
    { id: 'case2-strategy', title: 'CS2 strategy · mechanism-first · six pillars', component: Slide18Case2Strategy },
    { id: 'case2-pillar6', title: 'CS2 pillar 6 · ICH E5(R1) Appendix D · 9 of 9', component: Slide19Case2Pillar6 },
    { id: 'case2-pillars-1-5', title: 'CS2 pillars 1-5 · convergence · 84.6% ≈ 84.4%', component: Slide20Case2Pillars15 },
    { id: 'case2-response', title: 'CS2 response · regulatory timeline · 27 Mar SEC', component: Slide21Case2Response },
    { id: 'case2-impact-bridge', title: 'CS2 impact + bridge · approval · launch · → CS3', component: Slide22Case2ImpactBridge },

    { id: 'case3-divider', title: 'Case 03 · Asparlas · SPARK-ALL', component: Slide23Case3Divider },
    { id: 'case3-challenge', title: 'CS3 challenge · 94 adults isn’t feasible', component: Slide24Case3Challenge },
    { id: 'case3-strategy', title: 'CS3 strategy · two innovations stacked', component: Slide25Case3Strategy },
    { id: 'case3-fda-engagement', title: 'CS3 FDA · agreed N=60 (−36%)', component: Slide26Case3FdaEngagement },
    { id: 'case3-fit', title: 'CS3 fit · sixty adults are enough', component: Slide27Case3Fit },
    { id: 'case3-impact', title: 'CS3 impact · 36% · precedent · template', component: Slide28Case3Impact },
    { id: 'case3-bridge', title: 'CS3 bridge · themes recap · → closing', component: Slide29Case3Bridge },

    { id: 'closing-divider', title: 'Act IV · Beyond the three cases', component: Slide30ClosingDivider },
    { id: 'breadth-therapeutic-areas', title: 'Breadth · six clinical domains', component: Slide31BreadthTherapeuticAreas },
    { id: 'record-at-scale', title: 'Twelve years · the record at scale', component: Slide32RecordAtScale },
    { id: 'leadership-principles', title: 'Leadership · three principles + AI/ML', component: Slide33LeadershipPrinciples },
    { id: 'in-closing', title: 'In closing · three takeaways', component: Slide34InClosing },
    { id: 'thank-you', title: 'Thank you · questions welcome', component: Slide35ThankYou },
  ],
};

export default manifest;
