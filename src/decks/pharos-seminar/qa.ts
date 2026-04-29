/**
 * V5-Pharos — anticipated / rehearsed Q&A per slide.
 *
 * Counterpart to ./notes.ts. Where notes.ts is "what I say while
 * the slide is up", qa.ts is "questions I expect from the audience
 * AND my prepared answers, ready to reuse if the same one comes up
 * later in the talk".
 *
 * Keys MUST match `slides[].id` in `./manifest.ts`.
 * Values are markdown strings using the same syntax as notes:
 *   • **bold** · *italic* · ==highlight== (uses --case color)
 *   • ## H2 · ### H3
 *   • - bullets · 1. ordered · > blockquote
 *
 * AnticipatedQAPane counts `## Q` occurrences to surface
 * "Q&A · N items" in the section header.
 */

const qa: Record<string, string> = {

  '02-hook': `## Q1: Why didn't you just integrate into an existing system instead of building from scratch?
**From:** anyone (panel challenge)
**Difficulty:** ★★ · **Topic:** architecture

A: Because the problem isn't a missing feature — it's a ==missing foundation==. Existing systems solve individual stages well. What doesn't exist is the shared infrastructure — privacy wall, audit chain, coordinated SOPs — that every stage needs. You can't bolt a foundation onto a rooftop.

> **If pressed:** Apollo-AI is the closest. It covers three of seven MIDD stages, and its architecture doesn't include structural privacy or cryptographic audit. Extending it to end-to-end would require rebuilding its core — which is what Pharazi does from first principles.

## Q2: 180 models across 12 years — can you substantiate that number?
**From:** anyone (credibility check)
**Difficulty:** ★★ · **Topic:** career

A: Yes. Sixty-five PopPK models, eighty-two PKPD frameworks, thirty-three exposure-response submissions — across Merck, GSK, and Servier. The count includes every model that reached a regulatory submission or internal decision milestone. I'm happy to walk through the program-level breakdown.

> **If pressed:** The GSK portfolio alone included the ambrisentan pediatric PopPK accepted by EMA and PMDA, plus multiple oncology programs. Servier added ivosidenib and several rare-disease programs.`,


  '03-regulatory-floor': `## Q1: ICH M15 is Step 4 but not yet enforced — isn't this premature?
**From:** regulatory-aware panelist
**Difficulty:** ★★★ · **Topic:** regulatory

A: Step 4 means the text is ==finalized and adopted by member regulatory authorities==. EU enforcement date is July 23, 2026 — eighteen months from the January adoption. FDA typically aligns within a similar window. The question isn't whether M15 applies — it's whether your infrastructure is ready ==when it does==.

> **If pressed:** Step 4 adoption is the trigger for industry implementation. The 18-month implementation period is standard for ICH guidelines. Companies that wait for enforcement to start building will be 18 months behind.
> **Verbatim:** ICH M15 Step 4: 29 Jan 2026. EU effective: 23 Jul 2026.

## Q2: The FDA draft guidance is still draft — why cite it as a forcing function?
**From:** anyone
**Difficulty:** ★★ · **Topic:** regulatory

A: Fair point — it's draft. But the ==joint FDA-EMA principles== from January 2026 are not draft. And M15 is Step 4 finalized. The draft guidance establishes the review framework; the joint principles and M15 establish the requirements. All three together create the regulatory floor.

> **If pressed:** FDA has signaled repeatedly that the draft guidance reflects their intended review approach. The public comment period closed and revisions are expected to align with the joint principles.`,


  '04-market-moving': `## Q1: Apollo-AI covers three stages — how do you know Pharazi will cover all seven?
**From:** anyone (skeptic)
**Difficulty:** ★★★ · **Topic:** architecture

A: Because ==the architecture is stage-agnostic==. The five design principles — hierarchy, privacy, audit, SOPs, orthogonal layering — don't change when you add a new domain. Apollo covers NCA, PopPK, and E-R within a Pfizer-specific stack. Pharazi covers those same three today plus regulatory text generation and end-to-end audit lineage. Each new domain is a ==registered expert==, not a new system.

> **If pressed:** The working system already demonstrates NCA and PopPK with full audit. Adding PBPK or QSP means registering new L2 experts and an SOP — the infrastructure is identical.
> **Anchor:** Stage-agnostic architecture

## Q2: Why isn't Pumas-AI in your comparator analysis more prominently?
**From:** anyone familiar with pharmacometrics tooling
**Difficulty:** ★★ · **Topic:** software

A: Pumas is excellent for model fitting — DeepPumas, AskPumas, PumasAide are strong add-ons. But they're ==Pumas-bound==. The AI features work within the Pumas ecosystem, covering two of seven stages. Pharazi is tool-agnostic — it orchestrates R, Python, Julia, or Pumas as computation engines behind the privacy wall.

> **If pressed:** We actually see Pumas as a potential computation engine inside Pharazi's L2 expert layer. They complement, not compete.`,


  '05-gap': `## Q1: "The MIDD foundation is unbuilt" — isn't that an arrogant claim?
**From:** anyone (pushback on thesis)
**Difficulty:** ★★★★ · **Topic:** methodology

A: It's a ==testable claim==. Show me a system that is simultaneously end-to-end across MIDD stages, structurally private with no PHI path to the LLM, cryptographically audited with a verifiable hash chain, and M15-aligned with versioned SOPs. I surveyed nine published systems. ==None meets all four criteria.== That's not arrogance — that's a gap analysis.

> **Hostile:** "I understand the claim sounds bold. I'm not saying the field has failed — I'm saying this specific combination of requirements hasn't been architectured yet. The survey is in the manuscript."
> **Anchor:** Testable claim · four criteria`,


  '07-principle1': `## Q1: Why centralized and not distributed? Doesn't centralization create a single point of failure?
**From:** anyone with distributed-systems background
**Difficulty:** ★★★ · **Topic:** architecture

A: The Kim et al. 2025 data answers this directly. Distributed multi-agent systems amplify errors ==17× as scope grows==. Centralized hierarchies contain that to 4×. In regulated pharma, ==silent error amplification is the existential risk==, not single-point availability. And the orchestrator is stateless — it routes, it doesn't compute. If it goes down, nothing is lost. If an expert hallucinates in a distributed system, the error propagates.

> **If pressed:** We have redundancy at the infrastructure level — the orchestrator is a stateless function behind a load balancer. The hierarchy is logical, not physical.
> **Verbatim:** Kim et al. arXiv:2512.08296, Dec 2025. 17.2× distributed, 4.4× centralized.

## Q2: How do you prevent the orchestrator from becoming a bottleneck as you scale?
**From:** engineering-minded panelist
**Difficulty:** ★★★ · **Topic:** architecture

A: The orchestrator does ==routing only — zero tools, zero computation==. Average routing time is 3.2 seconds. As domain experts multiply, the orchestrator's job doesn't get harder — it just routes to more endpoints. The managers handle domain-specific review. Throughput scales horizontally at the expert layer.

> **If pressed:** We've benchmarked up to 50 concurrent expert calls with no degradation in routing latency. The bottleneck is always in computation, never in routing.`,


  '08-principle2': `## Q1: How do you handle scenarios where the LLM needs patient-level context to make a good analytical decision?
**From:** clinical pharmacologist
**Difficulty:** ★★★★ · **Topic:** ai-ml

A: The LLM never needs ==raw patient-level data== to make analytical decisions. It receives ==sanitized schema== — column names, data types, summary statistics, structural descriptions. The Schema Extractor produces this with zero LLM calls. The LLM decides which analysis to run and how to parameterize it. The computation engine, behind the privacy wall, executes on the actual data.

> **If pressed:** Think of it like a radiologist's report versus the raw DICOM image. The LLM reads the report — structure, statistics, schema — and prescribes the analysis. The raw data never leaves the computation sandbox.
> **Anchor:** Schema, not data

## Q2: What about federated learning or differential privacy approaches?
**From:** data science panelist
**Difficulty:** ★★★ · **Topic:** ai-ml

A: Those are complementary techniques for ==model training==. Pharazi's structural privacy addresses a different problem — ==inference-time data exposure==. During a Pharazi run, no raw data reaches the LLM at any point. If you wanted to train a Pharazi expert using federated learning, the privacy wall would still apply during inference.

> **If pressed:** Differential privacy adds noise to protect individuals in aggregated outputs. Our architecture goes further — the LLM never sees even the aggregated patient data directly. It sees schema and summary statistics.`,


  '09-principle3': `## Q1: How is this different from just using a database audit log?
**From:** IT/compliance-aware panelist
**Difficulty:** ★★★ · **Topic:** software

A: A database audit log records events. Our hash chain ==cryptographically binds== them. Each block carries the SHA-256 hash of the previous block. If any entry is altered — even one character — ==every downstream hash changes==. A database log can be silently modified by an admin. Our chain cannot be modified without detection.

> **If pressed:** This is the same principle behind git commit integrity and certificate transparency logs. It's well-established cryptography applied to regulatory audit.
> **Anchor:** Bind, not log

## Q2: Has this been validated against a real 21 CFR Part 11 audit?
**From:** regulatory affairs
**Difficulty:** ★★★★ · **Topic:** regulatory

A: Not yet by a regulatory inspector — the system deployed in April 2026. But the architecture was ==designed to satisfy §11.10(c) requirements==: audit trail entries are computer-generated, timestamped, and independently verifiable without depending on the system that created them. The two-function-call verify is designed for inspector workflows.

> **Hostile:** "We haven't had an inspection yet. What I can say is that the chain is designed for inspectability — the verify function works offline, on exported data, without needing the running system."
> **Anchor:** Designed for inspectability`,


  '10-principle4': `## Q1: How do you handle SOP versioning when a running analysis needs to switch mid-stream?
**From:** pharmacometrician
**Difficulty:** ★★★ · **Topic:** methodology

A: ==You don't switch mid-stream.== An analysis runs against a pinned SOP version — it's hash-anchored at initiation. If a newer SOP version exists, it's available for the next run. The audit chain records which SOP version was used. Reproducibility means ==the same SOP version produces the same result==, regardless of what's been updated since.

> **If pressed:** Think of it like a git tag on a release. You can branch and develop v2.0 while v1.5 is still running in production. The hash ensures you know exactly which version produced each result.

## Q2: Who writes the SOPs — humans or the AI?
**From:** anyone
**Difficulty:** ★★ · **Topic:** methodology

A: ==Humans author SOPs.== The AI executes them. The marketplace will accept community-contributed SOPs, but each goes through a review and merge process — just like a pull request. The system enforces version control, but ==domain expertise stays with the scientist==.

> **If pressed:** An AI could draft an SOP template, but the scientific judgment — which covariates to test, which diagnostics to require — that's human. Always.`,


  '11-principle5': `## Q1: What stops the shared infrastructure from becoming too rigid as domains multiply?
**From:** senior architect or engineering leader
**Difficulty:** ★★★★ · **Topic:** architecture

A: The shared layer is deliberately ==thin and generic==. Schema extraction, hash-chain audit, QC debate protocol, manager review, state bus — these are domain-agnostic by design. They don't encode pharmacology; they encode ==process discipline==. A signal detection expert and an NCA expert both need their outputs hashed and QC'd. They don't need the infrastructure to understand what a covariate is.

> **If pressed:** If we ever find a domain that requires a structural change to the shared layer — say, a new kind of QC protocol — that's a versioned infrastructure upgrade, not a domain-specific fork. It's the same pattern as a kernel upgrade: rare, deliberate, backward-compatible.
> **Anchor:** Thin and generic

## Q2: How many domains have you actually tested beyond NCA and PopPK?
**From:** anyone (validation probe)
**Difficulty:** ★★★ · **Topic:** methodology

A: Today, ==NCA and PopPK are fully deployed== with complete audit trails. PKPD and exposure-response are in development — they share the same data flow and audit infrastructure. The architectural claim is that adding a domain means registering a new expert and SOP. The working system validates that pattern.

> **If pressed:** Two domains fully deployed, two in development, nine more on the roadmap (phases 2–3 on the slide). The architecture doesn't change — only the expert registry grows.`,


  '12a-working-overview': `## Q1: What LLM powers the orchestrator?
**From:** AI/ML panelist
**Difficulty:** ★★ · **Topic:** ai-ml

A: The orchestrator currently uses ==Claude== for routing and intent parsing. But the architecture is ==model-agnostic==. The orchestrator's job is classification and routing — any sufficiently capable LLM can serve that role. The computation happens in R and Python behind the privacy wall, with zero LLM involvement.

> **If pressed:** We've tested with GPT-4 and Claude. Routing accuracy is comparable. The choice is operational — we use whichever gives the best latency and cost profile.

## Q2: What's the latency for a full NCA run end-to-end?
**From:** anyone (practical)
**Difficulty:** ★ · **Topic:** software

A: Routing takes about ==3.2 seconds==. The NCA computation itself depends on dataset size — for the reference dataset, about 8 seconds. QC vote adds ~5 seconds. Audit anchoring is <1 second. Total: ==under 20 seconds== for a standard NCA with full audit.

> **If pressed:** That's for a reference dataset of ~400 subjects. Larger datasets scale linearly in the computation layer — the routing and audit overhead stays constant.`,


  '12b-working-audit': `## Q1: These are simulated reference numbers — when will you have real clinical data running through?
**From:** clinical development leader
**Difficulty:** ★★★ · **Topic:** clinical-design

A: The system is ==production-deployed== and technically ready for real clinical data today. The reference numbers demonstrate the full pipeline: ingestion, NCA, QC, audit. Running real clinical data requires a ==data governance agreement== with a sponsoring organization — that's an institutional decision, not a technical limitation.

> **If pressed:** The privacy architecture was specifically designed for real PHI — structural isolation, AES-256 at rest, no LLM exposure. The pipeline is waiting for the data, not the other way around.
> **Anchor:** Technically ready; institutionally pending`,


  '13-component-nca': `## Q1: You claim 0.1% match to PKNCA — what's the validation methodology?
**From:** pharmacometrician
**Difficulty:** ★★★ · **Topic:** methodology

A: We ran ==identical datasets== through both Pharazi's NCA engine and PKNCA (the R gold-standard package). Compared AUC, Cmax, t½, CL/F, Vd/F across 412 subjects. Maximum deviation: ==0.1 percent==. The difference is rounding precision in the trapezoidal integration — both implementations are correct.

> **If pressed:** The validation report is in the manuscript supplement. Every parameter comparison is tabulated with both values and the percent difference. We use the same trapezoidal rule — linear-up/log-down — as PKNCA.
> **Verbatim:** 0.1% maximum deviation. 412 subjects. Linear-up/log-down trapezoidal.`,


  '15-component-audit': `## Q1: What happens if the system itself is compromised — can an attacker modify both the data and the hash chain?
**From:** security-aware panelist
**Difficulty:** ★★★★ · **Topic:** software

A: If an attacker has root access to the system, yes — they could theoretically recompute the entire chain. That's why the architecture supports ==chain export and offline verification==. Audit snapshots can be exported to external storage at any checkpoint. An inspector verifies against the exported snapshot, not the running system.

> **If pressed:** This is the same trust model as git — if you have the repo, you can rewrite history. But if someone cloned it earlier, the divergence is detectable. We export chain snapshots for exactly this reason.
> **Anchor:** Export and offline verify`,


  '16-poppk-dashboard': `## Q1: The waterfall shows simulated doses — how would this work with real covariate data?
**From:** pharmacometrician
**Difficulty:** ★★ · **Topic:** pk

A: Identically. The covariate strategy panel on the left accepts ==any covariate matrix==. The 200-subject simulation demonstrates the visualization and audit pipeline. With real data, the same covariates feed the same model — body weight, age, eGFR — and the waterfall reflects actual dose-exposure relationships.

> **If pressed:** The simulation uses realistic covariate distributions drawn from published population ranges. The pipeline doesn't distinguish simulated from real — it's the same code path.`,


  '18-regulatory-dashboard': `## Q1: How does Pharazi handle the "context of use" requirement from M15?
**From:** regulatory affairs
**Difficulty:** ★★★ · **Topic:** regulatory

A: Context of use maps directly to ==SOP versioning==. Each SOP declares its intended use — "dose selection for adults with renal impairment" or "pediatric extrapolation via allometric scaling." The SOP version, its hash, and its stated context of use are all recorded in the audit chain. An inspector can trace from the regulatory claim to the SOP to the analytical result.

> **If pressed:** M15 requires four things: context of use, model development documentation, evaluation, and communication of results. We map each to a specific architectural feature — SOP versioning, hierarchy + QC debate, audit chain, and report generation respectively.
> **Verbatim:** M15 four principles: context of use, development, evaluation, communication.

## Q2: Are you positioning this for NDAs or earlier-stage submissions?
**From:** regulatory strategy
**Difficulty:** ★★ · **Topic:** regulatory

A: ==Both.== The architecture doesn't change between IND and NDA — the audit chain anchors the same way. The timeline on screen shows pre-IND through NDA, including EMA scientific advice. The regulatory dashboard is designed for ==lifecycle use==, not single-submission snapshots.

> **If pressed:** In practice, the first use case is likely pre-IND modeling packages and scientific advice interactions, where the audit trail adds credibility early.`,


  '22-publication-close': `## Q1: What journal are you targeting and when is the expected submission?
**From:** anyone
**Difficulty:** ★ · **Topic:** career

A: ==CPT: Pharmacometrics and Systems Pharmacology== — the primary venue for MIDD methodology papers. Manuscript in preparation, target submission within the next quarter. The paper covers the reference architecture, the five design principles, and the validation results.

> **If pressed:** CPT:PSP was chosen because it reaches the exact audience — clinical pharmacologists, pharmacometricians, and regulators — who would evaluate and adopt this framework.

## Q2: Is the code open source?
**From:** anyone
**Difficulty:** ★★ · **Topic:** software

A: The ==reference architecture and framework documentation== are open at pharazi.ai and GitHub. The core orchestration engine is currently source-available — the code is visible, the methodology is published, and the audit chain specification is open. Full open-source licensing is on the roadmap pending the publication.

> **If pressed:** The audit chain specification and SOP format are designed to be open standards. The orchestration engine will follow once the peer review establishes the methodology.`,


  '22-5-closing-recap': `## Q1: You said eighteen months to a peer-reviewed paper — why so long?
**From:** anyone
**Difficulty:** ★★ · **Topic:** career

A: Eighteen months includes ==peer review, revision, and publication== — not just writing. The manuscript is in preparation now. Submission target is next quarter. The eighteen months is a realistic estimate for a methodological paper with validation data going through full peer review at a top-tier journal.

> **If pressed:** CPT:PSP review cycles typically run 3–6 months per round. Two rounds is standard for methodology papers of this scope.`,


  '23-qa': `## Q1: How would Pharazi integrate with a large pharma's existing infrastructure — SAP, Veeva, internal data lakes?
**From:** IT/operations leader
**Difficulty:** ★★★ · **Topic:** software

A: The privacy wall is the integration point. Data comes in from ==any source== — SAP, Veeva, LIMS, data lake — through the Schema Extractor, which produces sanitized metadata. The computation engine connects to the data source directly, behind the firewall. The LLM never sees the source system. Integration is a ==configuration task==, not an architecture change.

> **If pressed:** The Schema Extractor is designed as a pluggable adapter. We've tested with CSV, SAS datasets, and database connections. Adding a Veeva or SAP connector follows the same pattern — extract schema, pass to orchestrator, compute against source.

## Q2: What's your competitive moat if someone at Pfizer or Novartis builds something similar?
**From:** business-minded panelist
**Difficulty:** ★★★★ · **Topic:** commercial

A: Two moats. First, ==first-mover with a published reference architecture== — the peer-reviewed paper establishes the methodology. Second, the ==SOP marketplace== creates network effects: every community-contributed SOP makes the platform more valuable for everyone. A proprietary build at one company doesn't benefit the field.

> **Hostile:** "If Pfizer builds something better, that's great for the field. My goal is to establish the open standard that everyone — including Pfizer — can build on."
> **Anchor:** Published standard + marketplace network effects

## Q3: Why should Merck care about this for the Senior Director role?
**From:** hiring panel (the real question)
**Difficulty:** ★★★★★ · **Topic:** career

A: Because this demonstrates ==exactly the kind of strategic thinking the role requires==. Not just modeling — building the infrastructure that makes modeling reproducible, auditable, and scalable across a portfolio. Merck's QP2 needs someone who sees the regulatory horizon, builds the systems to meet it, and publishes the methodology that positions the department as a leader. That's what I do.

> **Verbatim:** "I build the infrastructure that makes the science reproducible. That's what this role needs."
> **Anchor:** Infrastructure builder`,

};

export default qa;
