import { SlideFrame } from "../components/SlideFrame";
import { StatCardRegister } from "../components/StatCardRegister";
import { FactCellGrid } from "../components/FactCellGrid";
import { FooterStrip } from "../components/FooterStrip";

/**
 * Slide 04 — Stat-Card Register + Fact-Cell Grid + Glow Treatment.
 *
 * Patterns: A1 · B1 · B4 (stat register) · B5 · B6 · B8 (glow on featured stat)
 *           C2 (cascade) · C3 · C7 (integer ticker) · C9 (pulsing featured) · C10
 *           D5 (fact-cell grid below)
 */
export default function StatAndFactsSlide() {
  return (
    <SlideFrame
      caseColor="amber"
      ornament="04"
      eyebrow="FINDING 01 · COST PROFILE"
      headline={
        <>
          Three quarters of the variance lives in <em>one</em> decision.
        </>
      }
      subhead="The headline numbers above (B4 + C7); the supporting facts below (D5). Together: register and sidebar, the editorial pairing."
      viz={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-7)",
            width: "100%",
            maxWidth: 980,
          }}
        >
          <StatCardRegister
            delay={0.5}
            cards={[
              {
                value: 74,
                label: "Variance Explained",
                suffix: "%",
                featured: true,
              },
              { value: 412, label: "Companies Analyzed" },
              {
                value: 2.1,
                label: "Cumulative Impact",
                prefix: "$",
                suffix: "B",
                decimals: 1,
              },
            ]}
          />
          <FactCellGrid
            delay={1.6}
            facts={[
              {
                eyebrow: "GEOGRAPHY",
                fact: "32 countries surveyed; OECD plus emerging markets.",
                source: "Bain · 2024",
              },
              {
                eyebrow: "VINTAGE",
                fact: "2008–2023 vintages, weighted by deployed capital.",
                source: "Bain · 2024",
              },
              {
                eyebrow: "TENURE",
                fact: "Median holding period 5.2y. IRR computed at exit.",
                source: "Bain · 2024",
              },
              {
                eyebrow: "ATTRIBUTION",
                fact: "Decomposition: Shapley over six factors.",
                source: "Bain · 2024",
              },
              {
                eyebrow: "CONFIDENCE",
                fact: "95% CI: [69%, 79%]. Bootstrap n=10k.",
                source: "Bain · 2024",
              },
              {
                eyebrow: "REPLICATION",
                fact: "Held-out 2023 cohort: 71% — within CI.",
                source: "Bain · 2024",
              },
            ]}
          />
        </div>
      }
      source="Bain Capital Markets Insights, 2024"
      footer={<FooterStrip case_="Findings" unit="04 of 16" />}
    />
  );
}
