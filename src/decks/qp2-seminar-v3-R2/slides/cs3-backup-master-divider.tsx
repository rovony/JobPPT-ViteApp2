// @ts-nocheck
import React from 'react';
import BackupHeroDivider from '@/components/deck/patterns/BackupHeroDivider';
import AiBrain from '../components/AiBrain';

/**
 * CS3 · BACKUP MASTER DIVIDER — PharmAgent / SPARK-ALL defense library.
 *
 * V6 type lanes for CS3 (4 ported HTML slides + future expansion):
 *   Methodology           — 2 (optimal design · simulated primary endpoint)
 *   Risk Mitigation       — 1 (trial status · early termination context)
 *   Regulatory Precedent  — 1 (pediatric anchor · Asparlas precedent)
 *   Total                 — 4 backup slides
 */
export default function Cs3BackupMasterDivider() {
  return (
    <BackupHeroDivider
      caseToken="sage"
      caseNumber="03"
      totalCases={3}
      kicker="BACKUP · CASE STUDY 03 · PHARMAGENT"
      title="PharmAgent"
      subtitle="Defense library · pull on demand"
      tagline="Four slides organized under three V6 backup-type lanes — the optimal-design methodology, simulated-endpoint precedent, trial-status context, and pediatric anchor that ground the SPARK-ALL methodology beyond the program's fate."
      slideCount={4}
      typeLanes={[
        { name: 'Methodology', count: 2 },
        { name: 'Risk Mitigation', count: 1 },
        { name: 'Regulatory Precedent', count: 1 },
      ]}
      illustration={<AiBrain variant="hero" />}
      source="V6 Phase 2 framework · Audit_Slides_V6.md · 2026-04-26"
    />
  );
}
