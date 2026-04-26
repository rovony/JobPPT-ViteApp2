// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 06 — The Clin Pharm question.
 *
 * Hero question + constraint subtitle + story card (left column) +
 * obstacle-path visual (right column).
 *
 * The path visual ("The whole story") makes the 3 disruptions the
 * story card describes legible at a glance — three coral obstacle
 * nodes connected by a wiggling dashed road, terminating in an
 * amber APPROVED node. Audience reads left (question + prose) → right
 * (the journey through obstacles → destination). Reinforces the case's
 * core promise: "a defensible pediatric dose came out anyway."
 *
 * Reveal cadence: question → subtitle → story card → path label →
 * road draws → 4 nodes stagger in (coral → coral → coral → amber).
 * Lung remains at 12% opacity behind everything as case-color anchor
 * (also part of cs1-lung layoutId chain: divider → here → context).
 */

const EASE = [0.2, 0.7, 0.3, 1];

// Obstacle-path nodes — 3 coral disruptions + 1 amber destination.
// Y values are percentages down the SVG viewBox; bias is which side
// of the centerline the node card anchors to (alternating gives the
// "wiggle road" feel). Source: cs1-outcome / amd1.md inputs.
const PATH_NODES = [
  { y: 14, bias: 'left',  tone: 'case',  label: 'HELD',         detail: 'Juvenile rat brain-weight finding', when: 'Aug 2017' },
  { y: 38, bias: 'right', tone: 'case',  label: 'REFRAMED',     detail: 'STARTS-2 mortality signal',          when: '2017' },
  { y: 62, bias: 'left',  tone: 'case',  label: 'CONSTRAINED',  detail: 'Split commercial rights',            when: 'GSK · Servier' },
  { y: 88, bias: 'right', tone: 'amber', label: 'APPROVED',     detail: 'EMA + PMDA · pediatric PAH',         when: '2021' },
];

/**
 * StoryPath — vertical obstacle-path visual.
 *
 * SVG zigzag road (dashed coral) connects 4 waypoints. Each waypoint
 * has a small block card with eyebrow label + 1-line detail + when.
 * Final node renders amber to signal the destination (approval).
 *
 * Geometry: 100×100 viewBox, preserveAspectRatio='none' so the path
 * stretches to fill its container at any aspect. Node y-positions
 * match PATH_NODES[].y. Card cards are absolutely positioned with
 * alternating left/right bias to reinforce the "wiggle" feel.
 *
 * Animation:
 *   - 0.6s · label fades in
 *   - 0.8s · path strokes left-to-right via pathLength 0→1 over 1.6s
 *   - 1.0s+i*0.30 · each node fades + slides in from its bias side
 *   - final amber node gets a small scale-pop overshoot
 */
function StoryPath({ reduced }) {
  return (
    <>
      {/* Eyebrow label — top of the path */}
      <motion.div
        className="deck-mono uppercase"
        initial={reduced ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.65, duration: 0.5, ease: EASE }}
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          fontWeight: 600,
          marginBottom: 'clamp(var(--space-2), 1vh, var(--space-3))',
        }}
      >
        ─── The whole story
      </motion.div>

      {/* Path container — SVG fills, nodes overlay */}
      <div style={{
        flex: 1,
        minHeight: 0,
        position: 'relative',
        width: '100%',
      }}>
        {/* Wiggle road — SVG path stretched to container */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
        >
          <motion.path
            d="M 50 8 Q 18 22, 50 38 Q 82 54, 50 62 Q 18 80, 50 92"
            stroke="var(--case)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="1.6 1.4"
            strokeLinecap="round"
            opacity={0.45}
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: reduced ? 0 : 0.85, duration: 1.6, ease: EASE }}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Node cards — absolute positioned */}
        {PATH_NODES.map((node, i) => {
          const isAmber = node.tone === 'amber';
          const accent = isAmber ? 'var(--amber)' : 'var(--case)';
          const bg = isAmber
            ? 'color-mix(in srgb, var(--amber) 10%, transparent)'
            : 'color-mix(in srgb, var(--panel) 65%, transparent)';
          const border = isAmber
            ? '1px solid color-mix(in srgb, var(--amber) 36%, transparent)'
            : '1px solid var(--cream-hairline)';
          const dx = node.bias === 'left' ? -8 : 8;

          return (
            <motion.div
              key={node.label}
              initial={reduced ? false : { opacity: 0, x: dx }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: reduced ? 0 : 1.0 + i * 0.30,
                duration: isAmber ? 0.6 : 0.5,
                ease: isAmber ? [0.34, 1.56, 0.64, 1] : EASE,
              }}
              style={{
                position: 'absolute',
                top: `${node.y}%`,
                ...(node.bias === 'left'
                  ? { left: 0, right: '38%' }
                  : { right: 0, left: '38%' }),
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                flexDirection: node.bias === 'left' ? 'row' : 'row-reverse',
              }}
            >
              {/* Dot */}
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  width: isAmber ? 12 : 9,
                  height: isAmber ? 12 : 9,
                  borderRadius: '50%',
                  background: accent,
                  boxShadow: isAmber
                    ? '0 0 0 3px color-mix(in srgb, var(--amber) 22%, transparent)'
                    : 'none',
                }}
              />
              {/* Block card */}
              <div
                style={{
                  border,
                  borderLeft: node.bias === 'left' ? `2px solid ${accent}` : undefined,
                  borderRight: node.bias === 'right' ? `2px solid ${accent}` : undefined,
                  background: bg,
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--space-2) var(--space-3)',
                  minWidth: 0,
                  textAlign: node.bias === 'left' ? 'left' : 'right',
                }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: accent,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {node.label}
                </div>
                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream)',
                    opacity: 0.88,
                    lineHeight: 1.3,
                    marginTop: 2,
                  }}
                >
                  {node.detail}
                </div>
                <div
                  className="deck-mono"
                  style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    color: 'var(--cream-faint)',
                    fontVariantNumeric: 'tabular-nums',
                    marginTop: 2,
                  }}
                >
                  {node.when}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

export default function Cs1Question() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* Lung — ambient right, 12% opacity */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-6%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(22rem, 40vw, 32rem)',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lungs
          layoutId="cs1-lung"
          variant="context"
          widthOverride="clamp(22rem, 40vw, 32rem)"
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

        {/* RIGHT — obstacle-path visual ("The whole story") */}
        <div
          className="cs1-q-path"
          style={{
            flex: '1 1 clamp(13rem, 26%, 17rem)',
            minWidth: 0,
            minHeight: 'clamp(20rem, 56vh, 32rem)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
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
