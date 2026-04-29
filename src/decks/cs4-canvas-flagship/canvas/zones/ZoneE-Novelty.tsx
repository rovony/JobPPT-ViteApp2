// @ts-nocheck
/**
 * Zone E — Camera 6 · Novelty · Adjacent systems
 *
 * 5×6 comparison matrix (5 systems including PharmAgent × 6 columns).
 * Editorial discipline:
 *   - PharmAgent row uses sage weight contrast — calibrated, not biased
 *   - "yes/no/partial/unknown" cells use color tokens consistently:
 *       yes      = sage  (var(--case))
 *       no       = cream-low-contrast (50%)
 *       partial  = amber (var(--alert))
 *       unknown  = cream-very-low-contrast (35%)
 *   - Header row is mono uppercase, modest size; data rows are sans
 *   - Row stagger fade-in (200ms each) when active
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ZONE_BOUNDS, NAMED_SYSTEM_ROWS } from '../../data';
import { EASE_EDITORIAL, DUR } from '../../themes';
import { useCanvasCamera } from '../CameraController';

const Z = ZONE_BOUNDS.E;

const COLUMNS: { key: string; label: string; align?: 'left' | 'center' }[] = [
  { key: 'system',     label: 'System',       align: 'left' },
  { key: 'org',        label: 'Org',          align: 'left' },
  { key: 'scope',      label: 'Scope',        align: 'left' },
  { key: 'agentCount', label: 'Agents',       align: 'center' },
  { key: 'sharedState',label: 'Typed shared state', align: 'center' },
  { key: 'audit',      label: 'Audit chain',  align: 'center' },
];

function YesNo({ value }: { value: 'yes' | 'no' | 'partial' | 'unknown' }) {
  const map: Record<typeof value, { label: string; color: string }> = {
    yes:     { label: 'yes',     color: 'var(--case, #7BAE7F)' },
    no:      { label: 'no',      color: 'color-mix(in srgb, var(--cream, #F5F0E8) 45%, transparent)' },
    partial: { label: 'partial', color: 'var(--alert, #E8B547)' },
    unknown: { label: '—',       color: 'color-mix(in srgb, var(--cream, #F5F0E8) 30%, transparent)' },
  };
  const v = map[value];
  return (
    <span
      style={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: 14,
        color: v.color,
        letterSpacing: '0.04em',
      }}
    >
      {v.label}
    </span>
  );
}

export default function ZoneENovelty() {
  const { cameraIndex } = useCanvasCamera();
  const reduce = useReducedMotion();
  const active = cameraIndex === 6;

  return (
    <div
      data-zone="E"
      style={{
        position: 'absolute',
        left: Z.left,
        top: Z.top,
        width: Z.width,
        height: Z.height,
        padding: '80px 100px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Eyebrow */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 1 : 0.3 }}
        transition={{ duration: DUR.standard, delay: active ? 0.1 : 0 }}
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 12,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--case, #7BAE7F)',
          marginBottom: 16,
        }}
      >
        Adjacent systems · different scope
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: active ? 1 : 0.35, y: 0 }}
        transition={{ duration: DUR.standard, delay: active ? 0.2 : 0, ease: EASE_EDITORIAL }}
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontWeight: 600,
          fontSize: 44,
          lineHeight: 1.15,
          color: 'var(--cream, #F5F0E8)',
          margin: 0,
          marginBottom: 36,
          letterSpacing: '-0.005em',
        }}
      >
        What this <span style={{ color: 'var(--case, #7BAE7F)' }}>isn&apos;t</span>.
        <span style={{ display: 'block', fontSize: 22, fontStyle: 'italic', fontWeight: 400, color: 'color-mix(in srgb, var(--cream, #F5F0E8) 70%, transparent)', marginTop: 6 }}>
          PharmAgent&apos;s scope is broader by intent — not better.
        </span>
      </motion.h2>

      {/* Matrix */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr 2.4fr 0.8fr 1.2fr 1fr',
          rowGap: 0,
          columnGap: 16,
          fontFamily: '"IBM Plex Sans", sans-serif',
        }}
      >
        {/* Header row */}
        {COLUMNS.map((c, i) => (
          <motion.div
            key={`h-${c.key}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: active ? 1 : 0.3 }}
            transition={{ duration: DUR.standard, delay: active ? 0.4 + i * 0.04 : 0 }}
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'color-mix(in srgb, var(--cream, #F5F0E8) 55%, transparent)',
              textAlign: c.align ?? 'left',
              padding: '12px 0',
              borderBottom: '1px solid color-mix(in srgb, var(--cream, #F5F0E8) 18%, transparent)',
            }}
          >
            {c.label}
          </motion.div>
        ))}

        {/* Data rows */}
        {NAMED_SYSTEM_ROWS.map((row, rowIdx) => {
          const rowDelay = active ? 0.7 + rowIdx * 0.12 : 0;
          const isPharm = !!row.isPharmAgent;
          const cellBg = isPharm
            ? 'color-mix(in srgb, var(--case, #7BAE7F) 8%, transparent)'
            : 'transparent';
          const borderBottom = rowIdx === NAMED_SYSTEM_ROWS.length - 1
            ? 'none'
            : '1px solid color-mix(in srgb, var(--cream, #F5F0E8) 8%, transparent)';

          return COLUMNS.map((c, ci) => {
            const isFirst = ci === 0;
            const isLast = ci === COLUMNS.length - 1;
            return (
              <motion.div
                key={`r${rowIdx}-${c.key}`}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: active ? 1 : 0.35, y: 0 }}
                transition={{ duration: DUR.standard, delay: rowDelay, ease: EASE_EDITORIAL }}
                style={{
                  fontSize: c.key === 'scope' ? 13 : 14,
                  fontWeight: isPharm && c.key === 'system' ? 600 : 400,
                  color: isPharm
                    ? 'var(--cream, #F5F0E8)'
                    : 'color-mix(in srgb, var(--cream, #F5F0E8) 78%, transparent)',
                  textAlign: c.align ?? 'left',
                  padding: '14px 12px',
                  background: cellBg,
                  borderBottom,
                  borderLeft: isPharm && isFirst
                    ? '2px solid var(--case, #7BAE7F)'
                    : 'none',
                  paddingLeft: isPharm && isFirst ? 16 : 12,
                  borderRadius: isPharm && (isFirst || isLast)
                    ? (isFirst ? '4px 0 0 4px' : '0 4px 4px 0')
                    : 0,
                }}
              >
                {c.key === 'system' && (
                  <>
                    {row.system}
                    {isPharm && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: 10,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--case, #7BAE7F)',
                          padding: '2px 6px',
                          border: '1px solid color-mix(in srgb, var(--case, #7BAE7F) 50%, transparent)',
                          borderRadius: 3,
                          verticalAlign: 'middle',
                        }}
                      >
                        this work
                      </span>
                    )}
                  </>
                )}
                {c.key === 'org'   && row.org}
                {c.key === 'scope' && row.scope}
                {c.key === 'agentCount' && (
                  <span style={{ fontFamily: '"IBM Plex Mono", monospace', color: isPharm ? 'var(--case, #7BAE7F)' : 'inherit' }}>
                    {row.agentCount}
                  </span>
                )}
                {c.key === 'sharedState' && <YesNo value={row.sharedState as any} />}
                {c.key === 'audit'       && <YesNo value={row.audit as any} />}
              </motion.div>
            );
          });
        })}
      </div>

      {/* Footer disclaimer */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 0.6 : 0.15 }}
        transition={{ duration: DUR.standard, delay: active ? 1.6 : 0 }}
        style={{
          marginTop: 24,
          fontFamily: '"Source Serif Pro", serif',
          fontStyle: 'italic',
          fontSize: 14,
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 65%, transparent)',
          maxWidth: '64ch',
        }}
      >
        These systems all do something different. None is wrong. The
        contribution here is that 13 agents, typed shared state, and
        cryptographic audit compose into a coherent end-to-end workflow.
      </motion.div>
    </div>
  );
}
