import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../assets/easings";

type Props = { delay?: number };

/**
 * D4 — Compartment Schematic.
 * Hand-coded SVG with animated compartments, arrows, and labels.
 * This example: a 2-compartment PK model (central + peripheral).
 */
export function CompartmentSchematic({ delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const T = (offset: number) => ({
    duration: reduced ? 0 : 0.5,
    delay: reduced ? 0 : delay + offset,
    ease: EASE.expoOut,
  });

  return (
    <div className="schem">
      <svg
        className="schem__svg"
        viewBox="0 0 720 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Two-compartment pharmacokinetic model"
      >
        {/* Compartment A: central */}
        <motion.g
          initial={reduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={T(0)}
          style={{ transformOrigin: "180px 160px", transformBox: "fill-box" }}
        >
          <circle
            cx="180"
            cy="160"
            r="80"
            stroke="var(--case)"
            strokeWidth="1.5"
            fill="rgba(90, 214, 224, 0.06)"
          />
          <text
            x="180"
            y="155"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-serif)"
            fontSize="32"
          >
            V₁
          </text>
          <text
            x="180"
            y="180"
            textAnchor="middle"
            fill="var(--ink-muted)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.08em"
          >
            CENTRAL
          </text>
        </motion.g>

        {/* Compartment B: peripheral */}
        <motion.g
          initial={reduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={T(0.2)}
          style={{ transformOrigin: "540px 160px", transformBox: "fill-box" }}
        >
          <circle
            cx="540"
            cy="160"
            r="60"
            stroke="var(--ink-muted)"
            strokeWidth="1"
            fill="rgba(245, 245, 241, 0.03)"
            strokeDasharray="4 4"
          />
          <text
            x="540"
            y="155"
            textAnchor="middle"
            fill="var(--ink-muted)"
            fontFamily="var(--font-serif)"
            fontSize="28"
          >
            V₂
          </text>
          <text
            x="540"
            y="178"
            textAnchor="middle"
            fill="var(--ink-muted)"
            fontFamily="var(--font-mono)"
            fontSize="10"
            letterSpacing="0.08em"
          >
            PERIPHERAL
          </text>
        </motion.g>

        {/* Arrow A → B (k12) */}
        <motion.g
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={T(0.4)}
        >
          <motion.path
            d="M260 145 L460 145"
            stroke="var(--case)"
            strokeWidth="1.5"
            strokeLinecap="square"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={T(0.4)}
          />
          <path
            d="M460 145 L450 138 M460 145 L450 152"
            stroke="var(--case)"
            strokeWidth="1.5"
          />
          <text
            x="360"
            y="135"
            textAnchor="middle"
            fill="var(--case)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.06em"
          >
            k₁₂
          </text>
        </motion.g>

        {/* Arrow B → A (k21) */}
        <motion.g
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={T(0.55)}
        >
          <motion.path
            d="M460 175 L260 175"
            stroke="var(--ink-muted)"
            strokeWidth="1"
            strokeLinecap="square"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={T(0.55)}
          />
          <path
            d="M260 175 L270 168 M260 175 L270 182"
            stroke="var(--ink-muted)"
            strokeWidth="1"
          />
          <text
            x="360"
            y="195"
            textAnchor="middle"
            fill="var(--ink-muted)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.06em"
          >
            k₂₁
          </text>
        </motion.g>

        {/* Elimination arrow (down from V1) */}
        <motion.g
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={T(0.7)}
        >
          <motion.path
            d="M180 240 L180 290"
            stroke="var(--case)"
            strokeWidth="1.5"
            strokeLinecap="square"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={T(0.7)}
          />
          <path
            d="M180 290 L173 280 M180 290 L187 280"
            stroke="var(--case)"
            strokeWidth="1.5"
          />
          <text
            x="200"
            y="270"
            fill="var(--case)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.06em"
          >
            CL
          </text>
        </motion.g>

        {/* Input arrow (down into V1) */}
        <motion.g
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={T(0.85)}
        >
          <motion.path
            d="M180 30 L180 80"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinecap="square"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={T(0.85)}
          />
          <path
            d="M180 80 L173 70 M180 80 L187 70"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <text
            x="200"
            y="55"
            fill="var(--ink-muted)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.06em"
          >
            DOSE
          </text>
        </motion.g>
      </svg>
      <span className="schem__caption">
        Two-compartment model · linear elimination
      </span>
    </div>
  );
}
