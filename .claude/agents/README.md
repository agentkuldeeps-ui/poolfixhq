# The review team

Ten agents: five that build a review, five that try to break it.

They live in `.claude/agents/` and are invoked by name with the Agent tool.
`REVIEW_STANDARD.md` is the content spec they all serve; `CLAUDE.md` wins on
any technical disagreement.

---

## They are roles, not people

**These are internal job descriptions. They are never bylines, never author
entities, and never appear on the site.**

Publishing invented named reviewers with invented credentials would be
fabricated E-E-A-T: it deceives readers, it is exactly what Google's spam
policies target, and it contradicts the rule at the top of `lib/authors.js`
that every field there must be true. `lib/authors.js` takes real people only.

The site's current author gap — one placeholder, no `Person` schema anywhere —
is closed by adding **one real named human with verifiable credentials**, not
by promoting anything in this folder.

---

## The pipeline

```
                 PRODUCT INTAKE (REVIEW_STANDARD.md §6)
                              |
                    product-researcher
                    fact sheet + COULD NOT VERIFY
                              |
                      spec-analyst
              consequences, interactions, TechNote,
                     buyers-often-miss
                              |
                    scoring-analyst
            dimension scores -> weighted mean -> rating
                              |
                     review-drafter
                    writes content/<cat>/<slug>.mdx
                              |
                   comparison-writer
              alternatives, PlannedLinks, roundups
                              |
        +---------------------+---------------------+
        |         FIVE EDITORS, IN PARALLEL         |
        |  fact / compliance / seo / voice / scoring|
        +---------------------+---------------------+
                              |
                   any BLOCKING finding?
                     yes -> back to drafter
                     no  -> npm run build
                              |
                    all four checkers pass
                              |
                          PUBLISH
```

### Stage 1 — build it

| Agent | Does | Hands on |
|---|---|---|
| `product-researcher` | Finds and verifies source material | Fact sheet, sources, gaps |
| `spec-analyst` | Turns specs into buyer consequences | Consequences, TechNote, misses |
| `scoring-analyst` | Scores dimensions, derives rating | `scores` + `rating` block |
| `review-drafter` | Writes the MDX | The file |
| `comparison-writer` | Alternatives and standalone comparisons | Sections and pages |

### Stage 2 — try to break it

Run all five together. They are read-only by design: five agents editing one
MDX concurrently is how content gets clobbered and how nobody can tell what
changed or why. They report; the drafter applies.

| Agent | Catches |
|---|---|
| `fact-editor` | Claims their source does not support. The one that matters most. |
| `compliance-editor` | Associates violations, FTC disclosure, chemical and safety claims |
| `seo-editor` | Keyword collisions, weak `answer`, schema, heading order, orphans |
| `voice-editor` | Padding, hedging, reviews that recommend everything |
| `scoring-editor` | Rating arithmetic, undefended scores, category drift |

---

## What blocks publication

Any **BLOCKING** finding, plus a clean `npm run build`. The build runs
`check-links`, `check-seo` and `check-compliance`, and `lib/frontmatter.js`
validates every field.

The editors exist to catch what the scripts cannot. A regex cannot tell you
that a cited manual does not actually say what the sentence claims, that the
verdict refuses to decide, or that a 6 for serviceability has no paragraph
defending it.

**Never ship on an editor's say-so alone, and never ship on a green build
alone.** Both, every time.

---

## Running it

Whole pipeline, one product:

> Run the review pipeline for <product>: product-researcher, then
> spec-analyst, then scoring-analyst, then review-drafter, then all five
> editors in parallel. Report blocking findings before writing anything final.

Just the audit, on an existing page:

> Run fact-editor, compliance-editor, seo-editor, voice-editor and
> scoring-editor against content/<category>/<slug>.mdx in parallel.

A single stage:

> Have scoring-analyst re-score content/pool-pumps/<slug>.mdx.

Run the five editors **in parallel** — they do not depend on each other, and
five independent reads is the point. Run the five builders **in sequence** —
each needs the one before it.

---

## Two rules that keep this honest

1. **No agent may introduce a fact that is not in its inputs.** The drafter
   leaves `TODO(research):` rather than filling a gap plausibly. An invented
   figure survives review precisely because it looks right.
2. **The scoring runs one way only.** Dimensions are scored from evidence and
   the rating falls out of the arithmetic. Nobody picks a rating and works
   backwards, and nobody adjusts a category weight to move one product.
