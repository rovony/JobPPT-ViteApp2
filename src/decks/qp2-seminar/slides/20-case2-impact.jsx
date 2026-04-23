import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 20 · CS2 Impact — "Pre-approval study → Post-approval Phase 4 commitment"
 *
 * Layout:
 *   • Eyebrow + headline + subhead (left ~66%)
 *   • Approval stamp (right) — "CDSCO MA · 14 May 2025 · + Phase 4 commitment"
 *   • Timeline SVG (mid-band) — 6 milestone nodes MAA → MA with cyan active segment
 *     and "13.5 months" annotation.
 *   • Pre → Post pivot strip (bottom) — from "local clinical study" (struck) to
 *     "Phase 4 interventional commitment" (active), split by a cyan arcing arrow.
 */

const MILESTONES = [
  { x: 120,  date: '27 MAR 2024',    event: 'MAA submitted',        anchor: 'middle', big: false, first: true },
  { x: 360,  date: '7–8 AUG 2024',   event: 'First SEC engagement', anchor: 'middle' },
  { x: 640,  date: '10 DEC 2024',    event: 'Second SEC · PK/PD ask', anchor: 'middle' },
  { x: 880,  date: '27 JAN 2025',    event: 'Rationale response filed', anchor: 'middle' },
  { x: 1120, date: '26 MAR 2025',    event: 'CDSCO in-person',      anchor: 'middle' },
  { x: 1400, date: '14 MAY 2025',    event: 'CDSCO MA granted',     anchor: 'middle', big: true },
];

const SPINE_Y = 140;
const SPINE_X0 = 100;
const SPINE_X1 = 1560;
const ACTIVE_X0 = 120;
const ACTIVE_X1 = 1400;

