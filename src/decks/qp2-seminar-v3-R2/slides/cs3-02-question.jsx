import React from 'react';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 Act 1 · The Question — the next decade needs more.
 *
 * Pediatric extrapolation. Regional bridging. The next decade
 * asks for a hundred more — we cannot keep assembling case-by-case.
 */
export default function CS3Question() {
  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · The question</Eyebrow>

      <Headline delay={0.25} maxChars={52}>
        The next decade will ask for a hundred more{' '}
        <span style={{ color: 'var(--sage)' }}>CS1s and CS2s.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        Pediatric extrapolation. Regional bridging. Dose optimization under
        ICH M15. The function that answered two cases cannot keep assembling
        the evidence case-by-case.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          paddingTop: 'clamp(var(--space-4), 3vh, var(--space-8))',
        }}>
          <div style={{
            maxWidth: '56ch',
            display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
          }}>
            <div className="deck-body" style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)', opacity: 0.85,
              lineHeight: 1.55,
            }}>
              CS1's PopPK took <strong>years</strong> to defend. CS2's six-pillar dossier took{' '}
              <strong>eighteen months</strong> of cross-functional work. The science was right
              both times — the scaffolding was the constraint. The next decade of E11A, M15,
              and Rule 101 decisions <em>cannot afford that cadence</em>.
            </div>

            <div style={{
              display: 'flex', gap: 'var(--space-4)',
              flexWrap: 'wrap',
            }}>
              {['E11A pediatric', 'M15 MIDD', 'Rule 101 waivers', 'Project Optimus'].map((fw) => (
                <div key={fw} style={{
                  padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid color-mix(in srgb, var(--sage) 40%, transparent)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'color-mix(in srgb, var(--sage) 8%, transparent)',
                }}>
                  <span className="deck-mono uppercase" style={{
                    fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--sage)',
                    letterSpacing: '0.08em', fontWeight: 600,
                  }}>{fw}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Viz>

      <Footer
        kicker="Act 1 · The question"
        tagline="Same function, same pattern — but the volume of decisions is about to scale."
      />
    </SlideGrid>
  );
}
