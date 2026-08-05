import { notFound } from 'next/navigation'
import ArticlePage from '@/components/ArticlePage'
import { getArticle, getSlugs } from '@/lib/content'
import { articleMetadata } from '@/lib/seo'

const CATEGORY = 'regional'

/**
 * The URL param is [state] rather than [slug] to keep /regional/texas readable,
 * but it maps to content/regional/<state>.mdx exactly like every other category.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return getSlugs(CATEGORY).map(({ slug }) => ({ state: slug }))
}

export function generateMetadata({ params }) {
  const article = getArticle(CATEGORY, params.state)
  return article ? articleMetadata(article) : {}
}

export default function RegionalArticleRoute({ params }) {
  const article = getArticle(CATEGORY, params.state)
  if (!article) notFound()
  return <ArticlePage article={article} />
}
