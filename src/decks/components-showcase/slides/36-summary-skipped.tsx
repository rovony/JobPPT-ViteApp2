// @ts-nocheck
import React from 'react';
import { CheckCircle2, XCircle, ExternalLink, FlaskConical } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

// What's covered in this showcase deck
const COVERED = [
  { lib: 'motion (framer)', cat: '§4', note: 'Variants, AnimatePresence, layoutId — used everywhere' },
  { lib: 'lucide-react', cat: '§4', note: '2000-icon family — single source for the deck' },
  { lib: 'recharts', cat: '§5A', note: 'CI bands, exposure-response, sigmoidal Emax' },
  { lib: '@xyflow/react', cat: '§5A', note: 'Process workflows, decision trees' },
  { lib: 'katex + react-katex', cat: '§5A', note: '4 PK equation variants — block + inline' },
  { lib: '@tremor/react', cat: '§5A', note: 'Metric / Card / BadgeDelta / ProgressBar' },
  { lib: 'inline world-map.svg', cat: '§5A', note: 'Approval-status world map (replaces react-simple-maps)' },
  { lib: 'react-world-flags', cat: '§5A', note: 'Compact country callouts' },
  { lib: '@tanstack/react-table', cat: '§5A', note: 'Headless sortable PAH-drug table' },
  { lib: 'lottie-react', cat: '§5A', note: 'Inline JSON loop animation' },
  { lib: '@paper-design/shaders-react', cat: '§5A', note: 'Mesh / grain / waves WebGL gradients' },
  { lib: 'react-xarrows', cat: '§5A', note: 'Leader-line callouts' },
  { lib: 'react-wrap-balancer', cat: '§5A', note: 'Balanced multi-line headlines' },
  { lib: 'html-to-image + downloadjs', cat: '§5A/§11', note: 'DOM → 2× PNG live export' },
  { lib: '@use-gesture/react', cat: '§5A', note: 'Drag-to-tilt card' },
  { lib: 'embla-carousel-react', cat: '§5A', note: 'Stat-card carousel' },
  { lib: 'sonner', cat: '§5B', note: 'Success/warn/error/info toasts' },
  { lib: 'vaul', cat: '§5B', note: 'Native-feel bottom drawer' },
  { lib: 'shiki', cat: '§5C', note: 'NONMEM control file with VS Code grammar' },
  { lib: 'react-player', cat: '§5C', note: 'YouTube embed (universal player)' },
  { lib: '@tanstack/react-query', cat: '§5D', note: 'Stale-while-revalidate trial fetch' },
  { lib: 'zustand', cat: '§5E', note: 'Counter store (2 KB global state)' },
  { lib: 'react-hook-form + zod', cat: '§5C/D', note: 'Validated patient-info form' },
  { lib: '@radix-ui/* (shadcn)', cat: '§3', note: 'Tabs / Switch / Slider / Tooltip / Dialog' },
  { lib: 'cmdk', cat: '§6', note: '⌘K command palette' },
  { lib: 'canvas-confetti', cat: '§9', note: 'Approval celebration moment' },
  { lib: 'react-leaflet', cat: '§6', note: 'Live tile-based India trial sites' },
  { lib: 'gsap + @gsap/react', cat: '§5A', note: 'Number-tween counter (snap to int)' },
  { lib: 'd3', cat: '§6', note: 'Raw SVG line chart with axes' },
  { lib: 'roughjs', cat: '§9 ext', note: 'Hand-drawn / sketchy SVG primitives' },
  { lib: 'three.js', cat: '§6/§17C', note: 'Animated icosahedron — 3D entry point' },
  { lib: 'react-intersection-observer', cat: '§5A', note: 'Scroll-triggered reveals' },
  { lib: 'nuqs', cat: '§5A', note: 'URL-state for deep-links' },
  { lib: 'jspdf', cat: '§11', note: 'Native PDF export' },
  { lib: 'pptxgenjs', cat: '§11', note: 'Native PPTX export' },
  { lib: 'lenis', cat: '§5A/B', note: 'Smooth-scroll snippet (concept demo)' },
  { lib: 'react-day-picker + date-fns', cat: '§5D', note: 'Headless date picker' },
  { lib: 'react-markdown + remark-gfm', cat: '§5C', note: 'Speaker-note GFM rendering' },
  { lib: 'smiles-drawer', cat: '§5A', note: 'Chemical structures (slide 08)' },
];

