// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as d3 from 'd3';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import AnalysisPlot from '@/components/deck/patterns/AnalysisPlot';
import BoxTooltip from '@/components/deck/patterns/BoxTooltip';

const CHART_PANEL = {
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--cream-hairline)',
  borderRadius: 0,
  padding: 'var(--space-3)',
  background: 'transparent',
};

const CHART_PANEL_BODY = {
  flex: '1 1 0',
  minHeight: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function ConclusionPill({ children, color = 'var(--coral)' }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        border: `1px solid ${color}`,
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        color: color,
        borderRadius: '3px',
        fontSize: '11px',
        letterSpacing: '0.08em',
        fontWeight: 700,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  );
}

function PanelTitle({ label, right, delay }) {
  return (
    <motion.div
      className="flex items-baseline justify-between mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay }}
    >
      <span
        className="deck-mono uppercase"
        style={{ fontSize: 'var(--fs-card-label)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--coral)' }}
      >
        {label}
      </span>
      <span
        className="deck-mono"
        style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: '0.14em', color: 'var(--cream-faint)' }}
      >
        {right}
      </span>
    </motion.div>
  );
}

const REGIMES = [
  {
    label: 'LOW DOSE',
    pedAUC: 4.82, adultAUC: 4.98,
    adLo: 2.8, adHi: 10.0,
    pedLo: 4.14, pedHi: 5.61,
    deltaLabel: '−3 %',
  },
  {
    label: 'HIGH DOSE',
    pedAUC: 9.15, adultAUC: 9.12,
    adLo: 4.5, adHi: 17.2,
    pedLo: 8.41, pedHi: 9.96,
    deltaLabel: '≈ 0 %',
  },
];
const CMAX_BOXES = [
  { group: 'LOW',  who: 'ADULT', xPct: 0.18, mid: 469, q1: 447, q3: 493, lo: 410, hi: 540 },
  { group: 'LOW',  who: 'PEDS',  xPct: 0.38, mid: 519, q1: 458, q3: 589, lo: 420, hi: 650 },
  { group: 'HIGH', who: 'ADULT', xPct: 0.64, mid: 830, q1: 757, q3: 909, lo: 700, hi: 1000 },
  { group: 'HIGH', who: 'PEDS',  xPct: 0.84, mid: 981, q1: 894, q3: 1080, lo: 820, hi: 1180 },
];
const DATA = {
  auc: {
    unit: 'μg·h/mL',
    yDomain: [2, 16],
    yTicks: [2, 4, 6, 8, 10, 12, 14, 16],
    groups: [
      { label: 'NO AE',      n: 18, min: 3.5, q1: 4.1, median: 7.8, q3: 8.5, max: 11.5 },
      { label: 'RELATED AE', n: 15, min: 3.5, q1: 4.5, median: 6.9, q3: 8.9, max: 14.8 },
    ],
  },
  cmax: {
    unit: 'ng/mL',
    yDomain: [200, 1600],
    yTicks: [200, 400, 600, 800, 1000, 1200, 1400, 1600],
    groups: [
      { label: 'NO AE',      n: 18, min: 310, q1: 490, median: 710, q3: 1000, max: 1440 },
      { label: 'RELATED AE', n: 15, min: 380, q1: 560, median: 720, q3: 950,  max: 1170 },
    ],
  },
};

