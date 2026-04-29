// @ts-nocheck
/**
 * AnalystIcon — the rose silhouette that represents the
 * pharmacometrician in the canvas.
 *
 * Carries layoutId="cs4-analyst" so Framer Motion physically
 * interpolates the icon's position+size when the camera moves between
 * cameras 2, 5, 9, and the finale. There must be EXACTLY ONE instance
 * with this layoutId mounted at any time — render the icon in ZoneA
 * (its primary home) and hide other instances behind opacity:0
 * (or simply don't render them; the layoutId match still works
 * because Framer Motion treats this single instance as the source of
 * truth across the canvas).
 *
 * Variants:
 *   silhouette  (default)  — simple rose silhouette circle + body
 *   tier1       — slightly more defined, used at C5 Tier-1 position
 *   review-gate — silhouette with amber alert ring (C9 review fires)
 *   at-desk     — analyst sitting at a desk closing a laptop (C10 S3)
 *
 * Size/scale is determined by the parent (or by the layoutId-driven
 * morph). Default size 220×220 px when no `size` prop given.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { CANVAS_LAYOUT_IDS } from '../themes';

interface Props {
  variant?: 'silhouette' | 'tier1' | 'review-gate' | 'at-desk';
  size?: number;
  opacity?: number;
  /** When true, skip the layoutId so this can be a non-shared decorative copy. */
  noLayoutId?: boolean;
  /** Suppress the amber alert ring (variant=review-gate). */
  alert?: boolean;
}

export default function AnalystIcon({
  variant = 'silhouette',
  size = 220,
  opacity = 0.7,
  noLayoutId = false,
  alert = false,
}: Props) {
  const layoutId = noLayoutId ? undefined : CANVAS_LAYOUT_IDS.analyst;

  return (
    <motion.div
      layoutId={layoutId}
      style={{
        width: size,
        height: size,
        position: 'relative',
        opacity,
      }}
    >
      <svg
        viewBox="0 0 220 220"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
      >
        {/* Head */}
        <circle
          cx="110"
          cy="78"
          r="36"
          fill="var(--rose, #C4847A)"
          opacity="0.9"
        />
        {/* Shoulders / torso */}
        <path
          d="M 50 220 L 50 175 Q 50 130 110 130 Q 170 130 170 175 L 170 220 Z"
          fill="var(--rose, #C4847A)"
          opacity="0.8"
        />

        {/* At-desk variant — laptop graphic */}
        {variant === 'at-desk' && (
          <>
            <rect
              x="60"
              y="180"
              width="100"
              height="6"
              fill="var(--cream, #F5F0E8)"
              opacity="0.8"
            />
            <rect
              x="68"
              y="186"
              width="84"
              height="3"
              fill="var(--cream, #F5F0E8)"
              opacity="0.5"
            />
          </>
        )}
      </svg>

      {/* Amber review-gate alert ring */}
      {variant === 'review-gate' && alert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 0], scale: [0.9, 1.15, 1.05] }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: -12,
            border: '2px solid var(--alert, #E8B547)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}

/** Default rose color — exported for use by non-icon callers (eg overlays). */
export const ROSE = 'var(--rose, #C4847A)';
