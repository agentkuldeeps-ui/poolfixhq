/**
 * QuickAnswer -- the snippet-targeted answer block. Always the first thing in
 * an article, immediately after the H1.
 *
 * Renders `article.quickAnswer` from frontmatter by default. Pass children to
 * override with richer markup. Google lifts this block for featured snippets,
 * so the first sentence must answer the title question outright.
 */
export default function QuickAnswer({ children, answer }) {
  const content = children ?? answer
  if (!content) return null

  return (
    <aside
      aria-label="Quick answer"
      className="not-prose my-6 rounded-xl border-l-4 border-pool-600 bg-pool-50 p-5 sm:p-6"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-pool-700">
        Quick Answer
      </p>
      <div className="text-lg font-semibold leading-relaxed text-pool-900 [&>p]:m-0 [&>p+p]:mt-3">
        {typeof content === 'string' ? <p>{content}</p> : content}
      </div>
    </aside>
  )
}
