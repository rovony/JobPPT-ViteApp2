// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 28 · CS2 Impact — 36% enrollment reduction.
 *
 * Trimmed for delivery: one hero (−36% + patient grid), four compact
 * beats without body prose, one closing line. Detail lives in notes.
 */

const LEDGER = [
  { kicker: 'Regulatory', big: 'Type A', accent: false },
  { kicker: 'Operational', big: '34', suffix: 'patients', accent: false },
  { kicker: 'Scientific', big: '2 → 1', accent: false },
  { kicker: 'Durable', big: '∞', accent: true },
];

export default function Cs2AspImpact() {
  const ease = [0.2, 0.7, 0.3, 1];
  const overshoot = [0.34, 1.56, 0.64, 1];
  const reduce = useReducedMotion();
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    pct: 0.75,
    grid: 0.90,
    ledger: 1.45,
    payoff: 1.85,
    source: 2.40,
  };

  return (
    <SlideGrid
      dataCase="teal"
      areas={STANDARD_AREAS_NO_SUBHEAD}
      rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}
    >
      <Eyebrow color="var(--teal)" delay={D.eyebrow}>CS2 · Impact</Eyebrow>
      <Headline delay={D.headline} maxChars={52}>
        A{' '}
        <span style={{ color: 'var(--teal)', fontStyle: 'italic', fontWeight: 700 }}>
          36% enrollment reduction
        </span>
        . A documented precedent that travels.
      </Headline>

      <Viz>
        <div className="deck-viz-stack">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.72fr) minmax(0, 1.28fr)',
              columnGap: 'var(--space-6)',
              alignItems: 'center',
              minHeight: 0,
              flex: '1 1 auto',
            }}
          >
            <ImpactNumeral
              delay={D.pct}
              ease={ease}
              overshoot={overshoot}
              reduce={reduce}
            />
            <PatientGrid delay={D.grid} ease={ease} reduce={reduce} />
          </div>

          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 'var(--space-3)',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
            }}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: D.ledger }}
          >
            {LEDGER.map((beat) => (
              <LedgerChip key={beat.kicker} {...beat} />
            ))}
          </motion.div>

          <motion.div
            style={{
              padding: 'var(--space-4)',
              border: '1px solid color-mix(in srgb, var(--teal) 30%, transparent)',
              background: 'color-mix(in srgb, var(--teal) 6%, transparent)',
            }}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: D.payoff }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream-muted)',
                lineHeight: 1.45,
              }}
            >
              SPARK-ALL closed at N = 42 on a sponsor portfolio decision —{' '}
              <span style={{ color: 'var(--teal)', fontWeight: 700 }}>
                the FDA-agreed methodology is durable beyond any single program.
              </span>
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Impact"
        source="Source · FDA Type A 21 Jul 2023 · NCT04817761"
        delay={D.source}
      />
    </SlideGrid>
  );
}

function ImpactNumeral({ delay, ease, overshoot, reduce }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        minHeight: 0,
      }}
    >
      <motion.div
        layoutId="cs3-pct-36"
        className="deck-display italic"
        style={{
          fontSize: 'clamp(4.5rem, 11vw, 12rem)',
          fontWeight: 800,
          color: 'var(--teal)',
          letterSpacing: '-0.02em',
          lineHeight: 0.9,
        }}
        initial={reduce ? false : { opacity: 0, y: 20, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: overshoot, delay }}
      >
        −36%
      </motion.div>
      <motion.div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--teal)',
          fontWeight: 700,
        }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease, delay: delay + 0.2 }}
      >
        94 → 60 · 34 not enrolled
      </motion.div>
    </div>
  );
}

const TOTAL = 94;
const KEEP = 60;
const COLS = 14;

function PatientGrid({ delay, ease, reduce }) {
  const rows = Math.ceil(TOTAL / COLS);
  const figures = Array.from({ length: TOTAL }, (_, i) => ({ i, kept: i < KEEP }));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        minHeight: 0,
        minWidth: 0,
      }}
    >
      <svg
        viewBox={`0 0 ${COLS * 22} ${rows * 30}`}
        preserveAspectRatio="xMidYMid meet"
        aria-label="Ninety-four patient figures, sixty enrolled, thirty-four not enrolled"
        role="img"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: 'clamp(160px, 24vh, 280px)',
          display: 'block',
        }}
      >
        {figures.map(({ i, kept }) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const cx = col * 22 + 11;
          const cy = row * 30 + 15;
          return (
            <motion.g
              key={i}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                ease,
                delay: delay + (i / TOTAL) * 0.35,
              }}
            >
              <PatientFigure cx={cx} cy={cy} kept={kept} />
              {!kept && (
                <line
                  x1={cx - 7}
                  y1={cy + 1}
                  x2={cx + 7}
                  y2={cy + 1}
                  stroke="var(--cream-hairline)"
                  strokeWidth={1}
                  opacity={0.7}
                />
              )}
            </motion.g>
          );
        })}
      </svg>
      <div
        className="deck-mono uppercase"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
        }}
      >
        <span style={{ color: 'var(--teal)', fontWeight: 700 }}>60 enrolled</span>
        <span style={{ color: 'var(--cream-faint)' }}>34 not enrolled</span>
      </div>
    </div>
  );
}

function PatientFigure({ cx, cy, kept }) {
  const color = kept ? 'var(--teal)' : 'var(--cream-faint)';
  const opacity = kept ? 1 : 0.35;
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy - 6} r={3.2} fill={color} />
      <path
        d={`M ${cx - 5} ${cy + 8} C ${cx - 5} ${cy - 1}, ${cx + 5} ${cy - 1}, ${cx + 5} ${cy + 8} Z`}
        fill={color}
      />
    </g>
  );
}

function LedgerChip({ kicker, big, suffix, accent }) {
  return (
    <div
      style={{
        padding: 'var(--space-3) var(--space-4)',
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 40%, transparent)',
        minWidth: 0,
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: accent ? 'var(--teal)' : 'var(--cream-muted)',
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        {kicker}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1.25rem, 2vw, 2rem)',
          fontWeight: 700,
          color: accent ? 'var(--teal)' : 'var(--cream)',
          lineHeight: 1,
          fontStyle: accent ? 'italic' : 'normal',
        }}
      >
        {big}
        {suffix && (
          <span
            style={{
              fontSize: '0.42em',
              color: 'var(--cream-muted)',
              fontWeight: 500,
              fontStyle: 'normal',
              marginLeft: 4,
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
