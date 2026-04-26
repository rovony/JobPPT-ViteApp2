import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 13 (slot) — V2-S9 · Exposure match · the result.
 *
 * 2026-04-25 v2-final pass — content replaced wholesale per
 * 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/2B-Slides-CS1-Slides07-11-v2.md.
 * Slide ID `cs1-verdict` retained for manifest stability; the V2 spec
 * places the headline exposure-match result here. The previous
 * regulatory-verdict world-map content has been folded into slide 14
 * (cs1-lesson) outcome+E11A pins.
 *
 * v2-final amendments:
 *   - 35-<50 kg subgroup outliers proactively disclosed: low-dose +29%
 *     AUCss, high-dose +33% Cmax,ss vs adult — both within model-
 *     predicted adult AUCss envelope. Disclosed in submission.
 *   - A1.4 Hemodynamic substudy mentioned: N=5 paired low-dose patients,
 *     ΔPVR −3.46 WU (≈ −276 dyne·sec/cm⁵), cited by PMDA in Japanese
 *     label. Detail in Backup B12.
 *   - Plateau exposure-response framing — flat across AUC range tested.
 *
 * Source: Okour M et al. J Clin Pharmacol 2023;63(5):593–603.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const TABLE_ROWS = [
  {
    dose: 'LOW DOSE',
    pedAUC: '4.82',
    pedCI: '4.14 – 5.61',
    adultAUC: '4.98',
    adultCI: '4.68 – 5.29',
    delta: '−3%',
    isHero: true,
  },
  {
    dose: 'HIGH DOSE',
    pedAUC: '9.15',
    pedCI: '8.41 – 9.96',
    adultAUC: '9.12',
    adultCI: '8.30 – 10.0',
    delta: '+0.3%',
    isHero: true,
  },
];

