// @ts-nocheck
/**
 * 07v2 — CS1 decision, fresh from v6-era Swiss DecisionBoard (cs1-decision.png).
 * Enhance only: Subhead for context · bigger panel type · shorter bodies · no fork clutter.
 */
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { INK, STAGE } from '../../_shared/deck-ui';
import DecisionBoardV2 from '../../components/cs1/DecisionBoardV2';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import { useSlideSteps } from '../../components/cs1/useSlideSteps';

export default function Cs1Decision({ step: stepProp = 0 }) {
  const step = useSlideSteps(3) ?? stepProp;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · The decision</Eyebrow>
      <SolidHeadline delay={STAGE.headline} maxChars={70}>
        The team still had to defend a pediatric dose{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>
          after the efficacy path stopped carrying the answer.
        </span>
      </SolidHeadline>
      <Subhead delay={STAGE.subhead} size="lead" maxChars={88}>
        Ambrisentan in pediatric PAH — progressive disease, terminated Phase IIb, and a dose that
        still had to be justified to two agencies.
      </Subhead>
      <Viz>
        <DecisionBoardV2 step={step} />
      </Viz>
      <Footer
        kicker="02 · CS1 · Decision"
        tagline=""
        source="07v2 · Swiss DecisionBoard · Okour et al. JCP 2023"
      />
    </SlideGrid>
  );
}
