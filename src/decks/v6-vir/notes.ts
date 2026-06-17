import qp2Notes from '../qp2-seminar-v4/notes';
import asparlasNotes from '../qp2-seminar/notes';
import pharosNotes from '../pharos-seminar/notes';
import cs3Notes from './cs3-notes';
import { overrideNotes } from './override-notes';

const pharosIdMap: Record<string, string> = {
  '03-regulatory-floor': 'cs2-regulatory-floor',
  '04-market-moving': 'cs2-market-moving',
  '05-gap': 'cs2-gap',
  '06-transition': 'cs2-transition',
  '07-principle1': 'cs2-principle1',
  '08-principle2': 'cs2-principle2',
  '09-principle3': 'cs2-principle3',
  '10-principle4': 'cs2-principle4',
  '11-principle5': 'cs2-principle5',
  '12-5-m3-begins': 'cs2-m3-begins',
  '12a-working-overview': 'cs2-working-overview',
  '12b-working-audit': 'cs2-working-audit',
  '13-component-nca': 'cs2-component-nca',
  '14-component-dataflow': 'cs2-component-dataflow',
  '15-component-audit': 'cs2-component-audit',
  '16-poppk-dashboard': 'cs2-poppk-dashboard',
  '17-component-sop': 'cs2-component-sop',
  '18-regulatory-dashboard': 'cs2-regulatory-dashboard',
  '19-e2e-audit-dashboard': 'cs2-e2e-audit',
  '20-synthesis-dossier': 'cs2-synthesis-dossier',
  '21-synthesis-trace': 'cs2-synthesis-trace',
  '22-publication-close': 'cs2-publication-close',
};

const asparlasIdMap: Record<string, string> = {
  'case3-divider': 'cs2-asp-divider',
  'case3-challenge': 'cs2-asp-challenge',
  'case3-strategy': 'cs2-asp-strategy',
  'case3-fda-engagement': 'cs2-asp-fda',
  'case3-fit': 'cs2-asp-fit',
  'case3-impact': 'cs2-asp-impact',
  'case3-bridge': 'cs2-asp-bridge',
};

const validNoteIds = [
  'title', 'hook-A-trial-not-answer', 'career-arc', 'roadmap', 'cs1-divider', 'cs1-question', 'cs1-context', 'cs1-mechanism',
  'cs1-trial', 'cs1-architecture', 'cs1-covariate-strategy', 'cs1-poppk', 'cs1-pkpd', 'cs1-outcome', 'cs1-bracket', 'cs1-lesson',
  'cs1-bridge', 'cs2-asp-divider', 'cs2-asp-challenge', 'cs2-asp-strategy', 'cs2-asp-fda', 'cs2-asp-fit', 'cs2-asp-impact',
  'cs2-asp-bridge', 'cs3-ivosidenib-divider', 'cs3-setup', 'cs3-bg-regulatory', 'cs3-pillars', 'cs3-reversal', 'cs3-reckoning',
  'cs3-leadership', 'cs3-bridge-recap', 'cs2-pharazi-divider', 'cs2-regulatory-floor', 'cs2-gap', 'cs2-working-overview',
  'cs2-poppk-dashboard', 'cs2-publication-close', 'portfolio-01', 'company-bridge-divider', 'company-bridge-oncology-problem',
  'company-bridge-oncology-approach', 'company-bridge-case-mapping', 'company-bridge-hbv-hdv', 'company-bridge-fit',
  'closing-thread', 'closing-fit', 'closing-thanks',
  'cs1-backup-master', 'cs1-backup-type-1-historical', 'cs1-backup-timeline-context', 'cs1-backup-timeline-amb-only', 'cs1-backup-timeline-program-detail', 'cs1-B10-endpoints', 'cs1-B20-full-story', 'cs1-backup-type-2-methodology',
  'cs1-B3-dosing', 'cs1-B5-allometry', 'cs1-B6-6mwd', 'cs1-B14-bayesian', 'cs1-B15-poppk-parameters', 'cs1-B16-model-diagnostics', 'cs1-B18-exposure-matching', 'cs1-backup-type-3-data-cuts',
  'cs1-B7-lte', 'cs1-B8-ddi', 'cs1-B12-hemodynamic', 'cs1-backup-type-4-risk-mitigation', 'cs1-B1-starts', 'cs1-B2-rat-finding', 'cs1-B4-fda-gap', 'cs1-backup-type-5-regulatory',
  'cs1-B9-e11a', 'cs1-B11-garnett-florian', 'cs1-B13-pip', 'cs1-B19-ema-addendum-2026', 'ai-backup-master', 'cs2-market-moving', 'cs2-transition', 'cs2-principle1',
  'cs2-principle2', 'cs2-principle3', 'cs2-principle4', 'cs2-principle5', 'cs2-m3-begins', 'cs2-working-audit', 'cs2-component-nca', 'cs2-component-dataflow',
  'cs2-component-audit', 'cs2-component-sop', 'cs2-regulatory-dashboard', 'cs2-e2e-audit', 'cs2-synthesis-dossier', 'cs2-synthesis-trace', 'cs2-interactive-dossier', 'cs3-backup-master',
  'cs3-ivosidenib-divider', 'cs3-bg-disease', 'cs3-disease', 'cs3-competitors', 'cs3-bg-regulatory', 'cs3-setup', 'cs3-architecture-v2', 'cs3-pillars',
  'cs3-reversal', 'cs3-reckoning', 'cs3-leadership', 'cs3-bridge-recap', 'cs3-backup-type-1-historical', 'cs3-B1-cdsco-timeline', 'cs3-backup-type-2-methodology', 'cs3-B2-six-pillar-package',
  'cs3-B3-phase1-dose-rationale', 'cs3-backup-type-3-data-cuts', 'cs3-B4-population-evidence',
];

const mappedPharosNotes = Object.entries(pharosNotes).reduce((acc, [key, value]) => {
  const mappedId = pharosIdMap[key];
  if (mappedId) acc[mappedId] = value;
  return acc;
}, {} as Record<string, string>);

const mappedAsparlasNotes = Object.entries(asparlasNotes).reduce((acc, [key, value]) => {
  const mappedId = asparlasIdMap[key];
  if (mappedId) acc[mappedId] = value;
  return acc;
}, {} as Record<string, string>);

const baseNotes: Record<string, string> = {
  ...qp2Notes,
  ...mappedAsparlasNotes,
  ...cs3Notes,
  ...mappedPharosNotes,
  ...overrideNotes,
};

const fallbackNote = (id: string) => `## Spoken
Reference-only supporting detail.

Use this only if the panel asks for this supporting detail. Keep the answer tied back to the main thesis: when measurement falls short, clinical pharmacology makes the dose defensible.

## Cues
Optional backup. Do not volunteer this unless it answers a live question.

## Bridge
Return to the current discussion or Q&A.`;

const notes = Object.fromEntries(
  validNoteIds.map((id) => [id, baseNotes[id] ?? fallbackNote(id)])
);

export default notes;
