import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Act 3 (Decisive move) — PopPK matched pediatric AUCss to
 * adult plateau.
 *
 * MIN-DESIGN. THIS is the slide that earns the case. The audience
 * needs to leave hearing "exposure matching" three times in two minutes.
 *
 * Verified facts (from R2R-05):
 *   - 2-compartment with absorption lag (NOT 1-compartment)
 *   - Allometric exponents prespecified at 0.75 (CL) / 1.0 (V)
 *   - AUCss within 3% of adult at low dose
 *   - Cmax,ss 11–18% higher than adult
 *   - Body weight only retained covariate (no age effect)
 *   - DROP M3 method framing — BLQ rate was only 3%
 *
 * v2 design pass: candidate for an exposure-overlap chart (pediatric
 * vs adult AUCss density) OR weight-band dose simulation table.
 */

const RESULTS = [
  { metric: 'AUCss · low dose',  value: 'within 3%',     of: 'of adult plateau',     accent: true },
  { metric: 'AUCss · high dose', value: 'matched',       of: 'to adult range',       accent: true },
  { metric: 'Cmax,ss',           value: '+11–18%',       of: 'vs adult',             accent: false },
  { metric: 'Retained covariate',value: 'body weight only', of: 'no age effect',      accent: false },
];

const MODEL = [
  ['Structural model',   '2-compartment with absorption lag'],
  ['Allometric exponents','0.75 (CL) · 1.0 (V) — prespecified, not fit'],
  ['Pediatric data',     '39 evaluable subjects · 211 PK observations'],
  ['Adult anchor',       'ARIES-1/2 PopPK · 5 mg + 10 mg adult plateau'],
];

export default function Cs1Results() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · Decisive move — exposure matching
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
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
          gap: 'clamp(var(--space-5), 4vw, var(--space-10))',
          alignItems: 'start',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
        }}>
          {/* LEFT — exposure-match results */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.85, ease: [0.2, 0.7, 0.3, 1] }}
            style={{ minWidth: 0 }}
          >
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              color: 'var(--coral)',
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}>
              The exposure-match
            </div>
            <div style={{
              marginTop: 'var(--space-3)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}>
              {RESULTS.map((r, i) => (
                <div key={r.metric} style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) auto',
                  alignItems: 'baseline',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-2) 0',
                  borderBottom: '1px solid var(--cream-hairline)',
                }}>
                  <div className="deck-body" style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream-muted)',
                  }}>
                    {r.metric}
                  </div>
                  <div className="deck-display" style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    color: r.accent ? 'var(--coral)' : 'var(--cream)',
                    fontWeight: 600,
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                    fontVariantNumeric: 'tabular-nums',
                    textAlign: 'right',
                  }}>
                    {r.value}
                    <div className="deck-mono" style={{
                      fontSize: 'var(--fs-slide-pageno)',
                      color: 'var(--cream-faint)',
                      letterSpacing: '0.06em',
                      fontWeight: 400,
                      marginTop: 'var(--space-1)',
                    }}>
                      {r.of}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — model spec */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.05, ease: [0.2, 0.7, 0.3, 1] }}
            style={{
              minWidth: 0,
              border: '1px solid var(--cream-hairline)',
              borderLeft: '3px solid var(--cream-faint)',
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
              padding: 'clamp(var(--space-3), 2vw, var(--space-5))',
            }}
          >
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              color: 'var(--cream-faint)',
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}>
              The model — methods detail on demand
            </div>
            <dl style={{ margin: 'var(--space-3) 0 0 0' }}>
              {MODEL.map(([k, v]) => (
                <div key={k} style={{ marginBottom: 'var(--space-3)' }}>
                  <dt className="deck-mono uppercase" style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    color: 'var(--cream-faint)',
                    letterSpacing: '0.1em',
                  }}>{k}</dt>
                  <dd className="deck-body" style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream)',
                    opacity: 0.86,
                    lineHeight: 1.4,
                    margin: 'var(--space-1) 0 0 0',
                  }}>{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Case 01 · Decisive move — exposure-match the bridge"
        tagline="Two-compartment, allometric, weight-only — and within 3% of the curve we trust."
        source="Source · Okour M et al. J Clin Pharmacol 2023 · PMID 36579617"
      />
    </SlideGrid>
  );
}
