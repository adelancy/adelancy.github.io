import Link from 'next/link'
import { getSiteConfig } from '../lib/site'
import type { GetStaticProps } from 'next'
import type { PostData } from '../lib/posts'
import type { SiteConfig } from '../lib/site'

const TOPICS = [
  {
    title: 'Software Engineering',
    body: 'Design and architecture decisions, the tradeoffs behind them, and what actually holds up over time.'
  },
  {
    title: 'Technical Leadership',
    body: 'Growing engineers, running teams, and setting direction while the problem is still ambiguous.'
  },
  {
    title: 'Economics',
    body: 'Incentives and markets — and how much of an engineering organization they quietly explain.'
  },
  {
    title: 'Mathematics & Geometry',
    body: 'The part of my physics and math background I keep returning to for its own sake.'
  },
  {
    title: 'Aviation',
    body: 'Notes from a private pilot working on an instrument rating: procedure, judgment, and decisions under load.'
  }
]

// Post dates come from Jekyll front matter (e.g. "2016-05-13 00:11:53 -0500"),
// so parse defensively and fall back to the raw string.
function formatDate(value?: string) {
  if (!value) return ''
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

export default function Home({ posts, site }: { posts: PostData[]; site: SiteConfig }) {
  return (
    <div>
      <section className="hero">
        <div className="hero-inner">
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
            Seattle, Washington
          </p>
          <h1 className="hero-title mt-3">{site.title}</h1>
          <p className="hero-sub">
            Software development engineering manager. I write about building software, leading the
            teams that build it, and a few things I think about on my own time — economics,
            geometry, and flying.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/about"
              className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              More about me
            </Link>
            <a
              href="/feed.xml"
              className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              Subscribe via RSS
            </a>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-900">What I write about</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <li key={topic.title} className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{topic.title}</h3>
              <p className="mt-2 text-slate-600">{topic.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-900">Latest posts</h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-slate-600">
            Nothing published yet — the first posts are on their way.
          </p>
        ) : (
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <li key={p.slug} className="post-card">
                <Link
                  href={`/posts/${p.slug}`}
                  className="text-xl font-semibold text-slate-900 hover:text-slate-600"
                >
                  {p.meta.title}
                </Link>
                <div className="post-meta mt-2">{formatDate(p.meta.date)}</div>
                {p.meta.description && <p className="mt-3 text-slate-600">{p.meta.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postsModule = await import('../lib/posts')
  const posts = postsModule.getSortedPostsData()
  const site = getSiteConfig()
  return { props: { posts, site } }
}
