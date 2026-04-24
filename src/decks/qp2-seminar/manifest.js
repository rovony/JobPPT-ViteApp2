/**
 * qp2-seminar manifest — 35 slides, canonical numbering.
 *
 * As of the Apr 24 rename pass, every slide file is numbered to its
 * actual presentation position. Variable names below also follow the
 * Slide{NN}{Topic} convention so a future reader can trace
 * filename → import → manifest entry without translation tables.
 *
 * Sub-component folders that hang off a slide (e.g. `cs1-build/`,
 * `closing-divider/`, `hook/`) are deliberately NOT renumbered —
 * they're keyed by case/section, not by slide position, so their
 * names survive future re-orderings.
 */

import Slide01Title from './slides/01-title';
import Slide02Hook from './slides/02-hook';
import Slide03CareerArc from './slides/03-career-arc';
import Slide04FrameworkThemes from './slides/04-framework-themes';

import Slide05CaseDivider from './slides/05-case-divider';
import Slide06CaseBackground from './slides/06-case-background';
import Slide07CaseChallenge from './slides/07-case-challenge';
import Slide08CaseStrategy from './slides/08-case-strategy';
import Slide09CaseBuild from './slides/09-case-build';
import Slide10CaseFit from './slides/10-case-fit-pcvpc';
import Slide11CaseExposureMatch from './slides/11-case-exposure-match';
import Slide12CaseExposureResponse from './slides/12-case-exposure-response';
import Slide13CaseImpact from './slides/13-case-impact';
import Slide14CaseBridge from './slides/14-case-bridge';

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
  id: 'qp2-seminar',
  title: 'Quantitative Pharmacology in Action',
  subtitle: 'QP2 Seminar · Spring 2026',
  theme: 'clinical',
  // Static, version-controlled speaker notes keyed by slide id.
  // useSpeakerNotes treats these as fallbacks under live (DB) edits.
  notes,
  // Deck-wide default. The `card` preset gives a flat, fast slide-to-side
  // card-flip experience — no 3D rotation, no depth travel. Slides feel
  // like physical cards moving through the canvas. Individual slides can
  // still opt into heavier presets if a beat calls for it.
  defaultTransition: 'card',
  slides: [
    { id: 'title', title: 'Title', component: Slide01Title },
    { id: 'hook', title: 'The asymmetry · Four agencies', component: Slide02Hook },
    { id: 'career-arc', title: 'Career arc · Jordan → Servier', component: Slide03CareerArc },
    { id: 'framework-themes', title: 'Framework · Five recurring themes', component: Slide04FrameworkThemes },

    { id: 'case-divider', title: 'Case · Ambrisentan', component: Slide05CaseDivider },
    { id: 'case-background', title: 'Background · the disease and the drug', component: Slide06CaseBackground },
    { id: 'case-challenge', title: 'The challenge', component: Slide07CaseChallenge },
    { id: 'case-strategy', title: 'Strategy · three decisions', component: Slide08CaseStrategy },
    { id: 'case-build', title: 'Build · sequential workflow', component: Slide09CaseBuild },
    { id: 'case-fit-pcvpc', title: 'Model fit · pcVPC', component: Slide10CaseFit },
    { id: 'case-exposure-match', title: 'Exposure match · AUC + Cmax', component: Slide11CaseExposureMatch },
    { id: 'case-exposure-response', title: 'Exposure–Response · null signal', component: Slide12CaseExposureResponse },
    { id: 'case-impact-numerals', title: 'Impact · two regulators approved', component: Slide13CaseImpact },
    { id: 'case-bridge', title: 'Bridge · themes exercised · CS1 → CS2', component: Slide14CaseBridge },

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
