// @ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS2 Slide 9 · Honest reckoning — what we shipped, what we did not.
 *
 * Two-column contrast: SHIPPED (cyan wash, 4 rows) vs DID NOT SHIP
 * (muted panel, 3 rows). "0 Indian patients" gets an amber highlight —
 * the credibility move. Counters animate up.
 */

const EASE = [0.2, 0.7, 0.3, 1];

/* Reckoning content recalibrated 2026-04-26 per user feedback:
 * "content seems wrong and doesn't align with story." Reframed
 * SHIPPED to be evidence-of-bridge (what the dossier did), not
 * outcome-recap (which lives on cs2-reversal/leadership). NOT
 * SHIPPED tightened to 3 honest gaps without duplicating
 * "0 Indian patients" framing already on cs2-bg-disease. */
const SHIPPED = [
  {
    title: 'Mechanism-first defense',
    date: 'somatic IDH1 R132',
    cite: 'Tumor-acquired target · ICH E5 ethnic sensitivity argument',
  },
  {
    title: 'Six-pillar dossier',
    date: 'PK · ER · intrinsic · extrinsic · regulatory · MOA',
    cite: 'Convergent evidence package · 36-page justification',
  },
  {
    title: 'PBPK in the label',
    date: 'midazolam AUC ratio 0.18',
    cite: 'Predicted · clinically qualified · regulatory text',
  },
  {
    title: 'Waiver granted with Phase 4',
    date: 'CDSCO approval · 14 May 2025',
    cite: 'Conditional, not categorical · post-marketing cohort committed',
  },
];

const NOT_SHIPPED = [
  {
    title: 'Pre-approval Indian PK/PD',
    detail: '',
    cite: 'No Indian-site enrollment in AG120-C-001 / ClarIDHy / AGILE — Phase 4 closes this gap',
    amber: true,
    tooltip: 'Phase 4 PK/PD study in Indian population is the post-approval commitment',
  },
  {
    title: 'Indian-specific peer-reviewed PK',
    detail: '',
    cite: 'PopPK n=253 with race n.s. is the inference — not a published Indian-cohort paper',
  },
  {
    title: 'PV maturation at approval',
    detail: '',
    cite: 'Indian PV system continues to scale · Phase 4 + RWE plan address residual risk',
  },
];

const D = {
  shipped: 0.7,
  shippedCounter: 1.1,
  shippedRows: [1.3, 1.55, 1.8, 2.05],
  notShipped: 3.4,
  notCounter: 3.8,
  notRows: [4.1, 4.6, 4.85],
  anchor: 5.4,
  amber: 5.8,
};

function AnimCounter({ target, go, delay, color }) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!go || reduced) { setCount(target); return; }
    const stepMs = 200;
    let current = 0;
    const startMs = delay * 1000;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += 1;
        setCount(current);
        if (current >= target) clearInterval(interval);
      }, stepMs);
      return () => clearInterval(interval);
    }, startMs);
    return () => clearTimeout(timer);
  }, [go, target, delay, reduced]);

  return (
    <span className="deck-mono" style={{
      fontSize: 'var(--fs-slide-pageno)',
      color,
      letterSpacing: '0.14em',
      fontVariantNumeric: 'tabular-nums',
    }}>
      {count}
    </span>
  );
}

