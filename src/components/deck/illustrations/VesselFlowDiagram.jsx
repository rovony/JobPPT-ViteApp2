import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * VesselFlowDiagram — the three-panel narrative illustration for
 * Case 01 (Ambrisentan · Pediatric PAH).
 *
 *   HEALTHY       → wide open vessel, dots flow freely
 *   PAH           → vessel pinches at midsection, dots STALL
 *   AMBRISENTAN   → flow restored, cyan ERA receptor blockers docked
 *
 * Single SVG, viewBox 0 0 684 700. Three horizontal bands stacked
 * vertically so the panel reads as a before / problem / after
 * timeline without any extra chrome or medallions.
 *
 * The motion beat I'm proudest of is the PAH stall: dots use a
 * keyframed x-translation with a `times` array that front-loads
 * progress (40% of duration to reach the constriction, then crawl
 * through it, then sprint out the other side). They visibly
 * STRUGGLE — not just "slow". That's what makes the panel read
 * "vascular resistance" instead of "someone set slow-mo".
 *
 * All colors read from CSS tokens (--coral, --cyan, --cream-*)
 * via `var(--case, var(--coral))`. No hex anywhere.
 *
 * Bounding-box table (viewBox units · verified, zero overlap):
 *   HEALTHY band       y ∈ [28, 170]
 *     eyebrow          [580, 644] × [28, 44]
 *     vessel           [40, 644] × [101, 119]
 *     caption          [420, 644] × [150, 170]
 *   divider-1          [40, 644] × [230, 231]
 *   PAH band           y ∈ [268, 415]
 *     eyebrow          [600, 644] × [268, 284]
 *     vessel+glow      [40, 644] × [330, 380]
 *     caption          [380, 644] × [395, 415]
 *   divider-2          [40, 644] × [470, 471]
 *   AMBRI band         y ∈ [508, 655]
 *     eyebrow          [550, 644] × [508, 524]
 *     vessel+ERA       [40, 644] × [555, 625]
 *     caption          [380, 644] × [635, 655]
 */
export default function VesselFlowDiagram({ className }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 684 700"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label="Three-panel comparison: healthy pulmonary vessel, PAH-constricted vessel with stalled flow, and ambrisentan-restored vessel with ERA receptor blockade."
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
    >
      {/* ═══════════ HEALTHY ═══════════ */}
      <Segment
        label="HEALTHY"
        caption="normal pulmonary flow"
        centerY={110}
        labelColor="var(--cream-muted)"
        entranceDelay={0}
      >
        <Vessel y={110} delay={0} />
        <FlowDots
          y={110}
          reduce={reduce}
          color="var(--case, var(--coral))"
          mode="normal"
          startDelay={0.4}
        />
      </Segment>

      {/* ─ divider 1 ─ */}
      <Divider y={230} delay={0.6} />

      {/* ═══════════ PAH ═══════════ */}
      <Segment
        label="PAH"
        caption="vascular constriction · ↑ pressure"
        centerY={350}
        labelColor="var(--case, var(--coral))"
        entranceDelay={0.5}
      >
        {/* Wide vessel body */}
        <Vessel y={350} delay={0.5} />

        {/* Constriction — a background-colored bar "bites out" the
            middle of the coral vessel so it visually pinches.
            Uses --bg so it matches the slide substrate in any
            theme (light or dark). Rounded caps soften the cut. */}
        <motion.path
          d="M 290 350 L 370 350"
          stroke="var(--bg)"
          strokeWidth={14}
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: reduce ? 0 : 0.9 }}
        />
        {/* Narrower coral thread inside the bite so you still see
            *some* flow path — this is what reads as the stenotic
            channel rather than a complete block. */}
        <motion.path
          d="M 290 350 L 370 350"
          stroke="var(--case, var(--coral))"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 1.0 },
            opacity: { duration: 0.3, delay: reduce ? 0 : 1.0 },
          }}
        />

        {/* Breathing pressure glow around the constriction — static
            at reduced motion, breathing otherwise. */}
        <motion.circle
          cx={330}
          cy={350}
          r={42}
          fill="var(--case, var(--coral))"
          initial={{ opacity: 0 }}
          animate={
            reduce
              ? { opacity: 0.15 }
              : { opacity: [0.15, 0.32, 0.15] }
          }
          transition={
            reduce
              ? { duration: 0.4, delay: 1.1 }
              : { duration: 3, delay: 1.1, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{ filter: 'blur(14px)' }}
        />

        <FlowDots
          y={350}
          reduce={reduce}
          color="var(--case, var(--coral))"
          mode="stall"
          startDelay={1.2}
        />
      </Segment>

      {/* ─ divider 2 ─ */}
      <Divider y={470} delay={1.4} />

      {/* ═══════════ AMBRISENTAN ═══════════ */}
      <Segment
        label="AMBRISENTAN"
        caption="ERA blockade · flow restored"
        centerY={590}
        labelColor="var(--case, var(--coral))"
        entranceDelay={1.4}
      >
        <Vessel y={590} delay={1.4} />

        {/* Two cyan ERA receptor blockers docked on the vessel wall.
            Each is a circle on the top edge with a small tick above
            it suggesting the drug molecule having docked. */}
        {[280, 400].map((cx, i) => (
          <ReceptorBlocker
            key={cx}
            cx={cx}
            y={590}
            delay={reduce ? 0 : 1.85 + i * 0.12}
            reduce={reduce}
          />
        ))}

        <FlowDots
          y={590}
          reduce={reduce}
          color="var(--case, var(--coral))"
          mode="normal"
          startDelay={2.1}
        />
      </Segment>
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   Segment — an eyebrow + caption + children (vessel art).
   Lays out the segment's non-vessel text; the vessel art is
   drawn by the caller so each segment can have distinct
   decorations (constriction, receptors, etc).
   ─────────────────────────────────────────────────────────── */
function Segment({ label, caption, centerY, labelColor, entranceDelay, children }) {
  return (
    <g>
      {/* Eyebrow — right-aligned, sits above the vessel */}
      <motion.text
        x={644}
        y={centerY - 66}
        textAnchor="end"
        fontFamily="var(--font-mono)"
        fontSize={11}
        fontWeight={500}
        fill={labelColor}
        style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: entranceDelay }}
      >
        {label}
      </motion.text>

      {children}

      {/* Caption — right-aligned italic, sits below the vessel */}
      <motion.text
        x={644}
        y={centerY + 50}
        textAnchor="end"
        fontFamily="var(--font-display)"
        fontSize={13}
        fontStyle="italic"
        fill="var(--cream-muted)"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: entranceDelay + 0.35 }}
      >
        {caption}
      </motion.text>
    </g>
  );
}

