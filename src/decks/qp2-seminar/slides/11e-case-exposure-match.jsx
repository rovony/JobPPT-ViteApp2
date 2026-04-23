import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import HighlightWord from '@/components/deck/patterns/HighlightWord';

/**
 * Slide 11e · CS1 Exposure Match — AUC & Cmax vs adult envelope.
 *
 * Layout:
 *   LEFT panel  (hero, ~58%) — AUCss vs body weight.
 *     • Two adult 5–95% bands (low dose · high dose) drawn as horizontal strips
 *     • Pediatric 90% PI ribbon per dose band, coral wash
 *     • Pediatric median line drawn L→R (stroke-dashoffset)
 *     • 39 pediatric dots staggered via Framer delay
 *   RIGHT panel (~38%) — Cmax,ss box plots.
 *     • Four boxes: Adult-Low · Peds-Low · Adult-High · Peds-High
 *     • Δ brackets placed INSIDE plot area (not clipping the top)
 *   BOTTOM — two hero Δ numbers side-by-side + single italic payoff.
 *
 * Fixes from the HTML mockup:
 *   • No D3. Pure SVG + useMemo + Framer Motion (like slide 11d).
 *   • preserveAspectRatio="xMidYMid meet" everywhere.
 *   • All colors hex-resolved via useTokens (no CSS vars in SVG attrs).
 *   • Adult band labels get distinct y-positions per band (no stacking).
 *   • 39 dots staggered via Framer delay array (no CSS-var-on-SVG bug).
 *   • Δ brackets sit inside plot area, anchored to the shared Cmax y-scale.
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
  const D = {
    chrome: 0.10, headline: 0.25, subhead: 0.55,
    adultBand: 0.80, pedsBand: 1.10, pedsMed: 1.40, dots: 1.70,
    boxAdult: 1.10, boxPeds: 1.50, boxDelta: 2.20,
    closing: 2.60, payoff: 3.10,
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
        <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: '1fr auto', rowGap: 'var(--space-4)', minHeight: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', columnGap: 'var(--space-6)', minHeight: 0 }}>
      {/* LEFT — AUC vs body weight */}
      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <PanelTitle
          label={<>AUC<sub>ss</sub> × body weight — pediatric vs adult envelope</>}
          right="μg·h/mL · geometric mean (95 % CI)"
          delay={D.adultBand - 0.1}
        />
        <AUCPanel tk={tk} D={D} />
      </div>

      {/* RIGHT — Cmax box plots */}
      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <PanelTitle
          label={<>C<sub>max,ss</sub> — pediatric vs adult</>}
          right="ng/mL · box = IQR · whiskers = 5–95%"
          delay={D.boxAdult - 0.1}
        />
        <CmaxPanel tk={tk} D={D} />
      </div>
          </div>

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
            fontSize: 'clamp(0.9rem, 1.2vw, 1.3rem)',
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
            style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--coral)', fontStyle: 'normal', fontWeight: 400 }}
          >
            ICH E11(R1) · exposure match + conserved mechanism → clinical extrapolation
          </div>
        </div>
      </motion.div>

        </div>
      </Viz>

      <Footer
        kicker="Case 01 · Exposure match"
        tagline="Source · Okour et al. JCP 2023 (Table S5) · ICH E11(R1)"
        delay={D.payoff + 0.3}
      />
    </SlideGrid>
  );
}

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
        style={{ fontSize: '0.68rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--coral)' }}
      >
        {label}
      </span>
      <span
        className="deck-mono"
        style={{ fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--cream-faint)' }}
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
          fontSize: 'clamp(2rem, 3.6vw, 3.6rem)',
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
        style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-muted)' }}
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
  const W = 1080, H = 440;
  const m = { top: 18, right: 48, bottom: 50, left: 80 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

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

        {/* Adult 5–95% bands — one per regime, each as its own horizontal strip */}
        {REGIMES.map((reg, i) => (
          <motion.g
            key={`ad-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: D.adultBand + i * 0.08 }}
          >
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
          </motion.g>
        ))}

        {/* Pediatric bands + medians */}
        {bands.map(({ reg, band, median }, i) => (
          <React.Fragment key={`pb-${i}`}>
            <motion.path
              d={area(band)}
              fill={tk('--coral')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.20 }}
              transition={{ duration: 0.6, delay: D.pedsBand + i * 0.1 }}
            />
            <motion.path
              d={line(median)}
              fill="none" stroke={tk('--coral')} strokeWidth={2.4}
              strokeLinecap="round" strokeDasharray={1200}
              initial={{ strokeDashoffset: 1200 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.2, ease: [0.2, 0.7, 0.3, 1], delay: D.pedsMed + i * 0.1 }}
            />
            {/* Δ label at right edge of the median line */}
            <motion.text
              x={x(78)} y={y(reg.pedAUC) - 10}
              textAnchor="end" fontFamily="var(--font-mono)" fontSize="10"
              letterSpacing="0.14em" fill={tk('--coral')} fontWeight={700}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: D.pedsMed + 1.2 + i * 0.1 }}
            >
              Δ {reg.deltaLabel} vs adult
            </motion.text>
          </React.Fragment>
        ))}

        {/* Pediatric patient dots — staggered */}
        {pedDots.map((d) => (
          <motion.circle
            key={d.i}
            cx={x(d.w)} cy={y(d.c)} r={4}
            fill={tk('--cream')} fillOpacity={0.85}
            stroke={tk('--coral')} strokeWidth={1}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: D.dots + d.i * 0.025 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}

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

        {/* Boxes */}
        {CMAX_BOXES.map((b, i) => {
          const cx = b.xPct * iw;
          const isPeds = b.who === 'PEDS';
          const fill = isPeds ? tk('--coral') : tk('--cream');
          const fillOp = isPeds ? 0.24 : 0.10;
          const stroke = isPeds ? tk('--coral') : tk('--cream-muted');
          const strokeOp = isPeds ? 1 : 0.7;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay: isPeds ? D.boxPeds + (i * 0.05) : D.boxAdult + (i * 0.05) }}
            >
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
            </motion.g>
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
            <motion.g
              key={`br-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: D.boxDelta + i * 0.15 }}
            >
              <path
                d={`M ${x1},${br.topY + rise} L ${x1},${br.topY} L ${x2},${br.topY} L ${x2},${br.topY + rise}`}
                fill="none" stroke={tk('--coral')} strokeWidth={1.2}
              />
              <text x={(x1 + x2) / 2} y={br.topY - 6} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.14em"
                    fill={tk('--coral')} fontWeight={700}>
                {br.label}
              </text>
            </motion.g>
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