/**
 * qp2-seminar-v2 — static speaker notes per slide.
 *
 * Mirrors the qp2-seminar/notes.js shape. Add a keyed markdown entry
 * each time a slide is added to ./manifest.js.
 *
 * Keys MUST match slides[].id. Empty string = "no static note yet";
 * presenter pane shows its placeholder and the live editor still works.
 * Live edits autosave through useSpeakerNotes and override these
 * per-session — ship-of-truth lives in this file.
 *
 * Supported markdown: **bold** · *italic* · ==highlight== (case color),
 * # H1 · ## H2 · ### H3, - bullets, 1. ordered, > blockquote.
 */

const notes = {
  'title-kinetic': ``,

  'case-divider': `## CS1 divider · Ambrisentan in pediatric PAH

This divider transitions from framework into execution:

> *"For our first case, we apply the same framework to ambrisentan in pediatric PAH — where a traditional efficacy trial was not feasible, and model-informed extrapolation became the primary path."*`,

  'case-background': `## CS1 background · one pathway drives the disease · one antagonist blocks it

==Headline:== orient on mechanism only. This slide is pre-trial and pre-model.

### Delivery beat

> *"PAH in children converges on endothelin signaling at the pulmonary vasculature — vasoconstriction and remodeling."*
>
> *"Ambrisentan is a selective ETA antagonist. Same target, same biology, across age groups. That similarity is the premise for extrapolation."*

### What to land

- **Disease logic** — endothelin-1 → ETA → vasoconstriction/remodeling
- **Drug logic** — selective ETA blockade
- **Bridge forward** — mechanism similarity is what allows efficacy extrapolation later`,

  'case-challenge': `## CS1 challenge · why the standard trial paradigm fails

==Assertion:== pediatric PAH demands an alternative to traditional efficacy trials.

### Delivery beat

> *"Pediatric PAH is rare, heterogeneous, and life-threatening."*
>
> *"A large randomized placebo-controlled efficacy trial is practically impossible and ethically indefensible once effective adult therapies already exist."*

### What to land

- **Rarity** — recruitment and power are structurally constrained
- **Ethical wall** — placebo withhold is not defensible
- **Implication** — the paradigm cannot run; alternate evidence architecture is required`,

  'case-precedents': `## CS1 precedents · trauma + template

==Assertion:== the regulatory lane was shaped by sildenafil risk and bosentan precedent.

### Delivery beat

> *"Sildenafil STARTS-2 changed risk tolerance: high-dose mortality signal made empirical pediatric dosing unacceptable."*
>
> *"Bosentan then showed regulators would accept PK bridging to adult exposure, if safety remained acceptable."*

### What to land

- **Sildenafil** — cautionary signal, avoid empirical scaling
- **Bosentan** — executable regulatory pattern
- **Synthesis** — model-informed exposure matching becomes the viable route`,

  'case-strategy': `## CS1 strategy · three decisions before estimation

==Assertion:== strategy had to survive review before code ran.

### Delivery beat

> *"We locked three decisions first: anchor to adult structure, constrain allometric exponents, and keep covariates parsimonious."*
>
> *"This separated regulatory logic from implementation detail, and prevented overfitting sparse pediatric data."*

### Decision map

- **Decision 01 — Anchor**: integrate adult foundation with pediatric sparse data
- **Decision 02 — Constrain**: fix CL∝WT^0.75 and V∝WT^1.0
- **Decision 03 — Parsimony**: retain only covariates with durable signal`,

  'case-strategy-evidence': `## CS1 strategy evidence · diagnostics by decision

Use this as the visual companion to the prior strategy slide.

### Delivery beat

> *"Same three decisions, now shown with diagnostics: integration stabilizes estimation, fixed allometry protects identifiability, and covariate screening supports a parsimonious final model."*

### Narration discipline

- Keep to **one sentence per panel**
- Always map panel back to Decision 01/02/03
- Do not drift into trial-design logistics yet (next slide owns that)`,

  'case-trial-design': `## CS1 trial design · AMB112529

==Assertion:== trial design prioritized safety + PK characterization, not standalone efficacy.

### Delivery beat

> *"AMB112529 was a 24-week open-label pediatric trial with sparse PK sampling by design."*
>
> *"Endpoints centered on safety/tolerability and PK data generation to power the PopPK bridge."*

### What to land

- Open-label, sparse-sampling constraints are intentional
- Trial is **model-feeding infrastructure**
- This is the data substrate for the next slide's model build`,

  'case-build': `## CS1 build · population PK model

==Assertion:== allometric scaling adequately described pediatric disposition.

### Delivery beat

> *"We used a two-compartment PopPK model with fixed allometric exponents and sparse-data-aware estimation."*
>
> *"Body weight emerged as the only robust predictor under this architecture."*`,

  'case-fit-bridge': `## CS1 fit + bridge · model validity then exposure bridge

### Delivery beat

> *"First, fit: observed behavior sits inside model expectation bands."*
>
> *"Second, bridge: pediatric steady-state exposure lands inside the adult therapeutic envelope."*

### What to land

- Fit is acceptable for decision use
- Exposure matching criterion is satisfied
- This enables efficacy extrapolation argument`,

  'case-exposure-response': `## CS1 safety E-R · flat relationship

### Delivery beat

> *"Across observed exposure range, safety events do not show a dose-exposure toxicity gradient."*
>
> *"Higher exposure does not separate into a distinct adverse-event cluster."*`,

  'case-impact-numerals': `## CS1 impact · regulatory outcome

### Delivery beat

> *"The PopPK bridge served as primary evidence for pediatric approvals in major ex-U.S. regions."*
>
> *"This is a case where the model crossed from analysis artifact to regulatory evidence."*`,

  'case-geography': `## CS1 geography · why U.S. label differs

### Delivery beat

> *"Geographic label differences here are driven by filing strategy and commercial rights, not by a model failure."*

Use this as context, not as core scientific proof.`,

  'case-bridge': `## CS1 bridge forward · methodology transfer

### Delivery beat

> *"The ambrisentan approach became a template for later PAH pediatric programs and aligns with the formalized ICH E11A direction."*`,

  'case-recap': `## CS1 recap · framework themes exercised

### Delivery beat

> *"This case exercised the same recurring judgments from the framework: evidence architecture, extrapolation logic, model credibility, and regulatory translation."*`,
};

export default notes;