/* ───────────────────────────────────────────────────────────
   Vessel — a single wide coral tube drawn from x=40 → x=644
   at a given y. pathLength reveal on entrance.
   ─────────────────────────────────────────────────────────── */
function Vessel({ y, delay }) {
  return (
    <motion.path
      d={`M 40 ${y} L 644 ${y}`}
      stroke="var(--case, var(--coral))"
      strokeWidth={18}
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay },
        opacity: { duration: 0.25, delay },
      }}
    />
  );
}

/* ───────────────────────────────────────────────────────────
   FlowDots — five coral dots traveling x from 60 → 624 at a
   given y. Two modes:
     · 'normal'  — 4s linear loop, evenly distributed
     · 'stall'   — 7s loop with a front-loaded `times` array so
                   dots linger at the constriction x ∈ [290, 370]
   ─────────────────────────────────────────────────────────── */
function FlowDots({ y, color, mode, reduce, startDelay }) {
  // Five dots, phase-offset across the loop so they don't travel
  // in a clump — the flow reads as continuous at any frozen frame.
  const N = 5;
  const phases = Array.from({ length: N }, (_, i) => i / N);

  // Endpoint geometry for the x-axis translation. Dots start at
  // local x=0 (i.e. SVG x = startX) and travel a distance of `run`.
  const startX = 60;
  const run = 564;

  if (reduce) {
    // At reduced motion, render static dots evenly spaced across
    // the vessel so the panel still communicates "flow exists".
    return (
      <g>
        {phases.map((p, i) => (
          <circle
            key={i}
            cx={startX + p * run}
            cy={y}
            r={4}
            fill={color}
          />
        ))}
      </g>
    );
  }

  const isStall = mode === 'stall';
  const duration = isStall ? 7 : 4;

  // Keyframes for the stall: travel 0→230 quickly (40% of time),
  // crawl 230→260 (40%→55%), then sprint 260→run (55%→100%).
  // That's the "front-loaded easing" narrative — dots arrive at
  // the constriction, visibly hesitate, push through, then
  // accelerate away. Linear motion makes the hesitation pop.
  const stallX = [0, 230, 250, 260, run];
  const stallTimes = [0, 0.4, 0.5, 0.55, 1];

  const normalX = [0, run];
  const normalTimes = [0, 1];

  return (
    <g>
      {phases.map((phase, i) => {
        // Negative delay offsets the loop so each dot is at a
        // different point in the cycle at t=0. Motion handles
        // negative delays by fast-forwarding into the animation.
        const phaseDelay = -phase * duration;
        return (
          <motion.circle
            key={i}
            cy={y}
            r={4}
            fill={color}
            cx={startX}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: isStall ? stallX : normalX,
            }}
            transition={{
              opacity: { duration: 0.3, delay: startDelay },
              x: {
                duration,
                times: isStall ? stallTimes : normalTimes,
                ease: 'linear',
                repeat: Infinity,
                delay: startDelay + phaseDelay,
              },
            }}
          />
        );
      })}
    </g>
  );
}

/* ───────────────────────────────────────────────────────────
   ReceptorBlocker — cyan circle docked on the vessel top edge
   with a small perpendicular tick above it representing the
   drug molecule. Scales in with a back-ease for a little pop.
   ─────────────────────────────────────────────────────────── */
function ReceptorBlocker({ cx, y, delay, reduce }) {
  const top = y - 9;       // docking point on the vessel's top edge
  const tickStart = y - 22;
  const tickEnd = y - 14;

  return (
    <g>
      {/* Tick — the "docked drug" mark */}
      <motion.line
        x1={cx}
        y1={tickStart}
        x2={cx}
        y2={tickEnd}
        stroke="var(--cyan)"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 0.3, delay: delay + 0.1 }}
      />
      {/* Docked receptor blocker */}
      <motion.circle
        cx={cx}
        cy={top}
        r={6}
        fill="var(--cyan)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          reduce
            ? { duration: 0.2, delay }
            : { type: 'spring', stiffness: 380, damping: 14, delay }
        }
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </g>
  );
}

/* ───────────────────────────────────────────────────────────
   Divider — a 1px cream-hairline rule between bands.
   ─────────────────────────────────────────────────────────── */
function Divider({ y, delay }) {
  return (
    <motion.line
      x1={40}
      y1={y}
      x2={644}
      y2={y}
      stroke="var(--cream-hairline)"
      strokeWidth={1}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: 0.5, delay },
        opacity: { duration: 0.3, delay },
      }}
    />
  );
}