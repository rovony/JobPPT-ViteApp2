import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 08 (slot) — V2-S4 · Pediatric PAH timeline.
 *
 * 2026-04-25 v2-final pass — content replaced wholesale per
 * 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/2A-Slides-CS1-Slides01-06-v2.md.
 * Slide ID `cs1-trial` retained for manifest stability; the V2 spec
 * places the pediatric-PAH-field timeline here. The previous
 * AMB112529 trial-design content has been folded into slide 11
 * (cs1-outcome) three-disruptions and slide 12 (cs1-bracket) PopPK
 * framework architecture.
 *
 * V2 SIGNATURE VISUAL — trachea-as-timeline-axis with the lung rotated
 * 90°, lung body opacity 0.2 + trachea/bronchi at full opacity. That
 * full rotation morph requires extending the Lungs component
 * (rotation prop + bodyOpacity prop). DEFERRED to Wave 2.
 *
 * This Wave 1 implementation: horizontal timeline axis (1px hairline),
 * adult markers above (2001-2024), pediatric markers below (2009-2024)
 * with the 2021 ambrisentan marker highlighted in coral. The lung
 * stays absent from this slide for now; rotation morph comes in Wave 2.
 */

const EASE = [0.2, 0.7, 0.3, 1];

// Adult drug development above the axis
const ADULT = [
  { year: 2001, label: 'Bosentan' },
  { year: 2005, label: 'Sildenafil' },
  { year: 2007, label: 'Ambrisentan' },
  { year: 2013, label: 'Macitentan' },
  { year: 2015, label: 'Selexipag' },
  { year: 2024, label: 'Sotatercept' },
];

// Pediatric drug development below the axis
const PEDIATRIC = [
  { year: 2009, label: 'Bosentan EMA peds · FUTURE-1', highlighted: 'precedent' },
  { year: 2011, label: 'Sildenafil EMA peds' },
  { year: 2014, label: 'STARTS-2 publication' },
  { year: 2017, label: 'Bosentan FDA peds', highlighted: 'precedent' },
  { year: 2021, label: 'Ambrisentan EMA + PMDA peds', highlighted: 'thiscase' },
  { year: 2023, label: 'Sildenafil FDA peds' },
  { year: 2024, label: 'ICH E11A finalized', highlighted: 'codification' },
];

const YEAR_MIN = 2000;
const YEAR_MAX = 2026;
const yearToPct = (y) => ((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100;

function Marker({ entry, side, delay, reduced }) {
  const pct = yearToPct(entry.year);
  const isThisCase = entry.highlighted === 'thiscase';
  const isPrecedent = entry.highlighted === 'precedent';
  const isCodification = entry.highlighted === 'codification';
  const accent = isThisCase
    ? 'var(--case)'
    : isPrecedent
      ? 'var(--case)'
      : isCodification
        ? 'var(--amber)'
        : 'var(--cream-faint)';
  const dotSize = isThisCase ? 16 : isPrecedent || isCodification ? 13 : 10;
  // Right-edge guard: anchor labels right when past 80% so they don't overflow
  const anchorRight = pct > 80;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: side === 'above' ? -6 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'absolute',
        left: `${pct}%`,
        ...(side === 'above' ? { bottom: '50%', marginBottom: 8 } : { top: '50%', marginTop: 8 }),
        display: 'flex',
        flexDirection: 'column',
        alignItems: anchorRight ? 'flex-end' : 'flex-start',
        gap: 4,
        transform: anchorRight ? 'translateX(-100%)' : 'translateX(0)',
      }}
    >
      {side === 'below' && (
        <div aria-hidden style={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          background: isThisCase || isPrecedent || isCodification ? accent : 'transparent',
          border: `2px solid ${accent}`,
          boxShadow: isThisCase ? '0 0 12px 4px color-mix(in srgb, var(--case) 50%, transparent)' : 'none',
          marginBottom: 4,
          alignSelf: anchorRight ? 'flex-end' : 'flex-start',
          marginRight: anchorRight ? `-${dotSize / 2}px` : 0,
          marginLeft: !anchorRight ? `-${dotSize / 2}px` : 0,
        }} />
      )}
      <span className="deck-mono" style={{
        fontSize: isThisCase
          ? 'clamp(1.1rem, min(1.6vw, 2.2vh), 1.5rem)'
          : 'clamp(0.78rem, min(1vw, 1.4vh), 1rem)',
        color: isThisCase ? 'var(--case)' : isPrecedent ? 'var(--case)' : isCodification ? 'var(--amber)' : 'var(--cream)',
        fontWeight: isThisCase ? 700 : isPrecedent || isCodification ? 600 : 600,
        opacity: isThisCase || isPrecedent || isCodification ? 1 : 0.88,
        letterSpacing: 'var(--ls-mono)',
        whiteSpace: 'nowrap',
        textAlign: anchorRight ? 'right' : 'left',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {entry.year}
      </span>
      <span className="deck-body" style={{
        fontSize: 'clamp(0.68rem, min(0.85vw, 1.2vh), 0.85rem)',
        color: isThisCase ? 'var(--cream)' : 'var(--cream)',
        fontWeight: isThisCase ? 600 : 400,
        opacity: isThisCase ? 1 : 0.82,
        lineHeight: 1.3,
        maxWidth: '12rem',
        textAlign: anchorRight ? 'right' : 'left',
      }}>
        {entry.label}
      </span>
      {side === 'above' && (
        <div aria-hidden style={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          background: isThisCase || isPrecedent || isCodification ? accent : 'transparent',
          border: `2px solid ${accent}`,
          marginTop: 4,
          alignSelf: anchorRight ? 'flex-end' : 'flex-start',
          marginRight: anchorRight ? `-${dotSize / 2}px` : 0,
          marginLeft: !anchorRight ? `-${dotSize / 2}px` : 0,
        }} />
      )}
    </motion.div>
  );
}

