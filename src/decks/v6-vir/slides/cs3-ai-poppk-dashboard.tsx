// @ts-nocheck
import React from 'react';
import { AiEvidenceSlide } from './cs3-ai-shared';

export default function Cs3AiPoppkDashboard() {
  return (
    <AiEvidenceSlide
      eyebrow="Case 04 · PopPK dashboard"
      headline={<>A dashboard is valuable only if it makes model review <span style={{ color: 'var(--sage)', fontStyle: 'italic' }}>faster and safer.</span></>}
      subhead="The clinical pharmacology user should see assumptions, diagnostics, covariate logic, simulation scenarios, and unresolved questions in one review surface."
      cards={[
        { icon: 'PanelsTopLeft', label: 'Review surface', title: 'Bring the decision context into view.', body: 'Diagnostics are not enough; the user needs to see what decision the model is supporting.' },
        { icon: 'FileCheck2', label: 'Evidence checks', title: 'Highlight what changed.', body: 'Version-to-version differences should be visible without manual archaeology.' },
        { icon: 'ShieldCheck', label: 'Risk controls', title: 'Make unresolved risk explicit.', body: 'The dashboard should name what still needs expert review, not hide it behind confidence language.' },
      ]}
      footerTagline="The interface is the review contract."
    />
  );
}
