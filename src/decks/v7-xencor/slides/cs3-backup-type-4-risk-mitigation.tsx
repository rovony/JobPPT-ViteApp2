// @ts-nocheck
import React from 'react';
import BackupTypeDivider from '@/components/deck/patterns/BackupTypeDivider';

export default function Cs3BackupTypeRiskMitigation() {
  return (
    <BackupTypeDivider
      caseToken="sage"
      typeNumber="4"
      typeName="Risk Mitigation"
      description="The honest framing of trial status — SPARK-ALL ended early on a sponsor decision, not a scientific or regulatory failure. The methodological precedent transfers regardless."
      probeQuote="Your trial terminated. Doesn't that invalidate the methodology you're claiming as a precedent?"
      slides={[
        { code: 'B3', title: 'Trial status · SPARK-ALL terminated · methodology durable' },
      ]}
    />
  );
}
