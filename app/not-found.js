import Link from 'next/link'
import ProblemCards from '@/components/ProblemCards'

export const metadata = { title: 'Page Not Found' }

export default function NotFound() {
  return (
    <div className="container-page py-16 sm:py-24">
      <p className="text-sm font-bold uppercase tracking-widest text-pool-600">404</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-pool-900 sm:text-4xl">
        We could not find that page
      </h1>
      <p className="mt-4 max-w-xl text-lg text-slate-600">
        It may have moved. Start from a symptom instead — that is usually faster anyway.
      </p>

      <div className="mt-10">
        <ProblemCards />
      </div>

      <Link href="/" className="btn-secondary mt-10">
        Back to the homepage
      </Link>
    </div>
  )
}
