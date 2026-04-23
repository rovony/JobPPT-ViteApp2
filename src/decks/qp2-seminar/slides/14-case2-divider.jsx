import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import IndiaMap from '@/components/deck/illustrations/IndiaMap';

/**
 * Case Study 02 · Tibsovo (Ivosidenib) · India CDSCO Waiver.
 * Hero divider with a neon-cyan India map illustration.
 */
export default function Slide14Case2Divider() {
  return (
    <CaseHeroDivider
      caseToken="cyan"
      caseNumber="02"
      totalCases={3}
      kicker="CASE STUDY 02"
      title="Ivosidenib"
      subtitle="India's Waiver Pathway"
      tagline="40+ countries approved. One market waiting. Six pillars of science."
      meta={[
        ['Compound', 'Ivosidenib (IDH1i)'],
        ['Indication', 'IDH1-mutant AML & CCA'],
        ['Agency', 'CDSCO India'],
      ]}
      verdict="APPROVED"
      illustration={<IndiaMap />}
      source="CDSCO marketing authorization · 14 May 2025 · Servier India launch 5 June 2025"
    />
  );
}