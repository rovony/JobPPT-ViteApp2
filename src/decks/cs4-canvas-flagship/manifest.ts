// @ts-nocheck
/**
 * cs4-canvas-flagship — manifest.
 *
 * Single-slide manifest. The slide IS the entire 8000×4500 continuous
 * canvas with 10 internal camera positions. See README.md and the
 * build plan for why we collapse the 10 cameras into 1 manifest entry
 * (Option A — internal camera state preserves layoutId morphs without
 * requiring a DeckRunner refactor).
 *
 * standardLayout.enabled is FALSE so the FitStage 1920×1080 wrapper
 * does NOT clamp our canvas. CanvasViewport handles its own viewport
 * sizing via 100dvw/100dvh.
 */

import notes from './notes';
import qa from './qa';
import { DECK_META } from './data';
import CS4ContinuousCanvas from './slides/01-canvas';

const manifest = {
  id: 'cs4-canvas-flagship',
  title: 'PharmAgent · Continuous Canvas',
  subtitle: 'AI/ML in clinical pharmacology — a working architecture',
  theme: 'clinical',
  notes,
  qa,
  defaultTransition: 'fade',

  // FitStage OFF — the canvas is its own viewport-fitting system.
  // No standardLayout chrome (footer, slide-number, sage rule) — the
  // CanvasNotesOverlay + TracingBeam handle their own.
  standardLayout: {
    enabled: false,
  },

  export: {
    // Single slide; settle long enough for cinematic 1 (architecture
    // build at C5) since all 10 cameras live inside this one component.
    defaultSettleMs: 4800,
  },

  slides: [
    {
      id: 'cs4-canvas',
      title: 'PharmAgent · 10 camera positions in one canvas',
      component: CS4ContinuousCanvas,
      isTitle: false,
      transition: 'fade',
      time: 900, // 15 minutes for the whole 10-camera arc
    },
  ],
};

export default manifest;
