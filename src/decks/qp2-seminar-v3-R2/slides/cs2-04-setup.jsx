import React from 'react';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import cs2DossierUrl from '../assets/cs2-india-dossier.svg?url';

/**
 * CS2 Act 1 · Setup — the regulatory question.
 *
 * MIN-DESIGN PASS. Text-only thesis slide.
 * Assertion: Can a Clin Pharm package register a drug without a local trial?
 */
export default function CS2Setup() {
  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Setup</Eyebrow>

      <Headline delay={0.25} maxChars={42}>
        Can a global Clin Pharm package{' '}
        <span style={{ color: 'var(--cyan)' }}>register a drug in India</span>{' '}
        without a local trial?
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        Zero Indian patients in the pivotal trials. The dossier — DDI, food effect,
        special populations, exposure-response, QTc — had to do the work a bridging
        study would have done.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          }}
          aria-hidden
        >
          <img
            src={cs2DossierUrl}
            alt=""
            style={{
              width: 'min(100%, 520px)',
              height: 'auto',
              maxHeight: 'min(32vh, 360px)',
              objectFit: 'contain',
              opacity: 0.92,
            }}
          />
        </div>
      </Viz>

      <Footer
        kicker="Act 1 · Setup"
        tagline="The regulatory question as the case's center of gravity."
      />
    </SlideGrid>
  );
}
