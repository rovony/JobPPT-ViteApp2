import React from 'react';
import { motion } from 'framer-motion';
import LungsSvg from '../assets/lungs.svg?react';

/**
 * Lungs — single source-of-truth lung component for the CS1 anchor system.
 *
 * Per V2 §0 lung-anchor implementation spec
 * (2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/2A-Slides-CS1-Slides01-06-v2.md §0).
 * Single shared `layoutId="cs1-lung"` — framer-motion FLIP-morphs the
 * lung between every CS1 slide that renders it. Slides 6 and 8 (V2
 * spec) deliberately omit the lung as rest beats; framer-motion fades
 * the layoutId chain through those slides.
 *
 * v2-final variants — mapped to V2 §0 treatment matrix:
 *   hero          · slide 1 divider               · right · vertical · scale 1.0
 *   context       · slide 2 hook                  · right · vertical · scale 1.1 · faded
 *   foundation    · slide 3 PAH 101               · center · vertical · scale 1.6 · full
 *   trachea-axis  · slide 4 timeline              · center · ROTATED 90° · body 0.2 · trachea full
 *   ambient       · slide 5 drug+constraint       · background · scale 1.3 · opacity 0.15
 *   stress        · slide 7 disruptions           · background · scale 1.5 · opacity 0.30
 *   signature     · slide 9 exposure match        · corner · scale 0.4 · opacity 0.6
 *   closure       · slide 10 outcome+E11A         · center · scale 1.4 · full · pinable
 *   exit          · slide 11 takeaways+bridge     · right · scale 1.0 · exit-left
 *
 * Theme-aware: stroke + fill use currentColor driven by the parent's
 * color style. Adapts to light/dark via the --coral token in index.css.
 *
 * Per merck-deck CLAUDE.md "Cross-slide patterns → A. Shared-element
 * FLIP morphs": both source AND destination render motion.div with the
 * same layoutId AND the layout prop. Layout transition is slow enough
 * to read as deliberate camera-pullback, not a snap.
 */

const LAYOUT_TRANSITION = { duration: 1.8, ease: [0.4, 0, 0.2, 1] };

const DIMENSIONS = {
  hero:        { width: 'clamp(220px, 22vw, 380px)', aspectRatio: '482 / 581' },
  context:     { width: 'clamp(380px, 40vw, 720px)', aspectRatio: '482 / 581' },
  foundation:  { width: 'clamp(20rem, 38vw, 32rem)', aspectRatio: '482 / 581' },
  // Trachea-axis: HORIZONTAL aspect ratio (rotated 90deg makes the
  // trachea become a horizontal axis). Width fills more of the slide
  // horizontally; the rotation transform happens via the rotate prop.
  'trachea-axis': { width: 'clamp(28rem, 60vw, 48rem)', aspectRatio: '482 / 581' },
  ambient:     { width: 'clamp(18rem, 32vw, 28rem)', aspectRatio: '482 / 581' },
  stress:      { width: 'clamp(22rem, 36vw, 32rem)', aspectRatio: '482 / 581' },
  signature:   { width: 'clamp(8rem, 14vw, 12rem)',  aspectRatio: '482 / 581' },
  closure:     { width: 'clamp(18rem, 32vw, 28rem)', aspectRatio: '482 / 581' },
  exit:        { width: 'clamp(220px, 22vw, 380px)', aspectRatio: '482 / 581' },
};

// Variant → CSS class. The class drives per-variant tissue/detail/stroke
// opacity so the lung body can fade independently of the bronchi (the
// V2 §0 trachea-as-axis treatment) without requiring SVG path surgery.
const VARIANT_CLASS = {
  hero:           'lung-hero',
  context:        'lung-context',
  foundation:     'lung-foundation',
  'trachea-axis': 'lung-trachea-axis',
  ambient:        'lung-ambient',
  stress:         'lung-stress',
  signature:      'lung-signature',
  closure:        'lung-closure',
  exit:           'lung-exit',
};

type LungsProps = {
  layoutId?: string;
  variant?: string;
  color?: string;
  className?: string;
  widthOverride?: string;
  heightConstrained?: boolean;
  opacity?: number;
  rotation?: number;
  bodyOpacity?: number;
};

