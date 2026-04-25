import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
/**
 * CS2 Act 2 · Architecture — three pillars of the dossier.
 *
 * MIN-DESIGN PASS. Three-card grid showing the evidence scaffold:
 * PopPK, PBPK DDI, flat E-R. Each card is a RecapCard pattern.
 */

const PILLARS = [
  {
    n: '01',
    label: 'PopPK',
    title: 'Race/ethnicity invariance',
    body: 'N ≈ 253 patients. No significant covariate effect of age, weight, sex, race, ethnicity, mild-moderate renal, or mild hepatic impairment.',
    source: 'Le et al., CPT:PSP 2021',
  },
  {
    n: '02',
    label: 'PBPK DDI',
    title: 'CYP3A4 induction label',
    body: 'PBPK predicted CYP3A4-induction DDI on midazolam (AUC ratio 0.18). Strong inducer label call went into the USPI without a dedicated clinical study for every substrate.',
    source: 'Xu et al., CPT:PSP 2021',
  },
  {
    n: '03',
    label: 'E-R',
    title: 'Flat across studied range',
    body: 'Apparent flat exposure-efficacy curve supports 500 mg QD as a wide-therapeutic-index dose. QTc prolongation is the dose-related safety concern.',
    source: 'Le et al., CPT:PSP 2021',
  },
];

export default function CS2Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Architecture</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Three pillars carried the{' '}
        <span style={{ color: 'var(--cyan)' }}>regulatory bridge.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={88} size="lead">
        PopPK showed no ethnic signal. PBPK earned the DDI label. Flat E-R anchored
        the dose.
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
            gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          }}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.n}
                style={{
                  position: 'relative', minWidth: 0, overflow: 'hidden',
                  border: '1px solid var(--cream-hairline)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                  padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.85 + i * 0.15, ease: [0.2, 0.7, 0.3, 1] }}
              >
                {/* Left accent rail */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: 4, background: 'var(--cyan)',
                }} />

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                  <span className="deck-mono" style={{
                    fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cyan)',
                    letterSpacing: '0.1em', fontWeight: 700,
                  }}>PILLAR {p.n}</span>
                  <span className="deck-mono uppercase" style={{
                    fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-faint)',
                    letterSpacing: '0.08em',
                  }}>{p.label}</span>
                </div>

                <div className="deck-display" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cyan)',
                  fontStyle: 'italic', fontWeight: 500, lineHeight: 1.2,
                }}>{p.title}</div>

                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)',
                  lineHeight: 1.45, flex: 1,
                }}>{p.body}</div>

                <div className="deck-mono" style={{
                  fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)',
                  letterSpacing: '0.06em',
                }}>{p.source}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Act 2 · Three pillars"
        tagline="Modeling IS the bridge — PopPK, PBPK, and E-R replaced the local trial."
        source="Le et al., PMC8212730 · Xu et al., PMC8213421 · Tibsovo USPI 2021"
      />
    </SlideGrid>
  );
}
