// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CLOSING · Slide 01 — The throughline.
 *
 * Added 2026-04-26 per workspace audit (manifest flagged "no closer
 * currently registered"). Synthesis of CS1 / CS2 / CS3 / CS4 under the Hook A
 * thesis — "when the trial isn't the answer, the framework is."
 *
 * Layout: hook-A callback at top, four case lanes below with the
 * shared structural move spelled out per case.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const LANES = [
  {
    color: 'var(--xc-case-1)',
    cs: 'Case 01',
    drug: 'Ambrisentan',
    obstacle: 'Trial untrialable.',
    move: 'Adult anchor + pediatric PopPK + exposure match.',
    verdict: 'EMA + PMDA · 2021 · pediatric PAH label',
  },
  {
    color: 'var(--xc-case-2)',
    cs: 'Case 02',
    drug: 'Ivosidenib · India',
    obstacle: 'Local trial pressure.',
    move: 'Six-pillar reliance package + cross-functional dose defense.',
    verdict: 'CDSCO approval without local trial · uncertainty owned',
  },
  {
    color: 'var(--xc-case-3)',
    cs: 'Case 03',
    drug: 'Asparlas',
    obstacle: 'Endpoint-powered trial infeasible.',
    move: 'Simulated primary + optimal design + FDA Type A alignment.',
    verdict: '36% smaller adult trial · precedent for efficient design',
  },
  {
    color: 'var(--xc-case-4)',
    cs: 'Case 04',
    drug: 'AI / Pharazi',
    obstacle: 'Workflow unbuilt.',
    move: 'Agents orchestrate · deterministic tools compute · audit by construction.',
    verdict: 'Replayable evidence trail · M15-aligned documentation',
  },
];

export default function ClosingThread() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Closing · The common thread</Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        When measurement falls short,{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 600 }}>
          clinical pharmacology makes the dose defensible.
        </span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={108}>
        Four cases, four obstacles, one discipline — quantitative evidence when measurement alone cannot carry the answer.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%', height: '100%',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'clamp(var(--space-4), 4vh, var(--space-7))',
        }}>
          {/* Four-lane synthesis */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
            gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
          }}>
            {LANES.map((l, i) => (
              <motion.div
                key={l.cs}
                initial={{ opacity: 0, y: 12 }}
                animate={go ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.55 + i * 0.08, ease: EASE }}
                style={{
                  border: `1px solid color-mix(in srgb, ${l.color} 32%, transparent)`,
                  borderTop: `3px solid ${l.color}`,
                  borderRadius: 'var(--radius-lg)',
                  background: `color-mix(in srgb, ${l.color} 5%, var(--panel))`,
                  padding: 'clamp(var(--space-3), 1.6vw, var(--space-4)) clamp(var(--space-4), 2vw, var(--space-5))',
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
                  minWidth: 0,
                }}
              >
                <div className="xc-eyebrow" style={{ color: l.color }}>
                  {l.cs} · {l.drug}
                </div>
                <div className="xc-tagline xc-ink italic" style={{ fontWeight: 700 }}>
                  {l.obstacle}
                </div>
                <div className="xc-subhead xc-ink" style={{ opacity: 0.9 }}>
                  {l.move}
                </div>
                <div className="xc-pageno" style={{
                  color: l.color,
                  opacity: 0.86,
                  marginTop: 'auto',
                  paddingTop: 'var(--space-2)',
                  borderTop: '1px solid var(--cream-hairline)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  textTransform: 'uppercase',
                }}>
                  {l.verdict}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Synthesis ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.95, ease: EASE }}
            style={{
              alignSelf: 'center',
              maxWidth: 'min(74ch, 92%)',
              padding: 'clamp(var(--space-3), 1.6vw, var(--space-4)) clamp(var(--space-5), 3vw, var(--space-7))',
              background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <div className="xc-tagline xc-ink" style={{
              opacity: 0.9,
              lineHeight: 1.5,
              fontWeight: 500,
            }}>
              In each case, quantitative pharmacology supplies what measurement alone cannot —{' '}
              <strong style={{ color: 'var(--amber)', fontWeight: 700 }}>a defensible dose,
              a defensible design, a defensible reliance package, or defensible infrastructure.</strong>
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.15}
        kicker="Closing · Synthesis"
        tagline="Untrialable. Local-evidence constrained. Sample-limited. Workflow unbuilt. One discipline."
      />
    </SlideGrid>
  );
}
