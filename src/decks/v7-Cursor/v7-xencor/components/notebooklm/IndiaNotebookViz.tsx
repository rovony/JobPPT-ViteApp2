/**
 * NotebookLM-inspired India (CS2) visuals — light-editorial paper.
 */
import ConclusionBar from '../cs1/ConclusionBar';

const GRID_BG = {
  backgroundImage:
    'linear-gradient(color-mix(in srgb, var(--cream-hairline) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--cream-hairline) 55%, transparent) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
  backgroundColor: 'var(--panel)',
};

/** India · Setup — void vs global package (NotebookLM ivosidenib slide-04) */
export function VoidVsPackageViz() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'minmax(0, 1fr) auto',
        gap: 'clamp(0.95rem, 2vh, 1.35rem)',
        height: '100%',
        minHeight: 0,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(0.85rem, 1.8vw, 1.25rem)',
          minHeight: 0,
          ...GRID_BG,
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--cream-hairline)',
          padding: 'clamp(1rem, 2vh, 1.35rem)',
        }}
      >
        {/* Void */}
        <article
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.75rem, 1.5vh, 1.05rem)',
            minWidth: 0,
            padding: 'clamp(0.85rem, 1.6vh, 1.15rem)',
            border: '1px solid color-mix(in srgb, var(--amber) 45%, var(--cream-hairline))',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg)',
          }}
        >
          <div
            className="deck-mono uppercase"
            style={{ fontSize: 'clamp(0.72rem, 1.05vh, 0.82rem)', color: 'var(--amber)', letterSpacing: 'var(--ls-mono)', fontWeight: 800 }}
          >
            The missing local data
          </div>
          <div
            aria-hidden
            style={{
              flex: '0 0 auto',
              alignSelf: 'center',
              width: 'min(7.5rem, 28vw)',
              aspectRatio: '1',
              border: '2px dashed var(--amber)',
              borderRadius: 4,
              display: 'grid',
              placeItems: 'center',
              position: 'relative',
              margin: '0.35rem 0',
            }}
          >
            <div
              style={{
                width: '42%',
                aspectRatio: '1',
                background: 'var(--amber)',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                display: 'grid',
                placeItems: 'center',
                color: '#fff',
                fontWeight: 900,
                fontSize: '1.35rem',
              }}
            >
              !
            </div>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
              color: 'var(--amber)',
              fontSize: 'clamp(0.88rem, min(1.15vw, 1.85vh), 1.02rem)',
              lineHeight: 1.4,
              fontWeight: 600,
            }}
          >
            <li>No pre-approval Indian PK/PD data</li>
            <li>No Indian pivotal trial sites</li>
            <li>No India-specific peer-reviewed PK literature</li>
          </ul>
        </article>

        {/* Package */}
        <article
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.75rem, 1.5vh, 1.05rem)',
            minWidth: 0,
            padding: 'clamp(0.85rem, 1.6vh, 1.15rem)',
            border: '1px solid color-mix(in srgb, var(--cyan) 45%, var(--cream-hairline))',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg)',
          }}
        >
          <div
            className="deck-mono uppercase"
            style={{ fontSize: 'clamp(0.72rem, 1.05vh, 0.82rem)', color: 'var(--cyan)', letterSpacing: 'var(--ls-mono)', fontWeight: 800 }}
          >
            The available global package
          </div>
          <div
            aria-hidden
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 6,
              padding: '0.5rem 0',
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: i % 3 === 0 ? 28 : i % 2 === 0 ? 20 : 14,
                  borderRadius: 3,
                  background: `color-mix(in srgb, var(--cyan) ${28 + (i % 5) * 8}%, transparent)`,
                  border: '1px solid color-mix(in srgb, var(--cyan) 40%, transparent)',
                }}
              />
            ))}
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
              color: 'var(--cyan)',
              fontSize: 'clamp(0.88rem, min(1.15vw, 1.85vh), 1.02rem)',
              lineHeight: 1.4,
              fontWeight: 600,
            }}
          >
            <li>Global Clin Pharm package · 42+ countries</li>
            <li>Pooled population PK model (n=253)</li>
            <li>Exposure–response characterization</li>
            <li>PBPK-supported DDI labeling</li>
          </ul>
        </article>
      </div>

      <ConclusionBar accent="var(--cyan)">
        Extrapolation had to bridge an absolute local void using a global package built for{' '}
        <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>other purposes</span>.
      </ConclusionBar>
    </div>
  );
}

