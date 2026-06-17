// @ts-nocheck
import React from 'react';
import { AiEvidenceSlide } from './cs3-ai-shared';

export default function Cs3AiGap() {
  return (
    <AiEvidenceSlide
      eyebrow="Case 03 · gap"
      headline={<>Clinical pharmacology can generate analyses faster than it can <span style={{ color: 'var(--violet)', fontStyle: 'italic' }}>explain them.</span></>}
      subhead="That is the gap AI has to close. Speed without traceability just moves the bottleneck from analysis generation to review confidence."
      cards={[
        { icon: 'Bot', label: 'Speed', title: 'Agents can accelerate assembly.', body: 'They can draft run plans, route tasks, produce tables, and compare outputs.' },
        { icon: 'GitBranch', label: 'Trace', title: 'But every step needs lineage.', body: 'A reviewer should know which input, version, tool, prompt, and assumption produced each result.' },
        { icon: 'ShieldCheck', label: 'Decision', title: 'The final claim must stay inspectable.', body: 'Clinical pharmacology decisions cannot rest on an opaque chain, even if the answer looks right.' },
      ]}
      footerTagline="The bottleneck is not generation; it is trusted review."
    />
  );
}
