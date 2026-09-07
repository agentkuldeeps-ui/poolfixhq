/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Plain JS + JSX. No TypeScript, and MDX is compiled through
  // next-mdx-remote rather than being a page extension, so a stray .mdx file
  // can never accidentally become a route.
  pageExtensions: ['js', 'jsx'],

  images: {
    formats: ['image/avif', 'image/webp'],
    // Amazon media hosts are declared but MUST NOT be used until Creators API
    // access is granted (10 qualifying sales in a rolling 30-day window;
    // PA-API v5 retired 15 May 2026). scripts/check-compliance.mjs fails the
    // build if a rendered page references them, so this entry is a
    // one-line switch for later rather than a licence to hotlink now.
    remotePatterns: [
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
      {
        // llms.txt is a plain-text file for AI crawlers; serve it as such
        // rather than letting the platform guess.
        source: '/llms.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
      },
    ]
  },
}

export default nextConfig
