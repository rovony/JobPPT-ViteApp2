import React from 'react';
import { motion } from 'framer-motion';

/**
 * CaseDividerSlide — reusable divider pattern for Case Studies 01/02/03.
 *
 * Layout:
 *   • Left vertical tracing beam (draws in via SVG stroke-dashoffset)
 *   • Giant chapter number watermark (bleeds top-right, case color, 8% opacity)
 *   • Title + kicker in center-left content column
 *   • Single typographic meta line across the bottom with a coloured `verdict`
 *
 * Pass `caseToken` ('coral' | 'cyan' | 'violet' | …) — drives the `--case`
 * CSS variable so every case-color touchpoint updates together.
 *
 * Props:
 *   caseToken    — token name (e.g. 'coral')
 *   caseNumber   — '01' | '02' | '03'  (shown as the giant watermark)
 *   totalCases   — total case count for the "01 / 03" chrome
 *   eyebrow      — "Case 01 · Ambrisentan · Pediatric PAH"
 *   title        — JSX: the big display headline
 *   kicker       — single short sentence below
 *   meta         — [[label, value], …]  pairs for the bottom typographic line
 *   verdict      — string rendered in case colour (e.g. 'APPROVED')
 *   source       — small italic line bottom-left (optional)
 */
export default function CaseDividerSlide({
  caseToken = 'coral',
  caseNumber = '01',
  totalCases = 3,
  eyebrow,
  title,
  kicker,
  meta = [],
  verdict,
  source,
}) {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10,
    beam: 0.30,      // beam draws
    puck: 1.70,      // top puck pops after beam reaches top
    content: 0.80,
    meta: 1.80,
    source: 2.40,
  };

  return (
    <motion.section
      data-case={caseToken}
      className="relative w-full h-[100dvh] overflow-hidden"
      style={{ background: 'var(--bg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {/* ─── Top-right chrome ──────────────────────── */}
      <motion.div
        className="absolute top-[6vh] right-[var(--deck-gutter)] deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.6rem, 0.72vw, 0.78rem)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: D.chrome }}
      >
        Case Study {caseNumber} · {caseNumber} of {String(totalCases).padStart(2, '0')}
      </motion.div>

      {/* ─── Giant chapter number — watermark, top-right, bleeds ── */}
      <motion.div
        aria-hidden
        className="absolute deck-display select-none pointer-events-none"
        style={{
          top: '-6vh',
          right: '-3vw',
          fontSize: 'clamp(16rem, 34vw, 34rem)',
          lineHeight: 0.8,
          letterSpacing: 'var(--ls-display)',
          color: 'var(--case)',
          opacity: 0.08,
          fontWeight: 700,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.2, ease, delay: D.chrome + 0.2 }}
      >
        {caseNumber}
      </motion.div>

      {/* ─── Tracing beam (left hairline) ─────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '12vh',
          bottom: '12vh',
          left: 'calc(var(--deck-gutter) + 60px)',
          width: 40,
        }}
      >
        <svg className="w-full h-full overflow-visible" viewBox="0 0 40 840" preserveAspectRatio="none">
          {/* Decorative ticks first so the beam draws over them */}
          <motion.line x1={8} y1={210} x2={32} y2={210} stroke="var(--cream-hairline)" strokeWidth={1}
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: D.beam + 1.0 }} />
          <motion.line x1={8} y1={420} x2={32} y2={420} stroke="var(--cream-hairline)" strokeWidth={1}
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: D.beam + 1.1 }} />
          <motion.line x1={8} y1={630} x2={32} y2={630} stroke="var(--cream-hairline)" strokeWidth={1}
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: D.beam + 1.2 }} />

          {/* Beam body — draws TOP-DOWN via stroke-dashoffset */}
          <motion.line
            x1={20} y1={0} x2={20} y2={840}
            stroke="var(--case)" strokeWidth={2} strokeLinecap="round"
            strokeDasharray={840}
            initial={{ strokeDashoffset: 840 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.6, ease, delay: D.beam }}
          />

          {/* Bottom terminus */}
          <motion.circle
            cx={20} cy={820} r={5} fill="var(--case)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: D.beam + 1.4 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />

          {/* Top puck with halos */}
          <motion.circle cx={20} cy={20} r={26} fill="var(--case)"
                         initial={{ opacity: 0 }} animate={{ opacity: 0.06 }}
                         transition={{ duration: 0.5, delay: D.puck }} />
          <motion.circle cx={20} cy={20} r={18} fill="var(--case)"
                         initial={{ opacity: 0 }} animate={{ opacity: 0.14 }}
                         transition={{ duration: 0.5, delay: D.puck + 0.1 }} />
          <motion.circle
            cx={20} cy={20} r={10} fill="var(--case)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: D.puck }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        </svg>
      </div>

      {/* ─── Content column ─────────────────────────── */}
      <motion.div
        className="absolute"
        style={{
          top: '32vh',
          left: 'calc(var(--deck-gutter) + 140px)',
          right: 'var(--deck-gutter)',
          maxWidth: '1440px',
          zIndex: 2,
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: D.content }}
      >
        {eyebrow && (
          <div
            className="flex items-center gap-4 deck-mono uppercase"
            style={{
              fontSize: 'clamp(0.7rem, 0.85vw, 0.95rem)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--case)',
              marginBottom: '2vh',
            }}
          >
            <span className="h-px w-10" style={{ background: 'var(--case)' }} />
            {eyebrow}
          </div>
        )}

        <h1
          className="deck-display"
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 6rem)',
            lineHeight: 'var(--lh-tight)',
            letterSpacing: 'var(--ls-display)',
            color: 'var(--cream)',
            fontWeight: 500,
            marginBottom: '2.5vh',
            maxWidth: '22ch',
          }}
        >
          {title}
        </h1>

        {kicker && (
          <p
            className="deck-display italic"
            style={{
              fontSize: 'clamp(0.95rem, 1.45vw, 1.5rem)',
              lineHeight: 'var(--lh-base)',
              color: 'var(--cream-muted)',
              fontWeight: 400,
              maxWidth: '60ch',
            }}
          >
            {kicker}
          </p>
        )}
      </motion.div>

      {/* ─── Footer rail ──────────────────────────────
          Meta line + source/pageno row pinned to --deck-pad-bottom (the
          shared safe zone every grid-driven SlideGrid reserves for footers).
          Earlier this band sat at `bottom: 3vh`, which collided with the
          deck control bar. Typography now uses the same tokens as
          SlideParts.Footer (--fs-slide-pageno, --fs-slide-tagline,
          --fs-slide-kicker) so divider rails and body-slide rails scale
          identically across viewports. */}
      <motion.div
        className="absolute deck-mono uppercase"
        style={{
          bottom: 'calc(var(--deck-pad-bottom) + 2.6rem)',
          left: 'calc(var(--deck-gutter) + 140px)',
          right: 'var(--deck-gutter)',
          paddingTop: '14px',
          borderTop: '1px solid var(--cream-hairline)',
          fontSize: 'var(--fs-slide-kicker)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: '0',
          lineHeight: 1.8,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
            <Sep />
            <span style={{ color: 'var(--cream-faint)' }}>Verdict</span>
            <Sep />
            <span style={{ color: 'var(--case)', fontWeight: 700, letterSpacing: 'var(--ls-mono-wide)' }}>
              {verdict}
            </span>
          </>
        )}
      </motion.div>

      {/* ─── Source + page no. ─────────────────────── */}
      <motion.div
        className="absolute"
        style={{
          bottom: 'var(--deck-pad-bottom)',
          left: 'calc(var(--deck-gutter) + 140px)',
          right: 'var(--deck-gutter)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
          {String(caseNumber)} / 15
        </span>
      </motion.div>
    </motion.section>
  );
}

function Sep() {
  return <span style={{ color: 'var(--cream-dim)', margin: '0 14px' }}>·</span>;
}