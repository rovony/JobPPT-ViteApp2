/**
 * DecisionBoard v2 — fresh from the Swiss quality bar (cs1-decision.png / v6-era DecisionBoard).
 * Less busy panel copy · bigger titles · click-build steps preserved.
 */
import SwissBoardV2 from '../../_shared/SwissBoardV2';

const PANELS = [
  {
    id: 'decision',
    kicker: 'The decision',
    accent: 'var(--coral)',
    title: 'At what dose — if any — could ambrisentan be labeled in children?',
    body: 'Ages 8–<18 · weight-banded · defendable to EMA and PMDA.',
    accentAt: 0,
  },
  {
    id: 'options',
    kicker: 'The options',
    accent: 'var(--amber)',
    title: 'Three, and only one was deliverable.',
    body: 'Force another efficacy design · accept an M&S bridge · abandon the path.',
    accentAt: 1,
  },
  {
    id: 'cost',
    kicker: 'Cost of being wrong',
    accent: 'var(--sage)',
    title: 'Under-treat a progressive disease, or expose children without a defence.',
    body: 'Rare population · ethics · no second chance at filing.',
    accentAt: 2,
  },
] as const;

export default function DecisionBoardV2({ step = 0 }: { step?: number }) {
  return (
    <SwissBoardV2
      step={step}
      panels={[...PANELS]}
      conclusionAccent="var(--coral)"
      conclusion={
        <>
          The question was never whether the model was elegant. It was whether{' '}
          <span style={{ color: 'var(--coral)', fontWeight: 600 }}>
            an exposure argument could carry a label
          </span>{' '}
          that an efficacy trial no longer could.
        </>
      }
    />
  );
}
