import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import InformativePriorViz from './cs3-divider/InformativePriorViz';

/**
 * Case Study 03 · Calaspargase pegol (Asparlas) · Adult Ph-neg ALL.
 *
 * The third and final case turns the framework on a different problem:
 * a rare adult oncology population where an endpoint-powered trial isn't
 * operationally feasible. Pharmacometrics-as-architecture replaces a
 * larger trial with a smaller, smarter one. FDA agreed to N = 60 (a
 * 36% reduction from the protocol's original 94) on the strength of a
 * D-optimal design under an informative pediatric prior.
 *
 * Color · violet (Novel Methods family — CS3 finally lights up Theme 04).
 * Illustration · concentric circles showing the pediatric prior holds the
 * weight; the small adult sample anchors but does not re-derive the model.
 */
export default function Slide23Case3Divider() {
  return (
    <CaseHeroDivider
      caseToken="violet"
      caseNumber="03"
      totalCases={3}
      kicker="CASE STUDY 03"
      title="Calaspargase pegol"
      subtitle="A smaller, smarter trial in adult Ph-negative ALL"
      tagline="A pharmacometrics-anchored design — and an FDA-agreed 36% enrollment reduction in a rare adult oncology population."
      meta={[
        ['Compound', 'Calaspargase pegol (Asparlas)'],
        ['Population', 'Adult Ph-negative ALL'],
        ['Agency', 'FDA · Type A · 21 Jul 2023'],
        ['Outcome', 'N = 60 agreed (94 → 60 · −36%)'],
      ]}
      verdict="N=60 AGREED"
      illustration={<InformativePriorViz layoutId="cs3-prior-anchor" variant="hero" />}
      source="FDA Type A meeting · 21 Jul 2023 · NCT04817761 (SPARK-ALL)"
    />
  );
}
