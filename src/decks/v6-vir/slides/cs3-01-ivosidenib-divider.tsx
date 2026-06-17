import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';

export default function CS3IvosidenibDivider() {
  return (
    <CaseHeroDivider
      caseToken="cyan"
      caseNumber="03"
      totalCases={4}
      kicker="CASE STUDY 03"
      title="Ivosidenib"
      subtitle="Regulatory strategy in India"
      tagline="Rule 101 waiver · 2025"
      meta={[
        ['Compound', 'Ivosidenib'],
        ['Indication', 'India · CDSCO'],
        ['Setting', 'Rule 101 waiver · 2025'],
      ]}
      verdict="APPROVED"
    />
  );
}
