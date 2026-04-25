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
Good morning — and thank you for the time. I'm Malek Okour. ⏸ Over the next forty-five minutes I want to walk you through three clinical pharmacology decisions where ==the data, on its own, was never going to be enough==.

Three different therapeutic areas. ⏸ Three different regulators. **One discipline doing the load-bearing work** — quantitative pharmacology turning complexity into a defensible dose, a defensible label, or a trial that ships.

That's the through-line. ⏸ Let me show you what that looks like in practice.

## Cues
- ⏱ 30 sec — do not exceed; the hook lands on slide 02
- 🎚 Steady, low-energy open — earn the room before pushing
- 🎯 Lock eyes with the panel chair on "thank you for the time"
- ⚠ Do NOT preview drug names or therapeutic areas yet — that's slide 02's job
- ✅ Land cleanly on "what that looks like in practice"
- 📍 If you blank — fallback: "Three cases. One discipline. Let's begin."

## Bridge
That last sentence — *what that looks like in practice* — is the cue to advance.`,

  // Slide 02-A — Hook: "When the trial isn't the answer."
  // Amendment 2: expanded Spoken to ~125 words (35 sec at ~155 wpm with ⏸ pauses).
  'hook-A-trial-not-answer': `## Spoken
There's a question every clinical pharmacologist eventually faces.

==What do you do when the trial that would answer your question can't be run?== ⏸

It can't be run because it's **unethical** — you can't randomize children with a fatal disease to placebo, you can't withhold an active control when the control IS the standard of care, you can't enroll the population the regulator wants you to enroll. ⏸

It can't be run because it's **unavailable** — a regulator demands a local Phase 3 in a population the drug has never been studied in, and the timeline to run that trial is the timeline patients don't have.

It can't be run because it **hasn't been written yet** — the next decade of clinical pharmacology will need infrastructure, audit, and decision tools that don't exist on any shelf today. ⏸

Three cases. Three trials that aren't there. *Three answers anyway.*

That's the function I want to talk about today.

## Cues
- ⏱ 35 sec total — the slide is a stage. The pauses do the work.
- 🎚 Lower register on the three "it can't be run" beats. Each one lands separately. Resist the urge to chain them into a single breath.
- 📍 Stand still through the three reasons. Step forward on "Three cases. Three trials that aren't there. Three answers anyway."
- 🎯 Eye contact rotates: first beat to the panel chair, second to a regulatory-leaning panelist if you can identify one, third to the most senior pharmacometrics panelist.
- ⚠ Do NOT name drugs here. Drugs come at S04. Naming a drug now collapses the rhetorical weight of the open.
- ⚠ Do NOT say "today's topic is" or "I'm going to walk you through" or any other tutorial-voice phrase. The hook IS the framing; do not narrate that you are framing.
- ⚠ The line "What clinical pharmacology does next." is on the slide top-right as a quiet anchor — speaker does NOT read it aloud.
- ✅ The most quotable line is "Three answers anyway." Land it cleanly.
- 🛟 If you blank, the recovery line is: "And the function that builds the answer when the trial can't is the one I want to talk about today."

## Bridge
→ Next slide names the three cases as decision-classes — pediatric extrapolation, regional bridging, forward-looking infrastructure — without yet naming the drugs.`,

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
  // CASE 01 — Ambrisentan in pediatric PAH (coral cascade)
  // ~10 minutes total stage time across 11 slides.
  // ════════════════════════════════════════════════════════════════

  // Slide 05 — CS1 case divider (~15 sec on stage)
  'cs1-divider': `## Spoken
Case one. ⏸ ==Ambrisentan== — an endothelin receptor antagonist for pulmonary arterial hypertension. Approved in adults across the world. The question I want to walk through is what happened when GSK and the EMA committed to extending it to **children aged eight to under eighteen** — a population in which the adult trial we used to license ambrisentan in adults was *never going to be runnable*.

⏸ This is the case where exposure-matching had to carry the dose.

