import ReviewIndexHub from '@/components/ReviewIndexHub'
import { reviewIndexes } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Product Reviews',
  description:
    'Every pool product review, roundup and head-to-head comparison on the site, organised by what you are trying to decide.',
  path: '/product-reviews',
})

export default function ProductReviewsPage() {
  return <ReviewIndexHub indexes={reviewIndexes} />
}
