import React from 'react';
import { motion } from 'framer-motion';

/**
 * LungVasculature — anatomical pediatric PAH visualization.
 *
 * Proper lung anatomy:
 *   • Trachea + carina (central vertical airway with bifurcation)
 *   • Left lung (2 lobes) with oblique fissure
 *   • Right lung (3 lobes) with oblique + horizontal fissures
 *   • Bronchial tree inside each lung (main → lobar → segmental)
 *   • Soft filled lung silhouettes at low opacity, neon bronchi on top
 *
 * Strokes draw L/R symmetric for a satisfying reveal.
 * Color resolves from the `--case` CSS var.
 */
export default function LungVasculature({
  stroke = 'var(--case, var(--coral))',
  delay = 0.3,
  className,
}) {
  return (
    <svg
      viewBox="0 0 520 620"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-label="Anatomical illustration of human lungs with trachea, bronchi, and lobar structure"
      role="img"
    >
      <defs>
        <filter id="lung-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ═══ Lung body fills (soft wash, fade in) ═══ */}
      <motion.path
        d="M 240 150 C 200 148 160 180 140 230 C 120 290 118 370 130 450 C 138 500 160 540 200 548 C 230 552 250 530 252 490 L 252 180 C 252 162 248 150 240 150 Z"
        fill={stroke}
        fillOpacity={0.08}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: delay + 0.2 }}
      />
      <motion.path
        d="M 280 150 C 320 148 360 180 380 230 C 400 290 402 370 390 450 C 382 500 360 540 320 548 C 290 552 270 530 268 490 L 268 180 C 268 162 272 150 280 150 Z"
        fill={stroke}
        fillOpacity={0.08}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: delay + 0.2 }}
      />

      <g filter="url(#lung-glow)" fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
        {/* ═══ Trachea (central vertical airway) ═══ */}
        <AnimatedPath
          d="M 260 70 L 260 230"
          strokeWidth={4}
          delay={delay}
          duration={0.7}
        />
        {/* Tracheal rings — horizontal ticks */}
        {[88, 108, 128, 148, 168, 188, 208].map((y, i) => (
          <AnimatedPath
            key={`ring-${i}`}
            d={`M 252 ${y} L 268 ${y}`}
            strokeWidth={1.4}
            delay={delay + 0.1 + i * 0.04}
            duration={0.3}
          />
        ))}

        {/* ═══ Carina — bifurcation into L/R main bronchi ═══ */}
        <AnimatedPath
          d="M 260 230 C 248 240 232 252 216 268"
          strokeWidth={3.4}
          delay={delay + 0.5}
          duration={0.6}
        />
        <AnimatedPath
          d="M 260 230 C 272 240 288 252 304 268"
          strokeWidth={3.4}
          delay={delay + 0.5}
          duration={0.6}
        />

        {/* ═══ LEFT LUNG — bronchial tree (2 lobes) ═══ */}
        {/* Left main bronchus continuation */}
        <AnimatedPath
          d="M 216 268 C 204 290 196 320 192 360"
          strokeWidth={2.6}
          delay={delay + 0.85}
          duration={0.7}
        />
        {/* Upper lobe bronchus */}
        <AnimatedPath
          d="M 210 280 C 190 292 172 300 156 310"
          strokeWidth={2}
          delay={delay + 1.05}
          duration={0.6}
        />
        {/* Lower lobe bronchus */}
        <AnimatedPath
          d="M 194 350 C 180 380 170 410 164 450"
          strokeWidth={2}
          delay={delay + 1.15}
          duration={0.6}
        />
        {/* Segmental branches — upper */}
        <AnimatedPath d="M 176 302 C 162 296 148 292 134 290" strokeWidth={1.3} delay={delay + 1.3} duration={0.5} />
        <AnimatedPath d="M 168 318 C 150 322 134 326 120 334" strokeWidth={1.2} delay={delay + 1.35} duration={0.5} />
        <AnimatedPath d="M 186 262 C 170 254 156 248 144 240" strokeWidth={1.2} delay={delay + 1.3} duration={0.5} />
        {/* Segmental branches — lower */}
        <AnimatedPath d="M 184 388 C 168 396 154 404 140 416" strokeWidth={1.3} delay={delay + 1.4} duration={0.5} />
        <AnimatedPath d="M 176 425 C 160 438 148 454 138 472" strokeWidth={1.2} delay={delay + 1.45} duration={0.5} />
        <AnimatedPath d="M 170 465 C 156 482 148 502 144 520" strokeWidth={1.1} delay={delay + 1.5} duration={0.5} />
        {/* Left oblique fissure */}
        <AnimatedPath
          d="M 148 230 C 168 290 180 340 180 420"
          strokeWidth={1.2}
          delay={delay + 1.6}
          duration={0.7}
        />

        {/* ═══ RIGHT LUNG — bronchial tree (3 lobes, mirrored + horizontal fissure) ═══ */}
        {/* Right main bronchus continuation */}
        <AnimatedPath
          d="M 304 268 C 316 290 324 320 328 360"
          strokeWidth={2.6}
          delay={delay + 0.85}
          duration={0.7}
        />
        {/* Upper lobe bronchus */}
        <AnimatedPath
          d="M 310 280 C 330 292 348 300 364 310"
          strokeWidth={2}
          delay={delay + 1.05}
          duration={0.6}
        />
        {/* Middle lobe bronchus (right-only anatomy) */}
        <AnimatedPath
          d="M 322 330 C 340 340 356 348 370 358"
          strokeWidth={1.8}
          delay={delay + 1.15}
          duration={0.6}
        />
        {/* Lower lobe bronchus */}
        <AnimatedPath
          d="M 326 360 C 340 390 350 420 356 450"
          strokeWidth={2}
          delay={delay + 1.2}
          duration={0.6}
        />
        {/* Segmental branches — upper */}
        <AnimatedPath d="M 344 302 C 358 296 372 292 386 290" strokeWidth={1.3} delay={delay + 1.3} duration={0.5} />
        <AnimatedPath d="M 352 318 C 370 322 386 326 400 334" strokeWidth={1.2} delay={delay + 1.35} duration={0.5} />
        <AnimatedPath d="M 334 262 C 350 254 364 248 376 240" strokeWidth={1.2} delay={delay + 1.3} duration={0.5} />
        {/* Segmental branches — middle */}
        <AnimatedPath d="M 356 348 C 372 354 386 360 398 370" strokeWidth={1.1} delay={delay + 1.4} duration={0.5} />
        {/* Segmental branches — lower */}
        <AnimatedPath d="M 340 395 C 356 404 370 414 382 426" strokeWidth={1.3} delay={delay + 1.45} duration={0.5} />
        <AnimatedPath d="M 346 430 C 362 444 374 460 382 478" strokeWidth={1.2} delay={delay + 1.5} duration={0.5} />
        <AnimatedPath d="M 354 468 C 366 486 372 506 376 520" strokeWidth={1.1} delay={delay + 1.55} duration={0.5} />
        {/* Right oblique fissure */}
        <AnimatedPath
          d="M 372 230 C 352 290 340 340 340 420"
          strokeWidth={1.2}
          delay={delay + 1.6}
          duration={0.7}
        />
        {/* Right horizontal fissure (separates upper from middle lobe) */}
        <AnimatedPath
          d="M 272 320 C 300 322 332 324 360 326"
          strokeWidth={1.2}
          delay={delay + 1.7}
          duration={0.6}
        />
      </g>
    </svg>
  );
}

function AnimatedPath({ d, strokeWidth = 1.5, delay = 0, duration = 1 }) {
  return (
    <motion.path
      d={d}
      strokeWidth={strokeWidth}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration, ease: [0.2, 0.7, 0.3, 1], delay },
        opacity: { duration: 0.3, delay },
      }}
    />
  );
}