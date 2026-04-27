// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * CS1 Mechanism Visual — Strict Coordinate Implementation
 * Uses an exact <svg viewBox="0 0 1000 400"> to guarantee absolute
 * deterministic mapping of all receptors, molecules, and vessel walls.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function MechanismVisual({ delay = 0 }) {
  const reduced = useReducedMotion();

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="-20 -100 1040 520"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="wallGradientCase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in srgb, var(--case) 15%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in srgb, var(--case) 5%, transparent)" />
          </linearGradient>
          <linearGradient id="wallGradientSage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in srgb, var(--sage) 15%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in srgb, var(--sage) 5%, transparent)" />
          </linearGradient>
          <linearGradient id="topWallGradientCase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in srgb, var(--case) 5%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in srgb, var(--case) 15%, transparent)" />
          </linearGradient>
          <linearGradient id="topWallGradientSage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in srgb, var(--sage) 5%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in srgb, var(--sage) 15%, transparent)" />
          </linearGradient>
        </defs>

        {/* LEFT SIDE: UNTREATED PAH (Narrow Lumen) */}
        <g id="left-untreated">
          {/* Top Wall */}
          <rect x="0" y="80" width="480" height="100" fill="url(#topWallGradientCase)" />
          <line x1="0" y1="180" x2="480" y2="180" stroke="var(--case)" strokeWidth="3" />
          
          {/* Bottom Endothelium Wall */}
          <rect x="0" y="280" width="480" height="100" fill="url(#wallGradientCase)" />
          <line x1="0" y1="280" x2="480" y2="280" stroke="var(--case)" strokeWidth="3" />

          {/* Lumen Label */}
          <text x="240" y="235" dominantBaseline="middle" textAnchor="middle" fill="var(--case)" opacity="0.35" fontSize="24" fontWeight="bold" letterSpacing="4" fontFamily="var(--font-mono)">
            NARROW LUMEN
          </text>

          {/* Left Title */}
          <text x="240" y="-30" dominantBaseline="middle" textAnchor="middle" fill="var(--case)" fontSize="18" fontWeight="bold" letterSpacing="2" fontFamily="var(--font-mono)">
            UNTREATED PAH
          </text>

          {/* Flowing ET-1 Molecules (Coral) */}
          <Molecule type="ET-1" tone="var(--case)" cx={100} cy={230} delay={delay} reduced={reduced} />
          <Molecule type="ET-1" tone="var(--case)" cx={240} cy={200} delay={delay + 0.4} reduced={reduced} />
          <Molecule type="ET-1" tone="var(--case)" cx={380} cy={250} delay={delay + 0.8} reduced={reduced} />
          
          {/* Receptors on Bottom Wall */}
          <Receptor type="ETA" x={160} y={280} tone="var(--case)" active={true} blocked={false} />
          <Receptor type="ETB" x={320} y={280} tone="var(--cyan)" active={true} blocked={false} />

          {/* Load-bearing biology cue: ET-1 is docked to ETA, so constriction is ON. */}
          <Molecule
            type="ET-1"
            tone="var(--case)"
            cx={160}
            cy={263}
            delay={delay}
            reduced={reduced}
            customInitial={{ opacity: 1, x: 160, y: 263 }}
            customAnimate={{ opacity: 1, x: 160, y: 263 }}
            customTransition={{ duration: 0 }}
          />

          {/* Vasoconstriction Arrows */}
          <g transform="translate(160, 330)">
            <line x1="0" y1="20" x2="0" y2="-10" stroke="var(--case)" strokeWidth="2" />
            <polygon points="-6,0 6,0 0,-10" fill="var(--case)" />
            <text x="0" y="35" textAnchor="middle" fill="var(--case)" fontSize="14" fontWeight="bold" fontFamily="var(--font-mono)">CONSTRICTION ON</text>
          </g>
          <g transform="translate(320, 330)">
            <line x1="0" y1="20" x2="0" y2="-10" stroke="var(--case)" strokeWidth="2" />
            <polygon points="-6,0 6,0 0,-10" fill="var(--case)" />
            <text x="0" y="35" textAnchor="middle" fill="var(--case)" fontSize="14" fontWeight="bold" fontFamily="var(--font-mono)">PROLIFERATION</text>
          </g>
        </g>

        {/* CENTER DIVIDER */}
        <g id="divider">
          <line x1="500" y1="-50" x2="500" y2="400" stroke="var(--cream-hairline)" strokeWidth="1" strokeDasharray="4 4" opacity={0.5} />
          <rect x="440" y="180" width="120" height="40" fill="var(--bg)" rx="20" />
          <text x="500" y="200" dominantBaseline="middle" textAnchor="middle" fill="var(--amber)" fontSize="14" fontWeight="bold" letterSpacing="1" fontFamily="var(--font-mono)">
            + AMBRISENTAN
          </text>
        </g>

        {/* RIGHT SIDE: TREATED (Open Lumen) */}
        <g id="right-treated">
          {/* Top Wall (Starts narrow at y=80, opens to y=-40) */}
          <motion.rect 
            x="520" width="480" height="100" fill="url(#topWallGradientSage)"
            initial={reduced ? { y: -40 } : { y: 80 }}
            animate={{ y: -40 }}
            transition={{ delay: delay + 4.5, duration: 2.0, ease: EASE }}
          />
          <motion.line 
            x1="520" x2="1000" stroke="var(--sage)" strokeWidth="3"
            initial={reduced ? { y1: 60, y2: 60 } : { y1: 180, y2: 180 }}
            animate={{ y1: 60, y2: 60 }}
            transition={{ delay: delay + 4.5, duration: 2.0, ease: EASE }}
          />
          
          {/* Bottom Endothelium Wall */}
          <rect x="520" y="280" width="480" height="100" fill="url(#wallGradientSage)" />
          <line x1="520" y1="280" x2="1000" y2="280" stroke="var(--sage)" strokeWidth="3" />

          {/* Lumen Labels */}
          {/* Fades out when lumen opens */}
          <motion.text 
            x="760" y="235" dominantBaseline="middle" textAnchor="middle" fill="var(--sage)" opacity="0.35" fontSize="24" fontWeight="bold" letterSpacing="4" fontFamily="var(--font-mono)"
            initial={reduced ? { opacity: 0 } : { opacity: 0.35 }}
            animate={{ opacity: 0 }}
            transition={{ delay: delay + 4.5, duration: 0.5 }}
          >
            NARROW LUMEN
          </motion.text>
          
          {/* Fades in when lumen opens */}
          <motion.text 
            x="760" dominantBaseline="middle" textAnchor="middle" fill="var(--sage)" fontSize="24" fontWeight="bold" letterSpacing="4" fontFamily="var(--font-mono)"
            initial={reduced ? { opacity: 0.35, y: 170 } : { opacity: 0, y: 235 }}
            animate={{ opacity: 0.35, y: 170 }}
            transition={{ delay: delay + 4.5, duration: 1.0, ease: EASE }}
          >
            OPEN LUMEN
          </motion.text>

          {/* Right Title */}
          <text x="760" y="-30" dominantBaseline="middle" textAnchor="middle" fill="var(--sage)" fontSize="18" fontWeight="bold" letterSpacing="2" fontFamily="var(--font-mono)">
            TREATED (AMBRISENTAN)
          </text>

          {/* Sparse ET-1 Molecules */}
          <Molecule type="ET-1" tone="var(--case)" cx={600} cy={160} delay={delay + 0.2} reduced={reduced} />
          
          {/* NO Molecules (Cyan) from ETB */}
          <Molecule type="NO" tone="var(--cyan)" cx={840} cy={220} delay={delay + 0.6} reduced={reduced} />
          <Molecule type="NO" tone="var(--cyan)" cx={760} cy={120} delay={delay + 1.0} reduced={reduced} />

          {/* Receptors on Bottom Wall */}
          <Receptor type="ETA" x={680} y={280} tone="var(--case)" active={false} blocked={true} />
          <Receptor type="ETB" x={840} y={280} tone="var(--cyan)" active={true} blocked={false} />

          {/* AMBRISENTAN DOCKING SEQUENCE */}
          {/* Starts near center, slowly moves down and occupies ETA before ET-1 can bind. */}
          <Molecule 
            type="AMB" tone="var(--amber)" cx={680} cy={263} 
            isDocked={true} delay={delay + 1.0} reduced={reduced}
            customInitial={{ opacity: 0, x: 680, y: 100 }}
            customAnimate={{ opacity: 1, x: 680, y: 263 }}
            customTransition={{ 
              opacity: { duration: 0.5, delay: delay + 1.0 }, 
              y: { duration: 1.8, delay: delay + 1.0, ease: EASE }
            }}
          />

          {/* ET-1 BOUNCE SEQUENCE */}
          {/* Approaches docked AMB, hits the occupied ETA site, then bounces off. */}
          <Molecule 
            type="ET-1" tone="var(--case)" cx={680} cy={150} reduced={reduced}
            customInitial={{ opacity: 0, x: 760, y: 150 }}
            customAnimate={{ 
              opacity: [0, 1, 1, 0], 
              x: [760, 692, 735, 760], 
              y: [150, 244, 200, 175] 
            }}
            customTransition={{ duration: 1.8, delay: delay + 3.0, times: [0, 0.55, 0.78, 1], ease: 'easeInOut' }}
          />
          
          <motion.g 
            transform="translate(680, 310)"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 2.5, duration: 0.5 }}
          >
            <text x="0" y="0" textAnchor="middle" fill="var(--case)" opacity="0.5" fontSize="12" fontWeight="bold" fontFamily="var(--font-mono)">BLOCKED</text>
          </motion.g>

          {/* Vasoconstriction cue is visibly stopped after AMB blocks ETA. */}
          <motion.g 
            transform="translate(680, 330)"
            initial={reduced ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: delay + 3.9, duration: 0.35 }}
          >
            <line x1="0" y1="20" x2="0" y2="-10" stroke="var(--case)" strokeWidth="2" />
            <polygon points="-6,0 6,0 0,-10" fill="var(--case)" />
            <text x="0" y="35" textAnchor="middle" fill="var(--case)" fontSize="14" fontWeight="bold" fontFamily="var(--font-mono)">CONSTRICTION ON</text>
          </motion.g>

          <motion.g
            transform="translate(680, 330)"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 4.05, duration: 0.45 }}
          >
            <line x1="-48" y1="6" x2="48" y2="6" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" />
            <line x1="-48" y1="-18" x2="48" y2="-18" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" />
            <text x="0" y="35" textAnchor="middle" fill="var(--amber)" fontSize="14" fontWeight="bold" fontFamily="var(--font-mono)">CONSTRICTION OFF</text>
          </motion.g>

          {/* Vasodilation Arrows (Fades in when lumen opens) */}
          <motion.g 
            transform="translate(680, 350)"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 5.0, duration: 0.5 }}
          >
            <line x1="0" y1="-10" x2="0" y2="20" stroke="var(--sage)" strokeWidth="2" />
            <polygon points="-6,10 6,10 0,20" fill="var(--sage)" />
            <text x="0" y="35" textAnchor="middle" fill="var(--sage)" fontSize="14" fontWeight="bold" fontFamily="var(--font-mono)">RELAXATION</text>
          </motion.g>

          <g transform="translate(840, 350)">
            <line x1="0" y1="-10" x2="0" y2="20" stroke="var(--sage)" strokeWidth="2" />
            <polygon points="-6,10 6,10 0,20" fill="var(--sage)" />
            <text x="0" y="35" textAnchor="middle" fill="var(--sage)" fontSize="14" fontWeight="bold" fontFamily="var(--font-mono)">↓ PROLIFERATION</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Receptor({ type, x, y, tone, active, blocked }) {
  const color = blocked ? 'color-mix(in srgb, var(--cream-muted) 50%, transparent)' : tone;
  const cupWidth = 50;
  const cupHeight = 24;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* The Receptor Cup (recessed into the wall) */}
      <path
        d={`M ${-cupWidth/2} 0 L ${-cupWidth/2} ${cupHeight} A ${cupWidth/2} ${cupWidth/2} 0 0 0 ${cupWidth/2} ${cupHeight} L ${cupWidth/2} 0 Z`}
        fill={`color-mix(in srgb, ${color} ${active ? '30%' : '10%'}, transparent)`}
        stroke={color}
        strokeWidth="2"
      />
      <text
        x="0"
        y={cupHeight + 16}
        textAnchor="middle"
        fill={color}
        fontSize="14"
        fontWeight="bold"
        fontFamily="var(--font-mono)"
      >
        {type}
      </text>
    </g>
  );
}

