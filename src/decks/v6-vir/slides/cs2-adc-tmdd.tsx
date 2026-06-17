// @ts-nocheck
import React from 'react';
import { ADC_ICONS, AdcEvidenceSlide } from './cs2-adc-shared';

export default function Cs2AdcTmdd() {
  return (
    <AdcEvidenceSlide
      eyebrow="Case 02 · nonlinearity"
      headline={<>Nonlinearity is a <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>decision point</span>, not just a parameter.</>}
      subhead="Target-mediated disposition, deconjugation, saturation, and time-varying biology can all produce curvature. The question is whether the curvature changes the dose recommendation."
      cards={[
        { label: 'Mechanism', title: 'Is the target moving the curve?', body: 'TMDD-like behavior needs biological plausibility, not just a better objective function.', icon: ADC_ICONS.target },
        { label: 'Identifiability', title: 'Can the data support the mechanism?', body: 'Sparse or narrow-dose data may justify a pragmatic approximation instead of an over-fit mechanistic claim.', icon: ADC_ICONS.radar },
        { label: 'Decision', title: 'Does nonlinearity change the regimen?', body: 'If the dose recommendation is robust, document that robustness. If not, show the sensitivity.', icon: ADC_ICONS.file },
        { label: 'Communication', title: 'Keep the team aligned on meaning.', body: 'Nonlinear does not automatically mean clinically meaningful; clinically meaningful does not always require complex structure.', icon: ADC_ICONS.handshake },
      ]}
      flow={['State the biological hypothesis.', 'Check identifiability.', 'Run dose-impact sensitivity.', 'Document the decision consequence.']}
      footerKicker="ADC · TMDD"
      footerTagline="Complexity only earns its place when it changes the decision."
    />
  );
}
