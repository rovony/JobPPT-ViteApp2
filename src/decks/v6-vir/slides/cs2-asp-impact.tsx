// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 28 · CS2 Impact — A 36% enrollment reduction.
 *
 * 2026-04-24 redesign (Agent D · CS2 cluster fix):
 *   The previous version was three big-numeral columns (−36% · 3× · 2)
 *   wrapped in a violet-tinted "Durable contribution" card. The user
 *   asked for the same editorial discipline as slide 13 (CS1 impact)
 *   and slide 22 (CS2 impact-bridge): ONE dominant claim, supporting
 *   meta beneath, no decorative card chrome.
 *
 * Composition:
 *   • LEFT — Oversize −36% numeral (target of the cs3-pct-36 layoutId
 *     pair · morphs in from the SampleSizeWaterfall callout on slide 26).
 *     Below the numeral: "94 → 60 patients · primary-endpoint evaluable"
 *     and the FDA-anchor cite.
 *   • RIGHT — 94-patient figure grid. 60 patients render in solid
 *     violet (the agreed N). 34 patients render dim/struck-through
 *     (the patients NOT enrolled). The eye reads the 34 dim figures
 *     as the human cost the methodology saved.
 *   • BOTTOM — 4-beat methodology ledger: regulatory · operational ·
 *     scientific · durable. Hairline-only, no card chrome.
 *
 * Removed:
 *   • Three-column NumeralBlock layout (−36% · 3× · 2) — collapsed
 *     into the editorial single-claim layout above.
 *   • Rounded "Durable contribution" callout (borderRadius: 6) — its
 *     payoff line is now the bottom-of-ledger sentence, no chrome.
 */

export default function Cs2AspImpact() {
  const ease = [0.2, 0.7, 0.3, 1];
  const overshoot = [0.34, 1.56, 0.64, 1];
  const reduce = useReducedMotion();
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    pct: 0.95,
    pctMeta: 1.55,
    grid: 1.10,
    gridDim: 2.10,
    ledger: 3.05,
    payoff: 3.85,
    source: 2.80,
  };

  const T = useTokens(['--teal', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="teal" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--teal)" delay={D.eyebrow}>CS2 · Impact</Eyebrow>
      <Headline delay={D.headline} maxChars={48}>
        A{' '}
        <span style={{ color: 'var(--teal)', fontStyle: 'italic', fontWeight: 700 }}>
          36% enrollment reduction
        </span>
        . A documented precedent. A methodology that travels.
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        FDA-agreed at Type A · pharmacometric anchor + safety framework — the same N landed by two
        independent methods, with{' '}
        <span style={{ color: 'var(--teal)', fontWeight: 600 }}>
          34 patients not enrolled
        </span>
        .
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto auto',
            rowGap: 'var(--space-5)',
            minHeight: 0,
          }}
        >
          {/* Hero band — −36% (left) | 94-patient grid (right) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
              columnGap: 'var(--space-7)',
              alignItems: 'center',
              minHeight: 0,
            }}
          >
            <ImpactNumeral
              delay={D.pct}
              metaDelay={D.pctMeta}
              ease={ease}
              overshoot={overshoot}
              reduce={reduce}
            />
            <PatientGrid
              delay={D.grid}
              dimDelay={D.gridDim}
              ease={ease}
              reduce={reduce}
            />
          </div>

          {/* Methodology ledger — 4 beats, hairline-only */}
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              columnGap: 'var(--space-5)',
              paddingTop: 'var(--space-3)',
              paddingBottom: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
              borderBottom: '1px solid var(--cream-hairline)',
            }}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.ledger }}
          >
            <LedgerBeat
              kicker="Regulatory"
              big="Type A"
              body="FDA Type A record of a 36% reduction in adult enrollment · anchored on AE-detection probability ≥ 85%."
            />
            <LedgerBeat
              kicker="Operational"
              big="34"
              suffix="patients"
              body="Per-patient information density up · trial footprint down · faster path to read-out."
            />
            <LedgerBeat
              kicker="Scientific"
              big="2 → 1"
              body="Two independent statistical paths (pharmacometrics + biostatistics) converged on the same N."
            />
            <LedgerBeat
              kicker="Durable"
              big="∞"
              body="Methodology now travels independent of the trial outcome — template for rare-population designs."
              accent
            />
          </motion.div>

          {/* Closing payoff — inline italic, no card chrome */}
          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              gap: '8px 18px',
            }}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: D.payoff }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--teal)',
                fontWeight: 700,
              }}
            >
              Durable contribution
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-card-body)',
                color: 'var(--cream)',
                lineHeight: 1.5,
                flex: '1 1 480px',
              }}
            >
              SPARK-ALL ended at N = 42 on a sponsor portfolio decision (Feb 2026), independent of
              design quality —{' '}
              <span style={{ color: 'var(--teal)', fontWeight: 700 }}>
                the FDA-agreed methodology is durable beyond any single program.
              </span>
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Impact"
        source="Source · FDA Type A 21 Jul 2023 · NCT04817761 (status 9 Feb 2026)"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   ImpactNumeral — oversize −36% numeral.
   Carries layoutId="cs3-pct-36" so the bbox flies in from the
   SampleSizeWaterfall callout on slide 26 when advancing 26→28.
   ======================================================== */
