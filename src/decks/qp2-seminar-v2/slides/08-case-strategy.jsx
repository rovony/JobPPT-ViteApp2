import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import { IntegrateViz, ConstrainViz, ParsimonyViz } from './cs1-strategy/DecisionVisuals';

/**
 * Slide 08 · CS1 STRATEGY — three decisions before estimation.
 *
 * 2026-04-25 (Ivo-brief audit · Plan A merge):
 *   The previous standalone "08c · case-strategy-visuals" slide is
 *   absorbed here. Each decision card now carries its own visual
 *   diagnostic inline — claim → explanation → visual evidence →
 *   numerical proof — so the strategy beat lands in one slide instead
 *   of two. The "08c" file is moved to _backup/ and removed from the
 *   manifest.
 *
 * Headline retained per user direction: "The strategy had to survive
 * review before any code ran." The framing is governance-as-discipline,
 * not the brief's substantive ICH E11 claim — both are valid; this deck
 * keeps the governance read.
 */

const DECISIONS = [
  {
    num: '01',
    label: 'Anchor',
    title: 'Build on adult structure',
    body:
      'Adult data supplies the stable structural model; pediatric data refines covariates only.',
    proof: 'Adult+Peds integrated · N=419 vs pediatric-only N=39',
    Viz: IntegrateViz,
    vizCaption: 'Integrated vs pediatric-only stability',
  },
  {
    num: '02',
    label: 'Constrain',
    title: 'Fix allometric exponents',
    body:
      'CL∝WT^0.75 and V∝WT^1.0 (Anderson & Holford) protects identifiability in sparse pediatric PK.',
    proof: 'Biology-informed > freely estimated in sparse designs',
    Viz: ConstrainViz,
    vizCaption: 'Fixed allometry vs free exponents',
  },
  {
    num: '03',
    label: 'Parsimony',
    title: 'Retain only credible covariates',
    body:
      'Twelve candidates were screened in full-covariate modeling; none met retention criteria.',
    proof: 'Final model · body weight signal only',
    Viz: ParsimonyViz,
    vizCaption: 'Covariate screen and retention rule',
  },
];

export default function Slide08CaseStrategy() {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="CS1 · Strategy — three decisions before estimation"
      headline={
        <>
          The strategy had to survive review{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            before any code ran.
          </span>
        </>
      }
      headlineMaxChars={34}
      subhead="Each decision named, explained, and shown — architecture locked before NONMEM ran."
      subheadMaxChars={92}
      footerKicker="Case 01 · Strategy"
      footerSource="Source · ICH E11(R1) 2017 · Okour et al. JCP 2023 · Anderson & Holford 2008"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateRows: '1fr auto',
          rowGap: 'var(--space-4)',
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            columnGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {DECISIONS.map((d, i) => (
            <motion.div
              key={d.num}
              style={{
                border: '1px solid var(--cream-hairline)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                minHeight: 0,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.7 + i * 0.2 }}
            >
              <div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-slide-kicker)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--coral)',
                }}
              >
                Decision {d.num} · {d.label}
              </div>
              <div
                className="deck-display"
                style={{
                  fontSize: 'clamp(1.35rem, 2.1vw, 2rem)',
                  lineHeight: 'var(--lh-tight)',
                  color: 'var(--cream)',
                  fontWeight: 650,
                }}
              >
                {d.title}
              </div>
              <div
                style={{
                  fontSize: 'var(--fs-slide-kicker)',
                  lineHeight: 1.45,
                  color: 'var(--cream-muted)',
                }}
              >
                {d.body}
              </div>
              <div
                style={{
                  marginTop: 'var(--space-2)',
                  paddingTop: 'var(--space-2)',
                  borderTop: '1px solid var(--cream-hairline)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                  minHeight: 0,
                  flex: 1,
                }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    letterSpacing: '0.12em',
                    color: 'var(--cream-faint)',
                  }}
                >
                  {d.vizCaption}
                </div>
                <div style={{ minHeight: 0, flex: 1 }}>
                  <d.Viz delay={1.1 + i * 0.2} />
                </div>
              </div>
              <div
                className="deck-mono uppercase"
                style={{
                  marginTop: 'auto',
                  fontSize: 'var(--fs-slide-pageno)',
                  letterSpacing: '0.12em',
                  color: 'var(--amber)',
                  borderTop: '1px solid var(--cream-hairline)',
                  paddingTop: 'var(--space-2)',
                }}
              >
                {d.proof}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-2) var(--space-4)',
            border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
            borderRadius: 'var(--radius-md)',
            background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 1.5 }}
        >
          <div
            aria-hidden
            style={{ width: 12, height: 12, transform: 'rotate(45deg)', background: 'var(--amber)' }}
          />
          <div className="deck-display italic" style={{ color: 'var(--cream)', fontSize: 'var(--fs-slide-tagline)' }}>
            Architecture defended. Three decisions, three visuals — the model was locked before NONMEM ran.
          </div>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
