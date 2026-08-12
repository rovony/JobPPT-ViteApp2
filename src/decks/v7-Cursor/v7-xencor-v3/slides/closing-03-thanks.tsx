// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CLOSING · Slide 03 — Thank you / Q&A.
 *
 * Added 2026-04-26. Final slide. Title-style centered composition with
 * Q&A invitation and contact strip. Lives at the end of the live arc;
 * preceded by closing-01 (synthesis) and closing-02 (Xencor fit).
 */
const EASE = [0.2, 0.7, 0.3, 1];

export default function ClosingThanks() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Thank you · Open for discussion</Eyebrow>

      <Headline delay={0.25} maxChars={60}>
        I would be glad to take your questions.
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={go ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="deck-display"
            style={{
              fontSize: 'clamp(5rem, 12vw, 10rem)',
              fontWeight: 800,
              color: 'var(--amber)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              textShadow: '0 12px 40px color-mix(in srgb, var(--amber) 25%, transparent)',
              marginBottom: 'var(--space-2)',
            }}
          >
            Thank you.
          </motion.div>

          {/* Four discussion-prompt chips — invites the panel to a chosen depth */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(13rem, 100%), 1fr))',
              gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
              maxWidth: 'min(70rem, 92%)',
              width: '100%',
            }}
          >
            {[
              { c: 'var(--coral)', cs: 'CS1', label: 'Pediatric PopPK · ETA antagonism · ICH E11A' },
              { c: 'var(--teal)', cs: 'CS2', label: 'Asparlas · optimal design · FDA Type A alignment' },
              { c: 'var(--cyan)', cs: 'CS3', label: 'Ivosidenib India · reliance · cross-functional leadership' },
              { c: 'var(--sage)', cs: 'CS4', label: 'AI / ML platforms · ICH M15 audit · agent design' },
            ].map((chip) => (
              <div key={chip.cs} style={{
                padding: 'clamp(var(--space-3), 1.5vw, var(--space-4))',
                border: `1px solid color-mix(in srgb, ${chip.c} 32%, transparent)`,
                borderTop: `2px solid ${chip.c}`,
                borderRadius: 'var(--radius-md)',
                background: `color-mix(in srgb, ${chip.c} 5%, var(--panel))`,
                display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
              }}>
                <span className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: chip.c,
                  fontWeight: 700,
                }}>{chip.cs} · ready</span>
                <span className="deck-body" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  color: 'var(--cream)',
                  opacity: 0.85,
                  lineHeight: 1.4,
                }}>{chip.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Closing tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
            className="deck-display italic"
            style={{
              fontSize: 'var(--fs-slide-lead)',
              color: 'var(--amber)',
              fontWeight: 500,
              lineHeight: 1.4,
              maxWidth: 'min(60ch, 92%)',
            }}
          >
            &ldquo;When measurement falls short, clinical pharmacology makes the dose defensible.&rdquo;
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.5}
        kicker="Thank you"
        tagline="Malek Okour · Quantitative Pharmacology · Xencor seminar · June 2026"
        source="Sources: Okour 2023 JCP · FDA Type A 2023 · ICH E11A 2024 · ICH M15 2026 · Xencor public pipeline materials · Xencor Deck Content Pack"
      />
    </SlideGrid>
  );
}