// What's deliberately NOT shown (per directory's skip / install-when-needed sections)
const SKIPPED = [
  { lib: '@react-three/fiber + drei', why: 'r3f not installed yet — install when committing to declarative 3D' },
  { lib: 'Mol* / NGL Viewer', why: 'Heavy WASM viewers — install when CS3 needs protein structures' },
  { lib: '@nivo/sankey', why: 'Patient-flow Sankey not yet needed in deck' },
  { lib: 'visx', why: 'recharts covers current chart needs; reach for visx if PK lattice needed' },
  { lib: 'echarts-for-react', why: '100K+ point datasets not in scope' },
  { lib: 'shiki-magic-move', why: 'Not pinned; revisit if a slide needs animated code morphing' },
  { lib: '@code-hike/mdx', why: 'Course-specific; not deck-relevant' },
  { lib: 'mapbox-gl / maplibre / deck.gl', why: 'react-leaflet covers tile maps; deck.gl for million-point overlays only' },
  { lib: '@theatre/studio', why: 'Visual timeline editor — useful when choreography exceeds framer variants' },
  { lib: '@rive-app/react-canvas', why: 'Lottie covers current animation needs' },
  { lib: 'Mantine / MUI / Chakra / Ant', why: 'Heavy alt UI systems — shadcn + Radix is the deck contract' },
  { lib: 'react-spring', why: 'Second animation engine — framer-motion is load-bearing' },
  { lib: 'redux / redux-toolkit', why: 'zustand + react-query covers 90% — Redux overkill' },
  { lib: 'styled-components / emotion', why: 'Tailwind + tokens already won the styling layer' },
  { lib: 'create-react-app / jQuery / moment.js', why: 'Deprecated — directory §8 explicitly bans' },
];

export default function SummarySkippedShowcase() {
  return (
    <LibraryShowcase
      category="Summary · directory coverage"
      library="React Stack Directory · §1–18"
      npmInstall="see _Docs/React-Stack-Directory.md for the full one-line install"
      url="_Docs/React-Stack-Directory.md"
      headline={<>{COVERED.length} libraries demoed · <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>{SKIPPED.length} explicitly skipped</span>.</>}
      subhead="Directory coverage map. Every entry on the LEFT has a live demo earlier in this deck. Every entry on the RIGHT is intentionally NOT installed — with the directory's reason."
      tone="var(--cream)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title={`Covered (${COVERED.length})`} tone="var(--sage)">
          <div style={{ overflow: 'auto', height: '100%', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'calc(var(--fs-slide-pageno) * 0.95)' }}>
              <tbody>
                {COVERED.map((c) => (
                  <tr key={c.lib} style={{ borderBottom: '1px solid var(--cream-ghost)' }}>
                    <td style={{ padding: '4px 6px', whiteSpace: 'nowrap', color: 'var(--sage)' }}><CheckCircle2 size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />{c.cat}</td>
                    <td style={{ padding: '4px 6px', color: 'var(--cream)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{c.lib}</td>
                    <td style={{ padding: '4px 6px', color: 'var(--cream-faint)' }}>{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>
        <Frame title={`Skipped (${SKIPPED.length}) · with reason`} tone="var(--coral)">
          <div style={{ overflow: 'auto', height: '100%', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'calc(var(--fs-slide-pageno) * 0.95)' }}>
              <tbody>
                {SKIPPED.map((s) => (
                  <tr key={s.lib} style={{ borderBottom: '1px solid var(--cream-ghost)' }}>
                    <td style={{ padding: '4px 6px', verticalAlign: 'top', color: 'var(--coral)' }}><XCircle size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} /></td>
                    <td style={{ padding: '4px 6px', color: 'var(--cream)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{s.lib}</td>
                    <td style={{ padding: '4px 6px', color: 'var(--cream-faint)' }}>{s.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
