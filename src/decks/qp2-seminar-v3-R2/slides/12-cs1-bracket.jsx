import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Slide 12 (slot) — V2-S8 · The framework · PopPK architecture.
 *
 * 2026-04-25 v2-final pass — content replaced wholesale per
 * 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/2B-Slides-CS1-Slides07-11-v2.md.
 * Slide ID `cs1-bracket` retained for manifest stability; the V2 spec
 * removed the standalone Bracket Method ownership beat and folded
 * leadership signaling into the technical narrative on this slide.
 *
 * v2-final amendments:
 *   - A1.2 Adult anchor decomposed: 380 participants (41 healthy + 339 PAH)
 *     across 6 studies (AMB-105, AMB-106, AMB-220, AMB-222, ARIES-1,
 *     ARIES-2, ARIES-E). The "ARIES program N=380" shorthand
 *     undercounts the dataset.
 *   - A1.1 PDE-5 inhibitor was NOT a formally tested PopPK covariate
 *     per Okour 2023 p.596. Defense is mechanistic-only: ambrisentan,
 *     unlike bosentan, doesn't induce CYP3A4 → no expected DDI.
 *
 * Source: Okour M et al. J Clin Pharmacol 2023;63(5):593–603.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const COVARIATES = [
  { name: 'Body weight', tested: 'allometric — fixed exponents', sig: '✓ retained · mechanistic, not estimated' },
  { name: 'Age',         tested: 'on CL/F + Vc/F',                sig: '— ns' },
  { name: 'Sex',         tested: 'on CL/F + Vc/F',                sig: '— ns' },
  { name: 'Race',        tested: 'White vs East Asian vs Other',  sig: '— ns' },
  { name: 'Bilirubin',   tested: 'on CL/F',                       sig: '— ns' },
  { name: 'Alkaline phosphatase', tested: 'on CL/F',              sig: '— ns' },
  { name: 'Creatinine clearance', tested: 'on CL/F',              sig: '— ns' },
  { name: 'Dose level',  tested: 'on absorption lag time',        sig: '— ns' },
];

function PanelCard({ kicker, children, accent = 'var(--coral)', delay, reduced, isHero = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: '1px solid var(--cream-hairline)',
        background: isHero
          ? 'color-mix(in srgb, var(--coral) 8%, transparent)'
          : 'color-mix(in srgb, var(--panel) 65%, transparent)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        overflow: 'hidden',
      }}
    >
      {isHero && (
        <div aria-hidden style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 4, background: accent,
        }} />
      )}
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-kicker)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: accent,
        fontWeight: 700,
      }}>
        {kicker}
      </div>
      {children}
    </motion.div>
  );
}

function Bullet({ children }) {
  return (
    <div className="deck-body" style={{
      fontSize: 'var(--fs-slide-subhead)',
      color: 'var(--cream)',
      opacity: 0.86,
      lineHeight: 1.4,
    }}>
      {children}
    </div>
  );
}

