# PoolFixHQ Content Standard

The single instruction file for writing and revising every article on the site.
Supersedes `poolfixhq-article-template.md` — where the two disagree, this file
wins. Read it in full before writing anything.

The input is one keyword. Everything else — title, URL, structure, sources,
length, internal links — is your decision, made against the rules below.

---

## 1. The standard you're writing to

Write as someone who has actually done this work: who knows what a pump sounds
like when it's caught prime versus when it's faking it, which brush destroys a
fiberglass surface, and why the number on the strip disagrees with what's in
front of them.

That's a quality bar, not an identity. The site has no named narrator. Never
write "I've been servicing pools for twenty years," never claim a certification,
never invent an anecdote. Authority comes from the specificity of the content,
not from a claimed résumé. Second person, confident, no hedging.

The test for every paragraph: could this appear on any of the other forty pool
sites with the brand name swapped? If yes, it isn't finished.

---

## 2. Workflow — run these in order, every time

### Step 1 — Interpret the keyword

Determine, before researching:

- **Search intent.** Informational (how does this work), diagnostic (what's
  wrong with mine), procedural (how do I do this), commercial (which should I
  buy), or safety (is this dangerous). Intent decides structure. A diagnostic
  query answered with a buying guide fails regardless of quality.
- **Pillar or spoke.** A pillar owns a whole subject and is linked to by its
  spokes. A spoke answers one narrow question and links up. If it maps to an
  existing plan row, use that row's `planId` and URL. If it doesn't, create a
  new row and tell me.
- **Category and cluster.** Category is one of `problems`, `equipment`,
  `chemistry`, `guides`, `regional` and must match the folder. Cluster is one of
  `symptoms`, `equipment`, `brand-codes`, `chemistry`, `guides`, `regional`.
- **Archetype.** Pick one of the thirteen formats in §7. This is the single most
  consequential decision in the whole workflow — it determines the structure
  before a word is written, and getting it wrong cannot be fixed by writing
  well. One keyword can have a different archetype than its neighbors in the
  same cluster: "pool pump not priming" is diagnostic, "how to replace a pump
  seal" is procedural, "how much does a pool pump cost" is pricing, and all
  three sit in `/equipment`. Do not let the folder decide the format.

### Step 2 — Cannibalisation check, mandatory

Before writing a word, search the existing content directory for overlap. If an
existing article already substantially covers this keyword:

- **Stop and tell me.** Do not write a second article competing with our own
  page.
- Propose one of: expand the existing article, write this one with a narrower
  angle and an explicit boundary, or drop it.

Two of our own pages competing for one query is worse than not having the second
page.

### Step 3 — Research

- Read the live SERP for the primary keyword. Identify who ranks, what they all
  cover, and where they're all wrong, thin, or repeating each other. That gap is
  the article's reason to exist.
- Harvest People Also Ask and related searches. These become secondary terms and
  the FAQ block.
- Gather sources per the hierarchy in §3.
- Find the uncommon mechanism (§6).

Write down the gap explicitly before outlining. If you can't name what this
article does that the ranking pages don't, you don't have an article yet.

### Step 4 — Decide the SEO shape (§4)

### Step 5 — Outline, then draft

### Step 6 — Run the QC checklist (§10) against your own draft, honestly

### Step 7 — Report (§11)

---

## 3. Sources — tiered, and the tiers are binding

Cite the highest tier that genuinely covers the claim. Never cite a lower tier
for something a higher tier addresses.

**Tier 1 — Government and academic.** CDC, EPA, state and county health
departments, university extension programs, peer-reviewed literature. Use for:
health and safety claims, sanitizer levels, disease transmission, chemical
handling, environmental and discharge rules, water quality data.

**Tier 2 — Manufacturer primary literature.** Service manuals, installation
manuals, technical bulletins, published fault-code tables from Hayward, Pentair,
Jandy, Raypak, Zodiac, Intex and others. On a fault code, the manufacturer's own
service literature is the authority — it outranks any secondary source. Prefer
the PDF over a summary of it. This is the required source type for every
brand-code article.

**Tier 3 — Recognised industry technical bodies.** PHTA, NSPF/CPO material,
water chemistry technical publications, and technical sources publishing
original chemistry work rather than aggregated advice (Orenda is the clearest
example — cite it for LSI and saturation).

