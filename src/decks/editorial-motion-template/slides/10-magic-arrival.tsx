import { motion, useReducedMotion } from "framer-motion";
import { SlideFrame } from "../components/SlideFrame";
import { FooterStrip } from "../components/FooterStrip";
import { EASE } from "../assets/easings";

/**
 * Slide 10 — Magic Move arrival (FLIP receiver).
 *
 * Patterns: A1 · B1 · B2 · B6 · C1
 *           C5 (FLIP / Magic Move — receives the layoutId="case-2-hero" element from slide 09)
 *           E3 (cinematic divider pair — this is the second half of the unit)
 *           C10 (reduced-motion: morph snaps to final position)
 *
 * The "02" from slide 09 morphs from full-screen italic numeral into the
 * top-left eyebrow position. The audience reads the morph as
 * "we're now inside Chapter 02."
 */
export default function MagicArrivalSlide() {
  const reduced = useReducedMotion();

  return (
    <SlideFrame
      caseColor="violet"
      ornament="10"
      headline={
        <>
          The same element, <em>repositioned</em>.
        </>
      }
      subhead="The chapter numeral from the previous slide is the same DOM element you see here in the top-left. Framer Motion's layoutId runs the FLIP math — First, Last, Invert, Play. No fade-out, no fade-in. One element, two positions."
      viz={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
            color: "var(--ink-muted)",
            maxWidth: 720,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          <p>
            Same <code style={{ color: "var(--case)" }}>layoutId</code>. Different position. The morph is{" "}
            <span style={{ color: "var(--ink)" }}>GPU-accelerated transform interpolation</span>, not a fade.
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-muted)" }}>
            Use ← / → to replay the morph.
          </p>
        </div>
      }
      eyebrow={
        <motion.span
          layoutId="case-2-hero"
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.9, ease: EASE.expoOut }
          }
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--type-mono)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--case)",
            display: "inline-block",
          }}
        >
          02 · CHAPTER · MAGIC MOVE COMPLETE
        </motion.span>
      }
      source="See: references/codex/02_Pattern-Catalog.md § C5 + E3 · references/codex/10_Addenda-and-Enhancements.md § A1 (FLIP)"
      footer={<FooterStrip case_="Set-pieces" unit="10 of 16" />}
    />
  );
}
