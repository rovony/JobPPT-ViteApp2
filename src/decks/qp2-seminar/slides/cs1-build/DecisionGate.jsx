import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * DecisionGate — 6-step workflow flowchart for CS1 build slide (slide 11c).
 *
 * Visual vocabulary matches CompartmentSchematic (same slide) + slide-8
 * DecisionVisuals: tinted coral panels (fillOpacity 0.06-0.08), 1.5-2px
 * strokes, rounded rects (rx=8), polygon arrowheads, flowing coral
 * particles on the main YES path (2-pass then stop).
 *
 * Every node gets a short description beside or below it. Compact titles
 * inside nodes + verbose descriptions outside = clean scan-from-distance
 * + detail on close-read.
 *
 * Descriptions (V6.9.1 · 2026-04-24):
 *   · Step 01  — RIGHT of node:  "380 adults · 7 studies · 3,126 obs"
 *   · Diamond  — BELOW centered: "adult model predicts peds data?"
 *   · Rebuild  — BELOW centered: "de novo peds fit · alt absorption"
 *   · Step 03  — RIGHT of spine: "inherit adult structure"
 *   · Step 04  — RIGHT of spine: "peds vs adult · AUCss, Cmax"
 *   · Step 05  — RIGHT of spine: "Δ6MWD and AE vs AUCss"
 *   · Step 06  — BELOW centered: "integrated report · EMA, PMDA"
 *
 * Branch semantics:
 *   YES arrow — solid coral, ✓ badge near Step 03 → "path taken"
 *   NO arrow  — DASHED amber, "RECONSIDER APPROACH" node → "counterfactual"
 * Dashed-line-as-counterfactual is a standard flowchart convention:
 * the eye reads it as "this could've happened but didn't". Together with
 * the ✓ on YES and the amber (vs coral) accent on the NO branch, the
 * chart answers the panelist question "what if pcVPC had failed?"
 * visually without needing verbal defense.
 *
 * ─── Layout (px, container 820 × 500) ───────────────────────────────
 * Element              left-top         dims        notes
 * Step 01 node         (80, 11)         240×38      left col row 1
 * Step 01 desc         (332, y~30)      ~204×14     anchor LEFT
 * Diamond              center (200,130) 100×100     rotated 45°
 * Diamond desc         center (200,200) ~180×14     backdrop rect 232 wide
 * Rebuild node         (80, 231)        240×38      left col row 3, amber
 * Rebuild desc         center (200,280) ~200×14     BELOW rebuild
 * Step 03 node         (500, 111)       240×38      right col row 1
 * Step 03 desc         (640, 177)       ~140×14     anchor LEFT, between A4
 * Step 04 node         (500, 206)       240×38
 * Step 04 desc         (640, 272)       ~165×14     anchor LEFT, between A5
 * Step 05 node         (500, 301)       240×38
 * Step 05 desc         (640, 367)       ~130×14     anchor LEFT, between A6
 * Step 06 node         (500, 396)       240×38      right col row 4
 * Step 06 desc         center (620,445) ~175×14     BELOW step06
 *
 * Arrows:
 *   A1  down          (200, 49)  → (200, 78)     Step01 → Diamond
 *   A2  right YES     (252, 130) → (498, 130)    Diamond → Step03  [✓ badge at x=415]
 *   A3  down NO       (200, 182) → (200, 229)    Diamond → Rebuild  [DASHED amber]
 *   A4  down          (620, 149) → (620, 204)    Step03 → Step04
 *   A5  down          (620, 244) → (620, 299)    Step04 → Step05
 *   A6  down          (620, 339) → (620, 394)    Step05 → Step06
 *
 * Particles travel MAIN YES path: 01 → pcVPC → 03 → 04 → 05 → 06.
 * 3 staggered coral dots, 6s per cycle, 2 passes then STOP (V6.9.2 —
 * matches slide-8 ConstrainViz; avoids visual background noise during
 * the spoken narrative). V6.9.1 polish: fade-in happens at starting
 * position BEFORE motion begins (separated via keyframe stops), so
 * particles ease in rather than pop in.
 *
 * Render order (z): arrows → YES/NO markers → diamond → nodes → descriptions.
 */

const MOUNTED_GATES = new Set();
const EASE = [0.4, 0, 0.2, 1];

