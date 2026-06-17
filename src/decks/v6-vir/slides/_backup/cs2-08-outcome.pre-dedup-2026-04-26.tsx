// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 Act 5 · Outcome — India approval 14 May 2025.
 *
 * MIN-DESIGN PASS. Three impact stats in an asymmetric row.
 */

const STATS = [
  {
    value: '14 May 2025',
    label: 'CDSCO approval',
    accent: true,
  },
  {
    value: '0',
    label: 'Indian patients in pivotals',
    accent: false,
  },
  {
    value: 'n = 185',
    label: 'ClarIDHy pivotal (CCA)',
    accent: false,
  },
  {
    value: '~33%',
    label: 'CR+CRh in R/R AML',
    accent: false,
  },
  {
    value: '0.18',
    label: 'midazolam AUC ratio (PBPK)',
    accent: false,
  },
];

export default function CS2Outcome() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Outcome</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        First IDH1 inhibitor{' '}
        <span style={{ color: 'var(--cyan)' }}>available in India.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        Approved 14 May 2025. Launched 5 June 2025. The Clin Pharm dossier and
        Rule 101 carried the registration — no local efficacy trial.
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(10rem, 100%), 1fr))',
            gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          }}>
            {STATS.map((s, i) => {
              const color = s.accent ? 'var(--cyan)' : 'var(--cream)';
              return (
                <motion.div
                  key={s.label}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
                    minWidth: 0,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.85 + i * 0.2,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <span className="deck-display" style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 700, color,
                    fontVariantNumeric: 'tabular-nums', lineHeight: 1,
                  }}>{s.value}</span>

                  <div style={{
                    width: 'clamp(48px, 8vw, 80px)', height: 'var(--stroke-hair)',
                    background: s.accent ? 'var(--cyan)' : 'var(--cream-faint)',
                  }} />

                  <span className="deck-body" style={{
                    fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)',
                    lineHeight: 1.4,
                  }}>{s.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.0}
        kicker="Act 5 · India approval"
        tagline="The dossier replaced the trial. The model replaced the study."
        source="Servier India press Jun 2025 · Norsworthy et al., Clin Cancer Res 2019 · Bolleddula et al., PMC8213421"
      />
    </SlideGrid>
  );
}
