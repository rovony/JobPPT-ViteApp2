// @ts-nocheck
/**
 * CS1 · Disease foundation — v6 base, de-busied:
 * solid headline · lead Subhead · two big facts · one mechanism line.
 */
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

const FACTS = [
  {
    kicker: '01 · The disease',
    body: (
      <>
        Small-vessel lung disease — vasoconstriction, proliferation, thrombosis — until the{' '}
        <strong className="xc-case">right ventricle fails</strong>.
      </>
    ),
  },
  {
    kicker: '02 · The definition',
    body: (
      <>
        Pre-capillary PAH: mPAP ≥ 20 mmHg · PVR ≥ 2 WU · PAWP ≤ 15 mmHg — WHO Group 1.
      </>
    ),
  },
];

export default function Cs1Context() {
  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.08}>Case 01 · Disease foundation</Eyebrow>

      <GridSlot
        area="headline"
        as="h1"
        className="deck-display xc-h2 self-center"
        style={{ maxWidth: '28ch' }}
      >
        PAH is{' '}
        <span className="xc-em-case">small-vessel lung disease</span>{' '}
        that kills through right-heart failure
      </GridSlot>

      <Subhead delay={0.15} size="lead" maxChars={72}>
        The lumen narrows. PVR rises. The right ventricle hypertrophies, dilates, then fails.
      </Subhead>

      <Viz style={{ overflow: 'hidden', minHeight: 0 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
            gap: 'clamp(1.25rem, 2.5vw, 2rem)',
            height: '100%',
            minHeight: 0,
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1rem, 2vh, 1.35rem)',
              minHeight: 0,
              justifyContent: 'center',
            }}
          >
            {FACTS.map((f) => (
              <article key={f.kicker} className="xc-fact-card">
                <div className="deck-mono uppercase xc-fact-kicker">{f.kicker}</div>
                <div className="deck-body xc-fact-body">{f.body}</div>
              </article>
            ))}

            <aside
              className="xc-tagline xc-ink"
              style={{
                padding: 'clamp(1rem, 2vh, 1.3rem) clamp(1.15rem, 2vw, 1.45rem)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--amber) 10%, var(--panel))',
                border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
                fontWeight: 500,
              }}
            >
              Ambrisentan blocks the{' '}
              <strong className="xc-case">endothelin pathway</strong> — the over-active
              vasoconstrictor and proliferative arm.
            </aside>
          </div>

          <div
            style={{
              minHeight: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lungs layoutId="cs1-lung" variant="foundation" heightConstrained />
          </div>
        </div>
      </Viz>

      <Footer
        kicker="07 · CS1 · PAH 101"
        tagline=""
        source="ESC/ERS 2022 · D'Alonzo et al. Ann Intern Med 1991"
      />
    </SlideGrid>
  );
}
