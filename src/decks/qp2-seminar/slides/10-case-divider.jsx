import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import VesselFlowDiagram from '@/components/deck/illustrations/VesselFlowDiagram';

/**
 * Case Study 01 · Ambrisentan · Pediatric PAH.
 *
 * Hero divider with a three-panel vessel-flow narrative
 * (Healthy → PAH constricted → Ambrisentan restored) replacing
 * the earlier lungs-in-a-circle medallion. The three-panel
 * framing lets the divider *tell* the therapeutic story in
 * 8-12 seconds rather than just decorate the title.
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
      illustration={<VesselFlowDiagram />}
      source="Okour et al. · J Clin Pharmacol · 2023 · Published"
    />
  );
}