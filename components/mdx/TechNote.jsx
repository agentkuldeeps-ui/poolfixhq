/**
 * THE TECH NOTE -- the mechanism nobody else mentions.
 *
 * This is the differentiator, and it is the reason a page earns a link
 * instead of a bounce. Every competing review of a given product says roughly
 * the same things. The tech note is the paragraph that says the thing the
 * others do not know: why the part actually fails, what the spec sheet means
 * in practice, the compatibility trap that costs people money.
 *
 * Rules:
 *  - one per page, and lib/frontmatter.js enforces that the same `techNote`
 *    slug is never reused across two live pages. If it has been said, it is
 *    not uncommon any more.
 *  - it must be mechanistic, not an opinion. "We liked the handle" is not a
 *    tech note. "The impeller is press-fit, so a jammed one usually means a
 *    new wet end rather than a cleanout" is.
 *  - declaring `techNote` in frontmatter without rendering this component
 *    fails the build, and vice versa the slug is what makes it unique.
 */
export default function TechNote({ title = 'The part nobody mentions', children }) {
  return (
    <aside className="my-8 overflow-hidden rounded-xl border-2 border-pool-300 bg-white">
      <div className="flex items-center gap-2 border-b border-pool-200 bg-pool-100 px-5 py-3">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-pool-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18h6M10 22h4" />
          <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
        </svg>
        <p className="text-[11px] font-bold uppercase tracking-widest text-pool-700">{title}</p>
      </div>
      <div className="prose prose-slate max-w-none px-5 py-5 prose-p:text-[16px] prose-p:leading-relaxed">
        {children}
      </div>
    </aside>
  )
}
