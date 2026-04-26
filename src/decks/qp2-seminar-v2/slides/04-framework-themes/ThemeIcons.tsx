import React from 'react';

/**
 * ThemeIcons — 5 purpose-drawn SVG icons for slide 04 theme nodes.
 *
 * Each icon is drawn inside a 72×72 viewBox centered on (36,36).
 * Use <ThemeIcon kind="..." cx={..} cy={..} size={72} color={..} />
 * to place one at arbitrary SVG coordinates; the component emits
 * a <g transform="translate(...)"> so it slots cleanly into the
 * parent DataflowEngine SVG without breaking its coordinate space.
 *
 * Icons chosen to echo each theme's semantic:
 *   · replace  — opposing arrows (QP stands in for study)
 *   · dose     — concentric target rings (exposure precision)
 *   · global   — globe meridians (multi-agency convergence)
 *   · methods  — stacked layered diamonds (stacked novel methods)
 *   · judgment — balance scale (calibrated judgment)
 *
 * All drawn with currentColor so the parent controls tint via the
 * `color` prop, which flows through `<g style={{ color }}>`.
 */

const STROKE = 2.2;

function IconReplace() {
  // Two counter-rotating arrows — "study ⇌ model"
  return (
    <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={36} cy={36} r={28} strokeOpacity={0.25} />
      {/* Top arrow: left→right */}
      <path d="M 12 26 L 56 26" />
      <path d="M 50 20 L 56 26 L 50 32" />
      {/* Bottom arrow: right→left */}
      <path d="M 60 46 L 16 46" />
      <path d="M 22 40 L 16 46 L 22 52" />
    </g>
  );
}

function IconDose() {
  // Concentric rings + center dot — "exposure matching, precision"
  return (
    <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round">
      <circle cx={36} cy={36} r={28} strokeOpacity={0.25} />
      <circle cx={36} cy={36} r={20} strokeOpacity={0.55} />
      <circle cx={36} cy={36} r={12} strokeOpacity={0.85} />
      <circle cx={36} cy={36} r={4} fill="currentColor" stroke="none" />
    </g>
  );
}

function IconGlobe() {
  // Globe with meridians — "global strategy, multi-agency convergence"
  return (
    <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={36} cy={36} r={28} />
      {/* Equator + tropics */}
      <ellipse cx={36} cy={36} rx={28} ry={10} strokeOpacity={0.5} />
      {/* Prime meridian */}
      <ellipse cx={36} cy={36} rx={10} ry={28} strokeOpacity={0.55} />
      {/* Vertical axis */}
      <line x1={36} y1={8} x2={36} y2={64} strokeOpacity={0.35} />
    </g>
  );
}

function IconMethods() {
  // Three stacked diamonds — "stacked FDA-precedented methods"
  return (
    <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="round" strokeLinecap="round">
      {/* Bottom diamond */}
      <polygon points="36,56 14,44 36,32 58,44" strokeOpacity={0.35} />
      {/* Middle diamond */}
      <polygon points="36,44 14,32 36,20 58,32" strokeOpacity={0.65} />
      {/* Top diamond */}
      <polygon points="36,32 18,22 36,12 54,22" strokeOpacity={1} fill="currentColor" fillOpacity={0.12} />
    </g>
  );
}

function IconJudgment() {
  // Balance scale — "calibrated judgment"
  return (
    <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      {/* Central post */}
      <line x1={36} y1={14} x2={36} y2={58} />
      {/* Beam */}
      <line x1={12} y1={22} x2={60} y2={22} />
      {/* Base */}
      <line x1={24} y1={58} x2={48} y2={58} strokeWidth={STROKE + 0.4} />
      {/* Left pan (tilted down slightly) */}
      <path d="M 8 26 L 24 26 L 20 38 Q 16 42 12 38 Z" strokeOpacity={0.85} />
      {/* Right pan */}
      <path d="M 48 26 L 64 26 L 60 36 Q 56 40 52 36 Z" strokeOpacity={0.85} />
      {/* Tiny fulcrum dot */}
      <circle cx={36} cy={22} r={2.4} fill="currentColor" stroke="none" />
    </g>
  );
}

const REGISTRY = {
  replace:  IconReplace,
  dose:     IconDose,
  global:   IconGlobe,
  methods:  IconMethods,
  judgment: IconJudgment,
};

/**
 * <ThemeIcon kind cx cy size color />
 * Positions a 72×72 icon centered on (cx, cy) with optional scale.
 */
export default function ThemeIcon({ kind, cx, cy, size = 72, color = 'currentColor' }) {
  const Icon = REGISTRY[kind];
  if (!Icon) return null;
  const scale = size / 72;
  // Translate so (0,0) of icon viewBox lands at top-left of its bbox,
  // then offset by -half so the 72-unit box centers on (cx, cy).
  return (
    <g
      transform={`translate(${cx - size / 2}, ${cy - size / 2}) scale(${scale})`}
      style={{ color }}
    >
      <Icon />
    </g>
  );
}