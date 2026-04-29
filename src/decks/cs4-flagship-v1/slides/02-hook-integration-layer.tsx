// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import AiBrain from '../../qp2-seminar-v3-R2/components/AiBrain';
import TracingBeam from '../components/TracingBeam';
import { EASE_EDITORIAL, EASE_DATA, DUR, SHARED_LAYOUT_IDS } from '../themes';
import { DECK_META } from '../data';

/**
 * S02 · Hook — the workflow layer.
 *
 * Visual: three overlapping circles arranged horizontally. Left =
 * DATA, right = DECISIONS, center = WORKFLOW LAYER (sage-emphasized).
 * The center circle is where the AiBrain from S01's hero illustration
 * physically lands via Framer Motion `layoutId` morph.
 *
 * Editorial register:
 *   • Two non-emphasis circles use cream-faint stroke + no fill
 *   • Center workflow circle uses sage stroke + sage 8% fill + AiBrain
 *   • Reveal order: DATA (1.0s) → DECISIONS (1.4s) → WORKFLOW (2.0s,
 *     with 400ms held breath after) — matches the spoken three-beat
 *   • Punchline footer reveals last (3.0s)
 *
 * Cinematic continuity:
 *   • `layoutId={SHARED_LAYOUT_IDS.aiBrain}` on the center wrapper —
 *     receives the morph from S01's right-column illustration. The
 *     AiBrain physically interpolates from the divider's right column
 *     into the center of this Venn.
 *   • A sage hairline beneath the headline carries
 *     `case-marker-sage` so it morphs into the M15 dial outer arc on S03.
 */

const VIEW_W = 1200;
const VIEW_H = 560;

// Circle geometry (overlapping by ~30% of radius for readable Venn)
const R = 200;
const Y = VIEW_H / 2;
const CX_LEFT = 350;
const CX_CENTER = 600;
const CX_RIGHT = 850;

const CIRCLES = [
  {
    id: 'data',
    cx: CX_LEFT,
    label: 'DATA',
    sub: 'patient files · doses · samples',
    delay: 1.0,
    accent: 'var(--cream-faint)',
    fillAlpha: 0,
  },
  {
    id: 'decisions',
    cx: CX_RIGHT,
    label: 'DECISIONS',
    sub: 'doses · labels · submissions',
    delay: 1.4,
    accent: 'var(--cream-faint)',
    fillAlpha: 0,
  },
  // WORKFLOW center renders separately so the AiBrain morph wrapper
  // can be placed in DOM order on top of both side circles.
];

