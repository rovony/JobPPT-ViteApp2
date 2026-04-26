// @ts-nocheck
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as d3 from 'd3';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import AnalysisPlot from '@/components/deck/patterns/AnalysisPlot';
import BoxTooltip from '@/components/deck/patterns/BoxTooltip';

/**
 * Slide 12 · CS1 Exposure–Response (Safety) — "Medians overlap. No signal."
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

export default function Slide12CaseExposureResponse() {
  const ease = [0.2, 0.7, 0.3, 1];
  // Entrance choreography (V3 · 2026-04-24-conclusion-fix) — strict serial
  // emphasis to mirror slide 11e's pacing AND pass Agent B's audit:
  //   Panel A medians draw → Panel A MedianGuide resolves
  //   → Panel B medians draw → Panel B MedianGuide resolves
  //   → 4-cell closing strip lands
  //
  // Chart frames (axisA/axisB) overlap slightly the way slide 11e overlaps
  // its boxAdult/boxPeds frames (1.80/1.95) — that's a panel-chrome beat,
  // not an emphasis beat. The emphasis beats (medians + MedianGuides) are
  // strictly serialized and the closing waits for Panel B's Δ pill to fade
  // in. `guideA`/`guideB` are explicit so the serialization isn't
  // accidentally dependent on `boxDelay + 1.0` arithmetic.
  const D = {
    chrome: 0.10, headline: 0.25, subhead: 0.55,
    // Panel A (AUC, left) — chart frame, then medians L→R.
    // Box medians (stagger 0.15s, draw 0.8s): second median ends boxA + 0.95 = 1.80
    axisA: 0.70, boxA: 0.85,
    // MedianGuide A connector (0.8s) + Δ pill fade (0.4s) → resolves at 3.05
    guideA: 1.85,
    // Panel B (Cmax, right) — chart frame appears as Panel A medians settle.
    // Box medians draw boxB → boxB + 0.95 = 2.90.
    axisB: 1.80, boxB: 1.95,
    // Panel B MedianGuide is sequenced explicitly so it lands strictly AFTER
    // Panel A's Δ pill (3.05) AND Panel B's medians settle (2.90).
    guideB: 3.10,
    // Closing 4-cell strip lands AFTER Panel B's Δ pill resolves
    // (guideB + 0.8 + 0.4 = 4.30).
    closing: 4.35, payoff: 4.65,
  };

  const T = useTokens(['--coral', '--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline', '--cream-dim', '--bg']);
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
      <Subhead delay={D.subhead} maxChars={72} size="lead">
        Pediatric AUC<sub>ss</sub> and C<sub>max,ss</sub> distributions{' '}
        <HighlightWord color="var(--coral)" delay={1.4}>overlap between patients with and without related AEs</HighlightWord>
        {' '}— medians track within a few percent.
      </Subhead>

      <Viz>
        <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: '1fr auto', rowGap: 'var(--space-4)', minHeight: 0 }}>
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
              {/* Hairline panel · zaj-slides v2.1 — peer chart containers
                  get a 1px perimeter to declare cell boundaries. Square
                  corners, no fill, no shadow. */}
              <div style={CHART_PANEL}>
                <BoxPanel
                  tk={tk}
                  letter="a"
                  title={<>AUC<sub>ss</sub></>}
                  unit={DATA.auc.unit}
                  data={DATA.auc}
                  axisDelay={D.axisA}
                  boxDelay={D.boxA}
                  guideDelay={D.guideA}
                  deltaLabel="Δ median ≈ −12 %"
                />
              </div>
              <div style={CHART_PANEL}>
                <BoxPanel
                  tk={tk}
                  letter="b"
                  title={<>C<sub>max,ss</sub></>}
                  unit={DATA.cmax.unit}
                  data={DATA.cmax}
                  axisDelay={D.axisB}
                  boxDelay={D.boxB}
                  guideDelay={D.guideB}
                  deltaLabel="Δ median ≈ +1 %"
                />
              </div>
            </div>
          </AnalysisPlot>

          {/*
            Closing band (V3 · 2026-04-24-conclusion-fix) — 4-cell strip.
            Mirrors slide 11e's [SubgroupFlag · δ · δ · verdict] pattern so
            the CS1 results pair (11e + 12) reads as a sibling family.
            Layout L→R: data caveat → Δ AUCss → Δ Cmax,ss → italic verdict.
          */}
          <motion.div
            style={{
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.1fr) auto auto minmax(0, 1.2fr)',
              columnGap: 'var(--space-8)',
              alignItems: 'start',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: D.closing }}
          >
            <DataCaveat ease={ease} delay={D.closing + 0.1} />

            <HeroDelta value="−12 %" label={<>AUC<sub>ss</sub> · Δ median</>} accent />
            <HeroDelta value="+1 %" label={<>C<sub>max,ss</sub> · Δ median</>} />

            <div
              className="deck-display italic"
              style={{
                fontSize: 'var(--fs-card-title)',
                lineHeight: 'var(--lh-snug)',
                color: 'var(--cream)',
                fontWeight: 500,
                textAlign: 'right',
              }}
            >
              Medians overlap; IQRs overlap;{' '}
              <span style={{ color: 'var(--coral)', fontStyle: 'normal', fontWeight: 700 }}>
                no dose–exposure–AE gradient
              </span>{' '}
              across the pediatric exposure range.
              <div
                className="deck-mono uppercase mt-2"
                style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: '0.2em', color: 'var(--coral)', fontStyle: 'normal', fontWeight: 400 }}
              >
                Flat exposure-response → safety margin preserved
              </div>
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 01 · Safety E–R"
        source="Source · Okour et al. JCP 2023 · Figure 5"
        delay={D.payoff}
      />
    </SlideGrid>
  );
}

