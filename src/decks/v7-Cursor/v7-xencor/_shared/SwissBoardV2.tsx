/**
 * SwissBoard v2 — bigger type, less chrome, bodies pack under titles (no dead mid-card).
 * Used by CS1 decision 07v2; keep original SwissBoard for other cases.
 */
import type { ReactNode } from 'react';
import ConclusionBar from '../components/cs1/ConclusionBar';

export type SwissPanelV2 = {
  id: string;
  kicker: string;
  accent: string;
  title: ReactNode;
  body: ReactNode;
  accentAt?: number;
};

type Props = {
  panels: SwissPanelV2[];
  conclusion: ReactNode;
  conclusionAccent?: string;
  step?: number;
};

export default function SwissBoardV2({
  panels,
  conclusion,
  conclusionAccent = 'var(--case, var(--coral))',
  step = 0,
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1rem, 2.2vh, 1.5rem)',
        height: '100%',
        minHeight: 0,
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(panels.length, 3)}, minmax(0, 1fr))`,
          gap: 'clamp(0.85rem, 1.8vw, 1.35rem)',
          minHeight: 0,
          flex: '1 1 auto',
          alignItems: 'stretch',
        }}
      >
        {panels.map((p, i) => {
          const accentAt = p.accentAt ?? i;
          const isDim = step > 0 && step < panels.length && step !== accentAt;

          return (
            <article
              key={p.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.85rem, 1.7vh, 1.15rem)',
                minWidth: 0,
                minHeight: 0,
                padding: 'clamp(1.25rem, 2.5vh, 1.75rem) clamp(1.15rem, 2vw, 1.5rem)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--cream-hairline)',
                borderLeft: `4px solid ${p.accent}`,
                background: 'color-mix(in srgb, ' + p.accent + ' 7%, var(--panel))',
                opacity: isDim ? 0.5 : 1,
                transition: 'opacity 200ms ease',
              }}
            >
              <div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'clamp(0.85rem, min(1.15vw, 1.75vh), 1rem)',
                  letterSpacing: 'var(--ls-mono)',
                  color: p.accent,
                  fontWeight: 800,
                }}
              >
                {p.kicker}
              </div>
              <div
                className="deck-display"
                style={{
                  fontSize: 'clamp(1.45rem, min(2.15vw, 3.4vh), 1.85rem)',
                  lineHeight: 1.28,
                  color: 'var(--cream)',
                  fontWeight: 700,
                }}
              >
                {p.title}
              </div>
              <div
                className="deck-body"
                style={{
                  fontSize: 'clamp(1.12rem, min(1.5vw, 2.4vh), 1.32rem)',
                  lineHeight: 1.45,
                  color: 'var(--cream-muted)',
                  fontWeight: 500,
                }}
              >
                {p.body}
              </div>
            </article>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', flexShrink: 0 }}>
        <ConclusionBar accent={conclusionAccent}>{conclusion}</ConclusionBar>
      </div>
    </div>
  );
}
