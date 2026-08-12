// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import ConclusionBar from '../../components/cs1/ConclusionBar';

/**
 * Slide · CS2 Strategy — Two innovations stacked.
 *
 * Isometric tower (foundation → move1 → move2 → N=60) + right-column prose.
 * Light-editorial: solid text, delays ≤0.35s, hairline panels, no glow.
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

const EASE = [0.2, 0.7, 0.3, 1];
const D = {
  eyebrow: 0.08,
  headline: 0.14,
  subhead: 0.22,
  baseline: 0.24,
  move1: 0.28,
  move2: 0.32,
  leader: 0.32,
  outcome: 0.35,
  takeaway: 0.35,
  source: 0.35,
};

export default function Cs2AspStrategy() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="teal" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--teal)" delay={D.eyebrow}>CS2 · Strategy</Eyebrow>
      <SolidHeadline delay={D.headline} maxChars={48}>
        Two innovations,{' '}
        <span style={{ color: 'var(--teal)', fontStyle: 'italic', fontWeight: 700 }}>
          individually precedented
        </span>{' '}
        — stacked for adult oncology.
      </SolidHeadline>
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
            gridTemplateRows: 'minmax(0, 1fr) auto',
            columnGap: 'clamp(20px, 3vw, 56px)',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
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
            <StackTower delays={D} reduced={reduced} ease={EASE} />
          </div>

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
            <OutcomeRow data={CASE.outcome} delay={D.outcome} reduced={reduced} />
            <MoveRow data={CASE.move2} delay={D.move2} reduced={reduced} />
            <MoveRow data={CASE.move1} delay={D.move1} reduced={reduced} />
            <BaselineRow data={CASE.baseline} delay={D.baseline} reduced={reduced} />
          </div>

          <div style={{ gridColumn: '1 / -1', gridRow: 2 }}>
            <ConclusionBar accent="var(--teal)">
              PK-precision sample size{' '}
              <span style={{ color: 'var(--teal)', fontWeight: 700 }}>+</span>{' '}
              informative pediatric prior — two FDA precedents combined for the first time in this
              clinical context, returning the same evidence quality at a smaller sample.
            </ConclusionBar>
          </div>
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

const TOWER = {
  viewBox: '0 0 400 520',
  slabW: 230,
  slabH: 28,
  depthDx: 76,
  depthDy: -44,
  baseX: 60,
  baselineY: 380,
  move1Y: 310,
  move2Y: 240,
  outcomeY: 150,
};

function slabPolygons(yTop, opts = {}) {
  const { slabW, slabH, depthDx, depthDy, baseX } = TOWER;
  const x0 = opts.baseX ?? baseX;
  const top = [
    [x0, yTop],
    [x0 + slabW, yTop],
    [x0 + slabW + depthDx, yTop + depthDy],
    [x0 + depthDx, yTop + depthDy],
  ];
  const front = [
    [x0, yTop],
    [x0 + slabW, yTop],
    [x0 + slabW, yTop + slabH],
    [x0, yTop + slabH],
  ];
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
  const move1 = slabPolygons(TOWER.move1Y);
  const move2 = slabPolygons(TOWER.move2Y);

  // Translate-only — never opacity-gate slab labels (presentation safety).
  const slabAnim = (delay) =>
    reduced
      ? { initial: false, animate: { y: 0 } }
      : {
          initial: { y: 10 },
          animate: { y: 0 },
          transition: { duration: 0.3, ease, delay },
        };

  return (
    <svg
      viewBox={TOWER.viewBox}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      aria-label="Isometric tower: baseline N=94 at the foundation, with D-optimal design and informative prior stacked on top, producing N=60"
      role="img"
    >
      <line
        x1={TOWER.baseX - 14}
        y1={TOWER.baselineY + TOWER.slabH + 18}
        x2={TOWER.baseX + TOWER.slabW + TOWER.depthDx + 14}
        y2={TOWER.baselineY + TOWER.slabH + TOWER.depthDy + 18}
        stroke="var(--cream-hairline)"
        strokeWidth={1}
        strokeDasharray="3 6"
      />

      <Slab polys={baseline} tone={0.10} edge={0.42} {...slabAnim(delays.baseline)}>
        <SlabLabel x={TOWER.baseX + 14} y={baseline.yMid} kicker="BASELINE" value="N = 94" />
      </Slab>
      <Slab polys={move1} tone={0.20} edge={0.65} {...slabAnim(delays.move1)}>
        <SlabLabel x={TOWER.baseX + 14} y={move1.yMid} kicker="MOVE 01" value="D-OPTIMAL DESIGN" />
      </Slab>
      <Slab polys={move2} tone={0.34} edge={1.00} {...slabAnim(delays.move2)}>
        <SlabLabel x={TOWER.baseX + 14} y={move2.yMid} kicker="MOVE 02" value="INFORMATIVE PRIOR" />
      </Slab>

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
          transition={{ duration: 0.35, ease, delay: delays.leader }}
        />
      )}
      <polygon
        points={[
          [TOWER.baseX + TOWER.slabW / 2 + TOWER.depthDx / 2 - 5, TOWER.outcomeY + 12].join(','),
          [TOWER.baseX + TOWER.slabW / 2 + TOWER.depthDx / 2 + 5, TOWER.outcomeY + 12].join(','),
          [TOWER.baseX + TOWER.slabW / 2 + TOWER.depthDx / 2, TOWER.outcomeY + 4].join(','),
        ].join(' ')}
        fill="var(--teal)"
        opacity={0.85}
      />

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
          letterSpacing="0.04em"
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
        letterSpacing="0.04em"
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
        letterSpacing="0.04em"
        fontWeight={700}
        fill="var(--cream)"
      >
        {value}
      </text>
    </g>
  );
}

function MoveRow({ data, delay, reduced }) {
  return (
    <motion.div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 14,
        alignItems: 'start',
        paddingTop: 'var(--space-3)',
        borderTop: '1px solid var(--cream-hairline)',
      }}
      initial={reduced ? false : { x: 6 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.28, ease: EASE, delay: reduced ? 0 : delay }}
    >
      <span
        style={{
          width: 32,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-card-body)',
          fontWeight: 700,
          color: 'var(--teal)',
          letterSpacing: '0.02em',
        }}
      >
        {data.n}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono)',
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
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-card-body)', color: 'var(--cream-muted)', lineHeight: 1.4 }}>
          {data.method}
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-card-body)', color: 'var(--cream)', lineHeight: 1.4 }}>
          {data.anchor}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-tagline)',
            letterSpacing: 'var(--ls-mono)',
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

function BaselineRow({ data, delay, reduced }) {
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
      initial={reduced ? false : { x: 6 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.28, ease: EASE, delay: reduced ? 0 : delay }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
          fontWeight: 700,
          width: 96,
        }}
      >
        {data.label}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
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
          {data.title} · <span style={{ color: 'var(--teal)', fontWeight: 700 }}>{data.n}</span>
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-card-body)', color: 'var(--cream-muted)', lineHeight: 1.4 }}>
          {data.note}
        </span>
      </div>
    </motion.div>
  );
}

function OutcomeRow({ data, delay, reduced }) {
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
      initial={reduced ? false : { x: 6 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.28, ease: EASE, delay: reduced ? 0 : delay }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          letterSpacing: 'var(--ls-mono)',
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
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-card-body)', color: 'var(--cream-muted)', lineHeight: 1.4 }}>
          {data.note}
        </span>
      </div>
    </motion.div>
  );
}
