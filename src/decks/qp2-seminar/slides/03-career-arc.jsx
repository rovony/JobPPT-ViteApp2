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
 * Migrated to SlideGrid — the layout is now a 12-col × 8-row grid with
 * named areas. Slots cannot overlap because CSS Grid enforces cell
 * boundaries. The old absolute-positioned `top: Xvh` soup is gone.
 *
 * Grid plan:
 *   row 1 (auto)  chrome:  eyebrow · · · top-right
 *   row 2 (auto)  headline
 *   row 3 (auto)  subhead
 *   row 4 (1fr)   viz (the SVG network fills whatever's left)
 *   row 5 (auto)  footer tagline
 *   row 6 (auto)  page number
 *
 * The SVG network still uses absolute positioning INSIDE its viz cell —
 * that's fine because nothing else can enter that cell.
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
    // Pulled right (cx 140→220) and satellites fanned downward+right so
    // their labels stay inside the viewBox. Previously labels at angles
    // 150–250° overflowed past x=0.
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
    // Bottom-arc satellites (angles 60°, 115°) pushed farther out so
    // their labels clear the "Minnesota / PHD · 2012–2015" hub label
    // block (which sits ~36–76px below hub center).
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
    // Bottom-arc satellite ("Top 10% Award" at 85°) pushed out so it
    // clears the "GSK / MANAGER · 2015–2022" hub label block.
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
    // Bottom-arc satellite ("Asparlas adult design" at 90°) pushed out
    // so it clears the "Servier / DIRECTOR · SINCE 2022" hub label block.
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

export default function Slide03CareerArc() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const ease = [0.16, 1, 0.3, 1];
  const overshoot = [0.34, 1.56, 0.64, 1];

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
        Framework · Career arc
      </Eyebrow>

      <Headline delay={0.25} maxChars={34}>
        A network that compounds —{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
          five stops, one discipline.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        Each hub is an institution; each satellite is the work. The spine is the continuum —
        clinic to leadership, through quantitative pharmacology.
      </Subhead>

      <Viz style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
          aria-label="Career network — five institution hubs linked by an ascending amber spine, each surrounded by satellite nodes representing specific work."
        >
          {/* defs/filter removed (Brief §10, audit P4) — the s3-glow
              feGaussianBlur was purely decorative chartjunk. The spine
              still reads cleanly as a 3.5px amber stroke at 0.85
              opacity, and the hero-hub `filter="url(#s3-glow)"` has
              also been dropped (those nodes still pop via the larger
              radius + amber fill). */}

          {/* Career spine */}
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
                  // Tree-branch sway — SwayGroup drives the SVG `transform`
                  // attribute directly via rAF, rotating children around
                  // (hub.cx, hub.cy). Each satellite gets its own period +
                  // phase so they don't sway in lockstep.
                  // Slower sway — roughly half the previous speed for a
                  // gentler "tree in a breeze" feel. Period range bumped
                  // from ~5.5–8.3s to ~11–14.5s.
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
                        {/* Invisible hit-target — generous radius so the node
                            and its label are both easy to click/tap. */}
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
                  /* filter dropped — the s3-glow filter was removed */
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
        tagline="Model-informed decisions, end-to-end."
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