import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 Act 4 · Velocity — global regulatory timeline.
 *
 * MIN-DESIGN PASS. Horizontal timeline showing 7 years of label
 * maturation from FDA AML 2018 to CDSCO India May 2025.
 */

const MILESTONES = [
  { year: '2018', label: 'FDA', detail: 'R/R AML' },
  { year: '2019', label: 'FDA', detail: 'ND AML (≥75y)' },
  { year: '2021', label: 'FDA', detail: 'CCA' },
  { year: '2022', label: 'FDA', detail: 'AML + Aza' },
  { year: '2023', label: 'EMA', detail: 'AML + CCA' },
  { year: '2024', label: 'DCGI', detail: 'Rule 101 order', highlight: true },
  { year: '2025', label: 'CDSCO', detail: 'India approval', highlight: true },
];

export default function CS2Velocity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Velocity</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Seven years of Clin Pharm dossier maturation —{' '}
        <span style={{ color: 'var(--cyan)' }}>then one regulatory pivot.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={88} size="lead">
        India's approval sits on top of a global package that grew through four FDA
        labels, an EMA conditional MA, and the August 2024 Rule 101 reform.
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
          <div style={{ width: '100%', position: 'relative' }}>
            {/* Axis line */}
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 0,
              height: 1, background: 'var(--cream-hairline)',
            }} />

            <div style={{
              display: 'flex', flexWrap: 'wrap',
              gap: 'clamp(var(--space-3), 2vw, var(--space-6))',
              justifyContent: 'space-between',
              position: 'relative',
            }}>
              {MILESTONES.map((m, i) => {
                const accent = m.highlight ? 'var(--cyan)' : 'var(--cream-faint)';
                return (
                  <motion.div
                    key={`${m.year}-${m.label}`}
                    style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: 'var(--space-2)',
                      minWidth: 0, flex: '1 1 0',
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.85 + i * 0.1, ease: [0.2, 0.7, 0.3, 1] }}
                  >
                    <span className="deck-mono" style={{
                      fontSize: 'var(--fs-slide-name)', fontVariantNumeric: 'tabular-nums',
                      fontWeight: 700, color: accent,
                    }}>{m.year}</span>

                    {/* Dot on axis */}
                    <div style={{
                      width: m.highlight ? 12 : 8,
                      height: m.highlight ? 12 : 8,
                      borderRadius: '50%',
                      background: m.highlight ? 'var(--cyan)' : 'var(--bg)',
                      border: `2px solid ${accent}`,
                      flexShrink: 0,
                    }} />

                    <span className="deck-mono uppercase" style={{
                      fontSize: 'var(--fs-slide-eyebrow)', color: accent,
                      letterSpacing: '0.08em', fontWeight: 600,
                      textAlign: 'center', whiteSpace: 'nowrap',
                    }}>{m.label}</span>
                    <span className="deck-body" style={{
                      fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-muted)',
                      textAlign: 'center', lineHeight: 1.3,
                    }}>{m.detail}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Act 4 · Timeline"
        tagline="Seven years of global registration — Rule 101 was the unlock."
      />
    </SlideGrid>
  );
}
