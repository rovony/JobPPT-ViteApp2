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
import Slide14Case2 from './slides/14-case2-divider';
import Slide15Case2Challenge from './slides/15-case2-challenge';
import Slide16Case2Strategy from './slides/16-case2-strategy';
import Slide17Case2Build from './slides/17-case2-build';
import Slide18Case2Fit from './slides/18-case2-fit';
import Slide19Case2Decision from './slides/19-case2-decision';
import Slide20Case2Impact from './slides/20-case2-impact';

const manifest = {
  id: 'qp2-seminar',
  title: 'Quantitative Pharmacology in Action',
  subtitle: 'QP2 Seminar · Spring 2026',
  theme: 'clinical',
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
    { id: 'case2-challenge', title: 'CS2 challenge · India required local data', component: Slide15Case2Challenge },
    { id: 'case2-strategy', title: 'CS2 strategy · six pillars', component: Slide16Case2Strategy },
    { id: 'case2-build', title: 'CS2 build · six pillars converged', component: Slide17Case2Build },
    { id: 'case2-fit', title: 'CS2 fit · weight explains the gap', component: Slide18Case2Fit },
    { id: 'case2-decision', title: 'CS2 decision · mechanism is ethnicity-independent', component: Slide19Case2Decision },
    { id: 'case2-impact', title: 'CS2 impact · pre → post conversion', component: Slide20Case2Impact },
  ],
};

export default manifest;