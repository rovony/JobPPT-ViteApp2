import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Act 2 (Architecture) — Three pillars.
 *
 * MIN-DESIGN. The scaffold slide. Modeling sits as Pillar 2 — NOT the
 * whole case. The audience must leave knowing this case has a structure
 * that does not depend solely on the model.
 *
 * v2 design pass: candidate for v2's framework-themes DataflowEngine
 * pattern (3 inputs → 1 decision → 1 outcome) OR three connected
 * vertical columns with a horizontal "supports" bracket joining them.
 */

const PILLARS = [
  {
    n: '01',
    name: 'Adult exposure-response anchor',
    role: 'The benchmark',
    detail: 'ARIES-1/2 establishes the adult AUCss / Cmax,ss range across 2.5 / 5 / 10 mg/day, with 6MWD improvement and acceptable safety. This is the curve we match to.',
  },
  {
    n: '02',
    name: 'Pediatric PopPK with allometry',
    role: 'The bridge',
    detail: '2-compartment model with absorption lag. Allometric exponents prespecified at 0.75 (CL) / 1.0 (V) — not estimated. Body weight is the only retained covariate.',
    isHero: true,
  },
  {
    n: '03',
    name: 'Long-term safety follow-up',
    role: 'The durability',
    detail: 'LTE NCT01342952. 3.5-year median exposure. Monitors pubertal development, hepatic safety, mortality attribution. Becomes the de facto efficacy follow-on.',
  },
];

export default function Cs1Method() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · Architecture
      </Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Three pillars.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
          Modeling earns its keep as one of them.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        The case does not rest on the model alone. It rests on three pillars,
        of which the model is the load-bearing middle.
      </Subhead>

      <Viz>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
          gap: 'clamp(var(--space-3), 2vw, var(--space-6))',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
          alignItems: 'stretch',
        }}>
          {PILLARS.map((p, i) => {
            const accent = p.isHero ? 'var(--coral)' : 'var(--cream-muted)';
            return (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 12 }}
                animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.85 + i * 0.14, ease: [0.2, 0.7, 0.3, 1] }}
                style={{
                  position: 'relative',
                  minWidth: 0,
                  border: `1px solid ${p.isHero
                    ? 'color-mix(in srgb, var(--coral) 38%, transparent)'
                    : 'var(--cream-hairline)'}`,
                  borderLeft: `3px solid ${accent}`,
                  borderRadius: 'var(--radius-md)',
                  background: p.isHero
                    ? 'color-mix(in srgb, var(--coral) 6%, transparent)'
                    : 'color-mix(in srgb, var(--panel) 60%, transparent)',
                  padding: 'clamp(var(--space-3), 2vw, var(--space-5))',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                }}
              >
                <div className="deck-mono" style={{
                  fontSize: 'var(--fs-slide-name)',
                  color: accent,
                  letterSpacing: '0.08em',
                  fontVariantNumeric: 'tabular-nums',
                  fontWeight: 700,
                  lineHeight: 1,
                }}>
                  PILLAR {p.n}
                </div>
                <div className="deck-display" style={{
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)',
                  color: 'var(--cream)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                }}>
                  {p.name}
                </div>
                <div className="deck-display italic" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: accent,
                  fontWeight: 500,
                }}>
                  {p.role}
                </div>
                <div aria-hidden style={{
                  width: 'clamp(40px, 6vw, 64px)',
                  height: 'var(--stroke-hair)',
                  background: accent,
                  opacity: 0.5,
                  marginTop: 'var(--space-1)',
                }} />
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream)',
                  opacity: 0.84,
                  lineHeight: 1.45,
                  marginTop: 'var(--space-1)',
                }}>
                  {p.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Case 01 · Architecture — three pillars"
        tagline="Modeling is the bridge — not the whole case. The pillars stand together or not at all."
      />
    </SlideGrid>
  );
}