export default function CS4HookIntegrationLayer() {
  return (
    <SlideGrid dataCase={DECK_META.caseToken} areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 04 · S02 · The integration layer</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        Every clin pharm group has the same{' '}
        <span style={{ color: 'var(--sage)' }}>three layers.</span>
      </Headline>

      {/* Sage hairline — morphs into the outer arc of the M15 dial on S03.
          The morph is partial (HTML <div> ↔ SVG circle.r animates the bbox
          only) but the perceptual story is "the case marker we're holding
          here is now the regulatory frame." */}
      <motion.div
        layoutId={SHARED_LAYOUT_IDS.caseMarker}
        style={{
          gridArea: 'subhead',
          height: 3,
          width: 'clamp(120px, 12vw, 200px)',
          background: 'var(--sage)',
          marginTop: 'var(--space-2)',
          marginBottom: 'var(--space-3)',
          alignSelf: 'start',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: 0.55 }}
      />

      <Subhead delay={0.75} maxChars={84} size="lead">
        The middle one has been broken for twenty years. AI gets to be it —
        if we build it correctly.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: '100%',
              maxWidth: 1100,
              height: 'auto',
              maxHeight: '60vh',
            }}
          >
            {/* Left + right circles render first */}
            {CIRCLES.map((c) => (
              <motion.g key={c.id}>
                <motion.circle
                  cx={c.cx}
                  cy={Y}
                  r={R}
                  fill="transparent"
                  stroke={c.accent}
                  strokeWidth={1.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 1.2, ease: EASE_DATA, delay: c.delay },
                    opacity: { duration: 0.4, ease: EASE_EDITORIAL, delay: c.delay },
                  }}
                />
                <motion.text
                  x={c.cx}
                  y={Y - R - 28}
                  textAnchor="middle"
                  fill="var(--cream)"
                  fontFamily="var(--font-mono)"
                  fontSize={22}
                  fontWeight={700}
                  letterSpacing={3}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DUR.quick, ease: EASE_EDITORIAL, delay: c.delay + 0.5 }}
                >
                  {c.label}
                </motion.text>
                <motion.text
                  x={c.cx}
                  y={Y + R + 36}
                  textAnchor="middle"
                  fill="var(--cream-muted)"
                  fontFamily="var(--font-display)"
                  fontStyle="italic"
                  fontSize={16}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: DUR.quick, ease: EASE_EDITORIAL, delay: c.delay + 0.7 }}
                >
                  {c.sub}
                </motion.text>
              </motion.g>
            ))}

            {/* Center WORKFLOW circle — sage emphasis */}
            <motion.g>
              <motion.circle
                cx={CX_CENTER}
                cy={Y}
                r={R}
                fill="color-mix(in srgb, var(--sage) 8%, transparent)"
                stroke="var(--sage)"
                strokeWidth={2}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 1.4, ease: EASE_DATA, delay: 2.0 },
                  opacity: { duration: 0.5, ease: EASE_EDITORIAL, delay: 2.0 },
                }}
              />
              <motion.text
                x={CX_CENTER}
                y={Y - R - 28}
                textAnchor="middle"
                fill="var(--sage)"
                fontFamily="var(--font-mono)"
                fontSize={24}
                fontWeight={800}
                letterSpacing={3}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.quick, ease: EASE_EDITORIAL, delay: 2.6 }}
              >
                WORKFLOW LAYER
              </motion.text>
              <motion.text
                x={CX_CENTER}
                y={Y + R + 36}
                textAnchor="middle"
                fill="var(--sage)"
                fontFamily="var(--font-display)"
                fontSize={17}
                fontWeight={500}
                fontStyle="italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DUR.quick, ease: EASE_EDITORIAL, delay: 2.8 }}
              >
                where decisions earn their data
              </motion.text>
            </motion.g>
          </svg>

          {/* AiBrain morph destination — placed in DOM AFTER the SVG so
              it sits on top of the center circle. Its layoutId picks up
              the morphing brain from S01's hero illustration. */}
          <motion.div
            layoutId={SHARED_LAYOUT_IDS.aiBrain}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(180px, 22vw, 280px)',
              height: 'clamp(180px, 22vw, 280px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <AiBrain layoutId="cs4-ai-brain-inner" variant="hero" />
          </motion.div>

          {/* Punchline rule — small editorial footnote beneath the diagram */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.quick, ease: EASE_EDITORIAL, delay: 3.4 }}
            style={{
              marginTop: 'var(--space-4)',
              padding: 'var(--space-3) var(--space-5)',
              borderLeft: '3px solid var(--sage)',
              maxWidth: '72ch',
            }}
          >
            <p
              className="deck-display"
              style={{
                margin: 0,
                fontSize: 'var(--fs-slide-tagline)',
                color: 'var(--cream)',
                fontStyle: 'italic',
                fontWeight: 500,
                lineHeight: 'var(--lh-snug)',
              }}
            >
              Most published agentic systems become a{' '}
              <span style={{ color: 'var(--sage)', fontStyle: 'normal', fontWeight: 700 }}>
                fourth circle
              </span>{' '}
              that touches none of the other three.
            </p>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Hook · the workflow layer"
        tagline={DECK_META.source}
        delay={3.8}
      />

      <TracingBeam segment={2} totalSegments={DECK_META.totalSlides} />
    </SlideGrid>
  );
}
