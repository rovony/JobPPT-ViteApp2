// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import AiBrain from '../components/AiBrain';

const EASE = [0.2, 0.7, 0.3, 1];

const THREADS = [
  { tag: 'CS1', label: 'Dose', detail: 'Exposure matching carried a pediatric dose.', accent: 'var(--coral)' },
  { tag: 'CS2', label: 'Dossier', detail: 'Clinical pharmacology replaced local trial evidence.', accent: 'var(--cyan)' },
  { tag: 'CS3', label: 'Infrastructure', detail: 'Now the function has to scale that judgment.', accent: 'var(--sage)' },
];

const DEMANDS = [
  'E11A pediatric extrapolation',
  'ICH M15 MIDD evidence',
  'Rule 101 waivers',
  'Project Optimus dose work',
];

/**
 * CS3 Act 1 · The Question — the integration layer has to move.
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
        The pharmacometrician became{' '}
        <span style={{ color: 'var(--sage)' }}>the integration layer.</span>
      </Headline>

      <Subhead delay={0.45} maxChars={72} size="lead">
        CS1 and CS2 showed models can carry decisions when trials cannot.
        CS3 asks what infrastructure lets the function do that repeatedly.
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
            {THREADS.map((c, i) => (
              <React.Fragment key={c.tag}>
                {i > 0 && (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 calc(-1 * var(--space-3))',
                  }}>
                    <span className="deck-mono" style={{
                      fontSize: 'var(--fs-slide-pageno)',
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
              padding: 'var(--space-4) var(--space-5)',
              background: 'linear-gradient(90deg, color-mix(in srgb, var(--sage) 15%, transparent) 0%, transparent 100%)',
              borderLeft: '4px solid var(--sage)',
              borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
              maxWidth: '72ch',
              marginTop: 'var(--space-2)',
            }}
          >
            <p className="deck-display" style={{
              margin: 0,
              fontSize: 'var(--fs-slide-tagline)',
              fontStyle: 'italic', fontWeight: 500,
              lineHeight: 'var(--lh-snug)',
              color: 'var(--cream)',
            }}>
              The science was right both times.{' '}
              <span style={{ color: 'var(--sage)', fontWeight: 700 }}>
                The scaffolding became the constraint.
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
            {DEMANDS.map((fw) => (
              <span key={fw} className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-pageno)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--sage)',
                fontWeight: 600,
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: '999px',
                border: '1px solid color-mix(in srgb, var(--sage) 40%, transparent)',
                background: 'color-mix(in srgb, var(--sage) 12%, transparent)',
                boxShadow: '0 4px 12px color-mix(in srgb, var(--sage) 8%, transparent)',
              }}>{fw}</span>
            ))}
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Act 1 · The question"
        tagline="Same discipline, higher cadence — the function needs infrastructure, not another manual workaround."
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
        border: `1px solid color-mix(in srgb, ${c.accent} 30%, transparent)`,
        borderTop: `4px solid ${c.accent}`,
        borderRadius: 'var(--radius-lg)',
        background: `linear-gradient(145deg, color-mix(in srgb, ${c.accent} 12%, transparent) 0%, color-mix(in srgb, ${c.accent} 2%, transparent) 100%)`,
        backdropFilter: 'blur(8px)',
        boxShadow: `0 12px 32px color-mix(in srgb, ${c.accent} 8%, transparent)`,
        gap: 'var(--space-3)',
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <span className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: c.accent, fontWeight: 700,
        }}>{c.tag}</span>
        <span className="deck-display" style={{
          fontSize: 'var(--fs-slide-tagline)',
          color: 'var(--cream)', fontWeight: 600,
          lineHeight: 'var(--lh-tight)',
        }}>{c.label}</span>
        <span className="deck-body" style={{
          fontSize: 'var(--fs-slide-subhead)',
          color: 'var(--cream-muted)', fontWeight: 400,
          lineHeight: 'var(--lh-snug)',
        }}>{c.detail}</span>
      </div>

    </motion.div>
  );
}
