import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * AnalysisPlot — shared-element wrapper for the CS1 analysis slides
 * (10 · Model Fit / pcVPC · 11 · Exposure Match · 12 · E-R).
 *
 * Purpose:
 *   A single `layoutId` wraps each slide's chart so framer-motion's
 *   FLIP engine morphs the frame between slides — position, size,
 *   and bounding box all animate continuously. Inside the frame,
 *   AnimatePresence keyed on `variant` crossfades the chart content
 *   so the chart itself reads as "the same entity evolving" across
 *   the 10→11→12 sequence — the technical audience catches this beat.
 *
 * Usage:
 *   <AnalysisPlot variant="pcvpc"><PcVpcChart ... /></AnalysisPlot>
 *
 *   On slide 11:
 *   <AnalysisPlot variant="exposure-match"><AucPanel ... /></AnalysisPlot>
 *
 *   On slide 12:
 *   <AnalysisPlot variant="exposure-response"><BoxPanel ... /></AnalysisPlot>
 *
 *   The children are the slide's existing chart component — the
 *   wrapper does not opine on chart internals. It only handles the
 *   cross-slide morph and the crossfade-on-variant-change inside.
 *
 * Props:
 *   variant     — "pcvpc" | "exposure-match" | "exposure-response"
 *                 Drives the AnimatePresence key; required so content
 *                 crossfades when navigating between variants.
 *   children    — the actual chart JSX
 *   layoutId    — overridable; defaults to "analysis-plot"
 *   className   — optional; merged onto the outer motion.div
 *   style       — optional; merged onto the outer motion.div
 *
 * Motion gates:
 *   useReducedMotionPref() — when reduced motion is active, the
 *   wrapper drops layoutId and renders children without morph.
 *   No flight, no crossfade — matches OS preference.
 */

// 1s cubic-bezier — matches the lung morph timing so the deck has
// one consistent "camera pullback" speed for all shared-element beats.
const LAYOUT_TRANSITION = { duration: 1.0, ease: [0.4, 0, 0.2, 1] };
const CONTENT_FADE = { duration: 0.45, ease: [0.2, 0.7, 0.3, 1] };

export default function AnalysisPlot({
  variant,
  children,
  layoutId = 'analysis-plot',
  className,
  style,
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} style={{ width: '100%', height: '100%', ...style }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: LAYOUT_TRANSITION }}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        ...style,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={variant}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={CONTENT_FADE}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            inset: 0,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
