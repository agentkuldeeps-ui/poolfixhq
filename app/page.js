import Hero from '@/components/home/Hero'
import TrustStrip from '@/components/home/TrustStrip'
import SymptomIndex from '@/components/home/SymptomIndex'
import FeaturedGuides from '@/components/home/FeaturedGuides'
import SeasonalBlock from '@/components/home/SeasonalBlock'
import ToolsStrip from '@/components/home/ToolsStrip'
import RegionalFinder from '@/components/home/RegionalFinder'
import EmailCapture from '@/components/home/EmailCapture'
import RepairCTA from '@/components/home/RepairCTA'
import TransparencyNote from '@/components/home/TransparencyNote'
import JsonLd from '@/components/JsonLd'
import { site } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'
import { homeItemListSchema } from '@/lib/schema'

export const metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: '/',
})

/**
 * Regenerate daily so <SeasonalBlock> stays current without a manual redeploy.
 * Still served as static HTML from the edge -- this is ISR, not SSR, and the
 * page keeps its Static/SSG classification in the build output.
 */
export const revalidate = 86400

/**
 * SECTION ORDER IS THE ARGUMENT.
 *
 * A visitor arrives mid-problem, on a phone, standing next to a green pool.
 * Everything above the fold serves that person; everything below serves the
 * one whose problem was not one of the four.
 *
 *  1. Hero            the question + four taps to the four common failures
 *  2. TrustStrip      why believe a shock dosage from strangers
 *  3. SymptomIndex    the long tail, in the reader's own words
 *  4. FeaturedGuides  editorial picks
 *  5. SeasonalBlock   a reason to come back next quarter
 *  6. ToolsStrip      calculators
 *  7. RegionalFinder  climate silo entry point
 *  8. EmailCapture    owned audience (flag-gated until wired)
 *  9. RepairCTA       monetize the reader DIY did not solve
 * 10. TransparencyNote how we get paid, said before the footer
 *
 * Every section is a server component. The homepage ships no client JS of its
 * own -- that is the Core Web Vitals margin over the WordPress competition,
 * and it is easy to give away. Check the build output before adding anything.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={homeItemListSchema()} />

      <Hero />
      <TrustStrip />
      <SymptomIndex />
      <FeaturedGuides />
      <SeasonalBlock />
      <ToolsStrip />
      <RegionalFinder />
      <EmailCapture />
      <RepairCTA />
      <TransparencyNote />
    </>
  )
}
