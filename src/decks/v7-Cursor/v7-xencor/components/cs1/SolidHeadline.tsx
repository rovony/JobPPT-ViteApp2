// Solid headline — no GSAP SplitText. Presentation-safe: never starts invisible.
import { motion, useReducedMotion } from 'framer-motion';
import { GridSlot } from '@/components/deck/SlideGrid';

export default function SolidHeadline({
  children,
  delay = 0.2,
  maxChars = 72,
  area = 'headline',
}: {
  children: React.ReactNode;
  delay?: number;
  maxChars?: number;
  area?: string;
}) {
  const reduced = useReducedMotion();
  const safeDelay = Math.min(delay, 0.35);

  return (
    <GridSlot
      area={area}
      as="h1"
      className="deck-display self-center"
      style={{
        fontSize: 'var(--fs-slide-headline)',
        lineHeight: 1.22,
        letterSpacing: '-0.01em',
        color: 'var(--cream)',
        fontWeight: 600,
        maxWidth: `${maxChars}ch`,
        margin: 0,
      }}
    >
      <motion.div
        // Always readable: opacity stays at 1; only a short settle on y.
        initial={reduced ? false : { opacity: 1, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : safeDelay, ease: [0.2, 0.7, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </GridSlot>
  );
}
