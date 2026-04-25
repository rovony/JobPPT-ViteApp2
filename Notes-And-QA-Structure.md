# Speaker Notes & Anticipated Q&A — Authoring Structure

> **Audience for this doc:** anyone (human or AI) writing content for
> `src/decks/<deck-id>/notes.js` or `src/decks/<deck-id>/qa.js`.
>
> **Goal:** make the presenter's eyes find what they need under stage
> pressure. Spoken text reads back-to-back; cues are visually
> subordinate but findable; emphasis is color-coded and works in BOTH
> light and dark modes.
>
> Format is plain markdown (one string per slide id). The renderer
> (`PresenterNotesPane`, `AnticipatedQAPane`) gives each section its
> own visual treatment, but the raw file remains diff-friendly and
> human-readable.

---

## 1. Speaker Notes — per-slide template

Each entry in `notes.js` is keyed by slide id and follows this shape:

```markdown
## Spoken
<the actual words, back-to-back, in delivery voice>

## Cues
- <stage directions, one per line>

## Bridge
<one sentence: the segue into the next slide>
```

Sections in this order. **`Spoken` is required.** `Cues` and `Bridge` are
optional — omit the heading entirely if you have nothing to say there.
Don't write empty sections.

### 1.1 The `Spoken` section — your script

This is what the presenter reads. Write in **delivery voice**, not summary
prose. Short paragraphs, natural breath beats, contractions allowed.

**Inline markers:**

| Syntax | Meaning | Visual |
|---|---|---|
| `==text==` | Lock-in emphasis — the words to *land* | Highlight in case color (CS1 coral · CS2 cyan · CS3 violet · default amber). Works in light + dark. |
| `**text**` | Secondary emphasis — important but not the cue | Bold, default ink color |
| `*text*` | Cited / named — author, study, quote | Italic, default ink |
| `…` | Soft pause (one-beat) | Renders as ellipsis with extra letter-spacing |
| `⏸` | Hard pause (full breath, then continue) | Renders as a colored pause glyph |
| `→` | "Pivot" within the same paragraph | Renders as an arrow with slight indent |

**Don't** wrap whole paragraphs in emphasis. One or two `==…==` chunks per
beat is the limit — if everything's highlighted, nothing is.

**Example:**

```markdown
## Spoken
Hi everyone — and thank you for the chance to present today. ⏸ Over the
next forty-five minutes I want to show you ==quantitative pharmacology
doing what it does best== — turning complexity into confident decisions.

That means decisions across **therapeutic areas**, across regulatory
agencies, and across patient populations that have historically been
left behind.

So let me start with a sentence that *sat on a drug label for nineteen
years*. ⏸
```

### 1.2 The `Cues` section — stage directions

Bulleted. Each bullet is one fact the presenter wants to know **before**
they speak the slide, not while reading the script. Use the prefix tags
below so the presenter can scan to the right cue at a glance:

| Prefix | What it's for | Example |
|---|---|---|
| `⏱` | Timing — target seconds for this slide | `⏱ 90 sec — don't dwell` |
| `🎯` | Eye contact / audience focus | `🎯 Sergi, Demiana, Jessica` |
| `🎚` | Tone / pacing | `🎚 Warm, brief — don't sell` |
| `📍` | Position on stage / body language | `📍 Step toward the screen on "model"` |
| `⚠` | Hard "do not" — accuracy / confidentiality landmines | `⚠ NO Servier internal numbers` |
| `✅` | Hard "do" — must-mention beats | `✅ Cite EMA 2017 + PMDA 2019` |
| `🛟` | Recovery line if you blank | `🛟 If you forget the dose, say "the model-suggested 5 mg/kg"` |

Pick the prefixes that matter; you don't need all seven on every slide.

**Example:**

```markdown
## Cues
- ⏱ 25 sec — warm open, don't dwell
- 🎚 Warm, brief
- 🎯 Lock eyes with the chair before "let me start"
- ⚠ NO mention of Servier compensation discussion
- ✅ Land on "nineteen years" for hook timing
```

### 1.3 The `Bridge` section — segue to next slide

One sentence. The line you'll actually say as you advance. Optional but
strongly recommended — it eliminates the "uhhh, so…" between slides.

**Example:**

```markdown
## Bridge
That nineteen-year sentence is where this story starts.
```

### 1.4 Full example (slide id `title`)

```markdown
## Spoken
Hi everyone — and thank you for the chance to present today. ⏸ Over the
next forty-five minutes I want to show you ==quantitative pharmacology
doing what it does best== — turning complexity into confident decisions.

That means decisions across **therapeutic areas**, across regulatory
agencies, and across patient populations that have historically been
left behind.

So let me start with a sentence that *sat on a drug label for nineteen
years*. ⏸

## Cues
- ⏱ 25 sec — warm open
- 🎚 Warm, brief — don't sell
- 🎯 Lock eyes with the chair before "let me start"
- ✅ Land on "nineteen years" — that's the hook into slide 02
- ⚠ NO Servier internal numbers anywhere in the deck

## Bridge
That nineteen-year sentence is where this story starts.
```

---

## 2. Anticipated Q&A — per-slide template

Each entry in `qa.js` is keyed by slide id. Write **one block per
question**, structured so the presenter can find the right answer in
under two seconds:

```markdown
## Q1: <verbatim audience question, in their voice>
**From:** <likely asker — name, role, or "anyone">
**Difficulty:** ★ to ★★★★★ · **Topic:** <single tag for filtering>

A: <prepared answer in delivery voice — the words to say>

> **If pressed:** <one-line backup, citation, or escape hatch>
```

### 2.1 Why this shape

- The `## Q:` heading prefix is what the count badge counts (`Q&A · 3
  anticipated`). It's also the search anchor in Phase 4.
