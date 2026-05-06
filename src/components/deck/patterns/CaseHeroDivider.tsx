// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * CaseHeroDivider — large typographic divider with a neon-stroke
 * illustration anchored to the right side.
 *
 * Layout (1920×1080 authoring):
 *   • Left column: CASE STUDY nn kicker · giant compound title ·
 *     case-color hairline · subhead · taglines
 *   • Right column: illustration slot (lung · India · etc.)
 *
 * Pass `illustration` as a React node (the actual SVG component).
 * Pass `caseToken` to drive the --case CSS variable.
 *
 * Props:
 *   caseToken    — 'coral' | 'cyan' | 'violet' | 'amber' | 'sage'
 *   caseNumber   — '01' | '02' | '03'
 *   totalCases   — total case count (for 'nn / NN' corner chrome)
 *   kicker       — "CASE STUDY 02"
 *   title        — giant compound name (e.g. "Ivosidenib")
 *   subtitle     — one-line subtitle under the hairline
 *   tagline      — bottom italic summary line
 *   meta         — inline meta chips [[label, value], …] (optional)
 *   verdict      — "APPROVED" / status word (optional)
 *   illustration — React node rendered in the right column
 *   source       — bottom-left small source line
 */
export default function CaseHeroDivider({
  caseToken = 'coral',
  caseNumber = '01',
  totalCases = 3,
  kicker,
  title,
  subtitle,
  tagline,
  meta = [],
  verdict,
  illustration,
  source,
}: any) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10,
    kicker: 0.25,
    title: 0.55,
    rule: 1.10,
    subtitle: 1.30,
    illustration: 0.40,
    tagline: 2.30,
    meta: 2.50,
    source: 2.80,
  };

  // The section MUST mount opaque. The slide-level fade is owned by
  // SlideTransition (incoming opacity:1 always, exit opacity:0 over
  // 0.4s). Adding our own initial:0/exit:0 here previously compounded
  // the opacity -- during the 5->6 morph both the outgoing AND the
  // incoming slide sections hit very low opacity at ~200ms, exposing
  // the cream deck-root underneath and stranding the layoutId-morphing
  // lung over a blank cream background. That's the "flicker."
  return (
    <motion.section
      data-case={caseToken}
      className="relative w-full h-[100dvh]"
      style={{ background: 'var(--bg)' }}
    >
      {/* Corner chrome */}
      <motion.div
        className="absolute top-[6vh] right-[var(--deck-gutter)] deck-mono uppercase"
        style={{ fontSize: '0.7rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: D.chrome }}
      >
        Case Study {caseNumber} · {caseNumber} of {String(totalCases).padStart(2, '0')}
      </motion.div>

      {/* ═══════════ LEFT · Type column ═══════════
          Top anchor lowered from 18vh → 14vh so that on small viewports
          (1366×768 → 14vh = 108px instead of 138px) the long tagline of
          slide 23 ("...rare adult oncology population.") clears the new
          ledger axis hairline. clamp() preserves the original visual at
          large viewports (1920 → 151px instead of 194px, still well
          below corner chrome). The previous clamp(96, 18vh, 220) was
          ineffective because 18vh stays within range at every common
          viewport size. */}
      <motion.div
        layoutId={`case-card-${caseToken}`}
        className="absolute"
        style={{
          top: 'clamp(96px, 14vh, 200px)',
          left: 'var(--deck-gutter)',
          width: 'clamp(620px, 58%, 1100px)',
          zIndex: 2,
        }}
      >
        {/* Kicker */}
        <motion.div
          className="deck-mono uppercase"
          style={{
            fontSize: 'clamp(0.8rem, 1vw, 1.1rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--case)',
            fontWeight: 700,
            marginBottom: '3vh',
          }}
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease, delay: D.kicker }}
        >
          {kicker || `CASE STUDY ${caseNumber}`}
        </motion.div>

        {/* Giant title */}
        <motion.h1
          className="deck-display"
          style={{
            fontSize: 'clamp(3.2rem, 7.5vw, 9rem)',
            lineHeight: 'var(--lh-tight)',
            letterSpacing: 'var(--ls-display)',
            color: 'var(--cream)',
            fontWeight: 700,
            marginBottom: '2.5vh',
          }}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: D.title }}
        >
          {title}
        </motion.h1>

        {/* Case hairline.
            layoutId pairs with the slide-01 PK landmark dot of the
            same color (case-marker-coral|cyan|violet). When the user
            advances title → this divider, framer-motion morphs the
            small colored dot into this wide hairline. The morph is
            partial (HTML <div> ↔ SVG <circle> animates the bbox
            only), but the perceptual story is "the case marker
            we showed at the start IS now the case we're opening."
            ScaleX entrance still plays as the safety-net animation
            when the layoutId match doesn't fire (e.g. user jumps to
            this slide directly via deep-link). */}
        <motion.div
          layoutId={`case-marker-${caseToken}`}
          style={{
            height: 3,
            background: 'var(--case)',
            transformOrigin: 'left center',
            marginBottom: '2vh',
            width: 'clamp(120px, 12vw, 200px)',
          }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease, delay: D.rule }}
        />

        {/* Subtitle */}
        {subtitle && (
          <motion.div
            className="deck-display"
            style={{
              fontSize: 'clamp(1.3rem, 2.4vw, 2.8rem)',
              lineHeight: 'var(--lh-snug)',
              letterSpacing: 'var(--ls-headline)',
              color: 'var(--cream)',
              fontWeight: 500,
              marginBottom: '4vh',
              maxWidth: '22ch',
            }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: D.subtitle }}
          >
            {subtitle}
          </motion.div>
        )}

        {/* Tagline */}
        {tagline && (
          <motion.p
            className="deck-display italic"
            style={{
              fontSize: 'clamp(0.95rem, 1.3vw, 1.4rem)',
              lineHeight: 'var(--lh-base)',
              color: 'var(--cream-muted)',
              fontWeight: 400,
              maxWidth: '54ch',
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: D.tagline }}
          >
            {tagline}
          </motion.p>
        )}
      </motion.div>

      {/* ═══════════ RIGHT · Illustration column ═══════════
          The bottom anchor uses a clamp with a 160px floor (instead of a
          raw 18vh) so that on small viewports (1366×768 → 18vh = 138px)
          the column does NOT extend down into the new ledger axis zone.
          Without the floor, slide 23's lymphocyte caption (which hangs
          beneath its SVG inside the slot) lands on top of the hairline.
          18vh is preserved as the typical value, and the upper bound
          (240px) prevents pathologically tall viewports from leaving
          dead space — the lung / India / lymphocyte still center fine
          in the resulting column. */}
      <motion.div
        className="absolute"
        style={{
          top: '12vh',
          right: 'clamp(2rem, 5vw, 7rem)',
          bottom: 'clamp(186px, 18vh, 240px)',
          width: 'clamp(320px, 34%, 620px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: D.illustration }}
      >
        {illustration}
      </motion.div>

      {/* ═══════════ Case ledger ═══════════
          Editorial horizontal timeline that fills the band between
          the illustration and the source line. A 1px hairline axis
          spans the full deck width (deck-gutter to deck-gutter); each
          meta entry hangs from a square checkpoint marker that sits
          ON the axis (case-color outlined for data, case-color filled
          for the verdict). Labels are mono uppercase well above the
          11pt ledger floor; values are display-weight large enough to
          read as the slide's grounding facts.

          The previous version placed values at clamp(0.95rem, 1.35vw,
          1.55rem) (~10–25px) with vertical borderLeft separators that
          made the strip read as a 50px-tall data table jammed against
          the source line — the band above (lung-bottom → ledger-top
          ~190px on 1080) sat empty. The redesign moves the ledger
          higher up the band (calc(deck-pad-bottom + 0.5rem)) and
          grows each cell vertically (paddingTop + label + value =
          ~120px on 1080) so the strip occupies the void instead of
          ignoring it.

          Verdict alignment: when a verdict is present, its cell
          right-aligns and its checkpoint marker docks to the slide's
          right edge — the "approved stamp at the end of the timeline"
          metaphor the user asked for. Data cells stay left-aligned,
          giving the rhythm: start · checkpoint · checkpoint · destination. */}
      {(meta.length > 0 || verdict) && (
        <CaseLedger
          meta={meta}
          verdict={verdict}
          ease={ease}
          delay={D.meta}
          reduce={reduce}
        />
      )}

      {/* Source + page no. */}
      <motion.div
        className="absolute"
        style={{
          bottom: 'var(--deck-pad-bottom)',
          left: 'var(--deck-gutter)',
          right: 'var(--deck-gutter)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '2rem',
          zIndex: 3,
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: D.source }}
      >
        {source ? (
          <span
            className="deck-display italic"
            style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream-muted)', fontWeight: 400 }}
          >
            {source}
          </span>
        ) : <span />}
        <span
          className="deck-mono uppercase"
          style={{ fontSize: 'var(--fs-slide-pageno)', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
        >
          {String(caseNumber)} / {String(totalCases).padStart(2, '0')}
        </span>
      </motion.div>
    </motion.section>
  );
}

function CaseLedger({ meta, verdict, ease, delay, reduce }) {
  const cells = [
    ...meta.map(([label, value]) => ({ label, value, kind: 'data' })),
    ...(verdict ? [{ label: 'Verdict', value: verdict, kind: 'verdict' }] : []),
  ];

  // --axis-gap is the vertical distance from the hairline axis down to
  // the first row of label text. Authored as a CSS custom property so
  // the absolutely-positioned dot in each cell can lift itself onto the
  // axis without re-declaring the clamp() expression.
  //
  // Tightened from the v1 clamp(28, 4.5vh, 60) so that on slide 23 at
  // 1366×768 the OUTCOME value (which wraps to two lines because the
  // text "N = 60 agreed (94 → 60 · −36%)" exceeds a 5-cell column) does
  // not push the wrapper top up into the lymphocyte caption sitting
  // inside the illustration slot. At 1920×1080 the gap stays generous.
  const axisGap = 'clamp(14px, 2.6vh, 42px)';

  return (
    <motion.div
      className="absolute"
      style={{
        // Sit clear of the source/page-no row that pins to deck-pad-bottom.
        // A naïve +0.5rem offset let the value text descender overlap the
        // source italic; +2rem provides ~13px (1920) / ~17px (1366) of
        // clean breathing space between the timeline values and the
        // bottom citation row.
        bottom: 'calc(var(--deck-pad-bottom) + 2rem)',
        left: 'var(--deck-gutter)',
        right: 'var(--deck-gutter)',
        zIndex: 3,
      }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.55, ease, delay: reduce ? 0 : delay }}
    >
      {/* Hairline axis — runs edge to edge across the deck gutters.
          Checkpoint markers in the cells below dock onto this line via
          absolute positioning, so the line and the dots read as one
          continuous timeline rather than as a separate top border. */}
      <div style={{ height: 1, background: 'var(--cream-hairline)', width: '100%' }} />

      <div
        style={{
          // CSS custom property used by each cell's checkpoint dot to
          // compute its negative top offset back onto the axis.
          ['--axis-gap']: axisGap,
          display: 'grid',
          gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))`,
          columnGap: 'clamp(20px, 2.4vw, 40px)',
          paddingTop: axisGap,
          alignItems: 'start',
        }}
      >
        {cells.map((cell, i) => {
          const isVerdict = cell.kind === 'verdict';
          // Verdict cell right-aligns its content + docks its checkpoint
          // to the right of its column so the dot lands on the slide's
          // right edge. Data cells left-align with their dot on the
          // column's left. This produces dot positions of (for 4 cells)
          // 0% · 25% · 50% · 100% — the wider final gap reads as the
          // "journey to verdict" instead of a uniform tabular grid.
          return (
              <div
              key={cell.label}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isVerdict ? 'flex-end' : 'flex-start',
                textAlign: isVerdict ? 'right' : 'left',
                gap: 'clamp(8px, 1.4vh, 18px)',
                minWidth: 0,
              }}
            >
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  // Lift the 10×10 dot up by paddingTop + half-dot so its
                  // center sits exactly on the 1px axis line.
                  top: 'calc(-1 * var(--axis-gap) - 5px)',
                  ...(isVerdict ? { right: 0 } : { left: 0 }),
                  width: 10,
                  height: 10,
                  boxSizing: 'border-box',
                  border: '2px solid var(--case)',
                  background: isVerdict ? 'var(--case)' : 'var(--bg)',
                }}
              />
              <span
                className="deck-mono uppercase"
                style={{
                  fontSize: 'clamp(1rem, min(1.15vw, 1.9vh), 1.2rem)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: isVerdict ? 'var(--case)' : 'var(--cream-faint)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {cell.label}
              </span>
              <span
                className="deck-display"
                style={{
                  fontSize: isVerdict
                    ? 'clamp(1.45rem, min(1.95vw, 3vh), 2.4rem)'
                    : 'clamp(1.2rem, min(1.6vw, 2.55vh), 2rem)',
                  // Tighter line-height so multi-line wraps (slide 23 OUTCOME
                  // at 1366×768) stay inside the band between the lymphocyte
                  // caption above and the source citation below.
                  lineHeight: 1.14,
                  letterSpacing: isVerdict
                    ? 'var(--ls-mono-wide)'
                    : 'var(--ls-headline)',
                  fontFamily: isVerdict
                    ? 'var(--font-mono)'
                    : 'var(--font-display)',
                  color: isVerdict ? 'var(--case)' : 'var(--cream)',
                  fontWeight: isVerdict ? 700 : 500,
                  textTransform: isVerdict ? 'uppercase' : 'none',
                  wordBreak: 'break-word',
                }}
              >
                {cell.value}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
