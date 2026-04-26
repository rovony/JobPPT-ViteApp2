// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * BackupHeroDivider — case-level "you are now entering BACKUP territory"
 * marker. Mirrors CaseHeroDivider's structural rhythm (kicker · giant
 * compound title · case hairline · subtitle · illustration · ledger)
 * but reframes the slide as the entry point to the defense library
 * instead of the live act of the case.
 *
 * Differences from CaseHeroDivider:
 *  - Kicker reads "BACKUP · CASE STUDY NN" (mono uppercase, case color)
 *  - Subtitle frames the zone: "Defense library — pull on demand"
 *  - Verdict cell is replaced with a slide-count pill ("17 slides")
 *  - The CaseLedger is replaced with a TYPE-LANES strip listing the
 *    V6 backup-type categories that have content for this case, with
 *    their per-type counts. This gives the audience (and the speaker)
 *    a one-glance map of what defense lives where.
 *  - Illustration slot accepts the same component the live divider
 *    uses (Lungs / IndiaMap / AiBrain) so the case-color cascade stays
 *    visually linked between live and backup zones.
 *  - layoutId on the case hairline reuses `case-marker-{token}` so the
 *    morph from the live divider's hairline is preserved if the user
 *    jumps to the backup directly.
 *
 * Props mirror CaseHeroDivider where they overlap. Additions:
 *  - typeLanes: Array<{ name, count, slug? }>
 *      Names should match the V6 5-type framework labels:
 *      "Methodology" · "Data Cuts" · "Scenarios" ·
 *      "Historical Context" · "Risk Mitigation" ·
 *      "Regulatory Precedent" (deck-specific) ·
 *      "Math / Model Specs" (deck-specific) ·
 *      "Adjacent Cases" (deck-specific)
 */
export default function BackupHeroDivider({
  caseToken = 'coral',
  caseNumber = '01',
  totalCases = 3,
  kicker,
  title,
  subtitle = 'Defense library · pull on demand',
  tagline,
  slideCount,
  typeLanes = [],
  illustration,
  source,
}) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10,
    kicker: 0.25,
    title: 0.55,
    rule: 1.10,
    subtitle: 1.30,
    illustration: 0.40,
    tagline: 2.20,
    lanes: 2.40,
    source: 2.80,
  };

  return (
    <motion.section
      data-case={caseToken}
      className="relative w-full h-[100dvh]"
      style={{ background: 'var(--bg)' }}
    >
      {/* Corner chrome — labels this as backup zone */}
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
        Backup zone · Case Study {caseNumber} · {caseNumber} of {String(totalCases).padStart(2, '0')}
      </motion.div>

      {/* Left column · type stack */}
      <div
        className="absolute"
        style={{
          top: 'clamp(96px, 14vh, 200px)',
          left: 'var(--deck-gutter)',
          width: 'clamp(620px, 58%, 1100px)',
          zIndex: 2,
        }}
      >
        {/* Kicker · "BACKUP · CASE STUDY NN" */}
        <motion.div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-eyebrow)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--case)',
            fontWeight: 700,
            marginBottom: '3vh',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease, delay: D.kicker }}
        >
          <span style={{ display: 'inline-block', width: 36, height: 1, background: 'var(--case)' }} />
          <span>{kicker || `BACKUP · CASE STUDY ${caseNumber}`}</span>
        </motion.div>

        {/* Giant title (compound name — same as live divider) */}
        <motion.h1
          className="deck-display"
          style={{
            fontSize: 'clamp(3rem, 7vw, 8.5rem)',
            lineHeight: 'var(--lh-tight)',
            letterSpacing: 'var(--ls-display)',
            color: 'var(--cream)',
            fontWeight: 700,
            marginBottom: '2.5vh',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: D.title }}
        >
          {title}
        </motion.h1>

        {/* Case hairline — shares layoutId with live divider so the
            color travels across slide types when the user jumps
            between live and backup. */}
        <motion.div
          layoutId={`case-marker-${caseToken}-backup`}
          style={{
            height: 3,
            background: 'var(--case)',
            transformOrigin: 'left center',
            marginBottom: '2vh',
            width: 'clamp(120px, 12vw, 200px)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease, delay: D.rule }}
        />

        {/* Subtitle — frames the zone */}
        <motion.div
          className="deck-display"
          style={{
            fontSize: 'clamp(1.2rem, 2.2vw, 2.4rem)',
            lineHeight: 'var(--lh-snug)',
            color: 'var(--cream)',
            fontWeight: 500,
            marginBottom: '2vh',
            maxWidth: '24ch',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: D.subtitle }}
        >
          {subtitle}
        </motion.div>

        {/* Tagline — operating instruction */}
        {tagline && (
          <motion.p
            className="deck-display italic"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              lineHeight: 'var(--lh-base)',
              color: 'var(--cream-muted)',
              fontWeight: 400,
              maxWidth: '54ch',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: D.tagline }}
          >
            {tagline}
          </motion.p>
        )}
      </div>

      {/* Right column · illustration (low-opacity to signal "parallel
          territory" rather than the live act). */}
      <motion.div
        className="absolute"
        style={{
          top: '12vh',
          right: 'clamp(2rem, 5vw, 7rem)',
          bottom: 'clamp(186px, 18vh, 240px)',
          width: 'clamp(320px, 34%, 620px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.65,
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 0.8, ease, delay: D.illustration }}
      >
        {illustration}
      </motion.div>

      {/* Type lanes strip · the V6 framework navigator */}
      {typeLanes.length > 0 && (
        <TypeLanes
          lanes={typeLanes}
          slideCount={slideCount}
          ease={ease}
          delay={D.lanes}
          reduce={reduce}
        />
      )}

      {/* Source + page no */}
      <motion.div
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: D.source }}
      >
        {source ? (
          <span
            className="deck-display italic"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream-muted)',
              fontWeight: 400,
            }}
          >
            {source}
          </span>
        ) : (
          <span />
        )}
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-pageno)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
          }}
        >
          BACKUP · CS{caseNumber}
        </span>
      </motion.div>
    </motion.section>
  );
}

