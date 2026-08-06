/**
 * UncommonTip — the one mechanism per article a reader wouldn't get from the
 * manufacturer's manual or the first three search results.
 *
 * Exactly one per article, and the mechanism is never reused. The `uncommonTip`
 * frontmatter field carries a short id for that rule; the prose lives here as
 * children. Between live articles the build fails on a duplicate id.
 *
 * Styled to interrupt the page on purpose. It's the thing worth stopping for.
 */
export default function UncommonTip({ title = 'The bit most guides miss', children }) {
  return (
    <aside
      aria-label="Uncommon tip"
      className="not-prose my-8 overflow-hidden rounded-xl border-2 border-pool-700 bg-white shadow-sm"
    >
      <p className="flex items-center gap-2 bg-pool-700 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0"
        >
          <path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
        </svg>
        {title}
      </p>
      <div className="prose prose-slate max-w-none px-5 py-4 prose-p:my-2">{children}</div>
    </aside>
  )
}
