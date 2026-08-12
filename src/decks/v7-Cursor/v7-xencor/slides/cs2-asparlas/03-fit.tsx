// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import ConclusionBar from '../../components/cs1/ConclusionBar';
import RseStabilityCurve from './cs3-fit/RseStabilityCurve';

/**
 * Slide · CS2 Fit — Sixty adults anchor a model that already knows most of the answer.
 *
 * Light-editorial: solid panels, top accent, solid headline, delays ≤0.35s.
 * RSE chart may draw; labels stay readable at rest.
 */

const ANCHOR_BULLETS = [
  'N = 124 pediatric PopPK prior · FDA-reviewed label-supporting anchor',
  'Adult Part 1 external VPC: no structural failure vs pediatric predictions',
  '%RSE plateaus beyond N ≈ 50–60 — three sensitivity tests, one conclusion',
];

const EASE = [0.2, 0.7, 0.3, 1];
const D = {
  eyebrow: 0.08,
  headline: 0.14,
  subhead: 0.22,
  block: 0.28,
  curve: 0.28,
  takeaway: 0.35,
  source: 0.35,
};

export default function Cs2AspFit() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="teal" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--teal)" delay={D.eyebrow}>CS2 · Fit</Eyebrow>
      <SolidHeadline delay={D.headline} maxChars={56}>
        Sixty adults anchor a model that{' '}
        <span style={{ color: 'var(--teal)', fontStyle: 'italic', fontWeight: 700 }}>
          already knows
        </span>{' '}
        most of the answer.
      </SolidHeadline>
      <Subhead delay={D.subhead} maxChars={130}>
        At N = 60 the model is{' '}
        <span style={{ color: 'var(--teal)', fontWeight: 600 }}>
          as precise as at N = 94
        </span>{' '}
        for the parameters that drive dose decisions — because the information lives in the
        pediatric prior, not the adult sample alone.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
              gap: 'var(--space-5)',
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'auto minmax(0, 1fr)',
                rowGap: 'var(--space-3)',
                minHeight: 0,
              }}
            >
              <div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-label)',
                  letterSpacing: 'var(--ls-mono)',
                  color: 'var(--cream-muted)',
                }}
              >
                Why N = 60 is enough · pediatric prior + plateau
              </div>

              <EvidenceBlock
                n="01"
                label="Evidence in one block"
                tag="The adult cohort tests the model — it does not rebuild it."
                bullets={ANCHOR_BULLETS}
                delay={D.block}
                reduced={reduced}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'auto minmax(0, 1fr)',
                rowGap: 'var(--space-3)',
                minHeight: 0,
                border: '1px solid var(--cream-hairline)',
                borderTop: '3px solid var(--teal)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                background: 'var(--panel)',
              }}
            >
              <div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-label)',
                  letterSpacing: 'var(--ls-mono)',
                  color: 'var(--teal)',
                  fontWeight: 700,
                }}
              >
                Parameter %RSE vs adult sample size · plateau beyond N ≈ 50–60
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 0,
                }}
              >
                <RseStabilityCurve delay={D.curve} />
              </div>
            </div>
          </div>

          <ConclusionBar accent="var(--teal)">
            The smaller sample size doesn’t weaken the science — it{' '}
            <span style={{ color: 'var(--teal)', fontWeight: 700 }}>
              clarifies where the scientific evidence actually lives
            </span>
            .
          </ConclusionBar>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Fit"
        source="Source · Pediatric PopPK (AALL07P4 + DFCI 11-001) · Asparlas label · sensitivity illustrative"
        delay={D.source}
      />
    </SlideGrid>
  );
}

function EvidenceBlock({ n, label, tag, bullets, delay, reduced }) {
  return (
    <motion.div
      style={{
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--cream-hairline)',
        borderTop: '3px solid var(--teal)',
        background: 'var(--panel)',
        display: 'grid',
        gridTemplateRows: 'auto auto auto',
        rowGap: 'var(--space-3)',
        minWidth: 0,
        minHeight: 0,
      }}
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: EASE, delay: reduced ? 0 : delay }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            width: 28,
            height: 28,
            border: '1.5px solid var(--teal)',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-card-label)',
            fontWeight: 700,
            color: 'var(--teal)',
          }}
        >
          {n}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--teal)',
            fontWeight: 700,
          }}
        >
          {label}
        </span>
      </div>
      <div
        className="deck-display italic"
        style={{
          fontSize: 'var(--fs-card-title)',
          color: 'var(--cream)',
          fontWeight: 500,
          lineHeight: 1.3,
        }}
      >
        {tag}
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          rowGap: 8,
        }}
      >
        {bullets.map((b, i) => (
          <li
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '14px 1fr',
              columnGap: 8,
              alignItems: 'baseline',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-slide-tagline)',
              lineHeight: 1.45,
              color: 'var(--cream-muted)',
            }}
          >
            <span aria-hidden style={{ color: 'var(--teal)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              ›
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
