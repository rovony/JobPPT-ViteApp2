// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * 04 · Roadmap — "Four cases, four constraints, one discipline."
 *
 * MIN-DESIGN PASS. Text-forward case agenda. Sets the
 * coral / teal / cyan / sage case-color cascade preview so the audience
 * recognizes each color when its case opens.
 *
 * v7-xencor final case set:
 *   CS1 — Ambrisentan · pediatric PAH               · coral
 *   CS2 — Asparlas · efficient adult design          · teal
 *   CS3 — Ivosidenib · India reliance                · cyan
 *   CS4 — AI/ML clinical pharmacology tooling        · sage
 */

const CASES = [
  {
    n: '01',
    token: 'coral',
    drug: 'Ambrisentan',
    indication: 'Pediatric PAH',
    setting: 'EMA · PMDA · 2021',
    proves: 'Exposure matching as the regulatory bridge when an efficacy trial cannot be run.',
  },
  {
    n: '02',
    token: 'cyan',
    drug: 'Ivosidenib',
    indication: 'India reliance / trial waiver',
    setting: 'CDSCO · cross-functional',
    proves: 'Convergent evidence can replace a local trial — transport across a missing evidence base.',
  },
  {
    n: '03',
    token: 'teal',
    drug: 'Asparlas',
    indication: 'Adult ALL efficient design',
    setting: 'FDA Type A · 2023',
    proves: 'Precision-based design can replace endpoint power when the adult trial is not feasible.',
  },
  {
    n: '04',
    token: 'sage',
    drug: 'AI / Pharazi',
    indication: 'Audit-ready clinical pharmacology workflows',
    setting: 'Personal research · 2024-',
    proves: 'Fit-for-purpose AI with context of use, validation, and failure modes — not a product pitch.',
  },
];

const ROADMAP_AREAS = [
  'chrome-l chrome-l chrome-l chrome-l chrome-l chrome-l chrome-r chrome-r chrome-r chrome-r chrome-r chrome-r',
  'eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow',
  'headline headline headline headline headline headline headline headline headline headline headline headline',
  'subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead',
  'viz      viz      viz      viz      viz      viz      viz      viz      viz      viz      viz      viz',
  'conclusion conclusion conclusion conclusion conclusion conclusion conclusion conclusion conclusion conclusion conclusion conclusion',
  'footer   footer   footer   footer   footer   footer   footer   footer   footer   footer   footer   footer',
];

const CONCLUSION_RIBBON_STYLE = {
  width: '100%',
  border: '1px solid var(--cream-hairline)',
  borderTop: '3px solid var(--amber)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--panel)',
  padding: 'var(--space-4) var(--space-6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--space-4)',
  flexWrap: 'wrap',
};

const CONCLUSION_TEXT_STYLE = {
  fontSize: 'var(--fs-slide-tagline)',
  color: 'var(--cream)',
  lineHeight: 1.35,
  width: '100%',
  textAlign: 'center',
};

export default function Roadmap({ deck }) {
  const reduced = useReducedMotion();
  const d = (ms) => (reduced ? 0 : Math.min(ms, 0.35));

  return (
    <SlideGrid
      dataCase="amber"
      areas={ROADMAP_AREAS}
      rowSizes="auto auto auto auto minmax(0, 1fr) auto auto"
    >
      <Eyebrow color="var(--amber)" delay={0.06}>
        Roadmap · the next 35 minutes
      </Eyebrow>

      <Headline delay={0.12} maxChars={56}>
        Four cases. Four constraints.{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 500 }}>
          One discipline at the center.
        </span>
      </Headline>

      <Subhead delay={0.22} maxChars={58} size="lead">
        Four decision constraints. One discipline that makes each answer defensible.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 'clamp(var(--space-3), 2vh, var(--space-6))',
            paddingBottom: 'clamp(var(--space-2), 1.5vh, var(--space-4))',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'grid',
              /* auto-fit + minmax keeps 3-up on desktop, reflows to 1-up
                 on portrait phone — per CLAUDE.md "Layout responsiveness". */
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
              gap: 'clamp(var(--space-4), 2.5vw, var(--space-6))',
            }}
          >
            {CASES.map((c, i) => {
              const accent = `var(--${c.token})`;
              return (
                <motion.div
                  key={c.n}
                  layoutId={`case-card-${c.token}`}
                  style={{
                    position: 'relative',
                    minWidth: 0,
                    border: '1px solid var(--cream-hairline)',
                    borderTop: `3px solid ${accent}`,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--panel)',
                    padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                  }}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.35,
                    delay: d(0.12 + i * 0.06),
                    ease: [0.2, 0.7, 0.3, 1],
                  }}
                >
                  {/* Case number — large mono, accent-colored */}
                  <div
                    className="deck-mono"
                    style={{
                      fontSize: 'var(--fs-slide-name)',
                      color: accent,
                      letterSpacing: '0.08em',
                      fontVariantNumeric: 'tabular-nums',
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    CASE {c.n}
                  </div>

                  {/* Drug name — display, larger */}
                  <div
                    className="deck-display"
                    style={{
                      fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                      color: 'var(--cream)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.015em',
                      fontWeight: 600,
                    }}
                  >
                    {c.drug}
                  </div>

                  {/* Indication */}
                  <div
                    className="deck-body"
                    style={{
                      fontSize: 'var(--fs-slide-subhead)',
                      color: 'var(--cream)',
                      opacity: 0.88,
                      lineHeight: 1.4,
                    }}
                  >
                    {c.indication}
                  </div>

                  {/* Setting / regulator / year — mono */}
                  <div
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'var(--fs-slide-eyebrow)',
                      color: 'var(--cream-muted)',
                      letterSpacing: '0.1em',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {c.setting}
                  </div>

                  {/* Hairline divider */}
                  <div
                    aria-hidden
                    style={{
                      width: '100%',
                      height: 'var(--stroke-hair)',
                      background: 'var(--cream-hairline)',
                      marginTop: 'var(--space-1)',
                      marginBottom: 'var(--space-1)',
                    }}
                  />

                  {/* What this case proves — body */}
                  <div
                    className="deck-body"
                    style={{
                      fontSize: 'var(--fs-slide-subhead)',
                      color: 'var(--cream-muted)',
                      lineHeight: 1.5,
                      flex: 1,
                    }}
                  >
                    {c.proves}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Viz>

      <GridSlot
        area="conclusion"
        motion={{
          initial: reduced ? false : { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          delay: d(0.28),
        }}
        style={CONCLUSION_RIBBON_STYLE}
      >
        <div
          className="deck-display"
          style={CONCLUSION_TEXT_STYLE}
        >
          One discipline carrying the decision in each case — then portfolio breadth and the Xencor bridge.
        </div>
      </GridSlot>

      <Footer
        delay={d(0.32)}
        kicker="Roadmap · four cases · portfolio · Xencor bridge · Q&A"
        tagline="Four cases build the core; the portfolio and bridge translate it to Xencor."
      />
    </SlideGrid>
  );
}
