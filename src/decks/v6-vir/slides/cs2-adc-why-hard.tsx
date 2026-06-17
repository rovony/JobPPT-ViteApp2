// @ts-nocheck
import React from 'react';
import { ADC_ICONS, AdcEvidenceSlide } from './cs2-adc-shared';

export default function Cs2AdcWhyHard() {
  return (
    <AdcEvidenceSlide
      eyebrow="Case 02 · why it is hard"
      headline={<>ADC pharmacology turns <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>assay selection</span> into a modeling decision.</>}
      subhead="The same nominal dose can produce different interpretability depending on which species is stable, which species is active, and which species best predicts the clinical endpoint."
      cards={[
        { label: 'Conjugate', title: 'Delivery signal', body: 'Often closest to the intended cytotoxic delivery construct, but sensitive to deconjugation and platform stability.', icon: ADC_ICONS.layers },
        { label: 'Total antibody', title: 'Backbone signal', body: 'Useful for mAb disposition, target biology, and platform comparability, but less directly tied to payload exposure.', icon: ADC_ICONS.network },
        { label: 'Payload', title: 'Toxicity signal', body: 'Can explain off-target safety, yet often sits near assay limits and may not represent tumor delivery.', icon: ADC_ICONS.activity },
        { label: 'Derived metrics', title: 'Decision signal', body: 'Ratios, time windows, and cumulative exposure can clarify biology or amplify noise if definitions drift.', icon: ADC_ICONS.branch },
      ]}
      flow={['Separate measured species.', 'Define biological interpretation.', 'Select endpoint-relevant metric.', 'Document why alternatives were rejected.']}
      footerKicker="ADC · Hard Part"
      footerTagline="The analyte map is part of the clinical pharmacology argument."
    />
  );
}
