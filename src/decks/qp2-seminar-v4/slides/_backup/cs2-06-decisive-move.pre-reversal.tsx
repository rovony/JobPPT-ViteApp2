// @ts-nocheck
import React from 'react';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import cs2PbpkUrl from '../assets/cs2-pbpk-schematic.svg?url';

/**
 * CS2 Act 3 · Decisive move — PBPK went into the label.
 *
 * MIN-DESIGN PASS. Text-dominant slide with the single cleanest
 * "modeling earned its keep" line in the seminar.
 */
export default function CS2DecisiveMove() {
  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Decisive move</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        PBPK predicted the CYP3A4-induction DDI —{' '}
        <span style={{ color: 'var(--cyan)' }}>and went into the label.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        Simulated midazolam AUC ratio 0.18 — a strong CYP3A4-inducer call.
        Qualified against clinical data. No dedicated clinical DDI study needed
        for every CYP3A4 substrate. The model IS the evidence.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'center', gap: 'clamp(var(--space-6), 4vw, var(--space-10))',
        }}>
          <div style={{ flex: '0 1 220px', maxWidth: 'min(40vw, 280px)', alignSelf: 'center' }} aria-hidden>
            <img
              src={cs2PbpkUrl}
              alt=""
              style={{
                width: '100%', height: 'auto',
                maxHeight: 'min(38vh, 380px)',
                objectFit: 'contain',
              }}
            />
          </div>
          <div style={{
            flex: '1 1 18rem',
            maxWidth: '52ch',
            display: 'flex', flexDirection: 'column', gap: 'var(--space-6)',
            alignItems: 'flex-start',
          }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)',
            }}>
              <span className="deck-display" style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 700, color: 'var(--cyan)',
                fontVariantNumeric: 'tabular-nums', lineHeight: 1,
              }}>0.18</span>
              <span className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)',
              }}>midazolam AUC ratio (simulated)</span>
            </div>

            <div style={{
              width: 'clamp(48px, 8vw, 80px)', height: 'var(--stroke-hair)',
              background: 'var(--cream-faint)',
            }} />

            <div className="deck-body" style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)', opacity: 0.82,
              lineHeight: 1.5, maxWidth: '66ch',
            }}>
              Strong CYP3A4 induction confirmed via PBPK simulation, qualified against
              the fluconazole DDI study and autoinduction biomarkers. Concomitant CYP3A4
              substrates carry{' '}
              <span style={{ fontWeight: 600, color: 'var(--amber)' }}>
                dose adjustments per label
              </span>
              {' '}— this is now standard regulatory practice under CDER's MIDD framework.
            </div>
          </div>
        </div>
      </Viz>

      <Footer
        kicker="Act 3 · PBPK → Label"
        tagline="The cleanest 'modeling earned its keep' line in the seminar."
        source="Xu et al., CPT:PSP 2021, PMC8213421 · Tibsovo USPI Sec. 12.3"
      />
    </SlideGrid>
  );
}
