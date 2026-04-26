import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import { QP2_THEMES } from '../themes';
import PipelineBridgeCard from './cs1-bridge/PipelineBridgeCard';

/**
 * Slide 14 · CS1 Bridge forward + Framework recap.
 *
 * v3 (Apr-26 de-box pass): replaced the boxy TemplateBullet rows and
 * the rounded-tile theme ribbon with editorial typographic compositions
 * — numbered hairline rows for the template, a single-line themes
 * ribbon with hairline separators, and a flush-left ICH E11A coda
 * (no card, no rounded background). Per zaj-slides craft-bans:
 * "no rounded backgrounds for data containers; hairlines, not boxes."
 */

const ACTIVE_NUMS = ['01', '02', '03', '05'];

const TEMPLATE_BULLETS = [
  'Build the adult PopPK model on the full adult evidence base',
  'Predict pediatric concentrations (pcVPC) before fitting',
  'Fit pediatric-specific model with allometric scaling fixed',
  'Compare exposure distributions — not just means',
  'Anchor the regulatory narrative in exposure-matching, not a separate efficacy study',
];

const THEME_DETAIL = {
  '01': 'The pediatric PopPK model substituted for a pediatric efficacy trial.',
  '02': 'Exposure matching enabled defensible weight-based pediatric dosing.',
  '03': 'The same evidence produced different outcomes at EMA, FDA, and Health Canada.',
  '05': 'Parsimony decisions on allometric scaling and covariates required judgment with limited pediatric data.',
};