## Cues
- ⏱ 15 sec — divider beat, no dwelling
- 🎚 Steady, almost matter-of-fact tone — drama lives in the next 10 minutes
- 🎯 Eyes on the panel chair on "exposure-matching had to carry the dose"
- ⚠ Do NOT say "approved by FDA" — the FDA outcome is the honest-framing slide later
- ✅ Land cleanly on the divider — advance immediately

## Bridge
→ Disease backstory next — small population, lethal trajectory, drug-poor.`,

  // Slide 06 — CS1 disease backstory
  'cs1-disease': `## Spoken
Pediatric PAH is a small, lethal, drug-poor indication. ⏸ Roughly **fourteen to twenty cases per million children** in Europe — call it a few hundred patients per country at most. Without treatment, median survival from diagnosis was historically *under one year*. With modern multi-modal therapy — anticoagulation, diuretics, an ERA, a PDE-5 inhibitor, prostacyclin analogues — five-year survival is now around **ninety percent**.

That ninety-percent number is the ==operating context== for the next ten minutes. The audience for any pediatric PAH dosing decision is a discipline that ships dosing for a few hundred children at a time. ⏸ Globally.

The class is drug-poor by construction — every trial in this space starts from forty enrolled patients and a regulator's PIP commitment. Not from a sample-size calculation that could power on efficacy.

## Cues
- ⏱ 50 sec — establishes scale, do not exceed
- 🎚 Lower register on "median survival from diagnosis was historically under one year" — the gravity of the indication earns the rest of the case
- 🎯 Eye contact rotates: prevalence number to the panel chair, mortality number to the most senior pediatric panelist (if any)
- ⚠ Do NOT cite STARTS-2 numbers here — that's the next slide
- ✅ Land on "globally" with a slight pause before advancing
- 📍 If the panel looks impatient, you can compress: "Few patients, fatal trajectory, even fewer approved drugs. That's the operating context."

## Bridge
→ Class history next — what STARTS-2 closed and what FUTURE-1 opened.`,

  // Slide 07 — CS1 class history
  'cs1-class': `## Spoken
The class arrived at the ambrisentan pediatric program with one cautionary tale and one methodological precedent. ⏸

The **cautionary tale** is sildenafil — STARTS-1 and STARTS-2. ==Hazard ratio of three-point-nine-five== for high-versus-low dose mortality in STARTS-2. The FDA recommended *against* use in pediatric PAH in 2012; the EMA approved low-dose only. ⏸ The first regulatory schism in the class.

The **methodological precedent** is bosentan — FUTURE-1 and FUTURE-2. PK-bridging worked. Pediatric label achieved. But with a hepatotoxicity black box that defines the class concern ambrisentan inherits.

⏸ So the table our case sits on is: one mortality signal that closed the door on empirical dose-escalation, one PK-bridging precedent that opened the door to exposure-matching. Ambrisentan's job was to walk through the second door without re-encountering the first.

## Cues
- ⏱ 60 sec — the most number-heavy of the BG slides
- 🎚 Slow on "three-point-nine-five" — it's the load-bearing number on the slide
- 🎯 Lock eyes with the panel chair on "the first regulatory schism in the class"
- ⚠ Do NOT defend or attack the FDA / EMA divergence — describe it
- ⚠ Do NOT say "ambrisentan inherits the bosentan black box" — ambrisentan does NOT have a hepatotox black box. Frame it as the *concern* the program had to address.
- ✅ Land on "without re-encountering the first" — that sentence is the slide's argument

## Bridge
→ The Clin Pharm question next — stated precisely in one sentence.`,

  // Slide 07 — CS1 context (merged disease + class) — STUB.
  // Added 2026-04-25 as part of CS1 flow refactor. Full content to be
  // filled in a separate prompt; until then, presenter notes can draw
  // from the legacy 'cs1-disease' and 'cs1-class' entries above.
  'cs1-context': `## Spoken
Pediatric PAH. ⏸ **Fourteen to twenty cases per million children** in Europe. Untreated, median survival from diagnosis was historically under one year. With modern multi-modal therapy — ERAs, PDE-5 inhibitors, prostacyclin — five-year survival is now around ninety percent.

