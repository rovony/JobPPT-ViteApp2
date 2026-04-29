// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * PatientRowGlyphs — editorial spreadsheet-row visualization.
 *
 * Renders 7 patient rows as real SVG cells (subject_id, weight_kg,
 * conc_ngmL, time_h, dose_mg). Rows slide in from the left and run
 * toward the right edge where a vertical 1px amber hairline marks the
 * SchemaExtractor wall. A mask hard-cuts the rows at the wall — they
 * visibly DO NOT cross.
 *
 * On the right of the wall, an amber metadata-card emerges holding
 * ONLY the schema (column names, no values) — the structural surface
 * the LLM is allowed to see.
 *
 * Used on cs4-09 (privacy) — the headline jaw-drop visual.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const COLUMNS = ['subject_id', 'weight_kg', 'conc_ngmL', 'time_h', 'dose_mg'];

const ROWS = [
  ['S001', '78.4', '12.4',  '2.0', '5'],
  ['S002', '64.1', '8.1',   '6.0', '5'],
  ['S003', '81.7', '4.7',  '12.0', '5'],
  ['S004', '70.3', '2.3',  '18.0', '5'],
  ['S005', '92.0', '1.1',  '30.0', '5'],
  ['S006', '58.6', '14.2',  '2.0', '10'],
  ['S007', '74.9', '9.4',   '6.0', '10'],
];

export default function PatientRowGlyphs({ go = true, delay = 0.5 }) {
  const reduce = useReducedMotion();

  const W = 720;
  const H = 340;
  const m = { top: 46, right: 28, bottom: 36, left: 16 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  // Wall sits at ~62% of the inner width.
  const wallX = m.left + iw * 0.62;
  const cellH = (ih - 36) / ROWS.length;
  const localPanelX = m.left + 4;
  const localPanelW = wallX - localPanelX - 18;
  const cellW = localPanelW / COLUMNS.length;

  const metaX = wallX + 18;
  const metaW = m.left + iw - metaX - 4;

  const maskId = 'patient-rows-mask';

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-label="Patient rows blocked at SchemaExtractor wall — only schema crosses"
    >
      <defs>
        {/* Hard mask — opaque up to 96% of the local panel width then
            sharp drop to transparent at the wall, so values visibly fall
            off as they approach the boundary. */}
        <linearGradient id={maskId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" />
          <stop offset={`${((wallX - 14) / W) * 100}%`} stopColor="#fff" />
          <stop offset={`${((wallX - 4) / W) * 100}%`} stopColor="#000" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={`${maskId}-m`}>
          <rect x="0" y="0" width={W} height={H} fill={`url(#${maskId})`} />
        </mask>
      </defs>

      {/* LEFT — column header strip + rows (under mask). */}
      <g mask={`url(#${maskId}-m)`}>
        {/* Header */}
        {COLUMNS.map((c, ci) => (
          <text
            key={`h${ci}`}
            x={localPanelX + ci * cellW + cellW / 2}
            y={m.top - 12}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.8"
            fill="var(--cream-faint, rgba(255,232,189,0.45))"
            fontWeight={700}
          >
            {c}
          </text>
        ))}

        {/* Rows */}
        {ROWS.map((row, ri) => {
          const rowY = m.top + ri * cellH;
          return (
            <motion.g
              key={`r${ri}`}
              initial={reduce ? false : { opacity: 0, x: -90 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.85,
                ease: EASE,
                delay: delay + ri * 0.12,
              }}
            >
              {row.map((val, ci) => (
                <g key={`c${ri}-${ci}`}>
                  <rect
                    x={localPanelX + ci * cellW + 1}
                    y={rowY + 2}
                    width={cellW - 2}
                    height={cellH - 4}
                    fill="color-mix(in srgb, var(--cream-faint, #ffe8bd) 6%, transparent)"
                    stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
                    strokeWidth={0.6}
                  />
                  <text
                    x={localPanelX + ci * cellW + cellW / 2}
                    y={rowY + cellH / 2 + 4}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="11"
                    fill="var(--cream-muted, rgba(255,232,189,0.65))"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {val}
                  </text>
                </g>
              ))}
              {/* Trailing arrow toward the wall — demonstrates intent to
                  cross. The mask kills it before it reaches the wall. */}
              <line
                x1={localPanelX + COLUMNS.length * cellW}
                x2={wallX - 6}
                y1={rowY + cellH / 2}
                y2={rowY + cellH / 2}
                stroke="var(--cream-faint, rgba(255,232,189,0.45))"
                strokeWidth={0.6}
                strokeDasharray="2 3"
                opacity={0.5}
              />
            </motion.g>
          );
        })}
      </g>

      {/* MIDDLE — vertical amber wall (the SchemaExtractor boundary). */}
      <motion.line
        x1={wallX}
        x2={wallX}
        y1={m.top - 18}
        y2={m.top + ih + 4}
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.2}
        strokeOpacity={0.95}
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay }}
      />
      {/* Wall label badge */}
      <g transform={`translate(${wallX}, ${m.top + ih / 2}) rotate(-90)`}>
        <rect
          x={-46}
          y={-10}
          width={92}
          height={20}
          fill="var(--bg, #1a1612)"
          stroke="var(--amber, #d4a373)"
          strokeOpacity={0.75}
          strokeWidth={1}
        />
        <text
          x={0}
          y={4}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="1.6"
          fill="var(--amber, #d4a373)"
          fontWeight={800}
        >
          SCHEMAEXTRACTOR
        </text>
      </g>

      {/* RIGHT — metadata card (the only thing that crosses). */}
      <motion.g
        initial={reduce ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: delay + 1.6 }}
      >
        <rect
          x={metaX}
          y={m.top - 18}
          width={metaW}
          height={ih + 22}
          fill="color-mix(in srgb, var(--amber, #d4a373) 6%, transparent)"
          stroke="var(--amber, #d4a373)"
          strokeOpacity={0.8}
          strokeWidth={1}
        />
        <text
          x={metaX + 12}
          y={m.top - 4}
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="1.4"
          fill="var(--amber, #d4a373)"
          fontWeight={800}
        >
          ALLOWED · SCHEMA ONLY
        </text>
        {/* schema body — column names, no values */}
        <text
          x={metaX + 12}
          y={m.top + 18}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--cream, #f5e6cc)"
        >
          schema = {'{'}
        </text>
        {COLUMNS.map((c, ci) => (
          <text
            key={`mc${ci}`}
            x={metaX + 28}
            y={m.top + 38 + ci * 18}
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--cream-muted, rgba(255,232,189,0.65))"
          >
            {c}: {valueType(c)}
          </text>
        ))}
        <text
          x={metaX + 12}
          y={m.top + 38 + COLUMNS.length * 18}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--cream, #f5e6cc)"
        >
          {'}'}
        </text>
        {/* Aggregate stats — the only numbers the LLM ever sees. */}
        <text
          x={metaX + 12}
          y={m.top + 38 + COLUMNS.length * 18 + 22}
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.6"
          fill="var(--cream-faint, rgba(255,232,189,0.45))"
        >
          n=312 · doses=7 · covariates=4
        </text>
      </motion.g>

      {/* Bottom caption */}
      <text
        x={W / 2}
        y={H - 6}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="1.4"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        ROW VALUES NEVER CROSS · ONLY THE SCHEMA TRAVERSES THE BOUNDARY
      </text>
    </svg>
  );
}

function valueType(col) {
  if (col === 'subject_id') return 'string';
  if (col === 'dose_mg') return 'enum<int>';
  return 'float';
}
