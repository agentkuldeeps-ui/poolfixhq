import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['above-ground']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/above-ground',
})

export default function CategoryHubPage() {
  return <CategoryHub category={category} />
}
