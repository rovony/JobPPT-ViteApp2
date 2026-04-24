import Slide01 from './slides/01-title';
import Slide02 from './slides/02-hook';
import SlideCareerArc from './slides/03-career-arc';
import Slide04FrameworkThemes from './slides/04-framework-themes';
import Slide10 from './slides/10-case-divider';
import Slide06bCaseBackground from './slides/06b-case-background';
import Slide11 from './slides/11-case-challenge';
import Slide11b from './slides/11b-case-strategy';
import Slide11c from './slides/11c-case-build';
import Slide11d from './slides/11d-case-fit';
import Slide11e from './slides/11e-case-exposure-match';
import Slide11f from './slides/11f-case-exposure-response';
// Slide 13 (impact numerals) lives in 13-case-impact.jsx.
// Slide 14 (bridge) lives in 14-case-bridge.jsx. Variable names kept
// as Slide12/Slide13 for now to avoid churn in the rest of the file.
import Slide12 from './slides/13-case-impact';
import Slide13 from './slides/14-case-bridge';
// CS2 (8-slide redesign per cs2-design.md)
//   1. case2-divider          ← 14-case2-divider
//   2. case2-background       ← 16-case2-background  (NEW)
//   3. case2-challenge-turn   ← 15-case2-challenge   (THE TURN · Dec 10 SEC)
//   4. case2-strategy         ← 16-case2-strategy    (mechanism-first · 6 pillars)
//   5. case2-pillar6          ← 17-case2-build       (ICH E5 Appendix D 9-criterion)
//   6. case2-pillars-1-5      ← 18-case2-fit         (84.6% ≈ 84.4% convergence)
//   7. case2-response         ← 19-case2-decision    (regulatory timeline · 27 Mar SEC)
//   8. case2-impact-bridge    ← 22-case2-bridge      (T7+T8 destinations · → CS3)
import Slide14Case2 from './slides/14-case2-divider';
import Slide16Case2Background from './slides/16-case2-background';
import Slide15Case2ChallengeTurn from './slides/15-case2-challenge';
import Slide16Case2Strategy from './slides/16-case2-strategy';
import Slide17Case2Pillar6 from './slides/17-case2-build';
import Slide18Case2Pillars15 from './slides/18-case2-fit';
import Slide19Case2Response from './slides/19-case2-decision';
import Slide22Case2ImpactBridge from './slides/22-case2-bridge';
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
    { id: 'title', title: 'Title', component: Slide01 },
    { id: 'hook', title: 'The asymmetry · Four agencies', component: Slide02 },
    { id: 'career-arc', title: 'Career arc · Jordan → Servier', component: SlideCareerArc },
    { id: 'framework-themes', title: 'Framework · Five recurring themes', component: Slide04FrameworkThemes },
    { id: 'case-divider', title: 'Case · Ambrisentan', component: Slide10 },
    { id: 'case-background', title: 'Background · the disease and the drug', component: Slide06bCaseBackground },
    { id: 'case-challenge', title: 'The challenge', component: Slide11 },
    { id: 'case-strategy', title: 'Strategy · three decisions', component: Slide11b },
    { id: 'case-build', title: 'Build · sequential workflow', component: Slide11c },
    { id: 'case-fit-pcvpc', title: 'Model fit · pcVPC', component: Slide11d },
    { id: 'case-exposure-match', title: 'Exposure match · AUC + Cmax', component: Slide11e },
    { id: 'case-exposure-response', title: 'Exposure–Response · null signal', component: Slide11f },
    { id: 'case-impact-numerals', title: 'Impact · two regulators approved', component: Slide12 },
    { id: 'case-bridge', title: 'Bridge · themes exercised · CS1 → CS2', component: Slide13 },
    { id: 'case2-divider', title: 'Case 02 · Tibsovo · India', component: Slide14Case2 },
    { id: 'case2-background', title: 'CS2 background · 42 countries · India empty', component: Slide16Case2Background },
    { id: 'case2-challenge-turn', title: 'CS2 the turn · 10 Dec 2024 SEC objection', component: Slide15Case2ChallengeTurn },
    { id: 'case2-strategy', title: 'CS2 strategy · mechanism-first · six pillars', component: Slide16Case2Strategy },
    { id: 'case2-pillar6', title: 'CS2 pillar 6 · ICH E5(R1) Appendix D · 9 of 9', component: Slide17Case2Pillar6 },
    { id: 'case2-pillars-1-5', title: 'CS2 pillars 1-5 · convergence · 84.6% ≈ 84.4%', component: Slide18Case2Pillars15 },
    { id: 'case2-response', title: 'CS2 response · regulatory timeline · 27 Mar SEC', component: Slide19Case2Response },
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