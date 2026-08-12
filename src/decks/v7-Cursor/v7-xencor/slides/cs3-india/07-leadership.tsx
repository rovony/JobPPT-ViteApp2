// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 Act 6 · Leadership — function-level bracket.
 * Two-column: Quantitative Pharmacology vs partner functions.
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
  const go = inView || !!reduced;
  const motionOn = go && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.08}>Case 03 · Leadership</Eyebrow>

      <Headline delay={0.12} maxChars={48}>
        Quantitative pharmacology built the bridge —{' '}
        <span style={{ color: 'var(--cyan)' }}>partners carried it through.</span>
      </Headline>

      <Subhead delay={0.18} maxChars={120} size="lead">
        Quant Pharm answered whether global evidence extrapolates; partners owned pathway, commitments, and execution.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            gap: 'var(--space-4)',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'var(--space-4)',
          }}>
            <motion.div
              style={{
                border: '1px solid var(--cream-hairline)',
                borderTop: '3px solid var(--cyan)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--panel)',
                padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
              }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionOn ? 0.3 : 0, delay: motionOn ? 0.14 : 0, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cyan)',
                letterSpacing: 'var(--ls-mono)', fontWeight: 700,
              }}>Quantitative Pharmacology</div>

              {QUANT_PHARM_SCOPE.map((item) => (
                <div key={item} className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)',
                  lineHeight: 1.4, paddingLeft: 'var(--space-3)',
                  borderLeft: '2px solid var(--cyan)',
                }}>
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div
              style={{
                border: '1px solid var(--cream-hairline)',
                borderTop: '3px solid var(--cream-hairline)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--panel)',
                padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
              }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionOn ? 0.3 : 0, delay: motionOn ? 0.22 : 0, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-faint)',
                letterSpacing: 'var(--ls-mono)', fontWeight: 700,
              }}>Partner Functions</div>

              {PARTNER_SCOPE.map((item) => (
                <div key={item.who} style={{
                  display: 'flex', flexDirection: 'column', gap: '2px',
                  paddingLeft: 'var(--space-3)',
                  borderLeft: '2px solid var(--cream-hairline)',
                }}>
                  <span className="deck-mono" style={{
                    fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-muted)',
                    fontWeight: 600, letterSpacing: 'var(--ls-mono)',
                  }}>{item.who}</span>
                  <span className="deck-body" style={{
                    fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)',
                    lineHeight: 1.4,
                  }}>{item.what}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <aside
            style={{
              width: '100%',
              flexShrink: 0,
              padding: 'clamp(0.85rem, 1.6vh, 1.15rem) clamp(1.1rem, 2vw, 1.5rem)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--cream-hairline)',
              borderLeft: '4px solid var(--cyan)',
              background: 'var(--panel)',
            }}
          >
            <div className="deck-body" style={{
              margin: 0,
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream)',
              fontWeight: 500,
              lineHeight: 1.45,
            }}>
              Evidence bridge on one side; agency execution on the other.
            </div>
          </aside>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 0.28}
        kicker="Case 03 · Leadership"
        tagline=""
      />
    </SlideGrid>
  );
}
