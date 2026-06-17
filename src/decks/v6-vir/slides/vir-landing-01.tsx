// @ts-nocheck
import React from 'react';
import { VirLandingSlide } from './vir-landing-shared';

export default function VirLanding01() {
  return (
    <VirLandingSlide
      eyebrow="Vir · where this lands"
      headline={<>Vir&rsquo;s work sits where viral biology, immune pharmacology, and dose timing have to become <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>clinical decisions.</span></>}
      subhead="That is why these cases are relevant: they are not a claim of prior Vir experience; they are a record of turning incomplete measurements into decisions that teams and regulators can inspect."
      cards={[
        { icon: 'Dna', label: 'Biology', title: 'Mechanism first.', body: 'Antiviral and immune-mediated programs need clinical pharmacology that respects mechanism, not just empirical exposure summaries.' },
        { icon: 'TimerReset', label: 'Timing', title: 'Dose timing matters.', body: 'Fast-moving biology makes regimen, window, and endpoint timing central to the dose argument.' },
        { icon: 'ShieldCheck', label: 'Evidence', title: 'The chain must be inspectable.', body: 'Small or urgent programs need models whose assumptions are visible and whose decision logic is durable.' },
      ]}
      footerTagline="This is a fit argument, not a resumé keyword match."
    />
  );
}
