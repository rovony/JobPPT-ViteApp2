// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Viz, Footer } from '@/components/deck/SlideParts';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import ConclusionBar from '../../components/cs1/ConclusionBar';

/**
 * Slide · CS2 Impact — 36% enrollment reduction · precedent travels.
 *
 * Light-editorial: solid panels, top accents, solid headline, delays ≤0.35s.
 * Honest coda: SPARK-ALL closed at N=42 on a portfolio decision.
 */

const LEDGER = [
  { kicker: 'Regulatory', big: 'Type A', accent: false },
  { kicker: 'Operational', big: '34', suffix: 'patients', accent: false },
  { kicker: 'Scientific', big: '2 → 1', accent: false },
  { kicker: 'Durable', big: '∞', accent: true },
];

const EASE = [0.2, 0.7, 0.3, 1];
const D = {
  eyebrow: 0.08,
  headline: 0.14,
  pct: 0.22,
  grid: 0.26,
  ledger: 0.30,
  takeaway: 0.35,
  source: 0.35,
};

export default function Cs2AspImpact() {
  const reduce = useReducedMotion();

  return (
    <SlideGrid
      dataCase="teal"
      areas={STANDARD_AREAS_NO_SUBHEAD}
      rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}
    >
      <Eyebrow color="var(--teal)" delay={D.eyebrow}>CS2 · Impact</Eyebrow>
      <SolidHeadline delay={D.headline} maxChars={52}>
        A{' '}
        <span style={{ color: 'var(--teal)', fontStyle: 'italic', fontWeight: 700 }}>
          36% enrollment reduction
        </span>
        . A documented precedent that travels.
      </SolidHeadline>

      <Viz>
        <div
          className="deck-viz-stack"
          style={{
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto auto',
            gap: 'var(--space-4)',
            height: '100%',
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.72fr) minmax(0, 1.28fr)',
              columnGap: 'var(--space-6)',
              alignItems: 'center',
              minHeight: 0,
            }}
          >
            <ImpactNumeral delay={D.pct} ease={EASE} reduce={reduce} />
            <PatientGrid delay={D.grid} ease={EASE} reduce={reduce} />
          </div>

          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 'var(--space-3)',
            }}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: EASE, delay: reduce ? 0 : D.ledger }}
          >
            {LEDGER.map((beat) => (
              <LedgerChip key={beat.kicker} {...beat} />
            ))}
          </motion.div>

          <ConclusionBar accent="var(--teal)">
            SPARK-ALL closed at N = 42 on a sponsor portfolio decision —{' '}
            <span style={{ color: 'var(--teal)', fontWeight: 700 }}>
              the FDA-agreed methodology is durable beyond any single program.
            </span>
          </ConclusionBar>
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

function ImpactNumeral({ delay, ease, reduce }) {
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
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease, delay: reduce ? 0 : delay }}
      >
        −36%
      </motion.div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--teal)',
          fontWeight: 700,
        }}
      >
        94 → 60 · 34 not enrolled
      </div>
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
          // Solid at rest — optional soft stagger only when motion allowed
          const figDelay = reduce ? 0 : Math.min(delay + (i / TOTAL) * 0.12, 0.35);
          return (
            <motion.g
              key={i}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease, delay: figDelay }}
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
          gap: 12,
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono)',
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
        padding: 'var(--space-4)',
        border: '1px solid var(--cream-hairline)',
        borderTop: `3px solid ${accent ? 'var(--teal)' : 'var(--cream-hairline)'}`,
        borderRadius: 'var(--radius-md)',
        background: 'var(--panel)',
        minWidth: 0,
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono)',
          color: accent ? 'var(--teal)' : 'var(--cream-muted)',
          fontWeight: 700,
          marginBottom: 8,
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
