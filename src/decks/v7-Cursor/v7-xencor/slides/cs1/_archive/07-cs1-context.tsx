// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../../components/Lungs';

/**
 * CS1 · Slide 07 (slot) — V2-S3 · PAH 101 · disease foundation.
 * Redesigned to strict 2-column dossier layout.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const FACTS = [
  {
    n: '01',
    label: 'The disease',
    body: (
      <>
        Small-vessel lung disease: vasoconstriction, proliferation, in-situ thrombosis — the lumen narrows until the{' '}
        <strong style={{ color: 'var(--case)' }}>right ventricle fails</strong>.
      </>
    ),
  },
  {
    n: '02',
    label: 'The definition',
    body: <>Pre-capillary PAH: mPAP ≥ 20 mmHg · PVR ≥ 2 WU · PAWP ≤ 15 mmHg — WHO Group 1.</>,
  },
];

function FactRow({ fact, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        gap: 'var(--space-5)',
        padding: 'var(--space-3) 0',
        borderBottom: '1px solid var(--cream-hairline)',
      }}
    >
      <div 
        className="deck-mono" 
        style={{
          color: 'var(--case)',
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 700,
          opacity: 0.9,
          paddingTop: '0.2rem',
          whiteSpace: 'nowrap',
        }}
      >
        {fact.n} · {fact.label}
      </div>
      <div 
        className="deck-body" 
        style={{
          color: 'var(--cream)',
          fontSize: 'var(--fs-slide-subhead)',
          lineHeight: 1.5,
          opacity: 0.85,
        }}
      >
        {fact.body}
      </div>
    </motion.div>
  );
}

export default function Cs1Context() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>
        Case 01 · Disease foundation
      </Eyebrow>

      <Headline delay={0.25} maxChars={66}>
        Pulmonary arterial hypertension is{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          small-vessel lung disease
        </span>{' '}
        that kills through right-heart failure.
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        The lumen narrows. PVR rises. The right ventricle hypertrophies, dilates, then fails.
      </Subhead>

      <Viz style={{ overflow: 'hidden', minHeight: 0 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
          gap: 'clamp(var(--space-4), 2vw, var(--space-8))',
          width: '100%',
          height: '100%',
          minHeight: 0,
          alignItems: 'stretch',
        }}>
          
          {/* LEFT COLUMN: Data Dossier */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: 0.7, ease: EASE }}
            style={{
              background: 'color-mix(in srgb, var(--panel) 40%, transparent)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid var(--cream-hairline)',
              borderLeft: '4px solid var(--case)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(var(--space-3), 2vw, var(--space-5)) clamp(var(--space-4), 2.5vw, var(--space-6))',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              minHeight: 0,
              alignSelf: 'center',
            }}
          >
            {FACTS.map((fact, i) => (
              <FactRow 
                key={fact.n} 
                fact={fact} 
                delay={0.8 + (i * 0.1)} 
                reduced={reduced} 
              />
            ))}
          </motion.div>

          {/* RIGHT COLUMN: lung shrinks to leave room for endothelin callout */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            height: '100%',
            minWidth: 0,
          }}>
            <div
              style={{
                flex: '1 1 0',
                minHeight: 0,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Lungs
                layoutId="cs1-lung"
                variant="foundation"
                heightConstrained
              />
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, delay: 1.3, ease: EASE }}
              style={{
                flexShrink: 0,
                marginTop: 'clamp(var(--space-2), 1.5vh, var(--space-4))',
                width: '100%',
                padding: 'clamp(var(--space-3), 1.5vh, var(--space-4)) clamp(var(--space-4), 2vw, var(--space-5))',
                background: 'color-mix(in srgb, var(--amber) 12%, var(--bg))',
                border: '1px solid color-mix(in srgb, var(--amber) 30%, transparent)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}
            >
              <div 
                className="deck-display italic" 
                style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream)',
                  lineHeight: 1.45,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                Ambrisentan blocks the <strong style={{ color: 'var(--case)', fontStyle: 'normal' }}>endothelin pathway</strong> &mdash; the over-active vasoconstrictor and proliferative arm.
              </div>
            </motion.div>
          </div>
          
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.85}
        kicker="07 · CS1 · PAH 101"
        tagline="Patients don't die of pulmonary hypertension. They die of right-heart failure."
        source="Source · ESC/ERS 2022 PAH guideline · D'Alonzo et al. Ann Intern Med 1991;115(5):343–349"
      />
    </SlideGrid>
  );
}
