// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { PanelBody, Row, Hi, EASE } from './_parts';

/**
 * CS1 · 11 — Beat 9: learning, transfer, and the seam into Ivosidenib India.
 *
 * Merges the old cs1-lesson + cs1-bridge. At 70 s the two were a slide each,
 * which spent 30 s of the case on a slide that only pointed forward.
 *
 * Reading order: what worked → what I'd do differently → what transfers
 * (left to right), then the bridge ribbon spanning the bottom. The ribbon is
 * last and lowest because it is the hand-off out of the case.
 *
 * The bridge text is the seam wording from
 * Xencor/story-flows/01-CS1-Ambrisentan-Story-Flow.md § Transition out —
 * keep them identical so the flow file and the deck cannot drift.
 *
 * Density target: 4 viz elements · ~60 words · 1 claim
 * · 70 s ÷ 4 = 17 s/element → OK.
 */

function Lesson({ kicker, tone, children, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: `4px solid ${tone}`,
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 62%, transparent)',
        padding: 'clamp(var(--space-3), 1.5vw, var(--space-4))',
        minWidth: 0,
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: tone,
          fontWeight: 700,
        }}
      >
        {kicker}
      </div>
      <PanelBody>{children}</PanelBody>
    </motion.div>
  );
}

export default function Cs1LessonBridge() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.15}>Case 01 · Lesson + bridge</Eyebrow>

      <Headline delay={0.3} maxChars={64}>
        When the trial cannot answer,{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          make the exposure target the decision language.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={104}>
        The method was specific to this program. The move — reframing an unanswerable question into an
        answerable one — is not.
      </Subhead>

      <Viz>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            minHeight: 0,
            justifyContent: 'center',
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Row min="15rem">
            <Lesson kicker="What worked" tone="var(--case)" delay={0.85} reduced={reduced}>
              Making the exposure target the shared language. Clinical, regulatory and biometrics could all
              argue about one number instead of about three different mental models.
            </Lesson>
            <Lesson kicker="What I'd do differently" tone="var(--amber)" delay={1.0} reduced={reduced}>
              Pre-specify what would falsify the bridge, earlier and in writing, with biometrics — so the
              disease-similarity assumption is on the record before the data arrive, not after.
            </Lesson>
            <Lesson kicker="What transfers" tone="var(--sage)" delay={1.15} reduced={reduced}>
              Define the evidence threshold for the next action when a clean experiment is unavailable —
              the shape of a step-up, schedule, or expansion-cohort decision.
            </Lesson>
          </Row>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 1.55, ease: EASE }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
              borderRadius: 'var(--radius-md)',
              minWidth: 0,
            }}
          >
            <div
              aria-hidden
              style={{
                transform: 'rotate(45deg)',
                width: 12,
                height: 12,
                background: 'var(--amber)',
                flexShrink: 0,
                marginTop: '0.35em',
              }}
            />
            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                lineHeight: 1.5,
                color: 'var(--cream)',
                opacity: 0.86,
                minWidth: 0,
              }}
            >
              This case bridged <Hi color="var(--case)">within</Hi> a shared evidence base — same drug,
              adjacent population, the anchor visible to the regulator.{' '}
              <motion.span
                initial={reduced ? false : { color: 'var(--cream)' }}
                animate={{ color: 'var(--amber)' }}
                transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 2.35 }}
                style={{ fontWeight: 600 }}
              >
                Next: a drug approved in forty-two countries, with no local anchor at all.
              </motion.span>
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.1}
        kicker="11 · CS1 · LESSON + BRIDGE"
        tagline="Resolve the case, then say why the next one is necessary."
        source="Transfer framing is a principle, not a claim of modality equivalence"
      />
    </SlideGrid>
  );
}
