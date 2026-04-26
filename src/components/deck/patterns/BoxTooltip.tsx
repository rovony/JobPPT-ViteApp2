// @ts-nocheck
import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * BoxTooltip — quiet, presenter-controlled detail-on-demand for boxplots.
 *
 * Rendered inside an SVG via <foreignObject> so the tooltip scales with the
 * chart's viewBox (no DOM↔SVG coordinate mismatch under transform-scale).
 *
 * zaj-slides decision (2026-04-24):
 *   The skill defaults exposure-response / regulatory charts to STATIC.
 *   Hover tooltips are an explicit, user-authorized override (per-chart
 *   call): they expose the underlying five-number summary on demand without
 *   adding entrance motion or competing with the static assertion. Hover
 *   only fires on laptop-driven delivery — projection-only audiences see
 *   the slide in its STATIC form.
 *
 * Honors prefers-reduced-motion: instant on/off, no fade.
 *
 * Props:
 *   visible      - boolean
 *   x, y         - SVG-coordinate anchor (centroid of the hovered box)
 *   width        - tooltip box width in viewBox units (default 200)
 *   height       - tooltip box height (default 92)
 *   anchor       - 'above' | 'below' (default 'above')
 *   tk           - token resolver from useTokens (returns hex strings)
 *   title        - small title row (e.g. "ADULT · LOW DOSE  n = 18")
 *   accent       - title color token name (default '--coral')
 *   lines        - [{ label, value }] rows rendered as label · value
 *   footer       - optional footer string (e.g. Δ vs paired adult)
 *   footerAccent - footer color token name
 */
export default function BoxTooltip({
  visible,
  x,
  y,
  width = 200,
  height = 92,
  anchor = 'above',
  tk,
  title,
  accent = '--coral',
  lines = [],
  footer,
  footerAccent = '--coral',
}) {
  const reduce = useReducedMotion();

  const fxX = x - width / 2;
  const offset = 14;
  const fxY = anchor === 'above' ? y - height - offset : y + offset;

  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.12 }}
          style={{ pointerEvents: 'none' }}
        >
          <foreignObject
            x={fxX}
            y={fxY}
            width={width}
            height={height}
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                width: '100%',
                height: '100%',
                background: tk('--panel') || 'rgba(20, 22, 26, 0.96)',
                border: `1px solid ${tk('--cream-hairline') || 'rgba(255,255,255,0.18)'}`,
                borderRadius: 0,
                padding: '8px 10px',
                fontFamily: 'var(--font-mono, IBM Plex Mono, ui-monospace, monospace)',
                fontSize: 10.5,
                lineHeight: 1.32,
                color: tk('--cream') || '#f3ead8',
                fontVariantNumeric: 'tabular-nums',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {title && (
                <div
                  style={{
                    color: tk(accent) || '#f59f4b',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontSize: 9.5,
                    marginBottom: 4,
                    paddingBottom: 4,
                    borderBottom: `1px solid ${tk('--cream-hairline') || 'rgba(255,255,255,0.10)'}`,
                  }}
                >
                  {title}
                </div>
              )}
              {lines.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 12,
                  }}
                >
                  <span style={{ color: tk('--cream-muted') || 'rgba(243,234,216,0.65)' }}>
                    {row.label}
                  </span>
                  <span style={{ color: tk('--cream') || '#f3ead8', fontWeight: 600 }}>
                    {row.value}
                  </span>
                </div>
              ))}
              {footer && (
                <div
                  style={{
                    marginTop: 4,
                    paddingTop: 4,
                    borderTop: `1px solid ${tk('--cream-hairline') || 'rgba(255,255,255,0.10)'}`,
                    color: tk(footerAccent) || '#f59f4b',
                    fontWeight: 700,
                    fontSize: 10,
                    textAlign: 'right',
                  }}
                >
                  {footer}
                </div>
              )}
            </div>
          </foreignObject>
        </motion.g>
      )}
    </AnimatePresence>
  );
}
