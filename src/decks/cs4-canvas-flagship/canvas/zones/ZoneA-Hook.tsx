// @ts-nocheck
/**
 * Zone A — Camera 2 · Hook · Integration-layer pain
 *
 * Layout (per build-brief storyboard, 1920×1080 inside ZONE_BOUNDS.A):
 *
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ ┌─NONMEM─┐                              ┌─PsN─┐              │
 *   │ │        │     dashed sage line         │     │              │
 *   │ └────────┘     (broken, not solid)      └─────┘              │
 *   │                                                              │
 *   │ ┌─R─┐               [analyst]                ┌─Excel─┐       │
 *   │ │   │              (rose silhouette)         │       │       │
 *   │ └───┘                                        └───────┘       │
 *   │                                                              │
 *   │ ┌─Python─┐                              ┌─NCA─┐              │
 *   │ │        │                              │     │              │
 *   │ └────────┘                              └─────┘              │
 *   │                                                              │
 *   │  Top headline: Today, the pharmacometrician                  │
 *   │  IS the integration layer.                                   │
 *   │                                                              │
 *   │  Bottom mono caption: 4–8 weeks per analysis · most spent on │
 *   │  integration, not science · audit trail crosses 5–10 formats │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * The Analyst silhouette carries layoutId="cs4-analyst" — it stays
 * in the DOM here permanently; when the camera moves to C5/C9/C10 it
 * physically morphs into its new size+position.
 *
 * Editorial notes:
 *   • Tools at 70% opacity per brief — they're not the subject
 *   • Dashed sage lines suggest broken automation, not working flows
 *   • Headline "IS" is sage to anchor the metaphor
 *   • Total spoken time: 90s, fade-in completes by 0:02
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ZONE_BOUNDS, HOOK_TOOLS, HOOK_ANALYST_POS } from '../../data';
import { EASE_EDITORIAL, DUR } from '../../themes';
import AnalystIcon from '../../primitives/AnalystIcon';
import ToolWindow from '../../primitives/ToolWindow';
import { useCanvasCamera } from '../CameraController';

const Z = ZONE_BOUNDS.A;

export default function ZoneAHook() {
  const reduce = useReducedMotion();
  const { cameraIndex } = useCanvasCamera();
  // The analyst (cs4-analyst layoutId) lives here from C1..C4. At C5
  // it morphs into Zone D's tier-1 position. Conditional render so
  // exactly one instance with this layoutId is mounted at a time.
  const showAnalystHere = cameraIndex <= 4;

  return (
    <div
      data-zone="A"
      style={{
        position: 'absolute',
        left: Z.left,
        top: Z.top,
        width: Z.width,
        height: Z.height,
        // Off-camera optimization: paint only when intersecting
      }}
    >
      {/* Six tool windows scattered around the analyst */}
      {HOOK_TOOLS.map((t, i) => (
        <ToolWindow
          key={t.label}
          label={t.label}
          x={t.x}
          y={t.y}
          index={i}
        />
      ))}

      {/* Broken dashed sage lines suggesting failed automation.
          Drawn in SVG so we can stroke-dash exactly. Pointer-events
          none so they don't block keyboard focus. */}
      <svg
        aria-hidden
        width={Z.width}
        height={Z.height}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Lines connecting the tool corners — but each line BREAKS
            (gap in the middle) suggesting the connection doesn't
            actually work. Stroke pattern is dash + gap + dash. */}
        {[
          // NONMEM (210, 176) ↔ analyst center (960, 540)
          { x1: 210, y1: 176, x2: 960, y2: 540 },
          // PsN (1480, 176) ↔ analyst
          { x1: 1480, y1: 176, x2: 960, y2: 540 },
          // R (170, 506) ↔ analyst
          { x1: 170, y1: 506, x2: 960, y2: 540 },
          // Excel (1520, 506) ↔ analyst
          { x1: 1520, y1: 506, x2: 960, y2: 540 },
          // Python (310, 836) ↔ analyst
          { x1: 310, y1: 836, x2: 960, y2: 540 },
          // NCA (1380, 836) ↔ analyst
          { x1: 1380, y1: 836, x2: 960, y2: 540 },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="var(--case, #7BAE7F)"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeDasharray="6 8 6 80 6 8 6"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{
              duration: reduce ? 0 : 0.9,
              delay: reduce ? 0 : 1.4 + i * 0.12,
              ease: EASE_EDITORIAL,
            }}
          />
        ))}
      </svg>

      {/* Analyst silhouette — center. layoutId="cs4-analyst".
          Mounted at C1..C4; hidden at C5+ so Zone D's tier-1 analyst
          becomes the canonical instance and Framer Motion morphs. */}
      {showAnalystHere && (
        <div
          style={{
            position: 'absolute',
            left: HOOK_ANALYST_POS.x - 110,
            top: HOOK_ANALYST_POS.y - 110,
            width: 220,
            height: 220,
          }}
        >
          <AnalystIcon variant="silhouette" size={220} opacity={0.7} />
        </div>
      )}

      {/* Headline — top of zone */}
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : DUR.standard, ease: EASE_EDITORIAL, delay: 0.2 }}
        style={{
          position: 'absolute',
          left: 80,
          top: -150, // headline floats slightly above the zone box
          width: Z.width - 160,
          fontFamily: '"Source Serif Pro", serif',
          fontWeight: 600,
          fontSize: 56,
          lineHeight: 1.15,
          color: 'var(--cream, #F5F0E8)',
          margin: 0,
          letterSpacing: '-0.005em',
        }}
      >
        Today, the pharmacometrician{' '}
        <span style={{ color: 'var(--case, #7BAE7F)' }}>IS</span>{' '}
        the integration layer.
      </motion.h2>

      {/* Bottom mono caption */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : DUR.standard, ease: EASE_EDITORIAL, delay: 2.4 }}
        style={{
          position: 'absolute',
          left: 80,
          bottom: -110, // caption floats slightly below the zone box
          width: Z.width - 160,
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 16,
          letterSpacing: '0.04em',
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 70%, transparent)',
          lineHeight: 1.7,
        }}
      >
        4–8 weeks per analysis · most spent on integration, not science<br />
        audit trail crosses 5–10 file formats · decisions delayed by integration friction
      </motion.div>
    </div>
  );
}
