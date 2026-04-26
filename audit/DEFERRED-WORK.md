# Deferred work — items intentionally NOT shipped in the audit-fix run

These are findings from `SLIDE-REVIEW.md` that were reviewed and
explicitly deferred during the Apr 24 audit-fix sweep. Each entry
explains *why* it was deferred, the expected effort, and what
unblocks it.

> **Apr 24 closing sweep (Phases E / F / G + repo-hygiene):** items 2, 3,
> and 4 are now fully resolved on top of the original Phase A–D work.
> See "Status by item" below. Item 1 (slide-21 proportional-time
> rebuild) was also completed in this session — see §1 below for the
> full resolution writeup.

---

## 1. Slide 21 (CS2 regulatory timeline) — proportional-time rebuild ✅ DONE

**Source:** `SLIDE-REVIEW.md` §6 ("the one slide that needs a rebuild, not a tweak").

**Original issue:**
1. **Tell #8 violation** — 9 timeline nodes were equal-spaced, but the dates compress 5 events into 5 months (Dec 10 → Jan → Jan 14 → Mar 27 → Apr 4 → May 14). The audience read the spacing as proportional time and was wrong.
2. **Slide-02 overlap pattern at scale** — at 1280px viewport each NodeCard became ~131px wide for a 3-line label. Adjacent cards collided.
3. **Focal-point split** — the climax content (27 Mar 2025) appeared both as a timeline node AND as a duplicate leadership-beat callout below.

**Resolution (Apr 24, this session):**
1. Each step's `xPct` now reflects calendar-day position along the arc (Mar 27 2024 = 0%, May 14 2025 = 100%) via a `parseStepDate` helper + `xOf(t)` projection. The dense Dec→May cluster now visibly compresses; the sparse Mar→Sep stretch reads as the long quiet.
2. Above/below row assignment was rewritten as a greedy "pick the row with the furthest-back last card" pass (replacing naive `i % 2`), so temporally tight pairs like Mar 27 climax → adjacent denouement events sit on opposite rows when possible.
3. Per-card `lanePct` (max width budget) is computed from the half-distance to each same-row neighbor; edge cards bias inward by `EDGE_INSET` so the card body never clips past the SlideFrame padding.
4. Apr 4 (favorable rec) + May 14 (marketing authorization) — three cards in the final 12% of the rail — were collapsed into a single "Apr — May approval cleared" period bracket. Both dates and content are preserved in the bracket detail (`Favorable rec → CDSCO MA · 14 May`); editorially they are denouement to the Mar 27 climax, not peer events.
5. Period brackets ("Strategy reframe", "Approval cleared") are lifted ~88px above the spine with their `⌐ ¬` legs reaching back down — keeps period labels out of the event-card vertical band so "Strategy reframe" no longer overlaps "91-KB submission".
6. The duplicate "27 Mar 2025" leadership-beat callout below the timeline was removed; the headline + climax node + footer-source carry the editorial voicing without the focal-point split.
7. Year tick (2025) added at the rail bottom for axis grounding.

**Verified:** Browser screenshots at 1366×768 (deck design target) and 1024×640 (worst case) — no overlaps, no clipping, climax stands alone on the right with denouement bracketed above.

**Files touched:** `src/decks/qp2-seminar/slides/21-case2-response.jsx` only.

---

## ✅ Status by item (Apr 24 closing sweep)

| # | Item | Status | Phase / commit |
|---|------|--------|----------------|
| 1 | Slide 21 proportional-time rebuild | ✅ DONE (Apr 24) | this session |
| 2 | Footer-tagline citation migration | ✅ DONE (audit confirmed already migrated in B/D) | Phase B + D |
| 3 | P5 case-color contract sweep | ✅ DONE (slide 33 + themes.js + slide 31 cardiometabolic) | Phase F |
| 4 | `cs3-n-94` layoutId pair | ✅ DONE (slide 24 AnchorTile ↔ SampleSizeWaterfall) | Phase G |
| 5 | Phase C `--fs-card-*` migration | ✅ DONE | Phase C |
| + | Confidentiality scrub (7 violations) | ✅ DONE (slides 16/19/20/22/26/31 + notes.js) | Phase E |
| + | Display-scale numeral exemption (slide 13) | ✅ DOCUMENTED (inline comment, no token churn) | Phase D-tail |
| + | `--fs-card-feature` evaluation | ✅ NOT NEEDED (existing tokens cover the cases) | Phase D-tail |
| + | Repo hygiene (`clean:screenshots`, lib/utils docs, dead-code audit) | ✅ DONE | Phase H |

---

## 2. Footer-tagline citation migration (5 slides)

> **Apr 24 update:** ✅ DONE. Audit of slides 06, 06b, 07, 11, 14, 27
> confirmed all already use `footerSource` / `source` from earlier
> phases. No outstanding migration work.

**Source:** `SLIDE-REVIEW.md` §4 P3.

