# Merck Deck App — Claude Code Instructions

> **READ-FIRST CHECKLIST FOR ANY AGENT TOUCHING THIS APP — NON-NEGOTIABLE**
>
> Before opening, editing, or generating any slide file in `src/decks/qp2-seminar-v3-R2/`:
>
> 1. **Read this entire file end-to-end.** Not just the section that seems
>   relevant. The Stewardship rule, Responsiveness Contract (fonts + layout),
>    case-color contract, and layout system are all load-bearing — skipping
>    one produces output that gets reverted.
> 2. **Read the workspace root `../../CLAUDE.md` and `../../PROJECT-BRIEF.md`** —
>   the V5 Clinical-Pharmacology framing, the no-internal-data rule, and the
>    public-sources-only requirement live there.
> 3. **Run the pre-commit greps** at the bottom of the Responsiveness Contract
>   section before declaring slide work done. If they return matches, the
>    slide will fail at portrait viewports.
> 4. **Resize the rendered slide to 375×812 (mobile portrait), 768×1024
>   (tablet portrait), and 1280×720 (laptop) before committing.** If text
>    clips, layouts overflow, or grids don't reflow — the slide isn't ready.
> 5. **Do not rewrite an existing slide's composition without explicit user
>   authorization in the current session.** See "Slide File Stewardship"
>    below for the full rule.
>
> Recurring failure modes this checklist prevents:
>
> - Agents using fixed `--fs-`* pt tokens that overflow on mobile
> - Agents creating fixed-column grids that don't reflow on narrow viewports
> - Agents rewriting a simple slide into a "cinematic 6-zone composition"
> without being asked
> - Agents shipping slides without testing at portrait viewports

React/Vite fork of a base44 scaffold. QP2-seminar presentation deck for
the Merck Senior-Director interview. Deployed on Vercel from GitHub
(`rovony/JobPPT-ViteApp`): `main` → production, `dev` → preview.

## Stack

- **React 18 + Vite 6** + Tailwind (postcss) + shadcn/ui (Radix primitives)
- **framer-motion** for slide transitions + shared-element layoutId morphs
- **react-router-dom v6** (v7 future flags enabled)
- **react-resizable-panels** — column layout in PresenterView
- **react-markdown + remark-gfm** — speaker notes / Q&A / reading material
- **@hello-pangea/dnd** — drag-drop slide reorder in DeckOverview
- **base44 SDK** — inherited from scaffold; **OFFLINE-STUBBED** locally (see "AI assistant" below)
- **html-to-image** (NOT html2canvas — bug with `color-mix()` CSS)
- **pptxgenjs** + **jspdf** — deck export

## Slide File Stewardship — NO unilateral rewrites mid-session

> Added 2026-04-25 after a linter/agent rewrote `02-hook-A-trial-not-answer.jsx`
> from a simple centered hero (the user's intended design) into a 6-zone
> cinematic editorial composition with new content ("OPEN · 02" chapter mark,
> top-right context line, three-mark "structural promise" row). The rewrite
> wasn't requested. The user noticed unfamiliar text on the slide and had to
> trace its provenance. **This is not acceptable. Slide files belong to the
> user; agents and linters do not get to rewrite them silently.**

### The rule

Once a slide file exists in `src/decks/<deck-id>/slides/`, **no agent, linter,
formatter, or tool may rewrite its composition, add zones, add content, or
change its visual structure unless the user has explicitly authorized that
specific change in the current session.**

Acceptable agent/linter touches without explicit approval:

- ✅ Code-formatting only (whitespace, semicolons, import order, prettier-style)
- ✅ Single-token swap when fixing a documented contract violation (e.g., the
v3+ Slide Responsiveness Contract above — swapping a banned `--fs-`* token
for the correct `--fs-slide-`* fluid token, **without changing the slide's
composition or copy**)
- ✅ Removing dead imports, fixing obvious syntax errors that prevent the file
from compiling
- ✅ The user explicitly said "rewrite this slide" / "redesign it" / "make it
cinematic" / "match this reference" in the current session

NOT acceptable without explicit user authorization in the current session:

- ❌ Rewriting from a centered-stack composition to a multi-zone composition
(or vice-versa)
- ❌ Adding new visible content — chapter marks, sub-headlines, eyebrows,
context lines, structural marks, decorative elements — that wasn't in the
prior version
- ❌ Changing the copy of any visible text
- ❌ Adding animation primitives (`useInView`, `motion.span` per-line stagger,
GSAP timelines) to a slide that didn't have them
- ❌ Citing "compositional patterns" from other slides as comments and
importing those patterns into this slide's design
- ❌ Replacing the user's editorial choice (italic pivot, asymmetric layout,
hairline placement) with a different choice
- ❌ "Improving" or "elevating" the design without being asked

### When an agent thinks the slide should be redesigned

Surface the proposal as a **suggestion in the conversation**, not as an edit.
Describe what you'd change, why, and ask the user to approve. Wait for an
explicit "yes, do it" before touching the file. *"I noticed this slide
could be more editorial — want me to add a chapter mark and three structural
marks?"* is the right pattern. Editing the file and explaining afterwards is
the wrong pattern.

### When the user says "make it match X" or "use the cinematic pattern"

That IS explicit authorization for that specific scope. Do exactly what was
asked, no more. Adding extra zones / additional content beyond what the user
named is still scope creep — surface those additions as suggestions before
adding.

### When the user says "the linter changed my slide and I don't know why"

The fix is to revert the unauthorized change, NOT to defend the agent that
made it. Read the prior version (git log / file history), compare to current,
and propose a revert. The user owns the file.

### Pre-commit grep — flag suspicious comments

A common tell of unauthorized rewrites is comments at the top of the file
citing "compositional patterns" from other slides:

```sh
rg -l "Compositional pattern citation:|Editorial dark cinema|Asymmetric.*zone composition" \
  4-Apps/merck-deck/src/decks/qp2-seminar-v3-R2/slides/
```

Any matches deserve a re-read against what the user actually asked for.
Some of these may be legitimate (the user requested editorial cinema explicitly),
but the citations should be present only when the user named that intent.

---

## Slide Responsiveness Contract — MANDATORY for v3+ decks (READ BEFORE AUTHORING ANY SLIDE)

> Added 2026-04-25 after a recurring failure: agents kept using fixed-pt tokens
> on v3-R2 slides, producing slides that overflow on portrait phones/tablets
> and letterbox heavily. **The fix is to use the fluid `--fs-slide-*` family
> for every piece of visible text on every slide. Not optional. Not opt-in.**

### The rule

For any slide in a v3+ deck (those that set `standardLayout.enabled = true`),
**every visible-text `fontSize` MUST resolve to a fluid `--fs-slide-*` token**.
Fixed pt-based tokens (`--fs-h1`, `--fs-h1-lg`, `--fs-h2`, `--fs-h3`, `--fs-display`,
`--fs-hero`, `--fs-lead`, `--fs-kicker`, `--fs-quote`, `--fs-body-lg`, `--fs-body`,
`--fs-body-sm`, `--fs-meta`, `--fs-micro`) are **banned in slide content** for
v3+ decks. They are authoring-scale tokens for fixed-canvas designs — they do
not adapt to viewport, so text overflows on mobile and tablet.

### The fluid scale (defined in `src/index.css`)


| Slide content type                   | Fluid token           | Range       | When to use                                    |
| ------------------------------------ | --------------------- | ----------- | ---------------------------------------------- |
| Hero / cover title (largest display) | `--fs-slide-display`  | 32px – 88px | Title slide, cold-open hook headline, closer   |
| Body slide headline                  | `--fs-slide-headline` | 24px – 58px | `BodyLayout`'s `headline` prop, section heads  |
| Lead paragraph / subtitle            | `--fs-slide-lead`     | 16px – 28px | Title-slide subtitle, opener prose, large body |
| Speaker name / framework label       | `--fs-slide-name`     | 15px – 22px | Speaker block, named-thing labels              |
| Tagline / pull quote / body emphasis | `--fs-slide-tagline`  | 13px – 18px | Editorial pull quotes, secondary lead          |
| Subhead / minor headline / card body | `--fs-slide-subhead`  | 13px – 18px | Card heads, sub-section dividers, dense body   |
| Eyebrow / mono kicker / metadata     | `--fs-slide-eyebrow`  | 10px – 13px | "CASE 02 · INDIA CDSCO", chapter marks         |
| Page number / smallest mono          | `--fs-slide-pageno`   | 9px – 11px  | "01 / 37", structural marks, footer-meta       |


Each token is `clamp(min, min(Xvw, Yvh), max)` — narrow OR short viewports both
shrink text proportionally, so slides stay readable on phones, tablets, and
projectors with **zero per-viewport overrides**.

### What's banned in v3+ slide content (visible text)

- ❌ Any `--fs-*` fixed-pt token (the long list above) on `fontSize`
- ❌ Inline `clamp()` literals — `style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}`
- ❌ Inline px / pt / em on `fontSize` — `style={{ fontSize: 16 }}`, `'14pt'`, `'1.5em'`
- ❌ Tailwind text-size classes that resolve to fixed sizes (`text-xl`, `text-4xl`) on slide-body content

### What's still allowed (the exemptions, narrow scope)

- ✅ App-chrome components OUTSIDE slides (PresenterView, DeckOverview, NavControls, modals) — these can use any token; they're not part of the slide canvas
- ✅ The `--fs-*` fixed-pt family in `src/index.css` itself — definitions stay; only their consumption on v3+ slide content is banned
- ✅ Mono code-block / pre-formatted content if a fluid mono token doesn't yet cover it — but propose adding a fluid token first

### When the fluid scale doesn't cover what you need

**Add a new `--fs-slide-*` fluid token to `src/index.css`** following the same
`clamp(min, min(Xvw, Yvh), max)` formula. Do NOT reach for the fixed `--fs-*`
family. Examples of additions made for this contract: `--fs-slide-display`,
`--fs-slide-lead`, `--fs-slide-name`. Adding more is fine — they cost nothing
and prevent the same bug recurring.

### Pre-commit grep (run before committing v3+ slide work)

```sh
rg "fontSize:\s*['\"]?var\(--fs-(hero|display|h1|h1-lg|h2|h3|quote|lead|kicker|body-lg|body|body-sm|meta|micro)\)" \
  4-Apps/merck-deck/src/decks/qp2-seminar-v3-R2/slides/
```

If this returns matches, those slides will fail at portrait-mobile viewports.
Replace each with the corresponding `--fs-slide-*` fluid token from the table.

### Why a FitStage / `transform: scale()` wrapper does NOT solve this

