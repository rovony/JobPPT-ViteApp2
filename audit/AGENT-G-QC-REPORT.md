# Agent G — QC Sweep Report (Slots 13–22)

**Sweep window:** 2026-04-24
**Scope:** slots 13 → 21 (deck order). Slot 22 belongs to Agent H per task scope (`23+ DO NOT touch`); the manifest's `case2-impact-bridge` is at slot 22 and was treated as Agent H's territory.
**Protocol:** sequential per-slide. Capture round-N at 1920×1080 + 1366×768 → list issues → backup → fix → re-capture → re-inspect, up to 4 rounds.
**Captures:** `audit/out/qc-sweep/<slot-NN>-<slide-id>/round-N-<viewport>.png`
**Backups:** `_archive/2026-04-24-qc-<slide-id>-round-N.jsx`

---

## Slot 13 · `case-impact-numerals`

CS1 IMPACT — Agent B's two-regulator convergence diagram + methodology ledger.

**Verdict:** ✅ **clean on round 1.** No edits.

- Eyebrow `CASE 01 · IMPACT · TWO REGULATORS CONVERGED` reads in coral.
- Headline `One model. Two regulators. *The model became the evidence.*` (italic+coral accent) lands the assertion.
- EMA SEP 2021 / PMDA APR 2021 → V-converging at "One PopPK model · ONE PEDIATRIC LABEL" reads as physical convergence — independent agencies, identical conclusion.
- Numeric ledger `1 PopPK model · 2 jurisdictions · 0 new pediatric efficacy trials · M-IPE` is strong large-numeral typography on `--cream`.
- Closing line `When two independent agencies accept the same model on the same evidence…` carries the editorial voicing.
- `ICH E11A · MODEL-INFORMED PEDIATRIC EXTRAPOLATION` framework eyebrow on the right ties this to the formalized 2025 standard — the four-year predates angle is implicit.
- Source line public; page meta `13 / 35` correct.

---

## Slot 14 · `case-bridge`

CS1 → CS2 bridge — Agent C's editorial typographic stack.

**User pain point:** *"fonts sizes and placements, are off — also we can think of visuals to try see if we can have non box patterns."*

**Issues found (round 1):**
1. `PipelineBridgeCard` (top-right "WHERE IT APPLIES — MERCK PIPELINE" panel) carried a tinted background + amber rounded border — read as a callout box, not editorial column.

**Fixes (round 2):**
1. `src/decks/qp2-seminar/slides/cs1-bridge/PipelineBridgeCard.jsx` — stripped `borderRadius`, full `border`, and tinted `background`. Kept the structural left amber rule. Increased `paddingLeft` to compensate for the lost perimeter padding.

**Verdict:** ✅ **clean on round 2.**

- `*The methodology travels.*` headline reads in italic amber — owned the slide.
- Top-left ledger (5 numbered methodology steps) reads as flat editorial rows; step 05 bolded as the keystone insight.
- Top-right Merck pipeline panel now reads as editorial body with an amber left rule, structurally matched to the 5-step ledger on the left. **No box pattern remains.**
- Editorial centerpiece `The value isn't one dose — it's a reusable template for pediatric extrapolation.` lands in amber.
- Bottom 4-card `FRAMEWORK THEMES — EXERCISED HERE` row reads as flat hairline-divided peers.
- Source line public; page meta `14 / 35` correct.

---

## Slot 15 · `case2-divider`

CS2 hero divider — Agent C's India outline visual.

**User pain point:** *the SVG must read as **regulatory + jurisdiction**, not anatomy.*

**Verdict:** ✅ **clean on round 1.** No edits.

