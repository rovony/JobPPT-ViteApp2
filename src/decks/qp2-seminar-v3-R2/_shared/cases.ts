// @ts-nocheck
/**
 * Shared CASES data for the qp2-seminar-v3-R2 deck.
 *
 * The 3 case cards are rendered on slide 01 (title) and persist visually
 * onto slide 02 (hook-A) via shared layoutId="hook-mark-csN" — the
 * audience reads the move as "the cards never left", with slide 02 then
 * adding 3 amber U-badges below each card and connector lines linking
 * each card to its associated badge as the speaker says each U-word at
 * 16s / 37s / 55s.
 *
 * Source of truth for case identity, color, label, title, note. Keep
 * here; do not duplicate. Both slide 01 and slide 02 import from this.
 */

export const CASES = [
  {
    id: 1,
    label: 'CASE 01 · AMBRISENTAN · PEDIATRIC PAH',
    title: 'Model-based dose for a trial that could not be run.',
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
    label: 'CASE 02 · IVOSIDENIB · INDIA AML',
    title: 'Global dossier extrapolated to CDSCO.',
    note: 'Local-data waiver granted, 2025.',
    color: 'var(--cyan)',
    dotX: 495,
    dotY: 118,
    labelX: 555,
    labelText: 'AUC',
    hookBadgeLabel: 'UNAVAILABLE',
  },
  {
    id: 3,
    label: 'CASE 03 · AI / ML · CLIN PHARM AGENT',
    title: 'Agentic ML for dose-finding workflows.',
    note: 'Pilot deployment, 2026.',
    color: 'var(--violet)',
    dotX: 625,
    dotY: 178,
    labelX: 685,
    labelText: 'T½',
    hookBadgeLabel: 'UNBUILT',
  },
];

export default CASES;
