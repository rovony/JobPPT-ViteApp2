import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS4 · S31 SETUP — two methodological threads.
 *
 * Top: ICH M15 anchor band (regulatory frame catches up to methods).
 * Mid: two-tile compare — DeepPK (model substrate) | PharmAgent
 *      (workflow substrate, today's deep dive).
 * Bottom: shared-principle ribbon (mechanism + human authority).
 *
 * The earned first-person ownership statement lives in the speaker
 * notes / right tile body — pre-empts any legacy-naming cans-of-worms
 * in the candidate's own voice. Said calmly, said upfront.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function Slide31Cs4Setup() {
  return (
    <SlideFrame
      dataCase="sage"
      eyebrowColor="var(--sage)"
      eyebrow="CS4 · Setup — two methodological threads"
      headline={
        <>
          DeepPK at the model substrate, PharmAgent at the workflow substrate —{' '}
          <span style={{ color: 'var(--sage)', fontStyle: 'italic', fontWeight: 700 }}>
            ICH M15 makes both scope-eligible.
          </span>
        </>
      }
      headlineMaxChars={140}
      subhead="Step 4 reached 2025 · Effective 23 Jul 2026 — first international harmonized guideline including AI/ML in MIDD scope."
      subheadMaxChars={130}
      footerKicker="Case 04 · Setup"
      footerSource="Source · ICH M15 (Step 4, 2025) · Kim et al. arXiv:2512.08296 · github.com/malekokour/DeepPK"
    >
      <SetupLayout />
    </SlideFrame>
  );
}

function SetupLayout() {
  const reduced = useReducedMotion();
  const initial = reduced ? false : undefined;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        rowGap: 'var(--space-4)',
        minHeight: 0,
      }}
    >
      {/* Two-tile compare */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)',
          columnGap: 'var(--space-6)',
          minHeight: 0,
        }}
      >
        <Tile
          eyebrow="DeepPK · the model substrate"
          title="Hybrid Neural ODE framework"
          body="Classical compartmental ODEs (CL, V, Ka) form the mechanistic skeleton — neural network augmentation learns residual dynamics from data. Mass balance preserved. Mechanism interpretable."
          status="Research framework · github.com/malekokour/DeepPK · manuscript in preparation"
          delay={0.4}
          muted
          initialOverride={initial}
        />
        <Tile
          eyebrow="PharmAgent · the workflow substrate"
          title="Multi-agent orchestration"
          body="13 specialized agents in a three-level hierarchy. 151 deterministic tools. 76 review-gated workflow templates. End-to-end coverage of MIDD analysis from dataset profiling through regulatory reporting."
          status="Research direction · architecture grounded in Kim et al. 2025 scaling-laws framework"
          deepDive
          delay={0.6}
          initialOverride={initial}
        />
      </div>

      {/* Bottom shared-principle ribbon */}
      <motion.div
        initial={initial ?? { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 1.1 }}
        style={{
          paddingTop: 'var(--space-3)',
          borderTop: '2px solid var(--sage)',
        }}
      >
        <p
          className="deck-display"
          style={{
            margin: 0,
            fontSize: 'var(--fs-card-quote)',
            fontWeight: 500,
            fontStyle: 'italic',
            color: 'var(--cream)',
            lineHeight: 1.35,
            textAlign: 'center',
          }}
        >
          Both threads share one principle:{' '}
          <span style={{ color: 'var(--sage)', fontStyle: 'normal', fontWeight: 700 }}>
            mechanism preserved, human analyst as named scientific authority.
          </span>
        </p>
      </motion.div>
    </div>
  );
}

function Tile({ eyebrow, title, body, status, deepDive, muted, delay, initialOverride }) {
  return (
    <motion.div
      initial={initialOverride ?? { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        padding: 'var(--space-4) var(--space-5)',
        borderLeft: `3px solid ${deepDive ? 'var(--sage)' : 'var(--cream-hairline)'}`,
        background: deepDive ? 'rgba(107, 142, 115, 0.06)' : 'transparent',
        opacity: muted ? 0.92 : 1,
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--sage)',
          fontWeight: 700,
        }}
      >
        {eyebrow}
      </span>
      <span
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-quote)',
          fontWeight: 700,
          color: 'var(--cream)',
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream)',
          lineHeight: 1.45,
        }}
      >
        {body}
      </p>
      <span
        className="deck-mono"
        style={{
          fontSize: 'var(--fs-card-meta)',
          color: 'var(--cream-muted)',
          fontStyle: 'italic',
          marginTop: 'auto',
          paddingTop: 'var(--space-2)',
          borderTop: '1px solid var(--cream-hairline)',
        }}
      >
        {status}
      </span>
      {deepDive && (
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-meta)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--sage)',
            fontWeight: 800,
          }}
        >
          → Today's deep dive
        </span>
      )}
    </motion.div>
  );
}
