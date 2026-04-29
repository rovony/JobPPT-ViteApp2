import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "../assets/easings";

type Step = {
  label: string;
  caption: string;
  /** seconds into the timeline when this step becomes active */
  at: number;
};

type Props = {
  steps: Step[];
  /** total duration of the timeline, seconds */
  duration: number;
};

/**
 * E1 (mini) — Cinematic Stepper.
 * State machine that advances through N steps over a fixed duration.
 * Includes Play/Pause/Reset controls and a progress timeline.
 */
export function CinematicStepper({ steps, duration }: Props) {
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const startRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!playing) return;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const t = (now - startRef.current) / 1000 + offsetRef.current;
      if (t >= duration) {
        setElapsed(duration);
        setPlaying(false);
        return;
      }
      setElapsed(t);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, duration]);

  const togglePlay = () => {
    if (playing) {
      offsetRef.current = elapsed;
      startRef.current = null;
      setPlaying(false);
    } else {
      if (elapsed >= duration) {
        setElapsed(0);
        offsetRef.current = 0;
      }
      startRef.current = null;
      setPlaying(true);
    }
  };

  const reset = () => {
    setPlaying(false);
    startRef.current = null;
    offsetRef.current = 0;
    setElapsed(0);
  };

  // C7 — find current step
  const activeIndex = steps.reduce(
    (acc, s, i) => (elapsed >= s.at ? i : acc),
    0
  );
  const progress = elapsed / duration;
  const minutes = Math.floor(elapsed / 60);
  const seconds = Math.floor(elapsed % 60);
  const timeLabel = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="stepper">
      <div className="stepper__timeline">
        <span className="stepper__time">{timeLabel}</span>
        <div className="stepper__progress">
          <motion.div
            className="stepper__progress-fill"
            style={{ width: "100%" }}
            animate={{ scaleX: progress }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.1, ease: "linear" }
            }
          />
        </div>
        <span className="stepper__time">
          {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, "0")}
        </span>
      </div>

      <div className="stepper__steps">
        {steps.map((s, i) => {
          const state =
            i < activeIndex ? "done" : i === activeIndex ? "active" : "";
          return (
            <div
              key={s.label}
              className={`stepper__step ${state ? `stepper__step--${state}` : ""}`}
            >
              {s.label}
            </div>
          );
        })}
      </div>

      <motion.div
        key={activeIndex}
        className="stepper__caption"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduced ? 0 : 0.4,
          ease: EASE.expoOut,
        }}
      >
        {steps[activeIndex]?.caption}
      </motion.div>

      <div className="stepper__controls">
        <button
          className="stepper__btn stepper__btn--primary"
          onClick={togglePlay}
        >
          {playing ? "Pause" : elapsed >= duration ? "Replay" : "Play"}
        </button>
        <button className="stepper__btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
