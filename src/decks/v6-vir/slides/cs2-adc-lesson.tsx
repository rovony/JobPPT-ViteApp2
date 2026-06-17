// @ts-nocheck
import React from 'react';
import { ADC_ICONS, AdcEvidenceSlide } from './cs2-adc-shared';

export default function Cs2AdcLesson() {
  return (
    <AdcEvidenceSlide
      eyebrow="Case 02 · lesson"
      headline={<>For ADCs, quantitative pharmacology starts with the <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>analyte map.</span></>}
      subhead="Once the analyte map is clear, the model can do its real work: show which uncertainties matter, which assumptions are stable, and which regimen is defensible."
      cards={[
        { label: 'Lesson 01', title: 'The analyte is not metadata.', body: 'It defines the biological claim the model is allowed to make.', icon: ADC_ICONS.beaker },
        { label: 'Lesson 02', title: 'The model is not the deliverable.', body: 'The deliverable is a dose rationale the team can defend.', icon: ADC_ICONS.file },
        { label: 'Lesson 03', title: 'Complexity must earn its place.', body: 'Mechanistic richness is useful when it changes the decision or clarifies risk.', icon: ADC_ICONS.network },
        { label: 'Lesson 04', title: 'Leadership is keeping the chain intact.', body: 'Biology to assay to model to dose: every link has to remain interpretable.', icon: ADC_ICONS.handshake },
      ]}
      flow={['Analyte map.', 'Biological metric.', 'Model strategy.', 'Dose rationale.']}
      footerKicker="ADC · Lesson"
      footerTagline="Interpretability is the operating standard."
    />
  );
}
