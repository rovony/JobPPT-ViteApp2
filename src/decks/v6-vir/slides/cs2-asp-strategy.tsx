// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 25 · CS2 Strategy — Two innovations stacked.
 *
 * Reading: the case earns its 36% reduction by stacking two
 * individually-precedented methods. The visual MUST make that stacking
 * literal — that was the point of the prior pass's failure: two cards in
 * a 1fr/1fr grid read as siblings, not as a foundation-and-cap. The
 * redesign uses an isometric tower (cabinet projection, 30°) with three
 * stacked slabs:
 *
 *   - BASELINE slab (foundation) — N=94 conventional adult oncology
 *     (what this trial would otherwise need).
 *   - MOVE #1 slab (mid) — D-optimal design / Fisher Information.
 *     Sizes on PK precision, not endpoint power.
 *   - MOVE #2 slab (top) — informative pediatric PopPK prior.
 *     Anchors adult PK to a 124-patient pediatric distribution.
 *
 * A vertical leader rises from the top slab to the OUTCOME annotation
 * (N=60) — the stack PRODUCES the reduction. The right column carries
 * the prose for each layer, joined to its slab by a violet hairline.
 *
 * No rounded corners. No filled card chrome. Slabs are flat polygons
 * with a single 1px top-edge highlight; everything else is hairline +
 * type. Animation: each slab lands one at a time from below (foundation
 * first, then mid, then top), then the leader extends, then the outcome
 * lands. Reduced-motion skips the staging.
 */

const CASE = {
  baseline: {
    label: 'Baseline',
    title: 'Conventional adult oncology',
    n: 'N = 94',
    note: 'What an endpoint-powered trial in this rare adult population would otherwise require.',
  },
  move1: {
    n: '01',
    kicker: 'Move #1 · Optimal design',
    title: 'Anchor to PK precision — not endpoint power.',
    method: 'Fisher Information Matrix · D-optimality',
    anchor: 'Detect ±20% CL difference adult vs pediatric.',
    precedent: 'Mentré · Bornkamp · Pinheiro',
  },
  move2: {
    n: '02',
    kicker: 'Move #2 · Informative prior',
    title: 'Adult data anchors — does not re-derive.',
    method: 'Pediatric PopPK · N = 124 (AALL07P4 + DFCI 11-001)',
    anchor: 'Adult sample augments the model · model is not re-fit.',
    precedent: 'Rylaze (adult, 2021) · Asparlas (pediatric, 2018)',
  },
  outcome: {
    label: 'The result',
    n: 'N = 60',
    note: '−36% vs baseline · FDA-agreed at Type A · 21 Jul 2023.',
  },
};

export default function Cs2AspStrategy() {
  const reduced = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    baseline: 1.05,
    move1: 1.45,
    move2: 1.85,
    leader: 2.45,
    outcome: 2.65,
    closing: 3.15,
    source: 3.40,
  };

  return (
    <SlideGrid dataCase="teal" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--teal)" delay={D.eyebrow}>CS2 · Strategy</Eyebrow>
      <Headline delay={D.headline} maxChars={48}>
        Two innovations,{' '}
        <span style={{ color: 'var(--teal)', fontStyle: 'italic', fontWeight: 700 }}>
          individually precedented
        </span>{' '}
        — stacked for adult oncology.
      </Headline>
      <Subhead delay={D.subhead} maxChars={110}>
        Each move is{' '}
        <span style={{ color: 'var(--teal)', fontWeight: 600 }}>FDA-precedented on its own</span>.
        Combined here for the first time in this clinical context.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 0.85fr) minmax(0, 1.15fr)',
            gridTemplateRows: '1fr auto',
            columnGap: 'clamp(20px, 3vw, 56px)',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {/* LEFT · Isometric tower of stacked slabs */}
          <div
            style={{
              gridColumn: 1,
              gridRow: 1,
              minHeight: 0,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
            }}
          >
            <StackTower delays={D} reduced={reduced} ease={ease} />
          </div>

          {/* RIGHT · Layer annotations */}
          <div
            style={{
              gridColumn: 2,
              gridRow: 1,
              display: 'grid',
              gridTemplateRows: 'auto 1fr 1fr 1fr',
              rowGap: 'clamp(8px, 1.4vh, 18px)',
              minHeight: 0,
            }}
          >
            <OutcomeRow data={CASE.outcome} delay={D.outcome} reduced={reduced} ease={ease} />
            <MoveRow data={CASE.move2} delay={D.move2 + 0.25} reduced={reduced} ease={ease} />
            <MoveRow data={CASE.move1} delay={D.move1 + 0.25} reduced={reduced} ease={ease} />
            <BaselineRow data={CASE.baseline} delay={D.baseline + 0.25} reduced={reduced} ease={ease} />
          </div>

          {/* Closing prose, full-width below the tower + annotations */}
          <motion.div
            style={{
              gridColumn: '1 / -1',
              gridRow: 2,
              borderTop: '1px solid var(--cream-hairline)',
              paddingTop: 'var(--space-3)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              gap: '12px 22px',
            }}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: D.closing }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--teal)',
                fontWeight: 700,
              }}
            >
              The stack
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-card-body)',
                color: 'var(--cream)',
                lineHeight: 1.45,
                flex: '1 1 480px',
              }}
            >
              PK-precision sample size{' '}
              <span style={{ color: 'var(--teal)', fontWeight: 700 }}>+</span>{' '}
              informative pediatric prior — two FDA precedents combined for the
              first time in this clinical context, returning the same evidence
              quality at a smaller sample.
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Strategy"
        source="Source · PopED workflow (Tessier / Riglet, Paris) · Mentré et al. · NCT04817761"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ============================================================
   StackTower — isometric SVG of three stacked method slabs.
   Cabinet projection at 30°. Coordinate space: 0..400 wide,
   0..520 tall. Each slab gets a top, front, and side polygon.
   ============================================================ */

