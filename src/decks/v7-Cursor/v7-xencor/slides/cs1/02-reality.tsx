// @ts-nocheck
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Viz, Footer } from '@/components/deck/SlideParts';
import { INK, STAGE } from '../../_shared/deck-ui';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import { ConstraintMatrixViz } from '../../components/notebooklm/Cs1NotebookViz';

/** Beat 2 — structural impossibility (Xencor-Deck #07 + NotebookLM matrix). */
export default function Cs1Reality() {
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS_NO_SUBHEAD} rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Data reality</Eyebrow>
      <SolidHeadline delay={STAGE.headline} maxChars={70}>
        Not a failure to run the study —{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>
          a structural impossibility.
        </span>
      </SolidHeadline>
      <Viz>
        <ConstraintMatrixViz />
      </Viz>
      <Footer kicker="03 · CS1 · Reality" tagline="" source="Xencor-Deck #07 · NotebookLM constraint matrix" />
    </SlideGrid>
  );
}
