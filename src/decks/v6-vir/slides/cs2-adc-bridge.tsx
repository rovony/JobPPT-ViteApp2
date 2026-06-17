// @ts-nocheck
import React from 'react';
import { ADC_ICONS, AdcEvidenceSlide } from './cs2-adc-shared';

export default function Cs2AdcBridge() {
  return (
    <AdcEvidenceSlide
      eyebrow="Case 02 · bridge"
      headline={<>When evidence becomes complex, the system has to preserve <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>traceability.</span></>}
      subhead="The ADC case is about scientific interpretability. The next case is about computational interpretability: how to build clinical pharmacology workflows where every number, assumption, and decision remains auditable."
      cards={[
        { label: 'From ADC', title: 'Multiple species, one dose rationale.', body: 'The model has to maintain the chain from analyte to action.', icon: ADC_ICONS.layers },
        { label: 'To AI', title: 'Multiple agents, one audit trail.', body: 'The workflow has to maintain the chain from input to decision.', icon: ADC_ICONS.branch },
        { label: 'Shared standard', title: 'No black boxes at the decision point.', body: 'Whether the complexity is biological or computational, the answer has to be inspectable.', icon: ADC_ICONS.shield },
        { label: 'Vir relevance', title: 'Fast programs need durable evidence systems.', body: 'Rare, immune, and infectious-disease decisions move better when the evidence chain is explicit.', icon: ADC_ICONS.activity },
      ]}
      flow={['Biology made interpretable.', 'Workflow made traceable.', 'Decision made defensible.']}
      footerKicker="ADC → AI"
      footerTagline="Traceability is the bridge."
    />
  );
}
