// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CLOSING · Slide 02 — Why Merck QP2 specifically.
 *
 * Added 2026-04-26. Pivots from synthesis to "what I bring" — the
 * specific intersections between this candidacy and Merck's QP2 / CMD
 * portfolio (sotatercept, oncology, AI/ML platform investment).
 *
 * Reads as the candidate's own answer to "why you, why us, why now"
 * without using those words. Three intersection cards.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const INTERSECTIONS = [
  {
    n: '01',
    color: 'var(--coral)',
    label: 'PAH · sotatercept',
    headline: 'I have lived inside this disease.',
    body: 'Eight years of pediatric PAH PopPK + regulatory bridging. Sotatercept (Winrevair) opened the BMPR2 / activin pathway in March 2024 — the fourth column. I read that label as a continuation of the work that brought me here.',
  },
  {
    n: '02',
    color: 'var(--cyan)',
    label: 'Oncology · IDH1 / rare populations',
    headline: 'I have run dossiers when trials are not feasible.',
    body: 'Ivosidenib India was a six-pillar dossier replacing a local trial — MOA-anchored, regulator-aligned. Merck\'s oncology pipeline has the same structural problem at scale: small populations, fast-moving competitors, regulatory geography that fragments trials.',
  },
  {
    n: '03',
    color: 'var(--sage)',
    label: 'Platform · AI/ML in QSP / PopPK',
    headline: 'I build the infrastructure, not just the analyses.',
    body: 'PharmAgent is a 13-agent research platform: ICH M15-aligned audit by construction, schema-only privacy, deterministic tool execution. Merck\'s QP2 organization has stated AI/ML as a strategic priority. I bring the architecture judgment to build this infrastructure around existing scientific workflows.',
  },
];

export default function ClosingMerck() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Closing · The fit</Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        Three intersections —{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 600 }}>
          this work, this team, this moment.
        </span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        What I bring lines up with where the QP2 organization is investing — pathway biology, dossier-led approvals, platform infrastructure.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%', height: '100%',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
        }}>
          {INTERSECTIONS.map((it, i) => (
            <motion.div
              key={it.n}
              initial={{ opacity: 0, x: -10 }}
              animate={go ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.7 + i * 0.15, ease: EASE }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
                alignItems: 'baseline',
                padding: 'clamp(var(--space-3), 1.4vw, var(--space-4)) clamp(var(--space-4), 2vw, var(--space-5))',
                border: '1px solid var(--cream-hairline)',
                borderLeft: `4px solid ${it.color}`,
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
                minWidth: 0,
              }}
            >
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'flex-start',
                gap: 0,
                minWidth: '4rem',
              }}>
                <span className="deck-display" style={{
                  fontSize: 'var(--fs-slide-headline)',
                  color: it.color,
                  fontWeight: 700,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}>{it.n}</span>
                <span className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: it.color,
                  fontWeight: 700,
                  textAlign: 'center',
                  marginTop: 'var(--space-1)',
                }}>{it.label}</span>
              </div>
              <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div className="deck-display" style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  color: it.color,
                  fontWeight: 700,
                  fontStyle: 'italic',
                  lineHeight: 1.3,
                }}>{it.headline}</div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream)',
                  opacity: 0.9,
                  lineHeight: 1.5,
                }}>{it.body}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.7}
        kicker="Closing · The fit"
        tagline="The function keeps owning the science. I bring the methods, the regulator-tested judgment, and the platform mindset."
      />
    </SlideGrid>
  );
}
