/**
 * cs4-canvas-flagship — canvas-specific data.
 *
 * Re-exports the architectural data from cs4-flagship-v1/data so the
 * two CS4 decks are in sync (numbers, agents, boundary, audit chain,
 * M15 pillars). Adds canvas-only structures: zone bounds (where each
 * zone lives in the 8000×4500 logical canvas), the camera-positions
 * table, and the C6 named-systems comparison.
 *
 * IP firewall enforced at the data layer — no prompts, no system
 * messages, no real SHA-256 inputs. Every hash is illustrative.
 */

import { CANVAS_W, CANVAS_H, VIEWPORT_W, VIEWPORT_H, CAMERA_DEFAULTS } from './themes';

export {
  ARCHITECTURE,
  AGENTS,
  SCHEMA_BOUNDARY,
  AUDIT_CHAIN,
  AUDIT_CHAIN_TAMPERED,
  COMPARISON_ROWS,
  M15_PILLARS,
  DECK_META,
} from '../cs4-flagship-v1/data';

export type { AgentTier, AgentDef, ChainStep } from '../cs4-flagship-v1/data';

// ════════════════════════════════════════════════════════════════════
// ZONE BOUNDS — where each zone lives in the 8000×4500 logical canvas.
// Top-left origin. Each zone box is positioned via {left, top, width,
// height} in CanvasStage (absolute positioning).
// ════════════════════════════════════════════════════════════════════

export interface ZoneBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const ZONE_BOUNDS: Record<string, ZoneBounds> = {
  // Title region — center column, top row
  TITLE: { left: 3040, top: 0,    width: 1920, height: 1080 },

  // A — Hook (tool constellation)        — left column, mid row
  A:     { left: 0,    top: 1500, width: 1920, height: 1080 },

  // B — Why now (ICH M15 date)           — center-left, mid row
  B:     { left: 2200, top: 1500, width: 1920, height: 1080 },

  // C — What is an agent                  — left column, lower row
  C:     { left: 0,    top: 2900, width: 1920, height: 1080 },

  // D — Architecture (load-bearing)       — center-left, lower row, larger
  D:     { left: 2200, top: 2900, width: 2400, height: 1400 },

  // E — Novelty matrix                    — right of D, lower row
  E:     { left: 4900, top: 2900, width: 1920, height: 1080 },

  // F — Privacy boundary                  — right column, top row
  F:     { left: 4900, top: 0,    width: 1920, height: 1080 },

  // G — Audit chain                       — far right, mid row
  G:     { left: 6500, top: 1500, width: 1500, height: 1080 },

  // H — Workflow overlay                  — co-located with D (renders ON TOP)
  H:     { left: 2200, top: 2900, width: 2400, height: 1400 },

  // I — 2034 future (regulator scene)     — bottom-center; revealed only at finale stage 4
  I:     { left: 3040, top: 3300, width: 1920, height: 1080 },
};

// ════════════════════════════════════════════════════════════════════
// CAMERA POSITIONS — one entry per camera (1..10).
//
// Each entry is the (x, y, scale) the CanvasStage's parent transform
// animates to so the target zone(s) appear centered in the viewport.
// Math: target zone center should land at (VIEWPORT_W/2, VIEWPORT_H/2)
//       in screen space.
//   x = (VIEWPORT_W/2) - (zone.left + zone.width/2) * scale
//   y = (VIEWPORT_H/2) - (zone.top  + zone.height/2) * scale
//
// Camera 10 has 4 sub-positions (the four finale stages).
// ════════════════════════════════════════════════════════════════════

export interface CameraPosition {
  /** Optional human label for debugging + presenter notes drawer. */
  label: string;
  /** Stage transform — (x, y) in pixels, scale unitless. */
  x: number;
  y: number;
  scale: number;
  /** Override duration (seconds). Falls back to CAMERA_DEFAULTS.duration. */
  duration?: number;
}

/** Helper to compute the (x, y) so a given zone center lands at viewport center. */
function frame(zone: ZoneBounds, scale = 1): { x: number; y: number } {
  return {
    x: VIEWPORT_W / 2 - (zone.left + zone.width / 2) * scale,
    y: VIEWPORT_H / 2 - (zone.top  + zone.height / 2) * scale,
  };
}

