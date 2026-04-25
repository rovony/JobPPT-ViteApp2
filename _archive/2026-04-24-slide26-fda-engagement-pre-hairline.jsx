import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import SampleSizeWaterfall from './cs3-engagement/SampleSizeWaterfall';

/**
 * Slide 26 · CS3 FDA Engagement — N = 60 agreed.
 *
 * Layout:
 *   • TOP: Sample-size waterfall (94 → 60) on the LEFT, three pillar
 *     status cards (3/4 agreed · >85% AE detection · simulated primary
 *     repositioned) on the RIGHT.
 *   • BOTTOM: Two paraphrased regulatory-position cards (sourced to
 *     speaker's own FDA Type A briefing, not internal minutes) and a
 *     closing payoff line about durable methodology.
 *
 * The slide turns a regulatory exchange into evidence — pharmacometrics
 * as architecture, not service.
 *
 * Confidentiality: prior version paraphrased FDA Type A meeting minutes
 * verbatim and cited line numbers (L497, L571–572). Per zaj-slides
 * HARD RULES (no internal correspondence pasted verbatim, no line-
 * numbered extractions from non-public documents), both cards now
 * paraphrase the regulatory position in the speaker's own voice and
 * cite the public trial registry (NCT04817761) + the public meeting
 * date as the source.
 */

const PILLARS = [
  {
    label: '3 / 4',
    title: 'Pillars agreed',
    sub: 'on the FDA Type A record',
    color: 'violet',
  },
  {
    label: '> 85%',
    title: 'AE-detection probability',
    sub: 'safety framework anchored — prepared in parallel with optimal design',
    color: 'cream',
  },
  {
    label: 'Repositioned',
    title: 'Simulated primary',
    sub: 'to dose confirmation in Cohorts 1 & 2 · Part 2 pending additional PopPK',
    color: 'cream',
    pill: true,
  },
];

const QUOTES = [
  {
    text: 'Sixty patients delivered the >85% AE-detection probability the agency was looking for — the same threshold the safety framework was sized against.',
    cite: 'FDA Type A · 21 Jul 2023',
  },
  {
    text: 'The simulated primary was not rejected — repositioned. FDA required additional PopPK in Cohorts 1 & 2 before Part 2 could rely on it.',
    cite: 'FDA Type A · 21 Jul 2023',
  },
];

export default function Slide26Case3FdaEngagement() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    waterfallLabel: 0.95,
    waterfall: 1.05,
    pillars: 1.40,
    quotesLabel: 3.20,
    quotes: 3.35,
    payoff: 4.00,
    source: 2.80,
  };

  const T = useTokens(['--violet', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="violet" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--violet)" delay={D.eyebrow}>CS3 · FDA engagement</Eyebrow>
      <Headline delay={D.headline} maxChars={50}>
        FDA agreed to{' '}
        <span style={{ color: 'var(--violet)', fontStyle: 'italic', fontWeight: 700 }}>
          N = 60
        </span>{' '}
        — a 36% reduction in adult enrollment.
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        FDA Type A · 21 July 2023 · pharmacometrics-anchored briefing in a rare adult oncology
        population —{' '}
        <span style={{ color: 'var(--violet)', fontWeight: 600 }}>
          three of four pillars agreed on the record
        </span>
        .
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: '1fr auto auto',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {/* TOP — waterfall + pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 1fr',
              gap: 'var(--space-7)',
              alignItems: 'stretch',
              minHeight: 0,
            }}
          >
            {/* Waterfall */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                rowGap: 'var(--space-3)',
                minHeight: 0,
              }}
            >
              <motion.div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-label)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--cream-muted)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: D.waterfallLabel }}
              >
                Sample size · adult Ph-neg ALL · primary endpoint evaluable
              </motion.div>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: 0,
                  maxHeight: '38vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SampleSizeWaterfall delay={D.waterfall} />
              </div>
            </div>

            {/* Pillar status */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                rowGap: 'var(--space-3)',
                minHeight: 0,
              }}
            >
              <motion.div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-label)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--violet)',
                  fontWeight: 700,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: D.waterfallLabel }}
              >
                Pillars agreed · pillars repositioned
              </motion.div>
              <div
                style={{
                  display: 'grid',
                  gridAutoRows: '1fr',
                  rowGap: 'var(--space-3)',
                  minHeight: 0,
                }}
              >
                {PILLARS.map((p, i) => (
                  <PillarStatus key={p.label} pillar={p} delay={D.pillars + i * 0.15} />
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM — paraphrased regulatory positions (was FDA verbatim
              quotes — see header note re: zaj-slides HARD RULES) */}
          <div>
            <motion.div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-muted)',
                marginBottom: 8,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.quotesLabel }}
            >
              Regulatory position · Type A meeting record
            </motion.div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-5)',
              }}
            >
              {QUOTES.map((q, i) => (
                <QuoteCard key={i} q={q} delay={D.quotes + i * 0.15} />
              ))}
            </div>
          </div>

          {/* Closing payoff */}
          <motion.div
            style={{
              padding: '12px 16px',
              borderLeft: '3px solid var(--violet)',
              background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
              borderRadius: 4,
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.payoff }}
          >
            <div
              className="deck-display italic"
              style={{
                fontSize: 'var(--fs-card-title)',
                color: 'var(--cream)',
                lineHeight: 1.4,
              }}
            >
              Two frameworks prepared · one sample size agreed · a documented precedent — the{' '}
              <span style={{ color: 'var(--violet)', fontWeight: 700, fontStyle: 'normal' }}>
                pharmacometric methodology now travels independent of trial outcome
              </span>
              .
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · FDA engagement"
        source="Source · FDA Type A meeting · 21 Jul 2023 · NCT04817761"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   PillarStatus — single status row (big numeral · title · sub)
   ======================================================== */
