import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../assets/easings";
import "../assets/index.css";

type Props = {
  eyebrow?: ReactNode;
  headline?: ReactNode;
  subhead?: ReactNode;
  viz?: ReactNode;
  source?: ReactNode;
  footer?: ReactNode;
  ornament?: ReactNode; // big background numeral / character
  ornamentSide?: "left" | "right";
  caseColor?: "coral" | "cyan" | "amber" | "emerald" | "violet" | "magenta";
  variant?: "standard" | "title" | "closing" | "divider";
};

/**
 * A1 — Slide-Frame Contract.
 * The structural backbone of every slide. CSS Grid with named areas.
 * Composes B1 (header stack), B5 (source), B6 (footer), and any body pattern.
 */
export function SlideFrame({
  eyebrow,
  headline,
  subhead,
  viz,
  source,
  footer,
  ornament,
  ornamentSide = "right",
  caseColor = "cyan",
  variant = "standard",
}: Props) {
  const reduced = useReducedMotion();

  // C3 — choreographed delay table
  const D = {
    eyebrow: 0.1,
    headline: 0.25,
    subhead: 0.4,
    viz: 0.55,
    footer: 0.7,
  };

  const transition = {
    duration: reduced ? 0 : 0.6,
    ease: EASE.expoOut,
  };

  const hidden = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };
  const visible = { opacity: 1, y: 0 };

  return (
    <div
      data-zaj-design=""
      data-case={caseColor}
      style={{
        width: "100%",
        height: "100%",
        ["--case" as string]: `var(--case-${caseColor})`,
      }}
    >
      <article className={`sf sf--${variant}`}>
        {ornament && (
          <div className={`sf__ornament sf__ornament--${ornamentSide}`}>
            {ornament}
          </div>
        )}

      {eyebrow && (
        <motion.div
          className="sf__eyebrow"
          initial={hidden}
          animate={visible}
          transition={{ ...transition, delay: D.eyebrow }}
        >
          {eyebrow}
        </motion.div>
      )}

      {headline && (
        <motion.h1
          className="sf__headline"
          initial={hidden}
          animate={visible}
          transition={{ ...transition, delay: D.headline }}
        >
          {headline}
        </motion.h1>
      )}

      {subhead && (
        <motion.p
          className="sf__subhead"
          initial={hidden}
          animate={visible}
          transition={{ ...transition, delay: D.subhead }}
        >
          {subhead}
        </motion.p>
      )}

      {viz && (
        <motion.div
          className="sf__viz"
          initial={hidden}
          animate={visible}
          transition={{ ...transition, delay: D.viz }}
        >
          {viz}
        </motion.div>
      )}

      {source && <div className="sf__source">{source}</div>}

      {footer && (
          <motion.div
            className="sf__footer"
            initial={hidden}
            animate={visible}
            transition={{ ...transition, delay: D.footer }}
          >
            {footer}
          </motion.div>
        )}
      </article>
    </div>
  );
}
