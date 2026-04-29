import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";
import { EASE } from "../assets/easings";

export type FlowStep = {
  label: string;
  detail: string;
  /** highlight as the terminal/outcome node (gets C9 pulse) */
  terminal?: boolean;
  /** flag this step as the source of pain in the BEFORE — gets red tint */
  bottleneck?: boolean;
};

type Props = {
  beforeSteps: FlowStep[];
  afterSteps: FlowStep[];
  beforeLabel?: string;
  afterLabel?: string;
  /** seconds — when the BEFORE flow finishes drawing */
  beforeDuration?: number;
  /** seconds — total duration of pause between phases */
  pauseDuration?: number;
  /** when does the AFTER flow start? defaults to beforeDuration + pauseDuration */
  afterStart?: number;
  delay?: number;
};

/**
 * D3 (proper variant) — Choreographed Before/After Flowchart with C6 path-drawing.
 *
 * Two stacked rows. The BEFORE row reveals first (~3s), arrows draw between
 * each step (C6), bottleneck nodes pulse red. A pivot label fades in. Then
 * the AFTER row reveals (~2s), terminal node gets C9 emerald pulse.
 *
 * The viewer sees the change as a temporal event.
 */
export function BeforeAfterFlow({
  beforeSteps,
  afterSteps,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  beforeDuration = 3,
  pauseDuration = 0.6,
  afterStart,
  delay = 0,
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const pivotAt = beforeDuration;
  const afterAt = afterStart ?? beforeDuration + pauseDuration;
  const stepStagger = 0.4;

  return (
    <div className="baf">
      {/* BEFORE row */}
      <div className="baf__row">
        <motion.div
          className="baf__row-label baf__row-label--before"
          initial={reduced ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: reduced ? 0 : 0.4,
            delay: reduced ? 0 : delay,
            ease: EASE.expoOut,
          }}
        >
          {beforeLabel}
        </motion.div>
        <div className="baf__nodes">
          {beforeSteps.map((step, i) => (
            <Fragment key={step.label}>
              <FlowNode
                step={step}
                delay={delay + 0.2 + i * stepStagger}
                reduced={reduced}
                tone="before"
              />
              {i < beforeSteps.length - 1 && (
                <ArrowPath
                  delay={delay + 0.2 + i * stepStagger + 0.3}
                  reduced={reduced}
                  tone="before"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Pivot label */}
      <motion.div
        className="baf__pivot"
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduced ? 0 : 0.5,
          delay: reduced ? 0 : delay + pivotAt + 0.3,
          ease: EASE.expoOut,
        }}
      >
        <span className="baf__pivot-rule" />
        <span className="baf__pivot-label">REFORM</span>
        <span className="baf__pivot-rule" />
      </motion.div>

      {/* AFTER row */}
      <div className="baf__row">
        <motion.div
          className="baf__row-label baf__row-label--after"
          initial={reduced ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: reduced ? 0 : 0.4,
            delay: reduced ? 0 : delay + afterAt,
            ease: EASE.expoOut,
          }}
        >
          {afterLabel}
        </motion.div>
        <div className="baf__nodes">
          {afterSteps.map((step, i) => (
            <Fragment key={step.label}>
              <FlowNode
                step={step}
                delay={delay + afterAt + 0.2 + i * stepStagger}
                reduced={reduced}
                tone="after"
              />
              {i < afterSteps.length - 1 && (
                <ArrowPath
                  delay={delay + afterAt + 0.2 + i * stepStagger + 0.3}
                  reduced={reduced}
                  tone="after"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowNode({
  step,
  delay,
  reduced,
  tone,
}: {
  step: FlowStep;
  delay: number;
  reduced: boolean;
  tone: "before" | "after";
}) {
  const cls = [
    "baf__node",
    `baf__node--${tone}`,
    step.bottleneck ? "baf__node--bottleneck" : "",
    step.terminal ? "baf__node--terminal" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={cls}
      initial={reduced ? false : { opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reduced ? 0 : 0.45,
        delay: reduced ? 0 : delay,
        ease: EASE.expoOut,
      }}
    >
      <div className="baf__node-label">{step.label}</div>
      <div className="baf__node-detail">{step.detail}</div>
    </motion.div>
  );
}

function ArrowPath({
  delay,
  reduced,
  tone,
}: {
  delay: number;
  reduced: boolean;
  tone: "before" | "after";
}) {
  const stroke =
    tone === "before" ? "var(--ink-muted)" : "var(--case)";
  return (
    <svg
      width="40"
      height="14"
      viewBox="0 0 40 14"
      fill="none"
      style={{ flex: "0 0 auto", overflow: "visible" }}
      aria-hidden="true"
    >
      {/* C6 — Path-Drawing Reveal: pathLength animation */}
      <motion.path
        d="M0 7 L34 7"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="square"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduced ? 0 : 0.35,
          delay: reduced ? 0 : delay,
          ease: EASE.expoOut,
        }}
      />
      <motion.path
        d="M34 7 L28 2 M34 7 L28 12"
        stroke={stroke}
        strokeWidth="1.25"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reduced ? 0 : 0.2,
          delay: reduced ? 0 : delay + 0.3,
        }}
      />
    </svg>
  );
}
