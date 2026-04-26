import React from 'react';
import { motion } from 'framer-motion';
// Vite `?raw` loads the SVG as a static string at build time — trusted
// local asset, no user input, no XSS surface (build-time inlining).
import lungsBrandedRaw from './lungs-branded.svg?raw';

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
  hero:    { width: 'clamp(260px, 26vw, 440px)', aspectRatio: '482 / 581' },
  // 2026-04-25 user ask (round 2): "we can make the lung bigger".
  // Was clamp(360, 32vw, 600). Bumped to clamp(420, 42vw, 800) — at
  // 1280px viewport this lifts width ~410 → ~538 (+30 %); at 1920px
  // from 600 → 800 (+33 %). Pair this with the grid ratio shift in
  // 06-case-background.jsx (cards 0.7fr → 0.55fr each, lung 1.4fr →
  // 1.9fr) so the wider lung gets a wider track to live in. The
  // motion.div also wears maxHeight:100% below so that when the row
  // is height-bound (laptop 1280x720) the aspect ratio shrinks width
  // instead of overflowing into the transition row.
  context: { width: 'clamp(420px, 42vw, 800px)', aspectRatio: '482 / 581' },
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
      layout
      // Framer Motion's projection layer writes inline style.opacity on
      // layoutId-matched siblings during the morph (entering ramps 0→1,
      // exiting ramps 1→0). `transition.opacity = { duration: 0 }` only
      // controls user-defined opacity animation; it does NOT silence the
      // projection-level crossfade. Empirically (probe-lung-opacity.mjs)
      // the entering context lung sat at ~5% style.opacity at t=50ms
      // and ramped to 1.0 over ~700ms — visible as the "ghosted lung"
      // valley around t=150–300ms while SlideTransition simultaneously
      // killed the source slide. The fix is the `!important` opacity
      // rule on `.lung-shared` in the scoped stylesheet below; CSS
      // `!important` defeats inline styles per the cascade and pins
      // the wrapper at opacity 1 for the full morph.
      initial={isHero ? { scale: 0.92 } : false}
      animate={isHero ? { scale: 1 } : {}}
      transition={{
        ...(isHero ? { duration: 0.6, delay: 0.3 } : {}),
        layout: LAYOUT_TRANSITION,
      }}
      className={`lung-shared ${isHero ? 'lung-hero' : 'lung-context'}`}
      style={{
        width: dims.width,
        // maxHeight:100 % lets the aspect ratio shrink WIDTH when the
        // grid cell is shorter than the lung's natural width × ratio
        // height. Without this, a 538px-wide lung (at 1280×720 viewport)
        // would compute 648px tall and visibly bleed into the transition
        // row below. With it, the height caps at the cell, the aspect
        // ratio recalculates a smaller width, and the lung sits clean
        // inside its column.
        maxHeight: '100%',
        aspectRatio: dims.aspectRatio,
        color: 'var(--coral)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      aria-hidden
    >
      <style>{SCOPED_CSS}</style>
      <div
        className="lung-inner"
        style={{ width: '100%', height: '100%' }}
        dangerouslySetInnerHTML={{ __html: lungsBrandedRaw }}
      />
    </motion.div>
  );
}

const SCOPED_CSS = `
/* Pin the layoutId wrapper opacity through the morph. Framer Motion
   writes inline style.opacity during shared-element transitions; CSS
   !important wins against inline (CSS cascade rule), so this rule
   silences the projection-level crossfade without disabling the
   bbox interpolation that we DO want. */
.lung-shared { opacity: 1 !important; }

.lung-shared svg { width: 100%; height: 100%; display: block; overflow: visible; }
.lung-shared svg .lung-tissue-group .lung-tissue { fill: currentColor; }
.lung-shared svg .lung-detail-group .lung-detail { fill: currentColor; }
.lung-shared svg .lung-stroke-group > path,
.lung-shared svg .lung-other-group  > path { stroke: currentColor; fill: currentColor; }

.lung-context svg .lung-tissue-group .lung-tissue { opacity: 0.18; }
.lung-context svg .lung-detail-group .lung-detail { opacity: 0.82; }
.lung-context svg .lung-stroke-group > path,
.lung-context svg .lung-other-group  > path       { opacity: 0.62; }

@keyframes lungTissueIn  { to { opacity: 0.18; } }
@keyframes lungDetailIn  { to { opacity: 0.82; } }
@keyframes lungStrokeIn  { to { opacity: 0.62; } }
@keyframes lungBreathe   { 0%,100% { opacity: 0.18; } 50% { opacity: 0.12; } }

.lung-hero svg .lung-tissue-group .lung-tissue {
  opacity: 0;
  animation: lungTissueIn 1.2s cubic-bezier(0.2,0.7,0.3,1) 0.60s forwards,
             lungBreathe  5s cubic-bezier(0.2,0.7,0.3,1) 3.0s infinite;
}
.lung-hero svg .lung-detail-group .lung-detail {
  opacity: 0;
  animation: lungDetailIn 0.45s cubic-bezier(0.2,0.7,0.3,1) forwards;
}
.lung-hero svg .lung-detail-group .lung-detail:nth-child(3n+1) { animation-delay: 1.00s; }
.lung-hero svg .lung-detail-group .lung-detail:nth-child(3n+2) { animation-delay: 1.15s; }
.lung-hero svg .lung-detail-group .lung-detail:nth-child(3n+3) { animation-delay: 1.30s; }

.lung-hero svg .lung-stroke-group > path { opacity: 0; animation: lungStrokeIn 0.5s cubic-bezier(0.2,0.7,0.3,1) 1.65s forwards; }
.lung-hero svg .lung-other-group  > path { opacity: 0; animation: lungStrokeIn 0.5s cubic-bezier(0.2,0.7,0.3,1) 1.75s forwards; }

@media (prefers-reduced-motion: reduce) {
  .lung-hero svg .lung-tissue-group .lung-tissue,
  .lung-hero svg .lung-detail-group .lung-detail,
  .lung-hero svg .lung-stroke-group > path,
  .lung-hero svg .lung-other-group  > path { animation: none; }
  .lung-hero svg .lung-tissue-group .lung-tissue { opacity: 0.18; }
  .lung-hero svg .lung-detail-group .lung-detail { opacity: 0.82; }
  .lung-hero svg .lung-stroke-group > path,
  .lung-hero svg .lung-other-group  > path       { opacity: 0.62; }
}
`;
