import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import { EASE } from '../motion';

/**
 * Slide 22.5 — Closing recap · the seminar in 30 seconds (NEW per A1 §2.4).
 *
 * Sits between the publication close (22) and Q&A (23). 30s on screen.
 * Five rows, each one a one-line takeaway from one beat of the talk.
 *
 * Voice: per Amendment 2 strict-zero first-person and Amendment 5
 * vocabulary, "I built the substrate" → "The foundation is built."
 *
 * Patterns: A1 + B1 header + D5 numbered fact-rows · C2 cascade.
 */

const ROWS: Array<{ n: string; text: string }> = [
  {
    n: '1',
    text: 'The regulatory floor is set — ICH M15 effective July 2026.',
  },
  {
    n: '2',
    text: 'The MIDD foundation is unbuilt — Apollo addresses QCP, not MIDD.',
  },
  {
    n: '3',
    text: 'Pharazi is a centralized 4-level hierarchy — Kim et al., 4× error containment.',
  },
  {
    n: '4',
    text: 'Orthogonal layering — the foundation scales by registering, not by rebuilding.',
  },
  {
    n: '5',
    text: 'Eighteen months to a peer-reviewed reference architecture paper.',
  },
];

export default function ClosingRecapSlide() {
  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="RECAP · BEFORE Q&A"
      headline={<>Five things to remember</>}
      subhead="The seminar in thirty seconds."
      footerKicker="22.5 · CLOSING RECAP"
      footerSource="The deck's spine · five movements · five takeaways"
    >
      <div className="flex flex-col gap-5 h-full px-6 pt-6 pb-12 justify-center">
        {ROWS.map((row, i) => (
          <motion.div
            key={row.n}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.5 + i * 0.3,
              ease: EASE.expoOut,
            }}
            className="flex items-baseline gap-6 px-4 py-2"
            style={{
              borderLeft: '2px solid color-mix(in srgb, var(--case) 36%, transparent)',
            }}
          >
            <span
              className="deck-display"
              style={{
                fontSize: 'clamp(2.4rem, 3.6vw, 3.6rem)',
                fontWeight: 600,
                color: 'var(--case)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                minWidth: '1.2em',
              }}
            >
              {row.n}
            </span>
            <span
              className="deck-display"
              style={{
                fontSize: 'clamp(1.4rem, 2vw, 1.95rem)',
                fontWeight: 500,
                color: 'var(--cream)',
                letterSpacing: '-0.01em',
                lineHeight: 1.35,
              }}
            >
              {row.text}
            </span>
          </motion.div>
        ))}
      </div>

      <TakeHomeStrip
        text="The foundation exists. The next chapter scales it."
        caseColor="amber"
        delay={2.4}
      />
    </SlideFrame>
  );
}
