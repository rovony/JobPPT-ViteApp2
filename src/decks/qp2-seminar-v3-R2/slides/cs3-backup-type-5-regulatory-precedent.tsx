// @ts-nocheck
import React from 'react';
import BackupTypeDivider from '@/components/deck/patterns/BackupTypeDivider';

export default function Cs3BackupTypeRegulatoryPrecedent() {
  return (
    <BackupTypeDivider
      caseToken="sage"
      typeNumber="5"
      typeName="Regulatory Precedent"
      description="The pediatric PopPK anchor that carries the statistical weight — Asparlas FDA approval (Dec 2018) + AALL07P4 + DFCI 11-001 trial data. The adult cohort tests whether the model transfers; the pediatric model is the prior."
      probeQuote="What gives you the right to use pediatric data as the prior for adults? Show me the regulatory precedent."
      slides={[
        { code: 'B4', title: 'Pediatric anchor · Asparlas FDA approval + AALL07P4 / DFCI 11-001' },
      ]}
    />
  );
}
