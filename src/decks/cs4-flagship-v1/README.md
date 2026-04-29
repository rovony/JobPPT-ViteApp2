# CS4 Flagship — PharmAgent · Workflow Infrastructure for Model-Informed Decisions

> **Standalone 10-slide deck · 15-minute delivery · Editorial register**
> Author: Malek Okour · Built April 2026
> Status: Phase 2 Group A in progress (foundation + S1–S3)

## Why this deck exists (separate from `qp2-seminar-v3-R2`)

The flagship V5 deck has CS3 = PharmAgent in 7 slides. This standalone
**cs4-flagship-v1** deck rebuilds PharmAgent as a **15-minute Senior
Director-grade architectural argument**, framed as the candidate's
**original architectural contribution** — manuscript in preparation,
grounded in the published multi-agent literature
([Kim et al. arXiv:2512.08296](https://arxiv.org/abs/2512.08296)) and
the regulatory anchor of [ICH M15 (Step 4, 29 Jan 2026)][ich-m15].

It is **integration-ready**: same tokens, same `SlideGrid` layout
contract, same case-color (`sage`), same illustration component
(`AiBrain`). When the time comes to fold it into V5, slot it in place
of `cs3-*` slides or run it as the V5 successor (`v6` or `v4-cs4-flag`).

[ich-m15]: https://www.ema.europa.eu/en/ich-m15-good-practices-model-informed-drug-development-mid

## Structure

```
cs4-flagship-v1/
├── README.md            (this file)
├── data.ts              (parameterized: agent counts, hashes, etc.)
├── themes.ts            (CS4 = sage; M15 pillar palette)
├── manifest.ts          (10 slides registered)
├── notes.ts             (Spoken / Cues / Bridge per slide)
├── qa.ts                (anticipated Q&A per slide)
├── components/
│   ├── TracingBeam.tsx           ✓ continuous sage hairline spine
│   ├── ChainBlock.tsx            (S08 — hash-chain block)
│   ├── HashPrefix.tsx            (S08 — mono hash badge)
│   ├── ToolWindowFragments.tsx   (S04 — agent loop visual)
│   ├── BoundaryParticle.tsx      (S07 — schema reveal)
│   └── ComparisonMatrix.tsx      (S06 — vs published landscape)
└── slides/
    ├── 01-divider.tsx            ✓ Group A
    ├── 02-hook-integration-layer.tsx ✓ Group A
    ├── 03-why-now-m15.tsx        ✓ Group A
    ├── 04-what-is-an-agent.tsx
    ├── 05-architecture.tsx
    ├── 06-novelty-comparison.tsx
    ├── 07-privacy-boundary.tsx
    ├── 08-audit-chain.tsx
    ├── 09-workflow-trace.tsx
    └── 10-bracket-bridge.tsx
```

## Reused from `qp2-seminar-v3-R2`

To avoid duplication and keep visual consistency:

- `CaseHeroDivider` — used as-is for S01
- `AiBrain` — used as-is for S01 illustration + S02 morph anchor
- `pharmagent.tsx` / `pharmagent-canvas.tsx` / `pharmagent-data.ts` —
  imported for S05 architecture + S09 workflow trace (with overrides)
- `IntegerTicker` (in `components/deck/patterns/`) — for the
  NumberTicker cascade on S05; no Magic UI dep needed
- `SlideGrid` + `SlideParts` — every body slide uses the standard
  `<SlideGrid areas={STANDARD_AREAS}>` pattern with `<Eyebrow>`,
  `<Headline>`, `<Subhead>`, `<Viz>`, `<Footer>` plug-ins

## Defaults applied (open questions — user did not answer pre-build)

| Q  | Question                                  | Default chosen                                                                                                  |
| -- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Q1 | **Agent / tool / SOP numbers** (blocker)  | **Brief's** 13 / 151 / 76 / 34 fields / 6 buckets — matches existing CS3 stat tile + worked example. Parameterized in `data.ts`; swap to SoT (29 / 97 / 8 / 14 / 23) by changing one object. |
| Q2 | Standalone vs integrated                  | **Standalone deck** registered alongside V5 (NOT a separate Vite app). Easier to demo and swap.                 |
| Q3 | Agent names                               | Verbatim from brief (DataAgent, NCAAgent, etc.)                                                                 |
| Q4 | TracingBeam scope                         | **Per-slide** instance with shared `layoutId` so Framer Motion physically interpolates the beam fill across slides — Antigravity FLIP pattern. |
| Q5 | Editorial palette                         | Sage primary; **amber allowed** for `review-gate` cells on S05 + S09 (max 2× per deck).                         |
| Q6 | CaseHeroDivider variant                   | **Rich** — meta + verdict + AiBrain (matches CS3, cinematic continuity).                                        |
| Q7 | ICH M15 wording                           | "ICH M15 Step 4 · 29 Jan 2026 · CHMP adopted Mar 2026" — cite both adoption events.                             |

**To override any default,** edit `data.ts` (numbers) or the relevant
slide file. None are load-bearing for cinematic correctness.

## Cinematic moments (cross-slide)

Layered onto the editorial baseline (out-expo, 4.5s rhythm, no overshoot)
following the **Antigravity Wow Factor protocol** — "never jump,
always morph" via Framer Motion `layoutId`:

| Beat | From → To  | Mechanism                                                                          |
| ---- | ---------- | ---------------------------------------------------------------------------------- |
| C1   | S01 → S02  | `AiBrain` hero illustration (right column) → center "Workflow Layer" Venn circle.   |
| C2   | S02 → S03  | Sage case-marker hairline → outer arc of M15 6-pillar dial.                         |
| C3   | S03 → S05  | M15 "AI/ML" pillar tile → L0 supervisor node anchor.                                |
| C4   | S05        | NumberTicker cascade: 13 → 151 → 76 → 34 → 6, staggered 200ms, out-expo, 1500ms each. |
| C5   | S07        | SchemaExtractor boundary reveal — particle crosses dashed sage line; only metadata emerges. |
| C6   | S08        | Hash-chain tamper demo — flip one byte, downstream hashes flash amber.              |
| C7   | S05 → S09  | PharmAgent network morph — static node graph → live workflow trace with particles.  |
| C8   | All slides | **TracingBeam** — 1px sage hairline on the left rail, fills 10% per slide. Persists via `layoutId`. |

## Deck-level continuity contract

- **Case color:** `sage` (`#7BAE7F`) — locked across all 10 slides
- **Background:** `var(--bg)` (deck-default deep navy `#0D1B2A`)
- **Eyebrow on body slides:** `CASE 04 · PharmAgent · S{NN}` (mono, sage)
- **Footer:** uses deck-wide `standardLayout.footer` (set in manifest)
- **Source line:** "Personal research · manuscript in preparation · Kim et al. (2025) · ICH M15 Step 4"

## What a reviewer cannot see (IP firewall)

✅ Show: architectural principles, agent role names, M15 pillar mapping,
schema-extractor boundary concept, hash-chain mechanism, comparison
posture vs published systems.

❌ Hide: actual prompts, agent system messages, tool implementation
code, exact deployment topology, dataset names, license-restricted
patient identifiers.

Every on-slide quote, hash, schema name, and tool window is **plausible
sample data** — never traced from a real session. See per-slide
comments for what is real vs illustrative.

## Phase 2 build sequence

1. **Group A** (now): Foundation (this scaffolding) + S01 / S02 / S03 + TracingBeam
2. **Group B** (after review): S04 (what-is-an-agent) + S05 (architecture) + S06 (novelty)
3. **Group C** (after review): S07 (privacy boundary) + S08 (audit chain)
4. **Group D** (after review): S09 (workflow trace) + S10 (bracket bridge)
5. **Group E** (final pass): polish, screenshot QA via browser, source-line audit, notes/QA pass
