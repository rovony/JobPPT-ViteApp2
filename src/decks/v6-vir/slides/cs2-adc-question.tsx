// @ts-nocheck
import React from 'react';
import { ADC_ICONS, AdcEvidenceSlide } from './cs2-adc-shared';

export default function Cs2AdcQuestion() {
  return (
    <AdcEvidenceSlide
      eyebrow="Case 02 · the question"
      headline={<>The question was not one curve; it was <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>which exposure made the dose interpretable.</span></>}
      subhead="In ADC development, the clinical decision can depend on conjugated antibody, total antibody, released payload, or a derived metric. Picking the wrong exposure can make a precise model answer the wrong question."
      cards={[
        { label: 'Analyte', title: 'The assay defines the biology.', body: 'Each measured species carries a different story about delivery, deconjugation, clearance, and target engagement.', icon: ADC_ICONS.beaker },
        { label: 'Decision', title: 'The dose has to survive translation.', body: 'Clinical pharmacology has to connect preclinical signal, human PK, safety, and efficacy into one defensible recommendation.', icon: ADC_ICONS.target },
        { label: 'Uncertainty', title: 'Sparse data can still be structured.', body: 'The point is not to remove uncertainty; it is to make uncertainty visible enough for the team to decide.', icon: ADC_ICONS.radar },
        { label: 'Governance', title: 'Definitions must stay stable.', body: 'When analyte names, units, and sampling windows drift, dose logic becomes fragile even before modeling begins.', icon: ADC_ICONS.shield },
      ]}
      flow={['Name the decision.', 'Map the analytes.', 'Choose the exposure metric.', 'Stress-test the dose logic.']}
      callout="This is the transferable credential: leading the clinical pharmacology strategy so the model answers the decision, not merely the dataset."
      footerKicker="ADC · Question"
      footerTagline="The first model choice is the exposure definition."
    />
  );
}
