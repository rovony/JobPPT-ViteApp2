// @ts-nocheck
import React from 'react';
import BackupTypeDivider from '@/components/deck/patterns/BackupTypeDivider';

export default function Cs2BackupTypeMethodology() {
  return (
    <BackupTypeDivider
      caseToken="cyan"
      typeNumber="2"
      typeName="Methodology"
      description="The quantitative architecture that made the waiver defensible — six convergent evidence pillars and the Phase 1 dose rationale that anchored the global label."
      probeQuote="What does your six-pillar package actually contain? Walk me through the dose rationale."
      slides={[
        { code: 'B2', title: 'Six-Pillar Package · Tibsovo India regulatory architecture' },
        { code: 'B3', title: 'Phase 1 dose rationale · 500 mg QD across two studies' },
      ]}
    />
  );
}
