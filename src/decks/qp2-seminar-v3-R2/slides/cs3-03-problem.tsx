// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const STAGES = [
  { step: 'Data assembly',  time: '1–2 wk', type: 'scaffold', pct: 0.85 },
  { step: 'EDA & NCA',      time: '2–4 d',  type: 'mixed',    pct: 0.50 },
  { step: 'Pop PK/PD',      time: '2–4 wk', type: 'science',  pct: 0.20 },
  { step: 'Diagnostics',    time: '3–5 d',  type: 'mixed',    pct: 0.55 },
  { step: 'Simulation',     time: '2–3 d',  type: 'science',  pct: 0.30 },
  { step: 'Report & TFLs',  time: '1–2 wk', type: 'scaffold', pct: 0.90 },
];

const TOOLS = [
  { name: 'NONMEM',  cat: 'Modeling' },
  { name: 'R / Tidyverse', cat: 'Analysis' },
  { name: 'SAS',     cat: 'Tables' },
  { name: 'Phoenix',  cat: 'NCA' },
  { name: 'Word',    cat: 'Reports' },
  { name: 'Excel',   cat: 'Data mgmt' },
  { name: 'Certara', cat: 'Sims' },
  { name: 'Pinnacle 21', cat: 'CDISC QC' },
];

export default function CS3Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · The constraint</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        The science is not the slowest part.{' '}
        <span style={{ color: 'var(--sage)' }}>The handoffs are.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        An illustrative workflow audit says the quiet part out loud:
        mature methods still move through fragmented, manual scaffolding.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto 1fr auto',
            gap: 'var(--space-4)',
            paddingTop: 'var(--space-2)',
          }}
        >
          {/* ── TOP LEFT: 80% Scaffolding card ── */}
          <motion.div
            style={{
              border: '1px solid color-mix(in srgb, var(--cream-faint) 20%, transparent)',
              borderLeft: '4px solid var(--cream-faint)',
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--panel) 85%, transparent) 0%, color-mix(in srgb, var(--cream-faint) 8%, transparent) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
              padding: 'var(--space-4) var(--space-5)',
              display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
              boxShadow: '0 12px 32px color-mix(in srgb, var(--bg) 50%, transparent)',
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.85, ease: EASE }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
              <span className="deck-display" style={{
                fontSize: 'var(--fs-slide-display)', fontWeight: 700,
                color: 'var(--cream-faint)', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>80%</span>
              <span className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)',
                letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700,
              }}>Scaffolding</span>
            </div>
            <div className="deck-body" style={{
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream-muted)', lineHeight: 1.4,
            }}>
              Data wrangling, format conversion, report templating, cross-team
              handoffs, regulatory formatting, QC checklists.
            </div>
          </motion.div>

          {/* ── TOP RIGHT: 20% Science card ── */}
          <motion.div
            style={{
              border: '1px solid color-mix(in srgb, var(--sage) 30%, transparent)',
              borderLeft: '4px solid var(--sage)',
              background: `linear-gradient(135deg,
                color-mix(in srgb, var(--sage) 15%, transparent) 0%,
                color-mix(in srgb, var(--panel) 75%, transparent) 100%)`,
              backdropFilter: 'blur(10px)',
              borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
              padding: 'var(--space-4) var(--space-5)',
              display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
              boxShadow: '0 12px 32px color-mix(in srgb, var(--sage) 8%, transparent)',
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 1.0, ease: EASE }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
              <span className="deck-display" style={{
                fontSize: 'var(--fs-slide-display)', fontWeight: 700,
                color: 'var(--sage)', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>20%</span>
              <span className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-pageno)', color: 'var(--sage)',
                letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700,
              }}>Science</span>
            </div>
            <div className="deck-body" style={{
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream)', lineHeight: 1.4,
            }}>
              Model specification, covariate selection, simulation design,
              exposure-response interpretation, regulatory judgment.
            </div>
          </motion.div>

          {/* ── MIDDLE LEFT: Workflow pipeline with scaffolding bars ── */}
          <motion.div
            style={{ gridColumn: '1 / 2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 1.15, ease: EASE }}
          >
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)', fontWeight: 700,
              marginBottom: 'var(--space-2)',
            }}>
              Illustrative workflow audit · scaffolding ratio by stage
            </div>
            <WorkflowTimeline go={go} reduced={reduced} />
          </motion.div>

          {/* ── MIDDLE RIGHT: Tool silo diagram ── */}
          <motion.div
            style={{ gridColumn: '2 / 3', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 1.3, ease: EASE }}
          >
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)', fontWeight: 700,
              marginBottom: 'var(--space-2)',
            }}>
              Tool fragmentation · zero shared state
            </div>
            <ToolSiloDiagram go={go} reduced={reduced} />
          </motion.div>

          {/* ── BOTTOM: Punchline numbers spanning full width ── */}
          <motion.div
            style={{
              gridColumn: '1 / -1',
              display: 'flex', justifyContent: 'center',
              gap: 'clamp(var(--space-8), 8vw, var(--space-16))',
              padding: 'var(--space-4) 0',
              borderTop: '1px solid color-mix(in srgb, var(--cream-hairline) 50%, transparent)',
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.6, ease: EASE }}
          >
            {[
              { n: '5–10', l: 'software tools', color: 'var(--cream)' },
              { n: '4–8', l: 'weeks per analysis', color: 'var(--cream)' },
              { n: '0', l: 'shared state', color: 'var(--coral)' },
            ].map((p) => (
              <div key={p.l} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 2,
              }}>
                <span className="deck-display" style={{
                  fontSize: 'calc(var(--fs-slide-headline) * 1.5)',
                  fontWeight: 700, color: p.color,
                  fontVariantNumeric: 'tabular-nums', lineHeight: 1,
                  textShadow: `0 4px 16px color-mix(in srgb, ${p.color} 20%, transparent)`,
                }}>{p.n}</span>
                <span className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  color: 'var(--cream-muted)',
                  letterSpacing: 'var(--ls-mono-wide)', fontWeight: 600,
                  marginTop: 'var(--space-2)',
                }}>{p.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Act 2 · Problem naming"
        tagline="The analyst is the integration layer today; PharmAgent moves that layer into the platform."
      />
    </SlideGrid>
  );
}

