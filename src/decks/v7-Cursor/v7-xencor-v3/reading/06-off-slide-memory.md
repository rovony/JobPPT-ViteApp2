# Off-slide memory · Presenter cheat sheet

> **Read time:** ~12 min · **For:** anything trimmed from slides but still fair game in Q&A

The live deck was **de-busied** on purpose. This page holds facts, guardrails, and one-liners that used to be on-screen (or in longer cards) so you do not have to reconstruct them under pressure.

---

## Speaker-notes convention (live spine)

All **49 live slides** now have v7-xencor-v3 overrides in `override-notes.ts`. Read the **Spoken** section aloud — it is full sentences. **Cues** are delivery reminders only (timing, pointing, guardrails). **Off-slide** is Q&A depth not on screen.

---

Every case follows: **divider reset** → **first content slide orients** (drug · program · ask) → then numbers or quotes.

| Case | Divider | First setup slide | What audience must hear before depth |
|------|---------|-------------------|--------------------------------------|
| CS1 | Ambrisentan · pediatric PAH | `cs1-question` | Drug, terminated Phase IIb, exposure-matching ask → then 380 vs 39 |
| CS2 | Asparlas · adult Ph-neg ALL | `cs2-asp-challenge` | Pegaspargase, 2018 pediatric label, 94-adult problem |
| CS3 | Ivosidenib · India | `cs3-setup` | 42+ countries, India gap, global dossier strategy → then SEC quote |
| CS4 | Pharazi · AI workflows | `cs2-regulatory-floor` | Shift from drug dossiers to evidence-system traceability |

---

## Global guardrails (every answer)

- **No Servier-confidential numbers** anywhere in the talk.
- **No claim of direct VIR-5500 / PRO-XTEN internal access** — bridge is public-info + clin pharm logic.
- **ADC** = led/directed multi-analyte + FIH dose-projection strategy (BCLxL @ Servier; BCMA contribution @ GSK) — **breadth only**, not a core case.
- **HBV patent** = co-inventor AU2023213173A1 — real, narrow scope; **not** direct HDV program ownership.
- **Pharazi** = personal research platform — transferable **judgment**, not a product transfer to Xencor.

**One-sentence thesis:** When measurement falls short, clinical pharmacology makes the dose — and the decision — defensible.

---

## Title · compact case cards

On slide 01 the cards show **short** labels only. Full copy if asked:

| Case | Full title line | Footer / outcome |
|------|-----------------|------------------|
| CS01 · Ambrisentan | Exposure-matched dose when the pediatric efficacy trial cannot carry the answer | EMA + PMDA approval (2021) |
| CS02 · Asparlas | Defensible adult design when the endpoint-powered trial is not feasible | FDA Type A agreement · N=60 (−36%) |
| CS03 · Ivosidenib | Local-trial waiver defended through convergent global evidence | CDSCO May 14, 2025 · Phase 4 PK |
| CS04 · Pharazi | Audit-ready clin pharm workflows when the evidence system must scale | Personal research · pharazi.ai |

Meta: Xencor candidate seminar · **June 17, 2026** · ~45 min including Q&A.

---

## CS1 · Pediatric PAH — off-slide

### `cs1-mechanism` (scope guard)
- **Headline** names three pathways — **do not lecture** prostacyclin / NO; backup `cs1-history` owns field timeline.
- **This case:** endothelin-pathway **dose bridge** — ETA selectivity is the pharmacologic premise for matching adult AUC in pediatrics.
- **Point order:** left narrow lumen → + ambrisentan → right open lumen → bottom selectivity card (>4000:1).
- **Land:** "Other PAH pathways are context. This case is the endothelin-pathway dose bridge."

### `cs1-pkpd` (panels removed)
- **On screen:** AUC bridge + Cmax safety only.
- **Off slide:** AUC vs 6MWD and full E-R panels — **supportive**, not load-bearing; pediatric 6MWD is noisy.
- **Cmax:** ~11–18% higher Cmax,ss vs adult (dose-dependent); safety check, not automatic problem.
- **Verbatim:** "No clear exposure-driven gradient in the observed range" — never "flat forever" or "no risk."
- **Backup:** `cs1-B6-6mwd`, Okour 2023 figures.

### `cs1-lesson` (FDA caveat stays on slide)
- FDA **never received** the package — split-rights commercial outcome.
- Letairis label: pediatric safety/effectiveness **not established** — no formal FDA pediatric indication as of 2026.
- Portable architecture: adult efficacy anchor · pediatric PK bridge · totality for submission.

---

## CS2 · Asparlas — off-slide

