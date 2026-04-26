/**
 * TEMPLATE: Two-Column Comparison
 *
 * USE FOR: EMA vs FDA, before/after, method vs result, challenge vs solution.
 * Examples: regulatory dual-path, adult vs pediatric, old vs new approach.
 *
 * HOW TO ADAPT:
 * 1. Change dataCase to coral/cyan/violet
 * 2. Update LEFT_COL and RIGHT_COL with your content
 * 3. Adjust column ratio (2fr 3fr = 40/60; 1fr 1fr = 50/50)
 * 4. Each column has a kicker label, optional hero stat, and body items
 */

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const LEFT_COL = {
  kicker: 'EMA · Exposure Matching',
  heroLabel: 'Primary path',
  items: [
    { label: 'Method', value: 'Model-based PK matching to adult reference' },
    { label: 'Endpoint', value: 'AUCss overlap with adult target range' },
    { label: 'Strength', value: 'Does not require placebo-controlled efficacy trial' },
  ],
  accentColor: 'var(--case)',
};

const RIGHT_COL = {
  kicker: 'FDA · PVR Quantitative Bridging',
  heroLabel: 'Exploratory path',
  items: [
    { label: 'Method', value: 'Exposure-response linking to PVR outcome' },
    { label: 'Endpoint', value: 'PVR improvement predicted from adult E-R curve' },
    { label: 'Strength', value: 'Direct pharmacodynamic link to disease biology' },
  ],
  accentColor: 'var(--amber)',
};

const panelStyle = {
  border: '1px solid var(--cream-hairline)',
  borderRadius: 'var(--radius-lg)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  padding: 'var(--space-4)',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
};

export default function TplTwoCol() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  const renderColumn = (col, delay) => (
    <motion.div
      style={{
        ...panelStyle,
        borderLeft: `4px solid ${col.accentColor}`,
      }}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: col.accentColor,
          fontWeight: 700,
        }}
      >
        {col.kicker}
      </div>

      {col.heroLabel && (
        <div
          className="deck-display"
          style={{
            fontSize: 'var(--fs-card-title)',
            color: col.accentColor,
            fontWeight: 600,
            fontStyle: 'italic',
          }}
        >
          {col.heroLabel}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {col.items.map((item) => (
          <div key={item.label}>
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
                marginBottom: 'var(--space-1)',
              }}
            >
              {item.label}
            </div>
            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream)',
                lineHeight: 1.55,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · Comparison</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        Two paths, one destination{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — which framework carries the dose?
        </span>
      </Headline>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
            gap: 'var(--space-3)',
            minWidth: 0,
            alignContent: 'start',
            paddingTop: 'var(--space-2)',
          }}
        >
          {renderColumn(LEFT_COL, 0.6)}
          {renderColumn(RIGHT_COL, 0.8)}
        </div>
      </Viz>

      <Footer
        kicker="01 · COMPARISON"
        tagline="Template pattern — adapt columns to your comparison."
        source="Source · Replace with actual citation"
      />
    </SlideGrid>
  );
}
