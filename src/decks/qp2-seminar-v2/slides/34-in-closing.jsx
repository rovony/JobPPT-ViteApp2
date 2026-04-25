import React, { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { QP2_THEMES } from '../themes';

/**
 * Slide 34 · In closing — Three things to take away.
 *
 * Editorial closer composition: an SVG armature (a horizontal hairline
 * "timeline" with three colored station diamonds, three vertical
 * spines that drop from the timeline, and an amber convergence rule
 * that funnels into a center drop) anchors three oversized
 * typographic takeaways, and continues visually into the pull-quote
 * via the amber border-top on the quote band. No card chrome, no
 * panel boxes — the three takeaways live as columns of editorial
 * type pinned to the armature.
 *
 * The numerals carry the motion: 8·4·6 and 6 count up; QP assembles
 * letter-by-letter. The armature draws once (top hairline → drops →
 * convergence → center bridge) so the audience reads the "three
 * converge into one" structure as the takes appear.
 *
 * Theme stamps: each takeaway pairs with the QP2 theme it instantiates
 * (themes vocabulary from `themes.js`) so the icons that opened slide
 * 30's preview keep accruing meaning across the closing arc.
 *
 * Asymmetric column weights: the leftmost take owns the widest column
 * because its numeral is three glyphs (8·4·6) — visual weight follows
 * typographic weight rather than the older 1·1·1 equal-cards layout.
 *
 * Type-scale exemption: the hero numerals use an inline clamp() at
 * the display tier (3.4–6.8rem), one tier above --fs-card-hero-num
 * (5.5rem cap). Same rationale documented on slide 13 — full-canvas
 * typographic anchors on the deck's two payoff slides.
 */

const THEME_BY_KEY = Object.fromEntries(QP2_THEMES.map((t) => [t.key, t]));

const TAKEAWAYS = [
  {
    eyebrow: 'Regulatory impact',
    metricKind: 'tripleCount',
    metric: [8, 4, 6],
    body: '8 submissions · 4 approved labels · 6 health authorities. The record speaks to an agency-first orientation — scientific rigor met the reviewers where they evaluated.',
    metricLabel: 'Submissions · Labels · Agencies',
    token: 'cyan',
    themeKey: 'global-strategy',
  },
  {
    eyebrow: 'Strategic breadth',
    metricKind: 'singleCount',
    metric: 6,
    body: 'Six therapeutic areas, end-to-end from first-in-human to lifecycle management. No learning curve to absorb — a pipeline to accelerate.',
    metricLabel: 'Therapeutic areas · End-to-end',
    token: 'amber',
    themeKey: 'qp-replaces-study',
  },
  {
    eyebrow: 'Leadership clarity',
    metricKind: 'qpAssemble',
    metric: 'QP',
    body: 'A posture that builds teams, influences cross-functional decisions, and positions quantitative pharmacology as the strategic engine of drug development — not its service desk.',
    metricLabel: 'Strategic engine · not service desk',
    token: 'coral',
    themeKey: 'judgment',
  },
];

// Asymmetric grid weight: 8·4·6 takes the widest column because it
// has the longest numeral; 6 and QP get tighter slots so the
// composition feels like "headline + two annotations" rather than
// "three peers."
const TAKEAWAY_COLS = '1.5fr 1fr 1fr';

// Three station x positions inside the 0–1000 armature viewBox.
// These are tuned to land at the midpoints of the three asymmetric
// columns (1.5fr · 1fr · 1fr) once the slide gutter is accounted
// for, so the SVG diamonds visually sit on the same vertical axis
// as the eyebrow rows above them.
const STATION_X = [215, 645, 870];

// Vertical anatomy of the armature, in the 0–1000 viewBox space.
// The dot/eyebrow row in the DOM grid is sized to ARM_TOP% of the
// armature height so the SVG hairline at y=ARM_TOP/2 lands at the
// vertical center of that row — i.e. the dots visually sit on the
// hairline regardless of the rendered armature height.
const ARM_TOP = 80;          // bottom edge of the dot/eyebrow row (8% of armature)
const ARM_BOTTOM = 960;      // y of the amber convergence rule
const ARM_FOOT = 1000;       // viewBox bottom (where the bridge ends)

export default function Slide34InClosing() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];

  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    armatureLine: 0.95,
    armatureDrops: 1.55,
    dots: 1.85,
    numerals: 2.15,
    bodies: 3.10,
    metas: 3.55,
    convergence: 3.85,
    bridge: 4.40,
    quote: 4.55,
    sig: 5.05,
    source: 5.20,
  };

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={D.eyebrow}>Closing · Three takeaways</Eyebrow>
      <Headline delay={D.headline} maxChars={42}>
        Three things to take from this{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
          candidate.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={60}>
        The record · the breadth · the posture.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto auto',
            rowGap: 'var(--space-3)',
            minHeight: 0,
          }}
        >
          <ArmatureBlock D={D} reduce={reduce} ease={ease} />
          <PullQuote D={D} reduce={reduce} ease={ease} />
          <AuthorTag D={D} ease={ease} />
        </div>
      </Viz>

      <Footer
        kicker="Closing · 34 of 35"
        source="Source · Seminar synthesis · CS1–CS3 + breadth + leadership"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   ArmatureBlock — the SVG armature + three editorial columns
   ======================================================== */
