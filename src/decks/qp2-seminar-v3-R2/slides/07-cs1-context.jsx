import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 07 (slot) — V2-S3 · PAH 101 · disease foundation.
 *
 * 2026-04-25 v2-final pass — content replaced wholesale per
 * 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/2A-Slides-CS1-Slides01-06-v2.md.
 *
 * V2 spec: lung is the SUBJECT — moves to center, gets large, fact
 * boxes anchored via leader lines to anatomical regions. We approximate
 * with a centered Lungs (context variant) + four fact-box panels in
 * a 2×2 grid below the headline. Full anatomy-anchor leader lines are
 * Wave 2 work.
 *
 * Verified facts (V2-final):
 *   - 2022 ESC/ERS hemodynamic def: mPAP ≥20, PVR ≥2 WU, PAWP ≤15
 *   - AMB112529 trial used 2008 Dana Point def: mPAP ≥25, PVR ≥3 WU·m²
 *   - Untreated adult median survival 2.8 yrs (D'Alonzo NIH 1991)
 *   - Four pathways: ET, NO/cGMP, prostacyclin, activin/TGF-β
 */

const EASE = [0.2, 0.7, 0.3, 1];

const FACTS = [
  {
    n: '01',
    label: 'The pathology',
    body: 'Vasoconstriction, smooth-muscle proliferation, in-situ thrombosis — pulmonary arterioles narrow.',
  },
  {
    n: '02',
    label: 'The hemodynamic',
    body: <>mPAP ≥ 20 mmHg · PVR ≥ 2 WU · PAWP ≤ 15 mmHg — pre-capillary, WHO Group 1. <em style={{ opacity: 0.7 }}>(2022 ESC/ERS update; AMB112529 trial used 2008 Dana Point: mPAP ≥25, PVR ≥3 WU·m².)</em></>,
  },
  {
    n: '03',
    label: 'The pathways',
    body: <>Endothelin <strong style={{ color: 'var(--coral)' }}>↑</strong> · Nitric oxide <strong>↓</strong> · Prostacyclin <strong>↓</strong> · Activin / TGF-β dysregulated.</>,
  },
  {
    n: '04',
    label: 'The outcome',
    body: 'Untreated median survival ≈ 2.8 years (D\'Alonzo 1991, NIH registry).',
  },
];

function FactPanel({ fact, delay, reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--coral)',
        borderRadius: 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
        padding: 'clamp(var(--space-3), 1.4vw, var(--space-4))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-1)',
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--coral)',
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {fact.n} · {fact.label}
      </div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.86,
        lineHeight: 1.45,
      }}>
        {fact.body}
      </div>
    </motion.div>
  );
}

