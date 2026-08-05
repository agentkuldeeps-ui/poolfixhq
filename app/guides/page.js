import CategoryHub from '@/components/CategoryHub'
import { categoryBySlug } from '@/lib/categories'
import { buildMetadata } from '@/lib/seo'

const category = categoryBySlug['guides']

export const metadata = buildMetadata({
  title: category.title,
  description: category.metaDescription,
  path: '/guides',
})

export default function GuidesHubPage() {
  return <CategoryHub category={category} />
}
