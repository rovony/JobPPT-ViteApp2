import Cs1Divider from './slides/D-divider';
import Cs1Decision from './slides/01-decision';
import Cs1Reality from './slides/02-reality';
import Cs1Strategy from './slides/03-strategy';
import Cs1Credibility from './slides/04-credibility';
import Cs1Boundary from './slides/05-boundary';
import Cs1Landing from './slides/06-landing';
import Cs1Lesson from './slides/07-lesson';

// Backup only — not on the main spine
import Cs1Mechanism from './slides/07b-cs1-mechanism';
import Cs1BackupB17CovariateAnalysis from './slides/cs1-B17-covariate-analysis';

import notes from './notes';

/**
 * Story-flow primary spine (01-CS1-Ambrisentan-Story-Flow.md § Main-slide spine):
 * 7 content slides + divider · ~16 min spoken.
 * Merged beats: 2–3, 4+rejected, 5 concordance+falsify, 7–8 influence+outcome.
 */
const manifest = {
  id: 'v7-xencor-cs1',
  title: 'Case 01 · Ambrisentan',
  subtitle: 'Defending a pediatric dose after the efficacy path failed',
  theme: 'clinical',
  kind: 'section',
  notes,
  defaultTransition: 'card',
  standardLayout: {
    enabled: true,
    footer: {
      line: true,
      text: 'Xencor · CS1 Ambrisentan · August 12 2026',
      showSlideNumber: true,
      showTime: false,
    },
  },
  export: {
    defaultSettleMs: 1300,
    slideSettleMs: {},
  },
  slides: [
    { id: 'cs1-divider', title: 'Case 01 · Ambrisentan', component: Cs1Divider, isTitle: true, transition: 'fade', time: 20 },
    { id: 'cs1-decision', title: 'CS1 · decision', component: Cs1Decision, isTitle: false, transition: 'fade', time: 70 },
    { id: 'cs1-reality', title: 'CS1 · data + hypothesis', component: Cs1Reality, isTitle: false, transition: 'fade', time: 120 },
    { id: 'cs1-strategy', title: 'CS1 · strategy + refused', component: Cs1Strategy, isTitle: false, transition: 'fade', time: 150 },
    { id: 'cs1-credibility', title: 'CS1 · concordance + kill tests', component: Cs1Credibility, isTitle: false, transition: 'fade', time: 160 },
    { id: 'cs1-boundary', title: 'CS1 · decision boundary', component: Cs1Boundary, isTitle: false, transition: 'fade', time: 120 },
    { id: 'cs1-landing', title: 'CS1 · influence + outcome', component: Cs1Landing, isTitle: false, transition: 'fade', time: 140 },
    { id: 'cs1-lesson', title: 'CS1 · lesson + India seam', component: Cs1Lesson, isTitle: false, transition: 'fade', time: 80 },

    { id: 'cs1-mechanism', title: 'Backup · pathway + drug', component: Cs1Mechanism, isTitle: false, transition: 'fade', time: 35, backup: true },
    { id: 'cs1-B17-covariate-analysis', title: 'Backup · covariate analysis', component: Cs1BackupB17CovariateAnalysis, isTitle: false, transition: 'fade', time: 55, backup: true },
  ],
};

export default manifest;
