// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 Act 7 · Portable principle — AI as workflow infrastructure,
 * not model substitution. The Hook A close.
 */
export default function CS3Portable() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Portable principle</Eyebrow>

      <Headline delay={0.25} maxChars={52}>
        AI in clinical pharmacology is useful when it becomes{' '}
        <span style={{ color: 'var(--sage)' }}>
          infrastructure, not a substitute for judgment.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        The function keeps owning the science. The platform carries the
        integration. The result is not less human judgment; it is more
        time for the judgment that matters.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(var(--space-4), 3vh, var(--space-6))',
            paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          }}
        >
          {/* Three-case recap ribbon */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 'clamp(var(--space-4), 3vw, var(--space-6))',
            alignItems: 'stretch',
          }}>
            {[
              { cs: '01', color: 'var(--coral)', line: 'Exposure-matching carried the dose.' },
              { cs: '02', color: 'var(--cyan)', line: 'The dossier replaced the trial.' },
              { cs: '03', color: 'var(--sage)', line: 'The platform carries the integration.' },
            ].map((c, i) => (
              <motion.div
                key={c.cs}
                style={{
                  padding: 'clamp(var(--space-4), 2vw, var(--space-5))',
                  border: `1px solid color-mix(in srgb, ${c.color} 30%, transparent)`,
                  borderTop: `4px solid ${c.color}`,
                  borderRadius: 'var(--radius-lg)',
                  background: `linear-gradient(135deg, color-mix(in srgb, ${c.color} 12%, transparent) 0%, color-mix(in srgb, var(--panel) 80%, transparent) 100%)`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 12px 32px color-mix(in srgb, ${c.color} 8%, transparent)`,
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 + i * 0.15, ease: [0.2, 0.7, 0.3, 1] }}
              >
                <span className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)', color: c.color,
                  letterSpacing: '0.1em', fontWeight: 700,
                }}>Case {c.cs}</span>
                <span className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)',
                  lineHeight: 1.4,
                }}>{c.line}</span>
              </motion.div>
            ))}
          </div>

          {/* Closing thesis */}
          <motion.div
            style={{
              textAlign: 'center',
              padding: 'var(--space-5) var(--space-6)',
              marginTop: 'var(--space-4)',
              background: `linear-gradient(90deg,
                color-mix(in srgb, var(--coral) 12%, transparent) 0%,
                color-mix(in srgb, var(--cyan) 8%, transparent) 50%,
                color-mix(in srgb, var(--sage) 12%, transparent) 100%)`,
              border: '1px solid color-mix(in srgb, var(--cream-hairline) 60%, transparent)',
              borderRadius: 'var(--radius-lg)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 32px color-mix(in srgb, var(--bg) 40%, transparent)',
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.65, ease: [0.2, 0.7, 0.3, 1] }}
          >
            <span className="deck-display" style={{
              fontSize: 'var(--fs-slide-name)', color: 'var(--cream)',
              fontWeight: 600, lineHeight: 1.5,
            }}>
              Three decisions. Three trials that could not carry the full answer.{' '}
              <span style={{ color: 'var(--sage)' }}>
                Three answers from the same discipline.
              </span>
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.0}
        kicker="Act 7 · Close"
        tagline="The science gets the time; the infrastructure carries the scaffolding."
      />
    </SlideGrid>
  );
}
