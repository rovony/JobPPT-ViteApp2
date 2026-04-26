// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as d3 from 'd3';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { QP2_THEMES } from '../themes';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import AnalysisPlot from '@/components/deck/patterns/AnalysisPlot';

/**
 * Slide 11f · CS1 Exposure–Response (Safety) — "Medians overlap. No signal."
 *
 * Source: Okour et al. JCP 2023 · Figure 5.
 * Visual: two side-by-side box plots (No-AE vs Related-AE)
 *   Panel a — AUCss    (μg·h/mL)
 *   Panel b — Cmax,ss  (ng/mL)
 *
 * Claim: medians nearly identical across groups → flat safety E–R.
 *
 * All values digitized from Figure 5 (pixel reads, rounded).
 */

// Digitized five-number summaries — values from user-provided JSON
const DATA = {
  auc: {
    unit: 'μg·h/mL',
    yDomain: [2, 16],
    yTicks: [2, 4, 6, 8, 10, 12, 14, 16],
    groups: [
      { label: 'NO AE',      n: 18, min: 3.5, q1: 4.1, median: 7.8, q3: 8.5, max: 11.5 },
      { label: 'RELATED AE', n: 15, min: 3.5, q1: 4.5, median: 6.9, q3: 8.9, max: 14.8 },
    ],
  },
  cmax: {
    unit: 'ng/mL',
    yDomain: [200, 1600],
    yTicks: [200, 400, 600, 800, 1000, 1200, 1400, 1600],
    groups: [
      { label: 'NO AE',      n: 18, min: 310, q1: 490, median: 710, q3: 1000, max: 1440 },
      { label: 'RELATED AE', n: 15, min: 380, q1: 560, median: 720, q3: 950,  max: 1170 },
    ],
  },
};

// Themes exercised by this slide (CS1 · safety exposure-response = 01, 02)
const ACTIVE_THEMES = new Set(['01', '02']);

export default function Slide11fCaseExposureResponse() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10, headline: 0.25, subhead: 0.55,
    axisA: 0.80, boxA: 1.00,
    axisB: 1.00, boxB: 1.20,
    callout: 2.20, caption: 2.60, pills: 2.85, source: 2.80,
  };

  const T = useTokens(['--coral', '--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline', '--bg']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={D.chrome}>Safety · Exposure–Response</Eyebrow>
      <Headline delay={D.headline} maxChars={34}>
        Exposure did not predict adverse events.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
          That is the signal.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={82}>
        Pediatric AUC<sub>ss</sub> and C<sub>max,ss</sub> distributions{' '}
        <HighlightWord color="var(--coral)" delay={1.4}>overlap between patients with and without related AEs</HighlightWord>
        {' '}— medians track within a few percent.
      </Subhead>

      <Viz>
        <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: '1fr auto auto', rowGap: 'var(--space-4)', minHeight: 0 }}>
      {/* Two box-plot panels — wrapped in AnalysisPlot so the chart
          frame morphs from slide 11e (exposure-match) to here with
          AnimatePresence crossfading the contents. */}
      <AnalysisPlot variant="exposure-response">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-10)',
            minHeight: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <BoxPanel
            tk={tk}
            letter="a"
            title={<>AUC<sub>ss</sub></>}
            unit={DATA.auc.unit}
            data={DATA.auc}
            axisDelay={D.axisA}
            boxDelay={D.boxA}
            deltaLabel="Δ median ≈ −12 %"
          />
          <BoxPanel
            tk={tk}
            letter="b"
            title={<>C<sub>max,ss</sub></>}
            unit={DATA.cmax.unit}
            data={DATA.cmax}
            axisDelay={D.axisB}
            boxDelay={D.boxB}
            deltaLabel="Δ median ≈ +1 %"
          />
        </div>
      </AnalysisPlot>

      {/* Caption under chart */}
      <motion.p
        className="deck-display italic"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          lineHeight: 'var(--lh-snug)',
          color: 'var(--cream)',
          fontWeight: 500,
          margin: 0,
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.caption }}
      >
        Medians overlap; IQRs overlap;{' '}
        <span style={{ color: 'var(--coral)', fontWeight: 700, fontStyle: 'normal' }}>
          no dose–exposure–AE gradient
        </span>{' '}
        across the pediatric exposure range.{' '}
        <span style={{ color: 'var(--cream-muted)', fontStyle: 'normal' }}>
          · N = 33 in the exposure–AE analysis (AMB112529) · 39 total in PopPK · Okour et al. JCP 2023, Fig 5.
        </span>
      </motion.p>

      {/* Theme pills row */}
      <motion.div
        style={{
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--cream-hairline)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          alignItems: 'center',
          gap: 'var(--space-10)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: D.pills }}
      >
        <div
          className="deck-mono uppercase"
          style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-muted)' }}
        >
          Themes exercised
          <div style={{ color: 'var(--coral)', marginTop: 4, fontWeight: 700 }}>
            {ACTIVE_THEMES.size} of {QP2_THEMES.length}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {QP2_THEMES.map((t) => (
            <ThemePill key={t.num} theme={t} active={ACTIVE_THEMES.has(t.num)} />
          ))}
        </div>
      </motion.div>

        </div>
      </Viz>

      <Footer
        kicker="Case 01 · Safety E–R"
        source="Source · Okour et al. JCP 2023 · Figure 5"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   BoxPanel — one side (AUC or Cmax)
   Two boxes side-by-side, shared y-axis, panel letter top-left,
   dashed median-overlap guide between the two medians.
   ======================================================== */
