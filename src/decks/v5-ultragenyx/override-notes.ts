export const overrideNotes: Record<string, string> = {
  roadmap: `## Spoken
So here's the agenda — three cases, each with a different problem, but all coming back to one thing: ==quantitative pharmacology driving the decision==.

**==Case one — ambrisentan, pediatric PAH==** — the pediatric trial stopped early. The question became whether the ==pharmacokinetic bridge== could still support a pediatric label. EMA and PMDA said yes in 2021. The key was ==exposure matching==. ⏸

**==Case two — AI and machine learning for clinical pharmacology workflows==** — this is the infrastructure question, including privacy boundaries, deterministic tools, audit trails, and ICH M15-aligned documentation. This is ==my own research and architecture judgment==, not a product pitch. ⏸

**==Case three — ivosidenib, India==** — approved in the US and Europe, but still unavailable to Indian patients because CDSCO expected local clinical evidence. The answer was a ==six-pillar regulatory dossier under Rule 101==. CDSCO approved it in May 2025. ⏸

==Three challenges — pediatric, methodological, geographic.== One discipline carrying the decision in each case. About ten minutes per case, then a brief synthesis and questions at the end.

## Cues
- ⏱ ~75 sec — three card-beats + one synthesis line + timing expectations
- 🎚 Even energy across the three cards — don't oversell any single case
- 🎯 Gesture toward each card as you name it — left, center, right
- ⚠ Do NOT preview case-level numbers — those land inside the case
- ✅ Land cleanly on "ten minutes per case, then a brief synthesis and questions at the end"

## Bridge
→ Case 01 — ambrisentan in pediatric PAH.`,

  'cs1-bridge': `## Spoken
What travels beyond ambrisentan is simple.

Where similarity is high, PK matching can support the dose.

And the architecture matters: adult data build the model; pediatric data confirm whether the bridge is adequate.

Case two is a different problem: scaling up the tools we use to do this work. It's about AI, and building the infrastructure for the next generation of clinical pharmacology.

## Cues
- ⏱ 30 sec — two takeaways and move
- 🎚 Conversational summary; this should sound like you closing the loop
- ⚠ Do NOT add more takeaways
- ✅ Land on "building the infrastructure for the next generation of clinical pharmacology."

## Bridge
→ Case 02 divider — AI the Pharazi.`,

  'cs2-interactive-dossier': `## Spoken
Before we move on, I want to land what this looks like ==in actual use==.

What you're seeing is a ==live, interactive dossier== — not a slide deck of an idea. ⏸ The agent assembled this from the components we just walked through: ==deterministic NCA==, ==traceable data flow==, ==cryptographic audit chain==, ==versioned SOPs==, ==regulatory dashboard==.

Three things to notice. ==One== — every number on this page traces back to a versioned input and a signed run. ==Two== — the SOP and the result are linked; you can't read one without the other. ==Three== — what you're seeing was generated end-to-end without me touching the analysis layer.

This is the architecture proof. ⏸ It's not in production at any sponsor — it's ==my own research environment== — but the constraints are real, and the trace is real.

## Cues
- ⏱ ~60 sec — show, don't enumerate. Let the dossier do the talking
- 🎚 Quieter than the principle slides — you've earned the room; demo, don't sell
- 🎯 Gesture toward each of the three "things to notice" — left-of-screen, center, right
- 📍 If a panelist asks to click something — let them. The interaction IS the point
- ⚠ Do NOT claim sponsor deployment, regulatory acceptance, or commercial users
- ⚠ Do NOT defend the visualization style — defend the trace integrity
- ✅ Land on "the constraints are real, and the trace is real."
- 🛟 If demo glitches: pivot to "the trace would still be intact — the UI is the thinnest layer"

## Bridge
→ Case 03 — Ivosidenib in India. A different problem geography.`,

  'cs2-pharazi-divider': `## Spoken
Case two is the only case in this talk that isn't about a single drug.

It's about ==the toolkit that does the work==. ⏸

==Pharazi== is an open-source agentic system I've been building — the website is **pharazi.ai** — to bring clinical-pharmacology workflows up to the cadence rare-disease programs actually run at.

==Privacy boundaries==, ==deterministic tools==, ==ICH M15-aligned audit trails==. ⏸

This is ==my own research and architecture==, not a product pitch. What I want to walk you through is the design judgment — why these constraints, in this order.

## Cues
- ⏱ ~30 sec — case opener, light touch
- 🎚 Conversational. Name the project, don't sell it
- 🎯 Land "open-source" before the principles — that's the credibility move
- 📍 Gesture toward the violet case-color band as you say "case two"
- ⚠ Do NOT preview the five principles — they land on cs2-principle1 onward
- ⚠ Do NOT claim production deployment or commercial users — research project
- ✅ Close on "design judgment — why these constraints, in this order"

## Bridge
→ Case 02 — regulatory floor (ICH M15, where the constraints come from).`,
};
