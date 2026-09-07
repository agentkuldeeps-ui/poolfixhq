/**
 * THE ANSWER BLOCK -- the most important 40 to 320 characters on any page.
 *
 * Why this exists as its own component rather than "the first paragraph":
 *
 *  - Answer engines and AI overviews lift the first self-contained,
 *    conclusion-bearing passage after the H1. Making that a component means
 *    it is deliberate on every page instead of accidental on some.
 *  - It carries `.answer-block`, which lib/schema.js names in the
 *    `speakable` cssSelector, so structured data points a machine directly at
 *    it.
 *  - The same string is the meta description's sibling, the RSS summary and
 *    the llms.txt line for the page. One source, four consumers, no drift.
 *  - scripts/check-seo.mjs fails the build if a content page renders without
 *    one.
 *
 * The rule for writing it, enforced partly in lib/frontmatter.js: state the
 * conclusion with no preamble. "Here's what we found" is worthless to a
 * machine and to a reader.
 */
export default function AnswerBlock({ children, answer, label = 'Short answer' }) {
  const content = children ?? answer
  if (!content) return null

  return (
    <div className="answer-block my-6">
      <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-pool-600">
        {label}
      </p>
      <div className="[&>p]:m-0 [&>p+p]:mt-3">
        {typeof content === 'string' ? <p>{content}</p> : content}
      </div>
    </div>
  )
}
