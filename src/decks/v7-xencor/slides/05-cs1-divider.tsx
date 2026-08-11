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
    <CaseHeroDivider
      caseToken="coral"
      caseNumber="01"
      totalCases={4}
      kicker="CASE STUDY 01"
      title="Ambrisentan"
      subtitle="Pediatric PAH · 39 patients · two agency approvals"
      tagline="8 to <18 years · Phase IIb terminated mid-program · 2021 regulatory verdict"
      meta={[
        ['Compound', 'Ambrisentan · selective ETA antagonist'],
        ['Indication', 'Pediatric PAH'],
        ['Agency', 'EMA + PMDA'],
      ]}
      verdict="APPROVED"
      illustration={<Lungs layoutId="cs1-lung" variant="hero" />}
      source="Source · Okour et al. J Clin Pharmacol 2023 · Ivy et al. J Pediatr X 2020 · EMEA-000434-PIP01-08 · ERA = endothelin receptor antagonist"
    />
  );
}
