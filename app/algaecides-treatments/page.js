import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['algaecides-treatments']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/algaecides-treatments',
})

export default function CategoryHubPage() {
  return <CategoryHub category={category} />
}
