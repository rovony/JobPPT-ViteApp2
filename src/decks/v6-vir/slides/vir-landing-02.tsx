// @ts-nocheck
import React from 'react';
import { VirLandingSlide } from './vir-landing-shared';

export default function VirLanding02() {
  return (
    <VirLandingSlide
      eyebrow="Vir · what I would bring"
      headline={<>The throughline I would bring is <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>model discipline under evidence constraints.</span></>}
      subhead="Pediatric extrapolation, ADC multi-analyte PK, and audit-ready AI workflows look different on the surface. The leadership move is the same: clarify the decision, protect interpretability, and make the evidence portable."
      cards={[
        { icon: 'Compass', label: 'Strategy', title: 'Start from the decision.', body: 'Define what dose, schedule, population, or label question the evidence must support before optimizing the analysis.' },
        { icon: 'Handshake', label: 'Leadership', title: 'Translate across functions.', body: 'Make the quantitative argument usable for clinicians, translational scientists, regulatory colleagues, and executives.' },
        { icon: 'Sparkles', label: 'Systems', title: 'Modernize without black boxes.', body: 'Use automation and AI where they increase speed and traceability, while keeping expert accountability intact.' },
      ]}
      footerTagline="The value is not just modeling; it is modeling the organization can use."
    />
  );
}
