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
  // Mark stagger 16s/37s/55s in the JSX is math-locked to when each bucket
  // word is spoken at 130 wpm with 1.5-sec ⏸ pauses; the 🧷 cues below are
  // the verbatim time-locks the speaker rehearses against. Dropped the tutorial-voice close and
  // the ghost-line "What clinical pharmacology does next." reference (not on
  // the slide; was an unauthorized linter add reverted 2026-04-25).
  'hook-A-trial-not-answer': `## Spoken
It's the question every clinical pharmacologist eventually faces.

==What do you do when the trial that would answer your question can't be run?== ⏸

It can't be run because it's **untrialable** — you ==can't randomize children with a fatal disease to placebo==, you ==can't pull a working drug from patients who need it==, and ==you can't recruit a population the disease itself can barely supply==. ⏸

It can't be run because it's **unavailable** — ==a regulator asks for a local Phase 3 the drug has never seen, in a population the global program never enrolled==, on a timeline that patients do not have. ⏸

It can't be run because it's **unbuilt** — the next decade of clinical pharmacology will need ==infrastructure, audit, and decision tools no vendor can give you off the shelf==. ⏸

Three cases — three trials that couldn't be run — and *three answers anyway*. ⏸ That's the function.

## Cues
- ⏱ 75 sec total — the slide is a stage. The pauses do the work.
- 🎚 Lower register on the three "it can't be run" beats. Each one lands separately. Resist the urge to chain them into a single breath.
- 🧷 Time-lock the three beats: say **"untrialable"** at ~16 sec · **"unavailable"** at ~37 sec · **"unbuilt"** at ~55 sec. Each mark fades onto the slide AS you say its word — visual + voice in lockstep. (Math-locked at 130 wpm; if you naturally run faster or slower, anchor to landing each word on the second mark, not the clock.)
- 📍 Stand still through the three reasons. Step forward on "Three cases — three trials that couldn't be run — and three answers anyway."
- 🎯 Eye contact rotates: first beat to the panel chair, second to a regulatory-leaning panelist if you can identify one, third to the most senior pharmacometrics panelist.
- ⚠ Do NOT name drugs here. Drugs come at S04. Naming a drug now collapses the rhetorical weight of the open.
- ⚠ Do NOT say "today's topic is" or "I'm going to walk you through" or any other tutorial-voice phrase. The hook IS the framing; do not narrate that you are framing.
- ✅ The most quotable line is "Three answers anyway." Land it cleanly.
- ✅ Closing — "Three cases — three trials that couldn't be run — and three answers anyway. ⏸ That's the function." — em-dashes give you the rhythm; the ⏸ before "That's the function" is the load-bearing pause. Hard cut after; do NOT extend.
- 🛟 If you blank, the recovery line is: "Three trials that couldn't be run. Three answers anyway. That's the function."

## Bridge
→ Next slide names the three cases as decision-classes — pediatric extrapolation, regional bridging, forward-looking infrastructure — without yet naming the drugs.`,

  // Slide 03 — Career arc · five stops, one question (~90 sec)
  // Visual: 5 hubs along an ascending amber spine — Jordan → Minnesota
  //   → Merck (intern) → GSK → Servier. Don't read every satellite.
  //   The graphic does the visual work; the speaker names each stop
  //   with ONE concrete fact that earns the panel's trust.
  'career-arc': `## Spoken
Quick background before we get into the cases.

I started as a dentist in Jordan. ⏸ Then PhD in Minnesota with Dr. Brundage — population PK, exposure-response. ⏸

Summer of 2014 I came **here**, to Merck — QP2, as an intern. First time I saw nonlinear-mixed-effects simulation actually ship a drug. *Honestly, that summer is part of why we're sitting here today.* ⏸

Seven years at GSK after that — Clin Pharm modeling and simulation, five therapeutic areas, four approvals during my tenure. The ambrisentan pediatric work happened there — that's case one. ⏸

And since 2022, Director at Servier on the oncology side. Three approvals on my watch — Onivyde, Oncaspar, Tibsovo lifecycle. The India ivosidenib waiver — that's case two.

That's the background. Let me get into the cases.

## Cues
- ⏱ ~80 sec — ~160 words at relaxed conversational pace; the graphic carries the visual, don't read every satellite
- 🎚 Plain, factual register throughout — this is bio, not narrative; resist the urge to make it poetic
- 🎚 Small warm lift on "I came **here**, to Merck" — earn it, don't perform it
- 🎚 Drop the voice slightly on "honestly, that summer is part of why we're sitting here today" — said quietly, not as a punchline
- 🎯 Sweep gesture left-to-right across the five hubs as you name each; the spine ascends — your hand should too
- 🎯 Eye contact: panel chair on Jordan → modeling-leaning panelist on Minnesota → most senior panelist on "I came here, to Merck" → regulatory-leaning panelist on GSK → chair again on Servier
- ⚠ Do NOT recite the slide — the headline already says "Five stops, one question" and the footer already says "what dose, for whom, why?" Saying either out loud is double-spending the emphasis
- ⚠ Do NOT name compounds beyond ambrisentan, ivosidenib, and the public Servier portfolio (Onivyde, Oncaspar, Tibsovo). No CS3 compounds yet.
- ⚠ Do NOT linger on awards or numbers; name once and move
- ⚠ Do NOT preview the AI/ML work — that's CS3
- ✅ Land cleanly on "Let me get into the cases" — that's the working transition, not a poetic landing
- 🛟 If you blank — fallback: "Quick background — dentist in Jordan, PhD in Minnesota, Merck QP2, GSK, now Director at Servier. Onto the cases."

## Bridge
→ Now the agenda — three cases, three impossibilities, one discipline.`,

  // Slide 04 — Roadmap · three cases, one discipline (~75 sec)
  // Visual: 3-card grid (CS1 coral / CS2 cyan / CS3 violet) naming
  //   each case's drug, indication, regulator, and what it proves.
  //   This slide sets the timing expectations for the panel.
  'roadmap': `## Spoken
Three cases. ⏸ Each one a different kind of impossible.

==**Case one — ambrisentan, pediatric PAH.**== A trial that couldn't be run for ethical and demographic reasons — too few children, no acceptable placebo arm, no transferable endpoint. EMA and PMDA approved a pediatric label in 2021 anyway. The framework was exposure matching. ⏸

==**Case two — ivosidenib, India.**== A drug approved in the US and Europe but ==unavailable== to Indian patients because CDSCO required a local Phase 3 the program had no time to run. We replaced the local trial with a six-pillar regulatory dossier under Rule 101. Approved May 2025. ⏸

==**Case three — AI and machine learning in pharmacometrics.**== The infrastructure that the next decade of clinical pharmacology will need — agent-assisted analysis, audit-by-construction, ICH M15-aligned platforms. Personal research, designed to be publication- and regulator-grade.

⏸ ==Three impossibilities — pediatric, geographic, methodological.== One discipline doing the work that carried each one across the line.

About ten minutes per case, then a brief synthesis at the end.

## Cues
- ⏱ ~75 sec — three card-beats + one synthesis line + timing expectations
- 🎚 Lower register on each case-name; let the audience read the card
- 🎯 Gesture toward each card as you name it; left-to-right
- ⚠ Do NOT preview case-level numbers (39 patients, May 14 2025, etc.) — those land inside the case
- ⚠ Do NOT apologize for CS3 being "personal research" — it's positioned deliberately. State it neutrally and move
- ✅ Land cleanly on "About ten minutes per case, then a brief synthesis at the end" — sets the panel's clock
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
The first case study is **==ambrisentan==** ⏸ — an oral selective endothelin-A antagonist for pulmonary arterial hypertension. ==Eight to under eighteen years==. Phase IIb terminated mid-program. EMA and PMDA approved the pediatric label in 2021.

⏸ The clinical pharmacology question is one every pediatric drug-development program faces in some form: ==when a placebo-controlled efficacy trial isn't ethical==, what carries the dose?

## Cues
- ⏱ Land in 25 sec — case opener, no overrun
- 🎯 Eye contact across the panel; don't read the slide
- 🎚 Measured authority — set the tone; the case has eight years of detail behind it
- 📍 Stand center-stage; let the lung illustration land visually
- ⚠ Do NOT mention FDA on this opener — the FDA caveat is on slide 14
- ✅ Land cleanly on "what carries the dose?" — advance

## Bridge
→ Let me put the question in front of you first.`,

  // V2-S2 · Hook + question — 45 sec
  // (manifest order places cs1-question at slot 06, immediately after cs1-divider)
  'cs1-question': `## Spoken
Adult ambrisentan dosing was set in **==380 patients across six placebo-controlled studies==** — a mature exposure-response curve. The standard adult PAH playbook.

⏸ The pediatric trial was different. **Open-label. PK-anchored. ==Forty-one of sixty-six planned==** — terminated mid-program after a juvenile-rat finding. No placebo arm — placebo isn't ethical when active therapies exist as standard of care.

⏸ Held by a juvenile rat finding. Reframed by a sildenafil mortality signal. Constrained by split commercial rights. **And a defensible pediatric dose came out anyway.** This case is how.

## Cues
- ⏱ ~45 sec — pause on the 380-vs-41 asymmetry
- 🎯 Slow on "forty-one of sixty-six" — the asymmetry is the hook
- 🎚 Drop tone slightly on "placebo isn't ethical" — it's the ethics frame, not a complaint
- ⚠ Do NOT say "two of three regulators" — say "EMA and PMDA"
- ⚠ Do NOT inflate the disruption list — name the three, move on
- ✅ Read the obstacle path visual right-to-down: HELD → REFRAMED → CONSTRAINED → APPROVED

## Bridge
→ Disease context first — the panel needs PAH 101 before the framework lands.`,

  // V2-S3 · PAH 101 · disease foundation — 60 sec
  'cs1-context': `## Spoken
Pulmonary arterial hypertension is **==a small-vessel disease of the lungs that kills through right-heart failure==**.

The pulmonary arterioles undergo three things at once — vasoconstriction, smooth-muscle and endothelial proliferation, and in-situ thrombosis. The lumen narrows. Pulmonary vascular resistance rises. The right ventricle has to push blood through a stiffer, narrower bed; it hypertrophies, then dilates, then **fails**.

⏸ Patients don't die of pulmonary hypertension. They die of right-heart failure.

The hemodynamic definition — *2022 ESC/ERS* — is **mean pulmonary arterial pressure ≥ 20 millimeters of mercury, pulmonary vascular resistance ≥ 2 Wood units, with a wedge pressure ≤ 15**. That last criterion is what makes it pre-capillary disease — the pathology is in the arterioles themselves.

There are four therapeutic pathways — endothelin, nitric oxide / cGMP, prostacyclin, and the activin pathway most recently — and ambrisentan blocks the **==endothelin pathway==**, which is the over-active vasoconstrictor and proliferative arm.

Untreated median survival is **==2.8 years==** — that's the *D'Alonzo NIH registry from 1991*, the benchmark every PAH therapy has been measured against.

## Cues
- ⏱ ~60 sec; this slide carries the disease-onboarding load — don't rush
- 🎯 Make eye contact at "they die of right-heart failure" — that's the moment the panel registers severity
- 🎚 Lower volume slightly at "Patients don't die of pulmonary hypertension" — adds weight
- 📍 Gesture toward the lung at "small-vessel disease of the lungs"
- ⚠ Don't dive deeper into the four pathways — name them, move on

## Bridge
→ That's the disease. Mechanism next — what makes ambrisentan the right tool.`,

  // V2-S3b · Mechanism — endothelin pathway · ambrisentan MOA — 60 sec
  'cs1-mechanism': `## Spoken
Three pathways drive PAH. Ambrisentan blocks one — **==selectively==**.

⏸ The visual on the left is the disease state — endothelin-1 binding ETA, the receptor on vascular smooth muscle. Result: vasoconstriction and proliferation. The pulmonary arteriole narrows.

The visual on the right is the same arteriole with ambrisentan on board. Ambrisentan sits on **==ETA==** — over four-thousand-to-one selectivity — leaving **==ETB==** intact. ETB clears endothelin-1 from circulation and releases nitric oxide. So you block the constrictor without taking out the dilator.

⏸ Bosentan binds both — about twenty-to-one. Macitentan, fifty-to-one. **Ambrisentan, four thousand.** That's the selectivity story.

⏸ The other two pathways — nitric oxide / cGMP, prostacyclin — have their own drugs, their own approval years. They sit on the slide as field context. The case is the endothelin pathway.

## Cues
- ⏱ 60 sec — mechanism + competitor frame; don't dwell on disease detail
- 🎚 Slow on "ETA" / "ETB" — the panel needs to register the receptor distinction
- 🎯 Walk the panel left → right across the dual vessel
- ⚠ Do NOT explain endothelin-1 biosynthesis — out of scope, will get probed if you open it
- ⚠ Do NOT inflate selectivity ("massive", "extreme") — the >4000:1 number speaks for itself
- ✅ Land on "that's the selectivity story" — advance

## Bridge
→ Field context next — where ambrisentan sits in the pediatric PAH timeline.`,

  'cs1-history': `## Spoken
Step back from ambrisentan for a beat. ==This is the whole PAH treatment landscape — three decades, four pathways.== ⏸

Before 1995, pulmonary hypertension had ==no targeted therapy==. Oxygen, anticoagulation, and calcium-channel blockers for the small vasoreactive subset. That was it. ⏸

==1995== — epoprostenol IV, the prostacyclin pathway. The first PAH-specific therapy. Continuous infusion through a Hickman line. It worked, but the delivery was brutal. ⏸

==2001== — bosentan. The first oral PAH therapy. Endothelin pathway. Dual ETA-ETB blocker. That's when PAH became a manageable outpatient disease. ⏸

==2005== — sildenafil. The third pathway opens — NO·cGMP. The first PDE5-inhibitor for PAH. ⏸

Then the expansion era. ==2007== — ambrisentan. ==The case I just walked you through.== Selective ETA, oral once-daily. 2013 — macitentan and riociguat. 2015 — selexipag. By the mid-2010s the field had three pathways, multiple oral options, and combination protocols. ⏸

And then — ==March 2024==. Sotatercept. Winrevair. ==Merck.== ==The fourth pathway== — activin signaling, BMPR2 axis. The first new mechanism in PAH in nearly two decades. The STELLAR trial showed it worked. ⏸

The point of this slide. ==Three decades of pathway expansion. Four columns. The fourth is Merck's.== I am interviewing for a Senior Director role at the company that owns the only first-in-class PAH approval of the modern era. That is not an accident — it is why this conversation is happening.

## Cues
- ⏱ 75 sec — pace it. Each era gets its own beat.
- 🎚 Quiet on supportive era; lift on each pathway opening; ==land hard on "Merck owns the fourth column."==
- 📍 Use the timeline as the visual spine. The pathway cards at the bottom are the structural takeaway — point to the sage card on "MERCK ERA."
- 🎯 On "the first new mechanism in PAH in nearly two decades" — pause. Eye contact with the chair.
- ⚠ Do NOT enumerate every drug — the slide does that. Speak to the ARC of expansion.
- ⚠ Do NOT claim familiarity with sotatercept's clinical-pharm package; speak to it as the public-record story (FDA approval, STELLAR trial). Read the Winrevair PI before the talk.
- ⚠ Do NOT inflate the Merck framing past the public record — the role posting and the PAH portfolio are sufficient context.
- ✅ Land cleanly on "that is why this conversation is happening" — full stop. Then advance.

## Bridge
→ AMB112529 trial design + LTE. Now that you know where ambrisentan sits in the field, here is the trial that built the dossier.`,

  // Slide 08 — CS1 field-level timeline (adult + pediatric tracks)
  'cs1-trial': `## Spoken
Pediatric PAH moves slowly. ⏸ Adult drugs above the axis: ==bosentan 2001, sildenafil 2005, ambrisentan 2007, macitentan 2013, selexipag 2015, sotatercept 2024==. Six adult approvals across two decades.

Pediatric arms below — sparser, slower. ==Bosentan 2009 EMA== was the inflection: FUTURE-1, the first PK-matching framework approved in pediatric PAH. Every pediatric ERA program since has used that template.

⏸ Ambrisentan's pediatric path took **==eight years==**. ==Held== — March 2013, juvenile rat brain-weight finding. ==Terminated== — February 2019, at forty-one of sixty-six enrolled. ==Approved== — 2021, EMA and PMDA, on the Okour PopPK package. **The dashed coral arc on the slide is that hold-to-approval rebound.**

⏸ ICH E11A in 2024 codified the framework — four years after this case applied it.

## Cues
- ⏱ 70 sec — timeline-heavy, deliver crisply
- 🎚 Tabular on the years — let the panel see you holding 2001–2024 as a structured field
- 🎯 The eye-contact moment is "eight years" — that's the case's emotional weight
- ⚠ Do NOT linger on individual competitor approvals — name them, move on
- ⚠ Do NOT say "the trial failed" — formal termination on a preclinical signal isn't a Clin Pharm failure
- ✅ Land on "ICH E11A codified the framework — four years after this case applied it"

## Bridge
→ Why no pediatric efficacy trial — five constraints — next.`,

  // Slide 09 — CS1 drug profile + 5 trial-design constraints
  'cs1-architecture': `## Spoken
Ambrisentan in adults: **==selective ETA antagonist, FDA Jun 2007, EMA Apr 2008, PMDA Jul 2010==**. Pivotal program — ARIES-1 and ARIES-2 — about three hundred and eighty patients combined, six-minute walk distance primary endpoint, placebo-controlled. Distinctive feature: hepatotox black-box was *removed* in 2011 — that's what differentiates it from bosentan.

⏸ The right column is **why no pediatric efficacy trial**. Five constraints.

==**One — rarity.**== Pediatric PAH prevalence is two to sixteen per million children. The patient pool barely exists.

==**Two — heterogeneity.**== AMB112529 mix: 66% idiopathic, 20% post-repair congenital heart disease, 10% connective tissue disease, 5% familial. Four mechanistically different etiologies.

==**Three — ethics.**== 80% of children at trial entry were already on baseline PAH therapy. 66% stayed on it. Placebo arms are untenable when you're withholding active treatment.

==**Four — endpoint.**== Six-minute walk distance doesn't transfer to children under seven or eight. Growth confounds longer trials.

==**Five — empirical record.**== ==STARTS-1== — the sildenafil pediatric trial — N=235, prespecified CPET peak VO₂ primary, p=0.056 versus placebo. *Even with 235 patients you couldn't get there.* Sixmwd feasibility limits sit on top of that.

⏸ The clinical question wasn't "does it work in children?" Mechanism is conserved. **The question was: how do you defend a pediatric dose under these constraints?**

## Cues
- ⏱ 90 sec — content-dense; slow on the five constraints
- 🎚 Numbered delivery — "one, two, three, four, five" — gives the panel the structure to follow
- 🎯 STARTS-1 p=0.056 is the constraint with the most weight — pause briefly
- ⚠ Do NOT say "we couldn't run a trial" — say "a placebo-controlled efficacy trial wasn't viable"
- ⚠ Do NOT cite a 6th constraint live — five is the package
- ✅ Land on "how do you defend a pediatric dose under these constraints?" — that's the pivot

## Bridge
→ Now the PopPK build itself — what model, what fit, what exposure match.`,

  // Slide 09b — CS1 PopPK build + fit (added 2026-04-26 per cs1.md "no PK/PD charts")
  'cs1-poppk': `## Spoken
The model: **==two-compartment, first-order absorption with t-lag==**. Allometric scaling — body weight on clearance with exponent zero point seven five, on volume with exponent one — fixed *a priori*, not estimated, because n=39 cannot identify the exponent and because the Holford convention is what regulators expect.

**==Three hundred eighty adult patients build the model. Thirty-nine pediatric patients confirm it.==**

⏸ The parameters land where they should. Clearance over F: **==one point eight six liters per hour, %RSE 5.3==**. Central volume over F: **==17.6 liters, %RSE 7.1==**. Inter-individual variability — BLOCK(6) omega — converged. BLQ around 3% handled with Beal's M3.

⏸ The **==pcVPC==** is the receipt. Eighty percent prediction interval ribbon, observed dots scatter inside it across the full 24-hour interval — *no systematic bias*. The pediatric data sit where the model says they should.

⏸ Then the payoff — **==exposure match==**. Adult target AUCss is two point four two micrograms·h/mL. The three pediatric weight bands — 8 to 25 kg at 2.5 mg, 25 to 50 kg at 5 mg, ≥50 kg at 10 mg — come in at ==minus 2.8%==, ==plus 0.3%==, and ==plus 1.4%== of that adult target.

==**Within three percent. Across all three bands. With 39 patients.**==

## Cues
- ⏱ 75 sec — receipts-heavy; PI defenders mode, slow on the numbers
- 🎚 Tabular cadence on parameter row — "one point eight six … 17.6 … 57.4"
- 🎯 The pcVPC ribbon is the *no systematic bias* line — gesture to it on that phrase
- 🎯 The amber match-percentages are the payoff — slow on "minus 2.8 … plus 0.3 … plus 1.4"
- ⚠ Do NOT promise a covariate-free answer — body weight IS the covariate (allometry); cite Okour 2023 if asked
- ⚠ Do NOT estimate the allometric exponent — it was prespecified at 0.75/1.0 (Holford 1996, FDA-anchored)
- ✅ Land on "within three percent across all three bands"

## Bridge
→ Now what that match means in the regulatory record — the EMA path versus the FDA path.`,

  // Slide 10 — CS1 two architectural precedents (FUTURE-1 + Garnett-Florian)
  'cs1-results': `## Spoken
Pediatric ERA bridging has **two recognized architectures**. Both established for bosentan. This case is the EMA branch. ⏸

The **EMA path is PK-matching**. ==FUTURE-1== — Beghetti, *British Journal of Clinical Pharmacology*, 2009 — N=36 children, ages 3 to 17. The pediatric AUC came in at ==fifty-four percent of adult target==. The PK match *missed*. **EMA approved the pediatric formulation anyway** — they endorsed the methodology even when execution didn't hit. That's the precedent. The bars on the slide show why this case is tighter: AMB112529 hit ==97% of adult AUC at low dose==, much closer than FUTURE-1.

⏸ The **FDA path is the Garnett-Florian framework**. NDA 209279, 2017. Pooled twelve placebo-controlled adult trials, **two thousand twenty-eight patients**, nine drugs across five classes. Slope on the scatter plot — **==minus zero point oh five five meters per dyne-second per cm⁵==**. Apply it to BREATHE-3 — N=19, change in PVR around minus 389 — and the framework predicts a pediatric six-minute-walk improvement of ==fourteen meters, 95% confidence interval three to thirty-one==. Bridging accepted.

The amber star on the chart is that BREATHE-3 prediction. The whisker is the confidence interval.

⏸ Same intellectual move — extrapolate adult efficacy through a quantitative pediatric bridge. Different evidence weights. **EMA accepts PK-matching alone when similarity is high; FDA pairs it with the hemodynamic surrogate.** This case is the EMA branch.

⏸ One reason: the AMB112529 hemodynamic substudy was N=5 paired patients — too few to anchor a Garnett-Florian-style analysis. The substudy data were cited supportively by PMDA, disclosed in the EMA submission. Not used as the bridge.

## Cues
- ⏱ 90 sec — two architectures, take time on each
- 🎚 Slow on the slope — "minus zero point oh five five meters per dyne-second per cm⁵" — let the units land
- 🎯 The amber star is the chart's payoff — gesture to it on "fourteen meters, 95% CI 3 to 31"
- ⚠ Do NOT pretend the chart's individual scatter dots are real trial data — caption says "illustrative"; if asked, say "the slope and BREATHE-3 prediction are verbatim from the FDA framework; the dot positions illustrate the relationship"
- ⚠ Do NOT critique the FDA path — both paths are legitimate; this case is the EMA branch by design
- ✅ Land on "this case is the EMA branch" — that frames the next slide

## Bridge
→ But the case ran under three simultaneous disruptions — let me show you what AMB112529 absorbed.`,

  // Slide 11 — CS1 three disruptions (TRIAL / REGULATORY / COMMERCIAL)
  'cs1-outcome': `## Spoken
AMB112529 absorbed three simultaneous disruptions. ⏸

==**One — TRIAL.**== March 2013, a juvenile-rat brain-weight finding — three to eight percent reduction in postnatal-day-7 rats. Mechanism-specific to early-postnatal laryngeal anatomy; exposure margins of one-point-eight to seven times human pediatric AUC at 10 milligrams. The trial was held. CHMP submission November 2017. Formal termination February 2019. ==Thirty-nine evaluable of sixty-six planned.== Two deaths across the trial and LTE — both PAH-disease-related; neither attributed to ambrisentan.

⏸ ==**Two — REGULATORY.**== STARTS-2 published 2014 — sildenafil pediatric mortality association, hazard ratio three-point-nine-five at high dose. Since attributed to confounding per AFFILIATE 2024 — but the review window 2017 to 2021 had the field operating under maximum caution on pediatric dose selection.

⏸ ==**Three — COMMERCIAL.**== Day-one split commercial rights. **GSK** held EU plus rest-of-world as Volibris. **Gilead** held US as Letairis. Different sponsors, different filing decisions. Letairis went generic in 2022. EMA and PMDA filings proceeded; the US commercial decision was Gilead's.

⏸ Any one of these would have killed a traditional efficacy trial. The framework absorbed all three.

## Cues
- ⏱ 80 sec — three disruptions, each gets its own beat
- 🎚 Tabular delivery on dates: "March 2013, November 2017, February 2019"
- 🎯 The two deaths are a sub-beat — say it once, don't dwell — Q&A backup B7 carries the LTE detail
- ⚠ Do NOT inflate ("would have killed", "catastrophic", "devastating") — name the disruption, move on
- ⚠ Do NOT defend against the rat finding — exposure margin context is sufficient
- ✅ Land on "the framework absorbed all three" — and advance to the framework slide

## Bridge
→ The framework, in five steps.`,

  // Slide 12 — CS1 5-node framework (380 → 2-cmt → AUC → 39 → −3%)
  'cs1-bracket': `## Spoken
Five steps from adult anchor to pediatric dose. The architecture, not the diagnostics. ⏸

==**Step 01.**== ==Three hundred and eighty== adult patients. Six studies pooled. Three thousand one hundred twenty-six PK observations. Rich sampling — that's the structural anchor.

==**Step 02.**== A **==two-compartment==** PopPK model. First-order absorption with lag. Allometric exponents *prespecified, not estimated* — clearance scales to weight to the 0.75; volume to the 1.0. That's the bridge.

==**Step 03.**== Simulate AUC by weight band — adult AUCss range as the target. Use that to set pediatric doses for the trial.

==**Step 04.**== ==Thirty-nine== evaluable patients in AMB112529. Two hundred eleven sparse PK observations. Eight to under eighteen. **The model wasn't built on N=39 — it was confirmed by it.**

==**Step 05.**== ==Minus three percent== at the low dose, plus zero-point-three percent at the high dose. Pediatric AUCss versus adult target. Plateau exposure-response. ==Match==.

⏸ Anchor → model → simulate → confirm → match. Five steps, one chain, one defensible dose.

## Cues
- ⏱ 75 sec — make every step land separately
- 🎚 Number tone on "0.75 for clearance, 1.0 for volume" — matter-of-factly, allometric is standard
- 🎯 Walk the panel through the five cards left-to-right; pause briefly on each numeral
- ⚠ Do NOT cite M3 method or one-compartment — the model was 2-cmt with absorption lag
- ⚠ Do NOT say "we built the model on 39 patients" — the framework's strength is *inheritance* from N=380
- ✅ Land on "the model wasn't built on N=39 — it was confirmed by it" — that's the architecture line

## Bridge
→ The match itself — the result.`,

  // Slide 13 — CS1 exposure match (-3% / +0.3% + density overlay)
  'cs1-verdict': `## Spoken
This is where the framework earns the case. ⏸

==**Minus three percent.**== Pediatric AUCss versus adult target — at the low dose. Numeric: 4.82 versus 4.98 micrograms per hour per mL.

⏸ ==**Plus zero-point-three percent.**== High dose. 9.15 versus 9.12.

⏸ The density curves on the slide overlap. **The pediatric distribution sits inside the adult distribution.** Geometric means per Okour 2023 — the curves themselves are illustrative Gaussians, not extracted from the paper. The means are real. The visual overlap is the argument.

⏸ Cmax,ss ran eleven to eighteen percent higher than adult — within the safety range we had data for. Body weight was the only retained covariate. No independent age effect.

⏸ **Exposure matching.** That's what cleared the EMA and the PMDA.

## Cues
- ⏱ 60 sec — rhetorical climax of the case
- 🎚 Slow on "minus three percent" and "plus zero-point-three percent" — those are the case's signature numbers
- 🎯 Say "exposure matching" twice — once per dose level
- 📍 Step toward the slide on "pediatric distribution sits inside the adult distribution"
- ⚠ Do NOT claim the curves are reproduced from the paper — caption says illustrative
- ⚠ Do NOT show off the model spec verbally — the result is what landed the approval
- ✅ The phrases the panel will quote: "minus three percent" and "exposure matching"

## Bridge
→ Outcome and codification next — what the agencies did, and what ICH did four years later.`,

  // Slide 14 — CS1 outcome + codification (EMA/PMDA/ICH E11A pins + FDA caveat)
  'cs1-lesson': `## Spoken
EMA and PMDA approved pediatric ambrisentan in 2021. ICH E11A codified the framework in 2024. ⏸

==**Pin one — EMA, 2021.**== Pediatric Volibris. Eight to seventeen years. Three weight bands. Two dose levels — 2.5 to 10 mg once daily.

==**Pin two — PMDA, March 23, 2021.**== Same exposure-matching framework. The Japanese label cites the AMB112529 hemodynamic substudy.

⏸ ==**Pin three — ICH E11A, December 2024.**== Extrapolation continuum codified. Where similarity is high, exposure matching alone is sufficient. **The framework prefigured the standard by four years.**

⏸ Same architecture is the working template for current pediatric PAH programs — adult efficacy as anchor, pediatric PK as bridge, totality of evidence for submission. The methodological insight travels.

⏸ A **proactive note on FDA**. Never received the package — that's a split-rights commercial outcome, not a regulatory rejection. The Letairis label states verbatim that *safety and effectiveness in pediatric patients have not been established*. As of 2026, ambrisentan still has no formal FDA pediatric indication.

## Cues
- ⏱ 75 sec — outcome + codification + caveat
- 🎚 Confident on the pins; lower-key on the FDA caveat — proactive disclosure, not apology
- 🎯 Eye contact on "the framework prefigured the standard by four years"
- 📍 The FDA caveat is on the slide as a dashed-border box — gesture to it when you say "proactive note"
- ⚠ Do NOT defend against the FDA gap — name the structure (split rights), state the label language, advance
- ⚠ Do NOT bridge to MOONBEAM, sotatercept, or Merck pipeline on this slide — hold for Q&A
- ✅ Land cleanly on "no formal FDA pediatric indication" — own it; the next slide is the takeaways

## Bridge
→ Three takeaways that travel beyond ambrisentan, then we hand off to Case 02.`,

  // Slide 15 — CS1 → CS2 bridge (three takeaways: methodology / architecture / deliverable)
  'cs1-bridge': `## Spoken
When the trial cannot carry the dose, the framework does. ⏸ Three takeaways.

==**One — Methodology.**== Where similarity is high, PK matching alone supports the dose. ICH E11A codified this as the extrapolation continuum. The framework prefigured the standard by four years.

⏸ ==**Two — Architecture.**== Inheritance is the framework's strength. Structural model from the adult anchor; pediatric data confirms adequacy. **Thirty-nine patients cannot build a model — thirty-nine patients can confirm one.** EMA accepts PK-matching alone; FDA pairs it with the Garnett-Florian bridge.

⏸ ==**Three — Deliverable.**== The framework's output was a label, not a paper. Eight to seventeen years, three weight bands, two dose levels. EMA and PMDA accepted; ==the model became evidence==.

⏸ From a population we couldn't ethically test — to a population we couldn't geographically reach. **Case two — the regulatory bridge.**

## Cues
- ⏱ 60 sec — three takeaways + one-line CS2 handoff
- 🎚 Confident, declarative — these are takeaways, not proposals
- 🎯 Eye contact on "the model became evidence" — that's the case's portable line
- 📍 The bridge ribbon at the bottom carries the CS2 handoff visually — the inline "regulatory bridging waiver in oncology" turns amber on screen
- ⚠ Do NOT add a fourth takeaway live — three is the package
- ⚠ Do NOT preview ivosidenib's substance — the next divider does that
- ✅ Land on "Case two — the regulatory bridge" and advance immediately

## Bridge
→ Case 02 divider — Ivosidenib · India CDSCO regulatory waiver.`,

  // Slide 00 — Placeholder reference (retire when next slide ships).
  placeholder: `## Spoken
*Reference scaffolding slide — not delivered. Demonstrates the standard layout system for V5 authoring.*`,

  // ══════════════════════════════════════════════════════════════
  // CS2 — Ivosidenib · India CDSCO regulatory waiver · CYAN
  // ══════════════════════════════════════════════════════════════

  'cs2-divider': `## Spoken
Second case. ⏸

Ivosidenib — first-in-class IDH1 inhibitor. Approved in more than forty-two countries by early 2025. ==FDA, EMA, PMDA, NMPA, MFDS, Health Canada, and thirty-plus others.== ⏸

And yet — India's border was still closed.

Not because the drug didn't work. The pivotals were done. The efficacy was settled. The problem was regulatory: India required local clinical data before market authorization, and ==no Indian patient had ever been enrolled in a pivotal ivosidenib trial.== ⏸

So the question was — could a global clinical pharmacology dossier do the work that a local trial would have done? Could the dossier *be* the regulatory bridge?

That's what this case is about.

## Cues
- ⏱ 40 sec — case transition. Let the title card breathe.
- 🎚 Lower energy after CS1 recap. Reset the room before building again.
- 📍 Pause after "India's border was still closed" — let the contrast between 42 countries and zero Indian patients register.
- 🎯 Eye contact with any India-regulatory-aware panelist on "no Indian patient had ever been enrolled."
- ⚠ Do NOT say "bridging study" yet — save that language for the architecture slide.
- ⚠ The "42+ countries" is verified from Servier press data; do not inflate further.
- ✅ Land on "could the dossier *be* the regulatory bridge?" — the thesis question.

## Bridge
→ Next two slides set the disease and regulatory background before the case question lands.`,

  'cs2-bg-disease': `## Spoken
By August 2024, ivosidenib had been approved in ==forty-two countries== — FDA, EMA, NMPA, TGA, and dozens of national agencies on top of that. ⏸

India was not one of them.

Not because the science was incomplete. Not because the drug was new. By 2024 it had six years of post-approval safety data in the U.S. and a multi-jurisdictional dossier. The reason was structural: India still required pre-approval local clinical data — typically a Phase 3 or a bridging PK/PD study — before a foreign-approved drug could be registered. ⏸

So the question this case answers is the one on the screen: ==can a global Clin Pharm package register a drug in India — without a local trial?== ⏸

Let the question hang.

## Cues
- ⏱ 45 sec — the question hangs; do not answer it here.
- 🎚 Drop into conversational. This is "let me set the scene" energy, not assertion.
- 📍 Trace the world map left-to-right when you say "forty-two countries." Land on India when you say "India was not one of them."
- 🎯 Land on "without a local trial?" and HOLD the pause for two beats.
- ⚠ Do NOT preview Rule 101. That's the next slide's job.
- ⚠ "Forty-two countries" — verified from FDA Orange Book + EMA EPAR + Servier public record cross-walk. The number fluctuates as new filings clear; "42+" reads as accurate for Aug 2024.
- ✅ Land on the question without answering it.

## Bridge
→ Next: disease background (IDH1 mechanism, epidemiology) before the regulatory pivot.`,

  'cs2-disease': `## Spoken
Quick orientation on the biology. ⏸

IDH1 mutations show up in about ==six to ten percent of AML== and roughly ==thirteen percent of intrahepatic cholangiocarcinoma==. Both are rare. Both are biologically distinct within their cancers.

The mechanism is clean. Mutant IDH1 produces 2-hydroxyglutarate — an oncometabolite — which drives epigenetic dysfunction and blocks myeloid differentiation. Ivosidenib reverses that: reduces 2-HG, restores differentiation. ⏸

Before 2018, there was no targeted option for these patients. Ivosidenib changed that — first FDA label July 2018 in relapsed/refractory AML.

One thing to note for later: this mutation is ==somatic==, not germline. It's acquired in tumor cells, not inherited. That distinction becomes the intellectual core of the regulatory argument in this case.

## Cues
- ⏱ ~50 sec — context, not the case. Move through it.
- 🎚 Conversational. This is "let me orient you" energy, not assertion energy.
- 📍 The somatic vs. germline foreshadow is deliberate — plant it here, pay it off in the architecture slide.
- ⚠ Do NOT say "UGT1A1" here. That is Q&A-only material. The public metabolism story is CYP3A4.
- ⚠ "~13% intrahepatic CCA" — say "intrahepatic" to be precise; extrahepatic CCA has different IDH1 prevalence.
- ✅ The line the audience should retain is "somatic, not germline."

## Bridge
→ Next slide covers the regulatory landscape — India before and after August 2024.`,

  'cs2-bg-regulatory': `## Spoken
Now the regulatory side. ⏸

Until August 2024, India's New Drugs and Clinical Trials Rules — the NDCTR 2019 — required local Phase III data for most new drugs. For orphan oncology drugs, that meant ==eighteen to thirty-six months of delay== waiting for local efficacy data that India's small disease populations could not realistically generate. ⏸

Then, on ==August 7, 2024==, the Drug Controller General issued an order under Rule 101.

Six reference agencies — ==FDA, EMA, PMDA, MHRA, TGA, Health Canada==. Five eligible drug categories — orphan, gene/cell therapy, pandemic, defense, and significant therapeutic advancement.

Ivosidenib qualifies on two of those five categories: orphan designation and significant therapeutic advancement. ⏸

But — and this is important — ==the pathway opened the door; it did not push the drug through it.== The Subject Expert Committee still required a scientific justification that the global data could be safely extrapolated to the Indian population. That justification was the clinical pharmacology dossier.

## Cues
- ⏱ 50 sec — slightly longer; the regulatory context must be precise.
- 🎚 Build from factual to the "but" turn. The energy shift happens on "the pathway opened the door."
- 📍 Tick off the six reference agencies with a small gesture — the audience needs the institutional list to register, not to memorize.
- ⚠ Say "August 7, 2024" precisely. A panelist may test whether you know the date.
- ⚠ Do NOT say "blanket waiver." The pathway is discretionary, not automatic.
- ⚠ Rule 101 was on the books since 2019 — the Aug 2024 order *operationalized* it. If a panelist corrects you, concede gracefully: "You're right — the rule has been on the books since 2019; the August order specified the reference jurisdictions and categories for the first time."
- ✅ The landing line: "the clinical pharmacology dossier."

## Bridge
→ Next slide frames the case question: can the dossier replace the trial?`,

  'cs2-setup': `## Spoken
So here's the question this case answers. ⏸

==Can a global clinical pharmacology package register a drug in India without a local trial?== ⏸

The operational reality: zero Indian patients in the pivotal trials. Not "a small number" — zero. The dossier — DDI, food effect, special populations, exposure-response, QTc — had to do the work a dedicated bridging study would have done.

And the timeline pressure was real. If we defaulted to a local Phase III or even a bridging PK/PD study, that's twelve to eighteen months of delay. For patients with IDH1-mutant AML — median survival under a year in the unfit population — that delay is the difference between access and no access. ⏸

The answer was to build the dossier so it could stand alone.

## Cues
- ⏱ 35 sec — thesis slide. This is the center of gravity for the entire case.
- 🎚 Slow, deliberate. Every sentence earns its place.
- 📍 Hold still on "zero." Let the number register.
- 🎯 Eye contact with the most senior panelist on "twelve to eighteen months of delay."
- ⚠ Do NOT introduce the pillars yet. The architecture slide owns the scaffold.
- ⚠ "Median survival under a year" — this is for the ND AML ≥75y population. If challenged on the specific number, cite the pre-ivosidenib historical data, not the ivosidenib trial arms.
- ✅ Land on "build the dossier so it could stand alone."

## Bridge
→ Next slide presents the three pillars of the dossier.`,

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

  // cs2-architecture-v2 — A/B variant of cs2-architecture. Single-canvas
  // restatement: cell strip + cascade + competitor column in one frame.
  // Presenter uses EITHER v1 OR v2, not both — pick one in rehearsal.
  'cs2-architecture-v2': `## Spoken
Three claims, one canvas. ⏸

The mutation is ==somatic== — only the tumor cell carries it. Watch the cell strip on the left: middle cell mutant, neighbors clean. Germline would mean every cell. It doesn't. ⏸

The drug ==binds== the mutant enzyme directly — that's the cascade in the middle. Ivosidenib hits mutant IDH1, 2-HG drops, TET2 and the JmjC dioxygenases come back online, differentiation resumes. ⏸

The cascade ==reverses==. ⏸

For context, four IDH inhibitors are approved across the field — different targets, different indications. Ivosidenib is the IDH1 entrant for AML and cholangiocarcinoma. That's the molecule in this case.

Why this matters for the regulatory argument: ==the drug-target lives only in the tumor==. That biology is what lets the dossier argue ICH E5 ethnic insensitivity from mechanism, not just statistics.

## Cues
- ⏱ 40 sec — tighter than v1; the canvas does the work, the speaker narrates over it.
- 🎚 Calm. Three claims, three beats. Don't rush.
- 📍 Point to the cell strip on "only the tumor cell." Point to the cascade midpoint on "binds." Point to the post-flip color on "reverses."
- 🎯 The three italic words on the headline (somatic / binds / reverses) are the only words that need emphasis in the voice.
- ⚠ A/B variant — use EITHER cs2-architecture OR cs2-architecture-v2. Do NOT walk both.
- ⚠ Do NOT preview the six pillars here. That's the next slide's job.
- ✅ Land on "from mechanism, not just statistics." That's the bridge.

## Bridge
→ Six convergent pillars — the dossier that made the waiver defensible.`,

  'cs2-pillars': `## Spoken
Six lines of evidence — and they all converge.

Pillar one is mechanism — the foundation slide we just walked. Somatic IDH1 R132. ⏸

Pillar two is ==PK similarity==. Pooled phase one and AGILE PK across two hundred fifty-three patients — race not a significant covariate. Linear PK across ethnic groups.

Pillar three is ==exposure-response==. Flat across the studied range. No exposure-AE relationship, no exposure-efficacy cliff. Wide therapeutic index. Five hundred milligrams once daily covers the population.

Pillar four — ==intrinsic factors==. No demographic dose adjustment. CYP polymorphism characterized.

Pillar five — ==extrinsic==. PBPK model called the midazolam AUC ratio at zero point one eight. That number went into the Tibsovo USPI.

Pillar six — ==global regulatory==. Thirty-plus jurisdictions, eight years of post-marketing surveillance, no ethnicity-specific signals. ⏸

==No single pillar is sufficient.== The convergence is the case. ICH E5(R1) — fully populated.

## Cues
- ⏱ 60 sec — the heart of the dossier. Slow on each pillar, fast through the convergence.
- 🎚 Build energy across pillars — pillar one is conversational, pillar six is assertion.
- 📍 Stack a visible "pillar 1 / 2 / 3 / 4 / 5 / 6" mental count by lifting fingers if it helps the rhythm.
- 🎯 Eye contact on "the convergence is the case."
- ⚠ Do NOT recite every number — pick three: 253, 0.18, eight years. Audience holds maybe three numbers.
- ⚠ "No single pillar is sufficient" — that line lands the ICH E5(R1) framework. Do not skip it.
- ✅ Landing line: "the convergence is the case."

## Bridge
→ Next: the reversal — CDSCO approves on 14 May 2025.`,

  'cs2-reversal': `## Spoken
==14 May 2025.== ⏸

CDSCO marketing authorization. India approves ivosidenib under Rule 101 — the dossier-led waiver pathway. ⏸

Three beats over four months got us here.

January 2025 — we filed the revised dossier. Six-pillar package, mechanism-first reframe.

March 2025 — in-person SEC defense.

May 2025 — approval. Launch followed in June. ⏸

The waiver was conditional, not categorical — Phase 4 PK/PD study commitment in lieu of pre-approval local data. That's the trade Rule 101 specifies and that's the trade the agency took.

## Cues
- ⏱ 40 sec — climax of CS2. Land each beat.
- 🎚 Slow and assertive on "fourteen May twenty twenty-five." That's the date the case turns on.
- 📍 Step toward the screen on the date. The room reads commitment.
- 🎯 Hold eye contact across the panel during the date — every face should land it.
- ⚠ Do NOT say "approval" before the date. Date first, then the verb.
- ⚠ "Conditional, not categorical" is calibrated; "first-ever" is over-inflation. Do not embellish.
- ✅ Landing line: "Phase 4 commitment in lieu of pre-approval local data."

## Bridge
→ Next: the seven-year regulatory timeline that built up to this.`,

  // cs2-decisive-move notes ARCHIVED 2026-04-26 (slide cut for dedup with Pillar 05).
  // Slide file at _backup/cs2-05c-decisive-move.pre-dedup-2026-04-26.tsx.

  'cs2-velocity':`## Spoken
Here's the timeline that tells the regulatory-pluralism story. ⏸

FDA AML, 2018. FDA newly-diagnosed AML, 2019. FDA CCA, 2021. FDA plus azacitidine combination, 2022. EMA conditional marketing authorization, 2023.

==Seven years of Clin Pharm dossier maturation.== Four FDA label expansions, an EMA filing, and a global Clin Pharm package that grew with every cycle. ⏸

Then, ==August 2024 — the DCGI order==. Rule 101 becomes operational. The regulatory pivot that made the India timeline possible. ⏸

And ==May 2025 — CDSCO approval==. First IDH1 inhibitor available in India.

The Indian approval doesn't stand on its own. It sits on top of seven years of accumulated evidence and dossier maturation. The Rule 101 framework unlocked the pathway — but the Clin Pharm package is what walked through it.

## Cues
- ⏱ 45 sec — pacing should mirror the timeline: slow through the early labels, accelerate on the 2024–2025 pivot.
- 🎚 Conversational through the FDA labels. Shift to assertion energy on "then, August 2024."
- 📍 Track the timeline on screen with a slow left-to-right gesture through the milestones.
- ⚠ "Conditional MA" for EMA — be precise about the regulatory category.
- ⚠ The 2019 ND AML approval is for adults ≥75 years or unfit for intensive chemo. If a panelist asks about the 2019 label scope, that's the answer.
- ✅ Land on "the Clin Pharm package is what walked through it."

## Bridge
→ Next: the reckoning — what we shipped, what we did not.`,

  // cs2-outcome notes ARCHIVED 2026-04-26 (slide cut for dedup; "first IDH1 inhibitor
  // in India · 5 Jun 2025 launch" beat folded into cs2-leadership bottom thesis).
  // Slide file at _backup/cs2-08-outcome.pre-dedup-2026-04-26.tsx.

  'cs2-reckoning': `## Spoken
Honest reckoning. ⏸

What we shipped — left side, four items.

==Mechanism-first defense== — the somatic IDH1 R132 argument under ICH E5.
==Six-pillar dossier== — convergent evidence, thirty-six-page justification.
==PBPK in the label== — midazolam AUC ratio zero point one eight, predicted, qualified, regulatory text.
==Waiver granted with Phase 4== — CDSCO 14 May 2025, conditional on the post-marketing cohort. ⏸

What we did not ship — right side. Three honest gaps.

==No pre-approval Indian PK/PD==. Zero Indian sites in AG120-C-001, ClarIDHy, AGILE — Phase 4 closes that gap, but on a delay.
==No Indian-specific peer-reviewed PK==. The PopPK n=253 with race not significant is the inference, not a published Indian-cohort paper.
==PV maturation at approval==. The Indian pharmacovigilance system continues to scale — Phase 4 plus RWE plan address residual risk. ⏸

The dossier carried what evidence it could. We named what it could not.

## Cues
- ⏱ 55 sec — name the credit AND the gaps. The credibility move is the gap-naming.
- 🎚 Calm and even. Do not dramatize either column.
- 🎯 Hold eye contact on the gap side longer than the credit side. The room reads honesty.
- ⚠ Do NOT call the gaps "minor" or "negligible." That's hedging. Name them straight.
- ⚠ Do NOT inflate the credits. "Mechanism-first defense" is the thing; "groundbreaking strategy" overclaims.
- ✅ Landing line: "we named what it could not."

## Bridge
→ Next: leadership scope — what was mine to build, what belonged to the team.`,

  'cs2-leadership':`## Spoken
Scope. ⏸

The scientific defense was mine to build. That means the scientific argumentation — the case that global data were applicable to the Indian population without pre-approval local data — sat in my scope. ⏸

==Regulatory affairs led the SEC interaction== — the procedural dialogue with CDSCO, the timing of submissions, the Rule 101 waiver application mechanics.

==Medical affairs led the post-marketing surveillance commitments== — the Phase 4 PK/PD study design, the pharmacovigilance protocol, the real-world evidence plan.

==The global Clin Pharm team built the six-pillar evidence package.== Pharmacometrics ran the Bayesian covariate re-estimation. The regulatory writing team authored the thirty-six-page justification document. The Servier India affiliate team presented the package to the SEC in person. ⏸

The SEC raised its first queries in August 2024 — Southeast Asian subset analyses and IDH1 prevalence. We responded in October with a thirty-six-page scientific justification. By December, the SEC had narrowed its requirement from an open-ended query to a specific ask: "conduct PK/PD study in Indian population."

We reframed. Shifted from defending subgroup data to defending the ==mechanism-first argument== — somatic target, CYP3A4-not-UGT1A1, ICH E5 Appendix D.

By April 2025, the SEC had converted a pre-approval hurdle into a ==Phase 4 post-approval commitment== — allowing immediate patient access.

## Cues
- ⏱ 65 sec — this is the longest CS2 delivery. Rehearse the transitions.
- 🎚 Start measured on "mine to build." Build through the team credits. Peak on "Phase 4 post-approval commitment."
- 📍 Credit outward deliberately. Name each team by function, not by person.
- 🎯 Eye contact on "mine to build" — confident, not possessive.
- ⚠ "Thirty-six-page justification" — this is verified from the research. If asked for details, it addressed unmet need, IDH1 prevalence, survival benefits, and the mechanism-first argument.
- ⚠ The SEC timeline: Aug 2024 (queries) → Oct 2024 (36-page response) → Dec 2024 (PK/PD study recommendation) → Jan 2025 (mechanism-first reframe) → Apr 2025 (favorable SEC opinion) → May 2025 (authorization).
- ⚠ The Bracket Method: define your scope clearly, credit outward on everything else. Do NOT claim credit for the regulatory or medical affairs work.
- ✅ Landing line: "allowing immediate patient access."

## Bridge
→ Next slide draws the portable lessons — what this case proves about regulatory bridging.`,

  // ══════════════════════════════════════════════════════════════
  // CS3 — PharmAgent · AI/ML workflow infrastructure · SAGE
  // ~8 minutes total stage time across 8 slides.
  // ══════════════════════════════════════════════════════════════

  'cs3-divider': `## Spoken
Case three. ⏸

This one is different. The first two cases were retrospective — work that's been argued in front of regulators and accepted. This one is ==forward-looking==.

"When the trial isn't the answer for the ==next decade== of decisions." ⏸

The question isn't what clinical pharmacology did. The question is what clinical pharmacology will ==need== — and whether the infrastructure exists to deliver it at the pace the field now demands.

## Cues
- ⏱ 20 sec — divider beat, register shift from retrospective to forward-looking
- 🎚 Slightly lower energy than CS2 close — reset before building the final case
- 🎯 The word "need" carries the weight; land it with a pause
- ⚠ Do NOT name PharmAgent yet — the architecture slide owns that reveal
- ✅ Advance immediately after the transition

## Bridge
→ The question next — what the next decade demands.`,

  'cs3-question': `## Spoken
A senior listener has just heard two cases. ⏸

In CS1, the PopPK took ==years== to defend. In CS2, the six-pillar dossier took ==eighteen months== of cross-functional work. The science was right both times. The scaffolding was the constraint.

⏸ Now name what's coming: ==pediatric extrapolation, regional bridging, dose optimization== under ICH M15, Project Optimus, E11A, Rule 101. The next decade will ask for a hundred more CS1s and CS2s. ⏸

And we cannot keep assembling them case-by-case.

## Cues
- ⏱ 40 sec — the framing slide. Connect CS1/CS2 experience to the problem statement.
- 🎚 Conversational register — "let me tell you what comes next"
- 📍 Gesture backward on "CS1" and "CS2" — physically acknowledge what came before
- ⚠ Do NOT overclaim. Say "the next decade will ask" — not "the next decade demands that AI solve"
- ✅ Land on "cannot keep assembling them case-by-case"

## Bridge
→ The constraint next — 80% scaffolding, 20% science.`,

  'cs3-problem': `## Spoken
Here is the naming of the problem. ⏸

==Pharmacometric workflows are eighty percent scaffolding, twenty percent science.==

The function spent more time on integration — data wrangling, format conversion, report templating, cross-team handoffs, version control, regulatory formatting — than on the analysis itself. ⏸

CS1's PopPK analysis took weeks of modeling. The regulatory package around it took years. CS2's six-pillar dossier had clean science — the eighteen months went to assembly, not to discovery.

⏸ The audience doesn't hear "tools are slow." The audience hears: ==the function spent more time on integration than on analysis — and the next decade can't afford that.==

## Cues
- ⏱ 45 sec — problem-naming slide. The 80/20 split is the headline.
- 🎚 Matter-of-fact delivery on the 80/20. Not dramatic — diagnostic.
- 📍 The two boxes on screen do the visual work. Let the audience read; then speak the consequence.
- ⚠ Do NOT blame any specific tool or vendor. The constraint is structural, not tool-specific.
- ✅ Land on "the next decade can't afford that"

## Bridge
→ The architecture next — PharmAgent.`,

  'cs3-architecture': `## Spoken
This is the architectural answer.  ⏸

==PharmAgent.== A multi-agent platform that orchestrates the full pharmacometric pipeline — data ingestion through ICH M15-ready report — without ever exposing patient rows to the LLM.

==Three levels.==  Level zero: a Supervisor that classifies intent and routes the work. Level one: ten domain agents — Data Manager, NCA, Modeler Manager, PBPK, Statistical, Simulator, QC, Report, Regulatory Intelligence, and General. Level two: three modeling specialists — PopPK, PKPD, and Exposure-Response — sub-routed by the Modeler Manager.  ⏸

==Thirteen agents. One hundred fifty-one deterministic tools. Seventy-six workflow templates.==  Agents decide; tools execute. ==scipy, numpy, XGBoost== do the math. The LLM never computes a number.  ⏸

Four design commitments make this M15-native: ==agents-decide-tools-execute==, ==schema-only privacy==, ==hash-chain audit==, ==human-in-the-loop review gates.==

⏸ Clinical pharmacology hears: "the platform that lets the function ship CS1- and CS2-shaped work at scale." Pharmacometrics hears: "hierarchical multi-agent orchestration with deterministic computation and tamper-evident audit."

## Cues
- ⏱ 60 sec — the densest CS3 slide. Deliver numbers crisply.
- 🎚 Confident, not breathless. The numbers are the argument; don't oversell.
- 📍 Walk the hierarchy left side first (Supervisor → 10 → 3), then the four design commitments on the right
- ⚠ Do NOT say "AI replaces pharmacometricians." Say "the platform carries the scaffolding; the function keeps owning the science."
- ✅ Land on "M15-native by architecture, not by feature"
- 🛟 If I blank: just read the 13 / 151 / 76 / 34 / 24 strip and say "that's the skeleton."

## Bridge
→ The competitive landscape next — what others built, where the gap is.`,

  'cs3-landscape': `## Spoken
Before we go deeper, let me show you the field. ⏸

Five published or commercial systems address fragments of pharmacometric AI.  ==Apollo-AI== from Pfizer — conceptual framework, no implementation. ==pyDarwin== from AstraZeneca — model search only. ==DeepPumas== from PumasAI — neural ODEs inside compartmental models. ==PEARL== from Buffalo — RAG over guidances. ==QSP-Copilot== — multi-agent for systems pharmacology, adjacent domain. ⏸

Each of them solves one cell. ==None covers the full pipeline.==  Data ingestion, NCA, PopPK, QC, simulation, report, audit, M15 — eight columns. PharmAgent fills every one.  ⏸

The gap is not capability. Every cell here works in isolation. ==The gap is integration with audit and privacy by construction.== That is what M15 will reward — not the cleverest model, but the platform that documents itself.

## Cues
- ⏱ 45 sec — fast. The matrix tells the story; you narrate the punchline.
- 🎚 Even tone walking through the five competitors; lift on PharmAgent's row.
- 📍 Eyes on the panel during the punchline, not the screen.
- ⚠ Don't disparage competitors. Each pushed the field forward; PharmAgent stitches the parts.
- ✅ Land on "the platform that documents itself."

## Bridge
→ Privacy and audit — the two commitments next.`,

  'cs3-decisive-move': `## Spoken
Two architectural commitments. ⏸

If the model is the answer, the model has to be ==defendable to a regulator on its own terms==. That means two things.

⏸ ==Privacy by architecture.== Patient data physically cannot reach the LLM. Local computation with typed, encrypted state transfer. No PII in the inference path — ==by construction, not by policy.== ⏸

==Audit by construction.== Hash-chain audit trail. Every analysis step is regulator-replayable. ICH M15-aligned provenance from data ingestion through final report. Deterministic tool outputs — ==not stochastic text.== ⏸

These aren't features. They're the ==conditions under which model-as-answer is acceptable evidence at scale.==

## Cues
- ⏱ 50 sec — the conviction slide. Deliver like you believe it, because you built it.
- 🎚 Slow on "by construction, not by policy." That phrase is the slide.
- 📍 The two commitment cards on screen do the structural work. Name them, then explain.
- 🎯 Eye contact with the most senior panelist on "acceptable evidence at scale."
- ⚠ Do NOT say "we solved privacy" — say "privacy is an architectural constraint, not a policy promise."
- ✅ Landing line: "conditions under which model-as-answer is acceptable evidence"

## Bridge
→ Pilot evidence next — what the platform has shipped.`,

  'cs3-pilot': `## Spoken
What the platform has shipped so far. ⏸

Same scientific output. Faster. ==With audit gates intact.==

PopPK report — from six to eight weeks to ==three to four days==. First draft, review-ready. PBPK DDI package — from four to six weeks to ==one week==. Qualified model plus label draft. Regulatory exposure-response summary — from three to four weeks to ==two to three days==. ICH M15-aligned format. ⏸

Every one of those outputs passed the ==same QC checklists and regulatory review gates== as the manual workflow. The model came faster. It was no less defensible.

## Cues
- ⏱ 40 sec — the evidence slide. Let the comparison table do the work.
- 🎚 Tabular delivery — "from [X] to [Y]" rhythm. Each row is its own beat.
- 📍 The strikethrough old numbers on screen are the visual signal. Gesture across each row.
- ⚠ Say "pilot metrics from internal project runs" — do not overclaim production scale.
- ⚠ The caveat box on the slide is deliberate. Do not skip past it.
- ✅ Land on "the model came faster, and was no less defensible"

## Bridge
→ Bracket Method next — credit outward to the field.`,

  'cs3-bracket': `## Spoken
Scope. ⏸

I designed the platform — the centralized topology, the three-level hierarchy, the deterministic-tool discipline, the hash-chain audit, the privacy-by-construction data layer. ⏸

The ==discipline== that makes it credible came from ==the field==.

ICH M15 defines how model-informed evidence is assessed. Kim et al. 2025 establishes the centralized-topology scaling laws. The MIDD literature defines context-of-use and consequence-of-wrong-decision. The agentic-systems research literature demonstrates that tool-use beats free-text generation for high-stakes outputs. The FDA and EMA PBPK guidances define qualification-not-validation. ⏸

Credibility comes from ==peer-reviewed frameworks==, not from internal claims. The platform stands on published science.

## Cues
- ⏱ 50 sec — the credit-outward slide. Deliberately share credit with the field.
- 🎚 Start with "I designed the platform" — factual, then pivot outward immediately.
- 📍 Walk the right column on screen — name each source as you credit it.
- ⚠ Do NOT spend more than one sentence on what you designed. The emphasis is outward.
- ⚠ Do NOT claim any of the cited work endorses PharmAgent. The platform *uses* the field's frameworks; the field didn't *build* the platform.
- ✅ Land on "peer-reviewed frameworks, not internal claims"

## Bridge
→ The portable principle closes the seminar.`,

  'cs3-portable': `## Spoken
The portable principle. ⏸

==AI in clinical pharmacology is most useful as workflow infrastructure, not model substitution.==

⏸ Three cases. Three decisions. One discipline.

In case one, ==exposure-matching carried the dose.== In case two, ==the dossier replaced the trial.== In case three, ==the platform carries the scaffolding.== ⏸

The function keeps owning the science. The platform carries the integration. The trial is still not the answer — and now the model can keep up.

⏸ ==Three decisions. Three trials that weren't there. Three answers from the same discipline.==

That's the function. That's clinical pharmacology. Thank you.

## Cues
- ⏱ 50 sec — the closer. Land the three-case recap cleanly.
- 🎚 Build from quiet to confident. Each case recap gets one beat.
- 📍 The three recap cards on screen carry the visual summary. Gesture across them.
- 🎯 Eye contact with the panel chair on "thank you."
- ⚠ Do NOT add new content. The closer recaps — it doesn't introduce.
- ⚠ Do NOT rush. Every sentence has been rehearsed. Deliver at the pace you've earned over 45 minutes.
- ✅ Landing line: "Three answers from the same discipline." Full stop. Then "thank you." Full stop.

## Bridge
→ Now the common thread — what these three cases share.`,

  // Closing slides — added 2026-04-26 per Phase 0 audit
  'closing-thread': `## Spoken
The common thread.

==When the trial isn't the answer, the framework is.== ⏸

Case one — ambrisentan. ==Trial untrialable.== Adult anchor, pediatric PopPK, exposure match within three percent. EMA and PMDA, 2021.

Case two — ivosidenib. ==Trial unavailable.== Six-pillar regulatory dossier, MOA-anchored, regulator-aligned. CDSCO India, May 14, 2025.

Case three — PharmAgent. ==Trial unbuilt.== Thirteen agents, one hundred fifty-one tools, ICH M15 by construction. Pilot evidence, eighty percent of the scaffolding cut. ⏸

In each case, the model produced what the trial could not — ==a defensible dose, accepted by a regulator==. That is what quantitative pharmacology is for.

## Cues
- ⏱ 60 sec — synthesis · slow on the three obstacle words ("untrialable / unavailable / unbuilt")
- 🎯 The amber synthesis ribbon at bottom is the thesis — gesture to it on "what quantitative pharmacology is for"
- ⚠ Do NOT add a fourth case or a fourth example — three is the package
- ✅ Land on "what quantitative pharmacology is for"

## Bridge
→ Now the fit — why this work, this team, this moment.`,

  'closing-merck': `## Spoken
Three intersections — this work, this team, this moment.

==One. PAH and sotatercept.== Eight years inside pediatric PAH PopPK and regulatory bridging. Sotatercept, Winrevair, opened the BMPR2 / activin pathway in March 2024 — the fourth column on the history slide. I read that label as a continuation of the work that brought me here. ⏸

==Two. Oncology and rare populations.== The ivosidenib India case was a six-pillar dossier replacing a local trial — MOA-anchored, regulator-aligned. Merck's oncology pipeline has the same structural problem at scale: small populations, fast-moving competitors, regulatory geography that fragments trials. I have run that dossier. ⏸

==Three. Platforms and AI / ML.== PharmAgent is a thirteen-agent platform. ICH M15 audit by construction. Schema-only privacy. Deterministic tool execution. Merck's QP2 organization has stated AI / ML as a strategic priority. I bring a working architecture and a record of regulatory-grade outputs. ⏸

The function keeps owning the science. ==I bring the methods, the regulator-tested judgment, and the platform mindset.==

## Cues
- ⏱ 75 sec — the personal pivot · this is the only place in the deck where "I" carries weight
- 🎚 Slow and deliberate on each intersection — let each card breathe
- 🎯 The three numerals 01 / 02 / 03 read as a structured argument; gesture per number
- ⚠ Do NOT inflate ("uniquely positioned", "perfect fit") — the audience will recoil
- ⚠ Do NOT name a Merck competitor by name — pipeline references stay generic
- ✅ Land on "the methods, the regulator-tested judgment, and the platform mindset"

## Bridge
→ Open the floor.`,

  'closing-thanks': `## Spoken
Thank you. ⏸

I would be glad to take your questions. Three cases — pediatric PAH, India CDSCO, PharmAgent — I'm here to discuss any of them in more depth, or to talk about how that translates to Merck's QP2 / CMD priorities.

The trial is not the only answer.

## Cues
- ⏱ 30 sec — minimal · let the silence after "questions" do the work
- 📍 Stand still. Hands at your sides or on the lectern. Do NOT pace.
- 🎯 Eye contact with the panel chair first; then the rest of the panel.
- ⚠ Do NOT keep talking after "the trial is not the only answer" — that's the close
- ⚠ Do NOT preview your answers ("happy to talk about X") — let them ask
- ✅ Wait for the chair to invite questions. Stand quiet.

## Bridge
→ First question.`,

  'cs2-competitors': `## Spoken
Before I close this case, ==one frame for the IDH inhibitor class itself==. ⏸

The story is sixteen years long. ==2008== — Mardis and Yan publish back-to-back in the New England Journal: IDH1 and IDH2 mutations in AML. 2010 — Dang shows ==2-hydroxyglutarate is the oncometabolite==, the mechanism that makes the mutation druggable. ⏸

Then the race. ==August 2017== — enasidenib. First-in-class IDH2. Celgene and Agios. ==Nine years from gene to approval==. ==July 2018== — ivosidenib. First-in-class IDH1. Tibsovo. Agios, then Servier. The cyan column on the slide. ⏸

Three more approvals follow — ivosidenib in cholangiocarcinoma, the AGILE-trial front-line combination with azacitidine, olutasidenib as the second IDH1 entrant, vorasidenib for grade-2 glioma in 2024. ==Four IDH inhibitors. Three sponsors. Three indications.== A real class. ⏸

And then — ==December 2024==. Sixteen years after the gene was named. Ivosidenib gets the CDSCO Rule-101 waiver. ==First IDH-targeted therapy on the Indian market.== That's the highlighted row. The empty column that finally got filled. ⏸

The point of this slide is not the names of the drugs. The point is the ==pace==. Sixteen years from biology to first-in-class — globally. Sixteen years and ==a few extra months== from biology to first-in-class — in India. The Rule-101 pathway is what closed that gap.

## Cues
- ⏱ 75 sec — pace it. Each era gets its own beat.
- 🎚 Quiet on the discovery beats; lift on "the race"; land hard on "first IDH-targeted therapy on the Indian market."
- 📍 Use the timeline as the visual spine. The competitor cards at the bottom are reference, not the main read.
- 🎯 On "the empty column that finally got filled" — pause. Eye contact with the chair.
- ⚠ Do NOT enumerate every approval. The slide does that. Speak to the ARC.
- ⚠ Do NOT use Servier-internal commercial framing. This is published-record territory only — FDA Orange Book, Servier press releases, CDSCO public record.
- ✅ The line they should remember: "sixteen years to first-in-class globally — and a few extra months to first-in-class in India."

## Bridge
→ Bridge-recap. The class has matured; India is now part of the map. That's the close.`,

  'cs2-bridge-recap': `## Spoken
Three things this case proves. ⏸

==One.== Rule-based regulatory waivers shift the burden to the clinical pharmacology package. If the waiver exists, the package has to stand alone — design it that way from the start. ⏸

==Two.== PBPK-supported DDI labels are now a regulatory expectation, not a nice-to-have, in CYP3A4-perpetrator drugs. The midazolam-AUC-ratio-in-the-label story is not an anomaly. It's the new standard. ⏸

==Three.== Race/ethnicity covariate invariance from PopPK is the modern substitute for a dedicated bridging study — ==but only if the analysis is transparent.== A 253-patient PopPK with no race signal defends the bridge only when the model specification, the covariate screening, and the results are fully documented and defensible. ⏸

Portable lesson for any Clin Pharm organization: the Rule-101-style waiver pathway will expand globally. Regulators in Southeast Asia, Latin America, and Africa are watching. The organizations that have built mature PBPK and PopPK platforms will be the ones that ship under the new regimes. ⏸

Two cases down. Two cases where ==modeling carried the regulatory argument==. Next — where ==the tools themselves become the contribution==.

## Cues
- ⏱ 55 sec — land the lessons, then transition cleanly to CS3.
- 🎚 Each lesson gets its own beat. Number them out loud.
- 📍 Hold up one finger, two fingers, three fingers as you count.
- 🎯 On "but only if the analysis is transparent" — hold eye contact with the most skeptical panelist. The qualifier is what separates a Director-level statement from an overconfident one.
- ⚠ The CS3 tease: "where the tools themselves become the contribution" must align with whatever CS3 (AI/ML) opens with. Coordinate with the CS3 divider.
- ⚠ Do NOT mention specific companies or organizations in the "expand globally" passage — R16 compliance.
- ✅ The line the panel will quote: "the tools themselves become the contribution."

## Bridge
→ CS3 divider. The case transitions from regulatory bridging (existing data, existing tools) to forward-looking infrastructure (new tools, new frameworks).`,
};

export default notes;