A scale-to-fit wrapper around a fixed-canvas slide IS responsive in that it
preserves aspect ratio, but it produces severe letterboxing on portrait phones
because the 16:9 canvas can't fill a 9:19 viewport. Fluid tokens make the slide
content itself responsive — content fills the viewport at any aspect ratio.
**Fluid tokens are the canonical fix; `transform: scale()` is not.**

### LAYOUT responsiveness — also mandatory (fluid fonts alone are not enough)

> Added 2026-04-25 after agents shipped slides with fluid fonts but fixed-width
> grids and absolute-position offsets that clipped on portrait viewports.
> **Responsiveness is fonts AND layout. Both, every time.**

A slide can pass the fluid-font contract above and still clip on mobile if
its **layout** assumes a wide canvas. The recurring failure modes:

- ❌ `gridTemplateColumns: 'repeat(4, 1fr)'` (or `repeat(N, 1fr)` for any
N ≥ 3) without a reflow strategy — on portrait phones, 4 columns squeeze
to ~80px each and content wraps badly (mono dates split per-character)
- ❌ Fixed `width: 80` (or any fixed px width) on a row of N items where
`N × width + (N-1) × gap > viewport_width_at_375px` (~~290px usable~~)
- ❌ `position: absolute` with `left: '12%'` + `paddingLeft: '3em'` on a
multi-line headline — the indent pushes the second line off-screen on
narrow viewports
- ❌ `position: absolute, top: 0, right: 0, maxWidth: 360` for content
that needs to be SEEN — at 375 viewport that maxWidth exceeds the
usable width minus the safe margin
- ❌ `letter-spacing: 0.12em` (or wider) on mono text that contains
spaces — narrow column widths force the text to wrap **per-character**
because each spaced glyph becomes its own break opportunity
- ❌ `gap: var(--space-10)` (40px) or larger between flex/grid items —
on a 375 viewport that's >10% of the width per gap, multiplying the
overflow risk

The required positive patterns:

- ✅ `gridTemplateColumns: 'repeat(auto-fit, minmax(min(<min-card-width>, 100%), 1fr))'` —
cards reflow to fewer columns automatically as the viewport narrows
- ✅ `flex-wrap: wrap` on horizontal rows of N items so they stack on
narrow viewports
- ✅ `min-width: 0` on flex children that contain wrapping text (prevents
blowout)
- ✅ Use percentage / `cqi` / `cqh` / fluid clamp for offsets, NOT fixed
px or em multipliers that compound at narrow widths
- ✅ For mono text with letter-spacing: `white-space: nowrap` so the whole
string moves as a unit, OR scale letter-spacing down on narrow viewports
via clamp
- ✅ Maximum 3 columns on horizontal grids by default; if you need 4+,
switch to `auto-fit` with a min-card-width that allows reflow
- ✅ Test at 375×812 BEFORE committing. If anything clips, redesign the
layout — don't just shrink the font

### Pre-commit grep — flag layout patterns that break on mobile

```sh
# Fixed-column grids without reflow strategy
rg "gridTemplateColumns:\s*['\"]repeat\(\s*[3-9]" \
  4-Apps/merck-deck/src/decks/qp2-seminar-v3-R2/slides/

# Fixed-px widths on layout primitives (allow on hairlines/dividers ≤96px;
# scrutinize anything wider)
rg "width:\s*([1-9][0-9]{2,}|1[0-9]{3})\b" \
  4-Apps/merck-deck/src/decks/qp2-seminar-v3-R2/slides/

# em-multiplied offsets that compound at narrow widths
rg "padding(Left|Right):\s*['\"][2-9]e[m]" \
  4-Apps/merck-deck/src/decks/qp2-seminar-v3-R2/slides/

# Wide letter-spacing on mono content (>0.1em without nowrap)
rg "letterSpacing:\s*['\"]0\.1[2-9]em" \
  4-Apps/merck-deck/src/decks/qp2-seminar-v3-R2/slides/
```

If any of these return matches, render the slide at 375×812 — if it clips,
fix the layout, not just the font.

---

## External design references — load these alongside this file

> Three external references inform any agent doing slide-craft work
> in this repo. They sit at different layers; each answers a different
> kind of question.

### `/dev` route — the LIVE design system (canonical at runtime)

The deck app ships an in-app design system at `/dev` (admin-gated).
Sub-pages, all under `src/components/devkit/pages/`:


| Route              | Purpose                                                                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `/dev`             | Overview · entry index for the catalog                                                                                                 |
| `/dev/tokens`      | Color tokens, spacing scale, font-size scale (fixed AND fluid), shadow / radius / stroke tokens — render with live values              |
| `/dev/typography`  | Display (Fraunces) + body (Inter) + mono (JetBrains) specimens; line-height, letter-spacing, tabular-nums in context                   |
| `/dev/scientific`  | Forest plots, exposure-response curves, dose-finding lattices, error bars — chart primitives                                           |
| `/dev/transitions` | Motion / shared-element layoutId / 3D transition presets — visual demos                                                                |
| `/dev/viz`         | Maps, isotypes, Sankey, dataflow — visualization primitives                                                                            |
| `/dev/patterns`    | Composed components: HeroTile, RecapCard, ImpactNumerals, CaseHeroDivider — live exemplars of the patterns codified below              |
| `/dev/libraries`   | External library cheatsheet: which library to reach for for each visualization need (recharts, react-simple-maps, @xyflow/react, etc.) |


**Use it like documentation that can't go stale:** when you're not sure
what a token resolves to or what a pattern looks like in motion, open
`/dev/<category>` and read the source rendered live. The catalog
beats reading raw CSS / JSX because it shows the components as the
audience will see them.

When adding a new pattern that other slides should reuse, **also add
a demo to `/dev/patterns`** (or the relevant sub-page) so future
agents discover it via the catalog instead of grepping source.

### `zaj-slides` skill — Malek's slide-craft discipline (process + bans)

User-invocable skill at `~/.claude/skills/zaj-slides/`. Triggered by
the words "slide", "deck", "presentation". Provides:

- Universal slide-craft defaults (canvas, typography, density, motion)
- Hard bans on AI / SaaS visual cliches (`references/craft-bans-and-borders.md`)
- Story architecture (6 shapes, TURN, 7-act case-study) (`references/story-architecture.md`)
- Voice + bracket-method discipline (`references/voice-and-bracket-method.md`)
- Fact-audit + `{{VERIFY}}` workflow (`references/fact-audit-and-integrity.md`)
- AI-generation tells across 5 passes (`references/ai-generation-tells.md`)
- Agent dispatch contract (`references/agent-contract.md`)
- 13 slide-type taxonomy with per-type rules (`references/slide-type-taxonomy.md`)

**Where merck-deck deliberately diverges from zaj-slides defaults:**


| zaj-slides default                                                           | merck-deck v3+ override                                                 | Why                                                                                                                                  |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **px / pt only** at slide level (no clamp / vw / vh)                         | *fluid `--fs-slide-` tokens** mandatory                                 | Fixed-canvas + transform-scale produced ugly mobile letterboxing on 9:19 phone aspect; fluid tokens make content fill any aspect     |
| **Hard ban on bordered cards with drop shadows**                             | HeroTile / RecapCard with 1.5px border + left-accent rail are CANONICAL | Clinical-pharm decks need rapid scan parity between case cards; the deck has shipped these in v1/v2 already                          |
| **14pt floor on all text**                                                   | Eyebrow tokens at 10-13px allowed for chrome                            | The deck uses fluid tokens that exceed 14pt at large viewports; on small viewports 10-13px is acceptable for non-load-bearing chrome |
| **"Rounded-rectangle cards with left-border-accent" called the SaaS cliche** | Same pattern is the deck's HeroTile vocabulary                          | Override accepted; must still pass the zaj-slides "editorial touch present" test                                                     |


For everything NOT in the divergence table — the zaj-slides defaults
hold:

- Assertion titles, never topic labels
- Tabular numerals on every number
- One dominant element per slide; one accent carries the payoff
- `prefers-reduced-motion` fallback on every animation
- Confidentiality bans (no Servier/GSK internal data, no salary, no
internal-doc verbatim quotes)
- AI-tell scrub before delivery (40 tells in 5 passes)
- Public-evidence-only for case-study claims (DOI / PubMed / FDA / EMA / PMDA published docs only)

When in conflict, **this file (merck-deck/CLAUDE.md) wins for
mechanical / responsiveness / pattern decisions**. zaj-slides wins
for content discipline (titles, voice, fact audit, AI tells,
confidentiality). Read both; understand the boundary.

### `1-Sources/` workspace package — the deck's evidence base

Per workspace root `CLAUDE.md`: every scientific claim in a slide
must trace to `1-Sources/1-MyPreviousFiles/` (papers, prior decks)
or `1-Sources/2-ResearchFiles/` (themed research packages). Do NOT
fabricate numbers, study IDs, dates, or model parameters; preserve
verbatim from source. When in doubt, run `wc -c` on the source file
first and pre-chunk if >20KB before involving any agent.

---

## Slide Design Patterns Library — READ BEFORE COMPOSING ANY SLIDE

> Added 2026-04-25 after the v3-R2 hook slides shipped with overlap bugs,
> microscopic annotations, fixed-column grids, and absolute-position
> headlines that broke at 375×812. The root cause was every slide reinventing
> its own composition from scratch instead of using the patterns the v1/v2
> decks already established. **This section codifies what's reusable so
> any agent on any slide produces work that fits the deck.**

### Compositional primitives (use these, don't reinvent)

The deck has four canonical composition primitives. Reach for them in this
order before writing absolute-positioned bespoke layouts.

#### 1. `<SlideGrid>` + `STANDARD_AREAS` — overlap-proof body slides

`src/components/deck/SlideGrid.jsx` exports a CSS-Grid primitive with
named areas. **Two children CANNOT occupy the same cell** — the grid
enforces it structurally. Standard areas: `chrome-l chrome-r eyebrow headline subhead viz footer`. The `viz` row is `1fr` (flex-grow), all
other rows are `auto`.

```jsx
import SlideGrid, { STANDARD_AREAS, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

<SlideGrid areas={STANDARD_AREAS} dataCase="coral">
  <Eyebrow>Case 01 · Pediatric PAH</Eyebrow>
  <Headline>The trial that <em>could not be run</em>.</Headline>
  <Subhead size="lead">Why ambrisentan needed a model, not a study.</Subhead>
  <Viz>{/* chart, illustration, or composition */}</Viz>
  <Footer kicker="01 · Hook" tagline="The framework promise." source="Source · …" />
</SlideGrid>
```

