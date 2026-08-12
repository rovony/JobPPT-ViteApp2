// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import CaseOrientationStrip from '../../_shared/CaseOrientationStrip';
import Lungs from '../../components/Lungs';

const EASE = [0.2, 0.7, 0.3, 1];

function CompareStat({ label, value, detail, accent }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: accent,
          fontWeight: 700,
          marginBottom: 'var(--space-1)',
        }}
      >
        {label}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1.25rem, min(2.2vw, 3.5vh), 2rem)',
          lineHeight: 1.15,
          color: 'var(--cream)',
          fontWeight: 600,
          marginBottom: 'var(--space-1)',
        }}
      >
        {value}
      </div>
      <div
        className="deck-body"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          lineHeight: 1.4,
          color: 'var(--cream-muted)',
        }}
      >
        {detail}
      </div>
    </div>
  );
}

export default function Cs1Question() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid
      dataCase="coral"
      areas={STANDARD_AREAS_NO_SUBHEAD}
      rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}
    >
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          right: 'clamp(1rem, 4vw, 6rem)',
          top: 'clamp(8vh, 14vh, 18vh)',
          bottom: 'clamp(14vh, 20vh, 24vh)',
          width: 'clamp(240px, 30%, 520px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Lungs layoutId="cs1-lung" variant="context" widthOverride="100%" />
      </motion.div>

      <Eyebrow delay={0.2}>Case 01 · Setup + question</Eyebrow>

      <Headline delay={0.35} maxChars={68}>
        When the pediatric trial is terminated &mdash;{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          can the pharmacokinetic bridge still support a pediatric label?
        </span>
      </Headline>

      <Viz>
        <div className="deck-viz-stack">
          <CaseOrientationStrip
            accent="var(--case)"
            delay={reduced ? 0 : 0.65}
            reduced={reduced}
            items={[
              {
                kicker: 'Drug · disease',
                body: <>Ambrisentan · selective ETA antagonist · pediatric PAH (ages 8–17)</>,
              },
              {
                kicker: 'Program status',
                body: (
                  <>
                    Phase IIb <strong style={{ fontWeight: 600 }}>terminated</strong> mid-study — open-label PK
                    cohort only (N = 39)
                  </>
                ),
              },
              {
                kicker: 'Clinical pharmacology ask',
                body: (
                  <>
                    Can <strong style={{ fontWeight: 600 }}>exposure matching</strong> to adults support pediatric
                    dose labeling?
                  </>
                ),
              },
            ]}
          />

          <motion.div
            className="deck-asymmetry-compare"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 1.05, ease: EASE }}
          >
            <CompareStat
              label="Adult anchor"
              value="380 adults"
              detail="Six studies — mature adult PK and safety experience."
              accent="var(--case)"
            />
            <CompareStat
              label="Pediatric data"
              value="39 patients"
              detail="Open-label, PK-anchored cohort — no placebo comparator."
              accent="var(--amber)"
            />
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 1.45, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              lineHeight: 1.45,
              color: 'var(--cream-muted)',
              margin: 0,
              maxWidth: '58ch',
            }}
          >
            Enrollment was disrupted and dose was under scrutiny — a{' '}
            <strong style={{ fontWeight: 600, color: 'var(--case)' }}>dose-defense story</strong> via PK bridge, not a
            repeat-efficacy trial.
          </motion.p>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.75}
        kicker="06 · CS1 · SETUP + QUESTION"
        tagline="Orient the room — then name the adult vs pediatric asymmetry."
      />
    </SlideGrid>
  );
}
