# v6-vir Font Audit

**Date:** 2026-06-16  
**Standard:** Narrative/body copy ≥ `--fs-slide-subhead` (~14pt effective at 1366×768). `--fs-slide-eyebrow` / `--fs-slide-pageno` / `--fs-card-meta` reserved for labels, kickers, citations, chart axes.

## Fixes applied (live-flow slides)

| Slide id | File | Change |
|----------|------|--------|
| `cs1-question` | `slides/06-cs1-question.tsx` | Single-column layout; dossier body already on `--fs-slide-subhead` |
| `cs1-context` | `slides/07-cs1-context.tsx` | Reduced to 2 dossier facts + endothelin bridge (PAH 101 trim) |
| `cs1-mechanism` | `slides/07b-cs1-mechanism.tsx` | Dropped pathway band; selectivity card only |
| `cs1-trial` | `slides/08-cs1-trial.tsx` | Single-lane pediatric arc (5 milestones); removed adult swimlane + legend |
| `cs1-architecture` | `slides/09-cs1-architecture.tsx` | Section labels `kicker` → `eyebrow` (3 instances) |
| `cs1-poppk` | `slides/09b-cs1-poppk.tsx` | Replaced covariate chip ribbon with one-line 380/39 summary |
| `cs1-bracket` | `slides/12-cs1-bracket.tsx` | Receipt step labels `pageno` → `eyebrow` |
| `career-arc` | `slides/03-career-arc.tsx` | Stop bullets `eyebrow` → `subhead`; footer impact/tools row removed |
| `roadmap` | `slides/04-roadmap.tsx` | Case note text via `CaseCard` `kicker` → `subhead`; conclusion ribbon simplified |
| `title` | `slides/01-title.tsx` | Meta spec + PK baseline labels `pageno` → `eyebrow` |
| `hook-A-trial-not-answer` | `slides/02-hook-A-trial-not-answer.tsx` | No structural change; mark chips intentional at `kicker` |

## Intentional small type (no change)

| Token | Use | Slides |
|-------|-----|--------|
| `--fs-slide-pageno` | Footer kickers, step indices, chart axis tags, source lines | Most CS1–CS4 slides, closings |
| `--fs-slide-eyebrow` | Mono uppercase labels | Dossier rows, constraint cards, eyebrows |
| `--fs-card-meta` | Citation / source footnotes | `12-cs1-bracket.tsx` receipt sources |
| `--fs-slide-kicker` | Decorative card headers only | `01-title.tsx`, hook marks, backup slides |

## Flagged for backup-only (acceptable)

- `cs1-backup-*`, `cs1-B*` — dense reference slides; small meta type is intentional.
- `09b-cs1-poppk.tsx` — parameter table headers use `pageno`; table values use `tagline`.

## Remaining watch list (no live-flow change this pass)

| Slide id | Issue | Recommendation |
|----------|-------|----------------|
| `10-cs1-results` | Legend uses `kicker` | Backup/hidden from live flow per CS1-Reduction-Plan |
| `09b-cs1-poppk` | Table header row at `pageno` | Point to backup if challenged; values readable at `tagline` |
| `02-hook-B-eighteen-months` | Mark card sublabels at `kicker` | Acceptable as label chrome |

## Verification

- Intro (`title`, `hook-A-trial-not-answer`, `career-arc`, `roadmap`) captured at 1920×1080 and 1366×768 → `audit/v6-vir-qc/<id>/after-*.png`
- `cs1-question` captured at 1920×1080 and 1366×768 → `audit/v6-vir-qc/cs1-question/after-*.png`
- `cs1-context`, `cs1-mechanism`, `cs1-trial` captured at 1920×1080 (and context at 1366×768) → `audit/v6-vir-qc/cs1-*/after-*.png`
- Presenter notes: `## Spoken` beats render numbered in presenter view (`StructuredNotesView`)
