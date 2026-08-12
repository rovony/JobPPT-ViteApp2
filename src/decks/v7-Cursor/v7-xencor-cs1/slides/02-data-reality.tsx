// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { AmbientLungs, HeroNum, fadeIn, INK, TYPE } from '../_shared/cs1-ui';

export default function Cs1DataReality() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <AmbientLungs opacity={0.05} />
      <Eyebrow delay={0.12}>Case 01 · Data reality</Eyebrow>
      <Headline delay={0.22} maxChars={66}>
        Thirty-nine PK-evaluable children could not answer efficacy —{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>but could answer exposure.</span>
      </Headline>
      <Subhead delay={0.3}>Untrialable efficacy — not missing diligence.</Subhead>
      <Viz>
        <motion.div
          {...fadeIn(reduced, 0.4, 8)}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1px 1fr',
            gap: 'var(--space-5)',
            alignItems: 'end',
            height: '100%',
            position: 'relative',
            zIndex: 1,
            paddingBottom: 'var(--space-2)',
          }}
        >
          <div style={{ paddingBottom: 'var(--space-3)', borderBottom: `2px solid ${INK.primary}` }}>
            <HeroNum
              value="380"
              label="Adults · 6 studies"
              detail="Strong exposure reference"
              delay={0}
              reduced
              color={INK.primary}
              size={TYPE.hero}
            />
          </div>
          <div aria-hidden style={{ alignSelf: 'stretch', background: INK.hairline, opacity: 0.8 }} />
          <div style={{ paddingBottom: 'var(--space-3)', borderBottom: `2px solid ${INK.accent}` }}>
            <HeroNum
              value="39"
              label="Children · PK-evaluable"
              detail="Open-label · no placebo · sparse doses"
              delay={0}
              reduced
              size={TYPE.heroSm}
            />
          </div>
        </motion.div>
      </Viz>
      <Footer kicker="Asymmetry" tagline="Efficacy power unavailable · exposure still measurable" source="Okour et al. JCP 2023 · AMB112529" />
    </SlideGrid>
  );
}
