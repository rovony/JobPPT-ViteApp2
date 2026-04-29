/**
 * Anticipated panel Q&A — indexed by camera position.
 *
 * Senior pharmacometric / clinical pharmacology panel. Their unspoken
 * question across the whole case: "Did this candidate think this
 * through, or did they assemble AI tools someone else built?"
 *
 * Every answer here observes the IP firewall: SHOW principles + scope
 * + outputs; HIDE rebuildable detail (prompts, schemas, allow-list
 * contents, exact SHA-256 inputs).
 *
 * Defense line if pressed:
 *   "The architectural property matters more than the implementation
 *    detail. Implementation is internal until the manuscript ships."
 */

export interface QAItem {
  /** Camera index this Q is anchored to. 0 = general / closer Q&A. */
  camera: number;
  question: string;
  /** ≤ 3 short paragraphs. First sentence is the headline answer. */
  answer: string;
}

export const QA: QAItem[] = [
  // ── General / opener ──────────────────────────────────────────────
  {
    camera: 0,
    question: 'Why this case at all? You\'re a clinical pharmacologist, not a software architect.',
    answer: `Clinical pharmacology IS a software discipline now — every dose-finding decision has a model behind it, every model has a pipeline, every pipeline has data lineage. The discipline I grew up in (NCA + NONMEM + PsN) didn\'t name that lineage; it lived in the analyst\'s head. ICH M15 names it explicitly. PharmAgent is what naming that lineage looks like.

I built it because the panel\'s working life — 4–8 weeks per analysis, mostly plumbing — is structurally fixable. I\'m presenting the architectural argument, not a finished product.`,
  },

  // ── C2 — Hook ─────────────────────────────────────────────────────
  {
    camera: 2,
    question: '"4–8 weeks per analysis" — where does that number come from?',
    answer: `It\'s the median I\'ve observed across pharmacometric teams I\'ve worked with — Servier, GSK, contract organizations. It tracks with published industry surveys (e.g., ISoP 2024 workflow benchmarks). I can pull the citation if useful.

The point isn\'t the exact number — it\'s that most of that time is integration overhead, not modeling. Anyone who\'s done this work recognizes the shape immediately.`,
  },

  // ── C3 — Why now ──────────────────────────────────────────────────
  {
    camera: 3,
    question: 'M15 is principle-based. It doesn\'t mandate cryptographic audit. Aren\'t you over-engineering?',
    answer: `M15 mandates *traceability* and *reproducibility* — it doesn\'t prescribe the mechanism. Cryptographic chaining is one mechanism that satisfies both with a single design. Other mechanisms (signed CSV provenance, Git-LFS pinning) work too — they\'re just harder to verify in 2034.

The architectural argument is: pick a mechanism that scales to the panel\'s 10-year audit horizon, not just next year\'s submission.`,
  },

  // ── C4 — What is an agent ─────────────────────────────────────────
  {
    camera: 4,
    question: 'How do you stop the LLM from "doing the math" anyway? What if it hallucinates a Cmax?',
    answer: `Architecturally — the agent\'s output schema (Pydantic) names "tool_call", not "numerical_result". If the LLM tries to fabricate a number, the response fails schema validation and the agent retries.

Operationally — the validation scope of the deterministic tools (NONMEM, scipy) is the same scope you already trust. The LLM\'s validation scope is bounded to "did it pick the right tool for the request" — a much narrower question than "is this number correct."`,
  },

  // ── C5 — Architecture ─────────────────────────────────────────────
  {
    camera: 5,
    question: 'Why 5 L1 managers, why 3 L2 specialists? Was this empirically tuned or did you pick numbers?',
    answer: `The L1 set follows the standard MID3 verbs: Data, NCA, PopPK, Simulation, Review. Five fits because those are the natural seams in the workflow — we didn\'t pick five for the count, we picked the verbs and got five.

The L2 set under the Modeler (Covariate, VPC, Design) reflects where the modeling work actually subdivides — those three are routinely separate human-attention tasks. There are 5 more L2 specialists in the source-of-truth set we\'re not showing for talk-time reasons; the visible 3 are representative.`,
  },
  {
    camera: 5,
    question: 'You\'re citing Kim et al. 2025 — what specifically did you take, and what did you add?',
    answer: `Kim et al. propose a multi-agent supervisor topology in the abstract. We took the topology — supervisor + specialists, hierarchical routing — and applied it to pharmacometrics, which they don\'t address.

What we added: the typed PharmState shared bus (instead of message-passing strings), the SchemaExtractor privacy boundary (instead of raw-data-in-prompt), and the per-step audit chain (instead of conversation-log audit). Those three additions are what makes the topology workable inside an ICH M15 environment.`,
  },

  // ── C6 — Novelty ──────────────────────────────────────────────────
  {
    camera: 6,
    question: 'PharmAgent vs Apollo-AI — Pfizer has more scientists than your whole CV. Why is yours useful?',
    answer: `It isn\'t about scale — it\'s about scope. Apollo-AI from public materials looks like a PK-summary + report-drafting assistant: high-value on a narrow slice. PharmAgent\'s scope is the entire MID3 workflow, including the parts (typed shared state, privacy boundary, audit chain) that no published system addresses.

If Apollo expands its scope, that\'s good for the field. The contribution here is showing that an end-to-end pharmacometric architecture is buildable today by one person — that lowers the floor for the rest of the field.`,
  },

  // ── C7 — Privacy ──────────────────────────────────────────────────
  {
    camera: 7,
    question: 'How do you prevent SchemaExtractor from leaking PII through metadata? "247 subjects" is fine; "247 subjects, 1 with creatinine 4.5" isn\'t.',
    answer: `The schema definition is an allow-list, not a block-list. Only fields explicitly named in the metadata schema are emitted — nothing else. So "creatinine 4.5" doesn\'t leak unless someone added a "subject_creatinine_anomalies" field to the allow-list.

The allow-list itself is reviewable, version-controlled, and is part of the audit chain. The architectural property — that fields not on the allow-list cannot leave — is what makes this enforceable. The allow-list contents are part of the manuscript.`,
  },

  // ── C8 — Audit chain ──────────────────────────────────────────────
  {
    camera: 8,
    question: 'SHA-256 chains have been around for years. What\'s actually novel about your audit?',
    answer: `The chaining math isn\'t novel. The application to a multi-agent pharmacometric workflow is what\'s new — most LLM applications log conversations, not signed transformation chains.

The structural property is: every modeling decision (tool choice, parameter, dataset version, agent that made the call) is captured in the chain. Re-running the chain in 2034 either reproduces the result bit-for-bit, or reveals exactly which step diverged. That\'s a stronger guarantee than what most published model-informed workflows offer today.`,
  },

  // ── C9 — Workflow ─────────────────────────────────────────────────
  {
    camera: 9,
    question: 'The amber review-gate is fine in a demo. What happens at 3 AM when the analyst isn\'t there?',
    answer: `Two answers. First — the system doesn\'t auto-ship at 3 AM. The review gate is a hard stop; nothing crosses to the QC or Report stage without an explicit human approval. The chain just waits.

Second — the gate fires inside the audit chain itself, so when the analyst arrives in the morning, she sees: which step requested review, why (the diagnostic panel that\'s in the trace), and what her decision was. The gate isn\'t a soft warning; it\'s a structural barrier.`,
  },

  // ── C10 — Finale ──────────────────────────────────────────────────
  {
    camera: 10,
    question: '"First of its kind in scope" — that\'s a strong claim. What would falsify it?',
    answer: `What would falsify it: a published system that combines (1) hierarchical multi-agent topology with specialist branching, (2) typed shared state that all agents read/write through, AND (3) per-step cryptographic audit chain — applied to model-informed drug development.

I\'ve done the literature search; nothing in PubMed, arXiv quant-bio, or industry preprints meets all three at the time of writing. If the panel knows of one, that immediately changes the framing — and I\'d genuinely want the citation. The manuscript will list these criteria explicitly so reviewers can adjudicate.`,
  },
  {
    camera: 10,
    question: 'Manuscript timeline?',
    answer: `Target submission to CPT:PSP, summer 2026. The architectural sections are drafted; the validation case studies are in progress. I\'m intentionally NOT presenting validation numbers today because they aren\'t locked, and I won\'t walk that back later.`,
  },

  // ── General defense lines ────────────────────────────────────────
  {
    camera: 0,
    question: 'How is this Merck-relevant? You\'re showing us your own research project.',
    answer: `It\'s Merck-relevant in three ways. One — every Senior Director CMD candidate will face workflow-infrastructure decisions in the M15 era; this is direct evidence I\'ve thought through one such decision end-to-end. Two — the IP firewall I\'m demonstrating today is the same firewall I\'d apply to Merck IP if hired; the discipline transfers. Three — the architectural argument (typed state, privacy by construction, audit by construction) generalizes to any model-informed workflow at Merck, not just the pharmacometric one I\'ve illustrated.

I\'m not pitching PharmAgent for adoption. I\'m showing you the kind of decision-making the role demands.`,
  },
];

export default QA;
