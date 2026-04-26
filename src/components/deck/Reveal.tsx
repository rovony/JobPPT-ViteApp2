import React from 'react';
import { motion } from 'framer-motion';
import { revealUp, revealIn } from '@/lib/motion';

/**
 * Reveal — step-driven reveal primitive.
 * If `at` is provided, the element animates when deck.step >= at.
 * Otherwise, it follows its parent's stagger sequence.
 */
export default function Reveal({ at, step, variant = 'up', delay = 0, children, className, as = 'div', ...rest }) {
  const v = variant === 'in' ? revealIn : revealUp;
  const isStepDriven = typeof at === 'number' && typeof step === 'number';
  const shown = isStepDriven ? step >= at : true;
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={v.initial}
      animate={shown ? { ...v.enter, transition: { ...v.enter.transition, delay } } : v.initial}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}