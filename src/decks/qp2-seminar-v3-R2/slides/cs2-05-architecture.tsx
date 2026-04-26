// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import CS2MoaCard from './cs2-shared/CS2MoaCard';
import CS2CompetitorStrip from './cs2-shared/CS2CompetitorStrip';
import CS2SomaticGermlineViz from './cs2-shared/CS2SomaticGermlineViz';

/**
 * CS2 Slide 6 · Architecture — Mechanism is the foundation.
 *
 * Design language matches cs2-disease-background:
 * - SlideGrid + SlideParts (Eyebrow / Headline / Subhead / Viz / Footer)
 * - 2-column composition: MoaCard left, somatic-vs-germline contrast right
 * - Contrast cards use 1px cream-hairline + panel-mix 70% chrome
 * - Inter body in cream-muted, Fraunces italic for emphasis
 * - Amber message band at bottom
 *
 * The MOA card on the left morphs into the lead pillar on slide 7
 * via shared layoutId="cs2-moa-pillar".
 */

const C = {
  cyan: 'var(--cyan)',
  amber: 'var(--amber)',
  cream: 'var(--cream)',
  creamMuted: 'var(--cream-muted)',
  creamFaint: 'var(--cream-faint)',
  hairline: 'var(--cream-hairline)',
};

const EASE = [0.2, 0.7, 0.3, 1];

export default function CS2Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Architecture — Mechanism is the foundation</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Mechanism is the{' '}
        <span style={{ color: C.cyan, fontStyle: 'italic', fontWeight: 700 }}>foundation.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={110} size="lead">
        Somatic IDH1 R132 doesn't depend on the host's genetics. Same biology, every population.
      </Subhead>

      <Viz>
        <div ref={ref} style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          gap: 'var(--space-4)',
          minHeight: 0, minWidth: 0,
        }}>
          {/* Hero zone — 2-col grid 1fr/1fr (50/50 fixed) per user feedback
              2026-04-26 to fix MoaCard-pathway-overflowing-into-competitor
              -strip overlap bug. gridTemplateRows: minmax(0,1fr) prevents
              row-height blowout from intrinsic content; min-height: 0 +
              overflow: hidden on each column constrains content to fit. */}
          <div style={{
            flex: 1, minHeight: 0, minWidth: 0,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gridTemplateRows: 'minmax(0, 1fr)',
            gap: 'var(--space-4)',
            alignItems: 'stretch',
          }}>
            {/* MoaCard column — 50% fixed; min-height + overflow keep content boxed */}
            <div style={{
              minWidth: 0, minHeight: 0,
              display: 'flex', overflow: 'hidden',
            }}>
              <CS2MoaCard variant="foundation" style={{ flex: 1 }} />
            </div>

            {/* Argument column — somatic vs germline cell-row visualization
                (3-cell row: germline=all marked, somatic=only tumor marked) */}
            <div style={{
              minWidth: 0, minHeight: 0,
              display: 'flex', overflow: 'hidden',
            }}>
              <CS2SomaticGermlineViz delay={reduced ? 0 : 0.85} />
            </div>
          </div>

          {/* IDH-inhibitor competitor strip — preempts "are there others?" probes */}
          <CS2CompetitorStrip delay={reduced ? 0 : 1.0} />

          {/* Amber message band — centered content, rotated-square marker */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE, delay: reduced ? 0 : 1.4 }}
            style={{
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--amber) 12%, transparent)',
              border: `1px solid color-mix(in srgb, var(--amber) 32%, transparent)`,
              borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'var(--space-3)',
            }}
          >
            <span aria-hidden style={{
              transform: 'rotate(45deg)', width: 12, height: 12,
              background: C.amber, flex: '0 0 auto',
            }} />
            <div className="deck-display" style={{
              fontStyle: 'italic',
              fontSize: 'var(--fs-slide-tagline)',
              color: C.cream, lineHeight: 1.4,
              textAlign: 'center',
            }}>
              <span style={{ color: C.amber, fontWeight: 600 }}>Mechanism is the foundation.</span>{' '}
              Statistics confirm what mechanism predicts.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.6}
        kicker="Case 02 · MOA — the foundation"
        tagline=""
        source="Dang Cancer Cell 2009 · Figueroa Cancer Cell 2010 · ICH E5(R1)"
      />
    </SlideGrid>
  );
}

// ContrastCard helper REMOVED 2026-04-26 — replaced by CS2SomaticGermlineViz
// which carries the argument visually (3-cell row schematic) rather than as
// stacked text cards. Backup of pre-revision file at git HEAD~1.