export default function Cs1Context() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · Disease foundation
      </Eyebrow>

      <Headline delay={0.25} maxChars={66}>
        Pulmonary arterial hypertension is{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 600 }}>
          small-vessel lung disease
        </span>{' '}
        that kills through right-heart failure.
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        The pulmonary arterioles narrow. PVR rises. The right ventricle hypertrophies, dilates, then fails.
      </Subhead>

      <Viz>
        {/* V2 §0 anatomy-anchored fact composition: 2 cards above the
            lung, 2 below — the lung is the SUBJECT, the facts orbit
            its anatomy. Desktop: 3-column grid (fact-left | lung |
            fact-right) × 2 rows. Narrow viewports collapse to a
            single column stack so nothing clips. */}
        <div className="cs1-context-anatomy" style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* BIG LUNG — anatomical SUBJECT filling the whole Viz, with
              fact cards anchored to the 4 corners. Cards may overlap
              the outer edges of the lung — that's intentional, the
              anatomy is the canvas the facts live on. */}
          <div
            aria-hidden
            className="cs1-lung-canvas"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.40,
              pointerEvents: 'none',
              zIndex: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Lungs
              layoutId="cs1-lung"
              variant="foundation"
              widthOverride="min(68vw, 54rem)"
            />
          </div>

          {/* Top-left card — fact 01 PATHOLOGY (pulled inward toward
              the lung's left lobe instead of slammed to the edge) */}
          <div className="cs1-corner cs1-corner-tl" style={{
            position: 'absolute',
            top: 'clamp(var(--space-2), 2vh, var(--space-3))',
            left: 'clamp(var(--space-2), 4vw, var(--space-6))',
            width: 'clamp(15rem, 30vw, 22rem)',
            zIndex: 2,
          }}>
            <FactPanel fact={FACTS[0]} delay={0.85} reduced={reduced} />
          </div>

          {/* Top-right card — fact 02 HEMODYNAMIC */}
          <div className="cs1-corner cs1-corner-tr" style={{
            position: 'absolute',
            top: 'clamp(var(--space-2), 2vh, var(--space-3))',
            right: 'clamp(var(--space-2), 4vw, var(--space-6))',
            width: 'clamp(15rem, 30vw, 22rem)',
            zIndex: 2,
          }}>
            <FactPanel fact={FACTS[1]} delay={0.97} reduced={reduced} />
          </div>

          {/* Bottom-left card — fact 03 PATHWAYS */}
          <div className="cs1-corner cs1-corner-bl" style={{
            position: 'absolute',
            bottom: 'clamp(var(--space-2), 2vh, var(--space-3))',
            left: 'clamp(var(--space-2), 4vw, var(--space-6))',
            width: 'clamp(15rem, 30vw, 22rem)',
            zIndex: 2,
          }}>
            <FactPanel fact={FACTS[2]} delay={1.09} reduced={reduced} />
          </div>

          {/* Bottom-right card — fact 04 OUTCOME */}
          <div className="cs1-corner cs1-corner-br" style={{
            position: 'absolute',
            bottom: 'clamp(var(--space-2), 2vh, var(--space-3))',
            right: 'clamp(var(--space-2), 4vw, var(--space-6))',
            width: 'clamp(15rem, 30vw, 22rem)',
            zIndex: 2,
          }}>
            <FactPanel fact={FACTS[3]} delay={1.21} reduced={reduced} />
          </div>
        </div>

        {/* Closing pathway-mechanism line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.55, delay: 1.45, ease: EASE }}
          className="deck-display italic"
          style={{
            marginTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
            fontSize: 'var(--fs-slide-tagline)',
            color: 'var(--coral)',
            lineHeight: 1.5,
            fontWeight: 500,
            maxWidth: '78ch',
            zIndex: 1,
            position: 'relative',
          }}
        >
          Ambrisentan blocks the endothelin pathway &mdash; the over-active vasoconstrictor and proliferative arm.
        </motion.div>

        {/* Mobile fallback — under 640px viewport, drop absolute
            positioning and stack everything in flow so nothing clips
            off-screen. Lung shrinks and goes between the top pair
            and bottom pair. */}
        <style>{`
          @media (max-width: 640px) {
            .cs1-context-anatomy {
              display: flex !important;
              flex-direction: column;
              gap: var(--space-3);
              padding-top: var(--space-3);
            }
            .cs1-context-anatomy .cs1-corner,
            .cs1-context-anatomy .cs1-lung-canvas {
              position: static !important;
              width: 100% !important;
              transform: none !important;
              top: auto !important;
              left: auto !important;
              right: auto !important;
              bottom: auto !important;
            }
            .cs1-context-anatomy .cs1-lung-canvas {
              order: 99;
              opacity: 0.6 !important;
              max-height: 16rem;
              align-self: center;
              width: 60vw !important;
            }
          }
        `}</style>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.85}
        kicker="07 · CS1 · PAH 101"
        tagline="Patients don't die of pulmonary hypertension. They die of right-heart failure."
        source="Source · ESC/ERS 2022 PAH guideline · D'Alonzo et al. Ann Intern Med 1991;115(5):343–349"
      />
    </SlideGrid>
  );
}
