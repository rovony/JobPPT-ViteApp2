// @ts-nocheck
import React from 'react';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import { VoidVsPackageViz } from '../../components/notebooklm/IndiaNotebookViz';

/**
 * CS3 · Setup — NotebookLM void vs global package visual.
 */
export default function CS2Setup() {
  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow color="var(--cyan)" delay={0.1}>
        Case 03 · Setup + challenge
      </Eyebrow>
      <SolidHeadline delay={0.16} maxChars={52}>
        December 2024 — the SEC asked for{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
          local PK/PD
        </span>
        .
      </SolidHeadline>
      <Subhead delay={0.22} maxChars={110}>
        Ivosidenib · IDH1-mutant AML &amp; cholangiocarcinoma — approved in 42+ countries, blocked in
        India until a reliance dossier could answer the local-data question.
      </Subhead>
      <Viz>
        <VoidVsPackageViz />
      </Viz>
      <Footer
        kicker="Case 03 · Setup"
        tagline=""
        source="CDSCO SEC Dec 2024 · NotebookLM void / package"
        delay={0.28}
      />
    </SlideGrid>
  );
}
