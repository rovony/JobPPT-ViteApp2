// @ts-nocheck
import React, { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import LandscapeSlices from '../components/cs4/LandscapeSlices';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · S5 · Where the Literature Sits.
 *
 * Five published systems addressing slices of the workflow. Each card is
 * name · anchor citation · scope · 7-segment coverage bar (Data → NCA →
 * PopPK → PKPD → ER → QC → Reporting). NO card fills more than 3 of 7
 * segments — the load-bearing comparison that S7 will overturn.
 *
 * Cards stagger left-to-right (300ms each). Coverage bars fill after each
 * card lands.
 */
export default function CS4Landscape() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.1}>Case 04 · Landscape</Eyebrow>

      <Headline delay={0.25} maxChars={86}>
        Five published systems address{' '}
        <span style={{ color: 'var(--amber)' }}>slices</span> of the workflow.{' '}
        None covers the full substrate.
      </Headline>

      <Subhead delay={0.55} size="lead" maxChars={114}>
        Apollo-AI, pyDarwin, DeepPumas, PEARL, QSP-Copilot — each owns one
        or two stages. The end-to-end MIDD substrate is the gap.
      </Subhead>

      <Viz>
        <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'stretch' }}>
          <LandscapeSlices go={go} delay={0.75} />
        </div>
      </Viz>

      <Footer
        kicker="CASE 04 · AI/ML · PHARMAGENT"
        tagline="Slices, not substrate. Hold this comparison — slide 07 overturns it."
        source="Sources · Shahin et al. 2025 (CTS) · pyDarwin (open-source) · Pumas-AI · Waikar & Bhat 2026 (CPT:PSP) · Saini et al. 2025"
        delay={2.7}
      />

      <TracingBeam progress={cs4Progress(4)} go={!reduce} />
    </SlideGrid>
  );
}
