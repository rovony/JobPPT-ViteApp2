// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { AccentRule, Kicker, fadeIn, INK, TYPE } from '../../_shared/deck-ui';

export default function Cs1Hypotheses() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.12}>Case 01 · Scientific hypothesis</Eyebrow>
      <Headline delay={0.22} maxChars={64}>
        Two readings of the same data — and{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>one hinge that separates them.</span>
      </Headline>
      <Subhead delay={0.3}>Disease similarity decides whether matched exposure is decision-grade.</Subhead>
      <Viz>
        <motion.div
          {...fadeIn(reduced, 0.4, 8)}
          style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 'var(--space-4)', height: '100%', alignItems: 'stretch' }}
        >
          <div
            style={{
              padding: 'var(--space-5)',
              border: `1px solid color-mix(in srgb, var(--case) 30%, transparent)`,
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--case) 8%, var(--panel))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <AccentRule reduced delay={0} />
            <Kicker>Working</Kicker>
            <div className="deck-display" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.55rem)', color: INK.primary, fontWeight: 600, lineHeight: 1.3 }}>
              Exposure matching is decision-grade
            </div>
            <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.55 }}>
              Pediatric PAH is similar enough that weight-aware adult exposure can carry the dose.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              className="deck-mono"
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '50%',
                border: `1px solid ${INK.hairline}`,
                display: 'grid',
                placeItems: 'center',
                color: INK.secondary,
                fontWeight: 700,
                fontSize: TYPE.label,
                background: 'var(--bg)',
              }}
            >
              VS
            </div>
          </div>

          <div
            style={{
              padding: 'var(--space-5)',
              border: `1px solid color-mix(in srgb, var(--amber) 35%, transparent)`,
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--amber) 6%, var(--panel))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <AccentRule reduced delay={0} color="var(--amber)" />
            <Kicker color="var(--amber)">Competing</Kicker>
            <div className="deck-display" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.55rem)', color: INK.primary, fontWeight: 600, lineHeight: 1.3 }}>
              The bridge is false comfort
            </div>
            <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.55 }}>
              Pediatric response differs enough that matched exposure ≠ matched benefit–risk.
            </div>
          </div>
        </motion.div>
      </Viz>
      <Footer kicker="Hinge" tagline="Kill test: predictive checks · weight · safety · adult-range consistency" source="Beat 3 · scientific hypothesis" />
    </SlideGrid>
  );
}
