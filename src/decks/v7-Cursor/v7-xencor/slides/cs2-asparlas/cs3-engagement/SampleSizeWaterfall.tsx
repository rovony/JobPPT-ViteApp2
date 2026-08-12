import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * SampleSizeWaterfall — 94 → 60 sample-size reduction visualization.
 *
 * Light-editorial: solid labels at rest (never opacity-gated), bars may draw.
 * Delays capped so numerals/labels are readable immediately.
 */
export default function SampleSizeWaterfall({
  stroke = 'var(--teal)',
  delay = 0,
  className,
}) {
  const reduced = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const d = Math.min(delay, 0.2);

  const baselineY = 308;
  const leftX = 130;
  const rightX = 380;
  const barW = 78;
  const leftH = 220;
  const rightH = 140;

  const barAnim = (extra = 0) =>
    reduced
      ? { initial: false, animate: { scaleY: 1, opacity: 1 } }
      : {
          initial: { scaleY: 0, opacity: 1 },
          animate: { scaleY: 1, opacity: 1 },
          transition: { duration: 0.45, ease, delay: d + extra },
        };

  return (
    <svg
      viewBox="0 0 600 360"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-label="Sample size reduction from 94 to 60 patients"
      role="img"
      style={{ display: 'block', width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' }}
    >
      <line
        x1={70}
        y1={baselineY}
        x2={530}
        y2={baselineY}
        stroke="var(--cream-hairline)"
        strokeWidth={1}
      />

      {/* LEFT BAR — original 94 */}
      <motion.rect
        x={leftX}
        y={baselineY - leftH}
        width={barW}
        height={leftH}
        fill="color-mix(in srgb, var(--cream-faint) 18%, var(--panel))"
        stroke="var(--cream-faint)"
        strokeWidth={1.4}
        strokeDasharray="4 4"
        style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
        {...barAnim(0.05)}
      />
      <motion.text
        layoutId="cs3-n-94"
        x={leftX + barW / 2}
        y={baselineY - leftH - 18}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize={44}
        fontWeight={700}
        fill="var(--cream)"
      >
        94
      </motion.text>
      <text
        x={leftX + barW / 2}
        y={baselineY + 22}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={10}
        letterSpacing="0.04em"
        fontWeight={700}
        fill="var(--cream-muted)"
      >
        ORIGINAL CSP
      </text>
      <text
        x={leftX + barW / 2}
        y={baselineY + 38}
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontSize={11}
        fill="var(--cream-faint)"
      >
        endpoint-powered
      </text>

      {/* RIGHT BAR — agreed 60 */}
      <motion.rect
        x={rightX}
        y={baselineY - rightH}
        width={barW}
        height={rightH}
        fill="color-mix(in srgb, var(--teal) 14%, var(--panel))"
        stroke={stroke}
        strokeWidth={2}
        style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
        {...barAnim(0.12)}
      />
      <text
        x={rightX + barW / 2}
        y={baselineY - rightH - 18}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize={56}
        fontWeight={800}
        fill={stroke}
      >
        60
      </text>
      <text
        x={rightX + barW / 2}
        y={baselineY + 22}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={10}
        letterSpacing="0.04em"
        fontWeight={700}
        fill={stroke}
      >
        FDA AGREED
      </text>
      <text
        x={rightX + barW / 2}
        y={baselineY + 38}
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontSize={11}
        fill="var(--cream-muted)"
      >
        Type A · 21 Jul 2023
      </text>

      {/* Connecting curve — decorative draw only */}
      {reduced ? (
        <path
          d={`M ${leftX + barW + 6} ${baselineY - leftH + 14} C ${leftX + 200} ${baselineY - leftH - 60}, ${rightX - 80} ${baselineY - rightH - 70}, ${rightX - 6} ${baselineY - rightH + 14}`}
          fill="none"
          stroke={stroke}
          strokeWidth={1.6}
          strokeDasharray="4 5"
          opacity={0.55}
        />
      ) : (
        <motion.path
          d={`M ${leftX + barW + 6} ${baselineY - leftH + 14} C ${leftX + 200} ${baselineY - leftH - 60}, ${rightX - 80} ${baselineY - rightH - 70}, ${rightX - 6} ${baselineY - rightH + 14}`}
          fill="none"
          stroke={stroke}
          strokeWidth={1.6}
          strokeDasharray="4 5"
          initial={{ pathLength: 0, opacity: 0.55 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ duration: 0.5, ease, delay: d + 0.2 }}
        />
      )}

      {/* −36% callout — solid at rest */}
      <motion.g layoutId="cs3-pct-36">
        <rect
          x={232}
          y={20}
          width={136}
          height={50}
          fill="var(--panel)"
          stroke={stroke}
          strokeWidth={1.2}
        />
        <line x1={232} y1={20} x2={368} y2={20} stroke={stroke} strokeWidth={3} />
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
          letterSpacing="0.04em"
          fill="var(--cream-muted)"
        >
          34 FEWER PATIENTS
        </text>
      </motion.g>
    </svg>
  );
}
