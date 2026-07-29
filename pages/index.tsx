import Link from 'next/link'
import { getSiteConfig } from '../lib/site'
import type { GetStaticProps } from 'next'

export default function Home({ posts, site }: { posts: any[]; site: any }) {
  return (
    <div>
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">{site.title}</h1>
          <p className="hero-sub">{site.description || 'Technology Executive & Writer'}</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug} className="post-card">
              <Link href={`/posts/${p.slug}`} className="text-xl font-semibold text-slate-900">
                {p.meta.title}
              </Link>
              <div className="post-meta mt-2">{p.meta.date}</div>
              <p className="mt-3 text-slate-600">{p.meta.description || ''}</p>
            </li>
          ))}
        </ul>
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
