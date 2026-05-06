import React from 'react';
import { motion as M, AnimatePresence as AP } from 'framer-motion';
import * as Icon from 'lucide-react';
import { AGENTS_L1, AGENTS_L2 } from './pharmagent-data';

/* PharmAgent · architecture canvas (Tier 0–5 with permanent topology + active flows) */

const { motion, AnimatePresence } = (window.Motion || window.framerMotion || {}) as any;

type NodePos = { x: number; y: number; w: number };

/* Node positions in % of canvas. Canvas is sized fluidly via flex. */
const POS: Record<string, NodePos> = {
  analyst:  { x: 50,   y: 7,  w: 22 }, /* tier 0 */
  privacy:  { x: 50,   y: 22, w: 92 }, /* tier 1 panel */
  l0:       { x: 50,   y: 38, w: 22 }, /* tier 2 */
  /* L1 row, 7 nodes */
  data:     { x: 8,    y: 56, w: 12 },
  nca:      { x: 22,   y: 56, w: 12 },
  mod:      { x: 36,   y: 56, w: 12 },
  pbpk:     { x: 50,   y: 56, w: 12 },
  stats:    { x: 64,   y: 56, w: 12 },
  qc:       { x: 78,   y: 56, w: 12 },
  rep:      { x: 92,   y: 56, w: 12 },
  /* L2 row, 3 nodes - reachable only via mod */
  poppk:    { x: 28,   y: 76, w: 12 },
  pkpd:     { x: 42,   y: 76, w: 12 },
  er:       { x: 56,   y: 76, w: 12 },
  /* PharmState bus across bottom */
  pharmstate: { x: 50, y: 96, w: 96 },
};

/* Edge list. Drawn as dim hairlines always, bright when active. */
const EDGES: Array<[string, string]> = [
  ['analyst', 'privacy'],
  ['privacy', 'l0'],
  /* L0 → each L1 */
  ['l0','data'], ['l0','nca'], ['l0','mod'], ['l0','pbpk'], ['l0','stats'], ['l0','qc'], ['l0','rep'],
  /* Modeler Mgr → each L2 (only path) */
  ['mod','poppk'], ['mod','pkpd'], ['mod','er'],
  /* Each L1/L2 ↔ PharmState (vertical to bus) */
  ['data','pharmstate'], ['nca','pharmstate'], ['mod','pharmstate'], ['pbpk','pharmstate'], ['stats','pharmstate'], ['qc','pharmstate'], ['rep','pharmstate'],
  ['poppk','pharmstate'], ['pkpd','pharmstate'], ['er','pharmstate'],
  /* L0 ↔ Analyst (review gate / final delivery) */
  ['l0','analyst'],
];

function isEdgeActive(activeIds: string[], a: string, b: string) {
  /* an edge is active when both endpoints are in active set, OR
     one endpoint is 'pharmstate' and the other is in active set */
  if (a === 'pharmstate' || b === 'pharmstate') {
    const other = a === 'pharmstate' ? b : a;
    return activeIds.includes(other);
  }
  return activeIds.includes(a) && activeIds.includes(b);
}

/* Cubic-style path between two nodes (top center → top center, in pixel space) */
function buildPath(p1: NodePos, p2: NodePos, W: number, H: number) {
  const x1 = (p1.x / 100) * W;
  const y1 = (p1.y / 100) * H;
  const x2 = (p2.x / 100) * W;
  const y2 = (p2.y / 100) * H;
  const dy = Math.abs(y2 - y1);
  const c1y = y1 + dy * 0.55;
  const c2y = y2 - dy * 0.55;
  return `M ${x1} ${y1} C ${x1} ${c1y}, ${x2} ${c2y}, ${x2} ${y2}`;
}

type ArchCanvasProps = {
  activeStep: any;
  useCase?: string;
  onAgentHover?: (agent: any | null) => void;
};

