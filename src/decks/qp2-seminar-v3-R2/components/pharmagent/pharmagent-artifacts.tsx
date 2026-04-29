import React from 'react';
import { motion as M } from 'framer-motion';
import * as Icon from 'lucide-react';

/* PharmAgent · rich artifact bubbles using recharts and inline SVG */

const Rch = window.Recharts || {};
const { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, ScatterChart, Scatter, LineChart, Line, AreaChart, Area, CartesianGrid, ReferenceLine, Tooltip } = Rch;

/* NCA parameter table */
const ArtifactNCATable = () => (
  <div className="font-mono text-[10px] tabular w-full">
    <table className="w-full">
      <thead className="text-stone-400 border-b border-stone-700">
        <tr>
          <th className="text-left font-normal py-1">Dose</th>
          <th className="text-right font-normal">n</th>
          <th className="text-right font-normal">Cmax geo (CV%)</th>
          <th className="text-right font-normal">AUC₀₋∞</th>
          <th className="text-right font-normal">t½</th>
          <th className="text-right font-normal">λz R²</th>
        </tr>
      </thead>
      <tbody className="text-stone-100">
        <tr className="border-b border-stone-800/60"><td className="py-1">100 mg</td><td className="text-right">82</td><td className="text-right">388 (29%)</td><td className="text-right">3,247</td><td className="text-right">8.1</td><td className="text-right">0.95</td></tr>
        <tr className="border-b border-stone-800/60"><td className="py-1">200 mg</td><td className="text-right">83</td><td className="text-right">771 (31%)</td><td className="text-right">6,489</td><td className="text-right">8.3</td><td className="text-right">0.94</td></tr>
        <tr><td className="py-1">400 mg</td><td className="text-right">82</td><td className="text-right">1,487 (32%)</td><td className="text-right">12,847</td><td className="text-right">8.4</td><td className="text-right">0.93</td></tr>
      </tbody>
    </table>
    <div className="text-[9px] text-stone-500 mt-1">linear-up / log-down trapezoidal · dose-prop slope 1.04 [0.96–1.12]</div>
  </div>
);

