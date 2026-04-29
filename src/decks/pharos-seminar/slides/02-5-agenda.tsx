import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import MovementProgressStrip from '../components/MovementProgressStrip';
import { EASE } from '../motion';

/**
 * Slide 02.5 — Agenda · 30 minutes · 3 movements (NEW per Amendment 1 §2.1).
 *
 * Sits between the Hook (02) and the Regulatory Floor (03). 30s on screen.
 * The map: 4 + 18 + 8 minutes — the audience subconsciously sees that the
 * Architecture (M2) is the bulk of the talk.
 *
 * Patterns: A1 Slide-Frame · B1 Editorial Header Stack · D5 Gantt timeline
 * via <MovementProgressStrip mode="full"/>. C2 cascade on rows.
 */
export default function AgendaSlide() {
  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="30 MINUTES · 3 MOVEMENTS"
      headline={<>Here is what we'll cover</>}
      subhead="Then fifteen minutes for questions."
      footerKicker="02.5 · AGENDA"
      footerSource="0:00 → 30:00 · then Q&A · 15 min"
    >
      <div className="flex flex-col gap-10 h-full px-2 pt-4 pb-6 justify-center">
        <MovementProgressStrip
          mode="full"
          delayBase={0.5}
          caption="0:00 → 30:00 · then Q&A · 15 min"
        />

        <div className="grid grid-cols-3 gap-8 mt-4">
          <MovementCard
            num="01"
            mins={4}
            name="The Vision"
            beats={['Regulatory floor', 'Field state', 'The gap']}
            caseColor="amber"
            delay={1.0}
          />
          <MovementCard
            num="02"
            mins={18}
            name="The Architecture"
            beats={[
              '5 design principles',
              'The working system',
              'The scalability claim',
            ]}
            caseColor="cyan"
            delay={1.3}
            wide
          />
          <MovementCard
            num="03"
            mins={8}
            name="The Future"
            beats={['Component tour', 'Synthesis', 'Publication close']}
            caseColor="violet"
            delay={1.6}
          />
        </div>
      </div>

      <TakeHomeStrip
        text="Vision (4) · Architecture (18) · Future (8) · then Q&A (15)."
        caseColor="amber"
        delay={2.4}
      />
    </SlideFrame>
  );
}

function MovementCard({
  num,
  mins,
  name,
  beats,
  caseColor,
  delay,
  wide = false,
}: {
  num: string;
  mins: number;
  name: string;
  beats: string[];
  caseColor: 'amber' | 'cyan' | 'violet';
  delay: number;
  wide?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE.expoOut }}
      className="flex flex-col gap-3 p-5 relative"
      style={{
        background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
        borderLeft: `4px solid var(--case-${caseColor})`,
        borderRadius: '0 6px 6px 0',
      }}
    >
      <div className="flex items-baseline gap-3">
        <span
          className="deck-display"
          style={{
            fontSize: 'clamp(2.4rem, 3.4vw, 3.4rem)',
            fontWeight: 600,
            color: `var(--case-${caseColor})`,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {num}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: '0.65rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-muted)',
          }}
        >
          {mins} min
        </span>
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
          color: 'var(--cream)',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          fontStyle: 'italic',
        }}
      >
        {name}
      </div>
      <ul className="flex flex-col gap-1.5 mt-1 list-none p-0">
        {beats.map((b, i) => (
          <motion.li
            key={b}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: delay + 0.4 + i * 0.1,
              duration: 0.45,
              ease: EASE.expoOut,
            }}
            className="deck-body"
            style={{
              fontSize: '0.95rem',
              color: 'var(--cream-muted)',
              lineHeight: 1.4,
              paddingLeft: 16,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                color: `var(--case-${caseColor})`,
              }}
            >
              ·
            </span>
            {b}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
