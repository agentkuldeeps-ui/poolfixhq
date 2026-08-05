import { notFound } from 'next/navigation'
import ArticlePage from '@/components/ArticlePage'
import { getArticle, getSlugs } from '@/lib/content'
import { articleMetadata } from '@/lib/seo'

const CATEGORY = 'chemistry'

/** Only slugs with a matching MDX file exist. Anything else is a real 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return getSlugs(CATEGORY)
}

export function generateMetadata({ params }) {
  const article = getArticle(CATEGORY, params.slug)
  return article ? articleMetadata(article) : {}
}

export default function ChemistryArticleRoute({ params }) {
  const article = getArticle(CATEGORY, params.slug)
  if (!article) notFound()
  return <ArticlePage article={article} />
}
