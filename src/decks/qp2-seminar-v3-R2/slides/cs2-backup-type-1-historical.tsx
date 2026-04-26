// @ts-nocheck
import React from 'react';
import BackupTypeDivider from '@/components/deck/patterns/BackupTypeDivider';

export default function Cs2BackupTypeHistorical() {
  return (
    <BackupTypeDivider
      caseToken="cyan"
      typeNumber="1"
      typeName="Historical Context"
      description="The CDSCO engagement arc — pre-submission through approval and launch. The temporal frame for the regulatory work."
      probeQuote="Walk me through your engagement timeline with CDSCO — when did you start, what did each step accomplish?"
      slides={[
        { code: 'B1', title: 'CDSCO engagement timeline · pre-submission → patient access' },
      ]}
    />
  );
}
