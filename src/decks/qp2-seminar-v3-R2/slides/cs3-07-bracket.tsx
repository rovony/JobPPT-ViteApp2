// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 Act 6 · Bracket Method — I designed the architecture;
 * the field supplied the discipline that makes it credible.
 */
export default function CS3Bracket() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Bracket</Eyebrow>

      <Headline delay={0.25} maxChars={52}>
        Clinical pharmacology designed this.{' '}
        <span style={{ color: 'var(--sage)' }}>
          The field supplied the discipline.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        Credibility comes from peer-reviewed frameworks, not internal
        claims. The platform stands on published science.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center',
            paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          }}
        >
          <div style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          }}>
            {/* LEFT — I designed */}
            <motion.div
              style={{
                border: '1.5px solid var(--sage)',
                borderRadius: 'var(--radius-md)',
                background: `linear-gradient(180deg,
                  color-mix(in srgb, var(--sage) 10%, transparent),
                  color-mix(in srgb, var(--panel) 75%, transparent) 70%)`,
                padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
              }}
              initial={{ opacity: 0, x: -16 }}
              animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.85, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--sage)',
                letterSpacing: '0.1em', fontWeight: 700,
              }}>Clin Pharm Designed</div>

              {[
                'Centralized agent topology (Kim et al. 2026)',
                'Three-level hierarchy (supervisor → specialist → worker)',
                'Deterministic tool discipline — no hallucinated math',
                'Typed state bus (34 fields, strict write access)',
                'SHA-256 hash-chain audit trail',
                'Privacy-by-architecture data layer (SchemaExtractor)',
              ].map((item) => (
                <div key={item} className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)',
                  lineHeight: 1.4, paddingLeft: 'var(--space-3)',
                  borderLeft: '2px solid var(--sage)',
                }}>
                  {item}
                </div>
              ))}
            </motion.div>

            {/* RIGHT — Field's discipline */}
            <motion.div
              style={{
                border: '1px solid var(--cream-hairline)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
              }}
              initial={{ opacity: 0, x: 16 }}
              animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 1.0, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-faint)',
                letterSpacing: '0.1em', fontWeight: 700,
              }}>The Field's Discipline</div>

              {[
                { who: 'ICH M15', what: 'Model-informed drug development framework' },
                { who: 'Kim et al. 2026', what: '260-experiment scaling laws for agent systems' },
                { who: 'MIDD literature', what: 'Context-of-use, consequence-of-wrong-decision' },
                { who: 'Agentic-systems research', what: 'Tool-use > free-text generation' },
                { who: 'FDA/EMA PBPK guidance', what: 'Qualification-not-validation paradigm' },
              ].map((item) => (
                <div key={item.who} style={{
                  display: 'flex', flexDirection: 'column', gap: '2px',
                  paddingLeft: 'var(--space-3)',
                  borderLeft: '2px solid var(--cream-hairline)',
                }}>
                  <span className="deck-mono" style={{
                    fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-muted)',
                    fontWeight: 600,
                  }}>{item.who}</span>
                  <span className="deck-body" style={{
                    fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)',
                    lineHeight: 1.35,
                  }}>{item.what}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Act 6 · Credit outward"
        tagline="Credit outward to the field that formalized how a model becomes regulatory evidence."
      />
    </SlideGrid>
  );
}
