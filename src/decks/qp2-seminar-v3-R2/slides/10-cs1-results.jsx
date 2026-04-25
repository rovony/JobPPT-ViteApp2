import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Slide 10 — Results (the 3% match — single hero numeral).
 *
 * Reweighted per CS1 flow refactor: the previous build had 5 numbers as
 * visual peers. This pass elevates the −3% AUC match to a hero numeral
 * at --fs-slide-display, drops the four supporting numbers to
 * --fs-slide-subhead in a row beneath, and moves the modeling backbone
 * out of main content into a single-line bottom-rail annotation strip.
 *
 * Verified facts (from R2R-05):
 *   - 2-compartment with absorption lag (NOT 1-compartment)
 *   - Allometric exponents prespecified at 0.75 (CL) / 1.0 (V)
 *   - AUCss within 3% of adult at low dose
 *   - Cmax,ss 11–18% higher than adult
 *   - Body weight only retained covariate (no age effect)
 *   - DROP M3 method framing — BLQ rate was only 3%
 *
 * Speaker says "exposure matching" 3 times during this slide.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const SUPPORTING = [
  {
    value: 'matched',
    label: 'AUCss · high dose',
    detail: 'to adult 10 mg range',
  },
  {
    value: '+11–18%',
    label: 'Cmax,ss',
    detail: 'vs adult — clinically negligible',
  },
  {
    value: 'weight only',
    label: 'Retained covariate',
    detail: 'no age effect after allometry',
  },
  {
    value: 'no association',
    label: 'Exposure–response',
    detail: '6MWD and AEs vs AUCss',
  },
];

export default function Cs1Results() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · The 3% match
      </Eyebrow>

      <Headline delay={0.25} maxChars={52}>
        Pediatric AUCss within{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 600 }}>
          3% of adult
        </span>{' '}
        — across the weight range tested.
      </Headline>

      <Subhead delay={0.55} maxChars={88} size="lead">
        Body-weight allometric PopPK delivered the bridge. Modeling earned the
        case here.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
        }}>
          {/* HERO NUMERAL — the load-bearing number, single dominant element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 'var(--space-2)',
            }}
          >
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              color: 'var(--coral)',
              letterSpacing: '0.10em',
              fontWeight: 700,
            }}>
              Pediatric AUCss vs adult — low dose
            </div>
            <div className="deck-display" style={{
              fontSize: 'var(--fs-slide-display)',
              color: 'var(--coral)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.035em',
              fontVariantNumeric: 'tabular-nums',
            }}>
              −3%
            </div>
            <div aria-hidden style={{
              width: 'clamp(80px, 14vw, 180px)',
              height: 'var(--stroke-hair)',
              background: 'var(--coral)',
              opacity: 0.7,
            }} />
            <div className="deck-body" style={{
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream)',
              opacity: 0.84,
              maxWidth: '52ch',
              lineHeight: 1.4,
            }}>
              Pediatric low-dose AUCss <span style={{ color: 'var(--cream)', fontWeight: 600 }}>4.82 µg·h/mL</span> vs adult 5 mg <span style={{ color: 'var(--cream)', fontWeight: 600 }}>4.98 µg·h/mL</span> — the curve we matched to.
            </div>
          </motion.div>

          {/* SUPPORTING ROW — four secondary stats at subhead size */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(11rem, 100%), 1fr))',
            gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
            paddingTop: 'clamp(var(--space-4), 4vh, var(--space-8))',
          }}>
            {SUPPORTING.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.30 + i * 0.10, ease: EASE }}
                style={{
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-1)',
                  paddingLeft: 'var(--space-3)',
                  borderLeft: '1px solid var(--cream-hairline)',
                }}
              >
                <div className="deck-display" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--coral)',
                  fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}>
                  {s.value}
                </div>
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  color: 'var(--cream-faint)',
                  letterSpacing: '0.1em',
                }}>
                  {s.label}
                </div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  color: 'var(--cream)',
                  opacity: 0.74,
                  lineHeight: 1.35,
                }}>
                  {s.detail}
                </div>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM-RAIL MODEL ANNOTATION — single-line, italic ALLOWED at
              tagline size per spec; editorially marked as model-meta. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.85, ease: EASE }}
            className="deck-display italic"
            style={{
              marginTop: 'clamp(var(--space-4), 4vh, var(--space-6))',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream-muted)',
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            Model — 2-compartment with absorption lag · allometric exponents 0.75 (CL) / 1.0 (V) prespecified · 39 evaluable pediatric subjects · ARIES-1/2 adult anchor
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.05}
        kicker="10 · CS1 · RESULTS"
        tagline="The 3% match was the moment. Everything else is supporting."
        source="Source · Okour M et al. J Clin Pharmacol 2023 · PMID 36579617"
      />
    </SlideGrid>
  );
}
