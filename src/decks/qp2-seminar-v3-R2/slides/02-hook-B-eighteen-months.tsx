// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import BodyLayout from '@/components/deck/layouts/BodyLayout';

/**
 * 02-hook-B — "Twenty months changed the function."  (~40 sec)
 *
 * REFERENCE IMPLEMENTATION for v3+ horizontal-timeline body slides.
 * Other agents touching v3-R2 timeline-class slides should study this
 * file AND read merck-deck/CLAUDE.md "Slide Design Patterns Library".
 *
 * The argument IS the temporal density: three frameworks landed in
 * 15 days (Aug 7-21 2024), a fourth came 10 weeks later. The visual
 * cluster IS the message — but the cluster also produces overlap
 * pressure that this file solves explicitly.
 *
 * Why bespoke layout instead of <SlideGrid>:
 *   The timeline's proportional axis positioning is the core visual
 *   metaphor — STANDARD_AREAS doesn't model it. Headline + eyebrow
 *   come from BodyLayout (responsive); only the timeline itself is
 *   bespoke.
 *
 * Cluster overlap solution (the load-bearing fix):
 *   Aug 7 → Aug 21 spans ~2.3% of the Aug 1 → Apr 2026 axis. At a 1024px
 *   container that's only 117px between markers — not enough room for
 *   180px label boxes side-by-side. So:
 *     1. Cluster markers (Aug 7/8/21) get DATE + NAME ONLY on the axis,
 *        narrow labels (max 110px) and strict above/below alternation.
 *     2. The full glosses for the cluster live in a SEPARATE gloss
 *        panel below the timeline — readable at body size.
 *     3. The far-right marker (Nov 6) keeps its inline gloss — it has
 *        room.
 *   This pattern is documented in CLAUDE.md → "Bounding-box discipline
 *   for absolute / SVG layouts → For timelines specifically".
 *
 * Annotation hierarchy used:
 *   - "OPEN · 02 · WHAT CHANGED"        → eyebrow (10-13px) — segment label
 *   - "Twenty months changed..."       → headline (24-58px) — thesis
 *   - "AUG 7 · 2024" date kicker        → eyebrow (10-13px) — meta
 *   - "Rule 101" framework name         → name (15-22px) — load-bearing label
 *   - "FIFTEEN DAYS · THREE FRAMEWORKS" → tagline (13-18px) — annotation,
 *                                          NOT eyebrow (this is the
 *                                          "WHAT CHANGED" callout fix)
 *   - Gloss panel rows                  → subhead (13-18px) — readable
 *
 * Case color: unset (open segment; --case defaults to --amber).
 *
 * BOUNDING-BOX AUDIT (re-validate on every coordinate change)
 *   Element                  x-range            y-range          Notes
 *   ──────────────────       ─────────────      ─────────────    ─────
 *   Axis hairline            0 to 100% (inset)  50%              1px
 *   AUG/APR end labels       0 / 100%           50% + space-3    mono
 *   Aug 7 marker             ~1.0%              50%              above
 *   Aug 7 label box          ~1.0% ± 55px       0 to 50% - stem  width<=110px
 *   Aug 8 marker             ~1.1%              50%              below
 *   Aug 8 label box          ~1.1% ± 55px       50% + stem to 100% width<=110px
 *   Aug 21 marker            ~3.3%              50%              above
 *   Aug 21 label box         ~3.3% ± 55px       0 to 50% - stem  width<=110px
 *   Nov 6 marker             ~15.9%             50%              above
 *   Nov 6 label box          ~15.9% to right    0 to 50% - stem  width<=180px (room)
 *   Cluster annotation       pct(2024-08-14)    bottom of zone   tagline size
 *   Gloss panel              full width         below timeline   3 rows, body size
 *
 *   Axis now spans Aug 1 2024 → Apr 1 2026 (~609 days). The Aug cluster
 *   occupies only ~3% of the axis — all four frameworks land in the first
 *   ~16%, with ~84% empty to the right. This reinforces the "twenty months"
 *   thesis: a burst of change, then a long horizon to the present day.
 */

