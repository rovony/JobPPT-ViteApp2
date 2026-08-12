import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * 02b · Operating lens — decision-first method (after hook, before cases).
 *
 * Hook owns Define → Challenge → Test → Act (verbal lock).
 * This slide owns the operational loop: decision → risk → threshold →
 * least model → falsify → action → standard (and the feedback).
 *
 * FitStage 1920×1080; light/dark via --bp-* / `.xc-*` (`styles/xencor-deck.css`).
 * Flow: fixed canvas + scale-to-fit (cs1-poppk DecisionGate pattern).
 * Animation: staggered step/path reveal on enter. No click-to-zoom.
 * No Senior Director on slide. No invented claims.
 */

const EASE = [0.22, 0.7, 0.2, 1] as const;
const FLOW_W = 1000;
const FLOW_H = 480;

type Step = {
  n: number;
  title: string;
  body: string;
  kind?: 'decision' | 'break' | 'standard';
  x: number;
  y: number;
  w: number;
  h: number;
};

const STEPS: Step[] = [
  {
    n: 1,
    title: 'The decision',
    body: 'What action changes, and by when?',
    kind: 'decision',
    x: 20,
    y: 16,
    w: 290,
    h: 88,
  },
  {
    n: 2,
    title: 'Cost of being wrong',
    body: 'Sets how much evidence is enough',
    x: 20,
    y: 140,
    w: 290,
    h: 88,
  },
  {
    n: 3,
    title: 'Evidence threshold',
    body: 'Written down before the answer',
    x: 20,
    y: 264,
    w: 290,
    h: 88,
  },
  {
    n: 4,
    title: 'Least complex model',
    body: 'That can clear that threshold',
    x: 358,
    y: 264,
    w: 290,
    h: 88,
  },
  {
    n: 5,
    title: 'Try to break it',
    body: 'What would falsify the answer?',
    kind: 'break',
    x: 358,
    y: 140,
    w: 290,
    h: 88,
  },
  {
    n: 6,
    title: 'Align on the action',
    body: 'Not on the model',
    x: 358,
    y: 16,
    w: 290,
    h: 88,
  },
  {
    n: 7,
    title: 'Leave a standard',
    body: 'Reusable workflow\nNamed review criteria\nTraceable record\nClear ownership',
    kind: 'standard',
    x: 696,
    y: 16,
    w: 280,
    h: 336,
  },
];

const PRINCIPLES = [
  {
    n: '01',
    title: 'Complexity is a cost, not a credential.',
    body: 'A model no reviewer can challenge is worth less than a simpler one they can.',
  },
  {
    n: '02',
    title: 'The threshold goes first.',
    body: 'Deciding what would convince you after seeing the result is rationalization, not analysis.',
  },
  {
    n: '03',
    title: 'Uncertainty is not the enemy.',
    body: 'Find which uncertainty moves the next decision — and bound that one.',
  },
];

const PATHS = [
  { d: 'M165 104 L165 136', loop: false },
  { d: 'M165 228 L165 260', loop: false },
  { d: 'M310 308 L352 308', loop: false },
  { d: 'M503 264 L503 232', loop: false },
  { d: 'M503 140 L503 108', loop: false },
  { d: 'M648 60 L690 60', loop: false },
  { d: 'M836 360 C836 420, 165 420, 165 380', loop: true },
] as const;

