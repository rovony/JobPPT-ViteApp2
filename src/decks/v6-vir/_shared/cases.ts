// @ts-nocheck
/**
 * Shared CASES data for the v6 Vir seminar deck.
 *
 * The 4 case cards are rendered on slide 01 (title) and persist visually
 * onto slide 02 (hook-A) via shared layoutId="hook-mark-csN" — the
 * audience reads the move as "the cards never left", with slide 02 then
 * adding amber evidence-limit badges below each card and connector lines linking
 * each card to its associated badge.
 *
 * Source of truth for case identity, color, label, title, note. Keep
 * here; do not duplicate. Both slide 01 and slide 02 import from this.
 */

export const CASES = [
  {
    id: 1,
    label: 'CASE 01 · AMBRISENTAN · PEDIATRIC PAH',
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
