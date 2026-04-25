import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as d3 from 'd3';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import AnalysisPlot from '@/components/deck/patterns/AnalysisPlot';

/**
 * Slide 11e · CS1 Exposure Match — AUC & Cmax vs adult envelope.
 *
 * Layout:
 *   LEFT panel  (hero, ~58%) — AUCss vs body weight.
 *     • Two adult 5–95% bands (low dose · high dose) drawn as horizontal strips
 *     • Pediatric 90% PI ribbon per dose band, coral wash
 *     • Pediatric median line drawn L→R (stroke-dashoffset)
 *     • 39 pediatric dots wave-staggered (matches slide 10 pcVPC scatter)
 *   RIGHT panel (~38%) — Cmax,ss box plots.
 *     • Four boxes: Adult-Low · Peds-Low · Adult-High · Peds-High
 *     • Δ brackets placed INSIDE plot area (not clipping the top)
 *   BOTTOM — two hero Δ numbers side-by-side + single italic payoff.
 *
 * Entrance choreography (V6.9.3 · 2026-04-24):
 *   The slide is part of the CS1 results trio (10 pcVPC → 11 exposure-match
 *   → 12 E-R) wrapped in the AnalysisPlot shared-element morph. Inside the
 *   morph, the slide MUST sequence like slide 10:
 *     1. AUC panel settles fully (median line + Δ labels)
 *     2. THEN Cmax panel boxes/brackets sequence in
 *     3. THEN the closing strip lands
 *   Previous V6.9.2 ran AUC + Cmax in parallel and let the closing fade
 *   in BEFORE the chart finished, which read as rushed and "different".
 *   See the D{} timeline below for exact delays.
 *
 * Implementation notes:
 *   • No D3 (well, scales only — no recharts). Pure SVG + useMemo + FM.
 *   • preserveAspectRatio="xMidYMid meet" on every viewBox.
 *   • All colors hex-resolved via useTokens (no CSS vars in SVG attrs).
 *   • Adult band labels get distinct y-positions per band (no stacking).
 *   • Dots use wave-stagger (8 per wave · 0.025s within / 0.06s between).
 *   • Δ brackets sit inside plot area, anchored to the shared Cmax y-scale.
 *   • SubgroupFlag entrance is opacity-only (was x: -8 in V6.9.2; the
 *     single horizontal slide registered as "different" against slide 10).
 *   • Closing collapsed: two hero Δ numbers + one payoff line (no 3-col wall).
 */

// Okour 2023 Table S5 — verbatim values
const REGIMES = [
  {
    label: 'LOW DOSE',
    pedAUC: 4.82, adultAUC: 4.98,
    adLo: 4.68, adHi: 5.29,
    pedLo: 4.14, pedHi: 5.61,
    deltaLabel: '−3 %',
  },
  {
    label: 'HIGH DOSE',
    pedAUC: 9.15, adultAUC: 9.12,
    adLo: 8.30, adHi: 10.0,
    pedLo: 8.41, pedHi: 9.96,
    deltaLabel: '≈ 0 %',
  },
];

const CMAX_BOXES = [
  { group: 'LOW',  who: 'ADULT', xPct: 0.18, mid: 469, q1: 447, q3: 493, lo: 410, hi: 540 },
  { group: 'LOW',  who: 'PEDS',  xPct: 0.38, mid: 519, q1: 458, q3: 589, lo: 420, hi: 650 },
  { group: 'HIGH', who: 'ADULT', xPct: 0.64, mid: 830, q1: 757, q3: 909, lo: 700, hi: 1000 },
  { group: 'HIGH', who: 'PEDS',  xPct: 0.84, mid: 981, q1: 894, q3: 1080, lo: 820, hi: 1180 },
];

