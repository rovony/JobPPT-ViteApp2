import React from 'react';
import { motion as M, AnimatePresence as AP } from 'framer-motion';
import * as Icon from 'lucide-react';
import { USE_CASES, BUCKETS, FIELD_VALUES } from './pharmagent-data';
import ArchCanvas from './pharmagent-canvas';
import { ARTIFACTS } from './pharmagent-artifacts';

/* PharmAgent · main app · composes header, left rail, canvas, right rail, bottom strip.
   PharmState persists across use case switches. */


const STEP_MS = 4500;
const SWITCH_HOLD_MAX_MS = 800;

function useReducedMotion() {
  const [r, setR] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setR(mq.matches);
    const fn = (e) => setR(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return r;
}

/* ─── HEADER ─── */
const Header = ({ activeUC, onSwitch, onReset }) => {
  const cases = Object.entries(USE_CASES);
  return (
    <div className="px-6 pt-4 pb-3 border-b border-stone-800 flex items-start gap-6 bg-stone-950">
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-stone-500 mb-1">CS · PHARMAGENT WORKFLOW — INTERACTIVE STORYBOARD</div>
        <div className="font-serif text-[22px] leading-tight text-stone-100 max-w-[820px]">
          The architecture decides. The tools execute. <span className="text-emerald-300">The audit chain remembers.</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0 pt-1">
        {cases.map(([id, uc]) => {
          const I = Icon[uc.icon] || Icon.Box;
          const active = id === activeUC;
          return (
            <button key={id} onClick={() => onSwitch(id)}
              className={`group relative px-2.5 py-1.5 rounded-md transition-all ${active ? 'bg-stone-900 emerald-glow' : 'bg-stone-900/40 hover:bg-stone-900/80'}`}>
              <div className="flex items-center gap-1.5">
                <I size={13} color={active ? '#34d399' : '#a8a29e'} />
                <div className="leading-tight text-left">
                  <div className={`text-[10px] font-medium ${active ? 'text-emerald-200' : 'text-stone-200'}`}>{uc.label}</div>
                  <div className="text-[8px] font-mono text-stone-500 uppercase tracking-wider">{uc.sub}</div>
                </div>
              </div>
              {active && <div className="absolute left-2 right-2 -bottom-px h-px bg-emerald-400" style={{ boxShadow: '0 0 6px #34d399' }} />}
            </button>
          );
        })}
        <button onClick={onReset} className="ml-2 text-[9px] font-mono text-stone-500 hover:text-rose-300 px-1.5 py-1 flex items-center gap-1 transition-colors" title="Clear PharmState">
          <Icon.RefreshCw size={10} /> Reset PharmState
        </button>
      </div>
    </div>
  );
};

/* ─── LEFT RAIL · STORYBOARD TIMELINE ─── */
const Timeline = ({ uc, currentIdx }) => {
  return (
    <div className="w-[240px] shrink-0 border-r border-stone-800 bg-stone-950/60 px-3 py-3 overflow-y-auto">
      <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-2">storyboard · {uc.label}</div>
      <div className="space-y-2">
        {uc.steps.map((s, i) => {
          const isPast = i < currentIdx;
          const isActive = i === currentIdx;
          const dotColor = isActive ? 'bg-emerald-400' : isPast ? 'bg-emerald-700' : 'bg-stone-700';
          const labelColor = isActive ? 'text-stone-100' : isPast ? 'text-emerald-300/40' : 'text-stone-500';
          const tColor = isActive ? 'text-emerald-300' : 'text-stone-500';
          return (
            <div key={i} className={`flex gap-2 ${isActive ? '' : ''} pl-1`}>
              <div className="pt-1.5 shrink-0">
                <div className={`w-1.5 h-1.5 rounded-full ${dotColor} ${isActive ? 'pulse-ring' : ''}`} />
              </div>
              <div className="min-w-0">
                <div className={`text-[9px] font-mono ${tColor} tabular`}>{s.t}</div>
                <div className={`text-[10px] leading-tight ${labelColor}`}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── RIGHT RAIL · CHAT STREAM + RICH BUBBLES ─── */
const ChatStream = ({ messages, pharmState }) => {
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length]);

  return (
    <div className="w-[340px] shrink-0 border-l border-stone-800 bg-stone-950/60 flex flex-col">
      <div className="px-3 py-2 border-b border-stone-800 text-[10px] font-mono uppercase tracking-widest text-stone-500">chat stream · last 4</div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
        {messages.slice(-4).map((m, idx, arr) => {
          const isLast = idx === arr.length - 1;
          const opacity = isLast ? 1 : idx === arr.length-2 ? 0.7 : idx === arr.length-3 ? 0.55 : 0.4;
          const isAnalyst = m.who === 'Analyst';
          const tint = isAnalyst ? 'bg-rose-950/30 border-rose-500/30' : 'bg-emerald-950/20 border-emerald-700/30';
          const ring = isLast ? (isAnalyst ? 'ring-1 ring-rose-400/30' : 'ring-1 ring-emerald-400/30') : '';
          const Artifact = m.artifact ? ARTIFACTS[m.artifact] : null;
          const I = isAnalyst ? Icon.User : (Icon[m.icon] || Icon.BrainCircuit);
          return (
            <div key={m.id} style={{ opacity }} className={`rounded-md border ${tint} ${ring} px-2.5 py-2 transition-all`}>
              <div className="flex items-center gap-1.5 mb-1">
                <div className={`w-4 h-4 rounded-sm flex items-center justify-center ${isAnalyst ? 'bg-rose-950 border border-rose-500/40' : 'bg-emerald-950 border border-emerald-500/40'}`}>
                  <I size={9} color={isAnalyst ? '#fb7185' : '#34d399'} />
                </div>
                <span className={`text-[9px] font-mono uppercase tracking-widest ${isAnalyst ? 'text-rose-300' : 'text-emerald-300'}`}>{m.who}</span>
                <span className="text-[8px] font-mono text-stone-600 ml-auto tabular">{m.t}</span>
              </div>
              <div className="text-[10.5px] leading-snug text-stone-200">{m.text}</div>
              {Artifact && (
                <div className="mt-2">
                  <Artifact chainHead={pharmState.audit.chain_head} nEntries={pharmState.audit.n_entries} />
                </div>
              )}
            </div>
          );
        })}
        {/* Persistent typing indicator */}
        <div className="flex items-center gap-1 pl-1 pt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 typing-dot" style={{ animationDelay: '0s' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 typing-dot" style={{ animationDelay: '0.18s' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 typing-dot" style={{ animationDelay: '0.36s' }}></div>
          <span className="text-[8px] font-mono text-stone-600 ml-1.5">agent thinking</span>
        </div>
      </div>
    </div>
  );
};

/* ─── BOTTOM · TOOL CALL LOG + AUDIT CHAIN ─── */
const ToolCallLog = ({ entries }) => (
  <div className="flex-1 border-r border-stone-800 px-3 py-2 bg-stone-950/60 overflow-hidden flex flex-col">
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">Tool calls · live</span>
      <span className="text-[9px] font-mono text-stone-600 tabular">{entries.length} total</span>
    </div>
    <div className="flex-1 overflow-y-auto space-y-1">
      {entries.slice(-5).map((e, i, arr) => {
        const isLast = i === arr.length - 1;
        return (
          <div key={e.id} className={`font-mono text-[10px] tabular ${isLast ? 'text-stone-100' : 'text-stone-500'} transition-colors`}>
            <span className="text-stone-600">[{e.at}] </span>
            <span>{e.text}</span>
          </div>
        );
      })}
      {entries.length === 0 && <div className="text-[10px] font-mono text-stone-700 italic">awaiting first invocation…</div>}
    </div>
  </div>
);

const AuditChain = ({ entries, onVerify, verifying }) => {
  const visible = entries.slice(-6);
  const prior = Math.max(0, entries.length - visible.length);
  return (
    <div className="flex-1 px-3 py-2 bg-stone-950/60 flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">Audit chain · SHA-256 · tamper-evident</span>
        <button onClick={onVerify} className="text-[9px] font-mono px-2 py-0.5 rounded border border-emerald-700/50 text-emerald-300 hover:bg-emerald-950/40 transition-colors">Verify chain</button>
      </div>
      <div className="flex items-center gap-1 overflow-hidden flex-1">
        {prior > 0 && <div className="text-[9px] font-mono text-stone-600 shrink-0 pr-1">+{prior} prior →</div>}
        <AP>
        {visible.map((e, i) => (
          <M.div
            key={e.id}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.5 }}
            className="flex items-center shrink-0"
            title={`tool: ${e.tool}\nhash: ${e.hash}\ninput: 0x${(e.id*7919).toString(16).slice(0,8)}\noutput: 0x${(e.id*1543).toString(16).slice(0,8)}`}
          >
            <div className={`relative flex flex-col items-center justify-center px-1.5 py-1 rounded border bg-stone-900/80 ${verifying ? 'border-emerald-400/80' : 'border-stone-700'}`} style={{ minWidth: 76 }}>
              <div className="text-[8px] font-mono text-stone-300 truncate max-w-[68px]">{e.tool}</div>
              <div className="text-[8px] font-mono text-emerald-300 tabular">{e.hash}</div>
              {verifying && (
                <M.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.12, duration: 0.25 }} className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Icon.CheckCircle size={9} color="#0c0a09" strokeWidth={3} />
                </M.div>
              )}
            </div>
            {i < visible.length - 1 && (
              <Icon.Link size={9} color="#57534e" className="mx-0.5" />
            )}
          </M.div>
        ))}
        </AP>
        {entries.length === 0 && <div className="text-[10px] font-mono text-stone-700 italic">no entries yet</div>}
      </div>
    </div>
  );
};

/* ─── PHARMSTATE BUS ─── */
const PharmStateBus = ({ pharmState, expanded, onExpand }) => {
  
  return (
    <div className="border-t border-emerald-900/40 bg-emerald-950/20 px-3 py-2">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">PharmState · typed shared bus · 34 fields total</span>
        <span className="text-[9px] font-mono text-stone-500">click bucket to inspect · persists across runs</span>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {BUCKETS.map(b => {
          const bucketState = pharmState[b.id] || {};
          const filled = b.fields.filter(f => bucketState[f]).length;
          const pct = filled / b.fields.length;
          const isExpanded = expanded === b.id;
          const I = Icon[b.icon] || Icon.Box;
          return (
            <button key={b.id} onClick={() => onExpand(isExpanded ? null : b.id)}
              className={`relative rounded border p-1.5 text-left transition-all ${isExpanded ? 'border-emerald-400 emerald-glow bg-emerald-950/40' : filled > 0 ? 'border-emerald-700/60 bg-stone-900/70 hover:bg-stone-900' : 'border-stone-800 bg-stone-900/50 hover:bg-stone-900'}`}>
              <div className="flex items-center gap-1.5">
                <I size={11} color={filled > 0 ? '#34d399' : '#78716c'} />
                <span className={`text-[10px] font-medium ${filled > 0 ? 'text-emerald-200' : 'text-stone-300'}`}>{b.label}</span>
                <span className="ml-auto text-[9px] font-mono tabular text-stone-500">{filled}/{b.fields.length}</span>
              </div>
              <div className="text-[8px] font-mono text-stone-500 uppercase tracking-wider mt-0.5 truncate">{b.sub}</div>
              <div className="h-0.5 bg-stone-800 rounded-full mt-1 overflow-hidden">
                <M.div
                  initial={false}
                  animate={{ width: `${pct*100}%` }}
                  transition={{ duration: 1.2, ease: [0.22,1,0.36,1] }}
                  className="h-full bg-emerald-400"
                  style={{ filter: filled > 0 ? 'drop-shadow(0 0 3px #34d399)' : 'none' }}
                />
              </div>
            </button>
          );
        })}
      </div>
      <AP>
      {expanded && (
        <M.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="mt-2 border border-emerald-800/40 rounded bg-stone-950/60 p-2">
            {(() => {
              const b = BUCKETS.find(x => x.id === expanded);
              const state = pharmState[expanded] || {};
              return (
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-emerald-300 mb-1.5">{b.label} bucket · field contents</div>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                    {b.fields.map(f => {
                      const has = !!state[f];
                      return (
                        <div key={f} className="font-mono text-[10px] tabular flex justify-between gap-2">
                          <span className="text-stone-500 truncate">{f}:</span>
                          <span className={has ? 'text-emerald-300 truncate' : 'text-stone-700'}>{has ? state[f] : '— null'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </M.div>
      )}
      </AP>
    </div>
  );
};

/* ─── MAIN APP ─── */
export default function PharmAgentApp() {
  
  const reduced = useReducedMotion();
  const [activeUC, setActiveUC] = React.useState('poppk');
  const [stepIdx, setStepIdx] = React.useState(0);

  /* PharmState - persists across UC switches */
  const initialState = React.useMemo(() => {
    const s = {};
    BUCKETS.forEach(b => { s[b.id] = {}; });
    return s;
  }, []);
  const [pharmState, setPharmState] = React.useState(initialState);
  const [expandedBucket, setExpandedBucket] = React.useState(null);

  /* Chat messages */
  const [messages, setMessages] = React.useState([]);
  /* Tool call entries */
  const [toolCalls, setToolCalls] = React.useState([]);
  /* Audit chain entries */
  const [auditEntries, setAuditEntries] = React.useState([]);

  const [verifying, setVerifying] = React.useState(false);

  const uc = USE_CASES[activeUC];
  const step = uc.steps[stepIdx];

  /* ─── play storyboard with looping ─── */
  React.useEffect(() => {
    if (reduced) return; /* still allow manual but don't auto-advance heavily */
    const id = setInterval(() => {
      setStepIdx((s) => (s + 1) % uc.steps.length);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [activeUC, uc.steps.length, reduced]);

  /* ─── apply step effects ─── */
  const lastApplied = React.useRef({ uc: null, step: -1 });
  React.useEffect(() => {
    /* On step change, populate state, append messages, tool calls, audit entries */
    const key = { uc: activeUC, step: stepIdx };
    if (lastApplied.current.uc === key.uc && lastApplied.current.step === key.step) return;
    lastApplied.current = key;

    /* populate fields */
    if (step.populate && step.populate.length) {
      setPharmState(prev => {
        const next = { ...prev };
        step.populate.forEach(pf => {
          const [bucket, field] = pf.split('.');
          if (!next[bucket]) next[bucket] = {};
          next[bucket] = { ...next[bucket], [field]: FIELD_VALUES[field] || 'set' };
        });
        return next;
      });
    }

    /* push chat message */
    const isAnalyst = step.active && step.active[0] === 'analyst' && stepIdx === 0;
    /* derive who from active set */
    const who = (() => {
      if (step.label.toLowerCase().includes('analyst submits')) return 'Analyst';
      if (step.label.startsWith('⚠')) return 'L0 Supervisor';
      if (step.label.toLowerCase().includes('analyst approves')) return 'Analyst';
      const aMap = { data:'Data Manager', nca:'NCA Agent', mod:'Modeler Manager', pbpk:'PBPK Agent', stats:'Statistical Agent', qc:'QC Agent', rep:'Report Agent', poppk:'PopPK Expert', pkpd:'PKPD Expert', er:'E-R Expert', l0:'L0 Supervisor', privacy:'SchemaExtractor' };
      const last = step.active[step.active.length - 1];
      return aMap[last] || 'L0 Supervisor';
    })();
    const iconMap = { 'Analyst': 'User', 'Data Manager': 'Database', 'NCA Agent':'Activity', 'Modeler Manager':'Layers', 'PBPK Agent':'Beaker', 'Statistical Agent':'TrendingUp', 'QC Agent':'ShieldCheck', 'Report Agent':'FileText', 'PopPK Expert':'Beaker', 'PKPD Expert':'LineChart', 'E-R Expert':'Target', 'L0 Supervisor':'BrainCircuit', 'SchemaExtractor':'Lock' };
    setMessages(prev => [...prev, {
      id: `${activeUC}-${stepIdx}-${Date.now()}`,
      who, icon: iconMap[who] || 'BrainCircuit', t: step.t, text: step.label.replace(/^⚠ /, ''), artifact: step.artifact
    }].slice(-30));

    if (step.toolCall) {
      setToolCalls(prev => [...prev, { id: prev.length + 1, ...step.toolCall }]);
    }
    if (step.audit) {
      setAuditEntries(prev => [...prev, { id: prev.length + 1, ...step.audit }]);
    }
  }, [activeUC, stepIdx]);

  const handleSwitch = (id) => {
    if (id === activeUC) return;
    /* Hold up to SWITCH_HOLD_MAX_MS for current step to settle, then switch */
    setTimeout(() => {
      setActiveUC(id);
      setStepIdx(0);
    }, Math.min(SWITCH_HOLD_MAX_MS, 400));
  };

  const handleReset = () => {
    setPharmState(initialState);
    setMessages([]);
    setToolCalls([]);
    setAuditEntries([]);
    setExpandedBucket(null);
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => setVerifying(false), 1800);
  };

  return (
    <div className="min-h-screen min-w-[1200px] bg-stone-950 text-stone-100 flex flex-col">
      <Header activeUC={activeUC} onSwitch={handleSwitch} onReset={handleReset} />

      {/* MAIN GRID */}
      <div className="flex" style={{ height: 720 }}>
        <Timeline uc={uc} currentIdx={stepIdx} />
        <div className="flex-1 min-w-[720px] relative bg-stone-950">
          <ArchCanvas activeStep={step} useCase={activeUC} />
        </div>
        <ChatStream messages={messages} pharmState={pharmState} />
      </div>

      {/* PHARMSTATE BUS */}
      <PharmStateBus pharmState={pharmState} expanded={expandedBucket} onExpand={setExpandedBucket} />

      {/* BOTTOM STRIP */}
      <div className="flex border-t border-stone-800" style={{ height: 140 }}>
        <ToolCallLog entries={toolCalls} />
        <AuditChain entries={auditEntries} onVerify={handleVerify} verifying={verifying} />
      </div>

      {/* FOOTER */}
      <div className="px-4 py-1.5 border-t border-stone-900 bg-stone-950 text-center">
        <span className="text-[9px] font-mono text-stone-600 tabular">
          Architecture grounded in Kim et al. arXiv:2512.08296 · centralized topology · 4.4× trace-level error containment vs 17.2× independent · capability saturation ~45% baseline · ICH M15 effective 23 July 2026
        </span>
      </div>
    </div>
  );
}