/* ========================================================
   Hairline panel chrome (zaj-slides v2.1 — peer data containers)
   ======================================================== */
const CHART_PANEL = {
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--cream-hairline)',
  borderRadius: 0,
  padding: 'var(--space-3)',
  background: 'transparent',
};

/* ========================================================
   BoxPanel — one side (AUC or Cmax)
   ======================================================== */
function BoxPanel({ tk, letter, title, unit, data, axisDelay, boxDelay, guideDelay, deltaLabel }) {
  const W = 820, H = 460;
  const m = { top: 54, right: 36, bottom: 72, left: 78 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  const y = d3.scaleLinear().domain(data.yDomain).range([ih, 0]);
  const yTicks = data.yTicks;

  const xs = [iw * 0.30, iw * 0.70];
  const bw = 120;

  // Hover-tooltip state (zaj-slides override 2026-04-24, see BoxTooltip).
  // Tooltip exposes the digitized five-number summary on demand —
  // medians/IQRs are visible from the chart shapes, but the literal
  // numbers (3.5 / 4.1 / 7.8 …) only appear when the presenter mouses
  // a box. Static slide is unchanged for projection delivery.
  const [hover, setHover] = useState(null);
  const unitShort = unit;

  return (
    <div className="relative w-full h-full">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
      >
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
          <g>
            {yTicks.map((v) => (
              <line
                key={v} x1={0} x2={iw} y1={y(v)} y2={y(v)}
                stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.5}
              />
            ))}
          </g>

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

          {/* Two boxes — per-box stagger 0.15s matches slide 11e Cmax bracket pace */}
          {data.groups.map((g, i) => (
            <BoxGlyph
              key={g.label}
              cx={xs[i]}
              y={y}
              bw={bw}
              group={g}
              tk={tk}
              delay={boxDelay + i * 0.15}
              isAE={i === 1}
              onHover={(active) => setHover(active ? i : (h) => (h === i ? null : h))}
            />
          ))}

          {/* Median-overlap guide — explicit `guideDelay` so MedianGuide A
              fully resolves before MedianGuide B starts (V3 strict
              serialization of emphasis beats). */}
          <MedianGuide
            tk={tk}
            xs={xs}
            y={y}
            medA={data.groups[0].median}
            medB={data.groups[1].median}
            delay={guideDelay}
            deltaLabel={deltaLabel}
          />

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

          {hover !== null && (() => {
            const g = data.groups[hover];
            const isAE = hover === 1;
            const accent = isAE ? '--coral' : '--cyan';
            const peer = data.groups[hover === 0 ? 1 : 0];
            const dPct = ((g.median / peer.median - 1) * 100).toFixed(0);
            const dStr = `Δ median ${dPct >= 0 ? '+' : ''}${dPct}% vs ${peer.label}`;
            return (
              <BoxTooltip
                visible
                x={xs[hover]}
                y={y(g.max)}
                width={210}
                height={120}
                anchor="above"
                tk={tk}
                accent={accent}
                footerAccent={accent}
                title={`${g.label} · n = ${g.n}`}
                lines={[
                  { label: 'median', value: `${g.median} ${unitShort}` },
                  { label: 'IQR', value: `${g.q1}–${g.q3}` },
                  { label: 'range', value: `${g.min}–${g.max}` },
                ]}
                footer={dStr}
              />
            );
          })()}
        </g>
      </svg>
    </div>
  );
}

