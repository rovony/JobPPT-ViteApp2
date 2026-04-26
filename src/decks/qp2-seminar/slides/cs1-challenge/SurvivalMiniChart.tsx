import React from 'react';
import { motion } from 'framer-motion';

/**
 * SurvivalMiniChart — PAH untreated vs target survival (stylized KM).
 * Coral "Untreated" curve decays fast to ~0 by year 5; cyan "Target" line
 * stays near 1.0 (flat). Dashed vertical marker at 2.8 yr median.
 *
 * Deterministic, no external data. Pure SVG.
 */
export default function SurvivalMiniChart({ tk, delay = 0 }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const W = 360, H = 180;
  const m = { t: 22, r: 60, b: 36, l: 42 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;

  // Survival function: S(t) = exp(-λt), λ chosen so median ≈ 2.8 yr
  const lambda = Math.LN2 / 2.8;
  const xs = [];
  for (let i = 0; i <= 50; i++) {
    const t = (i / 50) * 5;
    xs.push([t, Math.exp(-lambda * t)]);
  }
  const x = (t) => m.l + (t / 5) * iw;
  const y = (s) => m.t + (1 - s) * ih;
  const untreatedPath = 'M ' + xs.map(([t, s]) => `${x(t).toFixed(1)},${y(s).toFixed(1)}`).join(' L ');
  const targetPath = `M ${x(0)} ${y(1.0)} L ${x(5)} ${y(1.0)}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1.0].map((s) => (
        <line key={s} x1={m.l} x2={m.l + iw} y1={y(s)} y2={y(s)}
              stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.4} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((t) => (
        <line key={t} x1={x(t)} x2={x(t)} y1={m.t} y2={m.t + ih}
              stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.2} />
      ))}

      {/* Target — cyan flat */}
      <motion.path
        d={targetPath} fill="none" stroke={tk('--cyan')} strokeWidth={2.2}
        strokeDasharray={400}
        initial={{ strokeDashoffset: 400 }} animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.9, ease, delay }}
      />
      {/* Untreated — coral decay */}
      <motion.path
        d={untreatedPath} fill="none" stroke={tk('--coral')} strokeWidth={2.4}
        strokeLinecap="round" strokeDasharray={500}
        initial={{ strokeDashoffset: 500 }} animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.4, ease, delay: delay + 0.1 }}
      />

      {/* Median marker at 2.8 yr */}
      <motion.line
        x1={x(2.8)} x2={x(2.8)} y1={y(1)} y2={y(0.5)}
        stroke={tk('--cream-faint')} strokeWidth={1} strokeDasharray="3 4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 1.2 }}
      />
      <motion.text
        x={x(2.8)} y={y(0.5) - 6} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize="9" fill={tk('--cream-faint')}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 1.3 }}
      >
        2.8 yr
      </motion.text>

      {/* Y ticks */}
      {[0, 0.5, 1.0].map((s) => (
        <text key={s} x={m.l - 6} y={y(s) + 3} textAnchor="end"
              fontFamily="var(--font-mono)" fontSize="9" fill={tk('--cream-muted')}>
          {s.toFixed(2)}
        </text>
      ))}
      {/* X ticks */}
      {[0, 1, 2, 3, 4, 5].map((t) => (
        <text key={t} x={x(t)} y={m.t + ih + 14} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="9" fill={tk('--cream-muted')}>
          {t}
        </text>
      ))}
      <text x={m.l + iw / 2} y={H - 4} textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="0.18em"
            fill={tk('--cream-faint')}>YEARS</text>

      {/* Inline legend labels (right-anchored) */}
      <text x={m.l + iw + 6} y={y(1.0) + 3}
            fontFamily="var(--font-mono)" fontSize="9" fill={tk('--cyan')}>Target</text>
      <text x={m.l + iw + 6} y={y(0.20) + 3}
            fontFamily="var(--font-mono)" fontSize="9" fill={tk('--coral')}>Untreated</text>
    </svg>
  );
}