export default function DecisionGate({ id = 'cs1-build-flowchart-v691' }) {
  const prefersReduced = useReducedMotion();

  const firstMountRef = useRef(null);
  if (firstMountRef.current === null) {
    firstMountRef.current = !MOUNTED_GATES.has(id);
  }
  const isFirstMount = firstMountRef.current;

  useEffect(() => {
    MOUNTED_GATES.add(id);
  }, [id]);

  const animate = isFirstMount && !prefersReduced;

  // Entrance timeline (seconds).
  const T = {
    step01:  0.00,
    arrow1:  0.30,
    diamond: 0.50,
    arrow2:  0.80,  // YES
    arrow3:  0.80,  // NO (dashed, counterfactual)
    step03:  1.00,
    rebuild: 1.00,
    arrow4:  1.20,
    step04:  1.30,
    arrow5:  1.50,
    step05:  1.60,
    arrow6:  1.80,
    step06:  1.90,
  };

  const fadeStyle = (delay) =>
    animate
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3, ease: EASE, delay },
        }
      : { initial: false, animate: { opacity: 1 } };

  const drawStyle = (delay) =>
    animate
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { duration: 0.35, ease: EASE, delay },
            opacity: { duration: 0.01, delay },
          },
        }
      : { initial: false, animate: { pathLength: 1, opacity: 1 } };

  // Rebuild / counterfactual path animates at reduced opacity (75%) so it
  // reads as "alternate route" vs the primary YES arm.
  const counterOpacity = 0.85;
  const counterFade = (delay) =>
    animate
      ? {
          initial: { opacity: 0 },
          animate: { opacity: counterOpacity },
          transition: { duration: 0.3, ease: EASE, delay },
        }
      : { initial: false, animate: { opacity: counterOpacity } };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 500,
        maxWidth: 820,
        margin: '0 auto',
      }}
    >
      {/* ═════ SVG LAYER (arrows + diamond + particles) ═════ */}
      <svg
        viewBox="0 0 820 500"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        aria-label="Six-step workflow flowchart with pcVPC decision gate."
      >
        {/* Arrow 1: Step 01 → Diamond (↓) — node 44px tall so bottom at y=55 */}
        <ArrowDown x={200} y1={56} y2={78} drawStyle={drawStyle(T.arrow1)} />

        {/* Arrow 2: Diamond → Step 03 (→) YES — primary path */}
        <ArrowRight x1={252} x2={498} y={130} drawStyle={drawStyle(T.arrow2)} />
        <motion.text
          x={350} y={120} textAnchor="middle"
          fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.6"
          fill="var(--cream-muted)"
          style={{ textTransform: 'uppercase' }}
          {...fadeStyle(T.arrow2)}
        >
          YES
        </motion.text>
        {/* ✓ badge on YES path — "this is the path taken" */}
        <motion.g {...fadeStyle(T.arrow2)}>
          <circle cx={415} cy={120} r={8} fill="var(--coral)" />
          <path
            d="M 411 120 L 414 123 L 419 117"
            stroke="var(--bg)" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" fill="none"
          />
        </motion.g>

        {/* Arrow 3: Diamond → Rebuild (↓) NO — DASHED amber, counterfactual */}
        <ArrowDown
          x={200} y1={182} y2={229}
          color="var(--amber)"
          dashed
          drawStyle={drawStyle(T.arrow3)}
        />
        <motion.text
          x={210} y={223} textAnchor="start"
          fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.6"
          fill="var(--amber)"
          style={{ textTransform: 'uppercase' }}
          {...fadeStyle(T.arrow3)}
        >
          NO
        </motion.text>

        {/* Arrows A4-A6: right-column vertical spine — nodes 44px tall */}
        <ArrowDown x={620} y1={156} y2={204} drawStyle={drawStyle(T.arrow4)} />
        <ArrowDown x={620} y1={251} y2={299} drawStyle={drawStyle(T.arrow5)} />
        <ArrowDown x={620} y1={346} y2={394} drawStyle={drawStyle(T.arrow6)} />

        {/* Diamond (Step 02 — the gate) */}
        <motion.g {...fadeStyle(T.diamond)}>
          <rect
            x={150} y={80} width={100} height={100}
            fill="var(--coral)" fillOpacity={0.08}
            stroke="var(--coral)" strokeWidth="1.8"
            transform="rotate(45 200 130)"
          />
          <text
            x={200} y={122} textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="13" letterSpacing="1.4"
            fill="var(--coral)" fontWeight={600}
            style={{ textTransform: 'uppercase' }}
          >
            02
          </text>
          <text
            x={200} y={144} textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="15" fontWeight={600}
            fill="var(--cream)"
          >
            pcVPC
          </text>
        </motion.g>

        {/* Diamond desc — backdrop rect keeps text above the NO arrow */}
        <motion.g {...fadeStyle(T.diamond)}>
          <rect x={84} y={188} width={232} height={18} fill="var(--bg)" />
          <text
            x={200} y={201} textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="11"
            fill="var(--cream-muted)"
          >
            adult model predicts peds data?
          </text>
        </motion.g>

        {/* Flowing particles along YES path */}
        {animate && <FlowParticles />}
      </svg>

      {/* ═════ HTML LAYER (nodes + descriptions) ═════ */}

      {/* Step 01 + description to the RIGHT (numeric anchor) */}
      <FlowNode top={11}  left={80}
        num="01" line1="BUILD" line2="ADULT POPPK FOUNDATION"
        fadeStyle={fadeStyle(T.step01)}
      />
      <SideDesc top={33} left={332} fadeStyle={fadeStyle(T.step01)}>
        380 adults · 7 studies · 3,126 obs
      </SideDesc>

      {/* Rebuild — NO branch (counterfactual). Dashed border + amber accent
          + 85% opacity signals "alternate route, not the one taken". */}
      <FlowNode
        top={231} left={80}
        num="↺" line1="RECONSIDER" line2="DE NOVO PEDS FIT"
        accent="amber"
        dashed
        counterfade={counterFade(T.rebuild)}
      />
      <BelowDesc top={284} centerX={200} counterfade={counterFade(T.rebuild)}>
        alt absorption · estimate allometry
      </BelowDesc>

      {/* Step 03 + desc between Step 03 and Step 04 (right of spine) */}
      <FlowNode top={111} left={500}
        num="03" line1="FIT" line2="PEDIATRIC · INHERIT STRUCTURE"
        fadeStyle={fadeStyle(T.step03)}
      />
      <SideDesc top={182} left={640} fadeStyle={fadeStyle(T.step03)}>
        N = 39 · sparse peds sampling
      </SideDesc>

      {/* Step 04 + desc between Step 04 and Step 05 */}
      <FlowNode top={206} left={500}
        num="04" line1="COMPARE" line2="STEADY-STATE EXPOSURE"
        fadeStyle={fadeStyle(T.step04)}
      />
      <SideDesc top={277} left={640} fadeStyle={fadeStyle(T.step04)}>
        peds vs adult · AUCss, Cmax
      </SideDesc>

      {/* Step 05 + desc between Step 05 and Step 06 */}
      <FlowNode top={301} left={500}
        num="05" line1="EVALUATE" line2="EXPOSURE – RESPONSE"
        fadeStyle={fadeStyle(T.step05)}
      />
      <SideDesc top={372} left={640} fadeStyle={fadeStyle(T.step05)}>
        Δ6MWD and AE vs AUCss
      </SideDesc>

      {/* Step 06 + desc BELOW (last step, no arrow below it) */}
      <FlowNode top={396} left={500}
        num="06" line1="PACKAGE" line2="FOR SUBMISSION"
        fadeStyle={fadeStyle(T.step06)}
      />
      <BelowDesc top={449} centerX={620} fadeStyle={fadeStyle(T.step06)}>
        integrated report · EMA, PMDA
      </BelowDesc>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FlowNode — 2-line HTML panel.
   Line 1: "NN · ACTION" (12px mono coral+cream) — the verb
   Line 2: "OBJECT" (10px mono cream-muted) — what the verb acts on
   240×44. Rounded rect rx=8, tinted fill 6%, 1.5px stroke.
   accent="amber" swaps color + makes border DASHED (counterfactual).
   counterfade variant dims node to 85% opacity for counterfactual nodes.
   ───────────────────────────────────────────────────────────── */
