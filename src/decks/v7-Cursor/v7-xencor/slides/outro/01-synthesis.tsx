// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import ConclusionBar from '../../components/cs1/ConclusionBar';

const EASE = [0.22, 0.68, 0.28, 1];

const COLS = [
  { key: 'cs1', label: '1 · Ambrisentan', color: 'var(--coral)' },
  { key: 'cs3', label: '2 · India', color: 'var(--cyan)' },
  { key: 'cs2', label: '3 · Asparlas', color: 'var(--teal)' },
  { key: 'cs4', label: '4 · Pharazi', color: 'var(--sage)' },
];

const ROWS = [
  {
    pattern: 'Define the decision',
    cs1: 'Dose label without carrying efficacy',
    cs3: 'Local study — or a dossier that replaces it',
    cs2: 'Deliverable design — or no adult program',
    cs4: 'What must be true before AI informs a dose',
  },
  {
    pattern: 'Integrate biology + data',
    cs1: 'Adult anchor + weight-aware pediatric PK',
    cs3: 'Somatic mutation + PopPK N=253 + flat E-R',
    cs2: 'Pediatric prior (N=124) + adult augmentation',
    cs4: 'Deterministic computation under agent orchestration',
  },
  {
    pattern: 'Challenge the model',
    cs1: 'Refused crisp E-R the dose range could not support',
    cs3: 'Tested race covariate rather than assuming it',
    cs2: '%RSE / pcVPC plateau + cohort-ratio sensitivity',
    cs4: 'Rejected end-to-end LLM analysis as unreviewable',
  },
  {
    pattern: 'Make uncertainty actionable',
    cs1: 'Named disease-similarity as the bridge hinge',
    cs3: 'Named the PK gap — bounded with Phase 4',
    cs2: 'Named prior transportability as the failure condition',
    cs4: 'Named failure modes and when not to use it',
  },
  {
    pattern: 'Align the team',
    cs1: 'Totality narrative under a failed efficacy path',
    cs3: 'Four functions · two conditions · both had to hold',
    cs2: 'Two frameworks briefed in parallel to one N',
    cs4: 'Evidence floor set before adoption pressure',
  },
  {
    pattern: 'Leave a capability',
    cs1: 'Portable adult-anchor / pediatric-bridge architecture',
    cs3: 'Reusable convergent-dossier structure',
    cs2: 'Citable Type A design precedent',
    cs4: 'A workflow standard — not a one-off analysis',
  },
];

/** Senior Director pattern table — presentation order */
export default function Synthesis() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS_NO_SUBHEAD} rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}>
      <Eyebrow delay={0.1}>Synthesis · Senior Director pattern</Eyebrow>
      <Headline delay={0.16} maxChars={72}>
        The method changed with the question.{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 500 }}>The pattern did not.</span>
      </Headline>
      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          <p
            className="deck-body"
            style={{
              margin: 0,
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream-muted)',
              fontStyle: 'italic',
              lineHeight: 1.4,
            }}
          >
            Start with the decision · take the least complex credible approach · make the breaking assumption visible · align · leave a standard.
          </p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : 0.18, ease: EASE }}
            style={{
              width: '100%',
              flex: '1 1 auto',
              minHeight: 0,
              overflow: 'auto',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--panel)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(10rem, 12.5rem) repeat(4, minmax(0, 1fr))',
                gap: '1px',
                background: 'var(--cream-hairline)',
                minWidth: '52rem',
              }}
            >
              <div className="deck-mono uppercase" style={cellHead('var(--amber)')}>
                Leadership pattern
              </div>
              {COLS.map((c) => (
                <div key={c.key} className="deck-mono uppercase" style={cellHead(c.color)}>
                  {c.label}
                </div>
              ))}
              {ROWS.map((row) => (
                <React.Fragment key={row.pattern}>
                  <div className="deck-display" style={{ ...cellBody(), fontWeight: 600, color: 'var(--cream)' }}>
                    {row.pattern}
                  </div>
                  {COLS.map((c) => (
                    <div key={c.key} className="deck-body" style={cellBody()}>
                      {row[c.key]}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
          <ConclusionBar accent="var(--amber)">
            Four proofs · one operating model — decision first, least-complex credible method, visible breaking assumption.
          </ConclusionBar>
        </div>
      </Viz>
      <Footer
        kicker="Portfolio"
        tagline=""
        source="story-flows · 00-Portfolio-Case-Jobs"
        delay={0.28}
      />
    </SlideGrid>
  );
}

function cellHead(color) {
  return {
    padding: 'clamp(0.65rem, 1.2vh, 0.9rem) clamp(0.65rem, 1.1vw, 0.9rem)',
    background: `color-mix(in srgb, ${color} 10%, var(--panel))`,
    color,
    fontSize: 'clamp(0.62rem, 0.95vw, 0.78rem)',
    letterSpacing: 'var(--ls-mono)',
    fontWeight: 800,
  };
}

function cellBody() {
  return {
    padding: 'clamp(0.55rem, 1.1vh, 0.85rem) clamp(0.6rem, 1vw, 0.85rem)',
    background: 'var(--panel)',
    color: 'var(--cream-muted)',
    fontSize: 'clamp(0.7rem, 1.05vw, 0.88rem)',
    lineHeight: 1.4,
  };
}
