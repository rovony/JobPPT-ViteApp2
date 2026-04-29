import { SlideFrame } from "../components/SlideFrame";
import { FooterStrip } from "../components/FooterStrip";
import { NewspaperReveal } from "../components/WordReveal";
import { HairlineRule } from "../components/HairlineRule";

/**
 * Slide 16 — Sparse Closing Stack.
 *
 * Patterns: A1 (variant=closing) · A4 (sparse closing stack) · B1 · B3 (hairlines) · B6
 *           C1 · C4 (newspaper-reveal variant on the closing lines) · C10
 *           Addenda § A4 (cushiony spring on the line slide-up)
 *
 * Three principles, each landing word-by-word with reverence. Hairlines
 * draw between them. Generous whitespace. The pattern relies on scarcity —
 * fewer than 25 total words in the body.
 */
export default function ClosingSlide() {
  return (
    <SlideFrame
      variant="closing"
      caseColor="magenta"
      ornament="16"
      ornamentSide="right"
      headline={
        <>
          Sixteen slides, every <em>major pattern</em>.
          <br />
          Now <em>commission</em> by name.
        </>
      }
      viz={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
            maxWidth: 700,
            marginTop: "var(--space-6)",
          }}
        >
          <HairlineRule weight="strong" delay={0.3} />
          <NewspaperReveal
            delay={0.6}
            stagger={0.18}
            lines={[
              <span
                key="l1"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.25rem, 1.8vw, 1.75rem)",
                  lineHeight: 1.4,
                  display: "inline-block",
                }}
              >
                Every pattern has a <em style={{ color: "var(--case)", fontStyle: "italic" }}>name</em>.
              </span>,
              <span
                key="l2"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.25rem, 1.8vw, 1.75rem)",
                  lineHeight: 1.4,
                  display: "inline-block",
                }}
              >
                Every name has a <em style={{ color: "var(--case)", fontStyle: "italic" }}>primitive</em>.
              </span>,
              <span
                key="l3"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.25rem, 1.8vw, 1.75rem)",
                  lineHeight: 1.4,
                  display: "inline-block",
                }}
              >
                Every primitive has an <em style={{ color: "var(--case)", fontStyle: "italic" }}>install line</em>.
              </span>,
            ]}
          />
          <HairlineRule weight="strong" delay={1.6} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--type-mono)",
              color: "var(--ink-muted)",
              textAlign: "center",
              marginTop: "var(--space-4)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            references/codex/02_Pattern-Catalog.md →
            references/primitives/* → references/operations/MASTER-GUIDE.md
          </span>
        </div>
      }
      footer={<FooterStrip case_="Closing" unit="16 of 16" />}
    />
  );
}
