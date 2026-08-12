// @ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * CS3 · Honest reckoning — what we shipped, what we did not.
 * Solid panel cards + top accents. Light-editorial paper.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const SHIPPED = [
  {
    title: 'Dossier defense',
    date: 'six pillars + mechanism-first rationale',
    cite: 'ICH E5 convergent evidence · 36-page justification',
  },
  {
    title: 'Extrinsic factors characterized',
    date: 'food · DDIs · concomitant meds',
    cite: 'Managed in labeling · no India-specific dose change',
  },
  {
    title: 'Waiver granted with Phase 4',
    date: 'CDSCO approval · 14 May 2025',
    cite: 'Conditional approval · post-marketing cohort committed',
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
  shipped: 0.10,
  shippedCounter: 0.12,
  shippedRows: [0.14, 0.18, 0.22],
  notShipped: 0.14,
  notCounter: 0.16,
  notRows: [0.18, 0.22, 0.26],
  anchor: 0.30,
};

function AnimCounter({ target, go, delay, color }) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!go || reduced) { setCount(target); return; }
    const stepMs = 160;
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
      fontSize: 'var(--fs-slide-tagline)',
      color,
      letterSpacing: 'var(--ls-mono)',
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
  const go = inView || !!reduced;
  const motionOn = go && !reduced;

  return (
    <SlideFrame
      dataCase="cyan"
      eyebrow="Case 03 · Honest reckoning"
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
      footerKicker="Case 03 · Honest reckoning"
      footerSource="ClinicalTrials.gov · CDSCO public record · Lancet RH SE Asia 2024"
      delays={{ footer: reduced ? 0 : D.anchor + 0.02 }}
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
        <div style={{
          flex: '0 1 auto', minHeight: 0,
          display: 'flex', flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}>
          {/* SHIPPED — solid panel + cyan top accent */}
          <motion.div
            style={{
              flex: '1 1 18rem', minWidth: 0,
              border: '1px solid var(--cream-hairline)',
              borderTop: '3px solid var(--cyan)',
              background: 'var(--panel)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-3) var(--space-4)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionOn ? 0.3 : 0, delay: motionOn ? D.shipped : 0, ease: EASE }}
          >
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-3)',
            }}>
              <span className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono)',
                color: 'var(--cyan)',
                fontWeight: 700,
              }}>
                What we shipped
              </span>
              <span className="deck-mono" style={{
                fontSize: 'var(--fs-slide-tagline)',
                color: 'var(--cyan)',
                letterSpacing: 'var(--ls-mono)',
              }}>
                ✓ <AnimCounter target={3} go={go} delay={D.shippedCounter} color="var(--cyan)" />
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SHIPPED.map((row, i) => (
                <motion.div
                  key={row.title}
                  style={{
                    display: 'flex', gap: 'var(--space-3)',
                    padding: 'var(--space-2) 0',
                    borderTop: i > 0 ? '1px solid var(--cream-hairline)' : 'none',
                    alignItems: 'baseline',
                  }}
                  initial={reduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: motionOn ? 0.25 : 0, delay: motionOn ? D.shippedRows[i] : 0, ease: EASE }}
                >
                  <span className="deck-mono" style={{
                    fontSize: 'var(--fs-slide-body)',
                    color: 'var(--cyan)',
                    fontWeight: 500,
                    flexShrink: 0,
                    width: '1.2em',
                  }}>
                    ✓
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="deck-body" style={{
                      fontSize: 'var(--fs-slide-lead)',
                      color: 'var(--cream)',
                      lineHeight: 1.35,
                    }}>
                      <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>
                        {row.title}
                      </span>
                      {' — '}{row.date}
                    </div>
                    <div className="deck-body" style={{
                      fontSize: 'var(--fs-slide-tagline)',
                      color: 'var(--cream-muted)',
                      marginTop: 4,
                      lineHeight: 1.4,
                    }}>
                      {row.cite}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* DID NOT SHIP — solid panel */}
          <motion.div
            style={{
              flex: '1 1 18rem', minWidth: 0,
              border: '1px solid var(--cream-hairline)',
              borderTop: '3px solid var(--cream-hairline)',
              background: 'var(--panel)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-3) var(--space-4)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionOn ? 0.3 : 0, delay: motionOn ? D.notShipped : 0, ease: EASE }}
          >
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-3)',
            }}>
              <span className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono)',
                color: 'var(--cream-muted)',
                fontWeight: 700,
              }}>
                What we did not ship
              </span>
              <span className="deck-mono" style={{
                fontSize: 'var(--fs-slide-tagline)',
                color: 'var(--cream-muted)',
                letterSpacing: 'var(--ls-mono)',
              }}>
                ⊘ <AnimCounter target={3} go={go} delay={D.notCounter} color="var(--cream-muted)" />
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              {NOT_SHIPPED.map((row, i) => (
                <motion.div
                  key={row.title}
                  style={{
                    display: 'flex', gap: 'var(--space-3)',
                    padding: 'var(--space-2) 0',
                    borderTop: i > 0 ? '1px solid var(--cream-hairline)' : 'none',
                    alignItems: 'baseline',
                  }}
                  title={row.tooltip || undefined}
                  initial={reduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: motionOn ? 0.25 : 0, delay: motionOn ? D.notRows[i] : 0, ease: EASE }}
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
                      fontSize: 'var(--fs-slide-lead)',
                      color: 'var(--cream)',
                      lineHeight: 1.35,
                    }}>
                      {row.amber ? (
                        <span style={{
                          borderBottom: '2px solid color-mix(in srgb, var(--amber) 55%, transparent)',
                          fontWeight: 600,
                        }}>
                          {row.title}
                        </span>
                      ) : (
                        row.title
                      )}
                      {row.detail ? ` ${row.detail}` : ''}
                    </div>
                    <div className="deck-body" style={{
                      fontSize: 'var(--fs-slide-tagline)',
                      color: 'var(--cream-muted)',
                      marginTop: 4,
                      lineHeight: 1.4,
                    }}>
                      {row.cite}
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.aside
                style={{
                  marginTop: 'auto',
                  paddingTop: 'var(--space-3)',
                }}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: motionOn ? 0.25 : 0, delay: motionOn ? D.anchor : 0, ease: EASE }}
              >
                <div style={{
                  width: '100%',
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--cream-hairline)',
                  borderLeft: '4px solid var(--amber)',
                  background: 'var(--panel)',
                }}>
                  <span className="deck-body" style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream)',
                    lineHeight: 1.4,
                    fontWeight: 500,
                  }}>
                    The gaps are{' '}
                    <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
                      named on this slide
                    </span>
                    , not buried in an appendix.
                  </span>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideFrame>
  );
}