export default function Cs1Bracket() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · The framework
      </Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        Adult-anchored, allometrically scaled, pediatrically validated —{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 600 }}>
          the structural model wasn&rsquo;t built on N=39.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={94} size="lead">
        Three blocks. The pediatric data validate adequacy; the structure is
        inherited from the adult anchor.
      </Subhead>

      <Viz>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          height: '100%',
        }}>
          {/* Three-block architecture diagram */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
            gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
          }}>
            <PanelCard kicker="01 · Adult anchor" delay={0.85} reduced={reduced} isHero>
              <div className="deck-display" style={{
                fontSize: 'var(--fs-card-numeral)',
                color: 'var(--coral)',
                fontWeight: 700,
                lineHeight: 0.95,
                fontVariantNumeric: 'tabular-nums',
              }}>
                380
              </div>
              <Bullet>
                <span style={{ color: 'var(--cream)', fontWeight: 600 }}>participants</span> · 41 healthy + 339 PAH
              </Bullet>
              <Bullet>
                6 studies pooled — AMB-105, AMB-106, AMB-220, AMB-222, <em>ARIES-1</em>, <em>ARIES-2</em>, ARIES-E
              </Bullet>
              <Bullet>
                3,126 PK observations · 2-compartment, 1st-order absorption + lag
              </Bullet>
            </PanelCard>

            <PanelCard kicker="02 · Allometric scaling" delay={1.00} reduced={reduced}>
              <Bullet>
                <span style={{ color: 'var(--coral)', fontWeight: 700 }}>CL &prop; WT<sup>0.75</sup></span>
              </Bullet>
              <Bullet>
                <span style={{ color: 'var(--coral)', fontWeight: 700 }}>V &prop; WT<sup>1.0</sup></span>
              </Bullet>
              <Bullet>
                Anderson&ndash;Holford convention · exponents <em>fixed, not estimated</em>
              </Bullet>
              <Bullet>
                Estimation attempted; OFV improvement within noise; pcVPC not improved
              </Bullet>
            </PanelCard>

            <PanelCard kicker="03 · Pediatric validation" delay={1.15} reduced={reduced}>
              <div className="deck-display" style={{
                fontSize: 'var(--fs-card-numeral)',
                color: 'var(--cream)',
                fontWeight: 700,
                lineHeight: 0.95,
                fontVariantNumeric: 'tabular-nums',
              }}>
                39
              </div>
              <Bullet>
                <span style={{ color: 'var(--cream)', fontWeight: 600 }}>patients evaluable</span> · 211 PK observations
              </Bullet>
              <Bullet>
                pcVPC: predictions sit within 90% PI of adult model
              </Bullet>
              <Bullet>
                Sole significant covariate among formally tested set: <span style={{ color: 'var(--coral)', fontWeight: 600 }}>body weight</span>
              </Bullet>
            </PanelCard>
          </div>

          {/* Covariate table */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.45, ease: EASE }}
            style={{
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
              padding: 'clamp(var(--space-2), 1.2vw, var(--space-3)) clamp(var(--space-3), 1.6vw, var(--space-4))',
            }}
          >
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-pageno)',
              color: 'var(--cream-faint)',
              letterSpacing: 'var(--ls-mono-wide)',
              marginBottom: 'var(--space-2)',
            }}>
              Formally tested covariates · Okour 2023 p.596
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(13rem, 100%), 1fr))',
              gap: 'var(--space-1) clamp(var(--space-3), 2vw, var(--space-5))',
              fontSize: 'var(--fs-slide-pageno)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {COVARIATES.map((c) => (
                <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)', minWidth: 0 }}>
                  <span style={{ color: c.sig.startsWith('✓') ? 'var(--coral)' : 'var(--cream)', fontWeight: c.sig.startsWith('✓') ? 600 : 400, opacity: c.sig.startsWith('✓') ? 1 : 0.78 }}>
                    {c.name}
                  </span>
                  <span style={{ color: c.sig.startsWith('✓') ? 'var(--coral)' : 'var(--cream-faint)', whiteSpace: 'nowrap' }}>
                    {c.sig}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* PDE-5i mechanistic-only footer (the v2-final A1.1 correction) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.85, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.82,
              lineHeight: 1.5,
              fontStyle: 'italic',
              borderLeft: '3px solid var(--coral)',
              paddingLeft: 'var(--space-3)',
              maxWidth: '78ch',
            }}
          >
            <span style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--coral)' }}>PDE-5 inhibitor</span> was <strong>not</strong> a formally tested PopPK covariate. Defense is mechanistic: ambrisentan, unlike bosentan, doesn&rsquo;t induce CYP3A4 &rarr; clinically meaningful DDI is not pharmacologically expected. Exposure-matching held across the 66% on PDE-5i background &mdash; consistent with the mechanistic prediction.
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.10}
        kicker="12 · CS1 · FRAMEWORK"
        tagline="The structural model wasn't built on N=39. It was confirmed by it."
        source="Source · Okour M et al. J Clin Pharmacol 2023;63(5):593–603 · PMID 36579617"
      />
    </SlideGrid>
  );
}
