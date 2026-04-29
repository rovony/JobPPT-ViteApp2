// @ts-nocheck
import React, { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import DualAudienceContract from '../components/cs4/DualAudienceContract';
import AiBrainAmbient from '../components/cs4/AiBrainAmbient';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · Objective — THE CONTRACT (load-bearing).
 *
 * Headline = the assertion the entire arc has to defend. Below it sits
 * the dual-audience contract table (For the clinical pharmacologist /
 * For the pharmacometrician), separated by a 1px amber hairline. A
 * Success band lives inside the same Viz container.
 *
 * Motion contract per spec:
 *   1. Headline reveals.
 *   2. LEFT column slides in.
 *   3. RIGHT column slides in 200ms after.
 *   4. Success band fades in last after ~1.5s.
 *   5. The TracingBeam STARTS DRAWING here (arcIndex=1 of 12).
 */
export default function CS4Objective() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <AiBrainAmbient variant="ambient" position="center" delay={0.4} />

      <Eyebrow delay={0.1}>Case 04 · Objective</Eyebrow>

      <Headline delay={0.25} maxChars={80}>
        A platform that orchestrates the full MIDD workflow —{' '}
        <span style={{ color: 'var(--amber)' }}>
          end-to-end, regulator-replayable
        </span>
        , for clinical pharmacologists and pharmacometricians, juniors and seniors.
      </Headline>

      <Viz>
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
          <DualAudienceContract go={go} delay={0.8} />
        </div>
      </Viz>

      <Footer
        kicker="CASE 04 · AI/ML · PHARMAGENT"
        tagline="The contract this arc defends — for both audiences in the room."
        delay={3.0}
      />

      <TracingBeam progress={cs4Progress(1)} go={!reduce} />
    </SlideGrid>
  );
}
