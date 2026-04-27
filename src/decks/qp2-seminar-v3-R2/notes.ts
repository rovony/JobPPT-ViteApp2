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

Three cases — three conventional trials that couldn't be run — and *three answers anyway*. ⏸ That's the function.

## Cues
- ⏱ 75 sec total — the slide is a stage. The pauses do the work.
- 🎚 Lower register on the three "it can't be run" beats. Each one lands separately. Resist the urge to chain them into a single breath.
- 🧷 Time-lock the three beats: say **"untrialable"** at ~16 sec · **"unavailable"** at ~37 sec · **"unbuilt"** at ~55 sec. Each mark fades onto the slide AS you say its word — visual + voice in lockstep. (Math-locked at 130 wpm; if you naturally run faster or slower, anchor to landing each word on the second mark, not the clock.)
- 📍 Stand still through the three reasons. Step forward on "Three cases — three conventional trials that couldn't be run — and three answers anyway."
- 🎯 Eye contact rotates: first beat to the panel chair, second to a regulatory-leaning panelist if you can identify one, third to the most senior pharmacometrics panelist.
- ⚠ Do NOT name drugs here. Drugs come at S04. Naming a drug now collapses the rhetorical weight of the open.
- ⚠ Do NOT say "today's topic is" or "I'm going to walk you through" or any other tutorial-voice phrase. The hook IS the framing; do not narrate that you are framing.
- ✅ The most quotable line is "Three answers anyway." Land it cleanly.
- ✅ Closing — "Three cases — three conventional trials that couldn't be run — and three answers anyway. ⏸ That's the function." — em-dashes give you the rhythm; the ⏸ before "That's the function" is the load-bearing pause. Hard cut after; do NOT extend.
- 🛟 If you blank, the recovery line is: "Three conventional trials that couldn't be run. Three answers anyway. That's the function."

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
→ Now the agenda — three cases, three challenges, one discipline.`,

  // Slide 04 — Roadmap · three cases, one discipline (~75 sec)
  // Visual: 3-card grid (CS1 coral / CS2 cyan / CS3 violet) naming
  //   each case's drug, indication, regulator, and what it proves.
  //   This slide sets the timing expectations for the panel.
  'roadmap': `## Spoken
So here's the agenda — three case studies, and each one is a different kind of challenge, but they all come back to one discipline at the center: ==quantitative pharmacology driving the decision==.

**==Case one — ambrisentan, pediatric PAH==** — the only pediatric trial was terminated mid-program at thirty-nine of sixty-six patients. The question became whether the ==pharmacokinetic bridge== could still carry a pediatric label. EMA and PMDA said yes in 2021 — and the framework that made that possible was ==exposure matching==. ⏸

**==Case two — ivosidenib, India==** — a drug that was approved in the US and Europe but unavailable to Indian patients because CDSCO required a local Phase 3 the program had no time to run. We replaced the local trial with a ==six-pillar regulatory dossier under Rule 101==, and CDSCO approved it May 2025. ⏸

**==Case three — AI and machine learning in pharmacometrics==** — the infrastructure that the next decade of clinical pharmacology will need, from agent-assisted analysis to audit-by-construction to ICH M15-aligned platforms. This is my own research, designed to be ==published==. ⏸

==Three challenges — pediatric, geographic, methodological.== One discipline doing the work that carried each one across the line. About ten minutes per case, then a brief synthesis and questions at the end.

## Cues
- ⏱ ~75 sec — three card-beats + one synthesis line + timing expectations
- 🎚 Even energy across the three cards — don't oversell any single case
- 🎯 Gesture toward each card as you name it — left, center, right
- ⚠ Do NOT preview case-level numbers (39 patients, May 14 2025, etc.) — those land inside the case
- ⚠ Do NOT apologize for CS3 being "personal research" — say "my own research" and move on neutrally
- ✅ Land cleanly on "ten minutes per case, then a brief synthesis and questions at the end" — sets the panel's clock
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
The first case study is **==ambrisentan==** ⏸ — an oral selective endothelin-A antagonist for pulmonary arterial hypertension. ==Eight to under eighteen years==. Phase IIb terminated mid-program. EMA and PMDA approved the pediatric label in 2021.

⏸ The clinical pharmacology question: ==when the pediatric trial is terminated== — can the **==pharmacokinetic bridge==** still carry a pediatric label?

## Cues
- ⏱ Land in 25 sec — case opener, no overrun
- 🎯 Eye contact across the panel; don't read the slide
- 🎚 Measured authority — set the tone; the case has eight years of detail behind it
- 📍 Stand center-stage; let the lung illustration land visually
- ⚠ Do NOT mention FDA on this opener — the FDA caveat is on slide 14
- ✅ Land cleanly on "still carry a pediatric label?" — advance

## Bridge
→ Let me put the question in front of you first.`,

  // V2-S2 · Hook + question — 60 sec
  // (manifest order places cs1-question at slot 06, immediately after cs1-divider)
  // 2026-04-26 r4: headline asks whether the PK bridge can still carry
  // a label; subtitle frames this as exposure matching under program
  // disruption. Notes walk the 380/39 asymmetry + three disruptions.
  'cs1-question': `## Spoken
Here is the question for this case. ⏸ ==When the pediatric trial is terminated — can the pharmacokinetic bridge still carry a pediatric label?==

In other words, this is a disrupted pediatric program testing whether ==exposure matching== can still support **a defensible pediatric dose**.

Let me show you the scale of the problem. **==Three hundred eighty adult patients==** across six studies. A mature adult PK anchor. The standard playbook.

