import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { mdxComponents } from '@/components/mdx'

/**
 * Compiles an MDX body on the server. Article bodies ship as HTML with zero
 * client JavaScript, which is the Core Web Vitals margin over the WordPress
 * competition and is easy to give away by accident.
 *
 * rehype-slug gives every heading a stable id (matched by
 * lib/content.js slugifyHeading, which the TOC relies on) and
 * rehype-autolink-headings makes each one linkable -- deep links into a
 * specific section are what get cited.
 */
export default function MdxRenderer({ source, article }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents({ article })}
      options={{
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
