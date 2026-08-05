/**
 * Interactive calculators. These are NOT MDX -- each is a React component
 * rendered by app/tools/[slug]/page.js. To add one: add an entry here and a
 * matching component under components/tools/, then register it in
 * components/tools/registry.js.
 */
export const tools = [
  {
    slug: 'pool-volume-calculator',
    title: 'Pool Volume Calculator',
    summary: 'Gallons for rectangular, round, and oval pools. Every dosing number depends on this one.',
    metaDescription:
      'Calculate your pool volume in gallons. Rectangular, round, oval, and variable-depth pools. Free, no signup.',
    status: 'planned',
  },
  {
    slug: 'chlorine-dosage-calculator',
    title: 'Chlorine Dosage Calculator',
    summary: 'How much liquid chlorine or cal-hypo to hit your target free chlorine.',
    metaDescription:
      'Work out exactly how much chlorine to add to your pool. Liquid, cal-hypo, dichlor, and trichlor, adjusted for volume.',
    status: 'planned',
  },
  {
    slug: 'saltwater-calculator',
    title: 'Saltwater Pool Salt Calculator',
    summary: 'Pounds of salt to bring a salt cell back into its operating range.',
    metaDescription:
      'Calculate how many pounds of pool salt to add to reach your salt cell target range, based on current ppm and pool volume.',
    status: 'planned',
  },
]

export const toolBySlug = Object.fromEntries(tools.map((t) => [t.slug, t]))
