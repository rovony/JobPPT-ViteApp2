import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import { QP2_THEMES } from '../themes';
import PipelineBridgeCard from './cs1-bridge/PipelineBridgeCard';

/**
 * Slide 13 · CS1 Bridge forward + Framework recap.
 *
 * Layout (top → bottom):
 *   1. Centered amber headline      "The methodology travels."
 *   2. Two-column split:
 *        LEFT  — "THE TEMPLATE" checklist (5 bullets, checkmark icons)
 *        RIGHT — PipelineBridgeCard (amber) — "Where it applies — [company]"
 *   3. Full-width amber payoff line: "The value isn't one dose — it's a
 *      reusable template for pediatric extrapolation."
 *   4. Four framework-theme tiles (only active themes 01/02/03/05 shown;
 *      theme 04 "Novel methods" intentionally omitted from this case).
 *
 * The right-side pipeline bridge is extracted so Merck (Sotatercept / WINREVAIR)
 * can be swapped for another compound/company with a one-prop change.
 */

// Which themes this case actually exercised (CS1: 01, 02, 03, 05 — NOT 04)
const ACTIVE_NUMS = ['01', '02', '03', '05'];

// Template checklist — 5 bullets per the mockup
const TEMPLATE_BULLETS = [
  'Build the adult PopPK model on the full adult evidence base',
  'Predict pediatric concentrations (pcVPC) before fitting',
  'Fit pediatric-specific model with allometric scaling fixed',
  'Compare exposure distributions — not just means',
  'Anchor the regulatory narrative in exposure-matching, not a separate efficacy study',
];

// Per-theme detail lines (the body under each theme title in the ribbon)
const THEME_DETAIL = {
  '01': 'The pediatric PopPK model substituted for a pediatric efficacy trial.',
  '02': 'Exposure matching enabled defensible weight-based pediatric dosing.',
  '03': 'The same evidence produced different outcomes at EMA, FDA, and Health Canada.',
  '05': 'Parsimony decisions on allometric scaling and covariates required judgment with limited pediatric data.',
};

