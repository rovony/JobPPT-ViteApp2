// @ts-nocheck
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  PhoneCall, Database, ShieldCheck, FileText,
  Network, LineChart, Cpu, Activity, Lock, Check, Coffee, Trophy,
  Terminal,
} from 'lucide-react';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

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
        Three agent levels · cyclical routing · SchemaExtractor privacy · PharmState memory bus.
      </Subhead>

      <Viz>
        <div ref={ref} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
          <MovieScene go={go} />
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Case 03 · Workflow trace"
        tagline="13 specialized agents, 151 deterministic tools, cryptographic audit."
      />
    </SlideGrid>
  );
}

// ─────────────────────────────────────────────────────────────
// LAYOUT — horizontal flow above, PharmState bar at the bottom.
// All inter-agent signals run above the bar in a clear sightline.
// ─────────────────────────────────────────────────────────────

const CANVAS_W = 1600;
const CANVAS_H = 900;

const COL = {
  TIMELINE_X:    20,
  TIMELINE_W:    230,
  HUMAN_CX:      170,
  SUP_CX:        345,
  // L1 row — 5 domain agents in a horizontal line, well separated
  L1_CX: [555, 740, 925, 1110, 1295],
  // L2 modeling specialists — sit ABOVE the L1 row, near Modeler Mgr (L1 idx 2)
  L2_POPPK_CX:   1040,
  L2_PKPD_CX:    1240,
  // PharmState bar (horizontal) — 6 buckets evenly spaced
  PS_BAR_X1:     250,
  PS_BAR_X2:     1560,
  PS_CX: [350, 565, 780, 995, 1210, 1430],
  // Tools sit just to the right of L2 PopPK
  TOOLS_CX:      1430,
};

const ROW = {
  AVATAR_CY:     400,    // human + supervisor — same row as L1
  L1_CY:         400,    // domain agents row
  L2_CY:         195,    // L2 specialists row (above L1)
  PS_BAR_Y1:     560,
  PS_BAR_Y2:     820,
  PS_CY:         700,    // bucket center
};

const NODE = {
  AVATAR_SIZE:   100,
  L1_SIZE:       70,
  L2_SIZE:       80,
};

// Sequence timing (seconds). Total ~180 s. Slow + readable.
const SEQ = {
  bg: 0.2,
  nodes: 1.0,
  s1: 4.0,    // Human request
  s2: 22.0,   // L0 routes + privacy strip
  s3: 42.0,   // L1 Data Mgr profiles → PharmState
  s4: 60.0,   // L1 NCA computes → PharmState
  s5: 80.0,   // L1 Modeler Mgr → L2 PopPK base fit → PharmState
  s6: 104.0,  // Review gate back to human
  s7: 124.0,  // Human approves → final estimation (Modeler → PopPK)
  s8: 148.0,  // QC diagnostics
  s9: 168.0,  // Report + crypto audit + done
};

const TIMELINE_STEPS = [
  { id: 's1', time: SEQ.s1, label: '1 · Human request' },
  { id: 's2', time: SEQ.s2, label: '2 · Schema-only privacy' },
  { id: 's3', time: SEQ.s3, label: '3 · Data Mgr profiles' },
  { id: 's4', time: SEQ.s4, label: '4 · NCA computes' },
  { id: 's5', time: SEQ.s5, label: '5 · Modeler → PopPK base fit' },
  { id: 's6', time: SEQ.s6, label: '6 · Review gate → human' },
  { id: 's7', time: SEQ.s7, label: '7 · Final estimation' },
  { id: 's8', time: SEQ.s8, label: '8 · QC · 15 checks' },
  { id: 's9', time: SEQ.s9, label: '9 · Report + SHA-256 audit' },
];

