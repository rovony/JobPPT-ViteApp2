import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import AiBrain from '../components/AiBrain';

/**
 * CS3 Divider — PharmAgent · AI/ML workflow infrastructure.
 *
 * Sage case-color cascade. The register shifts from retrospective
 * regulatory wins (CS1/CS2) to forward-looking infrastructure.
 * AiBrain illustration mirrors CS1 Lungs / CS2 IndiaMap pattern.
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
      illustration={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <AiBrain layoutId="cs3-ai-brain" variant="hero" />
        </div>
      }
      source="Personal research project · Kim et al. arXiv:2512.08296 (Google Research & DeepMind, 2026) · ICH M15"
    />
  );
}
