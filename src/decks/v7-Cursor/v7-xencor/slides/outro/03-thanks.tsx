// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CLOSING · Thank you / Q&A — light-editorial paper close.
 * Critical type is solid; chips use panel + top accent (no glow).
 */
const EASE = [0.2, 0.7, 0.3, 1];

const CHIPS = [
  { c: 'var(--coral)', cs: 'CS1', label: 'Pediatric PopPK · ETA antagonism · ICH E11A' },
  { c: 'var(--teal)', cs: 'CS2', label: 'Asparlas · optimal design · FDA Type A alignment' },
  { c: 'var(--cyan)', cs: 'CS3', label: 'Ivosidenib India · reliance · cross-functional leadership' },
  { c: 'var(--sage)', cs: 'CS4', label: 'AI / ML platforms · ICH M15 audit · agent design' },
];

export default function ClosingThanks() {
  const reduced = useReducedMotion();
  const d = (ms) => (reduced ? 0 : Math.min(ms, 0.35));

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={d(0.06)}>Thank you · Open for discussion</Eyebrow>

      <Headline delay={d(0.1)} maxChars={60}>
        I would be glad to take your questions.
      </Headline>

      <Subhead delay={d(0.16)} size="lead" maxChars={120}>
        Four cases, one discipline — I&rsquo;m here to discuss any of them in more depth, or to talk about how that translates to Xencor&rsquo;s clinical pharmacology priorities.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%', height: '100%',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(var(--space-5), 4vh, var(--space-8))',
          textAlign: 'center',
        }}>
          {/* Solid brand close — never opacity-gated */}
          <div
            className="deck-display"
            style={{
              fontSize: 'clamp(4rem, 9vw, 8rem)',
              fontWeight: 700,
              color: 'var(--amber)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: 'var(--space-2)',
            }}
          >
            Thank you.
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, delay: d(0.18), ease: EASE }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(13rem, 100%), 1fr))',
              gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
              maxWidth: 'min(70rem, 92%)',
              width: '100%',
            }}
          >
            {CHIPS.map((chip) => (
              <div key={chip.cs} style={{
                padding: 'clamp(var(--space-3), 1.5vw, var(--space-4))',
                border: '1px solid var(--cream-hairline)',
                borderTop: `3px solid ${chip.c}`,
                borderRadius: 'var(--radius-md)',
                background: 'var(--panel)',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
              }}>
                <span className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: '0.06em',
                  color: chip.c,
                  fontWeight: 700,
                }}>{chip.cs} · ready</span>
                <span className="deck-body" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  color: 'var(--cream)',
                  lineHeight: 1.4,
                }}>{chip.label}</span>
              </div>
            ))}
          </motion.div>

          <p
            className="deck-display italic"
            style={{
              fontSize: 'var(--fs-slide-lead)',
              color: 'var(--amber)',
              fontWeight: 500,
              lineHeight: 1.4,
              maxWidth: 'min(60ch, 92%)',
              margin: 0,
            }}
          >
            &ldquo;When measurement falls short, clinical pharmacology makes the dose defensible.&rdquo;
          </p>
        </div>
      </Viz>

      <Footer
        delay={d(0.28)}
        kicker="Thank you"
        tagline="Malek Okour · Quantitative Pharmacology · Xencor seminar · June 2026"
        source="Sources: Okour 2023 JCP · FDA Type A 2023 · ICH E11A 2024 · ICH M15 2026 · Xencor public pipeline materials"
      />
    </SlideGrid>
  );
}
