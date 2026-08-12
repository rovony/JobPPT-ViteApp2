// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bot, FileCheck2, GitBranch, LockKeyhole, PanelsTopLeft, ShieldCheck } from 'lucide-react';
import SlideFrame from '@/components/deck/SlideFrame';

const EASE = [0.2, 0.7, 0.3, 1];
const ICONS = { Bot, FileCheck2, GitBranch, LockKeyhole, PanelsTopLeft, ShieldCheck };

export function AiEvidenceSlide({ eyebrow, headline, subhead, subheadMaxChars = 116, cards, footerTagline, footerSource }: any) {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideFrame
      dataCase="sage"
      eyebrow={eyebrow}
      headline={headline}
      headlineMaxChars={68}
      subhead={subhead}
      subheadMaxChars={subheadMaxChars}
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
                border: '1px solid color-mix(in srgb, var(--sage) 26%, transparent)',
                borderTop: '3px solid var(--sage)',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(180deg, color-mix(in srgb, var(--sage) 8%, var(--panel)), color-mix(in srgb, var(--panel) 68%, transparent))',
                padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                minWidth: 0,
              }}
            >
              <Icon size={28} color="var(--sage)" strokeWidth={2.2} />
              <div className="xc-eyebrow" style={{ color: 'var(--sage)' }}>
                {card.label}
              </div>
              <div className="xc-tagline xc-ink" style={{ fontWeight: 700, lineHeight: 1.14 }}>
                {card.title}
              </div>
              <div className="xc-subhead" style={{
                color: 'color-mix(in srgb, var(--cream) 78%, transparent)',
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
