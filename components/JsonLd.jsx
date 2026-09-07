/**
 * Renders one or many JSON-LD nodes.
 *
 * Each node gets its own <script> tag rather than being merged into a @graph.
 * Both are valid; separate tags are easier to read in view-source and a
 * malformed node fails alone instead of taking the whole graph with it.
 *
 * `null` entries are filtered out, so a builder that declines to emit
 * something (personSchema for a placeholder author, faqSchema with no FAQs)
 * can simply return null and callers need no guards.
 */
export default function JsonLd({ data }) {
  const nodes = (Array.isArray(data) ? data : [data]).filter(Boolean)
  if (!nodes.length) return null

  return (
    <>
      {nodes.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  )
}