**Tier 4 — Trade and technical publications.** AQUA Magazine, established parts
suppliers publishing genuine technical repair documentation.

**Banned as citations, always:**

- Competitor pool blogs, affiliate content sites, SEO content farms
- AI-generated content aggregators
- Forums, including TroubleFreePool and Reddit — see below
- Anything where the author or organisation is unidentifiable
- Any source you have not actually loaded

**Forums.** You may read search snippets to find a mechanism worth
investigating. You may not cite a forum, and you may not scrape forum page
bodies — several explicitly refuse scrapers, and routing around that is
off-limits. A mechanism found in a snippet must be verified against a Tier 1–4
source before it appears in an article.

**Never invent** a source, a URL, a statistic, or a study. If you can't verify a
figure, write `[VERIFY: what's needed]` and continue. An honest gap beats an
invented number, always.

**Sources requirement per article:** minimum two, at least one from Tier 1 or 2.
Chemistry and safety content requires Tier 1 where a Tier 1 source exists.

---

## 4. SEO specification

**Title.** Primary keyword at or near the front, plus a specific promise. Up to
90 characters. If it exceeds 60, also write an `seoTitle` under 60 for the
`<title>` tag — the long version stays as the H1.

**Meta description.** Under 155 characters, contains the keyword, written as a
sentence a person would say. Not a summary of the page.

**URL.** Short, kebab-case, keyword-bearing, no dates, no stop words.
`/problems/black-algae-in-pool`, not
`/problems/how-to-get-rid-of-black-algae-in-your-pool`.

**Keyword placement.** Primary keyword in the title, in the first 100 words, and
in at least one H2 — but only where it reads naturally. A jammed keyword is
worse than a missed one. If the natural opening sentence doesn't contain it,
write the natural sentence and place the keyword in the next one.

**Secondary terms.** Work in the real search variants harvested in Step 3. Cover
them because a thorough article covers them, not by insertion. If a variant has
no natural home, that's a signal the article is missing a section.

**Answer-first structure.** The Quick Answer block sits directly under the H1
and genuinely answers the query in two to four sentences. Someone who reads only
that and leaves should have got what they came for. This is what wins featured
snippets, and giving the answer away costs nothing.

**Entity coverage.** Name the specific things: part numbers, model families,
chemical names, brand names, unit values, tolerances. Specificity is both the
ranking signal and the quality signal — they're the same thing here.

**Scannability.** Descriptive H2s that state the answer rather than pose a
question. Tables for anything comparative. Short paragraphs. A reader scanning
only the H2s should get the shape of the answer.

**Schema.** `Article` on everything. `FAQPage` only from the explicit FAQ block,
never derived from headings. No `HowTo`.

---

## 5. Internal linking

Internal links are the site's structure, not decoration.

Every article links:

- Up to its pillar, if it's a spoke
- Down to its spokes, if it's a pillar
- Across to at least two siblings in the same cluster
- Out to at least one other cluster — a symptom article to the chemistry that
  drives it, an equipment article to the symptom it produces
- To a calculator wherever a dose, volume or run-time is discussed
- To `/pool-repair` from the escalation section

**Minimum six in-body internal links.** Descriptive anchors that describe the
destination — never "click here," never a bare URL.

**Bidirectional linking is required.** When an article references an existing
one, add the reciprocal link to that older article in the same commit. A one-way
link is half a link. Report every reciprocal edit you make.

Link to planned-but-unwritten articles in prose without an anchor, and record
the intended slug in a code comment so it can be wired up when the article
lands.

---

## 6. The uncommon mechanism

Every article contains at least one specific, non-obvious detail a reader would
not get from the manufacturer's manual or the first three search results.

- It must be a **mechanism** — something that explains *why* — not a tip like
  "brush regularly."
- It must be sourced to Tier 1–4 and logged in `content/research/tips.json` with
  `state: verified` and the source URL.
- **No mechanism is ever reused across two articles.** Build enforces this on
  `uncommonTip` uniqueness.
- A candidate may be assigned and written against while the article is
  `status: scaffold`. Verification gates `live`, not writing.

If you can't find one, the research isn't finished. Go back to Step 3.

---

## 7. Format router — structure follows topic type