export default function Slide11eCaseExposureMatch() {
  const ease = [0.2, 0.7, 0.3, 1];
  // V6.9.3 (2026-04-24) — entrance choreography aligned with slide 10
  // (pcVPC). The previous V6.9.2 timeline animated AUC and Cmax panels
  // simultaneously and let the closing strip fade in at 1.55s — BEFORE
  // the AUC Δ labels finished landing at 2.7s. Net effect: every other
  // CS1 results slide reads serial (chart settles → payoff lands), but
  // slide 11 read parallel and rushed, which is the "different" feel.
  //
  // New timeline: AUC settles fully → Cmax sequences in → closing
  // strip lands AFTER all chart beats, matching slide 10's pace
  // (chart at ~2.7s, payoff at ~3.2s).
  const D = {
    chrome: 0.10, headline: 0.25, subhead: 0.55,
    // AUC panel — left, primary chart, settles first
    adultBand: 0.70,    // panel title fade
    pedsBand: 0.85,     // peds bands appear (static path)
    pedsMed: 1.00,      // median draws L→R (1.2s · ends 2.20)
    dots: 1.20,         // wave-stagger dots (~0.7s span · ends 1.89)
    // AUC Δ labels at right edge land at pedsMed + 1.2 + 0.5 = 2.70
    // Cmax panel — right, secondary, sequenced AFTER AUC settles
    boxAdult: 1.80,     // panel title fade
    boxPeds: 1.95,      // boxes already static
    boxDelta: 2.40,     // brackets draw L→R (0.8s · ends 3.20)
    // Closing strip lands AFTER both panels' chart beats
    closing: 3.10, payoff: 3.40,
  };

  const T = useTokens(['--coral', '--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={D.chrome}>Results — Exposure match</Eyebrow>
      <Headline delay={D.headline} maxChars={34}>
        Pediatric AUC<sub>ss</sub> matched adults{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
          within 3 % at weight-based doses.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={72}>
        Model-derived pediatric exposure{' '}
        <HighlightWord color="var(--coral)" delay={1.4}>lands inside the adult envelope</HighlightWord>{' '}
        across 20–77 kg — Okour et al., JCP 2023 (Table S5).
      </Subhead>

      <Viz>
        <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: '1fr auto auto', rowGap: 'var(--space-4)', minHeight: 0 }}>
          <AnalysisPlot variant="exposure-match">
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', columnGap: 'var(--space-6)', minHeight: 0, width: '100%', height: '100%' }}>
      {/* LEFT — AUC vs body weight (hairline panel · zaj-slides v2.1: peer chart container) */}
      <div style={CHART_PANEL}>
        <PanelTitle
          label={<>AUC<sub>ss</sub> × body weight — pediatric vs adult envelope</>}
          right="μg·h/mL · geometric mean (95 % CI)"
          delay={D.adultBand - 0.1}
        />
        <div style={CHART_PANEL_BODY}>
          <AUCPanel tk={tk} D={D} />
        </div>
      </div>

      {/* RIGHT — Cmax box plots (hairline panel · peer to AUC) */}
      <div style={CHART_PANEL}>
        <PanelTitle
          label={<>C<sub>max,ss</sub> — pediatric vs adult</>}
          right="ng/mL · box = IQR · whiskers = 5–95%"
          delay={D.boxAdult - 0.1}
        />
        <div style={CHART_PANEL_BODY}>
          <CmaxPanel tk={tk} D={D} />
        </div>
      </div>
          </div>
          </AnalysisPlot>

      {/* Subgroup defense strip — pre-empts the 35-<50 kg low-dose question */}
      <SubgroupFlag ease={ease} delay={D.closing - 0.3} />

      {/* Closing: two hero deltas + payoff */}
      <motion.div
        style={{
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--cream-hairline)',
          display: 'grid',
          gridTemplateColumns: 'auto auto 1fr',
          gap: 'var(--space-10)',
          alignItems: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: D.closing }}
      >
        <HeroDelta value="−3 %" label={<>AUC<sub>ss</sub> · low-dose Δ</>} accent />
        <HeroDelta value="+11 / +18%" label={<>C<sub>max,ss</sub> · low / high Δ</>} />
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
          Every pediatric value inside the adult distribution —{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'normal', fontWeight: 700 }}>
            exposure bridged.
          </span>
          <div
            className="deck-mono uppercase mt-2"
            style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: '0.2em', color: 'var(--coral)', fontStyle: 'normal', fontWeight: 400 }}
          >
            ICH E11A · exposure match + conserved mechanism → clinical extrapolation
          </div>
        </div>
      </motion.div>

        </div>
      </Viz>

      <Footer
        kicker="Case 01 · Exposure match"
        source="Source · Okour et al. JCP 2023 (Table S5) · ICH E11A"
        delay={D.payoff + 0.3}
      />
    </SlideGrid>
  );
}

/* ========================================================
   Hairline panel chrome (zaj-slides v2.1)
   ----------------------------------------------------------
   Adjacent peer data containers (two charts side-by-side)
   need a perimeter to declare cell boundaries. Per the
   craft-bans-and-borders skill: square corners (NO rounded
   shadcn cliché), 1px hairline, no fill, no shadow.
   ======================================================== */
