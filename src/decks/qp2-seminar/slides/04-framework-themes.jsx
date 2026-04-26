import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import DataflowEngine from './04-framework-themes/DataflowEngine';
import { useDataflowMotion } from './04-framework-themes/useDataflowMotion';

/**
 * Slide 04 · Framework — The Dataflow Engine
 *
 * Re-designed per senior-panel framework spec. The five themes are
 * now INPUTS that flow into a decision hub, which flows to three
 * case outcomes. Not a static taxonomy — an active engine.
 *
 * Composition:
 *   SlideGrid (chrome/eyebrow/headline/subhead) hosts the typographic
 *   header. The entire viz area is a single SVG (DataflowEngine) with
 *   a 1920×1080 authoring viewBox — all three columns + 8 Bézier
 *   connecting paths live inside one coordinate space, which is the
 *   ONLY way to guarantee curves land exactly where they should
 *   across viewport sizes (preserveAspectRatio handles the scale).
 *
 * Motion is split:
 *   · Framer-motion handles the header (eyebrow/headline/subhead) so
 *     it matches every other slide's typography entrance beat.
 *   · GSAP handles the SVG engine — timeline + MotionPath tracer
 *     dots — because SVG motion-path animation is not a native
 *     framer-motion primitive.
 *
 * Overlap-proof layout guarantees in useDataflowMotion + DataflowEngine:
 *   the bounding-box table (see ./data.js bottom) verifies zero
 *   collisions across header, dataflow band, and footer.
 */

const T = {
  eyebrow:  0.20,
  headline: 0.55,
  subhead:  2.10,
};

const EASE_OUT = [0.2, 0.7, 0.3, 1];

export default function Slide04FrameworkThemes() {
  const reduced = useReducedMotion();
  const svgRef = useRef(null);

  useDataflowMotion(svgRef, { reduced });

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={T.eyebrow}>
        Framework · Five recurring themes
      </Eyebrow>

      <Headline delay={T.headline} maxChars={34}>
        The model is the instrument;
        <br />
        the{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
          decision
        </span>{' '}
        is the product.
      </Headline>

      {/* size="lead" — the default --fs-slide-subhead token (~13-18px)
          is calibrated for tight captions; under a 1.35em headline it
          reads as microcopy. The 'lead' token (~16-24px, fluid) gives
          this orienting line proper subtitle weight without competing
          with the headline. */}
      <Subhead delay={T.subhead} maxChars={68} size="lead">
        Five themes → one judgment → three outcomes.
      </Subhead>

      {/* ─── Viz: SVG dataflow engine ─── */}
      {/* The SVG has a 1920×1080 authoring viewBox. We wrap it in a
          full-bleed container so preserveAspectRatio="xMidYMid meet"
          scales by whichever dimension is tighter (width or height)
          and the diagram fills the available viz area. */}
      <Viz>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <DataflowEngine ref={svgRef} />
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 6.6}
        kicker="Five themes · one judgment · three outcomes"
        tagline="The model is the instrument."
      />
    </SlideGrid>
  );
}

/* ──────────────────────────────────────────────────────────
   ARCHITECTURE NOTES

   Files:
     · 04-framework-themes.jsx              ← this file: slide shell
     · 04-framework-themes/data.js          ← geometry + content SoT
     · 04-framework-themes/DataflowEngine.jsx ← SVG viz
     · 04-framework-themes/useDataflowMotion.js ← GSAP hook

   Why the 3s phase-shift between converging and diverging tracer dots
   is the motion decision I'm proudest of:
     When a converging dot arrives at the hub, 3 diverging dots are
     already mid-journey to the cases. The diagram reads as a
     continuously running engine, not a pulsed one. That's the
     difference between "decision taxonomy" and "decision process" —
     which is the panel's 60-second takeaway.

   Reduced-motion behavior:
     · Header beats: framer-motion's useReducedMotion() zeros all
       x/y/scale transforms and shortens durations.
     · SVG engine: useDataflowMotion early-returns, leaving the SVG
       at its FINAL rendered state (which is our mount state).
     · Hub ring breathe: CSS @media (prefers-reduced-motion) kills
       the keyframe.

   Content verbatim verified against spec:
     · 5 themes (QP replaces study, Dose precision, Global strategy,
       Novel methods, Judgment) with descriptors ✓
     · Hub: "THE DECISION / The call, / calibrated to incomplete data" ✓
     · 3 cases (Ambrisentan, Tibsovo, Asparlas) with outcomes ✓
   ────────────────────────────────────────────────────────── */