Classify the keyword into one of the archetypes below before outlining. The
format is not a style choice; it is determined by what the reader came for. A
diagnostic query answered in buyer's-guide format fails no matter how well it's
written.

State which archetype you picked in the §11 report. If a keyword genuinely spans
two — "best brush for black algae" is commercial and diagnostic — pick the
dominant intent, use its structure, and fold the secondary in as a section
rather than blending two skeletons.

Every archetype shares this spine: H1 → Quick Answer → short opening → body
(varies) → uncommon mechanism → escalation where relevant → FAQ → sources → last
updated.

### A. Diagnostic — a symptom or fault

Signals: "why is my," "pool is [X]," "won't," "keeps," "not working"

Quick Answer → what you're actually looking at, distinguished from what it gets
confused with → why it happens, mechanism → what to test and what each reading
means → the fix, cheapest and easiest first, each with "why this works" → why it
comes back → uncommon mechanism → when to stop → FAQ.

The misidentification section usually carries the article. Competitors optimize
for "how to fix X" and almost none for "is it actually X."

### B. Brand or model fault code

Signals: a brand name plus a code, light pattern, or fault message

Quick Answer stating what the code literally means in one line → which model
families it applies to, named explicitly → what the unit is sensing and what
trips it → the sequence the unit runs before the fault, so the reader knows
where in that sequence it stopped → check in this order, each with what a good
reading looks like and what a bad one means → parts that may be needed → what it
costs to have done, so DIY-versus-pro is an informed choice → uncommon mechanism
→ when to stop → FAQ.

Manufacturer service literature is required (Tier 2). Name the exact model
families — `H150FD, H200FD, H250FD, H350FD, H400FD`, not "Hayward heaters." That
specificity is why these rank.

### C. Procedural — how to do a job

Signals: "how to," "step by step," "replacing," "installing," "cleaning"

Quick Answer → what you need, tools and parts → how to do it correctly, in
order, with what "correct" looks, sounds and feels like at each stage → the
common ways it goes wrong → how to verify it worked → uncommon mechanism → when
to stop → FAQ.

Equipment articles run short when they explain diagnosis and never explain how
to do the job properly. That gap is the depth. Include the sensory detail — the
pitch change, the resistance, the sound — because that is what a manual never
contains.

### D. Chemistry reference — a value or reaction

Signals: a parameter name, "how to raise/lower," "what should my [X] be"

Quick Answer → what this number physically does → target range as a table, split
by surface and sanitizer → how to raise and lower, per gallons, routed to the
calculator → order of operations and wait times → what goes wrong in both
directions → uncommon mechanism → FAQ.

Tier 1 sources required where they exist.

### E. Comparison — X vs Y

Signals: "vs," "or," "difference between," "which is better"

Quick Answer that names a winner for the most common case → what genuinely
differentiates them, mechanism not marketing → comparison table with identical
criteria across both → who each one suits → who each one does NOT suit → the
honest case against the more expensive option → cost over a realistic ownership
period, not sticker price → uncommon mechanism → FAQ.

Take a position. A comparison that recommends nothing is worthless. If the
honest answer is "they're the same chemical sold two ways," say that.

### F. Buyer's guide — best or top-N

Signals: "best," "top," "which should I buy," a product category

Quick Answer naming one pick for the common case → what actually matters in this
category and what is marketing noise → the criteria used, stated up front → the
picks, each with who it suits and what it trades away → what to avoid and why →
when the cheap option is genuinely fine → uncommon mechanism → FAQ.

**Honesty requirement:** we do not physically test products. Never write or
imply "we tested," "we've used," "in our testing," or a hands-on verdict. Base
recommendations on documented specifications, manufacturer literature,
mechanism, and known failure modes — and be transparent that this is how the
picks were made. A fabricated testing claim is the same error class as a
fabricated citation.

### G. Single product review

Signals: a specific product name plus "review"

Quick Answer with a verdict and who it's for → what it is and what problem it
solves → specifications that matter and why → known failure modes and common
complaints, sourced → what it's genuinely good at → what it isn't →
alternatives worth considering → uncommon mechanism → FAQ.

Same no-hands-on-testing rule as F. If there isn't enough sourced material to
say something useful about failure modes, say so rather than padding with
spec-sheet paraphrase.

### H. Cost and pricing

Signals: "cost," "how much," "price," "worth it"

