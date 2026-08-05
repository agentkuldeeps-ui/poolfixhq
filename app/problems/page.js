import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['problems']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/problems',
})

export default function ProblemsHubPage() {
  return <CategoryHub category={category} />
}
