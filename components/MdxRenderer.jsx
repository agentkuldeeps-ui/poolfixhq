import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { mdxComponents } from '@/components/mdx'

/**
 * Server-side MDX rendering. next-mdx-remote's RSC entrypoint compiles at
 * request time during the build, so pages stay fully static with no client
 * JavaScript for the article body.
 *
 * rehype-slug gives every H2/H3 an id; the ids it generates are mirrored by
 * slugifyHeading() in lib/content.js so TableOfContents anchors always resolve.
 */
export default function MdxRenderer({ source, article, related }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents({ article, related })}
      options={{
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: 'wrap',
                properties: { className: 'no-underline hover:underline' },
              },
            ],
          ],
        },
      }}
    />
  )
}
