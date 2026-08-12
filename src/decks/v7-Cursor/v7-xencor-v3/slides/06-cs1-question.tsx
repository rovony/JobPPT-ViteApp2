// @ts-nocheck
/**
 * CS1 · Setup + question — v6 base, de-busied:
 * short headline · lead Subhead · hero 380 vs 39 · one payoff line.
 */
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

export default function Cs1Question() {
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: 'clamp(0.5rem, 3vw, 4rem)',
          top: '18%',
          bottom: '14%',
          width: 'clamp(200px, 26%, 420px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Lungs layoutId="cs1-lung" variant="context" widthOverride="100%" />
      </div>

      <Eyebrow delay={0.08}>Case 01 · Setup + question</Eyebrow>

      <GridSlot
        area="headline"
        as="h1"
        className="deck-display xc-hook self-center"
        style={{ maxWidth: '28ch' }}
      >
        When the pediatric trial is terminated
      </GridSlot>

      <Subhead delay={0.15} size="lead" maxChars={70}>
        Can an exposure bridge still support a pediatric label —{' '}
        <span className="xc-strong-case" style={{ fontStyle: 'normal' }}>
          without repeating efficacy?
        </span>
      </Subhead>

      <Viz>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1.25rem, 2.8vh, 1.85rem)',
            height: '100%',
            minHeight: 0,
            position: 'relative',
            zIndex: 1,
            justifyContent: 'center',
          }}
        >
          {/* Hero asymmetry */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: 'clamp(1rem, 2.5vw, 2rem)',
              alignItems: 'center',
            }}
          >
            <Stat
              label="Adult anchor"
              value="380"
              unit="adults"
              detail="Six studies · mature PK / safety"
              accentClass="xc-case"
            />
            <div className="deck-mono xc-vs">vs</div>
            <Stat
              label="Pediatric data"
              value="39"
              unit="patients"
              detail="Open-label PK · no placebo arm"
              accentClass="xc-amber"
            />
          </div>

          {/* One context line — not three chips */}
          <div
            className="deck-body xc-tagline xc-ink"
            style={{
              fontWeight: 500,
              maxWidth: '48ch',
              paddingTop: '0.25rem',
            }}
          >
            Ambrisentan · pediatric PAH (8–17) · Phase IIb{' '}
            <strong className="xc-case">terminated</strong> mid-study.
          </div>

          <aside className="xc-callout" style={{ marginTop: 'auto', maxWidth: '52ch' }}>
            A <strong className="xc-case">dose-defense</strong> story via PK bridge — not a
            repeat-efficacy trial.
          </aside>
        </div>
      </Viz>

      <Footer kicker="06 · CS1 · Setup + question" tagline="" source="v6-vir base · de-busied" />
    </SlideGrid>
  );
}

function Stat({ label, value, unit, detail, accentClass }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div className={`deck-mono uppercase xc-stat-label ${accentClass}`}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem', flexWrap: 'wrap' }}>
        <span className="deck-display xc-hero-num">{value}</span>
        <span className="deck-body xc-stat-unit">{unit}</span>
      </div>
      <div className="deck-body xc-stat-detail">{detail}</div>
    </div>
  );
}