const CHART_PANEL = {
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--cream-hairline)',
  borderRadius: 0,
  padding: 'var(--space-3)',
  background: 'transparent',
};
const CHART_PANEL_BODY = {
  flex: '1 1 0',
  minHeight: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/* ========================================================
   Primitives
   ======================================================== */
function PanelTitle({ label, right, delay }) {
  return (
    <motion.div
      className="flex items-baseline justify-between mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay }}
    >
      <span
        className="deck-mono uppercase"
        style={{ fontSize: 'var(--fs-card-label)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--coral)' }}
      >
        {label}
      </span>
      <span
        className="deck-mono"
        style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: '0.14em', color: 'var(--cream-faint)' }}
      >
        {right}
      </span>
    </motion.div>
  );
}

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
   AUC panel — pure SVG
   ======================================================== */
function AUCPanel({ tk, D }) {
  const reduce = useReducedMotion();
  const W = 1080, H = 440;
  const m = { top: 18, right: 48, bottom: 50, left: 80 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;
  const ease = [0.2, 0.7, 0.3, 1];

  // D3 scales
  const x = d3.scaleLinear().domain([18, 82]).range([0, iw]);
  const y = d3.scaleLinear().domain([0, 16]).range([ih, 0]);

  const { pedDots, bands } = useMemo(() => {
    let s = 9001;
    const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const nrand = () => {
      let u = 0, v = 0;
      while (!u) u = r();
      while (!v) v = r();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    const bands = REGIMES.map((reg) => {
      const wts = d3.range(20, 80.1, 2);
      const band = wts.map((w) => {
        const scale = 0.82 + (w - 50) * 0.004;
        return { w, lo: reg.pedLo * scale, hi: reg.pedHi * scale };
      });
      const median = wts.map((w) => ({
        w,
        c: reg.pedAUC * (0.94 + (w - 50) * 0.002),
      }));
      return { reg, band, median };
    });

    const pedDots = [];
    for (let i = 0; i < 39; i++) {
      const w = 20 + r() * 57;
      const reg = i < 20 ? REGIMES[0] : REGIMES[1];
      const c = reg.pedAUC * Math.exp(nrand() * 0.15) * (0.94 + (w - 50) * 0.002);
      pedDots.push({ w, c, i });
    }
    return { pedDots, bands };
  }, []);

  // D3 path generators
  const area = d3.area().x((d) => x(d.w)).y0((d) => y(d.lo)).y1((d) => y(d.hi)).curve(d3.curveMonotoneX);
  const line = d3.line().x((d) => x(d.w)).y((d) => y(d.c)).curve(d3.curveMonotoneX);

  const xTicks = x.ticks(7);
  const yTicks = y.ticks(5);

  return (
    <svg
      className="w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ maxHeight: '52vh' }}
    >
      <g transform={`translate(${m.left},${m.top})`}>
        {/* Grid */}
        {yTicks.map((v) => (
          <line key={`gy-${v}`} x1={0} x2={iw} y1={y(v)} y2={y(v)}
                stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.4} />
        ))}

        {/* Adult 5–95% bands — static horizontal strips (chart frame).
            Render immediately on mount with no entrance fade so the adult
            envelope is present before the in-chart emphasis begins. */}
        {REGIMES.map((reg, i) => (
          <g key={`ad-${i}`}>
            <rect
              x={0} width={iw}
              y={y(reg.adHi)} height={y(reg.adLo) - y(reg.adHi)}
              fill={tk('--cream')} fillOpacity={0.07}
              stroke={tk('--cream-faint')} strokeWidth={1} strokeDasharray="3 4"
            />
            <text
              x={iw - 8} y={y(reg.adHi) - 6}
              textAnchor="end" fontFamily="var(--font-mono)" fontSize="9"
              letterSpacing="0.14em" fill={tk('--cream-faint')}
            >
              ADULT 5–95% · {reg.label}
            </text>
          </g>
        ))}

        {/* Overlap-region glow removed 2026-04-24 — chart already shows the
            overlap statically (pedi band inside adult band); the flash was
            redundant noise against the sequential pace of the other slides. */}

        {/* Pediatric bands + medians — band is static, median draws L→R
            via pathLength as the in-chart emphasis. Δ label pops after. */}
        {bands.map(({ reg, band, median }, i) => (
          <React.Fragment key={`pb-${i}`}>
            <path
              d={area(band)}
              fill={tk('--coral')}
              fillOpacity={0.20}
            />
            <motion.path
              d={line(median)}
              fill="none" stroke={tk('--coral')} strokeWidth={2.4}
              strokeLinecap="round"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduce ? 0 : 1.2, ease, delay: reduce ? 0 : D.pedsMed + i * 0.1 }}
            />
            {/* Δ label at right edge of the median line */}
            <motion.text
              x={x(78)} y={y(reg.pedAUC) - 10}
              textAnchor="end" fontFamily="var(--font-mono)" fontSize="10"
              letterSpacing="0.14em" fill={tk('--coral')} fontWeight={700}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : D.pedsMed + 1.2 + i * 0.1 }}
            >
              Δ {reg.deltaLabel} vs adult
            </motion.text>
          </React.Fragment>
        ))}

        {/* Pediatric patient dots — wave-staggered scatter (matches slide
            10's pcVPC dot pattern). The flat i*0.012 cascade read as a
            "spray" against slide 10's structured shots; the wave formula
            below arrives in groups of 8 (0.025s within wave, 0.06s between
            waves), giving the dots a deliberate fall-into-place rhythm
            rather than a uniform drizzle. */}
        {pedDots.map((d) => {
          const dotDelay = D.dots + (d.i % 8) * 0.025 + Math.floor(d.i / 8) * 0.06;
          return (
            <React.Fragment key={d.i}>
              <motion.circle
                cx={x(d.w)} cy={y(d.c)} r={4}
                fill={tk('--cream')} fillOpacity={0.85}
                stroke={tk('--coral')} strokeWidth={1}
                initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: 'easeOut', delay: reduce ? 0 : dotDelay }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            </React.Fragment>
          );
        })}

        {/* Y axis labels */}
        {yTicks.map((v) => (
          <text key={`yl-${v}`} x={-10} y={y(v) + 4} textAnchor="end"
                fontFamily="var(--font-mono)" fontSize="10" fill={tk('--cream-muted')}>
            {v}
          </text>
        ))}
        {/* X axis labels */}
        {xTicks.map((v) => (
          <text key={`xl-${v}`} x={x(v)} y={ih + 20} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="10" fill={tk('--cream-muted')}>
            {v}
          </text>
        ))}

        {/* Axis titles */}
        <text x={iw / 2} y={ih + 42} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em" fill={tk('--cream-faint')}>
          BODY WEIGHT (KG)
        </text>
        <text transform={`translate(-58, ${ih / 2}) rotate(-90)`} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em" fill={tk('--cream-faint')}>
          AUCss (μg·h/mL)
        </text>
      </g>
    </svg>
  );
}