⏸ The pediatric dataset: **==thirty-nine patients==**. Open-label. PK-anchored. No placebo comparator.

And three disruptions running in parallel — a ==juvenile-rat finding== that held enrollment, a ==sildenafil mortality signal== that raised the field's dose-selection bar, and ==split commercial rights== between Gilead and GSK from day one.

⏸ **A defensible pediatric dose came out anyway.** This case is how.

## Cues
- ⏱ ~60 sec — six clean beats; don't add detail
- 🎯 Slow on "thirty-nine patients" — let the contrast with 380 land
- 🧷 Say "exposure matching" exactly — matches the subtitle and avoids overclaiming efficacy
- 🎚 Matter-of-fact on the three disruptions — name them, don't dramatize
- ⚠ Do NOT say "the trial failed" — it was disrupted by a preclinical signal and formally terminated later
- ⚠ Do NOT over-explain the subtitle — use it as the frame, then move to the evidence
- ⚠ Do NOT preview the model or the framework — that's slide 12's job
- ✅ Walk the right-panel timeline: HELD → REFRAMED → CONSTRAINED → APPROVED
- ✅ Land on "this case is how" — match the payoff card on screen

## Bridge
→ Disease context first — the panel needs PAH 101 before the framework lands.`,

  // V2-S3 · PAH 101 · disease foundation — 60 sec
  'cs1-context': `## Spoken
Pulmonary arterial hypertension is **==a small-vessel disease of the lungs that kills through right-heart failure==**.

Three things happen at once — ==vasoconstriction==, ==smooth-muscle and endothelial proliferation==, and ==in-situ thrombosis==. The lumen narrows. Pulmonary vascular resistance — PVR — rises. The right ventricle has to push blood through a narrower, higher-resistance bed; it becomes hypertrophic, then dilates, then **fails**.

⏸ Patients don't die of pulmonary hypertension. They die of right-heart failure.

The hemodynamic definition — *2022 ESC/ERS* — is **mean pulmonary arterial pressure ≥ 20 millimeters of mercury, pulmonary vascular resistance ≥ 2 Wood units, with a wedge pressure ≤ 15**. That last criterion is what makes it pre-capillary disease — the pathology is in the arterioles themselves.

For this case, the target is the **==endothelin pathway==**. Endothelin is the over-active vasoconstrictor and proliferative arm, and ambrisentan blocks ETA.

Untreated median survival is **==2.8 years==** — that's the *D'Alonzo NIH registry from 1991*, the benchmark every PAH therapy has been measured against.

## Cues
- ⏱ ~60 sec; this slide carries the disease-onboarding load — don't rush
- 🎯 Make eye contact at "they die of right-heart failure" — that's the moment the panel registers severity
- 🎚 Lower volume slightly at "Patients don't die of pulmonary hypertension" — adds weight
- 📍 Gesture toward the lung at "small-vessel disease of the lungs"
- ⚠ Don't dive deeper into ETA selectivity — that is the next slide
- ⚠ The slide shows BOTH the 2022 ESC/ERS definition (mPAP ≥20) AND the 2008 Dana Point criteria the trial actually used (mPAP ≥25). You cite the 2022 definition in spoken text — if asked, clarify that AMB112529 enrolled under the older threshold

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
- ⏱ 45 sec — mechanism + competitor frame; don't dwell on disease detail
- 🎚 Slow on "ETA" / "ETB" — the panel needs to register the receptor distinction
- 🎯 Walk the panel left → right across the dual vessel
- ⚠ Do NOT explain endothelin-1 biosynthesis — out of scope, will get probed if you open it
- ⚠ Do NOT inflate selectivity ("massive", "extreme") — the >4000:1 number speaks for itself
- ✅ Land on "that's the selectivity story" — advance

## Bridge
→ Field context next — where ambrisentan sits in the pediatric PAH timeline.`,

  'cs1-history': `## Spoken
Step back from ambrisentan for a beat. ==This slide is the PAH treatment landscape: three decades, four pathway columns.== ⏸

Before targeted therapy, PAH care was mostly supportive: oxygen, anticoagulation, and calcium-channel blockers for the small vasoreactive subset. ==No targeted PAH therapy yet.== ⏸

The first pathway opened in ==1995 with IV epoprostenol== — prostacyclin biology. It was the first PAH-specific therapy. It worked, but the delivery burden was high: continuous infusion, central line, serious interruption risk. ⏸

The second pathway opened in ==2001 with bosentan== — endothelin receptor antagonism. First oral PAH therapy. Dual ETA/ETB blockade. This is the point where outpatient chronic treatment became much more realistic. ⏸

The third pathway opened in ==2005 with sildenafil== — NO / cGMP biology through PDE5 inhibition. That gave the field a second oral axis, not just another endothelin drug. ⏸

Then the field expanded inside those pathways. ==Ambrisentan enters in 2007== — the drug at the center of this case: selective ETA, oral once daily. In ==2013==, macitentan and riociguat broadened the oral landscape. In ==2015==, selexipag added an oral prostacyclin-pathway option. By the mid-2010s, PAH had ==three pathways, multiple oral options, and combination protocols==. ⏸

Then the fourth pathway appears in ==March 2024 with sotatercept== — activin / TGF-beta signaling, rebalancing the BMPR-II axis. This is not an ERA, PDE5 inhibitor, or prostacyclin-pathway drug. It is a new mechanism entering a field that had been organized around the same three pillars for years. ⏸

The point of the slide is simple: ==PAH treatment evolved by pathway expansion.== Ambrisentan sits in the endothelin column. Sotatercept shows why the same pediatric-extrapolation problem is still live in PAH today. That is the bridge back to the case.

