// @ts-nocheck
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
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
 * V6.9.4 (2026-04-24) — Scale-to-fit canvas wrapper.
 * The component now renders into a fixed 820 × 500 inner canvas
 * (`GATE_W` / `GATE_H`) and uniformly scales it via CSS transform to
 * fit whatever responsive box the parent provides. SVG (which scales
 * via viewBox) and HTML node overlays (which use fixed px) used to
 * drift apart below ~820 px container width — boxes off arrows by
 * 30-40 px at 1366 × 768. With the wrapper, both layers live in the
 * same 820 × 500 coordinate space and scale together, so alignment
 * is invariant under container size. Outer box uses min(W/820, H/500)
 * so it also respects vertical room (the gate sits inside a card cell
 * that can be much shorter than 500 px on small viewports).
 *
 * ─── Layout (px, container 820 × 500) — V6.9.3 alignment audit ─────
 * Diamond rect (150,80,100×100) rotated 45° around (200,130) →
 *   true vertices: top=(200,59.3) right=(270.7,130) bottom=(200,200.7).
 *   All flow arrows now terminate AT those vertices instead of inside
 *   the rotated rect (the previous values landed 18-21px under-shot).
 *
 * Element              left-top         dims        notes
 * Step 01 node         (80, 2)          240×44      moved up to give A1 room
 * Step 01 desc         (332, y~24)      ~204×14     anchor LEFT (centered on Step01)
 * Diamond              center (200,130) 100×100     rotated 45°
 * Diamond desc         center (200,215) ~210×14     CLEAN below diamond, no backdrop
 * Rebuild node         (80, 245)        240×44      moved down to clear desc
 * Rebuild desc         center (200,298) ~200×14     BELOW rebuild
 * Step 03 node         (500, 108)       240×44      nudged up 3px so YES arrow lands on its vert centre
 * Step 03 desc         (640, 179)       ~140×14     anchor LEFT, between A4
 * Step 04 node         (500, 206)       240×44
 * Step 04 desc         (640, 277)       ~165×14     anchor LEFT, between A5
 * Step 05 node         (500, 301)       240×44
 * Step 05 desc         (640, 372)       ~130×14     anchor LEFT, between A6
 * Step 06 node         (500, 396)       240×44      right col row 4
 * Step 06 desc         center (620,449) ~175×14     BELOW step06
 *
 * Arrows (line ends; arrowhead polygon adds 2px past y2/x2):
 *   A1  down          (200, 47)  → (200, 57)     Step01 → Diamond TOP   (tip lands at y=59 ≈ 59.3)
 *   A2  right YES     (271, 130) → (498, 130)    Diamond RIGHT → Step03 (line starts at x=271 ≈ 270.7)
 *   A3  down NO       (200, 224) → (200, 243)    BELOW desc → Rebuild   (tip at y=245 = rebuild top)
 *   A4  down          (620, 153) → (620, 204)    Step03 → Step04        (Step03 bottom at 152)
 *   A5  down          (620, 251) → (620, 299)    Step04 → Step05
 *   A6  down          (620, 346) → (620, 394)    Step05 → Step06
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

