import ProsePage from '@/components/ProsePage'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'The terms that apply when you use PoolFixHQ.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <ProsePage
      title="Terms of Use"
      description="The rules of the road."
      path="/terms"
      updated="2026-08-05"
    >
      <p>
        <strong>
          Placeholder scaffold. Not legal advice. Have a lawyer produce the real terms before
          launch.
        </strong>
      </p>

      <h2>Use of the site</h2>
      <p>Placeholder: acceptable use, account-free access, prohibited scraping.</p>

      <h2>No professional relationship</h2>
      <p>
        Placeholder: content is general guidance. Pool work involves electricity, gas, pressurized
        plumbing, and hazardous chemicals. Following a guide does not create a professional
        relationship, and you are responsible for the work you do on your own equipment.
      </p>

      <h2>Third-party professionals</h2>
      <p>
        Placeholder: we introduce you to independent contractors. We do not perform the work, employ
        the contractors, or guarantee their work.
      </p>

      <h2>Intellectual property</h2>
      <p>Placeholder: ownership of site content and permitted use.</p>

      <h2>Disclaimers and limitation of liability</h2>
      <p>Placeholder: standard disclaimers, to be drafted by counsel.</p>

      <h2>Changes</h2>
      <p>Placeholder: how and when these terms change.</p>
    </ProsePage>
  )
}
