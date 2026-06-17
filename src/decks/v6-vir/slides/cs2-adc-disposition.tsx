// @ts-nocheck
import React from 'react';
import { ADC_ICONS, AdcEvidenceSlide } from './cs2-adc-shared';

export default function Cs2AdcDisposition() {
  return (
    <AdcEvidenceSlide
      eyebrow="Case 02 · disposition map"
      headline={<>Before modeling, make every analyte explain <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>where the drug can go.</span></>}
      subhead="The disposition map is the team’s shared language: central and peripheral distribution, binding, internalization, catabolism, deconjugation, and payload release."
      cards={[
        { label: 'Compartments', title: 'Where does the antibody travel?', body: 'A mAb-like backbone can mask payload-relevant dynamics unless the model makes the system explicit.', icon: ADC_ICONS.layers },
        { label: 'Target', title: 'Where does binding matter?', body: 'Target expression, turnover, and internalization determine whether nonlinearity is biological or incidental.', icon: ADC_ICONS.target },
        { label: 'Payload', title: 'Where does toxicity live?', body: 'Released payload can move on a different clock than total antibody or conjugate exposure.', icon: ADC_ICONS.activity },
        { label: 'Sampling', title: 'Where are the blind spots?', body: 'Sparse timing and assay lower limits shape what can be estimated versus what must be assumed.', icon: ADC_ICONS.radar },
      ]}
      flow={['Draw the system.', 'Tag each assay.', 'Mark estimable gaps.', 'Align assumptions before fitting.']}
      footerKicker="ADC · Disposition"
      footerTagline="A disposition map keeps the model honest."
    />
  );
}
