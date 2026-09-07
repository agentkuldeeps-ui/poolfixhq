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
export const DEFAULT_AUTHOR = 'poolfixhq-editorial'

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
