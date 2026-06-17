// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

const EASE = [0.2, 0.7, 0.3, 1];

function DataDossierRow({ label, accent = 'var(--cream-muted)', children, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(120px, 25%) 1fr',
        gap: 'var(--space-4)',
        paddingBottom: 'var(--space-4)',
        borderBottom: '1px solid color-mix(in srgb, var(--cream-hairline) 40%, transparent)',
      }}
    >
      <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: accent, fontWeight: 700, paddingTop: '4px' }}>
        {label}
      </div>
      <div className="deck-display" style={{ fontSize: 'var(--fs-slide-subhead)', lineHeight: 1.5, color: 'var(--cream)', fontWeight: 400 }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Cs1Question() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          right: 'clamp(2rem, 5vw, 7rem)',
          top: '12vh',
          bottom: '18vh',
          width: 'clamp(320px, 34%, 620px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.15,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Lungs layoutId="cs1-lung" variant="context" widthOverride="100%" />
      </motion.div>

      <Eyebrow delay={0.2}>
        Case 01 · The question
      </Eyebrow>

      <Headline delay={0.35} maxChars={80}>
        When the pediatric trial is terminated &mdash;{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          can the pharmacokinetic bridge still support a pediatric label?
        </span>
      </Headline>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          maxWidth: '52rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'clamp(var(--space-5), 3vh, var(--space-8))',
          position: 'relative',
          zIndex: 1,
        }}>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.95, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-lead)',
              lineHeight: 'var(--lh-snug)',
              color: 'var(--cream)',
              opacity: 0.9,
              fontWeight: 400,
              maxWidth: '52ch',
              margin: 0,
            }}
          >
            A disrupted pediatric program tested whether exposure matching could still support a defensible dose.
          </motion.p>

          <div style={{
            borderLeft: '3px solid var(--case)',
            borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
            background: 'linear-gradient(90deg, color-mix(in srgb, var(--case) 8%, transparent), color-mix(in srgb, var(--panel) 20%, transparent))',
            backdropFilter: 'blur(8px)',
            padding: 'clamp(var(--space-5), 2vw, var(--space-6))',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            boxShadow: 'inset 1px 1px 0 color-mix(in srgb, var(--cream) 5%, transparent)',
          }}>
            <DataDossierRow label="Adult Data" accent="var(--case)" delay={1.2} reduced={reduced}>
              <strong style={{ fontWeight: 600 }}>380 adults</strong> across 6 studies — the mature adult PK anchor.
            </DataDossierRow>
            <DataDossierRow label="Peds Data" accent="var(--amber)" delay={1.4} reduced={reduced}>
              <strong style={{ fontWeight: 600 }}>39 patients</strong>, <em style={{ fontStyle: 'italic', opacity: 0.85 }}>open-label, PK-anchored</em>, no placebo comparator.
            </DataDossierRow>
            <DataDossierRow label="Constraint" delay={1.6} reduced={reduced}>
              Enrollment disrupted and pediatric dose selection under scrutiny — a <strong style={{ fontWeight: 600, color: 'var(--case)' }}>dose-defense story</strong>, not a repeat-efficacy trial.
            </DataDossierRow>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.85, ease: EASE }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              borderLeft: '3px solid var(--amber)',
              background: 'color-mix(in srgb, var(--amber) 10%, transparent)',
              padding: 'var(--space-4) var(--space-5)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              maxWidth: '48ch',
            }}
          >
            <div className="deck-display" style={{ fontSize: 'var(--fs-slide-lead)', lineHeight: 1.4, color: 'var(--amber)', fontWeight: 600, fontStyle: 'italic' }}>
              Could exposure matching carry the pediatric label?
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.2}
        kicker="06 · CS1 · QUESTION"
        tagline="The decision before clinical pharmacology."
      />
    </SlideGrid>
  );
}
