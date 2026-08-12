// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import IndiaMap from '@/components/deck/illustrations/IndiaMap';

const EASE = [0.2, 0.7, 0.3, 1];

const HERO_DATE = '14 May 2025';

const TICKS = [
  {
    date: 'AUG 2024', label: 'Rule 101 order',
    sub: 'Waiver categories operationalized',
  },
  {
    date: '14 MAY 2025', label: 'CDSCO approval',
    sub: 'Marketing authorization granted', filled: true,
  },
];

const STATS = [
  { kicker: 'APPROVAL', value: '14 May 2025', detail: 'CDSCO marketing authorization · Rule 101 pathway', accent: true },
  { kicker: 'PUBLIC RECORD', value: 'FDA + EMA', detail: 'Four FDA labels/reviews plus EMA EPAR underpin the dossier', accent: false },
];

const D = {
  indiaEyebrow: 0.10,
  cdscoEyebrow: 0.12,
  timeline: 0.16,
  tick: [0.18, 0.22],
  stats: 0.24,
  amber: 0.30,
};

export default function CS2Reversal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView || !!reduced;
  const motionOn = go && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.08}>Case 03 · The reversal</Eyebrow>

      <Headline delay={0.12} maxChars={80}>
        Public record, then the reversal —{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
          14 May 2025
        </span>.
      </Headline>

      <Subhead delay={0.18} size="lead" maxChars={120}>
        Rule 101 opened the door — CDSCO authorized without a local trial.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            gap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          <div style={{
            flex: 1, minHeight: 0,
            display: 'flex',
            gap: 'var(--space-4)',
          }}>
            {/* LEFT — India outline panel */}
            <div
              style={{
                flex: '0 0 clamp(16rem, 25vw, 24rem)',
                minWidth: 0,
                border: '1px solid var(--cream-hairline)',
                borderTop: '3px solid var(--cyan)',
                background: 'var(--panel)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <motion.div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono)',
                  color: 'var(--cyan)',
                  whiteSpace: 'nowrap',
                  marginBottom: 'var(--space-3)',
                  textAlign: 'center',
                  fontWeight: 700,
                }}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: motionOn ? 0.25 : 0, delay: motionOn ? D.indiaEyebrow : 0, ease: EASE }}
              >
                India authorization · public record
              </motion.div>

              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IndiaMap layoutId="india-cdsco" variant="filled" delay={0.12} fillIntensity={0.45} />
              </div>
            </div>

            {/* RIGHT — Timeline & hero date */}
            <div style={{
              flex: '1 1 auto', minWidth: 0,
              display: 'flex', flexDirection: 'column',
              gap: 'var(--space-4)',
              justifyContent: 'center',
            }}>
              <div>
                <motion.div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-slide-eyebrow)',
                    letterSpacing: 'var(--ls-mono)',
                    color: 'var(--cyan)',
                    fontWeight: 700,
                  }}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: motionOn ? 0.25 : 0, delay: motionOn ? D.cdscoEyebrow : 0, ease: EASE }}
                >
                  CDSCO marketing authorization
                </motion.div>

                {/* Solid date — never gated behind char-by-char opacity */}
                <div
                  className="deck-display"
                  style={{
                    fontSize: 'clamp(3.2rem, 6.5vw, 5.5rem)',
                    fontWeight: 500,
                    color: 'var(--cyan)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    fontVariantNumeric: 'tabular-nums',
                    marginTop: 'var(--space-2)',
                  }}
                >
                  {HERO_DATE}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono)',
                  color: 'var(--cream-muted)',
                  marginBottom: 'var(--space-4)',
                  fontWeight: 600,
                }}>
                  Public regulatory timeline
                </div>

                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', padding: '0 var(--space-4)' }}>
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: 'var(--space-4)',
                      right: 'var(--space-4)',
                      height: '1px',
                      background: 'var(--cream-hairline)',
                      transformOrigin: 'left',
                    }}
                    initial={reduced ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: motionOn ? 0.4 : 0, delay: motionOn ? D.timeline : 0, ease: EASE }}
                  />

                  {TICKS.map((tick, i) => {
                    const isLast = tick.filled;
                    return (
                      <motion.div
                        key={tick.date}
                        style={{
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          gap: 'var(--space-3)',
                          width: '12rem',
                        }}
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: motionOn ? 0.3 : 0, delay: motionOn ? D.tick[i] : 0, ease: EASE }}
                      >
                        <div style={{
                          width: isLast ? 14 : 10,
                          height: isLast ? 14 : 10,
                          borderRadius: '50%',
                          background: isLast ? 'var(--cyan)' : 'var(--bg)',
                          border: '2px solid var(--cyan)',
                          zIndex: 2,
                        }} />

                        <div style={{
                          background: 'var(--panel)',
                          border: '1px solid var(--cream-hairline)',
                          borderTop: isLast ? '3px solid var(--cyan)' : '3px solid var(--cream-hairline)',
                          borderRadius: 'var(--radius-md)',
                          padding: 'var(--space-3)',
                          width: '100%',
                        }}>
                          <div className="deck-mono" style={{
                            fontSize: 'var(--fs-slide-tagline)',
                            color: 'var(--cyan)',
                            fontWeight: isLast ? 700 : 500,
                            letterSpacing: 'var(--ls-mono)',
                            marginBottom: 'var(--space-1)',
                          }}>
                            {tick.date}
                          </div>
                          <div className="deck-body" style={{
                            fontSize: 'var(--fs-slide-subhead)',
                            color: isLast ? 'var(--cyan)' : 'var(--cream)',
                            fontWeight: isLast ? 600 : 500,
                          }}>
                            {tick.label}
                          </div>
                          {tick.sub && (
                            <div className="deck-body" style={{
                              fontSize: 'var(--fs-slide-tagline)',
                              color: 'var(--cream-muted)',
                              marginTop: 'var(--space-1)',
                            }}>
                              {tick.sub}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
            gap: 'var(--space-4)',
            flexShrink: 0,
          }}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.kicker}
                style={{
                  border: '1px solid var(--cream-hairline)',
                  borderTop: `3px solid ${s.accent ? 'var(--cyan)' : 'var(--cream-hairline)'}`,
                  background: 'var(--panel)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-3) var(--space-4)',
                  minWidth: 0,
                }}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionOn ? 0.3 : 0, delay: motionOn ? D.stats + i * 0.04 : 0, ease: EASE }}
              >
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  letterSpacing: 'var(--ls-mono)',
                  color: 'var(--cream-muted)',
                  fontWeight: 700,
                }}>
                  {s.kicker}
                </div>
                <div className="deck-display" style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.45rem)',
                  fontWeight: 500,
                  color: s.accent ? 'var(--cyan)' : 'var(--cream)',
                  fontVariantNumeric: 'tabular-nums',
                  marginTop: 'var(--space-1)',
                }}>
                  {s.value}
                </div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  color: 'var(--cream-muted)',
                  marginTop: 'var(--space-1)',
                  lineHeight: 1.35,
                }}>
                  {s.detail}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Full-width takeaway */}
          <motion.aside
            style={{
              width: '100%',
              flexShrink: 0,
              padding: 'clamp(0.85rem, 1.6vh, 1.15rem) clamp(1.1rem, 2vw, 1.5rem)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--cream-hairline)',
              borderLeft: '4px solid var(--amber)',
              background: 'var(--panel)',
            }}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionOn ? 0.3 : 0, delay: motionOn ? D.amber : 0, ease: EASE }}
          >
            <div className="deck-body" style={{
              fontSize: 'var(--fs-slide-subhead)',
              lineHeight: 1.45,
              color: 'var(--cream)',
              fontWeight: 500,
            }}>
              India authorization followed a{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
                public Rule 101 pathway
              </span>
              {' '}built on accumulated FDA and EMA regulatory evidence.
            </div>
          </motion.aside>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · The reversal"
        tagline=""
        source="FDA Tibsovo labels/reviews · EMA EPAR · DCGI Rule 101 order · CDSCO/Servier public record"
        delay={reduced ? 0 : 0.32}
      />
    </SlideGrid>
  );
}
