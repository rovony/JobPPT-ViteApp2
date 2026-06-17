// @ts-nocheck
import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';

export default function Cs2AdcDivider() {
  return (
    <CaseHeroDivider
      caseToken="cyan"
      caseNumber="02"
      totalCases={3}
      kicker="CASE STUDY 02"
      title="ADC multi-analyte PK"
      subtitle="Conjugate · total antibody · payload"
      tagline="When the analyte architecture changes the dose decision, the model has to make the biology readable."
      meta={[
        ['Modality', 'Antibody-drug conjugate'],
        ['Problem', 'Multi-analyte PK + translational dose logic'],
        ['Role', 'Clinical pharmacology strategy leadership'],
      ]}
      verdict="TRANSFERABLE"
      source="Public-methods framing only · no sponsor-confidential ADC data shown"
    />
  );
}
