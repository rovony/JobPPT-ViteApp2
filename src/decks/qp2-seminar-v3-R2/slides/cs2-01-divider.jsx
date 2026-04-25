import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import IndiaMap from '@/components/deck/illustrations/IndiaMap';

/**
 * CS2 Divider — Ivosidenib · India CDSCO regulatory waiver.
 *
 * MIN-DESIGN PASS. Reuses CaseHeroDivider from v2 with IndiaMap
 * as the hero illustration. Cyan case-color cascade.
 */
export default function CS2Divider() {
  return (
    <CaseHeroDivider
      caseToken="cyan"
      caseNumber="02"
      totalCases={3}
      kicker="CASE STUDY 02"
      title="Ivosidenib"
      subtitle="India's Waiver Pathway"
      tagline="Approved in 42+ countries. Pre-approval blocked at India's border. A global Clin Pharm dossier as the regulatory bridge."
      meta={[
        ['Compound', 'Ivosidenib (IDH1i)'],
        ['Indication', 'IDH1-mutant AML & CCA'],
        ['Agency', 'CDSCO India'],
      ]}
      verdict="APPROVED"
      illustration={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <IndiaMap layoutId="india-cdsco" variant="hero" />
        </div>
      }
      source="CDSCO marketing authorization · 14 May 2025 · India commercial launch 5 June 2025"
    />
  );
}
