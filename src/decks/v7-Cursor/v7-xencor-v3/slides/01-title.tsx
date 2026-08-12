import React, { useCallback, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { BP } from '../_shared/blueprint';

/**
 * 01-title — Blueprint-inspired cover for v7-xencor-v3.
 *
 * Theme: `.deck-root[data-theme-mode]` via `--bp-*` in
 * `styles/xencor-deck.css`. Type via `.xc-*` utilities.
 * Tag: Pharmacometrics & Clinical Pharmacology (no Senior Director).
 * isTitle: true suppresses the standard footer.
 *
 * Theme preference: footnote Light|Dark radiogroup wired to DeckRunner
 * `setThemeMode` (same `deck-theme-override:{id}` path as chrome toggle).
 */

type ThemeMode = 'light' | 'dark';

type TitleSlideProps = {
  themeMode?: ThemeMode;
  setThemeMode?: (mode: ThemeMode) => void;
};

const THEME_OPTIONS = ['light', 'dark'] as const;

export default function TitleSlide({
  themeMode = 'light',
  setThemeMode,
}: TitleSlideProps = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();
  const go = isInView && !prefersReducedMotion;
  const mode: ThemeMode = themeMode === 'dark' ? 'dark' : 'light';

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.45,
      delay: prefersReducedMotion ? 0 : delay,
      ease: [0.22, 0.7, 0.2, 1] as const,
    },
  });

  return (
    <motion.section
      ref={ref}
      data-slide="01"
      data-title-blueprint=""
      aria-labelledby="s01-title"
      className="xc-blueprint-surface xc-slide-pad--tight relative w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
    >
      <div aria-hidden className="xc-blueprint-frame" />

      <div className="xc-title-grid">
        <div
          className="flex flex-col min-w-0 min-h-0"
          style={{ paddingTop: 'clamp(8px, 1.5vh, 24px)' }}
        >
          <motion.div className="xc-tag-chip" {...enter(0.06)}>
            Pharmacometrics &amp; Clinical Pharmacology
          </motion.div>

          <motion.h1
            id="s01-title"
            className="xc-h1"
            style={{ marginTop: 'clamp(1rem, 2.2vh, 1.6rem)', maxWidth: '16ch' }}
            {...enter(0.14)}
          >
            Quantitative decisions
            <br />
            when the{' '}
            <span className="xc-em">clean experiment</span>
            <br />
            is unavailable
          </motion.h1>

          <motion.p
            className="xc-subtitle xc-teal"
            style={{ marginTop: 'clamp(0.85rem, 1.8vh, 1.35rem)', maxWidth: '36ch' }}
            {...enter(0.26)}
          >
            Four decisions. Four different reasons the obvious study
            could not be run. One discipline.
          </motion.p>

          <motion.div className="xc-title-byline" {...enter(0.38)}>
            <div className="xc-name xc-ink" style={{ whiteSpace: 'nowrap' }}>
              Malek Okour, BDS, Ph.D.
            </div>
            <div className="xc-meta xc-ink3" style={{ marginTop: 6 }}>
              Xencor interview panel · 12 August 2026
            </div>
            {setThemeMode ? (
              <ThemePreferenceFootnote mode={mode} onChange={setThemeMode} />
            ) : null}
          </motion.div>
        </div>

        <motion.div
          className="relative min-w-0 min-h-0 flex items-center justify-center"
          style={{ paddingBottom: 8 }}
          {...enter(0.2)}
        >
          <DecisionLattice />
        </motion.div>
      </div>

      <div
        className="xc-pageno absolute z-[2]"
        style={{ right: 64, bottom: 28 }}
      >
        01
      </div>
    </motion.section>
  );
}

/**
 * Seminar-safe theme ask: compact boxed footnote under byline meta.
 * Hairline divider above; labeled radiogroup (Light | Dark); usable
 * hit targets; cyan active ring; keyboard arrows; reduced-motion in CSS.
 */
