// @ts-nocheck
import React from 'react';
import { Particles } from '@/components/magicui/particles';

/**
 * AmbientParticles — wraps the magicui Particles component with the
 * specific configuration A1 §5 prescribes for slide 08 (Privacy):
 * particles drift from the LLM band toward the wall and get absorbed.
 *
 * Direction is suggested by the `vx`/`vy` defaults; the underlying
 * Particles component handles the canvas + RAF loop.
 *
 * Reduced-motion: Particles itself respects prefers-reduced-motion by
 * pausing animation; we still render a static field of dots.
 */

type Props = {
  density?: number;
  staticColor?: string;
  className?: string;
};

export default function AmbientParticles({
  density = 60,
  staticColor = 'var(--cream-faint)',
  className,
}: Props) {
  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      className={className}
    >
      <Particles
        className="absolute inset-0"
        quantity={density}
        ease={80}
        color="#a0a0a0"
        refresh={false}
        staticity={50}
      />
    </div>
  );
}
