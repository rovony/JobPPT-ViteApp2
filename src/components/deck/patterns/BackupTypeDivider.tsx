// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * BackupTypeDivider — V6 backup-type sub-divider.
 *
 * Lighter, more compact than the case-level BackupHeroDivider.
 * Marks the start of one V6 backup-type group within a case zone.
 * Lists every backup slide in the group (B-code + assertion title)
 * so the speaker / audience sees a one-glance manifest of "what
 * defense lives in this lane."
 *
 * V6 5-type framework + deck-specifics:
 *   1. Methodology — "how did you calculate that?"
 *   2. Data Cuts — "what about subgroup X / sensitivity?"
 *   3. Scenarios — "what if you'd done Y instead?"
 *   4. Historical Context — "didn't someone try this before?"
 *   5. Risk Mitigation — "what could go wrong?"
 *   6. Regulatory Precedent (deck-specific)
 *   7. Math / Model Specs (deck-specific)
 *   8. Adjacent Cases (deck-specific)
 *
 * Props:
 *   caseToken    — drives --case cascade (coral/cyan/sage)
 *   typeNumber   — '1' .. '8' (V6 ordinal)
 *   typeName     — 'Methodology' | 'Data Cuts' | etc.
 *   description  — 1–2 line operating description ("how did you …")
 *   slides       — Array<{ code: 'B3', title: '…', slug?: string }>
 *   probeQuote   — optional verbatim hostile-question wording
 */
export default function BackupTypeDivider({
  caseToken = 'coral',
  typeNumber = '1',
  typeName = 'Methodology',
  description,
  slides = [],
  probeQuote,
}) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10,
    kicker: 0.20,
    title: 0.40,
    rule: 0.85,
    description: 1.05,
    probe: 1.30,
    list: 1.55,
  };

  return (
    <motion.section
      data-case={caseToken}
      className="relative w-full h-[100dvh]"
      style={{ background: 'var(--bg)' }}
    >
      {/* Top corner chrome */}
      <motion.div
        className="absolute deck-mono uppercase"
        style={{
          top: '6vh',
          right: 'var(--deck-gutter)',
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: D.chrome }}
      >
        Backup type {typeNumber} of 8 · V6 framework
      </motion.div>

      {/* Body — single column, generous left margin */}
      <div
        className="absolute"
        style={{
          top: 'clamp(96px, 16vh, 220px)',
          left: 'var(--deck-gutter)',
          right: 'var(--deck-gutter)',
          maxWidth: 'clamp(820px, 70%, 1400px)',
          zIndex: 2,
        }}
      >
        {/* Kicker · "BACKUP TYPE NN" */}
        <motion.div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-eyebrow)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--case)',
            fontWeight: 700,
            marginBottom: '2.5vh',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease, delay: D.kicker }}
        >
          <span style={{ display: 'inline-block', width: 36, height: 1, background: 'var(--case)' }} />
          <span>Backup Type {typeNumber}</span>
        </motion.div>

        {/* Type name — display, large but smaller than case-level master */}
        <motion.h2
          className="deck-display"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 5.5rem)',
            lineHeight: 'var(--lh-tight)',
            letterSpacing: 'var(--ls-display)',
            color: 'var(--cream)',
            fontWeight: 700,
            marginBottom: '2vh',
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: D.title }}
        >
          {typeName}
        </motion.h2>

        {/* Hairline */}
        <motion.div
          style={{
            height: 2,
            background: 'var(--case)',
            transformOrigin: 'left center',
            marginBottom: '2.5vh',
            width: 'clamp(80px, 8vw, 140px)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease, delay: D.rule }}
        />

        {/* Description */}
        {description && (
          <motion.p
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-lead)',
              lineHeight: 'var(--lh-base)',
              color: 'var(--cream)',
              opacity: 0.82,
              fontWeight: 400,
              marginBottom: '3vh',
              maxWidth: '60ch',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.82, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.description }}
          >
            {description}
          </motion.p>
        )}

        {/* Probe quote — what hostile question this lane defends */}
        {probeQuote && (
          <motion.div
            style={{
              borderLeft: '3px solid var(--case)',
              padding: 'var(--space-2) var(--space-4)',
              marginBottom: '3.5vh',
              background: 'color-mix(in srgb, var(--case) 6%, transparent)',
              maxWidth: '60ch',
            }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease, delay: D.probe }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
                fontWeight: 700,
                marginRight: '0.75rem',
              }}
            >
              Hostile probe
            </span>
            <span
              className="deck-display italic"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                color: 'var(--cream-muted)',
                lineHeight: 'var(--lh-base)',
              }}
            >
              "{probeQuote}"
            </span>
          </motion.div>
        )}

        {/* Slide list — what defense lives in this lane */}
        {slides.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: D.list }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
                marginBottom: '1.25rem',
              }}
            >
              Lane contents · {slides.length} {slides.length === 1 ? 'slide' : 'slides'}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
                columnGap: 'var(--space-5)',
                rowGap: 'var(--space-3)',
              }}
            >
              {slides.map((s, i) => (
                <SlideListRow key={s.code || i} index={i} slide={s} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Source / page-no chrome bottom */}
      <div
        className="absolute"
        style={{
          bottom: 'var(--deck-pad-bottom)',
          left: 'var(--deck-gutter)',
          right: 'var(--deck-gutter)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '2rem',
          zIndex: 3,
        }}
      >
        <span
          className="deck-display italic"
          style={{
            fontSize: 'var(--fs-slide-tagline)',
            color: 'var(--cream-muted)',
            fontWeight: 400,
          }}
        >
          V6 backup-type framework · §Phase 2 · Audit_Slides_V6.md
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-pageno)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
          }}
        >
          Type {typeNumber} · {typeName}
        </span>
      </div>
    </motion.section>
  );
}

function SlideListRow({ index, slide }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 'var(--space-3)',
        padding: 'var(--space-2) var(--space-3)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--case)',
        borderRadius: 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        minWidth: 0,
      }}
    >
      <span
        className="deck-mono"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--case)',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {slide.code}
      </span>
      <span
        className="deck-body"
        style={{
          fontSize: 'var(--fs-slide-subhead)',
          color: 'var(--cream)',
          lineHeight: 1.4,
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        {slide.title}
      </span>
    </div>
  );
}
