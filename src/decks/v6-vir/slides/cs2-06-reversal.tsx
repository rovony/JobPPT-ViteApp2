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
  indiaStroke: 0.7,
  indiaFill: 1.9,
  indiaEyebrow: 2.5,
  cdscoEyebrow: 2.8,
  heroDate: 3.1,
  timeline: 3.9,
  tick: [4.25, 4.75],
  stats: 5.5,
  amber: 6.2,
};

export default function CS2Reversal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · The reversal</Eyebrow>

      <Headline delay={0.25} maxChars={80}>
        Public record, then the reversal —{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
          14 May 2025
        </span>.
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        Rule 101 opened the door — CDSCO authorized without a local trial.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            gap: 'clamp(var(--space-4), 3vw, var(--space-6))',
            minHeight: 0,
          }}
        >
          {/* ── TOP ZONE: India outline + Horizontal Timeline ── */}
          <div style={{
            flex: 1, minHeight: 0,
            display: 'flex',
            gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          }}>
            {/* LEFT — India outline panel */}
            <motion.div
              style={{
                flex: '0 0 clamp(16rem, 25vw, 24rem)',
                minWidth: 0,
                border: '1px solid var(--cream-hairline)',
                background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
              }}
              whileHover={{ scale: 1.02, filter: 'drop-shadow(0 0 8px var(--cyan))' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: '0.14em',
                  color: 'var(--cyan)',
                  whiteSpace: 'nowrap',
                  marginBottom: 'var(--space-4)',
                  textAlign: 'center',
                }}
                initial={{ opacity: 0 }}
                animate={go ? { opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 0.3, delay: D.indiaEyebrow, ease: EASE }}
              >
                India authorization · public record
              </motion.div>

              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IndiaMap layoutId="india-cdsco" variant="filled" delay={D.indiaStroke} />
              </div>
            </motion.div>

            {/* RIGHT — Horizontal Timeline & Hero Date */}
            <div style={{
              flex: '1 1 auto', minWidth: 0,
              display: 'flex', flexDirection: 'column',
              gap: 'var(--space-6)',
              justifyContent: 'center',
            }}>
              <div>
                <motion.div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-slide-eyebrow)',
                    letterSpacing: '0.14em',
                    color: 'var(--cyan)',
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
                    fontSize: 'clamp(4rem, 8vw, 6rem)',
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

              {/* Horizontal Timeline */}
              <div style={{ position: 'relative', marginTop: 'var(--space-4)' }}>
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: '0.14em',
                  color: 'var(--cream-muted)',
                  marginBottom: 'var(--space-6)',
                }}>
                  Public regulatory timeline · merged from prior velocity slide
                </div>

                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', padding: '0 2rem' }}>
                  {/* Horizontal Axis Line */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '2rem',
                      right: '2rem',
                      height: '2px',
                      background: 'color-mix(in srgb, var(--cyan) 30%, transparent)',
                      transformOrigin: 'left',
                    }}
                    initial={{ scaleX: 0 }}
                    animate={go ? { scaleX: 1 } : { scaleX: 1 }}
                    transition={{ duration: 0.8, delay: D.timeline, ease: EASE }}
                  />

                  {TICKS.map((tick, i) => {
                    const isLast = tick.filled;
                    const tickDelay = D.tick[i];

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
                        initial={{ opacity: 0, y: -16 }}
                        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: tickDelay, ease: EASE }}
                      >
                        {/* Connector Dot */}
                        <div style={{
                          width: isLast ? 24 : 16,
                          height: isLast ? 24 : 16,
                          borderRadius: '50%',
                          background: isLast ? 'var(--cyan)' : 'var(--bg)',
                          border: `2px solid var(--cyan)`,
                          zIndex: 2,
                          boxShadow: isLast ? '0 0 15px color-mix(in srgb, var(--cyan) 50%, transparent)' : 'none',
                        }} />
                        
                        <div style={{
                          background: isLast ? 'color-mix(in srgb, var(--cyan) 15%, transparent)' : 'color-mix(in srgb, var(--panel) 40%, transparent)',
                          border: `1px ${isLast ? 'solid' : 'dashed'} ${isLast ? 'var(--cyan)' : 'var(--cream-hairline)'}`,
                          borderRadius: 'var(--radius-md)',
                          padding: 'var(--space-3)',
                          width: '100%',
                        }}>
                          <div className="deck-mono" style={{
                            fontSize: 'var(--fs-slide-tagline)',
                            color: 'var(--cyan)',
                            fontWeight: isLast ? 700 : 500,
                            letterSpacing: '0.08em',
                            marginBottom: 'var(--space-1)'
                          }}>
                            {tick.date}
                          </div>
                          <div className="deck-display" style={{
                            fontSize: 'var(--fs-slide-subhead)',
                            color: isLast ? 'var(--cyan)' : 'var(--cream)',
                            fontWeight: isLast ? 600 : 400,
                          }}>
                            {tick.label}
                          </div>
                          {tick.sub && (
                            <div className="deck-body" style={{
                              fontSize: 'var(--fs-slide-tagline)',
                              color: 'var(--cream-muted)',
                              fontStyle: 'italic',
                              marginTop: 'var(--space-1)'
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

          {/* ── STAT STRIP — three panel cards ── */}
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
                  fontSize: 'var(--fs-slide-tagline)',
                  letterSpacing: '0.14em',
                  color: 'var(--cream-muted)',
                }}>
                  {s.kicker}
                </div>
                <div className="deck-display" style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
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
              fontSize: '16px',
              lineHeight: 1.4,
            }}>
              <span aria-hidden style={{
                display: 'inline-block',
                transform: 'rotate(45deg)',
                width: 12, height: 12,
                background: 'var(--amber)',
                marginRight: 'var(--space-2)',
                verticalAlign: 'middle',
              }} />
              India authorization followed a{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 500, fontStyle: 'italic' }}>
                public Rule 101 pathway
              </span>
              {' '}built on accumulated FDA and EMA regulatory evidence.
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · The reversal"
        source="Sources · FDA Tibsovo labels/reviews · EMA EPAR · DCGI Rule 101 order · CDSCO/Servier public record"
        delay={D.amber + 0.7}
      />
    </SlideGrid>
  );
}