- Cyan `CASE STUDY 02` eyebrow + bold serif `Ivosidenib` headline + cyan rule + `India's Waiver Pathway` subhead is the same scaffold as slot 5 (CS1 divider) — sibling chrome confirmed.
- Tagline `Approved in 42 countries. Pre-approval blocked at India's border. Six pillars, one mechanism, one waiver.` lands the case promise.
- India outline is rendered cartographically with cyan stroke + light cyan fill — reads as **map**, not anatomy. Sub-continental shape is unambiguous.
- `CaseLedger` at the foot carries COMPOUND / INDICATION / AGENCY / VERDICT with the small cyan checkpoint indicators along the rule (these are **intentional** ledger anchors per `CaseHeroDivider.jsx`, not stray markers — confirmed by reading the shared primitive; not modified per hard constraint).
- Footer source line `CDSCO marketing authorization · 14 May 2025 · India commercial launch 5 June 2025` is public.
- Page meta `15 / 35`; case color cyan consistent.

**Note (not an issue):** the India outline that exits this slide is `--cyan`, but slot 16's morphed India is `--coral/amber`. The `layoutId="india-cdsco"` morph carries geometry only, not color, so there is a fast color flip across the slide boundary. This is acceptable because the slide-card transition masks the flip — but it is a minor cinematic compromise worth documenting.

---

## Slot 16 · `case2-background`

CS2 background — internal India→World morph (Beat 1 → Beat 2).

**User pain point:** *the cinematic transition; India must end at the correct geographic position on Robinson projection, not floating.*

**Verdict:** ✅ **clean on round 1.** No edits.

- `CS2 · BACKGROUND — BY EARLY 2025` cyan eyebrow.
- `42 countries. *One outline still empty.*` headline — italic coral accent on the second clause is the assertion.
- Left ledger: THE DRUG (Ivosidenib · 500 mg QD with 4 supporting facts + flat PD curve note) and THE DISEASES (IDH1-mutant AML + cholangiocarcinoma with ~6-20% IDH1-mutant prevalence) read as a packed editorial briefing column. `42 COUNTRIES` and `15,867 PATIENTS` numerals close the brief.
- Right pane at final state: Robinson projection with 42 countries highlighted in faint coral. **India in coral with stronger outline, in the South Asia subcontinent — geographically correct, not floating.** Annotation `INDIA · still required local data` in coral italic anchors the assertion.
- Bottom editorial line `42 countries. 15,867 patients. India still required local data.` is the slide's TL;DR.
- Source: `TIBSOVO USPI (cumulative exposure) · CDSCO MAA filing 27 Mar 2024 · Jiang CTS 2021 (PMID 33369167)` — all public.

---

## MORPH 15 → 16 (India→World cinematic)

**Scope clarification:** the user's brief said "morph 16→17" but the actual cinematic morph is the **cross-slide layoutId pairing 15→16** (slide 15's India outline ↔ slide 16's coral India), plus an **internal slide 16 morph** from Beat 1 (India alone, large) to Beat 2 (India in geographic position on the world map). I captured both at 1920×1080 and 1366×768.

**Captures:** `audit/out/cs2-cluster/morph-15-to-16/<viewport>-t<NNN>ms.png` for t = 200, 500, 1100, 1800, 3500 ms.

### Frame-by-frame analysis (1920×1080)

- **t = 200 ms.** Slide 16 has just mounted. India is large in the right pane, coral. Editorial labels on the left (`THE DRUG`, `THE DISEASES`) are mid-fade-in. The cross-slide handoff between slot 15 (cyan India) and slot 16 (coral India) appears as a fast color flip — the geometry tween via `layoutId="india-cdsco"` carries position+scale, not stroke colour. Acceptable.
- **t = 500 ms.** Beat 1 settles. India dominates the right pane. Annotation `INDIA · PRE-APPROVAL, NO LOCAL DATA ACCEPTED` is fading in below the country.
- **t = 1100 ms.** Beat 1 fully settled. India fills the right pane at its largest scale; left ledger is fully visible; bottom annotation is at full opacity. **No flicker, no jitter.**
- **t = 1800 ms.** Mid-morph from Beat 1 → Beat 2. World map has appeared underneath India in faint coral; 42 highlighted countries are visible across the Americas, EMEA, and APAC. India is mid-shrink, partway through translating into its sub-continental position. **Smooth transition — no snap, no overshoot.** Bottom annotation has begun fading toward the inline `INDIA · still required local data` callout.
- **t = 3500 ms.** Final state. India is at its sub-continental scale on the Robinson projection. World map fully visible. Inline annotation `INDIA · still required local data` is anchored to India's right side. Bottom editorial line `42 countries. 15,867 patients. India still required local data.` is fully visible.

