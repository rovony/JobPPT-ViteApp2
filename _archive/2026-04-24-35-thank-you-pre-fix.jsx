import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe, Linkedin } from 'lucide-react';

/**
 * Slide 35 · Thank you — Questions welcome.
 *
 * The deck's final argument is structural: across thirty-four
 * slides, five framework themes have been instantiated, threaded
 * across three case studies, and consolidated into the closing
 * act. The constellation that has carried that through-line on
 * slides 30, 31, and previously this slide as a faint watermark
 * is promoted here from background to foreground — the K5 graph
 * IS the closing visual, completed live, with "Thank you."
 * landing on its central convergence point.
 *
 * The motion sequence is the argument: five nodes settle into
 * place, ten edges trace into a complete graph, an amber pulse
 * lights the center, and the title resolves on top of it. The
 * audience watches the deck's structure assemble one final time
 * as the speaker says the closing line.
 *
 * Reduced-motion fallback: the constellation is drawn fully
 * present (no entrance), the title is fully visible, and only
 * the center pulse is suppressed. The composition still reads
 * as deliberate, just without the build.
 */

// Five-pointed pentagon, apex at top, in a 600x600 viewBox.
// Order matches slides 30/31: amber/cyan/sage/violet/coral.
const NODE_TOKENS = ['amber', 'cyan', 'sage', 'violet', 'coral'];
const VIEWBOX = 600;
const CENTER = VIEWBOX / 2;
const RADIUS = 220;

function vertexAt(i) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

const VERTICES = NODE_TOKENS.map((_, i) => vertexAt(i));

const EDGES = [];
for (let i = 0; i < 5; i += 1) {
  for (let j = i + 1; j < 5; j += 1) EDGES.push([i, j]);
}

export default function Slide35ThankYou() {
  const prefersReduced = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const overshoot = [0.34, 1.56, 0.64, 1];

  // Master timeline (seconds). Tuned so the constellation completes
  // before the title resolves, so the audience reads structure first
  // and gratitude second — not the other way around.
  const T = useMemo(
    () => ({
      chrome: 0.10,
      nodesStart: 0.20,
      nodesStagger: 0.07,
      edgesStart: 0.55,
      edgesStagger: 0.045,
      centerPulse: 1.30,
      thank: 1.45,
      you: 1.85,
      rule: 2.20,
      sub: 2.50,
      author: 2.80,
      contact: 2.95,
    }),
    []
  );

  return (
    <motion.section
      data-case="amber"
      className="relative w-full h-[100dvh] overflow-hidden"
      style={{ background: 'var(--bg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      <BackgroundFieldVignette />

      <ConstellationStage
        T={T}
        ease={ease}
        overshoot={overshoot}
        prefersReduced={!!prefersReduced}
      />

      <Chrome T={T} ease={ease} />

      <CenterTypography T={T} ease={ease} prefersReduced={!!prefersReduced} />

      <AuthorBlock T={T} ease={ease} />

      <ContactBlock T={T} ease={ease} />
    </motion.section>
  );
}

/* ============================================================
   BackgroundFieldVignette — single very faint radial wash so the
   constellation reads against depth, not against a flat plane.
   No gradient noise, no particles. Pure radial fade.
   ============================================================ */
function BackgroundFieldVignette() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse at center, color-mix(in srgb, var(--amber) 2.5%, transparent) 0%, transparent 60%)',
        zIndex: 0,
      }}
    />
  );
}

/* ============================================================
   ConstellationStage — full-canvas SVG. The K5 graph is the
   slide's primary illustration. Sized so the apex node sits
   comfortably above the title and the bottom-left/bottom-right
   nodes clear the chrome and contact rails at 1366x768.
   ============================================================ */
