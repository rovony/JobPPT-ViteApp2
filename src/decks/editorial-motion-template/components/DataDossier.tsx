import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Activity,
  Database,
  Hash,
  MessageSquare,
  Cpu,
} from "lucide-react";
import { EASE } from "../assets/easings";

type ChatTurn = {
  role: "agent" | "user";
  text: string;
  /** seconds into the timeline when this turn appears */
  at: number;
};

type ToolCall = {
  name: string;
  status: "running" | "done";
  at: number;
};

type StateMutation = {
  field: string;
  value: string;
  at: number;
};

const TURNS: ChatTurn[] = [
  { role: "user", text: "Generate the Phase 2 dossier for Patient 0421.", at: 0.5 },
  { role: "agent", text: "Acknowledged. Pulling labs, vitals, and medication history.", at: 2.5 },
  { role: "agent", text: "Three labs flagged out-of-range. Cross-checking against historical baseline.", at: 6 },
  { role: "agent", text: "Dossier ready. 12 sections, 4 figures, 1 caveat noted.", at: 11 },
];

const TOOLS: ToolCall[] = [
  { name: "fetch_labs(patient_0421)", status: "done", at: 3 },
  { name: "fetch_vitals(patient_0421)", status: "done", at: 4 },
  { name: "fetch_meds(patient_0421)", status: "done", at: 5 },
  { name: "compare_to_baseline(...)", status: "done", at: 7.5 },
  { name: "render_dossier(...)", status: "done", at: 10 },
];

const MUTATIONS: StateMutation[] = [
  { field: "patient.id", value: "0421", at: 1 },
  { field: "labs.flagged", value: "3", at: 6 },
  { field: "dossier.status", value: "READY", at: 11 },
];

/**
 * E2 — Embedded Micro-App / Data Dossier.
 *
 * A *fully functional* miniature web app embedded as a slide. Three panes:
 * - Left: chat stream (simulated agent / user turns)
 * - Center: tool-call log (the agent's actions, with status)
 * - Right: state inspector (mutations to the underlying state, with hash chain)
 *
 * Everything is computed from a single `time` variable that ticks via
 * requestAnimationFrame. The slide demonstrates "visually prove rather than
 * describe" — the audience sees the agent work in front of them.
 *
 * Honors reduced-motion: collapses to the final-state snapshot.
 */
export function DataDossier() {
  const reduced = useReducedMotion();
  const [t, setT] = useState(reduced ? 12 : 0);
  const [playing, setPlaying] = useState(!reduced);
  const startRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const totalDuration = 12;

  useEffect(() => {
    if (!playing) return;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) / 1000 + offsetRef.current;
      if (elapsed >= totalDuration) {
        setT(totalDuration);
        setPlaying(false);
        return;
      }
      setT(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const restart = () => {
    setT(0);
    offsetRef.current = 0;
    startRef.current = null;
    setPlaying(true);
  };

  const visibleTurns = TURNS.filter((turn) => turn.at <= t);
  const visibleTools = TOOLS.map((tool) => ({
    ...tool,
    status: (tool.at + 1.2 <= t ? "done" : tool.at <= t ? "running" : null) as
      | "done"
      | "running"
      | null,
  })).filter((tool) => tool.status !== null);
  const visibleMutations = MUTATIONS.filter((m) => m.at <= t);

  return (
    <div className="dd">
      {/* Header bar */}
      <div className="dd__header">
        <div className="dd__title">
          <Cpu size={14} />
          <span>PharmAgent · Dossier Generator</span>
        </div>
        <div className="dd__time">
          <Activity size={12} />
          <span>{t.toFixed(1)}s / {totalDuration}s</span>
          <button className="dd__btn" onClick={restart}>
            {t >= totalDuration ? "Replay" : playing ? "Running…" : "Pause"}
          </button>
        </div>
      </div>

      {/* Three-pane body */}
      <div className="dd__body">
        {/* Pane 1: Chat */}
        <div className="dd__pane">
          <div className="dd__pane-label">
            <MessageSquare size={12} /> CHAT
          </div>
          <div className="dd__chat">
            {visibleTurns.map((turn, i) => (
              <motion.div
                key={i}
                className={`dd__turn dd__turn--${turn.role}`}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.4,
                  ease: EASE.expoOut,
                }}
              >
                <div className="dd__turn-role">{turn.role}</div>
                <div className="dd__turn-text">{turn.text}</div>
              </motion.div>
            ))}
            {playing && t > 0 && t < totalDuration - 0.5 && (
              <div className="dd__typing">
                <span /> <span /> <span />
              </div>
            )}
          </div>
        </div>

        {/* Pane 2: Tool calls */}
        <div className="dd__pane">
          <div className="dd__pane-label">
            <Activity size={12} /> TOOL CALLS
          </div>
          <div className="dd__tools">
            {visibleTools.map((tool, i) => (
              <motion.div
                key={i}
                className={`dd__tool dd__tool--${tool.status}`}
                initial={reduced ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.3,
                  ease: EASE.expoOut,
                }}
              >
                {tool.status === "done" ? (
                  <CheckCircle2 size={12} />
                ) : (
                  <span className="dd__tool-spinner" />
                )}
                <code>{tool.name}</code>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pane 3: State inspector */}
        <div className="dd__pane">
          <div className="dd__pane-label">
            <Database size={12} /> STATE
          </div>
          <div className="dd__state">
            {visibleMutations.map((m, i) => (
              <motion.div
                key={i}
                className="dd__mutation"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
              >
                <div className="dd__field">{m.field}</div>
                <div className="dd__value">{m.value}</div>
                <div className="dd__hash">
                  <Hash size={9} />
                  {fakeHash(`${m.field}-${m.value}-${i}`)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="dd__footer">
        <span className="dd__chain-label">AUDIT CHAIN · SHA-256</span>
        <span className="dd__chain">
          {visibleMutations.length > 0
            ? fakeHash(visibleMutations.map((m) => m.value).join("|"))
            : "—"}
        </span>
      </div>
    </div>
  );
}

function fakeHash(seed: string) {
  // deterministic, decorative — NOT cryptographic
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = (h * 33) ^ seed.charCodeAt(i);
  const hex = Math.abs(h).toString(16).padStart(12, "0");
  return `${hex}…${hex.slice(0, 4)}`;
}
