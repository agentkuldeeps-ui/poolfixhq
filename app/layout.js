import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import Analytics from '@/components/Analytics'
import { site } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'
import { websiteSchema } from '@/lib/schema'

/**
 * Root metadata. `title.template` is the ONLY place the site name gets
 * appended to a page title -- lib/seo.js returns bare titles so this runs
 * exactly once. See the note in lib/seo.js before changing either.
 */
export const metadata = {
  ...buildMetadata({
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    path: '/',
  }),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  applicationName: site.name,
  authors: [{ name: site.publisher.name, url: site.url }],
  creator: site.publisher.name,
  publisher: site.publisher.name,
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: site.url,
    types: { 'application/rss+xml': `${site.url}/feed.xml` },
  },
}

export const viewport = {
  themeColor: '#0C4E6E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body className="flex min-h-screen flex-col">
        {/* Organization + WebSite, emitted once for the whole site. Page-level
            schema is added by each route on top of this. */}
        <JsonLd data={websiteSchema()} />

        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        {/* Last in the body, and afterInteractive, so measurement never
            competes with rendering the page. Renders nothing outside
            production -- see components/Analytics.jsx. */}
        <Analytics />
      </body>
    </html>
  )
}
