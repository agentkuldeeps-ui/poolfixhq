/**
 * Collapsible block for level-3 technical depth: wiring, bonding, clearances,
 * RS-485, plumbing geometry.
 *
 * Uses <details>, not a JavaScript accordion. Three reasons, and the third is
 * the important one:
 *
 *   1. no client JavaScript, which is this site's performance margin
 *   2. it works with JS disabled and is keyboard accessible for free
 *   3. **the content is present in the HTML whether or not it is open**, so
 *      crawlers and answer engines read it. A JS accordion that injects
 *      content on click hides that content from exactly the systems we want
 *      quoting us.
 *
 * The point of collapsing it is reader comfort, not hiding it from machines.
 */
export default function TechnicalDetails({ summary, children, defaultOpen = false }) {
  return (
    <details
      open={defaultOpen}
      className="group my-6 overflow-hidden rounded-xl border border-slate-300 bg-white"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-slate-50 px-5 py-3.5 hover:bg-slate-100 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2.5">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a4 4 0 01-5 5L4 17v3h3l5.7-5.7a4 4 0 015-5l2.6-2.6-3-3z" />
          </svg>
          <span className="text-[15px] font-bold text-pool-900">{summary}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <span className="group-open:hidden">Show</span>
          <span className="hidden group-open:inline">Hide</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </summary>

      <div className="prose prose-slate max-w-none border-t border-slate-200 px-5 py-5 prose-p:text-[15.5px] prose-li:text-[15.5px] prose-headings:text-base">
        {children}
      </div>
    </details>
  )
}
