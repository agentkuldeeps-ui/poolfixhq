/**
 * AUTHORS AND REVIEWERS -- the E-E-A-T layer.
 *
 * This file is the difference between a review site that ranks and one that
 * gets flattened by a core update. Google's guidance on reviews content asks,
 * in effect, "who did this, and what makes them able to say it?" A page
 * credited to an Organization answers neither question.
 *
 * ============================ THE HARD RULE ============================
 *
 * EVERY FIELD HERE MUST BE TRUE.
 *
 * Do not invent a person. Do not invent a certification, a job title, an
 * employer, a number of years, or a number of pools serviced. A fabricated
 * credential is worse than an absent one on every axis that matters: it is
 * dishonest to readers, it is the exact pattern manual reviewers look for,
 * and it is unrecoverable if found.
 *
 * `placeholder: true` marks an entry that has not been filled in with a real
 * person yet. While that flag is set:
 *   - the author's bio page is noindex
 *   - Person schema is NOT emitted for them
 *   - the build prints a warning
 *
 * That way the structure exists and the site builds, but we never publish a
 * credential claim we cannot stand behind. Remove the flag only when every
 * field below it is verifiable.
 * =======================================================================
 */
export const authors = [
  {
    slug: 'keaton-rhodes',
    placeholder: false,

    name: 'Keaton Rhodes',
    role: 'Pool Equipment Reviewer & Technical Editor',

    /**
     * NOTE FOR WHOEVER MAINTAINS THIS.
     *
     * Only two facts here were supplied: the name and the role. Everything
     * below is either derived from those or describes the review process,
     * which is verifiable from the site itself. Nothing has been invented --
     * no years of experience, no pools serviced, no employer, no
     * certifications, no location.
     *
     * `certifications` and `sameAs` are still empty and the build warns about
     * each until they are filled in with something checkable. `sameAs` matters
     * most: entity linkage to a real public profile is the majority of what
     * makes a Person credible to a search engine, and an unlinked name
     * establishes very little on its own.
     *
     * The photo is a real, supplied photograph of Keaton at an equipment pad,
     * not a stock portrait. That distinction is the whole reason this field
     * exists -- a stock headshot on a named reviewer is a fabricated
     * credential in image form, and a reverse image search finds it in
     * seconds. If this ever needs replacing, replace it with another real
     * photograph or set it back to null.
     */
    credential: 'Pool Equipment Reviewer & Technical Editor',

    bio:
      'Keaton Rhodes is the Pool Equipment Reviewer and Technical Editor at PoolFixHQ, ' +
      'specialising in residential pool pumps, filtration systems and equipment maintenance. ' +
      'Every review published here is built from manufacturer documentation rather than retailer ' +
      'listings, scored against the criteria published for its category before any product is ' +
      'judged, and checked claim by claim against its cited source before it goes live. ' +
      'Where a page has not been tested by hand it says so, and where the honest answer is to ' +
      'buy something cheaper or keep what you already own, it says that too.',

    expertise: ['pool-pumps', 'pool-filters', 'pool-cleaners', 'cleaning-tools'],

    certifications: [],

    /**
     * Entity linkage. These become schema.org `sameAs` and carry rel="me" in
     * the markup, which is what lets a search engine tie this Person to the
     * same person elsewhere rather than treating the byline as an unbacked
     * name.
     *
     * A URL here is a claim that the profile exists and belongs to this
     * person, so it must be checked by a human before it lands -- x.com
     * disallows crawlers in robots.txt, so nothing here can verify it
     * automatically. A `sameAs` pointing at a wrong or dead handle is worse
     * than an empty list: it is a broken identity claim rather than a missing
     * one.
     *
     * Worth adding when they exist: a LinkedIn profile, a business listing, an
     * industry directory entry. More corroborating profiles is the single
     * cheapest way to strengthen this.
     */
    sameAs: ['https://x.com/Keatonpoolguy'],

    /** Square. Byline avatar and Person schema `image`. */
    image: '/team/keaton-rhodes.jpg',

    /**
     * Optional. A photograph of this person doing the work they write about,
     * shown on their author page. On a site that does not bench-test, this is
     * the only first-hand evidence there is, so it is worth more here than a
     * studio portrait would be.
     */
    atWorkImage: '/team/keaton-rhodes-at-work.jpg',
    atWorkCaption:
      'Keaton servicing a pool pump and sand filter at an equipment pad.',

    jobTitle: 'Pool Equipment Reviewer & Technical Editor',
    worksFor: 'PoolFixHQ',
  },
  {
    slug: 'poolfixhq-editorial',
    placeholder: true,

    name: 'PoolFixHQ Editorial',
    role: 'Editorial team',

    /** One line, shown under the byline. Keep it factual. */
    credential: null,

    /** Longer bio for /authors/<slug>. */
    bio: 'Placeholder entry so the site builds before real bylines are configured. Replace with a named person: their actual role, actual credentials, and a real photo. Until `placeholder` is removed, this author emits no Person schema and their page is noindex.',

    /** Categories this person is qualified to write about. Used by the build. */
    expertise: [],

    /**
     * Verifiable credentials only. Each needs a name, the issuing body, and
     * ideally a URL where it can be checked. If it cannot be checked, it does
     * not belong here.
     */
    certifications: [],

    /** Public profiles. These become schema.org `sameAs` -- entity linkage. */
    sameAs: [],

    /** /public/team/<file>. 1:1 aspect, at least 400px. */
    image: null,

    jobTitle: null,
    worksFor: null,
  },
]

