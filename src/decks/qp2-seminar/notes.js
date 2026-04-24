/**
 * QP2 Seminar — static speaker notes per slide.
 *
 * Keys MUST match `slides[].id` in `./manifest.js`.
 * Values are markdown strings; PresenterNotesPane supports:
 *   • **bold** · *italic* · ==highlight== (uses --case color)
 *   • # H1 · ## H2 · ### H3
 *   • - bullets · 1. ordered · > blockquote
 *
 * These are the canonical, version-controlled notes. Live edits in
 * presenter mode autosave through `useSpeakerNotes` and override these
 * values per-session — but ship-of-truth lives here.
 *
 * Empty string = "no static note authored yet"; presenter pane shows
 * its placeholder and the live editor still works.
 */

const notes = {
  // Slide 01 — Title
  title: `## Title · Quantitative Pharmacology in Action

==Headline:== a 25-second warm open. The seminar starts on slide 02, not here.

### Delivery beat

> *"Hi everyone — and thank you for the chance to present today. Over the next forty-five minutes I want to show you quantitative pharmacology doing what it does best: turning complexity into confident decisions — across therapeutic areas, across regulatory agencies, and across patient populations that have historically been left behind."*

### What to land

- **Who** — Director of Clinical Pharmacology · Servier · sits at modeling × regulatory strategy × applied AI
- **What** — three case studies: pediatric PAH · adult oncology in India · adult ALL
- **Why** — model-informed decisions that change ==what gets approved, and for whom==

### Tone

Warm. Brief. Don't dwell — slide 02 is where stakes get set.

> *"So let me start with a sentence that sat on a drug label for nineteen years."*

### Do NOT

Read the seminar subtitle aloud · linger past 30s · preview slide 2.`,

  // Slide 02 — The hook · the asymmetry
  hook: `## Hook · the label that sat for 19 years

==Headline:== one sentence on a drug label for nineteen years. Two regulators ended that — on a single PopPK model.

### Cold-open delivery (Variant A · pinned)

> *Stand still for 3 full seconds before the first word.*
>
> *"A seven-year-old girl with pulmonary arterial hypertension. No approved pediatric dose. The label says 'safety and efficacy not established in pediatric patients.' Regulators waiting for an answer — and the only path forward is a model."*
>
> *[Pause 2 seconds. Look across the panel.]*
>
> *"That's not a hypothetical. That's the case I led."*

### The reveal — one PopPK · two regulators

- **EMA · September 2021** + **PMDA · April 2021** — same integrated model-based package, ages 8–17, weight-banded 2.5–10 mg QD
- ==Twenty-seven EU member states + Japan== — roughly 500 M patients now under a single model-based pediatric label
- Two of the world's most rigorous regulators · different continents · different frameworks · ==same dose from the same evidence==

### The thesis line (deliver to the panel, not the slide)

> *"That's why quantitative pharmacology is a strategic engine for drug development — not a support function."*

### If probed *"what about FDA?"* (BACK-POCKET — do not volunteer)

The pediatric trial, dataset, and PopPK were all run by GSK (ex-US rights). Gilead held US rights for Letairis; by the time the pediatric package was mature, ==generic ambrisentan had launched in the US in March 2019==. The commercial incentive to file a US sNDA was gone. Same logic for Health Canada. ==Neither agency rejected the science; neither received a submission.==

One sentence. Calm. Stop.`,

  // Slide 03 — Career arc · Jordan → Servier
  'career-arc': `## Career arc · Jordan → Minnesota → Merck → GSK → Servier

==Headline:== twelve years, one through-line: ==what dose, for whom, and why?==

### The five stops (gesture across the timeline · don't read every line)

1. **Jordan** — dental surgery training; clinical license. *"A dose is an answer to a person, not just a number."*
2. **Minnesota · PhD with Dr. Richard Brundage** — enterohepatic circulation modeling · ECP Fellowship · 3 research awards. The craft layer: PopPK, exposure–response, model-informed dosing.
3. **Merck · Summer 2014 · QP2 intern** — nonlinear mixed-effects simulation under uncertainty. ==First time seeing pharmacometrics inside a development pipeline that actually ships drugs.== *Let "QP2" land on its own — no editorial.*
4. **GSK · Oct 2015 → 2022 (7 years)** — Clinical Pharmacology Modeling & Simulation across **5 therapeutic areas** (respiratory, anti-infectives, HIV, PAH, metabolic) and 5 named programs (ambrisentan, Trelegy, Dectova, DGAT1, antimalarial microdose). ==4 approvals across 5 agencies.== Top-10% GSK Award 2019. Hep-B combination patent pending in 5 jurisdictions.
5. **Servier · 2022 → present · Director of Clin Pharm** — leading the oncology portfolio (solid + heme): Tibsovo · Onivyde · Asparlas · Oncaspar. ==3 approvals during tenure== — Onivyde · Oncaspar · Tibsovo global LCM.

### Independent innovation (the green track)

- **PharmAgent** — 13-agent AI system · 151 tools · end-to-end pharmacometrics
- **DeepPK** — hybrid neural-ODE + classical compartmental
- **DosePredict** — published in JCP 2020

### Closing line (deliver to the panel)

> *"Twelve years · 15+ programs · 8 submissions · 6 agencies · 20+ publications · 3 invited international talks. And one question followed me through all of it: ==what dose, for whom, and why?== Let me show you three times that question changed an outcome."*`,

  // Slide 04 — Framework · five recurring themes
  'framework-themes': `## Framework · five themes for a five-year posture

==Headline:== the model is the instrument. ==The decision is the product.==

### The thesis (slow it down — "decision" carries the seminar)

> *"Quantitative pharmacology is most impactful when it's framed around the **decision** it enables."*

### The five themes (sweep, don't recite — flag them as they appear)

1. **⇌ QP REPLACES STUDY** — model-based evidence stands in for an empirical trial
2. **◎ DOSE PRECISION** — exposure matching · pediatric extrapolation · precision dosing
3. **⊕ GLOBAL STRATEGY** — multi-agency convergence (and divergence)
4. **◇ NOVEL METHODS** — methodological innovation · first-in-class approach
5. **⚖ JUDGMENT** — scientific judgment with incomplete data

### How to deliver the sweep (~10 seconds total)

> *"Replaces study… dose precision… global strategy… novel methods… and judgment, with incomplete data, when judgment is the only thing that moves a program forward."*

### The transition

> *"Three cases ahead — and each one will close with a quick look back at which of these themes showed up."*

### Do NOT

Read each card descriptor · belabor the framework · land any one theme too hard. The framework only earns its weight when CS1, CS2, CS3 light up the chips later.`,

  // ── Case Study 01 · Ambrisentan ─────────────────────────

  // Slide 05 — CS1 divider
  'case-divider': `## CS1 divider · Ambrisentan · pediatric PAH

==Headline:== ~15 seconds. A visual breath, not a beat.

### Delivery (after a 2-second silent pause)

> *"Case one. Ambrisentan — in pediatric pulmonary arterial hypertension. The adult evidence was solid. The children had no dose."*

### Cinematic continuity

This slide hosts the **hero variant** of \`LungsShared\` (\`layoutId="lungs-anchor"\`). On advancing to slide 06 (background), the lung morphs into the inter-card focal element — the deck's first cross-slide shared-element transition. Don't reference it; just let it happen.

### Do NOT

- Read the eyebrow ("Case Study 1 of 3") aloud
- Read the corner marker
- Add commentary or preview — that's slide 06's job
- Dwell longer than 20 seconds total`,

  // Slide 06b — CS1 background · the disease and the drug
  'case-background': `## CS1 background · the disease and the drug

==Headline:== rare disease · adult-only label · the gap that defined the project.

### THE DISEASE — pulmonary arterial hypertension

- Progressive vascular disease · elevated PA pressure → right ventricular failure
- ==Untreated median survival under 3 years== (Galiè 2013)
- Adult prevalence 15–50 per million · pediatric 2–16 per million
- Pediatric etiologies differ from adults: idiopathic · heritable · congenital heart disease

### THE DRUG · THE GAP — ambrisentan

- Selective ETA receptor antagonist · approved adults at **5 mg / 10 mg QD**
- Pediatric label since 2007: ==*"Safety and efficacy not established."*==
- Ivy 2024 (EJP) — open-label extension · 3.5-yr median follow-up · 100% improved or unchanged WHO functional class · no new safety signals

### Why this background slide exists separately

Slide 11 (challenge) carries the *constraint* — sparse PK, n=39 pediatric subjects. This slide carries the *clinical and pharmacological setup* — disease severity + adult drug profile + the unfilled gap. Splitting them lets the panel internalize ==why the question was unavoidable== before they see the data shortage that made conventional trials infeasible.

### Cinematic continuity

The lung silhouette ((\`layoutId="lungs-anchor"\`) morphs in from the slide-05 hero variant into the inter-card focal here, then dims further on slide 11. Same pattern as the India map (14→15) and the informative prior (23→27).

### Source line

EMA SmPC · FDA Letairis label · Galiè 2013 · Ivy 2024.`,

  // Slide 11 — CS1 challenge
  'case-challenge': `## CS1 challenge · pediatric PAH demanded a dose · no viable trial path

==Headline:== the only pediatric PK dataset was AMB112529 — ==N = 39 (of 41 randomized) · sparse sampling · 5 obs per patient==.

### The constraint (the bottom card on screen)

- **Study AMB112529** · NCT01332331 · Phase 2b
- N = 39 evaluable pediatric subjects · ages 8–16 (protocol 8 to <18)
- Sparse PK sampling · ~5–6 samples per patient over 24 weeks
- ==~3% BLQ== · Beal M3 method handled censoring during fitting

### Why a dedicated trial wasn't viable

> *"A dedicated pediatric dose-finding trial means years of enrollment, tens of millions of dollars — and honestly, it's often not feasible in a rare pediatric disease where you can barely fill a trial to begin with."*

### The strategic pivot (the slide's payoff line)

> *"So the question wasn't 'how do we run a bigger trial.' The question was: ==could an integrated adult + pediatric population PK model provide regulatory-grade evidence for a pediatric dose?=="*

### If probed *"why not extrapolate from bosentan?"*

Bosentan (Tracleer) received pediatric PAH approval Sep 2017 for ages 3+. Different ERA · different selectivity (dual A/B vs ambrisentan's selective A). The macitentan precedent travels later — but for the 2019–2021 ambrisentan submission, a drug-specific pediatric package was the credible path. ==Cross-drug extrapolation in PAH wasn't yet codified== (now formalized in EMA CHMP/60723/2026).

### Source

AMB112529 · NCT01332331 · GSK Phase 2b ambrisentan pediatric PAH.`,

  // Slide 11b — CS1 strategy · three decisions
  'case-strategy': `## CS1 strategy · three decisions · each one a regulatory defense

==Headline:== integrate. Constrain. Stay parsimonious. Each choice is a regulatory defense before it's a statistical one.

### DECISION 01 · INTEGRATE — adult + pediatric in one model

- **Why** — N=39 pediatric · sparse sampling. A standalone pediatric model gives unstable estimates and unreliable predictions.
- **Mechanic** — adult dataset (N=380 · 7 studies · 3,126 obs) provides the structural anchor; pediatric data refines covariate effects.
- **Pre-empts** — *"Why not pediatric-only?"* → answered before asked.

### DECISION 02 · CONSTRAIN — fix allometric exponents

- Body-weight scaling per **Anderson–Holford** (Annu Rev Pharmacol Toxicol 2008): CL on weight^0.75 · volumes on weight^1.0 · 70-kg reference
- ==Biology-driven, not data-driven== · estimating exponents on N=39 didn't improve fit
- **Now explicit in ICH E11A** (adopted Jan 2025) as the default for pediatric extrapolation

### DECISION 03 · STAY PARSIMONIOUS — body weight only retained

- ==12 covariates pre-specified== — hepatic (5: bilirubin, ALT, AST, ALP, GGT) · renal (1: CrCl) · demographic (4: age, sex, race, ethnicity) · dosing (2: dose group on CL/F, dose on tlag)
- **Full-model approach + backward deletion at p < 0.001** (ΔOFV > 10.83)
- Threshold chosen to ==control type-I-error inflation and winner's-curse effects== on a 39-patient dataset
- ==None retained==

### The 12 vs 7 covariate count (defensive)

Main paper text lists 7 entered into the final full-model on CL/F. **Data S1** (methods supplement) lists the full pre-specified set of **12** including ALT/AST/GGT and ethnicity. Both are correct — they describe different layers. Cite Data S1 if a panelist counts.

### Closing line

> *"Each of these isn't just a statistical choice — each one is a regulatory defense built into the model from the start."*`,

  // Slide 11c — CS1 build · sequential workflow
  'case-build': `## CS1 build · sequential workflow · 6 steps · not one shot

==Headline:== a sequential build, not a one-shot fit. ==Step 2 is the rigor beat.==

### Datasets (the left column)

- **Adult foundation** · N = 380 across 7 studies · ==3,126 observations== · rich PK · AMBITION + 6 others pooled · statistical anchor for structural parameters
- **Pediatric** · AMB112529 · ==N = 39 · 211 observations== · sparse · ages 8–16
- **BLQ** · ~3% of post-dose obs · Beal M3 method (likelihood-based censored handling)

### Model structure

- **2-compartment** · 1st-order absorption · absorption lag time
- **Allometry FIXED** · WT^0.75 (CL, Q) · WT^1.0 (Vc, Vp) · 70-kg ref
- **t<sub>lag</sub> FIXED** at 0.525 hr (pediatric sparse sampling cannot identify it)
- **Estimation** · IMPMAP in NONMEM 7.4.1 · BLOCK(6) OMEGA · 1,000 IS samples
- **Engine footer note** — slide says "IMPMAP" (matches submitted NONMEM code: \`$EST METHOD=IMPMAP INTER EONLY=0 NITER=1000 ISAMPLE=1000\`); main paper text uses the looser label "IS-EM"

### The 6 sequential steps (the right column)

1. **Build adult PopPK** on the full adult evidence base (N=380 · 7 studies)
2. ==**pcVPC adult-model → pediatric data** *before* fitting pediatric== — *"if the adult model couldn't describe pediatric data, we'd know before we started fitting"*
3. Fit pediatric-specific model · inherit adult structure · let pediatric data speak to parameters
4. Compare steady-state exposure · pediatric vs adult · weight-based doses
5. Evaluate exposure–response · efficacy (Δ6MWD) + safety (AE incidence)
6. Package the integrated evidence as a unified regulatory submission

### Vp/F sensitivity pre-empt (the deepest defense)

==Tested at Vp/F = 8.51 L (adult) → 81.3 L (pediatric estimate) → 180 L (extreme)== across 5 body weights. AUC and Cmax unchanged. The apparent ~10× pediatric Vp/F is a **sparse-sampling artifact**, not an exposure driver. (Full Vp/F puzzle defense lives in slide 11d notes.)

### Closing line

> *"Each step set up the next. A sequential build, not a one-shot analysis. Let me show you what the model actually found."*`,

  // Slide 09 — Model Fit · pcVPC
  // Q&A defenses surface here when probed (covariates, shrinkage).
  'case-fit-pcvpc': `## Model fit · pcVPC

==Headline:== observed median tracks predicted median across all five time bins → no systematic bias, no drift.

### If probed on the parameter table

- **Vp/F shrinkage 86%** — exactly why the sensitivity test exists. Vp/F was perturbed across 8.51 → 81.3 → 180 L (≈22× range) at five body weights; AUC and Cmax are unchanged. Shrinkage flags low individual identifiability of the peripheral volume, *not* a structural model problem. Population-level inference (which is what we use for exposure bridging) is unaffected.
- **t<sub>lag</sub> FIXED at 0.525 hr** — fixed to the adult value because pediatric sparse sampling cannot identify it. The 95% CI shown reflects η variability around the fixed typical value.
- **Allometry FIXED** at 0.75 (CL, Q) / 1.0 (V<sub>c</sub>, V<sub>p</sub>) — standard practice; pediatric data alone cannot estimate exponents reliably with n=39.

### If probed on the covariate count

- **12 vs 7 disconnect:** the main paper text lists 7 covariates entered into the final full-model on CL/F. Data S1 (the methods supplement) lists the **full pre-specified set of 12** including ALT, AST, GGT, and ethnicity. ALT/AST/GGT were pre-specified alongside ALP as a hepatic panel; ethnicity was tested separately from race. ==None retained== at p<0.001 (ΔOFV>10.83). Both are correct — they describe different layers of the analysis.

### Source

Okour et al., JCP 2023 (Fig 2B, Table 2) + Data S1 NONMEM code. pcVPC built on 500 simulation replicates · 39 patients · 211 observations.`,

  // Slide 10 — Exposure Match · AUC + Cmax
  // #V6.10.1 — second 35-<50 kg quirk lives here, not on the slide.
  'case-exposure-match': `## Exposure match · AUC + Cmax

==Headline:== pediatric AUC<sub>ss</sub> matched adults within **3%** at weight-based doses; every pediatric value sits inside the adult distribution.

### The on-slide subgroup defense (low-dose 35–<50 kg)

- Weight band: ==35–<50 kg, n = 8== (low dose)
- Finding: AUC<sub>ss</sub> **29% higher** than adult geometric mean
- Defense: still inside adult envelope · flat exposure-AE relationship → ==not clinically meaningful==

### #V6.10.1 — the second 35–<50 kg wrinkle (NOT on the slide)

> The paper (p. 598) reports a **second** subgroup quirk in the same weight band:
> high-dose 35–<50 kg had ==33% higher C<sub>max,ss</sub>== vs the adult 10-mg dose.

If a pharmacometrician panelist asks *"the paper mentioned the 35–<50 kg band also had a 33% Cmax bump in the high dose — did that concern you?"*:

- **Same mechanistic story** as the 29% AUC quirk: faster pediatric K<sub>a</sub> + weight-bin dosing arithmetic. Children at the lower edge of a band get the same absolute dose as those at the upper edge, so mg/kg trends higher.
- **Within the adult envelope** — both pediatric subgroup means sit inside the adult 5–95% range.
- **Flat exposure-safety relationship** — same defense as the 29%: no association between predicted AUC<sub>ss</sub> and ambrisentan-related AEs (paper p. 598, "no obvious association").
- **AUC is the bridging metric** under ICH E11A; Cmax matters less when safety is flat. The 18% high-dose Cmax delta on the right panel already signals this trend at the group level — the 33% subgroup figure is the same phenomenon at finer resolution.

Bottom line: ==covered by the same subgroup defense.==

### If probed on "20–77 kg" body-weight range

The Figure 3 x-axis shows pediatric data points extending to ~77–80 kg. Table S4 demographics aren't reproduced in the main text. Safer fallback phrasing: *"across the observed body-weight range in the pediatric cohort"* or *"20–80 kg"* rounded.

### If probed on ICH E11A vs E11(R1)

- **E11A** (adopted Jan 2025) is the specific guideline on **pediatric extrapolation** — the exact methodology used here (exposure match + conserved mechanism → extrapolated efficacy).
- E11(R1) (2017) is the broader pediatric clinical development framework.
- Powerful narrative: ==the 2021 analysis pre-figured what ICH E11A formalized in 2025== — four years before ICH codified pediatric extrapolation, this analysis delivered the evidence model.

### Source

Okour et al. JCP 2023 (Table S5) · ICH E11A.`,

  // Slide 11f — CS1 exposure–response · no signal IS the signal
  'case-exposure-response': `## CS1 exposure–response · no signal IS the signal

==Headline:== within the approved exposure range, more exposure doesn't buy more efficacy — and doesn't buy more toxicity. ==The flat line is the regulatory argument.==

### EFFICACY · AUC<sub>ss</sub> vs Δ6MWD at 24 weeks

- Pediatric and adult panels · 4 dose groups color-coded
- ==No systematic trend== in either population
- Individual-patient variability in walk-distance response is larger than any exposure-driven effect within the approved dose range

### SAFETY · AUC<sub>ss</sub> + C<sub>max,ss</sub> vs AE incidence

- Two panels · stratified by ambrisentan-related AE (n=15 with · n=18 without)
- ==Distributions overlap== — medians 7.8 vs 6.9 (AUC) · 700 vs 710 (Cmax)
- Patients with and without AEs were exposed to essentially the same range on both metrics

### The pediatric E–R profile matched adult

The two pivotal observations:

1. **No exposure–efficacy relationship** on Δ6MWD
2. **No exposure–safety relationship** on AE incidence

==The absence of divergence supports extrapolation of adult efficacy and safety to children== — that's the ICH E11(R1) / E11A logic at work.

### The thesis line (delivered slowly)

> *"Within the approved exposure range, more exposure doesn't buy more efficacy. And it doesn't buy more toxicity. **That absence of divergence — pediatric E–R matching adult E–R — is what supports extrapolation.**"*

### If probed *"isn't a flat E–R just an underpowered analysis?"*

N=39 with 211 observations across 4 weight-band dose levels gives reasonable power within the approved range. The flat E–R isn't an absence of measurement — it's the mechanistic finding that ==ambrisentan operates on a saturated dose–response plateau== at the approved doses, which is consistent with the wide therapeutic margin observed in adults. If the relationship had a slope, we'd see it in the cluster of patients at the upper exposure tail vs the lower — and we don't.

### Source

Okour et al., JCP 2023 (Figure 4 efficacy · Figure 5 safety).`,

  // Slide 13 — CS1 impact · two regulators · numerals
  'case-impact-numerals': `## CS1 impact · ×2 regulators · 3% match · 39 patients carried the label

==Headline:== same data · same model · two independent regulators approved. ==The model was the evidence the agencies accepted.==

### ×2 · EMA + PMDA — same PopPK-driven label

- **EMA · September 2021** + **PMDA · April 2021 (5 months earlier)** — same integrated model-based pediatric package
- Ages 8–17 · weight-banded **2.5 / 5 / 7.5 / 10 mg QD** · 3 weight tiers (≥50 kg → 10 mg · 35–<50 kg → 7.5 mg · 20–<35 kg → 5 mg)
- ==27 EU member states + Japan · ~500 M patients under one model-based pediatric label==

### ~3% — weight-band dosing within 3% of adult exposure

- AUC<sub>ss</sub> low dose · pediatric 4.82 vs adult 4.98 → **3% lower**
- AUC<sub>ss</sub> high dose · pediatric 9.15 vs adult 9.12 → **essentially identical**
- All within the ICH bioequivalence-style 80–125% window
- **Source** · Okour 2023 Table 1 + Table S5

### 39 — thirty-nine pediatric subjects carried the label

- ==No new pediatric efficacy trial required== — the model was the evidence
- **Validated 2024** · Ivy et al., Eur J Pediatr · 3.5-yr median follow-up · ==100% improved or unchanged WHO functional class== · no new safety signals
- Durability: ==the model-based dose is doing what the model predicted it would do==

### Authorship guardrail (one honest note)

The Bayesian extrapolation analysis cited by the **French HAS opinion** was a separate supporting component — I contributed but was not primary author. ==The PopPK work — frequentist NONMEM 7.4.1 with importance-sampling EM — is my published work as lead author of Okour et al., JCP 2023.== Both EMA and HAS cited both analyses.

### If probed *"why no FDA submission?"* (BACK-POCKET)

The pediatric trial, dataset, and PopPK were all run by GSK (ex-US rights). Gilead held US rights for Letairis; ==generic ambrisentan launched in the US in March 2019==. Commercial incentive to file a US sNDA was gone. Same logic for Health Canada. Neither agency rejected the science; neither received a submission. *One sentence. Calm. Stop.*

### Themes lit

01 ⇌ QP replaces study · 02 ◎ Dose precision · 03 ⊕ Global strategy.`,

  // Slide 14 (CS1 bridge) — methodology travels
  'case-bridge': `## CS1 bridge · the methodology travels

==Headline:== the value isn't one dose — it's a ==reusable template for pediatric extrapolation==.

### THE TEMPLATE — 5 steps that generalize

1. Build the adult PopPK on the full adult evidence base
2. **pcVPC adult model → pediatric data BEFORE fitting**
3. Fit pediatric-specific model with allometric scaling fixed
4. Compare exposure **distributions** — not just means
5. Anchor the regulatory narrative in **exposure-matching**, not a separate efficacy study

### WHERE IT APPLIES — Merck pipeline

==**Sotatercept (WINREVAIR)** faces a structurally similar question:== pediatric PAH extrapolation.

- **PIP** agreed with EMA · reference **P/0414/2022**
- **MOONBEAM** pediatric PK study · **NCT05587712** · underway
- Biologic vs small molecule shifts the PK math (TMDD, immunogenicity, allometry conventions) — but the regulatory logic (exposure matching, cross-agency narrative, E-R defensibility) is ==the same framework==

### Currency notes (for completeness)

- **ICH E11A** finalized Aug 2024 · FDA-adopted Dec 2024 · effective Jan 2025
- **Ivy 2024 (EJP)** — long-term OLE confirms durability
- **CADENCE @ ACC 2026** — 0.3 mg/kg outperformed 0.7 on PVR (dose-response nuance worth knowing)
- **Tracleer (bosentan)** — pediatric approval Sep 5, 2017 · ages 3+

### The value-proposition line (delivered to the panel)

> *"The value isn't one dose. It's a reusable template for pediatric extrapolation."*

### Regulatory coda — March 2026

> **EMA CHMP draft pediatric PAH addendum · CHMP/60723/2026** formalizes model-informed extrapolation with exposure matching + PK/PD as the accepted basis for pediatric PAH dose selection. ==The 2023 ambrisentan approach maps onto that framework — five years before it was codified.==

**Authorship guardrail:** the addendum *describes* the methodology — it does **not** cite specific papers by author. Honest claim: *"maps onto"* — NOT "influenced," "shaped," or "contributed to." Citation, consultation, and influence are three different things.

### Themes recap (15s · brisk · gesture across the chips)

- **⇌ QP REPLACES STUDY** — model substituted for a pediatric efficacy trial
- **◎ DOSE PRECISION** — exposure matching enabled defensible weight-based dosing
- **⊕ GLOBAL STRATEGY** — EMA + PMDA on the same package · 27 EU + Japan
- **⚖ JUDGMENT** — parsimony decisions on allometry + 12 covariates required judgment with limited data

### Transition

> *"Now — a different kind of regulatory challenge. Different geography. Different innovation."*`,

  // ── Case Study 02 · Tibsovo · India ─────────────────────
  //
  // 8-slide redesign per cs2-design.md:
  //   1 case2-divider          (T5 origins · bone marrow + India seeds in margin)
  //   2 case2-background       (T5 destination · world map · India empty · cards)
  //   3 case2-challenge-turn   (T6+T7 origins · Dec 10 SEC quote · reframe)
  //   4 case2-strategy         (T6 midpoint · 6 pillars equal weight)
  //   5 case2-pillar6          (T6 climax 1 · ICH E5(R1) Appendix D · 9 of 9)
  //   6 case2-pillars-1-5      (T6 climax 2 · convergence · 84.6% ≈ 84.4%)
  //   7 case2-response         (regulatory timeline · 27 Mar in-person SEC)
  //   8 case2-impact-bridge    (T7+T8 destinations · approval · launch · → CS3)

  // Slide 1 (15 deck-wide) — CS2 divider · cinematic seeds
  'case2-divider': `## CS2 divider · Tibsovo · India

==Headline:== ~15 seconds. Brief act-break. Don't dwell.

### Delivery (after a 2-second silent pause)

> *"Case two. Ivosidenib in India."*

### Cinematic continuity (T5 origin)

The right margin carries **two tiny seeds** in thin cyan stroke:
- Bone marrow icon (\`layoutId="bone-marrow-cs2"\`) — grows on slide 16 into a centered anatomical anchor.
- India outline (\`layoutId="india-cdsco"\`) — grows on slide 16 as the empty coral outline inside the world map. Same outline FILLS coral on slide 22 (T8 destination).

These two shapes register without meaning anything yet — but the panel will see them again, full size, in 12 seconds.

### The setup (don't say this — let the slide do it)

- IDH1-mutant AML + cholangiocarcinoma · 42+ countries already approved · India was the holdout
- The regulatory ask: ==pre-approval local clinical data== — efficacy + safety + PK in Indian patients

### Do NOT

- Read the eyebrow ("Case Study 2 of 3")
- Preview the six pillars
- Preview the SEC objection — let slide 17 carry the turn

### Pace

Brief pause · tagline · advance. Total ≤ 20 seconds.`,

  // Slide 2 (16 deck-wide) — CS2 background · 42 countries · India empty
  'case2-background': `## CS2 background · 42 countries approved · India still empty

==Headline:== the global picture by early 2025. The bone marrow seed (slide 15) has grown to anchor the molecular story; the India seed has grown to anchor the geographic gap. ==Drug card + disease card on the right; world map backdrop with 42 dots beneath.==

### Cinematic continuity (T5 destination)

- \`bone-marrow-cs2\` lands centered-left as a stylized cross-section. Cue: *"the drug target lives **inside the tumor**."*
- \`india-cdsco\` is rendered inside the world map as an **empty coral outline** — every other approved country is a coral dot. India is the only outline. ==This is the visual setup for T8 (slide 22 fills it).==

### The drug (read the right-hand cards lightly)

- **Ivosidenib · 500 mg QD** — selective IDH1 R132 inhibitor
- FDA 2018 (R/R AML) → 2021 (CCA) → 2022 (ND-AML + azacitidine) · EMA May 2023
- 2-HG plateau at 500 mg · ==flat PD curve==

### The diseases

- **IDH1-mutant AML** — ~6–20% of AML cases (cohort-dependent)
- **IDH1-mutant intrahepatic cholangiocarcinoma** — ~15–20%
- Rare oncology · single-digit-month median survival
- **1,281 trial subjects** · 8 yr follow-up · zero new safety signals

### The numbers to land

- ==42 countries approved==
- ==15,867 patients of recorded global exposure== (TIBSOVO USPI cumulative exposure)
- ==India still required pre-approval local data==

### The pivot line (deliver to the panel)

> *"Forty-two countries had said yes. Indian patients had not yet been able to access this drug. The question wasn't whether the drug worked — it was whether the existing science was complete enough for India **without a duplicative local study**."*

### Pace

~45 seconds. Let the bone marrow + India empty outline do the visual work. Don't rush past the 42 / 15,867 / 0-Indian-PK numerals — they're the setup for the SEC objection on the next slide.`,

  // Slide 3 (17 deck-wide) — CS2 the turn · 10 December 2024 SEC
  'case2-challenge-turn': `## CS2 the turn · 10 December 2024 SEC objection

==Headline:== this is the hinge. Twelve months of regulatory work converged on a single Subject Expert Committee meeting. ==The SEC's verbatim recommendation: "Conduct a PK/PD study in Indian patients."==

### Cinematic continuity (T6 + T7 origins)

- The amber **SEC objection card** (\`layoutId="cs2-sec-objection"\`) dominates the top half. It will RETURN on slide 22 in **resolved** state — slate-grey, struck-through.
- At the bottom, the **6-pillar architecture** appears for the first time as tiny unlabeled tiles (\`PillarArchitecture stage="seed"\`). It will grow to full size on slide 18, then differentiate across slides 19 and 20.

### Setup the SEC moment

> *"On 10 December 2024, the CDSCO's Subject Expert Committee for Oncology met. Three months earlier we'd filed an MAA with a complete global data package. Six months earlier, the FDA had issued the third Tibsovo approval. The committee returned a verbatim recommendation: \`conduct a PK/PD study in Indian patients\`."*

### The strategic split (the panel needs to feel the choice)

**Option A — defend** (struck through on the slide)
- Try to mount more subgroup evidence. AGILE Asian-subgroup PK was N=8. There were no more retrospective patients to harvest.
- Even if more subgroup numbers appeared, the SEC had **already seen the underlying frame**. Defending the same frame would likely fail the same way.

**Option B — reframe** (the chosen path)
- Move the question upstream: the drug target is **somatic**. IDH1 R132 doesn't exist at birth.
- Inherited variation can't modulate engagement with a tumor-acquired enzyme.
- Anchor in **ICH E5(R1) Appendix D** — a 9-criterion compound-property checklist for ethnic insensitivity.
- Build a **six-pillar package** anchored in mechanism, not subgroup statistics.

### The line to deliver (slowly, after the silence)

> *"We didn't try to give the SEC more of what they were asking for. ==We changed what they were looking at.=="*

### If probed *"why not just run the Indian PK study?"*

For a rare oncology indication with median survival under 1 year, 12–18 months of pre-approval enrollment is not abstract — it is delayed access for a real cohort. The cost was clinical, not just financial. And the science to answer the question **already existed** across 42 countries' worth of data — in mechanism, in PK linearity, in PD plateau, in DDI characterization, in 8 years of post-marketing surveillance, and in the integrated bridging math. The question wasn't whether to generate more data. It was whether to **classify what already existed correctly** under ICH E5(R1) — and let the Phase 4 commitment carry the prospective Indian data collection in parallel with patient access.

### Pace

~60 seconds. Linger on the SEC quote. Pause before saying "we changed what they were looking at." Let the pillar seed at the bottom sit unexplained — slide 18 will bring it forward.`,

  // Slide 4 (18 deck-wide) — CS2 strategy · mechanism-first · six pillars
  'case2-strategy': `## CS2 strategy · mechanism-first · the six-pillar architecture

==Headline:== ==IDH1 R132 is somatic, not germline==. The drug target lives inside the tumor. Inherited ethnic variation cannot modulate an enzyme the patient was not born with.

### Cinematic continuity (T6 midpoint)

The pillar architecture seeded as tiny tiles on slide 17 now MORPHS to full size — \`PillarArchitecture stage="full"\`. Each pillar carries a stable layoutId so framer-motion handles the transition automatically. **All six are equal weight here. No hero yet.** Slides 19 and 20 will differentiate them.

### Why six pillars (deliver before the grid lands)

> *"Regulators have seen waiver requests built on PopPK alone. Those requests fail. What the regulator needs is **converging evidence across independent lines**. Six pillars force the committee to engage with the totality — not pick off one weak subgroup table."*

### The quantitative pillars (top row · 1–3)

1. **Population PK** — Race tested as covariate on CL/F and Vc/F across pooled global dataset (Jiang CTS 2021 · N=253). ==Not significant.== Body weight + hepatic function drive disposition.
2. **Exposure–Response** — PFS, ORR (efficacy) + QTc, differentiation syndrome (safety) ==conserved across ethnic subgroups== in both pivotal trials (ClarIDHy · AGILE).
3. **Intrinsic Factors** — Hepatic, renal, DME polymorphisms (PharmGKB) · Japanese vs Caucasian ethnic-origin PK (Dai EJCP 2019) · dedicated organ-impairment studies. ==Ethnicity not retained.==

### The contextual pillars (bottom row · 4–6)

4. **Bridging math** — Indian-population AUC₀–24h projection ≈ Global pivotal-population AUC₀–24h. Δ ≈ 0.2 percentage points (84.6% vs 84.4%). ==The 5× AML/CCA gap collapses on weight normalization.==
5. **Long-term safety** — 8 years post-marketing surveillance · 42+ country rollout · 1,281 trial subjects · 15,867 patients global · ==zero new safety signals==.
6. **ICH E5(R1) Appendix D** — 9-criterion compound-property checklist for ethnic insensitivity. The classification key. Hero on slide 19.

### The regulatory anchor

> *"ICH E5(R1) has been on the record since 1998. The framework isn't invented. **What was new wasn't the framework — it was applying it to a specific drug for a specific regulator, answering a specific question** about whether Indian patients were adequately characterized."*

### Transition

> *"Let me start with the pillar that does the classification — Pillar 6, ICH E5 Appendix D."*`,

  // Slide 5 (19 deck-wide) — CS2 pillar 6 · ICH E5(R1) Appendix D · 9 of 9
  'case2-pillar6': `## CS2 pillar 6 · ICH E5(R1) Appendix D · ==9 of 9 criteria met==

==Headline:== the classification key. ICH E5(R1) Appendix D defines nine compound-property attributes for an ethnically insensitive drug. ==Each one was met.==

### Cinematic continuity (T6 climax · beat 1)

\`PillarArchitecture stage="hero6"\` promotes Pillar 6 into the central hero column; pillars 1–5 demote to a vertical icon strip on the left margin. **They're still there — just smaller.** The 9-criterion checklist dominates 60% of the slide.

### The 9 criteria · evidence map

1. **Linear PK** — AGILE proportional 200–1200 mg
2. **Wide therapeutic dose range** — 500 mg approved vs 1,200 mg MTD · 2.4× margin
3. **Flat PK/PD curve at therapeutic dose** — 2-HG plateau ≥ 500 mg
4. **Minimal metabolism** — predominantly CYP3A4 · no genetic gating
5. **High bioavailability** — F ≈ 0.83 (mass-balance / PBPK)
6. **Low protein binding** — ≈ 92–98% bound · α-1-AGP only
7. **Little potential for protein-binding interactions** — verified across DDI substrates
8. **Low potential for drug–drug interactions** — itraconazole +169% · within bounds, manageable by labeled adjustment
9. **Non-systemic mode of action** — tumor-localized IDH1 R132 inhibition (somatic, not germline)

### How to deliver this

> *"The committee asked for a study in Indian patients. Pillar 6 doesn't answer that question with statistics. It answers it with **a classification**: this drug, by its compound properties, is the kind of drug ICH E5 expects to behave the same in any ethnic group."*

### The synthesis line (after the table lands)

> *"==Nine of nine.== Eight directly. The CYP3A4 polymorphism — managed via labeled dose adjustment, which is what ICH E5 explicitly permits."*

### If probed *"why does mechanism beat statistics?"*

A subgroup comparison can be underpowered. A mechanistic argument about what the drug is doing at the molecular level is **either true or false** — and the answer doesn't depend on how many patients were in the trial. Somatic target biology doesn't change with sample size. ==This is the strongest pillar in the framework.==

### Transition

> *"Pillar 6 classifies. Pillars 1–5 deliver the convergence. Let me show you."*`,

  // Slide 6 (20 deck-wide) — CS2 pillars 1-5 · convergence · 84.6% ≈ 84.4%
  'case2-pillars-1-5': `## CS2 pillars 1–5 · convergence · ==84.6% ≈ 84.4%==

==Headline:== five independent lines of evidence converge on the same conclusion. The bridging math centerpiece — Indian-population AUC₀–24h projection ≈ Global pivotal-population AUC₀–24h. ==Δ ≈ 0.2 percentage points.==

### Cinematic continuity (T6 climax · beat 2)

\`PillarArchitecture stage="hero15"\` pulls pillars 1–5 into a horizontal chain across the top; Pillar 6 demotes to a corner badge. **The 84.6% / 84.4% typographic centerpiece dominates the lower half** — coral and cyan numerals, separated by a ≈ glyph.

### The five converging lines

- **Pillar 1 · PK linear** across 200–1200 mg (AGILE) · disposition driven by body weight + hepatic function — not race
- **Pillar 2 · PD plateau** at ≥ 500 mg (2-HG) — direct mechanistic readout
- **Pillar 3 · No genetic CYP3A4 ethnic gating** (PharmGKB DME polymorphisms · East/South Asian vs European)
- **Pillar 4 · Bridging math** — the apparent 5× AML/CCA AUC gap collapses on weight normalization. Indian-population AUC₀–24h projection 84.6% · global 84.4% · Δ ≈ 0.2 pp
- **Pillar 5 · Flat E-R · 8-yr safety** — 1,281 trial subjects · no exposure-response signal for PFS, ORR, QTc, differentiation syndrome

### How to read the centerpiece

> *"Eighty-four point six percent versus eighty-four point four percent. ==That's not a two-decimal flourish — that's the actual gap== between what the bridging analysis projects for Indian patients and what was observed in the global pivotal population. The committee saw five independent paths and one converging answer."*

### The honest caveat (state up front · don't leave for Q&A)

"Asian" in the AG120 program means East Asian sites — China, Taiwan, Japan, Korea (AGILE N=34). ==**No Indian subjects were enrolled.**== The argument was never that Indian data already existed — it was that South Asian patients would not differ from the East Asian subgroup OR the broader global population, given somatic target biology, linear PK, plateau PD, weight-driven disposition, and 9/9 ICH E5 criteria.

### The payoff line

> *"Weight explains the AUC difference. ==Ethnicity doesn't.=="*

### Transition

> *"That's the science. Now — the regulatory choreography that delivered it."*`,

  // Slide 7 (21 deck-wide) — CS2 response · regulatory timeline + 27 Mar leadership beat
  'case2-response': `## CS2 response · regulatory timeline · ==27 March 2025 in-person SEC==

==Headline:== twelve months of regulatory choreography. Three subject expert committee passes. One favorable recommendation. ==The hinge was a single in-person SEC presentation on 27 March 2025.==

### The 9-step timeline (the slide's spine)

1. **27 Mar 2024** — MAA filing · CDSCO Form 44 · 6 documents · NDCTR 2019
2. **23 May 2024** — SEC #1 · pre-clinical & efficacy review
3. **23 Aug 2024** — Examiner Office · additional data query batch 1
4. **10 Dec 2024** — SEC #2 · ==the objection== · "Conduct PK/PD study in Indian patients" *(amber node — slide 17's hinge moment)*
5. **Dec 2024 – Jan 2025** — internal strategy reframe · six-pillar mechanism-first package architected
6. **14 Jan 2025** — 91-KB submission · 600-page integrated PK/PD package · ICH E5(R1) classification narrative
7. **27 Mar 2025** — SEC #3 · in-person · ==the leadership beat== *(coral hero node)*
8. **4 Apr 2025** — favorable recommendation · no Indian PK study required
9. **14 May 2025** — CDSCO marketing authorization

### The 27 March leadership beat (deliver standing, hands at sides)

> *"On 27 March 2025, I presented the integrated package in person to the Subject Expert Committee for Oncology. ==Six pillars. Nine of nine ICH E5 criteria. One ninety-minute session.== The committee recommended conditional approval — and explicitly did not require a duplicative Indian PK study. The market authorization followed forty-eight days later."*

### Why this matters operationally

- Three rounds of SEC review · two written submissions · one in-person presentation
- The **shift in posture** from defending a subgroup to classifying a compound is what the SEC accepted
- ==Arguably stronger evidence== than a 12-month local PK study would have produced — and patients access the drug in 2025, not 2027

### If probed *"what specifically did YOU do versus the team?"*

==The strategic framing was mine.== I chose ICH E5(R1) Appendix D as the anchor (over a study-design counter-proposal). I designed the six-pillar architecture (over a single-argument submission). I directed which subgroup analyses to mount and which to leave on the cutting-room floor. **Pharmacometrics** executed the Bayesian covariate re-estimation. **Regulatory writing** authored the 91-KB document under clin-pharm direction. **Local affiliates** ran the regulator interface. **Global regulatory strategy** coordinated the cross-agency precedent narrative. I was the architect, not the builder of every pillar — and I delivered the in-person presentation.

### If probed *"why an in-person SEC presentation?"*

Two written rounds had not closed the gap. The committee needed to engage with the **architecture** — not just read pages. An in-person session lets the chair and the senior reviewers test the framing in real time. That's what closed it.

### Pace

~75 seconds. Linger on 27 March — let the coral hero node sit. Don't rush the closing chain (favorable → authorization).`,

  // Slide 8 (22 deck-wide) — CS2 impact + bridge to CS3
  'case2-impact-bridge': `## CS2 impact + bridge · ==objection resolved · India filled · → CS3==

==Headline:== three numerals land at once and a fourth opens the next case. ==14 May approval · 5 June launch · zero new safety signals.== Then the handoff to CS3.

### Cinematic continuity (T7 + T8 destinations)

- **T7** — the SEC objection card returns at the top of the slide in **resolved** state. Slate-grey, struck-through, small. Same \`layoutId="cs2-sec-objection"\` as slide 17. The verbatim text is preserved; the visual treatment communicates that the objection is closed.
- **T8** — the India outline that has been **empty** since slide 16 now FILLS coral (\`IndiaMap variant="filled"\`). The shape that has been the visual hole in the global picture for seven slides finally completes.

### The three hero tiles

| Tile | Numeral | Meaning |
|---|---|---|
| 1 | **14 / 05** (cyan) | CDSCO marketing authorization · India approval · no new clinical study required |
| 2 | **05 / 06** (coral) | Servier India launch · ==22 days== from authorization to first patient access |
| 3 | **0** (cream, muted) | New safety signals · 8-yr exposure · 1,281 trial subjects · 15,867 patients global |

### The closing thesis (deliver while T7 + T8 land)

> *"The objection that defined the case is now closed. The country that was empty on the world map is now filled. And the safety database — eight years, fifteen thousand patients — added zero new signals across the rollout. ==The architecture held.=="*

### Themes exercised (the bridge scaffold at the bottom)

- ==Mechanism &gt; population== — somatic biology beats subgroup statistics
- ==Reframing &gt; defending== — change what they're looking at, not how loudly you defend the same view
- ==Convergence of independent evidence== — six pillars, one classification
- ==Regulatory architecture as deliverable== — the 91-KB document and the in-person session were the product

### Bridge to CS3

> *"==Different problem — same pharmacometrics-as-architecture posture.== CS3 — Calaspargase pegol, SPARK-ALL. Not a global drug seeking a local market, but a rare adult population where an endpoint-powered trial isn't operationally feasible. Two FDA-precedented methods stacked for the first time in adult oncology. A documented thirty-six percent enrollment reduction. Theme 04 — novel methods — finally fires."*

### If probed *"what about Theme 04 in CS2?"*

CS2 didn't introduce new methods. PopPK with covariate testing, exposure–response, and ICH E5(R1) framing are decades-old. The novelty was in **how they were composed** — six pillars instead of one. ==Theme 04 (stacked novel methods) is CS3's territory==: D-optimal design under an informative pediatric prior + PopPK-simulated primary endpoint, individually FDA-precedented but combined here for the first time in adult oncology.

### Pace

~50 seconds. Let T7 and T8 happen visually before speaking. Land the three numerals. Then the bridge.`,

  // ───────────────────────── CASE STUDY 03 ─────────────────────────
  // Calaspargase pegol (Asparlas) · SPARK-ALL · Adult Ph-negative ALL
  // FDA Type A 21 Jul 2023 · NCT04817761

  // Slide 23 — CS3 Divider · Calaspargase pegol · "smaller, smarter"
  'case3-divider': `## CS3 divider · Calaspargase pegol · SPARK-ALL

==Headline:== a smaller, smarter trial in adult Ph-negative ALL — and an FDA-agreed **36%** enrollment reduction.

### The four meta rows on the card

- **Compound** — Calaspargase pegol (Asparlas) · pegylated *E. coli* L-asparaginase
- **Population** — Adult Ph-negative ALL (1L · cooperative-group eligible)
- **Agency** — FDA · Type A meeting · **21 Jul 2023**
- **Outcome** — N = **60 agreed** (94 → 60 · ==−36%==)

### What the illustration is showing

Concentric circles: the **large faint outer ring** is the FDA-reviewed pediatric PopPK prior (N ≈ 124). The **small filled inner disc** is the adult anchor (N = 60). Visual claim: the adult sample doesn't have to *re-derive* the model — it has to *confirm and refine* it. Most of the information already lives in the prior.

### Where this case fits in the seminar arc

- CS1 (Ambrisentan) was *fit-for-purpose* — one dataset, one model, one extrapolation
- CS2 (Tibsovo · India) was *composition* — six pillars assembled into one defense
- **CS3 (Asparlas) is *stacking* — two FDA-precedented methods combined for the first time in adult oncology.** This is the case where ==Theme 04 (Novel methods) finally fires==.

### The one-line "why this matters"

> The win isn't *a* smaller trial. It's a **documented FDA Type A precedent** the next program can cite.`,

  // Slide 24 — CS3 Challenge · Approved in pediatrics. Adults need a smarter design.
  'case3-challenge': `## CS3 challenge · approved in pediatrics, adults need a smarter design

==Headline:== same drug · same biology · same FDA-validated NSAA surrogate. The constraint wasn't scientific doubt — it was ==operational feasibility==.

### The three anchor tiles · what each number means

- **2018 · FDA Pediatric Approval** — Asparlas approved for ages 1 mo to 21 yr · NSAA (nadir serum asparaginase activity) ≥ 0.1 U/mL is the agreed surrogate · 2,500 U/m² q21d. ==The science is established and labelled.==
- **94 · Original sample size** — protocol was endpoint-powered against a target lower 95% CI ≥ 90% NSAA achievement. Mathematically clean. **Operationally undeliverable on any reasonable timeline.**
- **~2028 · If design unchanged** — projected SPARK-ALL enrollment completion under the endpoint-powered design. By the time you finish, the answer doesn't matter to clinical practice.

### The structural constraint · why 94 wasn't deliverable

- **Rare adult population** — Ph-negative adult ALL is a low-incidence disease; eligible patients live in cooperative-group networks
- **~46% screen-fail rate** in cooperative-group adult ALL — Ph-neg, 1L, fit for asparaginase narrows the funnel hard
- **Operational pressure** — competing cooperative-group trials at the same sites for the same patients

### The honest framing for the audience

> An endpoint-powered trial of 94 adults isn't *wrong*. It's ==unrealizable on a timeline that matters==.

### The pivot question (the violet ribbon on screen)

> Could a **smaller, smarter** study still be defensible to FDA?

The drug worked in pediatrics. Everyone in the program believed it would work in adults. The pediatric PopPK was FDA-reviewed and label-supporting. The question wasn't *can the science survive a smaller trial* — it was *can the same scientific question be answered with **fewer adults and more model**?*

### Bottom-row meta context (for probes)

- **Pediatric anchor** = N = 124 from AALL07P4 + DFCI 11-001
- **Half-life** ≈ 16 days (SC-PEG linker permits q21d dosing)
- **Trial** = SPARK-ALL · NCT04817761`,

  // Slide 25 — CS3 Strategy · Two innovations, individually precedented, stacked
  'case3-strategy': `## CS3 strategy · two innovations · individually precedented · stacked

==Headline:== each move is FDA-precedented on its own. Combined here for the first time in adult oncology.

### Move #01 · Optimal design — anchor to PK precision, not endpoint power

- **Method** — Fisher Information Matrix · D-optimality (PopED workflow, Tessier / Riglet, Paris)
- **Prior** — pediatric PopPK · N = 124 (AALL07P4 + DFCI 11-001)
- **Augmentation principle** — the adult data *augments* the model, it doesn't *re-derive* it
- **Target** — power to detect a ±20% CL difference adult vs pediatric (not power on a clinical endpoint)
- **Question being answered** — "how many adults does the model need to confirm PK similarity?" rather than "how many adults to power a 90% NSAA achievement claim?"
- **Precedent** — Mentré · Bornkamp · Pinheiro · published methodology 2007–2020; FDA-accepted in pediatric extrapolation submissions

### Move #02 · PopPK-simulated primary — simulate the endpoint, don't observe it

- **Method** — NPAA simulated across **2 000 – 10 000 virtual patients** drawn from the pooled (pediatric + adult) PopPK
- **Endpoint** — NPAA ≥ 0.1 U/mL · ==exactly the same FDA threshold== as the pediatric label
- **Criterion** — lower 95% CI for target achievement ≥ **85%** (CSP v5)
- **Logic** — the trial validates the *model*; the model answers the *clinical question*
- **Precedent** — Rylaze (adult, 2021) · Asparlas (pediatric, 2018) · FDA itself runs simulations during review

### The stack (the dashed-violet ribbon at the bottom)

> **PK-precision sample size + model-simulated primary endpoint** — two precedents, first combined for adult oncology.

### If probed *"isn't this just borrowing strength inappropriately?"*

No — neither method is novel in isolation. The novelty is composition. Each individual move has cleared FDA review on prior programs. ==The contribution is putting them together in this specific clinical context== — adult oncology with a pediatric-derived prior — where they hadn't been combined before. That's what makes it a Theme 04 (Novel methods) case rather than a Theme 02 (Dose precision) case.

### If probed *"why the 85% CI threshold and not 90%?"*

The 85% threshold (CSP v5) was deliberately chosen to align with the AE-detection probability framework on the next slide. Same threshold, two independent statistical paths converging on the same N — which is exactly the leverage that gets the regulator to agree.`,

  // Slide 26 — CS3 FDA Engagement · 21 Jul 2023 · N = 60 agreed
  'case3-fda-engagement': `## CS3 FDA engagement · Type A · 21 Jul 2023 · N = 60 agreed

==Headline:== three of four pillars agreed on the FDA Type A record · enrollment cut by **36%** · methodology now travels independent of trial outcome.

### What the waterfall is showing

The left visualization is a two-bar waterfall: **94 → 60 primary-endpoint evaluable**, with a connecting curved arrow and a **−36%** callout. The reduction was anchored on FDA's own AE-detection probability framework — *not* on a softening of the scientific bar.

### The three pillar status cards on the right

- **3 / 4 · Pillars agreed** — three of the four pillars in the briefing landed on the Type A record. Violet-marked because this is the headline outcome.
- **> 85% · AE-detection probability** — the safety framework was prepared *in parallel* with the optimal design, not bolted on after. ==Agencies anchor on safety. Briefing both frameworks together is what got the reduction.==
- **Repositioned · Simulated primary** — the FDA didn't reject the simulated primary; they required *more PopPK data to support it*. So it was repositioned to **dose confirmation in Cohorts 1 & 2** of the trial; **Part 2 confirmation pending additional adult PopPK**. Reposition without losing the overall reduction is a Theme 05 (Judgment) move.

### The two regulatory positions (paraphrased — zaj-slides HARD RULE)

- **AE-detection probability** — the **>85% AE detection** threshold is FDA's, not the sponsor's. That's why the violet card sits third in the list, not the headline: the agency anchored on safety; the design met the agency's anchor. (Speaker's own account of the Type A meeting; do NOT recite as a verbatim quote — see the file header note in slide 26.)
- **Simulated primary repositioned** — FDA did not reject it; they required additional PopPK before it could carry registration weight. ==A "no" with a path forward is a "yes, conditionally."== The simulated primary survived — repositioned to dose confirmation in Cohorts 1 & 2, with Part 2 confirmation pending adult PopPK.

### The closing payoff line

> Two frameworks prepared · one sample size agreed · a documented precedent — the **pharmacometric methodology now travels independent of trial outcome**.

This is the slide's job: convert a meeting into evidence. Whatever happens to SPARK-ALL itself, the Type A record is durable.

### If probed *"what happened to the fourth pillar?"*

It's the one that got repositioned — the simulated primary as the *registration* primary endpoint. FDA wanted more PopPK data before treating the simulation as registration-grade evidence, so it was demoted to dose-confirmation use in Cohorts 1 & 2 with Part 2 pending additional adult PK. ==The 36% reduction held without it== because the AE-detection probability framework anchored the sample size independently.

### If probed *"why is the AE-detection number cream and not violet?"*

Because it's FDA's framework, not ours. The slide deliberately makes the violet (sponsor-led) outcome the headline (3/4 pillars) and treats FDA's own statistical framework (85% AE detection) as anchoring evidence rather than a sponsor claim.`,

  // Slide 27 — CS3 Fit · Sixty adults anchor a model that already knows most of the answer
  'case3-fit': `## CS3 fit · sixty adults anchor a model that already knows most of the answer

==Headline:== at N = 60 the model is **as precise as at N = 94** for the parameters that drive dose decisions — because the information lives in the **pediatric prior**, not the adult sample alone.

### Block 01 · The pediatric anchor (left, top)

> *"The adult data **test the model** — they don't rebuild it."*

- **N = 124** pooled pediatric PopPK · saturable distribution · combined linear / non-linear elimination
- **~16-day half-life** · BSA / age / sex covariate structure
- **FDA-reviewed and label-supporting** (Asparlas pediatric label, 2018)
- **Adult Part 1 external VPC vs pediatric-model predictions** — no structural failure observed

This is the load-bearing claim: the model isn't being estimated from a small adult sample. It's being **inherited** from a fully-characterized pediatric population and **stress-tested** in adults. The structural model passes the external VPC against the adult Part 1 data — meaning the pediatric model predicts adult observations without re-fitting. That's the evidence for "the model already knows most of the answer."

### Block 02 · Sensitivity analysis (left, bottom — *illustrative*)

> *"Three independent tests — all say sixty is enough."*

- **Cohort-1 : Cohort-2 enrollment ratio** varied across scenarios → conclusion stable
- **%RSE of key PopPK parameters** not sensitive to adult N above ≈ 50–60
- **Bootstrap replicates · pcVPC on pooled data** → predictive performance unchanged

==The "(illustrative)" tag is deliberate.== The actual %RSE-vs-N values are in the FDA Type A briefing book; the slide shows the *shape* of the argument rather than fabricating exact numbers.

### Right column · the RSE stability curve

- X-axis: **adult sample size N**
- Y-axis: **parameter %RSE** (relative standard error on PopPK parameters that drive dose decisions)
- Shape: **steep below N ≈ 40** → ==flat plateau beyond N ≈ 50–60==
- N = 60 marker sits comfortably on the plateau — adding more adults doesn't materially reduce RSE

The curve's whole job is to make the "why not 94?" question feel obvious. If the curve is flat from 50 onward, the marginal information from adults 61 → 94 is essentially zero. The pediatric prior is doing the work.

### The bottom ribbon (the slide's payoff)

> The smaller sample size doesn't weaken the science — it **clarifies where the scientific evidence actually lives**.

### If probed *"isn't the prior just doing all the work? What if the adults disagree?"*

That's exactly what the **external VPC against Adult Part 1** addresses. Before committing to N = 60, the pediatric model was tested *prospectively* against the adult observations already in hand — no structural failure. If adult PK had diverged from pediatric predictions, the design changes: a fixed-effects-only refit, more adults, or a different structural model. ==The methodology is conditional on the validation passing — and it did==.

### If probed *"why not just use NCA on 60 patients and skip the model?"*

NCA on 60 sparse-sampled adults gives you means and CIs on AUC and Cmax. It doesn't give you a covariate-explained model that supports dose individualization, doesn't link to the pediatric label, and doesn't generate the simulated NPAA primary. ==The model is the asset; the trial validates it==.`,

  // Slide 28 — CS3 Impact · 36% · 3× · 2 frameworks
  'case3-impact': `## CS3 impact · 36% reduction · documented precedent · methodology travels

==Headline:== a 36% enrollment reduction · a documented FDA Type A precedent · a methodology that travels.

### The three numerals (left → right)

**−36% · Sample-size reduction** *(violet · headline)*
- 94 → 60 primary-endpoint evaluable adults
- FDA agreed via **AE-detection probability ≥ 85%** (their own framework)
- Optimal design briefed in parallel — not as a workaround

**3× · Generalizable contributions** *(cream)*
- ==Regulatory precedent== — FDA Type A record of a 36% reduction, citable by other sponsors
- ==Operational efficiency== — per-patient information density up, footprint down
- ==Scientific generalizability== — template for rare-population trials where endpoint-powered enrollment isn't feasible

**2 · Frameworks converged on one N** *(cream — the integration claim)*
- ==Pharmacometrics== path: D-optimal design under an informative pediatric prior
- ==Biostatistics== path: AE-detection probability ≥ 85%
- Two independent statistical paths arrived at the **same N** — and that convergence is what enabled FDA agreement. One framework is rebuttable; two converging frameworks are very hard to rebut.

### The faint sweeping arc behind the numerals

The arc visually carries the eye left-to-right, mirroring the narrative arc — **method (−36%) → meaning (3×) → mechanism (2)**. It's intentionally low-opacity (~10%) so it doesn't compete with the numerals.

### The durable-contribution callout (bottom)

> The **precedent is documented**. The methodology transfers. SPARK-ALL subsequently ended at **N = 42** on a sponsor portfolio decision (**Feb 2026**) — *independent of design quality or regulatory trajectory*. The FDA-agreed methodology is durable beyond any single program.

==This is the most important sentence on the slide.== A panelist who knows SPARK-ALL ended early *will* probe this. The honest framing: the trial closed for portfolio-strategy reasons (sponsor decision, not regulatory rejection, not safety, not design failure). The Type A record from 21 Jul 2023 is unchanged. The methodology stands.

### If probed *"so the trial didn't finish — does that invalidate the case?"*

==No — and here's why:== the deliverable was *the documented FDA-agreed methodology*, not the trial's primary readout. The Type A record (21 Jul 2023) created a reusable precedent that any sponsor can cite in MIDD submissions. The portfolio decision in Feb 2026 didn't unwind the precedent. If anything, **closing at N = 42 instead of 60 is consistent with the original argument** — the precision was already adequate at smaller N.

### If probed *"why are 3× and 2 in cream rather than violet?"*

Visual hierarchy. Only the **−36%** is the headline outcome — the one number a busy reviewer should remember if they only see the slide for two seconds. The 3× and 2 are *amplification* — they convert the single number into a generalizable claim. Cream over violet keeps the eye anchored on the headline.

### Source line

FDA Type A 21 Jul 2023 · NCT04817761 (status as of 9 Feb 2026).`,

  // Slide 29 — CS3 Bridge · framework recap + bridge to closing
  'case3-bridge': `## CS3 bridge · framework recap + bridge to closing

==Headline:== the methodology scales — and the value isn't one trial. It's a template.

### The five-step template (the checklist on the left)

1. **Anchor sample size on parameter precision** — not endpoint power
2. **Use a model-based simulated primary** when observation isn't feasible
3. **Stack two FDA-precedented methods** — don't bet on one untested move
4. **Quantify the safety framework alongside the design** — agencies anchor on it
5. **Brief the regulator with the methodology, not just the number** *(spans both columns)*

The label above the checklist on screen reads: *"The template — generalizes wherever a reference population is well-characterized and observed-endpoint trials aren't feasible."* That last clause is the scope condition; cite it explicitly if a panelist asks "where does this **not** apply?"

### The pipeline-bridge card (the right column)

==Where it goes next — Merck CMD pipeline.==

- **Enlicitide decanoate · oral PCSK9 (CORALreef LDL-C reduction)** — the same D-optimal-design-under-informative-prior pattern applies wherever Phase 3 dose justification rides on a small precision-critical sample and a well-characterized class precedent (statin/PCSK9 LDL-C exposure–response)
- **Beyond Enlicitide** — HRS-5346 · MK-2060 · next-generation class extensions. ==The template is direct application, not adaptation.==

### The violet payoff line (centered, between the columns)

> The win wasn't a smaller trial — it was a precedent the next program can cite.

### The ICH M15 coda (the violet-bordered card below the payoff)

> **ICH M15 · Step 4 · Feb 2026 · EU effective Jul 2026** — the first global guideline on **model-informed drug development (MIDD)**. The regulatory ground onto which the CS3 template now lands.
>
> *FDA documented this case in **2023**. M15 codifies the playbook in **2026**.*

This is the most powerful framing in the case study. The CS3 work didn't *follow* M15 — it ==pre-figured it==. M15 is the field catching up to what FDA had already accepted on this program three years earlier.

### The themes ribbon (3 of 5 fire)

- ==**01 QP replaces study**== · D-optimal design + simulated primary substituted for an endpoint-powered trial of N = 94 adults
- ==**04 Novel methods**== · two methods FDA-precedented individually, stacked here for the first time in adult oncology
- ==**05 Judgment**== · brief Type A *pre-execution* · relax 90% → 85% CI on FDA alignment · reposition a non-agreed pillar without losing the headline reduction

### Why themes 02 and 03 deliberately don't fire

- **Theme 02 (Dose precision)** was CS1's win — Ambrisentan pediatric exposure match, AUC ±3% of adults
- **Theme 03 (Global strategy)** was CS2's win — multi-agency convergence on the Tibsovo · India submission
- CS3 is the framework's ==Theme 04 case== — the one where the stacked-novel-methods pillar finally carries the load. Each case study is the framework operating in a *different* mode; the framework's value is breadth, not redundancy.

### Bridge to closing

The next section steps back from the case studies and looks at the breadth — what else lives in the record (FDA + EMA + PMDA + CDSCO submissions across programs) and how the framework holds up across many more decisions than the three deep cases.

### If probed *"what's the strongest single sentence to take from CS3?"*

> ==Two FDA-precedented methods, stacked for the first time in adult oncology, produced a documented Type A record of a 36% enrollment reduction — three years before ICH M15 codified the playbook.==`,

  // ── Closing · Act IV ─────────────────────────────────────

  // Slide 30 — Closing divider · Beyond the three cases
  'closing-divider': `## Closing divider · Act IV

==Headline:== Beyond the three cases. From depth → scope.

### What this slide does

Three case studies showed **depth**. The next five slides show **scope** — the rest of the record, the leadership posture, and where the field is heading next. This is the one slide in the deck where every framework theme is lit at once: the constellation on the right is all five themes (01–05) connected as a complete graph.

### The visual hand-off

The constellation here is the ==hero variant== of a shared element with \`layoutId="themes-constellation"\`. On advancing to slide 31 (breadth), it morphs into a faint watermark behind the 6-domain grid — same cinematic pattern used for the lung (slides 5→6), the India map (slides 14→15), and the informative prior (slides 23→27). That morph is the visual argument: *"the same five themes that drove the case studies are about to organize everything else."*

### Color discipline

Case-color discipline (coral · cyan · violet) drops here. The closing palette is **amber + cream** — the framework summary color, neutral across cases. There is no verdict pill on this slide because this isn't a case study.

### Speaker beat

> *"Those three cases were depth. What's next is scope — the rest of the record, the AI/ML research front, the leadership posture, and a single sentence I want you to take with you."*`,

  // Slide 31 — Breadth · therapeutic areas
  'breadth-therapeutic-areas': `## Breadth · six clinical domains

==Headline:== pharmacometric leadership across six clinical domains.

### What the grid says

Six domains, each anchored to a published artifact or a named program. Two **flagship** badges (rare disease · ambrisentan = CS1; global regulatory · Tibsovo = CS2). One **active research** badge (AI/ML). The rest carry citations.

### The 5-tile stat strip

- **15+ programs** · **8 submissions** · **4 approved labels** · **6 agencies** · **6 domains**
- These are the receipts. Twelve years of pharmacometrics across two large sponsors.

### If probed *"why is oncology only one card when CS3 is the third case?"*

CS3 is one program (Asparlas · adult Ph-neg ALL · SPARK-ALL). The oncology card represents the broader oncology footprint at Servier — **BCL-2 inhibitor S65487** combination PK/PD plus the asparaginase work. The card is the breadth context; CS3 is the deep case that lives inside it.

### Speaker beat

> *"Six domains, each with a published artifact or a named program. Two of them are the flagship cases you've already seen — the rest extend the record into cardiometabolic, antiviral, and the AI/ML front."*

### Cinematic continuity

The faint constellation on the right is the same five-theme graph from slide 30, morphed into a watermark. It says ==without using words==: the framework themes you saw light up on the divider are still organizing what you're looking at now.`,

  // Slide 32 — Record at scale
  'record-at-scale': `## Twelve years · the record at scale

==Headline:== twelve years. The record at scale.

### What the seven tiles say

| Tile | Number | What it represents |
|---|---|---|
| Domains | **6** | Cardiometabolic · oncology · rare disease · antiviral · regulatory · AI/ML |
| Submissions | **8** | Across two major pharmaceutical sponsors |
| Agencies | **6** | FDA · EMA · PMDA · NMPA · MFDS · CDSCO |
| Labels | **4** | Approved labels across two major companies |
| Publications | **20+** | Peer-reviewed across CPT · JCP · CTS |
| Tools | **3** | DosePredict · DeepPK · PharmAgent |
| Patent | **AU2023213173A1** | IP Australia · 2023 · neural-ODE PopPK methodology |

### The editorial choice

The numerals are deliberately heterogeneous in unit — years, counts, plural markers, a serial number. The eye treats each tile as a **separate fact** rather than a continuous bar chart. This is editorial typography, not a dashboard.

### The bottom ribbon

> Breadth that maps to every part of the mission — ==and a methodology record that extends beyond it.==

### If probed *"what's the patent on?"*

A neural-ODE-based methodology for population PK structure learning — the IP foundation under DeepPK. Granted by IP Australia in 2023.

### Speaker beat

> *"Twelve years, six domains, eight submissions, four labels, six agencies, twenty-plus papers, three tools, one patent. That's the record. The point isn't any single number — it's that the record reaches every part of the QP2-CMD mission."*`,

  // Slide 33 — Leadership principles
  'leadership-principles': `## Leadership · three principles + AI/ML research front

==Headline:== three principles for leading quantitative pharmacology in the next five years.

### The three principles (top row)

1. **QP as strategic architecture** · *the group that decides what evidence is needed and what the regulator will accept — upstream of study execution, not downstream of it.*
2. **Scaffolds over templates** · *each case study is an instance; the scaffold is the durable output. Framework identity outlasts any single analysis.*
3. **Teams over deliverables** · *mentored PhD fellows and junior pharmacometricians into regulatory-thinking scientists — first-author publications and career progression. ==Capability compounds when you invest in the strategic layer, not only the technical one.==*

### The AI/ML cards (bottom row)

- **PharmAgent · multi-agent** · 13 agents · 151 tools — end-to-end pharmacometric workflows: NONMEM automation, QC, regulatory drafting
- **DeepPK · neural ODE** · neural + compartmental — neural ODE approach to PopPK structure learning for hybrid mechanistic + neural inference
- **DosePredict · peer-reviewed** · R Shiny · JCP 2020 — individual-patient dose adjustment, on GitHub

### The ICH M15 ribbon

> ==**ICH M15 · Step 4 · Feb 2026 · EU effective Jul 2026**== — the first global guideline on model-informed drug development (MIDD). The regulatory ground onto which the closing principles now land.

### Pipeline-bridge inside the ribbon

- **WINREVAIR pediatric extrapolation (MOONBEAM, 2028)** ← CS1 template (pediatric extrapolation under exposure match)
- **Enlicitide CORALreef LDL-C reduction** ← CS3 modeling template (D-optimal under informative prior)
- **HRS-5346 · MK-2060** ← breadth mapping (cardiometabolic + oncology footprint)

### Speaker beat

> *"Three operating principles plus three technical receipts. Strategic architecture, scaffolds over templates, teams over deliverables — and the tools to execute on all three. All of it lands on M15, the first global MIDD guideline, which came into effect this year."*

### If probed *"which principle matters most?"*

==Number two — scaffolds over templates.== The first principle is the posture, the third is the people. The second is what makes the first two repeatable — it's the difference between a leader who delivers and a leader whose team delivers after they're gone.`,

  // Slide 34 — In closing
  'in-closing': `## In closing · three things to take away

==Headline:== in closing. Three things to take away.

### The three takeaway cards

1. **Regulatory impact** · ==**8 · 4 · 6**== · *8 submissions, 4 approved labels, 6 health authorities. The record speaks to an agency-first orientation — scientific rigor met the reviewers where they evaluated.*
2. **Strategic breadth** · ==**7**== · *Seven therapeutic areas, end-to-end from first-in-human to lifecycle management. No learning curve to absorb — a pipeline to accelerate.*
3. **Leadership clarity** · ==**QP**== · *A posture that builds teams, influences cross-functional decisions, and positions quantitative pharmacology as the strategic engine of drug development — not its service desk.*

### The pull-quote

> ==*"That's the organization I know how to build — because I've spent my career building the evidence that moves science into patients' lives."*==
>
> — Merck QP2-CMD · Candidate Seminar · April 2026

This is the one sentence the panel should remember on the elevator ride after the talk. It is the **frame for why this seminar happened** — not a summary of slides, but a statement of intent.

### Speaker beat

> *"Three things to take away. The record — 8 / 4 / 6. The breadth — seven therapeutic areas. The posture — QP as strategic engine, not service desk. And one sentence I'll leave with you: that's the organization I know how to build, because I've spent my career building the evidence that moves science into patients' lives."*

### If probed *"what does 'service desk' mean?"*

Pharmacometrics that only answers questions teams already framed. The strategic-engine posture is pharmacometrics that ==reframes the question== so the regulator's bar gets met with less risk and more evidence — the way CS1, CS2, and CS3 each did, in different agencies.`,

  // Slide 35 — Thank you
  'thank-you': `## Thank you · questions welcome

==Headline:== thank you. Questions welcome.

### Speaker beat

> *"Thank you. I'm happy to take questions on any of the cases, the breadth, or the leadership posture."*

### Q&A defenses live in the per-case notes

The deepest defenses — covariate counts, IMPMAP method labels, the ratio-track derivation, the Bayesian 9-covariate framework, the Type A meeting record — all live in the speaker notes for the **case slides themselves** (slides 9, 10, 18, 26, 27, 28). When a panelist probes a number, the right place to land is back on the originating slide.

### Common openings to be ready for

- *"How do you think about MIDD becoming standard?"* → land on slide 33 (ICH M15 ribbon)
- *"Which case is most representative?"* → CS1 if the question is about depth; CS3 if about novel methods; CS2 if about strategy
- *"What would you do differently?"* → CS3 sample-size relaxation 90% → 85% — would brief that earlier in writing, not as a real-time concession
- *"What's next on PharmAgent / DeepPK?"* → land on slide 33 research cards

### Contact

- **malekokour.com** · personal site
- **linkedin/in/malek-okour-73020520** · LinkedIn

### The stage lives with the speaker now

This slide carries no Source line and no page-number rail by design. The deck is over; the conversation begins.`,
};

export default notes;