### Challenge / strategy (density removed from slides)
- Pediatric label **2018**; NSAA surrogate ≥0.1 U/mL already FDA-agreed.
- Original adult design **N=94** — endpoint-powered vs 90% NSAA; mathematically clean, operationally undeliverable.
- **Stack:** (1) optimal design on PK precision under informative pediatric prior N=124 · (2) PopPK-simulated primary for virtual NPAA — **composition** of two precedents.

### `cs2-asp-fda`
- Type A **July 21, 2023** · 94 → **60** evaluable adults (−36%).
- **AE-detection probability ≥85%** briefed in parallel with optimal design.
- Simulated primary **repositioned** to dose confirmation in Cohorts 1–2 — reduction held.

### `cs2-asp-fit`
- N=124 pediatric PopPK prior (FDA-reviewed) · adult VPC no structural failure.
- %RSE plateaus ~50–60 · cohort-ratio + bootstrap pcVPC sensitivity stable.
- Curves may be illustrative — argument shape is what matters.
- **Backup IDs (legacy):** `cs3-B1-optimal-design`, `cs3-B2-simulated-endpoint`.

### `cs2-asp-impact`
- SPARK-ALL closed N=42 later — **portfolio decision**, not design failure.
- Type A methodology is **durable** beyond one program.

---

## CS3 · India ivosidenib — off-slide

### Chronology (`cs3-setup`)
- **Aug 7, 2024** — Rule 101 waiver path (before Dec SEC meeting).
- **Dec 2024** — SEC requested local PK/PD → 12–18 mo delay risk.
- **PopPK N=253**, race NS · PBPK DDI · flat E-R.

### `cs3-pillars` (six pillars compressed)
1. Somatic IDH1 — not germline  
2. PK similarity — N=253  
3. Flat E-R — 500 mg QD  
4. Intrinsic/extrinsic factors characterized  
5. 30+ global regulatory jurisdictions  
6. Phase 4 commitment named upfront  

**Convergence is the case** — no single pillar alone.

### `cs3-reversal` / outcome
- **May 14, 2025** — CDSCO marketing authorization without pre-approval local trial.

### `cs3-reckoning` (honest accounting band trimmed)
**Shipped:** mechanism-first · 36-page six-pillar package · approval · Phase 4.  
**Not pre-approval:** Indian PK/PD · Indian pivotal sites · India-specific PK publication.  
Inference rested on global PopPK — **uncertainty named explicitly**.

### `cs3-leadership`
- Quant pharmacology: extrapolation science + Phase 4 PK scope.
- Regulatory: Rule 101 + agency responses.
- Med / PV / India affiliate: execution + post-marketing.
- **Both had to be true** for waiver.

### Biology quick refs (if asked from trimmed bg slides)
- IDH1 mutant ~6–10% AML · ~13% intrahepatic cholangiocarcinoma.
- 2-HG oncometabolite · ivosidenib lowers 2-HG · differentiation restored.
- Ivosidenib first-in-class **IDH1** inhibitor (2018 AML).

---

## CS4 · Pharazi — off-slide

- Regulatory floor: traceable inputs · deterministic compute · human owner.
- Gap: speed without lineage is the risk — **trusted review** is the bottleneck.
- Pattern: plan → run → check → record.
- Publication close: pharazi.ai · manuscript in prep · clinpharm.ai community.
- **Not** a sponsor deployment or Xencor product transfer claim.

---

## Portfolio · `portfolio-01`

**Stats strip removed** — say if asked:
- **12+ years** clinical pharmacology
- **5+ approvals**
- **6+ agencies**
- **20+ publications**
- Oncology + biologic + antiviral breadth

Table rows are on slide; do not read every cell unless asked.

---

## Xencor bridge · public-info only

### Oncology (masked T-cell engagers)
- Plasma ≠ tumor · assay sees masked/total, not active species at tumor.
- Separate metrics: CRS **peak-driven** (active Cmax) vs efficacy **sustained** (AUC / time above threshold).
- Bell-shaped T-cell PD → **OBD not MTD** (Project Optimus).
- Optimal design / identifiability under sparse sampling — Asparlas parallel.

### HBV / HDV
- HBV combination patent co-inventor · Sotrovimab mAb PK · Dectova preterm-neonate sims.
- HDV: learning posture — combination TPP, biomarker timing, durability, resistance.

### First 90 days
- Listen · map dose decisions / assay gaps / model gaps.
- VIR-5500: backward from filing · defensible OBD package — **conditional on public info**.

---

## Backup slide routing

| Topic | Gateway |
|-------|---------|
| CS1 depth | `cs1-backup-master` |
| Asparlas methods | `cs3-backup-*` (legacy asparlas backups) |
| India reliance | `cs3-backup-master`, `cs3-B2-six-pillar-package` |
| Pharazi depth | `ai-backup-master` |

Return every backup answer to the thesis: **defensible dose under incomplete measurement.**
