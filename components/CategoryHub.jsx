import ArticleCard from '@/components/ArticleCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { getArticles } from '@/lib/content'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

/**
 * Shared hub index for every article category. app/<category>/page.js is a
 * four-line wrapper around this so the four hubs cannot drift apart.
 */
export default function CategoryHub({ category }) {
  const articles = getArticles(category.slug)
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: category.title, href: `/${category.slug}` },
  ]

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), collectionPageSchema(category, articles)]} />

      <PageHeader eyebrow={category.label} title={category.heading} description={category.description}>
        <Breadcrumbs items={crumbs} />
      </PageHeader>

      <div className="container-page py-10">
        {articles.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} showCategory={false} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No articles published in this section yet.
          </p>
        )}
      </div>
    </>
  )
}
