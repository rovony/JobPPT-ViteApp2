// @ts-nocheck
import React from 'react';
import { AiEvidenceSlide } from './cs3-ai-shared';

export default function Cs3AiPublicationClose() {
  return (
    <AiEvidenceSlide
      eyebrow="Case 04 · close"
      headline={<>The AI lesson is not automation; it is <span style={{ color: 'var(--sage)', fontStyle: 'italic' }}>traceable acceleration.</span></>}
      subhead="The same standard from the ADC case applies here: no black boxes at the decision point. If the system cannot show its evidence chain, it is not ready for clinical pharmacology use."
      cards={[
        { icon: 'Bot', label: 'Use AI', title: 'For routing, drafting, checking, and assembly.', body: 'Let the system remove friction where the output remains inspectable.' },
        { icon: 'LockKeyhole', label: 'Set boundaries', title: 'For data, privacy, and accountability.', body: 'The workflow should know which inputs and decisions require explicit human control.' },
        { icon: 'ShieldCheck', label: 'Keep the standard', title: 'Expert-owned decisions.', body: 'The final clinical pharmacology claim belongs to the accountable scientist, not the agent.' },
      ]}
      footerTagline="Fast is useful only when the trail is intact."
    />
  );
}
