import Link from 'next/link'
import { symptomGroups } from '@/lib/symptoms'
import { getAllArticles } from '@/lib/content'

/**
 * The diagnostic index -- the reason to come here instead of a WordPress site
 * organised by topic.
 *
 * Symptoms without a published article render as muted text rather than links,
 * so this can show the finished shape of the site today without shipping a
 * single 404. Each entry becomes a link automatically when its MDX file lands.
 *
 * Fully static, no JS: three columns of plain links.
 */
export default function SymptomIndex() {
  const published = new Set(getAllArticles().map((a) => `${a.category}/${a.slug}`))

  return (
    <section aria-labelledby="symptom-index-heading" className="border-b border-slate-200 bg-white">
      <div className="container-page py-12 sm:py-16">
        <div className="max-w-2xl">
          <h2
            id="symptom-index-heading"
            className="text-2xl font-bold tracking-tight text-pool-900 sm:text-3xl"
          >
            Find your exact symptom
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Nobody wakes up with a &ldquo;water chemistry question.&rdquo; They wake up to a green
            pool. Here is the site in the words you would actually use.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {symptomGroups.map((group) => (
            <div key={group.id}>
              <h3 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-widest text-pool-700">
                {group.title}
              </h3>

              <ul className="mt-4 space-y-1">
                {group.symptoms.map((symptom) => {
                  const href = `/${symptom.category}/${symptom.slug}`
                  const live = published.has(`${symptom.category}/${symptom.slug}`)

                  return (
                    <li key={href}>
                      {live ? (
                        <Link
                          href={href}
                          className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-[15px] text-pool-800 hover:bg-pool-50"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5 shrink-0 text-pool-400 group-hover:text-accent-600"
                          >
                            <path d="M9 6l6 6-6 6" />
                          </svg>
                          <span className="group-hover:underline">{symptom.label}</span>
                        </Link>
                      ) : (
                        <span className="flex items-baseline gap-2 px-2 py-1.5 text-[15px] text-slate-400">
                          <span aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                          <span className="flex-1">{symptom.label}</span>
                          <span className="shrink-0 text-xs uppercase tracking-wide">soon</span>
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>

              <Link
                href={group.hubHref}
                className="mt-4 inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-accent-700 hover:underline"
              >
                {group.hubLabel}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