/** Camera positions 1..10. Index 0 is unused so [N] reads as "camera N". */
export const CAMERA_POSITIONS: CameraPosition[] = [
  // [0] unused
  { label: 'unused',            ...frame(ZONE_BOUNDS.TITLE), scale: 1.0 },

  // [1] Title divider — centered on TITLE zone
  { label: 'C1 · Divider',      ...frame(ZONE_BOUNDS.TITLE), scale: 1.0, duration: 1.4 },

  // [2] Hook — Zone A
  { label: 'C2 · Hook',         ...frame(ZONE_BOUNDS.A),     scale: 1.0 },

  // [3] Why now — Zone B
  { label: 'C3 · Why now',      ...frame(ZONE_BOUNDS.B),     scale: 1.0 },

  // [4] What is an agent — Zone C
  { label: 'C4 · Agent?',       ...frame(ZONE_BOUNDS.C),     scale: 1.0 },

  // [5] Architecture — Zone D
  { label: 'C5 · Architecture', ...frame(ZONE_BOUNDS.D),     scale: 0.85 }, // D is larger; pull back

  // [6] Novelty — Zone E (with D ghosted at left edge)
  { label: 'C6 · Novelty',      ...frame(ZONE_BOUNDS.E),     scale: 1.0 },

  // [7] Privacy — Zone F
  { label: 'C7 · Privacy',      ...frame(ZONE_BOUNDS.F),     scale: 1.0 },

  // [8] Audit chain — Zone G
  { label: 'C8 · Audit',        ...frame(ZONE_BOUNDS.G),     scale: 1.0 },

  // [9] Workflow trace — back to Zone D (overlay H atop D)
  { label: 'C9 · Workflow',     ...frame(ZONE_BOUNDS.D),     scale: 0.85 },

  // [10] Finale — stage 1 (whole-canvas zoom-out, scale 0.5)
  //      Stages 2/3/4 are in CAMERA_FINALE_STAGES below.
  { label: 'C10 · Finale S1',
    x: VIEWPORT_W / 2 - (CANVAS_W / 2) * 0.5,
    y: VIEWPORT_H / 2 - (CANVAS_H / 2) * 0.5,
    scale: 0.5,
    duration: 4.5 },
];

/** Finale stage sub-positions (stage 1 above is also CAMERA_POSITIONS[10]). */
export const CAMERA_FINALE_STAGES: CameraPosition[] = [
  // Stage 1 — same as CAMERA_POSITIONS[10]
  { label: 'C10 · S1 · Whole canvas',
    x: VIEWPORT_W / 2 - (CANVAS_W / 2) * 0.5,
    y: VIEWPORT_H / 2 - (CANVAS_H / 2) * 0.5,
    scale: 0.5,
    duration: 4.5 },

  // Stage 2 — pull back further to scale 0.3 (landscape view, named systems appear)
  { label: 'C10 · S2 · Landscape',
    x: VIEWPORT_W / 2 - (CANVAS_W / 2) * 0.3,
    y: VIEWPORT_H / 2 - (CANVAS_H / 2) * 0.3,
    scale: 0.3,
    duration: 3.5 },

  // Stage 3 — rapid zoom in to Analyst at desk (scale 1.5)
  { label: 'C10 · S3 · Analyst',
    ...frame({ left: ZONE_BOUNDS.A.left + 700, top: ZONE_BOUNDS.A.top + 400, width: 600, height: 400 }, 1.5),
    scale: 1.5,
    duration: 0.8 },

  // Stage 4 — pull back to scale 1.0 over Zone I (regulator scene)
  { label: 'C10 · S4 · 2034 regulator',
    ...frame(ZONE_BOUNDS.I),
    scale: 1.0,
    duration: 2.0 },
];

// ════════════════════════════════════════════════════════════════════
// C2 — Hook tool constellation
// 6 tool windows scattered around the analyst silhouette.
// Positions are relative to ZONE_BOUNDS.A (top-left = 0,0 inside the zone).
// ════════════════════════════════════════════════════════════════════

export interface ToolWindowSpec {
  label: string;
  /** Position inside Zone A (0..1920 × 0..1080). */
  x: number;
  y: number;
}

export const HOOK_TOOLS: ToolWindowSpec[] = [
  { label: 'NONMEM', x: 120,  y: 140 },
  { label: 'PsN',    x: 1480, y: 140 },
  { label: 'R',      x: 80,   y: 470 },
  { label: 'Excel',  x: 1520, y: 470 },
  { label: 'Python', x: 220,  y: 800 },
  { label: 'NCA',    x: 1380, y: 800 },
];

