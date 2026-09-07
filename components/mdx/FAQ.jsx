import { slugifyHeading } from '@/lib/content'

/**
 * FAQ block, rendered from frontmatter `faqs`.
 *
 * The single highest-yield block on the page for answer engines: each Q/A is
 * a short, self-contained, machine-readable answer, and the matching
 * FAQPage JSON-LD is emitted from the SAME array in lib/schema.js. Visible
 * text and structured data therefore always match, which is what Google's
 * FAQ guidance requires.
 *
 * Rendered as real headings plus paragraphs rather than <details> accordions.
 * Accordions hide the answer text behind an interaction; open <details>
 * content is generally indexable but it is one more thing that can go wrong,
 * and an answer nobody can lift is an answer that earns nothing.
 *
 * lib/frontmatter.js enforces a 40-character floor on every answer for the
 * same reason.
 */
export default function FAQ({ faqs = [], title = 'Common questions' }) {
  if (!faqs.length) return null

  return (
    <section className="my-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="mb-5 text-2xl font-bold text-pool-900 sm:text-3xl">
        {title}
      </h2>

      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {faqs.map((f) => (
          <div key={f.q} className="py-5">
            <h3 id={slugifyHeading(f.q)} className="text-lg font-bold leading-snug text-pool-900">
              {f.q}
            </h3>
            <p className="mt-2 text-[16px] leading-relaxed text-slate-700">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
