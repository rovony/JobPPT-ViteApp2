/**
 * qp2-seminar-v3-R2 — speaker notes per slide.
 *
 * See 4-Apps/merck-deck/Notes-And-QA-Structure.md for the authoring
 * vocabulary (## Spoken / ## Cues / ## Bridge sections, ⏸ pauses, glyph
 * cues, ==highlight== markers). Keys MUST match `slides[].id` in
 * `./manifest.js`. Empty string = "no static note authored yet"; the
 * presenter pane shows its placeholder and the live editor still works.
 */

const notes = {
  // Slide 01 — Title cover.
  // 30-second open. The title and subtitle are LOCKED (committed to
  // Merck). The hook lands on slide 02; this slide warms the room and
  // names the through-line.
  title: `## Spoken
Good morning — and thank you for the time. I'm ==Malek Okour==. ⏸ Over the next ==forty-five minutes== I want to walk you through ==three clinical pharmacology decisions== where ==the data, on its own, was never going to be enough==.

In each case the conventional path didn't work — so we built another one. ⏸ **One discipline at the center** — ==quantitative pharmacology== — turning each hard question into a defensible dose, a defensible label, or a workable trial.

That's the common thread. ⏸ To show you how — let's start with the main question.

## Cues
- ⏱ 45 sec — ~100 words with ⏸ pauses; hook lands on slide 02
- 🎚 Steady, low-energy open — earn the room before pushing
- 🎯 Lock eyes with the panel chair on "thank you for the time"
- ⚠ Do NOT preview drug names or therapeutic areas yet — that's slide 02's job
- ✅ Land cleanly on "let's start with the main question"
- 🛟 If you blank — fallback: "Three cases. One discipline. Let's begin."

## Bridge
That last sentence — *let's start with the main question* — is the cue to advance into the hook (slide 02 opens: "It's the question every clinical pharmacologist eventually faces…").`,

  // Slide 02-A — Hook: "When the trial isn't the answer." (~75 sec)
  // Phase A audit 2026-04-26: Spoken locked to UNTRIALABLE/UNAVAILABLE/UNBUILT
  // vocabulary so the on-slide marks and the spoken word arrive in lockstep.
  // The three mark cards now reveal early for normal viewing; the speaker
  // still lands them as verbal beats, but no longer has to sync to animation
  // timestamps. Dropped the tutorial-voice close and
  // the ghost-line "What clinical pharmacology does next." reference (not on
  // the slide; was an unauthorized linter add reverted 2026-04-25).
  'hook-A-trial-not-answer': `## Spoken
It's the question every clinical pharmacologist eventually faces.

==What do you do when the trial that would answer your question can't be run?== ⏸

It can't be run because it's **untrialable** — you ==can't randomize children with a fatal disease to placebo==, you ==can't pull a working drug from patients who need it==, and ==you can't recruit a population the disease itself can barely supply==. ⏸

It can't be run because it's **unavailable** — ==a regulator asks for a local Phase 3 the drug has never seen, in a population the global program never enrolled==, on a timeline that patients do not have. ⏸

It can't be run because it's **unbuilt** — the next decade of clinical pharmacology will need ==infrastructure, audit, and decision tools no vendor can give you off the shelf==. ⏸

Three cases. Three trial limits. Three ==clinical pharmacology answers==. ⏸ That's the structure for this talk.

## Cues
- ⏱ 75 sec total — the slide is a stage. The pauses do the work.
- 🎚 Lower register on the three "it can't be run" beats. Each one lands separately. Resist the urge to chain them into a single breath.
- 🧷 Verbal-lock the three beats: **"untrialable"** · **"unavailable"** · **"unbuilt."** The cards are already visible; your job is to make each word feel like a chapter, not an animation cue.
- 📍 Stand still through the three reasons. Step forward on "Three cases. Three trial limits. Three clinical pharmacology answers."
- 🎯 Eye contact rotates: first beat to the panel chair, second to a regulatory-leaning panelist if you can identify one, third to the most senior pharmacometrics panelist.
- ⚠ Do NOT name drugs here. Drugs come at S04. Naming a drug now collapses the rhetorical weight of the open.
- ⚠ Do NOT say "today's topic is" or "I'm going to walk you through" or any other tutorial-voice phrase. The hook IS the framing; do not narrate that you are framing.
- ✅ The most useful line is "Three clinical pharmacology answers." Land it clearly, not dramatically.
- ✅ Closing — "Three cases. Three trial limits. Three clinical pharmacology answers. ⏸ That's the structure for this talk." — keep it plain and readable. Hard cut after; do NOT extend.
- 🛟 If you blank, the recovery line is: "Three cases. Three trial limits. Three clinical pharmacology answers."

## Bridge
→ Quick background next, then the roadmap names the three cases as decision-classes — pediatric extrapolation, regional bridging, forward-looking infrastructure.`,

  // Slide 03 — Career arc · five stops, one operating question (~90 sec)
  // Visual: five-stop professional arc — Jordan → Minnesota → Merck intern
  //   → GSK → Servier. Don't read every satellite.
  //   The graphic does the visual work; the speaker names each stop
  //   with ONE concrete fact that earns the panel's trust.
  'career-arc': `## Spoken
Quick background before we get into the cases.

I started as a dentist in Jordan. ⏸ Then PhD in Minnesota with Dr. Brundage — in Clin Pharm and Pharmacometrics. ⏸

Summer of 2014 ==I came here, to Merck== — QP2, as an intern. I worked on simulation with uncertainty and clinical trial simulations. Honestly, that summer is part of why we are sitting here today. ⏸

Then seven years at GSK after that — in Clin Pharm modeling and simulation, across five therapeutic areas and ==four approvals== during my tenure. The ambrisentan pediatric work happened there — that's case one. ⏸

Since 2022, Director at Servier on the oncology side. Onivyde, Oncaspar, Tibsovo lifecycle. The India ivosidenib waiver — that's case two.

Alongside that, I also kept building independent research tools. DosePredict was a Shiny application for PK-based dose prediction, published in the *Journal of Clinical Pharmacology*. DeepPK was my work on classical compartmental models combined with hybrid Neural Ordinary Differential Equations — Neural ODEs. And PharmAgent is the current work in progress, manuscript in preparation. That becomes case three.

That's the background. ==Now the three cases.==

## Cues
- ⏱ ~80 sec — relaxed pace; the graphic carries the visual
- 🎚 Plain and factual — this is background, not a performance
- 🎚 Natural emphasis on "came here, to Merck"
- 🎚 Say the summer-2014 line warmly, then move on
- 🎚 Keep the independent-tools paragraph as a bridge, not a product pitch
- 🎯 Sweep left-to-right across the five hubs as you name them
- 🎯 Eye contact: panel chair on Jordan → modeling-leaning panelist on Minnesota → most senior panelist on "I came here, to Merck" → regulatory-leaning panelist on GSK → chair again on Servier
- ⚠ Do NOT recite the slide — the headline already says "Five stops, one question" and the footer already says "what dose, for whom, why?" Saying either out loud is double-spending the emphasis
- ⚠ Do NOT name compounds beyond ambrisentan, ivosidenib, and the public Servier portfolio (Onivyde, Oncaspar, Tibsovo). No CS3 compounds yet.
- ⚠ Do NOT linger on awards or numbers; name once and move
- ⚠ Do NOT over-explain DosePredict, DeepPK, or PharmAgent here — one line each, then move
- ✅ Land cleanly on "Now the three cases"
- 🛟 If you blank — fallback: "Dentist in Jordan, PhD in Minnesota, Merck QP2, GSK, now Director at Servier. Now the cases."

## Bridge
→ Now the agenda — three cases, three challenges, one discipline.`,

  // Slide 04 — Roadmap · three cases, one discipline (~75 sec)
  // Visual: 3-card grid (CS1 coral / CS2 cyan / CS3 violet) naming
  //   each case's drug, indication, regulator, and what it proves.
  //   This slide sets the timing expectations for the panel.
  'roadmap': `## Spoken
So here's the agenda — three cases, each with a different problem, but all coming back to one thing: ==quantitative pharmacology driving the decision==.

**==Case one — ambrisentan, pediatric PAH==** — the pediatric trial stopped at thirty-nine of sixty-six planned patients. The question became whether the ==pharmacokinetic bridge== could still support a pediatric label. EMA and PMDA said yes in 2021. The key was ==exposure matching==. ⏸

**==Case two — ivosidenib, India==** — approved in the US and Europe, but still unavailable to Indian patients because CDSCO expected local clinical evidence. The answer was a ==six-pillar regulatory dossier under Rule 101==. CDSCO approved it in May 2025. ⏸

**==Case three — AI and machine learning for clinical pharmacology workflows==** — this is the infrastructure question, including privacy boundaries, deterministic tools, audit trail, and the ICH M15-aligned documentation. This is ==my own research and architecture judgment==, not a product pitch. ⏸

==Three challenges — pediatric, geographic, methodological.== One discipline carrying the decision in each case. About ten minutes per case, then a brief synthesis and questions at the end.

## Cues
- ⏱ ~75 sec — three card-beats + one synthesis line + timing expectations
- 🎚 Even energy across the three cards — don't oversell any single case
- 🎯 Gesture toward each card as you name it — left, center, right
- ⚠ Do NOT preview case-level numbers (39 patients, May 14 2025, etc.) — those land inside the case
- ⚠ Do NOT pitch PharmAgent as a deployable product. Say "research and architecture judgment," then move on.
- ✅ Land cleanly on "ten minutes per case, then a brief synthesis and questions at the end"
- ✅ The opening "So here's the agenda" picks up from career-arc bridge ("Now the agenda")
- 🛟 If you blank — fallback: "Three cases. Pediatric, geographic, methodological. About ten minutes each. Let's start with case one."

## Bridge
→ Case 01 — ambrisentan in pediatric PAH.`,

  // Slide 02-B — Hook: "Twenty months changed the function."
  // Amendment 2: expanded Spoken to ~165 words (45 sec at ~155 wpm with ⏸ pauses).
  'hook-B-eighteen-months': `## Spoken
In one twelve-month window, the field changed.

In **August 2024 alone**, three things happened.

On **August 7th**, India's Drug Controller General invoked **Rule 101** of the New Drugs and Clinical Trials Rules — formally specifying the countries from which a local-trial waiver could be granted. ⏸

The next day, on **August 8th**, the FDA issued the final **Project Optimus** guidance — codifying expectations for oncology dose optimization that had been draft for eighteen months. ⏸

Two weeks later, on **August 21st**, the ICH adopted **E11A** — the harmonized framework for pediatric extrapolation across regulatory jurisdictions.

==Three frameworks. Fifteen days.==

And in **November 2024**, the ICH released the *draft* **M15** guideline on model-informed drug development — the first harmonized framework for how models become regulatory evidence. Public comment closed February 2025; final adoption expected later this year. ⏸

None of these existed twenty months earlier.

The cases I'm going to walk you through are not abstractions. *They are the work the new frameworks were written for.*

## Cues
- ⏱ 45 sec — slowest of the open. Each framework gets its own beat.
- 🎯 Eye contact rotates: one panelist per framework as you say its name. Most senior regulatory panelist gets E11A; most senior pharmacometrics panelist gets M15.
- 🎚 Slight emphasis on the dates. "Three frameworks. Fifteen days." is the line that lands the visual argument the slide is making.
- 🎚 Soft register on "Public comment closed … final adoption expected later this year." — said quickly, not apologetically. Pre-empts the M15-status Q&A.
- 📍 Gesture left-to-right across the date axis on screen as you name each framework. The slide is doing visual work; your gesture confirms it.
- ⚠ Say **draft** M15. Never say "M15 codifies" or "M15 requires" — it's not adopted.
- ⚠ Do NOT editorialize on whether the frameworks are well-designed. Stay descriptive in the open. Editorial views, if you have them, belong in Q&A.
- ⚠ Do NOT claim causation between the frameworks. Saying "they happened in fifteen days because…" invites a panelist to test the claim. Saying "fifteen days" lets the audience draw the conclusion themselves.
- ✅ The line the panel will quote back is "the work the new frameworks were written for." Land it.
- 🛟 If you lose your place mid-list, the recovery is: "Three frameworks in fifteen days, and a fourth in November. None existed twenty months earlier. That's the change."

## Bridge
→ Next slide names the three cases as the working reality of the new frameworks — pediatric extrapolation, regional bridging, and forward-looking infrastructure — mapping each to which framework it lives in.`,

  // ════════════════════════════════════════════════════════════════
  // CASE 01 — Ambrisentan in pediatric PAH (coral cascade) · v2-final
  // ~10:30–10:45 total stage time across 11 slides.
  //
  // 2026-04-25 v2-final pass — speaker scripts replaced wholesale per
  // 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/3-SpeakerNotes-CS1-v2.md.
  // Amendments applied: A1.1 PDE-5i mechanistic-only (Slide 8), A1.2 adult
  // anchor 380 from 6 studies (Slide 8), A1.3 dual-precedent reframe (Slide
  // 6 = FUTURE-1 EMA + Garnett-Florian FDA), A1.4 hemodynamic substudy
  // surfaced (Slide 9), A1.5 PMDA March 23 2021 (Slide 10), A1.6 etiology
  // explicit (Slide 5), A1.7 80% baseline therapy (Slide 5), A3.3 trial
  // dates Jan 4 2011 / Nov 12 2013 / Feb 11 2019 (Slide 7), A3.4 two
  // deaths neither drug-attributed (Slide 7), 35-<50 kg subgroup AUC/Cmax
  // outliers proactively disclosed (Slide 9), FDA honesty caveat moved
  // on-slide (Slide 10).
  //
  // CONTENT-TO-SLOT MAPPING (current slide ID → V2 conceptual slide):
  //   cs1-divider     → V2-S1  · Divider · "Ambrisentan"          (0:30)
  //   cs1-question    → V2-S2  · Hook + question                   (0:45)
  //   cs1-context     → V2-S3  · PAH 101 · disease foundation      (1:00)
  //   cs1-trial       → V2-S4  · Pediatric PAH timeline            (1:00)
  //   cs1-architecture→ V2-S5  · Drug + constraint                 (0:45)
  //   cs1-results     → V2-S6  · Two precedents · FUTURE-1 + GF    (1:15)
  //   cs1-outcome     → V2-S7  · Three disruptions                 (1:30)
  //   cs1-bracket     → V2-S8  · The framework · PopPK             (1:15)
  //   cs1-verdict     → V2-S9  · Exposure match · the result       (1:15)
  //   cs1-lesson      → V2-S10 · Outcome + ICH E11A                (1:15)
  //   cs1-bridge      → V2-S11 · Three takeaways + bridge          (0:45)
  //
  // NOTE: slide IDs were chosen for the prior CS1 flow and now drift from
  // V2 conceptual labels (e.g. cs1-bracket carries V2-S8 PopPK framework
  // content, not the old Bracket Method). Renaming IDs is deferred until
  // the Wave-2 visual rebuild lands.
  // ════════════════════════════════════════════════════════════════

  // V2-S1 · Divider · "Ambrisentan" — 30 sec
  'cs1-divider': `## Spoken
First case: **==ambrisentan==** — an oral selective endothelin-A antagonist for pulmonary arterial hypertension.

This is pediatrics: ==eight to under eighteen years==. The Phase IIb program was terminated mid-program, but EMA and PMDA still approved the pediatric label in 2021.

## Cues
- ⏱ 25 sec — quick case opener
- 🎚 Plain and factual; do not make this sound dramatic
- ⚠ Do NOT mention FDA yet — save the caveat for the outcome slide
- ✅ Keep slide 5 as a clean case entry; let slide 6 own the clinical pharmacology question

## Bridge
→ Let me put the question in front of you first.`,

  // V2-S2 · Hook + question — 60 sec
  // (manifest order places cs1-question at slot 06, immediately after cs1-divider)
  // 2026-04-26 r4: headline asks whether the PK bridge can still support
  // a label; subtitle frames this as exposure matching under program
  // disruption. Notes walk the 380/39 asymmetry + three disruptions.
  'cs1-question': `## Spoken
So the clinical pharmacology question was simple: ==when the pediatric trial is terminated==, can the **==pharmacokinetic bridge==** still support a pediatric label?

The adult side was strong: **==380 adult patients==** across six studies, with a mature adult PK anchor.

The pediatric side was much smaller: **==39 patients==**, open-label, PK-anchored, and no placebo comparator.

And the program had three things happening at the same time: a ==juvenile-rat finding== that held enrollment, a ==sildenafil mortality signal== that changed how regulators thought about pediatric dose selection, and ==split commercial rights== between Gilead and GSK.

So this was not a clean pediatric efficacy-trial story. It was a question of whether ==exposure matching== could still support **a defensible pediatric dose**.

## Cues
- ⏱ ~60 sec — keep the contrast clear: 380 adults vs 39 pediatric patients
- 🎚 Conversational; say "here is the question" like you are orienting the room
- ⚠ Do NOT say "the trial failed"
- ✅ Use the exact phrase "exposure matching"

## Bridge
→ Disease context first — the panel needs PAH 101 before the framework lands.`,

  // V2-S3 · PAH 101 · disease foundation — 60 sec
  'cs1-context': `## Spoken
Quick PAH 101.

Pulmonary arterial hypertension is **==a small-vessel disease of the lungs that kills through right-heart failure==**.

Three things happen together: ==vasoconstriction==, ==smooth-muscle and endothelial proliferation==, and ==in-situ thrombosis==. The lumen narrows, pulmonary vascular resistance rises, and the right ventricle has to push against a higher-resistance circuit.

Over time, the right ventricle hypertrophies, dilates, and then fails. Patients do not really die from the pressure number. They die from right-heart failure.

The current hemodynamic definition is **mean pulmonary arterial pressure ≥ 20 millimeters of mercury, pulmonary vascular resistance ≥ 2 Wood units, and wedge pressure ≤ 15**. That last part tells you this is pre-capillary disease.

For this case, the relevant pathway is endothelin. Endothelin is the over-active vasoconstrictor and proliferative signal, and ambrisentan blocks ETA.

The historical benchmark is still striking: untreated median survival was **==2.8 years==** in the *D'Alonzo NIH registry from 1991*.

## Cues
- ⏱ ~60 sec — disease setup, not a lecture
- 🎚 Plain explanation first, definitions second
- ⚠ The trial used older Dana Point criteria with mPAP ≥25; only explain if asked
- ✅ Make "right-heart failure" the simple takeaway

## Bridge
→ That's the disease. Mechanism next — what makes ambrisentan the right tool.`,

  // V2-S3b · Mechanism — endothelin pathway · ambrisentan MOA — 60 sec
  'cs1-mechanism': `## Spoken
PAH treatment is organized around pathways. Ambrisentan works on the endothelin pathway, and the important word is **==selective==**.

On the disease side, endothelin-1 binds ETA on vascular smooth muscle. That drives vasoconstriction and proliferation, so the arteriole narrows.

With ambrisentan on board, the drug sits mainly on **==ETA==** — over **==4000:1 selectivity==** — while leaving **==ETB==** relatively intact. ETB matters because it helps clear endothelin-1 and releases nitric oxide.

So the idea is straightforward: block the constrictor arm without removing the dilator and clearance arm.

For context, bosentan is about **20:1** selective, macitentan about **50:1**, and ambrisentan is over **4000:1**. That is the selectivity story.

The other two PAH pathways — nitric oxide / cGMP and prostacyclin — are here for context. This case is the endothelin pathway.

## Cues
- ⏱ 45 sec — mechanism only
- 🎚 Slow down on ETA vs ETB
- ⚠ Do NOT inflate the selectivity; the number is enough
- ✅ Land on "that is the selectivity story"

## Bridge
→ Field context next — where ambrisentan sits in the pediatric PAH timeline.`,

  'cs1-history': `## Spoken
A step back from ambrisentan for a minute: this is the PAH treatment landscape — three decades, four pathway columns.

Before targeted therapy, care was mostly supportive: oxygen, anticoagulation, and calcium-channel blockers for the small group of patients who responded. No targeted PAH therapy yet.

The first pathway opened in ==1995 with IV epoprostenol==, through prostacyclin biology. It was the first PAH-specific therapy, but the delivery burden was high: continuous infusion, central line, and serious interruption risk.

The second pathway opened in ==2001 with bosentan==: endothelin receptor antagonism, and the first oral PAH therapy.

The third pathway opened in ==2005 with sildenafil==: NO / cGMP biology through PDE5 inhibition.

Then ambrisentan enters in ==2007==: selective ETA, oral once daily. In ==2013==, macitentan and riociguat broadened the oral landscape. In ==2015==, selexipag added an oral prostacyclin-pathway option.

By the mid-2010s, PAH had ==three pathways, multiple oral options, and combination protocols==.

Then in ==March 2024==, sotatercept added a fourth pathway: activin / TGF-beta signaling, rebalancing the BMPR-II axis.

The point is: ==PAH treatment evolved by pathway expansion==. Ambrisentan sits in the endothelin column, and the pediatric extrapolation question is still relevant today.

## Cues
- ⏱ 75 sec — timeline, not encyclopedia
- 🎚 Use the years as skim anchors: 1995 / 2001 / 2005 / 2007 / 2024
- 🗣 Pronunciation cues: macitentan (Machatentin); riociguat (rio-cigua); sotatercept (So-Tater-Cept)
- ⚠ Do NOT enumerate every drug beyond what is needed
- ✅ Land on "pathway expansion"

## Bridge
→ AMB112529 trial design + LTE. Now that you know where ambrisentan sits in the field, here is the trial that built the dossier.`,

  // Slide 08 — CS1 field-level timeline (adult + pediatric tracks)
  'cs1-trial': `## Spoken
Pediatric PAH moved more slowly than adult PAH.

Above the axis are adult approval landmarks: ==bosentan 2001, sildenafil 2005, ambrisentan 2007, macitentan 2013, selexipag 2015, sotatercept 2024==. These are approval years, not an exhaustive drug-history list, but enough to show the pace.

Below the axis are the pediatric steps. The key early precedent is ==bosentan 2009 EMA== with FUTURE-1: the first PK-matching framework approved in pediatric PAH.

Ambrisentan took **==eight years==**. Enrollment was ==held== in March 2013 because of the juvenile rat brain-weight finding. The study was ==terminated== in February 2019 at **41 of 66 enrolled**. Then in ==2021==, EMA and PMDA approved the pediatric label on the Okour PopPK package.

So the dashed coral arc is the story: ==held, terminated, then approved==.

And ICH E11A in 2024 later formalized this kind of logic: use adult evidence, disease similarity, pediatric PK, and uncertainty management to support pediatric extrapolation. In other words, this case used the framework before the guidance gave it a formal name.

## Cues
- ⏱ ~70 sec — keep the timeline clean
- 🎚 Calm on "eight years"; no melodrama
- 🗣 Pronunciation cues: macitentan (Machatentin); sotatercept (So-Tater-Cept)
- ⚠ Do NOT say "the trial failed"
- ✅ End on "E11A codified the framework four years later"

## Bridge
→ Why no pediatric efficacy trial — five constraints — next.`,

  // Slide 09 — CS1 adult foundation + why pediatric efficacy trial path closes
  'cs1-architecture': `## Spoken
This is the pivot.

Adult evidence existed. The pediatric efficacy-trial path ==did not==.

ARIES established adult PAH efficacy. ETA blockade was mechanistically plausible in pediatric PAH. So the clinical task became dose selection.

But repeating the adult efficacy trial in children was not realistic.

Five constraints made that clear.

**==One — enrollment.==** Pediatric PAH is rare: roughly **2 to 16 per million children**.

**==Two — pooling.==** AMB112529 was not one clean phenotype: idiopathic disease, post-repair congenital heart disease, connective tissue disease, and familial disease.

**==Three — control arm.==** **80%** entered on baseline PAH therapy, and **66%** continued it. A clean placebo-controlled pediatric efficacy trial is hard clinically and ethically.

**==Four — endpoint.==** Six-minute walk distance does not transfer cleanly to young children. Growth, cooperation, and performance all affect the signal.

**==Five — precedent.==** STARTS-1 enrolled **235 children** and still narrowly missed its primary endpoint.

So the question was not, "Can we repeat ARIES in children?" The question was: ==how do we defend a pediatric dose under these constraints?==

## Cues
- ⏱ 65–75 sec — five numbered beats
- 🎚 Say the constraints plainly; this is senior judgment, not drama
- ⚠ Do NOT say "trial failed"
- ✅ Land on the dose-defense question

## Bridge
→ Now the PopPK build itself — what model, what fit, what exposure match.`,

  // Slide 09b — CS1 PopPK build + fit (added 2026-04-26 per cs1.md "no PK/PD charts")
  'cs1-poppk': `## Spoken
The model was **==two-compartment, first-order absorption with t-lag==**.

Allometric scaling was fixed *a priori*: body weight on clearance with exponent **0.75**, and on volume with exponent **1.0**. We did not estimate those exponents from 39 pediatric patients. That was deliberate, and it is the standard Holford convention regulators expect.

The basic structure was: **==380 adult patients build the model. 39 pediatric patients confirm it.==**

The workflow was straightforward. We built the adult PopPK foundation, then used the pcVPC to ask: does the adult model predict the pediatric data? If yes, we inherited the structure and fit the pediatric data with sparse sampling. Then we compared steady-state exposure — AUCss and Cmax — evaluated exposure-response for 6MWD and adverse events, and packaged that evidence for submission.

The parameter table is the receipt. The two things to point to are **==clearance over F==** and **==volume==**. The estimates are precise enough for the bridge, and the allometric weight scaling is fixed rather than estimated given the small pediatric dataset.

For covariates, we used a full covariate model rather than forward inclusion: all **==12 prespecified covariates==** went in together. To be extra careful, we also used backward elimination. The result was clean — only allometric body weight stayed.

The pcVPC is the model check. The pediatric observations overlap the model-predicted ribbon across the dosing interval, so the pediatric fit is behaving well.

## Cues
- ⏱ 75 sec — numbers need air
- 🎚 Speak the parameter row like a receipt, not a proof of cleverness
- ⚠ Do NOT imply 39 patients built the model
- ✅ Land on "380 build; 39 confirm"

## Bridge
→ The next slide adds the PK/PD context: did the exposure match sit in a clinically safe and interpretable range?`,

  'cs1-pkpd': `## Spoken
This slide answers the first question: can pediatric patients get into the adult exposure range? ==Yes — the AUC match held.==

This slide asks the next question: once exposures match, do we see any warning signal across exposure?

The careful answer is: ==no clear exposure-response gradient in the observed range.==

Top row first. AUCss by weight and Cmax by dose tell the same basic story: pediatric exposures sit inside the adult target envelope. AUC is the bridge. Cmax is the safety check.

Cmax is higher in children, but still interpretable against adult safety experience.

Bottom row. The efficacy panel plots AUCss against change in six-minute walk distance. I would not overclaim this. Six-minute walk is noisy in children, and the dataset is small. The defensible statement is that ==there is no clear exposure-response gradient suggesting we chose the wrong exposure range.==

The safety boxplots are similar. Related adverse events did not cluster at clearly higher AUC or Cmax.

So the case has two receipts: ==exposure matched the adult target==, and ==the observed PK/PD did not contradict the bridge==.

## Cues
- ⏱ 75 sec — distinguish AUC bridge from Cmax safety check
- 🎚 Use cautious verbs: "no clear gradient," "observed range," "did not contradict"
- ⚠ Do NOT call 6MWD a strong pediatric endpoint
- ✅ Recovery line: "AUC carried the dose. Cmax checked safety."

## Bridge
→ Now the regulatory architecture — which branch did this evidence fit: EMA PK matching or the FDA hemodynamic bridge?`,

  // Slide 10 — CS1 two architectural precedents (FUTURE-1 + Garnett-Florian)
  'cs1-results': `## Spoken
Pediatric ERA bridging has two recognized architectures. Both came through bosentan. ==This case follows the EMA branch.==

The **==EMA path is PK matching==**. FUTURE-1 — Beghetti, *British Journal of Clinical Pharmacology*, 2009 — had **N=36 children**, ages **3 to 17**. Pediatric AUC came in at **54% of the adult target**. The PK match missed, but EMA approved the pediatric formulation anyway. The precedent was the method.

AMB112529 was tighter: **97% of adult AUC at low dose**.

The **FDA path is the Garnett-Florian framework**, NDA 209279, 2017. It pooled **12 placebo-controlled adult trials**, **2,028 patients**, **9 drugs**, and **5 classes**. The slope was **minus 0.055 meters per dyne-second per cm⁵**.

Apply that to BREATHE-3 — **N=19**, change in PVR around **minus 389** — and it predicts a pediatric six-minute-walk improvement of **14 meters**, with **95% CI 3 to 31**.

Same intellectual move: extrapolate adult efficacy through a quantitative pediatric bridge. Different evidence weights.

EMA accepts PK matching alone when similarity is high. FDA pairs it with the hemodynamic surrogate.

For AMB112529, the hemodynamic substudy was only **N=5 paired patients**. PMDA cited it supportively; EMA disclosed it. But it was ==not the bridge==.

==This case is the EMA branch.==

## Cues
- ⏱ 60 sec — two branches, keep them balanced
- 🎚 Neutral on EMA and FDA; both are legitimate paths
- ⚠ The illustrative scatter dots are not real trial-level dots
- ✅ Land on "this case is the EMA branch"

## Bridge
→ But the case ran under three simultaneous disruptions — let me show you what AMB112529 absorbed.`,

  // Slide 11 — CS1 three disruptions (TRIAL / REGULATORY / COMMERCIAL)
  'cs1-outcome': `## Spoken
AMB112529 had three disruptions happening at the same time.

**==One — trial.==** Enrollment stopped before a clean efficacy answer. The program was held from **2013 to 2017**, formally terminated in **2019**, and ended with **39 of 66** planned patients evaluable. The pediatric dataset became confirmatory, not a standalone efficacy trial.

**==Two — regulatory.==** Pediatric PAH dose selection was under scrutiny. The sildenafil history made regulators cautious about empirical pediatric dose escalation. That pushed the program toward exposure matching.

**==Three — filing.==** Label outcomes followed filing geography. EMA and PMDA proceeded. The filing-details answer is Q&A material if asked; I would not volunteer it here.

Trial interruption, regulatory caution, filing geography. All three pointed away from a conventional pediatric efficacy trial.

The next slide is how the dose bridge held.

## Cues
- ⏱ 55–65 sec — three constraints only
- 🎚 Say each card plainly; no mini-lecture
- ⚠ Do NOT volunteer HR 3.95, exposure margins, two deaths, GSK/Gilead rights, or FDA non-filing unless asked
- ✅ End with "how the dose bridge held"

## Bridge
→ The framework, in five steps.`,

  // Slide 12 — CS1 5-node framework (380 → 2-cmt → AUC → 39 → −3%)
  'cs1-bracket': `## Spoken
Here is the five-step chain from adult anchor to pediatric dose.

**==Step 01.==** **380 adult patients**, six studies pooled, **3,126 PK observations**. That is the anchor.

**==Step 02.==** A **two-compartment** PopPK model with first-order absorption and lag. Allometric exponents were prespecified: clearance to weight **0.75**, volume to weight **1.0**.

**==Step 03.==** Simulate AUC by weight band, using the adult AUCss range as the target.

**==Step 04.==** **39 evaluable pediatric patients** in AMB112529, with **211 sparse PK observations**, ages **8 to under 18**. The pediatric data did not create the framework. They confirmed the exposure bridge.

**==Step 05.==** **Minus 3%** at the low dose and **plus 0.3%** at the high dose, pediatric AUCss versus adult target.

Anchor, model, simulate, confirm, match. Five steps, one defensible dose.

## Cues
- ⏱ 60 sec — one breath per step
- 🎚 Make this sound like a workflow you can defend, not a slogan
- ⚠ Do NOT say the model was built on 39 patients
- ✅ Land on "pediatric data confirmed the exposure bridge"

## Bridge
→ The match itself — the result.`,

  // Slide 13 — CS1 exposure match (-3% / +0.3% + density overlay)
  'cs1-verdict': `## Spoken
This is the result.

**==Minus 3%.==** Pediatric AUCss versus adult target at the low dose: **4.82 versus 4.98 microgram-hours per mL**.

**==Plus 0.3%.==** High dose: **9.15 versus 9.12**.

The density curves on the slide are illustrative, but the means are real. The message is that the pediatric distribution sits inside the adult exposure target.

Cmax,ss ran **11 to 18% higher** than adult. That is important to say plainly. It stayed interpretable against adult safety experience, and body weight was the only retained covariate. No independent age effect.

So the result is not complicated: ==exposure matching==. That is what cleared EMA and PMDA.

## Cues
- ⏱ 60 sec — let the two numbers land
- 🎚 Plain result voice, not a climax
- ⚠ Say the curves are illustrative; do not imply they are extracted from the paper
- ✅ Land on "exposure matching"

## Bridge
→ Outcome and codification next — what the agencies did, and what ICH did four years later.`,

  // Slide 14 — CS1 outcome + codification (EMA/PMDA/ICH E11A pins + FDA caveat)
  'cs1-lesson': `## Spoken
EMA and PMDA approved pediatric ambrisentan in 2021. ICH E11A codified the extrapolation framework in 2024.

**==EMA, 2021.==** Pediatric Volibris, ages **8 to 17**, three weight bands, two dose levels: **2.5 to 10 mg once daily**.

**==PMDA, 2021.==** Same exposure-matching framework. GSK Japan announced the pediatric Volibris approval on **March 23, 2021**, and the Japanese label cites the AMB112529 hemodynamic substudy.

**==ICH E11A, December 2024.==** The extrapolation continuum was codified. Where similarity is high, exposure matching can carry more of the inference.

So the framework prefigured the standard by four years.

The same architecture is now the working template for pediatric PAH programs: adult efficacy as anchor, pediatric PK as bridge, totality of evidence for submission.

One proactive note on FDA. FDA never received the package. That is a split-rights commercial outcome, not a regulatory rejection. The Letairis label says safety and effectiveness in pediatric patients have not been established. As of 2026, ambrisentan still has no formal FDA pediatric indication.

## Cues
- ⏱ 75 sec — outcome, codification, FDA caveat
- 🎚 Calm on FDA; state it once and move on
- ⚠ Do NOT make this defensive
- ✅ Land on "no formal FDA pediatric indication"

## Bridge
→ Three takeaways that travel beyond ambrisentan, then we hand off to Case 02.`,

  // Slide 15 — CS1 → CS2 bridge (three takeaways: methodology / architecture / regulatory outcome)
  'cs1-bridge': `## Spoken
So what travels beyond ambrisentan?

First, **==methodology==**. Where similarity is high, PK matching can support the dose. ICH E11A later codified that as part of the extrapolation continuum.

Second, **==architecture==**. Inheritance is the strength. The adult data build the model; pediatric data confirm whether the bridge is adequate. **39 patients cannot build the whole answer, but 39 patients can confirm one.**

Third, **==regulatory outcome==**. The practical endpoint was dose labeling: **8 to 17 years**, three weight bands, two dose levels. EMA and PMDA accepted the exposure bridge.

So case one is a rare pediatric pulmonary disease where the model made the dose defensible.

Case two is a different problem: oncology, India, and a regulatory waiver where the clinical pharmacology package had to replace a local trial.

## Cues
- ⏱ 45 sec — three takeaways and move
- 🎚 Conversational summary; this should sound like you closing the loop
- ⚠ Do NOT add a fourth takeaway
- ✅ Land on "clinical pharmacology package had to replace a local trial"

## Bridge
→ Case 02 divider — Ivosidenib · India CDSCO regulatory waiver.`,

  // Slide 00 — Placeholder reference (retire when next slide ships).
  placeholder: `## Spoken
*Reference scaffolding slide — not delivered. Demonstrates the standard layout system for V5 authoring.*`,

  // ══════════════════════════════════════════════════════════════
  // CS2 — Ivosidenib · India CDSCO regulatory waiver · CYAN
  // ══════════════════════════════════════════════════════════════

  'cs2-divider': `## Spoken
Second case.

This is ivosidenib — a first-in-class IDH1 inhibitor. By early 2025 it was already approved in more than forty-two countries: FDA, EMA, PMDA, NMPA, MFDS, Health Canada, and many others.

But even with that global record, ==Indian patients still did not have access==.

The issue was not whether the drug worked. The pivotal evidence existed. The problem was that CDSCO expected local clinical evidence, and ==no Indian patient had been enrolled in a pivotal ivosidenib trial==.

So the question became simple: could the ==global clinical pharmacology dossier== do the job that a local trial normally does?

That is the case.

## Cues
- ⏱ ~40 sec — reset after CS1; do not oversell
- 🎚 Plain contrast: 42+ countries globally, but Indian patients still did not have access
- 🎚 Say CDSCO as letters: C-D-S-C-O. Full name if needed: Central Drugs Standard Control Organization.
- ⚠ Do not add internal filing details or launch timing
- ✅ Land on "could the global clinical pharmacology dossier do the job?"

## Bridge
→ Next two slides set the disease and regulatory background before the case question lands.`,

  'cs2-bg-disease': `## Spoken
By August 2024, ivosidenib had been approved in forty-two countries — including major reference regulators and many national agencies.

==India was not one of them.==

That was ==not because the science was immature==. By then, the drug had years of post-approval experience in the U.S. and a broad global dossier.

The issue was structural. India still generally required pre-approval local clinical data — often a Phase 3 study or a bridging PK/PD study — before registering a foreign-approved drug.

So this slide asks the question for the case: can a global clinical pharmacology package register a drug in India ==without a local trial==?

## Cues
- ⏱ ~45 sec — setup only; do not answer the question yet
- 📍 Map cue: global approvals first, then India
- ⚠ Do not preview Rule 101 here
- ✅ Keep the question clean: "without a local trial?"

## Bridge
→ Next: disease background — IDH1 mechanism and epidemiology before the regulatory pivot.`,

  'cs2-disease': `## Spoken
Quick biology orientation.

IDH1 mutations occur in about ==six to ten percent of AML== and about ==thirteen percent of intrahepatic cholangiocarcinoma==. So both populations are small, and both sit inside broader cancers.

The mechanism is straightforward. Mutant IDH1 produces 2-hydroxyglutarate, an oncometabolite. That disrupts epigenetic regulation and blocks differentiation. Ivosidenib inhibits mutant IDH1, lowers 2-HG, and helps restore differentiation.

Before 2018, these patients did not have a targeted IDH1 option. Ivosidenib changed that, starting with the FDA label in relapsed or refractory AML in July 2018.

One detail matters later: this is a ==somatic tumor mutation, not a germline inherited variant==. That becomes important when we talk about ethnic sensitivity.

## Cues
- ⏱ ~50 sec — orient, then move
- 🎚 "Let me orient you" tone
- ⚠ Say "intrahepatic cholangiocarcinoma" for the 13% figure
- ⚠ Do not bring in UGT1A1; keep metabolism for Q&A if needed
- ✅ Land on: "somatic, not germline"

## Bridge
→ Next: IDH inhibitor history and competitor context — why ivosidenib is the molecule in this case.`,

  'cs2-competitors': `## Spoken
One class-history point before the India decision.

IDH1 and IDH2 mutations were identified in 2008 and 2009. By 2010, 2-HG was established as an oncometabolite. That gave the field a very clear hypothesis: inhibit mutant IDH, lower 2-HG, and restore differentiation.

The first approved IDH inhibitor was enasidenib for IDH2-mutant AML in 2017. Ivosidenib followed in 2018 as the ==first IDH1 inhibitor==, with later labels in cholangiocarcinoma and frontline AML.

Olutasidenib and vorasidenib are part of the broader field, but they are ==not the India registration story==.

So the molecule here is specific: ivosidenib, IDH1, AML and cholangiocarcinoma, ==globally approved before India==.

## Cues
- ⏱ ~35 sec — this is context, not a competitor lecture
- ⚠ Do not call ivosidenib the first IDH inhibitor; it is the first IDH1 inhibitor
- ✅ Land on: "IDH1, AML and cholangiocarcinoma, globally approved before India"

## Bridge
→ Next: the Indian regulatory pathway — why global approval still was not enough.`,

  'cs2-bg-regulatory': `## Spoken
Now the India regulatory context.

Under NDCTR 2019, local Phase III data were generally expected for many new drugs. For orphan oncology drugs, that could mean eighteen to thirty-six months of delay for local efficacy data that small populations may not realistically generate.

Then on ==August 7, 2024==, DCGI issued an order under Rule 101.

It named six reference agencies: FDA, EMA, PMDA, MHRA, TGA, and Health Canada. It also named five eligible categories: orphan drugs, gene and cell therapies, pandemic-related products, defense-related products, and drugs with significant therapeutic advancement.

Ivosidenib fit two of those categories: orphan designation and significant therapeutic advancement.

But the order ==did not create an automatic approval==. ==It opened the pathway.== The scientific question still had to be answered: can the global evidence be extrapolated safely to Indian patients?

That answer came from the ==clinical pharmacology dossier==.

## Cues
- ⏱ ~50 sec — precise, but not legalistic
- ⚠ Say "August 7, 2024" exactly
- ⚠ Do not say "blanket waiver" or "automatic waiver"
- ✅ Land on: "the clinical pharmacology dossier"

## Bridge
→ Next slide frames the case question: can the dossier replace the trial?`,

  'cs2-setup': `## Spoken
This is the moment the abstract waiver question became operational.

In December 2024, the SEC asked for a ==PK/PD study in the Indian population==.

That request is reasonable in the old framework. It asks: do you have local Indian PK/PD data before approval?

But the evidence to answer the underlying scientific question was already in hand: PopPK with **253 patients** where race was not significant, PBPK-supported DDI labeling, and flat exposure-response across the studied range.

The issue was timing. A local PK/PD study could add ==twelve to eighteen months==. For IDH1-mutant AML, especially older unfit patients, that delay is not academic.

So the strategy was to show that the ==existing clinical pharmacology package could answer the local-data question==.

## Cues
- ⏱ ~35 sec — thesis slide
- 🎚 Plain and deliberate
- ⚠ Do not introduce the six pillars yet
- ⚠ If challenged, qualify the survival point as the older/unfit AML context
- ✅ Land on: "existing clinical pharmacology package could answer the local-data question"

## Bridge
→ Next: mechanism first — why somatic IDH1 biology matters before statistics.`,

  'cs2-architecture': `## Spoken
Mechanism is the foundation. ⏸

IDH1 R132 is ==somatic== — acquired in the tumor cell, not inherited. The slide shows three cells; only the middle one carries the mutation. If this were germline, every cell would carry it and ancestry would matter. It isn't, and it doesn't. ⏸

The cascade on the left walks through it: mutant IDH1 produces 2-HG, which inhibits TET2 and JmjC dioxygenases, which blocks differentiation. Ivosidenib binds the mutant enzyme directly, restores α-KG production, and the cascade reverses.

There are four IDH inhibitors approved across the field — ivosidenib, enasidenib, olutasidenib, vorasidenib. Different targets, different indications, different years. Ivosidenib is the IDH1 + AML/CCA entrant; that's the case in front of us. ⏸

Mechanism does specific work in the regulatory argument here — because the drug-target lives only in the tumor, the dossier can argue ICH E5 ethnic insensitivity from biology, not just statistics.

## Cues
- ⏱ 50 sec — the foundation slide. Slow, deliberate.
- 🎚 Conversational. This is the framework being laid, not the high-energy moment.
- 📍 Point to the three-cell strip when you say "only the middle one." That visual carries the somatic-vs-germline distinction.
- 🎯 If a panelist asks "why ivosidenib not vorasidenib," the competitor strip on the right answers it: vorasidenib is glioma, not AML.
- ⚠ Do NOT say "ICH E5 Appendix D" here — that's pillar territory on the next slide.
- ⚠ Do NOT inflate. "Mechanism does specific work here" is calibrated; "the intellectual core" overclaims.
- ✅ Land on "from biology, not just statistics" — that's the bridge to the six pillars.

## Bridge
→ Six convergent pillars next — PK similarity, ER similarity, intrinsic, extrinsic, regulatory, mechanism.`,

  // cs2-architecture-v2 — promoted live as the single CS2 mechanism slide.
  // It replaces the earlier duplicate cs2-architecture variant in the manifest.
  'cs2-architecture-v2': `## Spoken
This slide makes three points.

First, ==the mutation is somatic==. Only the tumor cell carries it. In the cell strip on the left, the middle cell is mutant and the neighboring cells are not. If this were germline, every cell would carry it. It is not.

Second, ivosidenib binds the mutant IDH1 enzyme directly. That is the middle cascade: mutant IDH1 drives 2-HG, TET2 and JmjC dioxygenases are inhibited, and differentiation is blocked.

Third, when you inhibit mutant IDH1, ==the cascade reverses==. 2-HG goes down, the epigenetic block is relieved, and differentiation can resume.

The competitor strip is just context. Four IDH inhibitors are approved across the field, with different targets and indications. The one in this case is ivosidenib: IDH1, AML, and cholangiocarcinoma.

Why this matters for regulation is this: the drug target is ==in the tumor, not inherited across the patient==. That is what supports the ethnic-sensitivity argument ==from mechanism, not statistics alone==.

## Cues
- ⏱ ~40 sec — three beats: somatic, binds, reverses
- 📍 Point only when useful: cell strip, cascade, reversal
- ⚠ Do not re-teach competitor history
- ⚠ Do not preview all six pillars here
- ✅ Land on: "from mechanism, not statistics alone"

## Bridge
→ Six convergent pillars — the dossier that made the waiver defensible.`,

  'cs2-pillars': `## Spoken
The dossier had ==six lines of evidence==, and the point is that ==they converged==.

First, mechanism: somatic IDH1 R132, which we just walked through.

Second, PK similarity. Pooled phase one and AGILE PK across two hundred fifty-three patients showed race was not a significant covariate, with linear PK across ethnic groups.

Third, exposure-response. Across the studied range, there was no exposure-efficacy cliff and no exposure-adverse-event relationship that would suggest a different dose. ==Five hundred milligrams once daily== covered the population.

Fourth, intrinsic factors. Age, sex, organ function, and relevant polymorphism questions were characterized, with no demographic dose adjustment.

Fifth, extrinsic factors. Food effect, DDIs, and concomitant-medication scenarios were characterized and managed. The key point is that we did not identify an India-specific extrinsic factor requiring a different dose.

Sixth, global regulatory experience: thirty-plus jurisdictions, years of post-marketing experience, and no ethnicity-specific signal.

No one pillar would have been enough. ==The convergence was the case.==

## Cues
- ⏱ ~60 sec — name all six, but do not over-explain
- 🎚 Count naturally; do not sound like a checklist
- ⚠ Keep anchors to 253, 500 mg once daily, no demographic dose adjustment, thirty-plus jurisdictions
- ✅ Land on: "the convergence was the case"

## Bridge
→ Next: the reversal — CDSCO approves on 14 May 2025.`,

  'cs2-reversal': `## Spoken
Here is the public timeline.

FDA relapsed or refractory AML in 2018. Newly diagnosed AML in 2019. Cholangiocarcinoma in 2021. AML with azacitidine in 2022. EMA conditional marketing authorization in 2023.

Then August 2024: the DCGI Rule 101 order operationalized the waiver pathway.

And then ==May 14, 2025==: CDSCO granted marketing authorization in India.

That is the clean version of the story: public FDA and EMA evidence, a public Rule 101 pathway, and a ==public India authorization==.

The point is not just the date. The point is that the India authorization followed from accumulated regulatory evidence plus a clinical pharmacology package that ==made extrapolation defensible==.

## Cues
- ⏱ ~50 sec — public-record timeline only
- 🎚 Slow on "May 14, 2025"; do not dramatize it
- ⚠ Do not volunteer launch timing, response sequence, presenter names, or internal pathway ownership
- ✅ Land on: "made extrapolation defensible"

## Bridge
→ Next: the reckoning — what we shipped, what we did not.`,

  // cs2-decisive-move notes ARCHIVED 2026-04-26 (slide cut for dedup with Pillar 05).
  // Slide file at _backup/cs2-05c-decisive-move.pre-dedup-2026-04-26.tsx.

  // cs2-velocity notes ARCHIVED 2026-04-27 — timeline merged into cs2-reversal.
  // Slide file remains available but is no longer in manifest.
  'cs2-velocity':`## Spoken
Here's the timeline that tells the regulatory-pluralism story. ⏸

FDA AML, 2018. FDA newly-diagnosed AML, 2019. FDA CCA, 2021. FDA plus azacitidine combination, 2022. EMA conditional marketing authorization, 2023.

==Seven years of public regulatory record.== Four FDA label expansions, an EMA filing, and a global evidence package that grew with every cycle. ⏸

Then, ==August 2024 — the DCGI order==. Rule 101 becomes operational. The regulatory pivot that made the India timeline possible. ⏸

And ==May 2025 — CDSCO approval==. Marketing authorization granted in India.

The Indian approval doesn't stand on its own. It sits on top of seven years of accumulated public evidence and dossier maturation. The Rule 101 framework unlocked the pathway; the clinical pharmacology evidence made the bridge defensible.

## Cues
- ⏱ 45 sec — pacing should mirror the timeline: slow through the early labels, accelerate on the 2024–2025 pivot.
- 🎚 Conversational through the FDA labels. Shift to assertion energy on "then, August 2024."
- 📍 Track the timeline on screen with a slow left-to-right gesture through the milestones.
- ⚠ "Conditional MA" for EMA — be precise about the regulatory category.
- ⚠ The 2019 ND AML approval is for adults ≥75 years or unfit for intensive chemo. If a panelist asks about the 2019 label scope, that's the answer.
- ⚠ Do NOT volunteer launch timing, response sequence, or team-specific pathway ownership on the slide face.
- ✅ Land on "the clinical pharmacology evidence made the bridge defensible."

## Bridge
→ Next: the reckoning — what we shipped, what we did not.`,

  // cs2-outcome notes ARCHIVED 2026-04-26 (slide cut for dedup; "first IDH1 inhibitor
  // in India · 5 Jun 2025 launch" beat folded into cs2-leadership bottom thesis).
  // Slide file at _backup/cs2-08-outcome.pre-dedup-2026-04-26.tsx.

  'cs2-reckoning': `## Spoken
This is the ==honest accounting==.

On the left is ==what the team shipped==.

A mechanism-first defense: somatic IDH1 R132 under the ICH E5 logic.

A six-pillar dossier: convergent evidence in a thirty-six-page justification.

Extrinsic factors characterized: food, DDIs, concomitant medications, and labeling controls, with no India-specific dose change.

And the waiver itself: CDSCO approval on May 14, 2025, with a Phase 4 commitment.

On the right is ==what we did not have==.

No pre-approval Indian PK/PD. Zero Indian sites in AG120-C-001, ClarIDHy, or AGILE. Phase 4 addresses that, but later.

No Indian-specific peer-reviewed PK paper. The inference came from the PopPK analysis with two hundred fifty-three patients and race not significant.

And pharmacovigilance still had to mature locally after approval. That is why the Phase 4 and RWE plan matter.

So the dossier carried the evidence it could carry, and it was ==explicit about what remained uncertain==.

## Cues
- ⏱ ~55 sec — equal weight to credit and gaps
- 🎚 Calm; no apology, no spin
- ⚠ Do not call the gaps minor
- ⚠ Do not add internal document/process details
- ✅ Land on: "explicit about what remained uncertain"

## Bridge
→ Next: functional ownership — what quantitative pharmacology owned, and what partner functions carried.`,

  'cs2-leadership':`## Spoken
This slide is about the operating model.

Quantitative pharmacology owned the ==evidence bridge==: translate the ICH E5 question into testable evidence, integrate PopPK, exposure-response, PBPK, intrinsic and extrinsic factors, and define the Phase 4 PK/PD commitment as the residual-uncertainty plan.

Regulatory affairs owned the agency pathway: filing mechanics, formal responses, and the Rule 101 process.

Medical and PV owned the post-marketing layer: surveillance, local follow-up, and safety commitments.

Regulatory writing owned the response package and traceable submission record. The India affiliate owned in-country execution and meeting logistics.

So ==the handoff was clear==. Quantitative pharmacology answered: can the global evidence extrapolate? Partner functions answered: can the pathway, commitments, and execution hold?

==Both had to be true== for CDSCO to act.

## Cues
- ⏱ ~45 sec — role clarity, not a personal diary
- 🎚 Function-level language
- ⚠ Do not volunteer response chronology, document size, presenter names, or launch timing
- ✅ Land on: "both had to be true"

## Bridge
→ Next slide closes CS2 — what this case proves about regulatory bridging.`,

  'cs2-bridge-recap': `## Spoken
So ==the science was the bridge==.

Three lessons from the case.

First: ==mechanism matters==. The target was somatic IDH1 R132 — tumor-acquired, not germline. That narrowed the ethnic-sensitivity question.

Second: ==convergence matters==. PopPK, exposure-response, PBPK-supported DDI labeling, intrinsic and extrinsic factors, global regulatory experience, and the Phase 4 commitment all had to point in the same direction. No single pillar carried the waiver by itself.

Third: transparency matters. There were no pre-approval Indian PK/PD data. The team named that gap and moved the residual uncertainty into a Phase 4 commitment.

That is the portable point: when a local trial is not feasible, the ==clinical pharmacology dossier can become the bridge==.

## Cues
- ⏱ ~45 sec — close CS2; do not reopen details
- 🎚 Synthesis voice, simple and steady
- ⚠ Do not repeat the full timeline
- ✅ Land on: "the clinical pharmacology dossier can become the bridge"

## Bridge
→ Case 03 — from one regulatory bridge to infrastructure for many future bridges.`,

  // ══════════════════════════════════════════════════════════════
  // CS3 — PharmAgent · AI/ML workflow infrastructure · SAGE
  // ~8 minutes total stage time across 8 slides.
  // ══════════════════════════════════════════════════════════════

  'cs3-divider': `## Spoken
Case three is a ==different kind of case==.

The first two were completed decision stories. Case one: exposure matching supported a pediatric dose. Case two: a clinical pharmacology dossier supported a local-trial waiver.

Case three is forward-looking. It is ==not a regulatory outcome case==, and it is ==not a product pitch==. It is a ==personal research architecture== for a question I think clinical pharmacology will face more often.

If model-informed decisions become more frequent, more auditable, and more agent-assisted, what does the function need to build around the science?

## Cues
- ⏱ 25 sec — clean register shift
- 🎚 Keep this plain: "different kind of case," not a dramatic pivot
- ⚠ Say clearly: not regulatory outcome, not product pitch
- ✅ Land on ==personal research architecture==

## Bridge
→ The question next — the integration layer has to move.`,

  'cs3-question': `## Spoken
Here is the question behind the third case.

In the first two cases, the scientific logic worked. The quantitative bridge carried the dose. The dossier carried the waiver.

But both cases also show the same operating reality: the ==pharmacometrician often becomes the integration layer==.

Data moves between tools. Tables get rebuilt. Outputs get reconciled. Methods text is written from folders, scripts, comments, and memory.

Now add E11A, ICH M15, Rule 101, Project Optimus. The question is not whether the science exists. The question is ==whether the infrastructure lets us apply it repeatedly==.

The science was strong. The ==scaffolding became the constraint==.

## Cues
- ⏱ 45 sec — lived-experience entry point
- 🎚 Conversational, not a product setup
- ⚠ Do not say "AI solves this"
- ✅ Land on ==pharmacometrician becomes the integration layer==

## Bridge
→ The constraint next — what the fragmented workflow looks like.`,

  'cs3-problem': `## Spoken
Here is the problem in operational terms.

The 80/20 split on the slide is ==illustrative==. I would not defend it as a universal measurement. The point is simpler: in many workflows, the science is not always the slowest part. ==The handoffs are.==

Data assembly, EDA, NCA, PopPK, diagnostics, simulation, reporting — each step has useful tools. NONMEM, R, SAS, Phoenix, Word, Excel, QC systems.

The problem is not that these tools are bad. The problem is that they ==do not share state by default==.

So the ==analyst becomes middleware==.

That is the problem PharmAgent is designed around: not replacing scientific judgment, but moving the integration layer into a more traceable architecture.

## Cues
- ⏱ 50 sec — problem-naming slide
- 🎚 Say "illustrative" out loud
- ⚠ Do not blame any vendor or platform
- ✅ Land on ==analyst becomes middleware==

## Bridge
→ The architecture next — first, what an agent actually is.`,

  'cs3-architecture': `## Spoken
First, define the word agent.

An agent is ==not just a chatbot==. A chatbot produces text. An agent is a reasoning loop connected to tools, typed state, structured outputs, and review gates.

In PharmAgent, the LLM decides what step to take next. The math is done by ==deterministic tools==: scipy, numpy, NONMEM, XGBoost, plotting libraries. The LLM does not compute AUC. It chooses the right function, passes the right inputs, and writes the result back to typed state.

The architecture has three levels: supervisor, domain agents, and modeling specialists. The design rule is ==single responsibility==. Data loading does not live inside the NCA agent. NCA and PopPK consume shared typed state.

The current implementation scale on the slide is thirteen specialized agents, one hundred fifty-one deterministic tools, seventy-six workflow templates, thirty-four typed state fields, and twenty-four regulatory guidances in the RAG corpus.

The simple version is: ==agents decide, tools execute, humans approve==.

## Cues
- ⏱ 70 sec — densest CS3 slide
- 🎚 Teach the definition first
- ⚠ Do not say "AI does pharmacometrics"
- ✅ Land on ==agents decide; tools execute; humans approve==

## Bridge
→ Privacy and audit next — the part that makes the architecture credible.`,

  'cs3-landscape': `## Spoken
I want to position this carefully.

I am ==not comparing PharmAgent against validated platforms== and saying it is better. That would be the wrong claim. ==Existing tools are the computation layer==. The point is to keep them.

The slide shows the ecosystem as layers. At the top, the human scientist owns the question and interpretation. PharmAgent sits below that as a ==personal research orchestration layer==: supervisor, domain agents, typed state, workflow trace. Below that are the validated computation tools and libraries.

Governance and privacy run across the workflow. ICH M15 and FDA's AI draft guidance frame the documentation and credibility expectations. SchemaExtractor keeps patient rows out of the reasoning context.

The claim is not superiority. The claim is ==regulated orchestration==: keep validated computation, add state, audit, privacy, and review gates.

## Cues
- ⏱ 45 sec — positioning slide
- 🎚 Explicitly reject the "better than validated platforms" framing
- ⚠ Avoid "deployed," "validated platform," "first," or "superior"
- ✅ Land on ==personal research orchestration layer==

## Bridge
→ The next design choice is privacy and audit from the beginning.`,

  'cs3-decisive-move': `## Spoken
The main design choice was this:

If a system is going anywhere near regulated clinical pharmacology, ==privacy and audit cannot be added later==. They have to be part of the architecture from the beginning.

First, privacy. SchemaExtractor separates raw rows from reasoning context. Local tools compute on the dataset. The LLM receives metadata, summaries, and typed state — ==not patient records==.

Second, audit. Every tool call records timestamp, agent, tool, input hash, output hash, and previous hash. If a past entry changes, the downstream chain no longer matches.

That is the difference between a ==policy promise and a system property==. ==Privacy is a boundary. Audit is a chain.==

## Cues
- ⏱ 55 sec — privacy, then audit
- 🎚 Plain and careful; no "breakthrough" language
- ⚠ Say "tamper-evident," not "tamper-proof"
- ✅ Land on ==privacy is a boundary; audit is a chain==

## Bridge
→ Workflow trace next — what actually happens when the system runs.`,

  'cs3-pilot': `## Spoken
Now make it concrete.

The most useful evidence here is ==not a speed claim==. It is the trace.

A user asks for an NCA or PopPK workflow. The supervisor classifies the request. A specialist agent plans the tool sequence from typed state. Deterministic tools compute the pharmacometric quantities. ==A QC gate requires human review==. The report artifact is generated from the audit trail.

The audit entry records timestamp, agent, tool, input hash, output hash, and previous hash.

So the methods section is not reconstructed later from memory. It comes from ==what actually ran==.

One request becomes a ==replayable evidence trail==.

## Cues
- ⏱ 50 sec — one step, one breath
- 🎚 No time-savings claim
- ⚠ Do not imply autonomous regulatory submission
- ✅ Land on ==what actually ran==

## Bridge
→ The next slide shows that trace as an interactive dossier interface.`,

  'cs3-interactive-dossier': `## Spoken
This is the interface version of the same point.

The important thing is ==not the visual polish== and not a product demo. The important thing is that the workflow state, tool calls, artifacts, review gate, and audit chain are visible in one place.

On the bottom strip, the tool-call log and SHA-256 audit chain show the receipt: what ran, when it ran, which agent called it, and how the chain can be verified.

The center canvas is the orchestration view: supervisor, domain agents, specialist agents, and PharmState. The system is designed so deterministic tools do the computation, typed state carries the evidence, and the human review gate stays explicit.

So this is the practical translation of the architecture: ==not autonomous submission, but replayable, inspectable analysis work==.

## Cues
- ⏱ ~40 sec — describe the interface, do not demo every widget
- 🎚 Keep it grounded: trace, state, review gate, audit chain
- ⚠ Do not call this validated, deployed, or regulatory-ready
- ✅ Land on ==replayable, inspectable analysis work==

## Bridge
→ Bracket Method next — credit outward to the field.`,

  'cs3-bracket': `## Spoken
This is also where I want to ==credit the field==, ==not overclaim the platform==.

The architecture follows existing research patterns: centralized supervisor, domain agents, specialist agents, deterministic tool use, and typed state instead of free-text handoffs.

Then regulated science sets the bar.

ICH M15 frames how MIDD evidence is planned, evaluated, documented, and submitted. FDA's AI draft guidance gives the context-of-use and credibility-assessment frame. Kim et al. gives a scaling and error-containment frame for agent systems.

So the claim is ==not that any agency or paper endorses PharmAgent==. The claim is narrower: the architecture was ==built from research patterns and constrained by standards the field already recognizes==.

## Cues
- ⏱ 50 sec — research-grounded architecture, then standards
- 🎚 Do not sound like a founder demo
- ⚠ Do not imply FDA, ICH, or Kim et al. endorse PharmAgent
- ✅ Land on ==built from research patterns, constrained by recognized standards==

## Bridge
→ The portable principle closes the seminar.`,

  'cs3-portable': `## Spoken
The portable point is simple.

AI in clinical pharmacology is useful when it becomes ==infrastructure, not a substitute for judgment==.

Three cases. Three trial limits. Three clinical pharmacology answers.

In case one, exposure matching carried the dose. In case two, the dossier replaced the local trial. In case three, the platform carries the integration.

==The function still owns the science==. The tools should carry more of the ==trace, the handoff, and the documentation==.

That is the clinical pharmacology thread: when the trial cannot carry the full answer, the discipline has to ==build the framework around it==.

## Cues
- ⏱ 50 sec — keep it simple; no performance close
- 🎚 Simple and steady
- ⚠ Do not add new content
- ✅ Land on ==infrastructure, not a substitute for judgment==

## Bridge
→ Now the common thread — what these three cases share.`,

  // Closing slides — added 2026-04-26 per Phase 0 audit
  'closing-thread': `## Spoken
Here is the common thread.

When the trial is not the answer, the framework matters.

Case one: ambrisentan. ==The trial was untrialable==. Adult anchor, pediatric PopPK, exposure matching, EMA and PMDA approval.

Case two: ivosidenib. ==The local trial was unavailable==. Six-pillar dossier, mechanism anchored, regulator aligned, CDSCO approval with Phase 4 commitment.

Case three: PharmAgent. ==The workflow was unbuilt==. Personal research architecture, privacy boundary, audit chain, ICH M15-aligned documentation logic.

In each case, quantitative pharmacology supplied what the trial alone could not: ==a defensible dose, a defensible dossier, or defensible infrastructure==.

That is what the discipline is for.

## Cues
- ⏱ 60 sec — slow only on the three obstacle words
- 🎚 Keep PharmAgent framed as research architecture
- ⚠ Do not add a fourth example
- ✅ Land on ==defensible dose, defensible dossier, defensible infrastructure==

## Bridge
→ Now the fit — why this work, this team, this moment.`,

  'closing-merck': `## Spoken
Let me close with the three foundations this talk is meant to show.

First, pediatric extrapolation. The ambrisentan case shows a regulator-tested framework for moving from adult anchors to pediatric PK and a defensible dose.

Second, global-to-local bridging. The ivosidenib case shows how disease mechanism, PK/PD, covariates, and regional reliance can become a defensible dossier when a local trial is infeasible.

Third, AI infrastructure. PharmAgent is my ==personal research architecture== for keeping agent-assisted workflows anchored to deterministic tools, human review, and an audit trail.

The through-line is the same: ==methods, regulatory discipline, and infrastructure== that turn complex science into evidence people can trust.

## Cues
- ⏱ 60–75 sec — conclusion, not a new case
- 🎚 Objective summary voice; no company-specific tailoring
- ⚠ Keep PharmAgent as personal research architecture
- ✅ Land on ==methods, regulatory discipline, infrastructure==

## Bridge
→ Open the floor.`,

  'closing-thanks': `## Spoken
Thank you.

I would be glad to ==take your questions==.

We can go deeper on any of the three cases: pediatric PAH, the India ivosidenib waiver, or the ==PharmAgent research architecture==. Or we can talk about how this translates to ==QP2 and CMD priorities==.

==Three cases. Three trial limits. Three clinical pharmacology answers.==

## Cues
- ⏱ 30 sec — minimal; let the silence after "questions" do the work
- 📍 Stand still. Hands at your sides or on the lectern. Do NOT pace.
- 🎯 Eye contact with the panel chair first; then the rest of the panel.
- ⚠ Do NOT preview answers before they ask
- ✅ Stop after the final line and let the chair open Q&A

## Bridge
→ First question.`,

  // ══════════════════════════════════════════════════════════════
  // BACKUP SLIDES — conservative presenter-mode notes generated 2026-04-27.
  // These prevent empty presenter panes; live-deck notes above remain primary.
  // ══════════════════════════════════════════════════════════════

  'cs1-backup-master': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS1 backup library overview==:
- ==Main point==: Opens the ambrisentan defense library across history, methodology, data cuts, risk mitigation, and regulatory precedent.
- ==Use when asked==: Use as a navigation map when Q&A moves into backup territory.
- ==Boundary==: Do not explain the divider as content; jump to the exact receipt the panel asked for.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-backup-type-1-historical': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS1 historical-context lane==:
- ==Main point==: Covers the broader PAH history, ambrisentan chronology, program detail, endpoint evolution, and full-story backup.
- ==Use when asked==: Use when asked why pediatric PAH extrapolation was difficult before this case.
- ==Boundary==: Keep it historical; do not drift into PopPK methods unless asked.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-backup-timeline-context': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS1 timeline 1995-2026==:
- ==Main point==: Places ambrisentan inside the broader PAH therapy arc and the persistent lag in pediatric evidence.
- ==Use when asked==: Use if asked why this was a clinical pharmacology problem rather than only a modeling problem.
- ==Boundary==: Avoid comparing products competitively; the point is evidence context and pathway evolution.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-backup-timeline-amb-only': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Ambrisentan-only timeline 2004-2024==:
- ==Main point==: Narrows the chronology to ambrisentan adult development, pediatric work, and regional regulatory milestones.
- ==Use when asked==: Use if asked for dates or why agency outcomes were not identical across regions.
- ==Boundary==: Read dates exactly from the slide; do not add unverified timing from memory.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-backup-timeline-program-detail': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS1 program-detail timeline==:
- ==Main point==: Links adult evidence, AMB112529 pediatric study details, and program events that shaped the bridge.
- ==Use when asked==: Use if asked how the pediatric evidence package was built.
- ==Boundary==: Keep the answer at program-architecture level unless a specific event is requested.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B10-endpoints': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Endpoint evolution timeline==:
- ==Main point==: Explains why 6MWD was informative but not a clean single pediatric efficacy anchor.
- ==Use when asked==: Use if asked why the case did not rest on one clinical endpoint.
- ==Boundary==: Respect 6MWD but name its pediatric limitations: growth, cooperation, baseline function, and endpoint noise.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B20-full-story': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Full CS1 story backup==:
- ==Main point==: Compresses the whole CS1 logic chain: clinical problem, evidence gap, exposure bridge, decision, and lesson.
- ==Use when asked==: Use if Q&A becomes fragmented or the panel asks for the whole case again.
- ==Boundary==: Do not read the whole slide; use only the segment that answers the question.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-backup-type-2-methodology': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS1 methodology lane==:
- ==Main point==: Collects dose matrix, allometry, 6MWD handling, Bayesian context, parameters, diagnostics, covariates, and exposure matching.
- ==Use when asked==: Use when asked how the quantitative bridge was technically defended.
- ==Boundary==: Lead with the clinical decision, then explain method only as needed.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B3-dosing': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Dosing scheme matrix==:
- ==Main point==: Shows three pediatric weight bands crossed with low and high dose levels, matched to adult 5 mg and 10 mg QD exposure targets.
- ==Use when asked==: Use if asked how the pediatric regimen was operationalized.
- ==Boundary==: Do not claim AUC matching alone proves efficacy; it supports extrapolation within the totality.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B5-allometry': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Allometric scaling defense==:
- ==Main point==: Defends fixed 0.75 clearance and 1.0 volume exponents as biologically grounded and stable in a small pediatric dataset.
- ==Use when asked==: Use if asked why age or other size functions were not retained.
- ==Boundary==: Do not imply allometry alone solves pediatric PK; it was checked against data and diagnostics.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B6-6mwd': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==6MWD endpoint validity==:
- ==Main point==: Explains that 6MWD is informative in pediatric PAH but noisy and not sufficient as a single decision anchor.
- ==Use when asked==: Use if asked why the clinical endpoint did not carry the entire pediatric decision.
- ==Boundary==: Do not dismiss 6MWD; say it supported context while exposure matching carried the decision-grade bridge.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B14-bayesian': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Bayesian borrowing framework==:
- ==Main point==: Frames pediatric evidence borrowing as controlled use of prior information under explicit similarity assumptions.
- ==Use when asked==: Use if asked how rare pediatric datasets can be strengthened without pretending they are larger.
- ==Boundary==: Borrowing depends on exchangeability; if similarity fails, the prior should not carry the decision.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B15-poppk-parameters': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==PopPK parameter table==:
- ==Main point==: Provides the Table S3 parameter receipt: estimates, RSE, IIV, shrinkage, covariance, and structural-model details.
- ==Use when asked==: Use if asked for numerical parameter estimates or why some parameters look unstable.
- ==Boundary==: Do not overinterpret Vp/F; sparse pediatric sampling affects distribution estimates, while exposure predictions remained robust.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B16-model-diagnostics': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Model diagnostics and robustness==:
- ==Main point==: Answers show me the diagnostics with pcVPC, GOF, Vp/F sensitivity, allometry perturbation, covariate stability, and sparse-sampling checks.
- ==Use when asked==: Use if asked whether the fit was adequate or whether sparse sampling undermined the bridge.
- ==Boundary==: The diagnostic defense supports exposure inference, not a claim that every parameter was perfectly estimated.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B17-covariate-analysis': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Covariate analysis==:
- ==Main point==: Shows that liver markers, renal function, age, sex, race, ethnicity, and dose group were tested but not retained beyond body-weight allometry.
- ==Use when asked==: Use if asked what about covariate X or whether race/ethnicity changed dosing.
- ==Boundary==: None retained means no decision-relevant PK improvement in this dataset, not that biology can never matter.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B18-exposure-matching': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Weight-band exposure matching==:
- ==Main point==: Gives the core Table S5 receipt: pediatric low-dose AUC about 3 percent lower than adult 5 mg and high-dose AUC essentially identical to adult 10 mg.
- ==Use when asked==: Use if asked for the exact exposure bridge or the 35-<50 kg low-dose subgroup.
- ==Boundary==: Treat the 35-<50 kg low-dose higher AUC as a small-n caution, not a dosing failure.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-backup-type-3-data-cuts': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS1 data-cuts lane==:
- ==Main point==: Collects observed supporting data: long-term extension, DDI/PDE-5 inhibitor context, and hemodynamic substudy support.
- ==Use when asked==: Use when the panel asks for observed data cuts beyond the main exposure bridge.
- ==Boundary==: These are receipts, not standalone proof of pediatric efficacy.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B7-lte': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Long-term extension==:
- ==Main point==: Adds longer-term tolerability and clinical-course context after the core pediatric study window.
- ==Use when asked==: Use if asked whether the pediatric bridge was supported beyond short-term observations.
- ==Boundary==: Uncontrolled extension data are supportive; do not present them as definitive efficacy evidence.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B8-ddi': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==DDI and PDE-5 inhibitor context==:
- ==Main point==: Addresses whether concomitant PAH therapy and interaction context undermined the ambrisentan exposure bridge.
- ==Use when asked==: Use if asked about PDE-5 inhibitor background therapy or real-world combination treatment.
- ==Boundary==: Do not claim absence of all interaction risk; say available context did not undermine the bridge.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B12-hemodynamic': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Hemodynamic substudy==:
- ==Main point==: Provides physiologic support closer to PAH biology than walk distance alone.
- ==Use when asked==: Use if asked whether there was disease-biology support beyond 6MWD.
- ==Boundary==: Hemodynamics corroborate plausibility but do not replace the exposure-matching argument.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-backup-type-4-risk-mitigation': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS1 risk-mitigation lane==:
- ==Main point==: Collects uncomfortable questions: sildenafil STARTS precedent, juvenile rat finding, and FDA submission gap.
- ==Use when asked==: Use when the panel probes known vulnerabilities or agency divergence.
- ==Boundary==: Concede limitations precisely, then return to what the evidence actually supports.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B1-starts': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==STARTS-1 and STARTS-2 detail==:
- ==Main point==: Explains the sildenafil pediatric PAH precedent that made agencies cautious about pediatric extrapolation.
- ==Use when asked==: Use if asked why adult PAH evidence did not automatically translate to children.
- ==Boundary==: Do not turn the answer into a sildenafil seminar; use it only to explain regulatory caution.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B2-rat-finding': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Juvenile rat finding==:
- ==Main point==: Addresses the nonclinical developmental-safety concern and why it had to be managed explicitly.
- ==Use when asked==: Use if asked about clinical hold, developmental risk, or juvenile toxicology.
- ==Boundary==: Do not minimize the finding or speculate beyond the visible slide.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B4-fda-gap': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==FDA submission gap==:
- ==Main point==: Prevents the overclaim that FDA non-approval equals FDA scientific rejection when no FDA pediatric filing was made.
- ==Use when asked==: Use if asked why EMA/PMDA approved while FDA did not.
- ==Boundary==: Keep it to filing/rights and agency-process boundaries; do not speculate on internal commercial decisions.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-backup-type-5-regulatory': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS1 regulatory-precedent lane==:
- ==Main point==: Collects ICH E11A, Garnett-Florian, PIP architecture, and EMA pediatric PAH addendum context.
- ==Use when asked==: Use if asked whether the approach aligns with regulatory science.
- ==Boundary==: Translate guidance into the clinical pharmacology question instead of sounding legalistic.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B9-e11a': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==ICH E11A extrapolation==:
- ==Main point==: Anchors CS1 to structured pediatric extrapolation: similarity, exposure matching, targeted pediatric data, and uncertainty management.
- ==Use when asked==: Use if asked whether adult evidence can support pediatric labeling.
- ==Boundary==: E11A organizes evidence; it does not make weak evidence strong by itself.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B11-garnett-florian': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Garnett-Florian framework==:
- ==Main point==: Places the case in a recognized pediatric extrapolation framework rather than one-off program judgment.
- ==Use when asked==: Use if asked whether the logic generalizes beyond ambrisentan.
- ==Boundary==: Frameworks guide acceptability; agency acceptance still depends on the specific disease, drug, endpoint, and residual uncertainty.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B13-pip': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==PIP architecture and age coverage==:
- ==Main point==: Explains how the European pediatric plan handled age coverage, obligations, and decision points.
- ==Use when asked==: Use if asked how EMA structured the pediatric pathway.
- ==Boundary==: Read ages and dates from the slide; do not add procedural details from memory.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs1-B19-ema-addendum-2026': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==EMA pediatric PAH addendum==:
- ==Main point==: Connects CS1 to newer EMA pediatric PAH thinking about structured extrapolation and uncertainty handling.
- ==Use when asked==: Use if asked whether the field has moved toward this type of evidence integration.
- ==Boundary==: The addendum provides later context, not retrospective proof of the 2021 decision.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside what the slide supports; do not add source details from memory.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs2-backup-master': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS2 backup library overview==:
- ==Main point==: Opens the ivosidenib India defense library: public-facing timeline, six-pillar architecture, dose rationale, and population evidence.
- ==Use when asked==: Use when the panel asks how the CDSCO waiver was scientifically defended.
- ==Boundary==: Stay with public/regulatory-facing facts and high-level scientific rationale; do not add internal engagement details.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside public/regulatory-facing facts; do not add confidential operational details.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs2-backup-type-1-historical': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS2 historical-context lane==:
- ==Main point==: Contains the CDSCO engagement chronology and the regulatory context for the Phase 3 waiver path.
- ==Use when asked==: Use if asked how the waiver path unfolded over time.
- ==Boundary==: Keep it to public milestones and response themes; do not disclose internal process chronology.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside public/regulatory-facing facts; do not add confidential operational details.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs2-B1-cdsco-timeline': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CDSCO engagement timeline==:
- ==Main point==: Shows the staged regulatory path toward CDSCO approval with Phase 4 commitment instead of a local Phase 3 before access.
- ==Use when asked==: Use if asked what happened between the initial waiver question and final approval.
- ==Boundary==: Do not name internal reviewers, decision gates, or operational sequencing beyond the visible slide.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside public/regulatory-facing facts; do not add confidential operational details.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs2-backup-type-2-methodology': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS2 methodology lane==:
- ==Main point==: Collects the scientific architecture behind the waiver: six pillars plus dose-selection rationale.
- ==Use when asked==: Use if asked what evidence supported the waiver beyond regulatory precedent.
- ==Boundary==: Say each pillar reduced uncertainty; none erased the need for Phase 4 commitment.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside public/regulatory-facing facts; do not add confidential operational details.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs2-B2-six-pillar-package': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Six-pillar package==:
- ==Main point==: Summarizes the convergent package: global PK, IDH1 biology, race-insensitive PopPK, metabolism/DDI, exposure-response consistency, and regulatory precedent.
- ==Use when asked==: Use if asked what was actually in the clinical pharmacology package.
- ==Boundary==: Do not make midazolam the pillar; extrinsic-factor logic is broader than one DDI probe.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside public/regulatory-facing facts; do not add confidential operational details.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs2-B3-phase1-dose-rationale': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Phase 1 dose rationale==:
- ==Main point==: Defends 500 mg QD across AML and CCA by plateau-anchored dose selection and MTD not reached.
- ==Use when asked==: Use if asked why the same ivosidenib dose was appropriate across indications.
- ==Boundary==: Do not volunteer raw CSR details or unpublished interpretation; use visible/public-regulatory numbers only.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside public/regulatory-facing facts; do not add confidential operational details.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs2-backup-type-3-data-cuts': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS2 data-cuts lane==:
- ==Main point==: Holds population-evidence details: IDH1 prevalence and UGT1A1/CYP3A4 polymorphism context.
- ==Use when asked==: Use if asked whether Indian ethnicity or regional genetics could change the clinical pharmacology conclusion.
- ==Boundary==: Do not conflate East Asian, Caucasian, and Indian evidence; name which population each data point represents.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside public/regulatory-facing facts; do not add confidential operational details.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs2-B4-population-evidence': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Population evidence==:
- ==Main point==: Shows that prevalence and DME polymorphism differences were reviewed, but did not support a population-specific dose adjustment.
- ==Use when asked==: Use if asked whether Indian or Asian populations require a different ivosidenib dose.
- ==Boundary==: Prevalence affects unmet need and testing strategy, not dose for mutation-positive patients.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- Lead with the direct answer, then use the slide as the receipt.
- Stay inside public/regulatory-facing facts; do not add confidential operational details.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs3-backup-master': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==CS3 optional SPARK-ALL and Asparlas backup library==:
- ==Main point==: This section preserves optional oncology pharmacometrics backup material, even though the live CS3 story is PharmAgent.
- ==Use when asked==: Use only if the panel asks for the alternate pharmacometrics case or trial-design examples beyond PharmAgent.
- ==Boundary==: Do not blend these slides into the live AI/ML case or imply they validate PharmAgent.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- If using these slides, name the boundary: optional SPARK-ALL/Asparlas pharmacometrics backup, not live PharmAgent story.
- Lead with the direct answer, then use the slide as the receipt.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs3-backup-type-2-methodology': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==SPARK-ALL methodology lane==:
- ==Main point==: Contains optimal-design sample-size logic and PopPK-simulated NPAA endpoint rationale from the optional Asparlas case.
- ==Use when asked==: Use if asked about technical trial-design methods, informative priors, or simulated endpoint acceptability.
- ==Boundary==: State clearly that this is optional SPARK-ALL backup material, separate from PharmAgent.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- If using these slides, name the boundary: optional SPARK-ALL/Asparlas pharmacometrics backup, not live PharmAgent story.
- Lead with the direct answer, then use the slide as the receipt.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs3-B1-optimal-design': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Optimal design backup==:
- ==Main point==: Defends sample size by information gain using D-optimality in PopED and pediatric informative prior information.
- ==Use when asked==: Use if asked why N=60 could be scientifically defensible versus N=94.
- ==Boundary==: RSE values illustrate the briefing-package pattern; do not overstate them as public standalone results.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- If using these slides, name the boundary: optional SPARK-ALL/Asparlas pharmacometrics backup, not live PharmAgent story.
- Lead with the direct answer, then use the slide as the receipt.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs3-B2-simulated-endpoint': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Simulated primary endpoint backup==:
- ==Main point==: Explains NPAA >= 0.1 U/mL as a mechanism-linked, PopPK-derived endpoint with FDA precedent from asparaginase review history.
- ==Use when asked==: Use if asked whether a simulated primary endpoint can be scientifically or regulatorily defensible.
- ==Boundary==: Critical correction: FDA deferred acceptance pending more PopPK data; it did not reject the concept outright.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- If using these slides, name the boundary: optional SPARK-ALL/Asparlas pharmacometrics backup, not live PharmAgent story.
- Lead with the direct answer, then use the slide as the receipt.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs3-backup-type-4-risk-mitigation': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==SPARK-ALL risk-mitigation lane==:
- ==Main point==: Handles the uncomfortable question of SPARK-ALL termination and separates program fate from methodological value.
- ==Use when asked==: Use if asked whether trial termination invalidates the case.
- ==Boundary==: Acknowledge termination directly; do not frame it as a success or speculate beyond public record.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- If using these slides, name the boundary: optional SPARK-ALL/Asparlas pharmacometrics backup, not live PharmAgent story.
- Lead with the direct answer, then use the slide as the receipt.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs3-B3-trial-status': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==SPARK-ALL trial status==:
- ==Main point==: States the public record: SPARK-ALL was terminated, enrolled 42 versus planned 60, and listed sponsor decision as the reason.
- ==Use when asked==: Use if asked whether the early termination was scientific failure, regulatory rejection, or safety signal.
- ==Boundary==: Do not speculate. The durable claim is about methodology and agency interaction, not completed registration outcome.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- If using these slides, name the boundary: optional SPARK-ALL/Asparlas pharmacometrics backup, not live PharmAgent story.
- Lead with the direct answer, then use the slide as the receipt.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs3-backup-type-5-regulatory': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==SPARK-ALL regulatory-precedent lane==:
- ==Main point==: Provides the regulatory and pediatric-data anchor behind the optional Asparlas/SPARK-ALL extrapolation logic.
- ==Use when asked==: Use if asked what justified borrowing from pediatric ALL data.
- ==Boundary==: A pediatric prior is useful only if adult observations do not show structural extrapolation failure.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- If using these slides, name the boundary: optional SPARK-ALL/Asparlas pharmacometrics backup, not live PharmAgent story.
- Lead with the direct answer, then use the slide as the receipt.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
  'cs3-B4-pediatric-anchor': `## Spoken
Use this only if the panel asks for this backup detail. Do not volunteer it during the main talk.

Key points for ==Pediatric anchor backup==:
- ==Main point==: Defends the pediatric PopPK model as the prior and adult data as the falsifiable transfer test.
- ==Use when asked==: Use if asked why pediatric Asparlas data could inform adult trial design.
- ==Boundary==: Do not conflate N=124 pooled PopPK dataset with N=13 DFCI-only evaluable subset.

Answer the specific question first. Then point to the exact figure, date, table, or framework on the slide as the receipt.

## Cues
- Backup slide — answer in 20-45 seconds unless the panel keeps probing.
- If using these slides, name the boundary: optional SPARK-ALL/Asparlas pharmacometrics backup, not live PharmAgent story.
- Lead with the direct answer, then use the slide as the receipt.
- If a number is visible, read it exactly.
- Close by returning to the live-deck thread.

## Bridge
→ Return to the current Q&A thread; do not advance through backup slides as a mini-talk.`,
};

export default notes;
