import React from 'react';
import DevKitPageHeader from '../DevKitPageHeader';
import ComponentShowcase from '../ComponentShowcase';

/**
 * LibrariesPage — registry of external libraries, audited against the
 * React Stack Directory (v1 · Apr 2026).
 *
 * Each entry declares:
 *   status  · 'installed' (available right now) | 'available' (documented
 *             in the directory, NOT installed — ask before using)
 *   name    · npm package identifier
 *   role    · one-line description of what it does
 *   useFor  · when to reach for it in this project
 *   importExample · copy-paste import statement
 *
 * Groups mirror the directory's use-case taxonomy (section 5):
 * Core · Deck · Course · App · Utility · Install-when-needed.
 */
const GROUPS = [
  {
    label: 'Core · every project',
    items: [
      {
        status: 'installed',
        name: 'framer-motion',
        role: 'Primary animation engine · transitions, variants, AnimatePresence, layout animations',
        useFor: 'Slide transitions · staggered grid entrances · hover/tap springs',
        importExample: `import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';`,
      },
      {
        status: 'installed',
        name: 'lucide-react',
        role: 'The only icon family used in this project — 2000+ icons, tree-shakeable',
        useFor: 'Every icon in decks, chrome, UI. Do NOT mix with other icon libs.',
        importExample: `import { ArrowRight, Sparkles, Check } from 'lucide-react';`,
      },
      {
        status: 'installed',
        name: 'clsx + tailwind-merge + class-variance-authority',
        role: 'Conditional className composition (shadcn/ui prerequisites)',
        useFor: 'Building variant-driven components · merging Tailwind class strings safely',
        importExample: `import { cn } from '@/lib/utils';  // wraps clsx + tailwind-merge`,
      },
      {
        status: 'installed',
        name: '@fontsource-variable/inter + @fontsource/jetbrains-mono',
        role: 'Self-hosted variable fonts (no Google Fonts CDN round-trip)',
        useFor: 'Body text (Inter) + mono/numbers (JetBrains Mono). Imported in index.css.',
        importExample: `// Already imported globally in index.css`,
      },
      {
        status: 'installed',
        name: 'tailwindcss-animate + @tailwindcss/typography',
        role: 'Tailwind plugins: keyframe utilities + prose/markdown styling',
        useFor: 'Shadcn animations · speaker notes · long-form captions',
        importExample: `// Wired in tailwind.config.js plugins array`,
      },
      {
        status: 'installed',
        name: 'radix-ui primitives (@radix-ui/react-*)',
        role: 'Unstyled accessible UI primitives — Dialog, Popover, Select, Tabs, Tooltip, etc.',
        useFor: 'Every shadcn/ui component is built on Radix. Import via @/components/ui/*.',
        importExample: `// Don't import Radix directly — use the shadcn wrappers\nimport { Dialog, DialogContent } from '@/components/ui/dialog';`,
      },
    ],
  },
  {
    label: 'Presentation deck',
    items: [
      {
        status: 'installed',
        name: 'gsap + @gsap/react',
        role: 'Advanced animation · SplitText, SVG path draws, number counters, timelines',
        useFor: 'Char-by-char headline reveals · motion-path tracers · intra-slide choreography',
        importExample: `import gsap from 'gsap';\nimport { useGSAP } from '@gsap/react';`,
      },
      {
        status: 'installed',
        name: 'lenis',
        role: 'Premium inertia smooth-scroll',
        useFor: 'Scroll-deck mode · long-form editorial pages. NOT for present-mode slides.',
        importExample: `import Lenis from 'lenis';`,
      },
      {
        status: 'installed',
        name: 'recharts',
        role: 'React-native charting (bars, lines, areas, scatter)',
        useFor: 'pcVPC plots · exposure-response · concentration-time curves · CI bands',
        importExample: `import { LineChart, Area, XAxis, YAxis } from 'recharts';`,
      },
      {
        status: 'installed',
        name: '@xyflow/react',
        role: 'Node-and-edge flow diagrams (powers PKCompartmentModel)',
        useFor: 'Compartment models · 7-step workflows · decision trees',
        importExample: `import { ReactFlow, Background, Controls } from '@xyflow/react';`,
      },
      {
        status: 'installed',
        name: 'katex + react-katex',
        role: 'LaTeX equation rendering (wrapped by <Equation />)',
        useFor: 'PK equations · allometric formulas · statistical notation',
        importExample: `// Prefer <Equation/> from @/components/deck/scientific`,
      },
      {
        status: 'installed',
        name: '@tremor/react',
        role: 'Pre-built dashboard primitives — Card, Metric, BarList, scorecards',
        useFor: 'Impact slides · regulatory scorecards · big-number tiles',
        importExample: `import { Card, Metric, Text } from '@tremor/react';`,
      },
      {
        status: 'installed',
        name: 'react-simple-maps',
        role: 'Lightweight choropleth / geo maps',
        useFor: 'Approval geography (EMA/PMDA/FDA/CDSCO maps)',
        importExample: `import { ComposableMap, Geographies, Geography } from 'react-simple-maps';`,
      },
      {
        status: 'installed',
        name: 'react-world-flags',
        role: 'Country flag badges (SVG)',
        useFor: 'Flag pills next to regulatory approvals in maps/timelines',
        importExample: `import Flag from 'react-world-flags';  // <Flag code="JP" />`,
      },
      {
        status: 'installed',
        name: '@tanstack/react-table',
        role: 'Headless sortable/filterable tables',
        useFor: 'Pediatric vs Adult PK parameter tables · model comparison matrices',
        importExample: `import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';`,
      },
      {
        status: 'installed',
        name: 'smiles-drawer',
        role: 'Chemical structure drawing from SMILES strings',
        useFor: 'Drug structures inline (Ambrisentan · Ivosidenib · etc.)',
        importExample: `import SmilesDrawer from 'smiles-drawer';`,
      },
      {
        status: 'installed',
        name: 'lottie-react + @lottiefiles/dotlottie-react',
        role: 'Lottie JSON & .lottie vector-animation playback',
        useFor: 'Hand-animated illustrations · loading states · micro-interactions',
        importExample: `import Lottie from 'lottie-react';\nimport { DotLottieReact } from '@lottiefiles/dotlottie-react';`,
      },
      {
        status: 'installed',
        name: '@paper-design/shaders-react',
        role: 'WebGL gradient / noise / shader backgrounds',
        useFor: 'Ambient hero backgrounds on title slides, dividers',
        importExample: `import { MeshGradient, Dithering } from '@paper-design/shaders-react';`,
      },
      {
        status: 'installed',
        name: '@use-gesture/react',
        role: 'Pointer / touch / drag gesture recognition',
        useFor: 'Drag-to-navigate · swipe between slides · laser-pointer drags',
        importExample: `import { useDrag, useGesture } from '@use-gesture/react';`,
      },
      {
        status: 'installed',
        name: 'react-xarrows',
        role: 'Leader lines (connect label → target DOM element)',
        useFor: 'Labeled illustrations · callouts anchored to chart points · diagrams',
        importExample: `import Xarrow from 'react-xarrows';`,
      },
      {
        status: 'installed',
        name: 'react-wrap-balancer',
        role: 'Balanced multi-line title wrapping — avoids orphaned words',
        useFor: 'Hero headlines · card titles · any 2–3-line display text',
        importExample: `import Balancer from 'react-wrap-balancer';`,
      },
      {
        status: 'installed',
        name: 'html-to-image + downloadjs',
        role: 'Client-side DOM → PNG export',
        useFor: 'Export a slide as an image for LinkedIn / manuscripts / sharing',
        importExample: `import { toPng } from 'html-to-image';\nimport download from 'downloadjs';`,
      },
      {
        status: 'installed',
        name: 'react-intersection-observer',
        role: 'Scroll-triggered reveals via IntersectionObserver',
        useFor: 'Fade/slide-up sections as user scrolls · lazy-mount heavy viz',
        importExample: `import { useInView } from 'react-intersection-observer';`,
      },
      {
        status: 'installed',
        name: 'nuqs',
        role: 'Type-safe URL query-string state',
        useFor: 'Deep-linking to specific slide indexes · preserving view state in URL',
        importExample: `import { useQueryState } from 'nuqs';`,
      },
      {
        status: 'installed',
        name: '@hello-pangea/dnd',
        role: 'Drag-and-drop lists (maintained react-beautiful-dnd fork)',
        useFor: 'Overview slide reordering (wired in DeckOverview)',
        importExample: `import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';`,
      },
      {
        status: 'installed',
        name: 'jspdf',
        role: 'Client-side PDF generation',
        useFor: 'Export full deck as a multi-page PDF (wired in lib/deck-export.js)',
        importExample: `import jsPDF from 'jspdf';`,
      },
      {
        status: 'installed',
        name: 'pptxgenjs',
        role: 'Client-side PowerPoint (.pptx) generation',
        useFor: 'Export deck as a PPTX for stakeholders who need editable slides',
        importExample: `import pptxgen from 'pptxgenjs';`,
      },
    ],
  },
  {
    label: 'Course / training content',
    items: [
      {
        status: 'installed',
        name: 'shiki',
        role: 'VS Code-quality code syntax highlighting (TextMate grammars)',
        useFor: 'Code blocks in lessons, tutorial slides, docs',
        importExample: `import { codeToHtml } from 'shiki';\n\nconst html = await codeToHtml('const x = 1;', { lang: 'js', theme: 'github-dark' });`,
      },
      {
        status: 'installed',
        name: 'react-player',
        role: 'Unified video player — YouTube, Vimeo, self-hosted, HLS, DASH',
        useFor: 'Lesson videos · background loops · embedded demos',
        importExample: `import ReactPlayer from 'react-player';`,
      },
      {
        status: 'installed',
        name: 'react-markdown',
        role: 'Markdown → React renderer',
        useFor: 'Speaker notes · rich captions · user-authored content',
        importExample: `import ReactMarkdown from 'react-markdown';`,
      },
      {
        status: 'installed',
        name: 'react-quill',
        role: 'WYSIWYG rich-text editor (Quill-based, lighter)',
        useFor: 'Authoring speaker notes inline · simple content editors',
        importExample: `import ReactQuill from 'react-quill';`,
      },
    ],
  },
  {
    label: 'App / dashboard · data + forms',
    items: [
      {
        status: 'installed',
        name: '@tanstack/react-query',
        role: 'Server state · caching · background refetch',
        useFor: 'All async data fetches (entities, functions) — already the project default',
        importExample: `import { useQuery, useMutation } from '@tanstack/react-query';`,
      },
      {
        status: 'installed',
        name: 'react-hook-form',
        role: 'Performant, minimal-rerender forms',
        useFor: 'Any form with >1 field · pair with zod for validation',
        importExample: `import { useForm } from 'react-hook-form';`,
      },
      {
        status: 'installed',
        name: 'zod + @hookform/resolvers',
        role: 'Runtime schema validation + RHF adapter',
        useFor: 'Validating form payloads · parsing API responses',
        importExample: `import { z } from 'zod';\nimport { zodResolver } from '@hookform/resolvers/zod';`,
      },
      {
        status: 'installed',
        name: 'zustand',
        role: 'Lightweight global state (2KB)',
        useFor: 'Cross-component UI state (modals, wizards, client-only toggles). Not for server data — use react-query.',
        importExample: `import { create } from 'zustand';`,
      },
      {
        status: 'installed',
        name: 'date-fns',
        role: 'Modern date utilities (replaces moment.js)',
        useFor: 'Formatting · parsing · relative time · date math',
        importExample: `import { format, formatDistanceToNow } from 'date-fns';`,
      },
      {
        status: 'installed',
        name: 'sonner',
        role: 'Modern toast notifications',
        useFor: 'Action feedback (save, copy, export). Already wired via shadcn.',
        importExample: `import { toast } from 'sonner';`,
      },
      {
        status: 'installed',
        name: 'vaul',
        role: 'Bottom drawer (mobile-friendly modals)',
        useFor: 'Mobile sheet UIs · touch-native dialogs',
        importExample: `import { Drawer } from 'vaul';`,
      },
      {
        status: 'installed',
        name: '@stripe/stripe-js + @stripe/react-stripe-js',
        role: 'Stripe checkout / Elements integration',
        useFor: 'Paid features · subscriptions · one-time payments',
        importExample: `import { loadStripe } from '@stripe/stripe-js';\nimport { Elements } from '@stripe/react-stripe-js';`,
      },
      {
        status: 'installed',
        name: 'cmdk',
        role: 'Command-palette primitive (⌘K menu)',
        useFor: 'Quick-jump to slide · deck search — use shadcn <Command/> wrapper',
        importExample: `import { Command, CommandInput, CommandItem } from '@/components/ui/command';`,
      },
      {
        status: 'installed',
        name: 'next-themes',
        role: 'Dark/light theme switcher (framework-agnostic despite the name)',
        useFor: 'Theme persistence · SSR-safe mode detection',
        importExample: `import { ThemeProvider, useTheme } from 'next-themes';`,
      },
      {
        status: 'installed',
        name: 'react-day-picker',
        role: 'Flexible date-picker calendar (powers shadcn <Calendar/>)',
        useFor: 'Date selection in forms — prefer shadcn wrapper',
        importExample: `import { Calendar } from '@/components/ui/calendar';`,
      },
      {
        status: 'installed',
        name: 'react-hot-toast',
        role: 'Alternative toast library (legacy — prefer sonner)',
        useFor: '⚠ Avoid for new code. Use sonner.',
        importExample: `// Use sonner: import { toast } from 'sonner';`,
      },
      {
        status: 'installed',
        name: 'input-otp',
        role: 'One-time-password / verification-code input',
        useFor: '2FA codes · email verification inputs',
        importExample: `import { OTPInput } from 'input-otp';`,
      },
      {
        status: 'installed',
        name: 'embla-carousel-react',
        role: 'Lightweight, performant carousel (powers shadcn <Carousel/>)',
        useFor: 'Image galleries · testimonial sliders · onboarding screens',
        importExample: `import { Carousel } from '@/components/ui/carousel';`,
      },
      {
        status: 'installed',
        name: 'react-resizable-panels',
        role: 'Split-pane resizable layouts (powers shadcn <Resizable/>)',
        useFor: 'IDE-style layouts · presenter-mode dual-pane · settings splitters',
        importExample: `import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';`,
      },
    ],
  },
  {
    label: 'Visual FX & 3D',
    items: [
      {
        status: 'installed',
        name: 'three',
        role: 'Raw Three.js WebGL engine',
        useFor: 'Custom 3D scenes when Paper Design shaders aren\'t enough',
        importExample: `import * as THREE from 'three';`,
      },
      {
        status: 'installed',
        name: 'roughjs',
        role: 'Hand-drawn sketchy SVG rendering',
        useFor: 'SketchBox callouts · whiteboard-style diagrams',
        importExample: `import rough from 'roughjs';`,
      },
      {
        status: 'installed',
        name: 'canvas-confetti',
        role: 'Celebration confetti burst',
        useFor: 'Completion moments · successful submissions · quiz correct answers',
        importExample: `import confetti from 'canvas-confetti';`,
      },
    ],
  },
  {
    label: 'Utilities',
    items: [
      {
        status: 'installed',
        name: 'react-router-dom',
        role: 'Client-side routing (v6)',
        useFor: 'Every app route — already wired in App.jsx',
        importExample: `import { Routes, Route, Link, useParams } from 'react-router-dom';`,
      },
      {
        status: 'installed',
        name: 'd3',
        role: 'Low-level data viz primitives (scales, axes, geo, shapes)',
        useFor: 'Only when recharts can\'t express the chart. Rare.',
        importExample: `import { scaleLinear, extent, line, curveCatmullRom } from 'd3';`,
      },
      {
        status: 'installed',
        name: 'react-leaflet',
        role: 'Leaflet map wrapper (interactive tile maps)',
        useFor: 'Zoom/pan maps with markers. Prefer react-simple-maps for static choropleths.',
        importExample: `import { MapContainer, TileLayer, Marker } from 'react-leaflet';`,
      },
      {
        status: 'installed',
        name: 'html2canvas',
        role: 'DOM → Canvas rasterizer (fallback for html-to-image)',
        useFor: 'Only when html-to-image can\'t handle a specific CSS feature',
        importExample: `import html2canvas from 'html2canvas';`,
      },
      {
        status: 'installed',
        name: 'lodash',
        role: 'JS utility toolkit — debounce, throttle, groupBy, etc.',
        useFor: '⚠ Prefer native JS first. Use named imports only.',
        importExample: `import { debounce } from 'lodash';`,
      },
      {
        status: 'installed',
        name: 'moment',
        role: 'LEGACY date library — in maintenance mode',
        useFor: '⚠ Prefer date-fns for new code. Only used by older DeckAnalytics page.',
        importExample: `// Use date-fns instead`,
      },
    ],
  },
  {
    label: 'Install when needed — documented, not yet installed',
    items: [
      {
        status: 'available',
        name: '@tiptap/react',
        role: 'ProseMirror-based rich-text editor — more powerful than react-quill',
        useFor: 'Advanced content editors (tables, embeds, collaborative cursors). Ask to install.',
        importExample: `// Not installed yet — ask to add @tiptap/react + @tiptap/starter-kit`,
      },
      {
        status: 'available',
        name: 'react-chrono',
        role: 'Polished, pre-built timeline component (horizontal/vertical, with media)',
        useFor: 'Career arcs · regulatory history · roadmaps when TimelineTrack isn\'t enough',
        importExample: `// Not installed yet — ask to add react-chrono`,
      },
      {
        status: 'available',
        name: '@react-pdf/renderer',
        role: 'Declarative React → PDF (component-based, unlike jspdf\'s imperative API)',
        useFor: 'Client-side certificates · structured reports · invoices',
        importExample: `// Not installed yet — ask to add @react-pdf/renderer`,
      },
      {
        status: 'available',
        name: 'visx',
        role: 'Airbnb\'s React-native chart primitives (D3 wrapped as React components)',
        useFor: 'Custom chart types when recharts can\'t express it — less raw than d3',
        importExample: `// Not installed yet — ask to add @visx/scale @visx/shape @visx/axis`,
      },
      {
        status: 'available',
        name: '@rdkit/rdkit',
        role: 'Publication-quality chemistry rendering (stereochemistry-accurate, 2MB WASM)',
        useFor: 'Manuscript-grade molecule structures. Heavier than smiles-drawer.',
        importExample: `// Not installed yet — ask to add @rdkit/rdkit`,
      },
      {
        status: 'available',
        name: 'react-plotly.js + plotly.js',
        role: 'Full-featured scientific plotting — log scales, dual axes, 3D surfaces',
        useFor: 'When recharts hits a limit (log-scale PK curves, parallel coordinates)',
        importExample: `// Not installed yet — ask to add react-plotly.js plotly.js`,
      },
      {
        status: 'available',
        name: 'mermaid + react-mermaid2',
        role: 'Text-to-diagram (flowcharts, sequence diagrams, gantts) from Markdown-like syntax',
        useFor: 'Docs pages · quick process diagrams without hand-positioning nodes',
        importExample: `// Not installed yet — ask to add mermaid react-mermaid2`,
      },
      {
        status: 'available',
        name: '@react-three/fiber + @react-three/drei',
        role: 'React renderer for Three.js + helpers. Real 3D scenes, not CSS 3D.',
        useFor: 'Interactive molecules · anatomical models · custom 3D slide backgrounds',
        importExample: `// Not installed yet — ask to add @react-three/fiber @react-three/drei`,
      },
      {
        status: 'available',
        name: 'novate-medviz',
        role: 'Medical / anatomical visualizations',
        useFor: 'Clinical slide content — organ diagrams, physiological schematics',
        importExample: `// Not installed yet — ask to add novate-medviz`,
      },
      {
        status: 'available',
        name: 'meshline',
        role: 'Three.js add-on for thick polyline rendering (WebGL lines with width)',
        useFor: 'Custom shader backgrounds with thick, stylized lines',
        importExample: `// Not installed yet — ask to add meshline`,
      },
    ],
  },
];

