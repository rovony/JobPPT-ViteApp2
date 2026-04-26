// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 06 — The Clin Pharm question.
 *
 * Hero question + constraint subtitle + story card (left column) +
 * milestone evidence panel (right column).
 *
 * The right-column panel ("The whole story") compresses the 3
 * disruptions the story card describes into a single bordered
 * timeline — coral obstacle dots → amber APPROVED dot, vertical line
 * connecting them — so the audience reads "obstacles, obstacles,
 * obstacles, then approval" at a glance. Reinforces the case's core
 * promise: "a defensible pediatric dose came out anyway."
 *
 * Each milestone row carries: dot + LABEL · when + 1-line detail.
 * Together they pre-empt the foreseeable Q&A probes (when, what,
 * who) so panelists don't surface them in cold-open.
 *
 * Lung fills the right half at 16% opacity as ambient anatomical
 * anchor; the evidence panel sits on top (z-index 1). Lung is part
 * of the cs1-lung layoutId morph chain:
 *   05 cs1-divider (hero centered) → 06 here (right-half ambient)
 *     → 07 cs1-context (large center foundation).
 *
 * Reveal cadence: question → subtitle → story card → panel fade-in
 * (0.65s) → vertical timeline scales (0.85s) → 4 milestone rows
 * stagger in (1.05s + 0.18s × i) → final amber row scale-pops.
 */

const EASE = [0.2, 0.7, 0.3, 1];

// Story-path milestones — 3 coral disruptions + 1 amber destination.
// Order is chronological top → bottom inside the evidence panel.
// Sources: cs1-outcome / amd1.md / additionstoBackups.md.
const PATH_NODES = [
  { tone: 'case',  label: 'HELD',         detail: 'Juvenile rat brain-weight finding', when: 'Aug 2017' },
  { tone: 'case',  label: 'REFRAMED',     detail: 'STARTS-2 mortality signal',          when: '2017' },
  { tone: 'case',  label: 'CONSTRAINED',  detail: 'Split commercial rights',            when: 'GSK · Servier' },
  { tone: 'amber', label: 'APPROVED',     detail: 'EMA + PMDA · pediatric PAH',         when: '2021' },
];

/**
 * StoryPath — vertical milestone evidence panel ("The whole story").
 *
 * v2 redesign (2026-04-26 user pass) — replaces the broken floating-
 * cards SVG-zigzag pattern. Now uses the v2 deck's evidence-panel
 * convention (cs1-challenge): single bordered container with stacked
 * milestone rows, dot-on-line vertical timeline, hairline dividers
 * between rows, amber-tinted destination row.
 *
 * Each row carries everything needed to pre-empt the obvious probe:
 *   ● LABEL · when · 1-line detail
 * Reading direction is top → bottom (chronological). Vertical line
 * connects all dots; transitions to amber at the destination so the
 * eye reads "obstacles, obstacles, obstacles, then approval."
 *
 * Animation:
 *   t=0.65s  · panel fades in + slight y-lift
 *   t=0.85s  · vertical timeline scales from top
 *   t=1.05s+ · each milestone row fades in left-to-right (stagger 0.18s)
 *   t=2.15s  · final amber row scale-pops overshoot
 */
