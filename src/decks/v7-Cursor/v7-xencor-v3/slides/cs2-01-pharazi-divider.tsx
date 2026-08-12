import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';

/**
 * CS4 opener — not a drug case. Honesty banner lands in the first beat.
 */
export default function CS2PharaziDivider() {
  return (
    <div data-case="4" style={{ width: '100%', height: '100%' }}>
      <CaseHeroDivider
        caseToken="violet"
        caseNumber="04"
        totalCases={4}
        kicker="CASE STUDY 04 · EPILOGUE"
        title="Not a drug — the system"
        subtitle="Personal research · not a sponsor deployment"
        tagline="What must be true before an AI-accelerated analysis can inform a dose — auditability before autonomy."
        meta={[
          ['Constraint', 'Unbuilt · prototype'],
          ['Honesty', 'Not validated GxP · not a product pitch'],
          ['Home', 'pharazi.ai · clinpharm.ai'],
        ]}
        verdict=""
        source="Manuscript in preparation · CPT:PSP"
      />
    </div>
  );
}
