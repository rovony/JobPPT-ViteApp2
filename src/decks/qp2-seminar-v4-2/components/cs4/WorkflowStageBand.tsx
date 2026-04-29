// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * WorkflowStageBand — editorial 7-segment workflow band.
 *
 * Visualizes the canonical MIDD pipeline stages:
 *   Data → NCA → PopPK → PKPD → ER → QC → Reporting
 *
 * Two usage modes (controlled by the caller, not by this component):
 *   • cs4-05  — render 5 instances STACKED vertically, one per published
 *               system, each with a partial `coverage: boolean[7]`. The
 *               system name renders to the left as an editorial label.
 *               Pass `compact` to shrink heights for the stack.
 *   • cs4-07  — render ONE large instance with `coverage` all true. The
 *               segments fill amber left-to-right (animated stagger).
 *
 * Props:
 *   coverage         — boolean[7]  (defaults to all-true)
 *   label            — optional left-side system label
 *   compact          — shrinks segment + label sizes
 *   showStageLabels  — render the 7 stage names above the band (true on
 *                      the FIRST stacked instance and on cs4-07; false on
 *                      subsequent stacked rows where the labels would
 *                      duplicate)
 *   go               — animation gate
 *   delay            — base reveal delay
 */

const EASE = [0.2, 0.7, 0.3, 1];

export const WORKFLOW_STAGES = ['Data', 'NCA', 'PopPK', 'PKPD', 'ER', 'QC', 'Reporting'];

export default function WorkflowStageBand({
  coverage,
  label,
  compact = false,
  showStageLabels = true,
  showLabelStrip = true,
  go = true,
  delay = 0.4,
}) {
  const reduce = useReducedMotion();
  const N = WORKFLOW_STAGES.length;
  const cov = coverage && coverage.length === N ? coverage : Array(N).fill(true);

  const W = 720;
  const H = compact ? 54 : 92;
  const m = {
    top: showStageLabels ? 18 : 4,
    right: 6,
    bottom: 4,
    left: showLabelStrip ? 138 : 6,
  };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;
  const segW = iw / N;
  const gap = 2;

  const filled = cov.filter(Boolean).length;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      aria-label={label ? `${label} — workflow coverage` : 'Workflow stage band'}
    >
      {/* Left label strip */}
      {showLabelStrip && (
        <g>
          {label && (
            <motion.text
              x={m.left - 12}
              y={m.top + ih / 2 + 3}
              textAnchor="end"
              fontFamily="var(--font-mono)"
              fontSize={compact ? 11 : 13}
              letterSpacing={compact ? 1 : 1.4}
              fill="var(--cream, #f5e6cc)"
              fontWeight={700}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay }}
            >
              {label}
            </motion.text>
          )}
          {label && (
            <motion.text
              x={m.left - 12}
              y={m.top + ih / 2 + 3 + (compact ? 14 : 16)}
              textAnchor="end"
              fontFamily="var(--font-mono)"
              fontSize={compact ? 9 : 10}
              letterSpacing="1.2"
              fill="var(--cream-faint, rgba(255,232,189,0.45))"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: delay + 0.1 }}
            >
              {filled} / {N} stages
            </motion.text>
          )}
        </g>
      )}

      {/* Stage labels (top) */}
      {showStageLabels &&
        WORKFLOW_STAGES.map((s, i) => (
          <motion.text
            key={`stg${i}`}
            x={m.left + i * segW + segW / 2}
            y={m.top - 6}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize={10}
            letterSpacing="1"
            fill="var(--cream-faint, rgba(255,232,189,0.45))"
            fontWeight={700}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: delay + i * 0.04 }}
          >
            {s.toUpperCase()}
          </motion.text>
        ))}

      {/* 7 segments */}
      {WORKFLOW_STAGES.map((_, i) => {
        const x0 = m.left + i * segW + gap / 2;
        const w = segW - gap;
        const isFilled = cov[i];
        return (
          <g key={`seg${i}`}>
            {/* Segment frame (always rendered, hairline). */}
            <rect
              x={x0}
              y={m.top}
              width={w}
              height={ih}
              fill="var(--cream-hairline, rgba(255,232,189,0.10))"
              fillOpacity={0.4}
              stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
              strokeWidth={0.7}
            />
            {/* Filled overlay — animates left-to-right per segment. */}
            {isFilled && (
              <motion.rect
                x={x0}
                y={m.top}
                width={w}
                height={ih}
                fill="var(--amber, #d4a373)"
                initial={reduce ? false : { width: 0 }}
                animate={{ width: w }}
                transition={{ duration: 0.5, ease: EASE, delay: delay + 0.3 + i * 0.08 }}
              />
            )}
            {/* Stage tick at center of segment. */}
            <line
              x1={x0 + w / 2}
              x2={x0 + w / 2}
              y1={m.top + ih + 1}
              y2={m.top + ih + 4}
              stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
              strokeWidth={0.8}
            />
          </g>
        );
      })}

      {/* Bottom hairline baseline */}
      <line
        x1={m.left}
        x2={m.left + iw}
        y1={m.top + ih}
        y2={m.top + ih}
        stroke="var(--cream-hairline, rgba(255,232,189,0.22))"
        strokeWidth={1}
      />
    </svg>
  );
}
