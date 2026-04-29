import { motion, useReducedMotion } from "framer-motion";
import { SlideFrame } from "../components/SlideFrame";
import { FooterStrip } from "../components/FooterStrip";
import { EASE } from "../assets/easings";

/**
 * Slide 09 — Cinematic Divider (FLIP setup).
 *
 * Patterns: A1 (variant=divider) · A2 · A3 (case-hero divider with shared element)
 *           B1 · B6 · C1 · C5 (FLIP / Magic Move — shared layoutId with slide 10)
 *           E3 (cinematic divider pair — this slide + the next slide form one unit)
 *
 * The big "02" numeral has layoutId="case-2-hero". On the next slide it appears
 * as the eyebrow strip. Navigate with → or ← to see the morph.
 */
export default function DividerSlide() {
  const reduced = useReducedMotion();

  return (
    <SlideFrame
      variant="divider"
      caseColor="violet"
      eyebrow="CHAPTER 02"
      headline={<></>}
      footer={<FooterStrip case_="Set-pieces" unit="09 of 16" />}
      viz={
        <motion.div
          layoutId="case-2-hero"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(8rem, 18vw, 18rem)",
            lineHeight: 1,
            color: "var(--case)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            fontStyle: "italic",
          }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.9, ease: EASE.expoOut }
          }
        >
          02
        </motion.div>
      }
      ornamentSide="right"
      ornament="✦"
    />
  );
}
