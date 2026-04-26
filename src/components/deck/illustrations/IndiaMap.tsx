import React, { useId } from 'react';
import { motion } from 'framer-motion';

/**
 * IndiaMap — REAL India outline (Natural Earth, A3 = IND).
 *
 * The path data is the exact `.IND` polygon from the deck's
 * `assets/cs2/world-map.svg` — same Robinson projection, same
 * coordinate space. This means when the audience sees India in
 * isolation here, it is the SAME shape they see lit up on the
 * world map (slide 16). The cinematic morph between the two
 * therefore reads as "India" — not as "a stylized blob that
 * stands in for India".
 *
 * Cross-slide mechanics (layoutId="india-cdsco"):
 *
 *   variant="hero" (slide 16 divider, right margin):
 *     - Marginalia size. Outline fades in as a solid complete border
 *       (no pathLength draw-in) with HANDOFF_* ink, so the end state
 *       is pixel-identical to deplete's initial state on cs2-02.
 *     - This is the FROM-bbox for the cross-slide morph.
 *
 *   variant="filled" (slide 22 impact climax):
 *     - Hero size. Land state for the cross-slide morph. India
 *       fills coral here (T8 destination).
 *     - This is the TO-bbox.
 *
 *   variant="context" / "empty" (legacy, kept for safety):
 *     - Backdrop sizes for any future non-morphing usage.
 *
 *   variant="empty" + depleteFillFromDivider (cs2-02 only):
 *     - First paint uses the SAME constants as variant="hero" at
 *       handoff (HANDOFF_FILL_OPACITY, HANDOFF_STROKE_WIDTH,
 *       HANDOFF_STROKE_OPACITY, hero glow blur) — lung parity: only bbox
 *       moves, not the ink recipe. Fill eases down; stroke width eases
 *       from HANDOFF_STROKE_WIDTH → EMPTY_STROKE_WIDTH with stroke
 *       opacity held at HANDOFF_STROKE_OPACITY so the border does not
 *       wash out (no false “color change” mid-morph).
 *
 * The viewBox follows the source bbox (≈ 56,-40 → 83,-9 in the
 * world map's projection), with a small breathing margin so the
 * stroke doesn't clip.
 */

const LAYOUT_TRANSITION = { duration: 1.8, ease: [0.4, 0, 0.2, 1] };

/**
 * Lung parity — divider (hero) and cs2-02 destination (deplete start)
 * must use the SAME fill + stroke recipe so the layoutId morph reads as
 * one continuous object (only bbox + position change), not a style swap.
 */
const HANDOFF_FILL_OPACITY = 0.12;
const HANDOFF_STROKE_WIDTH = 1.6;
const HANDOFF_STROKE_OPACITY = 1;
/** Map “empty” land state — thinner stroke + softer opacity at small size. */
const EMPTY_STROKE_WIDTH = 1.3;

