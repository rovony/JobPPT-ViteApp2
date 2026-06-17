# v6-vir Story Flow Audit

**Date:** 2026-06-16  
**Spine:** problem → constraint → approach → outcome → bridge (per case)

## Intro

| Slide | Role | Bridge |
|-------|------|--------|
| `title` | Four cases + thesis + PK spine | → hook |
| `hook-A-trial-not-answer` | "When measurement falls short" + four constraint marks | → career → roadmap |
| `career-arc` | Five stops · one operating question (footer impact/tools removed) | → roadmap |
| `roadmap` | Four case cards + discipline ribbon (no duplicate constraint chips) | → `cs1-divider` |

Notes: `override-notes.ts` spoken scripts for all four intro slides; hook aligned to on-slide headline and LOCAL-EVIDENCE mark label.

---

## Case 01 — Ambrisentan (pediatric PAH)

**Problem:** Pediatric trial terminated — can PK bridge still support a label?  
**Constraint:** 380 adults vs 39 children; dose-defense not repeat-efficacy.  
**Approach:** PopPK anchor → covariate discipline → exposure match.  
**Outcome:** EMA/PMDA 2021; E11A codified 2024.  
**Bridge to CS2:** Pediatric extrapolation → adult feasibility (Asparlas).

| Order | Slide | Adds to arc |
|-------|-------|-------------|
| 1 | `cs1-divider` | Case entry + 2021 approval fact |
| 2 | `cs1-question` | **Question + 380/39 asymmetry** (disruption cluster only — timeline deferred) |
| 3 | `cs1-context` | PAH 101 + endothelin hook |
| 4 | `cs1-mechanism` | ETA selectivity payoff |
| 5 | `cs1-trial` | Held → terminated → approved arc |
| 6 | `cs1-architecture` | Five constraints → dose-defense question |
| 7 | `cs1-covariate-strategy` | Anchor / constrain / parsimonious |
| 8 | `cs1-poppk` | 380 build · 39 confirm |
| 9 | `cs1-pkpd` | AUC bridge · Cmax safety · no E-R cliff |
| 10 | `cs1-outcome` | Three disruptions (trial / regulatory / filing) |
| 11 | `cs1-bracket` | Five-step workflow + numbers |
| 12 | `cs1-lesson` | EMA/PMDA + E11A + FDA geography caveat |
| 13 | `cs1-bridge` | Portable architecture → Asparlas feasibility |

**Flow fix this pass:** Removed `StoryPath` from `cs1-question` so timeline/disruptions are not previewed before `cs1-trial` / `cs1-outcome`. Notes for CS1 use qp2 `## Spoken` scripts (override on `cs1-bridge` only). Visual trims: `cs1-context` → 2 facts; `cs1-mechanism` → selectivity only; `cs1-trial` → single pediatric lane; `cs1-poppk` covariate ribbon → one-line 380/39; `cs1-bridge` handoff fixed to Asparlas (was stale ADC).

---

## Case 02 — Asparlas (efficient design)

**Problem:** 94-adult endpoint-powered trial undeliverable.  
**Constraint:** Rare Ph-neg adult ALL; pediatric prior already strong.  
**Approach:** D-optimal design + simulated primary (stacked precedents).  
**Outcome:** FDA Type A N=60 (−36%); durable methodology.  
**Bridge to CS3:** Feasibility → local-evidence pressure (India).

| Order | Slide | Adds to arc |
|-------|-------|-------------|
| 1 | `cs2-asp-divider` | Case entry + 36% hook |
| 2 | `cs2-asp-challenge` | 94 vs feasibility (trimmed: anchors + question only) |
| 3 | `cs2-asp-strategy` | Two-move stack |
| 4 | `cs2-asp-fda` | Type A decision |
| 5 | `cs2-asp-fit` | Pediatric prior + precision |
| 6 | `cs2-asp-impact` | Precedent + durability |
| 7 | `cs2-asp-bridge` | Sparse close + local-evidence handoff to India (template recap removed) | → CS3 divider |

---

## Case 03 — Ivosidenib / India

**Problem:** 42-country approvals but not India.  
**Constraint:** CDSCO local-trial expectation; SEC PK/PD request Dec 2024.  
**Approach:** Six-pillar convergence dossier (PopPK 253, somatic biology, E-R flat).  
**Outcome:** CDSCO marketing authorization May 2025.  
**Bridge to CS4:** Science as bridge → infrastructure scale (Pharazi).

| Order | Slide | Adds to arc |
|-------|-------|-------------|
| 1 | `cs3-ivosidenib-divider` | Global vs India gap |
| 2 | `cs3-setup` | SEC request vs existing package |
| 3 | `cs3-bg-regulatory` | Rule 101 opening |
| 4 | `cs3-pillars` | Six convergent pillars (text-only cards) |
| 5 | `cs3-reversal` | Timeline to approval |
| 6 | `cs3-reckoning` | What shipped / what did not |
| 7 | `cs3-leadership` | Cross-functional pressure |
| 8 | `cs3-bridge-recap` | Handoff to AI case |

Notes: `cs3-notes.ts` — live-spine spoken scripts trimmed to manifest times; bridges match live order (divider → setup → regulatory → pillars).

---

## Case 04 — AI / Pharazi

**Problem:** Outputs outrun explainability; review confidence is the bottleneck.  
**Constraint:** Audit floor — documentation, accountability, privacy before autonomy.  
**Approach:** Plan → run → check → record; deterministic tools under agent orchestration.  
**Outcome:** Traceable acceleration (dashboard review contract + close).  
**Bridge:** Portfolio breadth → Vir.

| Order | Slide | Adds to arc |
|-------|-------|-------------|
| 1 | `cs2-pharazi-divider` | System case, personal research |
| 2 | `cs2-regulatory-floor` | Review floor (doc / accountability / privacy) |
| 3 | `cs2-gap` | Speed vs lineage |
| 4 | `cs2-working-overview` | Plan · run · check · record |
| 5 | `cs2-poppk-dashboard` | Review contract in one surface |
| 6 | `cs2-publication-close` | Traceable acceleration close |

Notes: `override-notes.ts` for full CS4 live spine (aligned to simplified `AiEvidenceSlide` cards, not pharos deploy demos).

---

## Portfolio + Vir bridge + Close

| Block | Flow |
|-------|------|
| `portfolio-01` | Breadth without fifth case |
| `company-bridge-*` | Public Vir pipeline → oncology measurement → case mapping → HBV/HDV → role fit |
| `closing-thread` → `closing-fit` → `closing-thanks` | Thesis recap → Vir operating model → Q&A |
