import React, { useId, useMemo } from 'react';
import { motion } from 'framer-motion';
import WorldMapSvg from '../../assets/cs2/world-map.svg?react';

/**
 * WorldMapShared — REAL Wikipedia Robinson-projection world map (Natural
 * Earth borders) recolored to the deck theme.
 *
 * Why we use the source SVG instead of redrawing one:
 *   • the Wikipedia file uses ISO 3166 A3 codes as CSS classes
 *     (e.g. .USA, .DEU, .IND), which gives us a one-rule highlight
 *     primitive per country — exactly what this slide needs.
 *   • redrawn silhouettes always read as a chart, not a map. Real
 *     borders are the cinematic anchor of CS2 and worth the bytes.
 *
 * Mechanics:
 *   1. The SVG is imported as a React component via vite-plugin-svgr's
 *      ?react query, so it bundles natively — no innerHTML, no fetch.
 *   2. We scope every override under a unique class (useId), so multiple
 *      instances on different slides never collide.
 *   3. A scoped <style> block injects:
 *        - hides the source water fill (deck panel shows through)
 *        - tones every .country down to a faint base color
 *        - lights up the 42 approved-country classes in coral
 *        - styles .IND (India) as either an empty outline (default) or
 *          a fully coral-filled shape (T8 climax on slide 22)
 *
 * The 42 list is the Tibsovo by-2025 footprint described in the
 * background reading: US/Canada/Mexico (3), EU + EEA, UK, Switzerland,
 * Iceland, Israel, Japan, Korea, Singapore, Australia, NZ, plus a
 * couple of LatAm markets — together = 42. ISO codes match the SVG's
 * Natural Earth A3 classes.
 */

const APPROVED_42 = [
  // North America (3)
  'USA', 'CAN', 'MEX',
  // EU + EEA (28)
  'DEU', 'FRA', 'ITA', 'ESP', 'PRT', 'NLD', 'BEL', 'LUX', 'IRL', 'AUT',
  'DNK', 'SWE', 'FIN', 'GRC', 'POL', 'CZE', 'SVK', 'HUN', 'ROU', 'BGR',
  'SVN', 'HRV', 'EST', 'LVA', 'LTU', 'MLT', 'CYP', 'NOR',
  // Other Europe (3)
  'GBR', 'CHE', 'ISL',
  // Asia-Pacific (5)
  'JPN', 'KOR', 'SGP', 'AUS', 'NZL',
  // Other (3)
  'ISR', 'BRA', 'CHL',
];

export default function WorldMapShared({
  layoutId = 'cs2-world-map',
  /** 'context' (default) full-size; 'hero' would dim a touch (unused for now) */
  variant = 'context',
  /** 'empty' (default) — India = coral outline only.
   *  'filled' — India = solid coral (slide 22 T8 climax). */
  indiaState = 'empty',
  /** Base color for unmapped landmasses. Tuned for deck dark panel. */
  baseColor = 'rgba(60, 145, 165, 0.18)',
  baseStroke = 'rgba(255, 255, 255, 0.06)',
  /** Highlight color for approved countries + filled India. */
  approvedColor = 'var(--coral)',
  className = '',
}) {
  // Unique scope class so two instances don't fight.
  const uid = useId().replace(/[:]/g, '');
  const scope = `wm-${uid}`;
  const isFilled = indiaState === 'filled';

  const approvedSelector = useMemo(
    () => APPROVED_42.map((iso) => `.${scope} svg .${iso}`).join(',\n      '),
    [scope],
  );

  const css = `
    .${scope} { width: 100%; height: 100%; }
    .${scope} svg { display: block; width: 100%; height: 100%; }
    .${scope} svg .water { fill: transparent !important; stroke: none !important; }
    .${scope} svg .country {
      fill: ${baseColor} !important;
      stroke: ${baseStroke} !important;
      stroke-width: 0.08 !important;
      transition: fill 600ms ease, stroke 600ms ease;
    }
    ${approvedSelector} {
      fill: ${approvedColor} !important;
      fill-opacity: 0.92 !important;
      stroke: rgba(255, 255, 255, 0.18) !important;
      stroke-width: 0.10 !important;
    }
    .${scope} svg .IND {
      fill: ${isFilled ? approvedColor : 'transparent'} !important;
      fill-opacity: ${isFilled ? 0.95 : 0.06} !important;
      stroke: ${approvedColor} !important;
      stroke-width: ${isFilled ? 0.18 : 0.42} !important;
      stroke-opacity: 0.95 !important;
      transition:
        fill 1400ms cubic-bezier(0.2, 0.7, 0.3, 1),
        fill-opacity 1400ms cubic-bezier(0.2, 0.7, 0.3, 1),
        stroke-width 800ms ease;
    }
    .${scope} svg circle { display: none !important; }
    .${scope} svg title, .${scope} svg desc { display: none; }
  `;

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: { duration: 1.2, ease: [0.4, 0, 0.2, 1] } }}
      className={`${scope} ${className}`.trim()}
      data-variant={variant}
      style={{
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      aria-hidden
    >
      <style>{css}</style>
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.3, 1], delay: 0.2 }}
        style={{ width: '100%', height: '100%' }}
      >
        <WorldMapSvg />
      </motion.div>
    </motion.div>
  );
}
