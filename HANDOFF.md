# HANDOFF

Read this and CLAUDE.md at the start of every session. Nothing else unless the
task needs it. Rewrite this file at the end of every session.

## Last commit
`95acb4f` — replace SYM-002 and EQP-001 scaffolds

## Session type rules
Research sessions: Firecrawl only, append to `content/research/*.json`, never
hold more than one scraped page in context. Writing sessions: repo only, no web
fetching — an unknown fact becomes `[VERIFY: …]` and moves on. Three articles
per writing session, then stop.

## Written / remaining
Scaffold replacements (must clear before B1 proper):
- done: SYM-001 green-pool-water, SYM-002 cloudy-pool-water, EQP-001 pump-not-priming
- remaining: **GDE-001** pool-opening-checklist, **CHM-001** chlorine-basics,
  **REG-001** texas — all three still live placeholder text
- B1 after that: 63 articles, 0 written

## tips.json
`content/research/tips.json` is the source of truth, not the spreadsheet.
- 18 total: **2 verified**, 16 candidates
- **0 assignable** (verified + unassigned). Every candidate needs a source URL
  before it can be used.

## Open issues
- `dead-algae-turns-gray` is assigned to SYM-001 but is a **candidate with no
  source** — predates the verified/candidate rule. Needs a source or SYM-001
  needs a different tip before it goes live.
- SYM-002 is 1,370 words against 1,800; EQP-001 is 1,289 against 1,900. Both
  need a depth pass — more detail per section, not more sections.
- No open `[VERIFY]` markers in any article.
- All 12 product slots have no ASIN. Deliberate; the build warning is the
  worklist.
- Spreadsheet Uncommon Tips tab is stale — superseded by tips.json, sync later.

## Blocked
- **REG-001** needs Texas fill-water hardness by metro, TCEQ drain/discharge
  rules, and season length. Research session B. Do not estimate these.

## Next action
**Session A (writing, no research):** GDE-001 and CHM-001, then the depth pass
on SYM-002 and EQP-001. CHM-001 must cite sources — use the CDC home-pool URLs
already in SYM-001/SYM-002 frontmatter, and carry the home-vs-public-facility
distinction (home: ≥1 ppm FC, ≥2 with CYA, pH 7.0–7.8; the widely quoted
7.2–7.8 is the public figure).
