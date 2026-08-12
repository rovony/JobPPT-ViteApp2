/**
 * NotebookLM-inspired visuals for CS1 / India — light-editorial paper.
 * Pattern language: graph-paper wash, accent numerals, dense boards, payoff bars.
 */
import ConclusionBar from '../cs1/ConclusionBar';
import EfficacyExposurePlate from './EfficacyExposurePlate';

const GRID_BG = {
  backgroundImage:
    'linear-gradient(color-mix(in srgb, var(--cream-hairline) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--cream-hairline) 55%, transparent) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
  backgroundColor: 'var(--panel)',
};

/** CS1 · Reality — structural constraint matrix (NotebookLM slide-03) */
export function ConstraintMatrixViz() {
  const cols = [
    {
      kicker: 'Enrollment',
      body: (
        <>
          Disease affects <strong style={{ color: 'var(--amber)' }}>2–16 per million</strong>; powering a clinical
          endpoint would take <strong style={{ color: 'var(--amber)' }}>years to fill</strong>.
        </>
      ),
    },
    {
      kicker: 'Pooling',
      body: 'Mixed etiologies introduce heterogeneity a modest sample cannot absorb.',
    },
    {
      kicker: 'Control arm',
      body: (
        <>
          Randomizing a progressive disease off background therapy is{' '}
          <strong style={{ color: 'var(--amber)' }}>ethically unjustifiable</strong>.
        </>
      ),
    },
    {
      kicker: 'Endpoint',
      body: 'Adult 6MWD changes with age and cooperation — does not transfer cleanly.',
    },
    {
      kicker: 'Precedent',
      body: 'STARTS-1 (sildenafil) enrolled 235 children and still narrowly missed its primary.',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto auto minmax(0, 1fr) auto',
        gap: 'clamp(0.85rem, 1.8vh, 1.25rem)',
        height: '100%',
        minHeight: 0,
        ...GRID_BG,
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--cream-hairline)',
        padding: 'clamp(1rem, 2vh, 1.35rem)',
      }}
    >
      {/* Timeline */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div style={{ textAlign: 'right' }}>
          <span
            className="deck-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: 'clamp(0.85rem, min(1.15vw, 1.7vh), 1rem)',
              color: 'var(--amber)',
              fontWeight: 700,
              letterSpacing: 'var(--ls-mono)',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--amber)',
                display: 'inline-block',
              }}
            />
            2013 · AMB112529 held
          </span>
        </div>
        <div style={{ height: 2, width: 'min(8rem, 12vw)', background: 'var(--cream-hairline)' }} aria-hidden />
        <div>
          <span
            className="deck-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: 'clamp(0.85rem, min(1.15vw, 1.7vh), 1rem)',
              color: 'var(--amber)',
              fontWeight: 700,
              letterSpacing: 'var(--ls-mono)',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--amber)',
                display: 'inline-block',
              }}
            />
            2019 · Terminated
          </span>
        </div>
      </div>

      {/* Result callout */}
      <div
        style={{
          padding: 'clamp(1rem, 1.9vh, 1.25rem) clamp(1.15rem, 2vw, 1.5rem)',
          border: '1px solid var(--cream)',
          borderLeft: '4px solid var(--coral)',
          borderBottom: '3px solid var(--coral)',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg)',
          fontSize: 'clamp(1.08rem, min(1.45vw, 2.35vh), 1.28rem)',
          color: 'var(--cream)',
          lineHeight: 1.45,
          fontWeight: 500,
        }}
      >
        Result:{' '}
        <strong style={{ color: 'var(--coral)' }}>39</strong> evaluable patients (ages 8 to &lt;18),{' '}
        <strong style={{ color: 'var(--coral)' }}>211</strong> sparse PK observations, narrow dose range.
      </div>

      {/* Five constraint columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: 'clamp(0.55rem, 1.1vw, 0.85rem)',
          minHeight: 0,
        }}
      >
        {cols.map((c) => (
          <article
            key={c.kicker}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              minWidth: 0,
              minHeight: 0,
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg)',
              overflow: 'hidden',
            }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                padding: 'clamp(0.55rem, 1.1vh, 0.75rem) clamp(0.65rem, 1.1vw, 0.85rem)',
                background: 'color-mix(in srgb, var(--amber) 18%, var(--panel))',
                color: 'var(--amber)',
                fontSize: 'clamp(0.78rem, min(1.05vw, 1.55vh), 0.92rem)',
                letterSpacing: 'var(--ls-mono)',
                fontWeight: 800,
                borderBottom: '1px solid var(--cream-hairline)',
              }}
            >
              {c.kicker}
            </div>
            <div
              className="deck-body"
              style={{
                padding: 'clamp(0.85rem, 1.6vh, 1.15rem) clamp(0.7rem, 1.15vw, 0.95rem)',
                fontSize: 'clamp(1.02rem, min(1.4vw, 2.25vh), 1.22rem)',
                lineHeight: 1.5,
                color: 'var(--cream)',
                fontWeight: 500,
                flex: 1,
              }}
            >
              {c.body}
            </div>
          </article>
        ))}
      </div>

      <ConclusionBar accent="var(--coral)">
        The constraint was not diligence. It was{' '}
        <span style={{ color: 'var(--coral)', fontWeight: 600 }}>arithmetic and ethics</span>.
      </ConclusionBar>
    </div>
  );
}

/** CS1 · Strategy — efficacy struck / exposure pivot (NotebookLM slide-04) + refused routes */
export function ExposurePivotViz({ showRefused = true }: { showRefused?: boolean }) {
  const refused = [
    { title: 'Rescue efficacy trial', why: 'Ethics / feasibility already failed' },
    { title: 'Overfit covariates', why: 'False precision on N≈39' },
    { title: 'Claim crisp E-R', why: 'Dose range too narrow' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: showRefused ? 'minmax(0, 1.2fr) minmax(0, 1fr)' : '1fr',
        gap: 'clamp(0.95rem, 2vw, 1.35rem)',
        height: '100%',
        minHeight: 0,
      }}
    >
      <EfficacyExposurePlate />

      {showRefused && (
        <div style={{ display: 'grid', gridTemplateRows: 'auto repeat(3, minmax(0, 1fr))', gap: '0.65rem', minHeight: 0 }}>
          <div
            className="deck-mono uppercase"
            style={{ fontSize: 'clamp(0.7rem, 1vh, 0.8rem)', color: 'var(--amber)', letterSpacing: 'var(--ls-mono)', fontWeight: 800 }}
          >
            Refused
          </div>
          {refused.map((r) => (
            <article
              key={r.title}
              style={{
                padding: 'clamp(0.7rem, 1.3vh, 0.95rem)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--cream-hairline)',
                borderLeft: '3px solid var(--amber)',
                background: 'var(--panel)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 4,
                minWidth: 0,
              }}
            >
              <div
                className="deck-display"
                style={{
                  fontSize: 'clamp(1rem, 1.35vw, 1.15rem)',
                  fontWeight: 600,
                  color: 'var(--cream)',
                  textDecoration: 'line-through',
                  textDecorationColor: 'var(--amber)',
                }}
              >
                {r.title}
              </div>
              <div className="deck-body" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.98rem)', color: 'var(--cream-muted)', lineHeight: 1.4 }}>
                {r.why}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

/** CS1 · Boundary — what breaks the bridge (NotebookLM slide-05) */
export function KillBridgeViz() {
  const rows = [
    'Systematic bias appears in predictive checks',
    'Exposures drift with body size post-allometry',
    'Pediatric exposure sits materially outside the adult band',
    'Unpredicted dose-related safety signal emerges',
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'minmax(0, 1fr) auto',
        gap: 'clamp(0.95rem, 2vh, 1.35rem)',
        height: '100%',
        minHeight: 0,
        ...GRID_BG,
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--cream-hairline)',
        padding: 'clamp(1rem, 2vh, 1.35rem)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(9rem, 12rem) minmax(0, 1fr) minmax(10rem, 14rem)',
          gap: 'clamp(0.65rem, 1.4vw, 1rem)',
          alignItems: 'stretch',
          minHeight: 0,
        }}
      >
        <div
          style={{
            alignSelf: 'center',
            padding: 'clamp(0.9rem, 1.6vh, 1.15rem)',
            border: '2px solid var(--cream)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg)',
            fontWeight: 700,
            fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
            color: 'var(--cream)',
            lineHeight: 1.3,
          }}
        >
          What breaks the bridge?
        </div>
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, minmax(0, 1fr))', gap: '0.55rem', minHeight: 0 }}>
          {rows.map((r) => (
            <div
              key={r}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                minWidth: 0,
              }}
            >
              <div aria-hidden style={{ width: 18, height: 2, background: 'var(--cream-hairline)', flexShrink: 0 }} />
              <div
                className="deck-body"
                style={{
                  fontSize: 'clamp(0.9rem, min(1.2vw, 1.9vh), 1.05rem)',
                  color: 'var(--cream)',
                  lineHeight: 1.35,
                  fontWeight: 500,
                }}
              >
                {r}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, minmax(0, 1fr))', gap: '0.55rem', minHeight: 0 }}>
          {rows.map((r) => (
            <div
              key={`${r}-out`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.45rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--amber)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 'clamp(0.72rem, 1.05vh, 0.85rem)',
                textAlign: 'center',
                lineHeight: 1.25,
              }}
            >
              Redesign / decline bridge
            </div>
          ))}
        </div>
      </div>
      <ConclusionBar accent="var(--sage)">
        Declining to claim a bridge is a legitimate scientific output — boundaries agreed{' '}
        <span style={{ color: 'var(--sage)', fontWeight: 600 }}>before</span> the data were analyzed.
      </ConclusionBar>
    </div>
  );
}

