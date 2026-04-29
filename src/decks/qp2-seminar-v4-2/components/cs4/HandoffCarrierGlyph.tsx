// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * HandoffCarrierGlyph — tiny pharmacometrician walking the workflow
 * strip with a clipboard.
 *
 * Replaces the dotted handoff line on cs4-03 with a literal walking
 * figure that hops between the four tools (Phoenix → Pirana → SAS → Word).
 * At each handoff (3s per hop) a small "MANUAL HANDOFF" mono label
 * fades in above the figure.
 *
 * The figure is a hairline stick silhouette — no fill, no glow. Subtle
 * vertical bob via keyframed y values to suggest walking. Loops forever
 * (3 stops × 3s ≈ 9s per loop).
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function HandoffCarrierGlyph({
  go = true,
  delay = 0,
  /* The 4 stop x-coordinates as fractions of the parent width. */
  stops = [0.06, 0.34, 0.62, 0.92],
}) {
  const reduce = useReducedMotion();
  const W = 1000;
  const H = 78;
  const baseY = 60;

  /* Build keyframe arrays for the walker — one keyframe per stop, with
     a soft mid-point bob between each pair. */
  const xKeys = [];
  const yKeys = [];
  const tKeys = [0];
  for (let i = 0; i < stops.length; i++) {
    if (i > 0) {
      // mid bob
      const midX = (stops[i - 1] + stops[i]) / 2 * W;
      xKeys.push(midX);
      yKeys.push(baseY - 4);
      tKeys.push(((i - 0.5) / (stops.length - 1)) * 0.5 + (i - 0.5) / (stops.length - 1) * 0.5);
    }
    xKeys.push(stops[i] * W);
    yKeys.push(baseY);
  }
  // Build clean ascending tKeys 0→1.
  const cleanT = xKeys.map((_, i) => i / (xKeys.length - 1));

  return (
    <div style={{ position: 'relative', width: '100%', height: H, pointerEvents: 'none' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* The path — single dotted hairline along the strip. */}
        <line
          x1={stops[0] * W}
          x2={stops[stops.length - 1] * W}
          y1={baseY + 6}
          y2={baseY + 6}
          stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
          strokeWidth={1}
          strokeDasharray="3 4"
        />
        {/* Stop markers */}
        {stops.map((s, i) => (
          <circle
            key={`stop${i}`}
            cx={s * W}
            cy={baseY + 6}
            r={2.5}
            fill="var(--amber, #d4a373)"
            fillOpacity={0.7}
          />
        ))}

        {/* Walker */}
        {!reduce && go ? (
          <motion.g
            initial={{ x: stops[0] * W, y: baseY }}
            animate={{ x: xKeys, y: yKeys }}
            transition={{
              duration: 9,
              ease: 'linear',
              repeat: Infinity,
              times: cleanT,
              delay,
            }}
            transform-origin="center"
          >
            <CarrierSvg />
          </motion.g>
        ) : (
          <g transform={`translate(${stops[0] * W}, ${baseY})`}>
            <CarrierSvg />
          </g>
        )}
      </svg>

      {/* Single static "manual handoff at every step" label centered
          above the strip. The walking figure carries the visual story;
          repeated label flashes were distracting and overlapped. */}
      <motion.span
        aria-hidden
        initial={reduce ? false : { opacity: 0, y: -3 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.3, ease: EASE }}
        className="deck-mono uppercase"
        style={{
          position: 'absolute',
          top: 4,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(0.66rem, min(0.82vw, 1.3vh), 0.82rem)',
          color: 'var(--amber)',
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 800,
          background: 'color-mix(in srgb, var(--bg) 95%, transparent)',
          padding: '3px 10px',
          border: '1px solid color-mix(in srgb, var(--amber) 55%, transparent)',
          whiteSpace: 'nowrap',
          borderRadius: 3,
        }}
      >
        manual handoff at every step
      </motion.span>
    </div>
  );
}

function CarrierSvg() {
  // Tiny stick figure with clipboard. Drawn around (0,0) so the parent
  // motion.g can translate via x/y.
  return (
    <g>
      {/* Head */}
      <circle
        cx={0}
        cy={-26}
        r={3.4}
        fill="none"
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.1}
      />
      {/* Body */}
      <line
        x1={0}
        y1={-22}
        x2={0}
        y2={-8}
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.1}
      />
      {/* Arm holding clipboard */}
      <line
        x1={0}
        y1={-18}
        x2={6}
        y2={-12}
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.1}
      />
      {/* Clipboard */}
      <rect
        x={6}
        y={-16}
        width={6}
        height={8}
        fill="none"
        stroke="var(--amber, #d4a373)"
        strokeWidth={0.9}
      />
      <line
        x1={7}
        y1={-13.5}
        x2={11}
        y2={-13.5}
        stroke="var(--amber, #d4a373)"
        strokeWidth={0.6}
      />
      <line
        x1={7}
        y1={-11.5}
        x2={11}
        y2={-11.5}
        stroke="var(--amber, #d4a373)"
        strokeWidth={0.6}
      />
      {/* Free arm */}
      <line
        x1={0}
        y1={-18}
        x2={-5}
        y2={-12}
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.1}
      />
      {/* Legs */}
      <line
        x1={0}
        y1={-8}
        x2={-4}
        y2={0}
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.1}
      />
      <line
        x1={0}
        y1={-8}
        x2={4}
        y2={0}
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.1}
      />
    </g>
  );
}
