/**
 * DecisionBoard — CS1 content on the shared SwissBoard quality bar.
 */
import SwissBoard from '../../_shared/SwissBoard';

const PANELS = [
  {
    id: 'decision',
    kicker: 'The decision',
    accent: 'var(--coral)',
    title: 'At what dose — if any — could ambrisentan be labeled in children?',
    body: 'Ages 8 to <18 · weight-banded · EMA + PMDA still needed a defendable exposure target.',
    accentAt: 0,
  },
  {
    id: 'options',
    kicker: 'The options',
    accent: 'var(--amber)',
    title: 'Three, and only one was deliverable.',
    body: 'Force another efficacy design · Accept a modeling & simulation bridge · Abandon the pediatric path.',
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

export default function DecisionBoard({ step = 0 }: { step?: number }) {
  return (
    <SwissBoard
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
