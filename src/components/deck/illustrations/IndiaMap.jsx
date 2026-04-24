import React from 'react';
import { motion } from 'framer-motion';

/**
 * IndiaMap — neon-stroke silhouette of India, refactored as a SHARED
 * element so it morphs across CS2 slides (divider → challenge) the same
 * way LungsShared morphs across CS1 slides 5 → 6.
 *
 * Two variants driven by the `variant` prop:
 *
 *   variant="hero" (slide 14, divider, right-column):
 *     - Explicit width (clamp 200–360px) so framer-motion has a clean
 *       bbox to morph FROM.
 *     - Plays the original path-draw / fill-fade animations on first
 *       mount so the map "draws in" on the divider.
 *
 *   variant="context" (slide 15, challenge, faint backdrop):
 *     - Larger explicit width (clamp 280–460px) — the TO-bbox.
 *     - Skips the path-draw entrance; relies on the layoutId match for
 *       its arrival animation when navigating from the divider.
 *     - Lower stroke + fill opacity (~0.20) so the map sits behind
 *       the slide content as a contextual backdrop, not a hero.
 *
 * Both variants share the SAME layoutId so framer's LayoutGroup in
 * DeckRunner matches them across slide transitions. The 1.8s cubic
 * "camera pullback" timing matches LungsShared exactly.
 */

const LAYOUT_TRANSITION = { duration: 1.8, ease: [0.4, 0, 0.2, 1] };

const DIMENSIONS = {
  hero:    { width: 'clamp(200px, 26vw, 360px)', aspectRatio: '440 / 660' },
  context: { width: 'clamp(280px, 32vw, 460px)', aspectRatio: '440 / 660' },
  // T8 variants — used in the slide-22 "India fills coral" climax.
  // These keep the same aspect ratio + similar size to context so the
  // shared layoutId morph reads as a fill-in, not a re-position.
  empty:   { width: 'clamp(180px, 22vw, 320px)', aspectRatio: '440 / 660' },
  filled:  { width: 'clamp(220px, 28vw, 380px)', aspectRatio: '440 / 660' },
};

export default function IndiaMap({
  layoutId = 'india-cdsco',
  variant = 'hero',
  stroke = 'var(--case, var(--cyan))',
  delay = 0.3,
  className = '',
  fillIntensity,
}) {
  const dims = DIMENSIONS[variant] || DIMENSIONS.hero;
  const isHero = variant === 'hero';
  const isEmpty = variant === 'empty';
  const isFilled = variant === 'filled';
  // Per-variant fill opacity. `fillIntensity` (0..1) overrides default
  // when supplied — used by the slide-22 T8 climax to drive a coral
  // fill-up animation.
  const fillOp = typeof fillIntensity === 'number'
    ? fillIntensity
    : isHero
      ? 0.12
      : isFilled
        ? 0.55
        : isEmpty
          ? 0.02
          : 0.06;
  const strokeOp = isEmpty ? 0.42 : isFilled ? 0.85 : 0.32;

  // Mainland India contour — stylized path, starts top (Kashmir) and
  // moves clockwise down to Kanyakumari, up through Bengal, back to top.
  const mainland = `
    M 235 40
    C 265 38 290 48 318 62
    C 340 76 352 92 348 108
    C 344 122 322 130 308 134
    C 296 140 290 156 296 170
    C 306 188 324 200 336 220
    C 348 240 354 264 352 290
    C 350 316 338 340 322 362
    C 306 384 290 406 272 430
    C 256 452 240 474 226 496
    C 214 516 206 538 200 556
    C 198 566 194 574 186 576
    C 176 578 168 570 164 556
    C 158 534 160 510 168 484
    C 176 458 188 432 200 406
    C 210 382 216 358 212 334
    C 208 310 194 290 178 276
    C 160 260 140 254 124 242
    C 108 228 96 208 92 186
    C 90 168 96 154 108 148
    C 124 142 146 148 162 142
    C 178 134 186 118 194 100
    C 202 82 214 66 232 50
    Z
  `;

  const neStates = `
    M 362 116
    C 378 114 392 120 402 132
    C 410 144 410 158 402 168
    C 394 178 380 182 366 180
    C 354 178 344 168 344 156
    C 344 142 352 128 362 116
    Z
  `;

  const sriLanka =
    'M 218 600 C 226 598 234 606 232 616 C 230 624 222 628 214 624 C 208 620 210 608 218 600 Z';

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: LAYOUT_TRANSITION }}
      className={className}
      style={{
        width: dims.width,
        aspectRatio: dims.aspectRatio,
        color: stroke,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 440 660"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Stylized map of India"
        role="img"
        style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id={`india-glow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={isHero ? 3.2 : 2.0} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter={`url(#india-glow-${variant})`}>
          {/* Fill wash */}
          {isHero ? (
            <>
              <motion.path
                d={mainland}
                fill={stroke}
                fillOpacity={0.12}
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.2, 0.7, 0.3, 1], delay: delay + 1.6 }}
              />
              <motion.path
                d={neStates}
                fill={stroke}
                fillOpacity={0.12}
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0, ease: [0.2, 0.7, 0.3, 1], delay: delay + 1.8 }}
              />
            </>
          ) : (
            <>
              <motion.path
                d={mainland} fill={stroke} stroke="none"
                initial={{ fillOpacity: isFilled ? 0 : fillOp }}
                animate={{ fillOpacity: fillOp }}
                transition={{ duration: 1.6, ease: [0.2, 0.7, 0.3, 1], delay: isFilled ? 1.0 : 0 }}
              />
              <motion.path
                d={neStates} fill={stroke} stroke="none"
                initial={{ fillOpacity: isFilled ? 0 : fillOp }}
                animate={{ fillOpacity: fillOp }}
                transition={{ duration: 1.4, ease: [0.2, 0.7, 0.3, 1], delay: isFilled ? 1.2 : 0 }}
              />
            </>
          )}

          {/* Mainland outline */}
          {isHero ? (
            <motion.path
              d={mainland}
              fill="none"
              stroke={stroke}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2.4, ease: [0.2, 0.7, 0.3, 1], delay },
                opacity:    { duration: 0.3, delay },
              }}
            />
          ) : (
            <path
              d={mainland}
              fill="none"
              stroke={stroke}
              strokeWidth={isFilled ? 2.0 : 1.6}
              strokeOpacity={strokeOp}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* NE states outline */}
          {isHero ? (
            <motion.path
              d={neStates}
              fill="none"
              stroke={stroke}
              strokeWidth={2.0}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.9, ease: [0.2, 0.7, 0.3, 1], delay: delay + 1.4 },
                opacity:    { duration: 0.3, delay: delay + 1.4 },
              }}
            />
          ) : (
            <path
              d={neStates}
              fill="none"
              stroke={stroke}
              strokeWidth={isFilled ? 1.6 : 1.4}
              strokeOpacity={Math.min(strokeOp + 0.04, 0.95)}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Sri Lanka */}
          {isHero ? (
            <motion.path
              d={sriLanka}
              fill={stroke}
              fillOpacity={0.35}
              stroke={stroke}
              strokeWidth={1.4}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: delay + 2.4 }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ) : (
            <path
              d={sriLanka}
              fill={stroke}
              fillOpacity={isFilled ? 0.5 : 0.18}
              stroke={stroke}
              strokeWidth={0.9}
              strokeOpacity={strokeOp}
            />
          )}
        </g>
      </svg>
    </motion.div>
  );
}
