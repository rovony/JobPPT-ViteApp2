// @ts-nocheck
import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import IndiaMap from '@/components/deck/illustrations/IndiaMap';

/**
 * CS3 Divider — Ivosidenib · India CDSCO regulatory waiver.
 *
 * IndiaMap hero illustration carries layoutId="india-cdsco" for the
 * cross-slide morph into cs3-reversal (filled) and backup world-map slides.
 */
export default function CS3IvosidenibDivider() {
  return (
    <CaseHeroDivider
      caseToken="cyan"
      caseNumber="03"
      totalCases={4}
      kicker="CASE STUDY 03"
      title="Ivosidenib"
      subtitle="Regulatory strategy in India"
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
