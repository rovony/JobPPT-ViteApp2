// @ts-nocheck
/**
 * Shared CASES data for the v6 Vir seminar deck.
 *
 * The 3 case cards are rendered on slide 01 (title) and persist visually
 * onto slide 02 (hook-A) via shared layoutId="hook-mark-csN" — the
 * audience reads the move as "the cards never left", with slide 02 then
 * adding 3 amber U-badges below each card and connector lines linking
 * each card to its associated badge.
 *
 * Source of truth for case identity, color, label, title, note. Keep
 * here; do not duplicate. Both slide 01 and slide 02 import from this.
 */

export const CASES = [
  {
    id: 1,
    label: 'CASE 01 · AMBRISENTAN · PEDIATRIC PAH',
    title: 'Exposure-matched dose for a trial that could not carry the answer.',
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
    label: 'CASE 02 · ADC · MULTI-ANALYTE PK',
    title: 'Analyte map to model strategy for a dose that has to stay interpretable.',
    note: 'Transferable leadership credential.',
    color: 'var(--cyan)',
    dotX: 495,
    dotY: 118,
    labelX: 555,
    labelText: 'AUC',
    hookBadgeLabel: 'MULTI-ANALYTE',
  },
  {
    id: 3,
    label: 'CASE 03 · AI / ML · PHARAZI',
    title: 'Audit-ready clinical pharmacology workflows when the evidence system must scale.',
    note: 'Personal research platform.',
    color: 'var(--violet)',
    dotX: 625,
    dotY: 178,
    labelX: 685,
    labelText: 'T½',
    hookBadgeLabel: 'UNBUILT',
  },
];

export default CASES;
