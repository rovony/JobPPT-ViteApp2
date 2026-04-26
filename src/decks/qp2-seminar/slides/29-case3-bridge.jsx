import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import { QP2_THEMES } from '../themes';
import PipelineBridgeCard from './cs1-bridge/PipelineBridgeCard';

/**
 * Slide 29 · CS3 Bridge — Themes recap + bridge to closing.
 *
 * 2026-04-24 redesign (Agent D · CS3 cluster fix):
 *   • Theme ribbon vocabulary now aligned with slide 14 (CS1 bridge):
 *     hairline-divider panels with NUM · GLYPH · TITLE row + italic
 *     detail body. Removed the card-style border + background tint
 *     (banned decorative chrome) and the card-padded box layout.
 *   • Theme glyphs upsized so the icon vocabulary reads at a glance.
 *   • ICH M15 coda decorative panel chrome removed (borderRadius +
 *     background tint dropped). Kept the violet borderLeft accent rule.
 *   • Template-eyebrow label reflowed to two short clauses so it stops
 *     reading as a wall of mono uppercase at 1366×768.
 *   • Spacing tightened so the themes ribbon body lines render in
 *     full at 1366×768 (previously clipped by the Footer).
 *
 * Architecturally mirrors slides 14 (CS1 bridge) and 22 (CS2 bridge) so
 * the seminar reads as a repeatable pattern: each case study closes with
 * a four-element coda — template · pipeline-bridge · payoff · themes
 * ribbon — in case-coded color.
 *
 * CS3 colour: violet (Novel methods family — CS3 finally lights up
 * Theme 04, the framework's stacked-novel-methods pillar).
 *
 * Active themes per the audit plan: 01 QP replaces study · 04 Novel
 * methods · 05 Judgment. CS3 deliberately doesn't fire Theme 02 (Dose
 * precision was the win in CS1) or Theme 03 (Global strategy was the win
 * in CS2). The bridge isn't to one program — it's to the breadth section.
 */

const ACTIVE_NUMS = ['01', '04', '05'];

const TEMPLATE_BULLETS = [
  'Anchor sample size on parameter precision · not endpoint power',
  'Use a model-based simulated primary when observation isn’t feasible',
  'Stack two FDA-precedented methods · don’t bet on one untested move',
  'Quantify the safety framework alongside the design — agencies anchor on it',
  'Brief the regulator with the methodology, not just the number',
];

const THEME_DETAIL = {
  '01': 'A simulated primary substituted for an endpoint-powered N = 94 adult trial.',
  '04': 'Two FDA-precedented methods stacked — first time in adult oncology.',
  '05': 'Type A briefed pre-execution · CI relaxed 90% → 85% · pillar repositioned to keep the reduction.',
};

