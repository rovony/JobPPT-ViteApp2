import React, { forwardRef } from 'react';
import {
  THEME_NODES, THEME_NODE, themeY, themeCenterY,
  HUB, hexPoints,
  CASE_CARDS, CASE_CARD, caseY, caseCenterY,
  convergePath, divergePath,
} from './data';
import ThemeIcon from './ThemeIcons';

/**
 * DataflowEngine — the SVG visualization for slide 04.
 *
 * Renders the three columns (5 theme nodes · decision hub · 3 case
 * cards) + 8 Bézier connecting paths inside a single SVG with
 * viewBox 0 0 1920 1080. Every coordinate comes from ./data so
 * there's exactly one source of truth.
 *
 * The parent attaches a ref to this root `<svg>` and uses data-el
 * selectors to wire GSAP's entrance/idle tweens. This component
 * itself renders elements in their FINAL visual state (strokes at
 * pathLength, opacity 1) — GSAP sets them to initial state on mount.
 *
 * z-order (render order):
 *   1. background frame (none — slide substrate handled by SlideGrid)
 *   2. 8 connecting Bézier paths (under nodes)
 *   3. 8 amber tracer dots (above paths)
 *   4. Theme nodes (text + hex glyphs)
 *   5. Decision hub (hex frames + label stack)
 *   6. Case cards (accent rule + text)
 */
