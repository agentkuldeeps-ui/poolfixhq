import QuickAnswer from './QuickAnswer'
import Callout from './Callout'
import SafetyWarning from './SafetyWarning'
import TableOfContents from './TableOfContents'
import ProductBlock from './ProductBlock'
import ComparisonTable from './ComparisonTable'
import LeadFormCTA from './LeadFormCTA'
import RelatedPosts from './RelatedPosts'
import UncommonTip from './UncommonTip'
import FAQ from './FAQ'
import Sources from './Sources'

/**
 * The component map handed to MDXRemote.
 *
 * Some components need to know about the article they sit inside -- QuickAnswer
 * falls back to frontmatter, TableOfContents needs the parsed H2s, RelatedPosts
 * needs resolved articles. Rather than making authors pass that in from MDX,
 * we bind it here so content files stay declarative:
 *
 *     <QuickAnswer />
 *     <TableOfContents />
 *     <RelatedPosts />
 *
 * Any prop written in the MDX still wins over the bound default.
 */
export function mdxComponents({ article, related = [] } = {}) {
  return {
    QuickAnswer: (props) => <QuickAnswer answer={article?.quickAnswer} {...props} />,
    TableOfContents: (props) => <TableOfContents headings={article?.headings ?? []} {...props} />,
    RelatedPosts: (props) => <RelatedPosts posts={related} {...props} />,
    FAQ: (props) => <FAQ faqs={article?.faqs ?? []} {...props} />,
    Sources: (props) => <Sources sources={article?.sources ?? []} {...props} />,
    UncommonTip,
    Callout,
    SafetyWarning,
    ProductBlock,
    ComparisonTable,
    LeadFormCTA,
  }
}

export {
  QuickAnswer,
  Callout,
  SafetyWarning,
  TableOfContents,
  ProductBlock,
  ComparisonTable,
  LeadFormCTA,
  RelatedPosts,
  UncommonTip,
  FAQ,
  Sources,
}