function ArmatureBlock({ D, reduce, ease }) {
  const lineInit = reduce ? false : { pathLength: 0, opacity: 0 };
  const lineEnd = { pathLength: 1, opacity: 1 };

  return (
    <div style={{ position: 'relative', minHeight: 0, height: '100%' }}>
      {/* Background armature. viewBox is 1000×1000 with
          preserveAspectRatio="none" so the hairlines stretch to fill
          whatever space the parent measures at runtime; vector-effect
          keeps every stroke at a true 1px regardless of the resulting
          aspect distortion. */}
      <svg
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        {/* Top horizontal "timeline" hairline */}
        <motion.line
          x1="40"
          y1={ARM_TOP / 2}
          x2="960"
          y2={ARM_TOP / 2}
          stroke="var(--cream-hairline)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={lineInit}
          animate={lineEnd}
          transition={{ duration: 1.0, ease, delay: D.armatureLine }}
        />

        {/* Three full-height vertical spines connecting the top
            cream hairline to the amber convergence rule. They
            structure the empty band below each take's meta strip
            into "page columns" — at 1080p where the take content is
            short relative to Viz height, the spines turn what would
            be dead space into framed armature. */}
        {STATION_X.map((x, i) => (
          <motion.line
            key={`spine-${x}`}
            x1={x}
            y1={ARM_TOP / 2}
            x2={x}
            y2={ARM_BOTTOM}
            stroke="var(--cream-hairline)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            initial={lineInit}
            animate={lineEnd}
            transition={{ duration: 1.1, ease, delay: D.armatureDrops + i * 0.10 }}
          />
        ))}

        {/* Bottom convergence rule — amber, the editorial "synthesis" hairline */}
        <motion.line
          x1={STATION_X[0]}
          y1={ARM_BOTTOM}
          x2={STATION_X[2]}
          y2={ARM_BOTTOM}
          stroke="var(--amber)"
          strokeOpacity="0.55"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={lineInit}
          animate={lineEnd}
          transition={{ duration: 1.2, ease, delay: D.convergence }}
        />

        {/* Center vertical bridge into the pull-quote band */}
        <motion.line
          x1={STATION_X[1]}
          y1={ARM_BOTTOM}
          x2={STATION_X[1]}
          y2={ARM_FOOT}
          stroke="var(--amber)"
          strokeOpacity="0.55"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={lineInit}
          animate={lineEnd}
          transition={{ duration: 0.45, ease, delay: D.bridge }}
        />
      </svg>

      {/* Foreground 3-column grid sits on top of the armature.
          The parent defines five shared rows so each child column
          (subgrid) lines up its dot, numeral, body, and meta with
          its siblings — meta strips align horizontally regardless
          of how many lines each body wraps to. */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: TAKEAWAY_COLS,
          gridTemplateRows: `${ARM_TOP / 10}% auto auto auto 1fr`,
          columnGap: 'var(--space-7)',
          rowGap: 'var(--space-3)',
          height: '100%',
          minHeight: 0,
        }}
      >
        {TAKEAWAYS.map((t, i) => (
          <TakeColumn
            key={t.eyebrow}
            t={t}
            theme={THEME_BY_KEY[t.themeKey]}
            colDelays={{
              dot: D.dots + i * 0.12,
              numeral: D.numerals + i * 0.18,
              body: D.bodies + i * 0.10,
              meta: D.metas + i * 0.10,
            }}
            reduce={reduce}
            ease={ease}
            isLead={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

/* ========================================================
   TakeColumn — one editorial column on the armature
   ======================================================== */
function TakeColumn({ t, theme, colDelays, reduce, ease, isLead }) {
  const color = `var(--${t.token})`;
  const themeColor = theme ? `var(--${theme.token})` : color;
  return (
    <div
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateRows: 'subgrid',
        gridRow: 'span 5',
        rowGap: 'var(--space-3)',
        minHeight: 0,
        minWidth: 0,
      }}
    >
      {/* Row 1 — dot/eyebrow + theme stamp, sized to ARM_TOP% so its
          center sits on the SVG hairline. The bg color clip keeps the
          hairline from ghosting through the eyebrow type. */}
      <motion.div
        style={{
          alignSelf: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          background: 'var(--bg)',
          paddingRight: 'var(--space-3)',
          width: 'fit-content',
        }}
        initial={reduce ? false : { opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: colDelays.dot }}
      >
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: 12,
            height: 12,
            background: color,
            transform: 'rotate(45deg)',
            flexShrink: 0,
          }}
        />
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          {t.eyebrow}
        </span>
        {theme && (
          <span
            aria-label={`Theme · ${theme.title}`}
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: 6,
              paddingLeft: 'var(--space-3)',
              marginLeft: 'var(--space-2)',
              borderLeft: '1px dashed var(--cream-hairline)',
              color: themeColor,
              fontWeight: 700,
            }}
          >
            <span
              aria-hidden
              className="deck-display"
              style={{ fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)', lineHeight: 1 }}
            >
              {theme.glyph}
            </span>
            <span
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-card-meta)',
                letterSpacing: 'var(--ls-mono)',
              }}
            >
              {theme.num}
            </span>
          </span>
        )}
      </motion.div>

      {/* Row 2 — hero numeral at the display tier. Sits below the
          eyebrow with a comfortable lead. The lead column gets the
          tallest numeral; secondary columns step down a half-tier. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          color,
          minHeight: 0,
          paddingTop: 'var(--space-2)',
        }}
      >
        <Metric t={t} delay={colDelays.numeral} reduce={reduce} ease={ease} isLead={isLead} />
      </div>

      {/* Row 3 — body copy. Slightly larger than card-body so the
          editorial sentence reads as the primary "explain" text. */}
      <motion.p
        className="deck-display italic"
        style={{
          margin: 0,
          fontSize: 'clamp(0.95rem, min(1.05vw, 1.65vh), 1.2rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.5,
          maxWidth: '40ch',
          paddingRight: 'var(--space-2)',
          paddingTop: 'var(--space-3)',
        }}
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: colDelays.body }}
      >
        {t.body}
      </motion.p>

      {/* Row 4 — preserved meta strip, sits directly under the body
          rather than at the column foot. The take-tinted hairline
          rhymes with the dot above. */}
      <motion.div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
          paddingTop: 'var(--space-2)',
          marginTop: 'var(--space-2)',
          borderTop: `1px solid color-mix(in srgb, ${color} 45%, var(--cream-hairline))`,
        }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: colDelays.meta }}
      >
        {t.metricLabel}
      </motion.div>

      {/* Row 5 — empty gutter; the amber convergence rule lives in
          this band. Intentionally an `1fr` so the take content
          collapses tight at 768px and breathes at 1080p. */}
      <div />
    </div>
  );
}

