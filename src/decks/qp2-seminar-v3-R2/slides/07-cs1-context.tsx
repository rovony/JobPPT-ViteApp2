// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 07 (slot) — V2-S3 · PAH 101 · disease foundation.
 * Redesigned to strict 2-column dossier layout.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const FACTS = [
  {
    n: '01',
    label: 'The pathology',
    body: <><strong style={{ color: 'var(--case)' }}>Vasoconstriction</strong>, <strong style={{ color: 'var(--case)' }}>smooth-muscle and endothelial proliferation</strong>, and <strong style={{ color: 'var(--case)' }}>in-situ thrombosis</strong> — the lumen narrows.</>,
  },
  {
    n: '02',
    label: 'The hemodynamic',
    body: <>mPAP ≥ 20 mmHg · PVR ≥ 2 WU · PAWP ≤ 15 mmHg — pre-capillary, WHO Group 1. <em style={{ opacity: 0.7 }}>(2022 ESC/ERS update; AMB112529 trial used 2008 Dana Point: mPAP ≥25, PVR ≥3 WU·m².)</em></>,
  },
  {
    n: '03',
    label: 'The pathways',
    body: <><strong style={{ color: 'var(--case)' }}>Endothelin ↑</strong> · Nitric oxide <strong style={{ opacity: 0.6 }}>↓</strong> · Prostacyclin <strong style={{ opacity: 0.6 }}>↓</strong> · <span style={{ opacity: 0.8 }}>Activin / TGF-β dysregulated.</span></>,
  },
  {
    n: '04',
    label: 'The outcome',
    body: <>Untreated median survival ≈ 2.8 years <em style={{ opacity: 0.5, fontStyle: 'italic' }}>(D'Alonzo 1991, NIH registry)</em>.</>,
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
          fontSize: 'var(--fs-slide-mono)',
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
          fontSize: 'var(--fs-slide-body)',
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

      <Viz>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 'var(--space-8)',
          width: '100%',
          height: '100%',
          alignItems: 'center',
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
              padding: 'var(--space-5) var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
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

          {/* RIGHT COLUMN: Anatomical Anchor & Conclusion */}
          <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
            <div
              style={{
                width: '100%',
                maxWidth: '36rem',
                display: 'flex',
                justifyContent: 'center',
                opacity: 0.8,
              }}
            >
              <Lungs
                layoutId="cs1-lung"
                variant="foundation"
                widthOverride="100%"
              />
            </div>

            {/* Conclusion badge — elevated and prominent */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, delay: 1.3, ease: EASE }}
              style={{
                marginTop: 'var(--space-6)',
                width: '100%',
                padding: 'var(--space-4) var(--space-5)',
                background: 'color-mix(in srgb, var(--amber) 12%, var(--bg))',
                border: '1px solid color-mix(in srgb, var(--amber) 30%, transparent)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}
            >
              <div 
                className="deck-display italic" 
                style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  color: 'var(--cream)',
                  lineHeight: 1.4,
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
