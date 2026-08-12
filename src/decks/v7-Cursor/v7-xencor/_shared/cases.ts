// @ts-nocheck
/**
 * Shared CASES data — presentation order (story-flows 00):
 * Ambrisentan → India → Asparlas → Pharazi
 */

export const CASES = [
  {
    id: 1,
    label: 'CASE 01 · AMBRISENTAN · PEDIATRIC PAH',
    shortLabel: 'Case 01 · Ambrisentan',
    shortTitle: 'Pediatric PAH dose',
    title: 'Exposure-matched dose when the pediatric efficacy trial cannot carry the answer.',
    note: 'Approved by EMA + PMDA.',
    color: 'var(--coral)',
    dotX: 170,
    dotY: 18,
    labelX: 235,
    labelText: 'CMAX',
    hookBadgeLabel: 'UNTRIALABLE',
  },
  {
    id: 2,
    label: 'CASE 02 · IVOSIDENIB · INDIA RELIANCE',
    shortLabel: 'Case 02 · Ivosidenib India',
    shortTitle: 'India reliance',
    title: 'A local-trial waiver defended through convergent global evidence.',
    note: 'CDSCO · cross-functional under pressure.',
    color: 'var(--cyan)',
    dotX: 390,
    dotY: 96,
    labelX: 450,
    labelText: 'TRANSPORT',
    hookBadgeLabel: 'LOCAL-EVIDENCE',
  },
  {
    id: 3,
    label: 'CASE 03 · ASPARLAS · EFFICIENT DESIGN',
    shortLabel: 'Case 03 · Asparlas',
    shortTitle: 'Efficient adult design',
    title: 'A defensible adult design when the endpoint-powered trial is not feasible.',
    note: 'FDA Type A agreement.',
    color: 'var(--teal)',
    dotX: 610,
    dotY: 158,
    labelX: 670,
    labelText: 'PRECISION',
    hookBadgeLabel: 'SAMPLE-LIMITED',
  },
  {
    id: 4,
    label: 'CASE 04 · AI / ML · PHARAZI',
    shortLabel: 'Case 04 · Pharazi',
    shortTitle: 'Traceable AI',
    title: 'Audit-ready clinical pharmacology workflows when the evidence system must scale.',
    note: 'Personal research — not sponsor deployment.',
    color: 'var(--sage)',
    dotX: 770,
    dotY: 184,
    labelX: 820,
    labelText: 'AUDIT',
    hookBadgeLabel: 'UNBUILT',
  },
];

export default CASES;
