import React from 'react';
import { motion } from 'framer-motion';

/**
 * PdDotStrip — tiny 0–100% dot-plot showing 2-HG inhibition equivalence.
 *
 * Two dots (Asian vs Non-Asian) animate from 0% → their final position
 * on the same horizontal scale. They land ~84.5% on top of each other,
 * which is the visual claim: the PD readout is identical.
 */
export default function PdDotStrip({ tk, delay = 0, asianPct = 84.6, nonAsianPct = 84.4 }) {
  const W = 640, H = 56;
  const pad = 14;
  const scale = (p) => pad + ((W - pad * 2) * p) / 100;
  const yA = H / 2 - 8;
  const yN = H / 2 + 8;

  const ease = [0.2, 0.7, 0.3, 1];
  const ticks = [0, 25, 50, 75, 100];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
      {/* Spine */}
      <line
        x1={pad} x2={W - pad} y1={H / 2} y2={H / 2}
        stroke={tk('--cream-hairline')} strokeWidth={1}
      />
      {/* Ticks */}
      {ticks.map((p) => (
        <g key={p}>
          <line
            x1={scale(p)} x2={scale(p)}
            y1={H / 2 - 3} y2={H / 2 + 3}
            stroke={tk('--cream-faint')} strokeWidth={1} opacity={0.5}
          />
          <text
            x={scale(p)} y={H - 2} textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="8"
            letterSpacing="0.14em" fill={tk('--cream-faint')}
          >
            {p}%
          </text>
        </g>
      ))}

      {/* Asian dot — cyan, top row */}
      <motion.circle
        cy={yA} r={7}
        fill={tk('--cyan')}
        initial={{ cx: scale(0), opacity: 0 }}
        animate={{ cx: scale(asianPct), opacity: 1 }}
        transition={{ duration: 1.2, ease, delay }}
      />
      {/* Non-Asian dot — cream, bottom row */}
      <motion.circle
        cy={yN} r={7}
        fill={tk('--cream')} opacity={0.85}
        initial={{ cx: scale(0), opacity: 0 }}
        animate={{ cx: scale(nonAsianPct), opacity: 0.85 }}
        transition={{ duration: 1.2, ease, delay: delay + 0.1 }}
      />
    </svg>
  );
}