/* ========================================================
   Cmax box-plot panel — pure SVG
   ======================================================== */
function CmaxPanel({ tk, D }) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const W = 680, H = 440;
  const m = { top: 40, right: 24, bottom: 56, left: 64 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  // D3 scale
  const y = d3.scaleLinear().domain([350, 1250]).range([ih, 0]);
  const yAt = (v) => y(v);

  const yTicks = y.ticks(5);
  const bw = 38;

  return (
    <svg
      className="w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ maxHeight: '52vh' }}
    >
      <g transform={`translate(${m.left},${m.top})`}>
        {/* Grid */}
        {yTicks.map((v) => (
          <line key={`gy-${v}`} x1={0} x2={iw} y1={yAt(v)} y2={yAt(v)}
                stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.4} />
        ))}

        {/* Boxes — render static. Δ brackets drawing L→R below IS the
            in-chart emphasis. Peds-median halo pulse removed 2026-04-24
            per entrance-cleanup (was redundant noise against the boxes'
            own coral stroke weight). */}
        {CMAX_BOXES.map((b, i) => {
          const cx = b.xPct * iw;
          const isPeds = b.who === 'PEDS';
          const fill = isPeds ? tk('--coral') : tk('--cream');
          const fillOp = isPeds ? 0.24 : 0.10;
          const stroke = isPeds ? tk('--coral') : tk('--cream-muted');
          const strokeOp = isPeds ? 1 : 0.7;
          return (
            <g key={i}>
              {/* Whisker */}
              <line x1={cx} x2={cx} y1={yAt(b.lo)} y2={yAt(b.hi)}
                    stroke={stroke} strokeOpacity={strokeOp} strokeWidth={1.4} />
              {/* Caps */}
              <line x1={cx - 12} x2={cx + 12} y1={yAt(b.lo)} y2={yAt(b.lo)}
                    stroke={stroke} strokeOpacity={strokeOp} strokeWidth={1.4} />
              <line x1={cx - 12} x2={cx + 12} y1={yAt(b.hi)} y2={yAt(b.hi)}
                    stroke={stroke} strokeOpacity={strokeOp} strokeWidth={1.4} />
              {/* Box */}
              <rect x={cx - bw / 2} y={yAt(b.q3)}
                    width={bw} height={yAt(b.q1) - yAt(b.q3)}
                    fill={fill} fillOpacity={fillOp}
                    stroke={stroke} strokeOpacity={strokeOp} strokeWidth={1.4} />
              {/* Median */}
              <line x1={cx - bw / 2} x2={cx + bw / 2} y1={yAt(b.mid)} y2={yAt(b.mid)}
                    stroke={stroke} strokeOpacity={strokeOp} strokeWidth={2.2} />
              {/* Who label */}
              <text x={cx} y={ih + 18} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="0.14em"
                    fill={isPeds ? tk('--coral') : tk('--cream-muted')}>
                {b.who}
              </text>
            </g>
          );
        })}

        {/* Group labels (LOW DOSE · HIGH DOSE) */}
        <text x={(CMAX_BOXES[0].xPct + CMAX_BOXES[1].xPct) / 2 * iw} y={ih + 40}
              textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10"
              letterSpacing="0.22em" fill={tk('--cream-faint')}>
          LOW DOSE
        </text>
        <text x={(CMAX_BOXES[2].xPct + CMAX_BOXES[3].xPct) / 2 * iw} y={ih + 40}
              textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10"
              letterSpacing="0.22em" fill={tk('--cream-faint')}>
          HIGH DOSE
        </text>

        {/* Δ brackets — placed ABOVE the top-most whisker of each pair but
            ONLY a short rise (no collision with title above) */}
        {[
          { a: 0, b: 1, label: '+11 %', topY: Math.min(yAt(540), yAt(650)) - 12 },
          { a: 2, b: 3, label: '+18 %', topY: Math.min(yAt(1000), yAt(1180)) - 12 },
        ].map((br, i) => {
          const x1 = CMAX_BOXES[br.a].xPct * iw;
          const x2 = CMAX_BOXES[br.b].xPct * iw;
          const rise = 10;
          return (
            <g key={`br-${i}`}>
              {/* Bracket — pathLength draws L→R so the Δ appears to be
                  "measured" between the two boxes (in-chart emphasis). */}
              <motion.path
                d={`M ${x1},${br.topY + rise} L ${x1},${br.topY} L ${x2},${br.topY} L ${x2},${br.topY + rise}`}
                fill="none" stroke={tk('--coral')} strokeWidth={1.2}
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduce ? 0 : 0.8, ease, delay: reduce ? 0 : D.boxDelta + i * 0.15 }}
              />
              <motion.text
                x={(x1 + x2) / 2} y={br.topY - 6} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.14em"
                fill={tk('--coral')} fontWeight={700}
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: reduce ? 0 : D.boxDelta + i * 0.15 + 0.7 }}
              >
                {br.label}
              </motion.text>
            </g>
          );
        })}

        {/* Y labels */}
        {yTicks.map((v) => (
          <text key={`yl-${v}`} x={-10} y={yAt(v) + 4} textAnchor="end"
                fontFamily="var(--font-mono)" fontSize="10" fill={tk('--cream-muted')}>
            {v}
          </text>
        ))}
        <text transform={`translate(-46, ${ih / 2}) rotate(-90)`} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em" fill={tk('--cream-faint')}>
          Cmax,ss (ng/mL)
        </text>
      </g>
    </svg>
  );
}

