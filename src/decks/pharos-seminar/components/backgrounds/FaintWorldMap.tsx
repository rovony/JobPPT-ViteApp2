// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../motion';

/**
 * FaintWorldMap — abstracted continental dot-map background for slide 03.
 *
 * Not a real cartographic projection — that would steal attention. Instead
 * a sparse dot field arranged into rough continental masses with three
 * "highlight" rings (US · EU · Global) that gain extra opacity, signaling
 * "the regulatory floor is set across these regions". Per A1 §5 row "Reg
 * floor": 4% base, 6% for the three highlight regions.
 */

type Props = {
  opacity?: number;
  highlightOpacity?: number;
  /** When true, dots cascade-in instead of being instant. */
  cascade?: boolean;
};

// Sparse continental dot field (viewBox 1000×500). Hand-placed.
const DOTS: Array<[number, number]> = [
  // North America
  [120, 130], [150, 145], [185, 135], [215, 155], [180, 175], [145, 195], [200, 200],
  [240, 175], [255, 200], [225, 220], [180, 230], [150, 240],
  // South America
  [255, 280], [275, 305], [295, 330], [285, 360], [260, 385],
  // Europe
  [490, 130], [515, 145], [535, 130], [560, 150], [510, 165], [540, 175], [495, 190],
  // Africa
  [510, 220], [540, 245], [555, 280], [535, 315], [510, 345], [490, 325],
  // Asia
  [620, 140], [660, 130], [700, 145], [740, 130], [780, 150], [820, 145], [860, 165],
  [710, 175], [750, 190], [790, 205], [675, 220], [720, 230], [770, 245], [820, 220],
  // Oceania
  [820, 360], [855, 375], [840, 390], [820, 405],
];

const HIGHLIGHTS: Array<{ cx: number; cy: number; r: number; label: string }> = [
  { cx: 175, cy: 175, r: 70, label: 'US' },
  { cx: 525, cy: 160, r: 60, label: 'EU' },
  { cx: 740, cy: 175, r: 110, label: 'GLOBAL' },
];

export default function FaintWorldMap({
  opacity = 0.04,
  highlightOpacity = 0.06,
  cascade = false,
}: Props) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Highlight rings */}
        {HIGHLIGHTS.map((h, i) => (
          <motion.circle
            key={h.label}
            cx={h.cx}
            cy={h.cy}
            r={h.r}
            fill="none"
            stroke="var(--case)"
            strokeWidth={0.6}
            initial={cascade ? { opacity: 0, scale: 0.6 } : false}
            animate={{ opacity: highlightOpacity, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.18, duration: 0.9, ease: EASE.expoOut }}
            style={{ transformOrigin: `${h.cx}px ${h.cy}px` }}
          />
        ))}

        {/* Dots */}
        {DOTS.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={3.4}
            fill="var(--cream)"
            initial={cascade ? { opacity: 0, scale: 0 } : false}
            animate={{ opacity, scale: 1 }}
            transition={{
              delay: cascade ? 0.2 + i * 0.012 : 0,
              duration: 0.4,
              ease: EASE.expoOut,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
