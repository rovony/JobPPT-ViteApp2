// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * 04 · Roadmap — compact case agenda (deck chrome).
 *
 * Distinct from slide 03 (blueprint “what you will see”). Same locked
 * presentation order; shorter cards without mini-diagrams.
 * Order: Ambrisentan → Ivosidenib India → Asparlas → Pharazi
 */

const CASES = [
  {
    n: '01',
    token: 'coral',
    drug: 'Ambrisentan',
    indication: 'Pediatric PAH',
    setting: '15–17 min · EMA · PMDA',
    proves: 'Exposure matching when the efficacy trial cannot carry the label.',
  },
  {
    n: '02',
    token: 'cyan',
    drug: 'Ivosidenib · India',
    indication: 'IDH1-mutant AML reliance',
    setting: '11 min · CDSCO',
    proves: 'Convergent evidence across a missing local package.',
  },
  {
    n: '03',
    token: 'teal',
    drug: 'Asparlas',
    indication: 'Adult Ph− ALL efficient design',
    setting: '7 min · FDA Type A',
    proves: 'Precision design when endpoint power is undeliverable.',
  },
  {
    n: '04',
    token: 'sage',
    drug: 'Pharazi',
    indication: 'Audit-ready clin pharm workflows',
    setting: '3 min · personal research',
    proves: 'Traceable, human-accountable systems — not a product pitch.',
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

export default function Roadmap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid
      dataCase="amber"
      areas={ROADMAP_AREAS}
      rowSizes="auto auto auto auto minmax(0, 1fr) auto auto"
    >
      <Eyebrow color="var(--amber)" delay={0.1}>
        Agenda · the next ~35 minutes
      </Eyebrow>

      <Headline delay={0.22} maxChars={56}>
        Four cases. Four constraints.{' '}
        <span className="xc-amber" style={{ fontStyle: 'italic', fontWeight: 500 }}>
          One discipline.
        </span>
      </Headline>

      <Subhead delay={0.4} maxChars={88} size="lead">
        Unequal depth by design — then portfolio breadth and the Xencor bridge.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 'clamp(var(--space-3), 1.5vw, var(--space-6))',
            alignItems: 'stretch',
            paddingTop: 'clamp(var(--space-2), 1.5vh, var(--space-4))',
          }}
        >
          {CASES.map((c, i) => {
            const accent = `var(--${c.token})`;
            return (
              <motion.div
                key={c.n}
                className="xc-agenda-card"
                style={{
                  border: `1.5px solid ${accent}`,
                  borderLeft: `4px solid ${accent}`,
                  background: `linear-gradient(180deg,
                    color-mix(in srgb, ${accent} 12%, transparent),
                    color-mix(in srgb, var(--panel) 75%, transparent) 70%)`,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.42,
                  delay: reduced ? 0 : 0.5 + i * 0.08,
                  ease: [0.2, 0.7, 0.3, 1],
                }}
              >
                <div className="xc-tag" style={{ color: accent, letterSpacing: '0.08em' }}>
                  CASE {c.n}
                </div>
                <div className="xc-agenda-card__drug">{c.drug}</div>
                <div
                  className="xc-subhead xc-ink"
                  style={{
                    opacity: 0.88,
                    lineHeight: 1.3,
                  }}
                >
                  {c.indication}
                </div>
                <div
                  className="xc-meta xc-muted"
                  style={{ letterSpacing: '0.08em' }}
                >
                  {c.setting}
                </div>
                <div
                  aria-hidden
                  style={{
                    width: '100%',
                    height: 'var(--stroke-hair)',
                    background: 'var(--cream-hairline)',
                    marginTop: 'var(--space-1)',
                  }}
                />
                <div
                  className="xc-subhead xc-muted"
                  style={{
                    lineHeight: 1.4,
                    flex: 1,
                  }}
                >
                  {c.proves}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Viz>

      <GridSlot
        area="conclusion"
        motion={{
          initial: { opacity: 0, y: 8 },
          animate: go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
          delay: reduced ? 0 : 0.9,
        }}
        style={{
          width: '100%',
          border: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
          borderRadius: 'var(--radius-md)',
          background:
            'linear-gradient(90deg, color-mix(in srgb, var(--amber) 18%, transparent), color-mix(in srgb, var(--amber) 7%, transparent))',
          padding: 'var(--space-3) var(--space-5)',
          textAlign: 'center',
        }}
      >
        <div className="xc-band xc-ink" style={{ lineHeight: 1.25 }}>
          Cases first — then portfolio breadth and the Xencor bridge.
        </div>
      </GridSlot>

      <Footer
        delay={reduced ? 0 : 1.05}
        kicker="Agenda · four cases · portfolio · Xencor bridge · Q&A"
        tagline="Same discipline; unequal depth by design."
      />
    </SlideGrid>
  );
}
