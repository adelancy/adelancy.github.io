import { GetStaticPaths, GetStaticProps } from 'next'

export default function Post({ post }: { post: any }) {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">{post.meta.title}</h1>
      <div className="text-sm text-slate-500 mb-6">{post.meta.date}</div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsModule = await import('../../lib/posts')
  const posts = postsModule.getSortedPostsData()
  const paths = posts.map((p) => ({ params: { slug: p.slug } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const postsModule = await import('../../lib/posts')
  const post = await postsModule.getPostData(slug)
  return { props: { post } }
}
