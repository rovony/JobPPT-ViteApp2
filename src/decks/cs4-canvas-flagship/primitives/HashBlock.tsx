// @ts-nocheck
/**
 * HashBlock — one block in the audit-chain visualization. Renders:
 *   - Block index (top-left mono badge: "blk 1", "blk 2", ...)
 *   - Action label (bold, e.g. "λ-z", "AUC", "2-cmt fit")
 *   - Tool name (mono, e.g. "DataAgent", "NCAAgent")
 *   - prev_hash + this_hash (mono, illustrative — never real SHA-256)
 *
 * State props:
 *   - `lit`     — sage glow when this block is "alive" in the chain
 *   - `mutated` — block 3 in the tamper sequence — its hash visibly mutates
 *   - `broken`  — downstream blocks (4..6) that flash amber when chain breaks
 */

import React from 'react';
import { motion } from 'framer-motion';
import { EASE_EDITORIAL, DUR } from '../themes';

interface Props {
  index: number;
  action: string;
  agent: string;
  hashShort: string;     // e.g. "0xa1f9c308" — display 4-byte
  prevShort: string;
  lit?: boolean;
  mutated?: boolean;
  broken?: boolean;
  delay?: number;
  go?: boolean;
}

export default function HashBlock({
  index,
  action,
  agent,
  hashShort,
  prevShort,
  lit = false,
  mutated = false,
  broken = false,
  delay = 0,
  go = true,
}: Props) {
  const accentColor = broken ? 'var(--alert, #E8B547)' : 'var(--case, #7BAE7F)';
  const borderColor = broken
    ? accentColor
    : (lit ? accentColor : 'color-mix(in srgb, var(--case, #7BAE7F) 40%, transparent)');

  return (
    <motion.div
      initial={go ? { opacity: 0, x: -12 } : false}
      animate={{
        opacity: 1,
        x: 0,
        boxShadow: lit || broken
          ? `0 0 0 1px ${accentColor}, 0 0 24px color-mix(in srgb, ${accentColor} 40%, transparent)`
          : 'none',
      }}
      transition={{ duration: DUR.standard, delay, ease: EASE_EDITORIAL }}
      style={{
        width: 220,
        height: 144,
        boxSizing: 'border-box',
        border: `1.5px solid ${borderColor}`,
        borderRadius: 6,
        background: 'color-mix(in srgb, var(--bg, #0D1B2A) 92%, transparent)',
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Top-left index badge */}
      <div
        style={{
          position: 'absolute',
          top: -10,
          left: 12,
          background: 'var(--bg, #0D1B2A)',
          padding: '0 8px',
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: accentColor,
        }}
      >
        blk {index}
      </div>

      {/* Action — large */}
      <div
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontWeight: 600,
          fontSize: 22,
          color: 'var(--cream, #F5F0E8)',
          marginBottom: 4,
          lineHeight: 1.1,
        }}
      >
        {action}
      </div>

      {/* Agent */}
      <div
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 11,
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 60%, transparent)',
          letterSpacing: '0.04em',
          marginBottom: 14,
        }}
      >
        {agent}
      </div>

      {/* Hashes */}
      <div
        style={{
          marginTop: 'auto',
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 10,
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 50%, transparent)',
          lineHeight: 1.5,
        }}
      >
        <div>
          prev:&nbsp;
          <span style={{ color: broken ? 'var(--alert, #E8B547)' : 'color-mix(in srgb, var(--cream, #F5F0E8) 70%, transparent)' }}>
            {prevShort}
          </span>
        </div>
        <div>
          hash:&nbsp;
          <motion.span
            key={hashShort + (mutated ? '-m' : '')}
            initial={mutated ? { color: 'var(--alert, #E8B547)' } : false}
            animate={{
              color: mutated
                ? ['var(--alert, #E8B547)', 'var(--alert, #E8B547)', accentColor]
                : (broken ? 'var(--alert, #E8B547)' : 'color-mix(in srgb, var(--cream, #F5F0E8) 80%, transparent)'),
            }}
            transition={mutated ? { duration: 1.6, times: [0, 0.6, 1] } : { duration: 0.2 }}
            style={{ fontWeight: 600 }}
          >
            {hashShort}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
