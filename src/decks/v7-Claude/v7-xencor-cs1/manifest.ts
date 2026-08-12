/**
 * v7-xencor-cs1 — Case 01 · Ambrisentan, built as a standalone case deck.
 *
 * Plan: Xencor/story-flows/plans/xencor-aug26-cs1-plan.md
 * Flow: Xencor/story-flows/01-CS1-Ambrisentan-Story-Flow.md
 *
 * Shape change vs v7-xencor's CS1 block: 13 slides averaging 46 s became
 * 12 slides averaging 79 s. Short slides force a setup → method → result
 * rhythm because no slide has room to state a decision and then earn it.
 *
 * Seven slides are new (decision, data reality, hypotheses, strategy,
 * falsification, boundary, lesson+bridge). Five are reused by import from
 * v7-xencor — including two that were built there and never wired into any
 * manifest: 10-cs1-results (the two-precedent architecture) and
 * 13-cs1-verdict (the exposure-match result). Both were exactly the beats
 * the flow said had no surface.
 *
 * Dropped from the main flow: cs1-mechanism (pathway biology — not one of
 * the nine beats) and cs1-covariate-strategy (a live wrapper around a
 * backup slide — depth with no decision attached). Both remain available
 * in v7-xencor.
 */
import notes from './notes';
import qa from './qa';

// New slides for this case deck
import Cs1Decision from './slides/01-decision';
import Cs1DataReality from './slides/02-data-reality';
import Cs1Hypotheses from './slides/03-hypotheses';
import Cs1Strategy from './slides/04-strategy';
import Cs1Falsification from './slides/07-falsification';
import Cs1Boundary from './slides/08-boundary';
import Cs1LessonBridge from './slides/11-lesson-bridge';

// Reused from v7-xencor (imported, not copied — single source of truth)
import Cs1Divider from '../../v7-xencor/slides/05-cs1-divider';
import Cs1Alternatives from '../../v7-xencor/slides/10-cs1-results';
import Cs1Concordance from '../../v7-xencor/slides/13-cs1-verdict';
import Cs1Influence from '../../v7-xencor/slides/12-cs1-bracket';
import Cs1Outcome from '../../v7-xencor/slides/11-cs1-outcome';

const manifest = {
  // Distinct from any other CS1 case deck in the registry — deck ids are the
  // URL and must be unique; folder name stays v7-Claude/v7-xencor-cs1.
  id: 'v7-claude-cs1',
  title: 'Case 01 · Ambrisentan',
  subtitle: 'Defending a pediatric dose when the efficacy trial could not carry the answer',
  theme: 'clinical',
  kind: 'case-study',
  notes,
  qa,
  reading: [],
  defaultTransition: 'card',
  standardLayout: {
    enabled: true,
    footer: {
      line: true,
      text: 'Xencor seminar · Case 01 · August 2026',
      showSlideNumber: true,
      showTime: false,
    },
  },
  export: {
    defaultSettleMs: 1300,
    slideSettleMs: {},
  },
  // Times sum to 950 s = 15:50, inside the 15–17 min anchor budget.
  slides: [
    { id: 'cs1-divider',        title: 'Case 01 · Ambrisentan',                     component: Cs1Divider,        isTitle: true,  transition: 'fade', time: 20 },
    { id: 'cs1-decision',       title: 'CS1 · the decision + stakes',               component: Cs1Decision,       isTitle: false, transition: 'fade', time: 70 },
    { id: 'cs1-data-reality',   title: 'CS1 · why the data could not decide',       component: Cs1DataReality,    isTitle: false, transition: 'fade', time: 90 },
    { id: 'cs1-hypotheses',     title: 'CS1 · working vs competing hypothesis',     component: Cs1Hypotheses,     isTitle: false, transition: 'fade', time: 80 },
    { id: 'cs1-strategy',       title: 'CS1 · quantitative strategy',               component: Cs1Strategy,       isTitle: false, transition: 'fade', time: 100 },
    { id: 'cs1-alternatives',   title: 'CS1 · the path not taken',                  component: Cs1Alternatives,   isTitle: false, transition: 'fade', time: 70 },
    { id: 'cs1-concordance',    title: 'CS1 · exposure match · the result',         component: Cs1Concordance,    isTitle: false, transition: 'fade', time: 100 },
    { id: 'cs1-falsification',  title: 'CS1 · what would have killed confidence',   component: Cs1Falsification,  isTitle: false, transition: 'fade', time: 80 },
    { id: 'cs1-boundary',       title: 'CS1 · the decision boundary',               component: Cs1Boundary,       isTitle: false, transition: 'fade', time: 90 },
    { id: 'cs1-influence',      title: 'CS1 · alignment + ownership',               component: Cs1Influence,      isTitle: false, transition: 'fade', time: 100 },
    { id: 'cs1-outcome',        title: 'CS1 · outcome + the FDA gap',               component: Cs1Outcome,        isTitle: false, transition: 'fade', time: 80 },
    { id: 'cs1-lesson-bridge',  title: 'CS1 · lesson + bridge to India',            component: Cs1LessonBridge,   isTitle: false, transition: 'fade', time: 70 },
  ],
};

export default manifest;
