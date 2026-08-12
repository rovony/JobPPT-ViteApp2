// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { eyebrowBadgeStyle } from '@/components/deck/SlideParts';

/**
 * CaseHeroDivider — large typographic divider for light-editorial paper.
 *
 * Layout (1920×1080 authoring):
 *   • Left column: CASE STUDY nn kicker · giant compound title ·
 *     case-color hairline · subhead · taglines
 *   • Right column: illustration slot (lung · India · etc.)
 *
 * Paper look: solid bg, hairlines, short entrance delays. Critical type
 * is never gated behind opacity-0 / inView — titles stay readable at rest.
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
  const d = (ms) => (reduce ? 0 : ms);
  const D = {
    chrome: d(0.06),
    kicker: d(0.08),
    title: d(0.12),
    rule: d(0.16),
    subtitle: d(0.2),
    illustration: d(0.14),
    tagline: d(0.26),
    meta: d(0.3),
    source: d(0.32),
  };

  // The section MUST mount opaque. The slide-level fade is owned by
  // SlideTransition. Do not add section-level initial/exit opacity.
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
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.35, ease, delay: D.chrome }}
      >
        Case Study {caseNumber} · {caseNumber} of {String(totalCases).padStart(2, '0')}
      </motion.div>

      {/* ═══════════ LEFT · Type column ═══════════ */}
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
        {/* Kicker — solid at rest */}
        <motion.div
          className="deck-mono uppercase"
          style={{
            fontSize: 'clamp(0.85rem, min(1.1vw, 1.8vh), 1.15rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--case)',
            fontWeight: 700,
            marginBottom: '3vh',
            ...eyebrowBadgeStyle('var(--case)'),
          }}
          initial={reduce ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease, delay: D.kicker }}
        >
          {kicker || `CASE STUDY ${caseNumber}`}
        </motion.div>

        {/* Giant title — solid (no opacity gate) */}
        <h1
          className="deck-display"
          style={{
            fontSize: 'clamp(3.2rem, 7.5vw, 9rem)',
            lineHeight: 'var(--lh-tight)',
            letterSpacing: 'var(--ls-display)',
            color: 'var(--cream)',
            fontWeight: 700,
            marginBottom: '2.5vh',
          }}
        >
          {title}
        </h1>

        {/* Case hairline */}
        <motion.div
          layoutId={`case-marker-${caseToken}`}
          style={{
            height: 3,
            background: 'var(--case)',
            transformOrigin: 'left center',
            marginBottom: '2vh',
            width: 'clamp(120px, 12vw, 200px)',
          }}
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduce ? 0 : 0.45, ease, delay: D.rule }}
        />

        {/* Subtitle — solid */}
        {subtitle && (
          <div
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
          >
            {subtitle}
          </div>
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
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.35, ease, delay: D.tagline }}
          >
            {tagline}
          </motion.p>
        )}
      </motion.div>

      {/* ═══════════ RIGHT · Illustration column ═══════════ */}
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
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.4, ease, delay: D.illustration }}
      >
        {illustration}
      </motion.div>

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
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.3, ease, delay: D.source }}
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

  const axisGap = 'clamp(14px, 2.6vh, 42px)';

  return (
    <motion.div
      className="absolute"
      style={{
        bottom: 'calc(var(--deck-pad-bottom) + 2rem)',
        left: 'var(--deck-gutter)',
        right: 'var(--deck-gutter)',
        zIndex: 3,
      }}
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.35, ease, delay: reduce ? 0 : delay }}
    >
      <div style={{ height: 1, background: 'var(--cream-hairline)', width: '100%' }} />

      <div
        style={{
          ['--axis-gap']: axisGap,
          display: 'grid',
          gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))`,
          columnGap: 'clamp(20px, 2.4vw, 40px)',
          paddingTop: axisGap,
          alignItems: 'start',
        }}
      >
        {cells.map((cell) => {
          const isVerdict = cell.kind === 'verdict';
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
