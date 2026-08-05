import Link from 'next/link'
import { currentSeason } from '@/lib/seasonal'

/**
 * "What your pool needs right now." Gives a returning visitor a reason to come
 * back four times a year instead of once.
 *
 * The season resolves at build/revalidate time, not in the browser -- see the
 * `revalidate` export in app/page.js. No client JS, no hydration mismatch
 * between server and client clocks.
 */
export default function SeasonalBlock() {
  const season = currentSeason()

  return (
    <section aria-labelledby="seasonal-heading" className="bg-pool-800 text-white">
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr] lg:gap-12">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-pool-700 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-pool-100">
              {season.month} · {season.label}
            </p>
            {/* text-white is REQUIRED: the base layer paints every h2 pool-900,
                which is invisible on this pool-800 background. */}
            <h2 id="seasonal-heading" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {season.headline}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-pool-100">{season.body}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/guides" className="btn-primary">
                Seasonal guides
              </Link>
              <Link
                href="/regional"
                className="inline-flex items-center justify-center rounded-lg border-2 border-pool-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-pool-700"
              >
                Advice for your state
              </Link>
            </div>
          </div>

          <ul className="space-y-3 rounded-xl bg-pool-900/60 p-6">
            {season.points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-pool-50">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1 h-4 w-4 shrink-0 text-accent-400"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
