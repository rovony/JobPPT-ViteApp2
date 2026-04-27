// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import TitleLayout from '@/components/deck/layouts/TitleLayout';
import CASES from '../_shared/cases';
import CaseCard from '../_shared/CaseCard';

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
 *   Original subtitle phrasing was "the evidence had to come from the
 *   model, not the clinic." That framing leans pharmacometrics and
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
 * Speaker-paced reveal: marks fade in at 16s / 37s / 55s — math-locked
 * to when the spoken script lands "untrialable" / "unavailable" /
 * "unbuilt" at 130 wpm with 1.5-sec ⏸ pauses (75-sec slide budget).
 * Math: word position × 0.462 sec/word + accumulated pauses. Slide
 * builds *with* the voice, not before it. Notes 🧷 cues give the
 * speaker target seconds for each word.
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

        {/* ─── Zone 3 — vertical stack matching slide 01's card position
             Row 1: 3 case cards (full-width 3-col grid, IDENTICAL to slide
                    01 — same component, same gap, same width, same vertical
                    position via the outer flex column). Cards persist via
                    shared layoutId — they never leave when slide 01 → 02.
             Row 2: 3 badges (full-width 3-col grid, each badge below its
                    matching card). Each badge fades in at 16/37/55s.
             Connectors: SVG layer overlaying rows 1+2. One L-shaped path
                    per case (90° elbow) draws from card-bottom to badge-
                    top at the same time the badge fades in.
             Row 3: headline + subtitle (right-aligned, centered, BELOW
                    the badges). Visible from frame 0 (before first badge).
        ─── */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(var(--space-6), 14%, 18%)',
            left: 'clamp(var(--space-4), 6%, 8%)',
            right: 'clamp(var(--space-4), 6%, 8%)',
            bottom: 'clamp(var(--space-6), 10%, 12%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-4), 4vh, var(--space-8))',
          }}
        >
          {/* ROW 1 — 3 persistent cards (matches slide 01's grid 1:1) */}
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: 'var(--space-8)' }}
          >
            {CASES.map((c, i) => (
              <CaseCard key={c.id} c={c} index={i} go={go} idleAtRest={false} />
            ))}
          </div>

          {/* ROW 2 — connectors (SVG, 90° elbow) + 3 amber badges below cards.
              Wrapped in relative container so the SVG can absolutely overlay
              the gap between cards (above) and badges (below). */}
          <div style={{ position: 'relative' }}>
            {/* Connector SVG — full-width overlay; one L-path per column.
                Each path draws (strokeDashoffset 0→full) at the time-locked
                beat 16/37/55s, same speed as the badge fade (0.6s). 90°
                corner: starts at card-bottom-center, runs vertically down
                ~60% of available height, turns 90° toward the badge top
                (the slight horizontal offset is intentional editorial
                detail — the audience reads "the line LANDS on the badge").
                Strokes use the case color → amber gradient via stroke ref. */}
            <svg
              aria-hidden
              viewBox="0 0 300 80"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: 'clamp(var(--space-7), 8vh, var(--space-10))',
                pointerEvents: 'none',
                top: `calc(-1 * clamp(var(--space-4), 4vh, var(--space-8)))`,
              }}
            >
              {CASES.map((c, i) => {
                /* Each column owns 100/3 = 33.33 viewBox units of x-space.
                   center of each column: 16.67 / 50 / 83.33 (approx 50/150/250
                   in 300-wide viewBox). Ending x is offset by +6 units to
                   land on the badge with a clean 90° corner. */
                const colCenter = (i + 0.5) * (300 / 3);
                const endX = colCenter + 6;
                /* L-path: down 50, right 6, down 28 — enters badge top */
                const d = `M ${colCenter} 0 L ${colCenter} 50 L ${endX} 50 L ${endX} 78`;
                const markDelay = [16, 37, 55][i];
                return (
                  <motion.path
                    key={c.id}
                    d={d}
                    stroke={c.color}
                    strokeWidth={1.6}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { duration: 0.6, delay: markDelay, ease: [0.2, 0.7, 0.3, 1] },
                      opacity: { duration: 0.3, delay: markDelay, ease: [0.2, 0.7, 0.3, 1] },
                    }}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>

            {/* 3-col badge grid — same column structure as cards above so
                each badge sits directly below its matching card */}
            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{
                gap: 'var(--space-8)',
                marginTop: 'clamp(var(--space-7), 8vh, var(--space-10))',
              }}
            >
              {CASES.map((c, i) => {
                const markDelay = [16, 37, 55][i];
                return (
                  <motion.div
                    key={c.id}
                    {...fade(markDelay)}
                    style={{
                      minWidth: 0,
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'var(--space-2)',
                      border: '1px solid color-mix(in srgb, var(--amber) 36%, transparent)',
                      borderRadius: 'var(--radius-md)',
                      background: 'color-mix(in srgb, var(--amber) 6%, transparent)',
                      padding: 'var(--space-2) var(--space-3)',
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        left: 0, top: 0, bottom: 0,
                        width: 3,
                        background: 'var(--amber)',
                      }}
                    />
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        left: 0, right: 0, bottom: 0,
                        height: 1,
                        background: c.color,
                        opacity: 0.6,
                      }}
                    />
                    <span aria-hidden style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: 'color-mix(in srgb, var(--amber) 80%, transparent)',
                    }}>
                      <MarkIcon kind={MARKS[i].icon} />
                    </span>
                    <div className="deck-mono uppercase" style={{
                      fontSize: 'var(--fs-slide-eyebrow)',
                      letterSpacing: '0.12em',
                      whiteSpace: 'nowrap',
                      color: 'var(--cream)',
                    }}>
                      {MARKS[i].label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ROW 3 — Headline + subtitle (right-side, visible from frame 0) */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 'auto',
          }}>
          <div style={{
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            textAlign: 'right',
            maxWidth: 'min(48ch, 56%)',
          }}>
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
                {...fade(0.45)}
              >
                When the trial
              </motion.span>
              <motion.span
                style={{
                  display: 'block',
                  paddingLeft: 'clamp(0px, 2em, 8vw)',
                }}
                {...fade(0.65)}
              >
                isn't the answer.
              </motion.span>
            </h1>

            <motion.p
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-lead)',
                color: 'color-mix(in srgb, var(--cream) 78%, transparent)',
                lineHeight: 1.4,
                margin: 0,
                maxWidth: '36ch',
              }}
              {...fade(0.85)}
            >
              Three decisions where the trial that would have answered them
              couldn't be run — and{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
                clinical pharmacology
              </span>
              {' '}had to.
            </motion.p>
          </div>
          </div>
        </div>

        {/* ─── Zone 5 — Bottom-left provenance: inherited from TitleLayout ─── */}
        {/* ─── Zone 6 — Bottom-right: intentionally empty ─── */}
      </div>
    </TitleLayout>
  );
}
