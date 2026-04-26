// @ts-nocheck
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

/* Enhanced 2026-04-26 per user feedback: timeline was too sparse.
 * Each milestone now carries indication + key data anchor so the
 * audience reads "what happened" + "what evidence backed it" without
 * the speaker having to recite every detail. */
const MILESTONES = [
  { year: '2018', label: 'FDA',   detail: 'R/R AML',         anchor: '~33% CR+CRh · AG120-C-001 (n=174)' },
  { year: '2019', label: 'FDA',   detail: 'ND AML',          anchor: '≥75y or comorbid · n=33' },
  { year: '2021', label: 'FDA',   detail: 'CCA',             anchor: 'ClarIDHy Phase 3 (n=187)' },
  { year: '2022', label: 'FDA',   detail: 'AML + Aza',       anchor: 'AGILE · combination cohort' },
  { year: '2023', label: 'EMA',   detail: 'Conditional MA',  anchor: 'AML + CCA · multi-jurisdictional' },
  { year: 'Aug 2024', label: 'DCGI',  detail: 'Rule 101 order',  anchor: 'Clin Pharm-led waiver pathway · operational',  highlight: true },
  { year: 'May 2025', label: 'CDSCO', detail: 'India approval',  anchor: 'First IDH1 inhibitor in India · launched 5 Jun', highlight: true },
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
                    transition={{ duration: 0.5, delay: 0.85 + i * 0.12, ease: [0.2, 0.7, 0.3, 1] }}
                  >
                    <span className="deck-mono" style={{
                      fontSize: 'var(--fs-slide-name)', fontVariantNumeric: 'tabular-nums',
                      fontWeight: 700, color: accent, whiteSpace: 'nowrap',
                    }}>{m.year}</span>

                    {/* Dot on axis */}
                    <div style={{
                      width: m.highlight ? 14 : 8,
                      height: m.highlight ? 14 : 8,
                      borderRadius: '50%',
                      background: m.highlight ? 'var(--cyan)' : 'var(--bg)',
                      border: `2px solid ${accent}`,
                      flexShrink: 0,
                      boxShadow: m.highlight ? '0 0 0 4px color-mix(in srgb, var(--cyan) 18%, transparent)' : 'none',
                    }} />

                    <span className="deck-mono uppercase" style={{
                      fontSize: 'var(--fs-slide-eyebrow)', color: accent,
                      letterSpacing: '0.08em', fontWeight: 700,
                      textAlign: 'center', whiteSpace: 'nowrap',
                    }}>{m.label}</span>
                    <span className="deck-display" style={{
                      fontSize: 'var(--fs-slide-subhead)',
                      color: m.highlight ? 'var(--cream)' : 'var(--cream-muted)',
                      fontStyle: 'italic',
                      fontWeight: m.highlight ? 600 : 400,
                      textAlign: 'center', lineHeight: 1.2,
                    }}>{m.detail}</span>
                    <span className="deck-body" style={{
                      fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)',
                      textAlign: 'center', lineHeight: 1.3,
                      maxWidth: '12rem',
                    }}>{m.anchor}</span>
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
