// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 Asparlas · Impact — precedent travels; honest SPARK coda; Pharazi seam.
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
    eyebrow: 0.15,
    headline: 0.25,
    pct: 0.55,
    grid: 0.7,
    ledger: 1.15,
    coda: 1.45,
    seam: 1.7,
    source: 2.0,
  };

  return (
    <SlideGrid
      dataCase="3"
      areas={STANDARD_AREAS_NO_SUBHEAD}
      rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}
    >
      <Eyebrow color="var(--xc-case-3)" delay={D.eyebrow}>
        Case 03 · Impact
      </Eyebrow>
      <Headline delay={D.headline} maxChars={52}>
        The precedent travels{' '}
        <span style={{ color: 'var(--xc-case-3)', fontStyle: 'italic', fontWeight: 700 }}>
          further than the program did
        </span>
        .
      </Headline>

      <Viz>
        <div className="asp-viz-stack">
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
            className="asp-coda"
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: D.coda }}
          >
            SPARK-ALL later closed at forty-two patients on a sponsor portfolio decision,
            independent of design quality.{' '}
            <strong>The Type A methodology is durable beyond any single program.</strong>
          </motion.div>

          <motion.p
            className="asp-pharazi-seam"
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: D.seam }}
          >
            Size the cohort on the precision the next decision needs — not on endpoint power you
            cannot afford. All three cases so far end the same way: someone had to reconstruct how a
            number was produced before they would act on it.{' '}
            <strong>
              The last case asks whether that reconstruction survives when the analysis gets faster
              than the review.
            </strong>
          </motion.p>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Impact"
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
        className="xc-hero-num italic"
        style={{
          fontWeight: 800,
          color: 'var(--xc-case-3)',
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
        className="xc-tagline-mono"
        style={{ color: 'var(--xc-case-3)' }}
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
          maxHeight: 'clamp(140px, 20vh, 240px)',
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
        className="xc-card-label xc-ink-muted"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
        }}
      >
        <span style={{ color: 'var(--xc-case-3)', fontWeight: 700 }}>60 enrolled</span>
        <span style={{ color: 'var(--cream-faint)' }}>34 not enrolled</span>
      </div>
    </div>
  );
}

function PatientFigure({ cx, cy, kept }) {
  const color = kept ? 'var(--xc-case-3)' : 'var(--cream-faint)';
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
        className="xc-card-label"
        style={{
          color: accent ? 'var(--xc-case-3)' : 'var(--cream-muted)',
          marginBottom: 6,
        }}
      >
        {kicker}
      </div>
      <div
        className="xc-title"
        style={{
          fontWeight: 700,
          color: accent ? 'var(--xc-case-3)' : 'var(--cream)',
          lineHeight: 1,
          fontStyle: accent ? 'italic' : 'normal',
        }}
      >
        {big}
        {suffix && (
          <span
            className="xc-stat-unit"
            style={{
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
