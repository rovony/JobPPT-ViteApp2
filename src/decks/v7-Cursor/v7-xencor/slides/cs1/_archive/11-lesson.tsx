// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { AmbientLungs, AccentRule, Kicker, fadeIn, INK, TYPE } from '../../_shared/deck-ui';

export default function Cs1Lesson() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <AmbientLungs variant="exit" opacity={0.05} />
      <Eyebrow delay={0.12}>Case 01 · Lesson · bridge</Eyebrow>
      <Headline delay={0.22} maxChars={66}>
        When efficacy is ethically out of reach,{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>exposure becomes the decision language.</span>
      </Headline>
      <Subhead delay={0.3}>Match what you can measure. Falsify what would kill you. Never invent an unsupported E-R.</Subhead>
      <Viz>
        <motion.div
          {...fadeIn(reduced, 0.4, 8)}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: 'var(--space-4)',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              padding: 'var(--space-5)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid color-mix(in srgb, var(--case) 30%, transparent)`,
              background: 'color-mix(in srgb, var(--case) 10%, var(--panel))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 'var(--space-3)',
            }}
          >
            <AccentRule reduced delay={0} />
            <Kicker>Portable lesson</Kicker>
            <div className="deck-display" style={{ fontSize: 'clamp(1.2rem, 2.1vw, 1.6rem)', color: INK.primary, fontWeight: 600, lineHeight: 1.4, maxWidth: '30ch' }}>
              Sparse-data credibility is decision craft — not model theater.
            </div>
          </div>

          <div
            style={{
              padding: 'var(--space-5)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${INK.hairline}`,
              background: INK.panel,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            <Kicker color="var(--amber)">Seam to India</Kicker>
            <div>
              <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: INK.accent, letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700, marginBottom: 4 }}>
                This case · interpolation
              </div>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.primary, lineHeight: 1.45 }}>
                Shared adult–pediatric disease frame
              </div>
            </div>
            <div aria-hidden style={{ height: 1, background: INK.hairline }} />
            <div>
              <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: 'var(--amber)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700, marginBottom: 4 }}>
                Next · transport
              </div>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.45 }}>
                Across populations — harder claim, different kill test
              </div>
            </div>
          </div>
        </motion.div>
      </Viz>
      <Footer kicker="Close" tagline="Interpolation → transport. Same craft, different risk." source="Bridge to Case · India" />
    </SlideGrid>
  );
}