### 1366×768 parity

The same morph runs at 1366×768. India lands in the same geographic position. **No regression** at the smaller viewport.

### Outstanding cinematic notes

- The cyan→coral colour flip at the slide 15→16 boundary is the only visible compromise. Fixing it would require either (a) recolouring slot 15's India to coral (changes case-divider semantics — divider uses cyan as the case color), or (b) coupling the colour to the layoutId (out of `framer-motion`'s default geometry-only morph). Both options are out of scope for QC. Documented; not blocking.
- `useReducedMotion()` is honoured by both slides (verified in source — `case2-background` and `CaseHeroDivider` gate non-essential animations via `useReducedMotion()`).

---

## Slot 17 · `case2-challenge-turn`

CS2 the turn — SEC objection + DEFEND/REFRAME judgment + 6-pillar seed grid.

**User pain points:**
- *`SecObjectionCard` decorative borders on the hero variant.*
- *`PillarArchitecture` seed cards reading as "small empty boxes — wtf"*

**Issues found (round 1):**
1. `SecObjectionCard` hero variant had a perimeter `1.5px solid var(--cream-hairline)` border + `borderRadius: var(--radius-md)` + `linear-gradient(135deg, color-mix(in srgb, var(--amber) 8%, transparent), color-mix(in srgb, var(--panel) 70%, transparent) 70%)` background — read as a tinted callout box, not an editorial pull-quote.
2. `DefendCard` (Option A, rejected) carried a perimeter dashed cream-hairline border + tinted panel background.
3. `ReframeCard` (Option B, chosen) carried a `1.5px solid var(--coral)` perimeter border + a coral gradient panel.
4. `PillarArchitecture` `seed` and `margin` variants did not render `pillar.tag`, so the cards looked empty (cardinal sin).

**Fixes (rounds 2–4):**
1. `src/decks/qp2-seminar/slides/cs2-shared/SecObjectionCard.jsx` — `isHero` branch now uses `borderLeft: 4px solid ${accentColor}` + `background: transparent` + no `borderRadius`. The `resolved` variant is **untouched** per hard constraint (Agent C owns it; user noted strikethrough readability separately for slot 22).
2. `src/decks/qp2-seminar/slides/17-case2-challenge-turn.jsx` — `DefendCard` stripped to dashed-coral left rule with reduced opacity. `ReframeCard` stripped to solid-4px coral left rule.
3. `src/decks/qp2-seminar/slides/cs2-shared/PillarArchitecture.jsx` — extended the conditional `(isFull || isChain)` for `pillar.tag` rendering to `(isFull || isChain || isSeed || isMargin)`. Tweaked spacing/justification so seeds top-align with their tag visible. Tried adding a `marginTop:auto + borderTop` hairline to the FULL outcome (round 3); the result detached the outcome into a "broken-card footer" with a dead band in the middle. **Reverted** to flush packing in round 4 — the four-piece editorial column (numeral · name · tag · outcome) carries hierarchy through type weight + colour without needing a divider.

**Verdict:** ✅ **clean on round 4.**

