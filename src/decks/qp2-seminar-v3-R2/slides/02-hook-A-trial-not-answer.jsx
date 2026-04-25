import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import TitleLayout from '@/components/deck/layouts/TitleLayout';

/**
 * 02-hook-A — "When the trial isn't the answer."  (~35 sec)
 *
 * REFERENCE IMPLEMENTATION for v3+ editorial title-class slides.
 * Other agents touching v3-R2 hooks/dividers should study this file
 * AND read merck-deck/CLAUDE.md "Slide Design Patterns Library" first.
 *
 * Register: editorial dark-cinema title card. NOT centered-stack,
 * NOT TED, NOT McKinsey. Asymmetric composition: chapter mark (TL)
 * → asymmetric headline (centered vertical band) → subtitle →
 * three HeroTile-style structural-mark cards (under subtitle).
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
 *   - "OPEN · 02"           → eyebrow (10-13px) — chapter mark
 *   - "When the trial / isn't the answer." → hook override (32-72px) — thesis
 *   - subtitle prose         → lead (16-28px) — framing line
 *   - "UNTRIALABLE/UNAVAILABLE/UNBUILT" → eyebrow (10-13px) in HeroTile cards
 *
 * Case color: unset (open segment). --case defaults to --amber so the
 * footer line uses amber tint. Override on case dividers via data-case.
 *
 * BOUNDING-BOX AUDIT (re-validate on every coordinate change)
 *   Zone               x-range            y-range          Notes
 *   ─────────────────  ─────────────      ─────────────    ─────
 *   Chapter mark TL    0 to ~120px        0 to ~30px       opaque
 *   Subtitle           under headline                 after headline   lead size, 52ch max
 *   Headline band      clamp(12%) to right-pad        55% ± lineHeight   centered vertical
 *   Mark cards         inside headline left-anchor     under subtitle   flex-wrap, HeroTile
 *   No two zones share x AND y overlap at any tested viewport.
 */

const MARKS = [
  { label: 'UNTRIALABLE' },
  { label: 'UNAVAILABLE' },
  { label: 'UNBUILT' },
];

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
      {/* slide purpose: thesis hook · duration: 35 sec · prev: title · next: agenda or case map */}
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
              fontSize: 'clamp(2rem, min(4.4vw, 7vh), 4.5rem)',
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
              maxWidth: '52ch',
            }}
            {...fade(0.8)}
          >
            Three case studies where the evidence had to come from
            the model, not the clinic.
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
            {MARKS.map((m, i) => (
              <motion.div
                key={m.label}
                style={{
                  minWidth: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid color-mix(in srgb, var(--amber) 36%, transparent)',
                  borderRadius: 'var(--radius-md)',
                  background: 'color-mix(in srgb, var(--amber) 6%, transparent)',
                  padding: 'var(--space-2) var(--space-4)',
                }}
                {...fade(1.1 + i * 0.15)}
              >
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
            ))}
          </div>
        </div>

        {/* ─── Zone 5 — Bottom-left provenance: inherited from TitleLayout ─── */}
        {/* ─── Zone 6 — Bottom-right: intentionally empty ─── */}
      </div>
    </TitleLayout>
  );
}
