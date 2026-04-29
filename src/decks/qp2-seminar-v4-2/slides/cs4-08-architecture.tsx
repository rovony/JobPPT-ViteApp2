// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import ZoomablePanel from '@/components/deck/ZoomablePanel';
import KimEtAlBars from '../components/cs4/KimEtAlBars';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · S8 · Architecture (CENTERPIECE — 2:00 of speaker time).
 *
 * Layout: 60/40 split — left is the architecture diagram, right column
 * holds three Kim et al. justification chips.
 *
 * Architecture diagram (top → bottom):
 *   • L0  · single Supervisor box, solid amber-fill
 *   • L1  · 10 Domain Agent boxes in a 5×2 grid
 *           Data Manager · NCA · Modeler Manager · PBPK · Statistical
 *           Simulator    · QC  · Report          · Reg Intel · General
 *   • L2  · 3 Modeling Specialist boxes connected ONLY to Modeler Manager
 *           PopPK Expert · PKPD Expert · ER Expert
 *
 * Arrows:
 *   • Supervisor → all L1 (thin amber)
 *   • Modeler Manager → 3 L2 (thin amber)
 *   • NO arrows between L1 agents (the absence is the visual claim)
 *
 * IMPORTANT: the NCA Domain Agent box carries layoutId="cs4-nca-agent"
 * so it morphs into the Lane-2 routing pill on S11 (end-to-end).
 *
 * Three justification chips (right column, mono numerals + IntegerTicker
 * on the headline numbers):
 *   01 · 4.4× vs 17.2×  — error containment (Kim et al. 2025, Table 5)
 *   02 · +80.8%         — best-case structured-task gain
 *   03 · ~45% threshold — capability saturation
 *
 * IP firewall: no routing weights, no LLM fallback logic, no per-layer
 * model assignment, no system-prompt content. The slide names structure
 * and evidence; not the implementation.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const L1_AGENTS = [
  { id: 'data',     label: 'Data Manager',   sub: 'profiling' },
  { id: 'nca',      label: 'NCA',            sub: 'AUC · Cmax', isNca: true },
  { id: 'modeler',  label: 'Modeler Manager', sub: 'routes to L2', spotlight: true },
  { id: 'pbpk',     label: 'PBPK',           sub: 'whole-body' },
  { id: 'stat',     label: 'Statistical',    sub: 'XGBoost' },
  { id: 'sim',      label: 'Simulator',      sub: 'Monte Carlo' },
  { id: 'qc',       label: 'QC',             sub: 'diagnostics' },
  { id: 'report',   label: 'Report',         sub: 'FDA docs' },
  { id: 'reg',      label: 'Reg Intel',      sub: 'guidances' },
  { id: 'general',  label: 'General',        sub: 'education' },
];

const L2_SPECIALISTS = [
  { id: 'poppk', label: 'PopPK Expert' },
  { id: 'pkpd',  label: 'PKPD Expert'  },
  { id: 'er',    label: 'E-R Expert'   },
];

