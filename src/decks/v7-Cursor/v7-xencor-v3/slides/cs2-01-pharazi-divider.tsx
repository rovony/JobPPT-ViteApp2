import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';

export default function CS2PharaziDivider() {
  return (
    <div data-case="4" style={{ width: '100%', height: '100%' }}>
      <CaseHeroDivider
        caseToken="sage"
        caseNumber="04"
        totalCases={4}
        kicker="CASE STUDY 04"
        title="AI / Pharazi"
        subtitle="Pharazi.ai · open-source project"
        tagline="Audit-ready clinical pharmacology workflows, with deterministic tools and human accountability."
        meta={[
          ['Topic', 'AI / ML Pharmacometrics'],
          ['Setting', 'Personal research · 2024 –'],
        ]}
        verdict=""
      />
    </div>
  );
}
