// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import TitleLayout from '@/components/deck/layouts/TitleLayout';

/**
 * 02-hook-A — "When the trial isn't the answer."  (~75 sec)
 *
 * REFERENCE IMPLEMENTATION for v3+ editorial title-class slides.
 * Other agents touching v3-R2 hooks/dividers should study this file
 * AND read merck-deck/CLAUDE.md "Slide Design Patterns Library" first.
 *
 * Register: editorial dark-cinema title card. NOT centered-stack,
 * NOT TED, NOT McKinsey. Asymmetric composition: chapter mark (TL)
 * → asymmetric headline (centered vertical band) → subtitle →
 * three HeroTile-style structural-mark cards (icon + uppercase mono
 * label + case-color foreshadow hairline) under subtitle.
 *
 * Variant note (preserved for future Pharmacometrics fork):
 *   Original subtitle phrasing leaned heavily on model-vs-clinic language.
 *   That framing leans pharmacometrics and
 *   was softened (see Phase A audit 2026-04-26) for the ClinPharm
 *   variant. When forking to the Pharmacometrics variant, restore
 *   "the model" vocabulary for methodology-first voice.
 *
 * Why bespoke absolute-positioning instead of <SlideGrid>:
 *   The asymmetric editorial register (NYT long-read opener) requires
 *   off-grid placement that SlideGrid's STANDARD_AREAS doesn't model.
 *   For body slides, prefer SlideGrid + SlideParts. Title-class hooks
 *   are the ONE place bespoke absolute-position is documented as OK —
 *   per the patterns library.
 *
 * Responsiveness contract (mandatory):
 *   - All fontSize → fluid --fs-slide-* tokens (no fixed-pt --fs-*)
 *   - All horizontal offsets → clamp() so they shrink at 375×812
 *   - All fixed widths → clamp() with viewport-units
 *   - Mark row uses flex-wrap + clamp gap so it reflows
 *   - Test at 375×812, 768×1024, 1280×720 before committing
 *
 * Annotation hierarchy used:
 *   - "OPEN · 02"           → --fs-slide-eyebrow — chapter mark
 *   - "When the trial / isn't the answer." → --fs-slide-hook — thesis
 *   - subtitle prose         → --fs-slide-lead — framing line
 *   - "UNTRIALABLE/UNAVAILABLE/UNBUILT" → --fs-slide-eyebrow in HeroTile cards
 *
 * Mark icons (custom inline SVGs in Lucide visual idiom — single-stroke,
 * 24×24 viewBox, stroke 1.5, currentColor, no fills). Pattern source:
 * Magic 21st_magic_component_inspiration "three pillars editorial cards"
 * — icon-before-text + accent-color primitive. 2026-04-26.
 *   - Clipboard + diagonal strike → UNTRIALABLE (the protocol that can't run)
 *   - Globe + dashed marker      → UNAVAILABLE (the region the trial doesn't reach)
 *   - Triangular node lattice    → UNBUILT (the architecture missing one node)
 *
 * Case-color foreshadow: each mark carries a 1px bottom hairline in its
 * corresponding case color (coral CS1 / cyan CS2 / sage CS3) so the
 * audience subliminally meets the case-color cascade three slides early.
 *
 * Reveal: marks fade in progressively at 1.2s / 1.6s / 2.0s.
 * (Originally speaker-paced at 16s/37s/55s, but sped up for normal viewing).
 *
 * Case color: unset (open segment). --case defaults to --amber so the
 * footer line uses amber tint. Override on case dividers via data-case.
 *
 * BOUNDING-BOX AUDIT (re-validate on every coordinate change)
 *   Zone               x-range            y-range          Notes
 *   ─────────────────  ─────────────      ─────────────    ─────
 *   Chapter mark TL    0 to ~120px        0 to ~30px       opaque
 *   Headline band      clamp(12%) to right-pad        55% ± lineHeight   centered vertical
 *   Subtitle           under headline                 after headline   lead size, 60ch max
 *   Mark cards         inside headline left-anchor     under subtitle   flex-wrap, HeroTile
 *   Mark icon          inside mark, left of label     vertical center  20px, amber 80%
 *   Mark hairline      bottom of mark, full width     1px              foreshadow color
 *   No two zones share x AND y overlap at any tested viewport.
 */

const MARKS = [
  { label: 'UNTRIALABLE', foreshadow: 'var(--coral)', icon: 'clipboard-strike' },
  { label: 'UNAVAILABLE', foreshadow: 'var(--cyan)',  icon: 'globe-gap' },
  { label: 'UNBUILT',     foreshadow: 'var(--sage)',  icon: 'lattice-dashed' },
];

/**
 * Mark icon set — custom inline SVGs in Lucide visual idiom.
 * 24×24 viewBox, stroke=currentColor (inherits amber 80% from parent),
 * stroke-width=1.5, stroke-linecap/linejoin=round, fill=none. Single
 * file source-of-truth; if the deck adds more hooks they share the set.
 */
