import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';

/**
 * CS3 Divider — PharmAgent · AI/ML workflow infrastructure.
 *
 * Sage case-color cascade. The register shifts from retrospective
 * regulatory wins (CS1/CS2) to forward-looking infrastructure.
 */
export default function CS3Divider() {
  return (
    <CaseHeroDivider
      caseToken="sage"
      caseNumber="03"
      totalCases={3}
      kicker="CASE STUDY 03"
      title="PharmAgent"
      subtitle="When the Trial Isn't the Answer for the Next Decade"
      tagline="Decision 3: The next decade of clinical pharmacology will need infrastructure, audit, and decision tools that don't exist on any shelf today."
      meta={[
        ['Platform', 'Multi-agent AI/ML'],
        ['Domain', 'Pharmacometric workflows'],
        ['Status', 'Active development'],
      ]}
      verdict="BUILDING"
      source="Personal research project · Kim et al. CPT 2025 · ICH M15 draft 2024"
    />
  );
}
