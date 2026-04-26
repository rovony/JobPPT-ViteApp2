import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 Act 2 · Why the model has to come faster.
 *
 * Pharmacometric workflows are 80% scaffolding, 20% science.
 */
export default function CS3Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · The constraint</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Pharmacometric workflows are{' '}
        <span style={{ color: 'var(--sage)' }}>80% scaffolding, 20% science.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        The function spent more time on integration than on analysis.
        The next decade cannot afford that ratio.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center',
            paddingTop: 'clamp(var(--space-4), 3vh, var(--space-8))',
          }}
        >
          <div style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
            gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          }}>
            {/* Scaffolding — 80% */}
            <motion.div
              style={{
                border: '1px solid var(--cream-hairline)',
                borderLeft: '4px solid var(--cream-faint)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.85, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                <span className="deck-display" style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 700, color: 'var(--cream-faint)',
                  lineHeight: 1, fontVariantNumeric: 'tabular-nums',
                }}>80%</span>
                <span className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-faint)',
                  letterSpacing: '0.1em', fontWeight: 700,
                }}>Scaffolding</span>
              </div>
              <div className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)',
                lineHeight: 1.45,
              }}>
                Data wrangling, format conversion, report templating, cross-team
                handoffs, version control, regulatory formatting, QC checklists.
              </div>
            </motion.div>

            {/* Science — 20% */}
            <motion.div
              style={{
                border: '1.5px solid var(--sage)',
                borderLeft: '4px solid var(--sage)',
                borderRadius: 'var(--radius-md)',
                background: `linear-gradient(180deg,
                  color-mix(in srgb, var(--sage) 12%, transparent),
                  color-mix(in srgb, var(--panel) 75%, transparent) 70%)`,
                padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.0, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                <span className="deck-display" style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 700, color: 'var(--sage)',
                  lineHeight: 1, fontVariantNumeric: 'tabular-nums',
                }}>20%</span>
                <span className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--sage)',
                  letterSpacing: '0.1em', fontWeight: 700,
                }}>Science</span>
              </div>
              <div className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)',
                lineHeight: 1.45,
              }}>
                Model specification, covariate selection, simulation design,
                exposure-response interpretation, regulatory judgment.
              </div>
            </motion.div>
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Act 2 · Problem naming"
        tagline="The science was right in CS1 and CS2 — the scaffolding was the bottleneck."
      />
    </SlideGrid>
  );
}