function EfficacyPanel({ tk, D }) {
  const W = 600, H = 240;
  const m = { top: 20, right: 16, bottom: 38, left: 44 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;
  
  const panelW = (iw - 12) / 2;
  
  const x = d3.scaleLinear().domain([2, 22]).range([0, panelW]);
  const y = d3.scaleLinear().domain([-200, 500]).range([ih, 0]);
  
  const xTicks = [5, 10, 15, 20];
  const yTicks = [-200, -100, 0, 100, 200, 300, 400, 500];

  const { peds, adults } = useMemo(() => {
    let s = 42;
    const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const nrand = () => Math.sqrt(-2 * Math.log(r() || 0.001)) * Math.cos(2 * Math.PI * (r() || 0.001));
    
    const peds = [];
    for(let i=0; i<15; i++) {
       peds.push({ x: 3 + r()*4, y: 50 + nrand()*80, type: 'low' }); 
       peds.push({ x: 7.5 + r()*3.5, y: 10 + nrand()*40, type: 'high' });
    }
    peds.push({ x: 14.8, y: 220, type: 'high' });
    
    const adults = [];
    for(let i=0; i<90; i++) {
       adults.push({ x: 3.5 + r()*4.5 + nrand(), y: 30 + nrand()*100, type: 'low' }); 
       adults.push({ x: 7 + r()*8 + nrand()*1.5, y: 40 + nrand()*80, type: 'high' }); 
    }
    return { peds, adults };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
       <div className="flex items-center justify-center gap-4 mb-2 deck-mono" style={{ fontSize: '8px', color: 'var(--cream-muted)' }}>
          <div className="flex items-center gap-1"><div style={{ width: 6, height: 6, border: '1.5px solid var(--coral)', borderRadius: '50%' }}/> Pediatric low dose</div>
          <div className="flex items-center gap-1"><div style={{ width: 6, height: 6, border: '1.5px solid #8CC63F', borderRadius: '50%' }}/> Pediatric high dose</div>
          <div className="flex items-center gap-1"><div style={{ width: 6, height: 6, border: '1.5px solid #2E3192', borderRadius: '50%' }}/> 5 mg adult dose</div>
          <div className="flex items-center gap-1"><div style={{ width: 6, height: 6, border: '1.5px solid #00AEEF', borderRadius: '50%' }}/> 10 mg adult dose</div>
       </div>
       
       <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ flex: 1, minHeight: 0 }}>
         <g transform={`translate(${m.left},${m.top})`}>
           {yTicks.map((v) => (
             <g key={`ty-${v}`}>
               <line x1={0} x2={-4} y1={y(v)} y2={y(v)} stroke="var(--cream-faint)" strokeWidth={0.5} />
               <text x={-6} y={y(v) + 4} textAnchor="end" fill={tk('--cream-muted')} fontSize={10} fontFamily="var(--font-mono)">
                 {v}
               </text>
             </g>
           ))}
           <text x={-32} y={ih/2} transform={`rotate(-90, -32, ${ih/2})`} textAnchor="middle" fill="var(--cream-muted)" fontSize={8.5} fontWeight={600} fontFamily="var(--font-mono)">6MWD change (meters)</text>
         </g>

         <g transform={`translate(${m.left}, ${m.top})`}>
           <rect x={0} y={0} width={panelW} height={ih} fill="none" stroke="var(--cream-hairline)" strokeWidth={1} />
           <text x={panelW/2} y={-6} textAnchor="middle" fill="var(--cream-muted)" fontSize={9} fontFamily="var(--font-mono)">8-&lt;18 years</text>
           <line x1={0} x2={panelW} y1={y(0)} y2={y(0)} stroke="var(--cream-faint)" strokeWidth={0.8} />
           {xTicks.map(v => (
             <g key={`px-${v}`}>
               <line x1={x(v)} x2={x(v)} y1={ih} y2={ih+4} stroke="var(--cream-faint)" strokeWidth={0.5} />
               <text x={x(v)} y={ih+14} textAnchor="middle" fill="var(--cream-muted)" fontSize={8} fontFamily="var(--font-mono)">{v}</text>
             </g>
           ))}
           {peds.map((d, i) => (
             <circle key={`p-${i}`} cx={x(d.x)} cy={y(d.y)} r={2.5} fill="none" stroke={d.type === 'low' ? 'var(--coral)' : '#8CC63F'} strokeWidth={1.5} />
           ))}
         </g>

         <g transform={`translate(${m.left + panelW + 12}, ${m.top})`}>
           <rect x={0} y={0} width={panelW} height={ih} fill="none" stroke="var(--cream-hairline)" strokeWidth={1} />
           <text x={panelW/2} y={-6} textAnchor="middle" fill="var(--cream-muted)" fontSize={9} fontFamily="var(--font-mono)">Adult</text>
           <line x1={0} x2={panelW} y1={y(0)} y2={y(0)} stroke="var(--cream-faint)" strokeWidth={0.8} />
           {xTicks.map(v => (
             <g key={`ax-${v}`}>
               <line x1={x(v)} x2={x(v)} y1={ih} y2={ih+4} stroke="var(--cream-faint)" strokeWidth={0.5} />
               <text x={x(v)} y={ih+14} textAnchor="middle" fill="var(--cream-muted)" fontSize={8} fontFamily="var(--font-mono)">{v}</text>
             </g>
           ))}
           {adults.map((d, i) => (
             <circle key={`a-${i}`} cx={x(d.x)} cy={y(d.y)} r={2.5} fill="none" stroke={d.type === 'low' ? '#2E3192' : '#00AEEF'} strokeWidth={1.5} />
           ))}
         </g>

         <text x={m.left + panelW + 6} y={H - 4} textAnchor="middle" fill="var(--cream-muted)" fontSize={9} fontWeight={600} fontFamily="var(--font-mono)">Ambrisentan AUCss (μg·h/mL)</text>
       </svg>
    </div>
  )
}

