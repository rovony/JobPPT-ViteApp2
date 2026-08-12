// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, BadgeCheck, Crosshair, FlaskConical, Network, UsersRound } from 'lucide-react';
import SlideFrame from '@/components/deck/SlideFrame';

const ICONS = [FlaskConical, Activity, Crosshair, Network, BadgeCheck, UsersRound];
const EASE = [0.2, 0.7, 0.3, 1];

export function BridgeDivider({ content }) {
  const reduced = useReducedMotion();
  const d = (ms) => (reduced ? 0 : Math.min(ms, 0.35));

  return (
    <SlideFrame
      dataCase="amber"
      eyebrow={content.eyebrow}
      headline={<>Two pillars, <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>one discipline.</span></>}
      subhead={content.sub}
      footerKicker="Company bridge · Xencor"
      footerTagline={content.payoff}
      footerSource="Public pipeline · clinical pharmacology framing"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 'var(--space-5)',
          alignItems: 'stretch',
        }}
      >
        {[
          ['Oncology', 'dual-masked T-cell engagers', 'plasma does not equal tumor'],
          ['Infectious disease', 'HBV/HDV functional cure', 'combination, biologic PK, antiviral scope'],
        ].map(([label, title, body], i) => (
          <motion.div
            key={label}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, delay: d(0.12 + i * 0.08), ease: EASE }}
            style={{
              minWidth: 0,
              border: '1px solid var(--cream-hairline)',
              borderTop: '3px solid var(--amber)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--panel)',
              padding: 'clamp(var(--space-5), 2.5vw, var(--space-7))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <div className="deck-mono uppercase" style={{
              color: 'var(--amber)',
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: '0.06em',
              fontWeight: 800,
            }}>
              {label}
            </div>
            <div className="deck-display" style={{
              color: 'var(--cream)',
              fontSize: 'var(--fs-slide-headline)',
              lineHeight: 1.08,
              fontWeight: 700,
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
  const d = (ms) => (reduced ? 0 : Math.min(ms, 0.35));

  return (
    <SlideFrame
      dataCase="amber"
      eyebrow={content.eyebrow}
      headline={<>{highlightHeader(content.header)}</>}
      subhead={content.subhead}
      footerKicker="Company bridge · Xencor"
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
          gap: 'var(--space-4)',
          alignContent: 'center',
        }}
      >
        {content.bullets.map((bullet, i) => {
          const Icon = ICONS[(i + iconOffset) % ICONS.length];
          return (
            <motion.div
              key={bullet}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3, delay: d(0.1 + i * 0.06), ease: EASE }}
              style={{
                minWidth: 0,
                display: 'grid',
                gridTemplateColumns: 'auto minmax(0, 1fr)',
                gap: 'var(--space-3)',
                alignItems: 'start',
                border: '1px solid var(--cream-hairline)',
                borderTop: '3px solid var(--amber)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-3) var(--space-4)',
                background: 'var(--panel)',
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
