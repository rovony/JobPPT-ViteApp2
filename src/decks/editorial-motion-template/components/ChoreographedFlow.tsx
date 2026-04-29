import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";
import { EASE } from "../assets/easings";

export type FlowNode = {
  label: string;
  value: string;
  terminal?: boolean;
};

type Props = {
  nodes: FlowNode[];
  delay?: number;
};

/**
 * D3 — Choreographed Flowchart.
 * Nodes cascade in left-to-right; arrows draw between them on the
 * trailing edge of each node's entrance.
 */
export function ChoreographedFlow({ nodes, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const stagger = 0.18;

  return (
    <div className="flow">
      {nodes.map((node, i) => (
        <Fragment key={node.label}>
          <motion.div
            className={`flow__node ${node.terminal ? "flow__node--terminal" : ""}`}
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : delay + i * stagger,
              ease: EASE.expoOut,
            }}
          >
            <span className="flow__label">{node.label}</span>
            <span className="flow__value">{node.value}</span>
          </motion.div>

          {i < nodes.length - 1 && (
            <motion.div
              className="flow__arrow"
              initial={reduced ? false : { opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              style={{ transformOrigin: "left" }}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : delay + i * stagger + 0.25,
                ease: EASE.expoOut,
              }}
            >
              <svg
                width="48"
                height="14"
                viewBox="0 0 48 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 7H44M44 7L38 1M44 7L38 13"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </motion.div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
