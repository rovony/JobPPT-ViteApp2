// @ts-nocheck
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Viz, Footer } from '@/components/deck/SlideParts';
import { INK, TYPE, SPACE, STAGE } from '../../_shared/deck-ui';
import ConclusionBar from '../../components/cs1/ConclusionBar';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import { useSlideSteps } from '../../components/cs1/useSlideSteps';

/** Beat 9 — transfer (Xencor-Deck #12) + India seam. */
export default function Cs1Lesson({ step: stepProp = 0 }) {
  const step = useSlideSteps(2) ?? stepProp;

  const panels = [
    {
      kicker: 'What worked',
      accent: 'var(--sage)',
      title: 'Substitution, not equivalence',
      body: 'Replaced an unanswerable question with an answerable one — and said so out loud.',
    },
    {
      kicker: 'Do differently',
      accent: 'var(--amber)',
      title: 'Falsify earlier',
      body: 'Pre-specify kill conditions before modeling, and align estimand language with biometrics sooner.',
    },
    {
      kicker: 'What transfers',
      accent: 'var(--coral)',
      title: 'Architecture, not the fit',
      body: 'Anchor · constrained bridge · pre-named breaking condition. Reusable in a way a fitted model never is.',
    },
  ];

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS_NO_SUBHEAD} rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Learning + transfer</Eyebrow>
      <SolidHeadline delay={STAGE.headline} maxChars={72}>
        The architecture was codified publicly —{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>and then by ICH.</span>
      </SolidHeadline>
      <Viz>
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'auto minmax(0, 1fr) auto auto',
            gap: SPACE.gap,
            height: '100%',
            minHeight: 0,
          }}
        >
          {/* Timeline */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.85rem 1.1rem',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--panel)',
            }}
          >
            <div>
              <div className="deck-mono uppercase" style={{ fontSize: '0.7rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)', fontWeight: 800 }}>
                Public codification
              </div>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.primary, fontWeight: 600, marginTop: 4 }}>
                Okour et al. JCP 2023
              </div>
              <div className="deck-body" style={{ fontSize: '0.85rem', color: INK.secondary }}>Methodology made public and citable</div>
            </div>
            <div aria-hidden style={{ height: 2, width: 'min(6rem, 10vw)', background: 'var(--coral)' }} />
            <div>
              <div className="deck-mono uppercase" style={{ fontSize: '0.7rem', letterSpacing: 'var(--ls-mono)', color: 'var(--coral)', fontWeight: 800 }}>
                Regulatory evolution
              </div>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.primary, fontWeight: 600, marginTop: 4 }}>
                ICH E11A pediatric extrapolation
              </div>
              <div className="deck-body" style={{ fontSize: '0.85rem', color: INK.secondary }}>
                The program operationalised the logic before it had a name
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: SPACE.gap, minHeight: 0 }}>
            {panels.map((p, i) => {
              const dim = step > 0 && step < 2 && step !== i + 1;
              return (
                <article
                  key={p.kicker}
                  style={{
                    padding: SPACE.padLg,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--cream-hairline)',
                    borderTop: `3px solid ${p.accent}`,
                    background: 'var(--panel)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    minWidth: 0,
                    opacity: dim ? 0.5 : 1,
                    transition: 'opacity 200ms ease',
                  }}
                >
                  <div
                    className="deck-mono uppercase"
                    style={{ fontSize: TYPE.label, color: p.accent, letterSpacing: '0.06em', fontWeight: 800 }}
                  >
                    {p.kicker}
                  </div>
                  <div className="deck-display" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 600, lineHeight: 1.3 }}>
                    {p.title}
                  </div>
                  <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.5, marginTop: 'auto' }}>
                    {p.body}
                  </div>
                </article>
              );
            })}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: '1.25rem',
              padding: 'clamp(0.9rem, 1.8vh, 1.2rem) clamp(1.1rem, 2vw, 1.5rem)',
              border: '2px solid var(--cream)',
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--coral) 6%, var(--panel))',
              alignItems: 'center',
            }}
          >
            <div className="deck-body" style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)', color: INK.primary, lineHeight: 1.45, fontWeight: 500 }}>
              I would not claim pediatric PAH is a T-cell engager. The transferable principle is{' '}
              <strong style={{ color: 'var(--coral)' }}>
                defining the evidence threshold for the next action when a clean experiment is unavailable or unethical.
              </strong>
            </div>
            <div style={{ borderLeft: '2px solid var(--cream-hairline)', paddingLeft: '1.1rem' }}>
              <div className="deck-mono uppercase" style={{ fontSize: '0.7rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)', fontWeight: 800, marginBottom: 8 }}>
                Where that lands at Xencor
              </div>
              <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.65 }}>
                Step-up dosing · Schedule · Expansion-cohort decisions
              </div>
            </div>
          </div>

          <ConclusionBar accent="var(--amber)">
            Next · India: same craft, harder claim —{' '}
            <span style={{ color: 'var(--amber)', fontWeight: 600 }}>transport across a void</span>, not interpolation inside a shared frame.
          </ConclusionBar>
        </div>
      </Viz>
      <Footer kicker="08 · CS1 · Transfer" tagline="" source="Xencor-Deck #12 · Beat 9" />
    </SlideGrid>
  );
}
