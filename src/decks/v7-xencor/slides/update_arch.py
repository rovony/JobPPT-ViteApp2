import re
with open('cs3-04-architecture.tsx', 'r') as f:
    content = f.read()

# We will replace the RoutedWorkflow and the links generation.

new_code = """
// The Decision Tiles based on the CS4 Script
const DECISIONS = [
  {
    kicker: 'Why Centralized',
    title: 'Multi-agent error limits',
    body: 'Independent systems amplify errors 17.2×. Centralized contains it to 4.4× (Kim et al. 2025).',
    tone: 'var(--sage)',
  },
  {
    kicker: 'Why PharmState',
    title: 'No agent-to-agent DMs',
    body: 'Agents never talk directly. All I/O passes through a strongly-typed, schema-validated shared bus.',
    tone: 'var(--amber)',
  },
  {
    kicker: 'Why Heterogeneous',
    title: 'Sonnet routes, Opus reasons',
    body: 'Matches Anthropic\'s empirically optimal vendor profile: small orchestrator + highly capable specialist workers.',
    tone: 'var(--cyan)',
  },
];
"""
content = re.sub(r'// The Decision Tiles based on the CS4 Script.*?];', new_code.strip(), content, flags=re.DOTALL)

# replace RoutedWorkflow

new_routed = """
function RoutedWorkflow({ go = true }) {
  return (
    <div style={{ position: 'absolute', inset: 'var(--space-2)' }}>
      {/* ── PharmState Shared Bus (Massive Right Column) ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
        transition={{ duration: 1.0, delay: 1.0, ease: EASE }}
        style={{
          position: 'absolute',
          top: '4%',
          bottom: '4%',
          right: '2%',
          width: '24%',
          background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
          border: '1px solid color-mix(in srgb, var(--amber) 40%, transparent)',
          borderLeft: '4px solid var(--amber)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 5,
          backdropFilter: 'blur(12px)',
          boxShadow: '-10px 0 30px color-mix(in srgb, var(--amber) 10%, transparent)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 'var(--space-6)' }}>
          <div className="deck-mono uppercase" style={{
            color: 'var(--amber)',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.15em',
          }}>PHARMSTATE</div>
          <div className="deck-body" style={{ fontSize: '10px', color: 'var(--cream)', opacity: 0.9, lineHeight: 1.4 }}>
            Typed Shared Bus &middot; Schema Validated<br/>
            <span style={{ color: 'var(--coral)', fontWeight: 600 }}>Zero Direct Agent Messaging</span>
          </div>
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'var(--space-3)',
        }}>
          {[
            { label: 'GLOBAL HASH', val: '0x7a9f...e3c8', color: 'var(--sage)' },
            { label: 'MODEL DEFS', val: '2cmt_cl_v', color: 'var(--amber)' },
            { label: 'QC METRICS', val: 'PASSED', color: 'var(--cyan)' },
            { label: 'COVARIATES', val: 'WT, AGE, EGFR', color: 'var(--coral)' },
          ].map((slot, i) => (
            <motion.div
              key={slot.label}
              initial={{ opacity: 0, x: 10 }}
              animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + i * 0.1, ease: EASE }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                padding: '8px 10px',
                background: `color-mix(in srgb, ${slot.color} 10%, transparent)`,
                border: `1px solid color-mix(in srgb, ${slot.color} 30%, transparent)`,
                borderLeft: `2px solid ${slot.color}`,
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '200%' }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: 0, bottom: 0, width: '40%',
                  background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${slot.color} 25%, transparent), transparent)`,
                  zIndex: 0,
                }}
              />
              <div className="deck-mono" style={{ fontSize: '9px', color: 'var(--cream-muted)', zIndex: 1 }}>{slot.label}</div>
              <div className="deck-mono" style={{ fontSize: '12px', color: slot.color, fontWeight: 700, zIndex: 1 }}>{slot.val}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 0 }}>
        {/* All agents connect ONLY to PharmState (at x=76) */}
        {NODES.map((node, i) => {
          const isL0 = node.level === 0;
          const isL2 = node.level === 2;
          const busX = 76;
          const d = `M ${node.cx + node.w/2} ${node.cy} L ${busX} ${node.cy}`;
          
          return (
            <g key={`bus-${node.id}`}>
              {/* Solid track */}
              <motion.path
                d={d}
                fill="none"
                stroke={node.tone}
                strokeWidth={isL0 || isL2 ? 1.5 : 1}
                opacity={0.3}
                initial={{ pathLength: 0 }}
                animate={go ? { pathLength: 1 } : { pathLength: 1 }}
                transition={{ duration: 1.0, delay: 1.2 + i * 0.05, ease: EASE }}
              />
              {/* Flowing data pulses (bi-directional implied by sweeping dash) */}
              <motion.path
                d={d}
                fill="none"
                stroke={node.tone}
                strokeWidth={2}
                strokeDasharray="4 20"
                opacity={0.8}
                initial={{ strokeDashoffset: 24, opacity: 0 }}
                animate={go ? { strokeDashoffset: 0, opacity: 0.8 } : { opacity: 0 }}
                transition={{
                  strokeDashoffset: { duration: 1.5 + Math.random(), repeat: Infinity, ease: "linear" },
                  opacity: { duration: 0.5, delay: 1.5 + i * 0.05 }
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Level Labels */}
      <div className="deck-mono" style={{ position: 'absolute', top: '15%', left: '2%', color: 'var(--cream-faint)', fontSize: '10px', transform: 'translateY(-50%)' }}>L0<br/>ORCH.</div>
      <div className="deck-mono" style={{ position: 'absolute', top: '48%', left: '2%', color: 'var(--cream-faint)', fontSize: '10px', transform: 'translateY(-50%)' }}>L1<br/>DOMAIN</div>
      <div className="deck-mono" style={{ position: 'absolute', top: '86%', left: '2%', color: 'var(--cream-faint)', fontSize: '10px', transform: 'translateY(-50%)' }}>L2<br/>EXPERT</div>

      {NODES.map((node, i) => (
        <FlowNode key={node.id} node={node} go={go} delay={0.6 + i * 0.05} />
      ))}
    </div>
  );
}
"""

# replace RoutedWorkflow
content = re.sub(r'function RoutedWorkflow.*?}\n\nfunction FlowNode', new_routed + '\n\nfunction FlowNode', content, flags=re.DOTALL)

with open('cs3-04-architecture.tsx', 'w') as f:
    f.write(content)
