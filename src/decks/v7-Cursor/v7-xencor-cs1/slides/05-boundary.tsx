// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { AccentRule, Split, fadeIn, INK, TYPE, SPACE, STAGE } from '../_shared/cs1-ui';

/** Beat 6 — decision boundary (story-flow spine #5) */
export default function Cs1Boundary() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Decision boundary</Eyebrow>
      <Headline delay={STAGE.headline} maxChars={62}>
        Stay in the adult therapeutic band —{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>or redesign.</span>
      </Headline>
      <Subhead delay={STAGE.subhead}>Flipping assumption: disease similarity / exposure-target validity.</Subhead>
      <Viz>
        <Split min="16rem">
          <motion.div
            {...fadeIn(reduced, STAGE.viz, 8)}
            style={{
              padding: SPACE.padLg,
              borderRadius: 'var(--radius-md)',
              border: '1px solid color-mix(in srgb, var(--sage) 35%, transparent)',
              background: 'color-mix(in srgb, var(--sage) 10%, var(--panel))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              minWidth: 0,
            }}
          >
            <AccentRule reduced delay={0} color="var(--sage)" />
            <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: 'var(--sage)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700 }}>
              Action A · Proceed · landed here
            </div>
            <div className="deck-display" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 600, lineHeight: 1.35, maxWidth: '22ch' }}>
              Exposures in band + acceptable safety narrative
            </div>
            <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.5, marginTop: 'auto' }}>
              Recommend weight-based dosing for the agency package.
            </div>
          </motion.div>

          <motion.div
            {...fadeIn(reduced, STAGE.vizLate, 8)}
            style={{
              padding: SPACE.padLg,
              borderRadius: 'var(--radius-md)',
              border: '1px solid color-mix(in srgb, var(--coral) 35%, transparent)',
              background: 'color-mix(in srgb, var(--coral) 8%, var(--panel))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              minWidth: 0,
            }}
          >
            <AccentRule reduced delay={0} color="var(--coral)" />
            <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: 'var(--coral)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700 }}>
              Action B · Redesign
            </div>
            <div className="deck-display" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 600, lineHeight: 1.35, maxWidth: '22ch' }}>
              Systematic miss or unmanageable safety
            </div>
            <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.5, marginTop: 'auto' }}>
              Change dose, add data, or refuse to claim the bridge.
            </div>
          </motion.div>
        </Split>
      </Viz>
      <Footer kicker="Boundary" tagline="Often the most important slide — A vs B made visible" source="Beat 6 · playbook §12" />
    </SlideGrid>
  );
}
