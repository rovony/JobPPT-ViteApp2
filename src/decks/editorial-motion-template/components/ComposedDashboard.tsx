import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { ZoomablePanel } from "./ZoomablePanel";
import { EASE } from "../assets/easings";

export type Quadrant = {
  id: string;
  eyebrow: string;
  title: string;
  body: ReactNode;
};

type Props = {
  quadrants: [Quadrant, Quadrant, Quadrant, Quadrant];
  delay?: number;
};

/**
 * A5 — Composed Scientific Dashboard.
 * Four quadrants, each a different *type* of evidence, each independently
 * expandable via D2 ZoomablePanel (FLIP into modal). Cascade reveal (C2).
 */
export function ComposedDashboard({ quadrants, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const stagger = 0.15;

  return (
    <div className="cd">
      {quadrants.map((q, i) => (
        <motion.div
          key={q.id}
          className="cd__cell"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : delay + i * stagger,
            ease: EASE.expoOut,
          }}
        >
          <ZoomablePanel
            panelId={`cd-${q.id}`}
            eyebrow={q.eyebrow}
            title={q.title}
          >
            {q.body}
          </ZoomablePanel>
        </motion.div>
      ))}
    </div>
  );
}
