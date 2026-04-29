// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as d3 from 'd3';

/**
 * KimEtAlBars — three editorial d3-scaled mini-charts visualizing
 * Kim et al. 2025 (arXiv:2512.08296) on multi-agent topology.
 *
 * Variants:
 *   variant="error"     — paired horizontal bars: independent 17.2× vs
 *                         centralized 4.4×, with x-axis ticks 0/5/10/15/20.
 *   variant="lift"      — single vertical bar from baseline to +80.8%
 *                         with annotation arrow + axis at 0%.
 *   variant="threshold" — horizontal capability axis 0%–100% with a
 *                         vertical amber threshold line at 45% and a
 *                         shaded saturation zone to its right.
 *
 * Each chart is a self-contained motion.svg with viewBox sizing so it
 * scales inside the parent panel. Mono labels embedded in the SVG using
 * fontFamily="var(--font-mono)" + letterSpacing for editorial register.
 *
 * Used inline inside the three justification panels on cs4-08.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function KimEtAlBars({ variant, go = true, delay = 0.5 }) {
  if (variant === 'error') return <ErrorBars go={go} delay={delay} />;
  if (variant === 'lift') return <LiftBar go={go} delay={delay} />;
  if (variant === 'threshold') return <ThresholdAxis go={go} delay={delay} />;
  return null;
}

/* ─── 1 · Error containment — paired horizontal bars ─────────── */
function ErrorBars({ go, delay }) {
  const reduce = useReducedMotion();
  const W = 320, H = 140;
  const m = { top: 14, right: 22, bottom: 28, left: 92 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  const x = d3.scaleLinear().domain([0, 20]).range([0, iw]);
  const ticks = [0, 5, 10, 15, 20];

  const yIndep = m.top + ih * 0.18;
  const yCentr = m.top + ih * 0.62;
  const barH = 18;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-label="Error containment — independent 17.2× vs centralized 4.4×"
    >
      {/* Grid + ticks */}
      {ticks.map((t) => (
        <line
          key={`g${t}`}
          x1={m.left + x(t)}
          x2={m.left + x(t)}
          y1={m.top}
          y2={m.top + ih}
          stroke="var(--cream-hairline, rgba(255,232,189,0.12))"
          strokeWidth={1}
          opacity={0.4}
        />
      ))}

      {/* Independent — coral bar (high error) */}
      <motion.rect
        x={m.left}
        y={yIndep}
        height={barH}
        fill="var(--coral, #d96155)"
        fillOpacity={0.78}
        initial={reduce ? false : { width: 0 }}
        animate={{ width: x(17.2) }}
        transition={{ duration: 0.95, ease: EASE, delay }}
      />
      <text
        x={m.left - 6}
        y={yIndep + barH / 2 + 3}
        textAnchor="end"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="1"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        INDEPENDENT
      </text>
      <motion.text
        x={m.left + x(17.2) + 6}
        y={yIndep + barH / 2 + 3}
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.5"
        fill="var(--coral, #d96155)"
        fontWeight={700}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE, delay: delay + 0.7 }}
      >
        17.2×
      </motion.text>

      {/* Centralized — amber bar (low error) */}
      <motion.rect
        x={m.left}
        y={yCentr}
        height={barH}
        fill="var(--amber, #d4a373)"
        fillOpacity={0.95}
        initial={reduce ? false : { width: 0 }}
        animate={{ width: x(4.4) }}
        transition={{ duration: 0.85, ease: EASE, delay: delay + 0.15 }}
      />
      <text
        x={m.left - 6}
        y={yCentr + barH / 2 + 3}
        textAnchor="end"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="1"
        fill="var(--amber, #d4a373)"
        fontWeight={700}
      >
        CENTRALIZED
      </text>
      <motion.text
        x={m.left + x(4.4) + 6}
        y={yCentr + barH / 2 + 3}
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.5"
        fill="var(--amber, #d4a373)"
        fontWeight={700}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE, delay: delay + 0.85 }}
      >
        4.4×
      </motion.text>

      {/* X-axis baseline */}
      <line
        x1={m.left}
        x2={m.left + iw}
        y1={m.top + ih}
        y2={m.top + ih}
        stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
        strokeWidth={1}
      />
      {ticks.map((t) => (
        <text
          key={`tx${t}`}
          x={m.left + x(t)}
          y={m.top + ih + 12}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fill="var(--cream-muted, rgba(255,232,189,0.65))"
        >
          {t}×
        </text>
      ))}
      <text
        x={m.left + iw / 2}
        y={H - 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="1.2"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        ERROR-AMPLIFICATION FACTOR · KIM 2025
      </text>
    </svg>
  );
}

