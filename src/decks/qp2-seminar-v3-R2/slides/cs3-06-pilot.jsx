import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 Act 5 · Pilot evidence — what the platform has shipped.
 *
 * Concrete pilot metrics. Same scientific output, faster,
 * with audit gates intact.
 */

const PILOTS = [
  {
    metric: 'PopPK report',
    before: '6–8 weeks',
    after: '3–4 days',
    note: 'First draft, review-ready',
  },
  {
    metric: 'PBPK DDI package',
    before: '4–6 weeks',
    after: '1 week',
    note: 'Qualified model + label draft',
  },
  {
    metric: 'Regulatory E-R summary',
    before: '3–4 weeks',
    after: '2–3 days',
    note: 'ICH M15-aligned format',
  },
];

export default function CS3Pilot() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Pilot evidence</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Same scientific output, faster —{' '}
        <span style={{ color: 'var(--sage)' }}>with audit gates intact.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        The model came faster, and was no less defensible.
        Every output carries a hash-chain provenance trail.
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
            display: 'flex', flexDirection: 'column',
            gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
          }}>
            {/* Header row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 2fr',
              gap: 'var(--space-3)',
              paddingBottom: 'var(--space-2)',
              borderBottom: '1px solid var(--cream-hairline)',
            }}>
              {['Deliverable', 'Before', 'After', 'Note'].map((h) => (
                <span key={h} className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-muted)',
                  letterSpacing: '0.08em', fontWeight: 600,
                }}>{h}</span>
              ))}
            </div>

            {PILOTS.map((p, i) => (
              <motion.div
                key={p.metric}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 2fr',
                  gap: 'var(--space-3)',
                  alignItems: 'baseline',
                  padding: 'var(--space-2) 0',
                  borderBottom: '1px solid color-mix(in srgb, var(--cream-hairline) 40%, transparent)',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 + i * 0.15, ease: [0.2, 0.7, 0.3, 1] }}
              >
                <span className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)',
                  fontWeight: 600,
                }}>{p.metric}</span>
                <span className="deck-mono" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-faint)',
                  textDecoration: 'line-through', opacity: 0.6,
                }}>{p.before}</span>
                <span className="deck-mono" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--sage)',
                  fontWeight: 700,
                }}>{p.after}</span>
                <span className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)',
                }}>{p.note}</span>
              </motion.div>
            ))}

            {/* Caveat */}
            <motion.div
              style={{
                marginTop: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                background: 'color-mix(in srgb, var(--sage) 8%, transparent)',
                border: '1px solid color-mix(in srgb, var(--sage) 30%, transparent)',
                borderRadius: 'var(--radius-sm)',
              }}
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <span className="deck-body italic" style={{
                fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-muted)',
              }}>
                Pilot metrics from internal project runs. All outputs passed the same
                QC checklists and regulatory review gates as manual workflows.
              </span>
            </motion.div>
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Act 5 · Evidence"
        tagline="Regulator-traceable artifacts at every step. Same reproducibility, less scaffolding."
      />
    </SlideGrid>
  );
}
