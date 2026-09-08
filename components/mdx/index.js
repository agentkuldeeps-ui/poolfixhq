import AnswerBlock from '../AnswerBlock'
import AffiliateButton from './AffiliateButton'
import AffiliateDisclosure from './AffiliateDisclosure'
import BeforeYouBuy from './BeforeYouBuy'
import ComparisonTable from './ComparisonTable'
import EvidenceNote from './EvidenceNote'
import FAQ from './FAQ'
import KeyTakeaways from './KeyTakeaways'
import PlannedLink from './PlannedLink'
import ProsCons from './ProsCons'
import QuickVerdict from './QuickVerdict'
import RatingBadge from './RatingBadge'
import SafetyWarning from './SafetyWarning'
import Scorecard from './Scorecard'
import Sources from './Sources'
import SpecTable from './SpecTable'
import TableOfContents from './TableOfContents'
import TechNote from './TechNote'
import TechnicalDetails from './TechnicalDetails'
import ThingsBuyersMiss from './ThingsBuyersMiss'
import VerdictBox from './VerdictBox'
import WhoFor from './WhoFor'
import { categoryBySlug } from '@/lib/taxonomy'

/**
 * The component map handed to MDXRemote.
 *
 * Several components need to know about the page they sit inside -- FAQ and
 * Sources read frontmatter, TableOfContents needs the parsed headings,
 * Scorecard needs the score breakdown and the category's published weights.
 * Rather than making every MDX file pass that in by hand, it is bound here so
 * content stays declarative:
 *
 *     <QuickVerdict>…</QuickVerdict>
 *     <Scorecard />
 *     <ThingsBuyersMiss />
 *     <FAQ />
 *
 * Any prop written explicitly in the MDX still wins over the bound default, so
 * a roundup can do <VerdictBox product={…} /> once per section.
 */
export function mdxComponents({ article } = {}) {
  const categoryLabel = categoryBySlug[article?.category]?.label

  return {
    AnswerBlock: (props) => <AnswerBlock answer={article?.answer} {...props} />,
    TableOfContents: (props) => <TableOfContents headings={article?.headings ?? []} {...props} />,
    VerdictBox: (props) => <VerdictBox product={article?.products?.[0]} {...props} />,
    QuickVerdict: (props) => (
      <QuickVerdict article={article} categoryLabel={categoryLabel} {...props} />
    ),
    Scorecard: (props) => <Scorecard article={article} {...props} />,
    ThingsBuyersMiss: (props) => <ThingsBuyersMiss article={article} {...props} />,
    FAQ: (props) => <FAQ faqs={article?.faqs ?? []} {...props} />,
    Sources: (props) => <Sources sources={article?.sources ?? []} {...props} />,
    ComparisonTable: (props) => <ComparisonTable rows={article?.products ?? []} {...props} />,

    AffiliateButton,
    AffiliateDisclosure,
    BeforeYouBuy,
    EvidenceNote,
    KeyTakeaways,
    PlannedLink,
    ProsCons,
    RatingBadge,
    SafetyWarning,
    SpecTable,
    TechNote,
    TechnicalDetails,
    WhoFor,
  }
}

export {
  AnswerBlock,
  AffiliateButton,
  AffiliateDisclosure,
  BeforeYouBuy,
  ComparisonTable,
  EvidenceNote,
  FAQ,
  KeyTakeaways,
  PlannedLink,
  ProsCons,
  QuickVerdict,
  RatingBadge,
  SafetyWarning,
  Scorecard,
  Sources,
  SpecTable,
  TableOfContents,
  TechNote,
  TechnicalDetails,
  ThingsBuyersMiss,
  VerdictBox,
  WhoFor,
}
