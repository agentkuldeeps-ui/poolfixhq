import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import { getFeatured } from '@/lib/content'

/** Articles flagged `featured: true` in frontmatter, newest first. */
export default function FeaturedGuides({ limit = 6 }) {
  const featured = getFeatured(limit)
  if (!featured.length) return null

  return (
    <section aria-labelledby="featured-heading" className="bg-slate-50">
      <div className="container-page py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2
              id="featured-heading"
              className="text-2xl font-bold tracking-tight text-pool-900 sm:text-3xl"
            >
              Start here
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-600">
              The guides people open most often, and the ones worth reading before something goes
              wrong.
            </p>
          </div>
          <Link href="/problems" className="text-sm font-semibold text-accent-700 hover:underline">
            Browse everything &rarr;
          </Link>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((article) => (
            <li key={`${article.category}/${article.slug}`}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
