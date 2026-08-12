import React, { useId, useMemo } from 'react';
import { motion } from 'framer-motion';
import WorldMapSvg from '../../assets/cs2/world-map.svg?react';

/**
 * WorldMapShared — Robinson-projection world map (Natural Earth borders)
 * recolored to the deck theme.
 *
 * ISO 3166 A3 class names on each path give us one-rule highlight per country.
 *
 * Props added 2026-04-25 for CS2 hook slide:
 *   stagger / staggerBaseDelay — per-country stagger keyframes
 *   indiaDashed / indiaDashDelay — dashed outline draw-in + ambient pulse
 *   indiaFill — darker distinct fill for India (--ink-tint-3 equivalent)
 */

const APPROVED_COUNTRIES = [
  'USA',
  'AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN',
  'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX',
  'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE',
  'ISL', 'LIE', 'NOR',
  'CHN', 'AUS',
];

export default function WorldMapShared({
  layoutId = 'cs2-world-map',
  variant = 'context',
  indiaState = 'empty',
  baseColor = 'color-mix(in srgb, var(--cyan) 14%, var(--panel))',
  baseStroke = 'var(--cream-hairline)',
  approvedColor = 'var(--cyan)',
  suppressIndiaSvg = false,
  /** Stagger approved fills, then muted fills */
  stagger = false,
  /** Delay (ms) before stagger begins */
  staggerBaseDelay = 0,
  /** Distinct fill for India (darker tint, not same as muted countries) */
  indiaFill,
  /** Dashed outline draw-in + looping ambient pulse on .IND */
  indiaDashed = false,
  /** Delay (ms) for the India dash draw-in animation */
  indiaDashDelay = 0,
  className = '',
}) {
  const uid = useId().replace(/[:]/g, '');
  const scope = `wm-${uid}`;
  const isFilled = indiaState === 'filled';

  const approvedSelector = useMemo(
    () => APPROVED_COUNTRIES.map((iso) => `.${scope} svg .${iso}`).join(',\n      '),
    [scope],
  );

  // Per-country stagger: approved countries get 50ms-spaced animation-delay,
  // then all muted countries appear together after the approved batch finishes.
  const staggerCss = useMemo(() => {
    if (!stagger) return '';
    const baseMs = staggerBaseDelay;
    const perCountry = 50;
    const approvedEnd = baseMs + APPROVED_COUNTRIES.length * perCountry;

    const approvedRules = APPROVED_COUNTRIES.map((iso, i) => {
      const delayMs = baseMs + i * perCountry;
      return `.${scope} svg .${iso} {
        fill-opacity: 0 !important;
        animation: ${scope}-fill-in 300ms ease ${delayMs}ms forwards !important;
      }`;
    }).join('\n    ');

    return `
    @keyframes ${scope}-fill-in {
      from { fill-opacity: 0; }
      to   { fill-opacity: 0.92; }
    }
    @keyframes ${scope}-muted-in {
      from { fill-opacity: 0; }
      to   { fill-opacity: 1; }
    }
    ${approvedRules}
    .${scope} svg .country {
      fill-opacity: 0 !important;
      animation: ${scope}-muted-in 600ms ease ${approvedEnd}ms forwards !important;
    }
    `;
  }, [stagger, staggerBaseDelay, scope]);

  // India dashed outline CSS: draw-in via stroke-dashoffset + looping pulse
  const indiaDashCss = useMemo(() => {
    if (!indiaDashed || suppressIndiaSvg) return '';
    const delayS = (indiaDashDelay / 1000).toFixed(2);
    return `
    @keyframes ${scope}-india-draw {
      from { stroke-dashoffset: 600; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes ${scope}-india-pulse {
      0%   { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -80; }
    }
    .${scope} svg .IND {
      stroke-dasharray: 4 3 !important;
      stroke-dashoffset: 600 !important;
      animation:
        ${scope}-india-draw 800ms ease ${delayS}s forwards,
        ${scope}-india-pulse 8s linear ${(parseFloat(delayS) + 0.8).toFixed(2)}s infinite !important;
    }
    `;
  }, [indiaDashed, indiaDashDelay, suppressIndiaSvg, scope]);

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
      stroke: var(--cream-hairline) !important;
      stroke-width: 0.10 !important;
    }
    .${scope} svg .IND {
      ${
        suppressIndiaSvg
          ? `
      fill: transparent !important;
      stroke: none !important;
      opacity: 0 !important;
      `
          : `
      fill: ${indiaFill || (isFilled ? approvedColor : 'transparent')} !important;
      fill-opacity: ${isFilled ? 0.95 : indiaFill ? 1 : 0.06} !important;
      stroke: ${approvedColor} !important;
      stroke-width: ${isFilled ? 0.18 : 0.42} !important;
      stroke-opacity: 0.95 !important;
      transition:
        fill 1400ms cubic-bezier(0.2, 0.7, 0.3, 1),
        fill-opacity 1400ms cubic-bezier(0.2, 0.7, 0.3, 1),
        stroke-width 800ms ease;
      `
      }
    }
    .${scope} svg circle { display: none !important; }
    .${scope} svg title, .${scope} svg desc { display: none; }
    ${staggerCss}
    ${indiaDashCss}
  `;

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
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
        transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 0.1 }}
        style={{ width: '100%', height: '100%' }}
      >
        <WorldMapSvg />
      </motion.div>
    </motion.div>
  );
}
