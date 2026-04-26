import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Small inline step-visuals for slide 6 (CS1 challenge · step flow).
 * Each is ~180×110, stripped of axes/legends — designed to sit beside
 * a short text card as the "visual shorthand" for the step.
 *
 * Three exports:
 *   • SurvivalFlow  — 2 curves diverging (untreated decays, target flat)
 *   • LabelGapFlow  — solid approved bar + dashed empty peds bar
 *   • SparsePKFlow  — cyan dense cloud + 5 isolated coral dots
 */

const ease = [0.2, 0.7, 0.3, 1];

/* ========================================================
   1 · Survival — two diverging curves
   ======================================================== */
export function SurvivalFlow({ tk, delay = 0, width = 200, height = 110 }) {
  const W = width, H = height;
  const padL = 10, padR = 12, padT = 10, padB = 18;
  const iw = W - padL - padR;
  const ih = H - padT - padB;

  const lambda = Math.LN2 / 2.8;
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const t = (i / 40) * 5;
    pts.push([t, Math.exp(-lambda * t)]);
  }
  const x = (t) => padL + (t / 5) * iw;
  const y = (s) => padT + (1 - s) * ih;
  const untreated = 'M ' + pts.map(([t, s]) => `${x(t).toFixed(1)},${y(s).toFixed(1)}`).join(' L ');
  const target = `M ${x(0)} ${y(0.95)} L ${x(5)} ${y(0.95)}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* Target — cyan flat */}
      <motion.path
        d={target} fill="none" stroke={tk('--cyan')} strokeWidth={1.6}
        strokeLinecap="round" strokeDasharray={300}
        initial={{ strokeDashoffset: 300 }} animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.8, ease, delay }}
      />
      {/* Untreated — coral decay */}
      <motion.path
        d={untreated} fill="none" stroke={tk('--coral')} strokeWidth={2}
        strokeLinecap="round" strokeDasharray={400}
        initial={{ strokeDashoffset: 400 }} animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.2, ease, delay: delay + 0.2 }}
      />

      {/* 2.8 yr median marker */}
      <motion.line
        x1={x(2.8)} x2={x(2.8)} y1={y(0.95)} y2={y(0.5)}
        stroke={tk('--cream-faint')} strokeWidth={1} strokeDasharray="2 3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 1.0 }}
      />
      <motion.text
        x={x(2.8)} y={H - 4} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize="8"
        letterSpacing="0.14em" fill={tk('--coral')} fontWeight={700}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 1.1 }}
      >
        2.8 YR
      </motion.text>
    </svg>
  );
}

/* ========================================================
   2 · Label coverage — solid vs dashed bar
   ======================================================== */
export function LabelGapFlow({ tk, delay = 0, width = 200, height = 110 }) {
  const W = width, H = height;
  const labelX = 42;
  const barX = labelX + 4;
  const barW = W - barX - 10;
  const bh = 18;
  const gap = 16;
  const y0 = 22, y1 = y0 + bh + gap;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* ADULT — solid bar */}
      <text x={labelX - 4} y={y0 + bh / 2 + 3} textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="0.12em"
            fill={tk('--cream')}>ADULT</text>
      <motion.rect
        x={barX} y={y0} width={barW} height={bh}
        fill={tk('--cyan')} fillOpacity={0.42} rx={1.5}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
        transition={{ duration: 0.9, ease, delay }}
      />
      <motion.text
        x={barX + barW / 2} y={y0 + bh / 2 + 3} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize="8" fontWeight={700}
        fill={tk('--cream')} letterSpacing="0.1em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.9 }}
      >
        5 / 10 MG
      </motion.text>

      {/* PEDIATRIC — dashed empty */}
      <text x={labelX - 4} y={y1 + bh / 2 + 3} textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="0.12em"
            fill={tk('--cream')}>PEDS</text>
      <motion.rect
        x={barX} y={y1} width={barW} height={bh}
        fill="none" stroke={tk('--coral')} strokeWidth={1.2}
        strokeDasharray="4 3" rx={1.5}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      />
      <motion.text
        x={barX + barW / 2} y={y1 + bh / 2 + 3} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize="8" fontWeight={700}
        fill={tk('--coral')} letterSpacing="0.14em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.7 }}
      >
        NO DOSE
      </motion.text>
    </svg>
  );
}

/* ========================================================
   3 · Sparse PK — cyan cloud vs 5 coral dots
   ======================================================== */
export function SparsePKFlow({ tk, delay = 0, width = 200, height = 110 }) {
  const W = width, H = height;
  const padL = 10, padR = 10, padT = 12, padB = 18;
  const iw = W - padL - padR;
  const ih = H - padT - padB;

  const curve = (t) => 80 + 420 * Math.exp(-0.08 * t) * (1 - Math.exp(-0.9 * t));

  const { adult, pedi } = useMemo(() => {
    let s = 4242;
    const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const nrand = () => {
      let u = 0, v = 0;
      while (!u) u = r(); while (!v) v = r();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };
    const adult = [];
    for (let i = 0; i < 40; i++) {
      const t = 0.5 + r() * 23;
      const c = Math.max(10, curve(t) * (1 + nrand() * 0.22));
      adult.push({ t, c });
    }
    const pediTimes = [0.8, 2.4, 6.2, 12.4, 22.8];
    const pedi = pediTimes.map((t) => ({
      t, c: Math.max(10, curve(t) * (0.55 + nrand() * 0.1)),
    }));
    return { adult, pedi };
  }, []);

  const x = (t) => padL + (t / 24) * iw;
  const y = (c) => padT + (1 - Math.min(c, 560) / 560) * ih;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* Adult dense cloud */}
      {adult.map((d, i) => (
        <motion.circle
          key={`a${i}`}
          cx={x(d.t)} cy={y(d.c)} r={1.8}
          fill={tk('--cyan')} fillOpacity={0.75}
          initial={{ opacity: 0 }} animate={{ opacity: 0.85 }}
          transition={{ duration: 0.2, delay: delay + (i % 12) * 0.018 + Math.floor(i / 12) * 0.08 }}
        />
      ))}

      {/* 5 sparse pediatric dots */}
      {pedi.map((d, i) => (
        <motion.circle
          key={`p${i}`}
          cx={x(d.t)} cy={y(d.c)} r={3.2}
          fill={tk('--coral')}
          initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: delay + 0.9 + i * 0.12 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}

      {/* N = 39 callout */}
      <motion.text
        x={W - 4} y={H - 4} textAnchor="end"
        fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.14em"
        fill={tk('--coral')} fontWeight={700}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 1.6 }}
      >
        N = 39
      </motion.text>
      <motion.text
        x={padL} y={H - 4}
        fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.14em"
        fill={tk('--cyan')}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.6 }}
      >
        N = 258
      </motion.text>
    </svg>
  );
}