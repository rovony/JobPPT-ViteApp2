// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const REASONS = [
  {
    num: '01',
    title: 'Developmental',
    body: 'Children <7–8 years cannot perform the test reliably — coordination, comprehension, and stamina vary widely.',
  },
  {
    num: '02',
    title: 'Motivational',
    body: 'Effort-dependent endpoint; children are inconsistent in giving "best effort" across visits.',
  },
  {
    num: '03',
    title: 'Growth-confounded',
    body: '6–12 month trials overlap with growth spurts — baseline distance shifts independent of treatment.',
  },
  {
    num: '04',
    title: 'Etiologic heterogeneity',
    body: 'IPAH vs CHD-associated PAH have different baseline 6MWD; pooling obscures treatment signal.',
  },
  {
    num: '05',
    title: 'Ceiling / floor',
    body: 'Mild adolescents walk near healthy norms (ceiling); severe toddlers cannot walk at all (floor).',
  },
];

export default function Cs1BackupB6_6mwd() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B6 · Endpoint validity</Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        6MWD isn't a defensible primary efficacy endpoint in pediatric PAH.
      </Headline>

      <Viz>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            padding: 'var(--space-3) 0',
            minWidth: 0,
            minHeight: 0,
            overflow: 'auto',
          }}
        >
          {REASONS.map((r, i) => (
            <motion.div
              key={r.num}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.45,
                delay: reduced ? 0 : 0.5 + i * 0.1,
                ease: EASE,
              }}
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                alignItems: 'baseline',
                padding: 'var(--space-3) var(--space-4)',
                background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                border: '1px solid var(--cream-hairline)',
                borderRadius: 'var(--radius-lg)',
                position: 'relative',
                minWidth: 0,
              }}
            >
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'var(--case)', borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)' }} />

              <span
                className="deck-mono"
                style={{
                  fontSize: 'var(--fs-card-numeral)',
                  color: 'var(--case)',
                  fontWeight: 700,
                  flexShrink: 0,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {r.num}
              </span>

              <div style={{ minWidth: 0 }}>
                <div
                  className="deck-display"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream)',
                    fontWeight: 600,
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {r.title}
                </div>
                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream-muted)',
                    lineHeight: 1.45,
                  }}
                >
                  {r.body}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Coral accent callout */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 1.1,
              ease: EASE,
            }}
            style={{
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--case) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--case) 35%, transparent)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
            }}
          >
            <span
              className="deck-display"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                color: 'var(--case)',
                fontWeight: 600,
                fontStyle: 'italic',
              }}
            >
              No pediatric PAH trial has hit a 6MWD primary at α = 0.05.
            </span>
          </motion.div>

          {/* Gabler 2012 note */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 1.35,
              ease: EASE,
            }}
            className="deck-mono"
            style={{
              fontSize: 'var(--fs-slide-pageno)',
              color: 'var(--cream-faint)',
              letterSpacing: 'var(--ls-mono)',
              textAlign: 'center',
            }}
          >
            Gabler 2012: 6MWD improvement does not reliably predict mortality benefit.
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.5}
        kicker="B6 · CS1 · 6MWD ENDPOINT"
        source="Source · Gabler et al. Circulation 2012 · STARTS-1 · Lilly tadalafil NCT01824290"
      />
    </SlideGrid>
  );
}