function Molecule({ type, tone, cx, cy, isDocked = false, delay, reduced, customInitial, customAnimate, customTransition }) {
  const width = 48;
  const height = 24;
  const isAmb = type === 'AMB';

  const defaultInitial = reduced ? false : { opacity: 0, x: cx, y: isDocked ? cy - 20 : cy };
  const defaultAnimate = reduced ? false : (
    isDocked 
      ? { opacity: 1, x: cx, y: cy } 
      : { opacity: [0.2, 1, 0.2], x: cx, y: [cy, cy - 10, cy] }
  );
  const defaultTransition = isDocked
    ? { duration: 0.6, delay, ease: EASE }
    : { duration: 4, delay, repeat: Infinity, ease: 'easeInOut' };

  return (
    <motion.g
      initial={customInitial || defaultInitial}
      animate={customAnimate || defaultAnimate}
      transition={customTransition || defaultTransition}
    >
      <rect
        x={-width/2} y={-height/2}
        width={width} height={height}
        rx={isAmb ? 6 : height/2} // AMB is a rounded rect, ET-1/NO are full pills
        fill={`color-mix(in srgb, ${tone} 20%, var(--bg))`}
        stroke={tone}
        strokeWidth="2"
      />
      <text
        x="0" y="0"
        dominantBaseline="central"
        textAnchor="middle"
        fill={tone}
        fontSize="12"
        fontWeight="bold"
        fontFamily="var(--font-mono)"
      >
        {type}
      </text>
    </motion.g>
  );
}
