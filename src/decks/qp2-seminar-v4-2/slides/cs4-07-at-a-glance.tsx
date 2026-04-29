// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import IntegerTicker from '@/components/deck/patterns/IntegerTicker';
import AiBrain from '../components/AiBrain';
import { CS4_LANDSCAPE_SYSTEMS, STAGE_LABELS } from '../components/cs4/LandscapeSlices';
import AgentConstellation from '../components/cs4/AgentConstellation';
import WorkflowStageBand from '../components/cs4/WorkflowStageBand';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · S7 · PharmAgent at a Glance — THE REVEAL.
 *
 * Cinematic moment 1, from the spec:
 *   1. Render thumbnail-shrunk replicas of the S5 five cards docked
 *      along the top edge first (small, cream-faint).
 *   2. THEN three giant numerals tick up below them — 13 agents · 151
 *      tools · 76 templates.
 *   3. THEN a 7-segment horizontal coverage bar fills left-to-right,
 *      ALL segments amber. The visual claim is the contrast between
 *      slices and substrate.
 *
 * The AiBrain illustration uses layoutId="cs4-ai-cortex" — same id as
 * the divider hero. As the user advances S6 → S7, the brain shrinks
 * from hero scale into the small centered glyph: the primitive becomes
 * a system.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const NUMERALS = [
  { n: 13,  label: 'specialized agents' },
  { n: 151, label: 'deterministic tools' },
  { n: 76,  label: 'workflow templates' },
];

const BOTTOM_LINES = [
  'End-to-end coverage of MIDD.',
  'Privacy by architecture.',
  'Audit by cryptographic chain.',
];

export default function CS4AtAGlance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.1}>Case 04 · At a glance</Eyebrow>

      <Headline delay={0.25} maxChars={88}>
        PharmAgent —{' '}
        <span style={{ color: 'var(--amber)' }}>13 specialized agents</span>,{' '}
        <span style={{ color: 'var(--amber)' }}>151 deterministic tools</span>,{' '}
        <span style={{ color: 'var(--amber)' }}>76 review-gated workflow templates</span>.
      </Headline>

      <Viz>
        <div
          ref={ref}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-4), 2.4vh, var(--space-6))',
            paddingTop: 'var(--space-3)',
            minHeight: 0,
          }}
        >
          {/* Step 1: docked thumbnails of the S5 five cards */}
          <DockedThumbnails go={go} delay={0.6} />

          {/* Centered ambient brain glyph behind the numerals — the morph
              destination from the divider's hero scale. zIndex:-1 so the
              constellation + numerals paint cleanly over it (CSS painting
              order otherwise puts absolutely-positioned siblings ON TOP
              of static-positioned ones, which had been hiding the viz). */}
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.07,
              pointerEvents: 'none',
              filter: 'blur(1.2px)',
              zIndex: -1,
            }}
          >
            <AiBrain layoutId="cs4-ai-cortex" variant="hero" />
          </div>

          {/* Step 2: side-by-side numerals + AgentConstellation reveal.
              The constellation animates 13 dots in one-at-a-time as the
              IntegerTicker on "13" runs up; after all 13 land they
              connect into the brain silhouette echoing AiBrain. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
              gap: 'clamp(var(--space-4), 3vw, var(--space-7))',
              alignItems: 'center',
              flex: '1 1 auto',
              minHeight: 0,
            }}
          >
            {/* LEFT — constellation. Explicit min/max height because the
                SVG is width:100% height:100% and a flex parent without a
                stated height collapses it to ~0 vertically. */}
            <div
              style={{
                width: '100%',
                height: '100%',
                minHeight: 'clamp(220px, 32vh, 360px)',
                maxHeight: 'clamp(260px, 38vh, 420px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AgentConstellation go={go} delay={1.45} />
            </div>

            {/* RIGHT — three giant numerals stacked */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
              }}
            >
              {NUMERALS.map((nm, i) => (
                <div
                  key={nm.label}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'var(--space-3)',
                  }}
                >
                  <span
                    className="deck-mono"
                    style={{
                      fontSize: 'clamp(2.6rem, min(5.5vw, 9vh), 6rem)',
                      fontWeight: 800,
                      color: 'var(--amber)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.02em',
                      fontVariantNumeric: 'tabular-nums',
                      textShadow: '0 4px 24px color-mix(in srgb, var(--amber) 22%, transparent)',
                    }}
                  >
                    <IntegerTicker from={0} to={nm.n} duration={1.2} delay={1.45 + i * 0.15} go={go} />
                  </span>
                  <span
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'clamp(0.62rem, min(0.8vw, 1.3vh), 0.85rem)',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: 'var(--cream-muted)',
                      fontWeight: 700,
                    }}
                  >
                    {nm.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 3: shared WorkflowStageBand with all 7 segments filled —
              visual contrast vs S5 (where the same primitive carried only
              slices, never the full pipeline). */}
          <WorkflowStageBand
            label="PharmAgent"
            coverage={[true, true, true, true, true, true, true]}
            go={go}
            delay={2.6}
          />

          {/* Bottom three-line stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.4, ease: EASE }}
            style={{
              marginTop: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {BOTTOM_LINES.map((line) => (
              <span
                key={line}
                className="deck-display"
                style={{
                  fontSize: 'clamp(0.95rem, min(1.25vw, 2vh), 1.4rem)',
                  color: 'var(--cream)',
                  lineHeight: 1.45,
                  fontWeight: 500,
                }}
              >
                {line}
              </span>
            ))}
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CASE 04 · AI/ML · PHARMAGENT"
        tagline="The substrate the field has been waiting for. Built personally."
        delay={3.7}
      />

      <TracingBeam progress={cs4Progress(6)} go={!reduce} />
    </SlideGrid>
  );
}

/* ─── Docked thumbnail row — references the S5 cards by name and shows
   their tiny coverage bar so the comparison is obvious. */
function DockedThumbnails({ go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'center',
        gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
        padding: 'var(--space-2) clamp(var(--space-3), 1.6vw, var(--space-4))',
        background: 'color-mix(in srgb, var(--cream-faint) 6%, transparent)',
        border: '1px dashed color-mix(in srgb, var(--cream-faint) 35%, transparent)',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.55rem, min(0.7vw, 1.15vh), 0.72rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          fontWeight: 700,
        }}
      >
        Slice (S5)
      </span>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${CS4_LANDSCAPE_SYSTEMS.length}, minmax(0, 1fr))`,
          gap: 'var(--space-2)',
        }}
      >
        {CS4_LANDSCAPE_SYSTEMS.map((s) => (
          <div
            key={s.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <span
              className="deck-mono"
              style={{
                fontSize: 'clamp(0.55rem, min(0.7vw, 1.15vh), 0.72rem)',
                color: 'var(--cream-muted)',
                letterSpacing: 'var(--ls-mono)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {s.name}
            </span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${STAGE_LABELS.length}, 1fr)`,
                gap: 1,
              }}
            >
              {s.cover.map((on, si) => (
                <span
                  key={si}
                  style={{
                    height: 4,
                    background: on
                      ? 'color-mix(in srgb, var(--amber) 65%, transparent)'
                      : 'color-mix(in srgb, var(--cream-faint) 35%, transparent)',
                    borderRadius: 1,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* FullCoverageBar removed — replaced by the shared WorkflowStageBand
   in `mode="filled"` so S5 and S7 read the same visual primitive. */
