// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import RseStabilityCurve from './cs3-fit/RseStabilityCurve';

/**
 * Slide 27 · CS2 Fit — Sixty adults anchor a model that already knows
 * most of the answer.
 *
 * 2026-04-24 redesign (Agent D · CS2 cluster fix):
 *   • Removed the floating concentric-circle backdrop. It was a
 *     layoutId="cs3-prior-anchor" partner for slide 23's hero
 *     InformativePriorViz, but slide 23 now mounts the lymphocyte
 *     hero — so the morph never resolved and the circle just sat
 *     behind the RSE chart as visual noise (the user's "circle behind
 *     what" question). The "prior anchor" meaning has been re-housed
 *     INSIDE evidence-block 01 as a small inline glyph (≤120px tall),
 *     which is what the user asked for ("create visuals" on the
 *     evidence blocks).
 *   • Dropped rounded card chrome from EvidenceBlock + the bottom
 *     ribbon (zaj-slides v2.1 / craft-bans-and-borders). Square corners
 *     and hairline borders only.
 *   • Added small inline glyphs to each evidence block:
 *       01 · PriorAnchorGlyph — concentric N=124 outer / N=60 inner
 *       02 · SensitivityGlyph — three plateau dots over a tiny curve
 *
 * Two-column structured body (~55/45):
 *   • LEFT — Two numbered evidence blocks with inline glyphs
 *   • RIGHT — RSE stability curve (the inverted-direction bug in
 *     RseStabilityCurve was fixed in the same patch)
 *
 * Bottom ribbon — the headline-restated payoff.
 */

const ANCHOR_BULLETS = [
  'N = 124 pediatric PopPK prior · FDA-reviewed label-supporting anchor',
  'Adult Part 1 external VPC: no structural failure vs pediatric predictions',
  '%RSE plateaus beyond N ≈ 50–60 — three sensitivity tests, one conclusion',
];

export default function Cs2AspFit() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    leftLabel: 0.95,
    block01: 1.10,
    block02: 1.95,
    rightLabel: 1.10,
    curve: 1.30,
    ribbon: 3.20,
    source: 2.80,
  };

  const T = useTokens(['--teal', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="3" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--xc-case-3)" delay={D.eyebrow}>CS2 · Fit</Eyebrow>
      <Headline delay={D.headline} maxChars={56}>
        Sixty adults anchor a model that{' '}
        <span style={{ color: 'var(--xc-case-3)', fontStyle: 'italic', fontWeight: 700 }}>
          already knows
        </span>{' '}
        most of the answer.
      </Headline>
      <Subhead delay={D.subhead} maxChars={130}>
        At N = 60 the model is{' '}
        <span style={{ color: 'var(--xc-case-3)', fontWeight: 600 }}>
          as precise as at N = 94
        </span>{' '}
        for the parameters that drive dose decisions — because the information lives in the
        pediatric prior, not the adult sample alone.
      </Subhead>

      <Viz>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 1fr',
              gap: 'var(--space-7)',
              minHeight: 0,
            }}
          >
            {/* LEFT — Two evidence blocks */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                rowGap: 'var(--space-3)',
                minHeight: 0,
              }}
            >
              <motion.div
                className="xc-card-label xc-ink-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: D.leftLabel }}
              >
                Why N = 60 is enough · pediatric prior + plateau
              </motion.div>

              <EvidenceBlock
                n="01"
                label="Evidence in one block"
                tag="The adult cohort tests the model — it does not rebuild it."
                bullets={ANCHOR_BULLETS}
                delay={D.block01}
              />
            </div>

            {/* RIGHT — RSE stability curve (hairline panel · zaj-slides v2.1)
                Square corners — rounded card chrome is banned. */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                rowGap: 'var(--space-3)',
                minHeight: 0,
                border: '1px solid var(--cream-hairline)',
                borderRadius: 0,
                padding: 'var(--space-3)',
              }}
            >
              <motion.div
                className="xc-card-label"
                style={{ color: 'var(--xc-case-3)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: D.rightLabel }}
              >
                Parameter %RSE vs adult sample size · plateau beyond N ≈ 50–60
              </motion.div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 0,
                }}
              >
                <RseStabilityCurve delay={D.curve} />
              </div>
            </div>
          </div>

          {/* Bottom ribbon — borderless hairline-only band, square
              corners. Was a rounded violet-tinted card. */}
          <motion.div
            style={{
              padding: 'var(--space-3) 0 0 0',
              borderTop: '1px solid var(--cream-hairline)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: '8px 18px',
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: D.ribbon }}
          >
            <span
              className="xc-title xc-ink italic"
              style={{ fontWeight: 500, textAlign: 'center' }}
            >
              The smaller sample size doesn’t weaken the science — it{' '}
              <span style={{ color: 'var(--xc-case-3)', fontWeight: 700, fontStyle: 'normal' }}>
                clarifies where the scientific evidence actually lives
              </span>
              .
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Fit"
        source="Source · Pediatric PopPK (AALL07P4 + DFCI 11-001) · Asparlas label · sensitivity illustrative"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   EvidenceBlock — numbered chip + label/tag + bullets + inline
   glyph (≤120px tall, slotted to the right of the bullets).
   Square corners, hairline border, no decorative chrome.
   ======================================================== */
function EvidenceBlock({ n, label, tag, bullets, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        padding: '14px 18px 14px 16px',
        borderRadius: 0,
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--xc-case-3)',
        background: 'transparent',
        display: 'grid',
        gridTemplateRows: 'auto auto auto',
        rowGap: 8,
        minWidth: 0,
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            className="xc-card-label"
            style={{
              width: 28,
              height: 28,
              borderRadius: 0,
              border: '1.5px solid var(--xc-case-3)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--xc-case-3)',
            }}
          >
            {n}
          </span>
          <span
            className="xc-card-label"
            style={{ color: 'var(--xc-case-3)' }}
          >
            {label}
          </span>
        </div>
        <div
          className="xc-title xc-ink italic"
          style={{ fontWeight: 500 }}
        >
          {tag}
        </div>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridAutoRows: 'min-content',
            rowGap: 4,
            alignContent: 'start',
          }}
        >
          {bullets.map((b, i) => (
            <li
              key={i}
              className="xc-tagline xc-ink-muted"
              style={{
                display: 'grid',
                gridTemplateColumns: '14px 1fr',
                columnGap: 8,
                alignItems: 'baseline',
              }}
            >
              <span
                aria-hidden
                className="xc-mono"
                style={{
                  color: 'var(--xc-case-3)',
                  fontWeight: 700,
                }}
              >
                ›
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
    </motion.div>
  );
}