⏸ The class arrived at the ambrisentan program with two landmarks.

The **cautionary tale** is sildenafil — STARTS-2 showed a ==hazard ratio of 3.95== for high-versus-low dose mortality. FDA recommended against pediatric use in 2012; EMA approved low-dose only. That closed the door on empirical dose-escalation in this class. ⏸

The **methodological precedent** is bosentan — FUTURE-1 and FUTURE-2 showed PK-bridging worked. Pediatric label achieved.

⏸ One signal that shut down the escalation playbook. One precedent that opened ==exposure-matching as the live alternative==. Ambrisentan's job was to walk through the second door.

## Cues
- ⏱ 65 sec — two halves: disease scale, then class history
- 🎚 Lower register on mortality and STARTS-2 numbers
- 📍 Pause between the two halves — the audience needs to feel the constraint tightening
- ⚠ Do NOT say "the trial failed" about STARTS-2 — it delivered a safety signal, not a failure
- ⚠ Do NOT cite FUTURE-2 hepatotox details here — save for Q&A
- ✅ Land on "exposure-matching as the live alternative"

## Bridge
→ Trial design next — AMB112529 + LTE.`,

  // Slide 06 — CS1 the Clin Pharm question
  'cs1-question': `## Spoken
Here is the question we had to answer. ⏸

==Can we defend a body-weight-based pediatric dosing scheme on **exposure-matching grounds** — against an adult exposure-response benchmark — in a population we will never adequately power for efficacy?==

That is the question. Frame it that way and the rest of the case writes itself.

⏸ What we cannot do is run the adult trial. About forty patients globally, almost all on background therapy that cannot be changed. A placebo-controlled efficacy trial is unethical — there is no untreated arm any IRB will accept. Six-minute walk distance is the least-bad endpoint, but it weakens under age seven and the program enrolled eight to under eighteen anyway. And the EMA Paediatric Investigation Plan commitment — signed in 2008 — meant the clock was running.

⏸ So the question becomes: *what evidence carries the dose, when the trial we would normally run can't be run?*

## Cues
- ⏱ 70 sec — the slide's argumentative spine; do not rush
- 🎚 Slow, measured delivery on the question itself. Each phrase lands separately: "exposure-matching grounds" / "adult exposure-response benchmark" / "never adequately power for efficacy"
- 🎯 Read the question with eyes on the slide — the audience needs to see and hear it together
- 📍 After the question, step back from the slide and face the panel for the constraints
- ⚠ Do NOT preview the answer. The answer is Slides 10-11. This slide is purely the question.
- ⚠ Do NOT apologize for n=40 or for 6MWD. State the constraints; do not editorialize.
- ✅ The phrase the panel will quote is "exposure-matching grounds." Say it slowly.

## Bridge
→ Trial design next — AMB112529, the LTE, fourteen years on the clock.`,

  // Slide 09 — CS1 trial design + LTE
  'cs1-trial': `## Spoken
Two trials. One PIP commitment. **Fourteen years on the clock.** ⏸

==AMB112529== — registry identifier NCT01332331 — is the parent Phase IIb. **Forty-one randomized**, thirty-nine evaluable for PK. Eight to under eighteen, three weight bands. Two hundred and eleven pediatric PK observations. The trial randomized in 2011, ran into a juvenile-rat brain-weight signal at 20 mg per kg per day, and was formally terminated in February 2019.

The **long-term extension** — NCT01342952 — open-label, thirty-eight enrolled, three-and-a-half-year median exposure. ⏸ The LTE completed enrollment in June 2022 and was published in *European Journal of Pediatrics* in 2024.

The PIP commitment from 2008 — code **EMEA-000434-PIP01-08** — was the regulatory clock running through the entire fourteen-year arc.

⏸ A trial that ran, terminated, then a long-term extension that finished what the parent could not.

