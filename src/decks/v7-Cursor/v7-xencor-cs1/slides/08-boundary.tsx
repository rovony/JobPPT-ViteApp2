// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { AccentRule, fadeIn, INK, TYPE } from '../_shared/cs1-ui';

export default function Cs1Boundary() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.12}>Case 01 · Decision boundary</Eyebrow>
      <Headline delay={0.22} maxChars={62}>
        Inside the adult band we recommend the dose;{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>outside it we redesign.</span>
      </Headline>
      <Subhead delay={0.3}>Flipping assumption: disease similarity / exposure-target validity.</Subhead>
      <Viz>
        <motion.div {...fadeIn(reduced, 0.4, 8)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', height: '100%' }}>
          <div
            style={{
              padding: 'var(--space-5)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid color-mix(in srgb, var(--sage) 35%, transparent)',
              background: 'color-mix(in srgb, var(--sage) 10%, var(--panel))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <AccentRule reduced delay={0} color="var(--sage)" />
            <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: 'var(--sage)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700 }}>
              Action A · Proceed · landed here
            </div>
            <div className="deck-display" style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)', color: INK.primary, fontWeight: 600, lineHeight: 1.3, maxWidth: '20ch' }}>
              Exposures in band + acceptable safety
            </div>
            <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.5, marginTop: 'auto' }}>
              Recommend weight-based dosing for the agency package.
            </div>
          </div>

          <div
            style={{
              padding: 'var(--space-5)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid color-mix(in srgb, var(--coral) 35%, transparent)',
              background: 'color-mix(in srgb, var(--coral) 8%, var(--panel))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <AccentRule reduced delay={0} color="var(--coral)" />
            <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: 'var(--coral)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700 }}>
              Action B · Redesign
            </div>
            <div className="deck-display" style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)', color: INK.primary, fontWeight: 600, lineHeight: 1.3, maxWidth: '20ch' }}>
              Systematic miss or unmanageable safety
            </div>
            <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.5, marginTop: 'auto' }}>
              Change dose, add data, or refuse to claim the bridge.
            </div>
          </div>
        </motion.div>
      </Viz>
      <Footer kicker="Boundary" tagline="We landed in Action A — said in exposure language" source="Decision grid · AUCss band" />
    </SlideGrid>
  );
}
