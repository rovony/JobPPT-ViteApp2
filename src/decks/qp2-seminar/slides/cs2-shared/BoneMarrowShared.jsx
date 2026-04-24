import React, { useId } from 'react';
import { motion } from 'framer-motion';
import BoneMarrowSvg from '../../assets/cs2/bone-marrow.svg?react';

/**
 * BoneMarrowShared — REAL Cancer Research UK bone-marrow cross-section
 * (CRUK file 462), recolored to the deck's neon-on-dark theme and
 * augmented with an IDH1 R132 hotspot annotation in the context variant.
 *
 * Shared element across CS2 slides:
 *   • slide 14 (divider) — variant="hero", small marginal seed
 *   • slide 16 (background) — variant="context", full-size anatomical
 *     anchor with the mutation hotspot called out
 *   • framer-motion's layoutId morphs the SVG bbox between the two.
 *
 * Why we use the source SVG instead of redrawing one:
 *   • the CRUK illustration shows real trabecular/cortical anatomy,
 *     marrow vasculature, hematopoietic detail. A redraw flattens that
 *     and makes IDH1 mutation feel like a logo, not a tissue site.
 *   • the asset is ~518KB but it's the ONE biology image in CS2, and
 *     it carries the "the drug target lives here" narrative.
 *
 * Recoloring strategy:
 *   The source uses many grayscale fills (#D9-#E8). We tint the whole
 *   SVG to neon cyan via a single SVG <feColorMatrix> filter applied
 *   through CSS — preserves the tonal depth instead of flattening every
 *   path to one color (which would erase the anatomical hierarchy).
 *
 *   The dark-theme contrast comes from inverting first, then mapping the
 *   resulting "negative" lightness onto a cyan/teal hue. End result reads
 *   like a duotone medical scan glowing on a dark panel.
 */

const LAYOUT_TRANSITION = { duration: 1.6, ease: [0.4, 0, 0.2, 1] };

const DIMENSIONS = {
  hero:    { width: 'clamp(110px, 14vw, 200px)' },
  context: { width: 'clamp(220px, 26vw, 360px)' },
};

export default function BoneMarrowShared({
  layoutId = 'bone-marrow-cs2',
  variant = 'hero',
  /** Tint color for the duotone recoloring. Defaults to deck cyan. */
  tone = 'var(--cyan)',
  /** Color used for the IDH1 R132 hotspot overlay. */
  hotspotColor = 'var(--coral)',
  delay = 0.4,
  className = '',
}) {
  const dims = DIMENSIONS[variant] || DIMENSIONS.hero;
  const isHero = variant === 'hero';
  const filterId = useId().replace(/[:]/g, '');

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{ layout: LAYOUT_TRANSITION }}
      className={className}
      style={{
        position: 'relative',
        width: dims.width,
        aspectRatio: '375 / 444.333', // matches source viewBox
        color: tone,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      aria-hidden
    >
      {/* Off-screen SVG <defs> hosting the duotone color filter.
          Using an SVG filter (not a CSS filter) gives us precise channel
          control via feColorMatrix — way better than chained CSS hue-rotate
          gymnastics on a grayscale source. */}
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute', pointerEvents: 'none' }}
        aria-hidden
      >
        <defs>
          <filter id={`bm-duotone-${filterId}`} colorInterpolationFilters="sRGB">
            {/* Step 1: invert luminance into RGB while PRESERVING source alpha.
                Old version wrote alpha = 1 - luma, which turned every
                transparent background pixel into opaque "white" that step 2
                then tinted cyan — producing a solid cyan rectangle around
                the diagram. New matrix:
                  R' = G' = B' = (1 - 0.299R - 0.587G - 0.114B)
                  A' = source A
                Light grays → near-black, dark outlines → bright; transparent
                stays transparent. */}
            <feColorMatrix
              type="matrix"
              values="
                -0.299 -0.587 -0.114 0 1
                -0.299 -0.587 -0.114 0 1
                -0.299 -0.587 -0.114 0 1
                 0      0      0     1 0
              "
            />
            {/* Step 2: tint inverted gray to cyan; alpha unchanged.
                R≈0.05, G≈0.85, B≈0.95 → matches the deck's --cyan. */}
            <feColorMatrix
              type="matrix"
              values="
                0.05 0.05 0.05 0 0
                0.85 0.85 0.85 0 0
                0.95 0.95 0.95 0 0
                0    0    0    1 0
              "
            />
          </filter>
        </defs>
      </svg>

      {/* Animated entrance — fade + subtle scale on first mount per variant.
          The shared layoutId still drives the morph between hero and context
          when navigating slides; this layer handles only first-paint feel. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: isHero ? 0.9 : 1.1,
          ease: [0.2, 0.7, 0.3, 1],
          delay,
        }}
        style={{
          width: '100%',
          height: '100%',
          filter: `url(#bm-duotone-${filterId})`,
        }}
      >
        <BoneMarrowSvg
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </motion.div>

      {/* Soft cyan glow halo behind the bone — sells the "this is luminous"
          medical-imaging vibe and anchors the eye on dark slides. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-8%',
          background: `radial-gradient(ellipse at center, color-mix(in srgb, ${tone} 28%, transparent) 0%, transparent 65%)`,
          filter: 'blur(14px)',
          zIndex: -1,
          opacity: isHero ? 0.45 : 0.7,
        }}
      />

      {/* IDH1 R132 hotspot overlay — only in the context variant.
          Positioned over the medullary cavity (≈45% from left, 38% down).
          Uses absolute positioning with percentages so it follows the
          SVG's preserveAspectRatio scaling without coordinate math. */}
      {!isHero && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1],
              delay: delay + 1.0,
            }}
            style={{
              position: 'absolute',
              left: '46%',
              top: '38%',
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: hotspotColor,
              boxShadow: `0 0 22px ${hotspotColor}, 0 0 40px color-mix(in srgb, ${hotspotColor} 50%, transparent)`,
              transform: 'translate(-50%, -50%)',
            }}
          />
          {/* Pulse halo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: [0.9, 1.7, 0.9], opacity: [0.7, 0, 0.7] }}
            transition={{
              duration: 2.6,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: delay + 1.6,
            }}
            style={{
              position: 'absolute',
              left: '46%',
              top: '38%',
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: `1.5px solid ${hotspotColor}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
          {/* Mutation label — leader line + text */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: delay + 1.4 }}
            className="deck-mono uppercase"
            style={{
              position: 'absolute',
              left: 'calc(46% + 28px)',
              top: '36%',
              transform: 'translateY(-50%)',
              fontSize: 'var(--fs-card-label)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: hotspotColor,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              textShadow: '0 0 8px rgba(0,0,0,0.65)',
            }}
          >
            IDH1 R132
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
