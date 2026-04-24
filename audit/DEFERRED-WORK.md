# Deferred work — items intentionally NOT shipped in the audit-fix run

These are findings from `SLIDE-REVIEW.md` that were reviewed and
explicitly deferred during the Apr 24 audit-fix sweep. Each entry
explains *why* it was deferred, the expected effort, and what
unblocks it.

---

## 1. Slide 21 (CS2 regulatory timeline) — proportional-time rebuild

**Source:** `SLIDE-REVIEW.md` §6 ("the one slide that needs a rebuild, not a tweak").

**Issue:**
1. **Tell #8 violation** — 9 timeline nodes are equal-spaced, but the dates compress 5 events into 5 months (Dec 10 → Jan → Jan 14 → Mar 27 → Apr 4 → May 14). The audience reads the spacing as proportional time and is wrong.
2. **Slide-02 overlap pattern at scale** — at 1280px viewport each NodeCard becomes ~131px wide for a 3-line label. Adjacent cards collide.
3. **Focal-point split** — the climax content (27 Mar 2025) appears both as a timeline node AND as a duplicate leadership-beat callout below.

**Why deferred:** This is a half-day refactor that changes the slide's visual rhythm fundamentally. The proportional spacing turns "9 equal columns" into "5 dense + 4 spread" and the design intent should be confirmed by the speaker before the geometry changes. The slide currently *works* — the dates are correct, the climax is identified — it just isn't optimal.

**Effort:** L (~half day).

**Unblocks:** Speaker confirmation that proportional time spacing is preferred over the current "all dates equally important visually" reading.

**Concrete fix path:**
1. Add `dayDelta(date, prevDate)` helper.
2. Position each NodeCard at `xPct = cumulativeDays / totalDays` along the timeline rail.
3. Truncate NodeCard labels to ≤30 chars except for the climax/turn nodes (currently every label is full).
4. Remove the duplicate "27 Mar 2025" leadership-beat callout below the timeline (it already exists as a node).

---

## 2. Footer-tagline citation migration (5 slides)

**Source:** `SLIDE-REVIEW.md` §4 P3.

**Issue:** Slides 06b, 11, 14, 27 use `footerTagline` for citation clusters that get truncated by the rail's `truncate` class on viewports <1366px.

**Why deferred (partial):** The `Footer` component now exposes a `source` prop (Phase B) so the migration is unblocked structurally, but each migration requires reading the existing tagline carefully to split "this is the editorial payoff" from "this is the citation chain." Doing it sloppily risks splitting a payoff sentence into a stray fragment.

**Effort:** S (~30 min per slide once the editorial split is decided).

**Unblocks:** Pass through each slide's tagline and decide which clauses are payoff (stay in `tagline`) vs citation (move to `source`).

---

## 3. P5 case-color contract — slides 13, 14, 33, 34 audit

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
- ⏳ Remaining 6: `case-marker-coral|cyan|violet`, `cs1-focal-amber`, `cs3-n-94`, `cs2-sec-objection` corner-shrink.

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
