import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * Slide 21 (manifest position) · CS2 RESPONSE — execution + leadership.
 *
 * Per cs2-design.md beat 7: "Indian regulatory timeline rendered as a
 * horizontal sequence (MAA → SEC1 → EO → SEC2 objection → 91-KB →
 * in-person presentation → favorable recommendation → approval).
 * 27 March 2025 — the leadership beat: a single in-person presentation
 * to the Subject Expert Committee."
 *
 * Layout — proportional-time rebuild
 * ──────────────────────────────────
 * The original v1 placed all 9 nodes on equal-width grid columns. That
 * read as "every event is equally far apart in time", which is wrong:
 * 5 of the 9 events compress into a 5-month window at the end of the
 * regulatory arc (Dec 2024 → May 2025), and the audience deserves to
 * see that compression. SLIDE-REVIEW §6 flagged this as the deck's
 * Tell #8 violation; DEFERRED-WORK §1 documented the fix path; this is
 * the executed rebuild.
 *
 * Implementation:
 *   • Each step's `xPct` is its calendar-day position along the arc
 *     (Mar 27 2024 = 0%, May 14 2025 = 100%). Period entries (no
 *     fixed date, e.g. "Dec — Jan strategy reframe") interpolate to
 *     the midpoint of their bracketing events; trailing periods like
 *     "Apr — May approval cleared" use explicit `periodStart` /
 *     `periodEnd` props because there's no neighbor on the right.
 *   • Above/below row assignment is greedy, not naive-alternating:
 *     each event picks the row whose last placed card sits FURTHEST
 *     behind it. Naive alternation drops the Mar 27 climax and a
 *     hypothetical May 14 marketing card on the same row only ~12%
 *     of the rail apart, which clamp(80,lane%,160) lanes cannot avoid
 *     overlapping. Greedy pick keeps the dense cluster legible.
 *   • Each NodeCard's `lanePct` is `2 × min(half-distance to prev
 *     same-side neighbor, half-distance to next)` — the largest
 *     symmetric width the card can claim before colliding with its
 *     above/below row neighbor. Non-flagged cards clamp to ~160px
 *     max; climax/turn cards override with a 150px floor so the
 *     editorial focal points always win.
 *   • Edge cards bias INWARD by EDGE_INSET so the card body sits
 *     inside the SlideFrame instead of clipping past its right
 *     padding. Interior cards bias by half the asymmetry of their
 *     lane (toward the spacious side), capped at MAX_OFFSET so the
 *     dot↔card visual link stays intact.
 *   • Period entries render as a bracket annotation LIFTED ABOVE the
 *     above-row cards (~88px above the spine), with their ⌐ ¬ legs
 *     reaching back down to anchor the temporal range. This keeps
 *     period labels from sharing a vertical band with adjacent event
 *     cards (e.g. "Strategy reframe" no longer overlaps "91-KB
 *     submission") while the bracket itself still says "this period
 *     spans these two events on the timeline".
 *   • Apr 4 + May 14 are intentionally collapsed into a single
 *     "Apr — May approval cleared" period bracket rather than two
 *     separate event cards. Editorially they are denouement to the
 *     Mar 27 climax, not peer events; visually, three cards in 12%
 *     of rail cannot fit; structurally, the bracket detail
 *     ("Favorable rec → CDSCO MA · 14 May") preserves both dates.
 *   • The duplicate "leadership beat" callout that previously sat
 *     below the timeline has been removed: the climax already lives
 *     as a node, and the headline + subhead carry the editorial
 *     voicing. Keeping both was a focal-point split per Tell #6.
 *   • Year tick marks at the bottom of the rail ground the
 *     proportional layout (otherwise audiences see node-positions
 *     but no anchor for "where's the year boundary?").
 *
 * The cyan→coral spine gradient is the one decorative gradient SLIDE-
 * REVIEW §3 P5 explicitly earns, because it carries the case's
 * emotional arc (cool process → warm climax). Preserved here.
 *
 * No shared cinematic anchors enter or exit here — this is the
 * stationary execution panel. The hero is the regulatory timeline
 * itself, with the 27-Mar leadership beat as the climactic node.
 */

/**
 * v3 (Apr-26 public-domain audit):
 *   Internal-only details from the original v2 timeline have been
 *   abstracted to public-record beats. What remains is anchored in
 *   PUBLIC sources only:
 *     • CDSCO Oncology SEC minutes (SEC meeting numbering, the verbatim
 *       Dec 2024 PK/PD recommendation, the Mar 2025 favorable recommendation)
 *     • CDSCO marketing-authorization records (Tibsovo MA, May 2025)
 *     • TIBSOVO USPI (the underlying PK/PD substrate of the package)
 *   All non-public dates (filing day, EO query day, internal 91-KB
 *   submission day) have been replaced with the calendar quarter they
 *   sat in, so the visual still shows compression of the 2024-Q4
 *   → 2025-Q2 cluster but doesn't expose internal correspondence dates.
 *   The Mar 2025 SEC presentation date is preserved at MONTH precision
 *   only (CDSCO publishes minutes month-by-month; specific day is not
 *   the public record).
 */
export default function Slide19Case2Response() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="CS2 · The response — execution & leadership"
      headline={
        <>
          A single in-person SEC presentation —{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            March 2025.
          </span>
        </>
      }
      headlineMaxChars={36}
      subhead="Twelve months of regulatory choreography. Three subject expert committee passes. One favorable recommendation."
      subheadMaxChars={120}
      footerKicker="Case 02 · The execution"
      footerSource="Source · CDSCO Oncology SEC minutes · CDSCO Tibsovo marketing authorization (May 2025) · TIBSOVO USPI integrated PK/PD section"
    >
      <ResponseLayout />
    </SlideFrame>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * Data — public-record only (see header note for audit trail)
 * ═══════════════════════════════════════════════════════════════ */

const STEPS = [
  { date: 'Q1 2024',     label: 'MAA filed',                 detail: 'CDSCO Form 44 dossier · public substrate' },
  { date: 'May 2024',    label: 'SEC review #1',             detail: 'Pre-clinical & efficacy review' },
  { date: 'Aug 2024',    label: 'Examination query',         detail: 'CDSCO examiner-office batch' },
  { date: '10 Dec 2024', label: 'SEC #2 — objection',        detail: '"Conduct PK/PD study in Indian population"', flag: 'turn' },
  { date: 'Dec — Jan',   label: 'Strategy reframe',          detail: 'Mechanism-first response · ICH E5(R1) Apx D', isPeriod: true },
  { date: 'Jan 2025',    label: 'Mechanism-first dossier',   detail: 'Six-pillar PK/PD package submitted' },
  { date: 'Mar 2025',    label: 'SEC #3 — in-person',        detail: 'Single live presentation · 6 pillars · 9/9 ICH E5 criteria', flag: 'climax' },
  { date: 'Apr — May',   label: 'Approval cleared',          detail: 'Favorable rec → CDSCO marketing authorization', isPeriod: true, periodStart: '1 Apr 2025', periodEnd: '14 May 2025' },
];

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const QUARTER_MID_MONTH = { 1: 1, 2: 4, 3: 7, 4: 10 };

function parseStepDate(s) {
  if (!s) return null;
  const explicit = s.match(/^(\d+)\s+(\w+)\s+(\d{4})$/);
  if (explicit) {
    const mi = MONTHS.indexOf(explicit[2].toLowerCase().slice(0, 3));
    return mi >= 0 ? new Date(+explicit[3], mi, +explicit[1]).getTime() : null;
  }
  const monthYear = s.match(/^(\w+)\s+(\d{4})$/);
  if (monthYear) {
    const mi = MONTHS.indexOf(monthYear[1].toLowerCase().slice(0, 3));
    if (mi >= 0) return new Date(+monthYear[2], mi, 15).getTime();
  }
  const quarter = s.match(/^Q([1-4])\s+(\d{4})$/i);
  if (quarter) {
    const month = QUARTER_MID_MONTH[+quarter[1]];
    return new Date(+quarter[2], month, 15).getTime();
  }
  return null;
}

/**
 * useTimeline — hoist the per-step xPct + lanePct math out of render.
 * Returns three lists:
 *   • events — discrete-moment STEPS positioned on the above/below row
 *   • periods — span entries that bracket two events on the spine
 *   • years — Jan-1 tick positions inside [t0, tN]
 *
 * Above/below alternation runs over the EVENTS list only (period
 * entries don't claim row real estate), so the dense Dec→May cluster
 * doesn't pile three cards into the same below row.
 */
function useTimeline() {
  return useMemo(() => {
    const parsed = STEPS.map((s) => ({ ...s, t: parseStepDate(s.date) }));

    // Periods get their span either from explicit periodStart /
    // periodEnd props (preferred — author-controlled bracket) or, if
    // omitted, by inheriting the bracketing event timestamps. The
    // explicit form is required for periods at the start or end of
    // the timeline (no neighbor on one side).
    parsed.forEach((s, i) => {
      if (!s.isPeriod) return;
      const explicitStart = s.periodStart && parseStepDate(s.periodStart);
      const explicitEnd = s.periodEnd && parseStepDate(s.periodEnd);
      const prevT = explicitStart ?? parsed[i - 1]?.t;
      const nextT = explicitEnd ?? parsed[i + 1]?.t;
      if (prevT && nextT) {
        s.t = (prevT + nextT) / 2;
        s.tStart = prevT;
        s.tEnd = nextT;
      }
    });

    // Compute t0/tN from any timestamp (events OR period endpoints)
    // so a trailing period can extend the rail past the last event.
    const allT = parsed.flatMap((s) => [s.t, s.tStart, s.tEnd].filter(Boolean));
    const t0 = Math.min(...allT);
    const tN = Math.max(...allT);
    const span = tN - t0 || 1;
    const xOf = (t) => ((t - t0) / span) * 100;

    const events = [];
    const periods = [];
    parsed.forEach((s) => {
      if (s.isPeriod) {
        periods.push({
          ...s,
          xPct: xOf(s.t),
          xStart: xOf(s.tStart),
          xEnd: xOf(s.tEnd),
        });
      } else {
        events.push({ ...s, xPct: xOf(s.t) });
      }
    });

    // Row assignment: pick the row (above/below) whose last placed
    // card sits FURTHEST behind this one. This maximizes
    // same-row spacing across the dense Dec→May cluster, where naive
    // alternation puts the climax (Mar 27) and Marketing (May 14)
    // ~12% apart on the same row and clamp(80,lane%,160) lanes cannot
    // avoid overlap. Tie-breaks alternate so even-spacing falls back
    // to a clean rhythm.
    const eventsWithRow = [];
    let preferAbove = true;
    events.forEach((s) => {
      const lastAbove = [...eventsWithRow].reverse().find((e) => e.above);
      const lastBelow = [...eventsWithRow].reverse().find((e) => !e.above);
      const gapAbove = lastAbove ? s.xPct - lastAbove.xPct : Infinity;
      const gapBelow = lastBelow ? s.xPct - lastBelow.xPct : Infinity;
      let above;
      if (gapAbove === gapBelow) above = preferAbove;
      else above = gapAbove > gapBelow;
      eventsWithRow.push({ ...s, above });
      preferAbove = !above;
    });

    // Per-card lane geometry (same-side neighbors only).
    //   • halfLeft / halfRight = distance from dot to the midpoint
    //     between this card and its prev/next same-row neighbor. For
    //     edge cards (no neighbor on one side), use the distance to
    //     the rail boundary plus EDGE_SLACK as the lane budget on
    //     the unbounded side.
    //   • lanePct = halfLeft + halfRight  (total horizontal budget
    //     consumed by NodeCard's clamp(80px, lanePct%, 160px) width).
    //   • offsetPct biases the card center off its dot:
    //       – Edge cards: ±EDGE_INSET inward, so the card body fits
    //         inside the SlideFrame padding instead of clipping past
    //         the rail boundary (a card centered on xPct=100 would
    //         clip ~half-card-width past the right edge).
    //       – Interior cards: half the lane asymmetry (toward the
    //         spacious side), capped at ±MAX_OFFSET so the dot↔card
    //         visual link stays intact.
    const EDGE_SLACK = 6; // % of rail; lane width budget at edges
    const EDGE_INSET = 6; // % of rail; ≈ half of clamp max (160px/1300px)
    const MAX_OFFSET = 4; // % of rail; keep interior cards close to dots
    const above = eventsWithRow.filter((s) => s.above);
    const below = eventsWithRow.filter((s) => !s.above);
    const laneOf = (arr) =>
      new Map(
        arr.map((s, i) => {
          const prev = arr[i - 1];
          const next = arr[i + 1];
          const halfLeft = prev ? (s.xPct - prev.xPct) / 2 : s.xPct + EDGE_SLACK;
          const halfRight = next ? (next.xPct - s.xPct) / 2 : 100 - s.xPct + EDGE_SLACK;
          let offset;
          if (!prev) offset = +EDGE_INSET; // leftmost: shift right
          else if (!next) offset = -EDGE_INSET; // rightmost: shift left
          else {
            const raw = (halfRight - halfLeft) / 2;
            offset = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, raw));
          }
          return [
            s,
            {
              lanePct: halfLeft + halfRight,
              offsetPct: offset,
            },
          ];
        })
      );
    const laneMap = new Map([...laneOf(above), ...laneOf(below)]);
    const eventsFinal = eventsWithRow.map((s) => ({ ...s, ...laneMap.get(s) }));

    // Year ticks sit at the Jan-1 boundaries that fall *inside* [t0, tN].
    const years = [];
    const startYear = new Date(t0).getFullYear();
    const endYear = new Date(tN).getFullYear();
    for (let y = startYear + 1; y <= endYear; y++) {
      const tYear = new Date(y, 0, 1).getTime();
      if (tYear > t0 && tYear < tN) {
        years.push({ year: y, xPct: xOf(tYear) });
      }
    }

    return { events: eventsFinal, periods, years };
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
 * Layout
 * ═══════════════════════════════════════════════════════════════ */

const EASE = [0.2, 0.7, 0.3, 1];

function ResponseLayout() {
  const { events, periods, years } = useTimeline();
  const reduced = useReducedMotion();

  // Animation timing: a single sweep left→right whose per-node delay
  // tracks xPct. This makes the entrance feel proportional too — long
  // pauses through the early sparse months, fast cluster through the
  // dense Dec→May finale — instead of the v1 constant 0.12s metronome.
  const sweepDelay = (xPct) => 0.5 + (xPct / 100) * 0.9;

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        minHeight: 0,
        padding: '0 var(--space-6)',
      }}
    >
      <div style={{ position: 'relative', height: '100%' }}>
        {/* Spine — cyan→coral carries CS2's emotional arc; SLIDE-REVIEW
            P5 grants this gradient as the case's earned exception. */}
        <motion.div
          aria-hidden
          initial={reduced ? { scaleX: 1 } : { scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduced ? 0 : 1.2, ease: EASE, delay: 0.4 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: 2,
            background: 'linear-gradient(90deg, var(--cyan), var(--coral))',
            opacity: 0.55,
            transform: 'translateY(-1px)',
          }}
        />

        {/* Period brackets — render BEFORE event nodes so dots overlay
            the bracket endpoints rather than the other way round. */}
        {periods.map((p) => (
          <PeriodBracket key={p.label} period={p} delay={sweepDelay(p.xPct)} />
        ))}

        {/* Event nodes — dot + card siblings share the timeline's
            coordinate space so card widths resolve in % of the rail. */}
        {events.map((s) => (
          <React.Fragment key={s.date + s.label}>
            <Dot step={s} delay={sweepDelay(s.xPct)} />
            <NodeCard step={s} delay={sweepDelay(s.xPct) + 0.2} />
          </React.Fragment>
        ))}

        {/* Year ticks intentionally NOT rendered: only one Jan-1
            boundary (Jan 2025) falls inside the 14-month [Mar 2024 →
            May 2025] window, and a single isolated "2025" tick reads
            as an orphaned label rather than an axis. Every event card
            already carries its own MMM YYYY datestamp, so the temporal
            anchor is redundant. The {years} array is still computed
            in useTimeline() for downstream slides that re-use the
            timeline primitive across longer windows. */}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * Pieces
 * ═══════════════════════════════════════════════════════════════ */

function toneFor(step) {
  if (step.flag === 'climax') return 'var(--coral)';
  if (step.flag === 'turn') return 'var(--amber, #d8a634)';
  return 'var(--cyan)';
}

function Dot({ step, delay }) {
  const tone = toneFor(step);
  const isFlagged = Boolean(step.flag);
  return (
    <motion.div
      aria-hidden
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      style={{
        position: 'absolute',
        left: `${step.xPct}%`,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: isFlagged ? 18 : 12,
        height: isFlagged ? 18 : 12,
        borderRadius: '50%',
        background: tone,
        border: step.flag === 'climax' ? '2px solid var(--cream)' : 'none',
        boxShadow: isFlagged ? `0 0 0 4px color-mix(in srgb, ${tone} 28%, transparent)` : 'none',
        zIndex: 3,
      }}
    />
  );
}

/**
 * PeriodBracket — renders a span annotation between two bracketing
 * events (e.g. "Dec — Jan strategy reframe" between SEC #2 and 91-KB).
 *
 * Rendered ABOVE the spine so it doesn't compete with below-row cards
 * for vertical real estate. The bracket itself is a downward-opening
 * `⌐ ¬` (top-left-corner + top-right-corner with a baseline above the
 * spine), which visually says "everything between these two events is
 * THIS process". Label sits above the bracket as a single editorial
 * line — period entries don't get the full date/title/detail stack
 * because they're context, not focal points.
 */
function PeriodBracket({ period, delay }) {
  const widthPct = period.xEnd - period.xStart;
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        position: 'absolute',
        left: `${period.xStart}%`,
        width: `${widthPct}%`,
        // Lifted ABOVE the above-row cards (~bottom 18px + 3 lines of
        // type ≈ 70px tall) so the period label/detail never collides
        // with an event card that happens to share the period's
        // horizontal range. The bracket legs (height: 64px) reach
        // back down toward the spine to preserve the visual anchor.
        bottom: 'calc(50% + 88px)',
        zIndex: 2,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          textAlign: 'center',
          fontSize: 'calc(var(--fs-slide-pageno) * 0.92)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--amber, #d8a634)',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        {period.label}
      </div>
      <div
        style={{
          marginTop: 2,
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: 'calc(var(--fs-slide-kicker) * 0.92)',
          color: 'var(--cream-muted)',
          fontStyle: 'italic',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        {period.detail}
      </div>
      {/* Downward-opening bracket whose legs reach toward the spine.
          Tall enough (64px) to span from the lifted label down past
          the above-row card height, anchoring the period range to
          its temporal location even though the label sits high. */}
      <div
        style={{
          marginTop: 4,
          width: '100%',
          height: 64,
          borderLeft: '1.5px solid var(--amber, #d8a634)',
          borderRight: '1.5px solid var(--amber, #d8a634)',
          borderTop: '1.5px solid var(--amber, #d8a634)',
          opacity: 0.85,
        }}
      />
    </motion.div>
  );
}

function NodeCard({ step, delay }) {
  const tone = toneFor(step);
  const isImportant = step.flag === 'climax' || step.flag === 'turn';
  const placement = step.above ? 'above' : 'below';

  // Width budget: the asymmetric lane (in % of timeline). Flagged nodes
  // floor at 150px so editorial focal points always read; non-flagged
  // floor at 80px and cap at 160px so a generous lane doesn't bloat
  // routine markers into hero treatment.
  const widthClamp = isImportant
    ? `clamp(150px, ${Math.max(step.lanePct, 14).toFixed(2)}%, 240px)`
    : `clamp(80px, ${step.lanePct.toFixed(2)}%, 160px)`;

  // Card center sits at (dot + offsetPct), letting asymmetric lanes
  // (e.g. climax with lots of room to the left and a tight right
  // neighbor) shift the card toward the spacious side. The dot stays
  // at xPct — visual offset between dot and card is small enough that
  // a leader line isn't needed (offsetPct caps at lanePct/2 by
  // construction).
  const cardX = step.xPct + step.offsetPct;

  return (
    <motion.div
      initial={{ opacity: 0, y: placement === 'above' ? 6 : -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        position: 'absolute',
        left: `${cardX}%`,
        [placement === 'above' ? 'bottom' : 'top']: 'calc(50% + 18px)',
        width: widthClamp,
        transform: 'translateX(-50%)',
        padding: '6px 8px',
        textAlign: 'center',
        zIndex: isImportant ? 4 : 2,
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: tone,
          fontWeight: 700,
          marginBottom: 2,
        }}
      >
        {step.date}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-kicker)',
          fontWeight: 700,
          color: 'var(--cream)',
          lineHeight: 1.2,
          marginBottom: 2,
        }}
      >
        {step.label}
      </div>
      <div
        className="deck-mono"
        style={{
          fontSize: 'calc(var(--fs-slide-pageno) * 0.92)',
          color: 'var(--cream-muted)',
          lineHeight: 1.3,
        }}
      >
        {step.detail}
      </div>
    </motion.div>
  );
}

function YearTick({ year, xPct, delay }) {
  // Anchored just below the spine (not at the rail bottom) so the year
  // mark visually attaches to the timeline. The previous `bottom: 0`
  // anchor parked "2025" ~400px below the spine where it read as an
  // orphaned label disconnected from the timeline.
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE, delay: Math.max(delay, 0) }}
      style={{
        position: 'absolute',
        left: `${xPct}%`,
        // Sit just under the below-row event cards (which start at
        // top: calc(50% + 18px) and are ~64px tall). 90px clears the
        // tallest below-card; the tick line connects up toward the spine.
        top: 'calc(50% + 92px)',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 1,
          height: 10,
          background: 'var(--cream-hairline)',
        }}
      />
      <div
        className="deck-mono uppercase"
        style={{
          marginTop: 4,
          fontSize: 'calc(var(--fs-slide-pageno) * 0.85)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
        }}
      >
        {year}
      </div>
    </motion.div>
  );
}
