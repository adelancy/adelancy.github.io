import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), '_posts')

export type PostMeta = {
  title: string
  date?: string
  description?: string
}

export type PostData = {
  slug: string
  meta: PostMeta
  contentHtml?: string
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    // derive slug: remove date prefix and extension
    const slug = fileName.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '').replace(/\.(md|markdown)$/, '')

    return {
      slug,
      meta: matterResult.data as PostMeta
    }
  })

  return allPostsData.sort((a, b) => (a.meta.date && b.meta.date ? (a.meta.date < b.meta.date ? 1 : -1) : 0))
}

export async function getPostData(slug: string): Promise<PostData> {
  // find file that ends with slug (after date)
  const fileNames = fs.readdirSync(postsDirectory)
  const fileName = fileNames.find((f) => f.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '').replace(/\.(md|markdown)$/, '') === slug)
  if (!fileName) throw new Error('Post not found: ' + slug)

  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    meta: matterResult.data as PostMeta,
    contentHtml
  }
}