/* The canvas with all tier rendering. Uses absolute% positioning. */
const ArchCanvas: React.FC<ArchCanvasProps> = ({ activeStep, onAgentHover }) => {
  const { AGENTS_L1, AGENTS_L2 } = (window.PA_DATA || {}) as { AGENTS_L1: any[]; AGENTS_L2: any[] };
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState({ W: 800, H: 700 });

  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setSize({ W: r.width, H: r.height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const active = activeStep?.active || [];
  const moodIcon = activeStep?.mood || 'User';

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      {/* SVG arrow layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <marker id="arrow-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#57534e" fillOpacity="0.32" />
          </marker>
          <marker id="arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#34d399" />
          </marker>
        </defs>
        {EDGES.map(([a,b], i) => {
          const p1 = POS[a], p2 = POS[b];
          if (!p1 || !p2) return null;
          const d = buildPath(p1, p2, size.W, size.H);
          const isActive = isEdgeActive(active, a, b);
          return (
            <g key={i}>
              {/* dim baseline */}
              <path d={d} stroke="#57534e" strokeOpacity="0.28" strokeWidth="1" fill="none" markerEnd="url(#arrow-dim)" />
              {/* active overlay */}
              {isActive && (
                <motion.path
                  d={d}
                  stroke="#34d399"
                  strokeWidth="1.6"
                  fill="none"
                  markerEnd="url(#arrow-emerald)"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.22,1,0.36,1] }}
                  style={{ filter: 'drop-shadow(0 0 4px rgba(52,211,153,0.55))' }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Tier 0 — Analyst */}
      <NodeBox pos={POS.analyst} active={active.includes('analyst')} accent="rose">
        <AnalystCard mood={moodIcon} active={active.includes('analyst')} />
      </NodeBox>

      {/* Tier 1 — Privacy boundary panel */}
      <PrivacyBoundary pos={POS.privacy} active={active.includes('privacy')} />

      {/* Tier 2 — L0 supervisor */}
      <NodeBox pos={POS.l0} active={active.includes('l0')} accent="emerald">
        <L0Card active={active.includes('l0')} />
      </NodeBox>

      {/* Tier 3 — L1 agents */}
      {AGENTS_L1?.map((a: any) => (
        <NodeBox key={a.id} pos={POS[a.id]} active={active.includes(a.id)} accent="emerald">
          <AgentCard agent={a} tier="L1" active={active.includes(a.id)} onHover={onAgentHover} />
        </NodeBox>
      ))}

      {/* Tier 4 — L2 specialists */}
      {AGENTS_L2?.map((a: any) => (
        <NodeBox key={a.id} pos={POS[a.id]} active={active.includes(a.id)} accent="emerald" tier2>
          <AgentCard agent={a} tier="L2" active={active.includes(a.id)} onHover={onAgentHover} />
        </NodeBox>
      ))}

      {/* labels for tier rows */}
      <div className="absolute left-2 font-mono text-[9px] tracking-widest text-stone-600 uppercase" style={{ top: '5%' }}>tier 0 · human</div>
      <div className="absolute left-2 font-mono text-[9px] tracking-widest text-stone-600 uppercase" style={{ top: '20%' }}>tier 1 · privacy</div>
      <div className="absolute left-2 font-mono text-[9px] tracking-widest text-stone-600 uppercase" style={{ top: '36%' }}>tier 2 · L0</div>
      <div className="absolute left-2 font-mono text-[9px] tracking-widest text-stone-600 uppercase" style={{ top: '54%' }}>tier 3 · L1</div>
      <div className="absolute left-2 font-mono text-[9px] tracking-widest text-stone-600 uppercase" style={{ top: '74%' }}>tier 4 · L2</div>
      <div className="absolute left-2 right-2 font-mono text-[9px] tracking-widest text-emerald-600 uppercase flex items-center gap-2" style={{ top: '93%' }}>
        <span>tier 5 · pharmstate ↓</span>
        <span className="flex-1 h-px bg-emerald-700/30"></span>
        <span className="text-stone-600">all agents read · write</span>
      </div>
    </div>
  );
};

type NodeBoxProps = {
  pos: NodePos;
  active: boolean;
  accent: 'rose' | 'emerald';
  tier2?: boolean;
  children?: React.ReactNode;
};

/* Position wrapper. */
const NodeBox: React.FC<NodeBoxProps> = ({ pos, active, accent, children }) => {
  const ringClass = active
    ? (accent === 'rose' ? 'ring-1 ring-rose-400/70 rose-glow' : 'ring-1 ring-emerald-400/70 emerald-glow')
    : 'ring-1 ring-stone-800';
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        width: `${pos.w}%`,
        zIndex: 5,
      }}
    >
      <div className={`relative rounded-md bg-stone-900/90 ${ringClass} transition-all duration-500`}>
        {children}
      </div>
    </div>
  );
};

const AnalystCard: React.FC<{ mood: string; active: boolean }> = ({ mood, active }) => {
  const I = (Icon as any)[mood] || Icon.User;
  return (
    <div className="px-3 py-2 flex items-center gap-2.5">
      <div className={`w-8 h-8 rounded-full bg-rose-950/60 border border-rose-400/40 flex items-center justify-center ${active ? 'pulse-ring' : ''}`}>
        <I size={16} color="#fb7185" />
      </div>
      <div className="leading-tight">
        <div className="text-[11px] font-medium text-rose-200">Analyst</div>
        <div className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">human · authority</div>
      </div>
    </div>
  );
};

