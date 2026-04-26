import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 Act 3 · The architecture — PharmAgent platform.
 *
 * Centralized topology, three-level agent hierarchy.
 */

const SPECS = [
  { value: '3', label: 'Agent levels', detail: 'Orchestrator → Specialist → Worker' },
  { value: '13', label: 'Specialized agents', detail: 'PopPK, PBPK, E-R, NCA, QC, Report, …' },
  { value: '151', label: 'Deterministic tools', detail: 'Typed, versioned, auditable' },
  { value: '76', label: 'Review-gated templates', detail: 'Regulatory-format outputs' },
];

export default function CS3Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Architecture</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        PharmAgent —{' '}
        <span style={{ color: 'var(--sage)' }}>
          model-based evidence at scale.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        A multi-agent platform that lets the model carry the evidence at the
        pace the next decade demands. Centralized topology grounded in
        Kim et al. CPT 2025.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center',
            paddingTop: 'clamp(var(--space-2), 2vh, var(--space-6))',
          }}
        >
          <div style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(12rem, 100%), 1fr))',
            gap: 'clamp(var(--space-3), 2vw, var(--space-6))',
          }}>
            {SPECS.map((s, i) => (
              <motion.div
                key={s.label}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
                  padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
                  border: '1px solid var(--cream-hairline)',
                  borderTop: '3px solid var(--sage)',
                  borderRadius: 'var(--radius-md)',
                  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 + i * 0.12, ease: [0.2, 0.7, 0.3, 1] }}
              >
                <span className="deck-display" style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 700, color: 'var(--sage)',
                  fontVariantNumeric: 'tabular-nums', lineHeight: 1,
                }}>{s.value}</span>

                <span className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--sage)',
                  letterSpacing: '0.08em', fontWeight: 700,
                }}>{s.label}</span>

                <span className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)',
                  lineHeight: 1.35,
                }}>{s.detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Act 3 · Platform"
        tagline="The platform that lets the function ship CS1- and CS2-shaped work at scale."
        source="Kim et al., CPT 2025 · ICH M15 draft Nov 2024"
      />
    </SlideGrid>
  );
}
