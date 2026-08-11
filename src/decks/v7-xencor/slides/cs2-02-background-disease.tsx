// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import BodyLayout from '@/components/deck/layouts/BodyLayout';
import IndiaMap from '@/components/deck/illustrations/IndiaMap';
import IntegerTicker from '@/components/deck/patterns/IntegerTicker';
import WorldMapShared from './cs2-shared/WorldMapShared';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS2 Slide 2 — Hook + question.   ID: cs2-bg-disease (manifest key)
 *
 * "42 countries said yes. India asked: prove it locally."
 * The slide commits to no answer — the question hangs.
 * Slides 3–10 earn the answer.
 *
 * MAP CODE IS LOAD-BEARING — it is the layoutId morph destination for
 * "india-cdsco" from cs2-divider (same LUNG-PARITY technique as CS1).
 * DO NOT TOUCH the map pane, INDIA_DEST, or IndiaMap props without
 * reading the original port notes preserved below.
 *
 * Country count: 42 — sourced from FDA Orange Book + EMA EPAR + NMPA +
 * TGA + Servier public record cross-walk (R1 figure, retained in R2R).
 * The exact count fluctuates as Servier files in additional jurisdictions;
 * "42+" reads as accurate for the Aug 2024 submission window.
 */

// ─── MAP POSITIONING ──────────────────────────────────────────────
// IndiaMap viewBox `55 -41 30 33` projected onto world map viewBox
// `−180 −91.296 360 182.592` (Robinson, Natural Earth):
//   left   = (55 + 180) / 360       = 65.2778%
//   top    = (−41 + 91.296) / 182.592 = 27.5456%
//   width  = 30 / 360                = 8.3333%
//   height = 33 / 182.592            = 18.0731%
// Width AND height are both set as explicit percentages so the
// destination bbox does NOT depend on the IndiaMap's CSS
// `aspect-ratio: 30/33` chain — that chain was producing a small
// vertical drift (the India outline landing a few px off the world
// map's IND polygon at the end of the morph). With both axes pinned
// to viewBox-derived percentages, the container is pixel-aligned
// with the .IND path on `world-map.svg` regardless of how
// framer-motion's projection layer measures bbox.
const INDIA_DEST = {
  position: 'absolute',
  left:     '65.2778%',
  top:      '27.5456%',
  width:    '8.3333%',
  height:   '18.0731%',
};

const MAP_RATIO = 360 / 182.592;

