// @ts-nocheck
import React from 'react';
import BackupTypeDivider from '@/components/deck/patterns/BackupTypeDivider';

/**
 * CS1 BACKUP · TYPE 1 · HISTORICAL CONTEXT
 *
 * V6 framework type 4 (renumbered to 1 within this case for reading
 * order). Defends against "didn't someone try this before?" — i.e.
 * the temporal precedents and PAH program-history questions that
 * panelists with deep field experience will ask.
 */
export default function Cs1BackupTypeHistorical() {
  return (
    <BackupTypeDivider
      caseToken="coral"
      typeNumber="1"
      typeName="Historical Context"
      description="Why the PAH program had to evolve the way it did, and how ambrisentan's pediatric arc fits the broader timeline of disease, label, and regulatory framework precedents."
      probeQuote="Didn't FUTURE-1 already do this in 2009? Why was the AMB112529 design needed at all?"
      slides={[
        { code: 'BC1', title: 'Timeline · 1995 → 2026 · PAH disease + label arc' },
        { code: 'BC2', title: 'Timeline · 2004 → 2024 · ambrisentan-only zoom' },
        { code: 'BC3', title: 'Timeline · 2004 → 2024 · program-detail (adult + AMB112529)' },
        { code: 'B10', title: 'Endpoint evolution · 6MWD → composite to event-driven' },
      ]}
    />
  );
}