function ConstellationStage({ T, ease, overshoot, prefersReduced }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      style={{ zIndex: 1 }}
    >
      <div
        style={{
          width: 'min(78vh, 64vw)',
          aspectRatio: '1 / 1',
          position: 'relative',
        }}
      >
        <svg
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <filter id="finale-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="finale-center-pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.55" />
              <stop offset="60%" stopColor="var(--amber)" stopOpacity="0.10" />
              <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Edges — K5 graph traced with pathLength, with a brief
              amber flash as the light "travels" the thread, then
              settling to a dim cream hairline. The flash is what
              gives the graph the sense of being lit, not drawn. */}
          <g>
            {EDGES.map(([i, j], idx) => {
              const a = VERTICES[i];
              const b = VERTICES[j];
              const key = `e-${i}-${j}`;
              const delay = T.edgesStart + idx * T.edgesStagger;
              if (prefersReduced) {
                return (
                  <line
                    key={key}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="var(--cream-muted)"
                    strokeOpacity={0.30}
                    strokeWidth={0.9}
                    strokeLinecap="round"
                  />
                );
              }
              const echoStart = T.centerPulse + 1.2;
              return (
                <g key={key}>
                  <motion.line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                      stroke: 'var(--amber)',
                      strokeWidth: 1.6,
                    }}
                    animate={{
                      pathLength: 1,
                      opacity: [0, 1, 1, 0.55],
                      stroke: ['var(--amber)', 'var(--amber)', 'var(--cream-muted)', 'var(--cream-muted)'],
                      strokeWidth: [1.6, 1.6, 1.0, 0.9],
                    }}
                    transition={{
                      pathLength: { duration: 0.65, ease, delay },
                      opacity:    { duration: 1.10, ease, delay, times: [0, 0.25, 0.65, 1] },
                      stroke:     { duration: 1.10, ease, delay, times: [0, 0.45, 0.75, 1] },
                      strokeWidth:{ duration: 1.10, ease, delay, times: [0, 0.45, 0.75, 1] },
                    }}
                  />
                  {/* Echo: a quick amber pulse rolling around the
                      graph after the title resolves. Each edge
                      flashes with a 90ms walk so the wave reads
                      as light circumnavigating the structure once.
                      Repeats slowly so the slide stays alive while
                      the speaker takes questions. */}
                  <motion.line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="var(--amber)"
                    strokeLinecap="round"
                    strokeWidth={1.8}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1, 1],
                      opacity:    [0, 0.85, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      ease,
                      delay: echoStart + idx * 0.09,
                      times: [0, 0.45, 1],
                      repeat: Infinity,
                      repeatDelay: 6.5,
                    }}
                  />
                </g>
              );
            })}
          </g>

          {/* Center convergence pulse — a single amber flash that
              ignites on "you." landing, then fades to a faint hold.
              The flash is the moment of arrival; the hold keeps the
              center anchored without leaving a smudge behind the
              type. */}
          {!prefersReduced && (
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={130}
              fill="url(#finale-center-pulse)"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.85, 0.18], scale: [0.4, 1.05, 1] }}
              transition={{
                duration: 1.8,
                ease,
                delay: T.centerPulse,
                times: [0, 0.35, 1],
              }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          )}

          {/* Nodes — five themed discs settling in from the deck's
              palette. Halo + inner disc, no glyphs (the slide title
              sits where the glyphs would otherwise read). */}
          <g filter="url(#finale-soft-glow)">
            {NODE_TOKENS.map((token, i) => {
              const v = VERTICES[i];
              const color = `var(--${token})`;
              const delay = T.nodesStart + i * T.nodesStagger;
              if (prefersReduced) {
                return (
                  <g key={token}>
                    <circle cx={v.x} cy={v.y} r={32} fill={color} fillOpacity={0.12} />
                    <circle cx={v.x} cy={v.y} r={11} fill={color} fillOpacity={0.85} />
                  </g>
                );
              }
              return (
                <g key={token}>
                  <motion.circle
                    cx={v.x}
                    cy={v.y}
                    r={36}
                    fill={color}
                    fillOpacity={0.14}
                    stroke={color}
                    strokeOpacity={0.45}
                    strokeWidth={1.2}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: overshoot, delay }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                  <motion.circle
                    cx={v.x}
                    cy={v.y}
                    r={11}
                    fill={color}
                    fillOpacity={0.92}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: overshoot, delay: delay + 0.08 }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                  {/* Slow ambient breathing — adds life without distraction.
                      Tuned to ~3s loop and ~3% scale; barely perceptible
                      individually, alive collectively. */}
                  <motion.circle
                    cx={v.x}
                    cy={v.y}
                    r={36}
                    fill="none"
                    stroke={color}
                    strokeOpacity={0.35}
                    strokeWidth={0.8}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1.06, 1], opacity: [0, 0.35, 0] }}
                    transition={{
                      duration: 3.6,
                      ease,
                      delay: T.contact + 0.4 + i * 0.18,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                    }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                </g>
              );
            })}
          </g>

          {/* Center anchor — small cream dot that the title sits on top of */}
          {prefersReduced ? (
            <circle cx={CENTER} cy={CENTER} r={4} fill="var(--cream-muted)" opacity={0.7} />
          ) : (
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={5}
              fill="var(--amber)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: overshoot, delay: T.centerPulse + 0.2 }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          )}
        </svg>
      </div>
    </div>
  );
}

/* ============================================================
   Chrome — top-left eyebrow + top-right page-end marker.
   ============================================================ */