export default function CS4Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.1}>Case 04 · Architecture</Eyebrow>

      <Headline delay={0.25} maxChars={88}>
        Three levels, centralized topology —{' '}
        <span style={{ color: 'var(--amber)' }}>chosen against published scaling-law evidence</span>.
      </Headline>

      <Subhead delay={0.55} size="lead" maxChars={108}>
        L0 supervisor classifies and routes. L1 domain agents own their stage.
        L2 modeling specialists are reachable only through the Modeler Manager.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 6fr) minmax(0, 4fr)',
            gap: 'clamp(var(--space-4), 2vw, var(--space-6))',
            paddingTop: 'var(--space-2)',
            minHeight: 0,
          }}
        >
          {/* LEFT — architecture diagram, zoomable for Q&A probes */}
          <ZoomablePanel
            title="Three-level Topology"
            right={<span className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', letterSpacing: '0.12em' }}>L0 · L1 · L2</span>}
            accent="var(--amber)"
            panelStyle={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              minWidth: 0,
              border: '1px solid color-mix(in srgb, var(--amber) 18%, transparent)',
              padding: 'var(--space-3)',
              background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
            }}
          >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'clamp(var(--space-2), 1.4vh, var(--space-4))',
              minHeight: 0,
              overflow: 'hidden',
              height: '100%',
              width: '100%',
            }}
          >
            {/* L0 — Supervisor */}
            <LevelLabel n="L0" caption="Supervisor · classifies + routes" />
            <SupervisorBox go={go} delay={0.7} />

            {/* L1 — Domain Agents 5×2 */}
            <LevelLabel n="L1" caption="Domain agents · 10 specialists" />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                gap: 'clamp(var(--space-2), 1vw, var(--space-3))',
              }}
            >
              {L1_AGENTS.map((a, i) => (
                <DomainAgentBox key={a.id} agent={a} go={go} delay={1.1 + i * 0.07} />
              ))}
            </div>

            {/* L2 — Modeling Specialists */}
            <LevelLabel n="L2" caption="Modeling specialists · reachable via Modeler Manager only" />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 'clamp(var(--space-2), 1.2vw, var(--space-3))',
                paddingLeft: '15%',
                paddingRight: '15%',
              }}
            >
              {L2_SPECIALISTS.map((s, i) => (
                <SpecialistBox key={s.id} spec={s} go={go} delay={2.0 + i * 0.12} />
              ))}
            </div>
          </div>
          </ZoomablePanel>

          {/* RIGHT — three justification chips, each carrying an inline
              KimEtAlBars mini-chart so the numbers READ as visualizations. */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
              minHeight: 0,
            }}
          >
            <JustificationChip
              go={go}
              delay={1.6}
              num="01"
              chart={<KimEtAlBars variant="error" go={go} delay={1.75} />}
              caption="Centralized error containment vs independent (Kim et al. 2025, Table 5)."
            />
            <JustificationChip
              go={go}
              delay={2.2}
              num="02"
              chart={<KimEtAlBars variant="lift" go={go} delay={2.35} />}
              caption="Best-case structured-task gain under centralized coordination."
            />
            <JustificationChip
              go={go}
              delay={2.8}
              num="03"
              chart={<KimEtAlBars variant="threshold" go={go} delay={2.95} />}
              caption="Capability saturation — when single-agent baseline beats multi-agent."
            />
          </div>
        </div>
      </Viz>

      <Footer
        kicker="CASE 04 · AI/ML · PHARMAGENT"
        tagline="Topology choice is structure. Wrong structure = compounding error."
        source="Source · Kim et al. 2025, arXiv:2512.08296 · Table 5 (centralized vs independent error)"
        delay={3.6}
      />

      <TracingBeam progress={cs4Progress(7)} go={!reduce} />
    </SlideGrid>
  );
}

/* ─── Sub-components ─── */

function LevelLabel({ n, caption }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 'var(--space-3)',
      }}
    >
      <span
        className="deck-mono"
        style={{
          fontSize: 'clamp(0.7rem, min(0.9vw, 1.45vh), 0.95rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--amber)',
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {n}
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.6rem, min(0.78vw, 1.25vh), 0.78rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
          fontWeight: 700,
        }}
      >
        {caption}
      </span>
    </div>
  );
}

function SupervisorBox({ go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={go ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        alignSelf: 'center',
        padding:
          'clamp(var(--space-2), 1.6vh, var(--space-4)) clamp(var(--space-4), 2.4vw, var(--space-6))',
        background: 'var(--amber)',
        color: 'var(--bg)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 8px 28px color-mix(in srgb, var(--amber) 25%, transparent)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        minWidth: '20%',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.6rem, min(0.78vw, 1.25vh), 0.78rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 800,
        }}
      >
        L0 · SUPERVISOR
      </span>
      <span
        className="deck-display"
        style={{
          fontSize: 'clamp(0.95rem, min(1.2vw, 1.95vh), 1.35rem)',
          fontWeight: 700,
          color: 'var(--bg)',
          lineHeight: 1.1,
        }}
      >
        Routes work
      </span>
    </motion.div>
  );
}

