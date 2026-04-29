/**
 * cs4-flagship-v1 — parameterized scaffold data.
 *
 * EVERY architectural number on the slides reads from this file.
 * To swap the visible counts (brief default ↔ source-of-truth),
 * change the `ARCHITECTURE` object below — no slide JSX touches.
 *
 * The defaults follow the build brief and the existing CS3 stat
 * tile in `qp2-seminar-v3-R2`. The source-of-truth alternative
 * (from `1-Sources/1-MyPreviousFiles/AIML/PharmAgent-Docs/PharmAgent_Source_of_Truth.md`)
 * is preserved as a commented block below for trivial swap.
 *
 * NOTE: this file deliberately ships NO prompts, agent system
 * messages, or implementation strings — only architectural
 * counts and role names. IP firewall enforced at the data layer.
 */

// ═══════════════════════════════════════════════════════════════
// ARCHITECTURE — drives S05 cascade, S05 hierarchy, S09 trace
// ═══════════════════════════════════════════════════════════════

export const ARCHITECTURE = {
  // Brief default (matches CS3 stat tile + worked example):
  agents: 13,
  tools: 151,
  templates: 76,
  fields: 34,
  buckets: 6,

  // Source-of-truth alternative — uncomment and comment-out the block
  // above to swap:
  //
  // agents: 29,
  // tools: 97,
  // templates: 8,
  // fields: 23,
  // buckets: 14,

  // Visible nodes on the S05 hierarchy diagram (same in both modes;
  // labelled "principal families" so the count is honest):
  visibleL1: 5,   // L1 manager families shown on the diagram
  visibleL2: 3,   // L2 expert specialists shown on the diagram

  // Disclosure label on S05 — keep this honest:
  disclosure: '5 of 8 manager families · 3 of 10 expert specialists shown',
} as const;

// ═══════════════════════════════════════════════════════════════
// AGENTS — names + role, used by S05 hierarchy + S09 trace
// Names verbatim per build brief (Q3 default).
// NO prompts, NO system messages — names + role tag only.
// ═══════════════════════════════════════════════════════════════

export type AgentTier = 'L0' | 'L1' | 'L2';

export interface AgentDef {
  id: string;
  name: string;
  tier: AgentTier;
  role: string;       // 1-line architectural role
  parent?: string;    // parent agent id (L1 → L0, L2 → L1)
}

export const AGENTS: AgentDef[] = [
  // L0 — supervisor
  { id: 'sup',     name: 'SupervisorAgent', tier: 'L0', role: 'Plan + delegate' },

  // L1 — managers (5 visible families)
  { id: 'data',    name: 'DataAgent',       tier: 'L1', role: 'Schema + ingestion',         parent: 'sup' },
  { id: 'nca',     name: 'NCAAgent',        tier: 'L1', role: 'Non-compartmental analysis', parent: 'sup' },
  { id: 'poppk',   name: 'PopPKAgent',      tier: 'L1', role: 'Population PK build + fit',   parent: 'sup' },
  { id: 'sim',     name: 'SimulationAgent', tier: 'L1', role: 'Trial simulation + uncertainty', parent: 'sup' },
  { id: 'review',  name: 'ReviewAgent',     tier: 'L1', role: 'Cross-check + audit gate',    parent: 'sup' },

  // L2 — expert specialists (3 visible)
  { id: 'cov',     name: 'CovariateAgent',  tier: 'L2', role: 'Covariate screen', parent: 'poppk' },
  { id: 'vpc',     name: 'VPCAgent',        tier: 'L2', role: 'pcVPC diagnostics', parent: 'poppk' },
  { id: 'design',  name: 'DesignAgent',     tier: 'L2', role: 'Optimal sampling',  parent: 'sim' },
];

// ═══════════════════════════════════════════════════════════════
// SCHEMA-EXTRACTOR boundary — drives S07
// What stays inside vs what crosses the dashed sage boundary.
// ═══════════════════════════════════════════════════════════════

export const SCHEMA_BOUNDARY = {
  insideLabel: 'PATIENT DATA · LOCAL ONLY',
  outsideLabel: 'METADATA ONLY · CROSSES BOUNDARY',
  insideRows: [
    { id: 'PT-001', age: '57', sex: 'F', dose: '10 mg', conc: '12.4 ng/mL' },
    { id: 'PT-002', age: '63', sex: 'M', dose: '10 mg', conc: '15.1 ng/mL' },
    { id: 'PT-003', age: '49', sex: 'F', dose: '20 mg', conc: '24.8 ng/mL' },
    { id: 'PT-004', age: '71', sex: 'M', dose: '20 mg', conc: '21.6 ng/mL' },
    { id: 'PT-005', age: '55', sex: 'F', dose: '10 mg', conc: '13.0 ng/mL' },
  ],
  // What the SchemaExtractor ACTUALLY emits to the agents:
  outsideMetadata: {
    nSubjects: 247,
    nObservations: 4_812,
    blqRate: '8.3%',
    doseLevels: ['10 mg', '20 mg', '40 mg'],
    units: { dose: 'mg', conc: 'ng/mL', time: 'h' },
    schemaHash: '0x7c3a91f2',
  },
};

