// @ts-nocheck
import React from 'react';
import { AiEvidenceSlide } from './cs3-ai-shared';

export default function Cs3AiRegulatoryFloor() {
  return (
    <AiEvidenceSlide
      eyebrow="Case 04 · regulatory floor"
      headline={<>AI is useful in clinical pharmacology only when the workflow can be <span style={{ color: 'var(--sage)', fontStyle: 'italic' }}>reviewed.</span></>}
      subhead="The floor is not model novelty. The floor is traceable inputs, deterministic computations, explicit assumptions, and a human owner for the final decision."
      cards={[
        { icon: 'FileCheck2', label: 'Documentation', title: 'Every output needs a review path.', body: 'A clinical pharmacology result has to show where the data came from, what method ran, and what changed.' },
        { icon: 'ShieldCheck', label: 'Accountability', title: 'The expert remains responsible.', body: 'Agents can assist, assemble, and check. They should not become invisible authors of clinical decisions.' },
        { icon: 'LockKeyhole', label: 'Privacy', title: 'Sensitive inputs need boundaries.', body: 'Workflow design has to separate what can be automated from what must remain controlled.' },
      ]}
      footerTagline="The standard is auditability before autonomy."
      footerSource="Public-methods framing · ICH M15 context · no sponsor data shown"
    />
  );
}
