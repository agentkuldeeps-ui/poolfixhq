import AnswerBlock from '../AnswerBlock'
import AffiliateButton from './AffiliateButton'
import AffiliateDisclosure from './AffiliateDisclosure'
import ComparisonTable from './ComparisonTable'
import FAQ from './FAQ'
import KeyTakeaways from './KeyTakeaways'
import ProsCons from './ProsCons'
import RatingBadge from './RatingBadge'
import SafetyWarning from './SafetyWarning'
import Sources from './Sources'
import SpecTable from './SpecTable'
import TableOfContents from './TableOfContents'
import TechNote from './TechNote'
import VerdictBox from './VerdictBox'

/**
 * The component map handed to MDXRemote.
 *
 * Several components need to know about the page they sit inside -- FAQ and
 * Sources read frontmatter, TableOfContents needs the parsed headings,
 * VerdictBox usually wants products[0]. Rather than making every MDX file
 * pass that in by hand, we bind it here so content stays declarative:
 *
 *     <AnswerBlock />
 *     <TableOfContents />
 *     <VerdictBox />
 *     <FAQ />
 *     <Sources />
 *
 * Any prop written explicitly in the MDX still wins over the bound default,
 * so a roundup can do <VerdictBox product={...} /> per section.
 */
export function mdxComponents({ article } = {}) {
  return {
    AnswerBlock: (props) => <AnswerBlock answer={article?.answer} {...props} />,
    TableOfContents: (props) => <TableOfContents headings={article?.headings ?? []} {...props} />,
    VerdictBox: (props) => <VerdictBox product={article?.products?.[0]} {...props} />,
    FAQ: (props) => <FAQ faqs={article?.faqs ?? []} {...props} />,
    Sources: (props) => <Sources sources={article?.sources ?? []} {...props} />,
    ComparisonTable: (props) => <ComparisonTable rows={article?.products ?? []} {...props} />,

    AffiliateButton,
    AffiliateDisclosure,
    KeyTakeaways,
    ProsCons,
    RatingBadge,
    SafetyWarning,
    SpecTable,
    TechNote,
  }
}

export {
  AnswerBlock,
  AffiliateButton,
  AffiliateDisclosure,
  ComparisonTable,
  FAQ,
  KeyTakeaways,
  ProsCons,
  RatingBadge,
  SafetyWarning,
  Sources,
  SpecTable,
  TableOfContents,
  TechNote,
  VerdictBox,
}