// Map L1 cx → its bucket cx for clean vertical drops to PharmState.
const L1_TO_BUCKET_CX = {
  data:    COL.PS_CX[0],   // metadata
  nca:     COL.PS_CX[1],   // nca_summary
  // Modeler routes data via L2; results land in base/final via Modeler.
  poppk:   COL.PS_CX[2],   // base_model (S5)
  poppk2:  COL.PS_CX[3],   // final_estimates (S7)
  qc:      COL.PS_CX[4],   // qc_verdict
  report:  COL.PS_CX[5],   // audit_trail
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPOSITION
// ─────────────────────────────────────────────────────────────

function MovieScene({ go }) {
  const outerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [time, setTime] = useState(0);

  useLayoutEffect(() => {
    if (!outerRef.current || typeof ResizeObserver === 'undefined') return;
    const el = outerRef.current;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      const next = Math.min(width / CANVAS_W, height / CANVAS_H);
      setScale((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!go) return;
    const start = Date.now();
    let frame;
    const update = () => {
      setTime((Date.now() - start) / 1000);
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [go]);

  const currentStep = TIMELINE_STEPS.slice().reverse().find((s) => time >= s.time)?.id || null;
  const human = computeHumanState(time);
  const supervisor = computeSupervisorState(time);
  const activeAgentId = computeActiveAgent(time);

  // Convenience anchors
  const HUMAN = { x: COL.HUMAN_CX, y: ROW.AVATAR_CY };
  const SUP   = { x: COL.SUP_CX,   y: ROW.AVATAR_CY };
  const L1 = {
    data:    { x: COL.L1_CX[0], y: ROW.L1_CY },
    nca:     { x: COL.L1_CX[1], y: ROW.L1_CY },
    modeler: { x: COL.L1_CX[2], y: ROW.L1_CY },
    qc:      { x: COL.L1_CX[3], y: ROW.L1_CY },
    report:  { x: COL.L1_CX[4], y: ROW.L1_CY },
  };
  const L2 = {
    poppk: { x: COL.L2_POPPK_CX, y: ROW.L2_CY },
    pkpd:  { x: COL.L2_PKPD_CX,  y: ROW.L2_CY },
  };

  return (
    <div ref={outerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: `calc(50% - ${(CANVAS_H * scale) / 2}px)`,
        left: `calc(50% - ${(CANVAS_W * scale) / 2}px)`,
        width: CANVAS_W, height: CANVAS_H,
        transform: `scale(${scale})`, transformOrigin: 'top left',
      }}>

        {/* TIMELINE rail (left) */}
        <Timeline go={go} time={time} currentStep={currentStep} />

        {/* PHARMSTATE BAR backdrop (drawn behind everything else) */}
        <PharmStateBar />

        {/* FLOW LINES (orthogonal · light-sprite packets) */}
        <svg viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>

          {/* S1 — Human → Supervisor (horizontal, short) */}
          <Flow from={[HUMAN.x + 50, HUMAN.y]} to={[SUP.x - 50, SUP.y]}
            mode="hv" go={go} trigger={SEQ.s1 + 4} duration={3} color="var(--coral)" />

          {/* S2 — Supervisor → Data Mgr + NCA (parallel kickoff) */}
          <Flow from={[SUP.x + 50, SUP.y]} to={[L1.data.x, L1.data.y - 35]}
            mode="hv" go={go} trigger={SEQ.s2 + 5} duration={3} color="var(--cyan)" overTop />
          <Flow from={[SUP.x + 50, SUP.y]} to={[L1.nca.x, L1.nca.y - 35]}
            mode="hv" go={go} trigger={SEQ.s2 + 7} duration={3} color="var(--cyan)" overTop />

          {/* S3 — Data Mgr → bucket 0 (drop into PharmState) */}
          <Flow from={[L1.data.x, L1.data.y + 35]} to={[L1_TO_BUCKET_CX.data, ROW.PS_CY]}
            mode="vh" go={go} trigger={SEQ.s3 + 4} duration={3} color="var(--sage)" />

          {/* S4 — NCA → bucket 1 */}
          <Flow from={[L1.nca.x, L1.nca.y + 35]} to={[L1_TO_BUCKET_CX.nca, ROW.PS_CY]}
            mode="vh" go={go} trigger={SEQ.s4 + 4} duration={3} color="var(--sage)" />

          {/* S5 — Supervisor → Modeler Mgr (L1) → PopPK Expert (L2)
                    PopPK runs base fit → returns to Modeler → bucket 2 (base_model) */}
          <Flow from={[SUP.x + 50, SUP.y]} to={[L1.modeler.x, L1.modeler.y - 35]}
            mode="hv" go={go} trigger={SEQ.s5} duration={2.5} color="var(--cyan)" overTop />
          <Flow from={[L1.modeler.x, L1.modeler.y - 35]} to={[L2.poppk.x, L2.poppk.y + 40]}
            mode="vh" go={go} trigger={SEQ.s5 + 2.5} duration={2.5} color="var(--amber)" />
          <Flow from={[L2.poppk.x, L2.poppk.y + 40]} to={[L1.modeler.x, L1.modeler.y - 35]}
            mode="vh" go={go} trigger={SEQ.s5 + 8} duration={2} color="var(--amber)" reverse />
          <Flow from={[L1.modeler.x, L1.modeler.y + 35]} to={[L1_TO_BUCKET_CX.poppk, ROW.PS_CY]}
            mode="vh" go={go} trigger={SEQ.s5 + 11} duration={2.5} color="var(--sage)" />

          {/* S6 — REVIEW GATE — bucket 2 → Supervisor (read) → Human (review) */}
          <Flow from={[L1_TO_BUCKET_CX.poppk, ROW.PS_CY]} to={[SUP.x, SUP.y + 50]}
            mode="vh" go={go} trigger={SEQ.s6} duration={3} color="var(--coral)" reverse />
          <Flow from={[SUP.x - 50, SUP.y]} to={[HUMAN.x + 50, HUMAN.y]}
            mode="hv" go={go} trigger={SEQ.s6 + 3} duration={3} color="var(--coral)" />

          {/* S7 — Human → Sup → Modeler Mgr → PopPK → Modeler → bucket 3 (final) */}
          <Flow from={[HUMAN.x + 50, HUMAN.y]} to={[SUP.x - 50, SUP.y]}
            mode="hv" go={go} trigger={SEQ.s7 + 2} duration={2.5} color="var(--sage)" />
          <Flow from={[SUP.x + 50, SUP.y]} to={[L1.modeler.x, L1.modeler.y - 35]}
            mode="hv" go={go} trigger={SEQ.s7 + 5} duration={2.5} color="var(--cyan)" overTop />
          <Flow from={[L1.modeler.x, L1.modeler.y - 35]} to={[L2.poppk.x, L2.poppk.y + 40]}
            mode="vh" go={go} trigger={SEQ.s7 + 8} duration={2.5} color="var(--amber)" />
          <Flow from={[L2.poppk.x, L2.poppk.y + 40]} to={[L1.modeler.x, L1.modeler.y - 35]}
            mode="vh" go={go} trigger={SEQ.s7 + 12} duration={2} color="var(--amber)" reverse />
          <Flow from={[L1.modeler.x, L1.modeler.y + 35]} to={[L1_TO_BUCKET_CX.poppk2, ROW.PS_CY]}
            mode="vh" go={go} trigger={SEQ.s7 + 14} duration={2.5} color="var(--sage)" />

          {/* S8 — Supervisor → QC → bucket 4 */}
          <Flow from={[SUP.x + 50, SUP.y]} to={[L1.qc.x, L1.qc.y - 35]}
            mode="hv" go={go} trigger={SEQ.s8} duration={2.5} color="var(--cyan)" overTop />
          <Flow from={[L1.qc.x, L1.qc.y + 35]} to={[L1_TO_BUCKET_CX.qc, ROW.PS_CY]}
            mode="vh" go={go} trigger={SEQ.s8 + 6} duration={2.5} color="var(--sage)" />

          {/* S9 — Supervisor → Report → bucket 5 (audit) → Supervisor → Human */}
          <Flow from={[SUP.x + 50, SUP.y]} to={[L1.report.x, L1.report.y - 35]}
            mode="hv" go={go} trigger={SEQ.s9} duration={2.5} color="var(--cyan)" overTop />
          <Flow from={[L1.report.x, L1.report.y + 35]} to={[L1_TO_BUCKET_CX.report, ROW.PS_CY]}
            mode="vh" go={go} trigger={SEQ.s9 + 4} duration={2.5} color="var(--sage)" />
          <Flow from={[SUP.x - 50, SUP.y]} to={[HUMAN.x + 50, HUMAN.y]}
            mode="hv" go={go} trigger={SEQ.s9 + 8} duration={3} color="var(--sage)" />
        </svg>

        {/* NODES + AVATARS + BUCKETS */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>

          {/* PharmState header — anchored to the LEFT edge of the bar so it
              never collides with the L1 agent labels above. */}
          <div style={{
            position: 'absolute',
            left: COL.PS_BAR_X1 + 18,
            top: ROW.PS_BAR_Y1 + 14,
            display: 'flex', alignItems: 'center', gap: 10,
            zIndex: 6,
          }}>
            <motion.div
              initial={{ opacity: 0 }} animate={go ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: SEQ.nodes }}
              className="deck-display"
              style={{
                color: 'var(--cyan)', fontSize: 14, fontWeight: 800, letterSpacing: '0.18em',
                padding: '4px 10px', borderRadius: 6,
                background: 'color-mix(in srgb, var(--cyan) 14%, transparent)',
                border: '1px solid color-mix(in srgb, var(--cyan) 45%, transparent)',
              }}>
              PHARMSTATE
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} animate={go ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: SEQ.nodes + 0.2 }}
              className="deck-mono"
              style={{ color: 'var(--cyan)', fontSize: 10, opacity: 0.75, letterSpacing: '0.04em' }}>
              central typed memory bus · 34 fields
            </motion.div>
          </div>

          {/* PharmState buckets (inline within the bar) */}
          <Bucket cx={COL.PS_CX[0]} active={time > SEQ.s3 + 7} label="dataset_metadata" val="245 subj · 4,812 obs · BLQ 8.3%" color="var(--cyan)" />
          <Bucket cx={COL.PS_CX[1]} active={time > SEQ.s4 + 7} label="nca_summary"        val="AUC · Cmax · t½ · CL/F" color="var(--amber)" />
          <Bucket cx={COL.PS_CX[2]} active={time > SEQ.s5 + 13} label="base_model"         val="2-CMT · 1st-order absorption" color="var(--amber)" />
          <Bucket cx={COL.PS_CX[3]} active={time > SEQ.s7 + 16} label="final_estimates"    val="CL = 4.2 L/h · Vc = 32 L" color="var(--sage)" />
          <Bucket cx={COL.PS_CX[4]} active={time > SEQ.s8 + 8}  label="qc_verdict"         val="PASS · 15 / 15 checks" color="var(--sage)" />
          <Bucket cx={COL.PS_CX[5]} active={time > SEQ.s9 + 6}  label="audit_trail"        val="SHA-256 chain intact" color="var(--cream)" />

          {/* HUMAN avatar */}
          <Avatar
            cx={COL.HUMAN_CX} cy={ROW.AVATAR_CY}
            size={NODE.AVATAR_SIZE}
            name="ANALYST" role="Human-in-the-loop"
            face={human.face} status={human.status} accent={human.color}
            isTalking={human.talking}
            ring={time >= SEQ.s6 && time < SEQ.s7 ? 'var(--coral)' : null}
            sleeping={human.sleeping}
            celebrating={human.celebrating}
            phone={false}
            delay={SEQ.nodes} go={go} />

          {/* SUPERVISOR avatar */}
          <Avatar
            cx={COL.SUP_CX} cy={ROW.AVATAR_CY}
            size={NODE.AVATAR_SIZE}
            name="SUPERVISOR" role="L0 Orchestrator"
            face={supervisor.face} status={supervisor.status} accent={supervisor.color}
            isTalking={supervisor.talking}
            ring={supervisor.ringing ? 'var(--amber)' : null}
            phone={supervisor.phone}
            delay={SEQ.nodes} go={go} />

          {/* L1 DOMAIN AGENTS — horizontal row */}
          <AgentNode cx={COL.L1_CX[0]} cy={ROW.L1_CY} size={NODE.L1_SIZE}
            icon={Database} level="L1 AGENT" label="DATA MGR" status="14 tools"
            active={activeAgentId === 'data'} delay={SEQ.nodes} go={go} />
          <AgentNode cx={COL.L1_CX[1]} cy={ROW.L1_CY} size={NODE.L1_SIZE}
            icon={LineChart} level="L1 AGENT" label="NCA AGENT" status="12 tools"
            active={activeAgentId === 'nca'} delay={SEQ.nodes} go={go} />
          <AgentNode cx={COL.L1_CX[2]} cy={ROW.L1_CY} size={NODE.L1_SIZE}
            icon={Network} level="L1 AGENT" label="MODELER MGR" status="5 tools · routes L2"
            active={activeAgentId === 'modeler'} delay={SEQ.nodes} go={go} />
          <AgentNode cx={COL.L1_CX[3]} cy={ROW.L1_CY} size={NODE.L1_SIZE}
            icon={ShieldCheck} level="L1 AGENT" label="QC AGENT" status="12 tools"
            active={activeAgentId === 'qc'} delay={SEQ.nodes} go={go} />
          <AgentNode cx={COL.L1_CX[4]} cy={ROW.L1_CY} size={NODE.L1_SIZE}
            icon={FileText} level="L1 AGENT" label="REPORT AGENT" status="10 tools"
            active={activeAgentId === 'report'} delay={SEQ.nodes} go={go} />

          {/* L2 SPECIALISTS — sit ABOVE Modeler Mgr (so the L1→L2 hop is short and obvious) */}
          <AgentNode cx={COL.L2_POPPK_CX} cy={ROW.L2_CY} size={NODE.L2_SIZE}
            icon={Cpu} level="L2 SPECIALIST" label="PopPK EXPERT" status="18 tools"
            color="var(--amber)"
            active={activeAgentId === 'poppk'} delay={SEQ.nodes} go={go} />
          <AgentNode cx={COL.L2_PKPD_CX} cy={ROW.L2_CY} size={NODE.L2_SIZE - 6}
            icon={Activity} level="L2 SPECIALIST" label="PKPD EXPERT" status="14 tools"
            color="var(--amber)" opacity={0.32}
            active={false} delay={SEQ.nodes} go={go} />

          {/* Tool badges next to PopPK */}
          <ToolBox cx={COL.L2_POPPK_CX + 130} cy={ROW.L2_CY - 22} label="fit_struct()" delay={SEQ.nodes} go={go} />
          <ToolBox cx={COL.L2_POPPK_CX + 130} cy={ROW.L2_CY + 22} label="estimate()" delay={SEQ.nodes} go={go} />

          {/* Privacy badge near Supervisor */}
          <PrivacyBadge active={time >= SEQ.s2 + 1 && time < SEQ.s2 + 14} cx={COL.SUP_CX} cy={ROW.AVATAR_CY + 92} />

          {/* Step banner at top */}
          <StepBanner go={go} currentStep={currentStep} />

          {/* Speech bubbles in the safe zone above the avatar row */}
          {go && (
            <>
              <Bubble
                speaker="Analyst" role="Human" align="left" color="var(--coral)" face="stressed"
                anchorX={COL.HUMAN_CX} anchorY={ROW.AVATAR_CY - NODE.AVATAR_SIZE / 2}
                appearAt={SEQ.s1} duration={17} time={time}
                text="I'm buried — Phase 2, 5,847 rows. Need NCA + 2-CMT PopPK + a full FDA report by tomorrow. Can you run it?"
              />
              <Bubble
                speaker="Supervisor" role="L0 Orchestrator" align="right" color="var(--cyan)" face="sending"
                anchorX={COL.SUP_CX} anchorY={ROW.AVATAR_CY - NODE.AVATAR_SIZE / 2}
                appearAt={SEQ.s2} duration={19} time={time}
                text="Three intents detected. Routing through SchemaExtractor → metadata-only payload. Calling Data Mgr and NCA Agent now. Take a break."
              />
              <Bubble
                speaker="Supervisor" role="L0 Orchestrator" align="right" color="var(--coral)" face="alert"
                anchorX={COL.SUP_CX} anchorY={ROW.AVATAR_CY - NODE.AVATAR_SIZE / 2}
                appearAt={SEQ.s6} duration={18} time={time}
                text="REVIEW GATE. Modeler Mgr ran PopPK Expert and committed a 2-CMT base model. Approval required before final estimation."
              />
              <Bubble
                speaker="Analyst" role="Human" align="left" color="var(--amber)" face="reviewing"
                anchorX={COL.HUMAN_CX} anchorY={ROW.AVATAR_CY - NODE.AVATAR_SIZE / 2}
                appearAt={SEQ.s7} duration={17} time={time}
                text="Structural fit looks clean. Covariates are reasonable. Approved — proceed to final estimation."
              />
              <Bubble
                speaker="Supervisor" role="L0 Orchestrator" align="right" color="var(--sage)" face="done"
                anchorX={COL.SUP_CX} anchorY={ROW.AVATAR_CY - NODE.AVATAR_SIZE / 2}
                appearAt={SEQ.s9 + 5} duration={16} time={time}
                text="Cycle complete. FDA dossier compiled. SHA-256 audit chain intact. Replayable, deterministic, regulator-ready."
              />
              <Bubble
                speaker="Analyst" role="Human" align="left" color="var(--sage)" face="happy"
                anchorX={COL.HUMAN_CX} anchorY={ROW.AVATAR_CY - NODE.AVATAR_SIZE / 2}
                appearAt={SEQ.s9 + 12} duration={20} time={time}
                text="Brilliant. Zero hallucinations, fully audited, fully reproducible. I'm taking the rest of the day off."
              />

                      {/* Inline status texts near each agent — humorous + informative */}
                      <StatusText cx={COL.L1_CX[0]} cy={ROW.L1_CY + 118} delay={SEQ.s3} duration={12}
                        color="var(--cream-muted)"
                        text="› profiling 245 subjects · 8.3% BLQ" />
                      <StatusText cx={COL.L1_CX[1]} cy={ROW.L1_CY + 118} delay={SEQ.s4} duration={12}
                        color="var(--amber)"
                        text="› linear-up / log-down · AUC, Cmax, t½" />
                      <StatusText cx={COL.L2_POPPK_CX} cy={ROW.L2_CY + 105} delay={SEQ.s5 + 3} duration={14}
                        color="var(--amber)"
                        text="› fitting 2-CMT vs 1-CMT · OFV / AIC" />
                      <StatusText cx={COL.L2_POPPK_CX} cy={ROW.L2_CY + 105} delay={SEQ.s7 + 6} duration={14}
                        color="var(--amber)"
                        text="› final estimation · CL = 4.2 L/h · Vc = 32 L" />
                      <StatusText cx={COL.L1_CX[3]} cy={ROW.L1_CY + 118} delay={SEQ.s8 + 2} duration={12}
                        color="var(--sage)"
                        text="› 15-point diagnostic · PASS" />
                      <StatusText cx={COL.L1_CX[4]} cy={ROW.L1_CY + 118} delay={SEQ.s9 + 1} duration={14}
                        color="var(--cream-muted)"
                        text="› FDA DOCX + SHA-256 chain compile" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// EMOTION + STATE
// ─────────────────────────────────────────────────────────────

function computeHumanState(time) {
  let face = 'stressed';
  let color = 'var(--coral)';
  let status = 'BURIED · DEADLINE';
  let talking = false;
  let sleeping = false;
  let celebrating = false;

  if (time >= SEQ.s1 && time < SEQ.s1 + 17) {
    face = 'stressed'; color = 'var(--coral)'; status = 'SENDING REQUEST';
    talking = time < SEQ.s1 + 12;
  } else if (time >= SEQ.s1 + 17 && time < SEQ.s6) {
    face = 'eating'; color = 'var(--cream-muted)'; status = 'ON LUNCH BREAK';
    sleeping = true;
  } else if (time >= SEQ.s6 && time < SEQ.s7 + 17) {
    face = 'reviewing'; color = 'var(--amber)'; status = 'REVIEWING FIT';
    talking = time >= SEQ.s7 && time < SEQ.s7 + 14;
  } else if (time >= SEQ.s7 + 17 && time < SEQ.s9 + 12) {
    face = 'eating'; color = 'var(--cream-muted)'; status = 'AWAITING PIPELINE';
    sleeping = true;
  } else if (time >= SEQ.s9 + 12) {
    face = 'happy'; color = 'var(--sage)'; status = 'DAY OFF · APPROVED';
    talking = time >= SEQ.s9 + 12 && time < SEQ.s9 + 30;
    celebrating = true;
  }
  return { face, color, status, talking, sleeping, celebrating };
}

function computeSupervisorState(time) {
  let face = 'idle';
  let color = 'var(--cyan)';
  let status = 'LISTENING';
  let talking = false;
  let phone = false;
  let ringing = false;

  if (time >= SEQ.s2 && time < SEQ.s5) {
    face = 'sending'; color = 'var(--amber)'; status = 'DISPATCHING';
    phone = true; ringing = true;
    talking = time >= SEQ.s2 && time < SEQ.s2 + 18;
  } else if (time >= SEQ.s5 && time < SEQ.s6) {
    face = 'sending'; color = 'var(--amber)'; status = 'CALLING MODELER';
    phone = true; ringing = true;
  } else if (time >= SEQ.s6 && time < SEQ.s7) {
    face = 'alert'; color = 'var(--coral)'; status = 'AWAITING REVIEW';
    talking = time < SEQ.s6 + 17;
  } else if (time >= SEQ.s7 && time < SEQ.s9 + 5) {
    face = 'sending'; color = 'var(--amber)'; status = 'FINALIZING';
    phone = true; ringing = true;
  } else if (time >= SEQ.s9 + 5) {
    face = 'done'; color = 'var(--sage)'; status = 'COMPLETE';
    talking = time >= SEQ.s9 + 5 && time < SEQ.s9 + 22;
  }
  return { face, color, status, talking, phone, ringing };
}

function computeActiveAgent(time) {
  if (time >= SEQ.s3 && time < SEQ.s3 + 14) return 'data';
  if (time >= SEQ.s4 && time < SEQ.s4 + 14) return 'nca';
  if (time >= SEQ.s5 && time < SEQ.s5 + 4) return 'modeler';
  if (time >= SEQ.s5 + 4 && time < SEQ.s5 + 11) return 'poppk';
  if (time >= SEQ.s5 + 11 && time < SEQ.s5 + 14) return 'modeler';
  if (time >= SEQ.s7 && time < SEQ.s7 + 7) return 'modeler';
  if (time >= SEQ.s7 + 7 && time < SEQ.s7 + 14) return 'poppk';
  if (time >= SEQ.s7 + 14 && time < SEQ.s7 + 17) return 'modeler';
  if (time >= SEQ.s8 && time < SEQ.s8 + 12) return 'qc';
  if (time >= SEQ.s9 && time < SEQ.s9 + 12) return 'report';
  return null;
}

// ─────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────

function PharmStateBar() {
  return (
    <div style={{
      position: 'absolute',
      left: COL.PS_BAR_X1, right: CANVAS_W - COL.PS_BAR_X2,
      top: ROW.PS_BAR_Y1, height: ROW.PS_BAR_Y2 - ROW.PS_BAR_Y1,
      borderRadius: 18,
      background: 'linear-gradient(180deg, color-mix(in srgb, var(--cyan) 6%, transparent) 0%, color-mix(in srgb, var(--cyan) 2%, transparent) 100%)',
      border: '1.5px dashed color-mix(in srgb, var(--cyan) 50%, transparent)',
      boxShadow: 'inset 0 0 60px color-mix(in srgb, var(--cyan) 6%, transparent)',
      zIndex: 0,
    }} />
  );
}

// Orthogonal flow line. `overTop` routes via top of agents (avoids
// crossing nodes at the same y as the source/target).
function Flow({ from, to, color, trigger, duration = 2.5, go, mode = 'hv', stepX, stepY, reverse = false, overTop = false }) {
  const [x1, y1] = from;
  const [x2, y2] = to;

  let d = '';
  if (overTop && Math.abs(y1 - y2) < 8 && Math.abs(x1 - x2) > 80) {
    // route via top: go up by 80, traverse, drop down
    const top = Math.min(y1, y2) - 80;
    d = `M ${x1} ${y1} L ${x1} ${top} L ${x2} ${top} L ${x2} ${y2}`;
  } else {
    switch (mode) {
      case 'hv':
        d = `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}`; break;
      case 'vh':
        d = `M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`; break;
      case 'hvh': {
        const mx = stepX ?? (x1 + x2) / 2;
        d = `M ${x1} ${y1} L ${mx} ${y1} L ${mx} ${y2} L ${x2} ${y2}`; break;
      }
      case 'vhv': {
        const my = stepY ?? (y1 + y2) / 2;
        d = `M ${x1} ${y1} L ${x1} ${my} L ${x2} ${my} L ${x2} ${y2}`; break;
      }
      default:
        d = `M ${x1} ${y1} L ${x2} ${y2}`;
    }
  }

  return (
    <g>
      {/* Faint base path (always visible so the route is readable) */}
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.15"
        initial={{ pathLength: 0 }}
        animate={go ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: 'linear' }}
      />
      {/* LIGHT SPRITE — single bright dash that travels the full path */}
      {go && (
        <motion.path
          d={d}
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength={1000}
          strokeDasharray="42 2000"
          initial={{ strokeDashoffset: reverse ? -1042 : 42, opacity: 0 }}
          animate={{
            strokeDashoffset: reverse ? 42 : -1042,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            opacity: { duration, delay: trigger, ease: 'linear', times: [0, 0.06, 0.94, 1] },
            strokeDashoffset: { duration, delay: trigger, ease: 'linear' },
          }}
          style={{ filter: `drop-shadow(0 0 10px ${color})` }}
        />
      )}
      {/* Trailing glow particle (a softer second dash following the head) */}
      {go && (
        <motion.path
          d={d}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength={1000}
          strokeDasharray="14 2000"
          initial={{ strokeDashoffset: reverse ? -1080 : 80, opacity: 0 }}
          animate={{
            strokeDashoffset: reverse ? 80 : -1080,
            opacity: [0, 0.55, 0.55, 0],
          }}
          transition={{
            opacity: { duration, delay: trigger + 0.05, ease: 'linear', times: [0, 0.08, 0.92, 1] },
            strokeDashoffset: { duration, delay: trigger + 0.05, ease: 'linear' },
          }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      )}
    </g>
  );
}

// Avatar — large face, mouth animation, optional phone HUD, sleep Z's, celebration sparkles
function Avatar({ cx, cy, size, name, role, face, status, accent, isTalking, ring, phone, sleeping, celebrating, delay, go }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={go ? { opacity: 1, scale: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{
        position: 'absolute', left: cx, top: cy,
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        zIndex: 25,
      }}
    >
      <div className="deck-mono" style={{ color: accent, fontSize: 9, marginBottom: 6, letterSpacing: '0.08em', opacity: 0.85 }}>{role}</div>

      <div style={{ position: 'relative', width: size, height: size }}>
        {/* glow */}
        <div style={{
          position: 'absolute', inset: -8, borderRadius: '50%',
          background: `radial-gradient(circle, color-mix(in srgb, ${accent} 26%, transparent) 0%, transparent 70%)`,
          filter: 'blur(6px)',
        }} />
        {/* rotating ring (only when ring color provided) */}
        {ring && (
          <motion.div
            style={{
              position: 'absolute', inset: -12, borderRadius: '50%',
              border: `3px dashed ${ring}`, pointerEvents: 'none',
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          />
        )}
        {/* face disc */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: `color-mix(in srgb, var(--panel) 70%, ${accent} 22%)`,
          border: `2px solid ${accent}`,
          backdropFilter: 'blur(8px)',
          boxShadow: `0 0 28px color-mix(in srgb, ${accent} 25%, transparent)`,
          overflow: 'hidden',
        }}>
          <FaceSVG face={face} talking={isTalking} accent={accent} />
        </div>
        {/* phone HUD */}
        {phone && (
          <motion.div
            style={{
              position: 'absolute', right: -10, top: -10,
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--amber)',
              border: '2px solid var(--bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px color-mix(in srgb, var(--amber) 50%, transparent)',
            }}
            animate={{ rotate: [-12, 12, -12] }}
            transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
          >
            <PhoneCall size={16} color="var(--bg)" strokeWidth={2.5} />
          </motion.div>
        )}
        {/* sleeping Z's */}
        {sleeping && (
          <motion.div
            style={{
              position: 'absolute', right: -14, top: -22,
              fontFamily: 'var(--font-mono, monospace)', fontWeight: 800,
              color: 'var(--cyan)', fontSize: 18,
              textShadow: '0 0 10px color-mix(in srgb, var(--cyan) 60%, transparent)',
            }}
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            Zzz
          </motion.div>
        )}
        {/* celebration sparkles */}
        {celebrating && (
          <>
            <motion.div
              style={{ position: 'absolute', right: -16, top: -16 }}
              animate={{ rotate: [0, 20, 0, -20, 0], y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <Trophy size={22} color="var(--amber)" />
            </motion.div>
            {[0, 0.3, 0.6, 0.9].map((d) => (
              <motion.div key={d}
                style={{
                  position: 'absolute',
                  left: 16 + (d * 60), top: 4 + (d * 16),
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--amber)',
                }}
                animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, delay: d, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </div>

      <div className="deck-display" style={{ marginTop: 12, color: 'var(--cream)', fontSize: 14, fontWeight: 800, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{name}</div>
      <div className="deck-mono" style={{ color: accent, fontSize: 10, marginTop: 4, whiteSpace: 'nowrap', background: `color-mix(in srgb, ${accent} 14%, transparent)`, padding: '3px 8px', borderRadius: 8, fontWeight: 600 }}>{status}</div>
    </motion.div>
  );
}

function FaceSVG({ face, talking, accent }) {
  const eyeColor = 'var(--cream)';

  let leftEye = { cx: 36, cy: 44, ry: 4 };
  let rightEye = { cx: 60, cy: 44, ry: 4 };
  if (face === 'stressed' || face === 'alert' || face === 'sending') {
    leftEye.ry = 2.5; rightEye.ry = 2.5;
  } else if (face === 'happy') {
    leftEye.ry = 0; rightEye.ry = 0;
  }

  let mouthD = '';
  if (face === 'stressed') mouthD = 'M 32 70 Q 48 60 64 70';
  else if (face === 'alert') mouthD = 'M 36 68 L 60 68';
  else if (face === 'sending') mouthD = 'M 32 72 Q 48 64 64 72';
  else if (face === 'eating') mouthD = 'M 38 68 Q 48 80 58 68';
  else if (face === 'reviewing') mouthD = 'M 36 68 L 60 68';
  else if (face === 'done' || face === 'happy') mouthD = 'M 32 64 Q 48 80 64 64';
  else mouthD = 'M 36 68 L 60 68';

  return (
    <svg viewBox="0 0 96 96" width="100%" height="100%" style={{ display: 'block' }}>
      {(face === 'stressed' || face === 'alert' || face === 'sending') && (
        <>
          <path d="M 28 32 L 42 36" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 68 32 L 54 36" stroke={eyeColor} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      {face === 'happy' || face === 'done' ? (
        <>
          <path d="M 28 44 Q 36 36 44 44" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 52 44 Q 60 36 68 44" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx={leftEye.cx} cy={leftEye.cy} rx={4} ry={leftEye.ry} fill={eyeColor} />
          <ellipse cx={rightEye.cx} cy={rightEye.cy} rx={4} ry={rightEye.ry} fill={eyeColor} />
        </>
      )}
      {talking ? (
        <motion.path
          stroke={eyeColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ d: mouthD }}
          animate={{
            d: [
              mouthD,
              face === 'stressed' ? 'M 32 72 Q 48 65 64 72' :
              face === 'happy' || face === 'done' ? 'M 32 60 Q 48 84 64 60' :
              'M 36 68 Q 48 80 60 68',
              mouthD,
            ],
          }}
          transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
        />
      ) : (
        <path d={mouthD} stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {face === 'stressed' && (
        <motion.circle
          cx={70}
          r={3}
          fill="var(--cyan)"
          initial={{ cy: 56, opacity: 1 }}
          animate={{ cy: [56, 64, 56], opacity: [1, 0.6, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      )}
      {face === 'eating' && (
        <g>
          <circle cx={48} cy={70} r={9} fill="var(--coral-highlight)" />
          <circle cx={48} cy={70} r={3} fill={accent} />
        </g>
      )}
      {face === 'reviewing' && (
        <rect x="28" y="80" width="40" height="3" rx="1.5" fill="var(--amber)" />
      )}
    </svg>
  );
}

// Agent node — STATIC disc with rotating ring + halo when active.
function AgentNode({ cx, cy, size, icon: Icon, level, label, status, color = 'var(--cream-muted)', active, opacity = 1, delay, go }) {
  const tone = active ? 'var(--coral)' : color;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={go ? { opacity, scale: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{
        position: 'absolute', left: cx, top: cy,
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 22,
      }}
    >
      <div className="deck-mono" style={{ color: tone, fontSize: 9, marginBottom: 5, letterSpacing: '0.08em', opacity: 0.8 }}>{level}</div>

      <div style={{ position: 'relative', width: size, height: size }}>
        {active && (
          <motion.div
            style={{
              position: 'absolute', inset: -10, borderRadius: '50%',
              background: 'radial-gradient(circle, color-mix(in srgb, var(--coral) 32%, transparent) 0%, transparent 70%)',
              filter: 'blur(8px)', pointerEvents: 'none',
            }}
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
        )}
        {active && (
          <motion.div
            style={{
              position: 'absolute', inset: -14, borderRadius: '50%',
              border: '3px dashed var(--coral)', pointerEvents: 'none',
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          />
        )}
        <div style={{
          width: size, height: size, borderRadius: '50%',
          background: `color-mix(in srgb, var(--panel) 70%, ${tone} 18%)`,
          border: `2px solid ${tone}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 24px color-mix(in srgb, ${tone} 25%, transparent)`,
          backdropFilter: 'blur(6px)',
        }}>
          <Icon size={size * 0.45} color={tone} />
        </div>
      </div>

      <div className="deck-display" style={{ marginTop: 8, color: 'var(--cream)', fontSize: 12, fontWeight: 800, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{label}</div>
      <div className="deck-mono" style={{ color: tone, fontSize: 10, marginTop: 3, whiteSpace: 'nowrap', background: `color-mix(in srgb, ${tone} 14%, transparent)`, padding: '2px 7px', borderRadius: 8, fontWeight: 600 }}>{status}</div>
    </motion.div>
  );
}

function ToolBox({ cx, cy, label, delay, go }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={go ? { opacity: 0.85, x: 0 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{
        position: 'absolute', left: cx, top: cy,
        transform: 'translate(-50%, -50%)',
        background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
        border: '1px solid color-mix(in srgb, var(--cream) 18%, transparent)',
        borderRadius: 6, padding: '5px 10px',
        display: 'flex', alignItems: 'center', gap: 5,
        backdropFilter: 'blur(4px)',
        zIndex: 22,
      }}
    >
      <Terminal size={11} color="var(--cream-muted)" />
      <span className="deck-mono" style={{ color: 'var(--cream-muted)', fontSize: 10 }}>{label}</span>
    </motion.div>
  );
}

// PharmState bucket card — sits horizontally inside the bar
function Bucket({ cx, active, label, val, color = 'var(--cyan)' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0.22, y: 8 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 110, damping: 18 }}
      style={{
        position: 'absolute', left: cx, top: ROW.PS_CY,
        transform: 'translate(-50%, -50%)',
        width: 200,
        background: `color-mix(in srgb, var(--panel) 82%, ${color} 12%)`,
        border: `1.5px solid color-mix(in srgb, ${color} 55%, transparent)`,
        borderRadius: 12,
        padding: '12px 14px',
        backdropFilter: 'blur(8px)',
        boxShadow: active ? `0 8px 28px color-mix(in srgb, ${color} 30%, transparent), inset 0 0 0 1px color-mix(in srgb, ${color} 35%, transparent)` : 'none',
        zIndex: 5,
      }}
    >
      <div className="deck-mono" style={{ fontSize: 10, color: 'var(--cream-muted)', marginBottom: 4, letterSpacing: '0.06em' }}>{label}</div>
      <div className="deck-mono" style={{ fontSize: 12, color, fontWeight: 700, lineHeight: 1.3 }}>{val}</div>
    </motion.div>
  );
}

function PrivacyBadge({ active, cx, cy }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            position: 'absolute', left: cx, top: cy,
            transform: 'translate(-50%, 0)',
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 12px', borderRadius: 999,
            background: 'color-mix(in srgb, var(--cyan) 14%, transparent)',
            border: '1px solid color-mix(in srgb, var(--cyan) 50%, transparent)',
            zIndex: 24,
          }}
        >
          <Lock size={13} color="var(--cyan)" />
          <span className="deck-mono" style={{ fontSize: 10, color: 'var(--cyan)', fontWeight: 700 }}>SchemaExtractor · metadata-only</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StepBanner({ go, currentStep }) {
  if (!go || !currentStep) return null;
  const step = TIMELINE_STEPS.find((s) => s.id === currentStep);
  if (!step) return null;
  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute',
        left: COL.TIMELINE_X + COL.TIMELINE_W + 30, top: 30,
        padding: '8px 16px',
        borderRadius: 999,
        background: 'color-mix(in srgb, var(--sage) 18%, transparent)',
        border: '1px solid color-mix(in srgb, var(--sage) 60%, transparent)',
        color: 'var(--sage)', fontWeight: 700,
        zIndex: 30,
      }}
    >
      <span className="deck-mono" style={{ fontSize: 11, letterSpacing: '0.1em' }}>NOW · {step.label.toUpperCase()}</span>
    </motion.div>
  );
}

function Bubble({ speaker, role, color, face, align, anchorX, anchorY, appearAt, duration, time, text }) {
  const isActive = time >= appearAt && time < appearAt + duration;
  if (!isActive) return null;
  const isTyping = time >= appearAt && time < appearAt + 2.5;

  const BUBBLE_W = 360;
  const bubbleTop = 80;
  const bubbleHeight = 170;
  const bubbleBottom = bubbleTop + bubbleHeight;

  // Place bubble in a band right of the timeline; clamp so it never crosses
  // into the L1 row column (so it's never above an agent and obscuring its label).
  const minLeft = COL.TIMELINE_X + COL.TIMELINE_W + 30;
  const maxLeft = COL.L1_CX[0] - 80 - BUBBLE_W;
  const desiredLeft = anchorX - BUBBLE_W / 2;
  const bubbleLeft = clamp(desiredLeft, minLeft, Math.max(minLeft, maxLeft));

  const tailFromX = clamp(anchorX, bubbleLeft + 30, bubbleLeft + BUBBLE_W - 30);
  const tailFromY = bubbleBottom;
  const tailToY = anchorY - 8;

  return (
    <>
      <svg viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} style={{ position: 'absolute', inset: 0, zIndex: 49, pointerEvents: 'none' }}>
        <motion.path
          d={`M ${tailFromX} ${tailFromY} L ${anchorX} ${tailToY}`}
          stroke={color} strokeWidth={2.5} strokeDasharray="6 4"
          strokeLinecap="round" fill="none" opacity={0.85}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.circle
          cx={anchorX} cy={tailToY} r={4} fill={color}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        />
      </svg>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          left: bubbleLeft, top: bubbleTop,
          width: BUBBLE_W,
          background: `color-mix(in srgb, var(--panel) 35%, ${color} 16%)`,
          backdropFilter: 'blur(18px)',
          border: `1.5px solid color-mix(in srgb, ${color} 55%, transparent)`,
          borderRadius: 16,
          borderBottomLeftRadius: align === 'left' ? 4 : 16,
          borderBottomRightRadius: align === 'right' ? 4 : 16,
          padding: 14,
          display: 'flex', flexDirection: 'column', gap: 10,
          boxShadow: `0 18px 50px color-mix(in srgb, ${color} 25%, transparent), inset 0 0 0 1px color-mix(in srgb, ${color} 22%, transparent)`,
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid color-mix(in srgb, ${color} 22%, transparent)`, paddingBottom: 8 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: `color-mix(in srgb, ${color} 22%, transparent)`, border: `1.5px solid ${color}`, overflow: 'hidden' }}>
            <FaceSVG face={face} talking={isTyping} accent={color} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="deck-display" style={{ color: 'var(--cream)', fontSize: 14, fontWeight: 800 }}>{speaker}</span>
            <span className="deck-mono" style={{ color, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>{role}</span>
          </div>
        </div>

        <div style={{ color: 'var(--cream-muted)', fontSize: 13.5, lineHeight: 1.55, minHeight: 60 }}>
          {isTyping ? (
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', height: '100%', paddingLeft: 4, paddingTop: 8 }}>
              {[0, 0.2, 0.4].map((d) => (
                <motion.div key={d}
                  animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: d }}
                  style={{ width: 7, height: 7, background: color, borderRadius: '50%' }} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{text}</motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}

function StatusText({ cx, cy, text, delay, duration = 8.0, color }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, times: [0, 0.1, 0.9, 1] }}
      className="deck-mono"
      style={{
        position: 'absolute', left: cx, top: cy, transform: 'translate(-50%, -50%)',
        color, fontSize: 11, fontWeight: 600,
        background: 'color-mix(in srgb, var(--panel) 92%, transparent)',
        padding: '6px 12px', borderRadius: 6,
        border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
        zIndex: 18, backdropFilter: 'blur(6px)',
        boxShadow: `0 6px 22px color-mix(in srgb, ${color} 18%, transparent)`,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </motion.div>
  );
}

function Timeline({ go, time, currentStep }) {
  return (
    <div style={{
      position: 'absolute', left: COL.TIMELINE_X, top: 80,
      width: COL.TIMELINE_W, display: 'flex', flexDirection: 'column', gap: 18,
      zIndex: 10,
    }}>
      <div className="deck-mono uppercase" style={{ color: 'var(--cream)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', borderBottom: '1px solid color-mix(in srgb, var(--cream-muted) 40%, transparent)', paddingBottom: 8 }}>
        Event Timeline
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 6, top: 12, bottom: 12, width: 2, background: 'color-mix(in srgb, var(--cream-muted) 30%, transparent)' }} />
        <motion.div
          initial={{ height: 0 }}
          animate={go ? { height: `${Math.min(100, (time / SEQ.s9) * 100)}%` } : { height: 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', left: 6, top: 12, width: 2, background: 'var(--sage)', boxShadow: '0 0 6px var(--sage)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {TIMELINE_STEPS.map((s, i) => {
            const isActive = currentStep === s.id;
            const isPast = time > s.time;
            return (
              <motion.div key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={go ? { opacity: isActive ? 1 : isPast ? 0.65 : 0.3, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: SEQ.bg + i * 0.06 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}
              >
                <div style={{
                  position: 'relative', zIndex: 2,
                  width: 14, height: 14, borderRadius: '50%',
                  background: isActive ? 'var(--sage)' : isPast ? 'color-mix(in srgb, var(--sage) 60%, transparent)' : 'var(--bg)',
                  border: `2px solid ${isActive ? 'var(--sage)' : isPast ? 'var(--sage)' : 'var(--cream-muted)'}`,
                  boxShadow: isActive ? '0 0 12px var(--sage)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isPast && !isActive && <Check size={8} color="var(--sage)" strokeWidth={3} />}
                </div>
                <span className="deck-mono" style={{ fontSize: 11, fontWeight: isActive ? 800 : 600, color: isActive ? 'var(--sage)' : 'var(--cream)', letterSpacing: '0.04em' }}>
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
