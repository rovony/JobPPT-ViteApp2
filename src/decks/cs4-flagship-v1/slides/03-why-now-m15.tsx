// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import TracingBeam from '../components/TracingBeam';
import { EASE_EDITORIAL, EASE_DATA, DUR, SHARED_LAYOUT_IDS } from '../themes';
import { DECK_META, M15_PILLARS } from '../data';

/**
 * S03 · Why now — ICH M15 · 6-pillar dial.
 *
 * Visual: a centered circular "dial" with six wedges arranged at 60°.
 * Each wedge represents one ICH M15 pillar; the AI / ML wedge is sage-
 * emphasized and carries `layoutId={SHARED_LAYOUT_IDS.m15Anchor}` so it
 * morphs into the L0 supervisor anchor on S05.
 *
 * Editorial register:
 *   • Outer ring + spokes drawn as 1px sage (Antigravity hairline-axis pattern)
 *   • Five non-emphasis wedges: cream-faint stroke, transparent fill
 *   • AI/ML wedge: sage stroke, sage 12% fill — single accent
 *   • Center reads "ICH M15 · MIDD" with mono Step 4 + adoption dates
 *   • Sequential reveal — one pillar per spoken beat, ~250ms stagger
 *
 * Cinematic continuity:
 *   • Sage hairline (case-marker) persists from S02 in the same subhead
 *     position — the "invisible anchor" pattern (Antigravity §5). The
 *     morph between S02 and S03 is therefore zero-visual-jump on the
 *     hairline; the dial reveals on TOP of the persistent rail.
 *   • The AI/ML wedge tile is the source for S03 → S05 supervisor morph.
 */

const VIEW = 720;
const CENTER = VIEW / 2;
const R_OUTER = 280;
const R_INNER = 130;