export default function CS2BackgroundDisease({ deck }) {
  const ref = useRef(null);
  const mapZoneRef = useRef(null);
  const [mapBox, setMapBox] = useState(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  useEffect(() => {
    const el = mapZoneRef.current;
    if (!el) return;
    const measure = () => {
      const { width: pw, height: ph } = el.getBoundingClientRect();
      if (!pw || !ph) return;
      let w, h;
      if (pw / ph > MAP_RATIO) {
        h = ph; w = ph * MAP_RATIO;
      } else {
        w = pw; h = pw / MAP_RATIO;
      }
      setMapBox({ width: w, height: h, left: (pw - w) / 2, top: (ph - h) / 2 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-case="cyan"
      className="relative h-[100dvh] w-full overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      <BodyLayout
        deck={deck}
        footerText={null}
        footerLine={false}
        pageNumber={true}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: 0,
            gap: 0,
          }}
        >
          {/* ── EYEBROW ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 0.2, ease: EASE, delay: 0 }}
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cyan)',
              marginBottom: 'var(--space-2)',
            }}
          >
            Case 02 · The question
          </motion.div>

          {/* ── HEADLINE ── */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="deck-display"
            style={{
              fontSize: 'var(--fs-slide-headline)',
              lineHeight: 'var(--lh-tight)',
              letterSpacing: 'var(--ls-display)',
              fontWeight: 500,
              color: 'var(--cream)',
              maxWidth: '48ch',
              margin: 0,
              marginBottom: 'var(--space-4)',
            }}
          >
            <IntegerTicker from={0} to={42} duration={1.2} delay={0.2} go={go} />{' '}
            countries said yes.{' '}
            <span style={{ color: 'var(--cyan)' }}>India</span> asked:{' '}
            <em>prove it locally.</em>
          </motion.h2>

          {/* ── MAP ZONE (~60% canvas) ── */}
          <div
            ref={mapZoneRef}
            style={{
              position: 'relative',
              flex: '1 1 0%',
              minHeight: 0,
            }}
          >
            {mapBox && <div
              style={{
                position: 'absolute',
                left: mapBox.left,
                top: mapBox.top,
                width: mapBox.width,
                height: mapBox.height,
              }}
            >
              {/* World map — fades in at 0.8s */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={go ? { opacity: 0.62 } : {}}
                transition={{ duration: 0.3, ease: EASE, delay: 0.8 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                }}
                aria-hidden
              >
                <WorldMapShared
                  layoutId="cs2-world-map"
                  variant="context"
                  indiaState="empty"
                  approvedColor="var(--cyan)"
                  suppressIndiaSvg
                />
              </motion.div>

              {/* India outline — layoutId morph destination */}
              <motion.div
                initial={{ filter: 'drop-shadow(0 0 0 color-mix(in srgb, var(--cyan) 0%, transparent))' }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 0 color-mix(in srgb, var(--cyan) 0%, transparent))',
                    'drop-shadow(0 0 4px color-mix(in srgb, var(--cyan) 42%, transparent))',
                    'drop-shadow(0 0 0 color-mix(in srgb, var(--cyan) 0%, transparent))',
                  ],
                }}
                transition={{
                  duration: 4,
                  ease: 'easeInOut',
                  delay: 2.0,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                }}
                style={{ ...INDIA_DEST, pointerEvents: 'none' }}
                aria-hidden
              >
                <IndiaMap
                  layoutId="india-cdsco"
                  variant="empty"
                  depleteFillFromDivider
                  dashedStroke
                  dashedDelay={1.7}
                  customFill="color-mix(in srgb, var(--bg) 55%, var(--cyan) 12%)"
                  style={{ position: 'static', left: 'auto', top: 'auto', width: '100%', height: '100%' }}
                />
              </motion.div>

              {/* Glass callout near India */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={go ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: EASE, delay: 2.0 }}
                style={{
                  position: 'absolute',
                  left: '74%',
                  top: '48%',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 3,
                    border: '1px solid color-mix(in srgb, var(--cyan) 30%, transparent)',
                    borderLeft: '3px solid var(--cyan)',
                    background:
                      'linear-gradient(135deg, ' +
                        'color-mix(in srgb, var(--cyan) 8%, transparent) 0%, ' +
                        'color-mix(in srgb, var(--cyan) 2%, transparent) 100%)',
                    backdropFilter: 'blur(10px) saturate(1.2)',
                    WebkitBackdropFilter: 'blur(10px) saturate(1.2)',
                    boxShadow:
                      '0 0 24px color-mix(in srgb, var(--cyan) 8%, transparent), ' +
                      'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <span
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'var(--fs-card-label)',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: 'var(--cyan)',
                      fontWeight: 700,
                    }}
                  >
                    INDIA
                  </span>
                  <span
                    className="deck-mono"
                    style={{
                      fontSize: 'var(--fs-slide-pageno)',
                      color: 'var(--cream-muted)',
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    ~1.4 billion people
                  </span>
                  <span
                    className="deck-display"
                    style={{
                      fontSize: 'var(--fs-card-body)',
                      color: 'var(--cream)',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    still required local data
                  </span>
                </div>
              </motion.div>
            </div>}
          </div>
          {/* ── END MAP ZONE ── */}

          {/* ── INDICATION BREADTH TIMELINE ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 1.8 }}
            style={{ paddingTop: 0, marginTop: 'calc(-1 * var(--space-2))' }}
          >
            <ApprovalTimeline />
          </motion.div>

          {/* ── PULL-QUOTE CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 2.2 }}
            style={{
              marginTop: 'var(--space-3)',
              padding: 'var(--space-4) var(--space-5)',
              borderRadius: 6,
              background: 'color-mix(in srgb, var(--amber) 18%, var(--bg))',
              border: '1px solid color-mix(in srgb, var(--amber) 35%, transparent)',
              borderLeftWidth: 4,
              borderLeftStyle: 'solid',
              borderLeftColor: 'var(--amber)',
              textAlign: 'center',
            }}
          >
            <p
              className="deck-display"
              style={{
                margin: 0,
                fontSize: 'var(--fs-slide-tagline)',
                fontStyle: 'italic',
                fontWeight: 600,
                lineHeight: 1.3,
                color: 'var(--cream)',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              Can a{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 800 }}>
                global Clin Pharm package
              </span>{' '}
              register a drug in India — without a{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 800 }}>
                local trial
              </span>
              ?
            </p>
          </motion.div>

          {/* ── FOOTER SOURCE LINE ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 2.6 }}
            style={{
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
              marginTop: 'var(--space-2)',
            }}
          >
            <span
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-slide-pageno)',
                letterSpacing: 'var(--ls-mono)',
                color: 'var(--cream-faint)',
                lineHeight: 1.4,
              }}
            >
              Sources: FDA Orange Book · EMA EPAR · NMPA · TGA · Servier public record · 2018–2024
            </span>
          </motion.div>
        </div>
      </BodyLayout>
    </section>
  );
}

/* ── APPROVAL TIMELINE (local, slide-scoped) ───────────────────────
 * 2026-04-26: Fixed CDSCO date contradiction. Was "Dec 2024"; that
 * was the SEC OPINION asking for local PK/PD data, NOT the approval.
 * Actual CDSCO marketing authorization was 14 May 2025. The slide is
 * the question slide — CDSCO should NOT be listed here as an approval
 * until cs2-reversal lands the answer. Dropped CDSCO from this row;
 * the 42 countries claim above carries the breadth point. */
const TICKS = [
  { agency: 'FDA',   year: '2018', indication: 'R/R AML' },
  { agency: 'NMPA',  year: '2022', indication: 'R/R AML' },
  { agency: 'EMA',   year: '2023', indication: 'AML + CCA' },
  { agency: 'TGA',   year: '2024', indication: 'CCA' },
  { agency: 'CDSCO', year: '?',    indication: 'India still asks for local data', accent: true },
];

function ApprovalTimeline() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: 0,
        width: '100%',
        position: 'relative',
        padding: 'var(--space-2) 0',
        borderTop: '1px solid color-mix(in srgb, var(--cream) 18%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--cream) 18%, transparent)',
      }}
    >
      {TICKS.map((t, i) => {
        const isLast = i === TICKS.length - 1;
        return (
          <React.Fragment key={t.agency}>
            {isLast && (
              <div
                style={{
                  flex: '0 0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 var(--space-2)',
                }}
              >
                <div
                  style={{
                    width: 'clamp(20px, 4vw, 48px)',
                    height: 2,
                    borderTop: '2px dashed var(--cyan)',
                    opacity: 0.6,
                  }}
                />
              </div>
            )}
            <div
              style={{
                flex: isLast ? '0 0 auto' : '1 1 0%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-1)',
                textAlign: 'center',
                borderLeft: isLast
                  ? '2px solid var(--cyan)'
                  : '1px solid color-mix(in srgb, var(--cream) 30%, transparent)',
                paddingLeft: 'var(--space-3)',
                paddingRight: 'var(--space-3)',
              }}
            >
              <span
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: t.accent ? 'var(--cyan)' : 'var(--cream)',
                  fontWeight: t.accent ? 700 : 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {t.agency} · {t.year}
              </span>
              <span
                className="deck-mono"
                style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  color: t.accent ? 'var(--cyan)' : 'color-mix(in srgb, var(--cream) 65%, transparent)',
                  fontWeight: 400,
                  whiteSpace: 'nowrap',
                }}
              >
                {t.indication}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
