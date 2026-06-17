import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';

export default function CS2PharaziDivider() {
  return (
    <CaseHeroDivider
      caseToken="violet"
      caseNumber="03"
      totalCases={3}
      kicker="CASE STUDY 03"
      title="AI / Pharazi"
      subtitle="Pharazi.ai · open-source project"
      tagline="Audit-ready clinical pharmacology workflows, with deterministic tools and human accountability."
      meta={[
        ['Topic', 'AI / ML Pharmacometrics'],
        ['Setting', 'Personal research · 2024 –'],
      ]}
      verdict=""
    />
  );
}