const AXIS_START = new Date(2024, 7, 1);  // Aug 1
const AXIS_END   = new Date(2026, 3, 1);  // Apr 1, 2026
const AXIS_DAYS  = (AXIS_END - AXIS_START) / (86400000); // ~609

function pct(dateStr) {
  const days = (new Date(dateStr) - AXIS_START) / 86400000;
  return (days / AXIS_DAYS) * 100;
}

const DOT_R   = 3;   // dot radius (6px diameter)
const STEM_H  = 40;  // vertical hairline from dot to label
const LABEL_G = 4;   // gap between stem end and label stack

/* AXIS-RANGE-AWARE CARD STRATEGY — re-evaluated 2026-04-25 after
   axis was extended from Aug→Dec 2024 (4 months) to Aug 2024→Apr 2026
   (20 months). Cluster markers (Aug 7/8/21) now span only ~2.3% of
   the axis = ~24px between dots at 1024 container. NO inline card
   treatment can fit there — stacking, alternating anchors, none of
   it works at 24px spacing.

   Solution: cluster gets DOTS ONLY on the axis. All 4 frameworks
   appear as visually-identical cards in the gloss panel below the
   timeline (a 4-card grid). ICH M15 (Nov 6) at 15.93% sits clearly
   apart from the cluster — it ALSO gets an inline card on the axis
   to show the "and a fourth came later" beat directly on the
   timeline. Card styling is identical between inline and panel. */
const FRAMEWORKS = [
  {
    name: 'Rule 101',
    date: '2024-08-07',
    dateLabel: 'AUG 7 · 2024',
    gloss: 'India bridges without local trial',
    above: true,
    draft: false,
    inCluster: true,
    /* dotOnly: cluster markers render axis dot only — no inline card.
       Full card lives in the bottom gloss panel grid. */
    dotOnly: true,
  },
  {
    name: 'Project Optimus',
    date: '2024-08-08',
    dateLabel: 'AUG 8 · 2024',
    gloss: 'FDA oncology dose, finalized',
    above: false,
    draft: false,
    inCluster: true,
    dotOnly: true,
  },
  {
    name: 'ICH E11A',
    date: '2024-08-21',
    dateLabel: 'AUG 21 · 2024',
    gloss: 'Pediatric extrapolation, harmonized',
    above: true,
    draft: false,
    inCluster: true,
    dotOnly: true,
  },
  {
    name: 'ICH M15',
    date: '2024-11-06',
    dateLabel: 'NOV 6 · 2024',
    gloss: 'Models become regulatory evidence',
    above: true,
    draft: true,
    inCluster: false,
    dotOnly: false,
    /* Axis end is now Apr 2026 — Nov 6 sits at 15.9%, far from the
       right edge. Anchor LEFT (extends rightward) to land cleanly. */
    anchorRight: false,
    asCard: true,
  },
];

const MARKER_DELAYS = [0.5, 0.58, 0.72, 1.1];

