/**
 * CS1 Beat 8 · Outcome — claim boundary + agency triptych
 * Merges prior outcome + lesson content.
 */
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Cs1ClaimBoundary from '../components/cs1/Cs1ClaimBoundary';

export default function Cs1Outcome() {
  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.06}>Case 01 · Outcome</Eyebrow>

      <GridSlot area="headline" as="h1" className="deck-display xc-hook self-center">
        EMA and PMDA accepted the labeling bridge — FDA never received the package
      </GridSlot>

      <Subhead delay={0.1} size="lead" maxChars={72}>
        Supported claim is dose labeling. Pediatric efficacy was never re-proven in
        this terminated program.
      </Subhead>

      <Viz>
        <div className="cs1-result-viz">
          <Cs1ClaimBoundary />
          <p className="cs1-outcome-own">
            I owned the exposure-matching argument end-to-end — model architecture,
            falsifiers, and what we would and would not claim.
          </p>
        </div>
      </Viz>

      <Footer kicker="CS1 · Outcome" tagline="Dose labeling · not re-proven efficacy" source="" />
    </SlideGrid>
  );
}