/* ========================================================
   Metric — dispatch the right numeral renderer per take
   ======================================================== */
function Metric({ t, delay, reduce, ease, isLead }) {
  const numStyle = {
    fontSize: isLead
      ? 'clamp(3.4rem, min(6.2vw, 9.8vh), 6.8rem)'
      : 'clamp(2.8rem, min(5vw, 7.8vh), 5.6rem)',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.025em',
  };
  const sepStyle = {
    ...numStyle,
    color: 'var(--cream-faint)',
    transform: 'translateY(-0.18em)',
    margin: '0 0.10em',
  };

  if (t.metricKind === 'tripleCount') {
    return (
      <span
        className="deck-display tabular-nums"
        style={{ display: 'inline-flex', alignItems: 'baseline' }}
      >
        <CountUpDigit target={t.metric[0]} delay={delay}        duration={0.9} style={numStyle} reduce={reduce} />
        <span style={sepStyle}>·</span>
        <CountUpDigit target={t.metric[1]} delay={delay + 0.18} duration={0.9} style={numStyle} reduce={reduce} />
        <span style={sepStyle}>·</span>
        <CountUpDigit target={t.metric[2]} delay={delay + 0.36} duration={0.9} style={numStyle} reduce={reduce} />
      </span>
    );
  }

  if (t.metricKind === 'singleCount') {
    return <CountUpDigit target={t.metric} delay={delay} duration={0.9} style={numStyle} reduce={reduce} />;
  }

  // QP assemble — Q lands first, then P. Reduced-motion users get
  // the static glyphs without scale/translate.
  return (
    <span className="deck-display" style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <motion.span
        style={numStyle}
        initial={reduce ? false : { opacity: 0, y: 12, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease, delay }}
      >
        Q
      </motion.span>
      <motion.span
        style={numStyle}
        initial={reduce ? false : { opacity: 0, y: 12, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease, delay: delay + 0.18 }}
      >
        P
      </motion.span>
    </span>
  );
}