/* ================================================================
   WorkflowTimeline — horizontal bar chart showing scaffolding %
   per workflow stage. Gray = scaffolding, sage = science.
   ================================================================ */
function WorkflowTimeline({ go, reduced }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {STAGES.map((s, i) => {
        const scaffoldPct = Math.round(s.pct * 100);
        const sciencePct = 100 - scaffoldPct;
        return (
          <motion.div
            key={s.step}
            style={{ display: 'grid', gridTemplateColumns: '120px 1fr 60px', alignItems: 'center', gap: 12 }}
            initial={{ opacity: 0, x: -8 }}
            animate={go ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 1.2 + i * 0.08, ease: EASE }}
          >
            <span className="deck-mono" style={{
              fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream)',
              fontWeight: 600, textAlign: 'right',
            }}>{s.step}</span>

            <div style={{
              height: 20, display: 'flex',
              overflow: 'hidden', borderRadius: '4px',
              background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
              border: '1px solid color-mix(in srgb, var(--cream-hairline) 50%, transparent)',
            }}>
              <motion.div
                style={{
                  height: '100%',
                  background: 'color-mix(in srgb, var(--cream-faint) 40%, transparent)',
                }}
                initial={{ width: 0 }}
                animate={go ? { width: `${scaffoldPct}%` } : {}}
                transition={{ duration: 0.6, delay: 1.3 + i * 0.08, ease: EASE }}
              />
              <motion.div
                style={{
                  height: '100%',
                  background: 'color-mix(in srgb, var(--sage) 60%, transparent)',
                }}
                initial={{ width: 0 }}
                animate={go ? { width: `${sciencePct}%` } : {}}
                transition={{ duration: 0.6, delay: 1.4 + i * 0.08, ease: EASE }}
              />
            </div>

            <span className="deck-mono" style={{
              fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)',
              fontWeight: 500,
            }}>{s.time}</span>
          </motion.div>
        );
      })}

      {/* Legend */}
      <div style={{
        display: 'flex', gap: 'var(--space-4)', justifyContent: 'flex-end',
        marginTop: 4, paddingRight: 58,
      }}>
        <LegendDot color="color-mix(in srgb, var(--cream-faint) 40%, transparent)" label="Scaffolding" />
        <LegendDot color="color-mix(in srgb, var(--sage) 60%, transparent)" label="Science" />
      </div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ width: 8, height: 8, background: color, display: 'inline-block' }} />
      <span className="deck-mono" style={{
        fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', fontWeight: 500,
      }}>{label}</span>
    </div>
  );
}