## Cues
- ⏱ 65 sec — registry-identifier-heavy, deliver crisply
- 🎚 Tabular delivery on the numbers — "forty-one, thirty-nine, two hundred and eleven, three weight bands"
- 🎯 The juvenile-rat termination is a sub-beat — say it once, do not dwell
- ⚠ Do NOT say "the trial failed" — formal termination on a preclinical signal is not a Clin Pharm failure
- ⚠ Do NOT mention M3 method or 285 PK observations — both are wrong per the verified primary source
- ✅ Land on "fourteen years on the clock" or "the long-term extension finished what the parent could not"

## Bridge
→ Architecture next — three pillars; modeling sits as the middle one.`,

  // Slide 09 — CS1 architecture / three pillars (renamed from cs1-method
  // as part of CS1 flow refactor 2026-04-25; content preserved verbatim).
  'cs1-architecture': `## Spoken
Here is how the case was built. ==Three pillars.==

**Pillar one** — the adult exposure-response anchor. ARIES-1 and ARIES-2 establish the adult AUCss and Cmax,ss across the 2.5, 5, and 10 mg per day doses, with 6MWD improvement and an acceptable safety profile. *This is the curve we match to.*

⏸ **Pillar two** — the pediatric PopPK model with allometric scaling. Two-compartment with absorption lag. Allometric exponents prespecified at zero-point-seven-five for clearance, one-point-zero for volume — *not estimated*. Body weight is the only retained covariate. No independent age effect. *This is the bridge.*

⏸ **Pillar three** — long-term safety follow-up through the LTE. Three-and-a-half-year median exposure. Pubertal development data, hepatic safety, mortality attribution. *This is the durability.*

⏸ The audience for this slide needs to leave knowing the case has **a structure that does not depend solely on the model**. Modeling is the load-bearing middle. The case is not "modeling won." The case is "modeling earned its keep as one of three pillars."

## Cues
- ⏱ 75 sec — the architecture slide; make every pillar land separately
- 🎚 Number tone on the allometric exponents — say "prespecified at point seven five for clearance, one point zero for volume" matter-of-factly
- 🎯 Walk the panel left-to-right across the three pillars; pause before each one
- ⚠ Do NOT say "we used M3 method" — drop M3 entirely, it was not central
- ⚠ Do NOT claim a one-compartment model — it was 2-compartment with absorption lag
- ✅ Land on "modeling earned its keep as one of three pillars" — that line is the slide's anti-overclaim

## Bridge
→ Decisive move next — what the model actually delivered.`,

  // Slide 11 — CS1 results / decisive move
  'cs1-results': `## Spoken
This is the slide where modeling earns the case. ⏸

The pediatric AUCss landed ==within three percent of the adult== at the low dose. Matched to the adult range at the high dose. Cmax,ss ran eleven to eighteen percent higher than adult — within the range we had safety data for. **Body weight was the only retained covariate.** No independent age effect.

⏸ That is **exposure matching**. That is the regulatory bridge.

The structural model — two-compartment with absorption lag — was the structure that fit both the adult and pediatric data. Allometric exponents prespecified, not fit. The pediatric data brought thirty-nine evaluable subjects and two hundred and eleven PK observations to the analysis; the adult anchor brought ARIES-1, ARIES-2, and a mature exposure-response curve.

⏸ Exposure matching. *Exposure matching.* The case rests here.

## Cues
- ⏱ 75 sec — the rhetorical climax of the case
- 🎚 Slow delivery on "within three percent of the adult" — that number is the slide
- 🎯 Say "exposure matching" three times across this slide's stage time. Audience hearing matters.
- 📍 Step toward the slide on "this is the regulatory bridge" — physical commitment matches the rhetorical commitment
- ⚠ Do NOT show off the model spec verbally — the right-hand box is for the panel to read; you talk about the result, not the methods
- ⚠ Do NOT cite M3 or one-compartment — neither is correct
- ✅ The two phrases the panel will quote are "within three percent of the adult" and "exposure matching"