function PillarStatus({ pillar, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const isViolet = pillar.color === 'violet';
  return (
    <motion.div
      style={{
        padding: '14px 18px',
        borderRadius: 6,
        border: '1px solid var(--cream-hairline)',
        borderLeft: `3px solid ${isViolet ? 'var(--violet)' : 'var(--cream-faint)'}`,
        background: isViolet
          ? 'color-mix(in srgb, var(--violet) 10%, transparent)'
          : 'color-mix(in srgb, var(--panel) 50%, transparent)',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 16,
        alignItems: 'center',
      }}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <div
        className="deck-display"
        style={{
          fontSize: pillar.pill ? 'var(--fs-card-title)' : 'var(--fs-card-numeral)',
          fontWeight: 700,
          color: isViolet ? 'var(--violet)' : 'var(--cream)',
          letterSpacing: 'var(--ls-headline)',
          lineHeight: 1,
          minWidth: pillar.pill ? 'auto' : 110,
          paddingRight: 8,
          fontStyle: pillar.pill ? 'italic' : 'normal',
        }}
      >
        {pillar.label}
      </div>
      <div>
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-meta)',
            letterSpacing: '0.22em',
            color: isViolet ? 'var(--violet)' : 'var(--cream)',
            fontWeight: 700,
            marginBottom: 2,
          }}
        >
          {pillar.title}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            color: 'var(--cream-muted)',
            lineHeight: 1.4,
          }}
        >
          {pillar.sub}
        </div>
      </div>
    </motion.div>
  );
}

/* ========================================================
   QuoteCard — bordered regulatory-position card (paraphrase, not
   verbatim quote — see header note)
   ======================================================== */
function QuoteCard({ q, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        padding: '16px 20px',
        borderRadius: 6,
        border: '1px solid var(--violet)',
        background: 'color-mix(in srgb, var(--violet) 6%, transparent)',
        position: 'relative',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {/* Decorative oversized quote glyph removed: cards now hold
          paraphrased positions, not verbatim quotes — the glyph's only
          job was to mark them as direct citations and that signal would
          now mislead. (Resolves Phase C residual: hardcoded 2.2rem
          literal that sat in the --fs-card-title↔--fs-card-numeral
          typographic gap.) */}
      <div
        className="deck-display italic"
        style={{
          paddingLeft: 0,
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream)',
          lineHeight: 1.4,
          fontWeight: 400,
          marginBottom: 8,
        }}
      >
        {q.text}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          paddingLeft: 0,
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: '0.22em',
          color: 'var(--violet)',
          fontWeight: 700,
        }}
      >
        — {q.cite}
      </div>
    </motion.div>
  );
}
