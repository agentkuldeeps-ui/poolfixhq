import ArticleCard from '@/components/ArticleCard'

/**
 * RelatedPosts -- three-card grid.
 *
 * Articles are resolved in lib/content.js from the `relatedSlugs` frontmatter
 * field, then bound in by MdxRenderer. When an article lists fewer than three,
 * same-category articles fill the rest so the grid is never ragged.
 *
 * Rendered automatically at the end of every article; drop <RelatedPosts />
 * mid-article only if you want it somewhere other than the bottom.
 */
export default function RelatedPosts({ posts = [], heading = 'Related Reading' }) {
  if (!posts.length) return null

  return (
    <section aria-labelledby="related-heading" className="not-prose my-10">
      <h2 id="related-heading" className="mb-4 text-2xl font-bold text-pool-900">
        {heading}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <ArticleCard key={`${post.category}/${post.slug}`} article={post} />
        ))}
      </div>
    </section>
  )
}