export default function Cs1Pkpd() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10, headline: 0.25, subhead: 0.55,
    adultBand: 0.70, pedsBand: 0.85, pedsMed: 1.00, dots: 1.20,
    boxAdult: 1.80, boxPeds: 1.95, boxDelta: 2.40,
    axisA: 0.70, boxA: 0.85, guideA: 1.85,
    axisB: 1.80, boxB: 1.95, guideB: 3.10,
    closing: 4.35, payoff: 4.65,
  };

  const T = useTokens(['--coral', '--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline', '--bg']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={D.chrome}>Case 01 · PopPK · build & fit PART 2</Eyebrow>
      <Headline delay={D.headline} maxChars={50}>
        Exposure bridged; no clear E-R gradient.
      </Headline>
      <Subhead delay={D.subhead} maxChars={100} size="lead">
        Pediatric exposures land inside the adult target envelope, with no clear efficacy or safety gradient across observed exposure.
      </Subhead>

      <Viz>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', minHeight: 0, paddingTop: 'var(--space-2)' }}>
          
          <div className="deck-mono uppercase" style={{ background: 'color-mix(in srgb, var(--coral) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--coral) 40%, transparent)', borderRadius: 'var(--radius-sm)', color: 'var(--coral)', padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--fs-slide-pageno)', letterSpacing: '0.2em', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>PK MATCHING</div>

          {/* Top Row: Exposure Match (AUC and Cmax) */}
          <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-3)' }}>
            <div style={CHART_PANEL}>
              <PanelTitle label={<>AUC<sub>ss</sub> vs Body Weight (Target Attainment)</>} right={<ConclusionPill>PK MATCHED</ConclusionPill>} delay={D.adultBand} />
              <div style={CHART_PANEL_BODY}><AUCPanel tk={tk} D={D} /></div>
            </div>
            <div style={CHART_PANEL}>
              <PanelTitle label={<>C<sub>max,ss</sub> Match</>} right={<ConclusionPill>PK MATCHED</ConclusionPill>} delay={D.boxAdult} />
              <div style={CHART_PANEL_BODY}><CmaxPanel tk={tk} D={D} /></div>
            </div>
          </div>

          <div className="deck-mono uppercase" style={{ background: 'color-mix(in srgb, var(--coral) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--coral) 40%, transparent)', borderRadius: 'var(--radius-sm)', color: 'var(--coral)', padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--fs-slide-pageno)', letterSpacing: '0.2em', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: 'var(--space-1)' }}>PK-PD CONTEXT</div>

          {/* Bottom Row: Efficacy & Safety E-R */}
          <div style={{ flex: 1.3, minHeight: 0, display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 'var(--space-3)' }}>
            <div style={CHART_PANEL}>
              <PanelTitle label={<>Efficacy E-R: AUC<sub>ss</sub> vs 6MWD</>} right={<ConclusionPill color="var(--cyan)">NO CLEAR EFFICACY GRADIENT</ConclusionPill>} delay={D.axisA} />
              <div style={CHART_PANEL_BODY}>
                <EfficacyPanel tk={tk} D={D} />
              </div>
            </div>
            <div style={{ ...CHART_PANEL, padding: 'clamp(8px, 1vh, 16px)' }}>
              <PanelTitle label={<>Safety E-R: AE vs Exposure</>} right={<ConclusionPill color="var(--cyan)">NO CLEAR SAFETY GRADIENT</ConclusionPill>} delay={D.axisB} />
              <div style={{ ...CHART_PANEL_BODY, flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ flex: 1, minHeight: 0, width: '100%', position: 'relative' }}>
                  <BoxPanel tk={tk} letter="" title="" unit={DATA.auc.unit} data={DATA.auc} axisDelay={D.axisA} boxDelay={D.boxA} guideDelay={D.guideA} deltaLabel="Δ ≈ -12%" />
                  <div style={{ position: 'absolute', top: 4, left: 4, fontSize: '9px', fontWeight: 700, color: 'var(--cream)', opacity: 0.8 }} className="deck-mono">AUCss</div>
                </div>
                <div style={{ flex: 1, minHeight: 0, width: '100%', position: 'relative' }}>
                  <BoxPanel tk={tk} letter="" title="" unit={DATA.cmax.unit} data={DATA.cmax} axisDelay={D.axisB} boxDelay={D.boxB} guideDelay={D.guideB} deltaLabel="Δ ≈ +1%" />
                  <div style={{ position: 'absolute', top: 4, left: 4, fontSize: '9px', fontWeight: 700, color: 'var(--cream)', opacity: 0.8 }} className="deck-mono">Cmax,ss</div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Conclusion Card */}
          <div style={{ flex: '0 0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'color-mix(in srgb, var(--coral) 8%, transparent)', border: '1px solid var(--coral)', borderRadius: '4px', marginTop: 'var(--space-1)' }}>
            <span className="deck-mono" style={{ fontSize: '13px', letterSpacing: '0.08em', color: 'var(--coral)', fontWeight: 600, textTransform: 'uppercase' }}>
              CONCLUSION: PK MATCHING HELD; NO CLEAR EXPOSURE-RESPONSE GRADIENT IN OBSERVED RANGE
            </span>
          </div>

        </div>
      </Viz>

      <Footer
        kicker="Case 01 · PKPD & Bridging"
        source="Source · Okour et al. JCP 2023 · ICH E11A"
        delay={D.payoff}
      />
    </SlideGrid>
  );
}
function AUCPanel({ tk, D }) {
  const reduce = useReducedMotion();
  const W = 600, H = 340;
  const m = { top: 16, right: 24, bottom: 44, left: 48 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;
  const ease = [0.2, 0.7, 0.3, 1];

  // D3 scales
  const x = d3.scaleLinear().domain([18, 82]).range([0, iw]);
  const y = d3.scaleLinear().domain([0, 20]).range([ih, 0]);

  const { pedDots, bands } = useMemo(() => {
    let s = 9001;
    const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const nrand = () => {
      let u = 0, v = 0;
      while (!u) u = r();
      while (!v) v = r();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    const trueShapes = [
      { // LOW DOSE
        median: [
          {w: 20, c: 4.5}, {w: 25, c: 4.2}, {w: 30, c: 4.1}, {w: 35, c: 3.8},
          {w: 40, c: 4.8}, {w: 45, c: 6.0}, {w: 50, c: 5.5}, {w: 55, c: 5.0},
          {w: 65, c: 4.7}, {w: 80, c: 4.2}
        ],
        band: [
          {w: 20, lo: 3.5, hi: 5.5}, {w: 25, lo: 3.3, hi: 6.0}, {w: 30, lo: 3.1, hi: 6.8},
          {w: 35, lo: 3.0, hi: 7.5}, {w: 40, lo: 4.0, hi: 7.5}, {w: 45, lo: 4.5, hi: 7.2},
          {w: 50, lo: 4.2, hi: 6.5}, {w: 55, lo: 4.0, hi: 6.0}, {w: 65, lo: 3.9, hi: 5.6},
          {w: 80, lo: 3.7, hi: 5.1}
        ]
      },
      { // HIGH DOSE
        median: [
          {w: 20, c: 9.3}, {w: 25, c: 8.8}, {w: 30, c: 8.0}, {w: 35, c: 8.0},
          {w: 40, c: 8.5}, {w: 45, c: 9.2}, {w: 50, c: 10.0}, {w: 55, c: 10.5},
          {w: 65, c: 9.2}, {w: 80, c: 7.9}
        ],
        band: [
          {w: 20, lo: 7.0, hi: 12.0}, {w: 25, lo: 6.6, hi: 11.6}, {w: 30, lo: 6.2, hi: 11.4},
          {w: 35, lo: 6.0, hi: 11.2}, {w: 40, lo: 7.0, hi: 11.1}, {w: 45, lo: 7.6, hi: 11.0},
          {w: 50, lo: 7.8, hi: 12.2}, {w: 55, lo: 7.8, hi: 13.5}, {w: 65, lo: 7.6, hi: 11.8},
          {w: 80, lo: 7.4, hi: 9.8}
        ]
      }
    ];

    const bands = REGIMES.map((reg, i) => {
      return { reg, band: trueShapes[i].band, median: trueShapes[i].median };
    });

    const pedDots = [];
    for (let i = 0; i < 39; i++) {
      const w = 20 + r() * 57;
      const regIdx = i < 20 ? 0 : 1;
      const medShape = trueShapes[regIdx].median;
      let med_c = medShape[0].c;
      for (let j = 0; j < medShape.length - 1; j++) {
        if (w >= medShape[j].w && w <= medShape[j+1].w) {
           const pct = (w - medShape[j].w) / (medShape[j+1].w - medShape[j].w);
           med_c = medShape[j].c + pct * (medShape[j+1].c - medShape[j].c);
           break;
        }
      }
      const c = med_c * Math.exp(nrand() * 0.15);
      pedDots.push({ w, c, i });
    }
    return { pedDots, bands };
  }, []);

  // D3 path generators
  const area = d3.area().x((d) => x(d.w)).y0((d) => y(d.lo)).y1((d) => y(d.hi)).curve(d3.curveMonotoneX);
  const line = d3.line().x((d) => x(d.w)).y((d) => y(d.c)).curve(d3.curveMonotoneX);

  const xTicks = x.ticks(5);
  const yTicks = y.ticks(5);

  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)', width: '100%', height: '100%' }}>
      {bands.map(({ reg, band, median }, i) => {
        const dots = pedDots.filter((d) => (i === 0 ? d.i < 20 : d.i >= 20));
        return (
          <div key={`panel-${i}`} style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.14em', color: tk('--cream-muted'), marginBottom: '4px', fontWeight: 700 }}>
              {reg.label}
            </div>
            <svg
              className="w-full"
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ flex: 1, minHeight: 0 }}
            >
              <g transform={`translate(${m.left},${m.top})`}>
                {/* Grid */}
                {yTicks.map((v) => (
                  <line key={`gy-${v}`} x1={0} x2={iw} y1={y(v)} y2={y(v)}
                        stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.4} />
                ))}

                {/* Adult band */}
                <rect
                  x={0} width={iw}
                  y={y(reg.adHi)} height={y(reg.adLo) - y(reg.adHi)}
                  fill={tk('--cream')} fillOpacity={0.07}
                  stroke={tk('--cream-faint')} strokeWidth={1} strokeDasharray="3 4"
                />
                <text
                  x={iw - 6} y={y(reg.adHi) - 6}
                  textAnchor="end" fontFamily="var(--font-mono)" fontSize="9"
                  letterSpacing="0.1em" fill={tk('--cream-faint')}
                >
                  ADULT 5–95%
                </text>

                {/* Pediatric band + median */}
                <path
                  d={area(band)}
                  fill={tk('--coral')}
                  fillOpacity={0.20}
                />
                <motion.path
                  d={line(median)}
                  fill="none" stroke={tk('--coral')} strokeWidth={2.4}
                  strokeLinecap="round"
                  initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: reduce ? 0 : 1.2, ease, delay: reduce ? 0 : D.pedsMed + i * 0.1 }}
                />

                {/* Δ label at right edge of the median line */}
                <motion.text
                  x={x(78)} y={y(reg.pedAUC) - 10}
                  textAnchor="end" fontFamily="var(--font-mono)" fontSize="9"
                  letterSpacing="0.1em" fill={tk('--coral')} fontWeight={700}
                  initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: reduce ? 0 : D.pedsMed + 1.2 + i * 0.1 }}
                >
                  Δ {reg.deltaLabel} vs adult
                </motion.text>

                {/* Dots */}
                {dots.map((d) => {
                  const dotDelay = D.dots + (d.i % 8) * 0.025 + Math.floor(d.i / 8) * 0.06;
                  return (
                    <motion.circle
                      key={d.i}
                      cx={x(d.w)} cy={y(d.c)} r={4}
                      fill={tk('--cream')} fillOpacity={0.85}
                      stroke={tk('--coral')} strokeWidth={1}
                      initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: 'easeOut', delay: reduce ? 0 : dotDelay }}
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                  );
                })}

                {/* Y axis labels */}
                {yTicks.map((v) => (
                  <text key={`yl-${v}`} x={-8} y={y(v) + 3} textAnchor="end"
                        fontFamily="var(--font-mono)" fontSize="10" fill={tk('--cream-muted')}>
                    {v}
                  </text>
                ))}
                {/* X axis labels */}
                {xTicks.map((v) => (
                  <text key={`xl-${v}`} x={x(v)} y={ih + 16} textAnchor="middle"
                        fontFamily="var(--font-mono)" fontSize="10" fill={tk('--cream-muted')}>
                    {v}
                  </text>
                ))}

                {/* Axis titles */}
                <text x={iw / 2} y={ih + 36} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.14em" fill={tk('--cream-faint')}>
                  BODY WEIGHT (KG)
                </text>
                <text transform={`translate(-36, ${ih / 2}) rotate(-90)`} textAnchor="middle"
                      fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.14em" fill={tk('--cream-faint')}>
                  AUCss (μg·h/mL)
                </text>
              </g>
            </svg>
          </div>
        );
      })}
    </div>
  );
}