export default function Slide20Case2Impact() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10,
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.70,
    approvalStamp: 2.40,
    spine: 0.90,
    activeLine: 1.40,
    nodeBase: 1.60,
    clock: 3.10,
    pivot: 3.40,
    arrow: 3.70,
    source: 4.10,
  };

  const T = useTokens(['--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline', '--cream-dim']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--cyan)" delay={D.eyebrow}>CS2 · The Impact</Eyebrow>
      <Headline delay={D.headline} maxChars={50}>
        Approved in India with{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 700 }}>
          zero Indian patients
        </span>{' '}
        pre-approval — paired with a{' '}
        <strong style={{ color: 'var(--cream)', fontWeight: 700 }}>
          Phase 4 interventional commitment
        </strong>
        .
      </Headline>
      <Subhead delay={D.subhead} maxChars={90}>
        13.5 months MAA → MA · second SEC asked for a local PK/PD study · the scientific rationale
        converted it into a post-approval commitment.
      </Subhead>

      <Viz>
        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 0 }}>
      {/* Approval stamp (top-right inside viz) */}
      <motion.div
        className="absolute"
        style={{
          top: 0,
          right: 0,
          width: 'min(420px, 40%)',
          textAlign: 'right',
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: D.approvalStamp }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: '0.66rem',
            letterSpacing: '0.26em',
            color: 'var(--cyan)',
            fontWeight: 700,
          }}
        >
          CDSCO Marketing Authorization
        </div>
        <div
          className="deck-display"
          style={{
            fontSize: 'clamp(2.6rem, 4.4vw, 4.6rem)',
            fontWeight: 800,
            color: 'var(--cream)',
            letterSpacing: '-0.03em',
            lineHeight: 0.96,
            marginTop: 4,
          }}
        >
          14 May 2025
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.78rem, 0.9vw, 0.95rem)',
            color: 'var(--cyan)',
            fontWeight: 500,
            marginTop: 6,
          }}
        >
          + Phase 4 interventional commitment
        </div>
      </motion.div>

      {/* Timeline */}
      <div
        className="absolute"
        style={{
          top: '18%',
          left: 0,
          right: 0,
          height: '45%',
        }}
      >
        <svg
          viewBox="0 0 1680 320"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          aria-label="CDSCO submission timeline — 6 milestones from MAA submission to Marketing Authorization"
        >
          {/* Spine (hairline full span) */}
          <motion.line
            x1={SPINE_X0} y1={SPINE_Y} x2={SPINE_X1} y2={SPINE_Y}
            stroke={tk('--cream-hairline')} strokeWidth={1.4}
            strokeDasharray={SPINE_X1 - SPINE_X0}
            initial={{ strokeDashoffset: SPINE_X1 - SPINE_X0 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.6, ease, delay: D.spine }}
          />
          {/* Active cyan segment MAA → MA */}
          <motion.line
            x1={ACTIVE_X0} y1={SPINE_Y} x2={ACTIVE_X1} y2={SPINE_Y}
            stroke={tk('--cyan')} strokeWidth={3} strokeLinecap="round"
            strokeDasharray={ACTIVE_X1 - ACTIVE_X0}
            initial={{ strokeDashoffset: ACTIVE_X1 - ACTIVE_X0 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.8, ease, delay: D.activeLine }}
          />

          {/* Milestones */}
          {MILESTONES.map((m, i) => (
            <Milestone
              key={i}
              m={m}
              tk={tk}
              delay={D.nodeBase + i * 0.32}
              labelDelay={D.nodeBase + 0.2 + i * 0.32}
            />
          ))}

          {/* 13.5 months clock annotation */}
          <motion.text
            x={(ACTIVE_X0 + ACTIVE_X1) / 2} y={260} textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="13"
            letterSpacing="0.22em" fill={tk('--cyan')} fontWeight={700}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.clock }}
          >
            MAA → MA · 13.5 MONTHS
          </motion.text>
          {/* Arrow-ended bracket under the clock */}
          <motion.path
            d={`M ${ACTIVE_X0} 230 L ${ACTIVE_X0} 240 L ${ACTIVE_X1} 240 L ${ACTIVE_X1} 230`}
            fill="none" stroke={tk('--cyan')} strokeWidth={1.2} opacity={0.55}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.5, ease, delay: D.clock }}
          />
        </svg>
      </div>

      {/* Pre → Post pivot strip */}
      <motion.div
        className="absolute"
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 80px 1fr',
          alignItems: 'stretch',
          gap: 0,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.pivot }}
      >
        {/* FROM — struck */}
        <div
          style={{
            padding: '14px 28px 14px 0',
            textAlign: 'right',
            borderTop: '1px solid var(--cream-hairline)',
          }}
        >
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: '0.66rem',
              letterSpacing: '0.24em',
              color: 'var(--cream-faint)',
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            From · Pre-approval requirement
          </div>
          <div
            className="deck-display italic"
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.4rem)',
              lineHeight: 1.18,
              color: 'var(--cream-faint)',
              fontWeight: 600,
              textDecoration: 'line-through',
              textDecorationColor: 'var(--cream-dim)',
              textDecorationThickness: '1.5px',
            }}
          >
            Local clinical study in Indian patients before approval.
          </div>
          <div
            style={{
              marginTop: 8,
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.76rem, 0.88vw, 0.92rem)',
              lineHeight: 1.4,
              color: 'var(--cream-faint)',
            }}
          >
            Efficacy · safety · PK/PD · all three domains, before MA. Patients wait 12–18 months
            minimum for access.
          </div>
        </div>

        {/* Arc arrow */}
        <PivotArrow tk={tk} delay={D.arrow} />

        {/* TO — active */}
        <div
          style={{
            padding: '14px 0 14px 28px',
            textAlign: 'left',
            borderTop: '2px solid var(--cyan)',
          }}
        >
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: '0.66rem',
              letterSpacing: '0.24em',
              color: 'var(--cyan)',
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            To · Post-approval commitment
          </div>
          <div
            className="deck-display italic"
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.4rem)',
              lineHeight: 1.18,
              color: 'var(--cream)',
              fontWeight: 600,
            }}
          >
            Phase 4 interventional study — prospectively in Indian patients.
          </div>
          <div
            style={{
              marginTop: 8,
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.76rem, 0.88vw, 0.92rem)',
              lineHeight: 1.4,
              color: 'var(--cream-muted)',
            }}
          >
            All three domains collected in parallel with access. Approval: 14 May 2025. Patients
            access now.
          </div>
        </div>
      </motion.div>

        </div>
      </Viz>

      <Footer
        kicker="Case 02 · The impact"
        tagline="Source · CS2 Reading Pts 2–3 · CDSCO timeline"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   Milestone — node + date (above) + event (below)
   Big milestone (approval) gets a larger filled dot + halo ring.
   ======================================================== */
