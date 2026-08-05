import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import ProblemCards from '@/components/ProblemCards'
import { categories } from '@/lib/categories'
import { getFeatured } from '@/lib/content'
import { site } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: '/',
})

export default function HomePage() {
  const featured = getFeatured(6)

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-pool-50 via-pool-50 to-white">
        <div className="container-page py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-pool-900 sm:text-5xl lg:text-6xl">
              What&rsquo;s Wrong With Your Pool?
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 sm:text-xl">
              Pick the symptom. We will tell you what is actually causing it, what the fix costs,
              and whether it is worth doing yourself — written by people who do this for a living.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="sr-only">Start with your symptom</h2>
            <ProblemCards />
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-pool-900 sm:text-3xl">Start Here</h2>
            <p className="mt-2 text-slate-600">The guides people open most often.</p>
          </div>
        </div>

        {featured.length ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((article) => (
              <li key={`${article.category}/${article.slug}`}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No articles published yet.
          </p>
        )}
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="container-page py-12 sm:py-16">
          <h2 className="text-2xl font-bold text-pool-900 sm:text-3xl">Browse by Topic</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/${category.slug}`}
                  className="group block h-full rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-pool-300 hover:bg-pool-50"
                >
                  <h3 className="text-lg font-bold text-pool-900 group-hover:underline">
                    {category.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">
                    {category.description}
                  </p>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/tools"
                className="group block h-full rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-pool-300 hover:bg-pool-50"
              >
                <h3 className="text-lg font-bold text-pool-900 group-hover:underline">
                  Calculators
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">
                  Volume, chlorine dosing, and salt. Get the number before you pour anything in.
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="rounded-2xl bg-pool-800 px-6 py-10 sm:px-10 sm:py-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Some jobs are not worth doing yourself.
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-pool-100">
              Cracked plumbing, a dead heater, a pump that keeps tripping the breaker. Tell us what
              it is doing and we will connect you with licensed techs near you.
            </p>
            <Link href="/pool-repair" className="btn-primary mt-6">
              Get Repair Quotes
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
