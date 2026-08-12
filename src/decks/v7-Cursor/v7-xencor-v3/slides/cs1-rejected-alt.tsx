/**
 * CS1 Beat 5 · Rejected alternative
 */
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Cs1RejectedAltCompare from '../components/cs1/Cs1RejectedAltCompare';

export default function Cs1RejectedAlt() {
  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.06}>Case 01 · Rejected alternative</Eyebrow>

      <GridSlot area="headline" as="h1" className="deck-display xc-hook self-center">
        Exposure matching because the alternative bridge had N=5 paired
      </GridSlot>

      <Subhead delay={0.1} size="lead" maxChars={68}>
        The method was not preferred — it was the only route this dataset could support.
      </Subhead>

      <Viz>
        <Cs1RejectedAltCompare />
      </Viz>

      <Footer kicker="CS1 · Rejected alternative" tagline="" source="" />
    </SlideGrid>
  );
}
