// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * CloserConstellation — three editorial mark glyphs, one per S13
 * Block 3 commitment.
 *
 *   MANUSCRIPT — outline of a paper page with 3 hairlines for body text
 *                and a small "DRAFT" stamp.
 *   SOP        — scroll outline with a small "v0.1" tag.
 *   PILOT      — regulatory stamp circle with "FDA · 2027" mono caption.
 *
 * Each mark stagger-reveals (200ms apart). Hairline outlines, mono labels,
 * NO emoji. Echoes the AiBrainAmbient watermark in the corner.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function CloserConstellation({ go = true, delay = 0 }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 420 130"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-label="Manuscript · SOP · regulatory pilot — three commitments"
    >
      {/* ── MANUSCRIPT (left) ── */}
      <g transform="translate(20,20)">
        <motion.g
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay }}
        >
          {/* Page outline */}
          <rect
            x={0}
            y={0}
            width={70}
            height={84}
            fill="none"
            stroke="var(--amber, #d4a373)"
            strokeWidth={1}
          />
          {/* Folded corner */}
          <polyline
            points="56,0 70,0 70,14 56,0"
            fill="none"
            stroke="var(--amber, #d4a373)"
            strokeWidth={1}
          />
          <line x1={56} y1={0} x2={56} y2={14} stroke="var(--amber, #d4a373)" strokeWidth={0.8} />
          <line x1={56} y1={14} x2={70} y2={14} stroke="var(--amber, #d4a373)" strokeWidth={0.8} />
          {/* Body lines */}
          {[24, 34, 44, 54, 64].map((y) => (
            <line
              key={y}
              x1={8}
              x2={62}
              y1={y}
              y2={y}
              stroke="var(--cream-faint, rgba(255,232,189,0.45))"
              strokeWidth={0.7}
              opacity={0.7}
            />
          ))}
          {/* DRAFT stamp */}
          <rect
            x={10}
            y={70}
            width={36}
            height={10}
            fill="none"
            stroke="var(--coral, #d96155)"
            strokeWidth={1}
            transform="rotate(-12 28 75)"
          />
          <text
            x={28}
            y={78}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="7"
            letterSpacing="1.2"
            fill="var(--coral, #d96155)"
            fontWeight={800}
            transform="rotate(-12 28 75)"
          >
            DRAFT
          </text>
        </motion.g>
        <motion.text
          x={35}
          y={102}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="1.4"
          fill="var(--amber, #d4a373)"
          fontWeight={800}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: delay + 0.2 }}
        >
          MANUSCRIPT
        </motion.text>
      </g>

      {/* ── SOP (center) ── */}
      <g transform="translate(170,20)">
        <motion.g
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: delay + 0.2 }}
        >
          {/* Scroll outline — body */}
          <rect
            x={6}
            y={8}
            width={68}
            height={68}
            fill="none"
            stroke="var(--amber, #d4a373)"
            strokeWidth={1}
            rx={2}
          />
          {/* Scroll caps */}
          <ellipse
            cx={6}
            cy={42}
            rx={4}
            ry={36}
            fill="var(--bg, #1a1612)"
            stroke="var(--amber, #d4a373)"
            strokeWidth={1}
          />
          <ellipse
            cx={74}
            cy={42}
            rx={4}
            ry={36}
            fill="var(--bg, #1a1612)"
            stroke="var(--amber, #d4a373)"
            strokeWidth={1}
          />
          {/* Header line */}
          <line x1={14} y1={20} x2={66} y2={20} stroke="var(--amber, #d4a373)" strokeWidth={0.8} />
          {/* Body lines */}
          {[30, 38, 46, 54, 62].map((y) => (
            <line
              key={y}
              x1={14}
              x2={66}
              y1={y}
              y2={y}
              stroke="var(--cream-faint, rgba(255,232,189,0.45))"
              strokeWidth={0.7}
              opacity={0.7}
            />
          ))}
          {/* v0.1 tag */}
          <rect
            x={20}
            y={68}
            width={28}
            height={9}
            fill="color-mix(in srgb, var(--amber, #d4a373) 18%, transparent)"
            stroke="var(--amber, #d4a373)"
            strokeWidth={0.6}
          />
          <text
            x={34}
            y={75}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="7"
            letterSpacing="0.8"
            fill="var(--amber, #d4a373)"
            fontWeight={700}
          >
            v0.1
          </text>
        </motion.g>
        <motion.text
          x={40}
          y={102}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="1.4"
          fill="var(--amber, #d4a373)"
          fontWeight={800}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: delay + 0.4 }}
        >
          SOP · INTERNAL
        </motion.text>
      </g>

      {/* ── PILOT (right) ── */}
      <g transform="translate(320,20)">
        <motion.g
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: delay + 0.4 }}
        >
          {/* Outer ring */}
          <circle
            cx={42}
            cy={42}
            r={36}
            fill="none"
            stroke="var(--amber, #d4a373)"
            strokeWidth={1.4}
          />
          {/* Inner ring */}
          <circle
            cx={42}
            cy={42}
            r={28}
            fill="none"
            stroke="var(--amber, #d4a373)"
            strokeWidth={0.8}
            strokeOpacity={0.7}
            strokeDasharray="2 3"
          />
          <text
            x={42}
            y={38}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="1.4"
            fill="var(--amber, #d4a373)"
            fontWeight={800}
          >
            FDA
          </text>
          <text
            x={42}
            y={50}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="0.8"
            fill="var(--amber, #d4a373)"
            fontWeight={700}
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            2027
          </text>
          <text
            x={42}
            y={62}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="6"
            letterSpacing="1.2"
            fill="var(--cream-faint, rgba(255,232,189,0.45))"
          >
            PILOT
          </text>
        </motion.g>
        <motion.text
          x={42}
          y={102}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="1.4"
          fill="var(--amber, #d4a373)"
          fontWeight={800}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: delay + 0.6 }}
        >
          REGULATORY PILOT
        </motion.text>
      </g>

      {/* Hairline connector across the bottom */}
      <motion.line
        x1={20}
        x2={400}
        y1={114}
        y2={114}
        stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
        strokeWidth={1}
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: delay + 0.7 }}
      />
      <text
        x={210}
        y={126}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="7"
        letterSpacing="1.4"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        SHIPPED · COMMITTED · OPEN-SOURCED
      </text>
    </svg>
  );
}
