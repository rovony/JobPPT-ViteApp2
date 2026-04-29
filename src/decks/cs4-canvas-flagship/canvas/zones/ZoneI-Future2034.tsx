// @ts-nocheck
/**
 * Zone I — Camera 10 stage 4 · 2034 regulator scene
 *
 * Visible only at finale stage 4 (after the camera has zoomed back
 * out from the Analyst close-up). Layout:
 *
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │                                                              │
 *   │  [regulator silhouette]                                      │
 *   │  at desk in 2034 ──── audit chain in background, all signed │
 *   │                                                              │
 *   │  ┌─ Bracket statement (4 lines, fade in line-by-line) ────┐  │
 *   │  │ 13 agents, structurally separated by data sensitivity. │  │
 *   │  │ 6-bucket typed shared state...                         │  │
 *   │  │ SHA-256 hash chain from prompt to PDF...               │  │
 *   │  │ This architecture is, to my knowledge, first of its    │  │
 *   │  │   kind in scope. Manuscript in preparation.            │  │
 *   │  └─────────────────────────────────────────────────────────┘  │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * The bracket is the closing line — what the panel takes home.
 * Each line is sage-tinted on a critical phrase.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ZONE_BOUNDS } from '../../data';
import { EASE_EDITORIAL, DUR } from '../../themes';
import { useCanvasCamera } from '../CameraController';

const Z = ZONE_BOUNDS.I;

const BRACKET_LINES = [
  {
    text: '13 agents, structurally separated by data sensitivity.',
    accent: '13 agents',
  },
  {
    text: '6-bucket typed shared state — agents read and write through types, not strings.',
    accent: '6-bucket typed shared state',
  },
  {
    text: 'SHA-256 hash chain from prompt to PDF — replayable in 2034.',
    accent: 'SHA-256 hash chain',
  },
  {
    text: 'First of its kind in scope, to my knowledge.',
    accent: 'First of its kind',
  },
  {
    text: 'Manuscript in preparation.',
    accent: 'Manuscript in preparation.',
  },
];

export default function ZoneIFuture2034() {
  const { cameraIndex, finaleStage } = useCanvasCamera();
  const reduce = useReducedMotion();

  if (cameraIndex !== 10 || finaleStage < 4) return null;

  return (
    <div
      data-zone="I"
      style={{
        position: 'absolute',
        left: Z.left,
        top: Z.top,
        width: Z.width,
        height: Z.height,
        padding: '60px 100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 4,
      }}
    >
      {/* Year badge */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.standard, ease: EASE_EDITORIAL }}
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 14,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'var(--case, #7BAE7F)',
          marginBottom: 28,
        }}
      >
        2034 · regulator opens the audit
      </motion.div>

      {/* Regulator silhouette (SVG) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DUR.slow, ease: EASE_EDITORIAL, delay: 0.2 }}
        style={{
          marginBottom: 32,
          position: 'relative',
        }}
      >
        <svg width="160" height="160" viewBox="0 0 160 160" aria-hidden>
          {/* Audit-chain mini-strip in background (signed = sage glow) */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={8 + i * 24}
              y={130}
              width={20}
              height={6}
              fill="var(--case, #7BAE7F)"
              opacity={0.55 + i * 0.05}
              rx="1"
            />
          ))}
          {/* Regulator head */}
          <circle cx="80" cy="56" r="26" fill="var(--cream, #F5F0E8)" opacity="0.85" />
          {/* Shoulders */}
          <path
            d="M 36 130 L 36 100 Q 36 70 80 70 Q 124 70 124 100 L 124 130 Z"
            fill="var(--cream, #F5F0E8)"
            opacity="0.7"
          />
          {/* Glasses (subtle) */}
          <circle cx="72" cy="56" r="6" fill="none" stroke="var(--bg, #0D1B2A)" strokeWidth="1" opacity="0.4" />
          <circle cx="88" cy="56" r="6" fill="none" stroke="var(--bg, #0D1B2A)" strokeWidth="1" opacity="0.4" />
        </svg>
      </motion.div>

      {/* Bracket statement — lines fade in line-by-line */}
      <div
        style={{
          maxWidth: '52ch',
          padding: '32px 48px',
          borderLeft: '3px solid var(--case, #7BAE7F)',
          borderRight: '3px solid var(--case, #7BAE7F)',
          background: 'color-mix(in srgb, var(--bg, #0D1B2A) 40%, transparent)',
          backdropFilter: 'blur(6px)',
        }}
      >
        {BRACKET_LINES.map((line, i) => {
          const isLast = i === BRACKET_LINES.length - 1;
          const accentParts = line.text.split(line.accent);
          return (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.standard,
                delay: 0.7 + i * 0.55,
                ease: EASE_EDITORIAL,
              }}
              style={{
                fontFamily: '"Source Serif Pro", serif',
                fontWeight: isLast ? 600 : 400,
                fontStyle: isLast ? 'normal' : 'italic',
                fontSize: isLast ? 20 : 22,
                lineHeight: 1.5,
                color: 'var(--cream, #F5F0E8)',
                marginBottom: isLast ? 0 : 18,
                textAlign: isLast ? 'right' : 'left',
              }}
            >
              {accentParts[0]}
              <span style={{ color: 'var(--case, #7BAE7F)', fontWeight: 600 }}>
                {line.accent}
              </span>
              {accentParts[1]}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
