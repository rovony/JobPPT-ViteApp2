// @ts-nocheck
/**
 * Zone C — Camera 4 · What an agent is — and isn't
 *
 * Two-column layout inside 1920×1080:
 *
 *   ┌─────── IS ───────┐    ┌─────── ISN'T ──────┐
 *   │  ┌──────┐        │    │                    │
 *   │  │ LLM  │ <-tool │    │  ╱̶L̶L̶M̶ ̶d̶o̶e̶s̶̶̶̶̶ ̶t̶h̶e̶̶̶̶̶ ̶m̶a̶t̶h̶│
 *   │  └──────┘  call  │    │  ̶i̶t̶s̶e̶l̶f̶                │
 *   │   tool: NONMEM   │    │                    │
 *   │   tool: scipy    │    │   We do not, anywhere│
 *   │   tool: R/PsN    │    │   in this system,    │
 *   │                  │    │   ask an LLM to      │
 *   │   ↓ observes      │    │   numerically       │
 *   │   ↓ output        │    │   integrate an ODE  │
 *   └──────────────────┘    └────────────────────┘
 *
 * The LLM badge in the LEFT panel is the morph anchor — it carries
 * layoutId="cs4-llm-badge" and physically becomes the L0 Supervisor
 * node when the camera advances to C5. The badge is rendered ONLY
 * when the camera is at C4 (or earlier in transition); at C5+ it's
 * not in the DOM, which lets Framer Motion auto-animate the
 * shared-element transition into Zone D's L0 Supervisor.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ZONE_BOUNDS } from '../../data';
import { EASE_EDITORIAL, DUR } from '../../themes';
import LLMBadge from '../../primitives/LLMBadge';
import { useCanvasCamera } from '../CameraController';

const Z = ZONE_BOUNDS.C;

const TOOL_CALLS = ['NONMEM', 'scipy', 'R / PsN'];

export default function ZoneCWhatIsAgent() {
  const { cameraIndex } = useCanvasCamera();
  const reduce = useReducedMotion();
  const active = cameraIndex === 4;

  // The LLM badge is the morph source for cs4-llm-badge → L0 (Zone D).
  // Render it only while at C4; at C5+ Zone D's L0 Supervisor is the
  // single instance with this layoutId, and Framer Motion morphs.
  const showBadge = cameraIndex <= 4;

  return (
    <div
      data-zone="C"
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
      {/* Headline */}
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: active ? 1 : 0.35, y: 0 }}
        transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: active ? 0.2 : 0 }}
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontWeight: 600,
          fontSize: 56,
          lineHeight: 1.1,
          color: 'var(--cream, #F5F0E8)',
          margin: 0,
          marginBottom: 56,
          letterSpacing: '-0.005em',
        }}
      >
        What an agent <span style={{ color: 'var(--case, #7BAE7F)' }}>is</span>
        {' '}— and isn&apos;t.
      </motion.h2>

      {/* Two-column comparison */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          flex: 1,
        }}
      >
        {/* LEFT — IS */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: active ? 1 : 0.3, x: 0 }}
          transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: active ? 0.5 : 0 }}
          style={{
            border: '1px solid color-mix(in srgb, var(--case, #7BAE7F) 35%, transparent)',
            borderRadius: 6,
            padding: '32px 36px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--case, #7BAE7F)',
              marginBottom: 24,
            }}
          >
            IS · LLM that calls validated tools
          </div>

          {/* The LLM badge — morph anchor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 32 }}>
            <div style={{ width: 96, height: 96, position: 'relative' }}>
              {showBadge && <LLMBadge variant="badge" />}
            </div>

            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 13,
                letterSpacing: '0.06em',
                color: 'color-mix(in srgb, var(--cream, #F5F0E8) 75%, transparent)',
                lineHeight: 1.7,
              }}
            >
              ↳ tool_call(name, args)<br />
              ↳ observe(output)<br />
              ↳ next step
            </div>
          </div>

          {/* Tool list */}
          <div
            style={{
              borderTop: '1px solid color-mix(in srgb, var(--cream, #F5F0E8) 10%, transparent)',
              paddingTop: 20,
            }}
          >
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'color-mix(in srgb, var(--cream, #F5F0E8) 50%, transparent)',
                marginBottom: 12,
              }}
            >
              Validated tools (151 total)
            </div>
            {TOOL_CALLS.map((t, i) => (
              <motion.div
                key={t}
                initial={reduce ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: active ? 1 : 0.4, x: 0 }}
                transition={{ duration: DUR.quick, ease: EASE_EDITORIAL, delay: active ? 0.9 + i * 0.12 : 0 }}
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: 16,
                  color: 'var(--cream, #F5F0E8)',
                  padding: '8px 0',
                  borderBottom: i === TOOL_CALLS.length - 1 ? 'none' : '1px solid color-mix(in srgb, var(--cream, #F5F0E8) 6%, transparent)',
                }}
              >
                {t}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — ISN'T */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: active ? 1 : 0.3, x: 0 }}
          transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: active ? 0.7 : 0 }}
          style={{
            border: '1px solid color-mix(in srgb, var(--cream, #F5F0E8) 18%, transparent)',
            borderRadius: 6,
            padding: '32px 36px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'color-mix(in srgb, var(--cream, #F5F0E8) 55%, transparent)',
              marginBottom: 24,
            }}
          >
            ISN&apos;T · LLM that does the math itself
          </div>

          {/* Strikethrough phrase */}
          <div
            style={{
              fontFamily: '"Source Serif Pro", serif',
              fontSize: 32,
              lineHeight: 1.3,
              color: 'color-mix(in srgb, var(--cream, #F5F0E8) 50%, transparent)',
              textDecoration: 'line-through',
              textDecorationColor: 'var(--alert, #E8B547)',
              textDecorationThickness: '2px',
              marginBottom: 32,
              fontStyle: 'italic',
            }}
          >
            LLM that numerically integrates an ODE
          </div>

          <div
            style={{
              fontFamily: '"Source Serif Pro", serif',
              fontSize: 22,
              lineHeight: 1.5,
              color: 'color-mix(in srgb, var(--cream, #F5F0E8) 78%, transparent)',
              marginBottom: 'auto',
            }}
          >
            We do not, anywhere in this system, ask a language model to
            numerically integrate an ODE or fit a covariate model.
          </div>

          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid color-mix(in srgb, var(--cream, #F5F0E8) 10%, transparent)',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 11,
              letterSpacing: '0.06em',
              color: 'color-mix(in srgb, var(--case, #7BAE7F) 70%, transparent)',
              fontStyle: 'normal',
            }}
          >
            ↳ this boundary is what makes validation scope tractable
          </div>
        </motion.div>
      </div>
    </div>
  );
}
