import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import IndiaMap from '@/components/deck/illustrations/IndiaMap';
import BoneMarrowShared from './cs2-shared/BoneMarrowShared';

/**
 * Slide 15 (manifest position) · CS2 DIVIDER · Tibsovo · India.
 *
 * Per cs2-design.md beat 1: "Case card appears. Small bone marrow +
 * India outline seed on the right margin. Nothing yet means anything —
 * but the panel registers two shapes that will matter."
 *
 * Two cinematic seeds:
 *   • BoneMarrowShared (layoutId="bone-marrow-cs2", variant="hero")
 *     → grows on slide 16 background to a centered anchor.
 *   • IndiaMap (layoutId="india-cdsco", variant="hero")
 *     → grows on slide 16 background as the empty coral outline.
 *
 * Both rendered in thin cyan stroke. Small enough to feel like
 * marginalia, large enough to register. Stacked vertically inside the
 * illustration slot — bone marrow top, India bottom.
 */
export default function Slide14Case2Divider() {
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
      illustration={<DualSeed />}
      source="CDSCO marketing authorization · 14 May 2025 · Servier India launch 5 June 2025"
    />
  );
}

/**
 * DualSeed — bone marrow + India stacked vertically as right-margin
 * marginalia. Each seed carries its own layoutId so framer-motion can
 * morph them independently into their slide-16 destinations.
 */
function DualSeed() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-4)',
        height: '100%',
      }}
    >
      <BoneMarrowShared layoutId="bone-marrow-cs2" variant="hero" />
      <IndiaMap layoutId="india-cdsco" variant="hero" />
    </div>
  );
}