export default function Slide13() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10, headline: 0.30,
    leftLabel: 0.60, bullets: 0.75,
    bridge: 1.10,
    payoff: 1.80,
    themesLabel: 2.10, themes: 2.25,
    source: 3.20,
  };

  const T = useTokens([
    '--coral', '--amber', '--cyan', '--sage', '--violet',
    '--cream', '--cream-muted', '--cream-faint', '--cream-hairline',
  ]);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  const activeThemes = QP2_THEMES.filter((t) => ACTIVE_NUMS.includes(t.num));

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--cream-muted)" delay={D.chrome}>CS1 · Bridge forward + Framework recap</Eyebrow>
      <Headline delay={D.headline} maxChars={28}>
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
          The methodology travels.
        </span>
      </Headline>

      <Viz>
        <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: 'auto auto 1fr', rowGap: 'var(--space-4)', minHeight: 0 }}>
      {/* ═══════════ Top split: template · pipeline ═══════════ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: 'var(--space-10)',
          alignItems: 'start',
        }}
      >
        {/* LEFT — Template checklist */}
        <div>
          <motion.div
            className="deck-mono uppercase"
            style={{
              fontSize: '0.72rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-muted)',
              marginBottom: '18px',
              lineHeight: 1.4,
              maxWidth: '52ch',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.leftLabel }}
          >
            The template — generalizes to any oral small-molecule entering a pediatric population
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              rowGap: '14px',
              columnGap: '24px',
            }}
          >
            {TEMPLATE_BULLETS.map((b, i) => (
              <TemplateBullet
                key={i}
                text={b}
                delay={D.bullets + i * 0.10}
                // last bullet (full-width emphasis) spans both cols
                full={i === TEMPLATE_BULLETS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Swappable pipeline bridge card */}
        <PipelineBridgeCard
          label="Where it applies — Merck pipeline"
          body={
            <>
              <strong style={{ color: 'var(--cream)', fontWeight: 600 }}>
                Sotatercept (WINREVAIR)
              </strong>{' '}
              faces a structurally similar question: pediatric PAH extrapolation, with a PIP agreed with EMA{' '}
              <span style={{ color: 'var(--amber)' }}>(P/0414/2022)</span> and a pediatric PK study{' '}
              <span style={{ color: 'var(--amber)' }}>NCT05587712</span> underway.
              <br />
              <br />
              Biologic versus small molecule changes the PK — but the regulatory logic (exposure-matching,
              cross-agency narrative, E-R defensibility) is the{' '}
              <em style={{ color: 'var(--cream)', fontStyle: 'italic' }}>same framework</em> applied for ambrisentan.
            </>
          }
          footer="WINREVAIR pipeline bridge"
          delay={D.bridge}
          accent="var(--amber)"
        />
      </div>

      {/* ─── Amber payoff line ─── */}
      <motion.div
        style={{ textAlign: 'center' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.payoff }}
      >
        <div
          className="deck-display"
          style={{
            fontSize: 'clamp(1.1rem, 1.5vw, 1.65rem)',
            color: 'var(--amber)',
            fontWeight: 700,
            letterSpacing: 'var(--ls-headline)',
            lineHeight: 1.2,
          }}
        >
          The value isn't one dose — it's a reusable template for pediatric extrapolation.
        </div>
      </motion.div>

      {/* ─── Regulatory coda · CHMP 2026 ─── */}
      <motion.div
        style={{
          margin: 'var(--space-2) auto 0',
          maxWidth: '78ch',
          padding: 'var(--space-3) var(--space-5)',
          borderLeft: '3px solid var(--amber)',
          background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
          borderRadius: '4px',
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.payoff + 0.25 }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: '0.68rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--amber)',
            marginBottom: '4px',
          }}
        >
          March 2026 · EMA CHMP draft addendum · CHMP/60723/2026
        </div>
        <div
          style={{
            fontSize: 'clamp(0.82rem, 0.95vw, 0.95rem)',
            color: 'var(--cream-muted)',
            lineHeight: 1.45,
          }}
        >
          Formalizes model-informed pediatric extrapolation with exposure matching and PK/PD similarity.{' '}
          <span style={{ color: 'var(--cream)', fontStyle: 'italic' }}>
            The 2023 ambrisentan approach maps onto this framework — five years before it was codified.
          </span>
        </div>
      </motion.div>

      {/* ═══════════ Framework themes ribbon ═══════════ */}
      <div style={{ minHeight: 0 }}>
        <motion.div
          className="deck-mono uppercase"
          style={{
            textAlign: 'center',
            fontSize: '0.72rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--coral)',
            fontWeight: 700,
            marginBottom: '14px',
            paddingTop: '18px',
            borderTop: '1px solid var(--cream-hairline)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: D.themesLabel }}
        >
          Framework themes in this case study
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
        >
          {activeThemes.map((theme, i) => (
            <ThemeTile
              key={theme.num}
              theme={theme}
              detail={THEME_DETAIL[theme.num]}
              delay={D.themes + i * 0.12}
              tk={tk}
            />
          ))}
        </div>
      </div>

        </div>
      </Viz>

      <Footer
        kicker="Case 01 · Bridge"
        tagline="Source · CS1 Reading Pt. 3 · Framework themes recap"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   TemplateBullet — checkmark + single-line text
   Last one spans both cols for visual emphasis.
   ======================================================== */
function TemplateBullet({ text, delay, full }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        gridColumn: full ? '1 / -1' : 'auto',
      }}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      <span
        style={{
          flex: '0 0 auto',
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: '1px solid var(--cream-hairline)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        <Check size={12} strokeWidth={2.5} color="var(--cream-muted)" />
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.82rem, 0.92vw, 0.98rem)',
          lineHeight: 1.4,
          color: 'var(--cream)',
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

/* ========================================================
   ThemeTile — bordered tile for the framework ribbon
   ======================================================== */
function ThemeTile({ theme, detail, delay, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const color = tk(`--${theme.token}`);
  return (
    <motion.div
      style={{
        padding: '18px 20px 20px 20px',
        borderRadius: 4,
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 35%, transparent)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {/* Glyph */}
      <div
        style={{
          fontSize: '1.6rem',
          color,
          lineHeight: 1,
          marginBottom: '14px',
        }}
      >
        {theme.glyph}
      </div>

      {/* Title */}
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.72rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream)',
          fontWeight: 700,
          marginBottom: '8px',
        }}
      >
        {theme.title}
      </div>

      {/* Detail */}
      <div
        className="deck-display italic"
        style={{
          fontSize: 'clamp(0.74rem, 0.84vw, 0.9rem)',
          lineHeight: 1.4,
          color: 'var(--cream-muted)',
          fontWeight: 400,
        }}
      >
        {detail}
      </div>
    </motion.div>
  );
}