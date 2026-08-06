/**
 * FAQ — renders the `faqs` frontmatter block.
 *
 * Questions live in frontmatter rather than the body so the visible list and
 * the FAQPage schema come from one source and can't drift. Authors write
 * `<FAQ />` bare; MdxRenderer binds the data, same pattern as QuickAnswer and
 * TableOfContents.
 *
 * Renders nothing when there are no questions.
 */
export default function FAQ({ faqs = [], heading = 'Common questions' }) {
  if (!faqs.length) return null

  return (
    <section aria-labelledby="faq-heading" className="not-prose my-10">
      <h2 id="faq-heading" className="mb-4 text-2xl font-bold text-pool-900">
        {heading}
      </h2>
      <dl className="space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-5">
            <dt className="font-bold text-pool-900">{f.q}</dt>
            <dd className="mt-2 text-[16px] leading-relaxed text-slate-700">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
