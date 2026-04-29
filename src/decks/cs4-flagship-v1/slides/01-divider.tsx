// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import AiBrain from '../../qp2-seminar-v3-R2/components/AiBrain';
import TracingBeam from '../components/TracingBeam';
import { SHARED_LAYOUT_IDS } from '../themes';
import { DECK_META } from '../data';

/**
 * S01 · CS4 Divider — sage cascade · AiBrain morph anchor.
 *
 * Reuses the V5 `CaseHeroDivider` pattern unchanged. The case-marker
 * hairline carries the standard `case-marker-sage` layoutId so that
 * if this deck is later embedded inside V5, the morph from the V5
 * roadmap dot still works.
 *
 * Cinematic continuity:
 *   • AiBrain illustration is wrapped in a layout-tagged box
 *     (cs4-flagship-brain) so it morphs into the center of the S02
 *     three-circle Venn — Antigravity FLIP pattern.
 *   • Case hairline carries `case-marker-sage` for the S02 → S03
 *     hairline-to-arc morph (chained downstream).
 *   • TracingBeam shows segment 1 of 10 — the spine begins.
 *
 * Editorial restraint:
 *   • Single accent (sage). Verdict tile reads "BUILDING" — the
 *     forward-looking voice that matches the manuscript-in-prep status.
 *   • Source line cites both the published anchor (Kim 2025) and the
 *     regulatory anchor (M15 Step 4) verbatim from data.ts.
 */
export default function CS4Divider() {
  return (
    <>
      <CaseHeroDivider
        caseToken={DECK_META.caseToken}
        caseNumber="04"
        totalCases={4}
        kicker="CASE STUDY 04"
        title="PharmAgent"
        subtitle="Workflow Infrastructure for Model-Informed Decisions"
        tagline="Decision 4: move pharmacometric scaffolding from analyst memory into privacy-first, audit-ready, regulator-legible infrastructure."
        meta={[
          ['Architecture', 'Supervisor + specialist agents'],
          ['Computation', 'Deterministic tools, no model inference on raw data'],
          ['Governance', 'Privacy + cryptographic audit by construction'],
        ]}
        verdict="BUILDING"
        illustration={
          <motion.div
            layoutId={SHARED_LAYOUT_IDS.aiBrain}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <AiBrain layoutId="cs4-ai-brain-inner" variant="hero" />
          </motion.div>
        }
        source={DECK_META.source}
      />
      <TracingBeam segment={1} totalSegments={DECK_META.totalSlides} />
    </>
  );
}