export default function Lungs({
  layoutId = 'cs1-lung',
  variant = 'hero',
  color = 'var(--xc-case-1, var(--coral))',
  className = '',
  widthOverride,
  heightConstrained = false,
  opacity,
  // V2 §0 additions:
  rotation = 0,            // degrees: 0 (upright) | 90 (trachea-as-axis) | -90
  bodyOpacity,             // override lung-tissue opacity (default per variant CSS)
}: LungsProps) {
  const dims = DIMENSIONS[variant] || DIMENSIONS.hero;
  const isHero = variant === 'hero';
  const variantClass = VARIANT_CLASS[variant] || 'lung-context';

  return (
    <motion.div
      layoutId={layoutId}
      layout
      initial={isHero ? { scale: 0.92 } : false}
      animate={isHero ? { scale: 1, rotate: rotation } : { rotate: rotation }}
      transition={{
        ...(isHero ? { duration: 0.6, delay: 0.3 } : {}),
        rotate: { duration: 1.5, ease: [0.4, 0, 0.2, 1] },
        layout: LAYOUT_TRANSITION,
      }}
      className={`lung-shared ${variantClass} ${className}`}
      style={{
        ...(heightConstrained
          ? {
              height: '100%',
              width: 'auto',
              maxHeight: '100%',
              maxWidth: '100%',
            }
          : {
              width: widthOverride || dims.width,
              maxHeight: '100%',
            }),
        aspectRatio: dims.aspectRatio,
        color,
        pointerEvents: 'none',
        userSelect: 'none',
        // bodyOpacity is forwarded via CSS custom property so the
        // scoped CSS below can read it on .lung-tissue without per-
        // path JS rewrites.
        ...(bodyOpacity != null ? { ['--lung-tissue-opacity']: bodyOpacity } : {}),
        ...(opacity != null ? { opacity } : {}),
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

/* hero (slide 1 divider) — animated entry, then settle to high contrast */
@keyframes lungTissueIn { to { opacity: var(--lung-tissue-opacity, 0.18); } }
@keyframes lungDetailIn { to { opacity: 0.82; } }
@keyframes lungStrokeIn { to { opacity: 0.62; } }
@keyframes lungBreathe  { 0%,100% { opacity: var(--lung-tissue-opacity, 0.18); } 50% { opacity: 0.12; } }

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

/* context (slide 2 hook) — faded ambient */
.lung-context svg .lung-tissue-group .lung-tissue { opacity: var(--lung-tissue-opacity, 0.18); }
.lung-context svg .lung-detail-group .lung-detail { opacity: 0.82; }
.lung-context svg .lung-stroke-group > path,
.lung-context svg .lung-other-group  > path       { opacity: 0.62; }

/* foundation (slide 3 PAH 101) — center hero, full contrast */
.lung-foundation svg .lung-tissue-group .lung-tissue { opacity: var(--lung-tissue-opacity, 0.22); }
.lung-foundation svg .lung-detail-group .lung-detail { opacity: 0.92; }
.lung-foundation svg .lung-stroke-group > path,
.lung-foundation svg .lung-other-group  > path       { opacity: 0.78; }

/* trachea-axis (slide 4 timeline) — body deeply muted, bronchi/trachea
   stay visible as the axis. The rotation is applied via Framer Motion
   on motion.div; this CSS handles the body-vs-detail opacity split. */
.lung-trachea-axis svg .lung-tissue-group .lung-tissue { opacity: var(--lung-tissue-opacity, 0.10); }
.lung-trachea-axis svg .lung-detail-group .lung-detail { opacity: 0.85; }
.lung-trachea-axis svg .lung-stroke-group > path,
.lung-trachea-axis svg .lung-other-group  > path       { opacity: 0.55; }

/* ambient (slide 5 drug+constraint) — barely visible decorative ghost */
.lung-ambient svg .lung-tissue-group .lung-tissue { opacity: var(--lung-tissue-opacity, 0.08); }
.lung-ambient svg .lung-detail-group .lung-detail { opacity: 0.32; }
.lung-ambient svg .lung-stroke-group > path,
.lung-ambient svg .lung-other-group  > path       { opacity: 0.22; }

/* stress (slide 7 disruptions) — background presence with tension */
.lung-stress svg .lung-tissue-group .lung-tissue { opacity: var(--lung-tissue-opacity, 0.14); }
.lung-stress svg .lung-detail-group .lung-detail { opacity: 0.55; }
.lung-stress svg .lung-stroke-group > path,
.lung-stress svg .lung-other-group  > path       { opacity: 0.38; }

/* signature (slide 9 exposure match) — corner motif, subtle */
.lung-signature svg .lung-tissue-group .lung-tissue { opacity: var(--lung-tissue-opacity, 0.20); }
.lung-signature svg .lung-detail-group .lung-detail { opacity: 0.75; }
.lung-signature svg .lung-stroke-group > path,
.lung-signature svg .lung-other-group  > path       { opacity: 0.55; }

/* closure (slide 10 outcome+E11A) — full presence, anatomy-pinable */
.lung-closure svg .lung-tissue-group .lung-tissue { opacity: var(--lung-tissue-opacity, 0.20); }
.lung-closure svg .lung-detail-group .lung-detail { opacity: 0.88; }
.lung-closure svg .lung-stroke-group > path,
.lung-closure svg .lung-other-group  > path       { opacity: 0.72; }

/* exit (slide 11 takeaways+bridge) — opening size, ready to leave */
.lung-exit svg .lung-tissue-group .lung-tissue { opacity: var(--lung-tissue-opacity, 0.18); }
.lung-exit svg .lung-detail-group .lung-detail { opacity: 0.82; }
.lung-exit svg .lung-stroke-group > path,
.lung-exit svg .lung-other-group  > path       { opacity: 0.62; }

@media (prefers-reduced-motion: reduce) {
  .lung-hero svg .lung-tissue-group .lung-tissue,
  .lung-hero svg .lung-detail-group .lung-detail,
  .lung-hero svg .lung-stroke-group > path,
  .lung-hero svg .lung-other-group  > path { animation: none; }
  .lung-hero svg .lung-tissue-group .lung-tissue { opacity: var(--lung-tissue-opacity, 0.18); }
  .lung-hero svg .lung-detail-group .lung-detail { opacity: 0.82; }
  .lung-hero svg .lung-stroke-group > path,
  .lung-hero svg .lung-other-group  > path       { opacity: 0.62; }
}
`;
