// @ts-nocheck
import React from 'react';
import { ADC_ICONS, AdcEvidenceSlide } from './cs2-adc-shared';

export default function Cs2AdcEr() {
  return (
    <AdcEvidenceSlide
      eyebrow="Case 02 · exposure-response"
      headline={<>Exposure-response only helps if the exposure metric is <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>biologically meaningful.</span></>}
      subhead="For ADCs, efficacy and safety may point to different analytes, different windows, or different derived metrics. The E-R plan has to make that distinction explicit."
      cards={[
        { label: 'Efficacy', title: 'What exposure represents tumor delivery?', body: 'Conjugate exposure or time-above-threshold may be more informative than a generic AUC summary.', icon: ADC_ICONS.target },
        { label: 'Safety', title: 'What exposure represents off-target risk?', body: 'Payload or peak-related measures may better explain toxicity than total antibody exposure.', icon: ADC_ICONS.shield },
        { label: 'Timing', title: 'Which window matches the biology?', body: 'Early-cycle, cumulative, and steady-state metrics answer different clinical questions.', icon: ADC_ICONS.activity },
        { label: 'Action', title: 'What would change if the relationship holds?', body: 'An E-R result is useful when it can inform dose, schedule, label language, or monitoring.', icon: ADC_ICONS.file },
      ]}
      flow={['Pair endpoint to mechanism.', 'Choose metric and window.', 'Test robustness.', 'Translate to an action.']}
      footerKicker="ADC · E-R"
      footerTagline="The metric is part of the biology."
    />
  );
}
