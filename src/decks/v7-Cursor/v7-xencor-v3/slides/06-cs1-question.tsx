/**
 * CS1 Beat 1 · Decision + stakes
 * Conclusion title; 380 vs 39 in bordered boxes; full-width callout.
 */
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

export default function Cs1Question() {
  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <div className="cs1-lung-watermark" aria-hidden>
        <Lungs layoutId="cs1-lung" variant="context" widthOverride="100%" />
      </div>

      <Eyebrow delay={0.08}>Case 01 · Decision</Eyebrow>

      <GridSlot
        area="headline"
        as="h1"
        className="deck-display xc-hook self-center cs1-decision-h1"
      >
        The team still had to defend a pediatric dose after the efficacy path failed
      </GridSlot>

      <Subhead delay={0.12} size="lead" maxChars={72}>
        Dose and label for ages 8–&lt;18 — wrong exposure under-treats progressive disease
        or exposes children without a defendable bridge.
      </Subhead>

      <Viz>
        <div className="cs1-decision-viz">
          <div className="cs1-stat-row">
            <Stat
              label="Adult anchor"
              value="380"
              unit="adults"
              detail="Six studies · mature PK / safety"
              accentClass="xc-case"
            />
            <div className="deck-mono xc-vs cs1-vs" aria-hidden>
              vs
            </div>
            <Stat
              label="Pediatric data"
              value="39"
              unit="patients"
              detail="Open-label PK · no placebo arm"
              accentClass="xc-amber"
            />
          </div>

          <div className="cs1-decision-panels">
            <div className="cs1-decision-panel">
              <div className="cs1-decision-panel__kick xc-mono">The decision</div>
              <p>
                Whether — and at what dose — ambrisentan can be labeled in children
                after Phase IIb stopped carrying efficacy.
              </p>
            </div>
            <div className="cs1-decision-panel">
              <div className="cs1-decision-panel__kick xc-mono">Cost of being wrong</div>
              <p>
                Under-dose a progressive disease, over-expose without bridge, or abandon
                pediatric access.
              </p>
            </div>
          </div>

          <aside className="xc-callout cs1-callout-full">
            Competing actions: force another efficacy design · accept an M&amp;S exposure
            bridge · or abandon the pediatric path. This case is a{' '}
            <strong className="xc-case">dose-defense</strong> story — not a
            repeat-efficacy trial.
          </aside>
        </div>
      </Viz>

      <Footer kicker="CS1 · Decision" tagline="" source="" />
    </SlideGrid>
  );
}

function Stat({
  label,
  value,
  unit,
  detail,
  accentClass,
}: {
  label: string;
  value: string;
  unit: string;
  detail: string;
  accentClass: string;
}) {
  return (
    <div className={`cs1-stat-box ${accentClass === 'xc-amber' ? 'cs1-stat-box--amber' : 'cs1-stat-box--case'}`}>
      <div className={`deck-mono uppercase xc-stat-label ${accentClass}`}>{label}</div>
      <div className="cs1-stat-box__value">
        <span className="deck-display xc-hero-num">{value}</span>
        <span className="deck-body xc-stat-unit">{unit}</span>
      </div>
      <div className="deck-body xc-stat-detail">{detail}</div>
    </div>
  );
}