## Cues
- ⏱ 75 sec — pace it. Each era gets its own beat.
- 🎚 Quiet on supportive era; lift on each pathway opening; ==the skim anchors are 1995 / 2001 / 2005 / 2007 / 2024==
- 📍 Use the timeline as the visual spine. The pathway cards at the bottom are the structural takeaway.
- 🎯 On "PAH treatment evolved by pathway expansion" — pause. That is the takeaway.
- ⚠ Do NOT enumerate every drug — the slide does that. Speak to the ARC of expansion.
- ⚠ Do NOT claim familiarity with sotatercept's clinical-pharm package; keep it to public-record mechanism and approval context.
- ⚠ Do NOT make this a company-praise slide. It is a pathway-history slide.
- ✅ Land cleanly on "the pediatric-extrapolation problem is still live" — then advance.

## Bridge
→ AMB112529 trial design + LTE. Now that you know where ambrisentan sits in the field, here is the trial that built the dossier.

## Hard Words
- PAH (say letters: P-A-H)
- ambrisentan (am-BRI-sen-tan)
- Letairis (luh-TAIR-iss)
- Volibris (voh-LIB-ris)
- epoprostenol (eh-po-PROS-teh-nol)
- prostacyclin (pros-ta-SY-klin)
- bosentan (bo-SEN-tan)
- endothelin (en-doh-THEE-lin)
- sildenafil (sil-DEN-a-fil)
- macitentan (ma-si-TEN-tan)
- riociguat (rye-oh-SIG-you-at)
- selexipag (seh-LEX-ih-pag)
- sotatercept (so-ta-TER-sept)
- activin (AK-tih-vin)
- TGF-beta (T-G-F beta)
- BMPR-II (B-M-P-R two)
- cGMP (C-G-M-P)`,

  // Slide 08 — CS1 field-level timeline (adult + pediatric tracks)
  'cs1-trial': `## Spoken
