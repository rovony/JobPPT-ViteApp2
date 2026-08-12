/**
 * CS1 Beat 7 · Result — pediatric AUC inside adult band
 * Auto marker reveal; no ZoomablePanel.
 */
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Cs1ExposureBand from '../components/cs1/Cs1ExposureBand';

export default function Cs1Pkpd() {
  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.06}>Case 01 · Result</Eyebrow>

      <GridSlot area="headline" as="h1" className="deck-display xc-hook self-center">
        Pediatric AUC landed inside the adult therapeutic band
      </GridSlot>

      <Subhead delay={0.1} size="lead" maxChars={70}>
        −3% low dose · +0.3% high dose vs adult AUCss target. Cmax checked safety —
        E-R for efficacy not identifiable at N = 39.
      </Subhead>

      <Viz>
        <div className="cs1-result-viz">
          <Cs1ExposureBand />
        </div>
      </Viz>

      <Footer kicker="CS1 · Result" tagline="Exposure match held" source="" />
    </SlideGrid>
  );
}
