// @ts-nocheck
/**
 * Shared CASES data for the v7 Xencor seminar deck.
 *
 * Source of truth for case identity, color, label, title, note.
 * Used by roadmap and case chrome. Slide 01 (title) is a minimal cover
 * and does not render these cards — preview lives on the roadmap; hook
 * marks are owned by slide 02.
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
    /* PK landmark — used on slide 01's PK curve overlay */
    dotX: 170,
    dotY: 18,
    labelX: 235,
    labelText: 'CMAX',
    /* Slide 02 hook badge label that this card maps to */
    hookBadgeLabel: 'UNTRIALABLE',
  },
  {
    id: 2,
    label: 'CASE 02 · ASPARLAS · EFFICIENT DESIGN',
    shortLabel: 'Case 02 · Asparlas',
    shortTitle: 'Efficient adult design',
    title: 'A defensible adult design when the endpoint-powered trial is not feasible.',
    note: 'FDA Type A agreement.',
    color: 'var(--teal)',
    dotX: 390,
    dotY: 96,
    labelX: 450,
    labelText: 'PRECISION',
    hookBadgeLabel: 'SAMPLE-LIMITED',
  },
  {
    id: 3,
    label: 'CASE 03 · IVOSIDENIB · INDIA RELIANCE',
    shortLabel: 'Case 03 · Ivosidenib',
    shortTitle: 'India reliance',
    title: 'A local-trial waiver defended through convergent global evidence.',
    note: 'Cross-functional approval under pressure.',
    color: 'var(--cyan)',
    dotX: 610,
    dotY: 158,
    labelX: 670,
    labelText: 'RELIANCE',
    hookBadgeLabel: 'LOCAL-EVIDENCE',
  },
  {
    id: 4,
    label: 'CASE 04 · AI / ML · PHARAZI',
    shortLabel: 'Case 04 · Pharazi',
    shortTitle: 'Traceable AI',
    title: 'Audit-ready clinical pharmacology workflows when the evidence system must scale.',
    note: 'Personal research platform.',
    color: 'var(--sage)',
    dotX: 770,
    dotY: 184,
    labelX: 820,
    labelText: 'AUDIT',
    hookBadgeLabel: 'UNBUILT',
  },
];

export default CASES;
