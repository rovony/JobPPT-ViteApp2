// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.68, 0.28, 1];

/** Show children when deck step >= at. Prev click hides again. */
export default function StepShow({
  step = 0,
  at = 0,
  children,
  style,
  className,
  y = 10,
  dimBelow = false,
}) {
  const reduced = useReducedMotion();
  const shown = step >= at;
  const dimmed = dimBelow && step > at;

  if (reduced) {
    return (
      <div className={className} style={{ opacity: shown ? (dimmed ? 0.55 : 1) : 0.15, ...style }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={false}
      animate={{
        opacity: shown ? (dimmed ? 0.5 : 1) : 0,
        y: shown ? 0 : y,
        filter: shown ? 'blur(0px)' : 'blur(4px)',
        pointerEvents: shown ? 'auto' : 'none',
      }}
      transition={{ duration: 0.32, ease: EASE }}
      style={style}
    >
      {children}
    </motion.div>
  );
}