/* ================================================================
   ToolSiloDiagram — isolated tool "islands" showing zero shared
   state. Each tool is a disconnected node. Dashed lines between
   them show manual handoffs (the pharmacometrician).
   ================================================================ */
function ToolSiloDiagram({ go, reduced }) {
  const cols = 4;
  const rows = 2;

  return (
    <div style={{ position: 'relative' }}>
      {/* Disconnected link lines (dashed = manual handoff) */}
      <svg
        viewBox="0 0 400 160"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
        }}
        aria-hidden
      >
        {/* Horizontal dashed lines between columns */}
        {[0, 1].map((row) =>
          [0, 1, 2].map((col) => {
            const x1 = 50 + col * 100 + 35;
            const x2 = 50 + (col + 1) * 100 - 35;
            const y = 40 + row * 80;
            return (
              <motion.line
                key={`h-${row}-${col}`}
                x1={x1} y1={y} x2={x2} y2={y}
                stroke="var(--cream-hairline)"
                strokeWidth={1}
                strokeDasharray="4 3"
                initial={{ opacity: 0 }}
                animate={go ? { opacity: 0.5 } : {}}
                transition={{ duration: 0.3, delay: 1.6 + (row * 3 + col) * 0.05 }}
              />
            );
          })
        )}
        {/* Vertical dashed lines between rows */}
        {[0, 1, 2, 3].map((col) => {
          const x = 50 + col * 100;
          return (
            <motion.line
              key={`v-${col}`}
              x1={x} y1={55} x2={x} y2={65}
              stroke="var(--cream-hairline)"
              strokeWidth={1}
              strokeDasharray="4 3"
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 0.5 } : {}}
              transition={{ duration: 0.3, delay: 1.7 + col * 0.05 }}
            />
          );
        })}
        {/* ✕ marks where integration fails */}
        {[
          [150, 40], [250, 40], [150, 120], [250, 120],
        ].map(([cx, cy], i) => (
          <motion.text
            key={`x-${i}`}
            x={cx} y={cy + 4}
            textAnchor="middle"
            fill="var(--coral)"
            style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700 }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 0.7 } : {}}
            transition={{ duration: 0.3, delay: 1.8 + i * 0.06 }}
          >✕</motion.text>
        ))}
      </svg>

      {/* Tool nodes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 'var(--space-3)',
        position: 'relative',
        zIndex: 1,
      }}>
        {TOOLS.map((t, i) => (
          <motion.div
            key={t.name}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 2,
              padding: 'var(--space-2) var(--space-1)',
              background: 'color-mix(in srgb, var(--panel) 85%, transparent)',
              border: '1px solid var(--cream-hairline)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={go ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.4 + i * 0.06, ease: EASE }}
          >
            <span className="deck-mono" style={{
              fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream)',
              fontWeight: 700, textAlign: 'center',
            }}>{t.name}</span>
            <span className="deck-mono" style={{
              fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)',
              fontWeight: 500, textAlign: 'center',
            }}>{t.cat}</span>
          </motion.div>
        ))}
      </div>

      {/* Central annotation */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          padding: '4px 10px',
          background: 'var(--bg)',
          border: '1px dashed var(--coral)',
        }}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 2.0, ease: EASE }}
      >
        <span className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--coral)',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>You are the middleware</span>
      </motion.div>
    </div>
  );
}