// SVG geometry constants. Centralised so the right-column rows can
// align hairlines to slab mid-Ys without hard-coding numbers twice.
const TOWER = {
  viewBox: '0 0 400 520',
  slabW: 230,         // top-face width
  slabH: 28,          // slab thickness on the front face
  depthDx: 76,        // 30° projection offset (X)
  depthDy: -44,       // 30° projection offset (Y, negative = up)
  baseX: 60,          // left edge of the bottom slab top-face
  // Y of the FRONT-face top edge for each slab (decreases upward)
  baselineY: 380,
  move1Y:    310,
  move2Y:    240,
  // Y of the OUTCOME platform centre (above the top slab)
  outcomeY:  150,
};

function slabPolygons(yTop, opts = {}) {
  const { slabW, slabH, depthDx, depthDy, baseX } = TOWER;
  const x0 = opts.baseX ?? baseX;
  // Top-face: parallelogram from (x0, yTop) sweeping to (x0+depthDx, yTop+depthDy)
  const top = [
    [x0, yTop],
    [x0 + slabW, yTop],
    [x0 + slabW + depthDx, yTop + depthDy],
    [x0 + depthDx, yTop + depthDy],
  ];
  // Front-face: rectangle from (x0, yTop) to (x0+slabW, yTop+slabH)
  const front = [
    [x0, yTop],
    [x0 + slabW, yTop],
    [x0 + slabW, yTop + slabH],
    [x0, yTop + slabH],
  ];
  // Side-face (right): parallelogram
  const side = [
    [x0 + slabW, yTop],
    [x0 + slabW + depthDx, yTop + depthDy],
    [x0 + slabW + depthDx, yTop + depthDy + slabH],
    [x0 + slabW, yTop + slabH],
  ];
  const toStr = (pts) => pts.map((p) => p.join(',')).join(' ');
  return { top: toStr(top), front: toStr(front), side: toStr(side), yMid: yTop + slabH / 2 };
}

