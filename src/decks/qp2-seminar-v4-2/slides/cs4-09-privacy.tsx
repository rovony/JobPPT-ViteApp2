// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import ZoomablePanel from '@/components/deck/ZoomablePanel';
import PatientRowGlyphs from '../components/cs4/PatientRowGlyphs';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · S9 · Privacy by Architecture (jaw-drop 1).
 *
 * One dominant SchemaExtractor diagram. Two columns separated by a single
 * 1px amber hairline labelled "SCHEMAEXTRACTOR" in mono.
 *   LEFT  — what flows LOCALLY (subject-level concentrations, identifiers,
 *           raw covariate rows, free-text narrative). Items slide in from
 *           the left edge attempting to cross the boundary; they get
 *           masked at the wall.
 *   RIGHT — what reaches the LLM (column names + types, subject count +
 *           dose levels, aggregate statistics, categorical levels).
 *
 * Bottom italic band lives in this slide so its visual weight matches
 * the headline — "Non-compliance is not disallowed. It is structurally
 * impossible."
 *
 * IP firewall (NOT on this slide): allow-list rules, Pydantic schemas,
 * validation code.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function CS4Privacy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.1}>Case 04 · Privacy by architecture</Eyebrow>

      <Headline delay={0.25} maxChars={86}>
        Patient data{' '}
        <span style={{ color: 'var(--amber)' }}>physically cannot reach</span>{' '}
        the LLM. The boundary is structural, not contractual.
      </Headline>

      <Subhead delay={0.55} size="lead" maxChars={106}>
        SchemaExtractor is the single allow-listed surface between the dataset
        and the reasoning context. Everything else stays local — by construction.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
            paddingTop: 'var(--space-2)',
            minHeight: 0,
          }}
        >
          {/* The wall + the two columns. Wrapped in ZoomablePanel so a
              skeptical regulator can probe the boundary at full screen. */}
          <div style={{ flex: '1 1 auto', minHeight: 0 }}>
            <ZoomablePanel
              title="SchemaExtractor — privacy boundary"
              right={<span className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', letterSpacing: '0.12em' }}>structural</span>}
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
              <PatientRowGlyphs go={go} delay={0.7} />
            </ZoomablePanel>
          </div>

          {/* Bottom italic boundary tagline */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4, ease: EASE }}
            style={{
              padding:
                'clamp(var(--space-3), 1.6vh, var(--space-5)) clamp(var(--space-4), 2.2vw, var(--space-7))',
              borderTop: '1px solid color-mix(in srgb, var(--amber) 60%, transparent)',
              borderBottom: '1px solid color-mix(in srgb, var(--amber) 60%, transparent)',
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--amber) 8%, transparent), color-mix(in srgb, var(--panel) 60%, transparent))',
            }}
          >
            <p
              className="deck-display italic"
              style={{
                margin: 0,
                color: 'var(--cream)',
                fontSize: 'clamp(1.05rem, min(1.45vw, 2.3vh), 1.6rem)',
                lineHeight: 1.4,
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              Non-compliance is not disallowed.{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
                It is structurally impossible.
              </span>
            </p>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CASE 04 · AI/ML · PHARMAGENT"
        tagline="Architecture as the privacy primitive — not policy, not contract."
        delay={2.9}
      />

      <TracingBeam progress={cs4Progress(8)} go={!reduce} />
    </SlideGrid>
  );
}
