// @ts-nocheck
/**
 * Shared CASES data for the v7 Xencor seminar deck.
 *
 * Presentation order (FULL_SCOPE / portfolio jobs):
 *   1 Ambrisentan · 2 Ivosidenib India · 3 Asparlas · 4 Pharazi
 * Accents: var(--xc-case-N) from styles/xencor-deck.css (light + dark).
 *
 * Note: live manifest may still run Asparlas before India; tokens stay
 * keyed to narrative position, not legacy slide-id prefixes.
 */

export const CASES = [
  {
    id: 1,
    label: 'CASE 01 · AMBRISENTAN · PEDIATRIC PAH',
    shortLabel: 'Case 01 · Ambrisentan',
    shortTitle: 'Pediatric PAH dose',
    title: 'Exposure-matched dose when the pediatric efficacy trial cannot carry the answer.',
    note: 'Approved by EMA + PMDA.',
    color: 'var(--xc-case-1)',
    dotX: 170,
    dotY: 18,
    labelX: 235,
    labelText: 'CMAX',
    hookBadgeLabel: 'UNTRIALABLE',
  },
  {
    id: 2,
    label: 'CASE 02 · IVOSIDENIB · INDIA RELIANCE',
    shortLabel: 'Case 02 · Ivosidenib',
    shortTitle: 'India reliance',
    title: 'A local-trial waiver defended through convergent global evidence.',
    note: 'Cross-functional approval under pressure.',
    color: 'var(--xc-case-2)',
    dotX: 610,
    dotY: 158,
    labelX: 670,
    labelText: 'RELIANCE',
    hookBadgeLabel: 'LOCAL-EVIDENCE',
  },
  {
    id: 3,
    label: 'CASE 03 · ASPARLAS · EFFICIENT DESIGN',
    shortLabel: 'Case 03 · Asparlas',
    shortTitle: 'Efficient adult design',
    title: 'A defensible adult design when the endpoint-powered trial is not feasible.',
    note: 'FDA Type A agreement.',
    color: 'var(--xc-case-3)',
    dotX: 390,
    dotY: 96,
    labelX: 450,
    labelText: 'PRECISION',
    hookBadgeLabel: 'SAMPLE-LIMITED',
  },
  {
    id: 4,
    label: 'CASE 04 · AI / ML · PHARAZI',
    shortLabel: 'Case 04 · Pharazi',
    shortTitle: 'Traceable AI',
    title: 'Audit-ready clinical pharmacology workflows when the evidence system must scale.',
    note: 'Personal research platform.',
    color: 'var(--xc-case-4)',
    dotX: 770,
    dotY: 184,
    labelX: 820,
    labelText: 'AUDIT',
    hookBadgeLabel: 'UNBUILT',
  },
];

export default CASES;