function CmaxPanel({ tk, D }) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const W = 680, H = 440;
  const m = { top: 40, right: 24, bottom: 56, left: 64 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  // D3 scale
  const y = d3.scaleLinear().domain([350, 1350]).range([ih, 0]);
  const yAt = (v) => y(v);

  const yTicks = y.ticks(5);
  const bw = 38;

  // Hover-tooltip state — presenter-controlled detail-on-demand.
  // zaj-slides override (2026-04-24): the skill defaults this chart to
  // STATIC; tooltips are an explicit per-chart authorization. They expose
  // the underlying five-number summary on hover without changing the
  // entrance choreography or competing with the static "exposure bridged"
  // assertion. See BoxTooltip for the rationale comment.
  const [hover, setHover] = useState(null);

  // Pair adults with peds for Δ% computation (low/high dose).
  // Index 0+1 = LOW (adult, peds), 2+3 = HIGH (adult, peds).
  const pairAdult = (i) => CMAX_BOXES[i % 2 === 0 ? i : i - 1];

  return (
    <svg
      className="w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ maxHeight: '100%' }}
    >
      <g transform={`translate(${m.left},${m.top})`}>
        {/* Grid */}
        {yTicks.map((v) => (
          <line key={`gy-${v}`} x1={0} x2={iw} y1={yAt(v)} y2={yAt(v)}
                stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.4} />
        ))}

        {/* Boxes — render static. Δ brackets drawing L→R below IS the
            in-chart emphasis. Peds-median halo pulse removed 2026-04-24
            per entrance-cleanup (was redundant noise against the boxes'
            own coral stroke weight).

            Hit-rect overlay added 2026-04-24 — invisible per-box hit
            target a bit larger than the visible glyph, so hover catches
            even when the cursor lands near the whiskers. Pointer-events
            on the visible glyph remain `none` so the wrapper handles all
            mouse events from one place. */}
        {CMAX_BOXES.map((b, i) => {
          const cx = b.xPct * iw;
          const isPeds = b.who === 'PEDS';
          const fill = isPeds ? tk('--coral') : tk('--cream');
          const fillOp = isPeds ? 0.24 : 0.10;
          const stroke = isPeds ? tk('--coral') : tk('--cream-muted');
          const strokeOp = isPeds ? 1 : 0.7;
          return (
            <g key={i} style={{ pointerEvents: 'none' }}>
              {/* Whisker */}
              <line x1={cx} x2={cx} y1={yAt(b.lo)} y2={yAt(b.hi)}
                    stroke={stroke} strokeOpacity={strokeOp} strokeWidth={1.4} />
              {/* Caps */}
              <line x1={cx - 12} x2={cx + 12} y1={yAt(b.lo)} y2={yAt(b.lo)}
                    stroke={stroke} strokeOpacity={strokeOp} strokeWidth={1.4} />
              <line x1={cx - 12} x2={cx + 12} y1={yAt(b.hi)} y2={yAt(b.hi)}
                    stroke={stroke} strokeOpacity={strokeOp} strokeWidth={1.4} />
              {/* Box */}
              <rect x={cx - bw / 2} y={yAt(b.q3)}
                    width={bw} height={yAt(b.q1) - yAt(b.q3)}
                    fill={fill} fillOpacity={fillOp}
                    stroke={stroke} strokeOpacity={strokeOp} strokeWidth={1.4} />
              {/* Median */}
              <line x1={cx - bw / 2} x2={cx + bw / 2} y1={yAt(b.mid)} y2={yAt(b.mid)}
                    stroke={stroke} strokeOpacity={strokeOp} strokeWidth={2.2} />
              {/* Who label */}
              <text x={cx} y={ih + 18} textAnchor="middle"
                    fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="0.14em"
                    fill={isPeds ? tk('--coral') : tk('--cream-muted')}>
                {b.who}
              </text>
              {/* Hover hit target — invisible, slightly larger than the
                  whisker span. Sits above the visible glyph in z-order so
                  it catches mouse over the entire box footprint. */}
              <rect
                x={cx - 18}
                y={yAt(b.hi) - 6}
                width={36}
                height={yAt(b.lo) - yAt(b.hi) + 12}
                fill="transparent"
                pointerEvents="all"
                style={{ cursor: 'crosshair' }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover((h) => (h === i ? null : h))}
              />
            </g>
          );
        })}

        {/* Tooltip — rendered AFTER boxes so it draws on top. Uses
            CMAX_BOXES + the hovered index. The HIGH-dose pair (boxes 2,3)
            sits high in the chart and would clip the panel chrome if
            anchored above; flip to `below` and anchor at the lower
            whisker so the tooltip drops into the empty bottom of the
            plot area without collision. */}
        {hover !== null && (() => {
          const b = CMAX_BOXES[hover];
          const cx = b.xPct * iw;
          const isPeds = b.who === 'PEDS';
          const accent = isPeds ? '--coral' : '--cream';
          const adult = pairAdult(hover);
          const dPct = isPeds
            ? ((b.mid / adult.mid - 1) * 100).toFixed(0)
            : null;
          const dStr = dPct !== null
            ? `${dPct >= 0 ? '+' : ''}${dPct}% vs adult`
            : null;
          const isHigh = hover >= 2;
          const tipH = dStr ? 110 : 86;
          const tipW = 188;
          // Clamp x so tooltip stays inside the inner plot area.
          const tipX = Math.max(tipW / 2, Math.min(iw - tipW / 2, cx));
          return (
            <BoxTooltip
              visible
              x={tipX}
              y={isHigh ? yAt(b.lo) : yAt(b.hi)}
              width={tipW}
              height={tipH}
              anchor={isHigh ? 'below' : 'above'}
              tk={tk}
              accent={accent}
              footerAccent={accent}
              title={`${b.who} · ${b.group} DOSE`}
              lines={[
                { label: 'median', value: `${b.mid} ng/mL` },
                { label: 'IQR', value: `${b.q1}–${b.q3}` },
                { label: '5–95%', value: `${b.lo}–${b.hi}` },
              ]}
              footer={dStr}
            />
          );
        })()}

        {/* Group labels (LOW DOSE · HIGH DOSE) */}
        <text x={(CMAX_BOXES[0].xPct + CMAX_BOXES[1].xPct) / 2 * iw} y={ih + 40}
              textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10"
              letterSpacing="0.22em" fill={tk('--cream-faint')}>
          LOW DOSE
        </text>
        <text x={(CMAX_BOXES[2].xPct + CMAX_BOXES[3].xPct) / 2 * iw} y={ih + 40}
              textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10"
              letterSpacing="0.22em" fill={tk('--cream-faint')}>
          HIGH DOSE
        </text>

        {/* Δ brackets — placed ABOVE the top-most whisker of each pair but
            ONLY a short rise (no collision with title above) */}
        {[
          { a: 0, b: 1, label: '+11 %', topY: Math.min(yAt(540), yAt(650)) - 12 },
          { a: 2, b: 3, label: '+18 %', topY: Math.min(yAt(1000), yAt(1180)) - 12 },
        ].map((br, i) => {
          const x1 = CMAX_BOXES[br.a].xPct * iw;
          const x2 = CMAX_BOXES[br.b].xPct * iw;
          const rise = 10;
          return (
            <g key={`br-${i}`}>
              {/* Bracket — pathLength draws L→R so the Δ appears to be
                  "measured" between the two boxes (in-chart emphasis). */}
              <motion.path
                d={`M ${x1},${br.topY + rise} L ${x1},${br.topY} L ${x2},${br.topY} L ${x2},${br.topY + rise}`}
                fill="none" stroke={tk('--coral')} strokeWidth={1.2}
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduce ? 0 : 0.8, ease, delay: reduce ? 0 : D.boxDelta + i * 0.15 }}
              />
              <motion.text
                x={(x1 + x2) / 2} y={br.topY - 6} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.14em"
                fill={tk('--coral')} fontWeight={700}
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: reduce ? 0 : D.boxDelta + i * 0.15 + 0.7 }}
              >
                {br.label}
              </motion.text>
            </g>
          );
        })}

        {/* Y labels */}
        {yTicks.map((v) => (
          <text key={`yl-${v}`} x={-10} y={yAt(v) + 4} textAnchor="end"
                fontFamily="var(--font-mono)" fontSize="10" fill={tk('--cream-muted')}>
            {v}
          </text>
        ))}
        <text transform={`translate(-46, ${ih / 2}) rotate(-90)`} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em" fill={tk('--cream-faint')}>
          Cmax,ss (ng/mL)
        </text>
      </g>
    </svg>
  );
}

