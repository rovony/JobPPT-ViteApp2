import React from 'react';
import { motion } from 'framer-motion';
import LungsSvg from '../assets/lungs.svg?react';

/**
 * Lungs — repurposed from qp2-seminar-v2/cs1-background/LungsShared.jsx
 *
 * Same lung asset, two variants (hero for divider · context for the
 * disease-burden slide), shared layoutId="cs1-lung" so framer-motion
 * FLIP-morphs the lung between cs1-divider → cs1-disease.
 *
 * Per CLAUDE.md "Cross-slide patterns → A. Shared-element FLIP morphs":
 *   Both source AND destination render motion.div with the same layoutId
 *   AND the layout prop. Layout transition 1.8s — slow enough to read
 *   as a deliberate "camera pullback" rather than a quick snap.
 *
 * Theme-aware: stroke + fill use currentColor driven by the parent's
 * color: var(--coral) style. Adapts to light/dark via the --coral token
 * defined in src/styles/*.css.
 */

const LAYOUT_TRANSITION = { duration: 1.8, ease: [0.4, 0, 0.2, 1] };

const DIMENSIONS = {
  hero:    { width: 'clamp(220px, 22vw, 380px)', aspectRatio: '482 / 581' },
  context: { width: 'clamp(380px, 40vw, 720px)', aspectRatio: '482 / 581' },
};

export default function Lungs({
  layoutId = 'cs1-lung',
  variant = 'hero',
  color = 'var(--coral)',
  className = '',
}) {
  const dims = DIMENSIONS[variant] || DIMENSIONS.hero;
  const isHero = variant === 'hero';

  return (
    <motion.div
      layoutId={layoutId}
      layout
      initial={isHero ? { scale: 0.92 } : false}
      animate={isHero ? { scale: 1 } : {}}
      transition={{
        ...(isHero ? { duration: 0.6, delay: 0.3 } : {}),
        layout: LAYOUT_TRANSITION,
      }}
      className={`lung-shared ${isHero ? 'lung-hero' : 'lung-context'} ${className}`}
      style={{
        width: dims.width,
        maxHeight: '100%',
        aspectRatio: dims.aspectRatio,
        color,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      aria-hidden
    >
      <style>{SCOPED_CSS}</style>
      <LungsSvg style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }} />
    </motion.div>
  );
}

const SCOPED_CSS = `
.lung-shared { opacity: 1 !important; }
.lung-shared svg .lung-tissue-group .lung-tissue { fill: currentColor; }
.lung-shared svg .lung-detail-group .lung-detail { fill: currentColor; }
.lung-shared svg .lung-stroke-group > path,
.lung-shared svg .lung-other-group  > path { stroke: currentColor; fill: currentColor; }

.lung-context svg .lung-tissue-group .lung-tissue { opacity: 0.18; }
.lung-context svg .lung-detail-group .lung-detail { opacity: 0.82; }
.lung-context svg .lung-stroke-group > path,
.lung-context svg .lung-other-group  > path       { opacity: 0.62; }

@keyframes lungTissueIn { to { opacity: 0.18; } }
@keyframes lungDetailIn { to { opacity: 0.82; } }
@keyframes lungStrokeIn { to { opacity: 0.62; } }
@keyframes lungBreathe  { 0%,100% { opacity: 0.18; } 50% { opacity: 0.12; } }

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