/* ─── 2 · Structured-task gain — vertical bar with annotation ─ */
function LiftBar({ go, delay }) {
  const reduce = useReducedMotion();
  const W = 320, H = 140;
  const m = { top: 18, right: 22, bottom: 26, left: 56 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  const y = d3.scaleLinear().domain([0, 100]).range([ih, 0]);
  const ticks = [0, 25, 50, 75, 100];

  const xCentr = m.left + iw * 0.32;
  const xBase = m.left + iw * 0.66;
  const barW = 38;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-label="Structured-task gain — +80.8% under centralized coordination"
    >
      {/* Y grid + ticks */}
      {ticks.map((t) => (
        <line
          key={`g${t}`}
          x1={m.left}
          x2={m.left + iw}
          y1={m.top + y(t)}
          y2={m.top + y(t)}
          stroke="var(--cream-hairline, rgba(255,232,189,0.12))"
          strokeWidth={1}
          opacity={0.4}
        />
      ))}
      {ticks.map((t) => (
        <text
          key={`ty${t}`}
          x={m.left - 6}
          y={m.top + y(t) + 3}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fill="var(--cream-muted, rgba(255,232,189,0.65))"
        >
          {t}%
        </text>
      ))}

      {/* Baseline (independent) bar — at ~55% reference */}
      <motion.rect
        x={xBase - barW / 2}
        y={m.top + y(55)}
        width={barW}
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
        fillOpacity={0.55}
        initial={reduce ? false : { height: 0 }}
        animate={{ height: ih - y(55) }}
        transition={{ duration: 0.85, ease: EASE, delay }}
      />
      <text
        x={xBase}
        y={m.top + ih + 14}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.6"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        BASELINE
      </text>

      {/* Centralized bar — climbs to ~80.8% lift over baseline */}
      <motion.rect
        x={xCentr - barW / 2}
        y={m.top + y(99)}
        width={barW}
        fill="var(--amber, #d4a373)"
        initial={reduce ? false : { height: 0 }}
        animate={{ height: ih - y(99) }}
        transition={{ duration: 0.95, ease: EASE, delay: delay + 0.2 }}
      />
      <text
        x={xCentr}
        y={m.top + ih + 14}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.6"
        fill="var(--amber, #d4a373)"
        fontWeight={700}
      >
        CENTRAL
      </text>

      {/* Annotation arrow + label */}
      <motion.path
        d={`M ${xCentr + barW / 2 + 8} ${m.top + y(99)} L ${xCentr + barW / 2 + 32} ${m.top + y(78)}`}
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.2}
        fill="none"
        markerEnd="none"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: delay + 1.1 }}
      />
      <motion.text
        x={xCentr + barW / 2 + 36}
        y={m.top + y(78)}
        fontFamily="var(--font-mono)"
        fontSize="13"
        letterSpacing="0.5"
        fill="var(--amber, #d4a373)"
        fontWeight={700}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE, delay: delay + 1.4 }}
      >
        +80.8%
      </motion.text>

      {/* X axis baseline */}
      <line
        x1={m.left}
        x2={m.left + iw}
        y1={m.top + ih}
        y2={m.top + ih}
        stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
        strokeWidth={1}
      />
      <text
        x={m.left + iw / 2}
        y={H - 3}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="1.2"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        STRUCTURED TASK PERFORMANCE · KIM 2025
      </text>
    </svg>
  );
}

/* ─── 3 · Capability saturation threshold ────────────────────── */
function ThresholdAxis({ go, delay }) {
  const reduce = useReducedMotion();
  const W = 320, H = 140;
  const m = { top: 28, right: 22, bottom: 30, left: 28 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  const x = d3.scaleLinear().domain([0, 100]).range([0, iw]);
  const ticks = [0, 25, 45, 70, 100];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-label="Capability saturation — single-agent crosses at ~45%"
    >
      {/* Multi-agent advantage zone (left of threshold) */}
      <motion.rect
        x={m.left}
        y={m.top}
        height={ih}
        fill="var(--amber, #d4a373)"
        fillOpacity={0.18}
        initial={reduce ? false : { width: 0 }}
        animate={{ width: x(45) }}
        transition={{ duration: 0.75, ease: EASE, delay }}
      />
      {/* Single-agent zone (right of threshold) */}
      <motion.rect
        x={m.left + x(45)}
        y={m.top}
        height={ih}
        fill="var(--cream-faint, rgba(255,232,189,0.18))"
        fillOpacity={0.18}
        initial={reduce ? false : { width: 0 }}
        animate={{ width: iw - x(45) }}
        transition={{ duration: 0.75, ease: EASE, delay: delay + 0.2 }}
      />

      {/* Threshold line at 45% */}
      <motion.line
        x1={m.left + x(45)}
        x2={m.left + x(45)}
        y1={m.top - 8}
        y2={m.top + ih + 4}
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.6}
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.55, ease: EASE, delay: delay + 0.7 }}
      />
      <motion.text
        x={m.left + x(45)}
        y={m.top - 12}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="0.6"
        fill="var(--amber, #d4a373)"
        fontWeight={700}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE, delay: delay + 1.0 }}
      >
        ~45% saturation
      </motion.text>

      {/* X axis */}
      <line
        x1={m.left}
        x2={m.left + iw}
        y1={m.top + ih}
        y2={m.top + ih}
        stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
        strokeWidth={1}
      />
      {ticks.map((t) => (
        <text
          key={`tx${t}`}
          x={m.left + x(t)}
          y={m.top + ih + 12}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fill={t === 45 ? 'var(--amber, #d4a373)' : 'var(--cream-muted, rgba(255,232,189,0.65))'}
          fontWeight={t === 45 ? 700 : 400}
        >
          {t}%
        </text>
      ))}

      {/* Zone labels */}
      <motion.text
        x={m.left + x(22)}
        y={m.top + ih / 2 + 3}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="1"
        fill="var(--amber, #d4a373)"
        fontWeight={700}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 0.95 }}
        transition={{ duration: 0.4, ease: EASE, delay: delay + 1.1 }}
      >
        MULTI-AGENT
      </motion.text>
      <motion.text
        x={m.left + x(72)}
        y={m.top + ih / 2 + 3}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="1"
        fill="var(--cream-muted, rgba(255,232,189,0.65))"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.4, ease: EASE, delay: delay + 1.2 }}
      >
        SINGLE-AGENT
      </motion.text>

      <text
        x={m.left + iw / 2}
        y={H - 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="1.2"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        MODEL CAPABILITY → · KIM 2025
      </text>
    </svg>
  );
}
