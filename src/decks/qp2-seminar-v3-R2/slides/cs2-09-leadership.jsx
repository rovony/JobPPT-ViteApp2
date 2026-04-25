import React from 'react';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 Act 6 · Leadership — Bracket Method ownership.
 *
 * MIN-DESIGN PASS. Text-only slide. One ownership sentence.
 * Credit outward to regulatory affairs, medical affairs, global
 * Clin Pharm team.
 */
export default function CS2Leadership() {
  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Leadership</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        I owned the Clin Pharm dossier defense.
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        Regulatory affairs owned the SEC interaction. Medical affairs owned
        the post-marketing surveillance commitments. The global Clin Pharm
        team built the six-pillar evidence package.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            maxWidth: '52ch',
            display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
          }}>
            <div className="deck-body" style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)', opacity: 0.82,
              lineHeight: 1.5,
            }}>
              The SEC raised queries on South-East Asian subset analyses and IDH1 prevalence
              in August 2024. We responded with a 36-page scientific justification. By
              December, the SEC converted a pre-approval hurdle into a{' '}
              <span style={{ fontWeight: 600, color: 'var(--amber)' }}>
                Phase 4 post-approval PK/PD commitment
              </span>
              {' '}— allowing immediate patient access.
            </div>
          </div>
        </div>
      </Viz>

      <Footer
        kicker="Act 6 · Ownership"
        tagline="Bracket Method: one sentence on what I owned, credit outward on the rest."
      />
    </SlideGrid>
  );
}