export default function Cs1Verdict() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* V2-S9 lung-anchor treatment · signature corner — small,
          subtle, top-right corner motif. The exposure-match payoff
          owns the slide; the lung is just a quiet identity tag tying
          the case visual back to its origin. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: 'clamp(var(--space-3), 3vw, var(--space-5))',
          top: 'clamp(var(--space-2), 2vh, var(--space-4))',
          width: 'clamp(8rem, 14vw, 12rem)',
          opacity: 0.55,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lungs
          layoutId="cs1-lung"
          variant="signature"
        />
      </div>

      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · The exposure match
      </Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        Pediatric AUC matched adult exposure within{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
          3%
        </span>
        . Exposure-response was flat — the dose range sits on the plateau.
      </Headline>

      <Subhead delay={0.55} maxChars={94} size="lead">
        Headline result. Subgroup outliers and hemodynamic substudy disclosed
        proactively — not buried.
      </Subhead>

      <Viz>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(22rem, 100%), 1fr))',
          gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          height: '100%',
          alignItems: 'stretch',
        }}>
          {/* LEFT — comparison table (the headline result) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            style={{
              minWidth: 0,
              border: '1px solid color-mix(in srgb, var(--coral) 32%, transparent)',
              borderLeft: '4px solid var(--coral)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--coral) 6%, transparent)',
              padding: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-kicker)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--coral)',
              fontWeight: 700,
            }}>
              Pediatric vs adult AUCss · μg·h/mL · geometric mean
            </div>

            {TABLE_ROWS.map((r, i) => (
              <motion.div
                key={r.dose}
                initial={{ opacity: 0, x: -8 }}
                animate={reduced ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.05 + i * 0.18, ease: EASE }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(6rem, 1fr) minmax(6rem, 1fr) minmax(6rem, 1fr) minmax(4rem, auto)',
                  gap: 'var(--space-2) clamp(var(--space-2), 1.5vw, var(--space-4))',
                  alignItems: 'baseline',
                  paddingBottom: 'var(--space-2)',
                  borderBottom: '1px solid var(--cream-hairline)',
                }}
              >
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  color: 'var(--cream-faint)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  fontWeight: 700,
                }}>
                  {r.dose}
                </div>
                <Stat label="Pediatric" value={r.pedAUC} ci={r.pedCI} />
                <Stat label="Adult" value={r.adultAUC} ci={r.adultCI} />
                <div className="deck-display" style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  color: 'var(--coral)',
                  fontWeight: 700,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                  textAlign: 'right',
                }}>
                  {r.delta}
                </div>
              </motion.div>
            ))}

            <div className="deck-body" style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.92,
              lineHeight: 1.5,
              fontStyle: 'italic',
              marginTop: 'var(--space-1)',
            }}>
              <strong>Plateau exposure-response</strong> — flat for both 6MWD and AE incidence across the AUC range, in both pediatric and adult populations. Dose range sits on the plateau of the curve.
            </div>
          </motion.div>

          {/* RIGHT — proactive disclosures column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(var(--space-3), 1.6vw, var(--space-4))', minWidth: 0 }}>
            {/* Cmax disclosure */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.30, ease: EASE }}
              style={{
                border: '1px solid var(--cream-hairline)',
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
                color: 'var(--cream-faint)',
                fontWeight: 700,
              }}>
                Cmax · proactive disclosure
              </div>
              <div className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream)',
                opacity: 0.86,
                lineHeight: 1.5,
              }}>
                <strong>+11% (low) / +18% (high)</strong> in pediatric vs adult. AUC is the regulatorily-relevant exposure metric for ambrisentan; adult Cmax variability across 5–10 mg covers pediatric values observed.
              </div>
            </motion.div>

            {/* 35-<50 kg subgroup disclosure (v2-final addition) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.45, ease: EASE }}
              style={{
                border: '1px dashed color-mix(in srgb, var(--coral) 50%, transparent)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--coral) 4%, transparent)',
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
              }}>
                Subgroup transparency · 35–&lt;50 kg
              </div>
              <div className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream)',
                opacity: 0.86,
                lineHeight: 1.5,
              }}>
                Low-dose subgroup (<strong>N=8</strong>) ran <strong>+29%</strong> AUCss vs adult 5 mg. High-dose subgroup ran <strong>+33%</strong> Cmax,ss vs adult 10 mg. Both ranges fell within the model-predicted adult AUCss envelope. Disclosed in submission.
              </div>
            </motion.div>

            {/* Hemodynamic substudy callout (A1.4 v2-final addition) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.60, ease: EASE }}
              style={{
                border: '1px solid color-mix(in srgb, var(--coral) 30%, transparent)',
                borderLeft: '3px solid var(--coral)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--coral) 6%, transparent)',
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
              }}>
                + Supportive hemodynamic substudy
              </div>
              <div className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream)',
                opacity: 0.88,
                lineHeight: 1.5,
              }}>
                <strong>N=5 paired low-dose</strong> · ΔPVR <strong>−3.46 WU</strong> (≈ −276 dyne·sec/cm⁵) · ΔmPAP −2.20 mmHg · ΔCI +0.94 L/min/m². Magnitude comparable to adult ERA effect. <em>Cited by PMDA in Japanese label.</em>
              </div>
            </motion.div>
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.05}
        kicker="13 · CS1 · EXPOSURE MATCH"
        tagline="3% on the low dose. 0.3% on the high dose. The plateau is the architecture."
        source="Source · Okour M et al. J Clin Pharmacol 2023;63(5):593–603 · Ivy DD et al. J Pediatr X 2020 (hemodynamic substudy)"
      />
    </SlideGrid>
  );
}

function Stat({ label, value, ci }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 0 }}>
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: 'var(--cream-faint)',
        letterSpacing: 'var(--ls-mono)',
      }}>
        {label}
      </div>
      <div className="deck-display" style={{
        fontSize: 'clamp(1.1rem, 1.9vw, 1.5rem)',
        color: 'var(--cream)',
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1.05,
        letterSpacing: '-0.01em',
      }}>
        {value}
      </div>
      <div className="deck-mono" style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: 'var(--cream)',
        opacity: 0.6,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: 'var(--ls-mono)',
      }}>
        95% CI {ci}
      </div>
    </div>
  );
}
