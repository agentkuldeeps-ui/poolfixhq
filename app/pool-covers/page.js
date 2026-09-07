import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['pool-covers']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/pool-covers',
})

export default function CategoryHubPage() {
  return <CategoryHub category={category} />
}