function FlowNode({ top, left, num, line1, line2, fadeStyle, accent, dashed, counterfade }) {
  const color = accent === 'amber' ? 'var(--amber)' : 'var(--coral)';
  const style = {
    position: 'absolute',
    top, left,
    width: 240, height: 44,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: 2,
    border: `1.5px ${dashed ? 'dashed' : 'solid'} ${color}`,
    background: accent === 'amber'
      ? 'color-mix(in srgb, var(--amber) 6%, transparent)'
      : 'color-mix(in srgb, var(--coral) 6%, transparent)',
    borderRadius: 8,
    padding: '0 12px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  };
  const motionProps = counterfade || fadeStyle;
  return (
    <motion.div style={style} {...motionProps}>
      {/* Line 1 — NN · ACTION */}
      <div style={{ fontSize: 12, letterSpacing: '0.1em', lineHeight: 1 }}>
        <span style={{ color, fontWeight: 600 }}>{num}</span>
        <span style={{ color: 'var(--cream-muted)', margin: '0 6px' }}>·</span>
        <span style={{ color: 'var(--cream)', fontWeight: 500 }}>{line1}</span>
      </div>
      {/* Line 2 — object / detail */}
      <div style={{
        fontSize: 10,
        letterSpacing: '0.06em',
        color: 'var(--cream-muted)',
        lineHeight: 1,
        fontWeight: 400,
      }}>
        {line2}
      </div>
    </motion.div>
  );
}

/* SideDesc — anchored at a specific LEFT coord, grows RIGHTWARD. */
function SideDesc({ top, left, children, fadeStyle }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: top - 7,
        left,
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.05em',
        color: 'var(--cream-muted)',
      }}
      {...fadeStyle}
    >
      {children}
    </motion.div>
  );
}