Pediatric PAH moves slowly. ⏸ Adult landmarks above the axis: ==bosentan 2001, sildenafil 2005, ambrisentan 2007, macitentan 2013, selexipag 2015, sotatercept 2024==. Six landmarks across two decades — not exhaustive, but enough to show how much faster adult PAH moved.

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

  // Slide 09 — CS1 adult foundation + why pediatric efficacy trial path closes
  'cs1-architecture': `## Spoken
This is the pivot slide. ==Adult evidence existed. The pediatric efficacy-trial path did not.== ⏸

The adult foundation is enough to anchor the question: ARIES established adult PAH efficacy, ETA blockade is mechanistically plausible in pediatric PAH, and the clinical task becomes dose selection. But it is **not** enough to simply repeat the adult trial in children. ⏸

Five things break the classical efficacy-trial logic.

**==One — enrollment.==** Pediatric PAH is rare: roughly two to sixteen per million children. The patient pool barely exists.

**==Two — pooling.==** The AMB112529 population was not one clean phenotype: idiopathic, post-repair congenital heart disease, connective tissue disease, and familial disease.

**==Three — control arm.==** Eighty percent entered on baseline PAH therapy. Sixty-six percent continued it. A clean placebo-controlled pediatric efficacy trial is practically and ethically hard.

**==Four — endpoint.==** Six-minute walk distance does not transfer cleanly to young children. Performance, cooperation, and growth contaminate the signal.

**==Five — precedent.==** STARTS-1 enrolled two hundred thirty-five children and still narrowly missed its prespecified CPET peak VO₂ primary, p=0.056. That is not a throwaway fact. It shows the field had already stress-tested the pediatric efficacy-trial route.

⏸ So the clinical question was not: can we repeat ARIES in children? **The question was: ==how do you defend a pediatric dose under these constraints?==**

## Cues
- ⏱ 65–75 sec — simpler slide face; let the five constraints breathe
- 🎚 Numbered delivery — "one, two, three, four, five" — gives the panel the structure to follow
- 🎯 STARTS-1 p=0.056 is the strongest drill-down fact — pause briefly
- ⚠ Do NOT over-explain the drug profile live — it is now Q&A backup
- ⚠ Do NOT say "the trial failed"; say the traditional efficacy-trial path could not carry the decision
- ✅ Land on "how do you defend a pediatric dose under these constraints?" — that's the pivot

## Bridge
→ Now the PopPK build itself — what model, what fit, what exposure match.`,

  // Slide 09b — CS1 PopPK build + fit (added 2026-04-26 per cs1.md "no PK/PD charts")
  'cs1-poppk': `## Spoken
The model: **==two-compartment, first-order absorption with t-lag==**. Allometric scaling — body weight on clearance with exponent zero point seven five, on volume with exponent one — fixed *a priori*, not estimated, because n=39 cannot identify the exponent and because the Holford convention is what regulators expect.

**==Three hundred eighty adult patients build the model. Thirty-nine pediatric patients confirm it.==**

⏸ The final pediatric parameter table is the receipt. Clearance over F: **==one point one seven liters per hour, %RSE 6.33==**. Central volume over F: **==12.3 liters, %RSE 16.1==**. Peripheral volume: **==81.3 liters, %RSE 24.5==**. Inter-individual variability — BLOCK(6) omega — converged. BLQ around 3% handled with Beal's M3.

⏸ The **==pcVPC==** is the model-check receipt. The paper uses a 90% prediction interval ribbon, and the observed pediatric concentrations sit inside it across the 24-hour interval — *no systematic bias*. The pediatric data sit where the model says they should.

⏸ Then the payoff — **==exposure match==**. At the dose-group level, pediatric low-dose AUCss is **==4.82 versus 4.98==** in adults — about minus three percent. Pediatric high-dose AUCss is **==9.15 versus 9.12==** in adults — essentially identical. The three pediatric weight bands are ≥20 to <35, ≥35 to <50, and ≥50 kg; each sits within the adult model-derived range.

**==Within three percent at the dose-group level. Within adult range across weight bands. With 39 patients.==**

## Cues
- ⏱ 75 sec — receipts-heavy; PI defenders mode, slow on the numbers
- 🎚 Tabular cadence on parameter row — "one point one seven … 12.3 … 81.3"
- 🎯 The pcVPC ribbon is the *no systematic bias* line — gesture to it on that phrase
- 🎯 The amber AUC values are the payoff — slow on "4.82 versus 4.98 … 9.15 versus 9.12"
- ⚠ Do NOT promise a covariate-free answer — body weight IS the covariate (allometry); cite Okour 2023 if asked
- ⚠ Do NOT estimate the allometric exponent — it was prespecified at 0.75/1.0 (Holford 1996, FDA-anchored)
- ✅ Land on "within three percent at dose-group level; within adult range across bands"

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
- ⏱ 60 sec — two architectures, keep each tight
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

**==One — TRIAL.==** Enrollment stopped before a clean efficacy answer. The program was held from 2013 to 2017, formally terminated in 2019, and ended with ==thirty-nine of sixty-six== planned patients evaluable. The important point for the story is not the toxicology detail; it is that the pediatric dataset became confirmatory, not a standalone efficacy trial.

⏸ **==Two — REGULATORY.==** Pediatric PAH dose selection was under scrutiny. The sildenafil history meant regulators were cautious about empirical pediatric dose escalation. That made exposure matching the safer lane.

⏸ **==Three — FILING.==** Label outcomes followed filing geography. EMA and PMDA proceeded. The filing-details answer is in Q&A if asked; it does not need to be volunteered here.

⏸ Trial interruption, regulatory caution, filing geography. All three pointed away from a conventional pediatric efficacy trial. ==The next slide is how the dose bridge held.==

## Cues
- ⏱ 55–65 sec — reduced slide face; keep it high-level
- 🎚 Say each card as a constraint, not as a mini-case
- 🎯 The key phrase is "the next slide is how the dose bridge held"
- ⚠ Do NOT volunteer HR 3.95, exposure margins, two-death detail, GSK/Gilead rights, or FDA non-filing unless asked
- ⚠ Do NOT defend the rat finding live — it is Q&A material
- ✅ Land on "the next slide is how the dose bridge held"

## Bridge
→ The framework, in five steps.

## Hard Words
- ambrisentan (am-BRI-sen-tan)
- Letairis (luh-TAIR-iss)
- Volibris (voh-LIB-ris)
- sildenafil (sil-DEN-a-fil)
- AFFILIATE (uh-FILL-ee-ate)`,

  // Slide 12 — CS1 5-node framework (380 → 2-cmt → AUC → 39 → −3%)
  'cs1-bracket': `## Spoken
Five steps from adult anchor to pediatric dose. The architecture, not the diagnostics. ⏸

**==Step 01.==** ==Three hundred and eighty== adult patients. Six studies pooled. Three thousand one hundred twenty-six PK observations. Rich sampling — that's the structural anchor.

**==Step 02.==** A **==two-compartment==** PopPK model. First-order absorption with lag. Allometric exponents *prespecified, not estimated* — clearance scales to weight to the 0.75; volume to the 1.0. That's the bridge.

**==Step 03.==** Simulate AUC by weight band — adult AUCss range as the target. Use that to set pediatric doses for the trial.

**==Step 04.==** ==Thirty-nine== evaluable patients in AMB112529. Two hundred eleven sparse PK observations. Eight to under eighteen. **The pediatric data did not create the framework — they confirmed the exposure bridge.**

**==Step 05.==** ==Minus three percent== at the low dose, plus zero-point-three percent at the high dose. Pediatric AUCss versus adult target. Adult exposure target matched. ==Match==.

⏸ Anchor → model → simulate → confirm → match. Five steps, one chain, one defensible dose.

## Cues
- ⏱ 60 sec — make every step land separately
- 🎚 Number tone on "0.75 for clearance, 1.0 for volume" — matter-of-factly, allometric is standard
- 🎯 Walk the panel through the five cards left-to-right; pause briefly on each numeral
- ⚠ Do NOT cite M3 method or one-compartment — the PopPK bridge used 2-cmt with absorption lag
- ⚠ Do NOT say "we built the answer on 39 patients" — the framework's strength is *inheritance* from N=380
- ✅ Land on "the pediatric data confirmed the exposure bridge" — that's the architecture line

## Bridge
→ The match itself — the result.`,

  // Slide 13 — CS1 exposure match (-3% / +0.3% + density overlay)
  'cs1-verdict': `## Spoken
This is where the framework earns the case. ⏸

**==Minus three percent.==** Pediatric AUCss versus adult target — at the low dose. Numeric: 4.82 versus 4.98 microgram-hours per mL.

⏸ **==Plus zero-point-three percent.==** High dose. 9.15 versus 9.12.

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

**==Pin one — EMA, 2021.==** Pediatric Volibris. Eight to seventeen years. Three weight bands. Two dose levels — 2.5 to 10 mg once daily.

**==Pin two — PMDA, 2021.==** Same exposure-matching framework. GSK Japan announced the pediatric Volibris approval on March 23; the Japanese label cites the AMB112529 hemodynamic substudy.

⏸ **==Pin three — ICH E11A, December 2024.==** Extrapolation continuum codified. Where similarity is high, exposure matching can carry more of the inference. **The framework prefigured the standard by four years.**

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

  // Slide 15 — CS1 → CS2 bridge (three takeaways: methodology / architecture / regulatory outcome)
  'cs1-bridge': `## Spoken
