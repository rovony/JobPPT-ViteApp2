import React from 'react';
import { motion } from 'framer-motion';

/**
 * IndiaMap — neon-stroke silhouette of India.
 *
 * Stylized contour of the Indian subcontinent (mainland + NE states +
 * Sri Lanka reference dot). Not a geographic-grade projection — the
 * shape is recognizable at slide scale and matches the reference art.
 *
 * Renders:
 *   • Filled silhouette at low opacity
 *   • Main outline that draws in
 *   • NE states isolated contour
 *   • Soft glow via SVG filter
 *
 * Color resolves from `--case` CSS var by default (cyan for CS2).
 */
export default function IndiaMap({
  stroke = 'var(--case, var(--cyan))',
  delay = 0.3,
  className,
}) {
  // Mainland India contour — stylized path, starts top (Kashmir) and
  // moves clockwise down to Kanyakumari, up through Bengal, back to top.
  const mainland = `
    M 235 40
    C 265 38 290 48 318 62
    C 340 76 352 92 348 108
    C 344 122 322 130 308 134
    C 296 140 290 156 296 170
    C 306 188 324 200 336 220
    C 348 240 354 264 352 290
    C 350 316 338 340 322 362
    C 306 384 290 406 272 430
    C 256 452 240 474 226 496
    C 214 516 206 538 200 556
    C 198 566 194 574 186 576
    C 176 578 168 570 164 556
    C 158 534 160 510 168 484
    C 176 458 188 432 200 406
    C 210 382 216 358 212 334
    C 208 310 194 290 178 276
    C 160 260 140 254 124 242
    C 108 228 96 208 92 186
    C 90 168 96 154 108 148
    C 124 142 146 148 162 142
    C 178 134 186 118 194 100
    C 202 82 214 66 232 50
    Z
  `;

  // NE states (isolated tail — Assam/Manipur/Nagaland cluster)
  const neStates = `
    M 362 116
    C 378 114 392 120 402 132
    C 410 144 410 158 402 168
    C 394 178 380 182 366 180
    C 354 178 344 168 344 156
    C 344 142 352 128 362 116
    Z
  `;

  // Sri Lanka reference dot
  const sriLanka = 'M 218 600 C 226 598 234 606 232 616 C 230 624 222 628 214 624 C 208 620 210 608 218 600 Z';

  return (
    <svg
      viewBox="0 0 440 660"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-label="Stylized map of India"
      role="img"
    >
      <defs>
        <filter id="india-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#india-glow)">
        {/* Fill wash */}
        <motion.path
          d={mainland}
          fill={stroke} fillOpacity={0.12}
          stroke="none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.2, 0.7, 0.3, 1], delay: delay + 1.6 }}
        />
        <motion.path
          d={neStates}
          fill={stroke} fillOpacity={0.12}
          stroke="none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.2, 0.7, 0.3, 1], delay: delay + 1.8 }}
        />

        {/* Mainland outline — draws */}
        <motion.path
          d={mainland}
          fill="none" stroke={stroke} strokeWidth={2.4}
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 2.4, ease: [0.2, 0.7, 0.3, 1], delay },
            opacity: { duration: 0.3, delay },
          }}
        />

        {/* NE states — draws after mainland */}
        <motion.path
          d={neStates}
          fill="none" stroke={stroke} strokeWidth={2.0}
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 0.9, ease: [0.2, 0.7, 0.3, 1], delay: delay + 1.4 },
            opacity: { duration: 0.3, delay: delay + 1.4 },
          }}
        />

        {/* Sri Lanka */}
        <motion.path
          d={sriLanka}
          fill={stroke} fillOpacity={0.35}
          stroke={stroke} strokeWidth={1.4}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: delay + 2.4 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      </g>
    </svg>
  );
}