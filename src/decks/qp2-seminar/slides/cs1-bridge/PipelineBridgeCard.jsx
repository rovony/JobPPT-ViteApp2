import React from 'react';
import { motion } from 'framer-motion';

/**
 * PipelineBridgeCard — "Where the template applies next" panel.
 *
 * Amber-toned card with a hairline border. Holds:
 *   • Small label eyebrow ("WHERE IT APPLIES — [COMPANY] PIPELINE")
 *   • Body prose (with optional highlight spans for compound names / trial IDs)
 *   • Footer tag (italic kicker)
 *
 * Props are all presentational so swapping Merck → another company is trivial:
 *
 *   <PipelineBridgeCard
 *     label="WHERE IT APPLIES — COMPANY_X PIPELINE"
 *     body={<>…your prose with <strong>names</strong> etc…</>}
 *     footer="COMPOUND X PIPELINE BRIDGE"
 *     delay={1.4}
 *   />
 */
export default function PipelineBridgeCard({
  label,
  body,
  footer,
  delay = 0,
  accent = 'var(--amber)',
}) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay }}
      style={{
        position: 'relative',
        padding: '22px 26px 20px 26px',
        borderRadius: 6,
        border: `1px solid ${accent}`,
        background: `color-mix(in srgb, ${accent} 8%, transparent)`,
        minHeight: 0,
      }}
    >
      {/* Left accent rule */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 16,
          bottom: 16,
          width: 3,
          background: accent,
          borderRadius: 2,
        }}
      />

      {label && (
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: accent,
            fontWeight: 700,
            marginBottom: '12px',
          }}
        >
          {label}
        </div>
      )}

      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-title)',
          lineHeight: 1.45,
          color: 'var(--cream)',
          fontWeight: 400,
        }}
      >
        {body}
      </div>

      {footer && (
        <div
          className="deck-display italic"
          style={{
            marginTop: '14px',
            fontSize: 'var(--fs-card-label)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'color-mix(in srgb, var(--amber) 70%, var(--cream))',
            fontWeight: 500,
          }}
        >
          {footer}
        </div>
      )}
    </motion.div>
  );
}