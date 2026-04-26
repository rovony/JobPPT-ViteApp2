import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import AiBrain from '../components/AiBrain';

const EASE = [0.2, 0.7, 0.3, 1];

const CASES = [
  {
    tag: 'CS1', label: 'Ambrisentan',
    detail: 'Pediatric PopPK',
    time: '~3 yrs', timeLabel: 'to defend',
    accent: 'var(--coral)',
  },
  {
    tag: 'CS2', label: 'Ivosidenib',
    detail: 'Six-pillar dossier',
    time: '18 mo', timeLabel: 'cross-functional',
    accent: 'var(--cyan)',
  },
  {
    tag: 'Next decade', label: '100+ decisions',
    detail: 'E11A · M15 · Rule 101 · Optimus',
    time: '?', timeLabel: 'same cadence?',
    accent: 'var(--sage)', highlighted: true,
  },
];

/**
 * CS3 Act 1 · The Question — the next decade needs more.
 *
 * Refactored to use SlideGrid + standard layout parts so it
 * sits inside DeckLayout/BodyLayout correctly, matching every
 * other slide in the deck.
 */
export default function CS3Question() {
  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      {/* Ambient AiBrain — background echo */}
      <div
        style={{
          position: 'absolute',
          top: '8%', right: '0',
          width: 'clamp(260px, 35vw, 520px)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        <AiBrain layoutId={null} variant="ambient" />
      </div>

      <Eyebrow delay={0.10}>Case 03 · The question</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        The next decade will ask for a hundred more{' '}
        <span style={{ color: 'var(--sage)' }}>CS1s and CS2s.</span>
      </Headline>

      <Subhead delay={0.45} maxChars={72} size="lead">
        Pediatric extrapolation. Regional bridging. Dose optimization under
        ICH M15. The function that answered two cases cannot keep assembling
        the evidence case-by-case.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            gap: 'var(--space-4)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Case cadence cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr auto 1fr',
              gap: 'var(--space-2)',
            }}
          >
            {CASES.map((c, i) => (
              <React.Fragment key={c.tag}>
                {i > 0 && (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 calc(-1 * var(--space-3))',
                  }}>
                    <span className="deck-mono" style={{
                      fontSize: 'var(--fs-card-label)',
                      color: 'var(--cream-faint)', opacity: 0.5,
                    }}>→</span>
                  </div>
                )}
                <CaseCard c={c} delay={0.7 + i * 0.15} />
              </React.Fragment>
            ))}
          </motion.div>

          {/* Punchline */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 1.3 }}
            style={{
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--sage) 8%, transparent)',
              borderLeft: '3px solid var(--sage)',
              maxWidth: '64ch',
            }}
          >
            <p className="deck-display" style={{
              margin: 0,
              fontSize: 'var(--fs-slide-tagline)',
              fontStyle: 'italic', fontWeight: 500,
              lineHeight: 'var(--lh-snug)',
              color: 'var(--cream)',
            }}>
              The science was right both times — the scaffolding was the constraint.{' '}
              <span style={{ color: 'var(--sage)', fontWeight: 700 }}>
                The next decade cannot afford that cadence.
              </span>
            </p>
          </motion.div>

          {/* Regulation tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 1.5 }}
            style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}
          >
            {['E11A Pediatric', 'ICH M15 MIDD', 'Rule 101 Waivers', 'Project Optimus'].map((fw) => (
              <span key={fw} className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-card-meta)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--sage)',
                fontWeight: 600,
                padding: 'var(--space-1) var(--space-2)',
                border: '1px solid color-mix(in srgb, var(--sage) 30%, transparent)',
                background: 'color-mix(in srgb, var(--sage) 6%, transparent)',
              }}>{fw}</span>
            ))}
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Act 1 · The question"
        tagline="Same function, same pattern — but the volume of decisions is about to scale."
        delay={1.7}
      />
    </SlideGrid>
  );
}

function CaseCard({ c, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        display: 'flex', flexDirection: 'column',
        padding: 'var(--space-4) var(--space-5)',
        border: `1px solid color-mix(in srgb, ${c.accent} ${c.highlighted ? '50%' : '30%'}, transparent)`,
        borderTop: `3px solid ${c.accent}`,
        background: c.highlighted
          ? `color-mix(in srgb, ${c.accent} 10%, var(--panel))`
          : 'var(--panel)',
        gap: 'var(--space-3)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <span className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: c.accent, fontWeight: 700,
        }}>{c.tag}</span>
        <span className="deck-display" style={{
          fontSize: 'var(--fs-card-title)',
          color: 'var(--cream)', fontWeight: 600,
          lineHeight: 'var(--lh-tight)',
        }}>{c.label}</span>
        <span className="deck-body" style={{
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)', fontWeight: 400,
          lineHeight: 'var(--lh-snug)',
        }}>{c.detail}</span>
      </div>

      <div style={{
        marginTop: 'auto',
        borderTop: `1px solid color-mix(in srgb, ${c.accent} 20%, transparent)`,
        paddingTop: 'var(--space-3)',
        display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)',
      }}>
        <span className="deck-display" style={{
          fontSize: 'var(--fs-card-numeral)',
          fontWeight: 700, color: c.accent,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>{c.time}</span>
        <span className="deck-mono" style={{
          fontSize: 'var(--fs-card-meta)',
          color: 'var(--cream-faint)',
          textTransform: 'uppercase',
          letterSpacing: 'var(--ls-mono)',
        }}>{c.timeLabel}</span>
      </div>
    </motion.div>
  );
}
