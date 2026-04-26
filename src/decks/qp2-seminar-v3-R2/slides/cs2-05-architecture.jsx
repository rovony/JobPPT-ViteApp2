import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import CS2MoaCard from './cs2-shared/CS2MoaCard';

/**
 * CS2 Slide 6 · Architecture — Mechanism is the foundation.
 *
 * Design language matches cs2-disease-background:
 * - SlideGrid + SlideParts (Eyebrow / Headline / Subhead / Viz / Footer)
 * - 2-column composition: MoaCard left, somatic-vs-germline contrast right
 * - Contrast cards use 1px cream-hairline + panel-mix 70% chrome
 * - Inter body in cream-muted, Fraunces italic for emphasis
 * - Amber message band at bottom
 *
 * The MOA card on the left morphs into the lead pillar on slide 7
 * via shared layoutId="cs2-moa-pillar".
 */

const C = {
  cyan: 'var(--cyan)',
  amber: 'var(--amber)',
  cream: 'var(--cream)',
  creamMuted: 'var(--cream-muted)',
  creamFaint: 'var(--cream-faint)',
  hairline: 'var(--cream-hairline)',
};

const EASE = [0.2, 0.7, 0.3, 1];

export default function CS2Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Architecture — Mechanism is the foundation</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Mechanism is the{' '}
        <span style={{ color: C.cyan, fontStyle: 'italic', fontWeight: 700 }}>foundation.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={110} size="lead">
        Somatic IDH1 R132 doesn't depend on the host's genetics. Same biology, every population.
      </Subhead>

      <Viz>
        <div ref={ref} style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          gap: 'var(--space-4)',
          minHeight: 0, minWidth: 0,
        }}>
          {/* Hero zone — MoaCard (fixed-width col) + argument (flex) */}
          <div style={{
            flex: 1, minHeight: 0, minWidth: 0,
            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            gap: 'var(--space-4)',
            alignItems: 'stretch',
          }}>
            {/* MoaCard column — fixed clamp width keeps the layoutId source bbox predictable */}
            <div style={{
              flex: '0 0 clamp(18rem, 38vw, 32rem)',
              minWidth: 0, display: 'flex',
            }}>
              <CS2MoaCard variant="foundation" style={{ flex: 1 }} />
            </div>

            {/* Argument column — somatic vs germline contrast */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, ease: EASE, delay: reduced ? 0 : 0.85 }}
              style={{
                flex: '1 1 22rem', minWidth: 0,
                display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              }}
            >
              {/* Section header — matches the deck's "MECHANISM — MUTANT IDH1 PATHWAY" pattern */}
              <div className="deck-mono uppercase" style={{
                fontSize: 'clamp(0.78rem, min(1.1vw, 1.7vh), 1rem)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: C.cyan, fontWeight: 700,
              }}>
                Why this is ethnic-independent
              </div>

              {/* Visual contrast — germline struck vs somatic operative */}
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                gap: 'var(--space-3)', minHeight: 0,
              }}>
                <ContrastCard variant="germline" />
                <ContrastCard variant="somatic" />
              </div>

              {/* 3 inline implications — flowing italic, hairline-separated */}
              <div style={{
                paddingTop: 'var(--space-3)',
                borderTop: `1px solid ${C.hairline}`,
              }}>
                <div className="deck-display" style={{
                  fontSize: 'clamp(0.85rem, min(1.15vw, 1.7vh), 1.05rem)',
                  fontStyle: 'italic',
                  color: C.creamMuted,
                  lineHeight: 1.5,
                }}>
                  <ImplicationNum n="1" /> tumor-acquired, not inherited{'  '}
                  <span style={{ color: C.creamFaint }}>·</span>{'  '}
                  <ImplicationNum n="2" /> direct drug-target engagement{'  '}
                  <span style={{ color: C.creamFaint }}>·</span>{'  '}
                  <ImplicationNum n="3" /> indication is molecular, not ethnic
                </div>
              </div>
            </motion.div>
          </div>

          {/* Amber message band */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE, delay: reduced ? 0 : 1.2 }}
            style={{
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--amber) 12%, transparent)',
              border: `1px solid color-mix(in srgb, var(--amber) 32%, transparent)`,
              borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
            }}
          >
            <span aria-hidden style={{
              transform: 'rotate(45deg)', width: 12, height: 12,
              background: C.amber, flex: '0 0 auto',
            }} />
            <div className="deck-display" style={{
              fontStyle: 'italic',
              fontSize: 'clamp(0.95rem, min(1.3vw, 2vh), 1.2rem)',
              color: C.cream, lineHeight: 1.4,
            }}>
              <span style={{ color: C.amber, fontWeight: 600 }}>Mechanism is the foundation.</span>{' '}
              Statistics confirm what mechanism predicts.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.6}
        kicker="Case 02 · MOA — the foundation"
        tagline=""
        source="Dang Cancer Cell 2009 · Figueroa Cancer Cell 2010 · ICH E5(R1)"
      />
    </SlideGrid>
  );
}

