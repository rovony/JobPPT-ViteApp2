/**
 * CS1 Beat 6 · Decision boundary / falsification
 */
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Cs1FalsificationTree from '../components/cs1/Cs1FalsificationTree';

export default function Cs1Boundary() {
  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.06}>Case 01 · Decision boundary</Eyebrow>

      <GridSlot area="headline" as="h1" className="deck-display xc-hook self-center">
        Four results would have stopped the bridge
      </GridSlot>

      <Subhead delay={0.1} size="lead" maxChars={70}>
        Falsifiers agreed <strong className="xc-case">before</strong> the data were analysed.
        Declining to claim a bridge is a legitimate scientific output.
      </Subhead>

      <Viz>
        <Cs1FalsificationTree />
      </Viz>

      <Footer kicker="CS1 · Boundary" tagline="" source="" />
    </SlideGrid>
  );
}
