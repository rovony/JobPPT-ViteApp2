// @ts-nocheck
/**
 * CS4ContinuousCanvas — root component for the entire CS4 canvas deck.
 *
 * This is the SINGLE component the manifest registers as a slide.
 * Inside it, the entire 10-camera-position experience lives. Nothing
 * here ever unmounts — that's what makes the layoutId morphs work
 * across cameras (analyst, llm-badge, architecture nodes, audit chain
 * all stay in the DOM).
 *
 * Composition order:
 *   1. CameraController (provider) — owns camera state
 *   2. CanvasViewport (viewport-clipped wrapper)
 *      ↳ CanvasStage (the 8000×4500 plane with all zones)
 *      ↳ TracingBeamHost (right-edge progress hairline)
 *      ↳ KeyboardCameraNav (arrow / space / number-row listener)
 *      ↳ HashCameraSync (#cam-N ↔ cameraIndex)
 *      ↳ CameraNotesOverlay (N-key bottom drawer)
 *
 * Font self-host — imports the three @fontsource packages at the top
 * so they bundle once when this component first mounts. Gives the
 * canvas its scoped Source Serif Pro / IBM Plex Sans / IBM Plex Mono
 * typography without touching the global app font set.
 */

// Self-host the three Zaj-Design typefaces (scoped to this deck).
// These imports cause Vite to bundle the font CSS + woff2 files.
// Loaded once when CS4ContinuousCanvas first mounts.
import '@fontsource/source-serif-pro/600.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';

import React from 'react';
import { CameraController } from './CameraController';
import CanvasViewport from './CanvasViewport';
import KeyboardCameraNav from '../overlays/KeyboardCameraNav';
import HashCameraSync from '../overlays/HashCameraSync';
import CameraNotesOverlay from '../overlays/CameraNotesOverlay';
import TracingBeamHost from '../overlays/TracingBeamHost';

export default function CS4ContinuousCanvas() {
  return (
    <CameraController>
      <CanvasViewport>
        <TracingBeamHost />
        <CameraNotesOverlay />
        {/* Behavior-only overlays (no DOM): */}
        <KeyboardCameraNav />
        <HashCameraSync />
      </CanvasViewport>
    </CameraController>
  );
}
