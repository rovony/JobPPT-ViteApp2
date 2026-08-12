// @ts-nocheck
import React from 'react';
import BackupTypeDivider from '@/components/deck/patterns/BackupTypeDivider';

export default function Cs3BackupTypeMethodology() {
  return (
    <BackupTypeDivider
      caseToken="sage"
      typeNumber="2"
      typeName="Methodology"
      description="The optimal-design + simulated-endpoint methodology that anchored FDA's Type A agreement — D-optimality on PopED, NPAA ≥ 0.1 U/mL primary, Rylaze precedent."
      probeQuote="How did you justify N=60 instead of the conventional N=94? And what's the basis for a simulation-based primary endpoint?"
      slides={[
        { code: 'B1', title: 'Optimal design · D-optimality + sample-size sensitivity' },
        { code: 'B2', title: 'Simulated primary endpoint · NPAA ≥ 0.1 U/mL · Rylaze precedent' },
      ]}
    />
  );
}
