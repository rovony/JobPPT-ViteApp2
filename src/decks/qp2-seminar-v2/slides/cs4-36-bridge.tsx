// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS4 · S36 BRACKET STATEMENT + BRIDGE TO MERCK.
 *
 * Two-column layout. Left = the Bracket Method ownership statement
 * (research direction · architecture documented · no commercial
 * product). Right = where this lands at Merck (cardiometabolic
 * pipeline · sotatercept · MOONBEAM · synthesis sentence).
 *
 * The synthesis sentence is the leadership-scope claim:
 *   "the judgment to know which AI architecture fits which problem"
 *
 * Per global hard rules: PharmAgent framed as personal research,
 * NOT as a product to bring to Merck. The brief itself walks this
 * line carefully and the slide preserves that voice.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function Slide36Cs4Bridge() {
  return (
    <SlideFrame
      dataCase="sage"
      eyebrowColor="var(--sage)"
      eyebrow="CS4 · Bracket statement + bridge to Merck"
      headline={
        <>
          The architecture is published. The judgment is the contribution.{' '}
          <span style={{ color: 'var(--sage)', fontStyle: 'italic', fontWeight: 700 }}>
            The synthesis is the role.
          </span>
        </>
      }
      headlineMaxChars={140}
      subhead="A clean separation: team-validated regulatory work in the prior cases, personal research direction in this one — both serving where the field is going."
      subheadMaxChars={140}
      footerKicker="Case 04 · Bracket + bridge"
      footerSource="Personal research direction · architecture documented · engineering implementation internal"
    >
      <BridgeLayout />
    </SlideFrame>
  );
}

function BridgeLayout() {
  const reduced = useReducedMotion();
  const initial = reduced ? false : undefined;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        columnGap: 'var(--space-7)',
        minHeight: 0,
      }}
    >
      <BracketColumn initialOverride={initial} />
      <BridgeColumn initialOverride={initial} />
    </div>
  );
}

function BracketColumn({ initialOverride }) {
  return (
    <motion.div
      initial={initialOverride ?? { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.4 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        padding: 'var(--space-4) var(--space-5)',
        borderLeft: '3px solid var(--cream-hairline)',
        minHeight: 0,
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          fontWeight: 800,
        }}
      >
        The bracket statement
      </span>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream)',
          lineHeight: 1.55,
        }}
      >
        PharmAgent is a research direction I'm contributing to the methodology field. The
        architecture overview is documented; the engineering implementation remains internal.
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream)',
          lineHeight: 1.55,
        }}
      >
        DeepPK and PharmAgent are open methodology contributions — manuscripts in preparation,
        GitHub repositories where appropriate.{' '}
        <span style={{ color: 'var(--sage)', fontWeight: 700 }}>
          There is no commercial product I'm pitching from this stage.
        </span>
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.55,
        }}
      >
        The Asparlas regulatory work in CS3 is the team-led, FDA-validated artifact. The AI/ML
        contributions here sit alongside it as research I do on my own time, in service of where
        the field is going.
      </p>
    </motion.div>
  );
}

function BridgeColumn({ initialOverride }) {
  return (
    <motion.div
      initial={initialOverride ?? { opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.6 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        padding: 'var(--space-4) var(--space-5)',
        borderLeft: '3px solid var(--sage)',
        background: 'rgba(107, 142, 115, 0.05)',
        minHeight: 0,
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--sage)',
          fontWeight: 800,
        }}
      >
        Where this lands at Merck
      </span>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream)',
          lineHeight: 1.55,
        }}
      >
        The cardiometabolic pipeline — sotatercept across PAH indications, MOONBEAM pediatric
        extrapolation, the broader CMD asset base — sits at the intersection of regulatory rigor
        and methodological forward-thinking.
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream)',
          lineHeight: 1.55,
        }}
      >
        Asparlas was 2023's methodology — model-informed evidence substituting for trial enrollment,
        FDA-validated. PharmAgent and DeepPK are the substrate the next decade of MIDD will run on
        — ICH M15-aligned, regulator-replayable.
      </p>
      <p
        className="deck-display"
        style={{
          margin: 0,
          fontSize: 'var(--fs-card-quote)',
          fontWeight: 600,
          color: 'var(--cream)',
          lineHeight: 1.35,
          paddingTop: 'var(--space-2)',
          borderTop: '1px solid var(--cream-hairline)',
        }}
      >
        The Senior Director QP2 role is exactly this synthesis —{' '}
        <span style={{ color: 'var(--sage)', fontStyle: 'italic', fontWeight: 700 }}>
          regulatory rigor, methodological forward-thinking, and the judgment to know which AI
          architecture fits which problem.
        </span>
      </p>
    </motion.div>
  );
}
