// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import SwayGroup from './03-career-arc/SwayGroup';
import SatelliteDrawer from './03-career-arc/SatelliteDrawer';

/**
 * Slide 03 · Career arc — "Spine + Satellites" hybrid network.
 *
 * Lifted from qp2-seminar-v2/slides/03-career-arc.jsx (2026-04-25) per
 * user direction. The pre-lift v3-R2 stub (5 hubs on a flat horizontal
 * spine, no satellites, no drawer) is preserved at
 * _backup/03-career-arc.pre-v2-lift.jsx.
 *
 * What this composition does:
 *   - Five HUBS along an ascending curved amber spine (Jordan → Minnesota
 *     → Merck QP2 → GSK → Servier). Spine animates left-to-right.
 *   - Each hub fans 1–6 SATELLITE work-items at angles + distances, with
 *     hub-anchored sway animation (SwayGroup wraps each satellite group).
 *   - Servier is the HERO hub (coral, larger, pulsing halo). Merck QP2
 *     is a SIDE hub (transparent, dashed cream stroke).
 *   - Satellites are clickable; the SatelliteDrawer side-sheet opens
 *     with detailed achievements + metrics keyed by `${hubKey}:${label}`.
 *
 * Aspect / fit:
 *   - SVG viewBox 2000×600 (~3.3:1) with preserveAspectRatio="xMidYMid
 *     meet" so labels can overflow the visible cell without clipping
 *     the spine geometry.
 *   - data-case="amber" — cross-case slide; --case cascade defaults to
 *     amber, with --coral as the hero accent for the Servier hub.
 *
 * Patterns honored (per CLAUDE.md):
 *   - SlideGrid + STANDARD_AREAS (overlap-proof)
 *   - useReducedMotion via window.matchMedia (matches v2 pattern)
 *   - SVG `font-size` attributes are NOT subject to the fluid-token
 *     contract (that contract applies to CSS fontSize, not SVG attrs)
 */

// ── SVG coordinate space (scaled by preserveAspectRatio) ──
// Aspect ~3.3:1 — wider than the viz cell so `meet` scales by
// width. The viz cell in-flow is ~1fr (short after chrome/headline/
// subhead/footer eat their auto rows), so we need a flat VB to
// guarantee horizontal fill. Satellite labels overflow visible.
const VB_W = 2000;
const VB_H = 600;

// ── Hubs along an ascending curve ──
const HUBS = [
  {
    key: 'jordan',
    name: 'Jordan',
    tag: 'BDS · 2004–2010',
    cx: 220, cy: 480, r: 30,
    satellites: [
      { label: 'Dental surgery',            angle: 215, dist: 95 },
      { label: 'Clinical license',          angle: 165, dist: 100 },
      { label: 'Bedside dosing decisions',  angle: 265, dist: 90 },
    ],
  },
  {
    key: 'minnesota',
    name: 'Minnesota',
    tag: 'PhD · 2012–2015',
    cx: 560, cy: 380, r: 36,
    satellites: [
      { label: 'NLME',              angle: 165, dist: 100 },
      { label: 'EHC dissertation',  angle: 205, dist: 110 },
      { label: 'ECP Fellowship',    angle: 255, dist: 95  },
      { label: 'Brundage lab',      angle: 115, dist: 150 },
      { label: '3 research awards', angle: 60,  dist: 155 },
    ],
  },
  {
    key: 'merck',
    name: 'Merck · QP2',
    tag: 'Intern · 2014',
    cx: 960, cy: 300, r: 24,
    side: true,
    satellites: [
      { label: 'NLME simulation · trial-design inputs', angle: 230, dist: 95 },
    ],
  },
  {
    key: 'gsk',
    name: 'GSK',
    tag: 'Manager · 2015–2022',
    cx: 1380, cy: 210, r: 40,
    satellites: [
      { label: '5 TAs',                        angle: 145, dist: 110 },
      { label: '4 approvals · during tenure',  angle: 195, dist: 125 },
      { label: '5 agencies · ambrisentan peds',angle: 245, dist: 115 },
      { label: 'Ambrisentan peds',             angle: 30,  dist: 115 },
      { label: 'Top 10% Award 2019',           angle: 85,  dist: 160 },
      { label: 'Clin Pharm M&S',               angle: 300, dist: 95  },
    ],
  },
  {
    key: 'servier',
    name: 'Servier',
    tag: 'Director · Since 2022',
    cx: 1830, cy: 120, r: 52,
    hero: true,
    satellites: [
      { label: 'Oncology · solid',        angle: 150, dist: 120 },
      { label: 'Oncology · heme',         angle: 200, dist: 130 },
      { label: '3 approvals',             angle: 250, dist: 115 },
      { label: 'Asparlas adult design',   angle: 90,  dist: 180 },
      { label: 'Ivosidenib · India',      angle: 305, dist: 125 },
    ],
  },
];

