/**
 * Decision fork v2 — copy of 06 clarity recipe on the options beat:
 * less chrome · bigger type · question lives in Subhead · no “If chosen” clutter.
 */
import ConclusionBar from './ConclusionBar';

type Props = { step?: number };

const OPTIONS = [
  {
    n: 1,
    kicker: 'A · Dead',
    title: 'Force another efficacy design',
    body: 'Ethics and enrollment already failed.',
    accent: 'var(--amber)',
    dead: true,
    live: false,
  },
  {
    n: 2,
    kicker: 'B · Deliverable',
    title: 'Modeling & simulation bridge',
    body: 'Match pediatric exposure to the adult band — the only route N≈39 can support.',
    accent: 'var(--coral)',
    dead: false,
    live: true,
  },
  {
    n: 3,
    kicker: 'C · Exit',
    title: 'Abandon the pediatric path',
    body: 'No label. No second chance for a rare progressive disease.',
    accent: 'var(--cream-faint)',
    dead: true,
    live: false,
  },
] as const;

export default function DecisionForkBoardV2({ step = 0 }: Props) {
  const dim = (n: number) => (step > 0 && step < 4 && step !== n ? 0.38 : 1);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.85rem, 1.8vh, 1.2rem)',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* One thin stakes strip — not three competing cards */}
      <div
        className="deck-body"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.35rem 1.75rem',
          padding: '0.35rem 0.15rem 0.85rem',
          fontSize: 'clamp(1.1rem, min(1.5vw, 2.35vh), 1.3rem)',
          color: 'var(--cream)',
          fontWeight: 600,
          lineHeight: 1.35,
          borderBottom: '1px solid var(--cream-hairline)',
        }}
      >
        <span>
          <span style={{ color: 'var(--coral)', fontWeight: 800 }}>2–16 / M</span>
          <span style={{ color: 'var(--cream-muted)', fontWeight: 500 }}> · rare PAH</span>
        </span>
        <span>
          <span style={{ color: 'var(--coral)', fontWeight: 800 }}>380 · 3,126</span>
          <span style={{ color: 'var(--cream-muted)', fontWeight: 500 }}> · adult bedrock</span>
        </span>
        <span>
          <span style={{ color: 'var(--coral)', fontWeight: 800 }}>N ≈ 39</span>
          <span style={{ color: 'var(--cream-muted)', fontWeight: 500 }}> · open-label PK</span>
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 'clamp(0.75rem, 1.5vw, 1.1rem)',
          minHeight: 0,
          alignItems: 'stretch',
        }}
      >
        {OPTIONS.map((o) => (
          <article
            key={o.kicker}
            style={{
              opacity: dim(o.n),
              transition: 'opacity 200ms ease',
              padding: 'clamp(1.15rem, 2.4vh, 1.6rem) clamp(1.05rem, 1.9vw, 1.4rem)',
              border: `1.5px solid ${o.live ? o.accent : 'var(--cream-hairline)'}`,
              borderTop: `5px solid ${o.accent}`,
              borderRadius: 'var(--radius-md)',
              background: o.live ? 'color-mix(in srgb, var(--coral) 9%, var(--bg))' : 'var(--panel)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              minWidth: 0,
            }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'clamp(0.8rem, 1.2vh, 0.92rem)',
                letterSpacing: 'var(--ls-mono)',
                fontWeight: 800,
                color: o.accent,
              }}
            >
              {o.kicker}
            </div>
            <div
              className="deck-display"
              style={{
                fontSize: 'clamp(1.45rem, min(2.1vw, 3.4vh), 1.9rem)',
                fontWeight: 700,
                color: 'var(--cream)',
                lineHeight: 1.2,
                textDecoration: o.dead ? 'line-through' : 'none',
                textDecorationColor: 'var(--amber)',
              }}
            >
              {o.title}
            </div>
            <div
              className="deck-body"
              style={{
                fontSize: 'clamp(1.12rem, min(1.5vw, 2.45vh), 1.32rem)',
                color: 'var(--cream-muted)',
                lineHeight: 1.45,
                fontWeight: 500,
              }}
            >
              {o.body}
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <ConclusionBar accent="var(--coral)">
          Not whether the model was elegant — whether{' '}
          <span style={{ color: 'var(--coral)', fontWeight: 600 }}>an exposure argument could carry a label</span>{' '}
          an efficacy trial no longer could.
        </ConclusionBar>
      </div>
    </div>
  );
}
