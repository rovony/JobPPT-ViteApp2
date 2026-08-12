// @ts-nocheck
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Viz, Footer } from '@/components/deck/SlideParts';
import { INK, STAGE } from '../../_shared/deck-ui';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import { useSlideSteps } from '../../components/cs1/useSlideSteps';
import { ModelArchitectureWithBar } from '../../components/notebooklm/ModelArchitectureBoard';

/** Beat 4 — architecture (Xencor-Deck #08). Pivot plate is not repeated here. */
export default function Cs1Strategy({ step: stepProp = 0 }) {
  const step = useSlideSteps(2) ?? stepProp;
  const showSide = step >= 1;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS_NO_SUBHEAD} rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Quantitative strategy</Eyebrow>
      <SolidHeadline delay={STAGE.headline} maxChars={72}>
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>
          380 adults build the model. 39 children confirm it.
        </span>{' '}
        Never the reverse.
      </SolidHeadline>
      <Viz>
        <ModelArchitectureWithBar showSide={showSide} />
      </Viz>
      <Footer kicker="04 · CS1 · Strategy" tagline="" source="Xencor-Deck #08 · NotebookLM funnel" />
    </SlideGrid>
  );
}
