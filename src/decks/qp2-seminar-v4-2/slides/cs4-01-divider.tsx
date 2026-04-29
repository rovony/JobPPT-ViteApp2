// @ts-nocheck
import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import AiBrain from '../components/AiBrain';

/**
 * CS4 · Divider — AMBER cascade · 16-min flagship arc opener.
 *
 * Sets the case-color contract via caseToken="amber". The AiBrain
 * illustration uses layoutId="cs4-ai-cortex" so it can morph from the
 * hero scale here into the smaller centered glyph on S7 (at-a-glance) —
 * the primitive becomes a system.
 *
 * Per spec the chrome reads "Case Study 04 · 04 of 04" via totalCases=4.
 * CS1/CS2/CS3 keep totalCases=3 (their own context).
 *
 * Local style override (`cs4-divider-scope`):
 *   - title font cap reduced 9rem → 7.5rem so "AI/ML · ClinPharm" reads
 *     decisively without forcing a top/bottom clip on 1080p.
 *   - top anchor lifted from 14vh → 11vh to reclaim the breathing room.
 *   - kicker brightened with a slightly heavier amber tint (var(--case)
 *     was reading too dim against the dark backdrop).
 */
export default function CS4Divider() {
  return (
    <div className="cs4-divider-scope" style={{ width: '100%', height: '100%' }}>
      <style>{`
        /* Title cap reduced 9rem → 7.5rem so "AI/ML · ClinPharm" never
           pushes the column into the source line. Top anchor keeps the
           header off the chrome edge. */
        .cs4-divider-scope h1.deck-display {
          font-size: clamp(2.6rem, 6vw, 7.2rem) !important;
          margin-bottom: 2vh !important;
        }
        /* Kicker reads dim at 0.8rem on dark — bump size + weight + tracking
           so "CASE STUDY 04" lands as the first beat. */
        .cs4-divider-scope [class*="absolute"] > .deck-mono.uppercase {
          font-size: clamp(0.95rem, 1.15vw, 1.25rem) !important;
          letter-spacing: 0.18em !important;
          font-weight: 800 !important;
        }
      `}</style>
      <CaseHeroDivider
        caseToken="amber"
        caseNumber="04"
        totalCases={4}
        kicker="CASE STUDY 04"
        title="AI/ML · ClinPharm"
        subtitle="A body of work — multi-agent orchestration for end-to-end pharmacometric analysis"
        tagline="The discipline is the same. The substrate has advanced."
        meta={[
          ['Architecture', '3-level hierarchy'],
          ['Computation', 'Deterministic tools'],
          ['Governance', 'Privacy + audit by construction'],
        ]}
        verdict="BUILDING"
        illustration={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <AiBrain layoutId="cs4-ai-cortex" variant="hero" />
          </div>
        }
        source="Personal research project · ICH M15 Step 4, 29 Jan 2026 · Kim et al. arXiv:2512.08296 (2025)"
      />
    </div>
  );
}
