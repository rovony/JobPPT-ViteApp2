/**
 * Speaker notes — one section per camera position.
 *
 * Rendered by overlays/CameraNotesOverlay.tsx as a bottom drawer
 * inside the canvas, toggled by the `N` key. The drawer reads
 * NOTES_BY_CAMERA[cameraIndex] and renders the corresponding markdown.
 *
 * Each section follows the same internal structure:
 *   • Spoken — the words to say
 *   • Cues   — when to advance, when to hold, when to take Q
 *   • Bridge — how to transition into the next camera
 *
 * Total spoken time across all 10 cameras: ~13.5 minutes
 * (leaving ~1.5 min slack inside a 15-minute slot).
 */

export interface CameraNote {
  /** Camera index 1..10 */
  camera: number;
  /** Display title for the drawer header */
  title: string;
  /** Approx spoken duration in seconds */
  spokenSec: number;
  /** Markdown — Spoken / Cues / Bridge */
  body: string;
}

export const NOTES_BY_CAMERA: CameraNote[] = [
  {
    camera: 1,
    title: 'C1 · Divider',
    spokenSec: 15,
    body: `**Spoken**

> "AI/ML in clinical pharmacology — this is a working architecture, and what we learned building it. Case 4 of four."

**Cues**

- Hold the title 2 seconds before advancing
- The sage hairline below the title carries forward into the next camera as the canvas spine

**Bridge**

- Press → to dolly the camera right and down to Zone A (the integration-layer pain)`,
  },

  {
    camera: 2,
    title: 'C2 · Hook · Integration-layer pain',
    spokenSec: 90,
    body: `**Spoken**

> "Today, the pharmacometrician is the integration layer. Six tools — NONMEM, PsN, R, Excel, Python, NCA — each one excellent on its own. None of them talk to each other.
>
> The dashed lines you see between the tools aren't connections that work. They're connections that almost work, that work most of the time, that fail in subtle ways. Four to eight weeks per analysis. Most of that time isn't spent on the science — it's spent moving data between formats, reconciling versions, rebuilding state.
>
> The audit trail crosses five to ten file formats. The decisions are delayed by integration friction, not by the model."

**Audience layers** (one sentence each)

- Senior pharmacometrician: *"This is a structural inefficiency, not a tooling gap."*
- Junior pharmacometrician: *"4–8 weeks per analysis. Most of that is plumbing."*
- Senior clinical pharmacologist: *"Decisions delayed by integration friction."*
- Regulatory scientist: *"Audit trail crosses 5–10 file formats."*

**Cues**

- The Analyst silhouette at center is the same DOM element that returns on cameras 5, 9, and the finale (layoutId="cs4-analyst")
- Tool windows fade in left-to-right with 250ms stagger
- Hold for 90 seconds total

**Bridge**

- Press → to pan right to Zone B (Why now — ICH M15)`,
  },

  {
    camera: 3,
    title: 'C3 · Why now · ICH M15',
    spokenSec: 90,
    body: `**Spoken**

> "AI/ML is now in regulatory scope. Not in five years — twelve weeks from today. ICH M15 was adopted at Step 4 on January 29, 2026, and is effective in the EU on July 23, 2026.
>
> The guideline names model-informed evidence, AI/ML-assisted analyses, and traceability requirements as scope. The integration layer we just looked at — that's not a productivity problem anymore. It's a compliance problem in twelve weeks."

**Cues**

- The "23" in the date counts up from 22 → 23 over 800ms (NumberTicker on day digit)
- Underline draws on after the date settles
- Body text fades in 400ms after the underline

**Bridge**

- Press → to dolly down-left to Zone C (What is an agent)`,
  },

  {
    camera: 4,
    title: 'C4 · What an agent is — and isn\'t',
    spokenSec: 90,
    body: `**Spoken**

> "Before we look at architecture, one boundary that makes everything downstream validatable.
>
> An agent IS: an LLM that calls validated tools — NONMEM, scipy, R/PsN — and observes the output. The LLM never computes a Cmax. It calls the function that does.
>
> An agent ISN'T: an LLM that does the math itself. The strikethrough on the right panel is intentional. We do not, anywhere in this system, ask a language model to numerically integrate an ODE or fit a covariate model.
>
> This boundary is what makes the validation scope tractable. Everything quantitative runs on software you already trust."

**Audience layers**

- Senior: *"This is the boundary that makes the architecture validatable."*
- Junior: *"The LLM never computes — it orchestrates."*
- Clinical: *"Numerical work runs on the same software you already trust."*
- Regulatory: *"Validation scope is bounded by the deterministic tool layer."*

**Cues**

- The LLM badge in the LEFT panel carries layoutId="cs4-llm-badge" — it physically morphs into the L0 Supervisor on the next camera
- This camera is load-bearing for juniors — don't compress

**Bridge**

- Press → to pan right to Zone D (the architecture). Watch the LLM badge — it's the same element, just morphed into the L0 node.`,
  },

  {
    camera: 5,
    title: 'C5 · Architecture · CINEMATIC 1',
    spokenSec: 120,
    body: `**Spoken**

> "Three numbers first. 13 agents. 151 tools. 76 templates.
>
> [Pause for cascade]
>
> The agents are organized in three tiers. The Supervisor — that's the LLM badge from the previous slide, scaled up. Five Manager agents below it: Data, NCA, PopPK, Simulation, Review. Three Specialist agents below the Modeler: Covariate, VPC, Design. The Analyst — that's the rose icon — sits above the Supervisor with a bidirectional connection. That's the review gate. Humans approve before anything ships.
>
> The bus at the bottom is PharmState — six typed buckets. Context. Dataset. NCA. Modeling. QC. Audit. Every agent reads and writes through this typed shared state. Nothing is passed as a string between agents. The 34 fields inside these buckets stay internal to the manuscript.
>
> The architecture is grounded in Kim et al., 2025. We extended it with the typed shared state and the privacy boundary I'll show you in a moment."

**Cues — Cinematic 1 timing**

- 0.0–0.5s: camera arrives
- 0.5–2.0s: 13 / 151 / 76 cascade (NumberTicker, 250ms stagger, 1500ms each)
- 2.0–2.6s: breath
- 2.6–3.0s: Analyst glides up from ZoneA position
- 3.0–3.4s: LLM badge morphs into L0 Supervisor (the moment to point at)
- 3.4–6.4s: L1, L2, arrows, PharmState bus, bidirectional arrows draw
- 6.4–6.8s: Analyst↔L0 review-gate arrow pulses once

**IP firewall check**

- Bucket NAMES shown ✓
- 34 individual field names HIDDEN ✓
- Hash chain mechanism shown later — not here

**Bridge**

- Press → to pan right to Zone E (Novelty). The architecture stays in the canvas at the left edge, ghosted to 20%.`,
  },

  {
    camera: 6,
    title: 'C6 · Novelty · Adjacent systems',
    spokenSec: 105,
    body: `**Spoken**

> "What this isn't. Apollo-AI from Pfizer is a PK summary and report-drafting assistant. QSP-Copilot does QSP model exploration. PEARL is a PopPK pipeline orchestrator. pyDarwin is a model selection search.
>
> All of these are good systems. None of them are wrong. They solve adjacent problems.
>
> PharmAgent's scope is broader by intent. The matrix shows it: thirteen agents, typed shared state, cryptographic audit. None of these alone is the contribution — the contribution is that they compose into a coherent end-to-end workflow.
>
> Different scope. Not better. Adjacent systems solve adjacent problems."

**Audience layers**

- Senior: *"PharmAgent's scope is broader by intent."*
- Junior: *"These systems all do something different."*
- Clinical: *"None of these are wrong; they answer different questions."*
- Regulatory: *"Comparison criteria can be made explicit."*

**Cues**

- PharmAgent row in sage with weight contrast — but the matrix is calibrated, not biased
- Architecture from C5 visible at left edge of viewport, ghosted to 20%

**Bridge**

- Press → to dolly up-right to Zone F (Privacy boundary)`,
  },

  {
    camera: 7,
    title: 'C7 · Privacy by architecture · CINEMATIC 2',
    spokenSec: 90,
    body: `**Spoken**

> "Privacy by architecture, not by policy. That's an important distinction.
>
> The left panel is the patient data — 247 subjects, columns SUBJID, TIME, DV, AMT — sitting in a local storage layer. The dashed line down the middle is the SchemaExtractor boundary. To the right of that line: only metadata. Subject count. Observation count. BLQ rate. Dose levels. Schema hash.
>
> [Particle launches, decelerates at the boundary, dissolves]
>
> That's the architecture. Patient rows physically cannot cross. There's no policy layer to enforce, no allow-list to audit. The boundary is a class definition. Zero patient rows cross. The implementation detail of how the allow-list is enforced stays internal."

**Cues — Cinematic 2 timing (GSAP)**

- 0.0–0.5s: camera arrives
- 0.5–1.1s: left column data rows fade in at 30% opacity
- 1.1–1.5s: vertical dashed boundary draws on
- 1.5–2.5s: sage particle launches, moves rightward
- 2.5–2.9s: particle decelerates approaching boundary
- 2.9–3.1s: particle dissolves AT the boundary
- 3.1–3.5s: 6 metadata field labels fade in (80ms stagger)
- 3.5–3.9s: subtle sage glow on right column

**Editorial restraint**

- The particle-stops-at-boundary moment is the wow. No sound effect. No celebration glow. The visceral motion IS the message.

**Bridge**

- Press → to pan right to Zone G (Audit chain)`,
  },

  {
    camera: 8,
    title: 'C8 · Audit chain · CINEMATIC 3',
    spokenSec: 90,
    body: `**Spoken**

> "Audit by cryptographic chain. Six blocks: lambda-z, AUC, 2-compartment fit, covariate, QC, report. Each block contains a tool name and a hash prefix. Each block's hash depends on the previous block's hash.
>
> [Tamper sequence]
>
> Watch what happens if I change the 2-compartment fit. The hash prefix mutates. And blocks 4, 5, and 6 — every downstream block — flash amber. They're now invalid.
>
> A regulator in 2034 can replay any analysis from 2026. If anything in the chain has changed, it's visible. The hash inputs themselves stay internal to the manuscript."

**Cues — Cinematic 3 timing (GSAP)**

- Phase A (0–3s): blocks slide in left-to-right, 400ms stagger
- Phase B (3–4s): hold; bottom badge pulses once
- Phase C (4–7s): block 3 hash mutates, blocks 4–6 amber-flash
- Phase D (7–10s): caption holds, then chain resets to all-sage

**IP firewall check**

- Hash prefixes shown are illustrative — never real SHA-256 outputs
- The actual SHA-256 input concatenation order stays internal

**Bridge**

- Press → to dolly back to Zone D (the architecture again — this time with the workflow overlay)`,
  },

  {
    camera: 9,
    title: 'C9 · Workflow in action · CINEMATIC 4',
    spokenSec: 120,
    body: `**Spoken**

> "Now watch the architecture operate. The Analyst asks: 'Run NCA plus PopPK base model. 247 subjects.'
>
> [Particle traces through architecture]
>
> The Supervisor routes to Data. Dataset bucket lights. Then NCA. NCA bucket lights. Then the Modeler hands to the PopPK Specialist. Modeling bucket lights.
>
> [Amber pulse]
>
> The Review agent flags an outlier in the GOF. Watch the amber pulse fire backward — that's the review gate. The Analyst gets a one-line summary, sees the diagnostic plots, and approves with a single click.
>
> [Completion pulse]
>
> The chain completes. QC bucket lights. Audit bucket lights. Four to eight weeks becomes hours. And the traceability is stronger than the prior pipeline because every step is signed."

**Cues — Cinematic 4 timing (Framer Motion)**

- 0.0–1.0s: camera dollies back to Zone D (architecture is still there from C5)
- 1.0–4.5s: forward particle trace through agents
- 4.5–5.0s: bucket lights cascade (Dataset, NCA, Modeling)
- 5.0–6.0s: amber backward pulse to Analyst (review gate)
- 6.0–7.0s: diagnostic panel slides in
- 7.0–7.5s: sage approval checkmark
- 7.5–8.5s: forward completion pulse, QC + Audit buckets light
- 8.5–9.0s: footer "4–8 weeks → hours, with traceability stronger than the prior pipeline"

**Bridge**

- Press → to begin the finale (Camera 10 — four-stage zoom-out)`,
  },

  {
    camera: 10,
    title: 'C10 · Finale · CINEMATIC 5 (4 stages)',
    spokenSec: 90,
    body: `**Spoken**

**Stage 1 (0:00–0:25)** — *as camera zooms out to reveal everything at once*

> "PharmAgent. What we built. The architecture, the workflow trace, the privacy boundary, the audit chain — they were always one continuous space. The panel sees it all simultaneously."

**Stage 2 (0:25–0:45)** — *as named systems appear at the corners*

> "PharmAgent in the broader landscape. Apollo-AI, QSP-Copilot, PEARL, pyDarwin — different scope. Not a different category."

**Stage 3 (0:45–1:05)** — *as camera zooms tight on the Analyst at her desk*

> "PharmAgent. What we built — and why. The workflow doesn't disappear after launch. The Analyst still owns the decision. The architecture supports her, doesn't replace her."

**Stage 4 (1:05–1:30)** — *as scene shifts to 2034 regulator*

> "13 agents, structurally separated by data sensitivity. 6-bucket typed shared state — agents read and write through types, not strings. SHA-256 hash chain from prompt to PDF — replayable in 2034. This architecture is, to my knowledge, first of its kind in scope. Manuscript in preparation."

**Cues — Cinematic 5**

- Stage transitions: → key (or auto-advance after each stage's hold duration)
- Stage 1: 4500ms zoom-out, scale 1.0 → 0.5
- Stage 2: scale 0.5 → 0.3, named-system overlays fade in
- Stage 3: rapid zoom (0.3 → 1.5) onto Analyst position
- Stage 4: scale 1.5 → 1.0, regulator scene reveals, audit chain glow brightens, bracket statement fades in line-by-line

**Closing line if Q&A starts**

> "Happy to take questions on any layer — the agent topology, the privacy boundary, the audit chain, or the integration into existing pharmacometric workflows."`,
  },
];

/** Convenience: lookup by camera index. */
export function noteFor(camera: number): CameraNote | undefined {
  return NOTES_BY_CAMERA.find((n) => n.camera === camera);
}

/** Markdown-style export of all notes — used by /reading route if added later. */
export function allNotesMarkdown(): string {
  return NOTES_BY_CAMERA
    .map((n) => `## ${n.title}\n\n*~${n.spokenSec}s*\n\n${n.body}\n\n---`)
    .join('\n\n');
}

// Default export — DeckRunner expects manifest.notes to be a markdown string.
export default allNotesMarkdown();