function ImpactNumeral({ delay, metaDelay, ease, overshoot, reduce }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 'var(--space-3)',
        minHeight: 0,
      }}
    >
      <motion.div
        layoutId="cs3-pct-36"
        className="deck-display italic"
        style={{
          fontSize: 'clamp(6rem, 14vw, 16rem)',
          fontWeight: 800,
          color: 'var(--teal)',
          letterSpacing: '-0.02em',
          lineHeight: 0.86,
        }}
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: overshoot, delay }}
      >
        −36%
      </motion.div>
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          alignItems: 'flex-start',
        }}
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: metaDelay }}
      >
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-tagline)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--teal)',
            fontWeight: 700,
          }}
        >
          Sample-size reduction · adult Ph-neg ALL
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-title)',
            color: 'var(--cream)',
            lineHeight: 1.35,
            maxWidth: '36ch',
          }}
        >
          From{' '}
          <span style={{ color: 'var(--cream)', fontWeight: 700 }}>94</span>{' '}
          patients budgeted to{' '}
          <span style={{ color: 'var(--teal)', fontWeight: 700 }}>60</span>{' '}
          required — primary-endpoint evaluable, FDA-agreed via AE-detection probability ≥ 85%.
        </span>
      </motion.div>
    </div>
  );
}

/* ========================================================
   PatientGrid — 94 patient-figure dots arranged in a 16×6 grid
   (last row partial). 60 patients render in solid violet (the
   agreed N). 34 patients render dim with a strike-through line
   (the patients NOT enrolled). The eye reads the 34 dim figures
   as the human cost the methodology saved.
   ======================================================== */
const TOTAL = 94;
const KEEP = 60;
const COLS = 16;

function PatientGrid({ delay, dimDelay, ease, reduce }) {
  const rows = Math.ceil(TOTAL / COLS);
  const figures = Array.from({ length: TOTAL }, (_, i) => ({ i, kept: i < KEEP }));
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 'var(--space-3)',
        minHeight: 0,
        minWidth: 0,
      }}
    >
      <svg
        viewBox={`0 0 ${COLS * 22} ${rows * 30}`}
        preserveAspectRatio="xMidYMid meet"
        aria-label="Ninety-four patient figures · sixty enrolled in violet · thirty-four dimmed and struck through"
        role="img"
        style={{ width: '100%', height: '100%', maxHeight: 'clamp(220px, 32vh, 360px)', display: 'block' }}
      >
        {figures.map(({ i, kept }) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const cx = col * 22 + 11;
          const cy = row * 30 + 15;
          return (
            <g key={i}>
              <motion.g
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  ease,
                  delay: kept
                    ? delay + (i / KEEP) * 0.6
                    : dimDelay + ((i - KEEP) / (TOTAL - KEEP)) * 0.45,
                }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              >
                <PatientFigure
                  cx={cx}
                  cy={cy}
                  kept={kept}
                />
              </motion.g>
              {!kept && (
                <motion.line
                  x1={cx - 8}
                  y1={cy + 1}
                  x2={cx + 8}
                  y2={cy + 1}
                  stroke="var(--cream-hairline)"
                  strokeWidth={1}
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{
                    duration: 0.35,
                    ease,
                    delay: dimDelay + 0.4 + ((i - KEEP) / (TOTAL - KEEP)) * 0.45,
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>
      <div
        className="deck-mono uppercase"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          gap: '4px 14px',
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
        }}
      >
        <span style={{ color: 'var(--teal)', fontWeight: 700 }}>■ 60 enrolled</span>
        <span style={{ color: 'var(--cream-faint)', fontWeight: 700 }}>■ 34 not enrolled</span>
        <span style={{ color: 'var(--cream-muted)' }}>· each figure = one patient</span>
      </div>
    </div>
  );
}

function PatientFigure({ cx, cy, kept }) {
  // Compact stick figure: head circle + shoulders/torso path. Drawn
  // around (cx, cy) so the parent can place it on a grid.
  const violet = 'var(--teal)';
  const dim = 'var(--cream-faint)';
  const color = kept ? violet : dim;
  const fillOpacity = kept ? 1 : 0.32;
  const strokeOpacity = kept ? 1 : 0.5;
  return (
    <g>
      {/* head */}
      <circle cx={cx} cy={cy - 6} r={3.2} fill={color} fillOpacity={fillOpacity} />
      {/* shoulders + torso */}
      <path
        d={`M ${cx - 5} ${cy + 8}
            C ${cx - 5} ${cy - 1}, ${cx + 5} ${cy - 1}, ${cx + 5} ${cy + 8}
            Z`}
        fill={color}
        fillOpacity={fillOpacity}
        stroke="none"
      />
      {/* baseline tick (only on kept, optional accent) */}
      {kept ? null : (
        <line
          x1={cx - 5}
          y1={cy + 9}
          x2={cx + 5}
          y2={cy + 9}
          stroke={color}
          strokeWidth={0.6}
          opacity={strokeOpacity * 0.5}
        />
      )}
    </g>
  );
}

/* ========================================================
   LedgerBeat — single beat in the 4-up methodology ledger.
   Hairline-only (no card chrome), kicker + big numeral + body
   prose. The "Durable" beat carries a violet accent so the eye
   lands there last.
   ======================================================== */
function LedgerBeat({ kicker, big, suffix, body, accent }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
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
        }}
      >
        {kicker}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1.4rem, 2.4vw, 2.4rem)',
          fontWeight: 700,
          color: accent ? 'var(--teal)' : 'var(--cream)',
          letterSpacing: 'var(--ls-headline)',
          lineHeight: 1,
          fontStyle: accent ? 'italic' : 'normal',
        }}
      >
        {big}
        {suffix && (
          <span
            style={{
              fontSize: '0.45em',
              color: 'var(--cream-muted)',
              fontWeight: 400,
              fontStyle: 'normal',
              marginLeft: 6,
              letterSpacing: 0,
            }}
          >
            {suffix}
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
      >
        {body}
      </div>
    </div>
  );
}
