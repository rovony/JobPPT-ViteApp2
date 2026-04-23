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
  hero:    { width: 'clamp(180px, 22vw, 300px)', aspectRatio: '482 / 581' },
  // 22vw / 420px max sits inside the cards row vertically (at 1920x1080
  // the row is ~515px tall; a 420px-wide lung is ~506px tall via aspect
  // ratio — fits with a small breather and doesn't trigger the
  // overflow:hidden clip on the wrapper).
  context: { width: 'clamp(280px, 22vw, 420px)', aspectRatio: '482 / 581' },
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
      initial={isHero ? { opacity: 0, scale: 0.92 } : false}
      animate={isHero ? { opacity: 1, scale: 1 } : undefined}
      transition={{
        ...(isHero ? { duration: 0.6, delay: 0.3 } : {}),
        layout: LAYOUT_TRANSITION,
      }}
      className={`lung-shared ${isHero ? 'lung-hero' : 'lung-context'}`}
      style={{
        width: dims.width,
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