function buildSpinePath() {
  const pts = HUBS.map((h) => ({ x: h.cx, y: h.cy }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    const dx = (b.x - a.x) * 0.5;
    d += ` C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
  }
  return d;
}

function satelliteXY(hub, sat) {
  const rad = (sat.angle * Math.PI) / 180;
  return {
    x: hub.cx + Math.cos(rad) * sat.dist,
    y: hub.cy + Math.sin(rad) * sat.dist,
  };
}

export default function CareerArc() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const ease = [0.16, 1, 0.3, 1];

  const D = reduced
    ? { spine: 0, hubBase: 0, hubStep: 0, satBase: 0, satStep: 0 }
    : {
        spine:    0.75,
        hubBase:  1.55,
        hubStep:  0.12,
        satBase:  1.80,
        satStep:  0.03,
      };
  const spineDur = reduced ? 0.01 : 1.20;

  const T = useTokens([
    '--amber', '--coral', '--cream', '--cream-muted', '--cream-faint',
    '--cream-hairline', '--cream-ghost', '--bg',
  ]);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  const spineD = buildSpinePath();
  const spineLen = 2400;

  const [selection, setSelection] = useState(null);
  const selectedHub = selection ? HUBS.find((h) => h.key === selection.hubKey) : null;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={0.10}>
        The lens I bring to the cases
      </Eyebrow>

      <Headline delay={0.25} maxChars={34}>
        Five stops,{' '}
        <span style={{ color: 'var(--cream)', fontStyle: 'normal', fontWeight: 700 }}>
          one question.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        Each hub is an institution; each satellite is the work. One spine —
        clinic to leadership, through quantitative pharmacology.
      </Subhead>

      <Viz style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
          aria-label="Career network — five institution hubs linked by an ascending amber spine, each surrounded by satellite nodes representing specific work."
        >
          {/* Career spine — animated draw */}
          <motion.path
            d={spineD}
            fill="none"
            stroke={tk('--amber')}
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeDasharray={spineLen}
            opacity={0.85}
            initial={{ strokeDashoffset: spineLen }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: spineDur, ease, delay: D.spine }}
          />
          {/* Soft amber halo behind the spine */}
          <path
            d={spineD}
            fill="none"
            stroke={tk('--amber')}
            strokeWidth={10}
            strokeLinecap="round"
            opacity={0.08}
          />

          {HUBS.map((hub, hi) => {
            const hubDelay = D.hubBase + hi * D.hubStep;
            const satDelay = D.satBase + hi * D.hubStep;
            const hubColor = hub.hero ? tk('--coral') : hub.side ? tk('--cream-muted') : tk('--amber');
            const hubFill  = hub.hero ? tk('--coral') : hub.side ? 'transparent' : tk('--amber');
            const hubFillOp = hub.hero ? 1 : hub.side ? 0 : 0.18;

            return (
              <g key={hub.key}>
                {hub.satellites.map((sat, si) => {
                  const p = satelliteXY(hub, sat);
                  const perSat = satDelay + si * D.satStep;
                  const rightSide = p.x > hub.cx;
                  // Tree-branch sway — gentle, hub-anchored.
                  const swayAmp = 2.4 + ((hi + si) % 3) * 0.5;
                  const swayPeriod = 11 + ((hi * 7 + si * 3) % 5) * 0.7;
                  const swayDelay = perSat + 0.8 + ((si % 4) * 0.45);
                  return (
                    <SwayGroup
                      key={si}
                      px={hub.cx}
                      py={hub.cy}
                      amplitude={swayAmp}
                      period={swayPeriod}
                      delay={swayDelay}
                      disabled={reduced}
                    >
                      <g
                        role="button"
                        tabIndex={0}
                        aria-label={`${hub.name} · ${sat.label} — open details`}
                        onClick={() => setSelection({ hubKey: hub.key, label: sat.label })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelection({ hubKey: hub.key, label: sat.label });
                          }
                        }}
                        style={{ cursor: 'pointer', outline: 'none' }}
                        className="sat-hit"
                      >
                        <motion.line
                          x1={hub.cx} y1={hub.cy} x2={p.x} y2={p.y}
                          stroke={hub.hero ? tk('--coral') : tk('--cream-hairline')}
                          strokeWidth={1}
                          opacity={hub.hero ? 0.5 : 0.6}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: hub.hero ? 0.5 : 0.6 }}
                          transition={{ duration: 0.5, ease, delay: perSat }}
                        />
                        {/* Invisible hit-target — generous radius for mouse + touch. */}
                        <circle
                          cx={p.x} cy={p.y} r={22}
                          fill="transparent"
                          pointerEvents="all"
                        />
                        <motion.circle
                          cx={p.x} cy={p.y}
                          r={hub.hero ? 5 : 4}
                          fill={hub.hero ? tk('--coral') : tk('--cream-muted')}
                          fillOpacity={hub.hero ? 0.9 : 0.7}
                          stroke={tk('--bg')}
                          strokeWidth={1.2}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: perSat + 0.25 }}
                          className="sat-dot"
                          style={{ transition: 'r 160ms ease, fill-opacity 160ms ease' }}
                        />
                        <motion.text
                          x={p.x + (rightSide ? 11 : -11)}
                          y={p.y + 5}
                          textAnchor={rightSide ? 'start' : 'end'}
                          fontFamily="var(--font-body)"
                          fontSize={17}
                          fill={hub.hero ? tk('--cream') : tk('--cream-muted')}
                          fontWeight={hub.hero ? 500 : 400}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, ease, delay: perSat + 0.35 }}
                          className="hidden sm:block sat-label"
                          style={{ transition: 'fill 160ms ease' }}
                        >
                          {sat.label}
                        </motion.text>
                      </g>
                    </SwayGroup>
                  );
                })}

                {hub.hero && (
                  <motion.circle
                    cx={hub.cx} cy={hub.cy} r={hub.r + 10}
                    fill="none"
                    stroke={tk('--coral')}
                    strokeWidth={1.4}
                    opacity={0.3}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 0.6, ease, delay: hubDelay + 0.3 }}
                  />
                )}

                <motion.circle
                  cx={hub.cx} cy={hub.cy} r={hub.r}
                  fill={hubFill}
                  fillOpacity={hubFillOp}
                  stroke={hubColor}
                  strokeWidth={hub.hero ? 3 : hub.side ? 1.5 : 2.2}
                  strokeDasharray={hub.side ? '4 4' : undefined}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: hubDelay }}
                />

                <motion.g
                  transform={`translate(0, ${hub.cy + hub.r + 26})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: hubDelay + 0.25 }}
                >
                  <text
                    x={hub.cx} y={0}
                    textAnchor="middle"
                    fontFamily="var(--font-display)"
                    fontSize={hub.hero ? 36 : hub.side ? 25 : 30}
                    fontWeight={hub.hero ? 700 : 600}
                    letterSpacing="-0.02em"
                    fill={hub.hero ? tk('--coral') : tk('--cream')}
                  >
                    {hub.name}
                  </text>
                  <text
                    x={hub.cx} y={28}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize={15}
                    fontWeight={600}
                    letterSpacing="0.16em"
                    fill={tk('--cream-muted')}
                  >
                    {hub.tag.toUpperCase()}
                  </text>
                </motion.g>
              </g>
            );
          })}
        </svg>
      </Viz>

      <Footer
        delay={2.6}
        kicker="Four countries · three sponsors · one discipline"
        tagline={
          <>
            The discipline hasn&apos;t changed. The question hasn&apos;t either —{' '}
            <em style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
              what dose, for whom, why?
            </em>
          </>
        }
      />

      <SatelliteDrawer
        open={!!selection}
        onOpenChange={(v) => { if (!v) setSelection(null); }}
        selection={selection}
        hub={selectedHub}
      />

      <style>{`
        .sat-hit:hover .sat-dot { r: 7; fill-opacity: 1; }
        .sat-hit:hover .sat-label { fill: var(--cream); font-weight: 600; }
        .sat-hit:focus-visible .sat-dot { r: 7; fill-opacity: 1; }
      `}</style>
    </SlideGrid>
  );
}
