/**
 * architecturePositions — coordinates of every architecture node inside
 * Zone D's 2400×1400 box. Used by:
 *   - ZoneD-Architecture.tsx  (positions the nodes)
 *   - ZoneH-WorkflowOverlay.tsx  (draws particle paths between them)
 *
 * Coordinates are TOP-LEFT-CORNER of each node (not center), so a node
 * at (200, 580) with width 140 height 80 spans [200..340, 580..660].
 *
 * The center-based positions (CENTER_*) are computed once at module load.
 */

export interface NodePos {
  x: number;       // top-left X inside Zone D
  y: number;       // top-left Y inside Zone D
  w: number;
  h: number;
}

export const NODE_SIZES = {
  l0:   { w: 168, h: 168 },   // L0 Supervisor (circle — w=h)
  l1:   { w: 152, h: 84 },    // L1 Managers
  l2:   { w: 124, h: 68 },    // L2 Specialists
  bucket: { w: 168, h: 80 },  // PharmState buckets
  analystSlot: { w: 220, h: 220 }, // analyst icon area at top
} as const;

/** The Y bands inside Zone D (1400 tall). */
const BAND = {
  analyst: 60,
  l0:      300,
  l1:      580,
  l2:      820,
  bus:     1170,
};

/** Helper to center a node horizontally at a given band Y, given centerX + size. */
function place(centerX: number, bandY: number, size: { w: number; h: number }): NodePos {
  return {
    x: centerX - size.w / 2,
    y: bandY,
    w: size.w,
    h: size.h,
  };
}

// ── Center X positions ──────────────────────────────────────────────
const ZONE_CENTER_X = 1200;          // Zone D is 2400 wide → center
const L1_X = [400, 800, 1200, 1600, 2000];   // 5 evenly spaced
const L2_X = [1000, 1200, 1400];              // 3 under PopPK (which is at 1200)
const BUS_X = [200, 600, 1000, 1400, 1800, 2200]; // 6 evenly spaced

// ── Node positions ──────────────────────────────────────────────────
export const ARCH_POS = {
  // The Analyst silhouette/avatar at the top of the architecture
  analyst: place(ZONE_CENTER_X, BAND.analyst, NODE_SIZES.analystSlot),

  // L0 Supervisor — center column
  l0: place(ZONE_CENTER_X, BAND.l0, NODE_SIZES.l0),

  // L1 Managers — Data, NCA, PopPK, Simulation, Review
  l1Data:    place(L1_X[0], BAND.l1, NODE_SIZES.l1),
  l1Nca:     place(L1_X[1], BAND.l1, NODE_SIZES.l1),
  l1PopPK:   place(L1_X[2], BAND.l1, NODE_SIZES.l1),
  l1Sim:     place(L1_X[3], BAND.l1, NODE_SIZES.l1),
  l1Review:  place(L1_X[4], BAND.l1, NODE_SIZES.l1),

  // L2 Specialists — under PopPK
  l2Cov:     place(L2_X[0], BAND.l2, NODE_SIZES.l2),
  l2Vpc:     place(L2_X[1], BAND.l2, NODE_SIZES.l2),
  l2Design:  place(L2_X[2], BAND.l2, NODE_SIZES.l2),

  // PharmState bus buckets
  bContext:  place(BUS_X[0], BAND.bus, NODE_SIZES.bucket),
  bDataset:  place(BUS_X[1], BAND.bus, NODE_SIZES.bucket),
  bNca:      place(BUS_X[2], BAND.bus, NODE_SIZES.bucket),
  bModeling: place(BUS_X[3], BAND.bus, NODE_SIZES.bucket),
  bQc:       place(BUS_X[4], BAND.bus, NODE_SIZES.bucket),
  bAudit:    place(BUS_X[5], BAND.bus, NODE_SIZES.bucket),
} as const;

/** Center-coordinate helper. */
export function centerOf(pos: NodePos): { cx: number; cy: number } {
  return { cx: pos.x + pos.w / 2, cy: pos.y + pos.h / 2 };
}

/** Bottom-edge midpoint (for arrow start). */
export function bottomOf(pos: NodePos): { cx: number; cy: number } {
  return { cx: pos.x + pos.w / 2, cy: pos.y + pos.h };
}

/** Top-edge midpoint (for arrow end). */
export function topOf(pos: NodePos): { cx: number; cy: number } {
  return { cx: pos.x + pos.w / 2, cy: pos.y };
}

/** Map of L1 manager id → arch position key (for trace step lookups). */
export const L1_BY_ID: Record<string, keyof typeof ARCH_POS> = {
  data:   'l1Data',
  nca:    'l1Nca',
  poppk:  'l1PopPK',
  sim:    'l1Sim',
  review: 'l1Review',
};

export const L2_BY_ID: Record<string, keyof typeof ARCH_POS> = {
  cov:    'l2Cov',
  vpc:    'l2Vpc',
  design: 'l2Design',
};

export const BUCKET_BY_ID: Record<string, keyof typeof ARCH_POS> = {
  context:  'bContext',
  dataset:  'bDataset',
  nca:      'bNca',
  modeling: 'bModeling',
  qc:       'bQc',
  audit:    'bAudit',
};
