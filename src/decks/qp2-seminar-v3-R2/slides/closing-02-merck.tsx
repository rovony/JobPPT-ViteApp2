// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Network, Globe2, ShieldCheck } from 'lucide-react';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CONCLUSION · Slide 02
 *
 * Repurposed from "Merck fit" to a strong, objective conclusion.
 * Summarizes the three main case studies (PAH, Oncology, AI Infrastructure)
 * with a focus on regulatory-grade evidence and defensible methodology.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const PRINCIPLES = [
  {
    n: '01',
    color: 'var(--coral)',
    label: 'PAH · PEDIATRICS',
    icon: Network,
    headline: 'Pediatric extrapolation.',
    body: 'A regulator-tested framework for defining adult anchors, pediatric PK, and defensible dose logic.',
  },
  {
    n: '02',
    color: 'var(--cyan)',
    label: 'ONCOLOGY · BRIDGING',
    icon: Globe2,
    headline: 'Global-to-local bridging.',
    body: 'Translating disease mechanism, PK/PD, and covariates into regional reliance dossiers when local trials are infeasible.',
  },
  {
    n: '03',
    color: 'var(--sage)',
    label: 'AI INFRASTRUCTURE',
    icon: ShieldCheck,
    headline: 'Audit-backed architecture.',
    body: 'Designing scalable computational tools around immutable ledgers and strict human-in-the-loop workflows.',
  },
];

export default function ClosingConclusion() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Conclusion</Eyebrow>

      <Headline delay={0.25} maxChars={65}>
        Three validated{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 600 }}>
          foundations.
        </span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        A track record of taking complex methodologies and turning them into defensible, regulatory-grade evidence.
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
        kicker="Conclusion"
        tagline="Methods, regulator-tested judgment, and platform-minded infrastructure."
      />
    </SlideGrid>
  );
}