## Bridge
→ Regulatory verdicts next — three regions, three outcomes, one of them honest.`,

  // Slide 12 — CS1 Bracket Method (leadership ownership) — STUB.
  // Added 2026-04-25 as part of CS1 flow refactor. Full content to be
  // filled in a separate prompt; placement is intentional — leadership
  // earns the verdict on slide 13, not trailing as gratitude.
  'cs1-bracket': `## Spoken
[TODO — speaker notes for cs1-bracket, ~50 sec runtime. Walk LEFT
column (I OWNED — model, ER analysis, EMA PIP narrative) then RIGHT
column (TEAM OWNED — Beghetti/Berger/Lukas/Ivy on trial conduct,
sites on LTE retention, clinical operations on PK sampling, Beerahee
on filing, the field on trust). Land the bottom thesis line cleanly:
both sides of that bracket had to hold for the agencies to act.]

## Cues
- ⏱ 50 sec — own the modeling claim, credit the team genuinely
- 🎚 Slow on collaborator names — pronunciation matters
- ⚠ Do NOT linger; this is leadership signaling, not a CV recital
- ✅ Land on "both sides had to hold" before advancing to verdict

## Bridge
→ Regulatory verdicts next — what those agencies actually said.`,

  // Slide 13 — CS1 regulatory verdicts (world map · EMA + PMDA highlighted).
  // Renamed from cs1-decision as part of CS1 flow refactor 2026-04-25;
  // content preserved verbatim. FDA intentionally NOT on the slide visual.
  'cs1-verdict': `## Spoken
Two regulators accepted exposure-matching as the regulatory bridge. ⏸

The **EMA approved** in 2021 — the pediatric label was supported on the AMB112529 plus LTE PopPK package. The PIP commitment, signed in 2008, was fulfilled. ==Twenty-seven member states, plus EEA.==

The **PMDA approved** in 2021 — in parallel. Same Clin Pharm package. Second favorable verdict, in a jurisdiction with its own pediatric extrapolation expectations.

⏸ The methodological argument — *body-weight allometric PopPK matched to an adult exposure-response anchor* — cleared two harmonized regulatory frameworks. **One package. Two agencies. Same answer.**

## Cues
- ⏱ 50 sec — the harmonized-frameworks slide
- 🎚 Confident, declarative tone — these are wins, deliver them as wins
- 🎯 Walk the panel left-to-right across the map: EU first, then Japan
- ⚠ Do NOT mention FDA on this slide. The world map deliberately shows EMA + PMDA only. If a panelist surfaces FDA in real time, the Q&A defense is rehearsed and ready.
- ⚠ Do NOT over-rotate on the EMA member-state count. Twenty-seven is enough; do not list them.
- ✅ Land on "one package, two agencies, same answer" — that line is the slide's argument
- 🛟 If asked live "what about FDA?" → answer briefly: "Different commercial-rights structure. Identical Clin Pharm package. I can walk through the rights split if useful." Then advance.

## Bridge
→ Outcome numbers next — what shipped and what we say first.`,

  // Slide 13 — CS1 clinical numbers + honest framing
  'cs1-outcome': `## Spoken
The clinical numbers. ⏸

==Forty-one randomized.== Seventeen percent mean improvement in six-minute walk distance at the end of the long-term extension — that's twenty-nine evaluable subjects.

⏸ And **seven of thirty-eight LTE deaths** — which I want to surface *first*, before we go any further.

Mortality in pediatric PAH is high regardless of treatment. The seven deaths in the LTE were attributed to underlying disease — pulmonary arterial hypertension, right ventricular failure, COVID-19, failure to thrive. ==Not to ambrisentan.==

The 2024 *European Journal of Pediatrics* long-term safety publication is the post-marketing receipt — long-term safety holds, pubertal development data did not show a class signal, the EMA approval has survived its post-marketing scrutiny.

⏸ I name the seven first because Director-level work is naming the hard number before the panel does.

