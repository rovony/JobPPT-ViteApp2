/**
 * V5-Pharos — static speaker notes per slide.
 *
 * Keys MUST match `slides[].id` in `./manifest.ts`.
 * Values are markdown strings; PresenterNotesPane supports:
 *   • **bold** · *italic* · ==highlight== (uses --case color)
 *   • ## H2 · ### H3
 *   • - bullets · 1. ordered · > blockquote
 *
 * Target: 15 minutes of speaking time across 26 slides.
 * Word-count formula: (slide seconds × 130 wpm) ÷ 60.
 */

const notes: Record<string, string> = {

  '01-title': `## Spoken
Thank you — and good afternoon. ⏸ Today I'm presenting Pharazi — an ==end-to-end AI multi-agent foundation for pharmaceutical sciences==. Not an app. Not a chatbot. A reference architecture — designed from first principles to be structurally private, cryptographically auditable, and M15-aligned from day one.

## Cues
- ⏱ 20 sec — warm open, don't dwell
- 🎚 Confident but brief — the title card is a door, not a destination
- 🎯 Sweep the panel once, land on the chair
- ✅ Say "foundation" not "platform" — deliberate word choice

## Bridge
Let me show you the twelve years of work that made this necessary.`,


  '02-hook': `## Spoken
Twelve years in clinical pharmacology — Minnesota, Merck, GSK, Servier — and ==the same pattern repeating every single program==. ⏸ Sixty-five PopPK models. Eighty-two PKPD frameworks. Thirty-three exposure-response submissions. Every program needed the same workflow infrastructure. Every program ==rebuilt it from scratch==.

→ One hundred eighty models later, the question isn't "can I model this?" — it's "why are we still re-laying plumbing instead of doing science?"

That's the gap Pharazi closes. One centralized, deterministic orchestration engine — 21 CFR Part 11 compliant, hash-anchored execution — ==built once, multiplied across domains==.

## Cues
- ⏱ 50 sec — the career-to-mission bridge
- 🎚 Conversational intensity — building toward the gap
- 🧷 "180+ total models" — matches the ticker on screen
- ✅ Land on "rebuilt it from scratch" — that's the pain
- 🛟 If numbers feel rushed, skip to "One centralized engine…"

## Bridge
Here's what we'll cover in the next fifteen minutes.`,


  '02-5-agenda': `## Spoken
Three movements. ==Vision, Architecture, Future.== The architecture is the bulk — that's where the five design principles and the working system live. We'll close with the publication trajectory and ecosystem. Then fifteen minutes for your questions.

## Cues
- ⏱ 15 sec — roadmap only, don't narrate each beat
- 🎚 Brisk — the audience reads the cards themselves
- ⚠ The slide says 30 minutes but this CS is allocated 15 — move fast

## Bridge
Movement one starts with the forcing function — the regulatory floor.`,


  '03-regulatory-floor': `## Spoken
Three guidances in thirteen months have ==set the regulatory floor== for AI in drug development. ⏸

First — the FDA draft guidance, January 2025. A seven-step risk framework establishing how AI and ML evidence will be reviewed in submissions. → Then — fourteen days into 2026 — the ==FDA-EMA joint principles==. Ten guiding principles. Cross-jurisdictional. These underpin every future AI guidance in both the U.S. and EU.

And the anchor: ==ICH M15==, adopted Step 4 on January 29. AI/ML covered alongside PopPK, PBPK, and QSP as legitimate MIDD methodologies. EU enforcement date: **July 23, 2026** — eighteen months from now.

The message is clear: the floor is set. ==Compliance is no longer optional infrastructure.==

## Cues
- ⏱ 50 sec — critical slide, don't rush the three-pillar cascade
- 🧷 "July 23, 2026" — say this date precisely
- ✅ Land the "eighteen-month enforcement window" — it creates urgency
- 🎯 Watch for nods on M15 — the Merck panel knows this timeline
- ⚠ Don't editorialize about FDA vs EMA differences

## Bridge
So the floor is set. What's the field building above it?`,


  '04-market-moving': `## Spoken
Nine systems. I surveyed every published pharma AI agent framework as of April 2026. ⏸ Apollo-AI from Pfizer — the most advanced — covers ==three of seven MIDD stages==. PharmAgents, Prompt-to-Pill, PharmaSwarm, Pumas, pyDarwin, PEARL, QSP-Copilot, DrugAgent — each addresses one or two stages.

→ ==Every system stops at the seams.== None addresses the end-to-end MIDD foundation: data in, analysis out, audit stamped, regulatory text anchored.

## Cues
- ⏱ 40 sec — scan the 3×3 grid, don't name every system
- 🎚 Analytical, not dismissive — these are real contributions
- ✅ Land on "three of seven" for Apollo — it's the ceiling
- ⚠ Don't say "they failed" — say "they stop at the seams"
- 🛟 If time-pressed, say "nine published systems, highest covers three of seven stages, none end-to-end"

## Bridge
Which brings us to the gap itself.`,


  '05-gap': `## Spoken
Discovery has multi-agent. QCP has Apollo-AI. ⏸

==The MIDD foundation is unbuilt.== ⏸

End-to-end. Structurally private. Cryptographically audited. M15-aligned. → That's the architecture I built. That's what we're going to walk through now.

## Cues
- ⏱ 25 sec — sparse slide, let the words breathe
- 🎚 Slow. Deliberate. This is the thesis drop.
- 📍 Step forward on "unbuilt" — own the claim
- 🧷 "The MIDD foundation is unbuilt" — verbatim
- ✅ Pause two full beats after "unbuilt" before the criteria line

## Bridge
Movement two — the architecture.`,


  '06-transition': `## Spoken
Movement two. The foundation exists.

## Cues
- ⏱ 8 sec — marker only
- 🎚 Brief breath, then advance`,


  '07-principle1': `## Spoken
Principle one: ==centralized hierarchy==. ⏸ This isn't a design preference — it's an empirical result. *Kim, Gu, Park and colleagues* published in late 2025 that independent multi-agent systems amplify errors **17× as scope grows**. Centralized hierarchies contain that to ==4×==.

→ Pharazi implements this directly. L0 orchestrator — routing only, zero tools. L1 managers review. L2 experts run bounded tools. L3 utilities — schema extraction, audit chain, cost tracking, self-healing. → The orchestrator ==never executes==. Managers ==review==. Experts run ==bounded== tools.

The with-without pair on screen shows it: without hierarchy, errors compound silently. With it, they're contained and observable.

## Cues
- ⏱ 50 sec — the architectural spine
- 🧷 "17× … 4×" — say these numbers exactly
- ✅ Cite "Kim et al. 2025, arXiv" — it's on the slide
- 🎯 Check for recognition on the error-amplification claim
- 🎚 Technical but not lecturing — you're showing a design choice backed by evidence
- 🛟 If pressed on the paper: "December 2025, 'Towards a Science of Scaling Agent Systems'"

## Bridge
The hierarchy controls who acts. Principle two controls what the model sees.`,


  '08-principle2': `## Spoken
Principle two: ==structural privacy==. ⏸ Privacy is a property of the code, not a runtime policy. Raw patient data has ==no callable path to the LLM==.

Three bands. Cloud layer — what the model sees: sanitized schema, aggregated results, parameter estimates, plot specifications. Never raw data. → Privacy wall — a code-only utility, the Schema Extractor, that runs ==zero LLM calls==. → Computation engine — where the data actually lives: patient data in memory, R and Python sandboxed containers, AES-256 at rest.

21 CFR Part 11, HIPAA §164.312, GDPR Article 32 — all ==satisfied structurally==, not by policy documents that drift.

## Cues
- ⏱ 45 sec
- 🧷 "no callable path to the LLM" — verbatim
- ✅ Name all three regulatory frameworks
- 🎚 Steady, confident — this is the trust slide
- ⚠ Don't imply other systems leak data — just show the structural guarantee

## Bridge
Privacy controls what the model sees. Principle three controls what anyone can verify.`,


  '09-principle3': `## Spoken
Principle three: ==cryptographic audit==. ⏸ Every state mutation, every routing decision, every QC verdict, every human approval — bound into ==one verifiable hash chain==.

SHA-256 blocks. Each entry carries the previous hash. Verify integrity in two function calls: verify chain and replay. If a block is altered, the chain detects it, reports the mismatch, and rolls back.

This isn't logging. This is ==21 CFR Part 11 §11.10(c)== and ICH M15 reproducibility — ==at the foundation level==.

## Cues
- ⏱ 40 sec
- 🧷 "two function calls" — matches the slide
- ✅ Name 21 CFR Part 11 §11.10(c) — precision matters here
- 🎚 Measured — you're describing an engineering guarantee
- 🛟 If asked about blockchain: "Hash chain, not blockchain — no distributed consensus needed, just local cryptographic integrity"

## Bridge
The chain records decisions. Principle four structures them into reproducible workflows.`,


  '10-principle4': `## Spoken
Principle four: ==versioned workflows and coordination discipline==. ⏸ SOPs in Pharazi aren't policy documents — they're ==hash-anchored execution plans==. Git commits for analytical decisions.

Take the standard PopPK SOP, version 2.1: eleven named steps from data validation through diagnostics and report. Debate gates at base model selection, residual model, and bootstrap. Human review gates at forward selection and diagnostics.

Eight built-in SOPs. Sixty total steps. Eleven debate gates. Sixteen human-review points. → And the system is ==marketplace-extensible== — community-contributed SOPs registered and versioned the same way.

## Cues
- ⏱ 40 sec
- 🧷 "8 SOPs · 60 steps · 11 debate gates · 16 human-review" — numbers on slide
- ✅ Say "marketplace-extensible" — it signals openness
- 🎚 Engineering clarity — you're describing executable workflow specs
- 🛟 If time-pressed, cut the PopPK example and jump to the stat strip

## Bridge
Four principles secure the foundation. Principle five shows how it scales.`,


  '11-principle5': `## Spoken
Principle five — and this is ==the killer slide==. ⏸

We don't scale by rebuilding. ==We scale by registering.== ⏸

Same hierarchy. Same privacy firewall. Same audit chain. Additive only. → Phase one: NCA, PopPK, PKPD, exposure-response, QC. Phase two: signal detection, biomarker, MIPD, pharmacogenomics. Phase three: trial design, real-world evidence, reg authoring, lifecycle.

The shared infrastructure at the bottom — schema extractor, audit chain, QC debate, manager review, regulatory RAG, report generation, HITL gate, state bus — ==never changes==. Only the domain experts multiply.

That's orthogonal layering. Build infrastructure once. ==Multiply experts.==

## Cues
- ⏱ 55 sec — the pivotal claim, give it room
- 🧷 "We scale by registering" — verbatim, slow delivery
- 📍 Step forward on "never changes"
- 🎯 This is where the panel either buys or doesn't — watch faces
- 🎚 Build from steady to emphatic on "Multiply experts"
- ✅ Let the auto-stepper reveal phases — don't narrate ahead of animation
- 🛟 If the animation stalls, describe the three phases verbally

## Bridge
That's the architecture. Movement three — the working system.`,


  '12-5-m3-begins': `## Spoken
Movement three. The future.

## Cues
- ⏱ 8 sec — marker only
- 🎚 Brief, then advance`,


  '12a-working-overview': `## Spoken
It runs. ⏸ This is the ==deployed system== — Vercel, Railway, Supabase — production, April 2026. One sentence in the chat: "run NCA on this dataset, zero to twenty-four hours, linear-up log-down." The orchestration log streams in real time — complexity assessment, manager routing, expert selection, tools listed, QC pending, ==audit chain forming==.

## Cues
- ⏱ 35 sec
- 🧷 "deployed · live" — the badge is on screen
- ✅ Say "Vercel, Railway, Supabase" — names the production stack
- 🎚 Show, don't sell — the system speaks for itself
- 🎯 Watch for the "wait, this is real?" moment

## Bridge
The next slide shows what came back — the numbers and the audit chain.`,


  '12b-working-audit': `## Spoken
QC review: ==pass, three of three vote==. Audit chain anchored to SOP NCA v1.2. ⏸

The NCA table: AUC zero to twenty-four, **184.3** nanogram-hours per mL. Cmax **32.7**. Tmax **1.5 hours**. Half-life **6.8 hours**. CL/F **54.2** liters per hour. Vd/F **532 liters**.

Every number ==hashed==. Every number ==traceable==. The audit chain verifies live on screen.

## Cues
- ⏱ 35 sec
- 🧷 AUC 184.3, Cmax 32.7, t½ 6.8 — reference numbers from the deployed run
- ✅ Say "three of three vote" — emphasizes the QC mechanism
- 🎚 Calm authority — you're reading results, not pitching
- ⚠ These are reference-run numbers, not real patient data — clarify if asked

## Bridge
Let me walk you through each component that made that result possible.`,


  '13-component-nca': `## Spoken
Component one: ==non-compartmental analysis==. Concentration in, parameters out — stamped, hashed, reproducible. ⏸

The trapezoidal rule runs live. Ninety percent confidence intervals from 412 subjects. Cmax 87.4 micrograms per mL, half-life 6.2 hours, CL/F 2.4 liters per hour. Every parameter carries a version stamp and a SHA hash — ==chain, audit, 21 CFR 11==.

The with-without pair: without Pharazi, gold-standard drift. With it, ==0.1 percent match to PKNCA validation==.

## Cues
- ⏱ 35 sec
- 🧷 "0.1% of PKNCA" — the validation claim
- ✅ Reference the stamp: "v1.0 · sha:f8a29c41"
- 🎚 Technical precision — this is the math slide
- 🛟 If pressed on PKNCA: "R package, gold standard, our NCA matches within 0.1%"

## Bridge
NCA is the computation. The next component shows how data flows through the hierarchy.`,


  '14-component-dataflow': `## Spoken
Component two: ==data flow==. Five nodes. One direction. User, orchestrator, manager, expert, output. ⏸ Token cache with fourteen hot-context keys. Audit log with SHA-256 hash chain. Stamped output.

The critical guarantee: ==zero unbounded calls, by construction==. No expert can call another expert. No manager can bypass the orchestrator. The topology enforces the discipline.

## Cues
- ⏱ 30 sec
- 🧷 "five nodes · one direction · zero unbounded calls"
- 🎚 Clean, structural — you're describing topology
- ✅ Land on "by construction" — it means the architecture makes violations impossible

## Bridge
Data flows down. The audit chain records every step.`,


  '15-component-audit': `## Spoken
Component three: ==audit chain==. You saw the chain verify on the live system. Here's the anatomy. ⏸

Blocks one through five — NCA run, export — each carries a timestamp, previous hash, current hash. The verify sweep checks every link. If a block is tampered, ==hash mismatch detected, rollback triggered==.

Two function calls: audit dot verify, audit dot replay. That's it. SHA-256, M15-aligned, ==21 CFR 11 compliant==.

## Cues
- ⏱ 30 sec
- 🧷 "two function calls" — matches the slide panel
- ✅ Name the verify/replay pair — it's memorably simple
- 🎚 Engineering precision
- 🛟 If asked about tamper scenario: "The chain detects, reports the mismatch block, and rolls back to last verified state"

## Bridge
Those three components — NCA, data flow, audit — work inside every domain. Watch PopPK inherit them.`,


  '16-poppk-dashboard': `## Spoken
PopPK inherits the ==same foundation==. ⏸ Covariate strategy — body weight, age, eGFR, sex, CYP3A, PPI — mapped against ka, clearance, volume, Q, half-life. Goodness-of-fit grid. Waterfall from a 200-subject simulated dose range, 50 to 150 milligrams.

Same chrome. Same audit chain. Same QC vote — ==three of three==. Same SOP anchor — poppk v2.3. Zero new infrastructure.

## Cues
- ⏱ 30 sec
- 🧷 "200-subject · 50–150 mg" — reference workflow numbers
- ✅ Say "zero new infrastructure" — reinforces orthogonal layering
- 🎚 Steady — this validates the scalability claim from Principle 5
- ⚠ These are simulated reference data, not real trial results

## Bridge
The fifth component ties all of this together.`,


  '17-component-sop': `## Spoken
Component five: ==marketplace SOP==. ⏸ Versioned execution plans — git graph with branches, merges, commit messages. Version 1.0 to 1.5, renal clearance additions, pediatric forks, reviewer sign-offs.

Twelve SOPs versioned. Three branches with active pilots. Eight reviewer-approved merges. ==Zero conflicts by construction== — the system enforces merge discipline.

This quarter, the SOP marketplace opens. Hash-anchored. Marketplace-extensible. ==Reproducible by design.==

## Cues
- ⏱ 30 sec
- 🧷 "12 SOPs · 3 branches · 8 merges · 0 conflicts"
- ✅ Say "this quarter" — signals near-term delivery
- 🎚 Forward-looking but grounded — you're showing what's shipping

## Bridge
Five components built. Now let me show you how they serve regulatory readiness.`,


  '18-regulatory-dashboard': `## Spoken
The same chain that anchors the audit ==anchors regulatory text==. ⏸ ICH M15 expectations mapped to Pharazi features — context of use maps to SOP versioning, model development maps to hierarchy plus QC debate, model evaluation to the audit chain.

Regulatory artifacts: PopPK report issued. Covariate memo in QC. Timeline from pre-IND FDA through scientific advice EMA to NDA filing — ==eighteen months==. CTD modules 2.7, 3.2, 5.3 — each carrying an audit-chain hash.

==Every artifact carries an audit-chain hash. Every credibility claim is anchored.==

## Cues
- ⏱ 35 sec
- ✅ Name the CTD modules — shows regulatory fluency
- 🧷 "every credibility claim is anchored" — the closing line
- 🎚 Authoritative — you're bridging engineering to regulatory strategy
- 🛟 If pressed on M15 mapping: "We mapped all four M15 principles — context of use, development, evaluation, communication — to specific architectural features"

## Bridge
Regulatory readiness at the document level. The next slide traces a single number from lab sample to regulatory paragraph.`,


  '19-e2e-audit-dashboard': `## Spoken
One sample. One number. One regulatory paragraph. ==One chain.== ⏸ Provenance from raw lab data through curated dataset, through PopPK result, to regulatory text — four levels, each hashed.

The traceability claims on screen — covariate inclusion, exposure target hit, QC three of three, M15 grade, post-marketing requirement language — each resolves to a verifiable root hash. Inspectors can verify a number ==to its raw lab sample without leaving the chain==.

## Cues
- ⏱ 30 sec
- 🧷 "one sample · one number · one paragraph · one chain" — the cadence
- ✅ Say "inspectors can verify" — positions this for regulatory reviewers
- 🎚 Measured gravitas — this is the compliance capstone

## Bridge
All five components, all five principles. Let me compose them.`,


  '20-synthesis-dossier': `## Spoken
The foundation, ==composed==. ⏸ Five components rotating on screen — centralized hierarchy at 3.2-second average routing, privacy wall at ==zero bytes PHI to the LLM==, NCA with six of six parameters, audit chain at 100% verify true, marketplace SOP with 47 SOPs registered.

Each with its own narrative. Each with a with-without pair. ==All anchored to the same root.==

## Cues
- ⏱ 25 sec — let the auto-rotation do the work
- 🎚 Narrate lightly over the animation, don't compete with it
- ✅ Hit "zero bytes PHI" — it's the memorable number
- 🛟 If auto-advance stalls, say "five components, one foundation, all verified"

## Bridge
The dossier shows components in parallel. The trace shows them in sequence.`,


  '21-synthesis-trace': `## Spoken
One request becomes a ==replayable evidence trail==. ⏸ The canvas traces the full workflow — human request, PHI scrubbed, routing to NCA, computation, PopPK conferral, SOP registration, chain anchored, verify sweep. Five of five complete.

Every node carries a principle ribbon. Every transition is logged. ==The same chain that anchors the audit anchors every regulatory paragraph.==

## Cues
- ⏱ 25 sec — cinematic trace runs long; narrate the first three beats, then let it play
- 🎚 Quiet confidence — the animation tells the story
- ⚠ Don't try to narrate every phase — the audience reads faster than you speak here
- ✅ Land on "five of five complete"

## Bridge
The architecture works. The system is deployed. Let me show you what comes next.`,


  '22-publication-close': `## Spoken
Live at ==pharazi.ai==. ⏸ Manuscript in preparation for *CPT: Pharmacometrics and Systems Pharmacology* — April 2026. GitHub live. Framework home live. Community site clinpharm.ai. R and Python packages on the roadmap.

Regulatory framework? ==Exists.== Architectural foundation? ==Built.== Working system? ==Deployed.==

The foundation holds. ==The next chapter scales it.==

## Cues
- ⏱ 30 sec
- 🧷 "CPT:PSP · in prep" — the publication venue
- ✅ Say each status word with a beat: "Exists. Built. Deployed."
- 📍 Gesture toward the QR code on "scan to visit"
- 🎚 Closing energy — warm, forward-looking
- 🛟 If the iframe doesn't load: "The live site is pharazi.ai — I can demo after Q&A"

## Bridge
Before we open for questions — five things to remember.`,


  '22-5-closing-recap': `## Spoken
Five things. ⏸

One — ==ICH M15, July 2026==. The regulatory floor is set. → Two — the MIDD foundation is unbuilt. Apollo is QCP, not MIDD. → Three — Pharazi's centralized hierarchy contains errors ==4× better==, per Kim et al. → Four — orthogonal layering. Registering, not rebuilding. → Five — ==eighteen months== to a peer-reviewed reference architecture paper.

The foundation exists. ==The next chapter scales it.==

## Cues
- ⏱ 25 sec — one breath per takeaway
- 🎚 Staccato rhythm — each number lands, then next
- 🧷 "The foundation exists. The next chapter scales it." — closing line, verbatim
- 📍 Make eye contact with the chair on line five
- ✅ Don't elaborate — these are memory hooks, not arguments

## Bridge
Questions.`,


  '23-qa': `## Spoken
Questions. ⏸ Backup slides ready. Audit chain accessible. Demo on standby.

## Cues
- ⏱ 10 sec — then open the floor
- 🎚 Warm, inviting
- 🎯 Look at each panelist in turn
- 🛟 If silence: "I'm happy to start with the regulatory timeline or the privacy architecture — whichever is most relevant to your team"`,

};

export default notes;
