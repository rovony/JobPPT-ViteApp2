// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Slide 12 (slot) — V2-S8 · The framework · 5-node flow diagram.
 *
 * Redesigned per user spec: five architecture nodes connected by arrows,
 * showing the reasoning chain from adult data → exposure match.
 * Diagnostics (pcVPC, GOF, covariate plots) deferred to backup slides.
 *
 * Source: Okour M et al. J Clin Pharmacol 2023;63(5):593–603.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const NODES = [
  {
    id: '01',
    kicker: 'Adult PK dataset',
    hero: '380',
    heroUnit: 'participants',
    lines: ['6 studies pooled', '3,126 PK observations', 'Rich sampling → structural anchor'],
    isHero: true,
  },
  {
    id: '02',
    kicker: 'PopPK model',
    hero: '2-cmt',
    heroUnit: 'oral',
    lines: ['1st-order absorption + lag', 'CL ∝ WT⁰·⁷⁵  ·  V ∝ WT¹·⁰', 'Allometric exponents fixed'],
    isHero: false,
  },
  {
    id: '03',
    kicker: 'Pediatric simulation',
    hero: 'AUC',
    heroUnit: 'by weight band',
    lines: ['Model-predicted exposure', 'Dose selection for trial', 'Target: adult AUCss range'],
    isHero: false,
  },
  {
    id: '04',
    kicker: 'Trial PK confirmation',
    hero: '39',
    heroUnit: 'patients',
    lines: ['AMB112529 sparse PK', '211 observations', 'Ages 8 to <18 yr'],
    isHero: false,
  },
  {
    id: '05',
    kicker: 'Exposure match',
    hero: '−3%',
    heroUnit: 'low dose',
    lines: ['+0.3% high dose', 'AUCss vs adult target', 'Plateau E-R confirmed'],
    isHero: true,
  },
];

function FlowArrow({ reduced, delay }) {
  return (
    <motion.div
      aria-hidden
      className="cs1-bracket-arrow"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--case)',
        fontSize: 'var(--fs-slide-name)',
        fontWeight: 300,
        opacity: 0.5,
        padding: '0 var(--space-1)',
      }}
    >
      →
    </motion.div>
  );
}

function FlowNode({ node, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'relative',
        flex: 1,
        width: '100%',
        border: node.isHero
          ? '1px solid color-mix(in srgb, var(--case) 40%, transparent)'
          : '1px solid var(--cream-hairline)',
        borderLeft: node.isHero ? '4px solid var(--case)' : undefined,
        borderRadius: 'var(--radius-lg)',
        background: node.isHero
          ? 'color-mix(in srgb, var(--case) 6%, transparent)'
          : 'color-mix(in srgb, var(--panel) 65%, transparent)',
        padding: 'clamp(var(--space-3), 1.4vw, var(--space-4))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        minWidth: 0,
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: node.isHero ? 'var(--case)' : 'var(--cream-faint)',
        fontWeight: 700,
      }}>
        {node.id} · {node.kicker}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
        <span className="deck-display" style={{
          fontSize: 'var(--fs-card-numeral)',
          color: node.isHero ? 'var(--case)' : 'var(--cream)',
          fontWeight: 700,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {node.hero}
        </span>
        <span className="deck-body" style={{
          fontSize: 'var(--fs-slide-subhead)',
          color: 'var(--cream-muted)',
        }}>
          {node.heroUnit}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        {node.lines.map((line, i) => (
          <div key={i} className="deck-body" style={{
            fontSize: 'var(--fs-slide-subhead)',
            color: 'var(--cream)',
            opacity: 0.82,
            lineHeight: 1.35,
          }}>
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Cs1Bracket() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>
        Case 01 · The framework
      </Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        Five steps from adult anchor to pediatric dose —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          the architecture, not the diagnostics.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={94} size="lead">
        Each node feeds the next. The model wasn&rsquo;t built on N=39 —
        it was confirmed by it.
      </Subhead>

      <Viz>
        {/* Single horizontal flow: 01 → 02 → 03 → 04 → 05.
            Cards flex 1 1 11rem so 5 fit on widescreen and wrap to
            2-3 rows on narrower viewports. Arrows are flex items
            between cards; on wrap they may sit at row breaks (the
            number prefix on each card carries the order as backup). */}
        <div
          className="cs1-bracket-flow"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            gap: 'clamp(var(--space-2), 0.8vw, var(--space-3))',
            paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          }}
        >
          {NODES.map((node, i) => (
            <React.Fragment key={node.id}>
              <div style={{ flex: '1 1 11rem', minWidth: '11rem', display: 'flex' }}>
                <FlowNode node={node} delay={0.80 + i * 0.16} reduced={reduced} />
              </div>
              {i < NODES.length - 1 && (
                <FlowArrow reduced={reduced} delay={0.92 + i * 0.16} />
              )}
            </React.Fragment>
          ))}
        </div>

        <style>{`
          @media (max-width: 720px) {
            .cs1-bracket-flow .cs1-bracket-arrow { display: none; }
          }
        `}</style>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.00}
        kicker="12 · CS1 · FRAMEWORK"
        tagline="The architecture: anchor → model → simulate → confirm → match."
        source="Source · Okour M et al. J Clin Pharmacol 2023;63(5):593–603 · PMID 36579617"
      />
    </SlideGrid>
  );
}