## Cues
- ⏱ 70 sec — the courage slide; surface the mortality before anything else
- 🎚 Slow, even tone on "seven of thirty-eight" — do not rush past it
- 🎯 The eye-contact moment is "I name the seven first because Director-level work is naming the hard number before the panel does." Lock eyes.
- ⚠ Do NOT defend ambrisentan against the seven deaths. State the attribution; let the panel verify.
- ⚠ Do NOT minimize. "Underlying disease" is not minimization; "only seven" is.
- ✅ Land on "Director-level work is naming the hard number before the panel does" — that is the leadership signal of this case

## Bridge
→ What this case proves next — three Director-level lessons that travel beyond ambrisentan.`,

  // Slide 14 — CS1 what this case proves (3 lessons)
  'cs1-lesson': `## Spoken
What this case proves. **Three lessons** that travel beyond ambrisentan. ⏸

**Lesson one.** Exposure-matching beats underpowered efficacy when the indication won't let you run the adult trial. Don't over-claim efficacy. Match exposure honestly. *Let the regulatory framework do the rest.*

⏸ **Lesson two.** Allometric PopPK earns its keep when the prerequisites hold — when the adult exposure-response is mature, AND when the pediatric PK is honestly modeled. Either pillar missing and the bridge collapses.

⏸ **Lesson three.** Regulatory ownership structure can stop a Clin Pharm package from shipping. The FDA gap was not a Clin Pharm result — it was a commercial-rights split. ==Name that honestly.== Don't let the org chart get blamed on the dataset.

⏸ The principle outlives the molecule. That is what "Director-level" means.

## Cues
- ⏱ 70 sec — the recap; let each lesson land
- 🎚 Confident tone — these are takeaways, not proposals
- 🎯 Walk the panel through the lessons left-to-right; pause between each
- ⚠ R16 RULE: Do NOT bridge to MOONBEAM, sotatercept, or Merck pipeline on this slide. Hold that for Q&A if asked.
- ⚠ Do NOT add a fourth lesson live. Three is the package; a fourth weakens it.
- ✅ Land on "the principle outlives the molecule"

## Bridge
→ Case 02 next — a different population, a different impossibility.`,

  // Slide 15 — CS1 → CS2 bridge
  'cs1-bridge': `## Spoken
Same Clin Pharm function — different impossibility. ⏸

==From a population we couldn't ethically test== — to a population we couldn't geographically reach.

⏸ Case two. *Ivosidenib in India* — when the trial cannot reach the patients.

## Cues
- ⏱ 15 sec — bridge beat, do not dwell
- 🎚 Steady — the rhetorical work was done on the previous slide
- 🎯 Eyes forward on "different impossibility"
- ⚠ Do NOT preview ivosidenib's substance — the next divider does that
- ✅ Advance immediately after the next-case line

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
Quick orientation on the biology. ⏸

IDH1 mutations show up in about ==six to ten percent of AML== and roughly ==thirteen percent of intrahepatic cholangiocarcinoma==. Both are rare. Both are biologically distinct within their cancers.

The mechanism is clean. Mutant IDH1 produces 2-hydroxyglutarate — an oncometabolite — which drives epigenetic dysfunction and blocks myeloid differentiation. Ivosidenib reverses that: reduces 2-HG, restores differentiation. ⏸

Before 2018, there was no targeted option for these patients. Ivosidenib changed that — first FDA label July 2018 in relapsed/refractory AML.

One thing to note for later: this mutation is ==somatic==, not germline. It's acquired in tumor cells, not inherited. That distinction becomes the intellectual core of the regulatory argument in this case.

## Cues
- ⏱ 45 sec — this is context, not the case. Move through it.
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
Three pillars carried the regulatory bridge. ⏸

==Pillar one — Population PK.== Race/ethnicity invariance. N equals approximately two hundred fifty-three patients across the dose-escalation and expansion studies. No significant covariate effect of age, weight, sex, race, ethnicity, mild-to-moderate renal impairment, or mild hepatic impairment. The PopPK showed no ethnic signal. ⏸

==Pillar two — PBPK-supported DDI label.== Ivosidenib is a CYP3A4 substrate and a strong CYP3A4 inducer. The PBPK model predicted the induction DDI on midazolam — AUC ratio 0.18 — and that prediction was qualified against clinical data and went into the label. Concomitant CYP3A4 substrates carry dose adjustments per label. ⏸

