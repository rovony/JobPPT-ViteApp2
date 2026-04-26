import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * ApprovalTimeline — shared-element timeline across slides 7 (challenge)
 * and 13 (impact). Matches the LungsShared pattern:
 *   - layoutId prop, default "approval-timeline"
 *   - layout prop on the inner motion.div
 *   - variant-specific DIMENSIONS (same aspect ratio across variants)
 *   - cubic-bezier 1.8s layout transition (ceremonial payoff)
 *   - variant="silence" plays entrance on first mount
 *   - variant="closed" uses initial={false}; layoutId morph IS the arrival
 *   - first-mount tracked per layoutId in a module-level Set so return
 *     visits (7 → 13 → 7) don't re-run the entrance chain
 *   - reduced-motion handled via scoped CSS @media block
 *
 * variant="silence" (slide 7):
 *   Adult track: FDA 2007 · EMA 2008 · PMDA 2010 — solid approval dots
 *   with two-line labels (agency top, year bottom — no horizontal overlap).
 *   Pediatric track: dashed coral 2007 → 2021 with amber italic
 *   "19 YEARS OF PEDIATRIC SILENCE" beneath.
 *
 * variant="closed" (slide 13):
 *   Adult track: identical.
 *   Pediatric track: solid coral 2007 → 2025 with amber mono
 *   "PMDA APR 2021 · EMA SEP 2021" label at 2021. Silence has CLOSED.
 */

// Module-level tracker: first time this layoutId mounts anywhere in the
// app, we play the entrance chain. Subsequent mounts (morph targets,
// return visits) skip it and start at final state. Keyed by layoutId so
// multiple ApprovalTimeline instances with different layoutIds are
// independent.
const MOUNTED_LAYOUT_IDS = new Set();

const YEAR_MIN = 2005;
const YEAR_MAX = 2026;

const APPROVALS_ADULT = [
  { agency: 'FDA', year: 2007 },
  { agency: 'EMA', year: 2008 },
  { agency: 'PMDA', year: 2010 },
];

const APPROVALS_PEDS = [
  { agency: 'PMDA', year: 2021, labelMonth: 'APR' },
  { agency: 'EMA', year: 2021, labelMonth: 'SEP' },
];

// 1.8s matches LungsShared. This is the case's editorial payoff — the
// silence closing up across a six-slide journey — so it earns the long
// curve. Any shorter feels like a swap; any longer feels slack.
const LAYOUT_TRANSITION = { duration: 1.8, ease: [0.4, 0, 0.2, 1] };

const DIMENSIONS = {
  silence: { width: '100%', aspectRatio: '900 / 140' },
  closed:  { width: '100%', aspectRatio: '900 / 140' },
};

