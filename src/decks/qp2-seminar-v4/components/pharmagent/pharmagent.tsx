// @ts-nocheck
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
    <div className="px-4 xl:px-6 py-4 border-b border-deck-rule flex flex-col xl:flex-row xl:items-start gap-4 xl:gap-6 bg-deck-bg/90 backdrop-blur-xl z-20 shrink-0">
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-deck-case mb-2 opacity-80">CS · PHARMAGENT WORKFLOW — INTERACTIVE STORYBOARD</div>
        <div className="font-serif text-[clamp(1.4rem,2.5vw,28px)] leading-tight text-deck-ink max-w-[820px] tracking-wide">
          The architecture decides. The tools execute. <span className="text-deck-case italic">The audit chain remembers.</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 shrink-0 xl:pt-1">
        {cases.map(([id, uc]) => {
          const I = Icon[uc.icon] || Icon.Box;
          const active = id === activeUC;
          return (
            <button key={id} onClick={() => onSwitch(id)}
              className={`group relative px-3 py-2 rounded-lg transition-all duration-300 border ${active ? 'bg-deck-panel border-deck-case shadow-deck-glow-case' : 'bg-deck-panel/40 border-deck-rule hover:bg-deck-panel hover:border-deck-ink-muted'}`}>
              <div className="flex items-center gap-2">
                <I size={14} className={active ? 'text-deck-case' : 'text-deck-ink-muted group-hover:text-deck-ink transition-colors'} />
                <div className="leading-tight text-left">
                  <div className={`text-[11px] font-medium tracking-wide ${active ? 'text-deck-ink' : 'text-deck-ink-muted'}`}>{uc.label}</div>
                  <div className="text-[9px] font-mono text-deck-ink-faint uppercase tracking-widest mt-0.5">{uc.sub}</div>
                </div>
              </div>
            </button>
          );
        })}
        <button onClick={onReset} className="ml-2 text-[10px] font-mono text-deck-ink-muted hover:text-deck-danger px-2 py-1.5 flex items-center gap-1.5 transition-colors rounded-md" title="Clear PharmState">
          <Icon.RotateCcw size={12} /> Reset
        </button>
      </div>
    </div>
  );
};

