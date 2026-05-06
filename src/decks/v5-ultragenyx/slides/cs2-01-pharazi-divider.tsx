import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';

export default function CS2PharaziDivider() {
  return (
    <CaseHeroDivider
      caseToken="violet"
      caseNumber="02"
      totalCases={3}
      kicker="CASE STUDY 02"
      title="AI the Pharazi"
      subtitle="Pharazi.ai · open-source project"
      tagline="An end-to-end multi-agent foundation."
      meta={[
        ['Topic', 'AI / ML Pharmacometrics'],
        ['Setting', 'Personal research · 2024 –'],
      ]}
      verdict=""
    />
  );
}