==Pillar three — flat exposure-response.== The apparent flat exposure-efficacy curve across the studied range supports five hundred milligrams once daily as a wide-therapeutic-index dose. QTc prolongation is the dose-related safety concern, and it's managed via label-specified monitoring. ⏸

Three pillars. Modeling is the bridge — PopPK, PBPK, and E-R replaced the local trial.

Behind these three, the full defense was a ==six-pillar ICH E5 package== — adding intrinsic factors via Bayesian covariate re-estimation, the global safety database across forty-plus countries, and the mechanism-of-action argument. I'll unpack the MOA in a moment — it's the intellectual core.

## Cues
- ⏱ 75 sec — this is the densest slide in CS2. Rehearse the transitions.
- 🎚 Each pillar gets its own beat. Number them out loud: "pillar one," "pillar two," "pillar three."
- 📍 Gesture to each card on screen as you name the pillar.
- ⚠ Say "N approximately 253" — do not say "over 250" (imprecise) or "exactly 253" (implies false precision).
- ⚠ "Strong CYP3A4 inducer" — use the label language. A panelist may push on the word "strong"; the midazolam AUC ratio 0.18 is the supporting number.
- ⚠ The six-pillar mention is a breadcrumb for the Q&A. If a methodologist asks "why only three?", unfold the six.
- ⚠ Do NOT say UGT1A1 here. If a panelist raises UGT1A1, pivot to the CYP3A4-primary-metabolism response. See QA bank.
- ✅ The line the panel will quote: "modeling is the bridge."

## Bridge
→ Next slide zooms into pillar two — the decisive move where PBPK went into the label.`,

  'cs2-decisive-move': `## Spoken
This is the slide I want you to remember. ⏸

==The PBPK model predicted the CYP3A4-induction DDI on midazolam — and went into the label.== ⏸

Simulated midazolam AUC ratio: ==zero point one eight==. Cmax ratio: zero point two seven. That's a strong CYP3A4-inducer call, at steady state with co-administered ivosidenib.

The model was qualified against clinical data — the fluconazole DDI study and the autoinduction biomarkers. And then it was used to extrapolate to substrates that were never measured directly in a dedicated clinical DDI study. ⏸

The label carries dose adjustments for concomitant CYP3A4 substrates based on that simulation. Not on a clinical trial. On the model. ⏸

This is now standard practice — it's in CDER's MIDD framework, it's in EMA's PBPK guidance. But it's still the ==cleanest "modeling earned its keep" line in this entire seminar==.

Speak that out loud in your head: the model literally went into the label.

## Cues
- ⏱ 50 sec — the money slide. Deliver it like it matters, because it does.
- 🎚 This is the highest-conviction moment in CS2. Lean forward. Slow down on "zero point one eight."
- 📍 Step toward the screen when you say "went into the label."
- 🎯 Direct eye contact with the most senior pharmacometrics panelist on "the model literally went into the label."
- ⚠ Say "zero point one eight" — not "0.18." Spoken numbers land harder.
- ⚠ "Qualified against clinical data" — be ready to name the specific qualification: fluconazole DDI predicted-vs-observed overlay, autoinduction 4β-OHC/cholesterol ratio. Do NOT say "validated" — say "qualified."
- ⚠ If a panelist pushes on PBPK credibility ("it's just a simulation"), respond proactively — see Q&A bank Q7.
- ✅ Landing line: "the model literally went into the label."

## Bridge
→ Next slide zooms out to the global timeline.`,

  'cs2-velocity': `## Spoken
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
→ Next slide names the outcome: India approval, launch, and the numbers that carried it.`,

  'cs2-outcome': `## Spoken
The outcome. ⏸

==May 14, 2025 — CDSCO marketing authorization.== June 5, 2025 — India commercial launch. First IDH1 inhibitor available in India. ⏸

Five numbers to hold.

