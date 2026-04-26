import React from 'react';
import { motion } from 'framer-motion';
import ThemesConstellation from './closing-divider/ThemesConstellation';
import { QP2_THEMES } from '../themes';

/**
 * Slide 30 · Closing divider — Act IV : Beyond the three cases.
 *
 * Hinge slide for the closing arc. The constellation morphs forward
 * to slide 31; a `ThemesPreviewStrip` below the meta footer publishes
 * the five-theme glyph vocabulary that the closing-arc slides
 * (31 · 32 · 33 · 34) reference — one source of truth for the icons
 * an audience has been pattern-matching since slide 04.
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
    themesStrip: 1.95,
    meta: 2.30,
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
      <motion.div
        className="absolute top-[6vh] right-[var(--deck-gutter)] deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
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
          top: '14vh',
          left: 'var(--deck-gutter)',
          right: 'clamp(380px, 42vw, 760px)',
          zIndex: 2,
        }}
      >
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

        <motion.div
          className="deck-display"
          style={{
            fontSize: 'clamp(1.3rem, 2.4vw, 2.8rem)',
            lineHeight: 'var(--lh-snug)',
            letterSpacing: 'var(--ls-headline)',
            color: 'var(--cream)',
            fontWeight: 500,
            marginBottom: '3vh',
            maxWidth: '22ch',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: D.subtitle }}
        >
          From depth → scope.
        </motion.div>

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
          top: '10vh',
          right: 'clamp(2rem, 5vw, 7rem)',
          bottom: '28vh',
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

      {/* ═══════════ THEMES PREVIEW STRIP ═══════════
          Five-glyph rail that pre-publishes the icon vocabulary the
          closing-arc slides (31 · 32 · 33 · 34) will rhyme against.
          Visually distinct from the meta-footer so the audience sees
          "here are the themes Act IV will exercise" before Act IV
          starts using them. */}
      <ThemesPreviewStrip delay={D.themesStrip} ease={ease} />

      {/* ═══════════ Meta footer ═══════════ */}
      <motion.div
        className="absolute deck-mono uppercase"
        style={{
          bottom: '8vh',
          left: 'var(--deck-gutter)',
          right: 'var(--deck-gutter)',
          paddingTop: '14px',
          borderTop: '1px solid var(--cream-hairline)',
          fontSize: 'var(--fs-card-label)',
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
            fontSize: 'var(--fs-card-meta)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
          }}
        >
          30 / 35
        </span>
      </motion.div>
    </motion.section>
  );
}

function Sep() {
  return <span style={{ color: 'var(--cream-dim)', margin: '0 14px' }}>·</span>;
}

/* ============================================================
   ThemesPreviewStrip — five-glyph rail published below the
   constellation. The preview is the contract the closing-arc
   slides honor: same glyph + same short label vocabulary
   recurs in 31 (TA → themes mapping), 32 (milestone → theme),
   33 (principle → theme), and 34 (takeaway → theme).
   ============================================================ */
function ThemesPreviewStrip({ delay, ease }) {
  return (
    <motion.div
      className="absolute"
      style={{
        bottom: '17vh',
        left: 'var(--deck-gutter)',
        right: 'var(--deck-gutter)',
        zIndex: 3,
        paddingTop: '12px',
        paddingBottom: '12px',
        borderTop: '1px solid var(--cream-hairline)',
        borderBottom: '1px dashed var(--cream-hairline)',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 'var(--space-6)',
        alignItems: 'center',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        Themes preview · Act IV exercises
      </span>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          columnGap: 'var(--space-4)',
          alignItems: 'baseline',
        }}
      >
        {QP2_THEMES.map((theme, i) => (
          <motion.div
            key={theme.key}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 'var(--space-3)',
              minWidth: 0,
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: delay + 0.06 * (i + 1) }}
          >
            <span
              aria-hidden
              className="deck-display"
              style={{
                color: `var(--${theme.token})`,
                fontSize: 'clamp(1.1rem, 1.4vw, 1.5rem)',
                lineHeight: 1,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {theme.glyph}
            </span>
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-meta)',
                letterSpacing: 'var(--ls-mono)',
                color: 'var(--cream-faint)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              {theme.num}
            </span>
            <span
              className="deck-display"
              style={{
                fontSize: 'clamp(0.78rem, 0.95vw, 0.98rem)',
                color: 'var(--cream)',
                fontWeight: 500,
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={theme.title}
            >
              {theme.title}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
