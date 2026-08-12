/**
 * CS1 strategy board — HTML #08 architecture + refused routes (enhanced).
 * Funnel is the visual; pivot plate lives on cs1-pivot, not here.
 */
import type { ReactNode } from 'react';
import ConclusionBar from '../cs1/ConclusionBar';
import { AnchorFunnelViz } from './Cs1NotebookViz';

type Props = { showSide?: boolean };

export function ModelArchitectureBoard({ showSide = true }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: showSide ? 'minmax(0, 1.15fr) minmax(0, 1fr)' : '1fr',
        gap: 'clamp(0.85rem, 1.8vw, 1.25rem)',
        height: '100%',
        minHeight: 0,
      }}
    >
      <AnchorFunnelViz />

      {showSide && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minHeight: 0, overflow: 'auto' }}>
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: '0.72rem',
              color: 'var(--amber)',
              letterSpacing: 'var(--ls-mono)',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            Routes I did not take — and why
          </div>

          <SideCard
            accent="var(--amber)"
            kicker="Quantitative bridging (Garnett–Florian)"
            body={
              <>
                Hemodynamic-to-functional slope from 12 trials / 2,028 patients — applied elsewhere to
                BREATHE-3. <strong>Unavailable here: hemodynamic substudy N = 5.</strong>
              </>
            }
          />
          <SideCard
            accent="var(--amber)"
            kicker="Estimate allometry from 39 children"
            body={
              <>
                Would buy rejectable uncertainty. Fixed CL<sup>0.75</sup> / V<sup>1.0</sup>{' '}
                <strong>a priori</strong> — children confirm, they do not invent the structure.
              </>
            }
          />
          <SideCard
            accent="var(--sage)"
            kicker="Architectural precedent"
            body={
              <>
                Bosentan FUTURE-1 (N=36) hit ~54% of adult target;{' '}
                <strong style={{ color: 'var(--sage)' }}>EMA still accepted the architecture</strong> —
                validates the shape of the argument, not only the result.
              </>
            }
          />
        </div>
      )}
    </div>
  );
}

function SideCard({
  kicker,
  body,
  accent,
}: {
  kicker: string;
  body: ReactNode;
  accent: string;
}) {
  return (
    <article
      style={{
        padding: 'clamp(0.7rem, 1.35vh, 0.95rem)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: `4px solid ${accent}`,
        background: 'var(--panel)',
        minWidth: 0,
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.68rem',
          letterSpacing: 'var(--ls-mono)',
          fontWeight: 800,
          color: accent,
          marginBottom: 6,
        }}
      >
        {kicker}
      </div>
      <div
        className="deck-body"
        style={{
          fontSize: 'clamp(0.9rem, min(1.2vw, 1.9vh), 1.05rem)',
          color: 'var(--cream)',
          lineHeight: 1.4,
          fontWeight: 500,
        }}
      >
        {body}
      </div>
    </article>
  );
}

export function ModelArchitectureWithBar({ showSide = true }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'minmax(0, 1fr) auto',
        gap: 'clamp(0.75rem, 1.6vh, 1.1rem)',
        height: '100%',
        minHeight: 0,
      }}
    >
      <ModelArchitectureBoard showSide={showSide} />
      <ConclusionBar accent="var(--coral)">
        Exposure matching was not the preferred route. It was{' '}
        <span style={{ color: 'var(--coral)', fontWeight: 600 }}>the only route this dataset could support</span>.
      </ConclusionBar>
    </div>
  );
}