export const authorBySlug = Object.fromEntries(authors.map((a) => [a.slug, a]))

/** The default byline when frontmatter omits `author`. */
export const DEFAULT_AUTHOR = 'keaton-rhodes'

export function getAuthor(slug) {
  return authorBySlug[slug] ?? null
}

/** Real, publishable authors -- the ones that get Person schema and an index. */
export const publishedAuthors = authors.filter((a) => !a.placeholder)

/**
 * True when every author is still a placeholder, i.e. the site has no real
 * E-E-A-T signal at all. The build warns on this because it is the single
 * highest-value thing left undone, and it is easy to forget once the site
 * looks finished.
 */
export const hasNoRealAuthors = publishedAuthors.length === 0

/**
 * Advisory warnings, drained once per build by lib/content.js.
 * Deliberately warnings and not failures: an unfinished author list must not
 * stop a deploy, it must nag.
 */
export function authorWarnings() {
  const out = []

  if (hasNoRealAuthors) {
    out.push(
      '[authors] every author in lib/authors.js is still `placeholder: true`. ' +
        'No Person schema is being emitted anywhere on the site, and author pages are noindex. ' +
        'This is the biggest E-E-A-T gap on the site -- add one real, named person with verifiable credentials.',
    )
  }

  for (const a of publishedAuthors) {
    if (!a.credential)
      out.push(`[authors] "${a.name}" is published but has no credential line`)
    if (!a.image) out.push(`[authors] "${a.name}" is published but has no photo`)
    if (!a.bio || a.bio.length < 120)
      out.push(`[authors] "${a.name}" has a bio under 120 chars -- too thin to establish anything`)
    if (!a.sameAs?.length)
      out.push(
        `[authors] "${a.name}" has no sameAs profiles. Entity linkage is most of what makes a Person credible to a search engine.`,
      )
    if (!a.expertise?.length)
      out.push(`[authors] "${a.name}" has no declared expertise categories`)
  }

  return out
}

/**
 * A readable label for a `sameAs` profile URL.
 *
 * "x.com" is a poor link label -- it names the platform but not the account,
 * so it tells a reader nothing they can check and gives a screen reader user
 * a list of near-identical links. The handle is the useful part, because it
 * is what someone types to confirm the profile is really theirs.
 *
 * Falls back to the bare hostname for anything unrecognised rather than
 * guessing at a URL shape.
 */
const PROFILE_LABELS = [
  { host: /(^|\.)x\.com$/, network: 'X', handle: (p) => p.split('/')[1] },
  { host: /(^|\.)twitter\.com$/, network: 'X', handle: (p) => p.split('/')[1] },
  { host: /(^|\.)linkedin\.com$/, network: 'LinkedIn', handle: (p) => p.split('/')[2] },
  { host: /(^|\.)instagram\.com$/, network: 'Instagram', handle: (p) => p.split('/')[1] },
  { host: /(^|\.)youtube\.com$/, network: 'YouTube', handle: (p) => p.split('/')[1] },
  { host: /(^|\.)facebook\.com$/, network: 'Facebook', handle: (p) => p.split('/')[1] },
]

export function profileLabel(url) {
  let u
  try {
    u = new URL(url)
  } catch {
    return { network: url, handle: null }
  }

  const host = u.hostname.replace(/^www\./, '')
  const path = u.pathname.replace(/\/+$/, '')

  for (const m of PROFILE_LABELS) {
    if (!m.host.test(host)) continue
    const handle = m.handle(path)
    return { network: m.network, handle: handle ? `@${handle}` : null }
  }

  return { network: host, handle: null }
}