// ═══════════════════════════════════════════════════════════════
// AUDIT CHAIN — drives S08 hash-chain tamper demo
// All hashes are PLAUSIBLE SAMPLE DATA; never lifted from a real run.
// ═══════════════════════════════════════════════════════════════

export interface ChainStep {
  step: number;
  agent: string;
  action: string;
  inputHash: string;
  outputHash: string;
  prevHash: string;
}

export const AUDIT_CHAIN: ChainStep[] = [
  {
    step: 1,
    agent: 'DataAgent',
    action: 'extract schema',
    inputHash: '0x1f3a48c2',
    outputHash: '0x7c3a91f2',
    prevHash: '0x00000000',
  },
  {
    step: 2,
    agent: 'NCAAgent',
    action: 'compute AUC₀₋∞',
    inputHash: '0x7c3a91f2',
    outputHash: '0xb84d2071',
    prevHash: '0x7c3a91f2',
  },
  {
    step: 3,
    agent: 'PopPKAgent',
    action: 'fit 2-cmt + Vmax',
    inputHash: '0xb84d2071',
    outputHash: '0xa1f9c308',
    prevHash: '0xb84d2071',
  },
  {
    step: 4,
    agent: 'ReviewAgent',
    action: 'audit-gate · pass',
    inputHash: '0xa1f9c308',
    outputHash: '0xd07e4b15',
    prevHash: '0xa1f9c308',
  },
];

// The "tampered" alternative — used by the cinematic on S08.
export const AUDIT_CHAIN_TAMPERED: ChainStep[] = AUDIT_CHAIN.map((step, i) => {
  if (i === 0) return { ...step, outputHash: '0x7c3a91f3' };  // 1 byte flip
  // Downstream hashes break because prev no longer matches
  return { ...step, prevHash: '0xBROKEN! ', inputHash: 'mismatch' };
});

// ═══════════════════════════════════════════════════════════════
// COMPARISON — drives S06 novelty matrix
// ═══════════════════════════════════════════════════════════════

export const COMPARISON_ROWS = [
  {
    capability: 'Multi-agent supervisor + specialists',
    pharmagent: 'yes',
    kim2025: 'yes',
    typical: 'no',
  },
  {
    capability: 'Domain-specific tool calling (PK/PD)',
    pharmagent: 'yes · 151 tools',
    kim2025: 'partial',
    typical: 'no',
  },
  {
    capability: 'Schema-only data egress (privacy by construction)',
    pharmagent: 'yes',
    kim2025: 'no',
    typical: 'no',
  },
  {
    capability: 'Cryptographic audit chain (per step)',
    pharmagent: 'yes',
    kim2025: 'no',
    typical: 'no',
  },
  {
    capability: 'Aligned to ICH M15 governance',
    pharmagent: 'yes',
    kim2025: 'n/a',
    typical: 'no',
  },
];

// ═══════════════════════════════════════════════════════════════
// ICH M15 PILLARS — drives S03 dial
// Six pillars from the brief; "AI/ML" is the morph anchor for S05.
// ═══════════════════════════════════════════════════════════════

export const M15_PILLARS = [
  { id: 'context',   label: 'Context of use',     glyph: '◧' },
  { id: 'data',      label: 'Data quality',       glyph: '⊞' },
  { id: 'model',     label: 'Model qualification', glyph: '◇' },
  { id: 'ai-ml',     label: 'AI / ML',            glyph: '◈', highlight: true },
  { id: 'gov',       label: 'Governance + audit', glyph: '⌖' },
  { id: 'lifecycle', label: 'Lifecycle update',   glyph: '↺' },
];

// ═══════════════════════════════════════════════════════════════
// DECK META
// ═══════════════════════════════════════════════════════════════

export const DECK_META = {
  caseColor: 'sage',
  caseToken: 'sage' as const,
  totalSlides: 10,
  // Source line that appears on every body slide footer.
  source: 'Personal research · manuscript in preparation · Kim et al. arXiv:2512.08296 (2025) · ICH M15 Step 4 · 29 Jan 2026',
  manuscriptStatus: 'in preparation',
  publishedAnchor: 'Kim et al. (2025) arXiv:2512.08296',
  regulatoryAnchor: 'ICH M15 Step 4 · 29 Jan 2026 · CHMP adopted Mar 2026',
};