function StackTower({ delays, reduced, ease }) {
  const baseline = slabPolygons(TOWER.baselineY);
  const move1    = slabPolygons(TOWER.move1Y);
  const move2    = slabPolygons(TOWER.move2Y);

  const slabAnim = (delay) => (
    reduced
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease, delay },
        }
  );

  return (
    <svg
      viewBox={TOWER.viewBox}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      aria-label="Isometric tower: baseline N=94 at the foundation, with D-optimal design and informative prior stacked on top, producing N=60"
      role="img"
    >
      <defs>
        {/* Faint vertical gridline from base to outcome platform — sells
            the "rising stack" reading without a heavy axis. */}
      </defs>

      {/* Foundation grid plane — single dashed hairline behind the
          tower so the floor reads as a real plane, not blank. */}
      <line
        x1={TOWER.baseX - 14}
        y1={TOWER.baselineY + TOWER.slabH + 18}
        x2={TOWER.baseX + TOWER.slabW + TOWER.depthDx + 14}
        y2={TOWER.baselineY + TOWER.slabH + TOWER.depthDy + 18}
        stroke="var(--cream-hairline)"
        strokeWidth={1}
        strokeDasharray="3 6"
      />

      {/* Slab 0 — BASELINE (foundation). Faintest. */}
      <Slab polys={baseline} tone={0.10} edge={0.42} {...slabAnim(delays.baseline)}>
        <SlabLabel x={TOWER.baseX + 14} y={baseline.yMid} kicker="BASELINE" value="N = 94" />
      </Slab>

      {/* Slab 1 — MOVE #1 D-OPTIMAL DESIGN (mid). Mid violet. */}
      <Slab polys={move1} tone={0.20} edge={0.65} {...slabAnim(delays.move1)}>
        <SlabLabel x={TOWER.baseX + 14} y={move1.yMid} kicker="MOVE 01" value="D-OPTIMAL DESIGN" />
      </Slab>

      {/* Slab 2 — MOVE #2 INFORMATIVE PRIOR (top). Brightest. */}
      <Slab polys={move2} tone={0.34} edge={1.00} {...slabAnim(delays.move2)}>
        <SlabLabel x={TOWER.baseX + 14} y={move2.yMid} kicker="MOVE 02" value="INFORMATIVE PRIOR" />
      </Slab>

      {/* Vertical leader from top of stack up to the outcome platform.
          Drawn by extending strokeDasharray on a path during entrance.
          Static in reduced motion. */}
      {reduced ? (
        <line
          x1={TOWER.baseX + TOWER.slabW / 2 + TOWER.depthDx / 2}
          y1={TOWER.move2Y + TOWER.depthDy}
          x2={TOWER.baseX + TOWER.slabW / 2 + TOWER.depthDx / 2}
          y2={TOWER.outcomeY + 6}
          stroke="var(--teal)"
          strokeWidth={1.5}
          strokeDasharray="4 5"
          opacity={0.65}
        />
      ) : (
        <motion.line
          x1={TOWER.baseX + TOWER.slabW / 2 + TOWER.depthDx / 2}
          y1={TOWER.move2Y + TOWER.depthDy}
          x2={TOWER.baseX + TOWER.slabW / 2 + TOWER.depthDx / 2}
          y2={TOWER.outcomeY + 6}
          stroke="var(--teal)"
          strokeWidth={1.5}
          strokeDasharray="4 5"
          opacity={0.65}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, ease, delay: delays.leader }}
        />
      )}
      {/* Arrowhead at the leader top */}
      <motion.polygon
        points={[
          [TOWER.baseX + TOWER.slabW / 2 + TOWER.depthDx / 2 - 5, TOWER.outcomeY + 12].join(','),
          [TOWER.baseX + TOWER.slabW / 2 + TOWER.depthDx / 2 + 5, TOWER.outcomeY + 12].join(','),
          [TOWER.baseX + TOWER.slabW / 2 + TOWER.depthDx / 2,     TOWER.outcomeY + 4].join(','),
        ].join(' ')}
        fill="var(--teal)"
        opacity={0.85}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.4, ease, delay: delays.leader + 0.45 }}
      />

      {/* Outcome platform — the cap on top of the tower, drawn as a
          smaller slab in the same projection, brightest fill. Carries
          the N=60 numeral. */}
      <Slab
        polys={slabPolygons(TOWER.outcomeY - 24, { baseX: TOWER.baseX + 24 })}
        tone={0.55}
        edge={1.0}
        scale={0.78}
        {...slabAnim(delays.outcome)}
      >
        <text
          x={TOWER.baseX + 24 + TOWER.slabW * 0.5}
          y={TOWER.outcomeY - 24 + TOWER.slabH * 0.5 + 4}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={16}
          letterSpacing="0.05em"
          fontWeight={800}
          fill="var(--bg)"
        >
          N = 60
        </text>
      </Slab>
    </svg>
  );
}

function Slab({ polys, tone = 0.2, edge = 0.6, children, initial, animate, transition, scale }) {
  // Single MotionGroup so the slide animation applies to the whole slab.
  // Scale is passed through to allow shrinking the outcome cap slab.
  return (
    <motion.g
      initial={initial}
      animate={animate}
      transition={transition}
      style={scale ? { transformBox: 'fill-box', transformOrigin: 'center', scale } : undefined}
    >
      <polygon points={polys.side} fill="var(--teal)" fillOpacity={tone * 0.55} stroke="var(--teal)" strokeOpacity={edge * 0.6} strokeWidth={1} />
      <polygon points={polys.front} fill="var(--teal)" fillOpacity={tone * 0.85} stroke="var(--teal)" strokeOpacity={edge} strokeWidth={1.2} />
      <polygon points={polys.top} fill="var(--teal)" fillOpacity={tone} stroke="var(--teal)" strokeOpacity={edge * 0.9} strokeWidth={1} />
      {children}
    </motion.g>
  );
}