Quick Answer with a realistic range → what drives the range, the actual
variables → cost breakdown by component → DIY versus professional, with the
honest labor and risk difference → what makes it cost more than quoted → when
spending more saves money and when it doesn't → uncommon mechanism → FAQ.

Give ranges, not fixed figures, and say what region and period the range
reflects. Never publish a hard price that will be stale in a month.

### I. Explainer — what is X

Signals: "what is," "what does X mean," "how does X work"

Quick Answer defining it plainly → the mechanism, in physical terms → why it
matters to the reader's pool specifically → what it looks like in practice →
common misconceptions, named and corrected → uncommon mechanism → FAQ.

No escalation section unless there's a real safety dimension. This archetype
drifts into generic encyclopedia writing more easily than any other — anchor
every point to a decision the reader has to make.

### J. Timeline — how long, how often

Signals: "how long," "how often," "when should I"

Quick Answer with an honest range → what determines where in that range a given
pool lands → the timeline stage by stage, with what to observe at each → why it
takes longer than most sources claim → what makes it take longer than it should
→ when a stalled timeline means something is wrong → uncommon mechanism → FAQ.

Most competitor content lowballs these. An honest longer answer with the reasons
is more useful and more trustworthy.

### K. Safety — is X safe

Signals: "is it safe," "can you swim," "dangerous," "harmful"

Quick Answer giving a direct yes, no, or conditional → what the actual risk is,
and what it is not → what the evidence says, Tier 1 only → what makes it worse
and what makes it fine → what to do about it now → when to keep people out of
the water → FAQ.

Tier 1 sources are mandatory here. Do not import a risk finding from a different
context — a warning about natural water bodies is not evidence about chlorinated
pools. If no source addresses the pool case specifically, say that plainly
rather than overclaiming or dismissing.

### L. Checklist and seasonal

Signals: "checklist," "opening," "closing," "winterizing," "schedule"

Quick Answer → why the order matters, because it does → the checklist itself,
sequenced, with why each step sits where it does → timing keyed to water
temperature rather than calendar months where temperature is the real driver →
what happens if a step is skipped → uncommon mechanism → when to stop → FAQ.

### M. Regional

Quick Answer → fill water in this state, real figures by metro → season length →
the failure mode this climate causes → where the advice inverts within the state
→ local rules → finding a tech. If a state has no internal split, the article is
naturally shorter. Don't pad it.

### If none of these fit

Say so and propose a structure before writing, explaining what the reader wants
and why no archetype serves it. Do not silently invent a format. If the same
unfitted shape comes up twice, it's a missing archetype — tell me and we'll add
it here.

---

## 8. Voice

**Banned outright:**

- Triads. No "fast, safe, and effective." One adjective or none.
- "Comprehensive guide," "ultimate guide," "everything you need to know," "in
  this article we'll explore," "let's dive in," "at the end of the day," "when
  it comes to," "it's important to note," "plays a crucial role," "game-changer,"
  "peace of mind," "rest assured," "look no further."
- Hedge stacking: "may potentially help in some cases."
- Rhetorical questions as transitions.
- Restating the H2 in the first sentence beneath it.
- Closing summary paragraphs that add nothing.
- Symmetrical section lengths. Some sections should be two sentences.

**Required:**

- US English throughout — spelling, idiom, and units. Gallons, °F, psi, fl oz.
  No `fortnight`, `colour`, `grey`, `whilst`, `oxidising`.
- Real numbers, real part numbers, real tolerances. "31 fl oz of 31.45% muriatic
  acid per 10,000 gallons," not "add some acid."
- Sentence length variation. Contractions.
- At least one place where something costs money and isn't worth it, or the
  cheap fix beats the expensive one.
- At least one honest uncertainty where one exists.
- Conflicting sources written as conflicts. If sources disagree, say they
  disagree and say what actually settles it. Never smooth it over by picking
  one.

---

## 9. Length

There is no word target. Length is an output of how much the topic genuinely
contains.

Write until the query is fully answered and every section earns its place, then
stop. Do not pad to reach a number. Do not cut real material to stay under one.
A tight 1,300-word article that answers the query beats an 1,800-word one with
500 words of throat-clearing.

Report the final count without apology. Only flag it if a topic came in so short
that you think something's missing.

---

## 10. Safety and accuracy — non-negotiable

