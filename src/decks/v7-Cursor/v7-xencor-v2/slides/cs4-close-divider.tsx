import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';

/**
 * CS4 close divider — punctuation beat after publication-close.
 * Signals the four-case core is complete before portfolio widens the aperture.
 */
export default function Cs4CloseDivider() {
  return (
    <CaseHeroDivider
      caseToken="sage"
      caseNumber="04"
      totalCases={4}
      kicker="CASES 01–04 · COMPLETE"
      title="Core proof"
      subtitle="Beyond these four · the portfolio"
      tagline="Pediatric dose · smarter trial · India dossier · traceable AI — one discipline carrying four regulatory decisions."
      meta={[
        ['Case 01', 'Pediatric PAH dose'],
        ['Case 02', 'Asparlas N = 60'],
        ['Case 03', 'Ivosidenib · India'],
        ['Case 04', 'Pharazi · traceable AI'],
      ]}
      verdict="COMPLETE"
    />
  );
}
