import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "../assets/easings";

export type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** mark this card as the "winning" stat — gets B8 glow + accent border */
  featured?: boolean;
};

type Props = {
  cards: Stat[];
  delay?: number;
  staggerDelay?: number;
  tickerDuration?: number; // ms
};

/**
 * B4 + C7 — Stat-Card Register with Integer Tickers.
 * Cascades in via C2; numerals count from 0 → target via requestAnimationFrame.
 */
export function StatCardRegister({
  cards,
  delay = 0,
  staggerDelay = 0.15,
  tickerDuration = 1500,
}: Props) {
  return (
    <div className="scr">
      {cards.map((card, i) => (
        <StatCard
          key={card.label}
          {...card}
          delay={delay + i * staggerDelay}
          tickerDuration={tickerDuration}
        />
      ))}
    </div>
  );
}

function StatCard({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  featured = false,
  delay,
  tickerDuration,
}: Stat & { delay: number; tickerDuration: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setDisplay(value);
      return;
    }
    const start = performance.now() + delay * 1000;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / tickerDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // Expo-Out applied to value
      setDisplay(eased * value);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, delay, tickerDuration]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString();

  return (
    <motion.div
      ref={ref}
      className={`scr__card ${featured ? "scr__card--featured" : ""}`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: reduced ? 0 : 0.6,
        delay: reduced ? 0 : delay,
        ease: EASE.expoOut,
      }}
    >
      <div className="scr__value">
        {prefix && <span className="scr__unit">{prefix}</span>}
        <span className="scr__number">{formatted}</span>
        {suffix && <span className="scr__unit">{suffix}</span>}
      </div>
      <div className="scr__label">{label}</div>
    </motion.div>
  );
}
