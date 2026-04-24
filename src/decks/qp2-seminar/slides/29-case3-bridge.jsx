import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import { QP2_THEMES } from '../themes';
import PipelineBridgeCard from './cs1-bridge/PipelineBridgeCard';

/**
 * Slide 29 · CS3 Bridge — Themes recap + bridge to closing.
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
  '01': 'D-optimal design + simulated primary substituted for an endpoint-powered trial of N = 94 adults.',
  '04': 'Two methods FDA-precedented individually · stacked here for the first time in adult oncology.',
  '05': 'Judgment to brief Type A pre-execution · to relax CI from 90% → 85% on FDA alignment · to reposition a non-agreed pillar without losing the overall reduction.',
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

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'auto auto 1fr',
            rowGap: 'var(--space-4)',
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
                  maxWidth: '54ch',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: D.leftLabel }}
              >
                The template — generalizes wherever a reference population is well-characterized and observed-endpoint trials aren’t feasible
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
                    full={i === TEMPLATE_BULLETS.length - 1}
                  />
                ))}
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

          {/* ─── ICH M15 coda ─── */}
          <motion.div
            style={{
              margin: 'var(--space-2) auto 0',
              maxWidth: '82ch',
              padding: 'var(--space-3) var(--space-5)',
              borderLeft: '3px solid var(--violet)',
              background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
              borderRadius: '4px',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.coda }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: '0.68rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--violet)',
                marginBottom: '4px',
              }}
            >
              ICH M15 · Step 4 · Feb 2026 · EU effective Jul 2026
            </div>
            <div
              style={{
                fontSize: 'clamp(0.82rem, 0.95vw, 0.95rem)',
                color: 'var(--cream-muted)',
                lineHeight: 1.45,
              }}
            >
              The first global guideline on{' '}
              <span style={{ color: 'var(--cream)', fontWeight: 600 }}>
                model-informed drug development (MIDD)
              </span>{' '}
              — the regulatory ground onto which the CS3 template now lands.{' '}
              <span style={{ color: 'var(--cream)', fontStyle: 'italic' }}>
                FDA documented this case in 2023 · M15 codifies the playbook in 2026.
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
                color: 'var(--violet)',
                fontWeight: 700,
                marginBottom: '14px',
                paddingTop: '18px',
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
                gridTemplateColumns: 'repeat(3, 1fr)',
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
        kicker="Case 03 · Bridge"
        source="Source · FDA Type A 21 Jul 2023 · ICH M15 Step 4 Feb 2026 · Merck CMD pipeline"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   TemplateBullet — checkmark + single-line text
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
