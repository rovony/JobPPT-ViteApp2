import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Particle = {
  duration: number; // seconds for one full traversal
  delay: number; // seconds before first traversal
};

type Props = {
  /** SVG path d-attribute defining the particle trajectory */
  pathD: string;
  /** SVG viewBox — needed because particles are rendered as motion elements */
  viewBox?: string;
  /** width / height for the SVG */
  width?: number;
  height?: number;
  /** number of concurrent particles flowing along the path */
  particleCount?: number;
  /** range of durations [fastest, slowest] in seconds — randomized per particle */
  durationRange?: [number, number];
  /** node label at terminus (gets C9 pulse) */
  terminus?: { x: number; y: number; label: string };
  /** node label at origin */
  origin?: { x: number; y: number; label: string };
  /** stroke / fill color for path; defaults to var(--hairline-strong) */
  pathStroke?: string;
};

/**
 * C8 — Continuous-Loop Particles.
 * Small SVG circles travel along a predefined path indefinitely on staggered
 * start times. Uses CSS animation with offset-path for GPU-accelerated motion.
 * Pairs with C9 — a pulsing terminal node where the particles "arrive."
 *
 * Honors reduced-motion: particles render statically along the path with no flow.
 */
export function ContinuousLoopParticles({
  pathD,
  viewBox = "0 0 600 200",
  width = 600,
  height = 200,
  particleCount = 6,
  durationRange = [4, 7],
  terminus,
  origin,
  pathStroke = "var(--hairline-strong)",
}: Props) {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathD]);

  // Generate particle parameters once per render
  const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
    const [min, max] = durationRange;
    const duration = min + Math.random() * (max - min);
    const delay = (i / particleCount) * duration;
    return { duration, delay };
  });

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
      aria-hidden="true"
    >
      {/* The path itself, drawn as a hairline guide */}
      <path
        ref={pathRef}
        d={pathD}
        stroke={pathStroke}
        strokeWidth="1"
        strokeDasharray="3 3"
        fill="none"
      />

      {/* Origin label */}
      {origin && (
        <g>
          <circle
            cx={origin.x}
            cy={origin.y}
            r="14"
            fill="var(--bg)"
            stroke="var(--ink-muted)"
            strokeWidth="1.5"
          />
          <text
            x={origin.x}
            y={origin.y + 28}
            textAnchor="middle"
            fill="var(--ink-muted)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.06em"
          >
            {origin.label}
          </text>
        </g>
      )}

      {/* Terminus label (C9 pulsing) */}
      {terminus && (
        <g>
          <motion.circle
            cx={terminus.x}
            cy={terminus.y}
            r="14"
            fill="var(--bg)"
            stroke="var(--case)"
            strokeWidth="2"
            initial={false}
            animate={
              reduced
                ? {}
                : {
                    boxShadow: [
                      "0 0 0px var(--case)",
                      "0 0 20px var(--case)",
                      "0 0 0px var(--case)",
                    ],
                  }
            }
            style={{
              filter: reduced
                ? undefined
                : "drop-shadow(0 0 12px var(--case))",
            }}
          />
          <text
            x={terminus.x}
            y={terminus.y + 28}
            textAnchor="middle"
            fill="var(--case)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.06em"
          >
            {terminus.label}
          </text>
        </g>
      )}

      {/* Particles — only animate when motion is allowed */}
      {!reduced && pathLength > 0 && (
        <>
          {particles.map((p, i) => (
            <circle
              key={i}
              r="3.5"
              fill="var(--case)"
              opacity="0.85"
              style={{
                offsetPath: `path("${pathD}")`,
                offsetRotate: "0deg",
                animation: `particle-flow ${p.duration}s linear infinite`,
                animationDelay: `-${p.delay}s`,
                filter: "drop-shadow(0 0 4px var(--case))",
              }}
            />
          ))}
        </>
      )}

      {/* When reduced-motion: render static particles distributed along path */}
      {reduced &&
        particles.map((_, i) => {
          const t = (i + 0.5) / particles.length;
          // approximate position along path — we use a simple linear interpolation
          // by sampling pathLength * t. Browsers without DOM access fallback to none.
          if (!pathRef.current) return null;
          const pt = pathRef.current.getPointAtLength(pathLength * t);
          return (
            <circle
              key={`static-${i}`}
              cx={pt.x}
              cy={pt.y}
              r="3"
              fill="var(--case)"
              opacity="0.6"
            />
          );
        })}
    </svg>
  );
}
