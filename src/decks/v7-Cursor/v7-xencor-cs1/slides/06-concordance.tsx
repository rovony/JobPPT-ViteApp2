// @ts-nocheck
import { useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { HeroNum, ExposureBand, Surface, Kicker, AmbientLungs, INK, TYPE } from '../_shared/cs1-ui';

export default function Cs1Concordance() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <AmbientLungs variant="signature" opacity={0.05} />
      <Eyebrow delay={0.12}>Case 01 · Credibility · concordance</Eyebrow>
      <Headline delay={0.22} maxChars={68}>
        Pediatric exposures landed inside the adult therapeutic band{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>once weight was accounted for.</span>
      </Headline>
      <Subhead delay={0.3}>One visual. Every number answers the dose question.</Subhead>
      <Viz>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(11rem, 0.65fr) 1.35fr',
            gap: 'var(--space-6)',
            height: '100%',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <HeroNum
              value="−3%"
              label="Low-dose AUCss vs adults"
              detail="High dose ≈ +0.3% · both in band"
              delay={0.4}
              reduced={reduced}
              size={TYPE.hero}
            />
            <Surface delay={0.48} reduced={reduced} accent={INK.accent}>
              <Kicker>So what for the dose</Kicker>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.primary, lineHeight: 1.5 }}>
                Adult band remains a usable target. Null E-R does not refute the dose.
              </div>
            </Surface>
          </div>
          <ExposureBand reduced={reduced} delay={0.45} pediatricPct={48} />
        </div>
      </Viz>
      <Footer kicker="Concordance" tagline="Weight-aware predictions generalize to the pediatric cohort" source="Geometric mean AUCss · Okour et al. JCP 2023" />
    </SlideGrid>
  );
}
