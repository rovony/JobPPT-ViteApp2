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
        className="deck-display self-center"
        style={{
          fontSize: 'clamp(1.85rem, min(3.4vw, 5.2vh), 2.85rem)',
          lineHeight: 1.2,
          letterSpacing: '-0.015em',
          color: 'var(--cream)',
          fontWeight: 600,
          maxWidth: '28ch',
          margin: 0,
        }}
      >
        When the pediatric trial is terminated
      </GridSlot>

      <Subhead delay={0.15} size="lead" maxChars={70}>
        Can an exposure bridge still support a pediatric label —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'normal', fontWeight: 600 }}>
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
              accent="var(--case)"
            />
            <div
              className="deck-mono"
              style={{
                fontSize: 'clamp(1.1rem, 2vh, 1.4rem)',
                color: 'var(--cream-faint)',
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              vs
            </div>
            <Stat
              label="Pediatric data"
              value="39"
              unit="patients"
              detail="Open-label PK · no placebo arm"
              accent="var(--amber)"
            />
          </div>

          {/* One context line — not three chips */}
          <div
            className="deck-body"
            style={{
              fontSize: 'clamp(1.15rem, min(1.55vw, 2.5vh), 1.35rem)',
              lineHeight: 1.45,
              color: 'var(--cream)',
              fontWeight: 500,
              maxWidth: '48ch',
              paddingTop: '0.25rem',
            }}
          >
            Ambrisentan · pediatric PAH (8–17) · Phase IIb{' '}
            <strong style={{ color: 'var(--case)' }}>terminated</strong> mid-study.
          </div>

          <aside
            style={{
              marginTop: 'auto',
              padding: 'clamp(1.1rem, 2.2vh, 1.4rem) clamp(1.25rem, 2.4vw, 1.65rem)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--cream-hairline)',
              borderLeft: '4px solid var(--case)',
              background: 'var(--panel)',
              fontSize: 'clamp(1.2rem, min(1.65vw, 2.6vh), 1.4rem)',
              lineHeight: 1.45,
              color: 'var(--cream)',
              fontWeight: 500,
              maxWidth: '52ch',
            }}
          >
            A <strong style={{ color: 'var(--case)' }}>dose-defense</strong> story via PK bridge — not a
            repeat-efficacy trial.
          </aside>
        </div>
      </Viz>

      <Footer kicker="06 · CS1 · Setup + question" tagline="" source="v6-vir base · de-busied" />
    </SlideGrid>
  );
}

function Stat({ label, value, unit, detail, accent }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.85rem, 1.3vh, 1rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: accent,
          fontWeight: 800,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem', flexWrap: 'wrap' }}>
        <span
          className="deck-display"
          style={{
            fontSize: 'clamp(3rem, min(5.5vw, 9vh), 4.5rem)',
            lineHeight: 0.95,
            color: 'var(--cream)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </span>
        <span
          className="deck-body"
          style={{
            fontSize: 'clamp(1.15rem, min(1.6vw, 2.5vh), 1.4rem)',
            color: 'var(--cream-muted)',
            fontWeight: 600,
          }}
        >
          {unit}
        </span>
      </div>
      <div
        className="deck-body"
        style={{
          marginTop: 10,
          fontSize: 'clamp(1.05rem, min(1.4vw, 2.2vh), 1.22rem)',
          lineHeight: 1.4,
          color: 'var(--cream-muted)',
          fontWeight: 500,
        }}
      >
        {detail}
      </div>
    </div>
  );
}
