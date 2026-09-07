import Link from 'next/link'
import { symptomGroups } from '@/lib/symptoms'

/**
 * The diagnostic index -- the reason to come here instead of a store organised
 * by department.
 *
 * Every row names the symptom AND the thing that fixes it, then links to the
 * category that sells it. There is no "soon" state any more: all 13 categories
 * exist, so every row is a live link from day one.
 *
 * Fully static, no JS.
 */
export default function SymptomIndex() {
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
            Nobody wakes up needing to browse pool chemicals. They wake up to a green pool. Here is
            the catalog in the words you would actually use &mdash; and what each one really takes
            to fix.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {symptomGroups.map((group) => (
            <div key={group.id}>
              <h3 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-widest text-pool-700">
                {group.title}
              </h3>

              <ul className="mt-3 divide-y divide-slate-100">
                {group.symptoms.map((symptom) => (
                  <li key={symptom.label}>
                    <Link
                      href={symptom.href}
                      className="group block rounded-md px-2 py-2.5 hover:bg-pool-50"
                    >
                      <span className="flex items-center gap-2">
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
                        <span className="text-[15px] font-semibold text-pool-800 group-hover:underline">
                          {symptom.label}
                        </span>
                      </span>
                      <span className="mt-0.5 block pl-[22px] text-[13.5px] leading-snug text-slate-500">
                        {symptom.fix}
                      </span>
                    </Link>
                  </li>
                ))}
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