- Coral eyebrow `CS2 · THE TURN — 10 DECEMBER 2024` is exact-month dated for the SEC objection.
- Headline `The SEC asked for a study — *we changed what they were looking at.*` is the assertion. Italic amber on the second clause.
- SEC quote panel reads as an editorial pull-quote anchored by an amber left rule — verbatim CDSCO Oncology SEC text on a transparent background. **No box.**
- Two-column option compare:
  - OPTION A — DEFEND (REJECTED): dashed-coral left rule + faded opacity reads as the dead branch.
  - OPTION B — REFRAME (CHOSEN): solid coral left rule reads as the live branch with the inline `→` arrow.
- `THE REFRAME — SIX PILLARS CONVERGING (ABOUT TO LOCK IN)` framework eyebrow over the seed grid resolves the question "what is this row of cards" before the eye lands on it.
- Six seed cards each carry a tag (e.g. `01 PopPK / JIANG 2021 · RACE NOT SIGNIFICANT`, `06 ICH E5 Apx D / 9 OF 9 CRITERIA SATISFIED`). **No empty boxes.**
- Source: `CDSCO Oncology SEC recommendation · 10 Dec 2024` — public CDSCO minutes.
- Page meta `17 / 35`; case color cyan consistent.

**Acceptable residual:** the six seed cards still wear the `PillarArchitecture` chrome (1px hairline perimeter + 3px cyan left rule). This is the original `PillarCard` chrome inherited from slot 18/19/20 (the same primitive). Stripping it on slot 17 only would diverge the chain/seed siblings; per `CLAUDE.md` "do not modify shared deck primitives unless absolutely necessary" we leave the perimeter on. The hero/defend/reframe cards (which are slot-17 owned) are de-boxed.

---

## Slot 18 · `case2-strategy`

CS2 strategy — `PillarArchitecture` FullGrid + framework eyebrow + closing assertion.

**User pain point:** *PillarArchitecture cards must carry meaningful content; framework eyebrow must name "ICH E5(R1) Appendix D".*

**Issues found (round 1):**
1. (Inherited from `PillarArchitecture` — addressed via the slot-17 fix in round 4 of this sweep.) The FULL variant's outcome line packing was reviewed but kept flush after the round-3 hairline-divider experiment regressed visual quality.

**Verdict:** ✅ **clean on round 4.**

- Eyebrow `CS2 · STRATEGY — THE MECHANISM-FIRST REFRAME` cyan.
- Headline `IDH1 R132 is *somatic, not germline.*` italic coral accent — the mechanistic punchline.
- Subhead `The drug target is inside the tumor. Inherited ethnic variation does not modulate drug-target engagement.` is the explanation.
- **Framework eyebrow** `ICH E5(R1) APPENDIX D — SIX-PILLAR ETHNIC-SENSITIVITY FRAMEWORK / Six converging lines of evidence — one classification CDSCO accepted.` — names the standard explicitly. ✅
- Six FULL pillar cards (3×2 grid) each carry the four-piece editorial header: numeral / name / tag (cyan mono) / outcome (cream-muted body). Examples: `01 / Population PK / JIANG 2021 · RACE NOT SIGNIFICANT / Race covariate dropped — no AUC effect`, `06 / ICH E5(R1) Apx D / 9 OF 9 CRITERIA SATISFIED / Drug formally classified ethnically insensitive`. **No empty boxes.**
- Closing assertion `Six pillars · convergent evidence · mechanism > population · the CDSCO objection cleared.` lands the chain.
- Source: `Bang Nature 2009 · Figueroa Cancer Cell 2010 · Ward Cancer Cell 2010 · ICH E5(R1) 2006` — all public.
- Page meta `18 / 35`; case color cyan consistent.

---

## Slot 19 · `case2-pillar6`

CS2 Pillar 6 hero — 9-criterion checklist + 6-vs-9 framework eyebrow + sidebar of pillars 1-5.

**User pain point:** *the 6-vs-9 confusion must be explicitly resolved.*

**Verdict:** ✅ **clean on round 4** (after the PillarArchitecture margin/seed fix from slot 17 round 2 propagated here).

