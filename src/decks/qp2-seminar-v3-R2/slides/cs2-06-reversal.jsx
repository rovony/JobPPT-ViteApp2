/* BOUNDING-BOX AUDIT (update on every coordinate change)
 * Element               x-range         y-range       Notes
 * ───────────────       ────────────    ──────────    ──────
 * India SVG panel       left col        flex row      panel card, auto-fit reflows
 * Hero date             right col       top           ~88px display, clamp-scaled
 * Timeline baseline     right col       mid           full-width, 1px height
 * Tick 1 (27 Jan)       ~8.5% of axis   on axis       circle + labels above/below
 * Tick 2 (26 Mar)       ~50% of axis    on axis       overshoot entry, labels
 * Tick 3 (14 May)       ~91% of axis    on axis       filled dot + pulse ring
 * Stat strip            full width      below hero    3 panel cards, auto-fit grid
 * Amber band            full width      bottom        above footer
 */

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS2 Slide 8 · The Reversal — CDSCO approved 14 May 2025.
 *
 * India outline draws → fills cyan. Hero date types in character by character.
 * Mini-timeline shows 3 beats (Jan → Mar → May). Three stat panel cards.
 * Amber message band.
 *
 * Cross-slide: India outline carries layoutId="cs2-india" for morph from
 * the dark outline on slide 2 (cs2-bg-disease). Source slide needs matching
 * layoutId to activate the FLIP morph.
 */

const EASE = [0.2, 0.7, 0.3, 1];
const POP = [0.34, 1.56, 0.64, 1];

const INDIA_PATH =
  'M 78 12 C 88 8,105 6,122 14 C 140 22,152 28,168 38 C 178 44,184 52,188 62 ' +
  'C 192 72,188 82,180 88 C 174 94,162 96,156 102 C 152 112,156 122,162 134 ' +
  'C 168 146,168 158,160 168 C 152 178,142 188,132 196 C 122 204,114 210,108 214 ' +
  'C 102 210,98 200,94 188 C 88 174,82 158,78 144 C 74 130,68 118,60 108 ' +
  'C 52 98,44 92,38 84 C 32 76,30 66,36 58 C 44 46,56 38,62 30 C 66 22,70 14,78 12 Z';

const HERO_DATE = '14 May 2025';

const TICKS = [
  {
    date: '27 JAN 2025', label: 'revised dossier',
    sub: '91 KB · 6-pillar package', pct: 8.5,
  },
  {
    date: '26 MAR 2025', label: 'in-person SEC defense',
    sub: 'scientific leads · Okour, Mohammad', pct: 50,
    tooltip: 'In-person SEC defense · Scientific leads: Malek Okour · 6-pillar package',
  },
  {
    date: '14 MAY 2025', label: 'approval ✓',
    sub: 'launch 5 Jun 2025', pct: 91.4, filled: true,
  },
];

const STATS = [
  { kicker: 'APPROVAL', value: '14 May 2025', detail: 'CDSCO marketing authorization · Rule 101', accent: true },
  { kicker: 'LAUNCH', value: '5 June 2025', detail: 'Servier India · 22 days post-approval', accent: false },
  { kicker: 'CATEGORY', value: 'First in India', detail: 'IDH1 inhibitor · IDH1-mutant AML + CCA', accent: false },
];

const D = {
  indiaStroke: 0.7,
  indiaFill: 1.9,
  indiaEyebrow: 2.5,
  cdscoEyebrow: 2.8,
  heroDate: 3.1,
  timeline: 3.9,
  tick: [4.4, 4.7, 5.1],
  stats: 5.5,
  amber: 6.2,
};

