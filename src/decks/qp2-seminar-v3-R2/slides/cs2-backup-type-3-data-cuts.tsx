// @ts-nocheck
import React from 'react';
import BackupTypeDivider from '@/components/deck/patterns/BackupTypeDivider';

export default function Cs2BackupTypeDataCuts() {
  return (
    <BackupTypeDivider
      caseToken="cyan"
      typeNumber="3"
      typeName="Data Cuts"
      description="Population-specific evidence — IDH1 prevalence and DME polymorphism frequencies across ethnic groups. The subgroup data that defended Pillar 3 (PopPK race insensitivity)."
      probeQuote="What's the Indian-specific evidence base? Are there CYP3A4 polymorphism differences that should change dosing?"
      slides={[
        { code: 'B4', title: 'Population evidence · IDH1 prevalence + DME polymorphisms' },
      ]}
    />
  );
}
