// @ts-nocheck
/**
 * LLMBadge — the small "LLM" pill that lives in Zone C (Camera 4)
 * and physically morphs into the L0 Supervisor node in Zone D
 * (Camera 5) via the shared layoutId="cs4-llm-badge".
 *
 * Two visual variants for the SAME logical element:
 *   - 'badge'  : small pill with "LLM" text — Zone C usage
 *   - 'l0'     : larger circle with "L0 Supervisor" caption — Zone D usage
 *
 * The morph between them is automatic (Framer Motion shared-element
 * transition) when the camera advances C4 → C5 because both renders
 * share the same layoutId. ONLY ONE variant should be mounted at a
 * time — gated by camera index in the calling zone.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { CANVAS_LAYOUT_IDS, EASE_EDITORIAL, DUR } from '../themes';

interface Props {
  variant: 'badge' | 'l0';
  /** When true, this is a "ghost" copy (used in panels that show the
   *  same node statically without the layoutId). Skip the layoutId
   *  in that case so we don't compete with the canonical instance. */
  ghost?: boolean;
}

export default function LLMBadge({ variant, ghost = false }: Props) {
  const layoutId = ghost ? undefined : CANVAS_LAYOUT_IDS.llmBadge;

  if (variant === 'badge') {
    return (
      <motion.div
        layoutId={layoutId}
        transition={{ duration: DUR.slow, ease: EASE_EDITORIAL }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 96,
          height: 96,
          borderRadius: '50%',
          background: 'color-mix(in srgb, var(--case, #7BAE7F) 18%, var(--bg, #0D1B2A))',
          border: '2px solid var(--case, #7BAE7F)',
          color: 'var(--case, #7BAE7F)',
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 18,
          letterSpacing: '0.1em',
          fontWeight: 600,
        }}
      >
        LLM
      </motion.div>
    );
  }

  // variant === 'l0'
  return (
    <motion.div
      layoutId={layoutId}
      transition={{ duration: DUR.slow, ease: EASE_EDITORIAL }}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 168,
        height: 168,
        borderRadius: '50%',
        background: 'color-mix(in srgb, var(--case, #7BAE7F) 22%, var(--bg, #0D1B2A))',
        border: '2.5px solid var(--case, #7BAE7F)',
        color: 'var(--cream, #F5F0E8)',
        fontFamily: '"IBM Plex Mono", monospace',
      }}
    >
      <div style={{ fontSize: 14, letterSpacing: '0.18em', color: 'var(--case, #7BAE7F)', marginBottom: 4 }}>
        L0
      </div>
      <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.04em' }}>
        Supervisor
      </div>
    </motion.div>
  );
}
