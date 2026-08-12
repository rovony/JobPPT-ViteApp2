// @ts-nocheck
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Viz, Footer } from '@/components/deck/SlideParts';
import AnalysisPlot from '@/components/deck/patterns/AnalysisPlot';
import ExposureConcordanceChart from '../../components/ExposureConcordanceChart';
import { INK, TYPE, SPACE, STAGE } from '../../_shared/deck-ui';
import ConclusionBar from '../../components/cs1/ConclusionBar';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import { useSlideSteps } from '../../components/cs1/useSlideSteps';

/** Beat 5 — concordance + honesty (Xencor-Deck #09). */
export default function Cs1Credibility({ step: stepProp = 0 }) {
  const step = useSlideSteps(2) ?? stepProp;
  const showHonesty = step >= 1;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS_NO_SUBHEAD} rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Credibility</Eyebrow>
      <SolidHeadline delay={STAGE.headline} maxChars={72}>
        Both weight-based dose bands landed{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>
          inside the adult therapeutic range.
        </span>
      </SolidHeadline>
      <Viz>
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto',
            gap: SPACE.gap,
            height: '100%',
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: showHonesty ? 'minmax(0, 1.2fr) minmax(0, 1fr)' : '1fr',
              gap: SPACE.gap,
              minHeight: 0,
            }}
          >
            <div
              style={{
                minWidth: 0,
                minHeight: 0,
                padding: SPACE.padLg,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--cream-hairline)',
                borderTop: '3px solid var(--coral)',
                background: 'var(--panel)',
                display: 'grid',
                gridTemplateRows: 'minmax(0, 1fr) auto',
                gap: '0.65rem',
              }}
            >
              <AnalysisPlot variant="exposure-match" style={{ height: '100%' }}>
                <ExposureConcordanceChart delay={0.08} />
              </AnalysisPlot>
              <div
                className="deck-body"
                style={{
                  fontSize: 'clamp(0.9rem, 1.15vw, 1.02rem)',
                  color: 'var(--cream-muted)',
                  lineHeight: 1.4,
                }}
              >
                Low dose <strong style={{ color: 'var(--coral)' }}>3% below</strong> target · high dose{' '}
                <strong style={{ color: 'var(--coral)' }}>0.3% above</strong>. AUC is the bridge — and the
                bridge is named. This does not claim pediatric efficacy was demonstrated.
              </div>
            </div>

            {showHonesty && (
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '0.7rem', minHeight: 0 }}>
                <article
                  style={{
                    padding: SPACE.pad,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--cream-hairline)',
                    borderLeft: '4px solid var(--cream)',
                    background: 'var(--panel)',
                  }}
                >
                  <div
                    className="deck-mono uppercase"
                    style={{
                      fontSize: TYPE.label,
                      letterSpacing: '0.06em',
                      fontWeight: 800,
                      color: 'var(--cream-faint)',
                      marginBottom: 8,
                    }}
                  >
                    Safety check · Cmax
                  </div>
                  <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.primary, lineHeight: 1.45, fontWeight: 500 }}>
                    Maximum concentration ran <strong>11–18% higher in children</strong> by dose band —
                    interpretable against adult safety experience, and kept separate from the primary AUC
                    inference.
                  </div>
                </article>
                <article
                  style={{
                    padding: SPACE.pad,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--cream-hairline)',
                    borderLeft: '4px solid var(--amber)',
                    background: 'color-mix(in srgb, var(--amber) 7%, var(--bg))',
                  }}
                >
                  <div
                    className="deck-mono uppercase"
                    style={{
                      fontSize: TYPE.label,
                      letterSpacing: '0.06em',
                      fontWeight: 800,
                      color: 'var(--amber)',
                      marginBottom: 8,
                    }}
                  >
                    Limitation — stated before asked
                  </div>
                  <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.primary, lineHeight: 1.45, fontWeight: 500 }}>
                    No clear exposure-driven gradient in the observed range.{' '}
                    <strong>That is not a flat E-R claim, and not a no-risk claim.</strong> The slope was
                    unidentifiable — sparse data, narrow dose range.
                  </div>
                </article>
              </div>
            )}
          </div>
          <ConclusionBar accent="var(--coral)">
            Concordance supports the dose recommendation. Disease similarity remains the hinge —
            named, not hidden.
          </ConclusionBar>
        </div>
      </Viz>
      <Footer kicker="05 · CS1 · Credibility" tagline="" source="Okour et al. JCP 2023 · Xencor-Deck #09" />
    </SlideGrid>
  );
}
