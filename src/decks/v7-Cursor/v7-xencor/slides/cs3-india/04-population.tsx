// @ts-nocheck
import React from 'react';
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Viz, Footer } from '@/components/deck/SlideParts';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import { RaceForestViz, SomaticPathsViz } from '../../components/notebooklm/IndiaNotebookViz';
import { useSlideSteps } from '../../components/cs1/useSlideSteps';

/**
 * India · population kill-tests — NotebookLM somatic paths + race forest.
 */
export default function Cs2BackupB4PopulationEvidence({ step: stepProp = 0 }) {
  const step = useSlideSteps(2) ?? stepProp;
  const showForest = step >= 1;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS_NO_SUBHEAD} rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}>
      <Eyebrow delay={0.08}>India · Credibility · kill tests</Eyebrow>
      <SolidHeadline delay={0.12} maxChars={60}>
        Every pillar was a test{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
          we could have failed.
        </span>
      </SolidHeadline>
      <Viz>
        <div style={{ height: '100%', minHeight: 0 }}>{showForest ? <RaceForestViz /> : <SomaticPathsViz />}</div>
      </Viz>
      <Footer
        kicker="India · Population"
        tagline=""
        source="Jiang et al. CTS 2021 · NotebookLM kill-tests"
        delay={0.28}
      />
    </SlideGrid>
  );
}