/* ─── LEFT RAIL · STORYBOARD TIMELINE ─── */
const Timeline = ({ uc, currentIdx }) => {
  return (
    <div className="w-full h-full flex flex-col p-5 overflow-y-auto scrollbar-hide">
      <div className="text-[10px] font-mono uppercase tracking-widest text-deck-case opacity-80 mb-6 pl-1">storyboard · {uc.label}</div>
      <div className="relative space-y-6">
        {/* Continuous hairline behind dots */}
        <div className="absolute left-[5px] top-3 bottom-3 w-px bg-deck-rule" />
        {uc.steps.map((s, i) => {
          const isPast = i < currentIdx;
          const isActive = i === currentIdx;
          
          return (
            <div key={i} className={`relative flex gap-4 ${isActive ? 'opacity-100 scale-105 origin-left' : isPast ? 'opacity-80' : 'opacity-40'} transition-all duration-500`}>
              <div className="pt-1.5 shrink-0 relative z-10 pl-[2px]">
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-deck-case shadow-deck-glow-case ring-4 ring-deck-case/20' : isPast ? 'bg-deck-case/60 ring-2 ring-deck-case/20' : 'bg-deck-panel ring-1 ring-deck-rule'}`} />
              </div>
              <div className="min-w-0 pb-1">
                <div className={`text-[10px] font-mono tracking-widest ${isActive ? 'text-deck-case' : isPast ? 'text-deck-case/80' : 'text-deck-ink-faint'} mb-1.5 transition-colors duration-500`}>{s.t}</div>
                <div className={`text-[12.5px] leading-snug font-serif tracking-wide ${isActive ? 'text-deck-ink font-semibold' : isPast ? 'text-deck-ink-muted' : 'text-deck-ink-faint'} transition-colors duration-500`}>{s.label}</div>
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
    <div className="flex-1 flex flex-col min-h-0 h-full w-full relative">
      <div className="px-5 py-4 border-b border-deck-rule text-[10px] font-mono uppercase tracking-widest text-deck-ink-muted bg-deck-panel/60 backdrop-blur-md shrink-0 z-10 shadow-sm flex justify-between items-center">
        <span>chat stream · live</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
        <AP initial={false}>
          {messages.slice(-5).map((m, idx, arr) => {
            const isLast = idx === arr.length - 1;
            const opacity = isLast ? 1 : idx === arr.length-2 ? 0.9 : 0.6;
            const isAnalyst = m.who === 'Analyst';
            
            // Thematic styling for bubbles
            const ringColor = isAnalyst ? 'var(--coral)' : 'var(--success)';
            const bgColor = isAnalyst ? 'color-mix(in srgb, var(--coral) 12%, transparent)' : 'color-mix(in srgb, var(--success) 12%, transparent)';
            const borderColor = isAnalyst ? 'color-mix(in srgb, var(--coral) 30%, transparent)' : 'color-mix(in srgb, var(--success) 30%, transparent)';
            
            const Artifact = m.artifact ? ARTIFACTS[m.artifact] : null;
            const I = isAnalyst ? Icon.User : (Icon[m.icon] || Icon.BrainCircuit);
            
            return (
              <M.div
                key={m.id}
                initial={{ opacity: 0, x: 20, scale: 0.96 }}
                animate={{ opacity, x: 0, scale: 1 }}
                layout
                className={`rounded-xl border backdrop-blur-md p-4 transition-all duration-500`}
                style={{
                  backgroundColor: bgColor,
                  borderColor: isLast ? ringColor : borderColor,
                  boxShadow: isLast ? `0 0 20px color-mix(in srgb, ${ringColor} 20%, transparent)` : 'none'
                }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}` }}>
                    <I size={12} color={ringColor} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: ringColor }}>{m.who}</span>
                  <span className="text-[10px] font-mono text-deck-ink-faint ml-auto tabular">{m.t}</span>
                </div>
                <div className="text-[13px] leading-relaxed text-deck-ink font-serif tracking-wide">{m.text}</div>
                {Artifact && (
                  <div className="mt-4 pt-3 border-t border-deck-rule">
                    <Artifact chainHead={pharmState.audit.chain_head} nEntries={pharmState.audit.n_entries} />
                  </div>
                )}
              </M.div>
            );
          })}
        </AP>
        {/* Persistent typing indicator */}
        <div className="flex items-center gap-2 pl-2 pt-2 opacity-70">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)', animationDelay: '0s' }}></div>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)', animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)', animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-deck-ink-muted ml-2">agent thinking...</span>
        </div>
      </div>
    </div>
  );
};

/* ─── BOTTOM · TOOL CALL LOG + AUDIT CHAIN ─── */
const ToolCallLog = ({ entries }) => (
  <div className="flex-1 border-r border-deck-rule px-4 py-3 bg-deck-panel/40 overflow-hidden flex flex-col">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] font-mono uppercase tracking-widest text-deck-ink-muted">Tool calls · live</span>
      <span className="text-[9px] font-mono text-deck-ink-faint tabular">{entries.length} total</span>
    </div>
    <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
      {entries.slice(-5).map((e, i, arr) => {
        const isLast = i === arr.length - 1;
        return (
          <div key={e.id} className={`font-mono text-[10px] tabular ${isLast ? 'text-deck-ink' : 'text-deck-ink-muted'} transition-colors`}>
            <span className="text-deck-ink-faint">[{e.at}] </span>
            <span>{e.text}</span>
          </div>
        );
      })}
      {entries.length === 0 && <div className="text-[10px] font-mono text-deck-ink-faint italic">awaiting first invocation…</div>}
    </div>
  </div>
);

const AuditChain = ({ entries, onVerify, verifying }) => {
  const visible = entries.slice(-6);
  const prior = Math.max(0, entries.length - visible.length);
  return (
    <div className="flex-1 px-4 py-3 bg-deck-panel/40 flex flex-col min-w-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-deck-ink-muted">Audit chain · SHA-256 · tamper-evident</span>
        <button onClick={onVerify} className="text-[9px] font-mono px-2 py-0.5 rounded border border-deck-case/50 text-deck-case hover:bg-deck-case/10 transition-colors shrink-0 ml-4">Verify chain</button>
      </div>
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 pb-1">
        {prior > 0 && <div className="text-[9px] font-mono text-deck-ink-faint shrink-0 pr-1">+{prior} prior →</div>}
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
            <div className={`relative flex flex-col items-center justify-center px-2 py-1.5 rounded border bg-deck-bg/80 ${verifying ? 'border-deck-success/80 shadow-[0_0_8px_var(--success)]' : 'border-deck-rule'}`} style={{ minWidth: 80 }}>
              <div className="text-[8px] font-mono text-deck-ink-muted truncate max-w-[70px]">{e.tool}</div>
              <div className="text-[8px] font-mono text-deck-case tabular mt-0.5">{e.hash}</div>
              {verifying && (
                <M.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.12, duration: 0.25 }} className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-deck-success flex items-center justify-center">
                  <Icon.CheckCircle size={10} className="text-deck-bg" strokeWidth={3} />
                </M.div>
              )}
            </div>
            {i < visible.length - 1 && (
              <Icon.Link size={10} className="text-deck-ink-faint mx-1" />
            )}
          </M.div>
        ))}
        </AP>
        {entries.length === 0 && <div className="text-[10px] font-mono text-deck-ink-faint italic">no entries yet</div>}
      </div>
    </div>
  );
};

/* ─── PHARMSTATE BUS ─── */
const PharmStateBus = ({ pharmState, expanded, onExpand }) => {
  return (
    <div className="p-4 bg-deck-panel/60">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-deck-case animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-deck-ink font-semibold">PharmState · typed shared bus</span>
        </div>
        <span className="text-[10px] font-mono text-deck-ink-muted">34 fields total · persists across runs</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {BUCKETS.map(b => {
          const bucketState = pharmState[b.id] || {};
          const filled = b.fields.filter(f => bucketState[f]).length;
          const pct = filled / b.fields.length;
          const isExpanded = expanded === b.id;
          const I = Icon[b.icon] || Icon.Box;
          
          return (
            <button key={b.id} onClick={() => onExpand(isExpanded ? null : b.id)}
              className={`relative rounded-xl border p-3 text-left transition-all duration-300 overflow-hidden ${isExpanded ? 'border-deck-case bg-deck-panel shadow-deck-glow-case scale-[1.02]' : filled > 0 ? 'border-deck-rule bg-deck-panel/80 hover:bg-deck-panel hover:border-deck-case/50' : 'border-deck-rule/50 bg-deck-panel/30 hover:bg-deck-panel/60'}`}>
              
              {/* Background progress fill for visual flair */}
              <div className="absolute left-0 bottom-0 top-0 bg-[color-mix(in_srgb,var(--case)_5%,transparent)] transition-all duration-1000 ease-out" style={{ width: `${pct*100}%` }} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2.5">
                  <I size={14} className={filled > 0 ? 'text-deck-case' : 'text-deck-ink-muted'} />
                  <span className={`text-[11.5px] font-medium tracking-wide ${filled > 0 ? 'text-deck-ink' : 'text-deck-ink-muted'}`}>{b.label}</span>
                  <span className="ml-auto text-[10px] font-mono tabular text-deck-ink-muted">{filled}/{b.fields.length}</span>
                </div>
                <div className="text-[9px] font-mono text-deck-ink-faint uppercase tracking-widest mt-2 truncate">{b.sub}</div>
                <div className="h-[2px] bg-deck-rule rounded-full mt-3 overflow-hidden">
                  <M.div
                    initial={false}
                    animate={{ width: `${pct*100}%` }}
                    transition={{ duration: 1.2, ease: [0.22,1,0.36,1] }}
                    className="h-full"
                    style={{ backgroundColor: 'var(--case)', filter: filled > 0 ? 'drop-shadow(0 0 4px var(--case))' : 'none' }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <AP>
      {expanded && (
        <M.div
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          className="overflow-hidden"
        >
          <div className="mt-4 border border-deck-rule rounded-xl bg-deck-bg/80 backdrop-blur-md p-5 shadow-inner">
            {(() => {
              const b = BUCKETS.find(x => x.id === expanded);
              const state = pharmState[expanded] || {};
              return (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-deck-case mb-4 flex items-center gap-2">
                    <Icon.Database size={12} /> {b.label} bucket contents
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                    {b.fields.map(f => {
                      const has = !!state[f];
                      return (
                        <div key={f} className="font-mono text-[11px] tabular flex items-center justify-between gap-3 border-b border-deck-rule/50 pb-1.5">
                          <span className="text-deck-ink-muted truncate tracking-wide">{f}:</span>
                          <span className={`${has ? 'text-deck-success' : 'text-deck-ink-faint'} truncate font-semibold`}>{has ? state[f] : '— null'}</span>
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
    <div className="h-[100dvh] w-full bg-deck-bg text-deck-ink flex flex-col font-sans overflow-hidden">
      <Header activeUC={activeUC} onSwitch={handleSwitch} onReset={handleReset} />

      {/* MAIN GRID - fully responsive flex, min-h-0 is crucial for inner scrolling */}
      <div className="flex flex-1 min-h-0 flex-col xl:flex-row relative">
        {/* Left Rail: Timeline (Hidden on mobile, visible on desktop) */}
        <div className="hidden xl:flex w-[280px] shrink-0 border-r border-deck-rule bg-deck-panel/40 backdrop-blur-sm z-10 shadow-[5px_0_15px_rgba(0,0,0,0.05)]">
          <Timeline uc={uc} currentIdx={stepIdx} />
        </div>

        {/* Center: Canvas + Bottom Dock */}
        <div className="flex-1 relative overflow-hidden bg-deck-bg flex flex-col min-w-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-deck-panel/60 to-deck-bg pointer-events-none z-0"></div>
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
          
          {/* Architecture Canvas Area */}
          <div className="flex-1 relative min-h-0">
            <ArchCanvas activeStep={step} useCase={activeUC} />
          </div>
          
          {/* Bottom Dock: PharmState + Evidence */}
          <div className="shrink-0 z-10 border-t border-deck-rule shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
            <PharmStateBus pharmState={pharmState} expanded={expandedBucket} onExpand={setExpandedBucket} />
            <div className="flex flex-col md:flex-row border-t border-deck-rule min-h-[6.5rem]">
              <ToolCallLog entries={toolCalls} />
              <AuditChain entries={auditEntries} onVerify={handleVerify} verifying={verifying} />
            </div>
          </div>
        </div>

        {/* Right Rail: Chat (Hidden on mobile, visible on desktop) */}
        <div className="hidden xl:flex w-[380px] shrink-0 border-l border-deck-rule bg-deck-panel/40 backdrop-blur-sm z-10 shadow-[-5px_0_15px_rgba(0,0,0,0.05)]">
          <ChatStream messages={messages} pharmState={pharmState} />
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-4 py-2 border-t border-deck-rule bg-deck-panel/80 backdrop-blur-xl text-center shrink-0 z-20 relative">
        <span className="text-[10px] font-mono text-deck-ink-muted tracking-widest uppercase">
          Architecture grounded in Kim et al. arXiv:2512.08296 · centralized topology
        </span>
      </div>
    </div>
  );
}