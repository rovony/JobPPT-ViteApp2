import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 Act 6 · Leadership — Bracket Method ownership.
 *
 * Two-column bracket: MY SCOPE vs THE TEAM, plus SEC timeline.
 */

const MY_SCOPE = [
  'Mechanism-first reframe (Jan 2025)',
  'Six-pillar dossier scientific argumentation',
  'Phase 4 PK/PD study design commitment',
  'SEC in-person presentation (Apr 2025)',
];

const TEAM_SCOPE = [
  { who: 'Regulatory affairs', what: 'SEC interaction & Rule 101 waiver filing' },
  { who: 'Medical affairs', what: 'Post-marketing surveillance & PV protocol' },
  { who: 'Global Clin Pharm', what: 'Bayesian covariate re-estimation' },
  { who: 'Servier India affiliate', what: 'In-country SEC logistics' },
];

export default function CS2Leadership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Leadership</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        The scientific defense was{' '}
        <span style={{ color: 'var(--cyan)' }}>mine to build.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        My scope was the scientific bridge. Everything else — regulatory
        strategy, surveillance, in-country logistics — belonged to the team.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(var(--space-4), 2.5vh, var(--space-6))',
            paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          }}>
            {/* LEFT — My Scope */}
            <motion.div
              style={{
                border: '1.5px solid var(--cyan)',
                borderRadius: 'var(--radius-md)',
                background: `linear-gradient(180deg,
                  color-mix(in srgb, var(--cyan) 10%, transparent),
                  color-mix(in srgb, var(--panel) 75%, transparent) 70%)`,
                padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              }}
              initial={{ opacity: 0, x: -16 }}
              animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.85, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cyan)',
                letterSpacing: '0.1em', fontWeight: 700,
              }}>My Scope</div>

              {MY_SCOPE.map((item) => (
                <div key={item} className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)',
                  lineHeight: 1.4, paddingLeft: 'var(--space-3)',
                  borderLeft: '2px solid var(--cyan)',
                }}>
                  {item}
                </div>
              ))}
            </motion.div>

            {/* RIGHT — Team Scope */}
            <motion.div
              style={{
                border: '1px solid var(--cream-hairline)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              }}
              initial={{ opacity: 0, x: 16 }}
              animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 1.0, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-faint)',
                letterSpacing: '0.1em', fontWeight: 700,
              }}>The Team</div>

              {TEAM_SCOPE.map((item) => (
                <div key={item.who} style={{
                  display: 'flex', flexDirection: 'column', gap: '2px',
                  paddingLeft: 'var(--space-3)',
                  borderLeft: '2px solid var(--cream-hairline)',
                }}>
                  <span className="deck-mono" style={{
                    fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-muted)',
                    fontWeight: 600,
                  }}>{item.who}</span>
                  <span className="deck-body" style={{
                    fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)',
                    lineHeight: 1.4,
                  }}>{item.what}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom thesis line */}
          <motion.div
            style={{
              textAlign: 'center',
              padding: 'var(--space-2) var(--space-4)',
              background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
              borderRadius: 'var(--radius-md)',
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6, ease: [0.2, 0.7, 0.3, 1] }}
          >
            <span className="deck-display italic" style={{
              fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream-muted)',
            }}>
              SEC queries Aug 2024 → 36-page response Oct → mechanism-first reframe Jan 2025 →{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
                Phase 4 commitment, immediate patient access.
              </span>
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.0}
        kicker="Act 6 · Ownership"
        tagline="Both sides of the bracket had to hold for the agencies to act."
      />
    </SlideGrid>
  );
}
