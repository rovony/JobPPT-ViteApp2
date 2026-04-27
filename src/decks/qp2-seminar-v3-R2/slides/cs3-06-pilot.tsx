// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

export default function CS3Pilot() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Workflow trace</Eyebrow>

      <Headline delay={0.25} maxChars={65}>
        One request becomes{' '}
        <span style={{ color: 'var(--sage)', fontStyle: 'italic', display: 'block' }}>a replayable evidence trail.</span>
      </Headline>

      <Subhead delay={0.45} maxChars={110} size="lead">
        The persuasive proof is not a speed claim. It is the trace: what ran, which tool produced it, who reviewed it, and how it can be replayed.
      </Subhead>

      <Viz>
        <div ref={ref} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
          <WorkflowSVG go={go} />
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Case 03 · Workflow trace"
        tagline="One request, deterministic execution, human gate, audit-backed report."
      />
    </SlideGrid>
  );
}

function WorkflowSVG({ go }) {
  const M = ({ delay = 0, yOffset = 10, children }) => (
    <motion.g
      initial={{ opacity: 0, y: yOffset }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.g>
  );

  return (
    <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', fontFamily: 'var(--font-sans)' }}>
      <defs>
        <marker id="arrow-r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="color-mix(in srgb, var(--cream) 50%, transparent)"/>
        </marker>
        <marker id="arrow-d" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
          <polygon points="0 0, 6 0, 3 6" fill="color-mix(in srgb, var(--cream) 50%, transparent)"/>
        </marker>
      </defs>
      
  

  <rect width="1280" height="720" fill="var(--panel)"/>

  
  <rect x="30" y="35" width="146" height="650" fill="color-mix(in srgb, var(--cream) 2%, transparent)"/>
  <rect x="322" y="35" width="366" height="650" fill="color-mix(in srgb, var(--cream) 2%, transparent)"/>
  <rect x="1054" y="35" width="196" height="650" fill="color-mix(in srgb, var(--cream) 2%, transparent)"/>

  
  <line x1="176" y1="35" x2="176" y2="685" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth={1} strokeDasharray="2 4"/>
  <line x1="322" y1="35" x2="322" y2="685" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth={1} strokeDasharray="2 4"/>
  <line x1="688" y1="35" x2="688" y2="685" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth={1} strokeDasharray="2 4"/>
  <line x1="1054" y1="35" x2="1054" y2="685" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth={1} strokeDasharray="2 4"/>

  
  <text x="103" y="58" textAnchor="middle" className="accent lane-header">ANALYST</text>
  <text x="249" y="58" textAnchor="middle" className="accent lane-header">SUPERVISOR</text>
  <text x="505" y="58" textAnchor="middle" className="accent lane-header">DOMAIN AGENTS</text>
  <text x="871" y="58" textAnchor="middle" className="accent lane-header">TOOLS</text>
  <text x="1152" y="58" textAnchor="middle" className="accent lane-header">AUDIT CHAIN</text>

  
  <line x1="30" y1="68" x2="1250" y2="68" stroke="#FFE14D" strokeOpacity="0.3" strokeWidth="1"/>

  
  
  

  
  <M delay={1.20} yOffset={10}>
    <rect x="40" y="80" width="125" height="45" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1" stroke="#FFE14D" strokeWidth="1"/>
    <text x="103" y="100" textAnchor="middle" className="cream-text step-text" fontSize="9">"Build a PopPK</text>
    <text x="103" y="113" textAnchor="middle" className="cream-text step-text" fontSize="9">model on this</text>
    <text x="103" y="121" textAnchor="middle" className="cream-text step-sub">dataset"</text>
  </M>

  
  <line x1="170" y1="100" x2="190" y2="100" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-r)"/>

  
  <M delay={1.21} yOffset={10}>
    <rect x="195" y="82" width="120" height="42" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="255" y="100" textAnchor="middle" className="cream-text step-text">Classify intent</text>
    <text x="255" y="115" textAnchor="middle" className="cream-text step-text">→ template</text>
  </M>

  
  <line x1="316" y1="103" x2="336" y2="103" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-r)"/>

  
  <M delay={1.21} yOffset={10}>
    <rect x="340" y="82" width="160" height="42" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="420" y="100" textAnchor="middle" className="cream-text step-text">Data Manager</text>
    <text x="420" y="115" textAnchor="middle" className="muted-text step-sub">Profile dataset</text>
  </M>

  <line x1="503" y1="103" x2="700" y2="103" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-r)"/>

  <M delay={1.21} yOffset={10}>
    <rect x="705" y="82" width="335" height="42" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="725" y="103" className="accent tool-id">T₁</text>
    <text x="755" y="103" fill="var(--cream)" fontSize="11" fontFamily="Courier New">profile_dataset(...)</text>
    <text x="725" y="118" fill="color-mix(in srgb, var(--cream) 60%, transparent)" fontSize="9" fontFamily="Raleway" fontStyle="italic">→ schema metadata, missingness, dose levels</text>
  </M>

  
  <M delay={1.21} yOffset={10}>
    <rect x="1064" y="82" width="180" height="42" rx="3" ry="3" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1" stroke="#4A4A52" strokeWidth="0.5"/>
    <text x="1075" y="100" fill="var(--sage)" fontSize="9" fontWeight="700">T₁ entry</text>
    <text x="1075" y="115" className="muted-text audit-hash">hash: 0x7a9f...e3c8</text>
  </M>

  
  <line x1="420" y1="125" x2="420" y2="142" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-d)"/>
  <M delay={1.37} yOffset={10}>
    <rect x="340" y="148" width="160" height="42" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="420" y="166" textAnchor="middle" className="cream-text step-text">NCA Agent</text>
    <text x="420" y="181" textAnchor="middle" className="muted-text step-sub">Compute exposure</text>
  </M>

  <line x1="503" y1="169" x2="700" y2="169" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-r)"/>

  <M delay={1.37} yOffset={10}>
    <rect x="705" y="148" width="335" height="42" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="725" y="169" className="accent tool-id">T₂</text>
    <text x="755" y="169" fill="var(--cream)" fontSize="11" fontFamily="Courier New">compute_auc_cmax(...)</text>
    <text x="725" y="184" fill="color-mix(in srgb, var(--cream) 60%, transparent)" fontSize="9" fontFamily="Raleway" fontStyle="italic">→ NCA summary across dose groups</text>
  </M>

  <M delay={1.37} yOffset={10}>
    <rect x="1064" y="148" width="180" height="42" rx="3" ry="3" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1" stroke="#4A4A52" strokeWidth="0.5"/>
    <text x="1075" y="166" fill="var(--sage)" fontSize="9" fontWeight="700">T₂ entry</text>
    <text x="1075" y="181" className="muted-text audit-hash">prev_hash: T₁ ← chain</text>
  </M>

  
  <line x1="420" y1="190" x2="420" y2="207" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-d)"/>
  <M delay={1.53} yOffset={10}>
    <rect x="340" y="213" width="160" height="32" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1" stroke="#FFE14D" strokeWidth="1"/>
    <text x="420" y="226" textAnchor="middle" className="cream-text step-text" fontSize="10">Modeler Manager</text>
    <text x="420" y="238" textAnchor="middle" className="muted-text step-sub" fontSize="8">Routes to PopPK Expert</text>
  </M>

  
  <line x1="420" y1="245" x2="420" y2="262" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-d)"/>
  <M delay={1.67} yOffset={10}>
    <rect x="340" y="268" width="160" height="55" rx="4" ry="4" fill="var(--sage)"/>
    <text x="420" y="287" textAnchor="middle" className="dark-text step-text" fontSize="12">PopPK Expert</text>
    <text x="420" y="302" textAnchor="middle" className="dark-text step-sub" fontSize="9">Structural model</text>
    <text x="420" y="314" textAnchor="middle" className="dark-text step-sub" fontSize="9">+ covariate screening</text>
  </M>

  <line x1="503" y1="285" x2="700" y2="285" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-r)"/>
  <line x1="503" y1="305" x2="700" y2="305" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-r)"/>

  <M delay={1.67} yOffset={10}>
    <rect x="705" y="268" width="335" height="25" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="725" y="285" className="accent tool-id">T₃</text>
    <text x="755" y="285" fill="var(--cream)" fontSize="11" fontFamily="Courier New">fit_2cmt_structural(...)</text>
  </M>
  <M delay={1.75} yOffset={10}>
    <rect x="705" y="298" width="335" height="25" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="725" y="315" className="accent tool-id">T₄</text>
    <text x="755" y="315" fill="var(--cream)" fontSize="11" fontFamily="Courier New">screen_covariates(WT, AGE, ...)</text>
  </M>

  <M delay={1.67} yOffset={10}>
    <rect x="1064" y="268" width="180" height="55" rx="3" ry="3" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1" stroke="#4A4A52" strokeWidth="0.5"/>
    <text x="1075" y="285" fill="var(--sage)" fontSize="9" fontWeight="700">T₃ entry</text>
    <text x="1075" y="298" className="muted-text audit-hash">prev_hash: T₂</text>
    <text x="1075" y="312" fill="var(--sage)" fontSize="9" fontWeight="700">T₄ entry</text>
  </M>

  
  
  

  <M delay={1.84} yOffset={10}>
    <rect x="30" y="335" width="1220" height="38" fill="var(--sage)"/>
    <text x="640" y="356" textAnchor="middle" className="dark-text gate-label">★ GATE 1 · BASE MODEL SELECTION</text>
    <text x="640" y="368" textAnchor="middle" className="dark-text gate-sub">Analyst confirms structural model before covariate work begins</text>
  </M>

  
  
  

  <line x1="420" y1="375" x2="420" y2="390" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-d)"/>
  <M delay={1.99} yOffset={10}>
    <rect x="340" y="395" width="160" height="32" rx="4" ry="4" fill="var(--sage)"/>
    <text x="420" y="410" textAnchor="middle" className="dark-text step-text">PopPK Expert</text>
    <text x="420" y="421" textAnchor="middle" className="dark-text step-sub" fontSize="9">Final estimation</text>
  </M>

  <line x1="503" y1="411" x2="700" y2="411" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-r)"/>

  <M delay={1.99} yOffset={10}>
    <rect x="705" y="395" width="335" height="32" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="725" y="412" className="accent tool-id">T₅</text>
    <text x="755" y="412" fill="var(--cream)" fontSize="11" fontFamily="Courier New">estimate_final_params(...)</text>
    <text x="725" y="423" fill="color-mix(in srgb, var(--cream) 60%, transparent)" fontSize="9" fontFamily="Raleway" fontStyle="italic">→ θ, η, ε estimates with %RSE</text>
  </M>

  <M delay={1.99} yOffset={10}>
    <rect x="1064" y="395" width="180" height="32" rx="3" ry="3" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1" stroke="#4A4A52" strokeWidth="0.5"/>
    <text x="1075" y="411" fill="var(--sage)" fontSize="9" fontWeight="700">T₅ entry</text>
    <text x="1075" y="423" className="muted-text audit-hash">prev_hash: T₄ ← chain</text>
  </M>

  
  
  

  <M delay={2.09} yOffset={10}>
    <rect x="30" y="437" width="1220" height="35" fill="var(--sage)"/>
    <text x="640" y="457" textAnchor="middle" className="dark-text gate-label">★ GATE 2 · COVARIATE FINALIZATION</text>
    <text x="640" y="469" textAnchor="middle" className="dark-text gate-sub">Analyst reviews retained covariates and inclusion rationale</text>
  </M>

  
  
  

  <M delay={2.22} yOffset={10}>
    <rect x="340" y="487" width="160" height="32" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="420" y="503" textAnchor="middle" className="cream-text step-text">QC Agent</text>
    <text x="420" y="514" textAnchor="middle" className="muted-text step-sub" fontSize="9">15-check diagnostic suite</text>
  </M>

  <line x1="503" y1="503" x2="700" y2="503" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-r)"/>

  <M delay={2.22} yOffset={10}>
    <rect x="705" y="487" width="335" height="32" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="725" y="504" className="accent tool-id">T₆</text>
    <text x="755" y="504" fill="var(--cream)" fontSize="11" fontFamily="Courier New">run_diagnostics(GOF, VPC, bootstrap)</text>
  </M>

  <M delay={2.22} yOffset={10}>
    <rect x="1064" y="487" width="180" height="32" rx="3" ry="3" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1" stroke="#4A4A52" strokeWidth="0.5"/>
    <text x="1075" y="503" fill="var(--sage)" fontSize="9" fontWeight="700">T₆ entry</text>
    <text x="1075" y="515" className="muted-text audit-hash">prev_hash: T₅</text>
  </M>

  
  
  

  <M delay={2.33} yOffset={10}>
    <rect x="30" y="530" width="1220" height="35" fill="var(--sage)"/>
    <text x="640" y="550" textAnchor="middle" className="dark-text gate-label">★ GATE 3 · FINAL MODEL DESIGNATION</text>
    <text x="640" y="562" textAnchor="middle" className="dark-text gate-sub">Analyst locks parameter estimates; triggers downstream simulation</text>
  </M>

  
  
  

  <M delay={2.45} yOffset={10}>
    <rect x="340" y="578" width="160" height="22" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="420" y="593" textAnchor="middle" className="cream-text step-text" fontSize="10">Simulator</text>
  </M>
  <M delay={2.45} yOffset={10}>
    <rect x="705" y="578" width="335" height="22" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="725" y="594" className="accent tool-id">T₇</text>
    <text x="755" y="594" fill="var(--cream)" fontSize="11" fontFamily="Courier New">target_attainment_sim(...)</text>
  </M>
  <line x1="503" y1="589" x2="700" y2="589" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-r)"/>
  <M delay={2.45} yOffset={10}>
    <rect x="1064" y="578" width="180" height="22" rx="3" ry="3" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1" stroke="#4A4A52" strokeWidth="0.5"/>
    <text x="1075" y="593" fill="var(--sage)" fontSize="9" fontWeight="700">T₇ entry</text>
  </M>

  <M delay={2.51} yOffset={10}>
    <rect x="340" y="605" width="160" height="22" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="420" y="620" textAnchor="middle" className="cream-text step-text" fontSize="10">Report Agent</text>
  </M>
  <M delay={2.51} yOffset={10}>
    <rect x="705" y="605" width="335" height="22" rx="4" ry="4" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1"/>
    <text x="725" y="621" className="accent tool-id">T₈</text>
    <text x="755" y="621" fill="var(--cream)" fontSize="11" fontFamily="Courier New">draft_m15_package(...)</text>
  </M>
  <line x1="503" y1="616" x2="700" y2="616" stroke="color-mix(in srgb, var(--cream) 50%, transparent)" strokeWidth={1.2} fill="none" markerEnd="url(#arrow-r)"/>
  <M delay={2.51} yOffset={10}>
    <rect x="1064" y="605" width="180" height="22" rx="3" ry="3" fill="color-mix(in srgb, var(--panel) 70%, transparent)" stroke="color-mix(in srgb, var(--cream) 15%, transparent)" strokeWidth="1" stroke="#4A4A52" strokeWidth="0.5"/>
    <text x="1075" y="620" fill="var(--sage)" fontSize="9" fontWeight="700">T₈ entry</text>
  </M>

  
  
  

  <M delay={2.59} yOffset={10}>
    <rect x="30" y="637" width="1220" height="35" fill="var(--sage)"/>
    <text x="640" y="657" textAnchor="middle" className="dark-text gate-label">★ GATE 4 · REPORT APPROVAL</text>
    <text x="640" y="669" textAnchor="middle" className="dark-text gate-sub">Nothing leaves the platform without explicit analyst sign-off</text>
  </M>

  
  <text x="640" y="700" textAnchor="middle" fill="var(--cream)" fontSize="12" fontStyle="italic">
    Every gate produces a record: who approved, when, what alternatives were considered, what the rationale was.
  </text>
  <text x="640" y="715" textAnchor="middle" fill="var(--sage)" fontSize="11" fontWeight="700">
    The audit trail is a regulatory artifact, not a side effect.
  </text>

    </svg>
  );
}
