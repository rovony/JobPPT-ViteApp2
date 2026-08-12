/**
 * CS1 Beat 3 · Competing hypotheses
 */
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Cs1HypothesisPair from '../components/cs1/Cs1HypothesisPair';

export default function Cs1Hypotheses() {
  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.06}>Case 01 · Hypotheses</Eyebrow>

      <GridSlot area="headline" as="h1" className="deck-display xc-hook self-center">
        Bridge only if shared exposure implies shared benefit
      </GridSlot>

      <Subhead delay={0.1} size="lead" maxChars={70}>
        Working and competing explanations — written before anyone sees the answer.
      </Subhead>

      <Viz>
        <Cs1HypothesisPair />
      </Viz>

      <Footer kicker="CS1 · Hypotheses" tagline="" source="" />
    </SlideGrid>
  );
}
