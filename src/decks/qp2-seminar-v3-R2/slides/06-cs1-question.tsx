// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

const EASE = [0.2, 0.7, 0.3, 1];

const PATH_NODES = [
  { tone: 'case',  label: 'HELD',         detail: 'Juvenile rat brain-weight finding', when: 'Mar 2013' },
  { tone: 'case',  label: 'REFRAMED',     detail: 'STARTS-2 mortality signal',          when: '2014' },
  { tone: 'case',  label: 'CONSTRAINED',  detail: 'Gilead / GSK · split commercial rights', when: 'Day 1' },
  { tone: 'amber', label: 'APPROVED',     detail: 'EMA + PMDA · pediatric PAH',         when: '2021' },
];

function StoryPath({ reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduced ? 0 : 0.65, duration: 0.6, ease: EASE }}
      style={{
        width: '100%',
        maxWidth: '30rem',
        margin: '0 auto',
        border: '1px solid color-mix(in srgb, var(--cream-hairline) 50%, transparent)',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(145deg, color-mix(in srgb, var(--panel) 85%, transparent), color-mix(in srgb, var(--panel) 50%, transparent))',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 40px -10px color-mix(in srgb, var(--bg) 80%, transparent)',
        padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
        position: 'relative',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          fontWeight: 700,
          marginBottom: 'var(--space-5)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
        }}
      >
        <span aria-hidden style={{ width: 'clamp(24px, 4vw, 40px)', height: 1, background: 'var(--cream-hairline)' }} />
        The Whole Story
      </div>

      <div style={{ position: 'relative' }}>
        <motion.div
          aria-hidden
          initial={reduced ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: reduced ? 0 : 0.85, duration: 1.2, ease: EASE }}
          style={{
            position: 'absolute',
            left: 7,
            top: 8,
            bottom: 8,
            width: 2,
            borderRadius: 1,
            background: 'linear-gradient(180deg, var(--case) 0%, var(--case) 70%, var(--amber) 100%)',
            opacity: 0.6,
            transformOrigin: 'top center',
          }}
        />

        {PATH_NODES.map((node, i) => {
          const isLast = i === PATH_NODES.length - 1;
          const isAmber = node.tone === 'amber';
          const accent = isAmber ? 'var(--amber)' : 'var(--case)';

          return (
            <motion.div
              key={node.label}
              initial={reduced ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: reduced ? 0 : 1.05 + i * 0.15,
                duration: isAmber ? 0.7 : 0.5,
                ease: isAmber ? [0.34, 1.56, 0.64, 1] : EASE,
              }}
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                paddingTop: i === 0 ? 0 : 'var(--space-4)',
                paddingBottom: isLast ? 0 : 'var(--space-4)',
                borderBottom: isLast ? 'none' : '1px solid color-mix(in srgb, var(--cream-hairline) 40%, transparent)',
                position: 'relative',
                background: isAmber ? 'color-mix(in srgb, var(--amber) 8%, transparent)' : 'transparent',
                margin: isAmber ? '0 -16px' : '0',
                paddingLeft: isAmber ? '16px' : '0',
                paddingRight: isAmber ? '16px' : '0',
                borderRadius: isAmber ? 'var(--radius-md)' : 0,
              }}
            >
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 2,
                  marginTop: '0.4em',
                  marginLeft: isAmber ? 6 : 0,
                  width: isAmber ? 16 : 12,
                  height: isAmber ? 16 : 12,
                  borderRadius: '50%',
                  background: accent,
                  boxShadow: isAmber
                    ? `0 0 0 4px color-mix(in srgb, ${accent} 20%, transparent), 0 0 16px color-mix(in srgb, ${accent} 40%, transparent)`
                    : `0 0 0 3px color-mix(in srgb, var(--panel) 100%, transparent)`,
                  alignSelf: 'flex-start',
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-2)', marginBottom: 4 }}>
                  <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: accent, fontWeight: 700, lineHeight: 1.2 }}>
                    {node.label}
                  </div>
                  <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.06em' }}>
                    {node.when}
                  </div>
                </div>
                <div className="deck-body" style={{ fontSize: 'var(--fs-slide-subhead)', color: isAmber ? 'var(--cream)' : 'var(--cream)', opacity: isAmber ? 1 : 0.85, lineHeight: 1.4, fontWeight: isAmber ? 500 : 400 }}>
                  {node.detail}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

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
      <div className="deck-display" style={{ fontSize: 'clamp(17px, 1.3vw, 20px)', lineHeight: 1.5, color: 'var(--cream)', fontWeight: 400 }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Cs1Question() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* Centered Lung Background acting as a majestic watermark on the right half */}
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
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 'clamp(var(--space-6), 5vw, var(--space-10))',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* LEFT COLUMN — Context & Payoff */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.95, ease: EASE }}
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-lead)',
                lineHeight: 'var(--lh-snug)',
                color: 'var(--cream)',
                opacity: 0.85,
                fontWeight: 400,
                maxWidth: '48ch',
                margin: 0,
              }}
            >
              A disrupted pediatric program tested whether exposure matching could still support a defensible dose.
            </motion.p>

            {/* Dossier Card (Premium UI replacement for the wall of text) */}
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
              <DataDossierRow label="Blockers" delay={1.6} reduced={reduced}>
                Held by juvenile rat findings. Reframed by a sildenafil mortality signal. Constrained by split rights.
              </DataDossierRow>
            </div>

            {/* Payoff Callout */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 2.00, ease: EASE }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                borderLeft: '3px solid var(--amber)',
                background: 'color-mix(in srgb, var(--amber) 10%, transparent)',
                padding: 'var(--space-4) var(--space-5)',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              }}
            >
              <div className="deck-display" style={{ fontSize: 'var(--fs-slide-lead)', lineHeight: 1.4, color: 'var(--amber)', fontWeight: 600, fontStyle: 'italic' }}>
                A defensible pediatric dose came out anyway.<br />This case is how.
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Milestone Panel */}
          <div className="cs1-q-path">
            <StoryPath reduced={reduced} />
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .cs1-q-path { display: none !important; }
          }
        `}</style>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.2}
        kicker="06 · CS1 · QUESTION"
        tagline="The decision before the model."
      />
    </SlideGrid>
  );
}
