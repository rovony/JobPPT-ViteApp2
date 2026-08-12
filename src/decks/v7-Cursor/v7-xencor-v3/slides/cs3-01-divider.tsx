import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import AiBrain from '../components/AiBrain';

/**
 * CS3 Divider — PharmAgent · workflow infrastructure.
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
      subtitle="Workflow Infrastructure for Model-Informed Decisions"
      tagline="Decision 3: move pharmacometric scaffolding from individual analysts into privacy-first, audit-ready infrastructure."
      meta={[
        ['Architecture', 'Supervisor + specialist agents'],
        ['Computation', 'Deterministic tools'],
        ['Governance', 'Privacy + audit by construction'],
      ]}
      verdict="BUILDING"
      illustration={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <AiBrain layoutId="cs3-ai-brain" variant="hero" />
        </div>
      }
      source="Personal research project · Kim et al. arXiv:2512.08296 (2025) · ICH M15 Step 4, 29 Jan 2026"
    />
  );
}
