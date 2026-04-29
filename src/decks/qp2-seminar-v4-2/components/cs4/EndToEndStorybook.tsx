// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/**
 * EndToEndStorybook — used by S11 (cs4-11-end-to-end). Vertical swimlane
 * diagram, FIVE lanes top-to-bottom. Audit-trail mono hash badges hang
 * on the right edge of each lane as it lands.
 *
 *   LANE 1 · USER       — single message: "Run NCA on the dataset I uploaded"
 *   LANE 2 · SUPERVISOR — "Intent classification → route to NCA Agent"
 *                         The NCA routing target box receives layoutId
 *                         "cs4-nca-agent" — same element that lived as
 *                         the NCA box on S8. Same element, two contexts.
 *   LANE 3 · NCA AGENT  — 7 named tool calls in sequence (the workhorse).
 *   LANE 4 · QC AGENT   — 15-point diagnostic suite · Verdict: PASS
 *   LANE 5 · REPORT     — Section 12.3 labeling language · DOCX block
 *
 * Cinematic moment 5: lanes reveal top-to-bottom (300ms each); Lane 3
 * tool calls stagger-reveal as a sequence; hash badges populate as each
 * lane lands. Bottom band fades last.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const NCA_TOOLS = [
  'detect_pk_columns',
  'compute_lambda_z',
  'compute_auc_linear_log',
  'compute_cmax_tmax',
  'compute_dose_proportionality',
  'assemble_summary_table',
  'generate_spaghetti_plot',
];

const LANES = [
  {
    key: 'user',
    label: 'User',
    badge: 'a3f2…7b1c',
    body: '"Run NCA on the dataset I uploaded"',
    kind: 'message',
  },
  {
    key: 'supervisor',
    label: 'Supervisor',
    badge: '9d4e…2a08',
    body: 'Intent classification → route to NCA Agent',
    kind: 'route',
  },
  {
    key: 'nca',
    label: 'NCA Agent',
    badge: 'c1ab…f04d',
    body: '7 deterministic tool calls — sequential',
    kind: 'tools',
  },
  {
    key: 'qc',
    label: 'QC Agent',
    badge: '7c33…22f6',
    body: '15-point diagnostic suite · Verdict: PASS',
    kind: 'qc',
  },
  {
    key: 'report',
    label: 'Report',
    badge: 'b842…1d77',
    body: 'Section 12.3 labeling language · DOCX block',
    kind: 'report',
  },
];

export default function EndToEndStorybook({ go = true, delay = 0.7 }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(var(--space-2), 1.4vh, var(--space-4))',
        minHeight: 0,
      }}
    >
      {LANES.map((lane, i) => (
        <Lane key={lane.key} lane={lane} index={i} go={go} delay={delay + i * 0.3} />
      ))}
    </div>
  );
}

function Lane({ lane, index, go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr 110px',
        alignItems: 'center',
        gap: 'clamp(var(--space-3), 1.5vw, var(--space-4))',
        padding:
          'clamp(var(--space-2), 1.2vh, var(--space-3)) clamp(var(--space-3), 1.6vw, var(--space-4))',
        background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
        border: '1px solid color-mix(in srgb, var(--cream-faint) 22%, transparent)',
        borderLeft: `3px solid var(--amber)`,
        borderRadius: 'var(--radius-sm)',
        flex: '1 1 auto',
        minHeight: 0,
      }}
    >
      {/* Lane label */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          className="deck-mono"
          style={{
            fontSize: 'clamp(0.78rem, min(0.95vw, 1.45vh), 0.95rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--amber)',
            fontWeight: 800,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          LANE {index + 1}
        </span>
        <span
          className="deck-display"
          style={{
            fontSize: 'clamp(0.95rem, min(1.2vw, 1.95vh), 1.35rem)',
            color: 'var(--cream)',
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          {lane.label}
        </span>
      </div>

      {/* Body — varies by kind */}
      <div style={{ minWidth: 0 }}>
        {lane.kind === 'tools' ? (
          <ToolList go={go} delay={delay + 0.25} />
        ) : (
          <NcaRoutingMorph kind={lane.kind} body={lane.body} />
        )}
      </div>

      {/* Hash badge */}
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.4, ease: EASE }}
        className="deck-mono"
        style={{
          justifySelf: 'end',
          padding: '4px 8px',
          background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
          border: '1px solid color-mix(in srgb, var(--amber) 50%, transparent)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--amber)',
          fontSize: 'clamp(0.78rem, min(0.92vw, 1.4vh), 0.95rem)',
          letterSpacing: 'var(--ls-mono)',
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          whiteSpace: 'nowrap',
        }}
      >
        {lane.badge}
      </motion.span>
    </motion.div>
  );
}

/* For LANE 2, this body wraps a small "→ NCA Agent" pill that carries
   the layoutId="cs4-nca-agent" so the same box can morph here from S8. */
function NcaRoutingMorph({ kind, body }) {
  if (kind === 'route') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <span
          className="deck-body"
          style={{
            fontSize: 'clamp(0.78rem, min(1vw, 1.6vh), 1.05rem)',
            color: 'var(--cream)',
            lineHeight: 1.3,
          }}
        >
          {body}
        </span>
        <motion.span
          layoutId="cs4-nca-agent"
          layout
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          className="deck-mono uppercase"
          style={{
            padding: '4px 10px',
            background: 'color-mix(in srgb, var(--amber) 14%, transparent)',
            border: '1px solid color-mix(in srgb, var(--amber) 70%, transparent)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--amber)',
            fontSize: 'clamp(0.78rem, min(0.92vw, 1.4vh), 0.95rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            fontWeight: 800,
          }}
        >
          NCA · domain agent
        </motion.span>
      </div>
    );
  }
  return (
    <span
      className="deck-body"
      style={{
        fontSize: 'clamp(0.85rem, min(1.05vw, 1.7vh), 1.15rem)',
        color: 'var(--cream)',
        lineHeight: 1.32,
      }}
    >
      {body}
    </span>
  );
}

