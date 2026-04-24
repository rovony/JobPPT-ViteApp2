import React from 'react';
import { motion } from 'framer-motion';
import ThemesConstellation from './closing-divider/ThemesConstellation';

/**
 * Slide 30 · Closing divider — Act IV : Beyond the three cases.
 *
 * The seminar's third major hinge. Slides 1–4 were the SETUP, 5–29
 * were three CASES (depth), and 30–35 are the BREADTH-AND-LEADERSHIP
 * close. This slide is the visual handoff: case-color discipline drops
 * away, all five framework themes light up at once in a constellation,
 * and the chrome shifts from "CASE STUDY n of 3" to "Act IV of IV".
 *
 * Architecture note: this is NOT CaseHeroDivider. CaseHeroDivider's
 * prop surface (caseToken, caseNumber, verdict pill) doesn't model
 * "Act marker, no verdict, all-themes-active" cleanly. We mirror its
 * typographic ratios (gutter, kicker → giant title → hairline →
 * subtitle → tagline) but keep the structure custom so the closing
 * reads as a section break, not another case.
 *
 * Cinematic transition: the ThemesConstellation here is the HERO
 * variant of a shared element with layoutId="themes-constellation".
 * On advancing to slide 31 (breadth), the constellation morphs into
 * a faint watermark behind the 6-domain grid — same pattern as
 * LungsShared (slides 5→6), IndiaMap (slides 14→15), and
 * InformativePriorViz (slides 23→27).
 */
export default function Slide30ClosingDivider() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10,
    kicker: 0.25,
    title: 0.55,
    rule: 1.10,
    subtitle: 1.30,
    tagline: 1.70,
    constellation: 0.40,
    meta: 2.10,
  };

  return (
    <motion.section
      data-case="amber"
      className="relative w-full h-[100dvh]"
      style={{ background: 'var(--bg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {/* Corner chrome — Act marker replaces "CASE STUDY n of 3" */}
      <motion.div
        className="absolute top-[6vh] right-[var(--deck-gutter)] deck-mono uppercase"
        style={{
          fontSize: '0.7rem',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: D.chrome }}
      >
        Act IV · IV of IV · From depth → scope
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
            color: 'var(--amber)',
            fontWeight: 700,
            marginBottom: '3vh',
          }}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease, delay: D.kicker }}
        >
          ACT IV · BEYOND THE THREE CASES
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
            maxWidth: '14ch',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: D.title }}
        >
          Beyond the{' '}
          <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
            three cases.
          </span>
        </motion.h1>

        {/* Amber hairline */}
        <motion.div
          style={{
            height: 3,
            background: 'var(--amber)',
            transformOrigin: 'left center',
            marginBottom: '2vh',
            width: 'clamp(120px, 12vw, 200px)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease, delay: D.rule }}
        />

        {/* Subtitle */}
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: D.subtitle }}
        >
          From depth → scope.
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="deck-display italic"
          style={{
            fontSize: 'clamp(0.95rem, 1.3vw, 1.4rem)',
            lineHeight: 'var(--lh-base)',
            color: 'var(--cream-muted)',
            fontWeight: 400,
            maxWidth: '54ch',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: D.tagline }}
        >
          Those three cases showed depth. What follows is scope —
          across therapeutic areas, agencies, and where the field is
          heading next.
        </motion.p>
      </div>

      {/* ═══════════ RIGHT · Constellation illustration ═══════════ */}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: D.constellation }}
      >
        <ThemesConstellation
          layoutId="themes-constellation"
          variant="hero"
          delay={D.constellation + 0.1}
        />
      </motion.div>

      {/* ═══════════ Meta footer ═══════════ */}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: D.meta }}
      >
        <span style={{ color: 'var(--cream-faint)' }}>Act</span>
        <Sep />
        <span style={{ color: 'var(--cream)' }}>IV of IV</span>
        <Sep />
        <span style={{ color: 'var(--cream-faint)' }}>From</span>
        <Sep />
        <span style={{ color: 'var(--cream)' }}>Depth → Scope</span>
        <Sep />
        <span style={{ color: 'var(--cream-faint)' }}>Themes active</span>
        <Sep />
        <span style={{ color: 'var(--amber)', fontWeight: 700 }}>5 of 5</span>
      </motion.div>

      {/* Source line + page number */}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: D.meta + 0.3 }}
      >
        <span
          className="deck-display italic"
          style={{
            fontSize: 'clamp(0.7rem, 0.85vw, 0.9rem)',
            color: 'var(--cream-muted)',
            fontWeight: 400,
          }}
        >
          Closing · breadth, record, leadership, takeaways
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: '0.65rem',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
          }}
        >
          IV / IV
        </span>
      </motion.div>
    </motion.section>
  );
}

function Sep() {
  return <span style={{ color: 'var(--cream-dim)', margin: '0 14px' }}>·</span>;
}
