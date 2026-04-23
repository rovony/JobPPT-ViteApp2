import React from 'react';
import { motion } from 'framer-motion';

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

  return (
    <motion.section
      data-case={caseToken}
      className="relative w-full h-[100dvh]"
      style={{ background: 'var(--bg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
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

        {/* Case hairline */}
        <motion.div
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

      {/* ═══════════ Meta + verdict line ═══════════ */}
      {(meta.length > 0 || verdict) && (
        <motion.div
          className="absolute deck-mono uppercase"
          style={{
            bottom: '8vh',
            left: 'var(--deck-gutter)',
            right: 'var(--deck-gutter)',
            paddingTop: '14px',
            borderTop: '1px solid var(--cream-hairline)',
            fontSize: 'clamp(0.6rem, 0.78vw, 0.85rem)',
            letterSpacing: '0.22em',
            color: 'var(--cream-muted)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            lineHeight: 1.8,
            zIndex: 3,
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: D.meta }}
        >
          {meta.map(([k, v], i) => (
            <React.Fragment key={k}>
              {i > 0 && <Sep />}
              <span style={{ color: 'var(--cream-faint)' }}>{k}</span>
              <Sep />
              <span style={{ color: 'var(--cream)' }}>{v}</span>
            </React.Fragment>
          ))}
          {verdict && (
            <>
              {meta.length > 0 && <Sep />}
              <span style={{ color: 'var(--cream-faint)' }}>Verdict</span>
              <Sep />
              <span style={{ color: 'var(--case)', fontWeight: 700, letterSpacing: '0.22em' }}>
                {verdict}
              </span>
            </>
          )}
        </motion.div>
      )}

      {/* Source + page no. */}
      <motion.div
        className="absolute"
        style={{
          bottom: '3vh',
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
            style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.9rem)', color: 'var(--cream-muted)', fontWeight: 400 }}
          >
            {source}
          </span>
        ) : <span />}
        <span
          className="deck-mono uppercase"
          style={{ fontSize: '0.65rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
        >
          {String(caseNumber)} / {String(totalCases).padStart(2, '0')}
        </span>
      </motion.div>
    </motion.section>
  );
}

function Sep() {
  return <span style={{ color: 'var(--cream-dim)', margin: '0 14px' }}>·</span>;
}