/* BelowDesc — horizontally centered on a given x. Accepts either
   fadeStyle OR counterfade (the latter animates to 0.85 opacity). */
function BelowDesc({ top, centerX, children, fadeStyle, counterfade }) {
  const motionProps = counterfade || fadeStyle;
  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left: centerX,
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.05em',
        color: 'var(--cream-muted)',
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ArrowDown / ArrowRight — coral (or amber) line + polygon arrowhead.
   Now supports `color` and `dashed` for the NO/counterfactual branch.
   Matches CompartmentSchematic pattern (manual polygon, not SVG marker).
   ───────────────────────────────────────────────────────────── */
function ArrowDown({ x, y1, y2, drawStyle, color = 'var(--coral)', dashed = false }) {
  return (
    <g>
      <motion.line
        x1={x} y1={y1} x2={x} y2={y2}
        stroke={color} strokeWidth="1.6" fill="none"
        strokeDasharray={dashed ? '4 3' : undefined}
        {...drawStyle}
      />
      <motion.polygon
        points={`${x},${y2 + 2} ${x - 5},${y2 - 7} ${x + 5},${y2 - 7}`}
        fill={color}
        {...drawStyle}
      />
    </g>
  );
}

function ArrowRight({ x1, x2, y, drawStyle, color = 'var(--coral)', dashed = false }) {
  return (
    <g>
      <motion.line
        x1={x1} y1={y} x2={x2} y2={y}
        stroke={color} strokeWidth="1.6" fill="none"
        strokeDasharray={dashed ? '4 3' : undefined}
        {...drawStyle}
      />
      <motion.polygon
        points={`${x2 + 2},${y} ${x2 - 7},${y - 5} ${x2 - 7},${y + 5}`}
        fill={color}
        {...drawStyle}
      />
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────
   FlowParticles — infinite-loop coral dots traveling the main YES path.
   V6.9.1 polish: fade-in happens BEFORE motion starts (via duplicated
   start-position keyframe with 0→1 opacity ramp). Particle pops into
   existence at step01-bottom, then begins its journey — smoother than
   fading-in-while-already-moving.

   Path waypoints (viewBox 820×500):
     01-bottom (200, 49) → pcVPC-center (200, 130) →
     Step03-left (498, 130) → Spine-top (620, 130) →
     Step04-center (620, 225) → Step05-center (620, 320) →
     Step06-top (620, 414)
   ───────────────────────────────────────────────────────────── */
function FlowParticles() {
  // cx/cy arrays have 9 stops. Stops [0] and [1] share position so the
  // fade-in (opacity 0→1 during times[0]→times[1]) happens WHILE the
  // particle is stationary at step01-bottom.
  const path = {
    cx: [200, 200, 200, 498, 620, 620, 620, 620, 620],
    cy: [49,  49,  130, 130, 130, 225, 320, 414, 414],
  };
  const stagger = [0.0, 2.0, 4.0];

  return (
    <>
      {stagger.map((delay, i) => (
        <motion.circle
          key={`particle-${i}`}
          r={3}
          fill="var(--coral)"
          initial={{ cx: path.cx[0], cy: path.cy[0], opacity: 0 }}
          animate={{
            cx: path.cx,
            cy: path.cy,
            opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: 6.0,
            delay: 2.5 + delay,
            ease: 'linear',
            times: [0, 0.06, 0.15, 0.30, 0.38, 0.55, 0.72, 0.92, 1],
            // V6.9.2 — stop after 2 passes (matches slide-8 ConstrainViz).
            // Two cycles read as "active workflow" then settle into a
            // static diagram so the panel's eye doesn't keep tracking
            // moving dots during the spoken narrative.
            repeat: 1,
            repeatDelay: 0.6,
          }}
        />
      ))}
    </>
  );
}
