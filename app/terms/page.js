import Link from 'next/link'
import ProsePage from '@/components/ProsePage'
import { site } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Terms for using PoolFixHQ, including the limits of the guidance published here.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Terms of Use"
      description="The terms you accept by using this site."
      updated="2026-09-07"
    >
      <h2>Acceptance</h2>

      <p>By using {site.name} you accept these terms. If you do not accept them, do not use the site.</p>

      <h2>What this site is, and is not</h2>

      <p>
        {site.name} publishes general information about swimming pool equipment and chemicals. It
        is <strong>not</strong> professional advice, and using it does not create a
        professional relationship of any kind.
      </p>

      <p>
        Pools involve chemicals that can injure you, electrical equipment around water, gas
        appliances, and pressure vessels that can fail violently. Specific circumstances vary and
        we cannot see yours. You are responsible for the work you carry out on your own equipment.
      </p>

      <h3>Two rules that override anything on this site</h3>

      <ul>
        <li>
          <strong>The product label wins.</strong> For any chemical, follow the manufacturer&rsquo;s
          label. Where this site and a label disagree, the label is correct.
        </li>
        <li>
          <strong>Licensed work needs a licensed person.</strong> Gas, electrical and structural
          work is regulated in most jurisdictions. Nothing here authorises you to do it.
        </li>
      </ul>

      <h2>Accuracy</h2>

      <p>
        We work from manufacturer documentation and take accuracy seriously — see our{' '}
        <Link href="/editorial-policy">editorial policy</Link>. Even so, specifications change,
        products are revised, and mistakes happen. Content is provided &ldquo;as is&rdquo; with no
        warranty that it is complete, current or fit for your particular pool. Always check the
        documentation supplied with your own equipment.
      </p>

      <h2>Affiliate links</h2>

      <p>
        This site earns commission on qualifying purchases made through its links. See the{' '}
        <Link href="/affiliate-disclosure">affiliate disclosure</Link>. Your purchase is a contract
        between you and the retailer; we are not party to it and cannot help with orders, delivery,
        returns or warranty claims.
      </p>

      <h2>Third-party sites</h2>

      <p>
        We link to manufacturers, retailers and public-health bodies. We do not control those sites
        and are not responsible for their content or practices.
      </p>

      <h2>Limitation of liability</h2>

      <p>
        To the fullest extent permitted by law, {site.name} is not liable for any loss, injury or
        damage arising from use of this site or reliance on its content, including damage to
        property or equipment.
      </p>

      <h2>Intellectual property</h2>

      <p>
        Text, layout and original graphics on this site belong to {site.name}. You may quote short
        passages with attribution and a link. Wholesale reproduction is not permitted. Product
        names and trademarks belong to their respective owners and are used for identification
        only, which does not imply any affiliation or endorsement.
      </p>

      <h2>Changes</h2>

      <p>
        These terms may change. The last-reviewed date below reflects the current version, and
        continued use after a change means you accept it.
      </p>

      <h2>Contact</h2>

      <p>
        <a href={`mailto:${site.publisher.email}`}>{site.publisher.email}</a>
      </p>
    </ProsePage>
  )
}