// Compute SVG path for a wedge (donut segment) between two angles.
// Angles in degrees, 0° = top (12 o'clock), clockwise positive.
function wedgePath(startDeg: number, endDeg: number, rOuter = R_OUTER, rInner = R_INNER) {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const x1 = CENTER + rOuter * Math.cos(toRad(startDeg));
  const y1 = CENTER + rOuter * Math.sin(toRad(startDeg));
  const x2 = CENTER + rOuter * Math.cos(toRad(endDeg));
  const y2 = CENTER + rOuter * Math.sin(toRad(endDeg));
  const x3 = CENTER + rInner * Math.cos(toRad(endDeg));
  const y3 = CENTER + rInner * Math.sin(toRad(endDeg));
  const x4 = CENTER + rInner * Math.cos(toRad(startDeg));
  const y4 = CENTER + rInner * Math.sin(toRad(startDeg));
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${x1} ${y1}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4}`,
    'Z',
  ].join(' ');
}

// Compute the (x,y) for a wedge label at the wedge's mid-angle, at a
// given radius from the center.
function labelPos(midDeg: number, radius: number) {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(toRad(midDeg)),
    y: CENTER + radius * Math.sin(toRad(midDeg)),
  };
}

const WEDGE_DEG = 360 / M15_PILLARS.length; // 60° per pillar

export default function CS4WhyNowM15() {
  return (
    <SlideGrid dataCase={DECK_META.caseToken} areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 04 · S03 · Why this conversation can happen now</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        ICH M15 — the regulatory frame for{' '}
        <span style={{ color: 'var(--sage)' }}>model-informed evidence.</span>
      </Headline>

      {/* Persistent sage hairline — same layoutId as S02, so it stays
          in place visually as the audience advances. The dial reveals
          on top of this stable rail. */}
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

      <Subhead delay={0.75} maxChars={86} size="lead">
        Step 4 reached 29 Jan 2026 · CHMP adopted March 2026 · the first
        global write-down of what good MIDD practice looks like — including AI / ML.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: '100%',
              maxWidth: 580,
              height: 'auto',
              maxHeight: '60vh',
            }}
          >
            {/* Outer reference ring — drawn first, fastest */}
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={R_OUTER}
              fill="transparent"
              stroke="color-mix(in srgb, var(--sage) 30%, transparent)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.4, ease: EASE_DATA, delay: 1.0 },
                opacity: { duration: 0.4, ease: EASE_EDITORIAL, delay: 1.0 },
              }}
            />
            {/* Inner reference ring */}
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={R_INNER}
              fill="transparent"
              stroke="color-mix(in srgb, var(--sage) 25%, transparent)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.0, ease: EASE_DATA, delay: 1.0 },
                opacity: { duration: 0.4, ease: EASE_EDITORIAL, delay: 1.0 },
              }}
            />

            {/* Six wedges + labels, sequential reveal */}
            {M15_PILLARS.map((pillar, i) => {
              const startDeg = i * WEDGE_DEG - WEDGE_DEG / 2;
              const endDeg = startDeg + WEDGE_DEG;
              const midDeg = i * WEDGE_DEG;
              const labelP = labelPos(midDeg, (R_OUTER + R_INNER) / 2);
              const glyphP = labelPos(midDeg, R_OUTER + 36);
              const captionP = labelPos(midDeg, R_OUTER + 72);
              // Reveal cadence: 60° per beat, 250ms apart, AI/ML gets
              // an extra 200ms breath BEFORE so the spoken word lands.
              const isAi = pillar.id === 'ai-ml';
              const baseDelay = 1.8 + i * 0.30;
              const wedgeDelay = isAi ? baseDelay + 0.20 : baseDelay;

              return (
                <g key={pillar.id}>
                  {/* Wedge fill — sage-emphasis only on AI/ML */}
                  <motion.path
                    d={wedgePath(startDeg, endDeg)}
                    fill={
                      isAi
                        ? 'color-mix(in srgb, var(--sage) 14%, transparent)'
                        : 'transparent'
                    }
                    stroke={isAi ? 'var(--sage)' : 'color-mix(in srgb, var(--cream) 22%, transparent)'}
                    strokeWidth={isAi ? 2 : 1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: DUR.quick, ease: EASE_EDITORIAL, delay: wedgeDelay }}
                    {...(isAi
                      ? {
                          /* AI/ML wedge is the morph source for S05.
                             Wrapping in a motion.path with layoutId tells
                             Framer Motion to interpolate this wedge into
                             whatever element on S05 carries the same
                             layoutId (the supervisor node anchor). */
                          layoutId: SHARED_LAYOUT_IDS.m15Anchor,
                        }
                      : {})}
                  />

                  {/* Glyph inside the wedge */}
                  <motion.text
                    x={labelP.x}
                    y={labelP.y + 8}
                    textAnchor="middle"
                    fill={isAi ? 'var(--sage)' : 'var(--cream-muted)'}
                    fontFamily="var(--font-display)"
                    fontSize={isAi ? 28 : 22}
                    fontWeight={isAi ? 700 : 500}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: DUR.quick,
                      ease: EASE_EDITORIAL,
                      delay: wedgeDelay + 0.15,
                    }}
                  >
                    {pillar.glyph}
                  </motion.text>

                  {/* Outer label — pillar name */}
                  <motion.text
                    x={glyphP.x}
                    y={glyphP.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isAi ? 'var(--sage)' : 'var(--cream)'}
                    fontFamily="var(--font-mono)"
                    fontSize={isAi ? 14 : 12}
                    fontWeight={isAi ? 700 : 600}
                    letterSpacing={1.5}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: DUR.quick,
                      ease: EASE_EDITORIAL,
                      delay: wedgeDelay + 0.25,
                    }}
                  >
                    {pillar.label.toUpperCase()}
                  </motion.text>
                </g>
              );
            })}

            {/* Center caption */}
            <motion.text
              x={CENTER}
              y={CENTER - 18}
              textAnchor="middle"
              fill="var(--cream)"
              fontFamily="var(--font-display)"
              fontSize={36}
              fontWeight={700}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: 1.4 }}
            >
              ICH M15
            </motion.text>
            <motion.text
              x={CENTER}
              y={CENTER + 14}
              textAnchor="middle"
              fill="var(--cream-muted)"
              fontFamily="var(--font-display)"
              fontStyle="italic"
              fontSize={15}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: 1.5 }}
            >
              Model-Informed Drug Development
            </motion.text>
            <motion.text
              x={CENTER}
              y={CENTER + 42}
              textAnchor="middle"
              fill="var(--sage)"
              fontFamily="var(--font-mono)"
              fontSize={11}
              fontWeight={600}
              letterSpacing={1.4}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: 1.6 }}
            >
              STEP 4 · 29 JAN 2026
            </motion.text>
          </svg>
        </div>
      </Viz>

      <Footer
        kicker="Why now · ICH M15 Step 4"
        tagline="Every architectural choice in PharmAgent maps to one of these six pillars — by design, not by accident."
        delay={4.6}
      />

      <TracingBeam segment={3} totalSegments={DECK_META.totalSlides} />
    </SlideGrid>
  );
}