// Native design canvas — every coordinate inside this component is
// authored against an 820 × 500 grid. The outer wrapper measures its
// rendered width and uniformly scales the canvas so SVG arrows + HTML
// nodes stay in lock-step at any container size. Without this, SVG
// scales via viewBox while HTML stays at native px → boxes drift off
// arrows below ~820 px (clearly visible at 1366 × 768).
const GATE_W = 820;
const GATE_H = 500;

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

  // Scale-to-fit: observe the responsive outer box, scale the fixed
  // 820 × 500 canvas by min(W/820, H/500). Aspect-ratio on the outer
  // box keeps it shaped like the canvas, so the two ratios match and
  // we get exactly one scale factor.
  const outerRef = useRef(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    if (!outerRef.current || typeof ResizeObserver === 'undefined') return;
    const el = outerRef.current;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      const next = Math.min(width / GATE_W, height / GATE_H);
      setScale((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  // Centre the scaled canvas inside the outer box. With transform-origin
  // at top-left, we manually offset by half the residual space so the
  // gate sits centred regardless of the bounding container's aspect
  // ratio (slides use 16:9 cells; the gate is 820:500 ≈ 1.64:1).
  const scaledW = GATE_W * scale;
  const scaledH = GATE_H * scale;

  return (
    <div
      ref={outerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: GATE_W,
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* Native 820×500 canvas, uniformly scaled to fit the outer box.
          SVG (viewBox) and HTML (fixed px) live in the same coordinate
          system here, so they stay aligned at every container size. */}
      <div
        style={{
          position: 'absolute',
          top: `calc(50% - ${scaledH / 2}px)`,
          left: `calc(50% - ${scaledW / 2}px)`,
          width: GATE_W,
          height: GATE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
      {/* ═════ SVG LAYER (arrows + diamond + particles) ═════ */}
      <svg
        viewBox="0 0 820 500"
        preserveAspectRatio="xMidYMid meet"
        width={GATE_W}
        height={GATE_H}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        aria-label="Six-step workflow flowchart with pcVPC decision gate."
      >
        {/* Arrow 1: Step 01 → Diamond TOP (↓). Step01 moved to top=2 (bottom=46);
            arrow line 47→57 (10px), polygon tip at y=59 ≈ diamond top vertex (59.3). */}
        <ArrowDown x={200} y1={47} y2={57} drawStyle={drawStyle(T.arrow1)} />

        {/* Arrow 2: Diamond RIGHT → Step 03 (→) YES — primary path.
            Line starts at x=271 ≈ diamond right vertex (270.7); previous x1=252
            began ~19px inside the rotated rect. */}
        <ArrowRight x1={271} x2={498} y={130} drawStyle={drawStyle(T.arrow2)} />
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

        {/* Arrow 3: Diamond BOTTOM → Rebuild (↓) NO — DASHED amber, counterfactual.
            Now starts at y=224 (cleanly BELOW the desc text at y=215, which itself
            sits 14px below the diamond bottom vertex at 200.7) and ends at y=243
            (tip at y=245 = rebuild top). Previous values y1=182/y2=229 had the
            line start inside the rotated rect and forced a `var(--bg)` backdrop
            rect to mask the arrow under the desc — both gone in V6.9.3. */}
        <ArrowDown
          x={200} y1={224} y2={243}
          color="var(--amber)"
          dashed
          drawStyle={drawStyle(T.arrow3)}
        />
        <motion.text
          x={210} y={240} textAnchor="start"
          fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.6"
          fill="var(--amber)"
          style={{ textTransform: 'uppercase' }}
          {...fadeStyle(T.arrow3)}
        >
          NO
        </motion.text>

        {/* Arrows A4-A6: right-column vertical spine — nodes 44px tall.
            Step 03 nudged up 3px (top=108, bottom=152) so YES arrow lands on
            its vertical centre — A4 starts at y=153 (1px below new bottom). */}
        <ArrowDown x={620} y1={153} y2={204} drawStyle={drawStyle(T.arrow4)} />
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

        {/* Diamond desc — sits CLEANLY between the diamond bottom vertex
            (y=200.7) and the start of the NO arrow (y=224). No backdrop
            rect: the previous version masked A3 with `fill=var(--bg)`,
            which (a) read as a "darker patch" once the workflow lived
            inside a panel-tinted card, and (b) was only needed because
            A3 used to start at y=182 inside the diamond. Both root causes
            are gone now. */}
        <motion.text
          x={200} y={215} textAnchor="middle"
          fontFamily="var(--font-mono)" fontSize="11"
          fill="var(--cream-muted)"
          {...fadeStyle(T.diamond)}
        >
          adult model predicts peds data?
        </motion.text>

        {/* Flowing particles along YES path */}
        {animate && <FlowParticles />}
      </svg>

      {/* ═════ HTML LAYER (nodes + descriptions) ═════ */}

      {/* Step 01 + description to the RIGHT (numeric anchor).
          top=2 (was 11) → bottom=46, leaves 13px headroom for A1 (47→57)
          to read as a real arrow rather than a stub clipped into the diamond. */}
      <FlowNode top={2}  left={80}
        num="01" line1="BUILD" line2="ADULT POPPK FOUNDATION"
        fadeStyle={fadeStyle(T.step01)}
      />
      <SideDesc top={24} left={332} fadeStyle={fadeStyle(T.step01)}>
        380 adults · 7 studies · 3,126 obs
      </SideDesc>

      {/* Rebuild — NO branch (counterfactual). Dashed border + amber accent
          + 85% opacity signals "alternate route, not the one taken".
          top=245 (was 231) — moved down 14px so the diamond desc + A3 arrow
          have a clean stack between the diamond bottom and rebuild top. */}
      <FlowNode
        top={245} left={80}
        num="↺" line1="RECONSIDER" line2="DE NOVO PEDS FIT"
        accent="amber"
        dashed
        counterfade={counterFade(T.rebuild)}
      />
      <BelowDesc top={298} centerX={200} counterfade={counterFade(T.rebuild)}>
        alt absorption · estimate allometry
      </BelowDesc>

      {/* Step 03 + desc between Step 03 and Step 04 (right of spine).
          top=108 (was 111) → centre=130, exactly on the YES arrow's y-axis.
          Without this nudge the YES arrowhead landed 3px above Step 03's
          vertical centre, which read as a slight tilt. */}
      <FlowNode top={108} left={500}
        num="03" line1="FIT" line2="PEDIATRIC · INHERIT STRUCTURE"
        fadeStyle={fadeStyle(T.step03)}
      />
      <SideDesc top={179} left={640} fadeStyle={fadeStyle(T.step03)}>
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
      <div style={{ fontSize: 'var(--fs-card-label)', letterSpacing: '0.1em', lineHeight: 1 }}>
        <span style={{ color, fontWeight: 600 }}>{num}</span>
        <span style={{ color: 'var(--cream-muted)', margin: '0 6px' }}>·</span>
        <span style={{ color: 'var(--cream)', fontWeight: 500 }}>{line1}</span>
      </div>
      {/* Line 2 — object / detail */}
      <div style={{
        fontSize: 'var(--fs-card-meta)',
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
        fontSize: 'var(--fs-card-meta)',
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
        fontSize: 'var(--fs-card-meta)',
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
     01-bottom (200, 46) → pcVPC-center (200, 130) →
     Step03-left (498, 130) → Spine-top (620, 130) →
     Step04-center (620, 228) → Step05-center (620, 323) →
     Step06-top (620, 414)
   V6.9.3 — start y bumped from 49 to 46 because Step 01 moved up to
   top=2 (bottom=46) to give A1 visible arrow length.
   ───────────────────────────────────────────────────────────── */
function FlowParticles() {
  // cx/cy arrays have 9 stops. Stops [0] and [1] share position so the
  // fade-in (opacity 0→1 during times[0]→times[1]) happens WHILE the
  // particle is stationary at step01-bottom.
  const path = {
    cx: [200, 200, 200, 498, 620, 620, 620, 620, 620],
    cy: [46,  46,  130, 130, 130, 228, 323, 414, 414],
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
