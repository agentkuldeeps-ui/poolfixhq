import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['equipment']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/equipment',
})

export default function EquipmentHubPage() {
  return <CategoryHub category={category} />
}