// Natural Earth IND polygon — copied verbatim from the deck's
// world-map.svg so projection + topology stay in sync.
const INDIA_PATH = 'M83.304,-31.995 L83.465,-31.566 L83.168,-31.357 L83.384,-30.661 L82.652,-30.866 L81.546,-30.084 L81.691,-29.435 L81.316,-28.485 L81.355,-27.934 L81.06,-27.001 L80.259,-27.259 L80.387,-26.087 L80.218,-25.701 L80.385,-25.22 L79.937,-24.952 L79.183,-26.747 L78.914,-26.744 L78.852,-26.021 L78.239,-26.608 L78.45,-27.252 L78.876,-27.317 L79.183,-28.276 L78.592,-28.468 L77.692,-28.452 L76.743,-28.607 L76.53,-29.394 L76.058,-29.45 L75.209,-29.94 L74.991,-29.171 L75.786,-28.572 L75.241,-28.15 L75.083,-27.738 L75.726,-27.435 L75.653,-26.752 L76.103,-25.901 L76.372,-24.969 L76.282,-24.556 L75.613,-24.569 L74.434,-24.335 L74.587,-23.483 L74.136,-22.813 L72.808,-22.052 L71.851,-20.719 L71.183,-20.005 L70.274,-19.264 L70.321,-18.744 L69.855,-18.464 L69.001,-18.059 L68.545,-17.999 L68.322,-17.135 L68.642,-15.663 L68.762,-14.724 L68.412,-13.648 L68.52,-11.725 L68.008,-11.671 L67.598,-10.807 L67.92,-10.434 L67.026,-10.113 L66.723,-9.343 L66.337,-9.018 L65.349,-10.074 L64.813,-11.66 L64.371,-12.801 L63.993,-13.337 L63.4,-14.425 L63.062,-15.841 L62.841,-16.547 L61.822,-18.103 L61.229,-20.297 L60.804,-21.745 L60.681,-23.117 L60.395,-24.176 L59.029,-23.498 L58.326,-23.634 L56.923,-25.006 L57.356,-25.416 L57.025,-25.86 L55.786,-26.821 L56.359,-27.576 L58.503,-27.574 L58.201,-28.545 L57.586,-29.119 L57.367,-29.991 L56.667,-30.499 L57.572,-31.686 L58.707,-31.599 L59.539,-32.787 L59.957,-33.935 L60.69,-35.072 L60.527,-35.88 L61.216,-36.534 L60.339,-37.093 L59.856,-37.859 L59.317,-38.851 L59.677,-39.339 L61.169,-39.063 L62.185,-39.231 L62.88,-40.181 L64.196,-38.856 L64.304,-37.932 L64.807,-37.353 L64.898,-36.775 L64.183,-36.927 L64.703,-35.679 L65.783,-34.962 L67.267,-34.169 L66.754,-33.656 L66.567,-32.597 L67.574,-32.169 L68.578,-31.613 L69.944,-30.979 L71.294,-30.832 L71.948,-30.256 L72.713,-30.148 L73.923,-29.884 L74.727,-29.904 L74.764,-30.351 L74.512,-31.071 L74.499,-31.559 L75.045,-31.796 L75.287,-30.904 L75.348,-30.678 L76.303,-30.248 L76.88,-30.426 L77.712,-30.35 L78.496,-30.383 L78.438,-31.079 L77.977,-31.44 L78.729,-31.581 L79.441,-32.424 L80.402,-33.144 L81.268,-32.866 L81.851,-33.343 L82.455,-32.639 L82.229,-32.163 Z';

// Source polygon bbox: x ∈ [55.786, 83.465], y ∈ [-40.181, -9.018].
// Padded to keep stroke inside the viewBox.
const VIEW_BOX = '55 -41 30 33';
const ASPECT   = '30 / 33';

const DIMENSIONS = {
  // Marginalia on the divider — bumped up from the previous stylized
  // version so the audience can read the silhouette as "India" before
  // the slide 16 world map ever appears.
  hero:    { width: 'clamp(260px, 32vw, 460px)', aspectRatio: ASPECT },
  // Backdrop sizing for any non-morphing usage in CS2.
  context: { width: 'clamp(280px, 36vw, 480px)', aspectRatio: ASPECT },
  // T8 origin/destination sizes — kept large so when India "fills
  // coral" on slide 22 it lands as a hero element, echoing the
  // size it occupied on the world map a few slides earlier.
  empty:   { width: 'clamp(200px, 22vw, 320px)', aspectRatio: ASPECT },
  filled:  { width: 'clamp(180px, 18vw, 260px)', aspectRatio: ASPECT },
};