const L0Card: React.FC<{ active: boolean }> = ({ active }) => {
  const I = active ? Icon.PhoneCall : Icon.BrainCircuit;
  return (
    <div className="px-3 py-2 flex items-center gap-2.5" title="Keyword scoring → LLM fallback. Routes to L1 or executes template.">
      <motion.div
        className="w-8 h-8 rounded-full bg-emerald-950/60 border border-emerald-400/40 flex items-center justify-center"
        animate={active ? { rotate: [0, -8, 8, -6, 0] } : { rotate: 0 }}
        transition={{ duration: 1.2, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
      >
        <I size={16} color="#34d399" />
      </motion.div>
      <div className="leading-tight">
        <div className="text-[11px] font-medium text-emerald-200">L0 Supervisor</div>
        <div className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">classifies · routes</div>
      </div>
    </div>
  );
};

type AgentCardProps = {
  agent: any;
  tier: 'L1' | 'L2';
  active: boolean;
  onHover?: (agent: any | null) => void;
};

const AgentCard: React.FC<AgentCardProps> = ({ agent, tier, onHover }) => {
  const I = (Icon as any)[agent.icon] || Icon.Box;
  const tierBadge = tier === 'L2' ? 'L2' : 'L1';
  return (
    <div
      className="px-2 py-1.5 cursor-default"
      onMouseEnter={() => onHover && onHover(agent)}
      onMouseLeave={() => onHover && onHover(null)}
      title={`${agent.name} (${agent.tools} tools) — ${agent.role}\nSample: ${agent.sample.join(', ')}`}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center shrink-0">
          <I size={12} color="#34d399" />
        </div>
        <div className="leading-tight min-w-0 flex-1">
          <div className="text-[10px] font-medium text-stone-100 truncate">{agent.name}</div>
          <div className="text-[8px] font-mono text-stone-500 uppercase tracking-wider">{agent.tools} tools · {tierBadge}</div>
        </div>
      </div>
    </div>
  );
};

/* Privacy boundary panel - the differentiator */
const PrivacyBoundary: React.FC<{ pos: NodePos; active: boolean }> = ({ pos, active }) => {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: `${pos.w}%`, zIndex: 4 }}
      title="Patient-level data stays local. Only metadata reaches the LLM. This is structural privacy — not a policy."
    >
      <div className={`rounded-md bg-stone-900/80 border ${active ? 'border-emerald-400/70 emerald-glow' : 'border-stone-800'} transition-all duration-500 px-3 py-2`}>
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400">SchemaExtractor · privacy firewall</div>
          <div className="flex items-center gap-1.5">
            <Icon.Lock size={11} color="#22d3ee" />
            <span className="text-[9px] font-mono text-cyan-300">0 patient rows cross this boundary</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 relative">
          {/* LEFT: raw dataset */}
          <div className="border border-stone-700 rounded p-1.5 opacity-30">
            <div className="text-[8px] font-mono uppercase text-stone-400 mb-1">RAW DATASET (local only)</div>
            <table className="text-[8px] font-mono w-full tabular text-stone-400">
              <thead><tr className="text-stone-500"><th className="text-left font-normal">SUBJID</th><th className="text-left font-normal">TIME</th><th className="text-left font-normal">DV</th><th className="text-left font-normal">AMT</th><th className="text-left font-normal">WT</th><th className="text-left font-normal">AGE</th></tr></thead>
              <tbody>
                <tr><td>1001</td><td>0.5</td><td>184.3</td><td>200</td><td>78.4</td><td>54</td></tr>
                <tr><td>1001</td><td>1.0</td><td>312.7</td><td>—</td><td>78.4</td><td>54</td></tr>
                <tr><td>1002</td><td>0.5</td><td>167.2</td><td>200</td><td>62.1</td><td>41</td></tr>
                <tr><td>1002</td><td>2.0</td><td>208.9</td><td>—</td><td>62.1</td><td>41</td></tr>
                <tr><td>1003</td><td>0.5</td><td>199.4</td><td>400</td><td>89.7</td><td>67</td></tr>
              </tbody>
            </table>
          </div>
          {/* dashed divider */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex items-center justify-center pointer-events-none">
            <div className={`w-px h-full ${active ? 'bg-emerald-400' : 'bg-emerald-500/40'} transition-colors`} style={{ borderLeft: `1px dashed ${active ? '#34d399' : '#10b98166'}` }}></div>
            {active && (
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
                style={{ filter: 'drop-shadow(0 0 4px #34d399)' }}
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 80, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>
          {/* RIGHT: metadata to LLM */}
          <div className="border border-emerald-500/60 rounded p-1.5 bg-emerald-950/10">
            <div className="text-[8px] font-mono uppercase text-emerald-300 mb-1">METADATA TO LLM</div>
            <div className="text-[9px] font-mono leading-snug text-stone-200 space-y-0.5 tabular">
              <div>247 subjects · 4,812 obs · BLQ 8.3%</div>
              <div>doses [100 / 200 / 400] mg</div>
              <div>WT mean 72.4 (SD 15.2) kg</div>
              <div>CRCL median 89 [72–104] mL/min</div>
              <div className="text-emerald-300/80">no patient identifiers · aggregated only</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchCanvas;