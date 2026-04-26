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
 * preceded by closing-01 (synthesis) and closing-02 (Merck fit).
 */
const EASE = [0.2, 0.7, 0.3, 1];

export default function ClosingThanks() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Thank you · Open for discussion</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        I would be glad to{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 600 }}>
          take your questions.
        </span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        Three cases, one discipline — I&rsquo;m here to discuss any of them in more depth, or to talk about how that translates to QP2 / CMD priorities.
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
          {/* Three discussion-prompt chips — invites the panel to a chosen depth */}
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
              { c: 'var(--cyan)', cs: 'CS2', label: 'India CDSCO · Six-pillar dossier · IDH1' },
              { c: 'var(--sage)', cs: 'CS3', label: 'AI / ML platforms · ICH M15 audit · agent design' },
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
            &ldquo;The trial is not the only answer.&rdquo;
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.5}
        kicker="Thank you"
        tagline="Malek Okour · Quantitative Pharmacology · Spring 2026"
        source="Sources: Okour 2023 JCP · ESC/ERS 2022 · ICH E11A 2024 · ICH M15 2024 · Garnett-Florian FDA 2017 · CDSCO Rule 101 (2019)"
      />
    </SlideGrid>
  );
}
