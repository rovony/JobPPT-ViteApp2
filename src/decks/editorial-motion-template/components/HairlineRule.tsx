import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../assets/easings";

type Props = {
  /** seconds to delay the wipe-in */
  delay?: number;
  /** "strong" uses --hairline-strong; default uses --hairline */
  weight?: "default" | "strong" | "faint";
  /** vertical margin in px (defaults to 0 — let the parent control spacing) */
  marginY?: number;
};

/**
 * B3 — Hairline Rule.
 * A 1px line that animates left-to-right on enter (transformOrigin: left, scaleX 0→1).
 */
export function HairlineRule({
  delay = 0,
  weight = "default",
  marginY = 0,
}: Props) {
  const reduced = useReducedMotion();
  const colorVar =
    weight === "strong"
      ? "var(--hairline-strong)"
      : weight === "faint"
      ? "var(--hairline-faint)"
      : "var(--hairline)";

  return (
    <motion.div
      role="separator"
      aria-hidden="true"
      style={{
        height: 1,
        width: "100%",
        background: colorVar,
        margin: `${marginY}px 0`,
        transformOrigin: "left center",
      }}
      initial={reduced ? false : { scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{
        duration: reduced ? 0 : 0.7,
        delay: reduced ? 0 : delay,
        ease: EASE.expoOut,
      }}
    />
  );
}
