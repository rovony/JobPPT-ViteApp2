import Slide01 from './slides/01-principles';
import Slide02 from './slides/02-color';
import Slide03 from './slides/03-typography';
import Slide04 from './slides/04-motion';
import Slide05 from './slides/05-spacing';
import Slide06 from './slides/06-failure-modes-visual';
import Slide07 from './slides/07-failure-modes-structural';
import Slide08 from './slides/08-tone-register';
import Slide09 from './slides/09-case-study-deck';
import Slide10 from './slides/10-anti-patterns';

import Slide11 from './slides/11-motion-newspaper';
import Slide12 from './slides/12-motion-highlighter';
import Slide13 from './slides/13-motion-slide-from-top';
import Slide14 from './slides/14-motion-number-ramp';
import Slide15 from './slides/15-motion-annotation';
import Slide16 from './slides/16-case-pharmagent-1';
import Slide17 from './slides/17-case-pharmagent-2';
import Slide18 from './slides/18-case-pharmagent-3';
import Slide19 from './slides/19-case-pharmagent-5';
import Slide20 from './slides/20-case-pharmagent-6';

const manifest = {
  id: 'zaj-design-showcase',
  title: 'Zaj-Design System',
  subtitle: 'Credibility-first design for high-stakes deliverables',
  theme: 'keynote-noir',
  themeMode: 'dark',
  defaultTransition: 'pan',
  slides: [
    { id: 'principles', title: 'Principles', component: Slide01 },
    { id: 'color', title: 'Color System', component: Slide02 },
    { id: 'typography', title: 'Typography', component: Slide03 },
    { id: 'motion', title: 'Motion', component: Slide04 },
    { id: 'spacing', title: 'Layout Grid', component: Slide05 },
    { id: 'failure-visual', title: 'Visual Failures', component: Slide06 },
    { id: 'failure-structural', title: 'Structural Failures', component: Slide07 },
    { id: 'tone', title: 'Tone & Register', component: Slide08 },
    { id: 'multi-case', title: 'Multi-case Contract', component: Slide09 },
    { id: 'anti-patterns', title: 'Anti-patterns', component: Slide10 },
    { id: 'motion-newspaper', title: 'Motion: Newspaper Reveal', component: Slide11 },
    { id: 'motion-highlighter', title: 'Motion: Highlighter', component: Slide12 },
    { id: 'motion-slide-from-top', title: 'Motion: Slide From Top', component: Slide13 },
    { id: 'motion-number-ramp', title: 'Motion: Number Ramp', component: Slide14 },
    { id: 'motion-annotation', title: 'Motion: Annotation Arrow', component: Slide15 },
    { id: 'pharmagent-beat1', title: 'PharmAgent: The Problem', component: Slide16 },
    { id: 'pharmagent-beat2', title: 'PharmAgent: Privacy Boundary', component: Slide17 },
    { id: 'pharmagent-beat3', title: 'PharmAgent: Architecture', component: Slide18 },
    { id: 'pharmagent-beat5', title: 'PharmAgent: Audit Chain', component: Slide19 },
    { id: 'pharmagent-beat6', title: 'PharmAgent: The Close', component: Slide20 },
  ],
};

export default manifest;