/* ==============================================================
   SubgroupFlag — 35-<50 kg low-dose defense callout.
   Ported from friend's Prompt 5 spec. Coral left-accent · compact
   mono label + body rationale. Pre-empts the panel question
   "doesn't the lower-weight subgroup run higher?" by naming it
   (n = 8, 29 % higher) AND giving the escape hatch (flat E-R →
   not clinically meaningful) before it's asked.
   ============================================================== */
function SubgroupFlag({ ease, delay }) {
  return (
    // Opacity-only entrance (V6.9.3) — the previous x: -8 slide-in was
    // the single horizontal-axis transform on the slide and registered
    // as the "different feel" against slide 10/12 (which use opacity
    // throughout the bottom strip).
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease, delay }}
      style={{
        borderLeft: '2px solid var(--coral)',
        paddingLeft: 'var(--space-3)',
        paddingTop: 'var(--space-1)',
        paddingBottom: 'var(--space-1)',
        maxWidth: '62%',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: '0.22em',
          color: 'var(--coral)',
          marginBottom: 4,
        }}
      >
        Subgroup · 35-&lt;50 kg low-dose · n = 8
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
      >
        AUC<sub>ss</sub>{' '}
        <span style={{ color: 'var(--cream)', fontWeight: 600 }}>29 % higher</span>{' '}
        than adult geometric mean — still inside adult envelope. Flat E-R →{' '}
        <span style={{ color: 'var(--cream)', fontWeight: 600 }}>not clinically meaningful.</span>
      </div>
    </motion.div>
  );
}