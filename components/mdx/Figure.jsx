/**
 * A captioned image.
 *
 * WHY THIS COMPONENT EXISTS RATHER THAN A BARE <img>:
 *
 *  ALT IS MANDATORY      Thrown at build time, not warned about. check-seo.mjs
 *                        also fails on a missing alt, but failing here names
 *                        the file and the caption, which is far easier to fix.
 *  NO CLS                width and height are required, so the browser
 *                        reserves the box before the file arrives. An image
 *                        without them is a layout shift, and layout shift is a
 *                        Core Web Vitals metric we are scored on.
 *  NO AMAZON IMAGES      Hotlinking Amazon product images without the Product
 *                        Advertising API is an Associates violation. The
 *                        compliance checker fails the build on it; this makes
 *                        it impossible to write in the first place.
 *  PROVENANCE            Every figure states what it is. A diagram we drew
 *                        from a manufacturer's published numbers is a
 *                        different kind of evidence than a photograph, and the
 *                        reader is entitled to know which they are looking at.
 *
 * `priority` marks the one image above the fold: it loads eagerly and is
 * fetched at high priority. Everything else is lazy. Using next/image would
 * add a client runtime and an optimisation endpoint for what are static SVGs
 * and PNGs we control, so a plain <img> is the right call here.
 */

const CREDIT = {
  diagram: 'PoolFixHQ diagram',
  chart: 'PoolFixHQ chart',
  photo: 'Photograph',
}

export default function Figure(props) {
  const {
    src,
    alt,
    caption,
    width,
    height,
    kind = 'diagram',
    source,
    priority = false,
    className = '',
  } = props
  if (!src) throw new Error('[Figure] src is required')
  if (!alt || alt.trim().length < 10) {
    throw new Error(
      `[Figure] "${src}" needs a real alt description (10+ chars). ` +
        'Describe what the image shows, not that it is an image.',
    )
  }
  if (!width || !height) {
    throw new Error(
      `[Figure] "${src}" needs explicit width and height, or it will shift layout. ` +
        `Got width=${JSON.stringify(width)} height=${JSON.stringify(height)}.`,
    )
  }
  if (/amazon\.|ssl-images-amazon|media-amazon|images-na\.ssl/i.test(src)) {
    throw new Error(
      `[Figure] "${src}" is an Amazon-hosted image. Serving those without the ` +
        'Product Advertising API breaks the Associates operating agreement.',
    )
  }

  return (
    <figure className={`not-prose my-8 ${className}`}>
      {/* A diagram drawn 960 wide, shrunk to fit a 341px phone, renders its
          17px labels at 6px. That is not a small image, it is an unreadable
          one. So below `sm` the figure keeps a legible minimum width and
          scrolls inside its own box -- the same bargain the comparison table
          makes -- and the hint below says so, because a picture cut off at the
          edge of the screen reads as broken rather than scrollable. */}
      <p className="mb-2 text-[13px] text-slate-500 sm:hidden" aria-hidden="true">
        Swipe the diagram sideways to see all of it.
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="block h-auto w-full min-w-[860px] sm:min-w-0"
        />
      </div>

      {(caption || source) && (
        <figcaption className="mt-2.5 text-[13.5px] leading-relaxed text-slate-500">
          {caption && <span className="text-slate-600">{caption}</span>}
          {caption && source && ' '}
          {source && (
            <span className="text-slate-500">
              {CREDIT[kind] ?? CREDIT.diagram}
              {typeof source === 'string' ? `, from ${source}.` : null}
              {source?.url ? (
                <>
                  , from{' '}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener nofollow"
                    className="underline hover:text-pool-700"
                  >
                    {source.title}
                  </a>
                  .
                </>
              ) : null}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
