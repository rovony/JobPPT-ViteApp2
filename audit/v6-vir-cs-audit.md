# v6-vir · Four case studies audit

**Date:** 2026-06-16  
**Rubrics:** (1) `## Spoken` = deliverable script, not meta briefing · (2) body copy ≥ `--fs-slide-subhead` · (3) one primary idea per slide · (4) problem → constraint → approach → outcome → bridge per case

**Notes merge:** `qp2-seminar-v4/notes` → asparlas map → `cs3-notes.ts` → pharos map → **`override-notes.ts` wins**

---

## Status summary

| Dimension | CS1 | CS2 Asparlas | CS3 India | CS4 AI |
|-----------|-----|--------------|-----------|--------|
| Spoken scripts | ✅ qp2 (+ override bridge) | ✅ override all live | ✅ cs3-notes | ✅ override all live |
| Font pass | 🟡 pkpd + lesson remain | 🟡 strategy/fda/impact meta | 🟡 setup/regulatory/pillars | ✅ AiEvidenceSlide |
| Busyness trim | 🟡 pkpd still dense | ✅ challenge + bridge trimmed | 🟡 setup/pillars/reversal | ✅ simplified cards |
| Story flow | ✅ audited + fixes | ✅ bridge aligned | 🟡 setup chronology cue | ✅ |

**Legend:** ✅ done this pass or prior · 🟡 partial · ❌ not started

---

## CS1 live spine (`cs1-question` → `cs1-bridge`)

| Slide | Notes | Fonts | Busy | Flow |
|-------|-------|-------|------|------|
| `cs1-question` | ✅ qp2 Spoken | ✅ | 3 | Opens dose-defense question → context |
| `cs1-context` | ✅ qp2 | ✅ | 3 | PAH 101 → mechanism |
| `cs1-mechanism` | ✅ qp2 | ✅ | 3 | Selectivity → trial |
| `cs1-trial` | ✅ qp2 | ✅ | 3 | Hold/term/approve → architecture |
| `cs1-architecture` | ✅ qp2 | ✅ | 4 | 5 constraints → covariates |
| `cs1-covariate-strategy` | ✅ qp2 | ✅ | 4 | Anchor/constrain → PopPK |
| `cs1-poppk` | ✅ qp2 | ✅ fixed meta | 4 | 380/39 → pkpd |
| `cs1-pkpd` | ✅ qp2 | 🟡 pageno on chart labels | **5** | AUC/Cmax/ER → outcome |
| `cs1-outcome` | ✅ qp2 | ✅ | 3 | 3 disruptions → bracket |
| `cs1-bracket` | ✅ qp2 | ✅ fixed cite | 4 | 5-step match → lesson |
| `cs1-lesson` | ✅ qp2 | 🟡 FDA header pageno | 4 | Codification → bridge |
| `cs1-bridge` | ✅ override | ✅ | 3 | **Fixed:** Asparlas handoff (was ADC); notes cover principle 03 |

---

## CS2 Asparlas (`cs2-asp-challenge` → `cs2-asp-bridge`)

| Slide | Notes | Fonts | Busy | Flow |
|-------|-------|-------|------|------|
| `cs2-asp-challenge` | ✅ override | 🟡 footer meta | 2 | 94 infeasible → strategy |
| `cs2-asp-strategy` | ✅ override | 🟡 card-meta rails | 4 | Two-move stack → FDA |
| `cs2-asp-fda` | ✅ override | 🟡 card-meta | 5 | Type A N=60 → fit |
| `cs2-asp-fit` | ✅ override | ✅ | 4 | Prior precision → impact |
| `cs2-asp-impact` | ✅ override | 🟡 ledger meta | 4 | −36% → bridge |
| `cs2-asp-bridge` | ✅ override | ✅ | **2** | **Rewritten** sparse close → CS3 |

---

## CS3 India (`cs3-setup` → `cs3-bridge-recap`)

| Slide | Notes | Fonts | Busy | Flow |
|-------|-------|-------|------|------|
| `cs3-setup` | ✅ cs3 | 🟡 timeline pageno | 5 | SEC ask → Rule 101 |
| `cs3-bg-regulatory` | ✅ cs3 | 🟡 flow labels | 4 | Waiver opening → pillars |
| `cs3-pillars` | ✅ cs3 | 🟡 pillar body | 5 | Six pillars → reversal |
| `cs3-reversal` | ✅ cs3 | ✅ | 5 | May 2025 → reckoning |
| `cs3-reckoning` | ✅ cs3 | 🟡 row cites | 3 | Honest gaps → leadership |
| `cs3-leadership` | ✅ cs3 | ✅ | 3 | Cross-functional → recap |
| `cs3-bridge-recap` | ✅ cs3 | ✅ | 2 | → CS4 |

**Flow note:** `cs3-setup` dramatizes Dec 2024 SEC before Aug 2024 Rule 101 — add spoken time-anchor in notes if panel asks.

---

## CS4 AI (`cs2-regulatory-floor` → `cs2-publication-close`)

| Slide | Notes | Fonts | Busy | Flow |
|-------|-------|-------|------|------|
| `cs2-regulatory-floor` | ✅ override | ✅ | 3 | Floor → gap |
| `cs2-gap` | ✅ override | ✅ | 3 | Trace bottleneck → overview |
| `cs2-working-overview` | ✅ override | ✅ | 4 | Plan/run/check/record → dashboard |
| `cs2-poppk-dashboard` | ✅ override | ✅ | 3 | Review contract → close |
| `cs2-publication-close` | ✅ override (**ADC → CS1**) | ✅ | 3 | → portfolio |

---

## Remaining backlog (priority order)

1. **`cs1-pkpd`** — font tokens on chart-readable text; consider live trim to 2 panels (AUC + Cmax only).
2. **`cs2-asp-strategy` / `cs2-asp-fda` / `cs2-asp-impact`** — bump `card-meta` narrative rails to `--fs-slide-tagline`.
3. **`cs3-setup` / `cs3-bg-regulatory` / `cs3-pillars` / `cs3-reversal`** — font pass + busyness trim (6 pillars → 4 on live, or 2×3 larger type).
4. **`cs1-lesson`** — FDA caveat label `pageno` → `eyebrow`.
5. **`cs3-setup` notes** — one clause: “Rule 101 had already opened the door before the SEC PK/PD ask.”

---

## Verification

- `npm run build`
- QC folder: `audit/v6-vir-qc/` (intro + CS1 partial captures)