export default function IndiaMap({
  layoutId = 'india-cdsco',
  variant = 'hero',
  stroke = 'var(--case, var(--cyan))',
  delay = 0.3,
  className = '',
  fillIntensity,
  // Style override merged onto the motion.div. Used by cs2-02 to
  // place the destination India at its geographic position on the
  // world map (position: absolute + percentage left/top/width).
  // Override-keys (left/top/right/bottom/position/width/height/etc.)
  // win over the variant defaults — exactly like a plain DOM style
  // prop. Pass {} or omit for the standard centered-block layout.
  style: styleOverride,
  /**
   * When true (only meaningful with variant="empty"): fill starts at
   * `depleteFillStart` and stroke at `depleteStrokeStart`, then both
   * ease to the normal empty appearance over `depleteFillDuration`.
   * Used on cs2-02 so India reads solid at morph entry (matching the
   * divider hero) then resolves to outline-only on the map.
   */
  depleteFillFromDivider = false,
  /** Initial fill opacity for deplete — defaults = hero steady state. */
  depleteFillStart = HANDOFF_FILL_OPACITY,
  /** Stroke opacity during deplete (constant — not animated). */
  depleteStrokeStart = HANDOFF_STROKE_OPACITY,
  /** Easing for deplete animation (default = LAYOUT_TRANSITION ease). */
  depleteEase = [0.4, 0, 0.2, 1],
  /** Duration in seconds; default matches cross-slide layout morph. */
  depleteFillDuration = 1.8,
  /**
   * When true: outline renders as dashed cyan with stroke-dashoffset
   * draw-in + looping 8s ambient pulse. Used on hook slide.
   */
  dashedStroke = false,
  /** Delay (seconds) before dashed draw-in starts. */
  dashedDelay = 0,
  /** Custom fill color for India (e.g. --ink-tint-3 equivalent). */
  customFill,
}) {
  const dashId = useId().replace(/:/g, '');
  const dims = DIMENSIONS[variant] || DIMENSIONS.hero;
  const isHero = variant === 'hero';
  const isEmpty = variant === 'empty';
  const isFilled = variant === 'filled';
  const deplete =
    depleteFillFromDivider && isEmpty;
  /** Same glow blur as hero during divider → map handoff (was 0.12 for empty only). */
  const glowBlur = isHero || deplete ? 0.18 : 0.12;

  const fillOp = typeof fillIntensity === 'number'
    ? fillIntensity
    : isHero
      ? HANDOFF_FILL_OPACITY
      : isFilled
        ? 0.55
        : isEmpty
          ? 0.02
          : 0.06;
  const strokeOp = isEmpty ? 0.42 : isFilled ? 0.85 : 0.32;

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: LAYOUT_TRANSITION }}
      className={`india-map-shared ${className}`.trim()}
      style={{
        width: dims.width,
        aspectRatio: dims.aspectRatio,
        color: stroke,
        pointerEvents: 'none',
        userSelect: 'none',
        ...styleOverride,
      }}
      aria-hidden
    >
      {/* Pin the layoutId wrapper at opacity 1 through the morph.
          Framer Motion's projection layer writes inline style.opacity
          on layoutId-matched siblings during the morph (entering ramps
          0 → 1, exiting ramps 1 → 0). Empirically that produced a
          ~5% "ghosted India" valley around t=150–300 ms while the
          source slide was simultaneously fading out — visible as a
          jarring blink mid-morph. CSS `!important` defeats inline
          styles per the cascade, pinning the wrapper at opacity 1
          for the full morph without disabling the bbox interpolation
          we DO want. Same fix LungsShared uses (slide 5 → 6 lung
          camera-pullback). */}
      <style>{`.india-map-shared { opacity: 1 !important; }`}</style>
      <svg
        viewBox={VIEW_BOX}
        preserveAspectRatio="xMidYMid meet"
        aria-label="India outline"
        role="img"
        style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id={`india-glow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={glowBlur} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter={`url(#india-glow-${variant})`}>
          {/* Fill wash */}
          {isHero ? (
            <motion.path
              d={INDIA_PATH}
              fill={stroke}
              stroke="none"
              fillOpacity={HANDOFF_FILL_OPACITY}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.2, 0.7, 0.3, 1],
                delay: delay + 0.6,
              }}
            />
          ) : deplete ? (
            <motion.path
              d={INDIA_PATH}
              fill={stroke}
              stroke="none"
              initial={{ fillOpacity: depleteFillStart }}
              animate={{ fillOpacity: fillOp }}
              transition={{
                duration: depleteFillDuration,
                ease: depleteEase,
                delay: 0,
              }}
            />
          ) : (
            <motion.path
              d={INDIA_PATH}
              fill={stroke}
              stroke="none"
              initial={{ fillOpacity: isFilled ? 0 : fillOp }}
              animate={{ fillOpacity: fillOp }}
              transition={{
                duration: 1.6,
                ease: [0.2, 0.7, 0.3, 1],
                delay: isFilled ? 1.0 : 0,
              }}
            />
          )}

          {/* Outline. With vectorEffect="non-scaling-stroke" the stroke
              width is interpreted in device pixels, not user units —
              critical here because the viewBox is only ~30 units wide
              (geographic projection coordinates), so a literal
              strokeWidth would be enormous. */}
          {/* Outline — hero and deplete both use the SAME solid stroke
              recipe (HANDOFF_STROKE_WIDTH + full strokeOpacity). No
              pathLength draw-in on hero: the outline fades in as a
              complete border so the end-of-animation state on the
              divider is pixel-identical to the deplete start on cs2-02.
              framer-motion only morphs the bbox; ink stays constant. */}
          {isHero ? (
            <motion.path
              d={INDIA_PATH}
              fill="none"
              stroke={stroke}
              strokeWidth={HANDOFF_STROKE_WIDTH}
              strokeOpacity={HANDOFF_STROKE_OPACITY}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.2, 0.7, 0.3, 1],
                delay,
              }}
            />
          ) : deplete ? (
            <motion.path
              d={INDIA_PATH}
              fill="none"
              stroke={stroke}
              strokeOpacity={depleteStrokeStart}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ strokeWidth: HANDOFF_STROKE_WIDTH }}
              animate={{ strokeWidth: EMPTY_STROKE_WIDTH }}
              transition={{
                duration: depleteFillDuration,
                ease: depleteEase,
                delay: 0,
              }}
            />
          ) : (
            <path
              d={INDIA_PATH}
              fill="none"
              stroke={stroke}
              strokeWidth={isFilled ? 1.8 : EMPTY_STROKE_WIDTH}
              vectorEffect="non-scaling-stroke"
              strokeOpacity={strokeOp}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Dashed cyan outline — draws in via stroke-dashoffset, then
              loops a slow ambient pulse. Used on hook slide after the
              morph + deplete have completed. */}
          {dashedStroke && (
            <>
              <style>{`
                @keyframes ${dashId}-draw {
                  from { stroke-dashoffset: 600; }
                  to   { stroke-dashoffset: 0; }
                }
                @keyframes ${dashId}-pulse {
                  0%   { stroke-dashoffset: 0; }
                  100% { stroke-dashoffset: -80; }
                }
              `}</style>
              <path
                d={INDIA_PATH}
                fill="none"
                stroke={stroke}
                strokeWidth={1.4}
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 4"
                style={{
                  strokeDashoffset: 600,
                  animation: `${dashId}-draw 800ms ease ${dashedDelay}s forwards, ${dashId}-pulse 8s linear ${dashedDelay + 0.8}s infinite`,
                }}
              />
            </>
          )}

          {/* Custom fill — darker tint for India (--ink-tint-3 equivalent) */}
          {customFill && (
            <motion.path
              d={INDIA_PATH}
              fill={customFill}
              stroke="none"
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.2, 0.7, 0.3, 1],
                delay: dashedDelay || 1.0,
              }}
            />
          )}
        </g>
      </svg>
    </motion.div>
  );
}
