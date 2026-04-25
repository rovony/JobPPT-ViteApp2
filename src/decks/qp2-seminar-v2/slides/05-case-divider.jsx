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
export default function Slide05CaseDivider() {
  return (
    <CaseHeroDivider
      caseToken="coral"
      caseNumber="01"
      totalCases={3}
      kicker="CASE STUDY 01"
      title="Ambrisentan"
      subtitle="Model-Informed Pediatric Extrapolation in Pulmonary Arterial Hypertension"
      tagline="Rare disease · ICH E11 extrapolation · model-based evidence replaces a trial that could not feasibly be run."
      meta={[
        ['Compound',   'Selective ETA antagonist · ~4 000× selectivity'],
        ['Pivotal',    'AMB112529 · N = 41 · ages 8–<18'],
        ['Approvals',  'EMA + PMDA pediatric labels · 2021'],
      ]}
      verdict="APPROVED"
      illustration={<LungsShared layoutId="lung-lynch" variant="hero" />}
      source="Okour et al. · J Clin Pharmacol 2023 · 63(3):336–346"
    />
  );
}