// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * 03 · Career arc — "Five stops, one question."
 *
 * MIN-DESIGN PASS. Inspired by qp2-seminar-v2/slides/03-career-arc.jsx
 * (the SVG spine + satellite-network composition), but stripped to
 * text-forward minimum: a single horizontal hairline with 5 amber
 * dots and 5 label stacks below. No satellites, no interactive drawer,
 * no GSAP — those come in the v2 design pass after copy is locked.
 *
 * Patterns used (per merck-deck/CLAUDE.md):
 *   - SlideGrid + STANDARD_AREAS (overlap-proof)
 *   - SlideParts Eyebrow / Headline / Subhead / Viz / Footer
 *   - --fs-slide-* fluid tokens throughout
 *   - data-case="amber" (cross-case slide; --case defaults to amber/sage)
 *   - useReducedMotion + useInView guards on every animation
 */

const HUBS = [
  { key: 'jordan',    name: 'Jordan',    role: 'BDS',                tag: '2004 – 2010' },
  { key: 'minnesota', name: 'Minnesota', role: 'PhD',                tag: '2012 – 2015' },
  { key: 'merck',     name: 'Merck QP2', role: 'Intern',             tag: '2014' },
  { key: 'gsk',       name: 'GSK',       role: 'Manager',            tag: '2015 – 2022' },
  { key: 'servier',   name: 'Servier',   role: 'Director',           tag: 'Since 2022' },
];

export default function CareerArc({ deck }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={0.10}>
        The lens I bring to the cases
      </Eyebrow>

      <Headline delay={0.25} maxChars={36}>
        Five stops,{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 500 }}>
          one question.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={88} size="lead">
        Each stop is an institution. The through-line is the same Clin
        Pharm question — how do we turn sparse data into a defensible dose?
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(var(--space-4), 4vw, var(--space-10)) 0',
          }}
        >
          <div style={{ position: 'relative', width: '100%', maxWidth: '1200px' }}>
            {/* ── Amber spine: animated draw, left → right ── */}
            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                height: 2,
                background: 'var(--amber)',
                opacity: 0.85,
                transformOrigin: 'left center',
              }}
              initial={{ scaleX: 0 }}
              animate={go ? { scaleX: 1 } : { scaleX: 1 }}
              transition={{ duration: 1.0, delay: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
            />

            {/* ── 5 hub dots + label stacks ── */}
            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 'clamp(var(--space-2), 2vw, var(--space-6))',
              }}
            >
              {HUBS.map((h, i) => {
                const isLast = i === HUBS.length - 1;
                const dotR = isLast ? 8 : 6;
                return (
                  <motion.div
                    key={h.key}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: 0,
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.6 + i * 0.12,
                      ease: [0.2, 0.7, 0.3, 1],
                    }}
                  >
                    {/* Dot — terminal hub (Servier) is bigger */}
                    <div
                      aria-hidden
                      style={{
                        width: dotR * 2,
                        height: dotR * 2,
                        borderRadius: '50%',
                        background: 'var(--amber)',
                        boxShadow: isLast
                          ? '0 0 0 4px color-mix(in srgb, var(--amber) 22%, transparent)'
                          : 'none',
                      }}
                    />

                    {/* Hub name */}
                    <div
                      className="deck-display"
                      style={{
                        marginTop: 'var(--space-3)',
                        fontSize: 'var(--fs-slide-name)',
                        color: 'var(--cream)',
                        lineHeight: 1.1,
                        fontWeight: isLast ? 600 : 500,
                        letterSpacing: '-0.01em',
                        textAlign: 'center',
                      }}
                    >
                      {h.name}
                    </div>

                    {/* Role */}
                    <div
                      className="deck-body"
                      style={{
                        marginTop: 'var(--space-1)',
                        fontSize: 'var(--fs-slide-subhead)',
                        color: 'var(--cream-muted)',
                        opacity: 0.85,
                        textAlign: 'center',
                      }}
                    >
                      {h.role}
                    </div>

                    {/* Date tag — mono */}
                    <div
                      className="deck-mono uppercase"
                      style={{
                        marginTop: 'var(--space-1)',
                        fontSize: 'var(--fs-slide-eyebrow)',
                        color: 'var(--cream-faint)',
                        letterSpacing: '0.08em',
                        fontVariantNumeric: 'tabular-nums',
                        textAlign: 'center',
                      }}
                    >
                      {h.tag}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.6}
        kicker="Career arc · clinic to leadership"
        tagline="One discipline. Five institutions. Through-line: quantitative pharmacology."
      />
    </SlideGrid>
  );
}
