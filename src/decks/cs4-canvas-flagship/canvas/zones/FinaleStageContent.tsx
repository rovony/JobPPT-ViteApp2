// @ts-nocheck
/**
 * FinaleStageContent — renders the per-stage overlays for Camera 10's
 * 4-stage finale that DON'T fit in any other zone.
 *
 *   Stage 1 (whole-canvas zoom-out, scale 0.5):
 *     No extra content — the camera reveals everything that's
 *     already on the canvas.
 *
 *   Stage 2 (further zoom-out, scale 0.3, "named systems appear"):
 *     Four small labels at the canvas corners showing the named
 *     comparison systems (Apollo-AI, QSP-Copilot, PEARL, pyDarwin).
 *     Visible only at this stage; positioned in CANVAS space so they
 *     appear at the corners of the visible 8000×4500 plane.
 *
 *   Stage 3 (rapid zoom-in onto Analyst at desk, scale 1.5):
 *     "At-desk" Analyst silhouette positioned in the close-up frame
 *     (inside Zone A's coordinate space, where the Analyst was at C2).
 *     Carries layoutId="cs4-analyst" so the morph from Zone D's
 *     tier-1 position is continuous.
 *
 *   Stage 4 (regulator scene): handled by Zone I.
 *
 * Sits as a sibling of the other zones inside CanvasStage.
 */

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CANVAS_W, CANVAS_H, EASE_EDITORIAL, DUR } from '../../themes';
import { ZONE_BOUNDS } from '../../data';
import { useCanvasCamera } from '../CameraController';
import AnalystIcon from '../../primitives/AnalystIcon';

const NAMED_SYSTEMS = [
  { name: 'Apollo-AI',   org: 'Pfizer',  scope: 'PK summary + report drafting',     corner: 'tl' },
  { name: 'QSP-Copilot', org: 'Saini',   scope: 'QSP model exploration',             corner: 'tr' },
  { name: 'PEARL',       org: 'Buffalo', scope: 'PopPK pipeline orchestration',      corner: 'bl' },
  { name: 'pyDarwin',    org: 'Open',    scope: 'Model selection search',            corner: 'br' },
];

function cornerStyle(corner: string): React.CSSProperties {
  const base = { position: 'absolute' as const };
  const margin = 240;
  switch (corner) {
    case 'tl': return { ...base, left: margin, top: margin };
    case 'tr': return { ...base, right: margin, top: margin };
    case 'bl': return { ...base, left: margin, bottom: margin };
    case 'br': return { ...base, right: margin, bottom: margin };
  }
  return base;
}

export default function FinaleStageContent() {
  const { cameraIndex, finaleStage } = useCanvasCamera();
  const reduce = useReducedMotion();

  if (cameraIndex !== 10) return null;

  return (
    <div
      data-zone="FINALE-OVERLAY"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: CANVAS_W,
        height: CANVAS_H,
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      {/* ── Stage 2: named system labels at canvas corners ─────────── */}
      <AnimatePresence>
        {finaleStage === 2 && NAMED_SYSTEMS.map((sys) => (
          <motion.div
            key={`named-${sys.name}`}
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.3 } }}
            transition={{ duration: DUR.slow, ease: EASE_EDITORIAL, delay: 0.4 }}
            style={{
              ...cornerStyle(sys.corner),
              padding: '40px 56px',
              border: '2px solid color-mix(in srgb, var(--cream, #F5F0E8) 35%, transparent)',
              borderRadius: 12,
              background: 'color-mix(in srgb, var(--bg, #0D1B2A) 70%, transparent)',
              backdropFilter: 'blur(20px)',
              minWidth: 420,
              maxWidth: 540,
            }}
          >
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 18,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'color-mix(in srgb, var(--cream, #F5F0E8) 55%, transparent)',
                marginBottom: 8,
              }}
            >
              {sys.org}
            </div>
            <div
              style={{
                fontFamily: '"Source Serif Pro", serif',
                fontWeight: 600,
                fontSize: 56,
                lineHeight: 1.1,
                color: 'var(--cream, #F5F0E8)',
                marginBottom: 12,
              }}
            >
              {sys.name}
            </div>
            <div
              style={{
                fontFamily: '"Source Serif Pro", serif',
                fontStyle: 'italic',
                fontSize: 22,
                color: 'color-mix(in srgb, var(--cream, #F5F0E8) 70%, transparent)',
              }}
            >
              {sys.scope}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Stage 2 center caption — "different scope. not better." */}
      <AnimatePresence>
        {finaleStage === 2 && (
          <motion.div
            key="stage2-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.slow, delay: 1.4, ease: EASE_EDITORIAL }}
            style={{
              position: 'absolute',
              left: CANVAS_W / 2 - 600,
              top: CANVAS_H / 2 - 60,
              width: 1200,
              textAlign: 'center',
              fontFamily: '"Source Serif Pro", serif',
              fontStyle: 'italic',
              fontSize: 64,
              color: 'var(--case, #7BAE7F)',
            }}
          >
            different scope · not better
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stage 3: Analyst at-desk in close-up ────────────────────── */}
      <AnimatePresence>
        {finaleStage === 3 && (
          <motion.div
            key="finale-analyst-at-desk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: DUR.standard, ease: EASE_EDITORIAL }}
            style={{
              position: 'absolute',
              // Position inside Zone A's coordinate space — matches the
              // close-up frame in CAMERA_FINALE_STAGES stage 3 spec.
              left: ZONE_BOUNDS.A.left + 700,
              top: ZONE_BOUNDS.A.top + 400,
              width: 220,
              height: 220,
            }}
          >
            <AnalystIcon variant="at-desk" size={220} opacity={0.95} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3 caption */}
      <AnimatePresence>
        {finaleStage === 3 && (
          <motion.div
            key="stage3-caption"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.standard, delay: 0.5, ease: EASE_EDITORIAL }}
            style={{
              position: 'absolute',
              left: ZONE_BOUNDS.A.left + 200,
              top: ZONE_BOUNDS.A.top + 690,
              width: 1200,
              textAlign: 'center',
              fontFamily: '"Source Serif Pro", serif',
              fontStyle: 'italic',
              fontSize: 22,
              color: 'color-mix(in srgb, var(--cream, #F5F0E8) 78%, transparent)',
            }}
          >
            The Analyst still owns the decision.
            <br />
            The architecture supports her — doesn&apos;t replace her.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
