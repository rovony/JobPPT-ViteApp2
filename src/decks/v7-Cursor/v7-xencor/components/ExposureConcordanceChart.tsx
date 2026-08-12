// @ts-nocheck
/**
 * Compact AUCss concordance chart — ported from quarry 09c AUCPanel.
 * Dual low/high dose panels: adult band + pediatric dots + median.
 */
import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as d3 from 'd3';

const REGIMES = [
  { label: 'LOW DOSE', delta: '−3%', color: 'var(--coral)' },
  { label: 'HIGH DOSE', delta: '+0.3%', color: 'var(--cyan)' },
];

const EASE = [0.22, 0.68, 0.28, 1];

export default function ExposureConcordanceChart({ delay = 0.4 }) {
  const reduced = useReducedMotion();
  const W = 520;
  const H = 280;
  const m = { top: 12, right: 16, bottom: 36, left: 40 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  const x = d3.scaleLinear().domain([18, 82]).range([0, iw]);
  const y = d3.scaleLinear().domain([0, 20]).range([ih, 0]);

  const { pedDots, bands } = useMemo(() => {
    let s = 9001;
    const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const nrand = () => {
      let u = 0;
      let v = 0;
      while (!u) u = r();
      while (!v) v = r();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    const trueShapes = [
      {
        median: [
          { w: 20, c: 4.5 }, { w: 25, c: 4.2 }, { w: 30, c: 4.1 }, { w: 35, c: 3.8 },
          { w: 40, c: 4.8 }, { w: 45, c: 6.0 }, { w: 50, c: 5.5 }, { w: 55, c: 5.0 },
          { w: 65, c: 4.7 }, { w: 80, c: 4.2 },
        ],
        band: [
          { w: 20, lo: 3.5, hi: 5.5 }, { w: 25, lo: 3.3, hi: 6.0 }, { w: 30, lo: 3.1, hi: 6.8 },
          { w: 35, lo: 3.0, hi: 7.5 }, { w: 40, lo: 4.0, hi: 7.5 }, { w: 45, lo: 4.5, hi: 7.2 },
          { w: 50, lo: 4.2, hi: 6.5 }, { w: 55, lo: 4.0, hi: 6.0 }, { w: 65, lo: 3.9, hi: 5.6 },
          { w: 80, lo: 3.7, hi: 5.1 },
        ],
      },
      {
        median: [
          { w: 20, c: 9.3 }, { w: 25, c: 8.8 }, { w: 30, c: 8.0 }, { w: 35, c: 8.0 },
          { w: 40, c: 8.5 }, { w: 45, c: 9.2 }, { w: 50, c: 10.0 }, { w: 55, c: 10.5 },
          { w: 65, c: 9.2 }, { w: 80, c: 7.9 },
        ],
        band: [
          { w: 20, lo: 7.0, hi: 12.0 }, { w: 25, lo: 6.6, hi: 11.6 }, { w: 30, lo: 6.2, hi: 11.4 },
          { w: 35, lo: 6.0, hi: 11.2 }, { w: 40, lo: 7.0, hi: 11.1 }, { w: 45, lo: 7.6, hi: 11.0 },
          { w: 50, lo: 7.8, hi: 12.2 }, { w: 55, lo: 7.8, hi: 13.5 }, { w: 65, lo: 7.6, hi: 11.8 },
          { w: 80, lo: 7.4, hi: 9.8 },
        ],
      },
    ];

    const bands = REGIMES.map((reg, i) => ({
      reg,
      band: trueShapes[i].band,
      median: trueShapes[i].median,
    }));

    const pedDots = [];
    for (let i = 0; i < 39; i++) {
      const w = 20 + r() * 57;
      const regIdx = i < 20 ? 0 : 1;
      const medShape = trueShapes[regIdx].median;
      let med_c = medShape[0].c;
      for (let j = 0; j < medShape.length - 1; j++) {
        if (w >= medShape[j].w && w <= medShape[j + 1].w) {
          const pct = (w - medShape[j].w) / (medShape[j + 1].w - medShape[j].w);
          med_c = medShape[j].c + pct * (medShape[j + 1].c - medShape[j].c);
          break;
        }
      }
      pedDots.push({ w, c: med_c * Math.exp(nrand() * 0.15), i });
    }
    return { pedDots, bands };
  }, []);

  const area = d3.area().x((d) => x(d.w)).y0((d) => y(d.lo)).y1((d) => y(d.hi)).curve(d3.curveMonotoneX);
  const line = d3.line().x((d) => x(d.w)).y((d) => y(d.c)).curve(d3.curveMonotoneX);
  const yTicks = y.ticks(4);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
        gap: 'var(--space-3)',
        width: '100%',
        height: '100%',
        minHeight: 0,
      }}
      role="img"
      aria-label="Pediatric AUCss by weight lands inside adult bands at both doses"
    >
      {bands.map(({ reg, band, median }, i) => {
        const dots = pedDots.filter((d) => (i === 0 ? d.i < 20 : d.i >= 20));
        return (
          <div
            key={reg.label}
            style={{
              minWidth: 0,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--cream-hairline)',
              padding: 'var(--space-2)',
              background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <span className="deck-mono uppercase" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', letterSpacing: '0.12em', color: reg.color, fontWeight: 700 }}>
                {reg.label}
              </span>
              <span className="deck-display" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: reg.color, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {reg.delta}
              </span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', flex: 1, minHeight: 0 }}>
              <g transform={`translate(${m.left},${m.top})`}>
                {yTicks.map((v) => (
                  <line key={`gy-${v}`} x1={0} x2={iw} y1={y(v)} y2={y(v)} stroke="var(--cream-hairline)" strokeWidth={1} />
                ))}
                <path d={area(band)} fill={`color-mix(in srgb, ${reg.color} 22%, transparent)`} />
                <path d={line(median)} fill="none" stroke={reg.color} strokeWidth={2} />
                {dots.map((d) => (
                  <circle key={d.i} cx={x(d.w)} cy={y(d.c)} r={2.4} fill="var(--cream)" opacity={0.55} />
                ))}
                <text x={iw / 2} y={ih + 28} textAnchor="middle" fill="var(--cream-muted)" fontSize={11} fontFamily="var(--font-mono)">
                  Weight (kg)
                </text>
                <text x={-ih / 2} y={-28} transform="rotate(-90)" textAnchor="middle" fill="var(--cream-muted)" fontSize={11} fontFamily="var(--font-mono)">
                  AUCss
                </text>
              </g>
            </svg>
          </div>
        );
      })}
    </motion.div>
  );
}
