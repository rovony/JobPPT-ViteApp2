// @ts-nocheck
import React from 'react';
import { ADC_ICONS, AdcEvidenceSlide } from './cs2-adc-shared';

export default function Cs2AdcDose() {
  return (
    <AdcEvidenceSlide
      eyebrow="Case 02 · dose strategy"
      headline={<>Dose strategy is where PK, safety, and translation must <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>agree.</span></>}
      subhead="The goal is not a model in isolation. The goal is a dose rationale that can be defended across clinicians, statisticians, translational scientists, and regulators."
      cards={[
        { label: 'Starting dose', title: 'Bridge nonclinical confidence into first-in-human logic.', body: 'Mechanistic plausibility and exposure margins need to be stated in terms the clinical team can act on.', icon: ADC_ICONS.branch },
        { label: 'Escalation', title: 'Protect learning while protecting patients.', body: 'Model simulations can show what the next cohort teaches and what risk it introduces.', icon: ADC_ICONS.shield },
        { label: 'Expansion', title: 'Choose the regimen with the clearest rationale.', body: 'The recommended dose should be supported by exposure, endpoint, and tolerability evidence together.', icon: ADC_ICONS.target },
        { label: 'Label path', title: 'Pre-wire the evidence narrative.', body: 'What you cannot explain now becomes harder to defend later.', icon: ADC_ICONS.file },
      ]}
      flow={['Starting-dose logic.', 'Escalation rules.', 'Expansion regimen.', 'Regulatory rationale.']}
      callout="Plain-English translation: the model has to help the cross-functional team say why this dose, for this patient population, now."
      footerKicker="ADC · Dose"
      footerTagline="The dose is a cross-functional claim."
    />
  );
}