/** CS1 · Credibility companion — anchor funnel (NotebookLM slide-07) */
export function AnchorFunnelViz() {
  const layers = [
    {
      label: 'The Anchor',
      body: '380 adults build the two-compartment structural model (first-order absorption, lag time)',
      width: '100%',
      bg: 'color-mix(in srgb, var(--cream) 8%, var(--panel))',
    },
    {
      label: 'The Constraint',
      body: (
        <>
          Fixed biological allometry a priori — CL exponent{' '}
          <strong style={{ color: 'var(--coral)' }}>0.75</strong> · V exponent{' '}
          <strong style={{ color: 'var(--coral)' }}>1.0</strong>
          <div style={{ color: 'var(--amber)', marginTop: 4, fontSize: '0.92em' }}>
            Deliberately not estimated from the 39 children
          </div>
        </>
      ),
      width: '92%',
      bg: 'color-mix(in srgb, var(--cream) 6%, var(--panel))',
    },
    {
      label: 'The Filter',
      body: (
        <>
          Strict parsimony — 12 covariates enter; deletion gate p &lt; 0.001.{' '}
          <strong style={{ color: 'var(--coral)' }}>Only weight survives.</strong>
        </>
      ),
      width: '84%',
      bg: 'color-mix(in srgb, var(--cream) 4%, var(--panel))',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.55rem',
        height: '100%',
        minHeight: 0,
        justifyContent: 'center',
        ...GRID_BG,
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--cream-hairline)',
        padding: 'clamp(0.85rem, 1.8vh, 1.2rem)',
      }}
    >
      {layers.map((l) => (
        <div
          key={l.label}
          style={{
            width: l.width,
            padding: 'clamp(0.65rem, 1.3vh, 0.9rem) clamp(0.85rem, 1.5vw, 1.15rem)',
            border: '1px solid var(--cream-hairline)',
            borderRadius: 'var(--radius-sm)',
            background: l.bg,
          }}
        >
          <div
            className="deck-mono uppercase"
            style={{ fontSize: 'clamp(0.65rem, 0.95vh, 0.75rem)', color: 'var(--cream-muted)', letterSpacing: 'var(--ls-mono)', fontWeight: 700, marginBottom: 4 }}
          >
            {l.label}
          </div>
          <div className="deck-body" style={{ fontSize: 'clamp(0.88rem, min(1.15vw, 1.85vh), 1.02rem)', color: 'var(--cream)', lineHeight: 1.4, fontWeight: 600 }}>
            {l.body}
          </div>
        </div>
      ))}
      <div
        style={{
          width: '76%',
          padding: 'clamp(0.75rem, 1.4vh, 1rem)',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--coral)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 'clamp(0.88rem, min(1.15vw, 1.85vh), 1.02rem)',
          lineHeight: 1.4,
          textAlign: 'center',
        }}
      >
        Output: 39 children confirm the structure via pcVPC — no structural misfit
      </div>
    </div>
  );
}
