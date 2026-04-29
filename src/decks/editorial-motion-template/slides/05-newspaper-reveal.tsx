import { SlideFrame } from "../components/SlideFrame";
import { FooterStrip } from "../components/FooterStrip";
import { NewspaperReveal, WordReveal } from "../components/WordReveal";
import { HairlineRule } from "../components/HairlineRule";

/**
 * Slide 05 — Newspaper Reveal vs. Word-by-Word (the C4 family) + Spring physics (A4).
 *
 * Patterns: A1 · B1 · B3 (animated hairlines as section dividers)
 *           C4 (BOTH variants — opacity word fade AND overflow-mask line slide-up)
 *           Addenda § A4 (spring-physics for the cushiony slide-up)
 *           C10 (reduced-motion fallback)
 *
 * Two side-by-side examples so the audience can compare the two reveal techniques.
 */
export default function NewspaperRevealSlide() {
  return (
    <SlideFrame
      caseColor="violet"
      ornament="05"
      eyebrow="PATTERN C4 · TWO TYPOGRAPHY REVEALS"
      headline={
        <>
          Words can <em>arrive</em>, or words can <em>appear</em>.
        </>
      }
      subhead="Both are progressive disclosure at the word level. The slide-up uses cushiony spring physics; the fade uses cubic-bezier. Different feels, different moments."
      viz={
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-7)",
            width: "100%",
            maxWidth: 1040,
          }}
        >
          {/* LEFT: Newspaper reveal (line-level slide-up + spring) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--case)",
              }}
            >
              NEWSPAPER REVEAL · cushiony spring
            </span>
            <HairlineRule weight="strong" delay={0.4} />
            <NewspaperReveal
              delay={0.7}
              stagger={0.18}
              lines={[
                <span
                  key="l1"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                    lineHeight: 1.15,
                    display: "inline-block",
                  }}
                >
                  The discipline arrives.
                </span>,
                <span
                  key="l2"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                    lineHeight: 1.15,
                    fontStyle: "italic",
                    color: "var(--case)",
                    display: "inline-block",
                  }}
                >
                  Then the cinema.
                </span>,
                <span
                  key="l3"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                    lineHeight: 1.15,
                    display: "inline-block",
                  }}
                >
                  In that order.
                </span>,
              ]}
            />
            <HairlineRule weight="strong" delay={1.6} />
          </div>

          {/* RIGHT: Word-by-word reveal (opacity + cubic-bezier) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--case)",
              }}
            >
              WORD-BY-WORD · cubic-bezier expo-out
            </span>
            <HairlineRule weight="strong" delay={0.4} />
            <WordReveal
              text="Editorial-Motion Design is progressive disclosure made cinematic."
              delay={0.7}
              stagger={0.09}
              accents={["progressive", "cinematic"]}
              className="word-reveal-passage"
            />
            <HairlineRule weight="strong" delay={2.0} />
          </div>
        </div>
      }
      source="C4 — see references/codex/02_Pattern-Catalog.md + 10_Addenda-and-Enhancements.md § B2"
      footer={<FooterStrip case_="Editorial Motion" unit="05 of 16" />}
    />
  );
}
