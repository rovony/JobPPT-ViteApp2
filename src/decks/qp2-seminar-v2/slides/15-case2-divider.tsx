// @ts-nocheck
import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import IndiaMap from '@/components/deck/illustrations/IndiaMap';

/**
 * Slide 15 · CS2 DIVIDER · Tibsovo · India.
 *
 * v3 (Apr-26 visual-correctness pass):
 *   • Removed the BoneMarrowShared seed. The clinical indication is
 *     IDH1-mutant cholangiocarcinoma + AML — bone marrow only fits the
 *     AML half and visually mis-cues the audience toward a hematology
 *     case. The CS2 story is a regulatory geography case: India's
 *     CDSCO + ICH E5(R1) Appendix D + reference-regulator leverage.
 *   • IndiaMap becomes the single hero seed. It carries layoutId
 *     "india-cdsco", which morphs across slides 16 → 22 (geographic
 *     handoff into the world map, then refilled coral on impact).
 *   • The seed is centered, larger than before, anchored as a single
 *     visual subject — "this slide is about India".
 */
export default function Slide15Case2Divider() {
  return (
    <CaseHeroDivider
      caseToken="cyan"
      caseNumber="02"
      totalCases={3}
      kicker="CASE STUDY 02"
      title="Ivosidenib"
      subtitle="India's Waiver Pathway"
      tagline="Approved in 42 countries. Pre-approval blocked at India's border. Six pillars, one mechanism, one waiver."
      meta={[
        ['Compound', 'Ivosidenib (IDH1i)'],
        ['Indication', 'IDH1-mutant AML & CCA'],
        ['Agency', 'CDSCO India'],
      ]}
      verdict="APPROVED"
      illustration={<IndiaSeed />}
      source="CDSCO marketing authorization · 14 May 2025 · India commercial launch 5 June 2025"
    />
  );
}

/**
 * IndiaSeed — single-element hero seed. The India outline is the
 * cinematic anchor that flows through CS2: it grows into a full-bleed
 * subject on slide 16, locks into geographic position on the world map
 * mid-slide-16, then returns refilled coral on slide 22.
 */
function IndiaSeed() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <IndiaMap layoutId="india-cdsco" variant="hero" />
    </div>
  );
}
