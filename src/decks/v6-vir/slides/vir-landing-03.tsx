// @ts-nocheck
import React from 'react';
import { VirLandingSlide } from './vir-landing-shared';

export default function VirLanding03() {
  return (
    <VirLandingSlide
      eyebrow="Vir · first 90 days"
      headline={<>The first job is to learn the portfolio, map the decision gaps, and align the <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>clinical pharmacology operating model.</span></>}
      subhead="A Senior Director role is as much about cadence and judgment as analysis. I would begin by making the decision map explicit, then prioritizing where quantitative pharmacology can most reduce uncertainty."
      cards={[
        { icon: 'Compass', label: '30 days', title: 'Portfolio evidence map.', body: 'Understand active programs, key decisions, existing models, assay constraints, and regulatory commitments.' },
        { icon: 'Handshake', label: '60 days', title: 'Cross-functional decision rhythm.', body: 'Align on which dose, regimen, and translational questions need clinical pharmacology ownership now.' },
        { icon: 'ShieldCheck', label: '90 days', title: 'Reusable evidence standards.', body: 'Establish clear templates for assumptions, simulations, sensitivity checks, and audit-ready decision records.' },
      ]}
      footerTagline="Learn first, then tighten the evidence system."
    />
  );
}
