// @ts-nocheck
import React, { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import AgentPrimitive from '../components/cs4/AgentPrimitive';
import AiBrainAmbient from '../components/cs4/AiBrainAmbient';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · S6 · What an Agent Actually Is — junior on-ramp (load-bearing).
 *
 * Three-card horizontal strip with mono numerals 01 / 02 / 03 separated
 * by 1px amber hairlines. Bottom italic band names the primitive truth:
 * the LLM is not the worker; scipy is the worker; the agent is what
 * decides when to call it.
 */
export default function CS4AgentPrimitive() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <AiBrainAmbient variant="foundation" position="center" delay={0.45} />

      <Eyebrow delay={0.1}>Case 04 · The agent primitive</Eyebrow>

      <Headline delay={0.25} maxChars={84}>
        An agent is an LLM with three things:{' '}
        <span style={{ color: 'var(--amber)' }}>tools that compute</span>,{' '}
        <span style={{ color: 'var(--amber)' }}>state that persists</span>,
        and a <span style={{ color: 'var(--amber)' }}>reasoning loop</span>.
      </Headline>

      <Subhead delay={0.55} size="lead" maxChars={104}>
        Strip the marketing away. The substrate is small, well-defined, and
        — for pharma — entirely buildable on deterministic foundations.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-4), 2.4vh, var(--space-6))',
            minHeight: 0,
          }}
        >
          {/* AgentPrimitive already embeds the ReasoningLoop visual
              between the 3-card strip and the bottom italic band. The
              previous version of this slide also rendered a SECOND
              standalone ReasoningLoop below the band, which produced a
              duplicate plan/call/observe diagram on screen. */}
          <AgentPrimitive go={go} delay={0.7} />
        </div>
      </Viz>

      <Footer
        kicker="CASE 04 · AI/ML · PHARMAGENT"
        tagline="Three primitives. Everything else is composition."
        delay={2.6}
      />

      <TracingBeam progress={cs4Progress(5)} go={!reduce} />
    </SlideGrid>
  );
}