function BoxPanel({ tk, letter, title, unit, data, axisDelay, boxDelay, guideDelay, deltaLabel }) {
  const W = 820, H = 460;
  const m = { top: 54, right: 36, bottom: 72, left: 78 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  const y = d3.scaleLinear().domain(data.yDomain).range([ih, 0]);
  const yTicks = data.yTicks;

  const xs = [iw * 0.30, iw * 0.70];
  const bw = 120;

  // Hover-tooltip state (zaj-slides override 2026-04-24, see BoxTooltip).
  // Tooltip exposes the digitized five-number summary on demand —
  // medians/IQRs are visible from the chart shapes, but the literal
  // numbers (3.5 / 4.1 / 7.8 …) only appear when the presenter mouses
  // a box. Static slide is unchanged for projection delivery.
  const [hover, setHover] = useState(null);
  const unitShort = unit;

  return (
    <div className="relative w-full h-full">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ maxHeight: '100%' }}
      >
        <g transform={`translate(${m.left},${m.top})`}>
          <g>
            {yTicks.map((v) => (
              <line
                key={v} x1={0} x2={iw} y1={y(v)} y2={y(v)}
                stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.5}
              />
            ))}
          </g>

          {yTicks.map((v) => (
            <text
              key={`yl-${v}`}
              x={-10} y={y(v) + 4} textAnchor="end"
              fontFamily="var(--font-mono)" fontSize="11"
              fill={tk('--cream-muted')}
            >
              {v}
            </text>
          ))}

          {/* Two boxes — per-box stagger 0.15s matches slide 11e Cmax bracket pace */}
          {data.groups.map((g, i) => (
            <BoxGlyph
              key={g.label}
              cx={xs[i]}
              y={y}
              bw={bw}
              group={g}
              tk={tk}
              delay={boxDelay + i * 0.15}
              isAE={i === 1}
              onHover={(active) => setHover(active ? i : (h) => (h === i ? null : h))}
            />
          ))}

          {/* Median-overlap guide — explicit `guideDelay` so MedianGuide A
              fully resolves before MedianGuide B starts (V3 strict
              serialization of emphasis beats). */}
          <MedianGuide
            tk={tk}
            xs={xs}
            y={y}
            medA={data.groups[0].median}
            medB={data.groups[1].median}
            delay={guideDelay}
            deltaLabel={deltaLabel}
          />

          {data.groups.map((g, i) => (
            <g key={`xl-${i}`}>
              <text
                x={xs[i]} y={ih + 26} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.18em"
                fontWeight={700}
                fill={i === 1 ? tk('--coral') : tk('--cream')}
              >
                {g.label}
              </text>
              <text
                x={xs[i]} y={ih + 44} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="10"
                fill={tk('--cream-faint')}
              >
                n = {g.n}
              </text>
            </g>
          ))}

          {hover !== null && (() => {
            const g = data.groups[hover];
            const isAE = hover === 1;
            const accent = isAE ? '--coral' : '--cyan';
            const peer = data.groups[hover === 0 ? 1 : 0];
            const dPct = ((g.median / peer.median - 1) * 100).toFixed(0);
            const dStr = `Δ median ${dPct >= 0 ? '+' : ''}${dPct}% vs ${peer.label}`;
            return (
              <BoxTooltip
                visible
                x={xs[hover]}
                y={y(g.max)}
                width={210}
                height={120}
                anchor="above"
                tk={tk}
                accent={accent}
                footerAccent={accent}
                title={`${g.label} · n = ${g.n}`}
                lines={[
                  { label: 'median', value: `${g.median} ${unitShort}` },
                  { label: 'IQR', value: `${g.q1}–${g.q3}` },
                  { label: 'range', value: `${g.min}–${g.max}` },
                ]}
                footer={dStr}
              />
            );
          })()}
        </g>
      </svg>
    </div>
  );
}

