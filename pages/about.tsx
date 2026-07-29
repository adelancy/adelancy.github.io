import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { GetStaticProps } from 'next'

export default function About({ contentHtml }: { contentHtml: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const aboutPath = path.join(process.cwd(), 'about.md')
  const fileContents = fs.readFileSync(aboutPath, 'utf8')
  const matterResult = matter(fileContents)

  // remove simple Jekyll/Liquid includes and tags for static export
  const cleaned = matterResult.content.replace(/\{\%[^%]*\%\}/g, '')

  const processedContent = await remark().use(html).process(cleaned)
  const contentHtml = processedContent.toString()

  return { props: { contentHtml } }
}
