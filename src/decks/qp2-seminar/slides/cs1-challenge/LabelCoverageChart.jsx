import React from 'react';
import { motion } from 'framer-motion';

/**
 * LabelCoverageChart — two horizontal bars.
 *   ADULT  ≥18 yr  — full cyan bar (5/10 mg approved)
 *   PEDI   <18 yr  — empty dashed coral frame (no approved dose)
 * Draws left→right via scaleX.
 */
export default function LabelCoverageChart({ tk, delay = 0 }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const W = 360, H = 140;
  const m = { t: 20, r: 12, b: 12, l: 92 };
  const iw = W - m.l - m.r;
  const bh = 30;

  const rowY = (i) => m.t + i * 58;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* ADULT row */}
      <text x={m.l - 10} y={rowY(0) + bh / 2 + 4} textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em"
            fill={tk('--cream')}>Adults</text>
      <text x={m.l - 10} y={rowY(0) + bh / 2 + 16} textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="8.5" fill={tk('--cream-faint')}>≥18 yr</text>

      <rect x={m.l} y={rowY(0)} width={iw} height={bh}
            fill="none" stroke={tk('--cream-hairline')} strokeWidth={1} />
      <motion.rect
        x={m.l} y={rowY(0)} width={iw} height={bh}
        fill={tk('--cyan')} opacity={0.42}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
        transition={{ duration: 1.0, ease, delay }}
      />
      <motion.text
        x={m.l + iw - 8} y={rowY(0) + bh / 2 + 4} textAnchor="end"
        fontFamily="var(--font-mono)" fontSize="9.5" fontWeight={700}
        fill={tk('--cream')}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 1.0 }}
      >
        5 / 10 mg approved
      </motion.text>

      {/* PEDIATRIC row — empty dashed */}
      <text x={m.l - 10} y={rowY(1) + bh / 2 + 4} textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em"
            fill={tk('--cream')}>Pediatric</text>
      <text x={m.l - 10} y={rowY(1) + bh / 2 + 16} textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="8.5" fill={tk('--cream-faint')}>&lt;18 yr</text>

      <motion.rect
        x={m.l} y={rowY(1)} width={iw} height={bh}
        fill="none" stroke={tk('--coral')} strokeWidth={1.4} strokeDasharray="5 5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
      />
      <motion.text
        x={m.l + iw / 2} y={rowY(1) + bh / 2 + 4} textAnchor="middle"
        fontFamily="var(--font-mono)" fontSize="9.5" fontWeight={700}
        fill={tk('--coral')} letterSpacing="0.14em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.6 }}
      >
        NO APPROVED DOSE
      </motion.text>
    </svg>
  );
}