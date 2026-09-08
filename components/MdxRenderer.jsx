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
        /**
         * next-mdx-remote v6 turns on `blockJS` by default, which injects a
         * remark plugin that STRIPS EVERY JSX EXPRESSION ATTRIBUTE from the
         * MDX. String and boolean attributes survive; anything written as
         * {...} is silently deleted.
         *
         * That default exists for sites compiling MDX submitted by untrusted
         * users, where an expression is arbitrary code execution. Our MDX is
         * authored in this repository, reviewed in the same pull request as
         * the components it calls, and never accepts outside input -- so the
         * threat it defends against does not exist here, while the cost is
         * enormous: <BeforeYouBuy rows={[...]}/>, <Scorecard notes={{...}}/>,
         * <ProsCons pros={[...]}/> and every other data-carrying component
         * renders empty with no error at all.
         *
         * `blockDangerousJS` stays on (its default), so eval-style calls are
         * still rejected. If MDX ever comes from outside this repo, this line
         * has to be reconsidered before that content is compiled.
         */
        blockJS: false,
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
