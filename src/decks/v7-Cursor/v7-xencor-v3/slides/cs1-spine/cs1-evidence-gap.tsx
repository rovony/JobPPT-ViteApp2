import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../../components/Lungs';

/**
 * CS1 Beat 2 — Evidence gap: 380 build / 39 test / structural impossibility.
 */

const CONSTRAINTS = [
  { t: 'Enrolment', d: 'Rare pediatric PAH — power for efficacy unreachable' },
  { t: 'Ethics', d: 'Placebo-controlled efficacy after adult standard untenable' },
  { t: 'Endpoint', d: '6MWD / functional endpoints not decision-grade here' },
  { t: 'Precedent', d: 'STARTS-1 shaped what agencies would accept next' },
  { t: 'Sparse PK', d: 'Few dose levels — E-R for efficacy not identifiable' },
] as const;

export default function Cs1EvidenceGap() {
  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <div
        aria-hidden
        className="cs1-lung-watermark"
        style={{
          position: 'absolute',
          right: 'clamp(0.5rem, 3vw, 4rem)',
          top: '16%',
          bottom: '12%',
          width: 'clamp(180px, 22%, 360px)',
          opacity: 0.07,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Lungs layoutId="cs1-lung" variant="context" widthOverride="100%" opacity={1} bodyOpacity={0.18} />
      </div>

      <Eyebrow delay={0.06}>Case 01 · Evidence gap</Eyebrow>

      <GridSlot area="headline" as="h1" className="deck-display xc-hook self-center" style={{ maxWidth: '32ch' }}>
        Not diligence failure —{' '}
        <span className="xc-em-case">structural impossibility</span>
      </GridSlot>

      <Subhead delay={0.12} size="lead" maxChars={72}>
        380 adults build the model. 39 children can only test it — they cannot
        rebuild one.
      </Subhead>

      <Viz>
        <div className="cs1-gap-viz">
          <div className="cs1-gap-flow">
            <div className="cs1-gap-stat">
              <span className="cs1-gap-stat__n xc-hero-num xc-case">380</span>
              <span className="cs1-gap-stat__l xc-mono">BUILD · adults</span>
            </div>
            <div className="cs1-gap-flow__arrow" aria-hidden>
              →
            </div>
            <div className="cs1-gap-stat">
              <span className="cs1-gap-stat__n xc-hero-num xc-amber">39</span>
              <span className="cs1-gap-stat__l xc-mono">TEST · children</span>
            </div>
            <div className="cs1-gap-flow__meta xc-mono">
              2013 → 2019 · Phase IIb terminated mid-program
            </div>
          </div>

          <div className="cs1-gap-matrix">
            {CONSTRAINTS.map((c) => (
              <div key={c.t} className="cs1-gap-chip">
                <div className="cs1-gap-chip__t xc-mono">{c.t}</div>
                <div className="cs1-gap-chip__d">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Viz>

      <Footer>Untrialable efficacy — not missing diligence.</Footer>
    </SlideGrid>
  );
}
