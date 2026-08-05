import { absoluteUrl } from '@/lib/site'

/** Served at /robots.txt. */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        /**
         * Do NOT add /pool-repair here. Blocking it in robots.txt prevents
         * crawlers from reading the page at all -- including its robots meta
         * tag -- so the page can never be indexed OR deliberately excluded.
         * Indexability is controlled per-page in app/pool-repair/page.js.
         */
        disallow: ['/api/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