function BoxGlyph({ cx, y, bw, group, tk, delay, isAE, onHover }) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const stroke = isAE ? tk('--coral') : tk('--cyan');
  const fill = isAE ? tk('--coral') : tk('--cyan');

  const yMin = y(group.min);
  const yQ1 = y(group.q1);
  const yMed = y(group.median);
  const yQ3 = y(group.q3);
  const yMax = y(group.max);

  return (
    <g style={{ pointerEvents: 'none' }}>
      <line
        x1={cx} x2={cx} y1={yMin} y2={yMax}
        stroke={stroke} strokeWidth={1.6}
      />
      <line x1={cx - 22} x2={cx + 22} y1={yMin} y2={yMin}
            stroke={stroke} strokeWidth={1.6} />
      <line x1={cx - 22} x2={cx + 22} y1={yMax} y2={yMax}
            stroke={stroke} strokeWidth={1.6} />

      <rect
        x={cx - bw / 2} y={yQ3}
        width={bw} height={yQ1 - yQ3}
        fill={fill} fillOpacity={0.22}
        stroke={stroke} strokeWidth={1.8}
      />
      {/* Median — in-chart emphasis. Draws L→R via pathLength, sequenced
          by `delay` so the eye moves NO-AE → RELATED-AE (flat E-R story).
          Halo pulse stays removed (V2 audit, retained V3): sibling slides
          have no equivalent flourish; the pathLength draw carries the beat. */}
      <motion.path
        d={`M ${cx - bw / 2} ${yMed} L ${cx + bw / 2} ${yMed}`}
        fill="none" stroke={stroke} strokeWidth={3} strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 0.8, ease, delay: reduce ? 0 : delay }}
      />

      {onHover && (
        <rect
          x={cx - bw / 2 - 6}
          y={yMax - 8}
          width={bw + 12}
          height={yMin - yMax + 16}
          fill="transparent"
          pointerEvents="all"
          style={{ cursor: 'crosshair' }}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
        />
      )}
    </g>
  );
}

