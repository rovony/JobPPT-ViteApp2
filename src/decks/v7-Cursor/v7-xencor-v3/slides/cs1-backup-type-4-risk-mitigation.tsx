// @ts-nocheck
import React from 'react';
import BackupTypeDivider from '@/components/deck/patterns/BackupTypeDivider';

/**
 * CS1 BACKUP · TYPE 4 · RISK MITIGATION
 *
 * V6 framework type 5. Defends "what could go wrong?" — the safety
 * signal (STARTS), the preclinical reproductive-tox finding (juvenile
 * rat), and the FDA submission gap that shaped the divergent EMA/PMDA
 * vs FDA verdict landscape.
 */
export default function Cs1BackupTypeRiskMitigation() {
  return (
    <BackupTypeDivider
      caseToken="coral"
      typeNumber="4"
      typeName="Risk Mitigation"
      description="The risk surface the program had to manage: a phase-3 efficacy signal that stopped a sister ERA, a preclinical reproductive-tox finding that constrained dosing, and the FDA-side submission gap that opened the divergent verdict landscape."
      probeQuote="Wasn't there a safety signal in STARTS that should have stopped the whole class?"
      slides={[
        { code: 'B1', title: 'STARTS-1 / STARTS-2 · safety-signal context' },
        { code: 'B2', title: 'Juvenile rat finding · reproductive-tox bound' },
        { code: 'B4', title: 'FDA submission gap · why no FDA pediatric label' },
      ]}
    />
  );
}