function StepCard({
  step,
  go,
  reduced,
  delay,
}: {
  step: Step;
  go: boolean;
  reduced: boolean | null;
  delay: number;
}) {
  const kindClass =
    step.kind === 'decision'
      ? 'xc-lens__step--decision'
      : step.kind === 'break'
        ? 'xc-lens__step--break'
        : step.kind === 'standard'
          ? 'xc-lens__step--standard'
          : '';

  return (
    <motion.article
      className={`xc-lens__step ${kindClass}`.trim()}
      style={{
        position: 'absolute',
        left: step.x,
        top: step.y,
        width: step.w,
        height: step.h,
      }}
      aria-label={`Step ${step.n}: ${step.title}`}
      initial={{ opacity: 0, y: 6 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : 0.4,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      <div className="xc-lens__step-n">
        <span>{step.n}</span>
        <span aria-hidden>·</span>
        <span>{step.title}</span>
      </div>
      {step.kind === 'standard' ? (
        <ul className="xc-lens__step-list">
          {step.body.split('\n').map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : (
        <p className="xc-lens__step-body">{step.body}</p>
      )}
    </motion.article>
  );
}

function FlowCanvas({ go, reduced }: { go: boolean; reduced: boolean | null }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const uid = useId().replace(/:/g, '');
  const markerId = `lens-arrow-${uid}`;

  useLayoutEffect(() => {
    if (!outerRef.current || typeof ResizeObserver === 'undefined') return;
    const el = outerRef.current;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      const next = Math.min(width / FLOW_W, height / FLOW_H);
      setScale((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pathBase = 0.28;
  const pathStagger = 0.09;

  return (
    <div
      ref={outerRef}
      className="xc-lens__flow"
      aria-label="Seven-step decision-first method"
      style={{ aspectRatio: `${FLOW_W} / ${FLOW_H}` }}
    >
      <div
        className="xc-lens__canvas"
        style={{
          width: FLOW_W,
          height: FLOW_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <svg
          className="xc-lens__connectors"
          viewBox={`0 0 ${FLOW_W} ${FLOW_H}`}
          width={FLOW_W}
          height={FLOW_H}
          aria-hidden
        >
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
          </defs>
          {PATHS.map((p, i) => (
            <motion.path
              key={p.d}
              className={p.loop ? 'xc-lens__path xc-lens__path--loop' : 'xc-lens__path'}
              d={p.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={p.loop ? 1.6 : 2.5}
              strokeDasharray={p.loop ? '6 6' : undefined}
              markerEnd={p.loop ? undefined : `url(#${markerId})`}
              initial={
                reduced
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: reduced ? 0 : 0.35,
                delay: reduced ? 0 : pathBase + i * pathStagger,
                ease: EASE,
              }}
            />
          ))}
        </svg>

        {STEPS.map((step, i) => (
          <StepCard
            key={step.n}
            step={step}
            go={go}
            reduced={reduced}
            delay={0.2 + i * 0.09}
          />
        ))}
      </div>
    </div>
  );
}

export default function OperatingLens() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const go = Boolean(inView && !reduced);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : 0.42,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <motion.section
      ref={ref}
      data-slide="02b"
      data-operating-lens=""
      aria-labelledby="s02b-lens-title"
      className="xc-blueprint-surface xc-lens relative w-full h-full xc-min0 xc-clip-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.2 }}
    >
      <div aria-hidden className="xc-blueprint-frame" />

      <motion.div className="xc-tag xc-lens__kicker" {...enter(0.05)}>
        Operating lens
      </motion.div>

      <motion.h2 id="s02b-lens-title" className="xc-h2 xc-lens__title" {...enter(0.12)}>
        The method follows the decision and the risk —{' '}
        <span className="xc-em">never the reverse</span>
      </motion.h2>

      <div className="xc-lens__body">
        <FlowCanvas go={go || Boolean(reduced)} reduced={reduced} />

        <div className="xc-lens__principles" role="list">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.n}
              role="listitem"
              className="xc-lens__principle"
              initial={{ opacity: 0, y: 8 }}
              animate={go || reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : 0.72 + i * 0.09,
                ease: EASE,
              }}
            >
              <div className="xc-lens__principle-kick">Principle {p.n}</div>
              <div className="xc-lens__principle-title">{p.title}</div>
              <p className="xc-lens__principle-body">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div className="xc-lens__loop" {...enter(0.95)}>
        <span className="xc-lens__loop-label">Feedback</span>
        <span className="xc-lens__loop-text">
          The standard changes what the next decision costs
        </span>
      </motion.div>
    </motion.section>
  );
}
