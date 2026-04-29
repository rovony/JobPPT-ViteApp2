import type { ReactNode, CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../assets/easings";

type Props = {
  children: ReactNode;
  variant?: "default" | "live";
  delay?: number;
  style?: CSSProperties;
};

/**
 * B7 — Glassmorphism Callout.
 * Translucent panel with backdrop blur. Use sparingly (cap 1–2 per slide).
 */
export function GlassCallout({
  children,
  variant = "default",
  delay = 0,
  style,
}: Props) {
  const reduced = useReducedMotion();
  return (
    <motion.aside
      className={`glass glass--${variant}`}
      style={style}
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reduced ? 0 : 0.6,
        delay: reduced ? 0 : delay,
        ease: EASE.expoOut,
      }}
    >
      {children}
    </motion.aside>
  );
}