Dev-mode warns if a child references an undeclared area. `data-case`
sets the `--case` token cascade (coral / cyan / violet / amber / sage).
Use this for **every body slide** unless you have a documented reason.

#### 2. `<SlideParts>` — typographic furniture

`src/components/deck/SlideParts.jsx`. Every part reads the fluid
`--fs-slide-`* tokens, so they're responsive by default. Single source
of truth for the deck's typographic hierarchy:


| Part                             | Token                                                     | Visual                                                        | Use for                                 |
| -------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------- |
| `<Eyebrow>`                      | `--fs-slide-eyebrow` (10–13px)                            | mono · uppercase · case-color · short hairline rule prepended | "CASE 02 · INDIA CDSCO"                 |
| `<TopRight>`                     | `--fs-slide-topright`                                     | mono · uppercase · cream-faint · right-aligned                | NN/total badge, segment label           |
| `<Headline>`                     | `--fs-slide-headline` (24–58px)                           | display · weight 500 · cream · `maxChars={34}` default        | The thesis sentence                     |
| `<Subhead>`                      | `--fs-slide-subhead` (13–18px) OR `'lead'` size (16–24px) | display · italic · cream-muted · `maxChars={100}` default     | One-line setup or lead                  |
| `<Viz>`                          | (no font)                                                 | flex grow with `minHeight:0, minWidth:0`                      | The body — chart / cards / illustration |
| `<Footer kicker tagline source>` | `--fs-slide-kicker / -tagline / -pageno`                  | hairline above · 3-cell row                                   | Slide-meta + payoff + page N/total      |


**Convention** (hard-set in `<Footer>`):

- `kicker` ≤ 25 chars · mono · uppercase · cream-faint
- `tagline` ≤ 16 words · display italic · cream-muted · sm:flex-1 sm:text-right
- `source` (optional second row) · 4-cite chains stay legible because
they wrap (callers were stuffing them into `tagline` and getting
truncated below 1366px)
- Page N/total auto-rendered from `useDeck()` context — **never hardcode** "03 / 20".

The legacy `<PageNo />` is now a no-op; the page indicator lives inside
`<Footer>` so the rail layout is consistent.

#### 3. `<CaseHeroDivider>` — case study openers

`src/components/deck/patterns/CaseHeroDivider.jsx`. Use for case dividers
(slides 5/15/23 in v2). Props: `caseToken caseNumber totalCases kicker title subtitle tagline meta verdict illustration source`. Sets
`data-case` on the section root, drives `--case` cascade. Illustration
slot accepts an SVG component (e.g. `<IndiaMap />`, `<LungIcon />`).

DO NOT hand-write a case divider from scratch — every case opener in
the deck must look identical structurally so the audience reads them
as parallel. If you need a variant, extend `CaseHeroDivider` with
optional props rather than forking it.

#### 4. `<SlideFrame>` (legacy) — used in v1/v2

`src/components/deck/SlideFrame.jsx`. Older chrome wrapper with
`eyebrow` / `headline` / `subhead` / `footerKicker` / `footerSource`
props plus `dataCase` and `eyebrowColor`. **v3+ should prefer SlideGrid**,
but if you're matching an existing v2 slide in look-feel, SlideFrame
is acceptable.

### Card patterns (the deck's three card vocabularies)

Every card in this deck follows one of three recipes. Pick the one
that fits the content; do not invent a fourth.

#### A. **RecapCard** — left accent rail + theme number + payoff + proof

Used in `14b-case-recap.jsx` (CS1 framework recap). Border 1px hairline,
left rail 4px in case color, background `color-mix(in srgb, var(--panel) 65%, transparent)`. Eyebrow row has `THEME NN` (accent color) + theme
title (cream-faint). Payoff line is italic accent-colored display
text at `--fs-card-title`. Body proof is `--fs-slide-body` cream-muted.

```jsx
<motion.div style={{
  border: '1px solid var(--cream-hairline)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-4) var(--space-5)',
  position: 'relative',
  minHeight: 0, minWidth: 0,  // prevents flex/grid blowout
  overflow: 'hidden',
}}>
  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0,
                width: 4, background: accent }} />
  <div>{/* eyebrow row */}</div>
  <div style={{ fontStyle: 'italic', color: accent }}>{payoff}</div>
  <div style={{ color: 'var(--cream-muted)' }}>{proof}</div>
</motion.div>
```

#### B. **HeroTile** — date/stat + sub + body, gradient background

Used in `22-case2-impact-bridge.jsx` for impact stats. Border 1.5px solid
case color, left edge 4px solid same. Background is a subtle gradient
fading the case-color tint to panel. `tone='coral'|'cyan'|'cream'`,
`muted` flag for the meta tile. Stagger entrance with `delay` prop
(0.5/0.8/1.1 in the reference).

```jsx
border: `1.5px solid ${muted ? 'var(--cream-hairline)' : color}`,
borderLeft: `4px solid ${color}`,
borderRadius: 'var(--radius-md)',
background: muted
  ? 'color-mix(in srgb, var(--panel) 60%, transparent)'
  : `linear-gradient(180deg,
      color-mix(in srgb, ${color} 12%, transparent),
      color-mix(in srgb, var(--panel) 75%, transparent) 70%)`,
```

Use HeroTile for **terminal stats** (the "this slide makes one number
land" payoff). Three across, asymmetric weighting (1 primary + 2
supporting) reads as a hierarchy.

#### C. **ImpactNumerals** — asymmetric 3-stat composition with motion

`src/components/deck/patterns/ImpactNumerals.jsx`. Three stats in a
12-col grid (5/4/3 spans), staggered vertical alignment (`items-start`
/ `items-center md:mt-12` / `items-end md:mt-20`). Numerals use scale-pop
overshoot ease `[0.34, 1.56, 0.64, 1]`. Hairline accent rule animates
left-to-right beneath each number.

Use for slides where the numbers ARE the slide (CS2 impact, CS3 impact).

### Annotation hierarchy — every text element has ONE canonical size

> The "WHAT CHANGED" / "FIFTEEN DAYS · THREE FRAMEWORKS" small-text-under-
> a-chart pattern was rendering at 10-13px (`--fs-slide-eyebrow`) on the
> v3-R2 hooks. **That's an eyebrow, not an annotation. It's too small to
> read at projector distance.** Annotations explain what just changed in
> the chart; they need to be readable.

Use the table below. If a label doesn't fit any of these roles, you're
inventing a new one — propose a new `--fs-slide-`* token instead of
reaching for `--fs-meta` or `--fs-micro`.


| Role                                                       | Token                                        | Px range              | Examples                                                  |
| ---------------------------------------------------------- | -------------------------------------------- | --------------------- | --------------------------------------------------------- |
| **Hero / cover title**                                     | `--fs-slide-display`                         | 32–88                 | Title slide; cold-open thesis                             |
| **Body headline**                                          | `--fs-slide-headline`                        | 24–58                 | The slide's claim                                         |
| **Lead / subtitle**                                        | `--fs-slide-lead`                            | 16–28                 | Title-slide subtitle, opener prose                        |
| **Speaker / framework name**                               | `--fs-slide-name`                            | 15–22                 | Speaker block, framework labels                           |
| **Annotation under chart** ← *use this for "WHAT CHANGED"* | `--fs-slide-tagline` or `--fs-slide-subhead` | 13–18                 | "Fifteen days · three frameworks", "What changed" callout |
| **Body / paragraph**                                       | `--fs-slide-body` (or `--fs-slide-subhead`)  | 13–18                 | Multi-sentence prose                                      |
| **Card title**                                             | `--fs-card-title`                            | (existing card scale) | RecapCard payoff                                          |
| **Eyebrow / kicker / segment label**                       | `--fs-slide-eyebrow`                         | 10–13                 | "CASE 02 · INDIA CDSCO", chapter marks                    |
| **Page number / smallest**                                 | `--fs-slide-pageno`                          | 9–11                  | "01 / 37", structural marks                               |


**Rule for "annotations under a chart":** they get `--fs-slide-tagline`
or `--fs-slide-subhead` (13-18px range), NOT `--fs-slide-eyebrow`. Eyebrow
is for top-of-slide segment labels only. The tell that something is
annotation-not-eyebrow: it answers "what changed in this chart"
rather than "where am I in the deck".

**Rule for subtitles (under-headline lead lines):** UPRIGHT (not
italic), `deck-body` class (Inter sans · NOT Fraunces serif),
`--fs-slide-lead`, `color: var(--cream); opacity: 0.78` for muted-
but-legible contrast. Italic Fraunces at small sizes is hard to
scan — the user has flagged it twice. Reserve italic for:

- Inline emphasis on key phrases (`<em>` inside body prose)
- Pull quotes / closing payoff lines at tagline size
- The `<Subhead>` component when the line is a captioned tagline,
not a real subtitle

If the subtitle exceeds 1.5 lines, drop it or split it. Subtitles
that wrap to 3+ lines compete with the headline for attention.

**Rule for conclusions / closing payoff lines:** UPRIGHT (not italic),
`deck-body` class (Inter sans · NOT Fraunces serif), `--fs-slide-tagline`,
`color: var(--cream); opacity: 0.82`, line-height 1.5, max-width ~66ch.
Highlight the load-bearing phrase with an inline amber span at
`fontWeight: 600` for prominence — that span IS the conclusion's
visual anchor; the surrounding prose is scaffolding around it.
Animated in last (delay ~2.0-2.4s after headline).

**Why upright sans, not italic serif:** italic Fraunces serif at
tagline size (13-18px) is hard to read — flagged twice by the user.
Inter sans (deck-body) holds up at projector distance and reads
fast. Italic is ALLOWED inside the conclusion only as inline
emphasis on a single phrase, not on the whole line.

This is the audible "and that's what this slide just said" — it
tells the audience how to read what they just saw. NOT required on
every slide; required on hooks, case-recap slides, and case-bridge
slides where the audience needs an explicit cue to carry the point
forward.

**Italic-Fraunces ban (the simple version):** Fraunces italic ≥ 24px
is fine (display headlines, large pull quotes). Fraunces italic
< 24px is BANNED for any prose the audience must actually read.
Subtitles, conclusions, captions, body text, annotations under
charts — all UPRIGHT. Inline `<em>` for one-word emphasis is fine.

**Rule for headlines on hooks:** v3-R2 hook headlines benefit from
slightly larger sizing than the standard `--fs-slide-headline`
(24-58px). Use an inline override `clamp(2rem, min(4.4vw, 7vh), 4.5rem)`
or define a `--fs-slide-hook` token. The headline-as-thesis on a
hook slide is the strongest typographic signal in the deck — under-
sizing it weakens the open.

### Border, hairline & decorative-element vocabulary

