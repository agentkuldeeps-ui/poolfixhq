import Hero from '@/components/home/Hero'
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
 *  2. SymptomIndex    the long tail, in the reader's own words
 *  3. FeaturedGuides  editorial picks
 *  4. SeasonalBlock   a reason to come back next quarter
 *  5. ToolsStrip      calculators
 *  6. RegionalFinder  climate silo entry point
 *  7. EmailCapture    owned audience (flag-gated until wired)
 *  8. RepairCTA       monetize the reader DIY did not solve
 *  9. TransparencyNote how we get paid, said before the footer
 *
 * <TrustStrip> is intentionally NOT rendered. The component and its data in
 * lib/authors.js still exist, but every stat in it was an unverified
 * placeholder and an unsubstantiated credibility claim is worse than none.
 * Fill in lib/authors.js with real, verifiable credentials, then re-add
 * <TrustStrip /> directly under <Hero />.
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
