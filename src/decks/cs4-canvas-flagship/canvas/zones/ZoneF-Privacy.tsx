// @ts-nocheck
/**
 * Zone F — Camera 7 · Privacy by architecture · CINEMATIC 2
 *
 * Three-column composition inside 1920×1080:
 *
 *   ┌────── PATIENT DATA ──────┐ │ ┌──── METADATA ────┐
 *   │ SUBJID │ TIME │ DV │ AMT │ │ │ n_subjects: 247  │
 *   │ PT-001 │  0.5 │ 12 │  10 │ │ │ n_observations:  │
 *   │ PT-002 │  1.0 │ 15 │  10 │ │ │ blq_rate: 8.3%   │
 *   │ ...                       │ │ │ dose_levels: ... │
 *   │ 247 subjects · LOCAL ONLY │ │ │ units: mg, ng/mL │
 *   └───────────────────────────┘ │ │ schema_hash:     │
 *                                 │ │   0x7c3a91f2     │
 *                                 │ └──────────────────┘
 *                          (sage dashed boundary)
 *
 * Cinematic 2 (Framer Motion — no GSAP needed):
 *   0.0–0.5s: camera arrives
 *   0.5–1.1s: data rows fade in at 30%
 *   1.1–1.5s: vertical dashed boundary draws on
 *   1.5–2.5s: sage particle launches from left, moves right
 *   2.5–2.9s: particle decelerates as it approaches boundary
 *   2.9–3.1s: particle DISSOLVES at the boundary (key moment)
 *   3.1–3.5s: 6 metadata fields fade in (80ms stagger)
 *   3.5–3.9s: subtle sage glow on right column
 *
 * Editorial restraint: no celebration glow on dissolve, no sound
 * effect, no shimmer. The visceral motion IS the message.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ZONE_BOUNDS, SCHEMA_BOUNDARY } from '../../data';
import { EASE_EDITORIAL, EASE_DATA, DUR } from '../../themes';
import { useCanvasCamera } from '../CameraController';

const Z = ZONE_BOUNDS.F;

// Boundary X (in zone coords, where the dashed line sits)
const BOUNDARY_X = 1100;
const PARTICLE_START_X = 320;
const PARTICLE_END_X = BOUNDARY_X - 8;  // dissolves just before crossing

export default function ZoneFPrivacy() {
  const { cameraIndex } = useCanvasCamera();
  const reduce = useReducedMotion();
  const active = cameraIndex === 7;

  const meta = SCHEMA_BOUNDARY.outsideMetadata;

  return (
    <div
      data-zone="F"
      style={{
        position: 'absolute',
        left: Z.left,
        top: Z.top,
        width: Z.width,
        height: Z.height,
        padding: '60px 80px',
      }}
    >
      {/* Eyebrow */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 1 : 0.25 }}
        transition={{ duration: DUR.standard, delay: active ? 0.1 : 0 }}
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 12,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--case, #7BAE7F)',
          marginBottom: 8,
        }}
      >
        Privacy by architecture, not by policy
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: active ? 1 : 0.3, y: 0 }}
        transition={{ duration: DUR.standard, delay: active ? 0.2 : 0, ease: EASE_EDITORIAL }}
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontWeight: 600,
          fontSize: 36,
          lineHeight: 1.2,
          color: 'var(--cream, #F5F0E8)',
          margin: 0,
          marginBottom: 28,
        }}
      >
        Patient rows physically cannot cross the SchemaExtractor boundary.
      </motion.h2>

      {/* SVG — boundary, particle, columns */}
      <svg
        aria-hidden
        width={Z.width - 160}
        height={620}
        style={{ overflow: 'visible' }}
      >
        {/* Boundary dashed line */}
        <motion.line
          x1={BOUNDARY_X}
          y1={20}
          x2={BOUNDARY_X}
          y2={580}
          stroke="var(--case, #7BAE7F)"
          strokeWidth="2"
          strokeDasharray="8 8"
          opacity="0.85"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: active ? 0.85 : 0.3 }}
          transition={{ duration: 0.6, delay: active ? 1.1 : 0, ease: EASE_EDITORIAL }}
        />

        {/* Boundary label */}
        <motion.text
          x={BOUNDARY_X - 8}
          y={12}
          fontSize="11"
          fontFamily='"IBM Plex Mono", monospace'
          fill="var(--case, #7BAE7F)"
          textAnchor="end"
          letterSpacing="0.18em"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: active ? 0.9 : 0.3 }}
          transition={{ duration: DUR.standard, delay: active ? 1.6 : 0 }}
        >
          SCHEMA EXTRACTOR
        </motion.text>

        {/* Particle — launches, decelerates, dissolves */}
        <motion.circle
          r="6"
          fill="var(--case, #7BAE7F)"
          initial={reduce ? false : { cx: PARTICLE_START_X, cy: 240, opacity: 0 }}
          animate={
            active
              ? {
                  cx: [PARTICLE_START_X, PARTICLE_END_X - 200, PARTICLE_END_X, PARTICLE_END_X],
                  cy: [240, 240, 240, 240],
                  opacity: [0, 1, 1, 0],
                  r: [6, 8, 5, 1],
                }
              : { opacity: 0 }
          }
          transition={
            active
              ? {
                  duration: 1.6,
                  delay: 1.5,
                  times: [0, 0.6, 0.85, 1],
                  ease: 'easeOut',
                }
              : { duration: 0.2 }
          }
        />

        {/* Trail glow — subtle, behind the particle */}
        {active && !reduce && (
          <motion.circle
            r="14"
            fill="var(--case, #7BAE7F)"
            initial={{ cx: PARTICLE_START_X, cy: 240, opacity: 0 }}
            animate={{
              cx: [PARTICLE_START_X, PARTICLE_END_X - 200, PARTICLE_END_X, PARTICLE_END_X],
              cy: [240, 240, 240, 240],
              opacity: [0, 0.18, 0.12, 0],
            }}
            transition={{
              duration: 1.6,
              delay: 1.5,
              times: [0, 0.6, 0.85, 1],
              ease: 'easeOut',
            }}
            style={{ filter: 'blur(8px)' }}
          />
        )}
      </svg>

      {/* ── LEFT panel: patient data table ────────────────────────────── */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 1 : 0.25 }}
        transition={{ duration: DUR.standard, delay: active ? 0.5 : 0 }}
        style={{
          position: 'absolute',
          left: 80,
          top: 240,
          width: 700,
          padding: '18px 22px',
          border: '1px solid color-mix(in srgb, var(--rose, #C4847A) 35%, transparent)',
          borderRadius: 6,
          background: 'color-mix(in srgb, var(--rose, #C4847A) 5%, transparent)',
        }}
      >
        <div
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--rose, #C4847A)',
            marginBottom: 10,
          }}
        >
          {SCHEMA_BOUNDARY.insideLabel}
        </div>

        {/* Table header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr 0.6fr 0.8fr 1fr',
            gap: 12,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'color-mix(in srgb, var(--cream, #F5F0E8) 50%, transparent)',
            paddingBottom: 6,
            borderBottom: '1px solid color-mix(in srgb, var(--cream, #F5F0E8) 12%, transparent)',
            marginBottom: 6,
          }}
        >
          <span>SUBJID</span>
          <span>AGE</span>
          <span>SEX</span>
          <span>DOSE</span>
          <span>CONC</span>
        </div>

        {/* Rows */}
        {SCHEMA_BOUNDARY.insideRows.map((r, i) => (
          <motion.div
            key={r.id}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: active ? 0.85 : 0.2 }}
            transition={{ duration: DUR.quick, delay: active ? 0.6 + i * 0.06 : 0 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr 0.6fr 0.8fr 1fr',
              gap: 12,
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 13,
              color: 'color-mix(in srgb, var(--cream, #F5F0E8) 80%, transparent)',
              padding: '6px 0',
              borderBottom: i === SCHEMA_BOUNDARY.insideRows.length - 1
                ? 'none'
                : '1px solid color-mix(in srgb, var(--cream, #F5F0E8) 5%, transparent)',
            }}
          >
            <span>{r.id}</span>
            <span>{r.age}</span>
            <span>{r.sex}</span>
            <span>{r.dose}</span>
            <span>{r.conc}</span>
          </motion.div>
        ))}

        <div
          style={{
            marginTop: 14,
            paddingTop: 10,
            borderTop: '1px dashed color-mix(in srgb, var(--rose, #C4847A) 35%, transparent)',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.08em',
            color: 'var(--rose, #C4847A)',
          }}
        >
          247 subjects · 4,812 observations · NEVER LEAVE LOCAL
        </div>
      </motion.div>

      {/* ── RIGHT panel: metadata fields ──────────────────────────────── */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 1 : 0.25 }}
        transition={{ duration: DUR.standard, delay: active ? 3.1 : 0 }}
        style={{
          position: 'absolute',
          left: BOUNDARY_X + 60,
          top: 240,
          width: 540,
          padding: '18px 22px',
          border: '1.5px solid color-mix(in srgb, var(--case, #7BAE7F) 55%, transparent)',
          borderRadius: 6,
          background: 'color-mix(in srgb, var(--case, #7BAE7F) 8%, transparent)',
          boxShadow: active
            ? '0 0 32px color-mix(in srgb, var(--case, #7BAE7F) 25%, transparent)'
            : 'none',
        }}
      >
        <div
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--case, #7BAE7F)',
            marginBottom: 14,
          }}
        >
          {SCHEMA_BOUNDARY.outsideLabel}
        </div>

        {/* The 6 metadata fields */}
        {[
          { k: 'n_subjects',     v: meta.nSubjects },
          { k: 'n_observations', v: meta.nObservations.toLocaleString() },
          { k: 'blq_rate',       v: meta.blqRate },
          { k: 'dose_levels',    v: `[${meta.doseLevels.join(', ')}]` },
          { k: 'units',          v: `dose=${meta.units.dose} · conc=${meta.units.conc} · time=${meta.units.time}` },
          { k: 'schema_hash',    v: meta.schemaHash },
        ].map((field, i) => (
          <motion.div
            key={field.k}
            initial={reduce ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: active ? 1 : 0.4, x: 0 }}
            transition={{ duration: DUR.quick, delay: active ? 3.2 + i * 0.08 : 0, ease: EASE_EDITORIAL }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 14,
              padding: '8px 0',
              borderBottom: i === 5 ? 'none' : '1px solid color-mix(in srgb, var(--case, #7BAE7F) 14%, transparent)',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 13,
            }}
          >
            <span style={{ color: 'color-mix(in srgb, var(--cream, #F5F0E8) 60%, transparent)' }}>
              {field.k}:
            </span>
            <span style={{ color: 'var(--cream, #F5F0E8)', fontWeight: 500 }}>
              {field.v}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer caption */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 0.7 : 0.15 }}
        transition={{ duration: DUR.standard, delay: active ? 4.0 : 0 }}
        style={{
          position: 'absolute',
          left: 80,
          bottom: 56,
          right: 80,
          fontFamily: '"Source Serif Pro", serif',
          fontStyle: 'italic',
          fontSize: 16,
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 70%, transparent)',
          textAlign: 'center',
        }}
      >
        Zero patient rows cross. The boundary is a class definition,
        not a policy. The allow-list contents are part of the manuscript.
      </motion.div>
    </div>
  );
}
