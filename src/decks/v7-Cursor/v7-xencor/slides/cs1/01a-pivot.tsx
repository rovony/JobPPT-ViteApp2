// @ts-nocheck
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { INK, STAGE } from '../../_shared/deck-ui';
import PivotBoard from '../../components/cs1/PivotBoard';
import SolidHeadline from '../../components/cs1/SolidHeadline';

/** Beat 1a — pivot (Xencor-Deck #06). Subhead carries the instruction; plate is type-only. */
export default function Cs1Pivot() {
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · The pivot</Eyebrow>
      <SolidHeadline delay={STAGE.headline} maxChars={58}>
        The move that made the program solvable
      </SolidHeadline>
      <Subhead delay={STAGE.subhead} size="lead" maxChars={78}>
        Stop asking the efficacy question.{' '}
        <span style={{ color: INK.accent, fontStyle: 'normal', fontWeight: 600 }}>
          Start asking an exposure question.
        </span>
      </Subhead>
      <Viz>
        <PivotBoard />
      </Viz>
      <Footer kicker="01 · CS1 · Pivot" tagline="" source="Xencor-Deck #06 · enhanced" />
    </SlideGrid>
  );
}