function MarkIcon({ kind }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  if (kind === 'clipboard-strike') {
    return (
      <svg {...props}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <rect x="9" y="1" width="6" height="4" rx="1" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="15" y2="15" />
        <line x1="4" y1="4" x2="20" y2="20" />
      </svg>
    );
  }
  if (kind === 'globe-gap') {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="9" ry="4" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <circle cx="16" cy="14" r="1.8" strokeDasharray="2 2" />
      </svg>
    );
  }
  // 'lattice-dashed'
  return (
    <svg {...props}>
      <line x1="12" y1="6" x2="6" y2="17" />
      <line x1="12" y1="6" x2="18" y2="17" />
      <line x1="6" y1="17" x2="18" y2="17" />
      <circle cx="12" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="6" cy="17" r="2" fill="currentColor" stroke="none" />
      <circle cx="18" cy="17" r="2" strokeDasharray="2 2" />
    </svg>
  );
}

export default function HookATrialNotAnswer({ deck }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const go = isInView && !prefersReduced;

  const fade = (delay) => ({
    initial: { opacity: 0 },
    animate: go ? { opacity: 1 } : { opacity: 1 },
    transition: { duration: 0.6, delay, ease: [0.2, 0.7, 0.3, 1] },
  });

  return (
    <TitleLayout deck={deck}>
      {/* slide purpose: thesis hook · duration: 75 sec · prev: title · next: career arc */}
      <div
        ref={ref}
        className="relative h-full w-full"
        style={{ overflow: 'hidden' }}
      >
        {/* ─── Zone 1 — Top-left CHAPTER MARK ─── */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          {...fade(0.1)}
        >
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: '0.08em',
              color: 'var(--cream-muted)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            OPEN · 02
          </div>
          <div
            aria-hidden
            style={{
              width: 64,
              height: 'var(--stroke-hair)',
              background: 'var(--cream-faint)',
              marginTop: 'var(--space-2)',
            }}
          />
        </motion.div>

        {/* Zone 2 (top-right context line) intentionally removed —
            it was a linter/agent unauthorized add. Top-right is reserved
            for chrome only on this slide. See Stewardship rule in
            merck-deck/CLAUDE.md. */}

        {/* ─── Zone 3 — HEADLINE (the anchor) ─── */}
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: 'clamp(var(--space-4), 12%, 12%)',
            right: 'var(--space-4)',
            transform: 'translateY(-50%)',
          }}
        >
          <h1
            className="deck-display"
            style={{
              fontSize: 'var(--fs-slide-hook)',
              lineHeight: 0.95,
              fontWeight: 'var(--fw-display-md)',
              color: 'var(--cream)',
              letterSpacing: '-0.015em',
              margin: 0,
            }}
          >
            <motion.span
              style={{ display: 'block' }}
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.2, 0.7, 0.3, 1] }}
            >
              When the trial
            </motion.span>
            <motion.span
              style={{
                display: 'block',
                /* Editorial second-line indent — fluid so the indent shrinks
                   on narrow viewports instead of pushing the line off-screen */
                paddingLeft: 'clamp(0px, 3em, 12vw)',
              }}
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.2, 0.7, 0.3, 1] }}
            >
              isn't the answer.
            </motion.span>
          </h1>

          {/* ─── Subtitle — thesis framing line ─── */}
          <motion.p
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-lead)',
              color: 'color-mix(in srgb, var(--cream) 78%, transparent)',
              lineHeight: 1.35,
              margin: 0,
              marginTop: 'var(--space-4)',
              maxWidth: '60ch',
            }}
            {...fade(0.8)}
          >
            Three cases. Three trial limits. Three{' '}
            <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
              clinical pharmacology
            </span>
            {' '}answers.
          </motion.p>

          {/* ─── Zone 4 — STRUCTURAL PROMISE (three marks) ─── */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',           /* reflow on narrow viewports */
              gap: 'clamp(var(--space-3), 4vw, var(--space-10))', /* fluid gap shrinks on mobile */
              marginTop: 'var(--space-7)',
            }}
          >
            {MARKS.map((m, i) => {
              /* Sped up from speaker-paced reveal (16s/37s/55s) for better viewing */
              const markDelay = [1.2, 1.6, 2.0][i];
              return (
                <motion.div
                  key={m.label}
                  style={{
                    minWidth: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    border: '1px solid color-mix(in srgb, var(--amber) 36%, transparent)',
                    borderRadius: 'var(--radius-md)',
                    background: 'color-mix(in srgb, var(--amber) 6%, transparent)',
                    padding: 'var(--space-2) var(--space-4)',
                  }}
                  {...fade(markDelay)}
                >
                  {/* Left accent rail (vertical) */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: 'var(--amber)',
                    }}
                  />
                  {/* Bottom hairline — case-color foreshadow */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 1,
                      background: m.foreshadow,
                      opacity: 0.6,
                    }}
                  />
                  {/* Icon — inherits amber 80% from parent color */}
                  <span
                    aria-hidden
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: 'color-mix(in srgb, var(--amber) 80%, transparent)',
                    }}
                  >
                    <MarkIcon kind={m.icon} />
                  </span>
                  <div
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'var(--fs-slide-eyebrow)',
                      letterSpacing: '0.12em',
                      whiteSpace: 'nowrap',
                      color: 'var(--cream)',
                    }}
                  >
                    {m.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── Zone 5 — Bottom-left provenance: inherited from TitleLayout ─── */}
        {/* ─── Zone 6 — Bottom-right: intentionally empty ─── */}
      </div>
    </TitleLayout>
  );
}
