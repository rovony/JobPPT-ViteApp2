/**
 * CS1 Decision fork only — options + stakes (pivot lives on prior slide).
 * Harvest: Swiss density from cs1-decision.png + HTML deck option language.
 */
import ConclusionBar from './ConclusionBar';

const GRID = {
  backgroundImage:
    'linear-gradient(color-mix(in srgb, var(--cream-hairline) 70%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--cream-hairline) 70%, transparent) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
  backgroundColor: 'var(--panel)',
};

type Props = { step?: number };

export default function DecisionForkBoard({ step = 0 }: Props) {
  const dim = (n: number) => (step > 0 && step < 4 && step !== n ? 0.4 : 1);

  return (
    <div
      style={{
        display: 'grid',
        // Stats + question hug content; options row absorbs remaining height (no dead middle).
        gridTemplateRows: 'auto auto minmax(0, 1fr) auto',
        gap: 'clamp(0.7rem, 1.5vh, 1rem)',
        height: '100%',
        minHeight: 0,
        ...GRID,
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        padding: 'clamp(0.85rem, 1.8vh, 1.2rem)',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.4fr', gap: '0.6rem' }}>
        <Stat label="Rare prevalence" value="2–16 / M" detail="Pediatric PAH" />
        <Stat label="Adult bedrock" value="380 · 3,126" detail="Adults · PK observations" />
        <Stat label="Pediatric PK" value="N ≈ 39" detail="Open-label · no placebo efficacy arm" />
      </div>

      <div
        style={{
          padding: '0.7rem 0.95rem',
          border: '2px solid var(--cream)',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg)',
          fontSize: 'clamp(1.05rem, min(1.4vw, 2.3vh), 1.25rem)',
          fontWeight: 700,
          color: 'var(--cream)',
          lineHeight: 1.3,
        }}
      >
        At what dose — if any — could ambrisentan be labeled in children?
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '0.65rem',
          minHeight: 0,
          height: '100%',
          alignItems: 'stretch',
        }}
      >
        <Fork
          opacity={dim(1)}
          dead
          kicker="A · Dead"
          title="Force another efficacy design"
          body="Ethics and enrollment already failed the path."
          cost="Years of enrollment for an endpoint that still may not transfer."
          accent="var(--amber)"
        />
        <Fork
          opacity={dim(2)}
          live
          kicker="B · Deliverable"
          title="Accept a modeling & simulation bridge"
          body="Match pediatric exposure to the adult therapeutic band — the only route N=39 can support."
          cost="Must defend disease similarity as the named hinge — on the slide."
          accent="var(--coral)"
        />
        <Fork
          opacity={dim(3)}
          dead
          kicker="C · Exit"
          title="Abandon the pediatric path"
          body="No label. No second chance for a rare progressive disease."
          cost="Children stay off a drug with a known adult benefit–risk band."
          accent="var(--cream-faint)"
        />
      </div>

      <ConclusionBar accent="var(--coral)">
        The question was never whether the model was elegant. It was whether{' '}
        <span style={{ color: 'var(--coral)', fontWeight: 600 }}>an exposure argument could carry a label</span>{' '}
        that an efficacy trial no longer could.
      </ConclusionBar>
    </div>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div
      style={{
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--bg)',
        padding: '0.55rem 0.7rem',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{ fontSize: '0.68rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)', fontWeight: 700 }}
      >
        {label}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1.2rem, min(1.8vw, 2.7vh), 1.5rem)',
          fontWeight: 800,
          color: 'var(--coral)',
          lineHeight: 1.1,
          marginTop: 2,
        }}
      >
        {value}
      </div>
      <div className="deck-body" style={{ fontSize: '0.8rem', color: 'var(--cream-muted)', marginTop: 2 }}>
        {detail}
      </div>
    </div>
  );
}

function Fork({
  kicker,
  title,
  body,
  cost,
  accent,
  dead,
  live,
  opacity,
}: {
  kicker: string;
  title: string;
  body: string;
  cost: string;
  accent: string;
  dead?: boolean;
  live?: boolean;
  opacity: number;
}) {
  return (
    <div
      style={{
        opacity,
        transition: 'opacity 200ms ease',
        padding: 'clamp(0.85rem, 1.8vh, 1.15rem) clamp(0.9rem, 1.5vw, 1.1rem)',
        border: `1.5px solid ${live ? accent : 'var(--cream-hairline)'}`,
        borderTop: `4px solid ${accent}`,
        borderRadius: 'var(--radius-sm)',
        background: live ? 'color-mix(in srgb, var(--coral) 8%, var(--bg))' : 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 0,
        minHeight: 0,
        height: '100%',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{ fontSize: '0.7rem', letterSpacing: 'var(--ls-mono)', fontWeight: 800, color: accent }}
      >
        {kicker}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1.05rem, min(1.4vw, 2.2vh), 1.22rem)',
          fontWeight: 700,
          color: 'var(--cream)',
          lineHeight: 1.25,
          textDecoration: dead ? 'line-through' : 'none',
          textDecorationColor: 'var(--amber)',
        }}
      >
        {title}
      </div>
      <div
        className="deck-body"
        style={{
          fontSize: 'clamp(0.92rem, min(1.2vw, 1.95vh), 1.08rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
      >
        {body}
      </div>
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '0.65rem',
          borderTop: '1px solid var(--cream-hairline)',
        }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: '0.65rem',
            letterSpacing: 'var(--ls-mono)',
            fontWeight: 800,
            color: 'var(--cream-faint)',
            marginBottom: 4,
          }}
        >
          If chosen
        </div>
        <div
          className="deck-body"
          style={{
            fontSize: 'clamp(0.85rem, min(1.1vw, 1.75vh), 0.98rem)',
            color: 'var(--cream)',
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          {cost}
        </div>
      </div>
    </div>
  );
}
