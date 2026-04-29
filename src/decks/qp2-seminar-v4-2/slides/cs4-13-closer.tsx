// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz } from '@/components/deck/SlideParts';
import CloserConstellation from '../components/cs4/CloserConstellation';
import AiBrainAmbient from '../components/cs4/AiBrainAmbient';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · S13 · Where This Lands — closer.
 *
 * Three vertical blocks, 400ms stagger:
 *   1. OWNERSHIP (italic) — PharmAgent is my own architecture; design
 *      decisions are mine; personal research, IP-clean.
 *   2. PUBLICATION (amber-bordered card to draw the eye) — Manuscript
 *      in preparation, target CPT:PSP. Working title named.
 *   3. SYNTHESIS (Fraunces Display, slightly larger — slide's loudest
 *      type) — the Senior Director QP role IS this synthesis.
 *
 * TracingBeam progress reaches 1.0 here — the beam completes drawing
 * across the full right edge as Block 3 lands.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function CS4Closer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.1}>Case 04 · Where this lands</Eyebrow>

      <Headline delay={0.25} maxChars={92}>
        The architecture is published. The judgment is the contribution.{' '}
        <span style={{ color: 'var(--amber)' }}>The synthesis is the role.</span>
      </Headline>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 'clamp(var(--space-3), 1.6vh, var(--space-5))',
            paddingTop: 'var(--space-2)',
            minHeight: 0,
            overflow: 'visible',
          }}
        >
          {/* BLOCK 1 — OWNERSHIP */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="deck-display italic"
            style={{
              margin: 0,
              color: 'var(--cream)',
              fontSize: 'clamp(1rem, min(1.35vw, 2.2vh), 1.55rem)',
              lineHeight: 1.45,
              fontWeight: 500,
              maxWidth: '88ch',
            }}
          >
            PharmAgent is my own architecture. The design decisions —{' '}
            <span style={{ color: 'var(--amber)', fontStyle: 'normal', fontWeight: 600 }}>
              three-level hierarchy, typed shared state, schema-only privacy,
              hash-chain audit
            </span>{' '}
            — are mine. Personal research, on my own time, IP-clean.
          </motion.p>

          {/* BLOCK 2 — PUBLICATION (amber-bordered card) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
              padding:
                'clamp(var(--space-3), 1.8vh, var(--space-5)) clamp(var(--space-4), 2.2vw, var(--space-7))',
              background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--amber) 60%, transparent)',
              borderLeft: '4px solid var(--amber)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 8px 28px color-mix(in srgb, var(--amber) 14%, transparent)',
              maxWidth: '88ch',
            }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'clamp(0.62rem, min(0.78vw, 1.25vh), 0.8rem)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--amber)',
                fontWeight: 800,
              }}
            >
              Publication
            </span>
            <span
              className="deck-display"
              style={{
                color: 'var(--cream)',
                fontSize: 'clamp(1rem, min(1.35vw, 2.15vh), 1.55rem)',
                fontWeight: 600,
                lineHeight: 1.32,
              }}
            >
              Manuscript in preparation · target{' '}
              <em>CPT: Pharmacometrics &amp; Systems Pharmacology</em>.
            </span>
            <span
              className="deck-body"
              style={{
                color: 'var(--cream-muted)',
                fontSize: 'clamp(0.78rem, min(1vw, 1.6vh), 1.05rem)',
                lineHeight: 1.4,
              }}
            >
              Working title: &ldquo;A Multi-Agent Architecture for End-to-End
              Model-Informed Drug Development.&rdquo;
            </span>
          </motion.div>

          {/* CloserConstellation — three editorial mark glyphs
              (manuscript · SOP · regulatory pilot) sit between Block 2
              and Block 3 as a quiet visual receipt for the commitments
              the speech is about to make. Height capped so Block 3
              (synthesis) reliably fits inside the viz cell. */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.3, ease: EASE }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '88ch',
              height: 'clamp(72px, 9vh, 110px)',
              padding: '0',
              flexShrink: 0,
            }}
          >
            <CloserConstellation go={go} delay={1.4} />
          </motion.div>

          {/* BLOCK 3 — SYNTHESIS (loudest type, capped so the trailing
              "That's the work I want to do next." italic clause never
              clips). */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: EASE }}
            className="deck-display"
            style={{
              margin: 0,
              color: 'var(--cream)',
              fontSize: 'clamp(1.05rem, min(1.45vw, 2.3vh), 1.6rem)',
              lineHeight: 1.32,
              fontWeight: 500,
              maxWidth: '78ch',
            }}
          >
            The{' '}
            <span style={{ color: 'var(--amber)', fontWeight: 700 }}>
              Senior Director QP role
            </span>{' '}
            I'm interviewing for is exactly this synthesis — regulatory rigor,
            methodological forward-thinking, and the judgment to know which AI
            architecture fits which problem.{' '}
            <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>
              That's the work I want to do next.
            </span>
          </motion.p>
        </div>
      </Viz>

      {/* Footer intentionally omitted on cs4-13 — Decision 2 from the
          enhancement pass: the closer is mood-pure, not chrome-bordered.
          A faint AiBrainAmbient watermark provides the bottom-edge
          visual anchor instead. */}
      <AiBrainAmbient variant="closure" position="bottom-right" delay={1.6} />

      <TracingBeam progress={cs4Progress(12)} go={!reduce} />
    </SlideGrid>
  );
}