function SlabLabel({ x, y, kicker, value }) {
  return (
    <g>
      <text
        x={x}
        y={y - 4}
        fontFamily="var(--font-mono)"
        fontSize={8.5}
        letterSpacing="0.22em"
        fontWeight={700}
        fill="var(--cream-faint)"
      >
        {kicker}
      </text>
      <text
        x={x}
        y={y + 9}
        fontFamily="var(--font-mono)"
        fontSize={11}
        letterSpacing="0.06em"
        fontWeight={700}
        fill="var(--cream)"
      >
        {value}
      </text>
    </g>
  );
}

/* ============================================================
   Right-column annotation rows — no card chrome. Each row is a
   left hairline rule + tight type stack. The hairline visually
   echoes the slab edge to its left.
   ============================================================ */

function MoveRow({ data, delay, reduced, ease }) {
  return (
    <motion.div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 14,
        alignItems: 'start',
        paddingTop: 'var(--space-2)',
        borderTop: '1px solid var(--cream-hairline)',
      }}
      initial={reduced ? false : { opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <span
        style={{
          width: 32,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-card-body)',
          fontWeight: 700,
          color: 'var(--teal)',
          letterSpacing: '0.04em',
        }}
      >
        {data.n}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--teal)',
            fontWeight: 700,
          }}
        >
          {data.kicker}
        </span>
        <span
          className="deck-display"
          style={{
            fontSize: 'var(--fs-card-title)',
            color: 'var(--cream)',
            lineHeight: 1.25,
            fontStyle: 'italic',
            fontWeight: 500,
            letterSpacing: 'var(--ls-headline)',
          }}
        >
          {data.title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            color: 'var(--cream-muted)',
            lineHeight: 1.4,
          }}
        >
          {data.method}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            color: 'var(--cream)',
            lineHeight: 1.4,
          }}
        >
          {data.anchor}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-tagline)',
            letterSpacing: '0.22em',
            color: 'var(--cream-faint)',
            fontWeight: 700,
            paddingTop: 2,
          }}
        >
          FDA precedent · {data.precedent}
        </span>
      </div>
    </motion.div>
  );
}

function BaselineRow({ data, delay, reduced, ease }) {
  return (
    <motion.div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 14,
        alignItems: 'baseline',
        paddingTop: 'var(--space-2)',
        borderTop: '1px solid var(--cream-hairline)',
      }}
      initial={reduced ? false : { opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          letterSpacing: '0.22em',
          color: 'var(--cream-faint)',
          fontWeight: 700,
          width: 96,
        }}
      >
        {data.label}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span
          className="deck-display"
          style={{
            fontSize: 'var(--fs-card-title)',
            color: 'var(--cream)',
            lineHeight: 1.25,
            fontWeight: 500,
            letterSpacing: 'var(--ls-headline)',
          }}
        >
          {data.title} ·{' '}
          <span style={{ color: 'var(--teal)', fontWeight: 700 }}>{data.n}</span>
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            color: 'var(--cream-muted)',
            lineHeight: 1.4,
          }}
        >
          {data.note}
        </span>
      </div>
    </motion.div>
  );
}

function OutcomeRow({ data, delay, reduced, ease }) {
  return (
    <motion.div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 14,
        alignItems: 'baseline',
        paddingBottom: 'var(--space-2)',
        borderBottom: '1px solid var(--teal)',
      }}
      initial={reduced ? false : { opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          letterSpacing: '0.22em',
          color: 'var(--teal)',
          fontWeight: 700,
          width: 96,
        }}
      >
        {data.label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
        <span
          className="deck-display"
          style={{
            fontSize: 'var(--fs-numeral-md, var(--fs-display-sm, 2.4rem))',
            color: 'var(--teal)',
            lineHeight: 1,
            fontWeight: 800,
            letterSpacing: '0.02em',
          }}
        >
          {data.n}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            color: 'var(--cream-muted)',
            lineHeight: 1.4,
          }}
        >
          {data.note}
        </span>
      </div>
    </motion.div>
  );
}