/**
 * TypeLanes — bottom strip listing V6 backup-type lanes for this case.
 * Replaces CaseHeroDivider's ledger (label/value pairs) with
 * lane/count pairs. Each lane is a left-aligned cell with a square
 * checkpoint sitting on a hairline axis — the same visual rhythm
 * the live ledger uses, so the audience reads it as "same family,
 * different content."
 */
function TypeLanes({ lanes, slideCount, ease, delay, reduce }) {
  const cells = [
    ...lanes.map((l) => ({ label: l.name, value: `${l.count} ${l.count === 1 ? 'slide' : 'slides'}` })),
    ...(slideCount
      ? [{ label: 'Total', value: `${slideCount}`, kind: 'total' }]
      : []),
  ];
  const axisGap = 'clamp(14px, 2.6vh, 42px)';

  return (
    <motion.div
      className="absolute"
      style={{
        bottom: 'calc(var(--deck-pad-bottom) + 2rem)',
        left: 'var(--deck-gutter)',
        right: 'var(--deck-gutter)',
        zIndex: 3,
      }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.55, ease, delay: reduce ? 0 : delay }}
    >
      <div style={{ height: 1, background: 'var(--cream-hairline)', width: '100%' }} />
      <div
        style={{
          ['--axis-gap']: axisGap,
          display: 'grid',
          gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))`,
          columnGap: 'clamp(20px, 2.4vw, 40px)',
          paddingTop: axisGap,
          alignItems: 'start',
        }}
      >
        {cells.map((cell) => {
          const isTotal = cell.kind === 'total';
          return (
            <div
              key={cell.label}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isTotal ? 'flex-end' : 'flex-start',
                textAlign: isTotal ? 'right' : 'left',
                gap: 'clamp(8px, 1.4vh, 18px)',
                minWidth: 0,
              }}
            >
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 'calc(-1 * var(--axis-gap) - 5px)',
                  ...(isTotal ? { right: 0 } : { left: 0 }),
                  width: 10,
                  height: 10,
                  boxSizing: 'border-box',
                  border: '2px solid var(--case)',
                  background: isTotal ? 'var(--case)' : 'var(--bg)',
                }}
              />
              <span
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: isTotal ? 'var(--case)' : 'var(--cream-faint)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {cell.label}
              </span>
              <span
                className="deck-display"
                style={{
                  fontSize: isTotal
                    ? 'clamp(1.45rem, min(1.95vw, 3vh), 2.4rem)'
                    : 'clamp(1.05rem, min(1.4vw, 2.2vh), 1.7rem)',
                  lineHeight: 1.14,
                  letterSpacing: isTotal ? 'var(--ls-mono-wide)' : 'var(--ls-headline)',
                  fontFamily: isTotal ? 'var(--font-mono)' : 'var(--font-display)',
                  color: isTotal ? 'var(--case)' : 'var(--cream)',
                  fontWeight: isTotal ? 700 : 500,
                  textTransform: isTotal ? 'uppercase' : 'none',
                  fontVariantNumeric: 'tabular-nums',
                  wordBreak: 'break-word',
                }}
              >
                {cell.value}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
