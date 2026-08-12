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
        <strong style={{ color: 'var(--case)' }}>right ventricle fails</strong>.
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
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.08}>Case 01 · Disease foundation</Eyebrow>

      <GridSlot
        area="headline"
        as="h1"
        className="deck-display self-center"
        style={{
          fontSize: 'clamp(1.75rem, min(3.2vw, 5vh), 2.7rem)',
          lineHeight: 1.22,
          letterSpacing: '-0.015em',
          color: 'var(--cream)',
          fontWeight: 600,
          maxWidth: '28ch',
          margin: 0,
        }}
      >
        PAH is{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          small-vessel lung disease
        </span>{' '}
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
              <article
                key={f.kicker}
                style={{
                  padding: 'clamp(1.15rem, 2.3vh, 1.55rem) clamp(1.2rem, 2vw, 1.55rem)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--cream-hairline)',
                  borderLeft: '4px solid var(--case)',
                  background: 'var(--panel)',
                }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.25vh, 1rem)',
                    letterSpacing: 'var(--ls-mono)',
                    color: 'var(--case)',
                    fontWeight: 800,
                    marginBottom: 10,
                  }}
                >
                  {f.kicker}
                </div>
                <div
                  className="deck-body"
                  style={{
                    fontSize: 'clamp(1.2rem, min(1.65vw, 2.6vh), 1.4rem)',
                    lineHeight: 1.45,
                    color: 'var(--cream)',
                    fontWeight: 500,
                  }}
                >
                  {f.body}
                </div>
              </article>
            ))}

            <aside
              style={{
                padding: 'clamp(1rem, 2vh, 1.3rem) clamp(1.15rem, 2vw, 1.45rem)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--amber) 10%, var(--panel))',
                border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
                fontSize: 'clamp(1.12rem, min(1.5vw, 2.4vh), 1.3rem)',
                lineHeight: 1.45,
                color: 'var(--cream)',
                fontWeight: 500,
              }}
            >
              Ambrisentan blocks the{' '}
              <strong style={{ color: 'var(--case)' }}>endothelin pathway</strong> — the over-active
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