function StoryPath({ reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduced ? 0 : 0.65, duration: 0.55, ease: EASE }}
      style={{
        width: '100%',
        maxWidth: '24rem',
        marginLeft: 'auto',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--panel) 72%, transparent)',
        backdropFilter: 'blur(2px)',
        padding: 'clamp(var(--space-3), 1.4vw, var(--space-4)) clamp(var(--space-3), 1.6vw, var(--space-5))',
        position: 'relative',
      }}
    >
      {/* Panel eyebrow */}
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          fontWeight: 600,
          marginBottom: 'var(--space-3)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        <span aria-hidden style={{
          width: 'clamp(20px, 3vw, 32px)',
          height: 1,
          background: 'var(--cream-hairline)',
        }} />
        The whole story
      </div>

      {/* Rows container — vertical timeline behind, rows on top */}
      <div style={{ position: 'relative' }}>
        {/* Vertical timeline line — coral 0–75%, amber at bottom 25% */}
        <motion.div
          aria-hidden
          initial={reduced ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: reduced ? 0 : 0.85, duration: 1.2, ease: EASE }}
          style={{
            position: 'absolute',
            left: 5,
            top: 8,
            bottom: 8,
            width: 2,
            borderRadius: 1,
            background: 'linear-gradient(180deg, var(--case) 0%, var(--case) 70%, var(--amber) 100%)',
            opacity: 0.5,
            transformOrigin: 'top center',
          }}
        />

        {PATH_NODES.map((node, i) => {
          const isLast = i === PATH_NODES.length - 1;
          const isAmber = node.tone === 'amber';
          const accent = isAmber ? 'var(--amber)' : 'var(--case)';

          return (
            <motion.div
              key={node.label}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: reduced ? 0 : 1.05 + i * 0.18,
                duration: isAmber ? 0.6 : 0.5,
                ease: isAmber ? [0.34, 1.56, 0.64, 1] : EASE,
              }}
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                paddingTop: i === 0 ? 0 : 'var(--space-3)',
                paddingBottom: isLast ? 0 : 'var(--space-3)',
                borderBottom: isLast ? 'none' : '1px solid color-mix(in srgb, var(--cream-hairline) 60%, transparent)',
                position: 'relative',
                background: isAmber
                  ? 'color-mix(in srgb, var(--amber) 7%, transparent)'
                  : 'transparent',
                marginLeft: isAmber ? -8 : 0,
                marginRight: isAmber ? -8 : 0,
                paddingLeft: isAmber ? 'var(--space-2)' : 0,
                paddingRight: isAmber ? 'var(--space-2)' : 0,
                borderRadius: isAmber ? 'var(--radius-sm)' : 0,
              }}
            >
              {/* Dot on the timeline */}
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 2,
                  marginTop: '0.35em',
                  marginLeft: isAmber ? 8 : 0,
                  width: isAmber ? 14 : 10,
                  height: isAmber ? 14 : 10,
                  borderRadius: '50%',
                  background: accent,
                  boxShadow: isAmber
                    ? `0 0 0 3px color-mix(in srgb, ${accent} 24%, transparent), 0 0 14px color-mix(in srgb, ${accent} 38%, transparent)`
                    : `0 0 0 2px color-mix(in srgb, var(--panel) 90%, transparent)`,
                  alignSelf: 'flex-start',
                }}
              />

              {/* Content — label row + detail */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Top row: LABEL · when */}
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 'var(--space-2)',
                  marginBottom: 2,
                }}>
                  <div
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'var(--fs-slide-eyebrow)',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: accent,
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {node.label}
                  </div>
                  <div
                    className="deck-mono"
                    style={{
                      fontSize: 'var(--fs-slide-pageno)',
                      color: 'var(--cream-faint)',
                      fontVariantNumeric: 'tabular-nums',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {node.when}
                  </div>
                </div>
                {/* Detail */}
                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: isAmber ? 'var(--cream)' : 'var(--cream)',
                    opacity: isAmber ? 1 : 0.85,
                    lineHeight: 1.35,
                    fontWeight: isAmber ? 500 : 400,
                  }}
                >
                  {node.detail}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Cs1Question() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* Lung — fills right half as ambient anatomical anchor.
          2026-04-26 user pass — was at right:-6% (bled off-screen).
          Now centered in the right 50% of the slide, full height,
          opacity tuned so the evidence panel sits cleanly on top.
          Part of cs1-lung layoutId morph chain:
            05 cs1-divider (hero)  → 06 here (right-half ambient)
              → 07 cs1-context (large center foundation). */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.16,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <Lungs
          layoutId="cs1-lung"
          variant="context"
          widthOverride="clamp(22rem, 38vw, 34rem)"
        />
      </motion.div>

      <Eyebrow delay={0.2}>
        Case 01 · The question
      </Eyebrow>

      {/* Stage 1 — Hero question (2026-04-26 user pass)
          Earlier wording "If you can't run the pediatric efficacy trial"
          read as a contradiction with the body copy ("the trial you do
          run gets terminated") — readers asked "didn't you run a trial?"
          Fix: name the SPECIFIC kind of trial that wasn't ethical
          (placebo-controlled). The open-label PK/safety trial that was
          run (AMB112529) is a different beast — disambiguated below. */}
      <Headline delay={0.35} maxChars={74}>
        When a placebo-controlled efficacy trial isn&rsquo;t ethical —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          what carries the dose?
        </span>
      </Headline>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          position: 'relative',
          zIndex: 1,
          gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
        }}>
        {/* LEFT — subtitle + story card */}
        <div style={{
          flex: '1 1 min(40rem, 60%)',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(var(--space-6), 5vh, var(--space-10))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
        }}>
          {/* Constraint subtitle — 2026-04-26 user pass.
              Earlier wording "placebo-controlled efficacy trial isn't an
              option — and the trial you do run gets terminated" read as
              a contradiction (no trial / yes trial). After moving the
              ethics premise into the headline, this subtitle now names
              the SECOND, COMPOUNDING constraint: the open-label PK/safety
              trial we did run (AMB112529) terminated at 41 of 66 enrolled
              — so neither path produced a powered efficacy answer. */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.6,
              delay: reduced ? 0 : 0.95,
              ease: EASE,
            }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-lead)',
              lineHeight: 'var(--lh-snug)',
              color: 'var(--cream)',
              opacity: 0.78,
              fontWeight: 400,
              maxWidth: '52ch',
              margin: 0,
            }}
          >
            And the open-label PK/safety trial we did run terminated at
            {' '}<strong style={{ fontWeight: 600, color: 'var(--cream)' }}>41 of 66 enrolled</strong>.
            {' '}The dose has to come from somewhere else.
          </motion.p>

          {/* Story card — the case in one breath */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 1.70,
              ease: EASE,
            }}
            style={{
              maxWidth: '40rem',
              borderLeft: '3px solid var(--case)',
              borderRadius: 2,
              background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
              padding: 'clamp(var(--space-5), 2vw, var(--space-7))',
            }}
          >
            <div
              className="deck-display"
              style={{
                fontSize: 'var(--fs-slide-lead)',
                lineHeight: 1.5,
                color: 'var(--cream)',
                fontWeight: 400,
              }}
            >
              The adult dose came from <strong style={{ fontWeight: 600 }}>380 patients</strong> across 6 placebo-controlled studies — a mature exposure-response.
              <br />
              The pediatric trial — <em style={{ fontStyle: 'italic', opacity: 0.85 }}>open-label, PK-anchored</em> — enrolled <strong style={{ fontWeight: 600 }}>41 of 66 planned</strong>.
              <br />
              Held by a juvenile rat finding. Reframed by a sildenafil mortality signal. Constrained by split commercial rights.
            </div>

            <motion.div
              aria-hidden
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : 1.90,
                ease: EASE,
              }}
              style={{
                width: 'clamp(40px, 5vw, 60px)',
                height: 1,
                background: 'var(--case)',
                opacity: 0.4,
                transformOrigin: 'left',
                margin: 'var(--space-5) 0',
              }}
            />

            <div
              className="deck-display"
              style={{
                fontSize: 'var(--fs-slide-lead)',
                lineHeight: 1.5,
                color: 'var(--cream)',
                fontWeight: 500,
                fontStyle: 'italic',
              }}
            >
              A defensible pediatric dose came out anyway.
              <br />
              This case is how.
            </div>
          </motion.div>
        </div>

        {/* RIGHT — milestone evidence panel ("The whole story") */}
        <div
          className="cs1-q-path"
          style={{
            flex: '0 1 clamp(16rem, 30%, 22rem)',
            minWidth: 0,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          }}
        >
          <StoryPath reduced={reduced} />
        </div>
        </div>

        {/* Mobile fallback — hide path under 720px so the question + card
            never compete for vertical space on phones. The visual is
            auxiliary; the question is the slide's load-bearing element. */}
        <style>{`
          @media (max-width: 720px) {
            .cs1-q-path { display: none !important; }
          }
        `}</style>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.2}
        kicker="06 · CS1 · QUESTION"
        tagline="The decision before the model."
      />
    </SlideGrid>
  );
}
