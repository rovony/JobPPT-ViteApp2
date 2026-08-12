/**
 * CS1 Beat 4 · Strategy — adults build · children confirm
 * Funnel + auto workflow; no ZoomablePanel.
 */
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';
import Cs1FunnelSvg from '../components/cs1/Cs1FunnelSvg';
import Cs1AutoWorkflow from '../components/cs1/Cs1AutoWorkflow';

export default function Cs1Poppk() {
  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <div className="cs1-lung-watermark cs1-lung-watermark--soft" aria-hidden>
        <Lungs layoutId="cs1-lung" variant="ambient" widthOverride="100%" />
      </div>

      <Eyebrow delay={0.06}>Case 01 · Strategy</Eyebrow>

      <GridSlot area="headline" as="h1" className="deck-display xc-hook self-center">
        380 adults build structure · 39 children confirm transportability
      </GridSlot>

      <Subhead delay={0.1} size="lead" maxChars={72}>
        Fixed allometry a priori · strict parsimony · least-complex credible model.
      </Subhead>

      <Viz>
        <div className="cs1-strategy-viz">
          <div className="cs1-strategy-viz__funnel xc-min0 xc-stack-fill__grow">
            <Cs1FunnelSvg />
          </div>
          <Cs1AutoWorkflow />
        </div>
      </Viz>

      <Footer kicker="CS1 · Strategy" tagline="Adults build · children confirm" source="" />
    </SlideGrid>
  );
}
