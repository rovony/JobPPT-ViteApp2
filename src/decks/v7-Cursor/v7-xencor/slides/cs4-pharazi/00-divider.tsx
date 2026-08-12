import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import AiBrain from '../../components/AiBrain';

export default function CS2PharaziDivider() {
  return (
    <CaseHeroDivider
      caseToken="sage"
      caseNumber="04"
      totalCases={4}
      kicker="CASE STUDY 04"
      title="AI / Pharazi"
      subtitle="Personal research — not a sponsor deployment"
      tagline="Audit-ready clinical pharmacology workflows: context of use, comparator, validation, failure modes."
      meta={[
        ['Topic', 'AI / ML Pharmacometrics'],
        ['Setting', 'Personal research · 2024 –'],
      ]}
      verdict=""
      illustration={<AiBrain layoutId="cs4-ai-brain" variant="hero" />}
    />
  );
}