const DataflowEngine = forwardRef(function DataflowEngine(props, ref) {
  return (
    <svg
      ref={ref}
      // Tight viewBox: crops to the actual dataflow band (y=360..1000)
      // and the full authoring width. Removes the dead vertical space
      // above/below the engine so the SVG fills the viz cell whether
      // scaled by width or height. `xMidYMid slice` scales by the
      // larger dimension and lets the minor overflow get clipped —
      // but since the viz cell aspect (~2.3:1) matches this new
      // viewBox aspect (1824/640 ≈ 2.85:1), overflow is minimal and
      // the diagram reads large and legible at all viewport sizes.
      viewBox="96 360 1728 640"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Dataflow engine: five themes flow into a decision hub, which flows to three case outcomes."
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
    >
      {/* ═══════════════ CONNECTING PATHS (under everything) ═══════════════ */}
      <g data-el="converge-paths" aria-hidden>
        {THEME_NODES.map((_, i) => (
          <path
            key={`c${i}`}
            data-el={`converge-${i}`}
            d={convergePath(i)}
            fill="none"
            stroke="var(--cream-hairline)"
            strokeWidth={1}
            strokeLinecap="round"
          />
        ))}
      </g>

      <g data-el="diverge-paths" aria-hidden>
        {CASE_CARDS.map((_, i) => (
          <path
            key={`d${i}`}
            data-el={`diverge-${i}`}
            d={divergePath(i)}
            fill="none"
            stroke="var(--cream-hairline)"
            strokeWidth={1}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* ═══════════════ AMBER TRACER DOTS (ride the paths) ═══════════════ */}
      {/* Initial cx/cy = path origin. GSAP MotionPath animates them. */}
      <g data-el="tracers" aria-hidden>
        {THEME_NODES.map((_, i) => (
          <circle
            key={`tc${i}`}
            data-el={`tracer-c-${i}`}
            cx={THEME_NODE.x + THEME_NODE.w}
            cy={themeCenterY(i)}
            r={3}
            fill="var(--amber)"
            style={{ opacity: 0 }}
          />
        ))}
        {CASE_CARDS.map((_, i) => (
          <circle
            key={`td${i}`}
            data-el={`tracer-d-${i}`}
            cx={HUB.rightEdgeX}
            cy={HUB.cy}
            r={3}
            fill="var(--amber)"
            style={{ opacity: 0 }}
          />
        ))}
      </g>

      {/* ═══════════════ THEME NODES (left column) ═══════════════ */}
      {/* Each theme is a composed icon-card:
             [ 01 ]  [🔶 icon 72px]   Title  22pt
                                     Descriptor 14pt
          Layout columns (x in SVG viewBox units):
            · numeral  x=96   width ≈ 72
            · icon     cx=200 box 72
            · text     x=260  to 520 (260px wide)
          Vertical center on themeCenterY(i).
          Tighter vertical gap (row step unchanged in data.js). */}
      <g data-el="theme-nodes">
        {THEME_NODES.map((theme, i) => {
          const yMid = themeCenterY(i);
          const color = `var(${theme.token})`;
          const iconCx = THEME_NODE.x + 200;
          const iconSize = 72;
          const textX = THEME_NODE.x + 260;
          return (
            <g key={theme.n} data-el={`theme-${i}`} data-theme-idx={i}>
              {/* Numeral — larger (72pt) for stronger hierarchy */}
              <text
                data-el={`theme-num-${i}`}
                x={THEME_NODE.x}
                y={yMid + 24}
                fontFamily="var(--font-display)"
                fontSize={72}
                fontWeight={500}
                fill={color}
                style={{ letterSpacing: '-0.02em' }}
              >
                {theme.n}
              </text>

              {/* Icon — full SVG drawing, 72px, no hex frame.
                  data-el kept as "theme-hex-{i}" so the existing GSAP
                  entrance timeline (which zeroes this group and scales
                  it back in with back.out(2)) keeps working unchanged. */}
              <g data-el={`theme-hex-${i}`} style={{ transformOrigin: `${iconCx}px ${yMid}px` }}>
                <ThemeIcon kind={theme.icon} cx={iconCx} cy={yMid} size={iconSize} color={color} />
              </g>

              {/* Title — 22pt, cream */}
              <text
                data-el={`theme-title-${i}`}
                x={textX}
                y={yMid - 6}
                fontFamily="var(--font-body)"
                fontSize={22}
                fontWeight={600}
                fill="var(--cream)"
              >
                {theme.title}
              </text>

              {/* Descriptor — 14pt, muted */}
              <text
                data-el={`theme-desc-${i}`}
                x={textX}
                y={yMid + 22}
                fontFamily="var(--font-body)"
                fontSize={14}
                fontWeight={400}
                fill="var(--cream-muted)"
              >
                {theme.descriptor}
              </text>
            </g>
          );
        })}
      </g>

      {/* ═══════════════ DECISION HUB (center) ═══════════════ */}
      <g data-el="hub">
        {/* Outer hex frame */}
        <polygon
          data-el="hub-outer"
          points={hexPoints(HUB.cx, HUB.cy, HUB.width)}
          fill="none"
          stroke="var(--amber)"
          strokeWidth={1.5}
          strokeOpacity={1}
          strokeLinejoin="round"
        />

        {/* Inner hex frame (inset 16px) */}
        <polygon
          data-el="hub-inner"
          points={hexPoints(HUB.cx, HUB.cy, HUB.width - 32)}
          fill="none"
          stroke="var(--amber)"
          strokeWidth={1}
          strokeOpacity={0.4}
          strokeLinejoin="round"
        />

        {/* Hub label — single centered line. */}
        <text
          data-el="hub-primary"
          x={HUB.cx}
          y={HUB.cy + 12}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize={36}
          fontWeight={600}
          fill="var(--amber)"
          style={{ letterSpacing: '-0.015em' }}
        >
          THE DECISION
        </text>
      </g>

      {/* ═══════════════ CASE OUTPUT CARDS (right column) ═══════════════ */}
      <g data-el="case-cards">
        {CASE_CARDS.map((c, i) => {
          const y = caseY(i);
          const color = `var(${c.token})`;
          return (
            <g key={c.eyebrow} data-el={`case-${i}`}>
              {/* Top accent rule */}
              <line
                data-el={`case-rule-${i}`}
                x1={CASE_CARD.x}
                y1={y}
                x2={CASE_CARD.x + CASE_CARD.w}
                y2={y}
                stroke={color}
                strokeWidth={2}
              />

              {/* Eyebrow */}
              <text
                data-el={`case-eyebrow-${i}`}
                x={CASE_CARD.x + 16}
                y={y + 30}
                fontFamily="var(--font-mono)"
                fontSize={11}
                fontWeight={500}
                fill={color}
                style={{ letterSpacing: '0.2em' }}
              >
                {c.eyebrow}
              </text>

              {/* Name */}
              <text
                data-el={`case-name-${i}`}
                x={CASE_CARD.x + 16}
                y={y + 62}
                fontFamily="var(--font-display)"
                fontSize={20}
                fontWeight={450}
                fill="var(--cream)"
                style={{ letterSpacing: '-0.01em' }}
              >
                {c.name}
              </text>

              {/* Outcome (2 lines via tspan) */}
              <OutcomeText
                dataEl={`case-outcome-${i}`}
                x={CASE_CARD.x + 16}
                y={y + 90}
                maxChars={48}
                text={c.outcome}
              />

              {/* Chevron */}
              <text
                data-el={`case-chev-${i}`}
                x={CASE_CARD.x + CASE_CARD.w - 24}
                y={y + 66}
                textAnchor="end"
                fontFamily="var(--font-body)"
                fontSize={20}
                fontWeight={400}
                fill="var(--amber)"
                opacity={0.4}
              >
                →
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
});

/**
 * OutcomeText — soft wrap for case outcome to 2 lines.
 * Splits text at the nearest space before maxChars — simple greedy
 * wrap, sufficient for our known string lengths.
 */
function OutcomeText({ x, y, maxChars, text, dataEl }) {
  const lines = wrapTwoLines(text, maxChars);
  return (
    <text
      data-el={dataEl}
      x={x}
      y={y}
      fontFamily="var(--font-body)"
      fontSize={14}
      fontWeight={400}
      fill="var(--cream-muted)"
    >
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : 18}>{line}</tspan>
      ))}
    </text>
  );
}

function wrapTwoLines(text, maxChars) {
  if (text.length <= maxChars) return [text];
  let cut = text.lastIndexOf(' ', maxChars);
  if (cut < 0) cut = maxChars;
  return [text.slice(0, cut), text.slice(cut + 1)];
}

export default DataflowEngine;