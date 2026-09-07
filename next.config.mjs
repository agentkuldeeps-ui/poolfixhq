/**
 * Redirects from the retired editorial taxonomy to the product categories.
 *
 * Rules, per the conversion plan:
 *   - one hop, never a chain: every source lands on a final destination
 *   - specific article slugs are listed BEFORE the section catch-alls, because
 *     Next matches in array order and `/problems/:slug*` would otherwise
 *     swallow them
 *   - /tools/* and /pool-repair are deliberately absent -- those routes keep
 *     working unchanged, and adding them here would break the calculators
 *
 * The article slugs below are the complete set that was live or scaffolded at
 * conversion time. They are recoverable on the `archive/diagnostic-content`
 * branch if any of these ever need to come back.
 */

const article = (from, to) => ({ source: from, destination: to, permanent: true })

const redirects = [
  /* ---------------------------------------------------------- problems */
  article('/problems/green-pool-water', '/algaecides-treatments'),
  article('/problems/black-algae-in-pool', '/algaecides-treatments'),
  article('/problems/mustard-algae-in-pool', '/algaecides-treatments'),
  article('/problems/milky-white-pool-water', '/algaecides-treatments'),
  article('/problems/cloudy-pool-water', '/pool-filters'),
  article('/problems/pool-stains-identification', '/cleaning-tools'),
  article('/problems/foamy-pool-water', '/cleaning-tools'),
  article('/problems/waterline-scum-ring', '/cleaning-tools'),

  /* --------------------------------------------------------- equipment */
  article('/equipment/pump-not-priming', '/pool-pumps'),
  article('/equipment/pool-pump-not-turning-on', '/pool-pumps'),
  article('/equipment/pool-pump-loud-noise', '/pool-pumps'),
  article('/equipment/low-pool-flow', '/pool-pumps'),
  article('/equipment/air-in-pool-lines', '/pool-pumps'),
  article('/equipment/high-filter-pressure', '/pool-filters'),
  article('/equipment/pool-heater-not-heating', '/pool-heaters'),
  article('/equipment/salt-cell-errors', '/salt-systems'),
  article('/equipment/pool-cleaner-not-moving', '/pool-cleaners'),

  /* --------------------------------------------------------- chemistry */
  article('/chemistry/chlorine-basics', '/chlorine-shock'),

  /* ------------------------------------------------------------ guides */
  // Anything about closing, opening or winterizing goes to /winterizing;
  // everything else falls through to the catch-all below.
  article('/guides/pool-opening-checklist', '/winterizing'),

  /* ------------------------------------------------------ catch-alls */
  // Section indexes and any slug not named above.
  article('/problems', '/product-reviews'),
  article('/problems/:slug*', '/product-reviews'),
  article('/equipment', '/product-reviews'),
  article('/equipment/:slug*', '/product-reviews'),
  article('/chemistry', '/chlorine-shock'),
  article('/chemistry/:slug*', '/pool-balancers'),
  article('/guides', '/winterizing'),
  article('/guides/:slug*', '/product-reviews'),
  article('/regional', '/'),
  article('/regional/:state*', '/'),
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
    ],
  },
  async redirects() {
    return redirects
  },
}

export default nextConfig
