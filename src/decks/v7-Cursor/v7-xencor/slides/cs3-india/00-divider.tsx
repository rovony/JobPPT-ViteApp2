// @ts-nocheck
import React from 'react';
import { useReducedMotion } from 'framer-motion';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';
import IndiaMap from '@/components/deck/illustrations/IndiaMap';

/**
 * CS3 Divider — Ivosidenib · India CDSCO regulatory waiver.
 *
 * Soft paper wash behind the map (no blur halo). Low fillIntensity so the
 * hero outline reads as editorial ink, not neon theater glow.
 * IndiaMap layoutId="india-cdsco" morphs into cs3-reversal (filled).
 */
export default function CS3IvosidenibDivider() {
  const reduce = useReducedMotion();
  return (
    <CaseHeroDivider
      caseToken="cyan"
      caseNumber="02"
      totalCases={4}
      kicker="CASE STUDY 02 · PRESENTED SECOND"
      title="Ivosidenib"
      subtitle="India · justified transport across a missing local anchor"
      tagline="Approved in 42+ countries. No local PK to point at. A convergent Clin Pharm dossier as the regulatory bridge."
      meta={[
        ['Compound', 'Ivosidenib (IDH1i)'],
        ['Indication', 'IDH1-mutant AML & CCA'],
        ['Agency', 'CDSCO India'],
      ]}
      verdict="APPROVED"
      illustration={
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          {/* Soft paper wash — no blur / glow halo */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: '8%',
              background:
                'radial-gradient(ellipse at center, color-mix(in srgb, var(--cyan) 6%, transparent) 0%, transparent 70%)',
              zIndex: 0,
              opacity: reduce ? 0.5 : 1,
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <IndiaMap
              layoutId="india-cdsco"
              variant="hero"
              fillIntensity={0.1}
              stroke="var(--cyan)"
              delay={0.15}
            />
          </div>
        </div>
      }
      source="CDSCO marketing authorization · 14 May 2025 · India commercial launch 5 June 2025"
    />
  );
}
