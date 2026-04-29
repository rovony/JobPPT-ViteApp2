import { SlideFrame } from "../components/SlideFrame";
import { FooterStrip } from "../components/FooterStrip";
import { HairlineRule } from "../components/HairlineRule";

/**
 * Slide 03 — Editorial Header Stack deep-dive.
 *
 * Patterns: A1 · B1 (header stack) · B2 (italic accent) · B3 (animated hairline)
 *           B5 (source) · B6 (footer) · C1 · C2 · C3 · C10
 *
 * Annotates the three-tier header so the audience sees the structure.
 */
export default function HeaderStackSlide() {
  return (
    <SlideFrame
      caseColor="amber"
      ornament="03"
      eyebrow="PATTERN B1 · EDITORIAL HEADER STACK"
      headline={
        <>
          Three tiers, one <em>thesis</em>.
        </>
      }
      subhead="Eyebrow says category. Headline says claim — italic-accented on the load-bearing concept. Subhead says so-what in one line. Each tier enters on a staggered delay so the eye reads them in order."
      viz={
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: "var(--space-5)",
            alignItems: "center",
            maxWidth: 880,
            width: "100%",
          }}
        >
          <Annotation label="EYEBROW" caption="mono · uppercase · faded · category" />
          <div className="annotated-row">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--ink-muted)",
              }}
            >
              CASE 01 · COVARIATE STRATEGY
            </span>
          </div>

          <HairlineRule weight="faint" delay={0.6} />
          <HairlineRule weight="faint" delay={0.6} />

          <Annotation label="HEADLINE" caption="serif · regular weight · italic accent on the noun" />
          <div className="annotated-row">
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                lineHeight: 1.15,
              }}
            >
              Three design decisions. Each one a{" "}
              <em
                style={{ color: "var(--case)", fontStyle: "italic" }}
              >
                regulatory defense
              </em>
              .
            </span>
          </div>

          <HairlineRule weight="faint" delay={1.0} />
          <HairlineRule weight="faint" delay={1.0} />

          <Annotation label="SUBHEAD" caption="sans · muted · the so-what · one line" />
          <div className="annotated-row">
            <span style={{ color: "var(--ink-muted)" }}>
              A covariate screen designed to reject attractive but fragile
              explanations.
            </span>
          </div>
        </div>
      }
      source="See: references/codex/02_Pattern-Catalog.md § B1, B2, B3"
      footer={<FooterStrip case_="Editorial Register" unit="03 of 16" />}
    />
  );
}

function Annotation({ label, caption }: { label: string; caption: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--case)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          color: "rgba(245, 245, 241, 0.4)",
          lineHeight: 1.4,
        }}
      >
        {caption}
      </span>
    </div>
  );
}
