import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import RseStabilityCurve from './cs3-fit/RseStabilityCurve';
import InformativePriorViz from './cs3-divider/InformativePriorViz';

/**
 * Slide 27 · CS3 Fit — Sixty adults anchor a model that already knows
 * most of the answer.
 *
 * Two-column structured body (~55/45):
 *   • LEFT — Two numbered evidence blocks
 *       01 · The pediatric anchor (model is FDA-reviewed, label-supporting)
 *       02 · Sensitivity analysis (illustrative — three independent tests)
 *   • RIGHT — RSE stability curve (illustrative SVG); shows the plateau
 *     beyond N ≈ 50–60 with N = 60 marker.
 *
 * Bottom ribbon — the headline-restated payoff.
 */

const ANCHOR_BULLETS = [
  'N = 124 pooled pediatric PopPK · saturable distribution · combined linear/non-linear elimination',
  '~16-day half-life · BSA / age / sex covariate structure',
  'FDA-reviewed · label-supporting (Asparlas pediatric, 2018)',
  'Adult Part 1 external VPC vs pediatric-model predictions: no structural failure',
];

const SENSITIVITY_BULLETS = [
  'Cohort-1:Cohort-2 enrollment ratio varied across scenarios → conclusion stable',
  '%RSE of key PopPK parameters not sensitive to adult N above ≈ 50–60',
  'Bootstrap replicates · pcVPC on pooled data → predictive performance unchanged',
];

export default function Slide27Case3Fit() {
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

  const T = useTokens(['--violet', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="violet" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--violet)" delay={D.eyebrow}>CS3 · Fit</Eyebrow>
      <Headline delay={D.headline} maxChars={56}>
        Sixty adults anchor a model that{' '}
        <span style={{ color: 'var(--violet)', fontStyle: 'italic', fontWeight: 700 }}>
          already knows
        </span>{' '}
        most of the answer.
      </Headline>
      <Subhead delay={D.subhead} maxChars={130}>
        At N = 60 the model is{' '}
        <span style={{ color: 'var(--violet)', fontWeight: 600 }}>
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
            gridTemplateRows: '1fr auto',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {/* Prior-anchor context backdrop — morphs IN from slide 23's
              hero illustration via shared layoutId="cs3-prior-anchor".
              Faint violet concentric rings pinned upper-right behind
              content as a "the prior is still here, anchoring this
              fit" watermark. pointer-events:none keeps it click-through.
              Hidden under 1100px to free up space on tablets where the
              two-column body needs full width. */}
          <div
            aria-hidden
            className="cs3-fit-prior-bg"
            style={{
              position: 'absolute',
              top: '38%',
              right: '-6%',
              transform: 'translateY(-50%)',
              zIndex: 0,
              opacity: 0.32,
              mixBlendMode: 'screen',
              pointerEvents: 'none',
            }}
          >
            <InformativePriorViz layoutId="cs3-prior-anchor" variant="context" />
          </div>
          <style>{`
            @media (max-width: 1100px) {
              .cs3-fit-prior-bg { display: none !important; }
            }
          `}</style>
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
                gridTemplateRows: 'auto 1fr 1fr',
                rowGap: 'var(--space-3)',
                minHeight: 0,
              }}
            >
              <motion.div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-label)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--cream-muted)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: D.leftLabel }}
              >
                Why N = 60 is enough · two evidence blocks
              </motion.div>

              <EvidenceBlock
                n="01"
                label="The pediatric anchor"
                tag="The adult data test the model — they don’t rebuild it."
                bullets={ANCHOR_BULLETS}
                delay={D.block01}
              />
              <EvidenceBlock
                n="02"
                label="Sensitivity analysis (illustrative)"
                tag="Three independent tests — all say sixty is enough."
                bullets={SENSITIVITY_BULLETS}
                delay={D.block02}
                small
              />
            </div>

            {/* RIGHT — RSE stability curve (hairline panel · zaj-slides v2.1)
                Wrapped to balance the EvidenceBlock cards on the left.
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
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-label)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--violet)',
                  fontWeight: 700,
                }}
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

          {/* Bottom ribbon */}
          <motion.div
            style={{
              padding: 'var(--space-3) var(--space-5)',
              borderRadius: 4,
              background: 'color-mix(in srgb, var(--violet) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--violet) 32%, transparent)',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.ribbon }}
          >
            <div
              className="deck-display italic"
              style={{
                fontSize: 'var(--fs-card-title)',
                color: 'var(--cream)',
                fontWeight: 500,
                letterSpacing: 'var(--ls-headline)',
              }}
            >
              The smaller sample size doesn’t weaken the science — it{' '}
              <span style={{ color: 'var(--violet)', fontWeight: 700, fontStyle: 'normal' }}>
                clarifies where the scientific evidence actually lives
              </span>
              .
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Fit"
        source="Source · Pediatric PopPK (AALL07P4 + DFCI 11-001) · Asparlas label · sensitivity illustrative"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   EvidenceBlock — numbered chip + label/tag + bullets
   ======================================================== */
function EvidenceBlock({ n, label, tag, bullets, delay, small }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        padding: '14px 16px 14px 16px',
        borderRadius: 6,
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--violet)',
        background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        rowGap: 8,
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            border: '1.5px solid var(--violet)',
            background: 'color-mix(in srgb, var(--violet) 12%, transparent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-card-label)',
            fontWeight: 700,
            color: 'var(--violet)',
          }}
        >
          {n}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--violet)',
            fontWeight: 700,
          }}
        >
          {label}
        </span>
      </div>
      <div
        className="deck-display italic"
        style={{
          fontSize: small ? 'var(--fs-card-body)' : 'var(--fs-card-title)',
          color: 'var(--cream)',
          fontWeight: 500,
          lineHeight: 1.3,
        }}
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
            style={{
              display: 'grid',
              gridTemplateColumns: '14px 1fr',
              columnGap: 8,
              alignItems: 'baseline',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-card-body)',
              lineHeight: 1.4,
              color: 'var(--cream-muted)',
            }}
          >
            <span
              aria-hidden
              style={{
                color: 'var(--violet)',
                fontFamily: 'var(--font-mono)',
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