==Zero== Indian patients in the pivotal trials. Not "a small subgroup." Zero.

==N equals one hundred eighty-five== in ClarIDHy — the pivotal Phase 3 in cholangiocarcinoma. Randomized two-to-one, ivosidenib versus placebo.

==Approximately thirty-three percent CR plus CRh== in relapsed/refractory AML — the first indication, the one that opened the door.

==Zero point one eight== — the midazolam AUC ratio that the PBPK model predicted and that went into the label.

And the number that matters most: ==patient access eighteen to twenty-four months earlier== than the historical bridging-study default would have delivered. ⏸

The Clin Pharm dossier replaced the trial. The model replaced the study. Rule 101 was the regulatory mechanism. The dossier was the scientific one.

## Cues
- ⏱ 55 sec — let each number breathe.
- 🎚 Each number is its own beat. Count them on your fingers if it helps the rhythm.
- 📍 Pause after "zero." The room needs to process.
- 🎯 Eye contact with the panel chair on "eighteen to twenty-four months earlier."
- ⚠ "CR+CRh 33%" — this is from the R/R AML indication (AG120-C-001), not from AGILE or ClarIDHy. If pressed, cite Norsworthy et al., Clin Cancer Res 2019.
- ⚠ "Eighteen to twenty-four months earlier" — this is an estimate based on the historical timeline for a local Phase III in India for rare oncology drugs (2–3 year typical cycle from protocol to read-out). Defensible but not a published figure.
- ✅ Landing line: "the model replaced the study."

## Bridge
→ Next slide shifts to ownership — the Bracket Method leadership frame.`,

  'cs2-leadership': `## Spoken
Ownership. ⏸

I owned the clinical pharmacology dossier defense. That means I owned the scientific argumentation that the global data were applicable to the Indian population without pre-approval local data. ⏸

==Regulatory affairs owned the SEC interaction== — the procedural dialogue with CDSCO, the timing of submissions, the Rule 101 waiver application mechanics.

==Medical affairs owned the post-marketing surveillance commitments== — the Phase 4 PK/PD study design, the pharmacovigilance protocol, the real-world evidence plan.

==The global Clin Pharm team built the six-pillar evidence package.== Pharmacometrics ran the Bayesian covariate re-estimation. The regulatory writing team authored the thirty-six-page justification document. The Servier India affiliate team presented the package to the SEC in person. ⏸

The SEC raised its first queries in August 2024 — Southeast Asian subset analyses and IDH1 prevalence. We responded in October with a thirty-six-page scientific justification. By December, the SEC had narrowed its requirement from an open-ended query to a specific ask: "conduct PK/PD study in Indian population."

We reframed. Shifted from defending subgroup data to defending the ==mechanism-first argument== — somatic target, CYP3A4-not-UGT1A1, ICH E5 Appendix D.

By April 2025, the SEC had converted a pre-approval hurdle into a ==Phase 4 post-approval commitment== — allowing immediate patient access.

## Cues
- ⏱ 65 sec — this is the longest CS2 delivery. Rehearse the transitions.
- 🎚 Start quiet on "I owned." Build through the team credits. Peak on "Phase 4 post-approval commitment."
- 📍 Credit outward deliberately. Name each team by function, not by person.
- 🎯 Eye contact on "I owned" — direct, not apologetic.
- ⚠ "Thirty-six-page justification" — this is verified from the research. If asked for details, it addressed unmet need, IDH1 prevalence, survival benefits, and the mechanism-first argument.
- ⚠ The SEC timeline: Aug 2024 (queries) → Oct 2024 (36-page response) → Dec 2024 (PK/PD study recommendation) → Jan 2025 (mechanism-first reframe) → Apr 2025 (favorable SEC opinion) → May 2025 (authorization).
- ⚠ The Bracket Method: one sentence on what I owned, credit outward on everything else. Do NOT claim credit for the regulatory or medical affairs work.
- ✅ Landing line: "allowing immediate patient access."

## Bridge
→ Next slide draws the portable lessons — what this case proves about regulatory bridging.`,

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