/* PopPK OFV comparison bar chart */
const ArtifactPopPKOFV = () => {
  const data = [
    { model: '1-CMT', ofv: 4821 },
    { model: '2-CMT', ofv: 4672 },
  ];
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10px] font-mono text-stone-400">structural model selection</div>
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700/40">2-CMT wins · ΔOFV = 149</span>
      </div>
      <div style={{ width: '100%', height: 90 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 8, bottom: 4 }}>
            <XAxis type="number" domain={[4500, 4900]} hide />
            <YAxis type="category" dataKey="model" width={42} stroke="#a8a29e" tick={{ fill:'#d6d3d1', fontFamily:'JetBrains Mono', fontSize:10 }} axisLine={false} tickLine={false} />
            <Bar dataKey="ofv" fill="#34d399" radius={[0,2,2,0]} barSize={18}>
              {data.map((d,i) => (
                <Rch.Cell key={i} fill={d.model === '2-CMT' ? '#34d399' : '#57534e'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-[9px] font-mono tabular text-stone-300 px-1">
        <span>1-CMT · OFV 4,821</span>
        <span className="text-emerald-300">2-CMT · OFV 4,672</span>
      </div>
    </div>
  );
};

/* QC GOF: 2x2 mini panels */
const MiniPanel = ({ title, children }) => (
  <div className="border border-stone-700/60 rounded p-1 bg-stone-950/40">
    <div className="text-[8px] font-mono uppercase text-stone-400 mb-0.5 tracking-wider">{title}</div>
    <div style={{ height: 56 }}>{children}</div>
  </div>
);

const ArtifactGOF = () => {
  const dvPred = Array.from({length: 40}, (_,i) => {
    const x = 1 + i*0.4;
    return { x, y: x + (Math.sin(i*1.3) * 0.4 + (Math.random()-0.5)*0.6) };
  });
  const cwres = Array.from({length: 50}, (_,i) => ({ t: i*2, r: (Math.random()-0.5)*3 }));
  const vpcMid = Array.from({length: 24}, (_,i) => ({ t:i, lo: 50 + 30*Math.exp(-i/8), mid: 80 + 50*Math.exp(-i/8), hi: 110 + 70*Math.exp(-i/8) }));
  const boots = Array.from({length: 14}, (_,i) => ({ b: 10 + i, n: 8 + Math.round(40 * Math.exp(-Math.pow((i-7)/3,2))) }));
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <MiniPanel title="DV vs PRED">
        <ResponsiveContainer>
          <ScatterChart margin={{ top:2, right:2, left:2, bottom:2 }}>
            <CartesianGrid stroke="#3f3f46" strokeOpacity="0.3" />
            <XAxis type="number" dataKey="x" hide domain={[0,18]} />
            <YAxis type="number" dataKey="y" hide domain={[0,18]} />
            <ReferenceLine segment={[{x:0,y:0},{x:18,y:18}]} stroke="#fbbf24" strokeDasharray="2 2" />
            <Scatter data={dvPred} fill="#34d399" />
          </ScatterChart>
        </ResponsiveContainer>
      </MiniPanel>
      <MiniPanel title="CWRES vs TIME">
        <ResponsiveContainer>
          <ScatterChart margin={{ top:2, right:2, left:2, bottom:2 }}>
            <CartesianGrid stroke="#3f3f46" strokeOpacity="0.3" />
            <XAxis type="number" dataKey="t" hide domain={[0,100]} />
            <YAxis type="number" dataKey="r" hide domain={[-4,4]} />
            <ReferenceLine y={0} stroke="#a8a29e" strokeDasharray="2 2" />
            <ReferenceLine y={2} stroke="#57534e" strokeDasharray="1 2" />
            <ReferenceLine y={-2} stroke="#57534e" strokeDasharray="1 2" />
            <Scatter data={cwres} fill="#7dd3fc" />
          </ScatterChart>
        </ResponsiveContainer>
      </MiniPanel>
      <MiniPanel title="VPC · 5/50/95">
        <ResponsiveContainer>
          <AreaChart data={vpcMid} margin={{ top:2, right:2, left:2, bottom:2 }}>
            <XAxis dataKey="t" hide /><YAxis hide />
            <Area type="monotone" dataKey="hi" stroke="none" fill="#34d399" fillOpacity={0.18} />
            <Area type="monotone" dataKey="lo" stroke="none" fill="#0c0a09" fillOpacity={1} />
            <Line type="monotone" dataKey="mid" stroke="#34d399" dot={false} strokeWidth={1.4} />
          </AreaChart>
        </ResponsiveContainer>
      </MiniPanel>
      <MiniPanel title="bootstrap CL · n=1000">
        <ResponsiveContainer>
          <BarChart data={boots} margin={{ top:2, right:2, left:2, bottom:2 }}>
            <XAxis dataKey="b" hide /><YAxis hide />
            <Bar dataKey="n" fill="#34d399" />
            <ReferenceLine x={17} stroke="#fbbf24" strokeDasharray="2 2" />
          </BarChart>
        </ResponsiveContainer>
      </MiniPanel>
    </div>
  );
};

/* BE forest plot */
const ArtifactForest = () => {
  const rows = [
    { label: 'AUC₀₋∞ ratio', est: 99.4, lo: 88.4, hi: 112.1 },
    { label: 'Cmax ratio',   est: 96.7, lo: 85.2, hi: 109.7 },
  ];
  const min = 70, max = 135;
  const scale = (v) => ((v - min) / (max - min)) * 100;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10px] font-mono text-stone-400">90% CI vs 80–125% bounds</div>
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700/40">PASS · equivalent</span>
      </div>
      <div className="relative bg-stone-950/40 border border-stone-700/60 rounded p-2">
        {/* axis bg with bounds shading */}
        <div className="relative h-16">
          {/* bounds region */}
          <div className="absolute inset-y-0 bg-emerald-500/10 border-x border-emerald-500/30" style={{ left: `${scale(80)}%`, width: `${scale(125)-scale(80)}%` }}></div>
          <div className="absolute inset-y-0 border-l border-emerald-500/40" style={{ left: `${scale(100)}%` }}></div>
          {/* rows */}
          {rows.map((r, i) => (
            <div key={i} className="absolute flex items-center w-full" style={{ top: `${i * 28 + 4}px` }}>
              <div className="absolute h-px bg-stone-300" style={{ left: `${scale(r.lo)}%`, width: `${scale(r.hi)-scale(r.lo)}%` }}></div>
              <div className="absolute w-2 h-2 bg-emerald-400 rounded-sm -translate-x-1/2 -translate-y-1/2" style={{ left: `${scale(r.est)}%`, top: '50%' }}></div>
            </div>
          ))}
        </div>
        {/* axis labels */}
        <div className="flex justify-between text-[8px] font-mono tabular text-stone-500 mt-1">
          <span>70</span><span>80</span><span>100</span><span>125</span><span>135</span>
        </div>
        <div className="text-[9px] font-mono tabular text-stone-200 mt-1.5 space-y-0.5">
          {rows.map((r,i) => <div key={i}>{r.label} · {r.est.toFixed(1)} [{r.lo.toFixed(1)} – {r.hi.toFixed(1)}]</div>)}
        </div>
      </div>
    </div>
  );
};

