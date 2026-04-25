import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import RegulatoryMap, { EMA_TERRITORY, PMDA_TERRITORY } from '../components/RegulatoryMap';

/**
 * CS1 · Act 5a (Outcome — regulatory) — EMA + PMDA approved.
 *
 * v0.2 redesign 2026-04-25 per user instruction:
 *   - Lifted v2's WorldMapShared (renamed → RegulatoryMap) with EMA
 *     jurisdiction + Japan highlighted in coral
 *   - Two callout boxes (EMA · PMDA) with arrows pointing to the
 *     highlighted clusters
 *   - FDA intentionally NOT on the slide. The honest-framing about
 *     FDA-never-filed lives in speaker notes / Q&A, not in slide visuals.
 *
 * v2 design pass: candidate to upgrade to react-simple-maps with
 * geo.properties.ISO_A3 for cleaner highlighting (vs. CSS-class
 * approach inherited from v2 SVG asset). The SVG asset itself is
 * copied to v3-R2/assets/world-map.svg.
 */

export default function Cs1Decision() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · Regulatory verdicts
      </Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Two regulators accepted{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 600 }}>
          exposure-matching
        </span>{' '}
        as the regulatory bridge.
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        EMA + PMDA approved the pediatric label in 2021 on the AMB112529 +
        LTE PopPK package. The methodological argument cleared two harmonized
        regulatory frameworks.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
        }}>
          <RegulatoryMap
            highlights={[...EMA_TERRITORY, ...PMDA_TERRITORY]}
            highlightColor="var(--coral)"
          />

          {/* EMA callout — anchored top-left, arrow toward European cluster */}
          <Callout
            position={{ left: 'clamp(var(--space-3), 3vw, var(--space-6))', top: 'clamp(var(--space-3), 6vh, var(--space-6))' }}
            arrow={{ from: 'right', toX: '52%', toY: '40%' }}
            agency="EMA"
            region="European Union · 27 member states + 2 EEA"
            verdict="APPROVED · 2021"
            note="Pediatric label supported on AMB112529 + LTE PopPK package. PIP commitment EMEA-000434-PIP01-08 fulfilled."
            delay={1.0}
            reduced={reduced}
          />

          {/* PMDA callout — anchored top-right, arrow toward Japan */}
          <Callout
            position={{ right: 'clamp(var(--space-3), 3vw, var(--space-6))', top: 'clamp(var(--space-8), 14vh, var(--space-12))' }}
            arrow={{ from: 'left', toX: '85%', toY: '46%' }}
            agency="PMDA"
            region="Japan"
            verdict="APPROVED · 2021"
            note="Pediatric extrapolation argument accepted in parallel with EMA — same Clin Pharm package, second favorable verdict."
            delay={1.3}
            reduced={reduced}
          />
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Case 01 · Outcome (regulatory) — two harmonized frameworks said yes"
        tagline="Same dossier, two agencies, one methodological argument."
        source="Source · EMA Volibris EPAR 2021 · PMDA pediatric label 2021 · Okour 2023 J Clin Pharmacol"
      />
    </SlideGrid>
  );
}

/* ─────────── Callout card with anchor arrow ─────────── */
function Callout({ position, arrow, agency, region, verdict, note, delay, reduced }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.3, 1] }}
        style={{
          position: 'absolute',
          ...position,
          width: 'clamp(13rem, 22vw, 18rem)',
          maxWidth: 'clamp(13rem, 22vw, 18rem)',
          border: '1px solid color-mix(in srgb, var(--coral) 38%, transparent)',
          borderLeft: '3px solid var(--coral)',
          borderRadius: 'var(--radius-md)',
          background: 'color-mix(in srgb, var(--bg) 88%, var(--coral) 6%)',
          backdropFilter: 'blur(6px)',
          padding: 'var(--space-3) var(--space-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-1)',
          zIndex: 2,
        }}
      >
        <div className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          color: 'var(--cream-faint)',
          letterSpacing: '0.1em',
        }}>
          {region}
        </div>
        <div className="deck-display" style={{
          fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)',
          color: 'var(--cream)',
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: '-0.015em',
          marginTop: 'var(--space-1)',
        }}>
          {agency}
        </div>
        <div className="deck-mono" style={{
          fontSize: 'var(--fs-slide-name)',
          color: 'var(--coral)',
          letterSpacing: '0.08em',
          fontWeight: 700,
          marginTop: 'var(--space-1)',
        }}>
          {verdict}
        </div>
        <div aria-hidden style={{
          width: '100%',
          height: 'var(--stroke-hair)',
          background: 'var(--cream-hairline)',
          marginTop: 'var(--space-2)',
        }} />
        <div className="deck-body" style={{
          fontSize: 'var(--fs-slide-subhead)',
          color: 'var(--cream)',
          opacity: 0.86,
          lineHeight: 1.45,
          marginTop: 'var(--space-1)',
        }}>
          {note}
        </div>
      </motion.div>

      {/* Arrow to map cluster — animated draw via stroke-dashoffset */}
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'visible',
        }}
        initial={{ opacity: 0 }}
        animate={reduced ? { opacity: 0.7 } : { opacity: 0.7 }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      >
        {/* Approximate arrow line — uses % SVG coords inside the viz container.
            from='right' means arrow exits the right side of the callout box. */}
      </motion.svg>
    </>
  );
}
