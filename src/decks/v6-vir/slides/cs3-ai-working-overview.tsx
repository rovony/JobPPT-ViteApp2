// @ts-nocheck
import React from 'react';
import { AiEvidenceSlide } from './cs3-ai-shared';

export default function Cs3AiWorkingOverview() {
  return (
    <AiEvidenceSlide
      eyebrow="Case 04 · working overview"
      headline={<>The working pattern is simple: <span style={{ color: 'var(--sage)', fontStyle: 'italic' }}>plan, run, check, record.</span></>}
      subhead="Pharazi is framed here as an architecture proof: deterministic tools under agent orchestration, with explicit review gates and a durable decision record."
      cards={[
        { icon: 'PanelsTopLeft', label: 'Plan', title: 'Write the analysis intent first.', body: 'The system starts from a task plan, not an unbounded chat request.' },
        { icon: 'GitBranch', label: 'Run', title: 'Route to deterministic tools.', body: 'NCA, PopPK summaries, checks, and document assembly should be executable and replayable.' },
        { icon: 'FileCheck2', label: 'Check', title: 'Compare outputs before synthesis.', body: 'The reviewer sees discrepancies, assumptions, and provenance before a conclusion is drafted.' },
        { icon: 'ShieldCheck', label: 'Record', title: 'Leave an audit trail.', body: 'The final deliverable points back to inputs, tool versions, and review decisions.' },
      ]}
      footerTagline="Agents help with workflow; deterministic tools anchor the evidence."
    />
  );
}
