import React from 'react';
import { motion } from 'framer-motion';

/**
 * ThemesConstellation — five-node constellation of the deck's five
 * framework themes. This is the closing-act's signature illustration
 * and the THIRD shared element in the deck (after LungsShared and
 * IndiaMap), so the same hero → context cinematic morph plays when
 * advancing from the closing divider (slide 30) into the breadth
 * slide (slide 31).
 *
 * Variants:
 *   variant="hero"    (slide 30, divider) — full constellation, all
 *                      five nodes lit at full saturation, connecting
 *                      lines stroke in, theme glyphs labeled. The
 *                      "all five themes are now live" frame.
 *   variant="context" (slide 31, breadth) — same constellation but
 *                      faint and pulled larger as a watermark behind
 *                      the 6-domain grid; no labels, lower opacities,
 *                      no entrance animations (the layoutId match IS
 *                      the arrival animation).
 *
 * Layout: a regular pentagon with the apex at top. Nodes correspond
 * to themes 01–05 in clockwise order starting from the top:
 *   01 amber  ⇌ QP replaces study  (top)
 *   02 cyan   ◎ Dose precision     (top-right)
 *   03 sage   ⊕ Global strategy    (bottom-right)
 *   04 violet ◇ Novel methods      (bottom-left)
 *   05 coral  ◈ Judgment           (top-left)
 *
 * Connecting lines draw all-to-all (a complete K5 graph) so the
 * structure reads as "everything connects to everything" — the
 * editorial frame for the breadth section.
 */

const LAYOUT_TRANSITION = { duration: 1.8, ease: [0.4, 0, 0.2, 1] };

const DIMENSIONS = {
  hero:    { width: 'clamp(300px, 32vw, 520px)' },
  context: { width: 'clamp(420px, 46vw, 680px)' },
};

// Pentagon vertex positions in a 600×600 viewBox, centered.
// Angles measured from positive Y-axis (up), clockwise.
// Apex at top → 0°, then 72° steps.
const NODES = [
  { num: '01', token: 'amber',  glyph: '\u21cc', short: 'QP replaces study' },
  { num: '02', token: 'cyan',   glyph: '\u25ce', short: 'Dose precision' },
  { num: '03', token: 'sage',   glyph: '\u2295', short: 'Global strategy' },
  { num: '04', token: 'violet', glyph: '\u25c7', short: 'Novel methods' },
  { num: '05', token: 'coral',  glyph: '\u25c8', short: 'Judgment' },
];

const CENTER = 300;
const RADIUS = 200;

function vertexAt(i) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

const VERTICES = NODES.map((_, i) => vertexAt(i));

// All pairs of node indices for the K5 edges.
const EDGES = [];
for (let i = 0; i < 5; i += 1) {
  for (let j = i + 1; j < 5; j += 1) EDGES.push([i, j]);
}

export default function ThemesConstellation({
  layoutId = 'themes-constellation',
  variant = 'hero',
  delay = 0.3,
  className = '',
}) {
  const dims = DIMENSIONS[variant] || DIMENSIONS.hero;
  const isHero = variant === 'hero';
  const ease = [0.2, 0.7, 0.3, 1];
  const overshoot = [0.34, 1.56, 0.64, 1];

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: LAYOUT_TRANSITION }}
      className={className}
      style={{
        width: dims.width,
        aspectRatio: '1 / 1',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      aria-hidden={!isHero}
    >
      <svg
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
        aria-label={isHero ? 'Five framework themes connected as a constellation' : undefined}
        role={isHero ? 'img' : undefined}
        style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id={`themes-glow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={isHero ? 3.2 : 2.0} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ─── EDGES (K5 graph: 10 lines) ─── */}
        <g opacity={isHero ? 0.55 : 0.20}>
          {EDGES.map(([i, j], idx) => {
            const a = VERTICES[i];
            const b = VERTICES[j];
            const key = `e-${i}-${j}`;
            if (isHero) {
              return (
                <motion.line
                  key={key}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="var(--cream-muted)"
                  strokeWidth={1.1}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.9, ease, delay: delay + 0.4 + idx * 0.05 },
                    opacity:    { duration: 0.3, delay: delay + 0.4 + idx * 0.05 },
                  }}
                />
              );
            }
            return (
              <line
                key={key}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--cream-muted)"
                strokeWidth={0.7}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* ─── CENTER ANCHOR ─── */}
        {isHero ? (
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={6}
            fill="var(--cream)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: overshoot, delay: delay + 1.2 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ) : (
          <circle cx={CENTER} cy={CENTER} r={4} fill="var(--cream-muted)" opacity={0.45} />
        )}

        {/* ─── NODES ─── */}
        <g filter={`url(#themes-glow-${variant})`}>
          {NODES.map((node, i) => {
            const v = VERTICES[i];
            const color = `var(--${node.token})`;
            const nodeDelay = delay + 0.6 + i * 0.14;

            if (isHero) {
              return (
                <g key={node.num}>
                  {/* Halo */}
                  <motion.circle
                    cx={v.x}
                    cy={v.y}
                    r={42}
                    fill={color}
                    fillOpacity={0.08}
                    stroke={color}
                    strokeWidth={1.2}
                    strokeOpacity={0.45}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.65, ease: overshoot, delay: nodeDelay }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                  {/* Inner solid disc */}
                  <motion.circle
                    cx={v.x}
                    cy={v.y}
                    r={22}
                    fill={color}
                    fillOpacity={0.95}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: overshoot, delay: nodeDelay + 0.05 }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                  {/* Glyph */}
                  <motion.text
                    x={v.x}
                    y={v.y + 8}
                    textAnchor="middle"
                    fontSize={22}
                    fontWeight={700}
                    fill="var(--bg)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease, delay: nodeDelay + 0.15 }}
                  >
                    {node.glyph}
                  </motion.text>
                  {/* Theme number, outer label */}
                  <motion.text
                    x={v.x + Math.sign(v.x - CENTER) * 36 + (Math.abs(v.x - CENTER) < 8 ? 0 : 0)}
                    y={v.y + Math.sign(v.y - CENTER) * 38 + (Math.abs(v.y - CENTER) < 8 ? -34 : 0)}
                    textAnchor={
                      Math.abs(v.x - CENTER) < 8
                        ? 'middle'
                        : v.x > CENTER
                        ? 'start'
                        : 'end'
                    }
                    fontFamily="var(--font-mono)"
                    fontSize={15}
                    letterSpacing="0.18em"
                    fontWeight={700}
                    fill={color}
                    opacity={0.95}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 0.95, y: 0 }}
                    transition={{ duration: 0.5, ease, delay: nodeDelay + 0.25 }}
                  >
                    {node.num}
                  </motion.text>
                </g>
              );
            }

            // CONTEXT — flat dim discs, no glyph, no label
            return (
              <g key={node.num}>
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={36}
                  fill={color}
                  fillOpacity={0.04}
                  stroke={color}
                  strokeWidth={0.8}
                  strokeOpacity={0.30}
                />
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={14}
                  fill={color}
                  fillOpacity={0.32}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </motion.div>
  );
}