/* Numbered marker — small mono cyan, used inline in the implication row. */
function ImplicationNum({ n }) {
  return (
    <span className="deck-mono" style={{
      fontStyle: 'normal',
      fontSize: '0.78em',
      letterSpacing: 'var(--ls-mono-wide)',
      color: C.cyan,
      fontWeight: 700,
      marginRight: '0.4em',
    }}>{n}.</span>
  );
}

/* Contrast card — germline (struck through, muted) or somatic (operative, cyan). */
function ContrastCard({ variant }) {
  const isSomatic = variant === 'somatic';
  return (
    <div style={{
      flex: 1, minHeight: 0,
      display: 'flex', alignItems: 'stretch', gap: 'var(--space-4)',
      padding: 'var(--space-4) var(--space-5)',
      background: isSomatic
        ? 'color-mix(in srgb, var(--cyan) 9%, transparent)'
        : 'color-mix(in srgb, var(--panel) 70%, transparent)',
      border: isSomatic
        ? `1px solid color-mix(in srgb, var(--cyan) 28%, transparent)`
        : `1px dashed ${C.creamFaint}`,
      borderRadius: 'var(--radius-lg)',
      opacity: isSomatic ? 1 : 0.78,
    }}>
      <div style={{ flex: '0 0 clamp(8rem, 18%, 11rem)', minWidth: 0 }}>
        <div className="deck-mono uppercase" style={{
          fontSize: 'clamp(0.66rem, min(0.85vw, 1.3vh), 0.8rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: isSomatic ? C.cyan : C.creamFaint,
          fontWeight: 700,
        }}>
          {isSomatic ? 'Somatic · Operative' : 'If germline'}
        </div>
        <div className="deck-display" style={{
          fontStyle: 'italic',
          fontSize: 'clamp(1.1rem, min(1.7vw, 2.6vh), 1.6rem)',
          color: isSomatic ? C.cyan : C.creamFaint,
          marginTop: 'var(--space-2)',
          lineHeight: 1.05,
          fontWeight: 500,
        }}>
          {isSomatic ? (
            <>Tumor-acquired<br />mutation</>
          ) : (
            <span style={{
              backgroundImage: `linear-gradient(${C.creamFaint}, ${C.creamFaint})`,
              backgroundSize: '100% 1px',
              backgroundPosition: 'center 52%',
              backgroundRepeat: 'no-repeat',
            }}>
              Population<br />genetics
            </span>
          )}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.85rem, min(1.15vw, 1.75vh), 1.08rem)',
          color: isSomatic ? C.cream : C.creamMuted,
          lineHeight: 1.45,
        }}>
          {isSomatic
            ? 'IDH1 R132 occurs in tumor tissue, independent of inherited host genetics — drug binds the same mutant enzyme in every population.'
            : 'Inherited variation in metabolizing enzymes, transporters, or HLA alleles — drug response would track ancestry.'}
        </div>
        <div className="deck-mono uppercase" style={{
          fontSize: 'clamp(0.66rem, min(0.85vw, 1.3vh), 0.8rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: isSomatic ? C.cyan : C.creamFaint,
          marginTop: 'var(--space-2)',
          fontWeight: 600,
        }}>
          {isSomatic ? '↳ Drug-target engagement is identical' : '↳ Not the operative pathway'}
        </div>
      </div>
    </div>
  );
}
