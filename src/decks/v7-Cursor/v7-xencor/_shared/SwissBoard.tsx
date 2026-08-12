/**
 * SwissBoard — reusable three-panel quality bar + full-width ConclusionBar.
 * Pattern lifted from CS1 DecisionBoard; pass case-specific panels + payoff.
 */
import type { ReactNode } from 'react';
import ConclusionBar from '../components/cs1/ConclusionBar';

export type SwissPanel = {
  id: string;
  kicker: string;
  accent: string;
  title: ReactNode;
  body: ReactNode;
  /** Optional large numeral above the title (Asparlas-style anchors). */
  numeral?: ReactNode;
  /** 0-indexed click-build accent slot (CS1 DecisionBoard convention). */
  accentAt?: number;
};

type Props = {
  panels: SwissPanel[];
  conclusion: ReactNode;
  conclusionAccent?: string;
  /** Click-build: 0 = all on; when 1..n-1, non-matching accentAt panels dim. */
  step?: number;
};

export default function SwissBoard({
  panels,
  conclusion,
  conclusionAccent = 'var(--case, var(--coral))',
  step = 0,
}: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'minmax(0, 1fr) auto',
        gap: 'clamp(1.1rem, 2.4vh, 1.65rem)',
        height: '100%',
        minHeight: 0,
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(panels.length, 3)}, minmax(0, 1fr))`,
          gap: 'clamp(0.95rem, 2vw, 1.45rem)',
          minHeight: 0,
          height: '100%',
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
                gap: 'clamp(0.75rem, 1.5vh, 1.1rem)',
                minWidth: 0,
                minHeight: 0,
                padding: 'clamp(1.35rem, 2.6vh, 1.85rem) clamp(1.15rem, 1.9vw, 1.55rem)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--cream-hairline)',
                borderTop: `3px solid ${p.accent}`,
                background: 'var(--panel)',
                opacity: isDim ? 0.55 : 1,
                transition: 'opacity 200ms ease',
              }}
            >
              <div
                className="deck-body"
                style={{
                  fontSize: 'clamp(0.88rem, min(1.2vw, 1.7vh), 1.02rem)',
                  letterSpacing: 'var(--ls-mono)',
                  textTransform: 'uppercase',
                  color: p.accent,
                  fontWeight: 700,
                }}
              >
                {p.kicker}
              </div>
              {p.numeral != null && (
                <div
                  className="deck-display"
                  style={{
                    fontSize: 'clamp(2.4rem, min(4.2vw, 6.5vh), 3.5rem)',
                    fontWeight: 700,
                    color: 'var(--cream)',
                    letterSpacing: 'var(--ls-headline)',
                    lineHeight: 1,
                  }}
                >
                  {p.numeral}
                </div>
              )}
              <div
                className="deck-display"
                style={{
                  fontSize: 'clamp(1.35rem, min(2vw, 3.1vh), 1.7rem)',
                  lineHeight: 1.32,
                  color: 'var(--cream)',
                  fontWeight: 600,
                }}
              >
                {p.title}
              </div>
              <div
                className="deck-body"
                style={{
                  fontSize: 'clamp(1.08rem, min(1.45vw, 2.35vh), 1.28rem)',
                  lineHeight: 1.5,
                  color: 'var(--cream-muted)',
                  marginTop: 'auto',
                  fontWeight: 500,
                }}
              >
                {p.body}
              </div>
            </article>
          );
        })}
      </div>

      <ConclusionBar accent={conclusionAccent}>{conclusion}</ConclusionBar>
    </div>
  );
}
