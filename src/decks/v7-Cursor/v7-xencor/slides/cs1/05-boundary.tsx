// @ts-nocheck
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Viz, Footer } from '@/components/deck/SlideParts';
import { INK, STAGE } from '../../_shared/deck-ui';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import { KillBridgeViz } from '../../components/notebooklm/Cs1NotebookViz';

/** Beat 6 — kill conditions agreed before analysis (Xencor-Deck #10). */
export default function Cs1Boundary() {
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS_NO_SUBHEAD} rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Decision boundary</Eyebrow>
      <SolidHeadline delay={STAGE.headline} maxChars={74}>
        Four conditions would have broken the bridge —{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>
          agreed before the data were analysed.
        </span>
      </SolidHeadline>
      <Viz>
        <KillBridgeViz />
      </Viz>
      <Footer kicker="06 · CS1 · Boundary" tagline="" source="Xencor-Deck #10 · NotebookLM kill tests" />
    </SlideGrid>
  );
}
