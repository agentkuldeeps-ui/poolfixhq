/**
 * The five content categories. `dir` maps 1:1 to a folder under /content
 * and to a top-level route segment. Adding a category means adding a folder,
 * an entry here, and an app/<route>/ directory.
 */
export const categories = [
  {
    slug: 'problems',
    dir: 'problems',
    label: 'Problems',
    title: 'Pool Problems',
    heading: 'Diagnose Your Pool Problem',
    description:
      'Something is wrong and you want to know what it is. Start here: symptom in, diagnosis and fix out.',
    metaDescription:
      'Diagnose common pool problems: green water, cloudy water, algae, stains, and low flow. Symptom-first guides with fixes ordered cheapest to hardest.',
  },
  {
    slug: 'equipment',
    dir: 'equipment',
    label: 'Equipment',
    title: 'Pool Equipment',
    heading: 'Pumps, Filters, Heaters, and Cleaners',
    description:
      'Repair guides for the hardware that keeps the water moving. Troubleshooting first, replacement last.',
    metaDescription:
      'Pool equipment repair guides for pumps, filters, heaters, salt cells, and cleaners. Troubleshoot before you replace.',
  },
  {
    slug: 'chemistry',
    dir: 'chemistry',
    label: 'Chemistry',
    title: 'Pool Chemistry',
    heading: 'Water Chemistry, Explained Without the Chemistry Degree',
    description:
      'What each number means, what happens when it drifts, and exactly how much of what to add.',
    metaDescription:
      'Pool water chemistry explained: chlorine, pH, alkalinity, cyanuric acid, and calcium hardness. What each number means and how to correct it.',
  },
  {
    slug: 'guides',
    dir: 'guides',
    label: 'Guides',
    title: 'How-To Guides',
    heading: 'Step-by-Step Pool Guides',
    description:
      'Seasonal routines and full procedures, start to finish, with the tools and time each one really takes.',
    metaDescription:
      'Step-by-step pool care guides: opening, closing, draining, acid washing, and routine maintenance schedules.',
  },
  {
    slug: 'regional',
    dir: 'regional',
    label: 'Regional',
    title: 'Regional Pool Care',
    heading: 'Pool Care by State',
    description:
      'Climate changes the playbook. Arizona sun burns off chlorine; Minnesota winters crack plumbing.',
    metaDescription:
      'State-by-state pool care guides. Climate-specific chemistry, season length, and the failures that show up most in your region.',
  },
]

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

/** Categories that appear as article hubs in the main nav (regional has its own index shape). */
export const articleCategories = categories.filter((c) => c.slug !== 'regional')
