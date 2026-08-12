// @ts-nocheck
import React from 'react';
import BackupHeroDivider from '@/components/deck/patterns/BackupHeroDivider';
import Lungs from '../components/Lungs';

/**
 * CS1 · BACKUP MASTER DIVIDER
 *
 * Marks the entry into the CS1 (ambrisentan) defense library. Per V6
 * Audit_Slides_V6.md §Phase 2, backup slides are organized under five
 * canonical types plus deck-specific extensions. This divider lists
 * the lanes that have content for CS1 with their slide counts so the
 * speaker can pivot to the right lane on a hostile question without
 * scrolling through the manifest.
 *
 * Lane assignments (codified 2026-04-26 audit):
 *   Historical Context    — 4 (timelines + endpoint evolution)
 *   Methodology           — 8 (dosing · allometry · 6MWD · Bayesian
 *                              · PopPK · diagnostics · covariate · ER)
 *   Data Cuts             — 3 (LTE · DDI · hemodynamic substudy)
 *   Risk Mitigation       — 3 (STARTS · juvenile rat · FDA gap)
 *   Regulatory Precedent  — 4 (E11A · Garnett-Florian · PIP arch · EMA 2026)
 *   Total                 — 22 backup slides
 */
export default function Cs1BackupMasterDivider() {
  return (
    <BackupHeroDivider
      caseToken="coral"
      caseNumber="01"
      totalCases={3}
      kicker="BACKUP · CASE STUDY 01 · AMBRISENTAN"
      title="Ambrisentan"
      subtitle="Defense library · pull on demand"
      tagline="Twenty-two slides organized under five V6 backup-type lanes. The live arc carries the story; this zone carries the proof when the room presses."
      slideCount={22}
      typeLanes={[
        { name: 'Historical Context', count: 4 },
        { name: 'Methodology', count: 8 },
        { name: 'Data Cuts', count: 3 },
        { name: 'Risk Mitigation', count: 3 },
        { name: 'Regulatory Precedent', count: 4 },
      ]}
      illustration={<Lungs variant="hero" />}
      source="V6 Phase 2 framework · Audit_Slides_V6.md · 2026-04-26"
    />
  );
}