/** Analyst position inside Zone A. */
export const HOOK_ANALYST_POS = { x: 1920 / 2, y: 1080 / 2 - 30 };

// ════════════════════════════════════════════════════════════════════
// C3 — ICH M15 effective date (the NumberTicker target)
// ════════════════════════════════════════════════════════════════════

export const M15_DATE = {
  day: 23,
  month: 'July',
  year: 2026,
  fullText: '23 July 2026',
  citation: 'ICH M15 Step 4 · adopted 29 Jan 2026 · effective in the EU 23 July 2026',
};

// ════════════════════════════════════════════════════════════════════
// C6 — Comparison matrix (4 named systems + PharmAgent)
// Per build brief: Apollo-AI · QSP-Copilot · PEARL · pyDarwin
// PharmAgent row is sage; others are calibrated, not selectively biased.
// ════════════════════════════════════════════════════════════════════

export interface NamedSystemRow {
  system: string;
  org?: string;
  scope: string;
  agentCount: string;
  sharedState: 'yes' | 'no' | 'unknown' | 'partial';
  audit: 'yes' | 'no' | 'unknown' | 'partial';
  isPharmAgent?: boolean;
}

export const NAMED_SYSTEM_ROWS: NamedSystemRow[] = [
  { system: 'Apollo-AI',   org: 'Pfizer',   scope: 'PK summary + report drafting', agentCount: '~5',  sharedState: 'unknown', audit: 'unknown' },
  { system: 'QSP-Copilot', org: 'Saini',    scope: 'QSP model exploration',         agentCount: 'n/a', sharedState: 'no',      audit: 'no' },
  { system: 'PEARL',       org: 'Buffalo',  scope: 'PopPK pipeline orchestration',  agentCount: '1',   sharedState: 'no',      audit: 'partial' },
  { system: 'pyDarwin',    org: 'Open',     scope: 'Model selection search',         agentCount: '1',   sharedState: 'no',      audit: 'no' },
  { system: 'PharmAgent',  org: 'this work', scope: 'End-to-end MID3 workflow',     agentCount: '13',  sharedState: 'yes',     audit: 'yes', isPharmAgent: true },
];

// ════════════════════════════════════════════════════════════════════
// C5 — PharmState bus bucket names (NAMES ONLY — IP firewall: the
// 34 individual fields stay internal)
// ════════════════════════════════════════════════════════════════════

export const PHARMSTATE_BUCKETS = [
  { id: 'context',  label: 'Context'  },
  { id: 'dataset',  label: 'Dataset'  },
  { id: 'nca',      label: 'NCA'      },
  { id: 'modeling', label: 'Modeling' },
  { id: 'qc',       label: 'QC'       },
  { id: 'audit',    label: 'Audit'    },
] as const;

// ════════════════════════════════════════════════════════════════════
// C9 — Workflow trace step list
// Drives the particle path through the architecture + bucket-lighting.
// Each step names the agent visited and the bucket lit on arrival.
// ════════════════════════════════════════════════════════════════════

export interface TraceStep {
  from: string;       // architecture node id (matches CANVAS_LAYOUT_IDS family)
  to: string;
  bucketLit?: string; // PHARMSTATE_BUCKETS id
  amber?: boolean;    // if true, this step uses amber accent (review-gate)
  durationS: number;
}

export const C9_TRACE_STEPS: TraceStep[] = [
  { from: 'analyst', to: 'l0',       durationS: 0.5 },
  { from: 'l0',      to: 'l1Data',   bucketLit: 'dataset',  durationS: 0.5 },
  { from: 'l1Data',  to: 'l1Nca',    bucketLit: 'nca',      durationS: 0.5 },
  { from: 'l1Nca',   to: 'l1PopPK',  bucketLit: 'modeling', durationS: 0.5 },
  { from: 'l1PopPK', to: 'l2Cov',    durationS: 0.5 },
  { from: 'l2Cov',   to: 'l2Vpc',    durationS: 0.5 },

  // Amber backward pulse — review gate fires
  { from: 'l1PopPK', to: 'analyst',  amber: true, durationS: 1.0 },

  // Sage forward completion pulse
  { from: 'analyst', to: 'l1Review', bucketLit: 'qc',    durationS: 0.7 },
  { from: 'l1Review',to: 'l0',       bucketLit: 'audit', durationS: 0.5 },
];
