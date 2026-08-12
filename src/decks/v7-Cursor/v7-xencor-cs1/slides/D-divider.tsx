// @ts-nocheck
import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import Lungs from '../components/Lungs';

/** Case opener — Ambrisentan dose defense after efficacy failed. */
export default function Cs1Divider() {
  return (
    <CaseHeroDivider
      caseToken="coral"
      caseNumber="01"
      totalCases={4}
      kicker="CASE STUDY 01 · ANCHOR"
      title="Ambrisentan"
      subtitle="Defending a pediatric dose after the efficacy path failed"
      tagline="Ages 8 to <18 · Phase IIb terminated · EMA + PMDA 2021"
      meta={[
        ['Compound', 'Ambrisentan · selective ETA antagonist'],
        ['Indication', 'Pediatric PAH'],
        ['Agency', 'EMA + PMDA'],
      ]}
      verdict="APPROVED"
      illustration={<Lungs layoutId="cs1-lung" variant="hero" />}
      source="Source · Okour et al. J Clin Pharmacol 2023 · AMB112529 · EMEA-000434-PIP01-08"
    />
  );
}
