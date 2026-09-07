import { absoluteUrl } from '@/lib/site'

/**
 * Served at /robots.txt.
 *
 * THE AI-CRAWLER DECISION, stated explicitly because it is a real strategic
 * choice and not a default:
 *
 * We ALLOW the answer-engine and AI training crawlers. For a review site,
 * being quotable inside an AI answer is a distribution channel, not a leak --
 * an answer engine that cannot read the page cannot cite the page, and an
 * uncited brand loses the referral entirely. The trade is that our text
 * trains models. For product reviews whose value is freshness and judgment
 * rather than a defensible corpus, that trade is worth taking.
 *
 * Reverse this ONLY as a deliberate business decision, not to "protect
 * content" -- blocking these crawlers removes us from AI answers without
 * gaining anything in classic search.
 *
 * Crawlers named individually rather than relying on `*` because several read
 * only their own user-agent block and ignore the wildcard.
 */
const AI_CRAWLERS = [
  'GPTBot', // OpenAI training
  'OAI-SearchBot', // ChatGPT search
  'ChatGPT-User', // ChatGPT browsing on a user's behalf
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini / AI Overviews grounding
  'Applebot-Extended',
  'CCBot', // Common Crawl
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
]

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        /**
         * Do NOT add real content routes here. Blocking a path in robots.txt
         * stops crawlers reading the page at all -- including its robots meta
         * tag -- so a page blocked here can never be deliberately noindexed
         * OR indexed. Indexability is controlled per-page from the `status`
         * field, via lib/seo.js.
         */
        disallow: ['/api/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/'],
      })),
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
