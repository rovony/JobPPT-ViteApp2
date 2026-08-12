// @ts-nocheck
/**
 * v7-xencor — full Xencor Senior Director deck (story-flows order).
 * Presentation: Intro → CS1 → India → Asparlas → Pharazi → Synthesis → Bridge → Close
 */
import TitleSlide from './slides/intro/01-title';
import HookSlide from './slides/intro/02-hook';
import CareerArc from './slides/intro/03-career-arc';
import Roadmap from './slides/intro/04-roadmap';

import Cs1Divider from './slides/cs1/D-divider';
import Cs1Pivot from './slides/cs1/01a-pivot';
import Cs1Decision from './slides/cs1/01-decision';
import Cs1Reality from './slides/cs1/02-reality';
import Cs1Strategy from './slides/cs1/03-strategy';
import Cs1Credibility from './slides/cs1/04-credibility';
import Cs1Boundary from './slides/cs1/05-boundary';
import Cs1Landing from './slides/cs1/06-landing';
import Cs1Lesson from './slides/cs1/07-lesson';
import Cs1Mechanism from './slides/cs1/07b-cs1-mechanism';
import Cs1BackupB17 from './slides/cs1/cs1-B17-covariate-analysis';

import Cs3Divider from './slides/cs3-india/00-divider';
import Cs3Setup from './slides/cs3-india/01-setup';
import Cs3Rule101 from './slides/cs3-india/02-rule101';
import Cs3Pillars from './slides/cs3-india/03-pillars';
import Cs3Population from './slides/cs3-india/04-population';
import Cs3Reversal from './slides/cs3-india/05-reversal';
import Cs3Reckoning from './slides/cs3-india/06-reckoning';
import Cs3Leadership from './slides/cs3-india/07-leadership';
import Cs3Bridge from './slides/cs3-india/08-bridge';

import Cs2AspDivider from './slides/cs2-asparlas/00-divider';
import Cs2AspChallenge from './slides/cs2-asparlas/01-challenge';
import Cs2AspStrategy from './slides/cs2-asparlas/02-strategy';
import Cs2AspFit from './slides/cs2-asparlas/03-fit';
import Cs2AspFda from './slides/cs2-asparlas/04-fda';
import Cs2AspImpact from './slides/cs2-asparlas/05-impact';

import Cs4Divider from './slides/cs4-pharazi/00-divider';
import Cs4Floor from './slides/cs4-pharazi/01-floor';
import Cs4Gap from './slides/cs4-pharazi/02-gap';
import Cs4WorkingOverview from './slides/cs4-pharazi/03-working-overview';
import Cs4PoppkDashboard from './slides/cs4-pharazi/04-poppk-dashboard';
import Cs4PublicationClose from './slides/cs4-pharazi/05-publication-close';

import CloseDivider from './slides/outro/00-close-divider';
import Synthesis from './slides/outro/01-synthesis';
import XencorBridge from './slides/outro/02-xencor-bridge';
import ClosingThanks from './slides/outro/03-thanks';

import notes from './notes';

