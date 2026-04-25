import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · BG-2 — Class history that frames this case.
 *
 * MIN-DESIGN. Three precedent cards (sildenafil · bosentan · ambrisentan
 * positioning). The single most important number is STARTS-2 HR=3.95.
 * v2 design pass: candidate for a horizontal precedent timeline with
 * regulatory-decision markers (FDA black box, EMA divergence).
 */

const PRECEDENTS = [
  {
    drug: 'Sildenafil',
    trial: 'STARTS-1 / STARTS-2',
    headline: 'High-dose mortality signal',
    detail: 'HR 3.95 high-vs-low dose in STARTS-2. FDA recommended against use in pediatric PAH (2012). EMA approved low-dose only — the first regulatory schism in the class.',
    tone: 'cream',
  },
  {
    drug: 'Bosentan',
    trial: 'FUTURE-1 / FUTURE-2',
    headline: 'Hepatotoxicity black box',
    detail: 'PK-bridging precedent established. Pediatric label achieved — but with a hepatotoxicity black box that defines the class concern ambrisentan inherits.',
    tone: 'cream',
  },
  {
    drug: 'Ambrisentan',
    trial: 'AMB112529',
    headline: 'The ERA without the hepatotox',
    detail: 'No hepatotoxicity black box in adults. The pediatric question is whether allometric exposure-matching can deliver the dose without re-running an underpowered efficacy trial.',
    tone: 'coral',
  },
];

export default function Cs1Class() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · Class history
      </Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        STARTS-2 closed one door.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
          FUTURE-1 opened another.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        The class arrived at the ambrisentan pediatric program with one
        cautionary tale and one methodological precedent.
      </Subhead>

      <Viz>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
          gap: 'clamp(var(--space-3), 2vw, var(--space-6))',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
          alignItems: 'stretch',
        }}>
          {PRECEDENTS.map((p, i) => {
            const accent = p.tone === 'coral' ? 'var(--coral)' : 'var(--cream-muted)';
            const isHero = p.tone === 'coral';
            return (
              <motion.div
                key={p.drug}
                initial={{ opacity: 0, y: 12 }}
                animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.85 + i * 0.14, ease: [0.2, 0.7, 0.3, 1] }}
                style={{
                  position: 'relative',
                  minWidth: 0,
                  border: `1px solid ${isHero
                    ? 'color-mix(in srgb, var(--coral) 38%, transparent)'
                    : 'var(--cream-hairline)'}`,
                  borderLeft: `3px solid ${accent}`,
                  borderRadius: 'var(--radius-md)',
                  background: isHero
                    ? 'color-mix(in srgb, var(--coral) 6%, transparent)'
                    : 'color-mix(in srgb, var(--panel) 60%, transparent)',
                  padding: 'clamp(var(--space-3), 2vw, var(--space-5))',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                }}
              >
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  color: accent,
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}>
                  {p.trial}
                </div>
                <div className="deck-display" style={{
                  fontSize: 'clamp(1.3rem, 2.4vw, 1.9rem)',
                  color: 'var(--cream)',
                  fontWeight: 600,
                  lineHeight: 1.05,
                  letterSpacing: '-0.015em',
                }}>
                  {p.drug}
                </div>
                <div className="deck-display italic" style={{
                  fontSize: 'var(--fs-slide-name)',
                  color: accent,
                  fontWeight: 500,
                  lineHeight: 1.2,
                  marginTop: 'var(--space-1)',
                }}>
                  {p.headline}
                </div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream-muted)',
                  lineHeight: 1.45,
                  marginTop: 'var(--space-1)',
                }}>
                  {p.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Case 01 · Class history — what the field already knew"
        tagline="One mortality signal, one PK-bridging precedent — the table our case sits on."
        source="Source · Krishnan 2019 PMC6389358 · Beghetti 2009 BJCP · FDA Drug Safety Communication 2012"
      />
    </SlideGrid>
  );
}
