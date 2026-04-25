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
}) {
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

      {/* ═══════════ LEFT · Type column ═══════════ */}
      <div
        className="absolute"
        style={{
          top: '18vh',
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
      </div>

      {/* ═══════════ RIGHT · Illustration column ═══════════ */}
      <motion.div
        className="absolute"
        style={{
          top: '12vh',
          right: 'clamp(2rem, 5vw, 7rem)',
          bottom: '18vh',
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
          Replaces the previous one-line `meta` strip (tiny mono in a
          single row at --fs-slide-kicker) which left a deep band of
          empty space between the tagline and the slide footer. The
          ledger now fills that band: each meta entry is a tall cell
          with an uppercase label above and a display-weight value
          below, separated by full-height tick rules. The verdict
          becomes the rightmost cell, framed by the case color so it
          reads as a stamp rather than an afterthought. Sized off the
          card type tokens so the rail scales with the body-slide
          ledgers used on slides 6/7/8 and stays legible on 1366×768. */}
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

  return (
    <motion.div
      className="absolute"
      style={{
        bottom: 'calc(var(--deck-pad-bottom) + 1.4rem)',
        left: 'var(--deck-gutter)',
        right: 'var(--deck-gutter)',
        paddingTop: 'clamp(18px, 2.4vh, 28px)',
        borderTop: '1px solid var(--cream-hairline)',
        zIndex: 3,
      }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.55, ease, delay: reduce ? 0 : delay }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))`,
          alignItems: 'stretch',
        }}
      >
        {cells.map((cell, i) => (
          <div
            key={cell.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(8px, 1.1vh, 14px)',
              paddingLeft: i === 0 ? 0 : 'clamp(20px, 2.4vw, 36px)',
              paddingRight: i === cells.length - 1 ? 0 : 'clamp(20px, 2.4vw, 36px)',
              borderLeft: i === 0 ? 'none' : '1px solid var(--cream-hairline)',
              minWidth: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  background: cell.kind === 'verdict' ? 'var(--case)' : 'var(--cream-faint)',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-label)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: cell.kind === 'verdict' ? 'var(--case)' : 'var(--cream-faint)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {cell.label}
              </span>
            </div>
            <span
              className={cell.kind === 'verdict' ? 'deck-display' : 'deck-display'}
              style={{
                fontSize:
                  cell.kind === 'verdict'
                    ? 'clamp(1.1rem, 1.7vw, 1.9rem)'
                    : 'clamp(0.95rem, 1.35vw, 1.55rem)',
                lineHeight: 1.15,
                letterSpacing: cell.kind === 'verdict' ? 'var(--ls-mono-wide)' : 'var(--ls-headline)',
                fontFamily: cell.kind === 'verdict' ? 'var(--font-mono)' : 'var(--font-display)',
                color: cell.kind === 'verdict' ? 'var(--case)' : 'var(--cream)',
                fontWeight: cell.kind === 'verdict' ? 700 : 500,
                textTransform: cell.kind === 'verdict' ? 'uppercase' : 'none',
                wordBreak: 'break-word',
              }}
            >
              {cell.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}