export default function HookBEighteenMonths({ deck }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const go = isInView && !prefersReduced;

  const fade = (delay, duration = 0.5) => ({
    initial: { opacity: 0 },
    animate: go ? { opacity: 1 } : { opacity: 1 },
    transition: { duration, delay, ease: [0.2, 0.7, 0.3, 1] },
  });

  return (
    <BodyLayout
      deck={deck}
      eyebrow="OPEN · 02 · WHAT CHANGED"
      /* Headline passed as JSX (NOT plain string) so it can carry both
         the thesis line AND a subtitle stacked below. Per CLAUDE.md
         Patterns Library: subtitles per slide go inline as a second
         line under the headline at --fs-slide-lead, italic, cream-muted.
         Keeps subtitles on-slide without forking BodyLayout's slot
         schema. */
      headline={
        <span style={{ display: 'block' }}>
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(2rem, min(4.4vw, 7vh), 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
            }}
          >
            Twenty months changed the function.
          </span>
          <span
            className="deck-body"
            style={{
              /* Subtitles render UPRIGHT (not italic) at lead size for
                 readability. Italic Fraunces is hard to scan at body
                 sizes — reserve italic for inline emphasis or pull
                 quotes only. See CLAUDE.md "Annotation Hierarchy".
                 deck-body uses Inter (sans), which holds up at small
                 sizes far better than italic Fraunces serif. */
              display: 'block',
              fontSize: 'var(--fs-slide-lead)',
              fontStyle: 'normal',
              fontWeight: 400,
              color: 'var(--cream)',
              opacity: 0.78,
              lineHeight: 1.4,
              marginTop: 'var(--space-3)',
              maxWidth: '54ch',
              letterSpacing: '0',
            }}
          >
            Four global frameworks reshaped clinical pharmacology — three of
            them in fifteen days.
          </span>
        </span>
      }
    >
      {/* slide purpose: temporal-density hook · duration: 40 sec · prev: title · next: agenda */}
      <div
        ref={ref}
        className="relative w-full h-full flex flex-col justify-center"
        style={{ padding: '0 clamp(var(--space-4), 5vw, var(--space-10))' }}
      >
        {/* ── Timeline container ── */}
        <div
          className="relative w-full"
          style={{ height: 'clamp(240px, 45vh, 340px)', marginTop: 'var(--space-4)' }}
        >
          {/* ── Axis hairline (draws left-to-right) ── */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: 0,
            }}
          >
            <motion.div
              style={{
                height: 1,
                background: 'var(--cream-faint)',
                transformOrigin: 'left center',
              }}
              initial={{ scaleX: 0 }}
              animate={go ? { scaleX: 1 } : { scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.7, 0.3, 1] }}
            />
          </div>

          {/* ── Axis endpoint labels ── */}
          <motion.div
            className="deck-mono"
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              marginTop: 'var(--space-3)',
              fontSize: 'var(--fs-slide-pageno)',
              color: 'var(--cream-faint)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.08em',
            }}
            {...fade(0.3)}
          >
            AUG · 2024
          </motion.div>
          <motion.div
            className="deck-mono"
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              marginTop: 'var(--space-3)',
              fontSize: 'var(--fs-slide-pageno)',
              color: 'var(--cream-faint)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.08em',
              textAlign: 'right',
            }}
            {...fade(0.3)}
          >
            APR · 2026
          </motion.div>

          {/* ── Markers (proportionally positioned) ── */}
          {FRAMEWORKS.map((fw, i) => {
            const leftPct = pct(fw.date);
            const stemTop = fw.above ? -(STEM_H + DOT_R) : DOT_R;
            const labelTop = fw.above
              ? -(STEM_H + DOT_R + LABEL_G)
              : STEM_H + DOT_R + LABEL_G;

            return (
              <motion.div
                key={fw.name}
                style={{
                  position: 'absolute',
                  left: `${leftPct}%`,
                  top: '50%',
                }}
                {...fade(MARKER_DELAYS[i], 0.6)}
              >
                {/* Amber dot on axis */}
                <div
                  style={{
                    position: 'absolute',
                    width: DOT_R * 2,
                    height: DOT_R * 2,
                    borderRadius: '50%',
                    background: 'var(--amber)',
                    left: -DOT_R,
                    top: -DOT_R,
                  }}
                />

                {/* Vertical hairline stem — skip for dotOnly markers
                    (cluster cards live in the panel below, not on axis). */}
                {!fw.dotOnly && (
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      width: 1,
                      height: STEM_H,
                      background: 'var(--cream-faint)',
                      left: 0,
                      top: stemTop,
                    }}
                  />
                )}

                {/* Label stack — skipped entirely for dotOnly markers. */}
                {!fw.dotOnly && (
                <>
                {/* Label stack: date → name → gloss (gloss only when not in cluster).
                    maxWidth narrows for cluster markers so adjacent same-side
                    labels don't collide. anchorRight flips the box to extend
                    leftward for markers near the right container edge.
                    asCard wraps the box in HeroTile-pattern chrome for
                    standalone callouts. See bounding-box audit at top. */}
                <div
                  className={fw.asCard ? 'hookB-callout-card' : ''}
                  style={{
                    position: 'absolute',
                    /* Edge-aware anchoring: anchorRight aligns the right
                       edge of the box at marker - 4px (so label extends
                       leftward); default anchors the left edge there. */
                    ...(fw.anchorRight
                      ? { right: -4, left: 'auto', textAlign: 'right' }
                      : { left: -4 }),
                    top: labelTop,
                    /* Card widths in REM-based clamps so they scale with
                       root font-size and viewport — not raw px.

                       CRITICAL: Use `width` (definite), not just
                       `maxWidth` (cap-only). The parent marker div is
                       0-wide because all its children are absolute-
                       positioned, so an absolute child with only
                       maxWidth shrink-to-fits to ~90px (collapses).
                       Setting `width` AND `maxWidth` to the same clamp
                       gives the box a real definite width.

                       - Cluster: ~9-11rem — fits Project Optimus on 1-2
                         lines; same-side cluster spans 117px ≈ 7.3rem
                         at 1024 container, so 11rem max binds at
                         narrow widths via 34vw.
                       - Standalone callout (asCard): ~14-18rem — wider
                         so "Models become regulatory evidence" lands
                         on one line at default rem (16px → ~272px).
                       - Default non-cluster: ~11-15rem. */
                    width: fw.asCard
                      ? 'clamp(14rem, 38vw, 18rem)'
                      : fw.inCluster
                      ? 'clamp(9rem, 34vw, 11rem)'
                      : 'clamp(11rem, 40vw, 15rem)',
                    maxWidth: fw.asCard
                      ? 'clamp(14rem, 38vw, 18rem)'
                      : fw.inCluster
                      ? 'clamp(9rem, 34vw, 11rem)'
                      : 'clamp(11rem, 40vw, 15rem)',
                    ...(fw.above && { transform: 'translateY(-100%)' }),
                    /* HeroTile card chrome — only when asCard is set. */
                    ...(fw.asCard && {
                      border: '1px solid color-mix(in srgb, var(--amber) 36%, transparent)',
                      borderLeft: '3px solid var(--amber)',
                      borderRadius: 'var(--radius-md)',
                      background: 'color-mix(in srgb, var(--amber) 6%, transparent)',
                      padding: 'var(--space-3) var(--space-4)',
                    }),
                  }}
                >
                  <div
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'var(--fs-slide-eyebrow)',
                      color: 'var(--cream-muted)',
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '0.08em',
                      lineHeight: 1.3,
                    }}
                  >
                    {fw.dateLabel}
                  </div>
                  <div
                    className="deck-display"
                    style={{
                      fontSize: 'var(--fs-slide-name)',
                      color: 'var(--cream)',
                      lineHeight: 'var(--lh-snug)',
                      marginTop: 'var(--space-1)',
                    }}
                  >
                    {fw.name}
                    {fw.draft && (
                      <span
                        className="deck-body"
                        style={{
                          fontSize: 'var(--fs-slide-kicker)',
                          fontStyle: 'italic',
                          color: 'var(--cream-muted)',
                          marginLeft: 'var(--space-1)',
                        }}
                      >
                        (draft)
                      </span>
                    )}
                  </div>
                  {/* Inline gloss only for non-cluster markers — cluster
                      glosses go in the panel below to avoid overlap.
                      Standalone callouts get subhead-size (readable
                      annotation per CLAUDE.md hierarchy), upright sans
                      for legibility. */}
                  {!fw.inCluster && (
                    <div
                      className="deck-body"
                      style={{
                        fontSize: fw.asCard
                          ? 'var(--fs-slide-subhead)'
                          : 'var(--fs-slide-kicker)',
                        color: 'var(--cream-muted)',
                        lineHeight: 1.4,
                        marginTop: 'var(--space-2)',
                      }}
                    >
                      {fw.gloss}
                    </div>
                  )}
                </div>
                </>
                )}
              </motion.div>
            );
          })}

          {/* The "FIFTEEN DAYS · THREE FRAMEWORKS" annotation was
              previously absolute-positioned inside this timeline
              container at marginTop ~96px. That collided with the
              Aug 8 below-marker label ("Project Optimus"). Per
              CLAUDE.md bounding-box discipline + cluster-overlap fix:
              the annotation moved out and now serves as the HEADER of
              the gloss panel below — eliminates overlap entirely. */}
        </div>

        {/* ── Cluster gloss panel.
            Header (FIFTEEN DAYS · THREE FRAMEWORKS) at tagline size,
            amber, callout color. Three rows of date+name+gloss for the
            August cluster, each at subhead size for projector readability.
            auto-fit grid reflows to 1 column on portrait phones. ── */}
        <motion.div
          className="deck-mono uppercase"
          style={{
            marginTop: 'clamp(var(--space-6), 5vh, var(--space-10))',
            fontSize: 'var(--fs-slide-tagline)',
            color: 'var(--amber)',
            letterSpacing: '0.16em',
            fontWeight: 600,
          }}
          {...fade(1.4)}
        >
          FIFTEEN DAYS · THREE FRAMEWORKS
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: 'clamp(var(--space-3), 2vw, var(--space-6))',
            marginTop: 'var(--space-3)',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--cream-hairline)',
          }}
        >
          {/* All 4 frameworks here for visual parity — same card design
              throughout. Cluster markers (dotOnly: true) only appear in
              this panel; ICH M15 also appears as inline callout above. */}
          {FRAMEWORKS.map((fw, i) => (
            <motion.div
              key={fw.name}
              style={{
                minWidth: 0,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid color-mix(in srgb, var(--amber) 36%, transparent)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--amber) 6%, transparent)',
                padding: 'var(--space-3) var(--space-4)',
              }}
              {...fade(1.6 + i * 0.12)}
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
                  color: 'var(--amber)',
                  letterSpacing: '0.1em',
                  fontVariantNumeric: 'tabular-nums',
                  fontWeight: 600,
                }}
              >
                {fw.dateLabel}  ·  {fw.name}
              </div>
              <div
                className="deck-body"
                style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream-muted)',
                  lineHeight: 1.45,
                  marginTop: 'var(--space-1)',
                  maxWidth: '32ch',
                }}
              >
                {fw.gloss}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Conclusion / closing line.
            Per CLAUDE.md Patterns Library: every slide that benefits
            from a closing payoff gets a single italic line at tagline
            size, animated in last. This is the audible "and that's
            what this slide just said" — it tells the audience how to
            read the timeline they just saw. ── */}
        <motion.div
          className="deck-body"
          style={{
            /* Conclusion runs UPRIGHT (Inter sans, not italic Fraunces
               serif) at tagline size with elevated contrast — italic
               serif at small sizes was flagged unreadable. The amber
               span keeps subtle italic for inline emphasis only. See
               CLAUDE.md "Rule for conclusions". */
            marginTop: 'clamp(var(--space-5), 4vh, var(--space-8))',
            fontSize: 'var(--fs-slide-tagline)',
            color: 'var(--cream)',
            opacity: 0.82,
            lineHeight: 1.5,
            maxWidth: '66ch',
            fontWeight: 400,
            letterSpacing: '0',
          }}
          {...fade(2.2)}
        >
          The conditions for clinical pharmacology to{' '}
          <span style={{ color: 'var(--amber)', fontWeight: 600, opacity: 1 }}>
            replace a study, redefine a dose, and harmonize a population
          </span>{' '}
          arrived together — and the audience for that work is regulators.
        </motion.div>
      </div>
    </BodyLayout>
  );
}