export default function Slide29Case3Bridge() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10,
    headline: 0.30,
    leftLabel: 0.60,
    bullets: 0.75,
    bridge: 1.10,
    payoff: 1.80,
    coda: 2.05,
    themesLabel: 2.30,
    themes: 2.45,
    source: 2.80,
  };

  const T = useTokens([
    '--coral', '--amber', '--cyan', '--sage', '--violet',
    '--cream', '--cream-muted', '--cream-faint', '--cream-hairline',
  ]);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  const activeThemes = QP2_THEMES.filter((t) => ACTIVE_NUMS.includes(t.num));

  return (
    <SlideGrid dataCase="violet" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--cream-muted)" delay={D.chrome}>CS3 · Bridge forward + Framework recap</Eyebrow>
      <Headline delay={D.headline} maxChars={42}>
        The methodology{' '}
        <span style={{ color: 'var(--violet)', fontStyle: 'italic', fontWeight: 700 }}>
          scales —
        </span>{' '}
        and the value isn’t one trial. It’s a template.
      </Headline>

      <Viz style={{ overflow: 'hidden' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            // 4 children render here (top split · payoff · ICH coda ·
            // themes ribbon) — previously declared only 3 rows
            // ('auto auto 1fr') which pushed the themes ribbon into
            // an implicit 4th auto row that overflowed the Viz cell
            // on short viewports. Now all 4 rows are explicit and
            // content-sized; the themes ribbon's bottom edge is the
            // grid bottom, no overflow. (SLIDE-REVIEW.md §2 row 29)
            gridTemplateRows: 'auto auto auto auto',
            // Tighter than slide 14 — slide 29 has heavier content
            // above (template label + bullets + ICH coda body) so the
            // themes ribbon row needs every px of vertical room to
            // render the ThemeTile detail line below each title.
            rowGap: 'var(--space-2)',
            minHeight: 0,
          }}
        >
          {/* ═══════════ Top split: template · pipeline ═══════════ */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 1fr',
              gap: 'var(--space-10)',
              alignItems: 'start',
            }}
          >
            {/* LEFT — Template flow diagram */}
            <div>
              <motion.div
                style={{
                  marginBottom: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  maxWidth: '58ch',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: D.leftLabel }}
              >
                <span
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-card-label)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--violet)',
                    fontWeight: 700,
                  }}
                >
                  The template
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-card-body)',
                    color: 'var(--cream-muted)',
                    lineHeight: 1.4,
                    fontStyle: 'italic',
                  }}
                >
                  Generalizes wherever a reference population is well-characterized and
                  observed-endpoint trials aren’t feasible.
                </span>
              </motion.div>

              <div style={{ position: 'relative' }}>
                {/* Vertical spine */}
                <motion.div
                  style={{
                    position: 'absolute',
                    left: 11,
                    top: 14,
                    bottom: 14,
                    width: 2,
                    background: 'linear-gradient(to bottom, var(--violet), color-mix(in srgb, var(--violet) 20%, transparent))',
                    transformOrigin: 'top',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, ease, delay: D.bullets }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {TEMPLATE_BULLETS.map((b, i) => (
                    <TemplateNode
                      key={i}
                      index={i + 1}
                      text={b}
                      delay={D.bullets + i * 0.12}
                      highlight={i === TEMPLATE_BULLETS.length - 1}
                      isLast={i === TEMPLATE_BULLETS.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Bridge to Merck pipeline / closing */}
            <PipelineBridgeCard
              label="Where it goes next — Merck CMD pipeline"
              body={
                <>
                  <strong style={{ color: 'var(--cream)', fontWeight: 600 }}>
                    Enlicitide decanoate · oral PCSK9
                  </strong>{' '}
                  · CORALreef LDL-C reduction · the same{' '}
                  <span style={{ color: 'var(--violet)' }}>D-optimal design under informative
                  prior</span> applies wherever Phase 3 dose justification rides on a small
                  precision-critical sample and a well-characterized class precedent.
                  <br />
                  <br />
                  Beyond Enlicitide:{' '}
                  <em style={{ color: 'var(--cream)', fontStyle: 'italic' }}>
                    HRS-5346 · MK-2060 · next-generation class extensions
                  </em>{' '}
                  — the template is direct application, not adaptation.
                </>
              }
              footer="Closing · breadth + record at scale"
              delay={D.bridge}
              accent="var(--violet)"
            />
          </div>

          {/* ─── Violet payoff line ─── */}
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
                color: 'var(--violet)',
                fontWeight: 700,
                letterSpacing: 'var(--ls-headline)',
                lineHeight: 1.2,
              }}
            >
              The win wasn’t a smaller trial — it was a precedent the next program can cite.
            </div>
          </motion.div>

          {/* ─── ICH M15 coda — inline, hairline-only (no panel chrome) ─── */}
          <motion.div
            style={{
              margin: '0 auto',
              maxWidth: '92ch',
              padding: '4px var(--space-3)',
              borderLeft: '3px solid var(--violet)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              columnGap: 'var(--space-3)',
              rowGap: 4,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.coda }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--violet)',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              ICH M15 · Feb 2026
            </span>
            <span
              style={{
                fontSize: 'var(--fs-card-body)',
                color: 'var(--cream-muted)',
                lineHeight: 1.4,
                flex: '1 1 360px',
              }}
            >
              First global guideline on{' '}
              <span style={{ color: 'var(--cream)', fontWeight: 600 }}>
                model-informed drug development
              </span>
              {' '}—{' '}
              <span style={{ color: 'var(--cream)', fontStyle: 'italic' }}>
                FDA documented this case in 2023 · M15 codifies the playbook in 2026.
              </span>
            </span>
          </motion.div>

          {/* ═══════════ Framework themes ribbon ═══════════ */}
          <div style={{ minHeight: 0 }}>
            <motion.div
              className="deck-mono uppercase"
              style={{
                textAlign: 'center',
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--violet)',
                fontWeight: 700,
                marginBottom: '10px',
                paddingTop: '12px',
                borderTop: '1px solid var(--cream-hairline)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.themesLabel }}
            >
              Framework themes in this case study · 3 of 5
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 0,
              }}
            >
              {activeThemes.map((theme, i) => (
                <ThemePanel
                  key={theme.num}
                  theme={theme}
                  detail={THEME_DETAIL[theme.num]}
                  delay={D.themes + i * 0.12}
                  tk={tk}
                  isFirst={i === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Bridge"
        source="Source · FDA Type A 21 Jul 2023 · ICH M15 Step 4 Feb 2026 · Merck CMD pipeline"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   TemplateNode — numbered circle + step text (flow diagram)
   ======================================================== */
function TemplateNode({ index, text, delay, highlight, isLast }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '6px 0',
      }}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      <span
        style={{
          flex: '0 0 auto',
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: highlight
            ? 'var(--violet)'
            : 'color-mix(in srgb, var(--violet) 15%, transparent)',
          border: highlight ? 'none' : '1.5px solid var(--violet)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="deck-mono"
          style={{
            fontSize: 'var(--fs-card-meta)',
            fontWeight: 700,
            color: highlight ? 'var(--bg)' : 'var(--violet)',
            lineHeight: 1,
          }}
        >
          {index}
        </span>
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          lineHeight: 1.4,
          color: highlight ? 'var(--cream)' : 'var(--cream-muted)',
          fontWeight: highlight ? 600 : 400,
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

/* ========================================================
   ThemePanel — hairline-divider theme panel.
   Mirrors the slide 14 (CS1 bridge) ThemePanel vocabulary so
   the framework themes ribbon reads the same on every case
   bridge: NUM · GLYPH · TITLE row + italic detail body, with
   borderLeft hairlines as the only visual divider between
   panels (no card chrome). The user explicitly asked for the
   theme icon vocabulary to be applied consistently across the
   deck — this is that consistency.
   ======================================================== */
function ThemePanel({ theme, detail, delay, tk, isFirst }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const color = tk(`--${theme.token}`);
  return (
    <motion.div
      style={{
        padding: '6px var(--space-4) 4px',
        borderLeft: isFirst ? 'none' : '1px solid var(--cream-hairline)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {/* NUM · GLYPH · TITLE row */}
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
          aria-hidden
          style={{
            fontSize: '1.35rem',
            color,
            lineHeight: 1,
            display: 'inline-flex',
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