/* ========================================================
   CountUpDigit — animates 0 → target. Reduced-motion: jumps to target.
   ======================================================== */
function CountUpDigit({ target, delay = 0, duration = 0.9, style, reduce }) {
  const count = useMotionValue(reduce ? target : 0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (reduce) return undefined;
    const controls = animate(count, target, {
      duration,
      delay,
      ease: [0.2, 0.7, 0.3, 1],
    });
    return controls.stop;
  }, [count, target, duration, delay, reduce]);

  return (
    <motion.span className="deck-display tabular-nums" style={style}>
      {rounded}
    </motion.span>
  );
}

/* ========================================================
   PullQuote — synthesis sentence. The amber border-top picks up
   the armature's center bridge above to feel like one piece.
   ======================================================== */
function PullQuote({ D, reduce, ease }) {
  return (
    <motion.figure
      style={{
        margin: 0,
        padding: 'var(--space-5) var(--space-5) var(--space-4) var(--space-5)',
        borderTop: '1px solid color-mix(in srgb, var(--amber) 55%, var(--cream-hairline))',
        borderBottom: '1px solid var(--cream-hairline)',
        position: 'relative',
        textAlign: 'center',
      }}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: D.quote }}
    >
      <span
        aria-hidden
        className="deck-display"
        style={{
          position: 'absolute',
          top: 4,
          left: 'var(--space-5)',
          fontSize: 'clamp(2rem, min(3.4vw, 5vh), 3.6rem)',
          lineHeight: 1,
          color: 'color-mix(in srgb, var(--amber) 65%, transparent)',
          fontWeight: 700,
        }}
      >
        &ldquo;
      </span>

      <blockquote
        className="deck-display italic"
        style={{
          margin: 0,
          fontSize: 'clamp(1rem, min(1.4vw, 2.1vh), 1.45rem)',
          lineHeight: 1.45,
          color: 'var(--cream)',
          fontWeight: 400,
          maxWidth: '70ch',
          marginInline: 'auto',
        }}
      >
        That&apos;s the organization I know how to build —{' '}
        <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
          because I&apos;ve spent my career building the evidence
          that moves science into patients&apos; lives.
        </span>
      </blockquote>

      <figcaption
        className="deck-mono uppercase"
        style={{
          marginTop: 'var(--space-3)',
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
        }}
      >
        Merck QP2-CMD · Candidate Seminar · April 2026
      </figcaption>
    </motion.figure>
  );
}

/* ========================================================
   AuthorTag — name on the left, URL on the right
   ======================================================== */
function AuthorTag({ D, ease }) {
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        flexWrap: 'wrap',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease, delay: D.sig }}
    >
      <span
        className="deck-display"
        style={{
          fontSize: 'clamp(0.95rem, 1.1vw, 1.15rem)',
          color: 'var(--cream)',
          fontWeight: 600,
        }}
      >
        Malek Okour, Ph.D.
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
        }}
      >
        malekokour.com
      </span>
    </motion.div>
  );
}
