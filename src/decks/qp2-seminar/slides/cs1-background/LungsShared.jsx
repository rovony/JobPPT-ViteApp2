import React from 'react';
import { motion } from 'framer-motion';
import lungsSvgUrl from './lungs.svg';

/**
 * LungsShared — literal port of v0's shared lung pattern.
 *
 * Two variants driven by the `variant` prop:
 *
 *   variant="hero" (slide 5, divider, right-column small):
 *     - Explicit width (260px desktop) so framer-motion has a clean
 *       bbox to morph FROM. matches v0's CaseDividerSlide `w-[240px]`.
 *     - Runs an entrance opacity+scale animation on first mount
 *       (before the user ever navigates) so the lung "arrives" on
 *       the divider. v0's CaseDividerSlide does exactly this.
 *
 *   variant="context" (slide 6, background, center big):
 *     - Explicit width (480px desktop) — the TO-bbox for the morph.
 *       matches v0's LungContextSlide `w-[400px]`.
 *     - NO initial/animate. The layoutId match IS the entrance when
 *       arriving from slide 5. When landing on slide 6 fresh, the
 *       element simply renders at its natural size — fine for
 *       direct-link / reload cases.
 *
 * Both variants share the SAME layoutId so framer matches them across
 * the LayoutGroup in DeckRunner. Layout transition is 1s cubic-bezier
 * matching v0 exactly.
 */
// Slow enough to read as a deliberate "camera pullback" rather than a
// quick snap. 1.8s feels like the lens intentionally drifting, 1s felt
// like a fast zoom. Cubic-bezier preserves the smooth acceleration.
const LAYOUT_TRANSITION = { duration: 1.8, ease: [0.4, 0, 0.2, 1] };

const DIMENSIONS = {
  hero:    { width: 'clamp(180px, 22vw, 300px)', aspectRatio: '482 / 581' },
  // Bigger on slide 6 so the lung dominates the center column and the
  // 5->6 morph reads as a strong pullback (small right -> big center).
  context: { width: 'clamp(420px, 50vw, 720px)', aspectRatio: '482 / 581' },
};

export default function LungsShared({
  layoutId = 'lung-lynch',
  variant = 'context',
}) {
  const dims = DIMENSIONS[variant] || DIMENSIONS.context;
  const isHero = variant === 'hero';

  return (
    <motion.div
      layoutId={layoutId}
      // `layout` prop in addition to `layoutId` tells framer-motion to
      // set up layout tracking eagerly on mount (before the next paint)
      // rather than after the first render. Without it there's a
      // ~1-frame window where the new element renders at its natural
      // position BEFORE the FLIP transform applies — reads as the
      // 'flicker / disappears for a sec' bug.
      layout
      initial={isHero ? { opacity: 0, scale: 0.85 } : false}
      animate={isHero ? { opacity: 1, scale: 1 } : undefined}
      transition={{
        ...(isHero ? { duration: 0.8, delay: 0.4 } : {}),
        layout: LAYOUT_TRANSITION,
      }}
      style={{
        width: dims.width,
        aspectRatio: dims.aspectRatio,
      }}
    >
      <img
        src={lungsSvgUrl}
        alt="Anatomical lungs — Patrick J. Lynch / C. Carl Jaffe, CC BY 3.0"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </motion.div>
  );
}
