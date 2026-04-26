import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 24 · CS3 Challenge — Approved in pediatrics. Adults need a smarter design.
 *
 * v4 visual enhancement:
 *   Two-column viz: LEFT col holds the three anchor tiles + an enrollment
 *   projection curve (SVG) showing the ~7-year accrual trajectory. RIGHT col
 *   holds a screen-fail funnel (SVG) and the closing question. The funnel
 *   replaces the prior plain-text constraints with a data-driven visual.
 */

const ANCHORS = [
  {
    yr: '2018',
    label: 'FDA Pediatric Approval',
    sub: 'Ages 1 mo – 21 yr · NSAA surrogate · 2,500 U/m² q21d',
  },
  {
    yr: '94',
    label: 'Original sample size',
    sub: 'Endpoint-powered · target lower 95% CI ≥ 90% NSAA achievement',
  },
  {
    yr: '~2028',
    label: 'If design unchanged',
    sub: 'SPARK-ALL projected enrollment under endpoint-powered design',
  },
];

const META_TAGS = [
  { k: 'Pediatric anchor', v: 'N = 124 · AALL07P4 + DFCI 11-001' },
  { k: 'Half-life', v: '~16 d · SC-PEG linker · q21d' },
  { k: 'Trial', v: 'SPARK-ALL · NCT04817761' },
];

export default function Slide24Case3Challenge() {
  const ease = [0.2, 0.7, 0.3, 1];
  const reduce = useReducedMotion();
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    anchorsLabel: 0.95,
    anchors: 1.10,
    chartLabel: 1.30,
    chart: 1.50,
    funnelLabel: 1.70,
    funnel: 1.90,
    question: 2.60,
    body: 2.85,
    meta: 3.20,
    source: 2.80,
  };

  const T = useTokens(['--violet', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="violet" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--violet)" delay={D.eyebrow}>CS3 · The challenge</Eyebrow>
      <Headline delay={D.headline} maxChars={50}>
        Approved in pediatrics.{' '}
        <span style={{ color: 'var(--violet)', fontStyle: 'italic', fontWeight: 700 }}>
          Adults needed a smarter design.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        Same drug, same biology, same FDA-validated NSAA surrogate. The constraint wasn't scientific
        doubt — it was{' '}
        <span style={{ color: 'var(--violet)', fontWeight: 600 }}>operational feasibility</span>.
        Ninety-four was deliverable in the protocol and undeliverable in practice.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto 1fr auto',
            columnGap: 'var(--space-5)',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {/* ─── LEFT: Anchor tiles ─── */}
          <div style={{ gridColumn: '1', gridRow: '1' }}>
            <motion.div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-muted)',
                marginBottom: 10,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.anchorsLabel }}
            >
              Three numbers that frame the problem
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
              {ANCHORS.map((a, i) => (
                <AnchorTile
                  key={a.yr}
                  yr={a.yr}
                  label={a.label}
                  sub={a.sub}
                  delay={D.anchors + i * 0.15}
                  numeralLayoutId={a.yr === '94' ? 'cs3-n-94' : undefined}
                />
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Screen-fail funnel ─── */}
          <div style={{ gridColumn: '2', gridRow: '1' }}>
            <motion.div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-muted)',
                marginBottom: 10,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.funnelLabel }}
            >
              Patient attrition — why 94 takes until ~2028
            </motion.div>
            <ScreenFailFunnel delay={D.funnel} reduce={reduce} tk={tk} />
          </div>

          {/* ─── LEFT: Enrollment projection ─── */}
          <div style={{ gridColumn: '1', gridRow: '2', minHeight: 0 }}>
            <motion.div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-muted)',
                marginBottom: 8,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.chartLabel }}
            >
              Projected cumulative enrollment
            </motion.div>
            <EnrollmentChart delay={D.chart} reduce={reduce} tk={tk} />
          </div>

          {/* ─── RIGHT: Closing question ─── */}
          <motion.div
            style={{
              gridColumn: '2',
              gridRow: '2',
              padding: 'var(--space-4)',
              border: '1px solid color-mix(in srgb, var(--violet) 35%, transparent)',
              background: 'color-mix(in srgb, var(--violet) 8%, transparent)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: 0,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.question }}
          >
            <div
              className="deck-display italic"
              style={{
                fontSize: 'var(--fs-card-title)',
                lineHeight: 1.25,
                color: 'var(--cream)',
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Could a{' '}
              <span style={{ color: 'var(--violet)', fontWeight: 700, fontStyle: 'normal' }}>
                smaller, smarter study
              </span>{' '}
              still be defensible to FDA?
            </div>
            <motion.div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-card-body)',
                color: 'var(--cream-muted)',
                lineHeight: 1.5,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.body }}
            >
              The drug worked in pediatrics. The pediatric PopPK model was{' '}
              <span style={{ color: 'var(--cream)', fontWeight: 600 }}>FDA-reviewed and label-supporting</span>.
              The question was whether the same scientific question could be answered with{' '}
              <span style={{ color: 'var(--violet)', fontWeight: 600 }}>
                fewer adults and more model
              </span>.
            </motion.div>
          </motion.div>

          {/* ─── Bottom meta tags ─── */}
          <div
            style={{
              gridColumn: '1 / -1',
              gridRow: '3',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-4)',
              alignSelf: 'end',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
            }}
          >
            {META_TAGS.map((m, i) => (
              <motion.div
                key={m.k}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: D.meta + i * 0.08 }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-card-meta)',
                    letterSpacing: '0.22em',
                    color: 'var(--violet)',
                    fontWeight: 700,
                    marginBottom: 3,
                  }}
                >
                  {m.k}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-card-body)',
                    color: 'var(--cream-muted)',
                    lineHeight: 1.35,
                  }}
                >
                  {m.v}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Challenge"
        source="Source · FDA label 761102 (Dec 2018) · NCT04817761"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ================================================================
   AnchorTile
   ================================================================ */