/* ========================================================
   BoxGlyph — single Tukey-style box (whiskers → caps → box → median)
   ======================================================== */
function BoxGlyph({ cx, y, bw, group, tk, delay, isAE, onHover }) {
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
    <g style={{ pointerEvents: 'none' }}>
      <line
        x1={cx} x2={cx} y1={yMin} y2={yMax}
        stroke={stroke} strokeWidth={1.6}
      />
      <line x1={cx - 22} x2={cx + 22} y1={yMin} y2={yMin}
            stroke={stroke} strokeWidth={1.6} />
      <line x1={cx - 22} x2={cx + 22} y1={yMax} y2={yMax}
            stroke={stroke} strokeWidth={1.6} />

      <rect
        x={cx - bw / 2} y={yQ3}
        width={bw} height={yQ1 - yQ3}
        fill={fill} fillOpacity={0.22}
        stroke={stroke} strokeWidth={1.8}
      />
      {/* Median — in-chart emphasis. Draws L→R via pathLength, sequenced
          by `delay` so the eye moves NO-AE → RELATED-AE (flat E-R story).
          Halo pulse stays removed (V2 audit, retained V3): sibling slides
          have no equivalent flourish; the pathLength draw carries the beat. */}
      <motion.path
        d={`M ${cx - bw / 2} ${yMed} L ${cx + bw / 2} ${yMed}`}
        fill="none" stroke={stroke} strokeWidth={3} strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 0.8, ease, delay: reduce ? 0 : delay }}
      />

      {onHover && (
        <rect
          x={cx - bw / 2 - 6}
          y={yMax - 8}
          width={bw + 12}
          height={yMin - yMax + 16}
          fill="transparent"
          pointerEvents="all"
          style={{ cursor: 'crosshair' }}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
        />
      )}
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
      <motion.path
        d={`M ${xs[0]} ${yA} L ${xs[1]} ${yB}`}
        fill="none" stroke={tk('--cream-faint')} strokeWidth={1}
        strokeDasharray="4 5"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 0.8, ease, delay: reduce ? 0 : delay }}
      />
      <motion.g
        transform={`translate(${(xs[0] + xs[1]) / 2},${(yA + yB) / 2 - 14})`}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reduce ? 0 : 0.4,
          ease,
          delay: reduce ? 0 : delay + 0.8,
        }}
      >
        <rect
          x={-60} y={-11} width={120} height={22}
          fill={tk('--bg')} stroke={tk('--cream-hairline')}
          strokeWidth={1} rx={0}
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
   HeroDelta — two-line numeral + monoscript label.
   Mirrors slide 11e's HeroDelta primitive verbatim so the CS1
   results pair shares the same closing-band typography.
   ======================================================== */
function HeroDelta({ value, label, accent }) {
  return (
    <div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-numeral)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: accent ? 'var(--coral)' : 'var(--cream)',
          fontWeight: 700,
        }}
      >
        {value}
      </div>
      <div
        className="deck-mono uppercase mt-1"
        style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-muted)' }}
      >
        {label}
      </div>
    </div>
  );
}

/* ========================================================
   DataCaveat — coral-bar callout for the analysis-cohort meta.
   Same visual contract as slide 11e's SubgroupFlag (left coral
   bar · mono uppercase eyebrow · body line) so the two CS1
   results slides feel like a sibling pair.
   ======================================================== */
function DataCaveat({ ease, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease, delay }}
      style={{
        borderLeft: '2px solid var(--coral)',
        paddingLeft: 'var(--space-3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: '0.22em',
          color: 'var(--coral)',
        }}
      >
        Data caveat · n = 33 in exposure-AE
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
      >
        Exposure–AE analysis (AMB112529){' '}
        <span style={{ color: 'var(--cream)', fontWeight: 600 }}>n = 33</span> · 39 total in PopPK ·{' '}
        <span style={{ color: 'var(--cream)', fontWeight: 600 }}>Okour et al. JCP 2023</span>, Figure 5.
      </div>
    </motion.div>
  );
}
