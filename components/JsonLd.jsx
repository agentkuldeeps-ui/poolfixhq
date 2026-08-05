/**
 * Renders a JSON-LD block. Next.js recommends a plain <script> with
 * dangerouslySetInnerHTML for structured data in the App Router; the content is
 * generated from our own data, never user input.
 */
export default function JsonLd({ data }) {
  if (!data) return null
  const payload = Array.isArray(data) ? data : [data]

  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}
