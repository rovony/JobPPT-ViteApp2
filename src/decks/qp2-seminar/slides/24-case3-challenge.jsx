import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 24 · CS3 Challenge — Approved in pediatrics. Adults need a smarter design.
 *
 * Three vertical anchor tiles set up the constraint:
 *   • 2018 — FDA pediatric approval (the science is established)
 *   • 94 — original protocol-powered sample size (operationally undeliverable)
 *   • ~2028 — projected enrollment timeline if the design didn't change
 *
 * Below: a constraint callout (rare adult population · 46% screen-fail ·
 * cooperative-group competition) and a closing question (violet ribbon)
 * that earns the strategy slide that follows.
 */

const ANCHORS = [
  {
    yr: '2018',
    label: 'FDA Pediatric Approval',
    sub: 'Ages 1 mo – 21 yr · NSAA surrogate · 2,500 U/m² q21d',
    accent: 'cream',
  },
  {
    yr: '94',
    label: 'Original sample size',
    sub: 'Endpoint-powered · target lower 95% CI ≥ 90% NSAA achievement',
    accent: 'cream',
  },
  {
    yr: '~2028',
    label: 'If design unchanged',
    sub: 'SPARK-ALL projected enrollment under endpoint-powered design',
    accent: 'cream',
  },
];

const CONSTRAINTS = [
  { label: 'Rare adult population', value: 'Ph-negative ALL · low incidence' },
  { label: 'Screen-fail rate', value: '~46% in cooperative-group adult ALL' },
  { label: 'Operational pressure', value: 'Cooperative-group competition for the same patients' },
];

const META_TAGS = [
  { k: 'Pediatric anchor', v: 'N = 124 · AALL07P4 + DFCI 11-001' },
  { k: 'Half-life', v: '~16 d · SC-PEG linker · q21d' },
  { k: 'Trial', v: 'SPARK-ALL · NCT04817761' },
];

export default function Slide24Case3Challenge() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    anchorsLabel: 0.95,
    anchors: 1.10,
    constraintLabel: 1.95,
    constraints: 2.10,
    question: 2.85,
    body: 3.10,
    meta: 3.45,
    source: 2.80,
  };

  const T = useTokens(['--violet', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="violet" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--violet)" delay={D.eyebrow}>CS3 · The challenge</Eyebrow>
      <Headline delay={D.headline} maxChars={50}>
        Approved in pediatrics.{' '}
        <span style={{ color: 'var(--violet)', fontStyle: 'italic', fontWeight: 700 }}>
          Adults needed a smarter design.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        Same drug, same biology, same FDA-validated NSAA surrogate. The constraint wasn’t scientific
        doubt — it was{' '}
        <span style={{ color: 'var(--violet)', fontWeight: 600 }}>operational feasibility</span>.
        Ninety-four was deliverable in the protocol and undeliverable in practice.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'auto auto auto 1fr',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {/* ─── Three vertical anchor tiles ─── */}
          <div>
            <motion.div
              className="deck-mono uppercase"
              style={{
                fontSize: '0.7rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-muted)',
                marginBottom: 12,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.anchorsLabel }}
            >
              The setup — three numbers that frame the problem
            </motion.div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-5)',
              }}
            >
              {ANCHORS.map((a, i) => (
                <AnchorTile
                  key={a.yr}
                  yr={a.yr}
                  label={a.label}
                  sub={a.sub}
                  delay={D.anchors + i * 0.15}
                />
              ))}
            </div>
          </div>

          {/* ─── Constraint callout ─── */}
          <div
            style={{
              borderLeft: '3px solid var(--violet)',
              paddingLeft: 16,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <motion.div
              className="deck-mono uppercase"
              style={{
                fontSize: '0.66rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--violet)',
                fontWeight: 700,
                marginBottom: 8,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.constraintLabel }}
            >
              Structural constraint · why 94 wasn't deliverable
            </motion.div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-5)',
              }}
            >
              {CONSTRAINTS.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: D.constraints + i * 0.10 }}
                >
                  <div
                    className="deck-mono uppercase"
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: '0.18em',
                      color: 'var(--cream-muted)',
                      marginBottom: 4,
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(0.84rem, 0.95vw, 0.98rem)',
                      color: 'var(--cream)',
                      lineHeight: 1.4,
                    }}
                  >
                    {c.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Closing question + body ─── */}
          <motion.div
            style={{
              padding: 'var(--space-4) var(--space-5)',
              borderRadius: 6,
              background: 'color-mix(in srgb, var(--violet) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--violet) 35%, transparent)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.question }}
          >
            <div
              className="deck-display italic"
              style={{
                fontSize: 'clamp(1.05rem, 1.4vw, 1.55rem)',
                lineHeight: 1.25,
                color: 'var(--cream)',
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Could a{' '}
              <span style={{ color: 'var(--violet)', fontWeight: 700, fontStyle: 'normal' }}>
                smaller, smarter study
              </span>{' '}
              still be defensible to FDA?
            </div>
            <motion.div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.82rem, 0.95vw, 0.95rem)',
                color: 'var(--cream-muted)',
                lineHeight: 1.5,
                maxWidth: '88ch',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.body }}
            >
              The drug worked in pediatrics. Everyone in the program believed it would work in
              adults. The pediatric PopPK model was{' '}
              <span style={{ color: 'var(--cream)', fontWeight: 600 }}>FDA-reviewed and label-supporting</span>.
              The question wasn’t whether the science was strong — it was whether the same scientific
              question could be answered with{' '}
              <span style={{ color: 'var(--violet)', fontWeight: 600 }}>
                fewer adults and more model
              </span>
              .
            </motion.div>
          </motion.div>

          {/* ─── Bottom meta tags ─── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-4)',
              alignSelf: 'end',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
            }}
          >
            {META_TAGS.map((m, i) => (
              <motion.div
                key={m.k}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: D.meta + i * 0.08 }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: '0.58rem',
                    letterSpacing: '0.22em',
                    color: 'var(--violet)',
                    fontWeight: 700,
                    marginBottom: 3,
                  }}
                >
                  {m.k}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.74rem, 0.85vw, 0.86rem)',
                    color: 'var(--cream-muted)',
                    lineHeight: 1.35,
                  }}
                >
                  {m.v}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Challenge"
        source="Source · FDA label 761102 (Dec 2018) · NCT04817761"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   AnchorTile — single big-numeral anchor card
   ======================================================== */
function AnchorTile({ yr, label, sub, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        padding: '20px 22px 22px 22px',
        borderRadius: 6,
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 45%, transparent)',
        position: 'relative',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {/* Top accent rule */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 2,
          background: 'linear-gradient(to right, var(--violet), color-mix(in srgb, var(--violet) 30%, transparent))',
        }}
      />

      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(2.4rem, 3.4vw, 3.8rem)',
          fontWeight: 700,
          color: 'var(--cream)',
          letterSpacing: 'var(--ls-headline)',
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {yr}
      </div>

      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.64rem',
          letterSpacing: '0.22em',
          color: 'var(--violet)',
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.78rem, 0.9vw, 0.92rem)',
          lineHeight: 1.4,
          color: 'var(--cream-muted)',
        }}
      >
        {sub}
      </div>
    </motion.div>
  );
}