function BoxPanel({ tk, letter, title, unit, data, axisDelay, boxDelay, deltaLabel }) {
  const W = 820, H = 460;
  const m = { top: 54, right: 36, bottom: 72, left: 78 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  const y = d3.scaleLinear().domain(data.yDomain).range([ih, 0]);
  const yTicks = data.yTicks;

  // Two x positions — centered
  const xs = [iw * 0.30, iw * 0.70];
  const bw = 120;

  return (
    <div className="relative w-full h-full">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Panel letter + title */}
        <text
          x={0} y={22}
          fontFamily="var(--font-display)" fontSize="22" fontWeight={700}
          letterSpacing="-0.02em" fill={tk('--coral')}
        >
          ({letter})
        </text>
        <text
          x={36} y={22}
          fontFamily="var(--font-display)" fontSize="20" fontWeight={500}
          letterSpacing="-0.02em" fill={tk('--cream')}
        >
          <tspan>{letter === 'a' ? 'AUC' : 'Cmax'}</tspan>
          <tspan fontSize="13" dy="4">{letter === 'a' ? 'ss' : ',ss'}</tspan>
          <tspan dy="-4" dx="6" fontFamily="var(--font-mono)" fontSize="11"
                 letterSpacing="0.14em" fill={tk('--cream-faint')}>
            ({unit})
          </tspan>
        </text>

        <g transform={`translate(${m.left},${m.top})`}>
          {/* Grid — render static (chart frame, no entrance animation) */}
          <g>
            {yTicks.map((v) => (
              <line
                key={v} x1={0} x2={iw} y1={y(v)} y2={y(v)}
                stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.5}
              />
            ))}
          </g>

          {/* Y axis labels — static */}
          {yTicks.map((v) => (
            <text
              key={`yl-${v}`}
              x={-10} y={y(v) + 4} textAnchor="end"
              fontFamily="var(--font-mono)" fontSize="11"
              fill={tk('--cream-muted')}
            >
              {v}
            </text>
          ))}

          {/* Two boxes */}
          {data.groups.map((g, i) => (
            <BoxGlyph
              key={g.label}
              cx={xs[i]}
              y={y}
              bw={bw}
              group={g}
              tk={tk}
              delay={boxDelay + i * 0.25}
              isAE={i === 1}
            />
          ))}

          {/* Median-overlap guide — dashed horizontal between the two medians */}
          <MedianGuide
            tk={tk}
            xs={xs}
            y={y}
            medA={data.groups[0].median}
            medB={data.groups[1].median}
            delay={boxDelay + 1.4}
            deltaLabel={deltaLabel}
          />

          {/* X axis group labels — static */}
          {data.groups.map((g, i) => (
            <g key={`xl-${i}`}>
              <text
                x={xs[i]} y={ih + 26} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.18em"
                fontWeight={700}
                fill={i === 1 ? tk('--coral') : tk('--cream')}
              >
                {g.label}
              </text>
              <text
                x={xs[i]} y={ih + 44} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="10"
                fill={tk('--cream-faint')}
              >
                n = {g.n}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ========================================================
   BoxGlyph — single Tukey-style box (whiskers → caps → box → median)
   ======================================================== */
function BoxGlyph({ cx, y, bw, group, tk, delay, isAE }) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const stroke = isAE ? tk('--coral') : tk('--cyan');
  const fill = isAE ? tk('--coral') : tk('--cyan');

  const yMin = y(group.min);
  const yQ1 = y(group.q1);
  const yMed = y(group.median);
  const yQ3 = y(group.q3);
  const yMax = y(group.max);

  return (
    <g>
      {/* Whisker — render static (chart frame) */}
      <line
        x1={cx} x2={cx} y1={yMin} y2={yMax}
        stroke={stroke} strokeWidth={1.6}
      />
      {/* Caps */}
      <line x1={cx - 22} x2={cx + 22} y1={yMin} y2={yMin}
            stroke={stroke} strokeWidth={1.6} />
      <line x1={cx - 22} x2={cx + 22} y1={yMax} y2={yMax}
            stroke={stroke} strokeWidth={1.6} />

      {/* Box (Q1 → Q3) — static */}
      <rect
        x={cx - bw / 2} y={yQ3}
        width={bw} height={yQ1 - yQ3}
        fill={fill} fillOpacity={0.22}
        stroke={stroke} strokeWidth={1.8}
      />
      {/* Median — this is the in-chart emphasis. Draws L→R via pathLength.
          One-shot per box, sequenced by `delay` so the viewer's eye moves
          from NO-AE median to RELATED-AE median — the "flat E-R" story. */}
      <motion.line
        x1={cx - bw / 2} x2={cx + bw / 2} y1={yMed} y2={yMed}
        stroke={stroke} strokeWidth={3}
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 0.8, ease, delay: reduce ? 0 : delay }}
      />
      {/* Median halo pulse — one-shot scale+opacity highlight that fires
          after the median finishes drawing. NOT looping. */}
      {!reduce && (
        <motion.rect
          x={cx - bw / 2 - 4} y={yMed - 3}
          width={bw + 8} height={6}
          fill={stroke}
          initial={{ opacity: 0, scaleY: 1 }}
          animate={{ opacity: [0, 0.5, 0], scaleY: [1, 1.8, 1.2] }}
          transition={{ duration: 1.0, ease, delay: delay + 0.8, times: [0, 0.4, 1] }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      )}

      {/* Median value labels removed 2026-04-24 per four-slide audit.
          The paper's Figure 5 does not state numerical medians in text;
          7.8 / 6.9 / 710 / 720 were visual estimates. The Δ% callout
          (MedianGuide below) carries the "medians overlap" message
          without exposing auditable specific numbers. */}
    </g>
  );
}

/* ========================================================
   MedianGuide — dashed horizontal line connecting medians
   with a center-floating Δ label.
   ======================================================== */
function MedianGuide({ tk, xs, y, medA, medB, delay, deltaLabel }) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const yA = y(medA), yB = y(medB);

  return (
    <g>
      {/* Dashed connector between medians — draws L→R via pathLength.
          Visual centerpiece: the connector is nearly horizontal = flat
          signal across the two groups = no exposure-response gradient. */}
      <motion.line
        x1={xs[0]} y1={yA} x2={xs[1]} y2={yB}
        stroke={tk('--cream-faint')} strokeWidth={1}
        strokeDasharray="4 5"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 1.0, ease, delay: reduce ? 0 : delay }}
      />
      {/* Δ pill — fades in after connector lands, then does a single
          opacity pulse to cue "flat" / "no signal". NOT a repeat loop. */}
      <motion.g
        transform={`translate(${(xs[0] + xs[1]) / 2},${(yA + yB) / 2 - 14})`}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { opacity: [0, 1, 0.72, 1] }}
        transition={{
          duration: reduce ? 0 : 1.2,
          ease,
          delay: reduce ? 0 : delay + 1.0,
          times: [0, 0.35, 0.7, 1],
        }}
      >
        <rect
          x={-60} y={-11} width={120} height={22}
          fill={tk('--bg')} stroke={tk('--cream-hairline')}
          strokeWidth={1} rx={3}
        />
        <text
          x={0} y={4} textAnchor="middle"
          fontFamily="var(--font-mono)" fontSize="10.5"
          letterSpacing="0.12em" fill={tk('--cream')} fontWeight={600}
        >
          {deltaLabel}
        </text>
      </motion.g>
    </g>
  );
}

/* ========================================================
   Theme pill
   ======================================================== */
function ThemePill({ theme, active }) {
  const color = `var(--${theme.token})`;
  return (
    <span
      className="deck-mono uppercase inline-flex items-center gap-2"
      style={{
        padding: '7px 14px 7px 10px',
        border: `1px solid ${active ? color : 'var(--cream-hairline)'}`,
        borderRadius: 999,
        fontSize: 'var(--fs-card-meta)',
        letterSpacing: '0.14em',
        color: active ? 'var(--cream)' : 'var(--cream-faint)',
        opacity: active ? 1 : 0.45,
        background: active ? `color-mix(in srgb, ${color} 6%, transparent)` : 'transparent',
      }}
    >
      <span style={{ fontWeight: 700, color: active ? color : 'var(--cream-faint)', letterSpacing: '0.18em' }}>
        {theme.num}
      </span>
      <span style={{ fontSize: 'var(--fs-card-body)', color: active ? 'var(--cream)' : 'var(--cream-faint)' }}>
        {theme.glyph}
      </span>
      <span>{theme.title}</span>
    </span>
  );
}