- Numbering (`Q1`, `Q2`, `Q3`) makes it referenceable — "see Q4 on
  slide 12" works in cross-talk between you and your other assistant.
- **From / Difficulty / Topic** are filterable metadata. Phase 4
  search will let you type "Sergi" or "stats" and jump to relevant Qs.
- The `If pressed:` blockquote is the second-line defense — only used
  if the asker doesn't accept the first answer. Keeps your primary
  answer tight without losing the depth.

### 2.2 Difficulty scale

| Stars | Meaning |
|---|---|
| ★ | Softball — anyone in the room could ask, you nail it |
| ★★ | Reasonable — a follow-up an engaged listener would have |
| ★★★ | Real probe — testing your depth |
| ★★★★ | Hostile / adversarial — testing your accuracy or confidence |
| ★★★★★ | Career landmine — wrong answer ends the interview |

### 2.3 Topic tags (suggested vocabulary)

Use one tag per question. Keep the vocabulary small so search filters
stay clean:

`stats` · `pk` · `pd` · `regulatory` · `clinical-design` · `data-quality`
· `software` · `team` · `career` · `confidentiality` · `commercial` ·
`ai-ml` · `ethics` · `methodology`

If you need a new tag, add it here in this doc first so the vocabulary
stays under control.

### 2.4 Inline markers

Same vocabulary as Speaker Notes — `==highlight==`, `**bold**`, `*italic*`,
`⏸` for pauses you'd take while answering. Tables and lists welcome.

### 2.5 Example

```markdown
## Q1: How do you handle missing covariate data when fitting the popPK?
**From:** Demiana (statistician)
**Difficulty:** ★★★ · **Topic:** stats

A: ==MICE with five imputations==, pooled per Rubin's rules. We treated
the imputation as part of the M&S workflow, not pre-processing — every
covariate effect estimate carries imputation variance.

> **If pressed:** point to *Bell 2014* for the canonical method paper,
> and we have a sensitivity analysis with complete-cases-only that
> shows the same direction of effect within 8%.

## Q2: Why exposure-response and not just PK?
**From:** Sergi
**Difficulty:** ★★ · **Topic:** regulatory

A: Because the regulatory question wasn't about exposure — it was about
==benefit==. PMDA wanted to know whether the dose we chose would actually
deliver the response in pediatric patients, so PK alone wasn't enough.

> **If pressed:** the EMA scientific advice in 2016 explicitly asked for
> exposure-response to support the dose, not exposure-matching alone.

## Q3: What if the mediation analysis assumptions don't hold?
**From:** anyone (chair-style probe)
**Difficulty:** ★★★★ · **Topic:** methodology

A: The load-bearing assumption is ==no-unmeasured-confounders== between
mediator and outcome. We did sensitivity analyses at multiple ρ values
and the conclusion held until ρ exceeded 0.4 — well above what's
plausible given the design.

> **If pressed:** I can pull up the *VanderWeele 2015* sensitivity
> framework — that's the workhorse here.
```

---

## 3. Light/dark color contract

The renderer uses CSS custom properties so every marker works in both
themes without authors thinking about it:

| Marker | CSS variable used | Light mode | Dark mode |
|---|---|---|---|
| `==highlight==` | `--case` (case color) or `--amber` | Coral/cyan/violet on cream wash | Same hue on near-black panel |
| `**bold**` | `--cream` | Near-black | Near-white |
| `*italic*` | `--cream-muted` | Mid-gray | Light-gray |
| `⏸` | `--case` | Case color | Case color |
| `> blockquote` | `--cream-faint` border + `--cream-muted` text | Faded ink on tinted strip | Same |
| `## Q:` heading | `--case` accent | Visible accent | Visible accent |

**You don't pick colors.** You pick semantic markers. The theme handles
contrast in both modes.

---

## 4. What NOT to do

- ❌ Don't wrap entire paragraphs in `==…==` — emphasis stops being
  emphasis when everything's highlighted
- ❌ Don't write `## Spoken` content as bullet lists — the presenter
  reads spoken text as prose, eyes-up. Bullets break the rhythm.
- ❌ Don't put confidential numbers (Servier internal, GSK studies, etc.)
  in either notes or QA — see `⚠` cue convention to flag the avoidance
  instead
- ❌ Don't invent new section headings (`## Background`, `## Trivia`) —
  Phase 4 search and rendering rely on the fixed vocabulary in §1 / §2
- ❌ Don't include slide content the audience can already read — the
  notes are for what's NOT on the slide

## 5. Versioning & overrides

- The canonical content lives in `notes.js` / `qa.js` (version-controlled,
  reviewed by humans).
- Live edits in the Presenter view autosave to localStorage and override
  the file content per-device. The UI shows a `Live edit` badge when an
  override is active.
- Click the `↺` icon to revert a live edit and fall back to the file.

---

## 6. Quick reference card

```
SPEAKER NOTES                          ANTICIPATED Q&A
─────────────────                      ─────────────────
## Spoken                              ## Q1: <question>
  delivery voice                       **From:** <asker>
  ==lock-in==                          **Difficulty:** ★★★ · **Topic:** <tag>
  **emphasis**
  *cited*                              A: <answer in delivery voice>
  ⏸ pause                              > **If pressed:** <backup>
  …soft beat

## Cues                                ## Q2: ...
  - ⏱ time                             ## Q3: ...
  - 🎯 eye contact
  - 🎚 tone
  - 📍 position
  - ⚠ DO NOT
  - ✅ MUST
  - 🛟 recovery line

## Bridge
  one segue sentence
```

---

**Last updated:** 2026-04-25 · scope: Phase 4 rendering work to follow.
The structure here is stable — start authoring against it now.
