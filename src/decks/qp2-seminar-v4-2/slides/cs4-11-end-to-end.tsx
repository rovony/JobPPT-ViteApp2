// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import ZoomablePanel from '@/components/deck/ZoomablePanel';
import EndToEndStorybook from '../components/cs4/EndToEndStorybook';
import WallClockTicker from '../components/cs4/WallClockTicker';
import PharmStateMonitor from '../components/cs4/PharmStateMonitor';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · S11 · One Workflow, End-to-End — THE PROOF (1:30).
 *
 * Vertical 5-lane swimlane (USER · SUPERVISOR · NCA AGENT · QC AGENT ·
 * REPORT). Audit-trail mono hash badges hang on the right edge of each
 * lane as it lands.
 *
 * Cinematic moment 5: NCA Agent box from S8 flies into Lane 2 via
 * layoutId="cs4-nca-agent" — same element, two contexts. Lanes reveal
 * top-to-bottom (300ms each). Lane 3's tool calls stagger-reveal as a
 * sequence. Hash badges populate as each lane lands. Bottom band fades
 * last.
 *
 * IP firewall (NOT on this slide): tool function signatures, NCA
 * implementation details, QC checklist contents.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function CS4EndToEnd() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.1}>Case 04 · End-to-end</Eyebrow>

      <Headline delay={0.25} maxChars={84}>
        User types &ldquo;Run NCA.&rdquo;{' '}
        <span style={{ color: 'var(--amber)' }}>Seven tools fire</span>.{' '}
        QC verdict returns. Report section drafts.
      </Headline>

      <Subhead delay={0.55} size="lead" maxChars={108}>
        One sentence in. Five lanes deep. Methods-section draft out — written
        from the audit trail of what actually ran, not what was planned.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-3), 1.6vh, var(--space-4))',
            paddingTop: 'var(--space-2)',
            minHeight: 0,
          }}
        >
          {/* Three-column body — swimlane (zoomable) | PharmState
              monitor | wall-clock counter. The swimlane is the core
              storytelling object; the monitor proves the typed-state
              writes; the clock proves the under-5-minutes claim. */}
          <div
            style={{
              flex: '1 1 auto',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 6fr) minmax(0, 3.2fr) minmax(0, 1.7fr)',
              gap: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
              minHeight: 0,
              alignItems: 'stretch',
            }}
          >
            <ZoomablePanel
              title="End-to-end swimlane"
              right={<span className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', letterSpacing: '0.12em' }}>5 lanes</span>}
              accent="var(--amber)"
              panelStyle={{
                width: '100%',
                height: '100%',
                display: 'flex',
                border: '1px solid color-mix(in srgb, var(--amber) 18%, transparent)',
                padding: 'var(--space-3)',
                background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
                minHeight: 0,
              }}
            >
              <EndToEndStorybook go={go} delay={0.7} />
            </ZoomablePanel>

            <PharmStateMonitor go={go} delay={0.4} />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-3)',
                border: '1px solid color-mix(in srgb, var(--amber) 25%, transparent)',
                background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
                minHeight: 0,
              }}
            >
              <WallClockTicker go={go} delay={1.0} />
            </div>
          </div>

          {/* Bottom italic band — fades last */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.0, ease: EASE }}
            style={{
              padding: 'clamp(var(--space-2), 1.2vh, var(--space-3)) clamp(var(--space-3), 1.6vw, var(--space-5))',
              borderTop: '1px solid color-mix(in srgb, var(--amber) 35%, transparent)',
            }}
          >
            <p
              className="deck-display italic"
              style={{
                margin: 0,
                color: 'var(--cream)',
                fontSize: 'clamp(0.95rem, min(1.25vw, 2vh), 1.4rem)',
                lineHeight: 1.4,
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              Total wall-clock:{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 700 }}>
                under 5 minutes
              </span>
              . The Methods section draft is generated from the audit trail —{' '}
              <em>what actually ran</em>, not what was planned.
            </p>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CASE 04 · AI/ML · PHARMAGENT"
        tagline="Single intent → orchestrated MIDD → review-ready artifact."
        delay={3.4}
      />

      <TracingBeam progress={cs4Progress(10)} go={!reduce} />
    </SlideGrid>
  );
}
