import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import { IntegrateViz, ConstrainViz, ParsimonyViz } from './cs1-strategy/DecisionVisuals';

const PANELS = [
  { id: '01', title: 'Anchor visual', subtitle: 'Integrated vs pediatric-only stability', Viz: IntegrateViz },
  { id: '02', title: 'Constraint visual', subtitle: 'Fixed allometry vs free exponents', Viz: ConstrainViz },
  { id: '03', title: 'Parsimony visual', subtitle: 'Covariate screen and retention rule', Viz: ParsimonyViz },
];

export default function Slide08cCaseStrategyVisuals() {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="CS1 · Strategy visuals — implementation evidence"
      headline={
        <>
          The same three decisions, now shown as{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            visual evidence.
          </span>
        </>
      }
      headlineMaxChars={34}
      subhead="This slide is intentionally visual-only: keep narration short and map each panel back to Decision 01/02/03."
      subheadMaxChars={70}
      footerKicker="Case 01 · Strategy visuals"
      footerSource="Source · Okour et al. JCP 2023 · Anderson & Holford 2008"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          columnGap: 'var(--space-4)',
          minHeight: 0,
        }}
      >
        {PANELS.map((p, i) => (
          <motion.div
            key={p.id}
            style={{
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
              padding: 'var(--space-3)',
              display: 'grid',
              gridTemplateRows: 'auto auto 1fr',
              rowGap: 'var(--space-2)',
              minHeight: 0,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: 0.7 + i * 0.2 }}
          >
            <div className="deck-mono uppercase" style={{ color: 'var(--coral)', letterSpacing: '0.16em', fontSize: 'var(--fs-slide-kicker)' }}>
              Decision {p.id}
            </div>
            <div style={{ color: 'var(--cream)', fontWeight: 600 }}>{p.title}</div>
            <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div className="deck-mono uppercase" style={{ color: 'var(--cream-faint)', fontSize: 'var(--fs-slide-pageno)', letterSpacing: '0.12em' }}>
                {p.subtitle}
              </div>
              <div style={{ minHeight: 0, flex: 1 }}>
                <p.Viz delay={1.1 + i * 0.2} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideFrame>
  );
}

