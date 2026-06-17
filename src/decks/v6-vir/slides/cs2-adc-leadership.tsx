// @ts-nocheck
import React from 'react';
import { ADC_ICONS, AdcEvidenceSlide } from './cs2-adc-shared';

export default function Cs2AdcLeadership() {
  return (
    <AdcEvidenceSlide
      eyebrow="Case 02 · leadership"
      headline={<>My role was to direct the strategy, align disciplines, and protect <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>interpretability.</span></>}
      subhead="This is the leadership credential, not a claim that I personally executed every assay or every model. I led the clinical pharmacology thinking that made the work decision-ready."
      cards={[
        { label: 'Translate', title: 'Make biology, assay, and model speak the same language.', body: 'I pushed the team toward decision definitions before analysis proliferation.', icon: ADC_ICONS.handshake },
        { label: 'Prioritize', title: 'Separate useful complexity from decorative complexity.', body: 'The strategy preserved mechanisms that changed dose logic and resisted complexity that did not.', icon: ADC_ICONS.target },
        { label: 'Govern', title: 'Keep assumptions visible and versioned.', body: 'A defensible strategy depends on traceable choices, not only final results.', icon: ADC_ICONS.file },
        { label: 'Influence', title: 'Bring clinicians and quantitative scientists to one recommendation.', body: 'The value is in converting evidence into a dose the team can own.', icon: ADC_ICONS.users },
      ]}
      flow={['Decision definition.', 'Cross-functional alignment.', 'Model strategy oversight.', 'Dose-rationale synthesis.']}
      footerKicker="ADC · Leadership"
      footerTagline="Lead the strategy; keep the evidence interpretable."
    />
  );
}
