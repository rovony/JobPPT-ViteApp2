// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, BadgeCheck, Crosshair, FlaskConical, Network, UsersRound } from 'lucide-react';
import SlideFrame from '@/components/deck/SlideFrame';

const ICONS = [FlaskConical, Activity, Crosshair, Network, BadgeCheck, UsersRound];

export function BridgeDivider({ content }) {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideFrame
      dataCase="amber"
      eyebrow={content.eyebrow}
      headline={<>Two pillars, <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>one discipline.</span></>}
      subhead={content.sub}
      footerKicker="Company bridge"
      footerTagline={content.payoff}
      footerSource="Public pipeline · clinical pharmacology framing"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 'var(--space-6)',
          alignItems: 'center',
        }}
      >
        {[
          ['Oncology', 'dual-masked T-cell engagers', 'plasma does not equal tumor'],
          ['Infectious disease', 'HBV/HDV functional cure', 'combination, biologic PK, antiviral scope'],
        ].map(([label, title, body], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 18 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.7 + i * 0.18, ease: [0.2, 0.7, 0.3, 1] }}
            style={{
              minWidth: 0,
              borderTop: '3px solid var(--amber)',
              paddingTop: 'var(--space-5)',
            }}
          >
            <div className="deck-mono uppercase" style={{
              color: 'var(--amber)',
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono-wide)',
              fontWeight: 800,
              marginBottom: 'var(--space-3)',
            }}>
              {label}
            </div>
            <div className="deck-display" style={{
              color: 'var(--cream)',
              fontSize: 'var(--fs-slide-headline)',
              lineHeight: 1.08,
              fontWeight: 700,
              marginBottom: 'var(--space-3)',
            }}>
              {title}
            </div>
            <div className="deck-body" style={{
              color: 'var(--cream-muted)',
              fontSize: 'var(--fs-slide-tagline)',
              lineHeight: 1.35,
            }}>
              {body}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideFrame>
  );
}

export function BridgeBullets({ content, footerTagline, iconOffset = 0 }) {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideFrame
      dataCase="amber"
      eyebrow={content.eyebrow}
      headline={<>{highlightHeader(content.header)}</>}
      subhead={content.subhead}
      footerKicker="Company bridge"
      footerTagline={footerTagline}
      footerSource={content.source}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(24rem, 100%), 1fr))',
          gap: 'var(--space-5)',
          alignContent: 'center',
        }}
      >
        {content.bullets.map((bullet, i) => {
          const Icon = ICONS[(i + iconOffset) % ICONS.length];
          return (
            <motion.div
              key={bullet}
              initial={{ opacity: 0, y: 12 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.72 + i * 0.12, ease: [0.2, 0.7, 0.3, 1] }}
              style={{
                minWidth: 0,
                display: 'grid',
                gridTemplateColumns: 'auto minmax(0, 1fr)',
                gap: 'var(--space-3)',
                alignItems: 'start',
                borderLeft: '3px solid color-mix(in srgb, var(--amber) 70%, transparent)',
                padding: 'var(--space-3) var(--space-4)',
                background: 'linear-gradient(90deg, color-mix(in srgb, var(--amber) 10%, transparent), transparent)',
              }}
            >
              <Icon size={26} color="var(--amber)" strokeWidth={2.1} />
              <div className="deck-body" style={{
                color: 'var(--cream)',
                fontSize: 'var(--fs-slide-subhead)',
                lineHeight: 1.42,
              }}>
                {emphasize(bullet)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideFrame>
  );
}

function highlightHeader(text) {
  const parts = text.split(' - ');
  if (parts.length === 1) return text;
  return (
    <>
      {parts[0]}{' '}
      <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>{parts.slice(1).join(' - ')}</span>
    </>
  );
}

function emphasize(text) {
  const terms = [
    'plasma is not tumor',
    'masked or total drug',
    'decision-bearing',
    'OBD',
    'maximum tolerated dose',
    'model precision',
    'target-exposure',
    'model-anchored',
    'convergent reliance',
    'traceable review',
    'public information only',
    'not a claim',
    'partner first',
    'Player-coach',
  ];

  let nodes = [text];
  for (const term of terms) {
    nodes = nodes.flatMap((node) => {
      if (typeof node !== 'string') return [node];
      const pieces = node.split(term);
      if (pieces.length === 1) return [node];
      return pieces.flatMap((piece, i) => (
        i === pieces.length - 1
          ? [piece]
          : [piece, <span key={`${term}-${i}-${piece.length}`} style={{ color: 'var(--amber)', fontWeight: 800 }}>{term}</span>]
      ));
    });
  }
  return nodes;
}