When the trial cannot deliver the dose, the quantitative bridge makes the dose defensible. ⏸ Three takeaways.

**==One — Methodology.==** Where similarity is high, PK matching alone supports the dose. ICH E11A codified this as the extrapolation continuum. The framework prefigured the standard by four years.

⏸ **==Two — Architecture.==** Inheritance is the framework's strength. Structural model from the adult anchor; pediatric data confirms adequacy. **Thirty-nine patients cannot build a model — thirty-nine patients can confirm one.** EMA accepts PK-matching alone; FDA pairs it with the Garnett-Florian bridge.

⏸ **==Three — Regulatory outcome.==** The practical endpoint was dose labeling. Eight to seventeen years, three weight bands, two dose levels. EMA and PMDA accepted; ==the exposure bridge supported the dose.==

⏸ From a ==rare pediatric pulmonary disease== to a ==regulatory bridging waiver in oncology==. **Case two — the regulatory bridge.**

## Cues
- ⏱ 45 sec — three takeaways + one-line CS2 handoff
- 🎚 Confident, declarative — these are takeaways, not proposals
- 🎯 Eye contact on "the exposure bridge supported the dose" — that's the case's portable line
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
→ Next: IDH inhibitor history and competitor context — why ivosidenib is the molecule in this case.`,

  'cs2-competitors': `## Spoken
Before the India decision, there is one class-history point worth anchoring. ⏸

IDH biology moved quickly once the mutation was named. ==IDH1 and IDH2 mutations were identified in 2008 and 2009==. By 2010, 2-HG was established as an oncometabolite. That gave the field a clean drug-development hypothesis: block mutant IDH, lower 2-HG, restore differentiation.

The first approved IDH inhibitor was ==enasidenib== for IDH2-mutant AML in 2017. Then ==ivosidenib== followed in 2018 as the first IDH1 inhibitor, with later labels in cholangiocarcinoma and frontline AML. Olutasidenib and vorasidenib show the field kept expanding, but they are not the India registration story. ⏸

So this slide prevents a common confusion. This case is not "any IDH inhibitor." It is ==ivosidenib: IDH1, AML plus cholangiocarcinoma, globally approved before India==.

## Cues
- ⏱ 35 sec — class orientation, not a full history lecture.
- 🎚 Keep it crisp. The job is to prevent MOA and competitor questions later.
- 📍 Read left-to-right through discovery → first approvals → competitive landscape.
- ⚠ Do NOT overclaim "first-in-class IDH" for ivosidenib; enasidenib was the first IDH inhibitor. Ivosidenib is the first IDH1 inhibitor.
- ✅ Land on "IDH1, AML plus cholangiocarcinoma, globally approved before India."