function MedianGuide({ tk, xs, y, medA, medB, delay, deltaLabel }) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const yA = y(medA), yB = y(medB);

  return (
    <g>
      <motion.path
        d={`M ${xs[0]} ${yA} L ${xs[1]} ${yB}`}
        fill="none" stroke={tk('--cream-faint')} strokeWidth={1}
        strokeDasharray="4 5"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 0.8, ease, delay: reduce ? 0 : delay }}
      />
      <motion.g
        transform={`translate(${(xs[0] + xs[1]) / 2},${(yA + yB) / 2 - 14})`}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reduce ? 0 : 0.4,
          ease,
          delay: reduce ? 0 : delay + 0.8,
        }}
      >
        <rect
          x={-60} y={-11} width={120} height={22}
          fill={tk('--bg')} stroke={tk('--cream-hairline')}
          strokeWidth={1} rx={0}
        />
        <text
          x={0} y={4} textAnchor="middle"
          fontFamily="var(--font-mono)" fontSize="10.5"
          letterSpacing="0.12em" fill={tk('--cream')} fontWeight={600}
        >
          {deltaLabel}
        </text>
      </motion.g>
    </g>
  );
}

function HeroDelta({ value, label, accent }) {
  return (
    <div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-numeral)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: accent ? 'var(--coral)' : 'var(--cream)',
          fontWeight: 700,
        }}
      >
        {value}
      </div>
      <div
        className="deck-mono uppercase mt-1"
        style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-muted)' }}
      >
        {label}
      </div>
    </div>
  );
}

