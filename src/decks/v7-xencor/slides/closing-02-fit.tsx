// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Network, Globe2, ShieldCheck } from 'lucide-react';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CONCLUSION · Slide 02
 *
 * Repurposed from the prior fit close to a Xencor fit close.
 * Summarizes the operating model that transfers from the four cases to
 * Xencor's oncology and infectious-disease programs.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const PRINCIPLES = [
  {
    n: '01',
    color: 'var(--coral)',
    label: 'ASSAY TO MODEL',
    icon: Network,
    headline: 'Start from the decision.',
    body: 'Define the exposure metric, what the assay can and cannot measure, and which uncertainty must be owned before dose selection.',
  },
  {
    n: '02',
    color: 'var(--teal)',
    label: 'MODEL TO DOSE',
    icon: Globe2,
    headline: 'Make the dose defensible.',
    body: 'Use precision, exposure-response, optimal design, and OBD logic to explain why a dose is right, not only tolerated.',
  },
  {
    n: '03',
    color: 'var(--sage)',
    label: 'CROSS-FUNCTIONAL',
    icon: ShieldCheck,
    headline: 'Keep judgment visible.',
    body: 'Build tools and dossiers that make assumptions, caveats, and next questions clear to clinicians, statisticians, regulators, and program teams.',
  },
];

export default function ClosingConclusion() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Why Xencor</Eyebrow>

      <Headline delay={0.25} maxChars={65}>
        This is the operating model I would bring to{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 600 }}>
          Xencor.
        </span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        Model discipline under evidence constraints: clarify the decision, protect interpretability, and make the rationale portable across functions.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
          gap: 'var(--space-8)',
          alignItems: 'stretch',
          paddingTop: 'var(--space-6)',
        }}>
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={go ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.15, ease: EASE }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-6) var(--space-5)',
                  background: 'color-mix(in srgb, var(--panel) 40%, transparent)',
                  border: `1px solid color-mix(in srgb, var(--cream-hairline) 50%, transparent)`,
                  borderTop: `3px solid ${p.color}`,
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: `0 8px 32px color-mix(in srgb, ${p.color} 5%, transparent)`,
                  overflow: 'hidden',
                  isolation: 'isolate',
                }}
              >
                {/* Massive Ambient Number */}
                <div
                  aria-hidden
                  className="deck-display"
                  style={{
                    position: 'absolute',
                    top: '-5%',
                    right: '-10%',
                    fontSize: 'var(--fs-slide-display)',
                    fontWeight: 900,
                    color: p.color,
                    opacity: 0.04,
                    zIndex: -1,
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {p.n}
                </div>

                {/* Header Group */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: `color-mix(in srgb, ${p.color} 15%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${p.color} 30%, transparent)`,
                  }}>
                    <Icon size={16} color={p.color} strokeWidth={2.5} />
                  </div>
                  <span className="deck-mono uppercase" style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: p.color,
                    fontWeight: 700,
                  }}>
                    {p.label}
                  </span>
                </div>

                {/* Typography Group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                  <h3 className="deck-display" style={{
                    fontSize: 'var(--fs-card-title)',
                    color: 'var(--cream)',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    margin: 0,
                  }}>
                    {p.headline}
                  </h3>
                  <p className="deck-body" style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'color-mix(in srgb, var(--cream) 70%, transparent)',
                    lineHeight: 1.5,
                    margin: 0,
                    maxWidth: '32ch',
                  }}>
                    {p.body}
                  </p>
                </div>

                {/* Subtle gradient overlay at the bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '40%',
                  background: `linear-gradient(to top, color-mix(in srgb, ${p.color} 5%, transparent), transparent)`,
                  pointerEvents: 'none',
                  zIndex: -1,
                }} />
              </motion.div>
            );
          })}
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.7}
        kicker="Why Xencor"
        tagline="Evidence discipline for fast, complex, high-consequence programs."
      />
    </SlideGrid>
  );
}