## Bridge
→ Next: the Indian regulatory pathway — why global approval still was not enough.`,

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
Three claims, one canvas. ⏸

The mutation is ==somatic== — only the tumor cell carries it. Watch the cell strip on the left: middle cell mutant, neighbors clean. Germline would mean every cell. It doesn't. ⏸

The drug ==binds== the mutant enzyme directly — that's the cascade in the middle. Ivosidenib hits mutant IDH1, 2-HG drops, TET2 and the JmjC dioxygenases come back online, differentiation resumes. ⏸

The cascade ==reverses==. ⏸

For context, four IDH inhibitors are approved across the field — different targets, different indications. Ivosidenib is the IDH1 entrant for AML and cholangiocarcinoma. That's the molecule in this case.

Why this matters for the regulatory argument: ==the drug-target lives only in the tumor==. That biology is what lets the dossier argue ICH E5 ethnic insensitivity from mechanism, not just statistics.

## Cues
- ⏱ 40 sec — the canvas does the work, the speaker narrates over it.
- 🎚 Calm. Three claims, three beats. Don't rush.
- 📍 Point to the cell strip on "only the tumor cell." Point to the cascade midpoint on "binds." Point to the post-flip color on "reverses."
- 🎯 The three italic words on the headline (somatic / binds / reverses) are the only words that need emphasis in the voice.
- ⚠ This is the only live mechanism slide. Do not re-explain the competitor history here.
- ⚠ Do NOT preview the six pillars here. That's the next slide's job.
- ✅ Land on "from mechanism, not just statistics." That's the bridge.

## Bridge
→ Six convergent pillars — the dossier that made the waiver defensible.`,

  'cs2-pillars': `## Spoken
Six lines of evidence — and they all converge.

Pillar one is mechanism — the foundation slide we just walked. Somatic IDH1 R132. ⏸

Pillar two is ==PK similarity==. Pooled phase one and AGILE PK across two hundred fifty-three patients — race not a significant covariate. Linear PK across ethnic groups.

Pillar three is ==exposure-response==. Flat across the studied range. No exposure-AE relationship, no exposure-efficacy cliff. Wide therapeutic index. Five hundred milligrams once daily covers the population.

Pillar four — ==intrinsic factors==. No demographic dose adjustment. Organ function, age, sex, and CYP polymorphism were characterized.

Pillar five — ==extrinsic factors==. Food effect, DDIs, and concomitant-medication scenarios were characterized and managed. The important point is not a midazolam number; it is that there was no India-specific extrinsic factor requiring a different dose.

Pillar six — ==global regulatory==. Thirty-plus jurisdictions, eight years of post-marketing surveillance, no ethnicity-specific signals. ⏸

==No single pillar is sufficient.== The convergence is the case. ICH E5(R1) — fully populated.

## Cues
- ⏱ 60 sec — the heart of the dossier. Slow on each pillar, fast through the convergence.
- 🎚 Build energy across pillars — pillar one is conversational, pillar six is assertion.
- 📍 Stack a visible "pillar 1 / 2 / 3 / 4 / 5 / 6" mental count by lifting fingers if it helps the rhythm.
- 🎯 Eye contact on "the convergence is the case."
- ⚠ Do NOT recite every number — pick three: 253, no dose adjustment, eight years. Audience holds maybe three anchors.
- ⚠ "No single pillar is sufficient" — that line lands the ICH E5(R1) framework. Do not skip it.
- ✅ Landing line: "the convergence is the case."

## Bridge
→ Next: the reversal — CDSCO approves on 14 May 2025.`,

  'cs2-reversal': `## Spoken
Public record, then the reversal. ⏸

First, the accumulated regulatory record. FDA AML in 2018. Newly diagnosed AML in 2019. CCA in 2021. AML plus azacitidine in 2022. EMA conditional marketing authorization in 2023. ⏸

Then the policy door opened: ==August 2024 — the DCGI Rule 101 order==. Public waiver categories operationalized.

And then the reversal: ==14 May 2025== — CDSCO marketing authorization in India. ⏸

This is the cleaner way to tell the timeline: public FDA and EMA evidence, public Rule 101 pathway, public India authorization. The internal engagement sequence belongs in Q&A, not on the slide.

The point is not just the date. The point is that India authorization followed a public Rule 101 pathway built on accumulated FDA and EMA regulatory evidence.

## Cues
- ⏱ 50 sec — merged slide; do not re-teach every prior CS2 slide.
- 🎚 Slow and assertive on "fourteen May twenty twenty-five." That's the date the case turns on.
- 📍 Track the four public timeline beats left-to-right, then land on the hero date.
- 🎯 Hold eye contact across the panel during the date — every face should land it.
- ⚠ Do NOT volunteer launch timing, internal response sequence, file size, presenter names, or team-specific pathway ownership.
- ⚠ "Public record" is deliberate — slide face stays source-safe.
- ✅ Landing line: "public Rule 101 pathway built on accumulated FDA and EMA regulatory evidence."

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
- ⚠ Do NOT volunteer launch timing, internal response sequence, or team-specific pathway ownership on the slide face.
- ✅ Land on "the clinical pharmacology evidence made the bridge defensible."

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
→ Next: functional ownership — what quantitative pharmacology owned, and what partner functions carried.`,

  'cs2-leadership':`## Spoken
Function-level ownership. ⏸

This slide is deliberately not a hero slide about one person. It is the operating model. Quantitative pharmacology owned the ==evidence bridge==: translate the ICH E5 question into testable evidence, integrate PopPK, exposure-response, PBPK, intrinsic and extrinsic factors, and define the Phase 4 PK/PD commitment as the residual-uncertainty plan. ⏸

==Regulatory affairs== owned the agency pathway — filing mechanics, formal responses, and the Rule 101 process.

==Medical and PV== owned the post-marketing layer — surveillance, local follow-up, and safety commitments.

==Regulatory writing== owned the response package and traceable submission record. ==The India affiliate== owned in-country execution and meeting logistics. ⏸

The leadership point is the handoff: quantitative pharmacology answers, ==can the global evidence extrapolate?== Partner functions answer, ==can the pathway, commitments, and execution hold?==

Both sides had to hold for CDSCO to act.

## Cues
- ⏱ 45–50 sec — this is a role-clarity slide, not a diary of internal events.
- 🎚 Function-level language throughout. Avoid "mine," "I chose," or "my scope" unless directly asked.
- 📍 Point left for evidence ownership, right for execution ownership.
- 🎯 Eye contact on "can the global evidence extrapolate?" — that is the quantitative pharmacology role.
- ⚠ Do NOT volunteer internal response chronology, document size, presenter names, or launch timing.
- ⚠ If asked about personal role, answer in Q&A using bounded language: "my contribution sat inside the quantitative pharmacology evidence bridge."
- ✅ Landing line: "both sides had to hold."

## Bridge
→ Next slide closes CS2 — what this case proves about regulatory bridging.`,

  'cs2-bridge-recap': `## Spoken
The science was the bridge. ⏸

Three lessons from this case.

==Mechanism is the foundation.== The target was somatic IDH1 R132 — tumor-acquired, not germline. That made the ethnic-sensitivity question scientifically narrower.

==Convergence is the case.== PopPK, exposure-response, PBPK-supported DDI labeling, intrinsic and extrinsic factors, global regulatory experience, and Phase 4 commitment all had to point the same way. No single pillar would have carried the waiver alone. ⏸

==Transparency earns trust.== There were no pre-approval Indian PK/PD data. The team named that gap and moved the residual uncertainty into a Phase 4 commitment.

That is the portable point: when a local trial is not feasible, ==the Clin Pharm dossier becomes the bridge==.

## Cues
- ⏱ 45 sec — close the case; do not reopen details.
- 🎚 Calm, senior, synthesis voice. This is the lesson, not the evidence dump.
- 📍 Three beats only: mechanism, convergence, transparency.
- ⚠ Do NOT repeat the full timeline. It has already landed.
- ✅ Land on "the Clin Pharm dossier becomes the bridge."

## Bridge
→ Case 03 — from one regulatory bridge to infrastructure for many future bridges.`,

  // ══════════════════════════════════════════════════════════════
  // CS3 — PharmAgent · AI/ML workflow infrastructure · SAGE
  // ~8 minutes total stage time across 8 slides.
  // ══════════════════════════════════════════════════════════════

  'cs3-divider': `## Spoken
Case three. ⏸ This one changes register.

The first two cases were completed decision stories. Case one: exposure matching carried a pediatric dose. Case two: a clinical pharmacology dossier replaced local trial evidence. ⏸

Case three is forward-looking. It is not a regulatory outcome case. It is a ==workflow-infrastructure== case.

The question is: if model-informed decisions become more frequent, more auditable, and more agent-assisted under ICH M15, what does the clinical pharmacology function need to build?

## Cues
- ⏱ 25 sec — clean register shift
- 🎚 Calm, senior, no product-pitch energy
- 🎯 Key skim phrase: ==workflow-infrastructure case==
- ⚠ Do NOT call this a deployed regulatory success story
- ✅ Land on "what does the function need to build?"

## Bridge
→ The question next — the integration layer has to move.`,

  'cs3-question': `## Spoken
Here is the question behind the whole third case. ⏸

In the first two cases, the scientific logic worked. The model carried the dose. The dossier carried the waiver. But both cases also show the same operating reality: the pharmacometrician becomes the ==integration layer==.

The analyst moves data between tools, rebuilds tables, reconciles outputs, writes methods text, chases version history, and turns mature methodology into a defensible artifact. ⏸

Now add the next decade: ==E11A pediatric extrapolation, ICH M15 MIDD evidence, Rule 101 waivers, Project Optimus dose optimization.== The question is not whether the science exists. The question is whether the infrastructure lets the function apply it repeatedly.

The science was right both times. ==The scaffolding became the constraint.==

## Cues
- ⏱ 45 sec — hook slide
- 🎚 Conversational; this is the lived-experience entry point
- 📍 Gesture back to CS1/CS2 on "model carried" and "dossier carried"
- 🎯 Key skim phrase: ==the pharmacometrician becomes the integration layer==
- ⚠ Do NOT say "AI solves this" yet
- ✅ Land on "the scaffolding became the constraint"

## Bridge
→ The constraint next — what the fragmented workflow looks like.`,

  'cs3-problem': `## Spoken
Here is the problem in operational terms. ⏸

The slide uses an illustrative 80/20 split. I would not defend the exact ratio as a universal measurement. The point is directional and familiar: in many real pharmacometric workflows, ==the science is not the slowest part. The handoffs are.==

Data assembly, EDA, NCA, PopPK, diagnostics, simulations, and reporting all use different tools. NONMEM, R, SAS, Phoenix, Word, Excel, QC systems. Each is useful. None shares state by default. ⏸

So the analyst becomes middleware. They carry results manually from one place to the next, and the methods section is written after the fact from memory, folders, and review comments.

That is the constraint PharmAgent is designed around: not replacing the scientific judgment, but moving the ==integration layer== into a platform.

## Cues
- ⏱ 50 sec — problem-naming slide
- 🎚 Diagnostic, not dramatic
- 📍 Call the 80/20 split "illustrative" out loud
- 🎯 Key skim phrase: ==the analyst becomes middleware==
- ⚠ Do NOT blame NONMEM, R, SAS, Phoenix, or any vendor
- ✅ Land on "moving the integration layer into a platform"

## Bridge
→ The architecture next — first, what an agent actually is.`,

  'cs3-architecture': `## Spoken
This is the architectural answer, but first define the word. ⏸

An agent is not a chatbot. A chatbot produces text. An agent is a reasoning policy connected to ==tools, typed state, a planning loop, and structured outputs==.

In PharmAgent, the LLM decides what to do next. The math is done by deterministic tools — scipy, numpy, NONMEM, XGBoost, plotting libraries. The LLM does not compute AUC. It decides which validated function should compute AUC, with what inputs, and where the result should write back. ⏸

The architecture has three levels. Level zero: Supervisor. Level one: domain agents. Level two: modeling specialists. The important design rule is single responsibility. Data loading does not live inside the NCA agent. NCA and PopPK consume shared typed state. That avoids a god-agent and makes the system extensible.

The platform scale is thirteen specialized agents, one hundred fifty-one deterministic tools, seventy-six workflow templates, thirty-four typed state fields, and twenty-four regulatory guidances in the RAG corpus. ⏸

The headline is simple: ==agents decide; tools execute; humans approve.==

## Cues
- ⏱ 70 sec — densest CS3 slide
- 🎚 Teach first, then assert. Do not assume everyone knows "agent."
- 📍 Left side: hierarchy. Right side: definition and design commitments.
- 🎯 Key skim phrase: ==agents decide; tools execute; humans approve==
- ⚠ Do NOT say "AI does pharmacometrics"
- ✅ Land on the single-responsibility boundary — no god-agent

## Bridge
→ Privacy and audit next — the part that makes the architecture credible.`,

  'cs3-landscape': `## Spoken
Before privacy and audit, position this carefully. ⏸

I am not comparing PharmAgent against validated platforms and saying it is better. That would be the wrong claim. Existing tools are the computation layer. The point is to keep them.

The slide shows the ecosystem as layers. At the top, the human scientist owns the question and interpretation. Below that, PharmAgent is a ==personal research orchestration layer==: supervisor, domain agents, typed state, and workflow trace. Below that are validated computation tools — NONMEM, R, SAS, Phoenix, Pumas, pyDarwin-style search, PBPK and ML libraries. ⏸

Governance and privacy run across the path. ICH M15 and FDA's AI draft guidance set expectations for documentation and credibility. SchemaExtractor keeps patient rows out of the reasoning context.

So the claim is not superiority. The claim is ==regulated orchestration==: keep validated computation, add state, audit, privacy, and review gates.

## Cues
- ⏱ 45 sec — positioning slide
- 🎚 Very careful tone; explicitly reject superiority framing
- 📍 Say "existing tools are the computation layer — the point is to keep them"
- 🎯 Key skim phrase: ==personal research orchestration layer==
- ⚠ Avoid "better," "first," "none," "full pipeline," or "validated platform"
- ✅ Land on "keep validated computation"

## Bridge
→ The turn next — privacy and audit are not add-ons.`,

  'cs3-decisive-move': `## Spoken
Here is the decisive move. ⏸

The decision was not "use AI." The decision was: if this system is going anywhere near regulated clinical pharmacology, ==privacy and audit have to be architectural facts before scale.==

First: privacy by architecture. SchemaExtractor separates raw rows from reasoning context. Local tools compute on the dataset. The LLM receives metadata, summaries, and typed state — not patient records. ⏸

Second: audit by construction. Every tool call records timestamp, agent, tool, input hash, output hash, and previous hash. If a past entry changes, the downstream chain breaks.

That is the difference between a policy promise and a system property. ==Privacy is a boundary. Audit is a chain.==

## Cues
- ⏱ 55 sec — the TURN slide
- 🎚 Slow and certain
- 📍 Point left for privacy boundary, right for audit chain
- 🎯 Key skim phrase: ==privacy is a boundary; audit is a chain==
- ⚠ Say "tamper-evident," not "tamper-proof"
- ✅ Land on "system property"

## Bridge
→ Workflow trace next — what actually happens when the system runs.`,

  'cs3-pilot': `## Spoken
Now make it concrete. ⏸

The most persuasive evidence here is not a speed claim. It is the trace.

A user asks for an NCA or PopPK workflow. The Supervisor classifies the intent. A specialist agent plans the tool sequence from typed state. Deterministic tools compute the pharmacometric quantities. A QC gate requires human review. The report artifact is generated from the audit trail. ⏸

The audit entry records timestamp, agent, tool, input hash, output hash, and previous hash. So the methods section is not reconstructed later from memory. It is generated from what actually ran.

That is the practical difference: ==one request becomes a replayable evidence trail.==

## Cues
- ⏱ 50 sec — concrete behavior slide
- 🎚 Trace delivery. One step, one breath.
- 📍 Move down the left trace; then glance to the audit schema on the right.
- 🎯 Key skim phrase: ==replayable evidence trail==
- ⚠ Do NOT mention internal time savings on this slide
- ✅ Land on "what actually ran"

## Bridge
→ Bracket Method next — credit outward to the field.`,

  'cs3-bracket': `## Spoken
Now scope the architecture carefully. ⏸

The point is not "trust my platform." The point is that the architecture follows the research. Agent-systems literature shaped the topology: centralized supervisor, domain agents, specialist agents, deterministic tool use, and typed state instead of free-text handoffs. ⏸

Then regulated science sets the credibility bar. ⏸

ICH M15 defines how MIDD evidence is planned, evaluated, documented, and submitted. The FDA AI draft guidance gives the context-of-use and credibility-assessment frame for AI model outputs. Kim et al. 2025 gives the scaling and error-containment frame for agent systems. The agentic-systems literature teaches tool-use over free-text generation for high-stakes outputs.

So the claim is not ownership or superiority. The claim is: ==the architecture was built from research patterns and constrained by standards the field already recognizes.==

## Cues
- ⏱ 50 sec — research-grounded architecture, then standards
- 🎚 Deliberately disciplined; do not sound like a product founder
- 📍 Left column: design choices. Right column: research and standards basis.
- 🎯 Key skim phrase: ==research patterns constrained by recognized standards==
- ⚠ Do NOT imply FDA, EMA, ICH, or Kim et al. endorse PharmAgent
- ⚠ Do NOT say "the architecture was mine" or "what I designed" on this slide
- ✅ Land on standards, not self-praise

## Bridge
→ The portable principle closes the seminar.`,

  'cs3-portable': `## Spoken
The portable principle. ⏸

==AI in clinical pharmacology is useful when it becomes infrastructure, not a substitute for judgment.==

⏸ Three cases. Three decisions. One discipline.

In case one, ==exposure-matching carried the dose.== In case two, ==the dossier replaced the trial.== In case three, ==the platform carries the integration.== ⏸

The function keeps owning the science. The platform carries the integration. The result is not less human judgment — it is more time for the judgment that matters.

⏸ ==Three decisions. Three trials that could not carry the full answer. Three answers from the same discipline.==

That's the function. That's clinical pharmacology. Thank you.

## Cues
- ⏱ 50 sec — the closer. Land the three-case recap cleanly.
- 🎚 Build from quiet to confident. Each case recap gets one beat.
- 📍 The three recap cards on screen carry the visual summary. Gesture across them.
- 🎯 Key skim phrase: ==infrastructure, not a substitute for judgment==
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

Case three — PharmAgent. ==Workflow unbuilt.== Thirteen agents, one hundred fifty-one tools, privacy boundary, hash-chain audit, ICH M15-aligned documentation. ⏸

In each case, quantitative pharmacology supplies what the trial alone cannot — ==a defensible dose, a defensible dossier, or defensible infrastructure.== That is what the discipline is for.

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

==Three. Platforms and AI / ML.== PharmAgent is a thirteen-agent research platform. ICH M15-aligned audit by construction. Schema-only privacy. Deterministic tool execution. Merck's QP2 organization has stated AI / ML as a strategic priority. I bring the architecture judgment to build this kind of infrastructure around existing scientific workflows. ⏸

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

};

export default notes;
