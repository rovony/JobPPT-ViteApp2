import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../assets/easings";

export type Fact = {
  eyebrow: string;
  fact: string;
  source?: string;
};

type Props = {
  facts: Fact[];
  delay?: number;
  /** columns count; defaults to 3 */
  columns?: number;
  staggerDelay?: number;
};

/**
 * D5 — Fact-Cell Grid.
 * A small 2×N or 3×N grid of micro-cells. Each cell: tiny eyebrow + short
 * fact + optional source mark. Reads like a magazine sidebar.
 */
export function FactCellGrid({
  facts,
  delay = 0,
  columns = 3,
  staggerDelay = 0.08,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <div
      className="fcg"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {facts.map((fact, i) => (
        <motion.div
          key={fact.eyebrow}
          className="fcg__cell"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : delay + i * staggerDelay,
            ease: EASE.expoOut,
          }}
        >
          <div className="fcg__eyebrow">{fact.eyebrow}</div>
          <div className="fcg__fact">{fact.fact}</div>
          {fact.source && <div className="fcg__source">{fact.source}</div>}
        </motion.div>
      ))}
    </div>
  );
}
