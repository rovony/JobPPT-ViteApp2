// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS3 · Architecture — PharmAgent platform.
 *
 * Rebuilt 2026-04-26 to make PharmAgent the hero (not the Google paper).
 * Shows the actual 13-agent · 3-level hierarchy + the PharmState bus +
 * the privacy boundary that makes it ICH M15-native.
 *
 * Story: 13 agents, 151 deterministic tools, 76 workflow templates.
 * Schema-only privacy: the LLM never sees patient rows. Hash-chain
 * audit trail: every tool call logged + cryptographically linked.
 *
 * Visual recipe:
 *   - Three-row hierarchy (Level 0 / 1 / 2) — connected by lines
 *   - Right column: PharmState (the communication bus) + privacy boundary
 *   - Bottom: 13 / 151 / 76 / 24 stat strip
 *
 * Source: pharmAgent.md + 2-ResearchFiles ThemeD.
 */

const L1_AGENTS = [
  { name: 'Data Mgr',    tools: 14, c: 'sage'   },
  { name: 'NCA',         tools: 12, c: 'sage'   },
  { name: 'Modeler Mgr', tools: 5,  c: 'amber'  },
  { name: 'PBPK',        tools: 15, c: 'sage'   },
  { name: 'Statistical', tools: 16, c: 'sage'   },
  { name: 'Simulator',   tools: 14, c: 'sage'   },
  { name: 'QC',          tools: 12, c: 'sage'   },
  { name: 'Report',      tools: 10, c: 'sage'   },
  { name: 'Reg Intel',   tools: 9,  c: 'sage'   },
  { name: 'General',     tools: 0,  c: 'sage'   },
];

const L2_SPECIALISTS = [
  { name: 'PopPK',  tools: 18, c: 'amber' },
  { name: 'PKPD',   tools: 14, c: 'amber' },
  { name: 'E-R',    tools: 12, c: 'amber' },
];

export default function CS3Architecture() {
  const reduce = useReducedMotion();
  const go = !reduce;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Architecture · PharmAgent platform</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        13 agents.{' '}
        <span style={{ color: 'var(--sage)', fontStyle: 'italic' }}>One workflow.</span>
        {' '}Audit-grade by construction.
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        Hierarchical multi-agent platform that orchestrates the full
        pharmacometric pipeline — data ingestion to ICH M15-ready report —
        without exposing patient rows to any LLM.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%', height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          minHeight: 0,
        }}>
        <div style={{
          flex: '1 1 0%',
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gap: 'var(--space-5)',
        }}>
          {/* ─── LEFT · 3-LEVEL HIERARCHY ─── */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            gap: 'var(--space-3)',
            padding: 'var(--space-4)',
            border: '1px solid var(--cream-hairline)',
            borderRadius: 'var(--radius-lg)',
            background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
            position: 'relative',
          }}>
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--sage)',
            }}>
              Hierarchy · 3 levels
            </div>

            {/* LEVEL 0 — Supervisor */}
            <LevelRow
              label="Level 0 · Orchestration"
              note="Intent → Routing → Templates"
              go={go}
              delay={0.7}
            >
              <AgentChip name="Supervisor" tools="∞" tone="var(--sage)" emphasis />
            </LevelRow>

            <Connector go={go} delay={0.85} />

            {/* LEVEL 1 — 10 Domain Agents */}
            <LevelRow
              label="Level 1 · Domain agents · 10"
              note="One agent per analytical method"
              go={go}
              delay={0.95}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                gap: 'var(--space-1)',
              }}>
                {L1_AGENTS.map((a, i) => (
                  <AgentChip
                    key={a.name}
                    name={a.name}
                    tools={a.tools || '—'}
                    tone={`var(--${a.c})`}
                    delay={1.05 + i * 0.04}
                    go={go}
                  />
                ))}
              </div>
            </LevelRow>

            <Connector go={go} delay={1.5} />

            {/* LEVEL 2 — 3 Modeling Specialists */}
            <LevelRow
              label="Level 2 · Modeling specialists · 3"
              note="Sub-routed by Modeler Manager"
              go={go}
              delay={1.6}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-2)',
              }}>
                {L2_SPECIALISTS.map((a, i) => (
                  <AgentChip
                    key={a.name}
                    name={a.name}
                    tools={a.tools}
                    tone={`var(--${a.c})`}
                    delay={1.7 + i * 0.06}
                    go={go}
                  />
                ))}
              </div>
            </LevelRow>
          </div>

          {/* ─── RIGHT · DESIGN COMMITMENTS ─── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', minHeight: 0, overflow: 'hidden' }}>
            <PrincipleCard
              go={go}
              delay={1.0}
              kicker="Design 01 · Agents decide, tools execute"
              body="LLMs reason about strategy. scipy / numpy / XGBoost compute. No hallucinated math."
              accent="var(--sage)"
            />
            <PrincipleCard
              go={go}
              delay={1.2}
              kicker="Design 02 · Schema-only privacy"
              body="SchemaExtractor strips raw rows before every LLM call. Patient data stays local."
              accent="var(--cyan)"
              emphasis="0 patient rows reach the LLM"
            />
            <PrincipleCard
              go={go}
              delay={1.4}
              kicker="Design 03 · Hash-chain audit"
              body="SHA-256 over every tool call. Tamper-evident. Auto-generated Methods section."
              accent="var(--amber)"
              emphasis="ICH M15 documentation, by construction"
            />
            <PrincipleCard
              go={go}
              delay={1.6}
              kicker="Design 04 · Human-in-the-loop"
              body="Review gates at base model, covariate model, final model, report. AI augments."
              accent="var(--coral)"
            />
          </div>
        </div>

        {/* ── PLATFORM SPEC STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={go ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.9, ease: EASE }}
          style={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'space-around',
            gap: 'var(--space-4)',
            padding: 'var(--space-3) var(--space-5)',
            background: 'color-mix(in srgb, var(--sage) 8%, transparent)',
            border: '1px solid color-mix(in srgb, var(--sage) 28%, transparent)',
            borderLeft: '3px solid var(--sage)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          {[
            { n: '13', l: 'AI agents' },
            { n: '151', l: 'deterministic tools' },
            { n: '76', l: 'workflow templates' },
            { n: '34', l: 'PharmState fields' },
            { n: '24', l: 'regulatory guidances · RAG' },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div className="deck-display" style={{
                fontSize: 'var(--fs-card-numeral)',
                fontWeight: 700,
                color: 'var(--sage)',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>{s.n}</div>
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-pageno)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream)',
                opacity: 0.78,
                marginTop: 4,
              }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Architecture"
        tagline="The platform was designed M15-native — privacy and audit are not features, they are architecture."
        source="Source · pharmAgent.md (Okour, internal v1.0 Feb 2026) · Shahin et al. 2025 (CTS) · ICH M15"
        delay={2.1}
      />
    </SlideGrid>
  );
}

/* ───────────── SUB-COMPONENTS ───────────── */

function LevelRow({ label, note, children, delay = 0, go = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={go ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
        <span className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--sage)',
          fontWeight: 700,
        }}>{label}</span>
        <span className="deck-body" style={{
          fontSize: 'var(--fs-slide-pageno)',
          color: 'var(--cream)',
          opacity: 0.65,
          fontStyle: 'italic',
        }}>{note}</span>
      </div>
      {children}
    </motion.div>
  );
}