export default function ApprovalTimeline({
  variant = 'silence',
  layoutId = 'approval-timeline',
  delay = 0,
}) {
  // First-mount detection. useRef resolves ONCE per instance at render
  // time (not in effect), so even the very first render knows it's first.
  // The effect writes back into the Set so future instances for the same
  // layoutId see isFirstMount === false.
  const firstMountRef = useRef(null);
  if (firstMountRef.current === null) {
    firstMountRef.current = !MOUNTED_LAYOUT_IDS.has(layoutId);
  }
  const isFirstMount = firstMountRef.current;

  useEffect(() => {
    MOUNTED_LAYOUT_IDS.add(layoutId);
  }, [layoutId]);

  // Entrance chain (axis draw, adult scale-in, peds pathLength, amber
  // fade-in) runs when AND ONLY WHEN:
  //   (a) first mount for this layoutId, AND
  //   (b) variant === "silence"
  //
  // Case matrix:
  //   - Fresh slide-7 visit:       firstMount=true,  variant=silence → FULL CHAIN
  //   - Slide-13 via morph 7→13:   firstMount=false, variant=closed  → skip (layoutId morph)
  //   - Slide-13 via direct link:  firstMount=true,  variant=closed  → 0.5s outer opacity fade, skip chain
  //   - Slide-7 return 13→7:       firstMount=false, variant=silence → skip (morph handles motion)
  const runEntrance = isFirstMount && variant === 'silence';
  const fadeOnce   = isFirstMount && variant === 'closed';
  const isClosed   = variant === 'closed';

  const W = 900;
  const H = 140;
  // m.l bumped 60 → 88 so the left-side "PEDIATRIC" track label (9.5px
  // mono, letter-spacing 0.22em ≈ 72px wide) fits with 8px clearance.
  const m = { t: 20, r: 60, b: 20, l: 88 };
  const iw = W - m.l - m.r; // 752

  const x = (yr) => m.l + ((yr - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * iw;

  // Two-line adult labels — stacked vertically to eliminate FDA/EMA/PMDA
  // horizontal overlap. Agency sits at yAdultAgency, year below it at
  // yAdultYear. Width per label drops from ~66-73px to ~26px.
  const yAdultAgency = m.t + 4;
  const yAdultYear   = m.t + 18;
  const yAdultTrack  = m.t + 32;
  const yAxis        = m.t + 60;
  const yPediTrack   = m.t + 80;
  const yAmberLabel  = m.t + 104;

  const TICKS = [2005, 2010, 2015, 2020, 2025];

  const coral      = 'var(--coral, #FB923C)';
  const amber      = 'var(--amber, #FFE14D)';
  const cream      = 'var(--cream, #D7D4CC)';
  const creamMuted = 'var(--cream-muted, rgba(215,212,204,0.62))';
  const creamFaint = 'var(--cream-faint, rgba(215,212,204,0.38))';
  const hairline   = 'var(--cream-hairline, rgba(215,212,204,0.14))';

  const pediStart       = x(2007);
  const pediSilenceEnd  = x(2021);
  const pediTrackEnd    = x(YEAR_MAX);

  const dims = DIMENSIONS[variant] || DIMENSIONS.silence;

  // Outer motion.div entrance gating.
  //   runEntrance → children handle their own entrance chain, outer stays quiet
  //   fadeOnce    → 0.5s whole-SVG opacity fade (direct-link to slide 13)
  //   else (morph arrival) → initial={false}, layoutId handles motion
  const outerMotion = fadeOnce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { layout: LAYOUT_TRANSITION, opacity: { duration: 0.5 } },
      }
    : {
        initial: false,
        transition: { layout: LAYOUT_TRANSITION },
      };

  return (
    <motion.div
      layoutId={layoutId}
      layout
      {...outerMotion}
      className="approval-timeline"
      style={{
        width: dims.width,
        aspectRatio: dims.aspectRatio,
        position: 'relative',
      }}
      aria-label={`Ambrisentan approval timeline — ${variant}`}
    >
      <style>{SCOPED_CSS}</style>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {/* ─── Axis + year ticks ─── */}
        <motion.line
          x1={m.l} y1={yAxis} x2={W - m.r} y2={yAxis}
          stroke={hairline} strokeWidth={1}
          initial={runEntrance ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: runEntrance ? 0.5 : 0,
            delay: runEntrance ? delay + 0.1 : 0,
          }}
        />
        {TICKS.map((yr) => (
          <g key={yr}>
            <line x1={x(yr)} y1={yAxis - 3} x2={x(yr)} y2={yAxis + 3}
                  stroke={hairline} strokeWidth={1} />
            <text x={x(yr)} y={yAxis + 14} textAnchor="middle"
                  fontFamily="var(--font-mono)" fontSize="10" fill={creamFaint}>
              {yr}
            </text>
          </g>
        ))}

        {/* ─── Adult track: two-line labels + leader + dot ─── */}
        {APPROVALS_ADULT.map((a, i) => (
          <g key={`adult-${a.agency}`}>
            <motion.line
              x1={x(a.year)} y1={yAdultTrack + 5}
              x2={x(a.year)} y2={yAxis}
              stroke={coral} strokeWidth={1}
              initial={runEntrance ? { opacity: 0 } : { opacity: 0.5 }}
              animate={{ opacity: 0.5 }}
              transition={{
                duration: runEntrance ? 0.3 : 0,
                delay: runEntrance ? delay + 0.45 + i * 0.1 : 0,
              }}
            />
            <motion.circle
              cx={x(a.year)} cy={yAdultTrack + 5} r={4}
              fill={coral}
              initial={runEntrance ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: runEntrance ? 0.3 : 0,
                ease: [0.34, 1.56, 0.64, 1],
                delay: runEntrance ? delay + 0.45 + i * 0.1 : 0,
              }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            {/* Agency line */}
            <motion.text
              x={x(a.year)} y={yAdultAgency}
              textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="11" fontWeight={600}
              letterSpacing="0.08em" fill={cream}
              initial={runEntrance ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: runEntrance ? 0.3 : 0,
                delay: runEntrance ? delay + 0.5 + i * 0.1 : 0,
              }}
            >
              {a.agency}
            </motion.text>
            {/* Year line */}
            <motion.text
              x={x(a.year)} y={yAdultYear}
              textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="9.5" fontWeight={500}
              letterSpacing="0.08em" fill={creamMuted}
              initial={runEntrance ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: runEntrance ? 0.3 : 0,
                delay: runEntrance ? delay + 0.55 + i * 0.1 : 0,
              }}
            >
              {a.year}
            </motion.text>
          </g>
        ))}

        {/* ─── Pediatric track ───
            Two overlaid motion.line elements; opacity driven by isClosed.
            In silence: dashed line opacity 0.85, solid line opacity 0.
            In closed:  dashed line opacity 0,     solid line opacity 1.
            pathLength only draws on first-mount silence; morph arrivals
            start at pathLength=1 so the line doesn't re-draw during flight. */}
        <motion.line
          x1={pediStart} y1={yPediTrack}
          x2={pediSilenceEnd} y2={yPediTrack}
          stroke={coral} strokeWidth={2.5} strokeDasharray="6 6"
          initial={
            runEntrance
              ? { pathLength: 0, opacity: 0 }
              : { pathLength: 1, opacity: isClosed ? 0 : 0.85 }
          }
          animate={{ pathLength: 1, opacity: isClosed ? 0 : 0.85 }}
          transition={{
            pathLength: {
              duration: runEntrance ? 0.9 : 0,
              delay: runEntrance ? delay + 0.8 : 0,
            },
            opacity: { duration: 0.6 },
          }}
        />
        <motion.line
          x1={pediStart} y1={yPediTrack}
          x2={pediTrackEnd} y2={yPediTrack}
          stroke={coral} strokeWidth={2.5}
          initial={
            runEntrance
              ? { pathLength: 0, opacity: 0 }
              : { pathLength: 1, opacity: isClosed ? 1 : 0 }
          }
          animate={{ pathLength: 1, opacity: isClosed ? 1 : 0 }}
          transition={{
            pathLength: {
              duration: runEntrance ? 1.2 : 0,
              delay: runEntrance ? delay + 0.8 : 0,
            },
            opacity: { duration: 0.6 },
          }}
        />

        {/* Pediatric 2021 markers — always rendered; stable anchors during morph */}
        {APPROVALS_PEDS.map((p, i) => (
          <motion.circle
            key={`peds-${p.agency}`}
            cx={x(p.year)} cy={yPediTrack} r={4}
            fill={coral} stroke={cream} strokeWidth={0.6}
            initial={runEntrance ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: runEntrance ? 0.3 : 0,
              ease: [0.34, 1.56, 0.64, 1],
              delay: runEntrance ? delay + 1.4 + i * 0.1 : 0,
            }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}

        {/* ─── Amber narrative label ───
            Two always-mounted motion.g blocks; opacity crossfaded on isClosed.
            No AnimatePresence inside (per spec, Option A). */}
        <motion.g
          initial={runEntrance ? { opacity: 0 } : { opacity: isClosed ? 0 : 1 }}
          animate={{ opacity: isClosed ? 0 : 1 }}
          transition={{
            duration: runEntrance ? 0.5 : 0.4,
            delay: runEntrance ? delay + 1.6 : 0,
          }}
        >
          <text
            x={(pediStart + pediSilenceEnd) / 2} y={yAmberLabel}
            textAnchor="middle"
            fontFamily="var(--font-display, var(--font-body))"
            fontSize="13" fontWeight={600} fontStyle="italic"
            fill={amber}
          >
            19 YEARS OF PEDIATRIC SILENCE
          </text>
        </motion.g>
        <motion.g
          initial={{ opacity: isClosed ? 1 : 0 }}
          animate={{ opacity: isClosed ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <text
            x={x(2021)} y={yAmberLabel}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11" fontWeight={600} letterSpacing="0.06em"
            fill={amber}
          >
            PMDA APR 2021 · EMA SEP 2021
          </text>
        </motion.g>

        {/* ─── Track labels (left side) ─── */}
        <text x={m.l - 8} y={yAdultTrack + 5} textAnchor="end"
              fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="0.22em"
              fill={creamMuted}>
          ADULT
        </text>
        <text x={m.l - 8} y={yPediTrack + 4} textAnchor="end"
              fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="0.22em"
              fill={creamMuted}>
          PEDIATRIC
        </text>
      </svg>
    </motion.div>
  );
}

// Scoped CSS for reduced-motion parity with LungsShared's approach.
// This component's animations are all Motion-driven; Motion doesn't
// observe CSS transition-duration, so this block is primarily defensive
// against any future CSS-animated children. Parity with LungsShared's
// pattern is the explicit goal.
const SCOPED_CSS = `
@media (prefers-reduced-motion: reduce) {
  .approval-timeline * {
    animation-duration: 0ms !important;
    transition-duration: 0ms !important;
  }
}
`;
