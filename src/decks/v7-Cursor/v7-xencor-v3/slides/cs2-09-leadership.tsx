// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 Act 6 · Leadership — function-level bracket.
 *
 * Two-column bracket: Quantitative Pharmacology vs partner functions.
 */

const QUANT_PHARM_SCOPE = [
  'Translate the ICH E5 question into testable evidence',
  'Integrate PopPK · E-R · intrinsic/extrinsic factors',
  'Define Phase 4 PK/PD as the residual-uncertainty plan',
];

const PARTNER_SCOPE = [
  { who: 'Regulatory affairs', what: 'Agency pathway, filing mechanics, and formal responses' },
  { who: 'Medical / PV + India affiliate', what: 'Post-marketing surveillance, local execution, and access launch' },
  { who: 'Regulatory writing', what: 'Submission narrative and traceable response package' },
];

export default function CS2Leadership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Leadership</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Quantitative pharmacology built the bridge —{' '}
        <span style={{ color: 'var(--cyan)' }}>partners carried it through.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={120} size="lead">
        Quant Pharm answered whether global evidence extrapolates; partners owned pathway, commitments, and execution.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          }}>
            {/* LEFT — Quantitative Pharmacology */}
            <motion.div
              style={{
                border: '1.5px solid var(--cyan)',
                borderRadius: 'var(--radius-md)',
                background: `linear-gradient(180deg,
                  color-mix(in srgb, var(--cyan) 10%, transparent),
                  color-mix(in srgb, var(--panel) 75%, transparent) 70%)`,
                padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
              }}
              initial={{ opacity: 0, x: -16 }}
              animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.85, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div className="deck-mono uppercase xc-slide-eyebrow xc-cyan" style={{
                letterSpacing: '0.1em', fontWeight: 700 }}>Quantitative Pharmacology</div>

              {QUANT_PHARM_SCOPE.map((item) => (
                <div key={item} className="deck-body xc-slide-subhead xc-ink" style={{
                  lineHeight: 1.4, paddingLeft: 'var(--space-3)',
                  borderLeft: '2px solid var(--cyan)' }}>
                  {item}
                </div>
              ))}
            </motion.div>

            {/* RIGHT — Partner functions */}
            <motion.div
              style={{
                border: '1px solid var(--cream-hairline)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
              }}
              initial={{ opacity: 0, x: 16 }}
              animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 1.0, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div className="deck-mono uppercase xc-slide-eyebrow xc-faint" style={{
                letterSpacing: '0.1em', fontWeight: 700 }}>Partner Functions</div>

              {PARTNER_SCOPE.map((item) => (
                <div key={item.who} style={{
                  display: 'flex', flexDirection: 'column', gap: '2px',
                  paddingLeft: 'var(--space-3)',
                  borderLeft: '2px solid var(--cream-hairline)',
                }}>
                  <span className="deck-mono xc-slide-eyebrow xc-muted" style={{
                    fontWeight: 600 }}>{item.who}</span>
                  <span className="deck-body xc-slide-subhead xc-ink" style={{
                    lineHeight: 1.4 }}>{item.what}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.0}
        kicker="Act 6 · FUNCTIONAL OWNERSHIP"
        tagline="Evidence bridge on one side; agency execution on the other."
      />
    </SlideGrid>
  );
}