function AnchorTile({ yr, label, sub, delay, numeralLayoutId }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        padding: '16px 16px 18px',
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 45%, transparent)',
        position: 'relative',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: 2,
          background: 'linear-gradient(to right, var(--violet), color-mix(in srgb, var(--violet) 30%, transparent))',
        }}
      />
      <motion.div
        layoutId={numeralLayoutId}
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-numeral)',
          fontWeight: 700, color: 'var(--cream)',
          letterSpacing: 'var(--ls-headline)',
          lineHeight: 1, marginBottom: 8,
        }}
      >
        {yr}
      </motion.div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)', letterSpacing: '0.22em',
          color: 'var(--violet)', fontWeight: 700, marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-card-body)',
          lineHeight: 1.4, color: 'var(--cream-muted)',
        }}
      >
        {sub}
      </div>
    </motion.div>
  );
}

/* ================================================================
   EnrollmentChart — SVG cumulative enrollment projection
   Slow S-curve approaching N=94 only by ~2028. Visualizes the
   operational infeasibility that drives the case.
   ================================================================ */
const ENROLL_DATA = [
  { year: 2021, n: 0 },
  { year: 2022, n: 8 },
  { year: 2023, n: 22 },
  { year: 2024, n: 38 },
  { year: 2025, n: 52 },
  { year: 2026, n: 65 },
  { year: 2027, n: 78 },
  { year: 2028, n: 94 },
];

