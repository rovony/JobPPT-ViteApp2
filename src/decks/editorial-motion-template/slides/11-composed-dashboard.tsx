import { SlideFrame } from "../components/SlideFrame";
import { FooterStrip } from "../components/FooterStrip";
import { ComposedDashboard } from "../components/ComposedDashboard";
import { CompartmentSchematic } from "../components/CompartmentSchematic";
import { HandComposedChart } from "../components/HandComposedChart";
import { StatCardRegister } from "../components/StatCardRegister";

/**
 * Slide 11 — Composed Scientific Dashboard with Click-to-Zoom.
 *
 * Patterns: A1 · A5 (composed dashboard) · B1 · B6 · C1 · C2 (cascade) · C10
 *           D2 (click-to-zoom modal — each panel FLIPs into a full-screen modal)
 *
 * Four quadrants: structural model (top-left), fit chart (top-right),
 * parameter table (bottom-left), KPI register (bottom-right). Click any
 * panel to zoom into a centered modal at 88% viewport. Esc closes.
 *
 * Uses Lucide-react (X icon in modal close button).
 */
export default function ComposedDashboardSlide() {
  return (
    <SlideFrame
      caseColor="cyan"
      ornament="11"
      eyebrow="ANALYSIS · COMPLETE"
      headline={
        <>
          The structure, the fit, the parameters, the outcome — <em>one screen</em>.
        </>
      }
      subhead="An A5 composed dashboard. Each quadrant is a different kind of evidence; cascading entrances (C2); click-to-zoom (D2) on every panel via Framer Motion layoutId. Esc closes the modal."
      viz={
        <ComposedDashboard
          delay={0.5}
          quadrants={[
            {
              id: "model",
              eyebrow: "STRUCTURAL MODEL",
              title: "Two-compartment PK",
              body: (
                <div style={{ width: "100%", height: "100%" }}>
                  <CompartmentSchematic delay={0} />
                </div>
              ),
            },
            {
              id: "fit",
              eyebrow: "POPULATION FIT",
              title: "pcVPC · 5–95% PI",
              body: (
                <div style={{ width: "100%", height: "100%" }}>
                  <HandComposedChart
                    delay={0}
                    width={420}
                    height={220}
                    margin={{ top: 12, right: 16, bottom: 30, left: 36 }}
                  />
                </div>
              ),
            },
            {
              id: "params",
              eyebrow: "PARAMETER TABLE",
              title: "Final estimates · CV%",
              body: (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--ink)",
                  }}
                >
                  <thead>
                    <tr style={{ color: "var(--ink-muted)", fontSize: 10 }}>
                      <th style={{ textAlign: "left", padding: "4px 6px" }}>θ</th>
                      <th style={{ textAlign: "right", padding: "4px 6px" }}>EST</th>
                      <th style={{ textAlign: "right", padding: "4px 6px" }}>%CV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { p: "CL/F", v: "12.4", cv: "18" },
                      { p: "V/F", v: "48.2", cv: "22" },
                      { p: "ka", v: "1.46", cv: "31" },
                      { p: "Q/F", v: "5.1", cv: "27" },
                      { p: "ω(CL)", v: "0.21", cv: "—" },
                    ].map((r) => (
                      <tr
                        key={r.p}
                        style={{ borderTop: "1px solid var(--hairline)" }}
                      >
                        <td style={{ padding: "4px 6px" }}>{r.p}</td>
                        <td style={{ padding: "4px 6px", textAlign: "right" }}>
                          {r.v}
                        </td>
                        <td
                          style={{
                            padding: "4px 6px",
                            textAlign: "right",
                            color: "var(--ink-muted)",
                          }}
                        >
                          {r.cv}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ),
            },
            {
              id: "outcome",
              eyebrow: "OUTCOME · KPI",
              title: "Submission readiness",
              body: (
                <div style={{ width: "100%" }}>
                  <StatCardRegister
                    delay={0}
                    cards={[
                      {
                        value: 94,
                        label: "Coverage",
                        suffix: "%",
                        featured: true,
                      },
                      { value: 0.83, label: "GoF", decimals: 2 },
                    ]}
                  />
                </div>
              ),
            },
          ]}
        />
      }
      source="Synthetic dataset · 412 subjects · 8,400 observations"
      footer={<FooterStrip case_="Composition" unit="11 of 16" />}
    />
  );
}