The deck uses **four** border weights deliberately. Pick the one that
matches the role; don't invent intermediates.


| Weight                            | Token               | Use                                                                             |
| --------------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| `var(--stroke-hair)` (1px)        | hairline rule       | section dividers, header underlines, "axis" lines on charts, small marker stems |
| `1px solid var(--cream-hairline)` | card outline        | RecapCard, dense-content cards                                                  |
| `1.5px solid <case-color>`        | tinted-card outline | HeroTile (case-tinted cards)                                                    |
| `4px solid <case-color>`          | accent rail         | left edge of RecapCard / HeroTile, "this is a colored card" semantic            |


**Decorative blocks** allowed (no others — propose before adding):

- Hairline rule: `width: clamp(48px, 8vw, 80px); height: var(--stroke-hair); background: var(--cream-faint)` — the deck's signature "this is a structural mark" element. Used in eyebrows, mark rows, axis ends.
- Rotate-45 amber square: `transform: rotate(45deg); width: 14px; height: 14px; background: var(--amber)` — the "next" pointer on closing ribbons.
- Color-mix wash: `background: color-mix(in srgb, var(--token) Npc, transparent)` (N typically 6–28 for surfaces, 60–75 for cards). Always `in srgb` — `html-to-image` doesn't yet support OKLCH.

### Closing / conclusion / "next" ribbon pattern

The deck ends slides with a horizontal "ribbon" that introduces the
next case (see RecapCard's closing ribbon, `14b-case-recap.jsx` lines
129-182). Recipe:

1. Flex row: rotate-45 amber square (14px) + italic display tagline + inline color-changing text pointing to next.
2. Background `color-mix(in srgb, var(--amber) 8%, transparent)`, border `1px solid color-mix(in srgb, var(--amber) 28%, transparent)`, `radius-md`.
3. Tagline at `--fs-slide-tagline`, italic, weight 400. Inline `motion.span` animates color from cream → amber to draw the eye to "Next: …".
4. Delay schedule: ribbon enters at ~1.85s, color shift at ~2.65s — after the cards have all landed.

```jsx
<motion.div style={{
  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
  padding: 'var(--space-2) var(--space-4)',
  background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
  border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
  borderRadius: 'var(--radius-md)',
}}>
  <motion.div aria-hidden style={{ transform: 'rotate(45deg)',
    width: 14, height: 14, background: 'var(--amber)' }} />
  <motion.div className="deck-display italic" style={{ fontSize: 'var(--fs-slide-tagline)' }}>
    Same model-becomes-evidence logic — different drug, different agency.{' '}
    <motion.span animate={{ color: 'var(--amber)' }}>Next: a regulatory waiver in India.</motion.span>
  </motion.div>
</motion.div>
```

### Animation grammar (timing constants)

The deck uses two ease curves and a defined delay schedule. Don't invent
new ones unless the slide has a documented narrative reason.

```js
const EASE = [0.2, 0.7, 0.3, 1];   // standard — settle from above
const POP  = [0.34, 1.56, 0.64, 1]; // overshoot — for numerals/medallions

// Reference delay schedule (stagger over ~3 seconds)
const D = {
  chrome: 0.10,    // corner badges, page indicators
  eyebrow: 0.25,
  headline: 0.45,  // first headline line
  headline2: 0.65, // second headline line (asymmetric editorial slides)
  subhead: 0.85,
  visual: 0.40,    // illustration anchored to right
  cards: [0.70, 0.85, 1.00, 1.15],  // staggered card grid
  annotation: 1.40,  // post-cluster callouts
  ribbon: 1.85,    // closing-ribbon entrance
  ribbonShift: 2.65, // ribbon color-change inline span
};

// MANDATORY guard — every animated slide
const prefersReduced = useReducedMotion();
const isInView = useInView(ref, { once: true, amount: 0.3 });
const go = isInView && !prefersReduced;
```

**Animation rules:**

- Section mounts opaque (`initial: { opacity: 1 }`) on the slide-root.
The slide-level fade is owned by `SlideTransition`. Adding
`initial: 0` on the section compounds with `SlideTransition`'s exit
fade and produces visible flickers during shared-element morphs.
See `SlideGrid.jsx` lines 85-93 for the diagnostic.
- Per-element animations DO use `initial: { opacity: 0, y: 10 }` —
that's element-level entrance, separate from the section fade.
- Always `useReducedMotion` guard. Always `useInView` once-only trigger
with `amount: 0.3` so animations replay only when the slide is
meaningfully on-screen, not on micro-scrolls.

### Color & token discipline (beyond fonts)

- **NO hex literals in slide JSX.** Even amber, even cream. Always
`var(--amber)` / `var(--cream)` / `var(--case)`.
- **Case-color inheritance:** wrap the slide root in `data-case="coral|cyan|violet|amber|sage"`. The `--case` cascade is set globally — children read `var(--case)` for case-aware accents. Cross-case slides default to `--amber` / `--sage`.
- **Color-mix tints:** `color-mix(in srgb, var(--token) Npc, transparent)`. Standard percentages: 8 (background wash), 12 (gradient stop), 28 (border tint), 60-75 (card surface).
- **Gradients:** `linear-gradient(180deg, color-mix(...) , color-mix(... 70%))` — top-tinted cards. Always 180deg vertical for tiles; 90deg horizontal only for explicit left-to-right reveals.

### Bounding-box discipline for absolute / SVG layouts

When a slide uses `position: absolute` (case dividers, timelines,
illustrations) or any SVG, the **bounding-box audit table is
non-optional** (per global `~/.claude/rules/frontend.md`). Recurring
v3-R2 failure mode: agents place markers at percentages without
checking that label widths fit between them.

**Before writing absolute coordinates, write this comment block at the
top of the file:**

```js
/* BOUNDING-BOX AUDIT (update on every coordinate change)
 * Element            x-range        y-range      Notes
 * ───────────────    ────────────   ──────────   ─────
 * Aug 7 marker        4-7%           38-50%       above-axis
 * Aug 7 label box     4%±90px        0-30%        WIDTH = 180px
 * Aug 8 marker        5-8%           50-62%       below-axis
 * ...
 *
 * Min spacing between same-side cluster markers must be >= label_width
 * at the narrowest supported viewport. At 1024px container:
 *   11.5% (Aug7→Aug21) × 1024 = 117px < 180px label → OVERLAP BUG.
 * Fix: narrow labels to maxWidth: 'min(110px, 22vw)' OR alternate sides
 *      OR put glosses in a separate annotation panel below.
 */
```

For timelines specifically: **labels with glosses cannot all live on the
axis** when 3+ markers cluster within 15% of axis. Either drop the gloss
for the cluster (date+name only inline, full glosses in a callout panel
below the timeline), or rotate the labels vertically, or alternate sides
strictly (above/below/above for 3 markers — never two same-side adjacent).

### Edge-aware label anchoring (timelines, charts, scatter plots)

> Added 2026-04-25 after the Nov 6 marker on hook-B (87.7% of axis)
> rendered with each gloss word on its own line — the label box
> overflowed the right container edge, forcing per-word wrap.

When placing labels relative to data points (timeline markers,
scatter dots, chart annotations), labels DO NOT default-anchor to the
data point's left side. Anchor based on horizontal position:

- Position **0% to 20%** (near left edge) → `left: -4; text-align: left` (default)
- Position **20% to 80%** (interior) → either side; pick by collision avoidance with neighbors
- Position **80% to 100%** (near right edge) → `right: -4; left: auto; text-align: right` — label extends LEFTWARD from the point
- Position **<5%** (hard left edge) → `left: 0; text-align: left` AND constrain maxWidth to fit within the container

The math: a label of width W placed at position P% of container W_c
needs `(P/100) * W_c + W <= W_c` (left-anchored) OR
`(P/100) * W_c - W >= 0` (right-anchored). If neither fits, the label
is too wide for that position — narrow it OR move the marker OR move
the gloss to a separate panel below.

