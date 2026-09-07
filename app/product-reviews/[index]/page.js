import { notFound } from 'next/navigation'
import ReviewListing from '@/components/ReviewListing'
import { reviewIndexes } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return reviewIndexes.map((i) => ({ index: i.slug }))
}

export function generateMetadata({ params }) {
  const index = reviewIndexes.find((i) => i.slug === params.index)
  if (!index) return {}
  return buildMetadata({
    title: index.title,
    description: index.description,
    path: `/product-reviews/${index.slug}`,
  })
}

export default function ReviewListingRoute({ params }) {
  const index = reviewIndexes.find((i) => i.slug === params.index)
  if (!index) notFound()
  return <ReviewListing index={index} />
}