// Status badge — visual distinction between installed and documented-only.
function StatusBadge({ status }) {
  const isInstalled = status === 'installed';
  return (
    <span
      className="deck-mono uppercase"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: 'var(--radius-pill)',
        fontSize: '0.58rem',
        letterSpacing: 'var(--ls-mono)',
        border: `1px solid ${isInstalled ? 'var(--success)' : 'var(--cream-hairline)'}`,
        background: isInstalled
          ? 'color-mix(in srgb, var(--success) 12%, transparent)'
          : 'color-mix(in srgb, var(--cream-faint) 8%, transparent)',
        color: isInstalled ? 'var(--success)' : 'var(--cream-faint)',
        whiteSpace: 'nowrap',
      }}
    >
      {isInstalled ? '● Installed' : '○ Available'}
    </span>
  );
}

export default function LibrariesPage() {
  const installedCount = GROUPS.reduce(
    (acc, g) => acc + g.items.filter((i) => i.status === 'installed').length,
    0,
  );
  const availableCount = GROUPS.reduce(
    (acc, g) => acc + g.items.filter((i) => i.status === 'available').length,
    0,
  );

  return (
    <>
      <DevKitPageHeader
        eyebrow="Libraries"
        title="External Libraries"
        description="Every library, grouped by role. Audited against the React Stack Directory (v1 · Apr 2026). Reference by name when requesting work so the right tool is used."
      />

      {/* Summary strip */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-6)',
          padding: 'var(--space-4) var(--space-5)',
          marginBottom: 'var(--space-10)',
          border: '1px solid var(--cream-hairline)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--panel)',
        }}
      >
        <SummaryStat value={installedCount} label="Installed" color="var(--success)" />
        <div style={{ width: 1, background: 'var(--cream-hairline)' }} />
        <SummaryStat value={availableCount} label="Available · not installed" color="var(--cream-faint)" />
      </div>

      {GROUPS.map((group) => (
        <section key={group.label} style={{ marginBottom: 'var(--space-12)' }}>
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-nano)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--case, var(--amber))',
              marginBottom: 'var(--space-4)',
              paddingBottom: 'var(--space-2)',
              borderBottom: '1px solid var(--cream-hairline)',
            }}
          >
            {group.label} · {group.items.length}
          </div>

          {group.items.map((lib) => (
            <ComponentShowcase
              key={lib.name}
              name={lib.name}
              importPath={lib.name}
              description={lib.role}
              example={lib.importExample}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  width: '100%',
                }}
              >
                <StatusBadge status={lib.status} />
                <div
                  className="deck-body"
                  style={{
                    color: 'var(--cream-muted)',
                    fontSize: 'var(--fs-body-sm)',
                    lineHeight: 1.5,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <span
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'var(--fs-nano)',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: 'var(--case, var(--amber))',
                      marginRight: 'var(--space-3)',
                    }}
                  >
                    Use for
                  </span>
                  {lib.useFor}
                </div>
              </div>
            </ComponentShowcase>
          ))}
        </section>
      ))}
    </>
  );
}

function SummaryStat({ value, label, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
      <div
        className="deck-display"
        style={{ fontSize: '1.5rem', color, fontWeight: 600, lineHeight: 1 }}
      >
        {value}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-nano)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
        }}
      >
        {label}
      </div>
    </div>
  );
}