function DomainAgentBox({ agent, go, delay }) {
  // The NCA box carries layoutId so it morphs into S11's Lane-2 pill.
  // For NCA we let framer-motion own the transition (layoutId morph).
  // For all other boxes we run the staggered reveal at `delay`.
  const layoutProps = agent.isNca ? { layoutId: 'cs4-nca-agent', layout: true } : {};
  const transition = agent.isNca
    ? { duration: 1.4, ease: [0.4, 0, 0.2, 1] }
    : { duration: 0.45, delay, ease: EASE };
  return (
    <motion.div
      {...layoutProps}
      initial={{ opacity: 0, y: 8 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={transition}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding:
          'clamp(var(--space-2), 1vh, var(--space-3)) clamp(var(--space-1), 0.5vw, var(--space-2))',
        background: agent.spotlight
          ? 'color-mix(in srgb, var(--amber) 14%, transparent)'
          : 'color-mix(in srgb, var(--panel) 80%, transparent)',
        border: agent.spotlight
          ? '1px solid color-mix(in srgb, var(--amber) 70%, transparent)'
          : agent.isNca
            ? '1px solid color-mix(in srgb, var(--amber) 60%, transparent)'
            : '1px solid color-mix(in srgb, var(--cream-faint) 30%, transparent)',
        borderRadius: 'var(--radius-sm)',
        textAlign: 'center',
        minHeight: 0,
      }}
    >
      <span
        className="deck-mono"
        style={{
          fontSize: 'clamp(0.65rem, min(0.82vw, 1.3vh), 0.85rem)',
          color: agent.spotlight || agent.isNca ? 'var(--amber)' : 'var(--cream)',
          fontWeight: 700,
          letterSpacing: 'var(--ls-mono)',
          lineHeight: 1.1,
        }}
      >
        {agent.label}
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.5rem, min(0.65vw, 1.05vh), 0.65rem)',
          color: 'var(--cream-faint)',
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 600,
        }}
      >
        {agent.sub}
      </span>
    </motion.div>
  );
}

function SpecialistBox({ spec, go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={{
        padding: 'clamp(var(--space-2), 1.2vh, var(--space-3)) var(--space-3)',
        background: 'color-mix(in srgb, var(--amber) 10%, transparent)',
        border: '1px solid color-mix(in srgb, var(--amber) 50%, transparent)',
        borderTop: '3px solid var(--amber)',
        borderRadius: 'var(--radius-sm)',
        textAlign: 'center',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.6rem, min(0.78vw, 1.25vh), 0.82rem)',
          color: 'var(--amber)',
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 800,
          lineHeight: 1.2,
        }}
      >
        {spec.label}
      </span>
    </motion.div>
  );
}

function JustificationChip({ num, chart, caption, go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        padding: 'clamp(var(--space-3), 1.6vh, var(--space-5)) clamp(var(--space-3), 1.6vw, var(--space-5))',
        background: 'color-mix(in srgb, var(--panel) 78%, transparent)',
        backdropFilter: 'blur(8px)',
        border: '1px solid color-mix(in srgb, var(--amber) 35%, transparent)',
        borderLeft: '3px solid var(--amber)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <span
        className="deck-mono"
        style={{
          fontSize: 'clamp(0.62rem, min(0.78vw, 1.25vh), 0.78rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--amber)',
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {num}
      </span>
      {/* the inline KimEtAlBars chart replaces the text headline */}
      <div style={{ paddingTop: 2, paddingBottom: 2 }}>{chart}</div>
      <span
        className="deck-body"
        style={{
          fontSize: 'clamp(0.7rem, min(0.88vw, 1.45vh), 0.9rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
        }}
      >
        {caption}
      </span>
    </motion.div>
  );
}
