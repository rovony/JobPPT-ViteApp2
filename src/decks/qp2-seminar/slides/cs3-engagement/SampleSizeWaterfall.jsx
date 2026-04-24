import React from 'react';
import { motion } from 'framer-motion';

/**
 * SampleSizeWaterfall — 94 → 60 sample-size reduction visualization.
 *
 * Two vertical bars on a baseline:
 *   • LEFT — original protocol (N = 94), full-height in cream-faint
 *   • RIGHT — FDA-agreed (N = 60), shorter, violet-filled and labeled
 *
 * A connecting curved arrow spans from top-of-94 to top-of-60, with a
 * "−36% · −34 patients" callout sitting on the gap. The visualization
 * earns the headline ("FDA agreed to N = 60") in a single look.
 */
export default function SampleSizeWaterfall({
  stroke = 'var(--violet)',
  delay = 0,
  className,
}) {
  const ease = [0.2, 0.7, 0.3, 1];
  const overshoot = [0.34, 1.56, 0.64, 1];

  // Geometry — viewBox 600 × 360
  // Baseline at y=308. Bars 78 wide. Left bar 94 → height 220. Right bar 60 → height 140.
  const baselineY = 308;
  const leftX = 130;
  const rightX = 380;
  const barW = 78;
  const leftH = 220; // 94 patients → full
  const rightH = 140; // 60 patients → 140/220 ≈ 64%

  return (
    <svg
      viewBox="0 0 600 360"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-label="Sample size reduction from 94 to 60 patients"
      role="img"
    >
      {/* Baseline */}
      <motion.line
        x1={70}
        y1={baselineY}
        x2={530}
        y2={baselineY}
        stroke="var(--cream-hairline)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease, delay }}
      />

      {/* LEFT BAR — original 94 */}
      <motion.rect
        x={leftX}
        y={baselineY - leftH}
        width={barW}
        height={leftH}
        rx={3}
        fill="color-mix(in srgb, var(--cream-faint) 25%, transparent)"
        stroke="var(--cream-faint)"
        strokeWidth={1.4}
        strokeDasharray="4 4"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease, delay: delay + 0.2 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
      />
      {/* Left numeral */}
      <motion.text
        x={leftX + barW / 2}
        y={baselineY - leftH - 18}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize={44}
        fontWeight={700}
        fill="var(--cream)"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: delay + 0.7 }}
      >
        94
      </motion.text>
      <motion.text
        x={leftX + barW / 2}
        y={baselineY + 22}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={10}
        letterSpacing="0.18em"
        fontWeight={700}
        fill="var(--cream-muted)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: delay + 0.85 }}
      >
        ORIGINAL CSP
      </motion.text>
      <motion.text
        x={leftX + barW / 2}
        y={baselineY + 38}
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontSize={11}
        fill="var(--cream-faint)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: delay + 0.95 }}
      >
        endpoint-powered
      </motion.text>

      {/* RIGHT BAR — agreed 60 */}
      <motion.rect
        x={rightX}
        y={baselineY - rightH}
        width={barW}
        height={rightH}
        rx={3}
        fill="color-mix(in srgb, var(--violet) 28%, transparent)"
        stroke={stroke}
        strokeWidth={2}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: overshoot, delay: delay + 1.0 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
      />
      {/* Right numeral */}
      <motion.text
        x={rightX + barW / 2}
        y={baselineY - rightH - 18}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize={56}
        fontWeight={800}
        fill={stroke}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: delay + 1.5 }}
      >
        60
      </motion.text>
      <motion.text
        x={rightX + barW / 2}
        y={baselineY + 22}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={10}
        letterSpacing="0.18em"
        fontWeight={700}
        fill={stroke}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: delay + 1.65 }}
      >
        FDA AGREED
      </motion.text>
      <motion.text
        x={rightX + barW / 2}
        y={baselineY + 38}
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontSize={11}
        fill="var(--cream-muted)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: delay + 1.75 }}
      >
        Type A · 21 Jul 2023
      </motion.text>

      {/* Connecting curved arrow */}
      <motion.path
        d={`M ${leftX + barW + 6} ${baselineY - leftH + 14} C ${leftX + 200} ${baselineY - leftH - 60}, ${rightX - 80} ${baselineY - rightH - 70}, ${rightX - 6} ${baselineY - rightH + 14}`}
        fill="none"
        stroke={stroke}
        strokeWidth={1.6}
        strokeDasharray="4 5"
        opacity={0.7}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1.1, ease, delay: delay + 1.85 }}
      />

      {/* −36% callout */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: overshoot, delay: delay + 2.4 }}
      >
        <rect
          x={232}
          y={20}
          width={136}
          height={50}
          rx={4}
          fill="color-mix(in srgb, var(--violet) 18%, transparent)"
          stroke={stroke}
          strokeWidth={1.2}
        />
        <text
          x={300}
          y={48}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize={26}
          fontWeight={800}
          fill={stroke}
        >
          −36%
        </text>
        <text
          x={300}
          y={64}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={9}
          letterSpacing="0.18em"
          fill="var(--cream-muted)"
        >
          34 FEWER PATIENTS
        </text>
      </motion.g>
    </svg>
  );
}