export default function Cs1Trial() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* V2-S4 lung-anchor treatment · trachea-as-axis · rotated 90°
          so the bronchi/trachea run horizontally as a backdrop to
          the timeline. Wrapper sized + opacity tuned to feel
          continuous with slide 07 cs1-context (foundation variant,
          big centered lung) — the audience reads the morph as the
          SAME lung pivoting onto its side, not a disappear-and-
          reappear. Wave 2 polish: align timeline markers to bronchi
          anatomy. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '54%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(28rem, 62vw, 50rem)',
          opacity: 0.25,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lungs
          layoutId="cs1-lung"
          variant="trachea-axis"
          rotation={90}
        />
      </div>

      <Eyebrow delay={0.10}>
        Case 01 · The field-level context
      </Eyebrow>

      <Headline delay={0.25} maxChars={66}>
        Pediatric PAH drug development moves slowly —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          and through a single methodological precedent.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={94} size="lead">
        Adult drugs above the axis · pediatric arms below · the 2009 FUTURE-1
        inflection mattered for everything that followed.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(var(--space-3), 3vh, var(--space-5))',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
          paddingBottom: 'clamp(var(--space-2), 2vh, var(--space-4))',
        }}>
          {/* Column labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="deck-mono uppercase" style={{
              fontSize: 'clamp(0.65rem, min(0.9vw, 1.3vh), 0.85rem)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-muted)',
              fontWeight: 700,
            }}>
              Adult PAH approvals · 6 drugs · 2001–2024
            </span>
            <span className="deck-mono uppercase" style={{
              fontSize: 'clamp(0.65rem, min(0.9vw, 1.3vh), 0.85rem)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--case)',
              fontWeight: 700,
            }}>
              The 2009 inflection · the 2024 codification
            </span>
          </div>

          {/* Timeline scaffold — frosted glass backdrop */}
          <div style={{
            position: 'relative',
            flex: 1,
            minHeight: '14rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
            backdropFilter: 'blur(12px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
            border: '1px solid var(--cream-hairline)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(var(--space-3), 2vw, var(--space-5))',
            zIndex: 1,
          }}>
            {/* Above-axis container */}
            <div style={{ position: 'relative', height: '6rem', marginBottom: 'var(--space-2)' }}>
              {ADULT.map((e, i) => (
                <Marker key={`a-${e.year}`} entry={e} side="above" delay={0.85 + i * 0.06} reduced={reduced} />
              ))}
            </div>

            {/* Axis line */}
            <motion.div
              aria-hidden
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.85, ease: EASE }}
              style={{
                height: 3,
                background: 'linear-gradient(90deg, var(--cream-faint) 0%, var(--cream-muted) 30%, var(--cream-muted) 70%, var(--cream-faint) 100%)',
                width: '100%',
                transformOrigin: 'left center',
                position: 'relative',
                borderRadius: 2,
              }}
            >
              {/* Year tick marks + labels */}
              {[2000, 2005, 2010, 2015, 2020, 2025].map((y) => (
                <span key={y} aria-hidden style={{
                  position: 'absolute',
                  left: `${yearToPct(y)}%`,
                  top: -5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: 'translateX(-50%)',
                }}>
                  <span style={{
                    width: 2,
                    height: 13,
                    background: 'var(--cream-muted)',
                    borderRadius: 1,
                  }} />
                  <span className="deck-mono" style={{
                    fontSize: 'clamp(0.58rem, min(0.75vw, 1vh), 0.72rem)',
                    color: 'var(--cream-faint)',
                    fontWeight: 600,
                    marginTop: 3,
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '0.04em',
                  }}>
                    {y}
                  </span>
                </span>
              ))}
            </motion.div>

            {/* Below-axis container */}
            <div style={{ position: 'relative', height: '8rem', marginTop: 'var(--space-3)' }}>
              {PEDIATRIC.map((e, i) => (
                <Marker key={`p-${e.year}`} entry={e} side="below" delay={1.20 + i * 0.06} reduced={reduced} />
              ))}
            </div>
          </div>

          {/* Annotation strip — the inflection */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 1.85, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.88,
              lineHeight: 1.5,
              fontStyle: 'italic',
              borderLeft: '3px solid var(--case)',
              paddingLeft: 'var(--space-3)',
              maxWidth: '92ch',
            }}
          >
            <strong style={{ color: 'var(--case)', fontStyle: 'normal' }}>Bosentan FUTURE-1 in 2009</strong> set the framework: PK matching as the regulatory bridge. Every pediatric ERA program since uses this template. <strong style={{ color: 'var(--cream)', fontStyle: 'normal' }}>The ambrisentan case applies it under three simultaneous program disruptions.</strong>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.05}
        kicker="08 · CS1 · TIMELINE"
        source="Source · FDA / EMA approval records · Beghetti BJCP 2009 · ICH E11A Step 4 (Dec 2024)"
      />
    </SlideGrid>
  );
}