**Issue:** Slides 06b, 11, 14, 27 use `footerTagline` for citation clusters that get truncated by the rail's `truncate` class on viewports <1366px.

**Why deferred (partial):** The `Footer` component now exposes a `source` prop (Phase B) so the migration is unblocked structurally, but each migration requires reading the existing tagline carefully to split "this is the editorial payoff" from "this is the citation chain." Doing it sloppily risks splitting a payoff sentence into a stray fragment.

**Effort:** S (~30 min per slide once the editorial split is decided).

**Unblocks:** Pass through each slide's tagline and decide which clauses are payoff (stay in `tagline`) vs citation (move to `source`).

---

## 3. P5 case-color contract — slides 13, 14, 33, 34 audit

> **Apr 24 update (Phase F):** ✅ DONE. Slide 33 PRINCIPLES + RESEARCH_CARDS
> reassigned to amber/cream/sage (intentional coral/violet retained only
> on bottom-ribbon case-callback links). `themes.js` QP2_THEMES tokens
> remapped to alternate amber/sage so cross-case theme tiles never
> inherit case identity. Slide 13 reviewed: amber-on-impact intentionally
> retained because amber is the deck-default approval/payoff accent and
> the slide is CS1 (coral) — no double-encoding. Slide 14 reviewed and
> compliant. Slide 31 cardiometabolic cyan→sage was landed in Phase A.

**Source:** `SLIDE-REVIEW.md` §4 P5.

**Issue:** Coral / Cyan / Violet are designed as case markers (CS1/CS2/CS3). Slide 13 (CS1 impact) introduces amber as a *second* semantic on numerals; slide 14 uses 4 theme colors simultaneously; slide 33 maps principle-1 to amber when it should be violet (case-callback); slide 34 assigns colors arbitrarily.

**Why deferred:** Each is a 1–2 line change but requires a close read of the slide's color story to decide which color to swap to. Cardiometabolic was already migrated cyan→sage in Phase A; the rest need the same editorial care.

**Effort:** M (one disciplined sweep, ~1 hour).

**Unblocks:** Decision: "is the amber-on-impact intentional (impact = approval = amber per CS1's amber-as-approved color)?" If yes, leave 13. If no, swap to violet.

---

## 4. Eight `layoutId` cinematic-continuity additions

**Source:** `SLIDE-REVIEW.md` §5.

**Status update (Apr 24):**
- ✅ `cs3-pct-36` (slide 26 → 28) — landed in Phase A.
- ✅ `themes-constellation` (restored chain to slide 35) — landed in Phase A.
- ✅ `case-marker-{coral|cyan|violet}` (slide 01 PK landmark dots → slides 5/15/23 hero hairlines) — landed in Phase B+.
- ✅ `cs1-focal-amber` (slide 11 question panel → slide 11b answer ribbon) — landed in Phase D-tail (commit `ae771fe`).
- ✅ `cs2-sec-objection` corner-shrink (slide 22 SEC card now wrapped in right-aligned `max-width:min(56%, 640px)` flex strip so the layoutId animation reads as "card collapses into a top-right badge") — landed in Phase D-tail.
- ✅ `cs3-n-94` (slide 24 AnchorTile middle tile → slide 26 SampleSizeWaterfall left bar) — landed in Phase G (commit `f53924a`). Resolution: instead of extracting `94` from slide 23's meta string (the original blocker), the morph was wired against slide 24's existing standalone `94` AnchorTile, which is already a positioned numeral. SVG `<text>` ↔ HTML `<div>` is a partial morph (bbox animates, content cross-fades) — same trade-off the existing `cs3-pct-36` pair accepts.

**Why deferred:** Each requires identifying the source/target element with bounding-box compatibility, then verifying the morph reads cleanly during navigation. The 5 simple "marker dot → hub" pairs are mechanical (single-line additions on each end), but the `cs2-sec-objection` corner-shrink is a real layout change on slide 22 (currently the SEC card stays full-width).

**Effort:** S each for the 5 simple pairs (~30 min total); M for the slide 22 corner-shrink (~1 hour).

**Unblocks:** A focused 90-min session walking the deck slide-by-slide to verify each morph in the browser (the spec is right; the *feel* needs runtime confirmation).

---

## 5. Phase C — `--fs-card-*` token migration (35 slides)

**Source:** `SLIDE-REVIEW.md` §4 P1.

**Status:** Tokens defined in Phase A (`src/index.css` — `--fs-card-numeral|title|body|label|meta`). Migration of inline `clamp()` literals to the new tokens is the actual wide-sweep work.

**Why deferred:** This is a 35-file mechanical sweep best done as 5 parallel subagents (one per slide batch). Each agent walks its 7 slides and grep+replaces clamp literals against the token's intended use. Should be a single Phase C commit.

**Effort:** M (4-6 hours wall time as 5 parallel agents; ~1 hour serially per batch).

**Unblocks:** Nothing — ready to dispatch.

---

*Maintained alongside SLIDE-REVIEW.md. Update when items move to "done" or when the speaker decisions change scope.*
