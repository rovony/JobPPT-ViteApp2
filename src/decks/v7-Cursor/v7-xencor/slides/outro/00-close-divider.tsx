import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';

/** Cases closed — one discipline before synthesis + Xencor bridge */
export default function Cs4CloseDivider() {
  return (
    <CaseHeroDivider
      caseToken="sage"
      caseNumber="04"
      totalCases={4}
      kicker="CASES CLOSED · ONE DISCIPLINE"
      title="Four proofs"
      subtitle="The cases are closed. The operating model remains."
      tagline="Decision-first · least complex credible approach · named uncertainty · aligned action · left as a standard."
    />
  );
}
