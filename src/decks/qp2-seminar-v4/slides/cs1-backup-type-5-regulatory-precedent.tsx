// @ts-nocheck
import React from 'react';
import BackupTypeDivider from '@/components/deck/patterns/BackupTypeDivider';

/**
 * CS1 BACKUP · TYPE 5 · REGULATORY PRECEDENT
 *
 * V6 deck-specific type. Defends "show me the regulatory framework
 * that justifies this." Maps the program onto ICH E11A pediatric
 * extrapolation, Garnett-Florian dose-finding-by-exposure, the
 * EMA Paediatric Investigation Plan architecture, and the March 2026
 * EMA addendum that codifies the framework into post-2025 guidance.
 */
export default function Cs1BackupTypeRegulatoryPrecedent() {
  return (
    <BackupTypeDivider
      caseToken="coral"
      typeNumber="5"
      typeName="Regulatory Precedent"
      description="The regulatory frameworks the AMB112529 program maps onto — pediatric extrapolation guidance, exposure-based dose justification, PIP architecture, and the EMA addendum that updates the post-ICH-E11A landscape."
      probeQuote="Is this just AMB112529 or does it map onto ICH E11A and the new EMA pediatric PAH addendum?"
      slides={[
        { code: 'B9', title: 'ICH E11A · pediatric extrapolation guidance map' },
        { code: 'B11', title: 'Garnett-Florian framework · exposure-based dosing' },
        { code: 'B13', title: 'PIP architecture · EMEA-000434-PIP01-08 age coverage' },
        { code: 'B19', title: 'EMA Pediatric PAH Addendum · March 2026 (CHMP)' },
      ]}
    />
  );
}