**Code pattern** (parameterize per data row, don't hardcode):

```js
const FRAMEWORKS = [
  // ...
  { name: 'ICH M15', date: '2024-11-06', anchorRight: true, /* near right edge */ },
];

// In the marker render:
<div style={{
  position: 'absolute',
  ...(fw.anchorRight
    ? { right: -4, left: 'auto', textAlign: 'right' }
    : { left: -4 }),
  // ...
}}>
```

Pre-commit grep — flag absolute labels without explicit anchor on far-right markers:

```sh
rg "left:\s*-?[0-9]+" 4-Apps/merck-deck/src/decks/qp2-seminar-v3-R2/slides/ \
  | rg -B2 "pct\(['\"]2024-1[12]"   # any Nov/Dec marker — likely far-right
```

### Card / label widths use REM, not raw PX

> Added 2026-04-25 after card widths landed in raw px (`min(240px, 38vw)`) and didn't scale with the root font-size or grow on large
> displays.

Width clamps for cards, labels, callouts, and any container holding
text MUST use `rem` units (or `ch` for character-based widths), not
raw `px`. Raw px:

- Doesn't honor user font-size preferences (accessibility regression)
- Doesn't grow proportionally on 4K / projector resolutions
- Locks the design to one assumed viewing distance

The canonical pattern:

```css
/* GOOD — scales with root font-size + viewport */
maxWidth: 'clamp(14rem, 38vw, 18rem)'

/* GOOD for prose — character-based */
maxWidth: '52ch'

/* BAD — raw px doesn't scale */
maxWidth: 'min(240px, 38vw)'  /* DEPRECATED */
maxWidth: '300px'              /* DEPRECATED */
```

**Reference width scale for cards:**


| Card class          | Width range                 | When                                   |
| ------------------- | --------------------------- | -------------------------------------- |
| Tight cluster label | `clamp(9rem, 34vw, 11rem)`  | timeline cluster markers, dense labels |
| Standard label      | `clamp(11rem, 40vw, 15rem)` | typical chart labels with 1-line gloss |
| Standalone callout  | `clamp(14rem, 38vw, 18rem)` | lone-marker HeroTile callouts          |
| Body card           | `clamp(16rem, 28vw, 22rem)` | RecapCard, HeroTile body content       |
| Reading card        | `clamp(20rem, 60vw, 32rem)` | full-prose pull cards, quote cards     |
| Prose column        | `52ch` to `66ch`            | text-only columns (use ch, not rem)    |


`vw` is the bridge between the rem floor and rem ceiling — at narrow
viewports rem floor binds; at wide viewports rem ceiling binds; in
between vw scales smoothly.

**Pre-commit grep — flag raw-px widths on card containers:**

```sh
rg "maxWidth:\s*['\"]?(min|clamp)\(.*[0-9]+px" \
  4-Apps/merck-deck/src/decks/qp2-seminar-v3-R2/slides/
```

Matches indicate raw-px width clamps that should be converted to
rem-based clamps. Allowed exceptions: hairline widths (≤96px),
border widths (1-4px), exact-pixel spacing on decorative elements
where rem scaling would break the design (e.g. dot radius, stem
height on timelines — these are visual-mark dimensions, not
content-width).

### Visual parity vs. on-axis placement (when cluster cards can't fit)

> Added 2026-04-25 after the hook-B axis was extended from 4 months
> to 20 months, compressing the August cluster from 117px → 24px
> between markers — far too tight for any inline card treatment.

When the user asks for "all cards to look the same," they're asking
for **visual parity** — same border, accent rail, padding, color
wash. They are NOT asking for "all cards on the axis" if the axis
spacing physically can't fit them.

**The strategy decision tree:**

1. Measure cluster spacing at narrowest supported viewport (375 mobile, 1024 laptop, 1920 desktop). Take the smallest gap between adjacent same-side markers.
2. **Gap > card_width + 8px:** put cluster cards inline on the axis with anchor alternation (Aug 7 leftward, Aug 21 rightward, etc.). All 4 cards look identical AND are placed where the data is.
3. **Gap ≤ card_width:** cluster gets DOTS ONLY on the axis. ALL cards (cluster + lone callouts) appear in a panel grid BELOW the timeline with identical card chrome. Visual parity preserved; on-axis placement sacrificed.
4. **Mixed scenario** (cluster too tight, but one marker has room): cluster goes dots-only-then-panel; the spaced marker gets BOTH an inline card AND a row in the panel for parity. The panel is the source of truth; the inline card is a teaser pointing to it.

**The rule for axis-range changes:** when the timeline's date range
changes (a slide refactor, a story revision), re-run step 1. The
strategy that worked at 4 months may break at 20 months. The
`dotOnly` boolean per marker captures this decision in the data
model.

```jsx
const FRAMEWORKS = [
  { name: 'Rule 101', date: '...', inCluster: true,  dotOnly: true,  asCard: false },
  { name: 'ICH M15',  date: '...', inCluster: false, dotOnly: false, asCard: true  },
];

// In render:
{!fw.dotOnly && <InlineCallout fw={fw} />}      // axis card

// In the panel below, ALWAYS render all 4:
{FRAMEWORKS.map((fw) => <PanelCard fw={fw} />)} // identical chrome for all
```

The bottom panel grid is the actual "card design" the audience
reads — the timeline is the temporal backbone showing WHEN, the
panel is the substantive WHAT. They reinforce each other; they
don't compete for the same job.

### Standalone-callout treatment (lone marker on a chart)

> When ONE data point sits apart from the others (e.g. the Nov 6
> ICH M15 marker on hook-B, far right of the August cluster), giving
> it the same raw-text label treatment as cluster markers makes it
> read as stranded body text — small, low-contrast, fighting for
> visual weight against the heavy cluster on the left.

Lone callouts get the **HeroTile-pattern card chrome** for explicit
emphasis:

```jsx
{
  border: '1px solid color-mix(in srgb, var(--amber) 36%, transparent)',
  borderLeft: '3px solid var(--amber)',  // accent rail (3px on small cards, 4px on large)
  borderRadius: 'var(--radius-md)',
  background: 'color-mix(in srgb, var(--amber) 6%, transparent)',
  padding: 'var(--space-3) var(--space-4)',
}
```

And the gloss size jumps from `--fs-slide-kicker` (raw-text default) to
`--fs-slide-subhead` (card-readable). Width opens up to 240px max so
"Models become regulatory evidence" lands on one line, not crammed
vertically per word.

Use this when:

- One data point is structurally apart from others (>50% axis distance from cluster)
- The lone point's annotation is the slide's payoff (the "and a fourth came later" beat on hook-B)
- The cluster gets a separate gloss panel below; the lone point would look orphaned at the same raw-text treatment

DON'T use when:

- All data points are at roughly equal density on the axis (use uniform raw-text labels)
- The lone point is decorative / supporting, not the payoff

### Common compositional anti-patterns (specific to v3-R2 fail modes)

- ❌ **Absolute-positioned multi-line headline with `paddingLeft: '3em'` indent on second line.** On 375px viewport, 3em = 48px+ of padding pushes the second line off-screen. Use `paddingLeft: 'clamp(0px, 3em, 12vw)'` so the indent shrinks proportionally on narrow viewports.
- ❌ **Top-right context line on a hook slide.** Top-right corner is reserved for chrome (page indicator, segment label) — adding a sentence there creates two competing reading orders. Put narrative copy in headline/subhead.
- ❌ **Three structural marks with `width: 80` fixed.** Use `width: 'clamp(48px, 8vw, 80px)'` AND `flex-wrap: wrap` AND `gap: 'clamp(var(--space-3), 4vw, var(--space-10))'` so marks reflow.
- ❌ **Timeline with 3 markers within 15% of axis, each with 180px label.** See bounding-box rule above.
- ❌ `**max-width: 360px` on absolute-positioned text.** At 375 viewport that's the entire usable width — text overflows the safe margin. Use `min(360px, 80%)` or `min(360px, calc(100% - var(--space-8)))`.
- ❌ **Reaching for `--fs-meta` / `--fs-micro` on an annotation under a chart.** Use `--fs-slide-tagline` or `--fs-slide-subhead`. The fixed-pt micro tokens are 9-11px and unreadable at projector distance.

### Cross-slide patterns & cinematic transitions

> A deck is a sequence, not a stack of independent slides. The
> patterns below name how slides hand off to each other — the
> cinematic seams the audience reads as "we're going somewhere."
> Skipping these makes the deck feel like a slideshow; using them
> well is the difference between McKinsey-template and Pentagram-
> editorial.

#### A. Shared-element FLIP morphs (`layoutId`)

The single most powerful cross-slide tool. Two slides render the
same component (or its visual cousin) with the same `layoutId` prop;
framer-motion FLIP-animates from the source bounding box to the
destination bounding box across the slide transition.

```jsx
// Slide 17 (CS2 challenge): SEC objection rendered full-width center
<SecObjectionCard layoutId="cs2-sec-objection" variant="raw" />

// Slide 22 (CS2 impact): same card, resolved + shrunk into top-right corner
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <div style={{ maxWidth: 'min(56%, 640px)' }}>
    <SecObjectionCard layoutId="cs2-sec-objection" variant="resolved" />
  </div>
</div>
```

The audience reads it as "the objection from earlier is now resolved
and tucked away." That ONE morph carries the entire CS2 narrative
arc.

**Hard rules** (these prevent the slide-5→6 lung flicker class of bug):

- Wrap the deck root in `<LayoutGroup id="qp2-deck-layout">` (already
done in `DeckRunner.jsx`)
- Both source AND destination slides render `motion.div` with the
SAME `layoutId` AND the `layout` prop
- The shared element MUST NOT live inside a CSS-grid cell whose
width depends on siblings — layout thrash → flicker. Use
`position: absolute` overlay or a fixed-width container.
- The slide-section wrapper MUST mount opaque (`initial: { opacity: 1 }`).
The slide-level fade is owned by `<SlideTransition>`. Adding
`initial: 0` on the section compounds with SlideTransition's exit
fade and exposes the cream deck-root underneath the morphing
element for ~200ms — that IS the flicker.
- 3D transition presets (`cube`/`flip`/`depth`/`pan`) DO NOT
participate in `layoutId`. If a slide-pair uses a 3D transition,
the shared element won't morph — pick one or the other.

**When to use shared-element morphs:**

- A piece of evidence (quote, datum, illustration) returns later in
resolved / answered / scaled form
- A case-study illustration (lung, India outline, brain) appears on
the divider AND the impact slide
- A framework theme card on the recap slide morphs from the slide-04
framework grid

**When NOT to use:**

- Two unrelated slides happen to have similar elements — gratuitous
morphs feel like a magic trick
- The morph would obscure the audience's reading order — never put
the morph in front of the headline they need to read

#### B. The "next-case bridge" pattern

Every case study ends with a closing ribbon (see Patterns Library →
"Closing / conclusion / next ribbon pattern" above) that sets up the
next case. The case divider for the next slide RECEIVES that handoff:

- Closing ribbon's amber square → next case divider's case-color
hairline (token swap on slide change)
- Closing ribbon's "Next: a regulatory waiver in India." text →
next slide's giant compound title ("Ivosidenib")
- Optional: shared-element morph from the ribbon's amber square →
the divider's accent rule

The audience reads it as one continuous gesture: "ending → opening" —
not "slide N done, slide N+1 begin."

#### C. Cross-slide continuity: running lines + page provenance

Two pieces of chrome continue across consecutive slides to give the
audience a "we're still in CS2" anchor:

- **Running line** — a 1px hairline at consistent y-position across
every slide of a case study (top of viz area, beneath eyebrow). Its
color is the case-color at low alpha (`color-mix(in srgb, var(--case) 20%, transparent)`).
- **Footer provenance** — the kicker (`Case 02 · Bridge`) updates per
slide but the deck-id ("QP2 Seminar · v3-R2 · Spring 2026") stays
constant. That stability IS the audience's "you are here."

**Rule:** if a slide deliberately breaks running-line continuity (a
cross-case synthesis slide, a closer), it should ALSO swap to a
neutral case (`data-case="amber"` or `data-case="sage"`) so the
break is intentional, not accidental.

#### D. The case-divider opener pattern

Every case study opens with `<CaseHeroDivider>` (slides 5/15/23 in
v2). The divider is the audience's pause-and-recalibrate beat — it
sets:

- `data-case` cascade for the next ~10 slides
- The case-color tone (coral → cyan → violet)
- The illustration that may morph into the impact slide via `layoutId`
- The "CASE STUDY 0N · 0N of 03" provenance

**Hard rule:** every case-divider's illustration component MUST be
keyed by the same `layoutId` if it's referenced again later in the
case. Mismatch = no morph; the audience just sees a fresh element.

#### E. Slide-transition defaults (deck-wide, in `SlideTransition.jsx`)

- **Incoming slide:** `initial: { opacity: 1 }` (NO enter-fade). This
is critical for layoutId morphs — a fading-in destination
inherits low opacity during the FLIP, producing visible flicker.
- **Outgoing slide:** `exit: { opacity: 0 }` over 0.4s.
- **3D presets** (cube, flip, depth, pan) override the default fade
and should be opt-in per slide-pair, not deck-wide. They're best
for "we're entering a new act" beats (case-divider arrivals).

#### F. Animation budget (deck-wide)

Treat motion as a finite resource:

- ≤ 1 cinematic morph per slide-pair (use it where it carries the
argument; everything else is element-level fade)
- ≤ 3 element-level entrance animations per slide visible at once
(eyebrow → headline → subhead → maybe ONE viz element). Stagger
them; don't fire simultaneously.
- ≤ 1 "show-stopper" per case study (impact-numerals scale-pop, full
India outline filling, ECG drawing in). Multiple show-stoppers
desensitize the audience.
- Total animation time per slide ≤ 3 seconds. The speaker's voice is
the load-bearing element, not the screen.

Pre-commit grep — flag slides with too many concurrent animations:

```sh
rg "<motion\.[a-z]+" 4-Apps/merck-deck/src/decks/qp2-seminar-v3-R2/slides/ \
  | awk -F: '{print $1}' | sort | uniq -c | sort -rn | head
```

Slides with > 8 motion.* elements are candidates for review.

#### G. Reduced-motion respect (mandatory)

Every animation in every slide MUST have a `useReducedMotion()`
guard. If the user's OS sets `prefers-reduced-motion: reduce`,
animations should resolve to the final state instantly.

```jsx
const prefersReduced = useReducedMotion();
const isInView = useInView(ref, { once: true, amount: 0.3 });
const go = isInView && !prefersReduced;

// Then every animate prop:
animate: go ? { opacity: 1 } : { opacity: 1 },
```

The pattern `animate: go ? X : X` looks redundant but is correct —
it ensures the final state is rendered regardless. NEVER ship an
animation that hides content from reduced-motion users.

#### H. The known tech-debt: slide 5→6 lung flicker

> Documented at the bottom of this file. As of 2026-04-23 the
> CaseHeroDivider's illustration wrapper still produces a residual
> flicker on slide 5 → 6. Tried: inline-SVG, `layout` on motion.div,
> absolute overlay, sync vs popLayout. Next avenues listed in "Known
> Tech Debt" below.

When you encounter ANY new layoutId flicker:

1. Check section opacity — section MUST mount at opacity 1
2. Check parent grid — shared element CANNOT live in a width-
  varying grid cell
3. Check `<AnimatePresence mode>` — `mode="wait"` blocks layoutId
  compute; default `mode="sync"` or move the element outside the
   AnimatePresence subtree
4. Re-read the existing tech-debt note before reinventing fixes

Reference: `zaj-slides/references/cross-slide-cinematic-transitions.md`
documents two complementary techniques — Technique A (pixel-match
HTML keyframe; works in any framework) and Technique B (Motion
`layoutId`; React-specific). The merck-deck uses Technique B
exclusively; Technique A is available if a future slide needs to
work outside React (e.g. a PPTX export).

### Pre-flight checklist (before declaring any slide done)

- Used `<SlideGrid>` + `<SlideParts>` OR documented why a bespoke layout is required
- All visible-text `fontSize` values resolve to `--fs-slide-*` tokens (no fixed-pt `--fs-*`, no inline `clamp()`, no Tailwind `text-*` on slide content)
- All annotations / "what changed" callouts use `--fs-slide-tagline` or `--fs-slide-subhead`, not `--fs-slide-eyebrow`
- All cards follow one of the three card vocabularies (RecapCard / HeroTile / ImpactNumerals); no fourth invented
- Border weights chosen from the 4-weight vocabulary (hairline / 1px / 1.5px / 4px accent rail)
- No hex literals; all colors via `var(--*)` or `color-mix(in srgb, var(--*) Npc, transparent)`
- `data-case` set on root for case-aware slides; `--case` defaults to amber/sage for cross-case
- Animations guarded by `useReducedMotion()` + `useInView(... once: true, amount: 0.3)`
- Section mounts opaque (`initial: { opacity: 1 }`); element-level entrances are separate
- Bounding-box audit comment present at top of any absolute-positioned or SVG-based slide
- Rendered at 375×812, 768×1024, 1280×720 with no clipping or overlap
- Source citations in `<Footer source>`, not `tagline` (4-cite chains need wrap, not truncate)
- If the slide shares an element with another slide (same `layoutId`): both source AND destination render `motion.div` + `layout` prop, neither lives inside a width-varying grid cell, both sections mount opaque
- Animation budget respected: ≤ 3 entrance animations visible at once, total ≤ 3 seconds, ≤ 1 cinematic morph per slide-pair
- Closing-ribbon → next-divider handoff intact (if this slide ends a case)
- Running-line continuity preserved (if mid-case) OR deliberately broken with neutral `data-case` (if cross-case)

---

## Best-in-Class Slide Design — Reference Patterns from Shipped Slides

> Added 2026-04-25 after multiple rounds of "why does this look bad?"
> The root cause is always the same: agents build slides with raw inline
> styles, no panel structure, tiny elements, and no compositional
> backbone. The slides that look great in this deck ALL share the same
> DNA. This section codifies that DNA so any agent can reproduce it.

### What "great design" means in this deck

It does NOT mean complex. It means **structured, filled, and
token-driven**. Study these four shipped slides before building
anything:


| Slide      | URL slug                      | Why it works                                                                                                                                                               |
| ---------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hook       | `qp2-seminar/s/hook`          | Hero number (amber, 140pt+), italic headline, sparse editorial layout, timeline at bottom — empty space is INTENTIONAL                                                     |
| Career Arc | `qp2-seminar/s/career-arc`    | Full-canvas SVG network, interactive satellites, clean kicker labels — the ILLUSTRATION fills the canvas                                                                   |
| Strategy   | `qp2-seminar/s/case-strategy` | Three-column bento inside SlideFrame, each column has kicker → title → rationale → Viz pushed to bottom, SVG brackets, closing ribbon                                      |
| Build      | `qp2-seminar/s/case-build`    | Two-column bento (2fr 3fr), panel cards with hairline borders + panel-mix backgrounds, hero numerals in accent, compartment diagram + decision flowchart fill their panels |


### The Panel Card recipe (use this, not bare divs)

Every data region, stat block, or content group lives inside a
**panel card**. This is what gives the deck its editorial depth.

```jsx
<motion.div
  style={{
    border: '1px solid var(--cream-hairline)',
    background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4) var(--space-5)',
  }}
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay }}
>
  {/* Kicker label */}
  <div className="deck-mono uppercase" style={{
    fontSize: 'var(--fs-slide-kicker)',
    letterSpacing: 'var(--ls-mono-wide)',
    color: 'var(--case, var(--coral))',  // accent color
    marginBottom: 'var(--space-3)',
  }}>
    Panel Title · Context
  </div>
  {/* Content */}
</motion.div>
```

Key tokens:

- `var(--panel)` = `#27272B` — one shade lighter than `var(--bg)`
- `var(--cream-hairline)` = cream at 14% — structural border
- `var(--radius-lg)` — consistent rounding
- `color-mix(in srgb, var(--panel) 55–70%, transparent)` — the
transparency range. 70% for primary panels, 55% for secondary.
- NEVER use raw hex, `rgba()`, or `var(--ink)` for panel backgrounds.

### Kicker Label pattern (the accent-colored section header)

Every panel and every column starts with one:

```jsx
<div className="deck-mono uppercase" style={{
  fontSize: 'var(--fs-slide-kicker)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--cyan)',  // case accent
  marginBottom: 'var(--space-3)',
}}>
  Section Label · Qualifier
</div>
```

Always `deck-mono uppercase`. Always the case accent color. Always
`--fs-slide-kicker` + `--ls-mono-wide`. This is non-negotiable
typographic furniture.

### Hero Number pattern (the big stat)

```jsx
<div className="deck-display" style={{
  fontSize: 'var(--fs-card-numeral)',  // or clamp(2.2rem, min(4vw, 5.5vh), 3.8rem)
  lineHeight: 1,
  color: 'var(--cyan)',  // accent or cream
  fontWeight: 700,
  fontVariantNumeric: 'tabular-nums',
}}>
  380
</div>
```

Use `var(--fs-card-numeral)` when available. The number must be
visually DOMINANT — the largest element in its panel. If the number
doesn't command attention, it's too small.

### SlideFrame as structural backbone

**All body slides in the reference deck use `SlideFrame`**, not raw
`<section>` + `<BodyLayout>`. SlideFrame provides:

- Eyebrow (accent-colored, mono, tracked)
- Headline (display, with inline accent `<span>` for pivot words)
- Subhead (with `HighlightWord` for emphasis)
- Footer (kicker + source line)
- A **viz cell** that fills remaining vertical space

Content goes INSIDE the viz cell. Use `position: absolute; inset: 0`
on a wrapper div if the content must fill the entire viz area (common
for grids, diagrams, illustrations).

```jsx
<SlideFrame
  dataCase="cyan"
  eyebrowColor="var(--cyan)"
  eyebrow="Case 02 · Background — Disease"
  headline={<>IDH1-mutant cancers: small populations, <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 700 }}>no targeted option.</span></>}
  subhead="Both indications lacked a targeted therapy before 2018."
  footerKicker="Case 02 · Background"
  footerSource="Source · Dang 2009 · Figueroa 2010"
>
  {/* Your grid / panels / viz here — fills remaining space */}
</SlideFrame>
```

### Grid Containment for diagrams/SVGs

When a panel contains an SVG diagram or illustration that must scale:

```jsx
<div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>
  <div style={{ position: 'absolute', inset: 0 }}>
    <MyDiagram />
  </div>
</div>
```

The `flex: 1` + `minHeight: 0` lets the container shrink. The
`position: absolute; inset: 0` prevents the SVG from growing its
parent. This pattern is used on EVERY diagram panel in the deck.

### Staggered Reveal timing

```
const EASE = [0.2, 0.7, 0.3, 1];
// Stagger by ~0.15–0.40s between elements
// Column stagger: [0.70, 1.10, 1.50]
// duration: 0.5–0.7s per element
// translateY: 12px (subtle lift, not a bounce)
```

### Design checklist (run before declaring any slide done)

- Every content group is inside a **panel card** (hairline border + panel-mix bg)
- Every panel has a **kicker label** (deck-mono uppercase, accent color)
- Hero numbers use `--fs-card-numeral` or equivalent large scale
- Grid fills the viz cell (`position: absolute; inset: 0` or flex fill)
- All colors from tokens — no hex literals, no rgba()
- All spacing from `var(--space-*)` — no px literals
- Background uses `color-mix(in srgb, var(--panel) NN%, transparent)`
- Staggered reveals with `ease: [0.2, 0.7, 0.3, 1]` and `y: 12`
- Content fills available vertical space — no dead space at bottom
- Slide uses `SlideFrame` (or `BodyLayout`) — not a bare `<section>`

---

## Layout / Design Tokens

- All CSS custom properties live in `src/styles/*.css` — NEVER hardcode hex.
- Core tokens: `--cream`, `--cream-muted`, `--cream-faint`, `--panel`,
`--coral`, `--amber`, `--cyan`, `--sage`, `--violet`, `--case` (case
study color, defaults to `--coral`)
- Fonts: IBM Plex Sans (`--font-display`, `--font-body`), IBM Plex Mono
(`--font-mono`)
- Spacing scale: `var(--space-1..8)` — don't invent pixel values
- Card/tile font sizes: use the `--fs-card-{numeral|title|body|label|meta|hero-num|quote}`
family — do NOT inline raw `clamp()` literals in slide JSX

### Case-color discipline (P5 contract)

Coral, Cyan, Violet ALWAYS mean CS1, CS2, CS3 across this deck:

- `--coral` ⇄ Case Study 1 (pediatric PAH / ambrisentan)
- `--cyan`  ⇄ Case Study 2 (oncology / Lynparza-style asymmetry)
- `--violet`⇄ Case Study 3 (rare disease / CMD pipeline)

`--amber` and `--sage` are deck-default ink accents (approval markers,
secondary highlights) and may NOT encode case meaning. Each slide carries
≤3 accent colors with assigned meanings (Brief §6).

## Deck Architecture

```
src/
├── decks/
│   ├── registry.js                # deck registry — register new decks here
│   ├── qp2-seminar/               # v1 (legacy layouts, no standardLayout)
│   ├── qp2-seminar-v2/            # v2 (working draft)
│   ├── qp2-seminar-v3-R2/         # v3 (opt-in standardLayout)
│   ├── launch-keynote/            # demo deck
│   └── template-blank/            # blank template
├── components/
│   └── deck/
│       ├── DeckRunner.jsx         # AnimatePresence + LayoutGroup root + path-segment routing
│       ├── PresenterView.jsx      # 3-column resizable presenter pane
│       ├── PresenterAssistant.jsx # AI co-pilot (chat + dictation + RAG)
│       ├── PresenterNotesPane.jsx # speaker notes editor
│       ├── PresenterLayoutSettings.jsx # show/hide/reorder sections + cross-column move
│       ├── AnticipatedQAPane.jsx  # rehearsed Q&A panel
│       ├── StructuredQAView.jsx   # Q&A accordion + density popover
│       ├── StructuredNotesView.jsx # Spoken (numbered beats) / Cues (collapsed) / Bridge
│       ├── ReadingViewer.jsx      # SHARED TOC+content body for modal AND page
│       ├── ReadingMaterialPane.jsx # presenter modal wrapper
│       ├── DeckOverview.jsx       # grid + drag-drop reorder
│       ├── NavControls.jsx        # bottom-right chrome
│       ├── TopRightMenu.jsx       # top-right hover menu (Reading, Sources, Export, Theme)
│       ├── SlideFrame.jsx         # eyebrow/headline/footer chrome (legacy)
│       ├── SlideTransition.jsx    # per-slide fade/3D wrapper
│       ├── ModeSwitcher.jsx       # Normal/SlideShow/Presenter/DualScreen
│       ├── MicStatusBanner.jsx    # always-visible mic state above input
│       ├── AIKeySettings.jsx      # OpenAI key paste modal + RAG status
│       ├── AmbientListenPanel.jsx # audience-question detection
│       └── layouts/
│           ├── DeckLayout.jsx     # base primitive (slot resolution: undefined=inherit, null=hide, value=show)
│           ├── TitleLayout.jsx    # thin preset for cover slides
│           └── BodyLayout.jsx     # thin preset with footer chrome
├── pages/
│   ├── Home.jsx
│   ├── Reading.jsx                # full-page reading-material route
│   ├── DeckAnalytics.jsx
│   ├── AudienceQA.jsx             # /qa/:deckId — public Q&A submission page
│   └── Deck.jsx                   # legacy redirect
└── lib/
    ├── deck-store.jsx             # presenter state + keyboard nav
    ├── usePresenterLayout.js      # column visibility/order, v1→v2 migration
    ├── useSpeakerNotes.js         # localStorage notes; live-edit re-index hook
    ├── useAnticipatedQA.js        # localStorage Q&A; live-edit re-index hook
    ├── useQADensity.js            # row-density toggles + presets
    ├── useDeckOverrides.js        # drag-drop reorder drives presentation order
    ├── useFullscreen.js
    ├── useDictation.js            # Web Speech API + auto-stop + diagnostic event log
    ├── aiLocalClient.js           # OpenAI direct (chat + Whisper) — env or localStorage key
    ├── aiRagIndex.js              # collect chunks → embed → upsert Qdrant
    ├── qdrantClient.js            # Qdrant REST wrapper (browser-side)
    ├── parseStructuredContent.js  # parses Spoken/Cues/Bridge + ## QN: blocks
    ├── deck-export.js             # PDF/PNG export via html-to-image
    └── slide-transitions.js       # 3D transition presets
```

### `src/lib/` vs `src/utils/` (don't add to utils/)

- `**src/lib/**` — active home for runtime utilities. New utilities GO HERE.
- `**src/utils/index.ts**` — base44-scaffold leftover. Effectively
read-only — touch only when reconciling a base44 update.

## URL State

- `/decks/:deckId` — deck home (slide 0)
- `/decks/:deckId/s/:slideIndex` — canonical slide route
- `/decks/:deckId/s/:slideIndex/speaker` — presenter view (path segment, NOT query)
- `/decks/:deckId/s/:slideIndex/audience` — audience view (path segment)
- `/decks/:deckId/reading[/:slug]` — full-page reading material
- `/decks/:deckId/analytics`
- `/qa/:deckId` — public audience Q&A submission

**Legacy `?presenter=1` / `?audience=1` query flags redirect to
the path segment form** inside DeckRunner. The path-segment promotion
fixed a URL↔store race that stripped query flags on every reload.

## AI Assistant (PresenterAssistant)

The presenter assistant is a live co-pilot for the on-stage user. It has
**three** retrieval paths and **two** response shapes.

### Backend reality: base44 client is OFFLINE-STUBBED

`src/api/base44Client.js` is intentionally a no-op mock — every entity
read returns `[]`, every function invoke returns `{ stub: true, data: null }`.
This is correct for local dev. **Do NOT reconnect base44 unless asked.**
The assistant detects the stub via `isStubResponse(res)` and routes
around it.

### Retrieval / answering paths

```
ask question
   ↓
1. base44.functions.invoke('askPresenter')
   ├─ if real backend → use response, return early
   └─ if stub or throws → fall through
   ↓
2. localAskPresenter (src/lib/aiLocalClient.js)
   ├─ embed question via OpenAI (text-embedding-3-small)
   ├─ if Qdrant configured AND returns ≥1 hit ≥0.30 score:
   │      RAG mode — inject retrieved chunks as context, [R…] citations
   │      mode='rag'
   ├─ else:
   │      inline-context mode — full reading material + slide map injected
   │      mode='local'
   └─ call OpenAI /chat/completions (gpt-4o-mini)
      response_format: json_object — structured { quick, details[], tags[] }
   ↓
3. Render via StructuredMessage (PresenterAssistant.jsx)
```

### Env-based config

```
.env.local (gitignored)
  VITE_OPENAI_API_KEY=sk-...           # chat + Whisper + embeddings
  VITE_QDRANT_URL=https://....qdrant.io:6333
  VITE_QDRANT_API_KEY=eyJ...
  VITE_QDRANT_COLLECTION=merck-deck    # default
```

`aiLocalClient.getOpenAIKey()` checks env FIRST, falls back to
localStorage (`merck-deck:openai-key` — settable via AIKeySettings modal).
Same pattern for Qdrant config (env-only).

**SECURITY**: VITE_* env vars are **inlined into the client bundle**.
Acceptable for local single-user dev; **do NOT deploy a build with these
set publicly** — keys would be extractable from the bundle. Use a
server-side proxy or restored base44 backend for any deployed
environment.

### LIVE vs REHEARSE modes

User-facing toggle in the assistant header. Persists in
`localStorage('presenter-assistant:mode')`. Affects:

- **System prompt** — different `lengthRule` (LIVE: ≤15-word quick + 2-3 short bullets; REHEARSE: ≤25-word quick + 3-5 fuller bullets) and persona framing (LIVE = stage-deliverable, REHEARSE = prep)
- **Response shape** — same JSON shape, different copy density
- **UI rendering** — LIVE message has amber `⚡ Say this` eyebrow + collapsed details by default; REHEARSE has `🎓 Headline` eyebrow + auto-expanded details

### Structured response shape

```jsonc
{
  "quick":   "<the line to SAY OUT LOUD, ≤15 or ≤25 words>",
  "details": ["<bullet 1>", "<bullet 2>", ...],
  "tags":    ["<short tag 1>", ..., max 3]
}
```

Renderer is in PresenterAssistant.jsx → `StructuredMessage`. Falls
back to plain text if the model returns non-JSON.

### Voice / Dictation (`useDictation.js`)

- Web Speech API (continuous + interim) — free, real-time, browser-native
- **Click-to-toggle**, NOT press-and-hold (holding mid-talk is unusable)
- Live interim transcript mirrored into the input field
- Auto-stop + auto-send on **1.5s of silence** (`SILENCE_MS`)
- Hard cap **30s** so a forgotten mic doesn't stay on forever
- 'M' keyboard shortcut to toggle, 'Esc' cancels (drops buffer)
- Pre-warms permission via `getUserMedia` BEFORE creating SpeechRecognition
so the user gets a real permission prompt, not a silent denial
- **Permission errors (`not-allowed`, `service-not-allowed`) MUST bail
out hard** — restarts loop forever otherwise. See git log for the
bug that prompted this rule.

### Diagnostic surfaces (DON'T weaken these)

The assistant has THREE always-on layers of voice diagnostics. They
all need to stay because each catches a failure mode the others miss:

1. **MicStatusBanner** above the input — always visible, four states
  (idle / listening / error / unsupported). Banner color + copy
   tells the user what's happening without opening anything.
2. **DebugPanel** (Bug icon in header) — snapshot grid + 30-event
  ring buffer. **Auto-opens on first dictation error** (sawErrorRef
   pattern in PresenterAssistant.jsx).
3. **Console logs** under `[dictation]` and `[assistant]` tags —
  for filtering in DevTools.

If you remove any of these, the user sees "tap mic, nothing happens"
and has no path to diagnose. Don't.

### RAG indexing (`aiRagIndex.js`)

When Qdrant + OpenAI are both configured, PresenterAssistant runs
`indexDeck(deck)` on mount. The indexer collects:

- `kind: 'note'` — speaker notes per slide (one chunk per slide)
- `kind: 'qa'` — anticipated Q&A per slide (one chunk per slide)
- `kind: 'reading'` — reading material (chunked at ~600 tokens, 60 overlap)
- `kind: 'slide'` — slide map (one chunk per slide title — for navigation Qs)

Idempotency: deterministic UUID point IDs derived from
`(deck_id, kind, slide_id, chunk_idx)`; SHA-16 content hash cached in
localStorage skips re-embedding unchanged chunks.

`useSpeakerNotes` and `useAnticipatedQA` call `reindexLiveEdit` on
autosave so the index stays in sync with localStorage edits.

## Standard Layout System (v3+ opt-in)

Decks set `standardLayout.enabled = true` in their manifest. v1 and v2
deliberately omit this; their per-slide layouts are unchanged. v3-R2
ships with it on.

```js
// in qp2-seminar-v3-R2/manifest.js
standardLayout: {
  enabled: true,
  footer: {
    line: true,
    text: 'QP2 Seminar · v3-R2 · Spring 2026',
    showSlideNumber: true,           // dynamic NN/TT (reorder-safe)
    showTime: false,
    formatPageNumber: (n, total) => `${n}/${total}`,  // optional
  },
}
```

Slot-resolution rule (`DeckLayout.jsx`):

- `slideValue === undefined` → inherit deck-level slot
- `slideValue === null` → hide this slot for this slide
- `slideValue === <value>` → override deck-level

So every slot (eyebrow, headline, footerText, footerLine, pageNumber,
pageFormat) is independently overridable per-slide AND per-deck.
TitleLayout and BodyLayout are thin presets over DeckLayout.

## Speaker Notes / Q&A / Reading Material — authoring vocabulary

See `[Notes-And-QA-Structure.md](./Notes-And-QA-Structure.md)` for the
full spec. Quick reference:

### Speaker notes (notes.js, keyed by slide.id)

```md
## Spoken
<the words to say, paragraph breaks separate "beats" — each beat
gets a numbered card in StructuredNotesView so the presenter can
re-anchor mid-talk>

## Cues
- ⏱ 25 sec — warm open, do not dwell
- 🎯 Lock eyes with chair before "what gets approved"
- ⚠ Do NOT preview slide 02's hook
- ✅ Land cleanly on "across my career"

## Bridge
That last sentence — *what gets approved, and for whom* — is where
this story starts.
```

Glyph vocabulary: `⏱` time, `🎯` focus, `🎚` tone, `📍` position,
`⚠` warn, `✅` must, `🛟` recovery. Inline `==highlight==`,
`**bold**`, `*italic*`, `⏸` hard pause, `…` soft beat.

**Cues are collapsed by default** in StructuredNotesView (chevron
toggle "Cues · N"). They're stage directions, not the main read.

### Anticipated Q&A (qa.js, keyed by slide.id)

```md
## Q1: <verbatim audience question>
**From:** <likely asker>
**Difficulty:** ★ to ★★★★★ · **Topic:** <single tag>

A: <prepared answer in delivery voice>

> **If pressed:** <one-line backup, citation, or escape hatch>
```

The `## Q\d+:` heading is what `useAnticipatedQA.countItems` counts
(drives the "Q&A · N anticipated" badge). Each row's collapsed view
respects user density toggles via `useQADensity` (preset: minimal /
compact / full + 5 individual toggles).

### Reading material (`reading/*.md` + `reading/index.js`)

Vite `?raw` import inlines markdown content at build time. Each entry:

```js
{ slug, title, attachedTo: 'deck'|'cs1'|'cs2'|'cs3'|<slide-id>|[ids],
  minutes, content }
```

Surfaced via:

- Modal: ReadingMaterialPane (presenter view, Esc to close)
- Page: `/decks/:deckId/reading[/:slug]` (full-page route, deep-linkable)

Both share `ReadingViewer` so the inner TOC + markdown body stays in
lockstep across surfaces.

## Critical Patterns

### Shared-element transitions (layoutId)

- `<LayoutGroup id="qp2-deck-layout">` wraps AnimatePresence in DeckRunner
- Both source AND destination slides render motion.div with the same
`layoutId` + `layout` prop to opt into FLIP morph
- **Must NOT put shared element inside a grid cell** whose width
depends on siblings — layout thrash → flicker. Use absolute overlay.

### Slide transition defaults

- Incoming slide: `initial: { opacity: 1 }` (no enter-fade). Only the
EXIT fades — prevents shared elements from inheriting low opacity
during the layoutId morph.
- 3D presets (cube/flip/depth/pan) DON'T participate in layoutId.

### Drag-drop reorder drives presentation order (Phase 11)

`useDeckOverrides.order` is now load-bearing. Drag in DeckOverview →
the live deck's arrow-key navigation, transitions, and dynamic NN/TT
footer numbering all follow. `hidden` remains Overview-only by design
(silently skipping slides during a live talk would be a footgun).

### Presenter layout (sections + columns)

`usePresenterLayout` storage shape v2:

```js
{ visibility: { ... }, columns: { left: [...], center: [...], right: [...] } }
```

Auto-migrates v1 (`{centerOrder, rightOrder}` + assistant-always-left
assumption). PresenterLayoutSettings modal has ↑/↓ within column +
←/→ between columns + Eye/EyeOff visibility toggle per section.

### Modal Esc handling

Every modal that listens for Escape MUST do it in capture phase with
`stopImmediatePropagation` so the deck-store's global Escape handler
(which closes presenter view) doesn't also fire:

```js
const onKey = (e) => {
  if (e.key !== 'Escape') return;
  e.preventDefault();
  e.stopImmediatePropagation();
  onClose?.();
};
window.addEventListener('keydown', onKey, true);  // capture: true
```

Reference implementation: `ReadingMaterialPane`, `AIKeySettings`,
`PresenterLayoutSettings`. The deck-store also auto-skips Escape if a
`[role="dialog"][aria-modal="true"]` is open.

### Dual-screen open-tab fix

Use the **anchor-click pattern**, NOT `window.open(url, name, 'noopener,noreferrer')` —
the latter is heuristically classified as a popup and silently blocked.
See `NavControls.goDualScreen` for the canonical implementation.

### CaseBodyCard (legacy v1/v2 only)

- Left 3px coral accent bar (scaleY animates on mount)
- Meta eyebrow: `NN · EYEBROW` in IBM Plex Mono, 0.22em letter-spacing
- `visual` prop = right-column illustration (slide 07+)
- `CardHighlight` uses `#F4B382` on `--coral-wash`, white-space:nowrap

## React HMR caveat — extract components when adding helpers

Vite's React Refresh transform can trip on inline
function-declaration-after-use patterns when added via hot-reload,
throwing `<Component> is not defined` even though the function exists
in the source. **When adding a new sub-component, prefer extracting
to its own file** rather than appending below the parent. See
`MicStatusBanner.jsx` for the canonical extracted-component pattern.

A hard reload clears it temporarily; the structural fix is the extract.

## Git / Deploy

- Remote: `rovony/JobPPT-ViteApp` (renamed from `rovony/merck-deck` on
  2026-04-26; old URL redirects automatically)
- Branches: `main` (prod) + `dev` (preview)
- User email must be `zaj.commerce@gmail.com` (the rovony-verified email;
`zajalyapps@gmail.com` is rejected by GitHub email privacy)
- Vercel auto-deploys on push; `main` → production URL, `dev` → preview URL

## Slide backups — `_backup/` convention

When a friend's-prompt or major rewrite replaces an existing slide's
content, **first** move the existing file to
`src/decks/qp2-seminar/slides/_backup/{filename}.pre-{reason}.jsx`
using `git mv` so history traces cleanly. Then write the new content
at the original path.

Never delete a backup without explicit user approval.

## Request queueing — don't abandon in-progress work

When the user sends a new ask while you're mid-task:

1. **Finish the current in-progress task first** — don't jump to the
  new ask and leave the old one half-done.
2. **Queue the new ask at the END of your TodoWrite list** — even if
  it feels urgent, it goes to the end so the in-progress batch gets
   committed as an atomic unit.
3. **If the new ask invalidates the in-progress work** (user says
  "never mind, do X instead"), THEN stop, discard in-flight changes
   explicitly, and start the new ask.
4. **When in doubt, acknowledge both**: "Queued [new ask] — finishing
  [in-progress] first, then will handle it."

## Workspace Conventions (from JobHunt2026 CLAUDE.md)

- **Response footer mandatory** on every non-trivial response:
`### TL;DR` + `### Actions` + (`### Questions` if any)
- **Plan FIRST, code SECOND** for multi-file changes
- **Small diffs** — one file → verify → next. Atomic commits.
- **Never commit proprietary data** — Servier/GSK numbers blocked by `.gitignore`
- **Filename / folder hygiene** — Title-Case-With-Hyphens, numbered prefixes
for ordered folders
- **Layout-with-coordinates rule**: for any SVG / absolute-positioned
layout, maintain a bounding-box audit comment at the top of the
file, update it on every coordinate change, verify by actual render
(not code review), re-audit after moving any single element.

### Phase progression — never ask "what's next" between phases

When the user has provided an ordered phase list (or accepted one),
do NOT pause between phases to ask "where to next?". Execute them
sequentially, commit each phase as it ships, and post a brief status
at the end. The queued phases ARE the plan.

## Known Tech Debt

- **Slide 5→6 lung flicker on arrival** (as of 2026-04-23). Tried:
inline-SVG, `layout` prop on motion.div, absolute overlay, sync vs
popLayout. Residual flicker remains. Next avenues:
  - Confirm CaseHeroDivider's illustration wrapper isn't mismeasuring
  on slide-5 EXIT (own opacity animation may be confusing FROM-bbox)
  - `<MotionConfig reducedMotion="always">` or explicit
  `animate={{ layout: false }}` fallback
  - framer-motion 12 vs current 11 (12 reworked layoutId timing)
  - Fallback: drop layoutId entirely, use CSS keyframe pullback
- DeckSource (uploaded PDFs/DOCX) **not RAG-indexed** — the upload
flow goes through the offline-stub base44 client which returns
empty file URLs. Reconnecting a real backend OR adding a direct
client-side file-text extractor would close this gap.

## Commands

```sh
npm run dev        # vite dev server (localhost:5173)
npm run build      # vite build → dist/
npm run lint       # eslint --quiet
npm run typecheck  # tsc -p jsconfig.json
npm run preview    # vite preview (serve built dist/)
```

