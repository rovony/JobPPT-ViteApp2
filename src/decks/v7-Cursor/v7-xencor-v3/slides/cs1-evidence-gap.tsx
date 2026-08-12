/**
 * CS1 Beat 2 · Evidence gap — structural impossibility
 */
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

const CONSTRAINTS = [
  { t: 'Enrolment', d: 'Rare pediatric PAH · slow accrual' },
  { t: 'Ethics', d: 'Placebo / delayed access hard to justify' },
  { t: 'Endpoint', d: '6MWD not decision-grade in this age band' },
  { t: 'Precedent', d: 'STARTS-1 shaped agency risk tolerance' },
  { t: 'Program', d: 'Phase IIb terminated mid-study (2013→2019)' },
] as const;

export default function Cs1EvidenceGap() {
  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <div className="cs1-lung-watermark cs1-lung-watermark--soft" aria-hidden>
        <Lungs layoutId="cs1-lung" variant="foundation" widthOverride="100%" />
      </div>

      <Eyebrow delay={0.06}>Case 01 · Evidence gap</Eyebrow>

      <GridSlot area="headline" as="h1" className="deck-display xc-hook self-center cs1-gap-h1">
        Not diligence failure — structural impossibility
      </GridSlot>

      <Subhead delay={0.1} size="lead" maxChars={68}>
        39 children could <strong className="xc-case">test</strong> an adult model — not rebuild one.
      </Subhead>

      <Viz>
        <div className="cs1-gap-viz">
          <div className="cs1-gap-flow">
            <div className="cs1-gap-node cs1-gap-node--build">
              <span className="xc-mono">BUILD</span>
              <strong>380</strong>
              <span>adults · structural model</span>
            </div>
            <div className="cs1-gap-arrow" aria-hidden>
              →
            </div>
            <div className="cs1-gap-node cs1-gap-node--test">
              <span className="xc-mono">TEST</span>
              <strong>39</strong>
              <span>children · transportability</span>
            </div>
            <div className="cs1-gap-arrow" aria-hidden>
              →
            </div>
            <div className="cs1-gap-node cs1-gap-node--stop">
              <span className="xc-mono">EFFICACY</span>
              <strong>closed</strong>
              <span>trial terminated</span>
            </div>
          </div>

          <div className="cs1-constraint-grid">
            {CONSTRAINTS.map((c) => (
              <div key={c.t} className="cs1-constraint-card">
                <div className="cs1-constraint-card__t xc-mono">{c.t}</div>
                <div className="cs1-constraint-card__d">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Viz>

      <Footer kicker="CS1 · Evidence gap" tagline="Untrialable efficacy — not missing diligence" source="" />
    </SlideGrid>
  );
}