const manifest = {
  id: 'v7-xencor',
  title: 'Xencor · Senior Director Pharmacometrics',
  subtitle: 'Decision-first proofs when measurement falls short',
  // Light editorial paper — matches CS1 quality-bar references (dense Swiss boards).
  theme: 'light-editorial',
  themeMode: 'light',
  kind: 'presentation',
  notes,
  defaultTransition: 'card',
  standardLayout: {
    enabled: true,
    footer: {
      line: true,
      text: 'Xencor · Senior Director · August 12 2026',
      showSlideNumber: true,
      showTime: false,
    },
  },
  export: {
    defaultSettleMs: 1300,
    slideSettleMs: {},
  },
  slides: [
    // Intro (~4:30)
    { id: 'title', title: 'Title', component: TitleSlide, isTitle: true, transition: 'fade', time: 45 },
    { id: 'hook', title: 'Hook · four constraints', component: HookSlide, isTitle: false, transition: 'fade', time: 75 },
    { id: 'career-arc', title: 'Career arc', component: CareerArc, isTitle: false, transition: 'fade', time: 60 },
    { id: 'roadmap', title: 'Roadmap', component: Roadmap, isTitle: false, transition: 'fade', time: 70 },

    // CS1 Ambrisentan (~16–17 min) — harvest: Xencor-Deck + NotebookLM + Swiss density
    { id: 'cs1-divider', title: 'CS1 · Ambrisentan', component: Cs1Divider, isTitle: true, transition: 'fade', time: 20 },
    { id: 'cs1-pivot', title: 'CS1 · pivot', component: Cs1Pivot, isTitle: false, transition: 'fade', time: 55 },
    { id: 'cs1-decision', title: 'CS1 · decision', component: Cs1Decision, isTitle: false, transition: 'fade', time: 70, steps: 3 },
    { id: 'cs1-reality', title: 'CS1 · structural impossibility', component: Cs1Reality, isTitle: false, transition: 'fade', time: 110 },
    { id: 'cs1-strategy', title: 'CS1 · architecture', component: Cs1Strategy, isTitle: false, transition: 'fade', time: 140, steps: 2 },
    { id: 'cs1-credibility', title: 'CS1 · concordance + honesty', component: Cs1Credibility, isTitle: false, transition: 'fade', time: 130, steps: 2 },
    { id: 'cs1-boundary', title: 'CS1 · decision boundary', component: Cs1Boundary, isTitle: false, transition: 'fade', time: 100 },
    { id: 'cs1-landing', title: 'CS1 · agencies + objection', component: Cs1Landing, isTitle: false, transition: 'fade', time: 130, steps: 2 },
    { id: 'cs1-lesson', title: 'CS1 · transfer + India seam', component: Cs1Lesson, isTitle: false, transition: 'fade', time: 90, steps: 2 },

    // CS3 India (~11 min) — presentation position 2
    { id: 'cs3-ivosidenib-divider', title: 'CS3 · Ivosidenib India', component: Cs3Divider, isTitle: true, transition: 'fade', time: 25 },
    { id: 'cs3-setup', title: 'CS3 · setup', component: Cs3Setup, isTitle: false, transition: 'fade', time: 80 },
    { id: 'cs3-bg-regulatory', title: 'CS3 · Rule 101', component: Cs3Rule101, isTitle: false, transition: 'fade', time: 80 },
    { id: 'cs3-pillars', title: 'CS3 · six pillars', component: Cs3Pillars, isTitle: false, transition: 'fade', time: 100 },
    { id: 'cs3-B4-population-evidence', title: 'CS3 · population kill-tests', component: Cs3Population, isTitle: false, transition: 'fade', time: 70, steps: 2 },
    { id: 'cs3-reversal', title: 'CS3 · reversal', component: Cs3Reversal, isTitle: false, transition: 'fade', time: 80 },
    { id: 'cs3-reckoning', title: 'CS3 · reckoning', component: Cs3Reckoning, isTitle: false, transition: 'fade', time: 80 },
    { id: 'cs3-leadership', title: 'CS3 · leadership', component: Cs3Leadership, isTitle: false, transition: 'fade', time: 100 },
    { id: 'cs3-bridge-recap', title: 'CS3 · bridge recap', component: Cs3Bridge, isTitle: false, transition: 'fade', time: 45 },

    // CS2 Asparlas (~7 min) — presentation position 3
    { id: 'cs2-asp-divider', title: 'CS2 · Asparlas', component: Cs2AspDivider, isTitle: true, transition: 'fade', time: 20 },
    { id: 'cs2-asp-challenge', title: 'CS2 · challenge', component: Cs2AspChallenge, isTitle: false, transition: 'fade', time: 70 },
    { id: 'cs2-asp-strategy', title: 'CS2 · strategy', component: Cs2AspStrategy, isTitle: false, transition: 'fade', time: 80 },
    { id: 'cs2-asp-fit', title: 'CS2 · fit', component: Cs2AspFit, isTitle: false, transition: 'fade', time: 80 },
    { id: 'cs2-asp-fda', title: 'CS2 · FDA', component: Cs2AspFda, isTitle: false, transition: 'fade', time: 70 },
    { id: 'cs2-asp-impact', title: 'CS2 · impact', component: Cs2AspImpact, isTitle: false, transition: 'fade', time: 60 },

    // CS4 Pharazi (~3 min)
    { id: 'cs2-pharazi-divider', title: 'CS4 · Pharazi', component: Cs4Divider, isTitle: true, transition: 'fade', time: 20 },
    { id: 'cs2-regulatory-floor', title: 'CS4 · regulatory floor', component: Cs4Floor, isTitle: false, transition: 'fade', time: 40 },
    { id: 'cs2-gap', title: 'CS4 · gap', component: Cs4Gap, isTitle: false, transition: 'fade', time: 35 },
    { id: 'cs2-working-overview', title: 'CS4 · working overview', component: Cs4WorkingOverview, isTitle: false, transition: 'fade', time: 35 },
    { id: 'cs2-poppk-dashboard', title: 'CS4 · PopPK dashboard', component: Cs4PoppkDashboard, isTitle: false, transition: 'fade', time: 50 },
    { id: 'cs2-publication-close', title: 'CS4 · publication close', component: Cs4PublicationClose, isTitle: false, transition: 'fade', time: 30 },

    // Outro
    { id: 'cs4-close-divider', title: 'Cases closed', component: CloseDivider, isTitle: true, transition: 'fade', time: 15 },
    { id: 'synthesis', title: 'Synthesis', component: Synthesis, isTitle: false, transition: 'fade', time: 90 },
    { id: 'xencor-bridge', title: 'Xencor bridge', component: XencorBridge, isTitle: false, transition: 'fade', time: 60 },
    { id: 'closing-thanks', title: 'Close', component: ClosingThanks, isTitle: true, transition: 'fade', time: 30 },

    // Backups
    { id: 'cs1-mechanism', title: 'Backup · CS1 mechanism', component: Cs1Mechanism, isTitle: false, transition: 'fade', time: 35, backup: true },
    { id: 'cs1-B17-covariate-analysis', title: 'Backup · CS1 covariates', component: Cs1BackupB17, isTitle: false, transition: 'fade', time: 55, backup: true },
  ],
};

export default manifest;