function EnrollmentChart({ delay, reduce, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const W = 400, H = 180;
  const pad = { l: 38, r: 16, t: 12, b: 28 };
  const cW = W - pad.l - pad.r;
  const cH = H - pad.t - pad.b;

  const xScale = (yr) => pad.l + ((yr - 2021) / 7) * cW;
  const yScale = (n) => pad.t + cH - (n / 100) * cH;

  const linePath = ENROLL_DATA
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(d.year).toFixed(1)},${yScale(d.n).toFixed(1)}`)
    .join(' ');

  const areaPath =
    linePath +
    ` L${xScale(2028).toFixed(1)},${yScale(0).toFixed(1)}` +
    ` L${xScale(2021).toFixed(1)},${yScale(0).toFixed(1)} Z`;

  const targetY = yScale(94);
  const optimalY = yScale(60);
  const years = [2021, 2023, 2025, 2027];

  return (
    <motion.div
      style={{
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 30%, transparent)',
        padding: 8,
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }} aria-label="Enrollment projection chart">
        {/* Y-axis ticks */}
        {[0, 20, 40, 60, 80].map((n) => (
          <React.Fragment key={n}>
            <line
              x1={pad.l} y1={yScale(n)} x2={W - pad.r} y2={yScale(n)}
              stroke="var(--cream-hairline)" strokeWidth={0.5}
            />
            <text
              x={pad.l - 6} y={yScale(n) + 3}
              textAnchor="end" fill="var(--cream-muted)"
              style={{ fontSize: 8, fontFamily: 'var(--font-mono)' }}
            >
              {n}
            </text>
          </React.Fragment>
        ))}

        {/* X-axis year labels */}
        {years.map((yr) => (
          <text
            key={yr} x={xScale(yr)} y={H - 6}
            textAnchor="middle" fill="var(--cream-muted)"
            style={{ fontSize: 8, fontFamily: 'var(--font-mono)' }}
          >
            {yr}
          </text>
        ))}

        {/* N=94 target line */}
        <line
          x1={pad.l} y1={targetY} x2={W - pad.r} y2={targetY}
          stroke="var(--violet)" strokeWidth={1} strokeDasharray="4 3" opacity={0.6}
        />
        <text
          x={W - pad.r + 2} y={targetY + 3}
          fill="var(--violet)" style={{ fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 700 }}
        >
          94
        </text>

        {/* N=60 optimal line */}
        <line
          x1={pad.l} y1={optimalY} x2={W - pad.r} y2={optimalY}
          stroke="var(--cream-muted)" strokeWidth={0.5} strokeDasharray="2 4" opacity={0.5}
        />
        <text
          x={W - pad.r + 2} y={optimalY + 3}
          fill="var(--cream-muted)" style={{ fontSize: 7, fontFamily: 'var(--font-mono)' }}
        >
          60
        </text>

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="var(--violet)" opacity={0.08}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />

        {/* Enrollment line */}
        <motion.path
          d={linePath}
          fill="none" stroke="var(--violet)" strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 1.6, ease: [0.4, 0, 0.2, 1], delay: delay + 0.2 }}
        />

        {/* Data points */}
        {ENROLL_DATA.map((d, i) => (
          <motion.circle
            key={d.year}
            cx={xScale(d.year)} cy={yScale(d.n)} r={3}
            fill="var(--violet)" stroke="var(--bg)" strokeWidth={1.5}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.3 + i * 0.12 }}
          />
        ))}

        {/* ~2028 annotation */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 1.5 }}
        >
          <text
            x={xScale(2028)} y={targetY - 8}
            textAnchor="end" fill="var(--violet)"
            style={{ fontSize: 9, fontFamily: 'var(--font-display)', fontWeight: 700, fontStyle: 'italic' }}
          >
            ~7 years to reach N = 94
          </text>
        </motion.g>

        {/* Axis lines */}
        <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="var(--cream-hairline)" strokeWidth={1} />
        <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="var(--cream-hairline)" strokeWidth={1} />
      </svg>
    </motion.div>
  );
}

/* ================================================================
   ScreenFailFunnel — SVG attrition funnel showing why recruitment
   is infeasible: screened → eligible → enrolled → evaluable.
   ================================================================ */
const FUNNEL_STAGES = [
  { label: 'Screened', n: 174, pct: '100%', note: 'Need to screen ~174' },
  { label: 'Eligible', n: 94, pct: '54%', note: '~46% screen-fail rate' },
  { label: 'Enrolled', n: 72, pct: '41%', note: 'Cooperative-group competition' },
  { label: 'Evaluable', n: 60, pct: '34%', note: 'Protocol deviations · dropout' },
];

function ScreenFailFunnel({ delay, reduce, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const W = 520, H = 170;
  const maxBarW = 220;
  const barH = 26;
  const barGap = 10;
  const xOff = 85;

  return (
    <motion.div
      style={{
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 30%, transparent)',
        padding: 8,
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }} aria-label="Screen-fail funnel">
        {FUNNEL_STAGES.map((s, i) => {
          const barW = (s.n / 174) * maxBarW;
          const y = 10 + i * (barH + barGap);
          const centerX = xOff + maxBarW / 2;
          const barX = centerX - barW / 2;

          return (
            <motion.g
              key={s.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease, delay: delay + i * 0.15 }}
            >
              {/* Bar */}
              <rect
                x={barX} y={y}
                width={barW} height={barH}
                fill={i === 0
                  ? 'color-mix(in srgb, var(--violet) 50%, transparent)'
                  : `color-mix(in srgb, var(--violet) ${Math.max(15, 50 - i * 12)}%, transparent)`
                }
                stroke="var(--violet)"
                strokeWidth={i === 0 ? 1 : 0.5}
                strokeOpacity={i === 0 ? 0.6 : 0.3}
              />

              {/* Stage label (left) */}
              <text
                x={xOff - 58} y={y + barH / 2 + 1}
                textAnchor="start" dominantBaseline="middle"
                fill="var(--cream-muted)"
                style={{ fontSize: 9, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                {s.label}
              </text>

              {/* Count inside bar */}
              <text
                x={centerX} y={y + barH / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fill="var(--cream)"
                style={{ fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                {s.n}
              </text>

              {/* Annotation (right) */}
              <text
                x={centerX + maxBarW / 2 + 8} y={y + barH / 2 + 1}
                textAnchor="start" dominantBaseline="middle"
                fill="var(--cream-muted)"
                style={{ fontSize: 8, fontFamily: 'var(--font-body)', fontStyle: 'italic' }}
              >
                {s.note}
              </text>

              {/* Drop arrow between bars */}
              {i < FUNNEL_STAGES.length - 1 && (
                <line
                  x1={centerX} y1={y + barH + 1}
                  x2={centerX} y2={y + barH + barGap - 1}
                  stroke="var(--violet)" strokeWidth={1} opacity={0.3}
                  markerEnd="none"
                />
              )}
            </motion.g>
          );
        })}

        {/* Loss annotation */}
        <motion.text
          x={W - 12} y={H - 8}
          textAnchor="end"
          fill="var(--violet)"
          style={{ fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.1em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.8 }}
        >
          66% ATTRITION · RARE POPULATION · COOPERATIVE-GROUP COMPETITION
        </motion.text>
      </svg>
    </motion.div>
  );
}
