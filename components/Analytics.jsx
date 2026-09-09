import Script from 'next/script'
import { site } from '@/lib/site'

/**
 * Google Analytics 4.
 *
 * WHAT THIS COSTS, STATED PLAINLY.
 *
 * This site's performance argument is that article bodies ship as HTML with
 * essentially no client JavaScript. gtag.js is roughly 50KB gzipped and is by
 * some margin the largest script on the site -- it is now the performance
 * budget. `afterInteractive` is what keeps that honest: the script loads
 * after hydration rather than blocking first paint, so it costs bandwidth and
 * main-thread time but not Largest Contentful Paint. Do not move it to
 * `beforeInteractive` for any reason; that trades a Core Web Vitals metric
 * we are ranked on for a few milliseconds of measurement accuracy.
 *
 * DEVELOPMENT IS EXCLUDED. Local page views are still page views to GA, and a
 * handful of developer sessions meaningfully distorts the numbers on a site
 * with low traffic -- which is exactly the situation this site is in, and
 * exactly when the numbers matter most for deciding what to write next.
 *
 * ROUTE CHANGES NEED NO CODE HERE, and this was verified rather than assumed.
 *
 * App Router navigates via the History API without a document load, so it is
 * a reasonable worry that gtag never sends another page_view. GA4's Enhanced
 * Measurement setting "Page changes based on browser history events" covers
 * it and is on by default. Collect requests on this site were inspected and
 * carry `_ee=1` with the correct `dl` (page_location) and `dt` (page_title)
 * for the DESTINATION page after a client-side navigation -- so the built-in
 * is working and there is nothing to add.
 *
 * A hand-rolled route tracker WAS written here and then deleted. With it in
 * place, a navigation produced TWO page_view hits carrying identical URL and
 * title -- one `_ee=1` from Enhanced Measurement, one from the tracker. That
 * is not a harmless duplicate: it doubles every internal page view, which is
 * a worse failure than under-counting because the inflated numbers still look
 * plausible.
 *
 * Do not add route-change tracking here without first checking a real collect
 * request for `_ee=1`. And verify in GA4 Realtime or DebugView, not by
 * counting network entries in the browser: GA batches events and sends them
 * with `sendBeacon`, so request counts in `performance.getEntriesByType` do
 * not map one-to-one onto page views and will mislead you in both directions.
 *
 * If page views ever do appear to count entry pages only, the setting to
 * check is Admin -> Data streams -> the web stream -> Enhanced measurement,
 * not this file.
 */
export default function Analytics() {
  // No ID configured, or a local/preview build: render nothing at all rather
  // than a script tag pointing at an empty property.
  if (!site.gaId || process.env.NODE_ENV !== 'production') return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');`}
      </Script>
    </>
  )
}
