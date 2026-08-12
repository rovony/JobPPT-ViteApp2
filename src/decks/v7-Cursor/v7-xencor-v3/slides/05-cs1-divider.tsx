// @ts-nocheck
import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import Lungs from '../components/Lungs';

/**
 * CS1 · Case Divider — Ambrisentan (pediatric PAH).
 *
 * v0.2 — illustration slot now hosts the v2-lifted Lungs (hero variant).
 * Shared layoutId="cs1-lung" cross-slide morphs from this divider into
 * the cs1-disease slide where the lung scales up to context variant.
 *
 * Per CLAUDE.md "Cross-slide patterns → A. Shared-element FLIP morphs":
 *   the morph carries CS1's narrative — divider's "this is the case"
 *   beat into disease-burden's "this is the operating context".
 */
export default function Cs1Divider({ deck }) {
  return (
    <div data-case="1" style={{ width: '100%', height: '100%' }}>
      <CaseHeroDivider
        caseToken="coral"
        caseNumber="01"
        totalCases={4}
        kicker="CASE STUDY 01"
        title="Ambrisentan"
        subtitle="A pediatric dose had to be chosen after the efficacy trial became structurally untrialable"
        tagline="Pediatric PAH · ages 8 to <18 · EMA + PMDA · 2021 verdict"
        meta={[
          ['Compound', 'Ambrisentan · selective ETA antagonist'],
          ['Indication', 'Pediatric PAH'],
          ['Agency', 'EMA + PMDA'],
        ]}
        verdict="APPROVED"
        illustration={<Lungs layoutId="cs1-lung" variant="hero" />}
        source="Source · Okour et al. J Clin Pharmacol 2023 · Ivy et al. J Pediatr X 2020 · EMEA-000434-PIP01-08 · ERA = endothelin receptor antagonist"
      />
    </div>
  );
}