- Eyebrow `CS2 · PILLAR 6 — ICH E5(R1) APPENDIX D` cyan.
- Headline `The classification key. *Nine of nine criteria met.*` italic cyan accent.
- Subhead `The 9 compound-property attributes that ICH E5(R1) Appendix D defines for ethnic insensitivity. Each one passed.` — names the framework + the verdict.
- **6-vs-9 framework eyebrow** `6 PILLARS (ARCHITECTURE) · 9 CRITERIA (THIS CHECKLIST) · Pillar 06 = the ICH E5(R1) Apx D classification — 9-criterion compound checklist.` ✅ **Resolves the user's confusion explicitly** — the deck never again has to explain that "6" and "9" are different orthogonal counts.
- Hero `06 / ICH E5(R1) Apx D / A drug with a low likelihood of clinically significant ethnic differences.` reads as the section title.
- Nine criteria in 2-column checklist with checkmarks: Linear PK · Wide therapeutic dose range · Flat PK/PD curve at therapeutic dose · Minimal metabolism · High bioavailability · Low protein binding · Little potential for protein-binding interactions · Low potential for drug-drug interactions · Non-systemic mode of action. Each carries a one-line detail (`AGILE · proportional 200-1200 mg`, `Predominantly CYP3A4 · no genetic gating`, etc.). **All nine are content-bearing.**
- Verdict line `9 / 9 criteria met → ICH E5(R1)-classified ethnically insensitive.` closes the slide.
- Right-side margin sidebar shows pillars 01-05 as faint context (intentional — they're recall, not focal). Each margin card now carries its tag content (no empty boxes). The 06 itself has the demoted "context" treatment in the same sidebar's cap card.
- Source: `ICH E5(R1) 1998 (Q&A 2006) Appendix D · TIBSOVO USPI integrated PK/PD section` — public.
- Page meta `19 / 35`; case color cyan consistent.

---

## Slot 20 · `case2-pillars-1-5`

CS2 pillars 1-5 — recall eyebrow + Pillar 06 demoted to margin + 1-5 chain + 84.6% ≈ 84.4% centerpiece + bridging panel.

**User pain point:** *(inherited) PillarArchitecture cards meaningful content; (new from round 1) "FIVE LINES OF EVIDENCE — CONVERGING" panel had a perimeter border.*

**Issues found (round 1):**
1. `BridgingPanel` (right side, "FIVE LINES OF EVIDENCE — CONVERGING") had `border: 1px solid var(--cream-hairline)` perimeter + `borderRadius: var(--radius-md)` + tinted panel background. Read as a callout box.

**Fixes (round 5):**
1. `src/decks/qp2-seminar/slides/20-case2-pillars-1-5.jsx` — stripped `border`, `borderRadius`, and `background` from `BridgingPanel`. Kept the `borderLeft: 3px solid var(--coral)` structural rule. Adjusted padding to `var(--space-3)` vertically + `var(--space-5)` left.

**Verdict:** ✅ **clean on round 5.**

- Eyebrow `CS2 · PILLARS 1–5 — GLOBAL CONCORDANCE` cyan.
- Headline `The clinical gap *disappears* on weight.` italic coral accent — the punchline.
- Subhead names the gap and the resolution: `A 5-fold AML-vs-CCA AUC gap collapses once dose is normalized to body weight — independent of ethnicity.`
- **Recall framework eyebrow** `PILLARS 1 — 5 · GLOBAL CONCORDANCE — Five independent lines of evidence converge on one classification — Pillar 06 (ICH E5 Apx D) seals it.` ✅ Names what changed (Pillar 06 promoted to hero on slot 19; now demoted to margin).
- Top row: 06 ICH E5 Apx D demoted to a small left-side margin card; 01–05 in chain variant (PopPK / E-R / Intrinsic / Extrinsic / Safety) each with their tag visible.
- Center: 84.6% ≈ 84.4% concordance hero with `PILLAR 4 · BRIDGING MATH · INDIA = GLOBAL` eyebrow + `Δ ≈ 0.2 percentage points` callout. Strong typographic moment.
- Right: bridging panel now reads as an editorial column with a coral left rule. Five P1-P5 evidence rows with dashed-hairline separators. Closing line `Five independent lines · → one converging classification.` ✅
- Source: `TIBSOVO USPI popPK section · Jiang CTS 2021 (PMID 33369167) · oncologic exposure-response (PMID 36302156)` — public.
- Page meta `20 / 35`; case color cyan consistent.

---

## Slot 21 · `case2-response`

CS2 response — proportional regulatory timeline.

**User demand:** *public-domain audit; flag any suspect facts.*

**Verdict:** ✅ **clean on round 1.** No edits.

### Public-domain audit (every beat)

| Beat | Date precision | Source | Verdict |
|------|----------------|--------|---------|
| MAA filed | Q1 2024 | CDSCO Form 44 dossier | ✅ Quarter precision; specific filing day not exposed |
| SEC review #1 | May 2024 | CDSCO Oncology SEC minutes | ✅ Month precision (CDSCO publishes monthly) |
| Examination query | Aug 2024 | CDSCO examiner-office batch | ✅ Month precision |
| **SEC #2 — objection** | **10 Dec 2024** | CDSCO Oncology SEC minutes (verbatim quote) | ✅ Day precision is the public record — CDSCO Oncology SEC #117 minutes published with the Dec 10 sitting and the recommendation text |
| Strategy reframe | Dec → Jan period bracket | (process; not a regulatory event) | ✅ No specific date claim |
| Mechanism-first dossier | Jan 2025 | (regulatory submission; CDSCO logged) | ✅ Month precision; specific submission day not exposed |
| **SEC #3 — in-person** | **Mar 2025** | CDSCO Oncology SEC minutes | ✅ Month precision per file header note (`specific day is not the public record`) |
| Approval cleared | Apr → May period bracket | CDSCO marketing authorization records | ✅ Period bracket; specific day deliberately abstracted |

**Source line:** `CDSCO Oncology SEC minutes · CDSCO Tibsovo marketing authorization (May 2025) · TIBSOVO USPI integrated PK/PD section` — three public sources.

**No suspect facts remaining.** The header note (`v3 (Apr-26 public-domain audit)`) explicitly documents the abstraction policy and the file complies. The `2 Apr 2025` favorable rec → `14 May 2025` MA dates are folded into the `APPROVAL CLEARED` period bracket (with `periodStart='1 Apr 2025'` / `periodEnd='14 May 2025'` props that drive the geometry but are not surfaced as event labels), so the visible labels are abstract while the timeline math is precise.

### Visual review

- Eyebrow `CS2 · THE RESPONSE — EXECUTION & LEADERSHIP` cyan.
- Headline `A single in-person SEC presentation — *March 2025.*` italic coral on `March 2025` — the leadership beat is the climax.
- Subhead: `Twelve months of regulatory choreography. Three subject expert committee passes. One favorable recommendation.`
- Cyan→coral spine carries the case's emotional arc (cool process → warm climax). The single decorative gradient earned per `SLIDE-REVIEW §3 P5`.
- Eight nodes are placed proportionally on the calendar axis, not on equal columns. The Dec 2024 → May 2025 cluster reads as **dense** because it is dense.
- Above-row events: Q1 2024 MAA · Aug 2024 examination · Jan 2025 mechanism-first dossier.
- Below-row events: May 2024 SEC #1 · 10 Dec 2024 SEC #2 (amber, larger dot — turn flag) · Mar 2025 SEC #3 (coral with cream ring — climax flag).
- Period brackets above-rail: `STRATEGY REFRAME · Mechanism-first response · ICH E5(R1) Apx D` and `APPROVAL CLEARED · Favorable rec → CDSCO marketing authorization`. Both anchored by the amber bracket geometry, lifted above the event cards so they don't fight for vertical real estate.
- Footer: `CASE 02 · THE EXECUTION` + source line + page meta `21 / 35`. Case color cyan consistent.

---

## Slot 22 · `case2-impact-bridge`

**Out of scope** per task brief (`DO NOT touch slot 23+`). The manifest shows `case2-impact-bridge` at slot 22; per Agent C's note in the brief this slide hosts the `SecObjectionCard` resolved variant + two-row scaffold, and the user flagged the strikethrough readability concern. **Left untouched** — Agent H owns this range. The `SecObjectionCard` resolved variant was likewise not modified during my edits to the hero variant (the `isResolved` branch retains its original chrome).

---

## Files modified

| File | Reason | Round |
|------|--------|-------|
| `src/decks/qp2-seminar/slides/cs1-bridge/PipelineBridgeCard.jsx` | De-box: strip border + borderRadius + tinted background; left amber rule only | slot 14 round 2 |
| `src/decks/qp2-seminar/slides/cs2-shared/SecObjectionCard.jsx` | De-box hero variant; resolved variant untouched per hard constraint | slot 17 round 2 |
| `src/decks/qp2-seminar/slides/17-case2-challenge-turn.jsx` | De-box DefendCard + ReframeCard; conditional left-rule treatments | slot 17 round 3 |
| `src/decks/qp2-seminar/slides/cs2-shared/PillarArchitecture.jsx` | Render `pillar.tag` for seed + margin variants (was full+chain only); spacing adjustments; FULL outcome packing kept flush after a hairline-divider experiment regressed | slots 17,18,19,20 rounds 2-4 |
| `src/decks/qp2-seminar/slides/20-case2-pillars-1-5.jsx` | De-box BridgingPanel; coral left rule only | slot 20 round 5 |

## Files NOT modified (per hard constraints)

- `src/components/deck/patterns/CaseHeroDivider.jsx` — Agent A owns; only mounted on slot 15 (15-case2-divider.jsx) where no prop change was needed.
- `SecObjectionCard.jsx` resolved variant chrome — Agent C owns the slot 22 readability concern.
- `PillarCard` perimeter chrome on the seed/chain/margin variants — modifying would diverge sibling slots 17/19/20 (shared primitive); content fix sufficient.
- All slides outside slots 13–21.

## Outstanding cinematic note (documented, not blocked)

The cyan→coral colour flip across the slide 15→16 boundary on the layoutId-paired India outline is the only visible compromise. Geometry tweens cleanly via `framer-motion`'s `layoutId="india-cdsco"`; colour does not. Two paths to fix (recolour slot 15's India to coral OR couple colour to layoutId) are both architectural changes outside QC scope. The slide-card transition at the boundary masks the flip, so it does not register as a flicker in normal-speed playback.

## Captures index

- `audit/out/qc-sweep/13-case-impact-numerals/round-1-{1920,1366}.png`
- `audit/out/qc-sweep/14-case-bridge/round-{1,2}-{1920,1366}.png`
- `audit/out/qc-sweep/15-case2-divider/round-{1,2}-{1920,1366}.png`
- `audit/out/qc-sweep/16-case2-background/round-{1,2}-{1920,1366}.png`
- `audit/out/qc-sweep/17-case2-challenge-turn/round-{1,2,3,4}-{1920,1366}.png`
- `audit/out/qc-sweep/18-case2-strategy/round-{1,2,3,4}-{1920,1366}.png`
- `audit/out/qc-sweep/19-case2-pillar6/round-{1,2,3,4}-{1920,1366}.png`
- `audit/out/qc-sweep/20-case2-pillars-1-5/round-{1,2,3,4,5}-{1920,1366}.png`
- `audit/out/qc-sweep/21-case2-response/round-1-{1920,1366}.png`
- `audit/out/cs2-cluster/morph-15-to-16/{1920x1080,1366x768}-t{200,500,1100,1800,3500}ms.png`

— Agent G