function Chrome({ T, ease }) {
  return (
    <>
      <motion.div
        className="absolute deck-mono uppercase"
        style={{
          top: '6vh',
          left: 'var(--deck-gutter)',
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--amber)',
          fontWeight: 700,
          zIndex: 5,
        }}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease, delay: T.chrome }}
      >
        <span
          className="inline-block align-middle h-px w-10 mr-3"
          style={{ background: 'var(--amber)' }}
        />
        Questions welcome
      </motion.div>

      <motion.div
        className="absolute deck-mono uppercase"
        style={{
          top: '6vh',
          right: 'var(--deck-gutter)',
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
          zIndex: 5,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: T.chrome }}
      >
        End · 35 / 35
      </motion.div>
    </>
  );
}

/* ============================================================
   CenterTypography — "Thank you." resolves on top of the
   constellation's center node, with the amber italic "you"
   sweeping in last from the right. Hairline rule draws L→R.
   "Questions welcome." follows.
   ============================================================ */
function CenterTypography({ T, ease, prefersReduced }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      style={{
        padding: 'var(--space-6)',
        textAlign: 'center',
        zIndex: 4,
      }}
    >
      <h1
        className="deck-display"
        style={{
          margin: 0,
          fontSize: 'clamp(4rem, 11vw, 12rem)',
          lineHeight: 'var(--lh-tight)',
          letterSpacing: 'var(--ls-display)',
          color: 'var(--cream)',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: '0.30em',
        }}
      >
        <motion.span
          initial={prefersReduced ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, ease, delay: T.thank }}
        >
          Thank
        </motion.span>
        <motion.span
          style={{
            color: 'var(--amber)',
            fontStyle: 'italic',
            fontWeight: 700,
            display: 'inline-block',
            transformOrigin: 'left center',
          }}
          initial={
            prefersReduced
              ? false
              : { opacity: 0, x: 36, skewX: -6, filter: 'blur(10px)' }
          }
          animate={{ opacity: 1, x: 0, skewX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.95, ease, delay: T.you }}
        >
          you.
        </motion.span>
      </h1>

      <motion.div
        style={{
          height: 2,
          width: 'clamp(80px, 8vw, 140px)',
          background: 'var(--amber)',
          transformOrigin: 'center',
          margin: 'var(--space-4) 0 var(--space-3) 0',
        }}
        initial={prefersReduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease, delay: T.rule }}
      />

      <motion.p
        className="deck-display italic"
        style={{
          margin: 0,
          fontSize: 'clamp(1.05rem, 1.5vw, 1.6rem)',
          color: 'var(--cream-muted)',
          fontWeight: 400,
        }}
        initial={prefersReduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: T.sub }}
      >
        Questions welcome.
      </motion.p>
    </div>
  );
}

/* ============================================================
   AuthorBlock — bottom-left identity. Name on top, role mono
   underneath. Promoted slightly so it reads as the speaker's
   signature, not legal fine print.
   ============================================================ */
function AuthorBlock({ T, ease }) {
  return (
    <motion.div
      className="absolute"
      style={{
        bottom: '8vh',
        left: 'var(--deck-gutter)',
        maxWidth: '40ch',
        zIndex: 5,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: T.author }}
    >
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-title)',
          color: 'var(--cream)',
          fontWeight: 700,
          letterSpacing: 'var(--ls-headline)',
        }}
      >
        Malek Okour, Ph.D.
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          marginTop: 4,
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          fontWeight: 600,
        }}
      >
        Director · Clinical Pharmacology &amp; Pharmacometrics
      </div>
    </motion.div>
  );
}

/* ============================================================
   ContactBlock — bottom-right web + linkedin. Subtle hover
   underline-grow affordance (border-bottom only, no color
   change) so the affordance is visible in presenter view but
   doesn't peacock during the live talk.
   ============================================================ */
function ContactBlock({ T, ease }) {
  return (
    <motion.div
      className="absolute"
      style={{
        bottom: '8vh',
        right: 'var(--deck-gutter)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
        zIndex: 5,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: T.contact }}
    >
      <ContactRow icon={Globe} label="malekokour.com" href="https://malekokour.com" />
      <ContactRow
        icon={Linkedin}
        label="linkedin/in/malek-okour-73020520"
        href="https://www.linkedin.com/in/malek-okour-73020520"
      />
    </motion.div>
  );
}

function ContactRow({ icon: Icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      className="finale-contact-row"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        color: 'var(--cream-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-card-label)',
        letterSpacing: '0.05em',
        textDecoration: 'none',
        borderBottom: '1px solid transparent',
        paddingBottom: 2,
        transition: 'color 220ms ease, border-color 220ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--cream)';
        e.currentTarget.style.borderBottomColor = 'var(--amber)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--cream-muted)';
        e.currentTarget.style.borderBottomColor = 'transparent';
      }}
    >
      <Icon size={14} strokeWidth={1.6} aria-hidden />
      <span>{label}</span>
    </a>
  );
}
