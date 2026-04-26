// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CLOSING · Slide 01 — The throughline.
 *
 * Added 2026-04-26 per workspace audit (manifest flagged "no closer
 * currently registered"). Synthesis of CS1 / CS2 / CS3 under the Hook A
 * thesis — "when the trial isn't the answer, the framework is."
 *
 * Layout: hook-A callback at top, three case lanes below with the
 * shared structural move spelled out per case.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const LANES = [
  {
    color: 'var(--coral)',
    cs: 'Case 01',
    drug: 'Ambrisentan',
    obstacle: 'Trial untrialable.',
    move: 'Adult anchor + pediatric PopPK + exposure match.',
    verdict: 'EMA + PMDA · 2021 · pediatric PAH label',
  },
  {
    color: 'var(--cyan)',
    cs: 'Case 02',
    drug: 'Ivosidenib',
    obstacle: 'Trial unavailable.',
    move: 'Six-pillar regulatory dossier — MOA-anchored.',
    verdict: 'CDSCO · 14 May 2025 · India waiver granted',
  },
  {
    color: 'var(--sage)',
    cs: 'Case 03',
    drug: 'PharmAgent',
    obstacle: 'Trial unbuilt.',
    move: '13 agents · 151 tools · ICH M15 by construction.',
    verdict: 'Pilot evidence · 80% scaffolding cut',
  },
];

export default function ClosingThread() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Closing · The throughline</Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        When the trial isn&rsquo;t the answer,{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 600 }}>
          the framework is.
        </span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={108}>
        Three cases, three obstacles, one structural move — adult evidence + quantitative bridge + regulatory acceptance.
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
          {/* Three-lane synthesis */}
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
                transition={{ duration: 0.55, delay: 0.7 + i * 0.15, ease: EASE }}
                style={{
                  border: `1px solid color-mix(in srgb, ${l.color} 28%, transparent)`,
                  borderTop: `3px solid ${l.color}`,
                  borderRadius: 'var(--radius-lg)',
                  background: `color-mix(in srgb, ${l.color} 5%, var(--panel))`,
                  padding: 'clamp(var(--space-3), 1.6vw, var(--space-4)) clamp(var(--space-4), 2vw, var(--space-5))',
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
                  minWidth: 0,
                }}
              >
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: l.color,
                  fontWeight: 700,
                }}>
                  {l.cs} · {l.drug}
                </div>
                <div className="deck-display" style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  color: 'var(--cream)',
                  fontWeight: 700,
                  fontStyle: 'italic',
                }}>
                  {l.obstacle}
                </div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream)',
                  opacity: 0.9,
                  lineHeight: 1.45,
                }}>
                  {l.move}
                </div>
                <div className="deck-mono" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: l.color,
                  opacity: 0.86,
                  marginTop: 'auto',
                  paddingTop: 'var(--space-2)',
                  borderTop: '1px solid var(--cream-hairline)',
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
            transition={{ duration: 0.55, delay: 1.4, ease: EASE }}
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
            <div className="deck-body" style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.9,
              lineHeight: 1.5,
              fontWeight: 500,
            }}>
              In each case, the model produced what the trial could not —{' '}
              <strong style={{ color: 'var(--amber)', fontWeight: 700 }}>a defensible dose,
              accepted by a regulator.</strong> That is what quantitative pharmacology is for.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.7}
        kicker="Closing · Synthesis"
        tagline="Trial untrialable. Trial unavailable. Trial unbuilt. Three frameworks. Three approvals."
      />
    </SlideGrid>
  );
}