export default function CS2Reckoning() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideFrame
      dataCase="cyan"
      eyebrow="Case 02 · Honest reckoning"
      headline={
        <>
          What we{' '}
          <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
            shipped
          </span>
          , and what we did{' '}
          <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
            not
          </span>
          .
        </>
      }
      subhead="Naming the gap is the credibility move — not the disqualifying one."
      footerKicker="Case 02 · Honest reckoning"
      footerSource="Sources · ClinicalTrials.gov · CDSCO public record · Lancet RH SE Asia 2024"
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
        {/* ── TWO-COLUMN CONTRAST ── */}
        <div style={{
          flex: '0 1 auto', minHeight: 0,
          display: 'flex', flexWrap: 'wrap',
          gap: 'clamp(var(--space-4), 3vw, var(--space-6))',
        }}>
          {/* SHIPPED column (cyan wash) */}
          <motion.div
            style={{
              flex: '1 1 18rem', minWidth: 0,
              border: '1px solid color-mix(in srgb, var(--cyan) 18%, transparent)',
              background: 'color-mix(in srgb, var(--cyan) 8%, transparent)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-3) var(--space-4)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: D.shipped, ease: EASE }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-3)',
            }}>
              <span className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: '0.14em',
                color: 'var(--cyan)',
              }}>
                What we shipped
              </span>
              <span className="deck-mono" style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--cyan)',
                letterSpacing: '0.14em',
              }}>
                ✓ <AnimCounter target={4} go={go} delay={D.shippedCounter} color="var(--cyan)" />
              </span>
            </div>

            {/* Rows */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SHIPPED.map((row, i) => (
                <motion.div
                  key={row.title}
                  style={{
                    display: 'flex', gap: 'var(--space-3)',
                    padding: 'var(--space-2) 0',
                    borderTop: i > 0
                      ? '1px solid color-mix(in srgb, var(--cyan) 12%, transparent)'
                      : 'none',
                    alignItems: 'baseline',
                    cursor: 'default',
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: D.shippedRows[i], ease: EASE }}
                  whileHover={{
                    borderLeftWidth: 3,
                    borderLeftColor: 'var(--cyan)',
                    borderLeftStyle: 'solid',
                    paddingLeft: 'var(--space-2)',
                  }}
                >
                  <motion.span
                    className="deck-mono"
                    style={{
                      fontSize: 'var(--fs-slide-body)',
                      color: 'var(--cyan)',
                      fontWeight: 500,
                      flexShrink: 0,
                      width: '1.2em',
                    }}
                    initial={{ opacity: 0 }}
                    animate={go ? { opacity: 1 } : { opacity: 1 }}
                    transition={{
                      duration: 0.2,
                      delay: D.shippedRows[i] - 0.1,
                      ease: EASE,
                    }}
                  >
                    ✓
                  </motion.span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="deck-body" style={{
                      fontSize: 'var(--fs-slide-subhead)',
                      color: 'var(--cream)',
                      lineHeight: 1.4,
                    }}>
                      <span style={{ color: 'var(--cyan)', fontWeight: 500 }}>
                        {row.title}
                      </span>
                      {' — '}{row.date}
                    </div>
                    <div className="deck-display" style={{
                      fontSize: 'var(--fs-slide-pageno)',
                      fontStyle: 'italic',
                      color: 'var(--cream-muted)',
                      marginTop: 1,
                    }}>
                      {row.cite}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* DID NOT SHIP column (muted) */}
          <motion.div
            style={{
              flex: '1 1 18rem', minWidth: 0,
              border: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-3) var(--space-4)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: D.notShipped, ease: EASE }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-3)',
            }}>
              <span className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: '0.14em',
                color: 'var(--cream-muted)',
              }}>
                What we did not ship
              </span>
              <span className="deck-mono" style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--cream-muted)',
                letterSpacing: '0.14em',
              }}>
                ⊘ <AnimCounter target={3} go={go} delay={D.notCounter} color="var(--cream-muted)" />
              </span>
            </div>

            {/* Rows */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {NOT_SHIPPED.map((row, i) => (
                <motion.div
                  key={row.title}
                  style={{
                    display: 'flex', gap: 'var(--space-3)',
                    padding: 'var(--space-2) 0',
                    borderTop: i > 0
                      ? '1px solid var(--cream-hairline)'
                      : 'none',
                    alignItems: 'baseline',
                    cursor: 'default',
                  }}
                  title={row.tooltip || undefined}
                  initial={{ opacity: 0, x: -8 }}
                  animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: D.notRows[i], ease: EASE }}
                >
                  <span className="deck-mono" style={{
                    fontSize: 'var(--fs-slide-body)',
                    color: 'var(--cream-muted)',
                    flexShrink: 0,
                    width: '1.2em',
                  }}>
                    ⊘
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="deck-body" style={{
                      fontSize: 'var(--fs-slide-subhead)',
                      color: 'var(--cream)',
                      lineHeight: 1.4,
                    }}>
                      {row.amber ? (
                        <span style={{
                          background: 'color-mix(in srgb, var(--amber) 18%, transparent)',
                          padding: '1px 6px',
                          borderRadius: 2,
                          fontWeight: 500,
                        }}>
                          {row.title}
                        </span>
                      ) : (
                        row.title
                      )}
                      {row.detail ? ` ${row.detail}` : ''}
                    </div>
                    <div className="deck-display" style={{
                      fontSize: 'var(--fs-slide-pageno)',
                      fontStyle: 'italic',
                      color: 'var(--cream-muted)',
                      marginTop: 1,
                    }}>
                      {row.cite}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Anchor note — "gaps are named on this slide" */}
              <motion.div
                style={{
                  marginTop: 'auto',
                  paddingTop: 'var(--space-3)',
                }}
                initial={{ opacity: 0 }}
                animate={go ? { opacity: 1 } : { opacity: 1 }}
                transition={{ duration: 0.4, delay: D.anchor, ease: EASE }}
              >
                <div style={{
                  background: 'color-mix(in srgb, var(--amber) 7%, transparent)',
                  borderLeft: '2px solid color-mix(in srgb, var(--amber) 42%, transparent)',
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                }}>
                  <span className="deck-body" style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream)',
                    lineHeight: 1.4,
                  }}>
                    The gaps are{' '}
                    <span style={{ color: 'var(--amber)', fontWeight: 500 }}>
                      named on this slide
                    </span>
                    , not buried in an appendix.
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
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
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 'var(--space-3)',
          }}>
            <span aria-hidden style={{
              display: 'inline-block',
              transform: 'rotate(45deg)',
              width: 12, height: 12,
              background: 'var(--amber)',
              flex: '0 0 auto',
            }} />
            <span className="deck-display" style={{
              fontSize: 'var(--fs-slide-tagline)',
              lineHeight: 1.4,
              textAlign: 'center',
              fontStyle: 'italic',
              color: 'var(--cream)',
            }}>
              The Clin Pharm dossier{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 500 }}>
                carried what evidence it could
              </span>
              {' '}— and named what it could not.
            </span>
          </div>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
