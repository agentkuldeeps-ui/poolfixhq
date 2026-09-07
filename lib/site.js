/**
 * Single source of truth for site identity.
 *
 * Everything that ends up in a <meta> tag, a JSON-LD block, the RSS feed or
 * llms.txt reads from here, so the brand cannot say one thing in the header
 * and another in structured data.
 */
export const site = {
  name: 'PoolFixHQ',
  tagline: 'Pool gear, judged on the spec sheet.',

  /**
   * The meta description used sitewide. Kept under 155 characters because
   * that is where search results truncate -- scripts/check-seo.mjs warns if
   * it drifts over.
   */
  description:
    'Independent pool equipment reviews built from manufacturer specs and product labels, not retailer listings. We say when the cheaper option is right.',

  /**
   * The longer positioning statement, for the homepage hero and llms.txt.
   * Not a meta description -- it is allowed to be a full paragraph.
   */
  longDescription:
    'Independent pool product reviews built from manufacturer specifications, product labels and owner-reported failure patterns. We name what each product is actually for, and say plainly when the cheaper option is the right one.',

  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://poolfixhq.com').replace(/\/$/, ''),
  locale: 'en_US',
  language: 'en-US',
  twitter: '@poolfixhq',

  /** Feeds Organization schema and the footer. */
  publisher: {
    name: 'PoolFixHQ',
    logo: '/logo.png',
    logoWidth: 512,
    logoHeight: 512,
    email: 'hello@poolfixhq.com',
    foundingDate: '2026',
  },

  defaultOgImage: '/og-default.png',

  /**
   * Amazon Associates tracking tag. Every outbound Amazon link gets this
   * appended by <AffiliateButton>; a link without it earns nothing, and
   * scripts/check-compliance.mjs fails the build if one slips through.
   *
   * Set NEXT_PUBLIC_AMAZON_TAG in the environment. The fallback is a visibly
   * fake value so a missing env var shows up loudly in a link rather than
   * silently shipping an untagged one.
   */
  amazonTag: process.env.NEXT_PUBLIC_AMAZON_TAG || 'poolfixhq-TAG-NOT-SET-20',
}

/**
 * Feature flags for things that are built but not yet wired to a provider.
 * A dead form costs more trust than a missing one, so the section simply does
 * not render until the flag flips. Flip a flag only once the thing behind it
 * actually works.
 */
export const features = {
  /** Newsletter signup. Needs an email provider and a POST handler first. */
  emailCapture: false,
  /** Set true only after Amazon Creators API credentials are granted. */
  amazonImages: false,
}

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}
