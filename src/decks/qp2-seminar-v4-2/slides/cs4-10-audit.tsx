// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import ZoomablePanel from '@/components/deck/ZoomablePanel';
import HashChain from '../components/cs4/HashChain';
import RegulatorReplayCard from '../components/cs4/RegulatorReplayCard';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · S10 · Audit by Cryptographic Chain (jaw-drop 2).
 *
 * Top half: 8-entry HashChain ribbon with sha256 callout. Bottom half:
 * 3 numbered claims explaining the property:
 *   1. Tamper-evident
 *   2. Regulator-replayable in 2034
 *   3. 21 CFR Part 11 + ICH M15 aligned
 *
 * Cinematic moment 4 lives inside HashChain — entries reveal, then ONE
 * entry's content silently changes and downstream hashes scramble +
 * resettle red. Tamper-evidence lands without narration.
 *
 * IP firewall (NOT on this slide): exact concatenation order, anchoring
 * strategy, key-management posture.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const CLAIMS = [
  {
    num: '1',
    body: 'Tamper-evident · modification of any entry invalidates all subsequent hashes',
  },
  {
    num: '2',
    body: 'Regulator-replayable · pin tool versions, replay deterministically in 2034',
  },
  {
    num: '3',
    body: '21 CFR Part 11 + ICH M15 aligned · the right primitive for the regulatory framework',
  },
];

export default function CS4Audit() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.1}>Case 04 · Audit by chain</Eyebrow>

      <Headline delay={0.25} maxChars={92}>
        Every tool call is hashed and chained. Modify any past entry —{' '}
        <span style={{ color: 'var(--amber)' }}>every downstream hash breaks</span>.
      </Headline>

      <Subhead delay={0.55} size="lead" maxChars={106}>
        The audit trail isn't a logging convenience. It's a cryptographic
        primitive — the right shape for 21 CFR Part 11 and ICH M15.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-3), 1.8vh, var(--space-5))',
            paddingTop: 'var(--space-2)',
            minHeight: 0,
          }}
        >
          {/* Top — HashChain ribbon wrapped in ZoomablePanel for the
              regulator-skeptic Q&A: click to inspect any single block. */}
          <div style={{ flex: '0 0 auto', minHeight: 0 }}>
            <ZoomablePanel
              title="Hashchain — 8-entry audit ribbon"
              right={<span className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', letterSpacing: '0.12em' }}>sha-256</span>}
              accent="var(--amber)"
              panelStyle={{
                width: '100%',
                display: 'flex',
                border: '1px solid color-mix(in srgb, var(--amber) 18%, transparent)',
                padding: 'var(--space-3)',
                background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
              }}
            >
              <HashChain go={go} delay={0.7} />
            </ZoomablePanel>
          </div>

          {/* RegulatorReplayCard — anchors the "regulator-replayable in 2034"
              claim with pinned tool versions. */}
          <RegulatorReplayCard go={go} delay={1.4} />

          {/* Bottom — three numbered claims */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6, ease: EASE }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
              padding: 'clamp(var(--space-2), 1.2vh, var(--space-3)) 0',
              borderTop: '1px solid color-mix(in srgb, var(--amber) 35%, transparent)',
            }}
          >
            {CLAIMS.map((c, i) => (
              <ClaimCell key={c.num} c={c} go={go} delay={1.8 + i * 0.16} />
            ))}
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CASE 04 · AI/ML · PHARMAGENT"
        tagline="Audit is the chain. Tampering breaks it — visibly, deterministically."
        delay={2.6}
      />

      <TracingBeam progress={cs4Progress(9)} go={!reduce} />
    </SlideGrid>
  );
}

function ClaimCell({ c, go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.2, 0.7, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'baseline',
        gap: 'var(--space-3)',
      }}
    >
      <span
        className="deck-mono"
        style={{
          fontSize: 'clamp(1.4rem, min(2vw, 3.2vh), 2.2rem)',
          color: 'var(--amber)',
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1,
        }}
      >
        {c.num}
      </span>
      <span
        className="deck-body"
        style={{
          fontSize: 'clamp(0.78rem, min(1vw, 1.6vh), 1.05rem)',
          color: 'var(--cream)',
          lineHeight: 1.4,
        }}
      >
        {c.body}
      </span>
    </motion.div>
  );
}
