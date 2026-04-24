import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import LungsShared from './cs1-background/LungsShared';

/**
 * Case Study 01 · Ambrisentan · Pediatric PAH.
 *
 * Hero divider anchoring the case in a single anatomical image — Lynch /
 * Jaffe lungs on the right, giant typographic left column. The lung is
 * wrapped in LungsShared (layoutId="lung-lynch") so it MORPHS into
 * slide 6's card-01 visual as the user navigates forward: same subject,
 * closer lens, rather than a hard cut. The previous three-panel vessel
 * narrative was moved to slide 6 where it fits the "disease biology"
 * explainer better than a divider.
 */
export default function Slide10() {
  return (
    <CaseHeroDivider
      caseToken="coral"
      caseNumber="01"
      totalCases={3}
      kicker="CASE STUDY 01"
      title="Ambrisentan"
      subtitle="Pediatric Pulmonary Arterial Hypertension"
      tagline="Rare Disease · Pediatric Extrapolation · Model-based evidence replaces a trial that could not feasibly be run."
      meta={[
        ['Compound', 'Ambrisentan (ERA)'],
        ['Population', 'Pediatric 8–18 yr'],
        ['Agencies', 'EMA + PMDA'],
      ]}
      verdict="APPROVED"
      illustration={<LungsShared layoutId="lung-lynch" variant="hero" />}
      source="Okour et al. · J Clin Pharmacol · 2023 · Published"
    />
  );
}