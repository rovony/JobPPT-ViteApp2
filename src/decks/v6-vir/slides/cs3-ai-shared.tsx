// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bot, FileCheck2, GitBranch, LockKeyhole, PanelsTopLeft, ShieldCheck } from 'lucide-react';
import SlideFrame from '@/components/deck/SlideFrame';

const EASE = [0.2, 0.7, 0.3, 1];
const ICONS = { Bot, FileCheck2, GitBranch, LockKeyhole, PanelsTopLeft, ShieldCheck };

export function AiEvidenceSlide({ eyebrow, headline, subhead, cards, footerTagline, footerSource }: any) {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideFrame
      dataCase="violet"
      eyebrow={eyebrow}
      headline={headline}
      headlineMaxChars={68}
      subhead={subhead}
      subheadMaxChars={116}
      subheadSize="lead"
      footerKicker="AI / Pharazi"
      footerTagline={footerTagline}
      footerSource={footerSource}
      delays={{ footer: 1.6 }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
          gap: 'clamp(var(--space-4), 3vw, var(--space-7))',
          alignItems: 'stretch',
        }}
      >
        {cards.map((card, i) => {
          const Icon = ICONS[card.icon] || Bot;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.62 + i * 0.12, ease: EASE }}
              style={{
                border: '1px solid color-mix(in srgb, var(--violet) 26%, transparent)',
                borderTop: '3px solid var(--violet)',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(180deg, color-mix(in srgb, var(--violet) 8%, var(--panel)), color-mix(in srgb, var(--panel) 68%, transparent))',
                padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                minWidth: 0,
              }}
            >
              <Icon size={28} color="var(--violet)" strokeWidth={2.2} />
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--violet)',
                fontWeight: 700,
              }}>
                {card.label}
              </div>
              <div className="deck-display" style={{
                fontSize: 'var(--fs-slide-tagline)',
                color: 'var(--cream)',
                fontWeight: 700,
                lineHeight: 1.14,
              }}>
                {card.title}
              </div>
              <div className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'color-mix(in srgb, var(--cream) 78%, transparent)',
                lineHeight: 1.45,
              }}>
                {card.body}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideFrame>
  );
}