export default function Slide14CaseBridge() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10, headline: 0.30,
    leftLabel: 0.60, bullets: 0.75,
    bridge: 1.10,
    payoff: 1.80,
    coda: 2.05,
    themesLabel: 2.30, themes: 2.45,
    source: 2.95,
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

      <Viz style={{ overflow: 'hidden' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'auto auto auto auto',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {/* ═══════════ Top split: template (editorial list) · pipeline (card kept as-is) ═══════════ */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 1fr',
              gap: 'var(--space-8)',
              alignItems: 'start',
            }}
          >
            <TemplateList
              bullets={TEMPLATE_BULLETS}
              ease={ease}
              labelDelay={D.leftLabel}
              rowDelay={D.bullets}
            />

            <PipelineBridgeCard
              label="Where it applies — Merck pipeline"
              body={
                <>
                  <strong style={{ color: 'var(--cream)', fontWeight: 600 }}>
                    Sotatercept (WINREVAIR)
                  </strong>{' '}
                  faces a structurally similar question: pediatric PAH extrapolation, with a PIP agreed with EMA{' '}
                  <span style={{ color: 'var(--amber)' }}>(P/0414/2022)</span> and the pediatric PK study{' '}
                  <span style={{ color: 'var(--amber)' }}>MOONBEAM (NCT05587712)</span> underway.
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

          {/* ─── Amber payoff line (editorial, flush-centered) ─── */}
          <motion.div
            style={{ textAlign: 'center', paddingTop: 'var(--space-2)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.payoff }}
          >
            <div
              className="deck-display"
              style={{
                fontSize: 'var(--fs-card-quote)',
                color: 'var(--amber)',
                fontWeight: 700,
                letterSpacing: '-0.005em',
                lineHeight: 1.2,
              }}
            >
              The value isn't one dose — it's a reusable template for pediatric extrapolation.
            </div>
          </motion.div>

          {/* ─── ICH E11A coda · editorial (hairline rule, no card) ─── */}
          <motion.div
            style={{
              maxWidth: '78ch',
              margin: '0 auto',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: 'var(--space-4)',
              alignItems: 'baseline',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.coda }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--amber)',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              ICH E11A · Jan 2025
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-card-body)',
                color: 'var(--cream-muted)',
                lineHeight: 1.4,
              }}
            >
              Formalizes model-informed pediatric extrapolation built on exposure matching and PK/PD similarity.{' '}
              <span style={{ color: 'var(--cream)', fontStyle: 'italic' }}>
                The 2021 ambrisentan approval prefigured this framework — four years before it was codified.
              </span>
            </div>
          </motion.div>

          {/* ═══════════ Framework themes ribbon — editorial (hairline separators, no rounded tiles) ═══════════ */}
          <ThemeRibbon
            themes={activeThemes}
            details={THEME_DETAIL}
            ease={ease}
            labelDelay={D.themesLabel}
            rowDelay={D.themes}
            tk={tk}
          />
        </div>
      </Viz>

      <Footer
        kicker="Case 01 · Bridge"
        source="Source · CS1 Reading Pt. 3 · Framework themes recap"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   TemplateList — visual pipeline flow. Each step is a
   node on a vertical spine with connecting arrows and
   a numbered circle marker. The final step is highlighted
   in amber as the anchor conclusion.
   ======================================================== */
function TemplateList({ bullets, ease, labelDelay, rowDelay }) {
  return (
    <div>
      <motion.div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          marginBottom: 'var(--space-3)',
          lineHeight: 1.4,
          maxWidth: '52ch',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: labelDelay }}
      >
        The template — generalizes to any oral small-molecule entering a pediatric population
      </motion.div>

      <div style={{ position: 'relative' }}>
        {/* Vertical spine */}
        <motion.div
          style={{
            position: 'absolute',
            left: 14,
            top: 16,
            bottom: 16,
            width: 2,
            background: 'linear-gradient(to bottom, var(--cream-hairline), var(--amber))',
            transformOrigin: 'top',
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease, delay: rowDelay }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {bullets.map((b, i) => (
            <TemplateNode
              key={i}
              index={i + 1}
              text={b}
              delay={rowDelay + i * 0.12}
              highlight={i === bullets.length - 1}
              isLast={i === bullets.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateNode({ index, text, delay, highlight, isLast }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        display: 'grid',
        gridTemplateColumns: '30px 1fr',
        columnGap: 'var(--space-3)',
        alignItems: 'center',
        padding: '8px 0',
      }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {/* Node marker */}
      <div
        style={{
          width: 30,
          height: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: highlight ? 28 : 22,
            height: highlight ? 28 : 22,
            borderRadius: '50%',
            border: `2px solid ${highlight ? 'var(--amber)' : 'var(--cream-hairline)'}`,
            background: highlight
              ? 'color-mix(in srgb, var(--amber) 15%, var(--bg))'
              : 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="deck-mono"
            style={{
              fontSize: 'var(--fs-card-meta)',
              color: highlight ? 'var(--amber)' : 'var(--cream-faint)',
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {String(index).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Step text */}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          lineHeight: 1.4,
          color: highlight ? 'var(--cream)' : 'var(--cream)',
          fontWeight: highlight ? 600 : 400,
          borderLeft: highlight ? '2px solid var(--amber)' : 'none',
          paddingLeft: highlight ? 10 : 0,
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

/* ========================================================
   ThemeRibbon — editorial single-row composition.
   Numbered eyebrow column + hairline-divided panels per
   theme. No rounded backgrounds; no panel chrome. The
   structure IS the typography + the dividers.
   ======================================================== */
function ThemeRibbon({ themes, details, ease, labelDelay, rowDelay, tk }) {
  return (
    <div style={{ minHeight: 0 }}>
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          columnGap: 'var(--space-4)',
          alignItems: 'baseline',
          paddingBottom: 'var(--space-2)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: labelDelay }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--coral)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          Framework themes — exercised here
        </div>
        <div
          style={{
            height: 1,
            background: 'var(--cream-hairline)',
            transform: 'translateY(-4px)',
          }}
        />
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          columnGap: 0,
        }}
      >
        {themes.map((theme, i) => (
          <ThemePanel
            key={theme.num}
            theme={theme}
            detail={details[theme.num]}
            delay={rowDelay + i * 0.12}
            tk={tk}
            isFirst={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

function ThemePanel({ theme, detail, delay, tk, isFirst }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const color = tk(`--${theme.token}`);
  return (
    <motion.div
      style={{
        padding: '10px var(--space-4) 4px',
        borderLeft: isFirst ? 'none' : '1px solid var(--cream-hairline)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          marginBottom: '6px',
        }}
      >
        <span
          className="deck-mono"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color,
            fontWeight: 700,
          }}
        >
          {theme.num}
        </span>
        <span
          style={{
            fontSize: '1.1rem',
            color,
            lineHeight: 1,
          }}
        >
          {theme.glyph}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream)',
            fontWeight: 700,
          }}
        >
          {theme.title}
        </span>
      </div>

      <div
        className="deck-display italic"
        style={{
          fontSize: 'var(--fs-card-body)',
          lineHeight: 1.35,
          color: 'var(--cream-muted)',
          fontWeight: 400,
        }}
      >
        {detail}
      </div>
    </motion.div>
  );
}