/** India · Population — race forest sketch (NotebookLM slide-07) */
export function RaceForestViz() {
  const rows = [
    { label: 'Age', effect: 2, lo: -4, hi: 8 },
    { label: 'Body weight', effect: -1, lo: -6, hi: 4 },
    { label: 'Sex', effect: 1, lo: -5, hi: 7 },
    { label: 'Renal function', effect: 3, lo: -3, hi: 9 },
    { label: 'Race', effect: 0.5, lo: -5, hi: 6, highlight: true },
  ];
  const min = -20;
  const max = 20;
  const toPct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(10rem, 14rem) minmax(0, 1fr) minmax(10rem, 14rem)',
        gap: 'clamp(0.75rem, 1.6vw, 1.1rem)',
        height: '100%',
        minHeight: 0,
        ...GRID_BG,
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--cream-hairline)',
        padding: 'clamp(0.95rem, 1.9vh, 1.25rem)',
      }}
    >
      <aside
        style={{
          border: '1px solid var(--cream-hairline)',
          borderTop: '3px solid var(--cyan)',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg)',
          padding: 'clamp(0.75rem, 1.4vh, 1rem)',
          fontSize: 'clamp(0.85rem, 1.1vw, 0.98rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
      >
        <div className="deck-mono uppercase" style={{ color: 'var(--cyan)', fontWeight: 800, letterSpacing: 'var(--ls-mono)', fontSize: '0.72rem', marginBottom: 8 }}>
          Data source
        </div>
        Pooled PopPK n=253. Tested against the competing hypothesis: polymorphism frequency or body size did not shift exposure materially across ethnic lines.
      </aside>

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0 }}>
        <div
          className="deck-mono uppercase"
          style={{ fontSize: '0.68rem', color: 'var(--cream-faint)', letterSpacing: 'var(--ls-mono)', marginBottom: 8, textAlign: 'center' }}
        >
          Impact on clearance
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateRows: `repeat(${rows.length}, minmax(0, 1fr))`, gap: 8, position: 'relative', minHeight: 0 }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${toPct(0)}%`,
              width: 2,
              background: 'color-mix(in srgb, var(--cream) 22%, transparent)',
            }}
          />
          {rows.map((r) => (
            <div key={r.label} style={{ display: 'grid', gridTemplateColumns: '5.5rem 1fr', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <div
                className="deck-body"
                style={{
                  fontSize: 'clamp(0.8rem, 1.05vw, 0.92rem)',
                  fontWeight: r.highlight ? 800 : 600,
                  color: r.highlight ? 'var(--cyan)' : 'var(--cream)',
                  background: r.highlight ? 'color-mix(in srgb, var(--cyan) 14%, transparent)' : 'transparent',
                  padding: r.highlight ? '0.2rem 0.35rem' : 0,
                  borderRadius: 4,
                }}
              >
                {r.label}
              </div>
              <div style={{ position: 'relative', height: 18 }}>
                <div
                  style={{
                    position: 'absolute',
                    left: `${toPct(r.lo)}%`,
                    width: `${toPct(r.hi) - toPct(r.lo)}%`,
                    top: '50%',
                    height: 2,
                    marginTop: -1,
                    background: 'var(--cyan)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: `${toPct(r.effect)}%`,
                    top: '50%',
                    width: 8,
                    height: 8,
                    marginLeft: -4,
                    marginTop: -4,
                    background: 'var(--cyan)',
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="deck-mono" style={{ marginTop: 8, fontSize: '0.65rem', color: 'var(--cream-faint)', textAlign: 'center' }}>
          −20      0 line of no effect      +20
        </div>
      </div>

      <aside
        style={{
          border: '1px solid var(--cream-hairline)',
          borderTop: '3px solid var(--cyan)',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg)',
          padding: 'clamp(0.75rem, 1.4vh, 1rem)',
          fontSize: 'clamp(0.85rem, 1.1vw, 0.98rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
      >
        <div className="deck-mono uppercase" style={{ color: 'var(--cyan)', fontWeight: 800, letterSpacing: 'var(--ls-mono)', fontSize: '0.72rem', marginBottom: 8 }}>
          Constraint note
        </div>
        We did not prove “Indian patients are the same.” We proved race lacked significance as a covariate in a robust global model.
      </aside>
    </div>
  );
}

/** India · Pillars/setup companion — somatic vs germline paths (NotebookLM slide-05) */
export function SomaticPathsViz() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto minmax(0, 1fr) auto',
        gap: 'clamp(0.75rem, 1.6vh, 1.1rem)',
        height: '100%',
        minHeight: 0,
        ...GRID_BG,
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--cream-hairline)',
        padding: 'clamp(0.95rem, 1.9vh, 1.25rem)',
      }}
    >
      <div className="deck-display" style={{ fontSize: 'clamp(1rem, 1.35vw, 1.15rem)', fontWeight: 700, color: 'var(--cream)' }}>
        IDH1-mutant disease — which axis is operative?
      </div>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '0.75rem', minHeight: 0 }}>
        <PathRow
          accent="var(--amber)"
          title="Pathway A · Germline"
          steps={['Inherited variant', 'Population genetics', 'Ethnicity is the operative axis']}
          hypothesis="Competing: Indian patients differ enough in DME frequency, body size, or care setting to alter exposure/response."
          verdict="Failure if true"
          verdictTone="fail"
        />
        <PathRow
          accent="var(--cyan)"
          title="Pathway B · Somatic"
          steps={['Acquired in tumor', 'Tumor biology', 'Ethnicity removed as the operative axis']}
          hypothesis="Working: IDH1 mutation is somatic. Tumor biology does not have a nationality."
          verdict="Verified"
          verdictTone="pass"
        />
      </div>
      <ConclusionBar accent="var(--cyan)">
        The working hypothesis removes ethnicity as the operative axis — then every pillar becomes a kill-test, not a hope.
      </ConclusionBar>
    </div>
  );
}

function PathRow({
  accent,
  title,
  steps,
  hypothesis,
  verdict,
  verdictTone,
}: {
  accent: string;
  title: string;
  steps: string[];
  hypothesis: string;
  verdict: string;
  verdictTone: 'pass' | 'fail';
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        gap: '0.75rem',
        alignItems: 'center',
        minHeight: 0,
        padding: '0.65rem 0.75rem',
        border: `1px solid color-mix(in srgb, ${accent} 40%, var(--cream-hairline))`,
        borderRadius: 'var(--radius-sm)',
        background: 'var(--bg)',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div className="deck-mono uppercase" style={{ color: accent, fontWeight: 800, fontSize: '0.7rem', letterSpacing: 'var(--ls-mono)', marginBottom: 6 }}>
          {title}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
          {steps.map((s, i) => (
            <span
              key={s}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '0.25rem 0.5rem',
                border: `1px solid color-mix(in srgb, ${accent} 50%, transparent)`,
                borderRadius: 4,
                color: accent,
                fontSize: 'clamp(0.72rem, 1vh, 0.82rem)',
                fontWeight: 600,
              }}
            >
              {s}
              {i < steps.length - 1 ? <span style={{ opacity: 0.5 }}>→</span> : null}
            </span>
          ))}
        </div>
        <div className="deck-body" style={{ fontSize: 'clamp(0.8rem, 1.05vw, 0.92rem)', color: 'var(--cream-muted)', lineHeight: 1.4 }}>
          {hypothesis}
        </div>
      </div>
      <div
        style={{
          width: '5.5rem',
          textAlign: 'center',
          padding: '0.55rem 0.4rem',
          borderRadius: 'var(--radius-sm)',
          background: verdictTone === 'pass' ? 'var(--cyan)' : 'var(--amber)',
          color: '#fff',
          fontWeight: 800,
          fontSize: '0.72rem',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {verdict}
      </div>
    </div>
  );
}
