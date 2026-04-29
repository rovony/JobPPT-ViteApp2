// @ts-nocheck
/**
 * CanvasStage — the 8000×4500 logical canvas.
 *
 * Renders all 9 zones as ABSOLUTELY POSITIONED children (using the
 * coordinates from ZONE_BOUNDS in data.ts). The outer motion.div has
 * its `animate` prop driven by useActiveCameraPosition() so the
 * camera transform interpolates smoothly between the 10 positions
 * (1200–1800ms standard, 4500ms for the finale stage 1 zoom-out).
 *
 * Performance — off-camera zones get content-visibility:auto +
 * contain:paint layout via CSS. The browser skips painting them
 * unless they intersect the visible viewport (or, in our case,
 * the visible viewport AFTER the camera transform).
 *
 * IMPORTANT: zones are NEVER conditionally mounted. Conditional
 * mounting would break Framer Motion layoutId morphs (an element
 * sharing layoutId across two zones must be in the DOM at all times
 * for the morph math to be measurable).
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  CANVAS_W,
  CANVAS_H,
  CAMERA_DEFAULTS,
} from '../themes';
import { useActiveCameraPosition } from './CameraController';

import ZoneAHook         from './zones/ZoneA-Hook';
import ZoneBWhyNow       from './zones/ZoneB-WhyNow';
import ZoneCWhatIsAgent  from './zones/ZoneC-WhatIsAgent';
import ZoneDArchitecture from './zones/ZoneD-Architecture';
import ZoneENovelty      from './zones/ZoneE-Novelty';
import ZoneFPrivacy      from './zones/ZoneF-Privacy';
import ZoneGAuditChain   from './zones/ZoneG-AuditChain';
import ZoneHWorkflow     from './zones/ZoneH-WorkflowOverlay';
import ZoneIFuture2034   from './zones/ZoneI-Future2034';
import TitleCard         from './zones/TitleCard';

export default function CanvasStage() {
  const cam = useActiveCameraPosition();

  return (
    <motion.div
      // The whole 8000×4500 plane. Zones live as absolute children.
      data-canvas-stage="true"
      animate={{
        x: cam.x,
        y: cam.y,
        scale: cam.scale,
      }}
      transition={{
        duration: cam.duration ?? CAMERA_DEFAULTS.duration,
        ease: CAMERA_DEFAULTS.ease as any,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: CANVAS_W,
        height: CANVAS_H,
        // Origin top-left so the (x, y) transform reads as "translate
        // the stage so this point lands at viewport (0, 0)".
        transformOrigin: '0 0',
        // No background here — the viewport's background is the deep
        // navy `var(--bg)`. The stage is a transparent positioning
        // surface for the zones.
        willChange: 'transform',
      }}
    >
      {/* Title card — the "TITLE" zone — only visible at C1 by virtue
          of where the camera is framed; rendered always. */}
      <TitleCard />

      {/* The 9 content zones. Each handles its own absolute positioning
          via the ZONE_BOUNDS lookup in data.ts. */}
      <ZoneAHook />
      <ZoneBWhyNow />
      <ZoneCWhatIsAgent />
      <ZoneDArchitecture />
      <ZoneENovelty />
      <ZoneFPrivacy />
      <ZoneGAuditChain />
      <ZoneHWorkflow />
      <ZoneIFuture2034 />
    </motion.div>
  );
}
