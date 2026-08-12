// @ts-nocheck
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Viz, Footer } from '@/components/deck/SlideParts';
import { INK, TYPE, SPACE, STAGE } from '../../_shared/deck-ui';
import ConclusionBar from '../../components/cs1/ConclusionBar';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import { useSlideSteps } from '../../components/cs1/useSlideSteps';

/** Beats 7–8 — agencies + objection (Xencor-Deck #11). FDA: never received. */
export default function Cs1Landing({ step: stepProp = 0 }) {
  const step = useSlideSteps(2) ?? stepProp;
  const showObjection = step >= 1;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS_NO_SUBHEAD} rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Influence + outcome</Eyebrow>
      <SolidHeadline delay={STAGE.headline} maxChars={72}>
        Two agencies accepted the architecture — and{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>one never saw it.</span>
      </SolidHeadline>
      <Viz>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: showObjection ? 'minmax(0, 1.15fr) minmax(0, 1fr)' : '1fr',
            gridTemplateRows: 'minmax(0, 1fr) auto',
            gap: SPACE.gap,
            height: '100%',
            minHeight: 0,
          }}
        >
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr 1.15fr', gap: '0.65rem', minHeight: 0, gridColumn: 1 }}>
            <Agency
              tag="EMA · 2021"
              ok
              title="Approved."
              body="Pediatric indication ages 8–<18, weight-based dosing. Supported by PIP EMEA-000434-PIP01-08."
            />
            <Agency
              tag="PMDA · 2021"
              ok
              title="Supported."
              body="Same population PK and exposure-comparison materials validated the path."
            />
            <Agency
              tag="FDA"
              ok={false}
              title="Never received the package."
              body="Split-rights commercial outcome — not a regulatory rejection of the science. US label: pediatric safety and effectiveness not established. Say it before the room assumes the agency looked and declined."
            />
          </div>

          {showObjection && (
            <div style={{ display: 'grid', gridTemplateRows: '1.2fr 1fr', gap: '0.65rem', minHeight: 0 }}>
              <article
                style={{
                  padding: SPACE.padLg,
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--cream)',
                  background: 'var(--panel)',
                }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{ fontSize: TYPE.label, letterSpacing: '0.06em', fontWeight: 800, color: 'var(--cream-faint)', marginBottom: 10 }}
                >
                  Objection I had to work through
                </div>
                <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.secondary, lineHeight: 1.45, fontStyle: 'italic' }}>
                  “The efficacy path failed, so the package is weak — modeling is being asked to rescue a program.”
                </div>
                <div
                  style={{ height: 1, background: 'var(--cream-hairline)', margin: '0.85rem 0' }}
                  aria-hidden
                />
                <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.primary, lineHeight: 1.45, fontWeight: 500 }}>
                  <strong>Answer:</strong> the alternative is not a better trial. It is children dosed by
                  undocumented extrapolation. The bridge is the ethical path — and the one that can be reviewed.
                </div>
              </article>
              <article
                style={{
                  padding: SPACE.pad,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--cream-hairline)',
                  borderLeft: '4px solid var(--sage)',
                  background: 'var(--panel)',
                }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{ fontSize: TYPE.label, letterSpacing: '0.06em', fontWeight: 800, color: 'var(--sage)', marginBottom: 8 }}
                >
                  Communication win
                </div>
                <div className="deck-body" style={{ fontSize: TYPE.body, color: INK.primary, lineHeight: 1.45, fontWeight: 500 }}>
                  Making the exposure target the shared language aligned clinical, regulatory, and biometrics
                  around <strong>one number</strong> — contested package → agreed package.
                </div>
              </article>
            </div>
          )}

          <div style={{ gridColumn: '1 / -1' }}>
            <ConclusionBar accent="var(--amber)">
              EMA + PMDA accepted the architecture. FDA gap is disclosed as commercial path —{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 600 }}>not as science declined</span>.
            </ConclusionBar>
          </div>
        </div>
      </Viz>
      <Footer kicker="07 · CS1 · Landing" tagline="" source="Xencor-Deck #11 · public labels only" />
    </SlideGrid>
  );
}

function Agency({ tag, title, body, ok }) {
  return (
    <article
      style={{
        padding: 'clamp(0.75rem, 1.5vh, 1rem) clamp(0.9rem, 1.6vw, 1.2rem)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: `4px solid ${ok ? 'var(--sage)' : 'var(--amber)'}`,
        background: ok ? 'var(--panel)' : 'color-mix(in srgb, var(--amber) 7%, var(--bg))',
        minWidth: 0,
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          display: 'inline-block',
          fontSize: '0.7rem',
          letterSpacing: 'var(--ls-mono)',
          fontWeight: 800,
          color: ok ? 'var(--sage)' : 'var(--amber)',
          marginBottom: 6,
        }}
      >
        {tag}
      </div>
      <div className="deck-display" style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)', fontWeight: 700, color: INK.primary, lineHeight: 1.3 }}>
        {title}
      </div>
      <div className="deck-body" style={{ marginTop: 6, fontSize: 'clamp(0.88rem, 1.15vw, 1.02rem)', color: INK.secondary, lineHeight: 1.4 }}>
        {body}
      </div>
    </article>
  );
}