function Connector({ go = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={go ? { scaleY: 1, opacity: 0.5 } : {}}
      transition={{ duration: 0.4, delay, ease: EASE }}
      style={{
        width: 2,
        height: 16,
        background: 'var(--sage)',
        margin: '0 auto',
        transformOrigin: 'top',
      }}
    />
  );
}

function AgentChip({ name, tools, tone = 'var(--sage)', delay = 0, go = true, emphasis = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={go ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.35, delay, ease: EASE }}
      style={{
        padding: emphasis ? 'var(--space-2) var(--space-4)' : 'var(--space-1) var(--space-2)',
        border: `1px solid color-mix(in srgb, ${tone} ${emphasis ? 60 : 35}%, transparent)`,
        background: emphasis
          ? `color-mix(in srgb, ${tone} 16%, var(--panel))`
          : `color-mix(in srgb, ${tone} 5%, var(--panel))`,
        borderRadius: 'var(--radius-sm)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        minWidth: 0,
      }}
    >
      <span className="deck-mono" style={{
        fontSize: emphasis ? 'var(--fs-slide-tagline)' : 'var(--fs-slide-pageno)',
        color: tone,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
      }}>{name}</span>
      {tools !== undefined && (
        <span className="deck-mono" style={{
          fontSize: 'calc(var(--fs-slide-pageno) * 0.85)',
          color: 'var(--cream)',
          opacity: 0.55,
          fontVariantNumeric: 'tabular-nums',
        }}>{tools} tools</span>
      )}
    </motion.div>
  );
}

function PrincipleCard({ kicker, body, emphasis, accent, delay = 0, go = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={go ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        padding: 'var(--space-2) var(--space-3)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: `3px solid ${accent}`,
        background: `color-mix(in srgb, ${accent} 5%, var(--panel))`,
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: accent,
        fontWeight: 700,
      }}>{kicker}</div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-tagline)',
        color: 'var(--cream)',
        lineHeight: 1.45,
        opacity: 0.88,
      }}>{body}</div>
      {emphasis && (
        <div className="deck-display" style={{
          fontSize: 'var(--fs-slide-tagline)',
          color: accent,
          fontStyle: 'italic',
          fontWeight: 700,
          marginTop: 2,
        }}>↳ {emphasis}</div>
      )}
    </motion.div>
  );
}
