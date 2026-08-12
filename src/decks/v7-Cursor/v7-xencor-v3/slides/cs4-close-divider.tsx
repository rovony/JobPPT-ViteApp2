import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';

/**
 * CS4 close divider — four-case core complete before portfolio widens.
 */
export default function Cs4CloseDivider() {
  return (
    <div data-case="4" style={{ width: '100%', height: '100%' }}>
      <CaseHeroDivider
        caseToken="violet"
        caseNumber="04"
        totalCases={4}
        kicker="CASES 01–04 · COMPLETE"
        title="One discipline"
        subtitle="Four settings · one reconstruction standard"
        tagline="Pediatric bridge · trial design · India dossier · workflow architecture — methods changed; the leadership pattern did not."
        meta={[
          ['Case 01', 'Ambrisentan · pediatric dose'],
          ['Case 02', 'Ivosidenib · India'],
          ['Case 03', 'Asparlas · N = 60'],
          ['Case 04', 'Pharazi · traceable AI'],
        ]}
        verdict="COMPLETE"
        source="Next · portfolio aperture + company bridge"
      />
    </div>
  );
}
