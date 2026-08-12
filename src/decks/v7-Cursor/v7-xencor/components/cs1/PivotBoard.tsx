/**
 * Pivot board v2 — less busy: hero type only · premise · caveat · cost.
 * Bracket line lives in Subhead on the slide, not duplicated here.
 */
import type { ReactNode } from 'react';
import EfficacyExposurePlate from '../notebooklm/EfficacyExposurePlate';
import ConclusionBar from './ConclusionBar';

export default function PivotBoard() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'minmax(0, 1.25fr) auto auto',
        gap: 'clamp(0.85rem, 1.8vh, 1.2rem)',
        height: '100%',
        minHeight: 0,
      }}
    >
      <EfficacyExposurePlate variant="hero" showBracket={false} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: 'clamp(0.85rem, 1.6vw, 1.2rem)',
          minHeight: 0,
        }}
      >
        <Panel
          kicker="Core premise"
          kickerColor="var(--cream-faint)"
          border="2px solid var(--cream)"
          bg="var(--panel)"
        >
          Where disease similarity is high,{' '}
          <strong style={{ fontWeight: 700 }}>
            matching the adult therapeutic exposure range answers the dose
          </strong>{' '}
          the efficacy endpoint no longer can.
        </Panel>

        <Panel
          kicker="Honest caveat — stated first"
          kickerColor="var(--amber)"
          border="1px solid var(--cream-hairline)"
          borderLeft="4px solid var(--amber)"
          bg="color-mix(in srgb, var(--amber) 8%, var(--bg))"
        >
          Disease similarity is{' '}
          <strong style={{ fontWeight: 700 }}>an assumption, not a finding</strong>. Wrong once —
          the recommendation is invalid. On the slide, not in a limitations appendix.
        </Panel>
      </div>

      <ConclusionBar accent="var(--coral)">
        Cost of being wrong: under-treat progressive disease in children — or carry adult exposure{' '}
        <span style={{ color: 'var(--coral)', fontWeight: 600 }}>with nothing behind the number</span>.
      </ConclusionBar>
    </div>
  );
}

function Panel({
  kicker,
  kickerColor,
  border,
  borderLeft,
  bg,
  children,
}: {
  kicker: string;
  kickerColor: string;
  border: string;
  borderLeft?: string;
  bg: string;
  children: ReactNode;
}) {
  return (
    <article
      style={{
        padding: 'clamp(1rem, 2vh, 1.35rem) clamp(1.1rem, 2vw, 1.45rem)',
        border,
        borderLeft: borderLeft || undefined,
        borderRadius: 'var(--radius-md)',
        background: bg,
        minWidth: 0,
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.78rem',
          letterSpacing: 'var(--ls-mono)',
          fontWeight: 800,
          color: kickerColor,
          marginBottom: 10,
        }}
      >
        {kicker}
      </div>
      <div
        className="deck-body"
        style={{
          fontSize: 'clamp(1.15rem, min(1.55vw, 2.5vh), 1.35rem)',
          color: 'var(--cream)',
          lineHeight: 1.45,
          fontWeight: 500,
        }}
      >
        {children}
      </div>
    </article>
  );
}
