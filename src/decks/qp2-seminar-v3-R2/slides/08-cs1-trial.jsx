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
  { year: 2009, label: 'Bosentan EMA peds (FUTURE-1)', highlighted: 'precedent' },
  { year: 2011, label: 'Sildenafil EMA peds (STARTS-1)' },
  { year: 2014, label: 'STARTS-2 publication' },
  { year: 2017, label: 'Bosentan FDA peds (Garnett-Florian)', highlighted: 'precedent' },
  { year: 2021, label: 'Ambrisentan EMA + PMDA peds', highlighted: 'thiscase' },
  { year: 2023, label: 'Sildenafil FDA peds' },
  { year: 2024, label: 'ICH E11A finalized', highlighted: 'codification' },
];

const YEAR_MIN = 2000;
const YEAR_MAX = 2025;
const yearToPct = (y) => ((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100;

function Marker({ entry, side, delay, reduced }) {
  const pct = yearToPct(entry.year);
  const isThisCase = entry.highlighted === 'thiscase';
  const isPrecedent = entry.highlighted === 'precedent';
  const isCodification = entry.highlighted === 'codification';
  const accent = isThisCase
    ? 'var(--coral)'
    : isPrecedent
      ? 'var(--coral)'
      : isCodification
        ? 'var(--amber)'
        : 'var(--cream-faint)';
  const dotSize = isThisCase ? 14 : isPrecedent || isCodification ? 11 : 8;
  // Right-edge guard: anchor labels right when past 80% so they don't overflow
  const anchorRight = pct > 80;

  return (
    <motion.div
      initial={{ opacity: 0, y: side === 'above' ? -6 : 6 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
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
          marginBottom: 4,
          alignSelf: anchorRight ? 'flex-end' : 'flex-start',
          marginRight: anchorRight ? `-${dotSize / 2}px` : 0,
          marginLeft: !anchorRight ? `-${dotSize / 2}px` : 0,
        }} />
      )}
      <span className="deck-mono" style={{
        fontSize: isThisCase ? 'var(--fs-slide-subhead)' : 'var(--fs-slide-pageno)',
        color: isThisCase ? 'var(--coral)' : isPrecedent ? 'var(--coral)' : isCodification ? 'var(--amber)' : 'var(--cream)',
        fontWeight: isThisCase ? 700 : isPrecedent || isCodification ? 600 : 500,
        opacity: isThisCase || isPrecedent || isCodification ? 1 : 0.78,
        letterSpacing: 'var(--ls-mono)',
        whiteSpace: 'nowrap',
        textAlign: anchorRight ? 'right' : 'left',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {entry.year}
      </span>
      <span className="deck-body" style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: isThisCase ? 'var(--cream)' : 'var(--cream)',
        fontWeight: isThisCase ? 600 : 400,
        opacity: isThisCase ? 1 : 0.74,
        lineHeight: 1.25,
        maxWidth: '11rem',
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
          opacity: 0.32,
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

      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · The field-level context
      </Eyebrow>

      <Headline delay={0.25} maxChars={66}>
        Pediatric PAH drug development moves slowly —{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 600 }}>
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
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
              fontWeight: 700,
            }}>
              Adult PAH approvals · 6 drugs · 2001–2024
            </span>
            <span className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--coral)',
              fontWeight: 700,
            }}>
              The 2009 inflection · the 2024 codification
            </span>
          </div>

          {/* Timeline scaffold */}
          <div style={{
            position: 'relative',
            flex: 1,
            minHeight: '12rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            {/* Above-axis container */}
            <div style={{ position: 'relative', height: '5rem', marginBottom: 'var(--space-2)' }}>
              {ADULT.map((e, i) => (
                <Marker key={`a-${e.year}`} entry={e} side="above" delay={0.85 + i * 0.06} reduced={reduced} />
              ))}
            </div>

            {/* Hairline axis */}
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={reduced ? { scaleX: 1 } : { scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
              style={{
                height: 2,
                background: 'var(--cream-hairline)',
                width: '100%',
                transformOrigin: 'left center',
                position: 'relative',
              }}
            >
              {/* Year tick marks at endpoints */}
              {[YEAR_MIN, 2010, 2015, 2020, YEAR_MAX].map((y) => (
                <span key={y} aria-hidden style={{
                  position: 'absolute',
                  left: `${yearToPct(y)}%`,
                  top: -3,
                  width: 1,
                  height: 8,
                  background: 'var(--cream-faint)',
                  transform: 'translateX(-0.5px)',
                }} />
              ))}
            </motion.div>

            {/* Below-axis container */}
            <div style={{ position: 'relative', height: '7rem', marginTop: 'var(--space-2)' }}>
              {PEDIATRIC.map((e, i) => (
                <Marker key={`p-${e.year}`} entry={e} side="below" delay={1.20 + i * 0.06} reduced={reduced} />
              ))}
            </div>
          </div>

          {/* Annotation strip — the inflection */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.55, delay: 1.85, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.88,
              lineHeight: 1.5,
              fontStyle: 'italic',
              borderLeft: '3px solid var(--coral)',
              paddingLeft: 'var(--space-3)',
              maxWidth: '92ch',
            }}
          >
            <strong style={{ color: 'var(--coral)', fontStyle: 'normal' }}>Bosentan FUTURE-1 in 2009</strong> set the framework: PK matching as the regulatory bridge. Every pediatric ERA program since uses this template. <strong style={{ color: 'var(--cream)', fontStyle: 'normal' }}>The ambrisentan case applies it under three simultaneous program disruptions.</strong>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.05}
        kicker="08 · CS1 · TIMELINE"
        tagline="The pediatric arm runs years to a decade behind the adult arm — sometimes longer."
        source="Source · FDA / EMA approval records · Beghetti BJCP 2009 · ICH E11A Step 4 (Dec 2024)"
      />
    </SlideGrid>
  );
}