function ToolList({ go, delay }) {
  /* Inline live-computation glyphs — hooked to specific tool names so
     the audience sees PK math actually happening, not hand-waving.
     • compute_lambda_z + compute_auc_linear_log → concentration-time
       sparkline animates draw.
     • compute_dose_proportionality → tiny 4-dot AUC vs dose scatter. */
  const sparkDelay = delay + 1 * 0.12 + 0.4; // after compute_lambda_z lands
  const scatterDelay = delay + 4 * 0.12 + 0.4; // after compute_dose_prop

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        alignItems: 'center',
      }}
    >
      {NCA_TOOLS.map((t, i) => {
        const showSpark = t === 'compute_auc_linear_log';
        const showScatter = t === 'compute_dose_proportionality';
        return (
          <React.Fragment key={t}>
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: delay + i * 0.12, ease: EASE }}
              className="deck-mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '3px 7px',
                background: 'color-mix(in srgb, var(--panel) 85%, transparent)',
                border: '1px solid color-mix(in srgb, var(--amber) 35%, transparent)',
                borderRadius: 4,
                color: 'var(--cream)',
                fontSize: 'clamp(0.74rem, min(0.9vw, 1.4vh), 0.92rem)',
                letterSpacing: 'var(--ls-mono)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              {t}()
              {showSpark && <ConcSparkline go={go} delay={sparkDelay} />}
              {showScatter && <DoseScatter go={go} delay={scatterDelay} />}
            </motion.span>
            {i < NCA_TOOLS.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={go ? { opacity: 0.7 } : { opacity: 0.7 }}
                transition={{ duration: 0.3, delay: delay + i * 0.12 + 0.08 }}
                style={{ color: 'var(--amber)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600 }}
              >
                →
              </motion.span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* Tiny concentration-time sparkline (90×30). A typical extravascular PK
   curve: rapid rise to Cmax, log-linear decay. Drawn via motion.path
   with pathLength. */
function ConcSparkline({ go, delay }) {
  const W = 90;
  const H = 30;
  // Pre-baked path through (t,c) sampled points on a typical bolus PK
  // shape: peaks early, decays.
  const d =
    'M 4 24 ' +
    'C 10 22, 14 6, 22 5 ' +
    'S 36 12, 44 16 ' +
    'S 70 24, 86 26';
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      style={{ verticalAlign: 'middle', flexShrink: 0 }}
    >
      <line
        x1={3}
        x2={W - 3}
        y1={H - 3}
        y2={H - 3}
        stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
        strokeWidth={0.6}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--amber, #d4a373)"
        strokeWidth={1.4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      />
      <motion.circle
        cx={22}
        cy={5}
        r={1.6}
        fill="var(--amber, #d4a373)"
        initial={{ scale: 0 }}
        animate={go ? { scale: 1 } : { scale: 1 }}
        transition={{ duration: 0.3, ease: EASE, delay: delay + 0.6 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </svg>
  );
}

/* Tiny AUC-vs-dose scatter — 4 amber dots with a faint regression
   line. Shows dose-proportionality is being computed. */
function DoseScatter({ go, delay }) {
  const W = 70;
  const H = 30;
  const PTS = [
    [10, 22, 50],   // x, y, dose label
    [25, 17, 100],
    [42, 11, 200],
    [60, 5, 400],
  ];
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      style={{ verticalAlign: 'middle', flexShrink: 0 }}
    >
      <line
        x1={4}
        x2={W - 4}
        y1={H - 3}
        y2={H - 3}
        stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
        strokeWidth={0.6}
      />
      <line
        x1={4}
        x2={4}
        y1={3}
        y2={H - 3}
        stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
        strokeWidth={0.6}
      />
      <motion.line
        x1={PTS[0][0]}
        y1={PTS[0][1]}
        x2={PTS[3][0]}
        y2={PTS[3][1]}
        stroke="var(--amber, #d4a373)"
        strokeWidth={0.8}
        strokeOpacity={0.5}
        strokeDasharray="2 3"
        initial={{ pathLength: 0 }}
        animate={go ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: delay + 0.5 }}
      />
      {PTS.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={1.8}
          fill="var(--amber, #d4a373)"
          initial={{ scale: 0, opacity: 0 }}
          animate={go ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: EASE, delay: delay + i * 0.1 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
    </svg>
  );
}
