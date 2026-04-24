import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 32 · Record at scale — Twelve years. The record at scale.
 *
 * Big-numeral grid that converts the breadth slide's "depth + scope"
 * into a single quantitative receipt. The numerals are deliberately
 * heterogeneous in unit (years, count, plural marker, patent ID) so
 * the eye treats each tile as a separate fact rather than a
 * continuous bar chart — this is editorial typography, not a
 * dashboard.
 *
 * Layout: 4-3 grid (top row 4 tiles, bottom row 3 tiles) on the
 * authoring viewport. Falls back to 2-2-2-1 stacking on narrow
 * viewports via grid auto-flow.
 *
 * Numeric tiles use a count-up animation (same primitive as
 * slide 13) so each number arrives, not just appears. The lone
 * patent ID tile stays static text — a serial number doesn't
 * count up, it just IS.
 */

const TILES = [
  {
    id: 'domains',
    value: 6,
    suffix: '',
    label: 'Domains of impact',
    detail: 'Cardiometabolic · oncology · rare disease · antiviral · regulatory · AI/ML',
    token: 'amber',
  },
  {
    id: 'submissions',
    value: 8,
    suffix: '',
    label: 'Regulatory submissions',
    detail: 'Across two major pharmaceutical sponsors',
    token: 'cyan',
  },
  {
    id: 'agencies',
    value: 6,
    suffix: '',
    label: 'Global agencies',
    detail: 'FDA · EMA · PMDA · NMPA · MFDS · CDSCO',
    token: 'sage',
  },
  {
    id: 'labels',
    value: 4,
    suffix: '',
    label: 'Approved labels',
    detail: 'Across two major pharmaceutical companies',
    token: 'coral',
  },
  {
    id: 'pubs',
    value: 20,
    suffix: '+',
    label: 'Peer-reviewed publications',
    detail: 'CPT · JCP · CTS · journals across pharmacometrics',
    token: 'violet',
  },
  {
    id: 'tools',
    value: 3,
    suffix: '',
    label: 'Tools built',
    detail: 'DosePredict · DeepPK · PharmAgent',
    token: 'amber',
  },
  {
    id: 'patent',
    value: null,
    static: 'AU2023213173A1',
    label: 'Patent',
    detail: 'IP Australia · 2023 · neural-ODE-based PopPK methodology',
    token: 'cream',
  },
];

export default function Slide32RecordAtScale() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    grid: 1.00,
    ribbon: 3.10,
    source: 2.80,
  };

  const T = useTokens([
    '--coral', '--amber', '--cyan', '--sage', '--violet',
    '--cream', '--cream-muted', '--cream-faint', '--cream-hairline',
  ]);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={D.eyebrow}>Closing · Record at scale</Eyebrow>
      <Headline delay={D.headline} maxChars={42}>
        Twelve years.{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
          The record at scale.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        A methodology record that maps to every part of the mission —
        and extends beyond it.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: '1fr auto',
            rowGap: 'var(--space-5)',
            minHeight: 0,
          }}
        >
          {/* 4-3 grid via auto-rows; fall back to 2-col on narrow */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridAutoRows: '1fr',
              gap: 'var(--space-4)',
              minHeight: 0,
            }}
            className="record-tile-grid"
          >
            {TILES.map((tile, i) => (
              <RecordTile
                key={tile.id}
                tile={tile}
                delay={D.grid + i * 0.10}
                tk={tk}
                isLastRowFiller={false}
              />
            ))}
          </div>

          {/* Bottom payoff ribbon */}
          <motion.div
            style={{
              padding: 'var(--space-4) var(--space-5)',
              borderTop: '1px solid var(--cream-hairline)',
              borderBottom: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 35%, transparent)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.ribbon }}
          >
            <p
              className="deck-display italic"
              style={{
                margin: 0,
                fontSize: 'clamp(0.95rem, 1.15vw, 1.20rem)',
                lineHeight: 1.5,
                color: 'var(--cream)',
                textAlign: 'center',
                fontWeight: 400,
              }}
            >
              Breadth that maps to every part of the mission —{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 700 }}>
                and a methodology record that extends beyond it.
              </span>
            </p>
          </motion.div>

          {/* Last-row centering helper: when the 7th tile sits alone,
              scoot it up under the 5th column position. CSS fallback
              for narrow viewports leaves it left-aligned. */}
          <style>{`
            .record-tile-grid > :nth-child(7) {
              grid-column: 2 / span 2;
              max-width: 100%;
            }
            @media (max-width: 1100px) {
              .record-tile-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
              .record-tile-grid > :nth-child(7) {
                grid-column: 1 / -1 !important;
              }
            }
          `}</style>
        </div>
      </Viz>

      <Footer
        kicker="Closing · 32 of 35"
        tagline="Source · CPT 2019 · JCP 2020 · JCP 2023 · CTS 2020 · IP Australia 2023"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   RecordTile — one big-numeral tile in the record grid
   ======================================================== */
function RecordTile({ tile, delay, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const color = tk(`--${tile.token}`);

  return (
    <motion.div
      style={{
        padding: 'var(--space-4) var(--space-4) var(--space-3) var(--space-4)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: `3px solid ${color}`,
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        rowGap: 8,
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {/* Numeral / static identifier */}
      <div
        className="deck-display"
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 4,
          color,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {tile.static ? (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.05rem, 1.4vw, 1.4rem)',
              letterSpacing: '0.05em',
            }}
          >
            {tile.static}
          </span>
        ) : (
          <>
            <CountUpDigit
              target={tile.value}
              delay={delay + 0.1}
              duration={0.9}
              style={{
                fontSize: 'clamp(2.2rem, 3.6vw, 4rem)',
                fontWeight: 700,
              }}
            />
            {tile.suffix && (
              <span
                style={{
                  fontSize: 'clamp(1.4rem, 2.4vw, 2.6rem)',
                  fontWeight: 600,
                  marginLeft: 2,
                }}
              >
                {tile.suffix}
              </span>
            )}
          </>
        )}
      </div>

      {/* Label + detail */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'flex-end' }}>
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: '0.68rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream)',
            fontWeight: 700,
          }}
        >
          {tile.label}
        </div>
        <div
          className="deck-display italic"
          style={{
            fontSize: 'clamp(0.74rem, 0.84vw, 0.88rem)',
            color: 'var(--cream-muted)',
            lineHeight: 1.4,
          }}
        >
          {tile.detail}
        </div>
      </div>
    </motion.div>
  );
}

/* ========================================================
   CountUpDigit — animated count-up numeral.
   Lifted from slide 13 (case-impact) so the visual cadence
   on Act IV's record numbers matches the CS1 ×2 / ~3% / 39
   pattern users have already seen.
   ======================================================== */
function CountUpDigit({ target, delay = 0, duration = 0.9, style }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      delay,
      ease: [0.2, 0.7, 0.3, 1],
    });
    return controls.stop;
  }, [count, target, duration, delay]);

  return (
    <motion.span className="deck-display tabular-nums" style={style}>
      {rounded}
    </motion.span>
  );
}
