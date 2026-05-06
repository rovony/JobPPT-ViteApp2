import React, { useId, useMemo } from 'react';
import { motion } from 'framer-motion';
import WorldMapSvg from '../assets/world-map.svg?react';

/**
 * RegulatoryMap — repurposed from qp2-seminar-v2/cs2-shared/WorldMapShared.jsx
 *
 * Lifted-and-renamed for v3-R2. The v2 version highlighted 42 Tibsovo
 * approval countries in coral; this version highlights ONLY the
 * jurisdictions whose regulatory verdict is on the slide (EMA + PMDA
 * for CS1 decision). Same SVG asset — Wikipedia Robinson-projection
 * world map with ISO 3166 A3 codes as CSS classes.
 *
 * Key differences from v2:
 *   - Configurable highlight ISO list via `highlights` prop (was hardcoded)
 *   - Configurable highlight color via `highlightColor` prop (was always coral)
 *   - No India special-state (this is regulatory geography, not CS2)
 */

export default function RegulatoryMap({
  layoutId,
  highlights = [],
  highlightColor = 'var(--coral)',
  /* Theme-aware base colors (per IndiaMap.jsx convention).
     --cream-hairline / --cream-faint are deck-themed tokens that
     auto-adapt to light AND dark modes — light theme inverts them
     to subtle dark land tones; dark theme keeps them as faint cream
     washes. Same map renders correctly under prefers-color-scheme:
     light AND dark without per-theme overrides. */
  baseColor = 'color-mix(in srgb, var(--cream) 8%, transparent)',
  baseStroke = 'color-mix(in srgb, var(--cream) 14%, transparent)',
  className = '',
}) {
  const uid = useId().replace(/[:]/g, '');
  const scope = `regmap-${uid}`;

  const highlightSelector = useMemo(
    () => highlights.map((iso) => `.${scope} svg .${iso}`).join(',\n      '),
    [scope, highlights],
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
    ${highlights.length > 0 ? `${highlightSelector} {
      fill: ${highlightColor} !important;
      fill-opacity: 0.88 !important;
      stroke: rgba(255, 255, 255, 0.22) !important;
      stroke-width: 0.10 !important;
    }` : ''}
    .${scope} svg circle { display: none !important; }
    .${scope} svg title, .${scope} svg desc { display: none; }
  `;

  return (
    <motion.div
      layoutId={layoutId}
      layout={layoutId ? true : undefined}
      transition={{ layout: { duration: 1.2, ease: [0.4, 0, 0.2, 1] } }}
      className={`${scope} ${className}`.trim()}
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

// EMA jurisdiction (27 EU member states + 3 EEA non-EU).
export const EMA_TERRITORY = [
  // EU 27
  'AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA',
  'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD',
  'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE',
  // EEA non-EU
  'NOR', 'ISL',
];

export const PMDA_TERRITORY = ['JPN'];
