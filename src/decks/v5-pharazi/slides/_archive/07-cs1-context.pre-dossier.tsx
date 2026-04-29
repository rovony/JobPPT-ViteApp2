// @ts-nocheck
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
    body: 'Vasoconstriction + proliferation + thrombosis narrow the lumen.',
  },
  {
    n: '02',
    label: 'The hemodynamic',
    body: <>mPAP ≥20 · PVR ≥2 · PAWP ≤15 — pre-capillary PAH, WHO Group 1. <em style={{ opacity: 0.7 }}>(2022 ESC/ERS)</em></>,
  },
  {
    n: '03',
    label: 'The target',
    body: <>Endothelin is overactive; ambrisentan blocks the <strong style={{ color: 'var(--case)' }}>ETA</strong> pathway.</>,
  },
  {
    n: '04',
    label: 'The stakes',
    body: 'Untreated adult median survival ≈ 2.8 years (D\'Alonzo 1991, NIH registry).',
  },
];

function FactPanel({ fact, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--case)',
        borderRadius: 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
        padding: 'clamp(var(--space-3), 1.4vw, var(--space-4))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-1)',
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--case)',
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
      <Eyebrow delay={0.10}>
        Case 01 · Disease foundation
      </Eyebrow>

      <Headline delay={0.25} maxChars={66}>
        PAH is{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          small-vessel lung disease
        </span>{' '}
        that ends in right-heart failure.
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        Lumen narrows → PVR rises → the right ventricle becomes hypertrophic, dilates, then fails.
      </Subhead>

      <Viz>
        {/* V2 §0 anatomy-anchored fact composition: 2 cards above the
            lung, 2 below — the lung is the SUBJECT, the facts orbit
            its anatomy. Desktop: 3-column grid (fact-left | lung |
            fact-right) × 2 rows. Narrow viewports collapse to a
            single column stack so nothing clips. */}
        {/* 2026-04-26 user pass — restructured Viz as flex column so the
            closing amber badge sits in its own row above the footer
            instead of overlapping it. */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          minHeight: 0,
          gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
        }}>
        <div className="cs1-context-anatomy" style={{
          width: '100%',
          flex: 1,
          minHeight: 0,
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
              opacity: 0.32,
              pointerEvents: 'none',
              zIndex: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            <Lungs
              layoutId="cs1-lung"
              variant="foundation"
              widthOverride="min(96vw, 96rem)"
            />
          </div>

          {/* Top-left card — fact 01 PATHOLOGY */}
          <div className="cs1-corner cs1-corner-tl" style={{
            position: 'absolute',
            top: 'clamp(var(--space-2), 2vh, var(--space-3))',
            left: 'clamp(var(--space-2), 6vw, var(--space-6))',
            width: 'clamp(19rem, 38vw, 30rem)',
            zIndex: 2,
          }}>
            <FactPanel fact={FACTS[0]} delay={0.85} reduced={reduced} />
          </div>

          {/* Top-right card — fact 02 HEMODYNAMIC */}
          <div className="cs1-corner cs1-corner-tr" style={{
            position: 'absolute',
            top: 'clamp(var(--space-2), 2vh, var(--space-3))',
            right: 'clamp(var(--space-2), 6vw, var(--space-6))',
            width: 'clamp(19rem, 38vw, 30rem)',
            zIndex: 2,
          }}>
            <FactPanel fact={FACTS[1]} delay={0.97} reduced={reduced} />
          </div>

          {/* Bottom-left card — fact 03 PATHWAYS */}
          <div className="cs1-corner cs1-corner-bl" style={{
            position: 'absolute',
            bottom: 'clamp(var(--space-8), 8vh, var(--space-10))',
            left: 'clamp(var(--space-2), 6vw, var(--space-6))',
            width: 'clamp(19rem, 38vw, 30rem)',
            zIndex: 2,
          }}>
            <FactPanel fact={FACTS[2]} delay={1.09} reduced={reduced} />
          </div>

          {/* Bottom-right card — fact 04 OUTCOME */}
          <div className="cs1-corner cs1-corner-br" style={{
            position: 'absolute',
            bottom: 'clamp(var(--space-8), 8vh, var(--space-10))',
            right: 'clamp(var(--space-2), 6vw, var(--space-6))',
            width: 'clamp(19rem, 38vw, 30rem)',
            zIndex: 2,
          }}>
            <FactPanel fact={FACTS[3]} delay={1.21} reduced={reduced} />
          </div>

          {/* Conclusion badge — centered below the bottom cards */}
          <motion.div
            className="cs1-conclusion"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 1.45, ease: EASE }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 'clamp(var(--space-2), 6vw, var(--space-6))',
              right: 'clamp(var(--space-2), 6vw, var(--space-6))',
              padding: 'clamp(var(--space-2), 1vw, var(--space-3)) clamp(var(--space-4), 2vw, var(--space-6))',
              background: 'color-mix(in srgb, var(--amber) 10%, var(--bg))',
              border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
              borderRadius: 'var(--radius-md)',
              zIndex: 3,
            }}
          >
            <div className="deck-display italic cs1-conclusion-text" style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              lineHeight: 1.4,
              fontWeight: 500,
              textAlign: 'center',
            }}>
              The clinical problem is lethal; the pediatric dose question is not academic.
            </div>
          </motion.div>
        </div>
        </div>

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
            .cs1-context-anatomy .cs1-lung-canvas,
            .cs1-context-anatomy .cs1-conclusion {
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
            .cs1-context-anatomy .cs1-conclusion {
              order: 100;
            }
          }

          /* Large screens ≥1200px */
          @media (min-width: 1200px) {
            .cs1-corner-tl,
            .cs1-corner-tr { width: clamp(22rem, 42vw, 34rem) !important; }
            .cs1-corner-bl,
            .cs1-corner-br { width: clamp(22rem, 42vw, 34rem) !important; bottom: 7vh !important; }
            .cs1-corner-tl { left: 3vw !important; }
            .cs1-corner-tr { right: 3vw !important; }
            .cs1-corner-bl { left: 4vw !important; }
            .cs1-corner-br { right: 4vw !important; }
            .cs1-conclusion { left: 3vw !important; right: 3vw !important; }
            .cs1-conclusion-text { white-space: nowrap; }
            .cs1-lung-canvas { opacity: 0.38 !important; }

            .cs1-context-anatomy .deck-mono { font-size: 0.88rem !important; }
            .cs1-context-anatomy .deck-body { font-size: 1.15rem !important; }
            .cs1-conclusion-text { font-size: 1.2rem !important; }
          }

          /* XL screens ≥1600px */
          @media (min-width: 1600px) {
            .cs1-corner-tl,
            .cs1-corner-tr { width: clamp(26rem, 44vw, 40rem) !important; }
            .cs1-corner-bl,
            .cs1-corner-br { width: clamp(26rem, 44vw, 40rem) !important; bottom: 7vh !important; }
            .cs1-corner-tl { left: 2vw !important; }
            .cs1-corner-tr { right: 2vw !important; }
            .cs1-corner-bl { left: 3vw !important; }
            .cs1-corner-br { right: 3vw !important; }
            .cs1-conclusion { left: 2vw !important; right: 2vw !important; }
            .cs1-lung-canvas { opacity: 0.42 !important; }

            .cs1-context-anatomy .deck-mono { font-size: 0.95rem !important; }
            .cs1-context-anatomy .deck-body { font-size: 1.25rem !important; }
            .cs1-conclusion-text { font-size: 1.35rem !important; }
          }

          /* XXL screens ≥2000px */
          @media (min-width: 2000px) {
            .cs1-corner-tl,
            .cs1-corner-tr { width: clamp(30rem, 44vw, 46rem) !important; }
            .cs1-corner-bl,
            .cs1-corner-br { width: clamp(30rem, 44vw, 46rem) !important; }
            .cs1-corner-tl { left: 1vw !important; }
            .cs1-corner-tr { right: 1vw !important; }
            .cs1-corner-bl { left: 2vw !important; }
            .cs1-corner-br { right: 2vw !important; }
            .cs1-conclusion { left: 1vw !important; right: 1vw !important; }

            .cs1-context-anatomy .deck-mono { font-size: 1.05rem !important; }
            .cs1-context-anatomy .deck-body { font-size: 1.4rem !important; }
            .cs1-conclusion-text { font-size: 1.5rem !important; }
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