function Milestone({ m, tk, delay, labelDelay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const overshoot = [0.34, 1.56, 0.64, 1];

  return (
    <g>
      {/* Node */}
      {m.big ? (
        <>
          <motion.circle
            cx={m.x} cy={SPINE_Y} r={26}
            fill="none" stroke={tk('--cyan')} strokeWidth={1.4} opacity={0.55}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.55, scale: 1 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            transition={{ duration: 0.6, ease: overshoot, delay }}
          />
          <motion.circle
            cx={m.x} cy={SPINE_Y} r={14}
            fill={tk('--cyan')} stroke="var(--bg)" strokeWidth={3}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            transition={{ duration: 0.5, ease: overshoot, delay }}
          />
        </>
      ) : (
        <motion.circle
          cx={m.x} cy={SPINE_Y} r={m.first ? 9 : 7}
          fill={m.first ? tk('--cyan') : 'var(--bg)'}
          stroke={tk('--cyan')} strokeWidth={m.first ? 3 : 2.4}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          transition={{ duration: 0.5, ease: overshoot, delay }}
        />
      )}

      {/* Date (above) */}
      <motion.text
        x={m.x} y={SPINE_Y - 36} textAnchor={m.anchor}
        fontFamily="var(--font-mono)" fontSize="12"
        letterSpacing="0.14em"
        fill={m.big ? tk('--cyan') : tk('--cream-faint')}
        fontWeight={m.big ? 700 : 500}
        initial={{ opacity: 0, y: SPINE_Y - 30 }}
        animate={{ opacity: 1, y: SPINE_Y - 36 }}
        transition={{ duration: 0.5, ease, delay: labelDelay }}
      >
        {m.date}
      </motion.text>

      {/* Event (below) */}
      <motion.text
        x={m.x} y={SPINE_Y + 38} textAnchor={m.anchor}
        fontFamily="var(--font-body)"
        fontSize={m.big ? 17 : 14}
        fontWeight={m.big ? 700 : 500}
        fill={m.big ? tk('--cyan') : tk('--cream')}
        initial={{ opacity: 0, y: SPINE_Y + 32 }}
        animate={{ opacity: 1, y: SPINE_Y + 38 }}
        transition={{ duration: 0.5, ease, delay: labelDelay }}
      >
        {m.event}
      </motion.text>
      {m.big && (
        <motion.text
          x={m.x} y={SPINE_Y + 60} textAnchor="middle"
          fontFamily="var(--font-body)" fontSize="12"
          fill={tk('--cream-muted')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: labelDelay + 0.15 }}
        >
          launch 5 Jun 2025
        </motion.text>
      )}
    </g>
  );
}

/* ========================================================
   PivotArrow — rising cyan arc with arrowhead
   ======================================================== */
function PivotArrow({ tk, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg viewBox="0 0 72 72" width={64} height={64} style={{ overflow: 'visible' }} aria-hidden>
        <motion.path
          d="M 8,58 C 20,10 52,10 64,34"
          fill="none" stroke={tk('--cyan')} strokeWidth={2.4} strokeLinecap="round"
          strokeDasharray={180}
          initial={{ strokeDashoffset: 180 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.0, ease, delay }}
        />
        <motion.polygon
          points="64,34 55,29 59,41"
          fill={tk('--cyan')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease, delay: delay + 0.9 }}
        />
      </svg>
    </div>
  );
}