/* DDI heatmap 8 × 3 */
const ArtifactDDIHeatmap = () => {
  const perps = ['midaz','keto','ritonavir','rifamp','clarith','itracon','fluconaz','verap'];
  const mechs = ['CYP3A4','CYP2D6','P-gp'];
  /* AUC ratios */
  const grid = [
    [1.42, 1.08, 1.11],
    [4.8,  1.02, 1.95],
    [3.6,  1.10, 2.40],
    [0.18, 1.00, 0.82],
    [3.2,  1.04, 1.30],
    [2.7,  1.06, 1.55],
    [1.9,  1.01, 1.05],
    [1.6,  1.03, 1.40],
  ];
  const colorFor = (v) => {
    const r = Math.abs(Math.log10(v));
    if (r < 0.1) return '#1c1917';
    if (r < 0.3) return '#065f46';
    if (r < 0.5) return '#facc15';
    return '#dc2626';
  };
  return (
    <div className="w-full">
      <div className="text-[10px] font-mono text-stone-400 mb-1">AUC ratios · 8 perpetrators × 3 mechanisms</div>
      <div className="bg-stone-950/40 border border-stone-700/60 rounded p-1.5">
        <div className="grid" style={{ gridTemplateColumns: '64px repeat(3, 1fr)', gap: '2px' }}>
          <div></div>
          {mechs.map(m => <div key={m} className="text-[8px] font-mono uppercase text-stone-400 text-center">{m}</div>)}
          {perps.map((p,i) => (
            <React.Fragment key={p}>
              <div className="text-[9px] font-mono text-stone-300 truncate">{p}</div>
              {grid[i].map((v,j) => (
                <div key={j} className="h-5 flex items-center justify-center text-[8px] font-mono tabular rounded-sm text-stone-100" style={{ background: colorFor(v) }} title={`${perps[i]} · ${mechs[j]} · ratio ${v}`}>{v}</div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="text-[8px] font-mono text-stone-500 mt-1.5">midaz AUC ratio 1.42 · weak inhibitor</div>
      </div>
    </div>
  );
};

/* Pediatric exposure ribbons */
const ArtifactPediatricRibbon = () => {
  const bands = [
    { name:'neonate',    color:'#fb923c', y: 86 },
    { name:'infant',     color:'#f4a582', y: 64 },
    { name:'child',      color:'#7dd3fc', y: 46 },
    { name:'adolescent', color:'#34d399', y: 30 },
  ];
  const points = (off, amp) => Array.from({length: 30}, (_,i) => {
    const t = i / 29;
    const v = off + amp * Math.exp(-i/9) * Math.sin(t*5+1.2);
    return { x: t * 100, y: off + amp * Math.exp(-i/9) };
  });
  return (
    <div className="w-full">
      <div className="text-[10px] font-mono text-stone-400 mb-1">simulated AUCss · age bands vs adult ref</div>
      <div className="bg-stone-950/40 border border-stone-700/60 rounded p-1.5 relative" style={{ height: 110 }}>
        <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full">
          {/* adult ref dashed */}
          <line x1="0" y1="50" x2="200" y2="50" stroke="#a8a29e" strokeDasharray="3 3" strokeWidth="0.6" />
          <text x="2" y="46" fontSize="6" fill="#a8a29e" fontFamily="JetBrains Mono">adult ref</text>
          {bands.map((b,i) => {
            /* draw a ribbon centered at b.y with width 6 */
            const top = b.y - 4, bot = b.y + 4;
            return (
              <g key={i}>
                <path d={`M0 ${top} Q 50 ${top-3}, 100 ${top} T 200 ${top} L 200 ${bot} Q 150 ${bot+3}, 100 ${bot} T 0 ${bot} Z`} fill={b.color} fillOpacity="0.3" stroke={b.color} strokeWidth="0.6" />
                <text x="2" y={b.y+1} fontSize="5.5" fill={b.color} fontFamily="JetBrains Mono">{b.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="text-[8px] font-mono text-stone-500 mt-1">neonate exposure ribbon ↑ vs adult · maturation flagged</div>
    </div>
  );
};

/* Review gate card */
const ArtifactReviewGate = () => (
  <div className="border border-amber-500/50 bg-amber-950/30 rounded p-2 space-y-1.5">
    <div className="flex items-center gap-1.5">
      <Icon.AlertTriangle size={12} color="#fbbf24" />
      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200">Human approval required</span>
    </div>
    <div className="text-[10px] text-stone-200 leading-snug">QC verdict: CONDITIONAL_PASS. ΔOFV (1-CMT → 2-CMT) = 149. Confirm structural choice before covariate finalisation.</div>
    <div className="grid grid-cols-2 gap-1.5 mt-1">
      <button className="text-[9px] font-mono py-1 rounded bg-emerald-950/40 border border-emerald-700/40 text-emerald-200/80 cursor-default" disabled>Approve 2-CMT</button>
      <button className="text-[9px] font-mono py-1 rounded bg-stone-800/60 border border-stone-700 text-stone-400 cursor-default" disabled>Request 3-CMT</button>
    </div>
    <div className="text-[8px] font-mono text-stone-500">attached: GOF gallery · VPC · η-shrinkage 18% · cond. number 87</div>
  </div>
);

/* Report agent CSR Methods preview */
const ArtifactReport = () => (
  <div className="bg-stone-950/60 border border-stone-700/60 rounded p-2">
    <div className="text-[10px] font-mono text-stone-400 mb-1.5">2.7.2 Methods · preview</div>
    <div className="font-mono text-[9px] leading-relaxed text-stone-200 space-y-1 tabular">
      <div>2.7.2.1  Population pharmacokinetic analysis was conducted</div>
      <div>using NONMEM 7.5 with the FOCE-I estimation method on a</div>
      <div>pooled dataset of 247 subjects (4,812 observations). A two-</div>
      <div>compartment disposition model with first-order absorption</div>
      <div>described the data (ΔOFV = 149 vs one-compartment).</div>
      <div className="text-stone-500">… 8 more pages · M15-aligned</div>
    </div>
  </div>
);

/* Audit summary */
const ArtifactAuditSummary = ({ chainHead, nEntries }) => (
  <div className="bg-emerald-950/20 border border-emerald-700/50 rounded p-2 space-y-1">
    <div className="flex items-center gap-1.5">
      <Icon.CheckCircle size={12} color="#34d399" />
      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-200">workflow complete</span>
    </div>
    <div className="font-mono text-[9px] tabular text-stone-200 space-y-0.5">
      <div>{nEntries || '47'} tool calls · 0 patient rows leaked</div>
      <div>SHA-256 chain head <span className="text-emerald-300">{chainHead || '0xa7f3…c891'}</span></div>
      <div>ICH M15-aligned · DOCX exported</div>
    </div>
  </div>
);

export const ARTIFACTS = {
  'nca-table':  ArtifactNCATable,
  'poppk-ofv':  ArtifactPopPKOFV,
  'gof':        ArtifactGOF,
  'forest':     ArtifactForest,
  'ddi-heatmap':ArtifactDDIHeatmap,
  'ped-ribbon': ArtifactPediatricRibbon,
  'review-gate':ArtifactReviewGate,
  'report':     ArtifactReport,
  'audit-summary': ArtifactAuditSummary,
};


