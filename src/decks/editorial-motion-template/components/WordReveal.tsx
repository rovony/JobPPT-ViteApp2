import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { EASE, SPRING } from "../assets/easings";

/* ============================================================
 * C4 family — Word Reveal + Newspaper Reveal
 *
 * Two complementary techniques for revealing typography:
 *
 *   <WordReveal>      — opacity + tiny y-shift, word-by-word, cubic-bezier
 *   <NewspaperReveal> — overflow-mask + line-level slide-up, spring physics
 *
 * Both honor C10 (reduced-motion). Both are intersection-observer gated.
 * ============================================================ */

/* ─── 1. Word-by-Word Reveal ────────────────────────────── */

type WordRevealProps = {
  text: string;
  delay?: number;
  /** seconds between consecutive words */
  stagger?: number;
  /** lowercase words to render in italic + case color */
  accents?: string[];
  /** wrapper element — default <span>; pass "h1" / "p" / etc. */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export function WordReveal({
  text,
  delay = 0,
  stagger = 0.06,
  accents = [],
  as = "span",
  className,
}: WordRevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const Tag = as as React.ElementType;

  // Lowercase set for fast lookup; strip trailing punctuation when comparing
  const accentSet = new Set(accents.map((a) => a.toLowerCase()));
  const normalize = (w: string) => w.toLowerCase().replace(/[.,;:!?"]/g, "");

  const tokens = text.split(/(\s+)/); // preserves whitespace tokens

  let wordIndex = -1;

  return (
    <Tag
      ref={ref as React.MutableRefObject<HTMLElement | null>}
      className={className}
      style={{ display: "inline" }}
    >
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return tok;
        wordIndex += 1;
        const isAccent = accentSet.has(normalize(tok));
        return (
          <motion.span
            key={`${tok}-${i}`}
            style={{
              display: "inline-block",
              fontStyle: isAccent ? "italic" : undefined,
              color: isAccent ? "var(--case)" : undefined,
            }}
            initial={reduced ? false : { opacity: 0, y: "0.18em" }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: reduced ? 0 : 0.45,
              delay: reduced ? 0 : delay + wordIndex * stagger,
              ease: EASE.expoOut,
            }}
          >
            {tok}
          </motion.span>
        );
      })}
    </Tag>
  );
}

/* ─── 2. Newspaper Reveal (line-level slide-up) ─────────── */

type NewspaperRevealProps = {
  lines: ReactNode[];
  delay?: number;
  /** seconds between consecutive lines */
  stagger?: number;
  className?: string;
};

export function NewspaperReveal({
  lines,
  delay = 0,
  stagger = 0.18,
  className,
}: NewspaperRevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          style={{
            display: "block",
            overflow: "hidden",
            lineHeight: "var(--leading-tight)",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={reduced ? false : { y: "100%" }}
            animate={inView ? { y: 0 } : undefined}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    ...SPRING.cushiony,
                    delay: delay + i * stagger,
                  }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
