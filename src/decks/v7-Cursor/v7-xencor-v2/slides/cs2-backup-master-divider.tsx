// @ts-nocheck
import React from 'react';
import BackupHeroDivider from '@/components/deck/patterns/BackupHeroDivider';
import IndiaMap from '@/components/deck/illustrations/IndiaMap';

/**
 * CS2 · BACKUP MASTER DIVIDER — Ivosidenib · India CDSCO defense library.
 *
 * V6 type lanes for CS2 (4 ported HTML slides + future expansion):
 *   Historical Context    — 1 (CDSCO engagement timeline)
 *   Methodology           — 2 (six-pillar package · phase 1 dose rationale)
 *   Data Cuts             — 1 (population evidence · ethnic DME polymorphisms)
 *   Risk Mitigation       — 0 (TBD)
 *   Regulatory Precedent  — 0 (TBD)
 *   Total                 — 4 backup slides
 */
export default function Cs2BackupMasterDivider() {
  return (
    <BackupHeroDivider
      caseToken="cyan"
      caseNumber="02"
      totalCases={3}
      kicker="BACKUP · CASE STUDY 02 · IVOSIDENIB"
      title="Ivosidenib"
      subtitle="Defense library · pull on demand"
      tagline="Four slides organized under three V6 backup-type lanes — the regulatory architecture, dose rationale, ethnic-evidence base, and engagement timeline that anchored the CDSCO waiver."
      slideCount={4}
      typeLanes={[
        { name: 'Historical Context', count: 1 },
        { name: 'Methodology', count: 2 },
        { name: 'Data Cuts', count: 1 },
      ]}
      illustration={<IndiaMap variant="hero" />}
      source="V6 Phase 2 framework · Audit_Slides_V6.md · 2026-04-26"
    />
  );
}
