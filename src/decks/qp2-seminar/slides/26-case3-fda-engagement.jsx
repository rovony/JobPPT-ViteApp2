import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import SampleSizeWaterfall from './cs3-engagement/SampleSizeWaterfall';

/**
 * Slide 26 · CS3 FDA Engagement — N = 60 agreed.
 *
 * 2026-04-24 redesign (Agent D · CS3 cluster fix):
 *   • Top half: hairline panel for the waterfall (left, ~58%) + three pillar
 *     status rows (right, ~42%). Both square-cornered, no fills.
 *   • Bottom half: a SINGLE editorial regulatory-position block — eyebrow +
 *     two paraphrased FDA positions side-by-side connected by a hairline,
 *     with the durable-methodology payoff inline as the last sentence.
 *
 * Removed (zaj-slides v2.1 / craft-bans-and-borders compliance):
 *   • borderRadius: 6 on PillarStatus and QuoteCard
 *   • borderRadius: 4 + tinted background on the closing "two frameworks"
 *     panel (was decorative chrome floating above the regulatory cards).
 *   • maxHeight: 38vh constraint on the waterfall area — at 1920×1080 it
 *     created a parking-lot of empty space above the bottom rows that
 *     visually collapsed the layout (both labels overlapped).
 *
 * Confidentiality: prior version paraphrased FDA Type A meeting minutes
 * verbatim and cited line numbers (L497, L571–572). Per zaj-slides
 * HARD RULES (no internal correspondence pasted verbatim, no line-
 * numbered extractions from non-public documents), both positions now
 * paraphrase the regulatory exchange in the speaker's own voice and
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

const POSITIONS = [
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
    positionsLabel: 3.20,
    positions: 3.35,
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
            // Top: chart + pillars take ~58% of viz, bottom regulatory
            // block takes the rest. minmax(0,*) on both rows lets the
            // top row absorb but stops the bottom row from collapsing
            // to 0 if content is small.
            gridTemplateRows: 'minmax(0, 1.35fr) minmax(0, 1fr)',
            rowGap: 'var(--space-5)',
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
            {/* Waterfall — hairline panel (zaj-slides v2.1). Square
                corners, no fill, no shadow. Lets the chart breathe at
                both 1366 and 1920. */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                rowGap: 'var(--space-3)',
                minHeight: 0,
                border: '1px solid var(--cream-hairline)',
                borderRadius: 0,
                padding: 'var(--space-3)',
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SampleSizeWaterfall delay={D.waterfall} />
              </div>
            </div>

            {/* Pillar status — three rows, hairline borders, no fill,
                no rounded corners. The accent rule on the left is the
                only chrome (and only the agreed pillar carries the
                violet rule + tint). */}
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

          {/* BOTTOM — single editorial regulatory-position block.
              Replaces previous (rounded · violet-tinted · floating)
              QuoteCard pair + (rounded · panel-tinted · floating)
              payoff card. Now: one hairline-topped block with a label
              eyebrow, two side-by-side positions split by a vertical
              hairline, and a payoff sentence anchored at the bottom. */}
          <motion.div
            style={{
              display: 'grid',
              gridTemplateRows: 'auto minmax(0, 1fr) auto',
              rowGap: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
              paddingTop: 'var(--space-4)',
              minHeight: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.positionsLabel }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-muted)',
              }}
            >
              Regulatory position · Type A meeting record
            </div>

            {/* Two positions, split by a vertical hairline. No
                cards, no fills, no rounded corners. Typography is the
                only structure: each position is a paraphrased prose
                line + a mono cite. */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1px 1fr',
                columnGap: 'var(--space-6)',
                alignItems: 'start',
                minHeight: 0,
              }}
            >
              <PositionLine pos={POSITIONS[0]} delay={D.positions} reduced={false} />
              <div
                aria-hidden
                style={{
                  width: 1,
                  height: '100%',
                  background: 'var(--cream-hairline)',
                  alignSelf: 'stretch',
                }}
              />
              <PositionLine
                pos={POSITIONS[1]}
                delay={D.positions + 0.15}
                reduced={false}
              />
            </div>

            {/* Closing payoff sentence — inline with the regulatory
                block instead of floating in its own panel. The kicker
                grounds it as a deck-wide claim, the prose carries the
                weight. */}
            <motion.div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: '8px 18px',
                paddingTop: 'var(--space-3)',
                borderTop: '1px solid var(--cream-hairline)',
              }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: D.payoff }}
            >
              <span
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-meta)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--violet)',
                  fontWeight: 700,
                }}
              >
                Pharmacometric methodology
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-card-body)',
                  color: 'var(--cream)',
                  lineHeight: 1.45,
                  flex: '1 1 480px',
                }}
              >
                Two frameworks prepared · one sample size agreed —{' '}
                <span style={{ color: 'var(--violet)', fontWeight: 700 }}>
                  the methodology now travels independent of trial outcome.
                </span>
              </span>
            </motion.div>
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
   PillarStatus — single status row (big numeral · title · sub).
   Square-cornered, hairline border, accent rule on the left.
   Only the "agreed" pillar carries the violet accent.
   ======================================================== */
function PillarStatus({ pillar, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const isViolet = pillar.color === 'violet';
  return (
    <motion.div
      style={{
        padding: 'var(--space-3) var(--space-4)',
        borderRadius: 0,
        border: '1px solid var(--cream-hairline)',
        borderLeft: `3px solid ${isViolet ? 'var(--violet)' : 'var(--cream-faint)'}`,
        background: isViolet
          ? 'color-mix(in srgb, var(--violet) 8%, transparent)'
          : 'transparent',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 18,
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
            marginBottom: 4,
          }}
        >
          {pillar.title}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            color: 'var(--cream-muted)',
            lineHeight: 1.45,
          }}
        >
          {pillar.sub}
        </div>
      </div>
    </motion.div>
  );
}

/* ========================================================
   PositionLine — paraphrased regulatory position. No card chrome:
   just italic display prose + mono cite, separated from the
   neighbour by a vertical hairline rendered by the parent grid.
   The display body bumps from --fs-card-body → --fs-card-title
   (per user feedback "font sizes") so the regulatory exchange
   reads as the bottom-half headline it is.
   ======================================================== */
function PositionLine({ pos, delay, reduced }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        minWidth: 0,
      }}
    >
      <div
        className="deck-display italic"
        style={{
          fontSize: 'var(--fs-card-title)',
          color: 'var(--cream)',
          lineHeight: 1.4,
          fontWeight: 400,
        }}
      >
        {pos.text}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--violet)',
          fontWeight: 700,
        }}
      >
        — {pos.cite}
      </div>
    </motion.div>
  );
}
