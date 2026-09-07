import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['cleaning-tools']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/cleaning-tools',
})

export default function CategoryHubPage() {
  return <CategoryHub category={category} />
}
