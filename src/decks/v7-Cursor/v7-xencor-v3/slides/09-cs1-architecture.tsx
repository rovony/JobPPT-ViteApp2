// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS1 · Slide 09 — Drug + constraint.
 *
 * Simplified 2026-04-27: the slide's story job is the clinical-pharm
 * bridge from adult evidence to pediatric dose-defense. Drug details live
 * in Q&A; the face now focuses on why a pediatric efficacy trial could not
 * carry the decision.
 */

const ADULT_FOUNDATION = [
  { label: 'Adult anchor', value: 'ARIES-1 / ARIES-2 established adult PAH efficacy' },
  { label: 'Mechanism', value: 'Selective ETA blockade; PAH biology is shared' },
  { label: 'Dose target', value: 'Pediatric question becomes exposure matching, not a new efficacy trial' },
];

const CONSTRAINTS = [
  { n: '01', label: 'Enrollment', broken: 'Rarity', value: 'Pediatric PAH prevalence 2–16 / million.' },
  { n: '02', label: 'Pooling', broken: 'Heterogeneity', value: 'IPAH, CHD, CTD, and familial PAH in a small cohort.' },
  { n: '03', label: 'Control arm', broken: 'Ethics', value: '80% entered on baseline PAH therapy.' },
  { n: '04', label: 'Endpoint', broken: '6MWD transfer', value: 'Young children cannot perform it reliably; growth confounds change.' },
  { n: '05', label: 'Precedent', broken: 'Empirical record', value: 'STARTS-1: N=235; CPET peak VO2 primary p=0.056.' },
];

export default function Cs1Architecture() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS}>
      {/* PERFECTLY CENTERED BACKGROUND WATERMARK */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '54%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(28rem, 50vw, 40rem)',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'screen',
        }}
      >
        <Lungs layoutId="cs1-lung" variant="ambient" />
      </div>

      <Eyebrow delay={0.10}>
        Case 01 · Why the trial path closes
      </Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        Adult evidence existed.{' '}
        <span className="xc-em-case">
          The pediatric efficacy-trial path did not.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        This is the pivot from "run the same trial" to "defend the pediatric dose quantitatively."
      </Subhead>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: 'var(--space-4)',
          paddingTop: 'var(--space-4)',
        }}>
          <FoundationStrip go={go} />
          <ConstraintGrid go={go} />

          {/* CLOSING REFRAME — Centered, bold callout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
            className="deck-body xc-tagline xc-ink" style={{
              lineHeight: 1.5,
              fontWeight: 400,
              maxWidth: '90ch',
              padding: 'var(--space-4) var(--space-6)',
              borderLeft: '4px solid var(--case)',
              background: 'color-mix(in srgb, var(--case) 8%, transparent)',
              borderRadius: 'var(--radius-md)',
              alignSelf: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          >
            The clinical question wasn&rsquo;t <em style={{ fontStyle: 'italic', opacity: 0.8 }}>can we repeat ARIES in children?</em> The question was:{' '}
            <strong className="xc-case" style={{ fontWeight: 700 }}>how do you defend a pediatric dose under these constraints?</strong>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.7}
        kicker="09 · CS1 · TRIAL PATH CLOSED"
        tagline="Adult evidence gives the anchor; pediatric constraints force the quantitative bridge."
        source="Source · FDA Letairis label · Ivy DD et al. J Pediatr X 2020 Table IV · ESC/ERS 2022 PAH guideline"
      />
    </SlideGrid>
  );
}

function FoundationStrip({ go }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={go ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.7, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(15rem, 100%), 1fr))',
        gap: 'var(--space-3)',
        padding: 'var(--space-4)',
        border: '1px solid color-mix(in srgb, var(--case) 32%, transparent)',
        borderLeft: '4px solid var(--case)',
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--case) 7%, var(--panel))',
      }}
    >
      <div className="deck-mono uppercase xc-slide-eyebrow xc-case" style={{
        gridColumn: '1 / -1',
        letterSpacing: 'var(--ls-mono-wide)',
        fontWeight: 700 }}>
        Adult foundation · anchor, not repeat
      </div>
      {ADULT_FOUNDATION.map((it) => (
        <div key={it.label} style={{ minWidth: 0 }}>
          <div className="deck-mono uppercase xc-slide-eyebrow xc-muted" style={{
            letterSpacing: 'var(--ls-mono)',
            fontWeight: 700,
            marginBottom: 'var(--space-1)' }}>
            {it.label}
          </div>
          <div className="deck-body xc-tagline xc-ink" style={{
            lineHeight: 1.35 }}>
            {it.value}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function ConstraintGrid({ go }) {
  return (
    <div style={{
      position: 'relative',
      zIndex: 1,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(13rem, 100%), 1fr))',
      gap: 'var(--space-3)',
    }}>
      {CONSTRAINTS.map((it, i) => (
        <ConstraintCard key={it.n} item={it} index={i} go={go} />
      ))}
    </div>
  );
}

function ConstraintCard({ item, index, go }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={go ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.85 + index * 0.08, ease: EASE }}
      style={{
        minWidth: 0,
        border: '1px solid color-mix(in srgb, var(--cream-muted) 28%, transparent)',
        borderTop: '3px solid var(--case)',
        borderRadius: 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
        padding: 'var(--space-3) var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
        <span className="deck-mono uppercase xc-slide-eyebrow xc-case" style={{
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 700 }}>
          {item.n} · {item.label}
        </span>
      </div>
      <div className="deck-display xc-tagline xc-ink" style={{
        fontWeight: 650,
        lineHeight: 1.2 }}>
        {item.broken}
      </div>
      <div className="deck-body xc-slide-subhead xc-ink" style={{
        opacity: 0.78,
        lineHeight: 1.35 }}>
        {item.value}
      </div>
    </motion.div>
  );
}
