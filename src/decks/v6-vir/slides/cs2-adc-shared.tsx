// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Beaker, FileCheck2, GitBranch, Handshake, Layers3, Network, Radar, ShieldCheck, Target, Users } from 'lucide-react';
import SlideFrame from '@/components/deck/SlideFrame';

const EASE = [0.2, 0.7, 0.3, 1];

export const ADC_ICONS = {
  activity: Activity,
  beaker: Beaker,
  file: FileCheck2,
  branch: GitBranch,
  handshake: Handshake,
  layers: Layers3,
  network: Network,
  radar: Radar,
  shield: ShieldCheck,
  target: Target,
  users: Users,
};

export function AdcEvidenceSlide({
  eyebrow,
  headline,
  subhead,
  cards = [],
  flow = [],
  callout,
  footerKicker,
  footerTagline,
  footerSource,
  mode = 'cards',
}: any) {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideFrame
      dataCase="cyan"
      eyebrow={eyebrow}
      headline={headline}
      headlineMaxChars={68}
      subhead={subhead}
      subheadMaxChars={118}
      subheadSize="lead"
      footerKicker={footerKicker}
      footerTagline={footerTagline}
      footerSource={footerSource}
      delays={{ footer: 1.65 }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: mode === 'flow' ? 'minmax(0, 1fr)' : 'minmax(0, 1.15fr) minmax(18rem, 0.85fr)',
          gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: mode === 'flow' ? 'repeat(auto-fit, minmax(min(15rem, 100%), 1fr))' : 'repeat(2, minmax(0, 1fr))',
            gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
            minHeight: 0,
          }}
        >
          {cards.map((card, i) => {
            const Icon = card.icon || ADC_ICONS.target;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.62 + i * 0.12, ease: EASE }}
                style={{
                  minWidth: 0,
                  border: '1px solid color-mix(in srgb, var(--cyan) 26%, transparent)',
                  borderTop: '3px solid var(--cyan)',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(180deg, color-mix(in srgb, var(--cyan) 8%, var(--panel)), color-mix(in srgb, var(--panel) 70%, transparent))',
                  padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <span
                    aria-hidden
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 'var(--radius-sm)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--cyan)',
                      background: 'color-mix(in srgb, var(--cyan) 12%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--cyan) 28%, transparent)',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} strokeWidth={2.2} />
                  </span>
                  <div className="deck-mono uppercase" style={{
                    fontSize: 'var(--fs-slide-eyebrow)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--cyan)',
                    fontWeight: 700,
                    minWidth: 0,
                  }}>
                    {card.label}
                  </div>
                </div>
                <div className="deck-display" style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  color: 'var(--cream)',
                  fontWeight: 700,
                  lineHeight: 1.12,
                }}>
                  {card.title}
                </div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'color-mix(in srgb, var(--cream) 78%, transparent)',
                  lineHeight: 1.42,
                }}>
                  {card.body}
                </div>
              </motion.div>
            );
          })}
        </div>

        {mode !== 'flow' && (
          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 1.05, ease: EASE }}
            style={{
              minWidth: 0,
              borderLeft: '1px solid color-mix(in srgb, var(--cyan) 34%, transparent)',
              paddingLeft: 'clamp(var(--space-4), 2vw, var(--space-6))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 'var(--space-4)',
            }}
          >
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}>
              Decision architecture
            </div>
            {flow.map((step, i) => (
              <div key={step} style={{ display: 'grid', gridTemplateColumns: '2.4rem minmax(0, 1fr)', gap: 'var(--space-3)', alignItems: 'baseline' }}>
                <span className="deck-mono" style={{ color: 'var(--cyan)', fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: '0.14em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="deck-display" style={{ color: 'var(--cream)', fontSize: 'var(--fs-slide-tagline)', lineHeight: 1.25 }}>
                  {step}
                </span>
              </div>
            ))}
            {callout && (
              <div
                className="deck-body"
                style={{
                  marginTop: 'var(--space-3)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid color-mix(in srgb, var(--amber) 30%, transparent)',
                  background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
                  color: 'var(--cream)',
                  fontSize: 'var(--fs-slide-subhead)',
                  lineHeight: 1.45,
                }}
              >
                {callout}
              </div>
            )}
          </motion.aside>
        )}
      </div>
    </SlideFrame>
  );
}