function ThemePreferenceFootnote({
  mode,
  onChange,
}: {
  mode: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}) {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const i = THEME_OPTIONS.indexOf(mode);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        onChange(THEME_OPTIONS[(i + 1) % THEME_OPTIONS.length]);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        onChange(THEME_OPTIONS[(i - 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length]);
      }
    },
    [mode, onChange],
  );

  return (
    <div
      className="xc-theme-pref"
      role="radiogroup"
      aria-label="Preferred slide appearance"
      onKeyDown={onKeyDown}
    >
      <div className="xc-theme-pref__box">
        <span className="xc-theme-pref__label" id="s01-theme-pref-label">
          Preferred view
        </span>
        <div
          className="xc-theme-pref__track"
          aria-labelledby="s01-theme-pref-label"
        >
          {THEME_OPTIONS.map((opt) => {
            const selected = mode === opt;
            return (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={selected}
                tabIndex={selected ? 0 : -1}
                className="xc-theme-pref__opt"
                data-active={selected ? '' : undefined}
                onClick={() => onChange(opt)}
              >
                {opt === 'light' ? 'Light' : 'Dark'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DecisionLattice() {
  const svgAxis = {
    letterSpacing: '0.06em',
  } as const;
  const svgAnnot = {
    letterSpacing: '0.12em',
  } as const;
  const svgLabel = {
    fontWeight: 600 as const,
  };

  return (
    <svg
      viewBox="0 0 880 780"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      style={{ maxHeight: '100%', maxWidth: '100%' }}
      aria-label="Decision lattice: four evidence routes converging on a defendable decision when the clean experiment is unavailable"
    >
      <defs>
        <filter id="title-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="title-glowS" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker
          id="title-aF"
          markerWidth="9"
          markerHeight="9"
          refX="8"
          refY="4.5"
          orient="auto"
        >
          <path d="M0,0 L9,4.5 L0,9 z" fill={BP.markerF} />
        </marker>
        <marker
          id="title-aFC"
          markerWidth="9"
          markerHeight="9"
          refX="8"
          refY="4.5"
          orient="auto"
        >
          <path d="M0,0 L9,4.5 L0,9 z" fill={BP.markerC} />
        </marker>
      </defs>

      <g stroke={BP.hair} strokeWidth="1" fill="none">
        <path
          d="M60 40 L820 40"
          markerStart="url(#title-aF)"
          markerEnd="url(#title-aF)"
        />
        <path
          d="M40 60 L40 740"
          markerStart="url(#title-aF)"
          markerEnd="url(#title-aF)"
        />
      </g>
      <text
        className="xc-svg"
        x="440"
        y="28"
        textAnchor="middle"
        style={{ fill: BP.ink4, ...svgAxis }}
      >
        DECISION SPACE
      </text>
      <text
        className="xc-svg"
        x="28"
        y="400"
        textAnchor="middle"
        transform="rotate(-90 28 400)"
        style={{ fill: BP.ink4, ...svgAxis }}
      >
        EVIDENCE AVAILABLE
      </text>

      <rect
        x="330"
        y="96"
        width="260"
        height="120"
        fill={BP.roseWash}
        stroke={BP.rose}
        strokeWidth="2"
        strokeDasharray="9 7"
      />
      <text
        className="xc-svg"
        x="460"
        y="142"
        textAnchor="middle"
        style={{
          fill: BP.ink3,
          ...svgLabel,
          letterSpacing: '0.1em',
        }}
      >
        THE CLEAN
      </text>
      <text
        className="xc-svg"
        x="460"
        y="168"
        textAnchor="middle"
        style={{
          fill: BP.ink3,
          ...svgLabel,
          letterSpacing: '0.1em',
        }}
      >
        EXPERIMENT
      </text>
      <text
        className="xc-svg"
        x="460"
        y="196"
        textAnchor="middle"
        style={{ fill: BP.rose, ...svgAnnot }}
      >
        not available
      </text>
      <circle cx="590" cy="96" r="19" fill={BP.rose} />
      <path
        d="M582 88 L598 104 M598 88 L582 104"
        stroke={BP.xStroke}
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      <g
        fill="none"
        stroke={BP.cyan}
        strokeWidth="2.5"
        filter="url(#title-glowS)"
      >
        <path
          d="M120 300 L120 420 L400 420 L400 500"
          markerEnd="url(#title-aFC)"
        />
        <path
          d="M330 300 L330 380 L430 380 L430 500"
          markerEnd="url(#title-aFC)"
        />
        <path
          d="M560 300 L560 380 L490 380 L490 500"
          markerEnd="url(#title-aFC)"
        />
        <path
          d="M780 300 L780 420 L520 420 L520 500"
          markerEnd="url(#title-aFC)"
        />
      </g>

      <g>
        {(
          [
            { x: 52, cx: 120, label: 'EXPOSURE', caseN: 'case 01' },
            { x: 262, cx: 330, label: 'TRANSPORT', caseN: 'case 02' },
            { x: 492, cx: 560, label: 'PRECISION', caseN: 'case 03' },
            { x: 712, cx: 780, label: 'TRACEABILITY', caseN: 'case 04' },
          ] as const
        ).map((n) => (
          <g key={n.label}>
            <text
              className="xc-svg"
              x={n.cx}
              y="238"
              textAnchor="middle"
              style={{ fill: BP.ink4, ...svgAnnot }}
            >
              {n.caseN}
            </text>
            <rect
              x={n.x}
              y="252"
              width="136"
              height="48"
              fill={BP.paper2}
              stroke={BP.ink}
              strokeWidth="2"
            />
            <text
              className="xc-svg"
              x={n.cx}
              y="282"
              textAnchor="middle"
              style={{
                fill: BP.ink,
                ...svgLabel,
                letterSpacing: '0.1em',
              }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </g>

      <g filter="url(#title-glow)">
        <rect
          x="330"
          y="508"
          width="260"
          height="96"
          fill={BP.panelHi}
        />
      </g>
      <text
        className="xc-svg-decision"
        x="460"
        y="548"
        textAnchor="middle"
        style={{ fill: BP.decisionInk }}
      >
        A DEFENDABLE
      </text>
      <text
        className="xc-svg-decision"
        x="460"
        y="578"
        textAnchor="middle"
        style={{ fill: BP.decisionAccent }}
      >
        DECISION
      </text>

      <path
        d="M600 556 L700 556 L700 640"
        fill="none"
        stroke={BP.ink4}
        strokeWidth="1.2"
      />
      <circle cx="600" cy="556" r="4" fill={BP.cyan} />
      <text
        className="xc-svg"
        x="700"
        y="666"
        textAnchor="middle"
        style={{ fill: BP.ink4, ...svgAnnot }}
      >
        the method changed
      </text>
      <text
        className="xc-svg"
        x="700"
        y="688"
        textAnchor="middle"
        style={{ fill: BP.ink4, ...svgAnnot }}
      >
        every time
      </text>
      <text
        className="xc-svg"
        x="700"
        y="716"
        textAnchor="middle"
        style={{ fill: BP.cyan, ...svgAnnot }}
      >
        the route did not
      </text>
    </svg>
  );
}
