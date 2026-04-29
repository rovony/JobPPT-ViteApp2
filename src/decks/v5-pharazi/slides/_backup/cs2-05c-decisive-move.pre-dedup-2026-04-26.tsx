// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 · Decisive move — predicted → qualified → labeled.
 *
 * Differentiated from cs2-pillars Pillar 05 (the structural "extrinsic factors"
 * dashboard tile, which owns the 0.18 hero numeral) by leading with VERBS, not
 * the number. Pillar 05 says "PBPK quantified all DDI scenarios"; this slide
 * says "PBPK earned its place in the label." Same evidence, different beat.
 *
 * The chronology IS the visual:
 *   Step 01 · PREDICTED  — Simcyp model · midazolam AUC ratio = 0.18
 *   Step 02 · QUALIFIED  — fluconazole clinical DDI within 1.2× observed
 *   Step 03 · LABELED    — Tibsovo USPI Section 7 · CYP3A4 dose adjustment
 *
 * Restored 2026-04-26 from orphaned qa.ts/notes.ts entry; previously cut
 * from manifest during a refactor. Position-fit signal for Sr Director.
 *
 * Sources: Bolleddula et al., CPT:PSP 2021; Tibsovo USPI Section 7.
 */

const C = {
  cyan: 'var(--cyan)',
  amber: 'var(--amber)',
  cream: 'var(--cream)',
  creamMuted: 'var(--cream-muted)',
  creamFaint: 'var(--cream-faint)',
  hairline: 'var(--cream-hairline)',
};

const EASE = [0.2, 0.7, 0.3, 1];

const D = {
  step1: 0.7,
  step2: 1.0,
  step3: 1.3,
  amber: 1.7,
  footer: 2.1,
};

const STEPS = [
  {
    kicker: 'Step 01',
    verb: 'PREDICTED',
    detail: 'midazolam AUC ratio = 0.18',
    body: 'PBPK Simcyp model. Ivosidenib as CYP3A4 perpetrator at steady state.',
    cite: 'Bolleddula et al., CPT:PSP 2021',
    accent: 'cyan',
  },
  {
    kicker: 'Step 02',
    verb: 'QUALIFIED',
    detail: 'within 1.2× observed',
    body: 'Fluconazole clinical DDI study and 4β-OHC autoinduction biomarkers confirmed the model.',
    cite: 'Bolleddula et al., CPT:PSP 2021',
    accent: 'cyan',
  },
  {
    kicker: 'Step 03',
    verb: 'LABELED',
    detail: 'Section 7 · dose adjustment',
    body: 'Tibsovo USPI carries CYP3A4 substrate dose-adjustment language. The prediction is regulatory text.',
    cite: 'Tibsovo USPI · FDA',
    accent: 'amber',
  },
];

export default function CS2DecisiveMove() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · The decisive move</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Prediction qualified,{' '}
        <span style={{ color: C.cyan, fontStyle: 'italic', fontWeight: 700 }}>then labeled.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={110} size="lead">
        PBPK called the midazolam AUC ratio. Clinical data confirmed it. The label adopted the dose-adjustment.
      </Subhead>

      <Viz>
        <div ref={ref} style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          gap: 'var(--space-4)',
          minHeight: 0, minWidth: 0,
        }}>
          {/* 3-step horizontal flow — auto-fit reflows to vertical on narrow viewports */}
          <div style={{
            flex: 1, minHeight: 0, minWidth: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(14rem, 100%), 1fr))',
            gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
            alignItems: 'stretch',
          }}>
            {STEPS.map((step, i) => {
              const isAmber = step.accent === 'amber';
              const accent = isAmber ? C.amber : C.cyan;
              const stepDelay = i === 0 ? D.step1 : i === 1 ? D.step2 : D.step3;
              return (
                <motion.div
                  key={step.kicker}
                  initial={{ opacity: 0, y: 12 }}
                  animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: stepDelay, ease: EASE }}
                  style={{
                    border: `1px solid ${isAmber
                      ? 'color-mix(in srgb, var(--amber) 36%, transparent)'
                      : 'color-mix(in srgb, var(--cyan) 28%, transparent)'}`,
                    borderLeft: `4px solid ${accent}`,
                    borderRadius: 'var(--radius-lg)',
                    background: isAmber
                      ? 'color-mix(in srgb, var(--amber) 8%, transparent)'
                      : 'color-mix(in srgb, var(--cyan) 8%, transparent)',
                    padding: 'var(--space-4) var(--space-5)',
                    display: 'flex', flexDirection: 'column',
                    minWidth: 0, minHeight: 0,
                    gap: 'var(--space-3)',
                  }}
                >
                  {/* Kicker — Step NN */}
                  <div className="deck-mono uppercase" style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: C.creamFaint,
                  }}>
                    {step.kicker}
                  </div>

                  {/* Verb hero — large mono, accent color */}
                  <div className="deck-mono" style={{
                    fontSize: 'var(--fs-slide-headline)',
                    fontWeight: 700,
                    color: accent,
                    letterSpacing: '0.04em',
                    lineHeight: 0.95,
                  }}>
                    {step.verb}
                  </div>

                  {/* Detail — italic display, the data point */}
                  <div className="deck-display" style={{
                    fontStyle: 'italic',
                    fontSize: 'var(--fs-slide-lead)',
                    fontWeight: 500,
                    color: C.cream,
                    lineHeight: 1.2,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {step.detail}
                  </div>

                  {/* Body — Inter, supporting prose */}
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-slide-subhead)',
                    color: C.creamMuted,
                    lineHeight: 1.45,
                    flex: 1,
                  }}>
                    {step.body}
                  </div>

                  {/* Cite — tiny mono with hairline */}
                  <div className="deck-mono" style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    letterSpacing: '0.04em',
                    color: C.creamFaint,
                    paddingTop: 'var(--space-2)',
                    borderTop: `1px solid ${C.hairline}`,
                  }}>
                    {step.cite}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Amber band — centered, rotated-square marker */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: D.amber, ease: EASE }}
            style={{
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--amber) 12%, transparent)',
              borderTop: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
              borderBottom: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'var(--space-3)',
            }}
          >
            <span aria-hidden style={{
              display: 'inline-block',
              transform: 'rotate(45deg)',
              width: 12, height: 12,
              background: C.amber,
              flex: '0 0 auto',
            }} />
            <div className="deck-display" style={{
              fontStyle: 'italic',
              fontSize: 'var(--fs-slide-tagline)',
              color: C.cream,
              lineHeight: 1.4,
              textAlign: 'center',
            }}>
              <span style={{ color: C.amber, fontWeight: 600 }}>Predicted, qualified, labeled.</span>{' '}
              The model carried the regulatory weight.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : D.footer}
        kicker="Case 02 · The model in the label"
        tagline=""
        source="Bolleddula et al., CPT:PSP 2021 · Tibsovo USPI Section 7"
      />
    </SlideGrid>
  );
}
