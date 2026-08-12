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
    <div data-case="2" style={{ width: '100%', height: '100%' }}>
      <CaseHeroDivider
        caseToken="cyan"
        caseNumber="02"
        totalCases={4}
        kicker="CASE STUDY 02 · POSITION 2"
        title="Ivosidenib"
        subtitle="Approved in forty-two countries — not in India"
        tagline="Local-evidence gap. A global Clin Pharm dossier had to justify transport — not interpolation."
        meta={[
          ['Compound', 'Ivosidenib (IDH1i)'],
          ['Indication', 'IDH1-mutant AML & CCA'],
          ['Agency', 'CDSCO India'],
        ]}
        verdict="APPROVED"
        illustration={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
            <IndiaMap layoutId="india-cdsco" variant="hero" fillIntensity={0.2} stroke="var(--xc-case-accent)" />
          </div>
        }
        source="CDSCO marketing authorization · 14 May 2025"
      />
    </div>
  );
}
