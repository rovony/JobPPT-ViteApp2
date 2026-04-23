import React from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { QP2_THEMES } from '../themes';
import HighlightWord from '@/components/deck/patterns/HighlightWord';

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
    callout: 2.20, caption: 2.60, pills: 2.85, source: 3.10,
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
      {/* Two box-plot panels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-10)',
          minHeight: 0,
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
          · N = 33 pediatric patients with evaluable PK (AMB112529) · Okour et al. JCP 2023, Fig 5.
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
          style={{ fontSize: '0.65rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-muted)' }}
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
        tagline="Source · Okour et al. JCP 2023 · Figure 5"
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
          {/* Grid */}
          <motion.g
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: axisDelay }}
          >
            {yTicks.map((v) => (
              <line
                key={v} x1={0} x2={iw} y1={y(v)} y2={y(v)}
                stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.5}
              />
            ))}
          </motion.g>

          {/* Y axis labels */}
          {yTicks.map((v) => (
            <motion.text
              key={`yl-${v}`}
              x={-10} y={y(v) + 4} textAnchor="end"
              fontFamily="var(--font-mono)" fontSize="11"
              fill={tk('--cream-muted')}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: axisDelay }}
            >
              {v}
            </motion.text>
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

          {/* X axis group labels */}
          {data.groups.map((g, i) => (
            <g key={`xl-${i}`}>
              <motion.text
                x={xs[i]} y={ih + 26} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.18em"
                fontWeight={700}
                fill={i === 1 ? tk('--coral') : tk('--cream')}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: axisDelay + 0.15 }}
              >
                {g.label}
              </motion.text>
              <motion.text
                x={xs[i]} y={ih + 44} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="10"
                fill={tk('--cream-faint')}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: axisDelay + 0.2 }}
              >
                n = {g.n}
              </motion.text>
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
  const ease = [0.2, 0.7, 0.3, 1];
  const stroke = isAE ? tk('--coral') : tk('--cyan');
  const fill = isAE ? tk('--coral') : tk('--cyan');

  const yMin = y(group.min);
  const yQ1 = y(group.q1);
  const yMed = y(group.median);
  const yQ3 = y(group.q3);
  const yMax = y(group.max);

  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {/* Whisker */}
      <motion.line
        x1={cx} x2={cx} y1={yMin} y2={yMax}
        stroke={stroke} strokeWidth={1.6}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease, delay }}
      />
      {/* Caps */}
      <line x1={cx - 22} x2={cx + 22} y1={yMin} y2={yMin}
            stroke={stroke} strokeWidth={1.6} />
      <line x1={cx - 22} x2={cx + 22} y1={yMax} y2={yMax}
            stroke={stroke} strokeWidth={1.6} />

      {/* Box (Q1 → Q3) */}
      <motion.rect
        x={cx - bw / 2} y={yQ3}
        width={bw} height={yQ1 - yQ3}
        fill={fill} fillOpacity={0.22}
        stroke={stroke} strokeWidth={1.8}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        transition={{ duration: 0.5, ease, delay: delay + 0.2 }}
      />
      {/* Median */}
      <motion.line
        x1={cx - bw / 2} x2={cx + bw / 2} y1={yMed} y2={yMed}
        stroke={stroke} strokeWidth={3}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease, delay: delay + 0.5 }}
      />

      {/* Median value label — floats just inside the box */}
      <motion.text
        x={cx + bw / 2 + 8} y={yMed + 4}
        fontFamily="var(--font-mono)" fontSize="10"
        letterSpacing="0.08em" fontWeight={700}
        fill={stroke}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.9 }}
      >
        {formatMedian(group.median)}
      </motion.text>
    </motion.g>
  );
}

function formatMedian(v) {
  if (v >= 100) return v.toFixed(0);
  return v.toFixed(1);
}

/* ========================================================
   MedianGuide — dashed horizontal line connecting medians
   with a center-floating Δ label.
   ======================================================== */
function MedianGuide({ tk, xs, y, medA, medB, delay, deltaLabel }) {
  const yA = y(medA), yB = y(medB);

  return (
    <motion.g
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <line
        x1={xs[0]} y1={yA} x2={xs[1]} y2={yB}
        stroke={tk('--cream-faint')} strokeWidth={1}
        strokeDasharray="4 5"
      />
      <g transform={`translate(${(xs[0] + xs[1]) / 2},${(yA + yB) / 2 - 14})`}>
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
      </g>
    </motion.g>
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
        fontSize: '0.7rem',
        letterSpacing: '0.14em',
        color: active ? 'var(--cream)' : 'var(--cream-faint)',
        opacity: active ? 1 : 0.45,
        background: active ? `color-mix(in srgb, ${color} 6%, transparent)` : 'transparent',
      }}
    >
      <span style={{ fontWeight: 700, color: active ? color : 'var(--cream-faint)', letterSpacing: '0.18em' }}>
        {theme.num}
      </span>
      <span style={{ fontSize: '0.9rem', color: active ? 'var(--cream)' : 'var(--cream-faint)' }}>
        {theme.glyph}
      </span>
      <span>{theme.title}</span>
    </span>
  );
}