- Safety block on anything involving muriatic acid, chemical mixing, chlorine
  handling, gas, or line voltage. Never softened for readability.
- Escalation section on every diagnostic and procedural article, with specific
  triggers, not a blanket disclaimer. "If you smell gas at any point, stop" is a
  trigger. "Consult a professional if unsure" is filler. Include the honest line
  that the referral costs us money.
- Surface constraints stated wherever a tool or chemical can damage a surface —
  stainless brushes, trichlor on vinyl, acid on plaster.
- Municipal water reports give total hardness. Pool tests read calcium hardness
  at roughly 70–80% of it. Never present one as the other.
- Never state a dose in absolute terms without a per-gallon basis, and always
  route to the volume calculator.
- Draining: hydrostatic pop-out is a real risk. Any partial or full drain
  discussion escalates.

### QC checklist — run honestly, report failures

- [ ] Primary keyword in title, first 100 words, one H2 — naturally
- [ ] Meta description under 155
- [ ] Quick Answer answers the query standing alone
- [ ] Archetype correctly identified and its structure actually followed
- [ ] Search intent matched by the structure used
- [ ] Cannibalisation check run, no competing internal page
- [ ] Six or more in-body internal links, reciprocals added
- [ ] Two or more sources, at least one Tier 1 or 2, all loaded and real
- [ ] One uncommon mechanism, sourced, logged, not reused
- [ ] Escalation section has specific triggers
- [ ] Safety block where required
- [ ] Surface constraints stated
- [ ] Every dose per-gallons and linked to the calculator
- [ ] US English throughout
- [ ] No banned phrases, no triads, no symmetrical sections
- [ ] At least one "this costs money and isn't worth it"
- [ ] Conflicting sources written as conflicts
- [ ] No claimed hands-on testing anywhere (archetypes F and G especially)
- [ ] Every number traceable or marked `[VERIFY]`
- [ ] Reads like a person with an opinion wrote it

An honest fail is more useful than a clean report. Never claim an item passes if
it doesn't.

---

## 11. Output and reporting

One `.mdx` file at the correct path, full frontmatter, `status: scaffold`.

Then a short report block:

```
planId / URL / title / seoTitle
Search intent, archetype used (§7 letter), pillar or spoke
Why that archetype and not the adjacent one, in one line
The gap: what this does that the ranking pages don't
Primary keyword + secondary terms covered
Uncommon mechanism used + source + tips.json state
Sources cited, by tier
Internal links out, and reciprocals added to which articles
Product slots used, new slots created
[VERIFY] markers left open
Word count
QC checklist — every item, pass or fail, honestly
```

---

## 12. Retrofitting existing articles

Same standard, applied to what's already written. Work through them in this
order and report each one before moving on:

1. **Audit** against §10's checklist. List failures without fixing.
2. **Sources first.** Any citation outside Tiers 1–4 gets replaced or the claim
   gets cut. Any unverified `uncommonTip` gets sourced or swapped. Nothing goes
   `live` until its sources hold.
3. **Depth second.** Most existing articles are short because they explain
   diagnosis without explaining the correct procedure, or state a mechanism
   without explaining why. Add per-section depth, not more sections.
4. **Interlinking third.** Early articles were written when later ones didn't
   exist. Add the links that now genuinely exist, in both directions.
5. **Voice last.** Locale, banned phrases, symmetry, and whether the opinion is
   still in there or has flattened into hedging.

Every 25 articles, self-audit the last 25: has one opening shape become the
default? Is any phrase now appearing in more than three articles — if so it's a
new banned phrase, add it to `CLAUDE.md`. Have the escalation sections become
boilerplate? Has the opinionated line flattened? Sameness accumulates invisibly.
Assume it's happening and go looking.

---

## 13. Session discipline

- Never research and write in the same session — Firecrawl responses are large
  and they starve the writing.
- Research sessions: fetch, extract to disk, drop the raw response. Never hold
  more than one scraped page in context.
- Writing sessions: repo only. If a fact is missing, mark `[VERIFY]` and
  continue. Don't go fetch it.
- Three articles maximum per writing session. Finish the one you're on rather
  than starting a fourth to fill space.
- `HANDOFF.md` written at the end of every session, read at the start. Start
  sessions by reading `HANDOFF.md` and `CLAUDE.md` only.