export default function CS2Reversal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideFrame
      dataCase="cyan"
      eyebrow="Case 02 · The reversal"
      headline={
        <>
          CDSCO approved the waiver —{' '}
          <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
            14 May 2025
          </span>
          .
        </>
      }
      subhead="First IDH1 inhibitor in India. Patient access without a bridging trial."
      footerKicker="Case 02 · The reversal"
      footerSource="Sources · CDSCO public record · Servier India press · Business Standard 5 Jun 2025"
      delays={{ footer: reduced ? 0 : D.amber + 0.7 }}
    >
      <div
        ref={ref}
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          gap: 'var(--space-4)',
          minHeight: 0,
        }}
      >
        {/* ── HERO ZONE: India outline + hero date / timeline ── */}
        <div style={{
          flex: 1, minHeight: 0,
          display: 'flex', flexWrap: 'wrap',
          gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
        }}>
          {/* LEFT — India outline panel */}
          <motion.div
            layout
            layoutId="cs2-india"
            style={{
              flex: '0 1 clamp(12rem, 35%, 18rem)',
              minWidth: 0,
              border: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-3) var(--space-4)',
              display: 'flex', flexDirection: 'column',
              position: 'relative', overflow: 'hidden',
              cursor: 'default',
            }}
            whileHover={{ scale: 1.02, filter: 'drop-shadow(0 0 8px var(--cyan))' }}
            title="Population ~1.4 billion · IDH1-mutant AML + CCA: tens of thousands"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: '0.14em',
                color: 'var(--cyan)',
                whiteSpace: 'nowrap',
              }}
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 0.3, delay: D.indiaEyebrow, ease: EASE }}
            >
              Indian patient access · unlocked
            </motion.div>

            <svg
              viewBox="0 0 220 220"
              style={{ flex: 1, minHeight: 0, maxHeight: '100%', width: '100%', marginTop: 'var(--space-2)' }}
              xmlns="http://www.w3.org/2000/svg"
              aria-label="India outline"
            >
              {/* Fill layer */}
              <motion.path
                d={INDIA_PATH}
                fill="var(--cyan)"
                strokeLinejoin="round"
                initial={{ fillOpacity: 0 }}
                animate={go ? { fillOpacity: 0.85 } : { fillOpacity: 0.85 }}
                transition={{ duration: 0.6, delay: D.indiaFill, ease: EASE }}
              />
              {/* Stroke layer (draws on) */}
              <motion.path
                d={INDIA_PATH}
                fill="none"
                stroke="var(--cyan)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={go ? { pathLength: 1 } : { pathLength: 1 }}
                transition={{ duration: 1.2, delay: D.indiaStroke, ease: [0.4, 0, 0.2, 1] }}
              />
              {/* Subtle texture lines */}
              <path
                d="M 100 80 L 130 90 M 110 120 L 140 130 M 100 160 L 120 170"
                stroke="var(--cream)"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity="0.15"
              />
            </svg>
          </motion.div>

          {/* RIGHT — Hero date + reversal timeline */}
          <div style={{
            flex: '1 1 20rem', minWidth: 0,
            display: 'flex', flexDirection: 'column',
            gap: 'var(--space-6)',
            justifyContent: 'center',
          }}>
            {/* Hero date block */}
            <div>
              <motion.div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: '0.14em',
                  color: 'var(--cyan)',
                  whiteSpace: 'nowrap',
                }}
                initial={{ opacity: 0 }}
                animate={go ? { opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 0.3, delay: D.cdscoEyebrow, ease: EASE }}
              >
                CDSCO marketing authorization
              </motion.div>

              <div
                className="deck-display"
                style={{
                  fontSize: 'clamp(2.5rem, min(7vw, 9vh), 5.5rem)',
                  fontWeight: 500,
                  color: 'var(--cyan)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                  marginTop: 'var(--space-2)',
                }}
              >
                {HERO_DATE.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={go ? { opacity: 1 } : { opacity: 1 }}
                    transition={{ duration: 0.01, delay: D.heroDate + i * 0.06 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Reversal mini-timeline */}
            <div>
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: '0.14em',
                color: 'var(--cream-muted)',
                marginBottom: 'var(--space-3)',
                whiteSpace: 'nowrap',
              }}>
                Reversal · 3 beats · 4 months
              </div>

              <div style={{ position: 'relative', height: 'clamp(4rem, 8vh, 5.5rem)' }}>
                {/* Baseline */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '45%', left: 0, right: 0,
                    height: 1,
                    background: 'var(--cyan)',
                    opacity: 0.35,
                    transformOrigin: 'left',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={go ? { scaleX: 1 } : { scaleX: 1 }}
                  transition={{ duration: 0.5, delay: D.timeline, ease: EASE }}
                />

                {/* Ticks */}
                {TICKS.map((tick, i) => {
                  const isLast = tick.filled;
                  const isSec = i === 1;
                  const tickDelay = D.tick[i];

                  return (
                    <motion.div
                      key={tick.date}
                      style={{
                        position: 'absolute',
                        left: `${tick.pct}%`,
                        top: 0,
                        transform: 'translateX(-50%)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        height: '100%',
                        justifyContent: 'center',
                        cursor: 'default',
                      }}
                      title={tick.tooltip || `${tick.date} · ${tick.label}`}
                      initial={{ opacity: 0, scale: isSec ? 0.5 : 0.8 }}
                      animate={go
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 1, scale: 1 }}
                      transition={{
                        duration: isSec ? 0.4 : 0.3,
                        delay: tickDelay,
                        ease: isSec ? POP : EASE,
                      }}
                    >
                      {/* Date above */}
                      <span className="deck-mono" style={{
                        fontSize: 'var(--fs-slide-pageno)',
                        letterSpacing: '0.1em',
                        color: 'var(--cyan)',
                        fontWeight: isLast ? 600 : 400,
                        whiteSpace: 'nowrap',
                      }}>
                        {tick.date}
                      </span>

                      {/* Dot */}
                      <div style={{ position: 'relative' }}>
                        <div style={{
                          width: isLast ? 12 : isSec ? 10 : 8,
                          height: isLast ? 12 : isSec ? 10 : 8,
                          borderRadius: '50%',
                          background: isLast ? 'var(--cyan)' : 'var(--bg)',
                          border: `${isLast ? 0 : isSec ? 2 : 1.5}px solid var(--cyan)`,
                        }} />
                        {isLast && (
                          <motion.div
                            style={{
                              position: 'absolute',
                              top: -4, left: -4,
                              width: 20, height: 20,
                              borderRadius: '50%',
                              border: '1px solid var(--cyan)',
                              opacity: 0.4,
                            }}
                            animate={go ? {
                              scale: [1, 1.3, 1],
                              opacity: [0.4, 0.15, 0.4],
                            } : {}}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: D.tick[2] + 0.3,
                              ease: 'easeInOut',
                            }}
                          />
                        )}
                      </div>

                      {/* Label below */}
                      <span className="deck-display" style={{
                        fontSize: 'var(--fs-slide-pageno)',
                        fontStyle: 'italic',
                        color: isLast ? 'var(--cyan)' : isSec ? 'var(--cream)' : 'var(--cream-muted)',
                        fontWeight: isSec ? 500 : 400,
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                      }}>
                        {tick.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── STAT STRIP — three panel cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(12rem, 100%), 1fr))',
          gap: 'var(--space-4)',
          flexShrink: 0,
        }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.kicker}
              style={{
                border: '1px solid var(--cream-hairline)',
                background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-3) var(--space-4)',
                minWidth: 0,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: D.stats + i * 0.15, ease: EASE }}
            >
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-pageno)',
                letterSpacing: '0.14em',
                color: 'var(--cream-muted)',
              }}>
                {s.kicker}
              </div>
              <div className="deck-display" style={{
                fontSize: 'var(--fs-slide-subhead)',
                fontWeight: 500,
                color: s.accent ? 'var(--cyan)' : 'var(--cream)',
                fontVariantNumeric: 'tabular-nums',
                marginTop: 'var(--space-1)',
              }}>
                {s.value}
              </div>
              <div className="deck-body" style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--cream-muted)',
                marginTop: 'var(--space-1)',
                lineHeight: 1.3,
              }}>
                {s.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── AMBER MESSAGE BAND ── */}
        <motion.div
          style={{
            flexShrink: 0,
            background: 'color-mix(in srgb, var(--amber) 12%, transparent)',
            borderTop: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
            borderBottom: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
            padding: 'var(--space-3) var(--space-5)',
            borderRadius: 'var(--radius-sm)',
          }}
          initial={{ opacity: 0 }}
          animate={go ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.5, delay: D.amber, ease: EASE }}
        >
          <span className="deck-display" style={{
            fontSize: 'var(--fs-slide-tagline)',
            lineHeight: 1.4,
          }}>
            <span style={{ color: 'var(--amber)', fontWeight: 600, marginRight: 'var(--space-2)' }}>
              ▌
            </span>
            Granted with a{' '}
            <span style={{ color: 'var(--amber)', fontWeight: 500, fontStyle: 'italic' }}>
              Phase 4 commitment
            </span>
            {' '}in lieu of pre-approval local data — the trade Rule 101 specifies.
          </span>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
