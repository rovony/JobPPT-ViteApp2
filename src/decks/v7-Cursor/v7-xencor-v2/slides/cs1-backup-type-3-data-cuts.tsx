// @ts-nocheck
import React from 'react';
import BackupTypeDivider from '@/components/deck/patterns/BackupTypeDivider';

/**
 * CS1 BACKUP · TYPE 3 · DATA CUTS
 *
 * V6 framework type 2. Defends "what about subgroup X / sensitivity /
 * alternative analysis?" — long-term extension follow-up, drug-drug
 * interaction sub-analyses, and the hemodynamic substudy that
 * triangulated the exposure-response story.
 */
export default function Cs1BackupTypeDataCuts() {
  return (
    <BackupTypeDivider
      caseToken="coral"
      typeNumber="3"
      typeName="Data Cuts"
      description="Sub-analyses, longitudinal extensions, and the hemodynamic substudy that confirmed adult-equivalent response in the pediatric population — the second-look data the 6MWD primary doesn't surface."
      probeQuote="What does the long-term extension look like? Any DDI signals with PDE-5i co-administration?"
      slides={[
        { code: 'B7', title: 'Long-term extension · ≥ 96-week safety' },
        { code: 'B8', title: 'DDI · ambrisentan + PDE-5i co-admin' },
        { code: 'B12', title: 'Hemodynamic substudy · invasive PVR data' },
      ]}
    />
  );
}
