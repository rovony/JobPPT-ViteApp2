import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 Act 4 · The decisive move — privacy and audit by construction.
 *
 * Two architectural commitments that make model-as-answer acceptable
 * at regulatory scale.
 */

const COMMITMENTS = [
  {
    label: 'Privacy by Architecture',
    detail: 'Patient data physically cannot reach the LLM. Local computation with typed, encrypted state transfer. No PII in the inference path — by construction, not by policy.',
    accent: 'var(--sage)',
  },
  {
    label: 'Audit by Construction',
    detail: 'Hash-chain audit trail. Every analysis step is regulator-replayable. ICH M15-aligned provenance from data ingestion through final report. Deterministic tool outputs, not stochastic text.',
    accent: 'var(--amber)',
  },
];

export default function CS3DecisiveMove() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Decisive move</Eyebrow>

      <Headline delay={0.25} maxChars={52}>
        Two commitments —{' '}
        <span style={{ color: 'var(--sage)' }}>
          both by construction, not by promise.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        If the model is the answer, the model has to be defendable to a
        regulator on its own terms.
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
          {COMMITMENTS.map((c, i) => (
            <motion.div
              key={c.label}
              style={{
                position: 'relative', overflow: 'hidden',
                border: `1.5px solid color-mix(in srgb, ${c.accent} 50%, transparent)`,
                borderRadius: 'var(--radius-lg)',
                background: `linear-gradient(135deg,
                  color-mix(in srgb, ${c.accent} 10%, transparent),
                  color-mix(in srgb, var(--panel) 80%, transparent) 60%)`,
                padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.85 + i * 0.2, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: 4, background: c.accent,
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: `color-mix(in srgb, ${c.accent} 20%, transparent)`,
                  border: `2px solid ${c.accent}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span className="deck-mono" style={{
                    fontSize: 'var(--fs-slide-eyebrow)', color: c.accent, fontWeight: 700,
                  }}>{i + 1}</span>
                </div>
                <span className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-name)', color: c.accent,
                  letterSpacing: '0.08em', fontWeight: 700,
                }}>{c.label}</span>
              </div>

              <div className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)',
                lineHeight: 1.45, paddingLeft: 'calc(32px + var(--space-3))',
              }}>
                {c.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Act 4 · Architectural commitments"
        tagline="These aren't features — they're the conditions under which model-as-answer is acceptable evidence."
      />
    </SlideGrid>
  );
}
