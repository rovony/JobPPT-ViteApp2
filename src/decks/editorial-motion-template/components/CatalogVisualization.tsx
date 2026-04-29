import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../assets/easings";

type Family = {
  letter: "A" | "B" | "C" | "D" | "E";
  name: string;
  color: string;
  patterns: string[];
};

const FAMILIES: Family[] = [
  {
    letter: "A",
    name: "Layout & Scaffold",
    color: "var(--case-cyan)",
    patterns: [
      "A1 · Slide-Frame",
      "A2 · Title-Card",
      "A3 · Case-Hero Divider",
      "A4 · Sparse Closing",
      "A5 · Composed Dashboard",
    ],
  },
  {
    letter: "B",
    name: "Typography & Editorial Register",
    color: "var(--case-amber)",
    patterns: [
      "B1 · Editorial Header Stack",
      "B2 · Italic-Accented Headline",
      "B3 · Hairline Rule",
      "B4 · Stat-Card Register",
      "B5 · Source Line",
      "B6 · Footer Strip",
      "B7 · Glassmorphism",
      "B8 · Glow Treatment",
    ],
  },
  {
    letter: "C",
    name: "Motion Choreography",
    color: "var(--case-emerald)",
    patterns: [
      "C1 · Custom Easing",
      "C2 · Staggered Cascade",
      "C3 · Delay Table",
      "C4 · Word Reveal · Newspaper",
      "C5 · Magic Move (FLIP)",
      "C6 · Path-Drawing",
      "C7 · Integer Ticker",
      "C8 · Continuous Particles",
      "C9 · Pulsing Outcome",
      "C10 · Reduced-Motion",
    ],
  },
  {
    letter: "D",
    name: "Data & Diagram Patterns",
    color: "var(--case-violet)",
    patterns: [
      "D1 · Hand-Composed Charts (D3)",
      "D2 · Click-to-Zoom Modal",
      "D3 · Choreographed Flowchart",
      "D4 · Compartment Schematic",
      "D5 · Fact-Cell Grid",
    ],
  },
  {
    letter: "E",
    name: "Cinematic Set-Pieces",
    color: "var(--case-magenta)",
    patterns: [
      "E1 · Cinematic Stepper",
      "E2 · Data Dossier (Micro-App)",
      "E3 · Cinematic Divider Pair",
    ],
  },
];

/**
 * Slide-2 hero — visualizes the entire pattern catalog as a 5-column register.
 * Itself uses C2 (cascade), C3 (delay table), B3 (hairline rules), B4 (big letters).
 */
export function CatalogVisualization({ delay = 0 }: { delay?: number }) {
  const reduced = useReducedMotion();
  const familyStagger = 0.18;
  const patternStagger = 0.04;

  return (
    <div className="cv">
      {FAMILIES.map((family, fi) => (
        <motion.div
          key={family.letter}
          className="cv__col"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : delay + fi * familyStagger,
            ease: EASE.expoOut,
          }}
        >
          <div
            className="cv__letter"
            style={{ color: family.color, borderTopColor: family.color }}
          >
            {family.letter}
          </div>
          <div className="cv__family-name">{family.name}</div>
          <ul className="cv__list">
            {family.patterns.map((p, pi) => (
              <motion.li
                key={p}
                className="cv__pattern"
                initial={reduced ? false : { opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.3,
                  delay:
                    reduced
                      ? 0
                      : delay + fi * familyStagger + 0.3 + pi * patternStagger,
                  ease: EASE.expoOut,
                }}
              >
                {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
