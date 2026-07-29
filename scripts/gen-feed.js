// Generates public/feed.xml from _config.yml and _posts so the published RSS
// feed always matches the real site metadata and post list.
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const matter = require('gray-matter')

const root = process.cwd()
const postsDir = path.join(root, '_posts')
const outPath = path.join(root, 'public', 'feed.xml')

const config = yaml.load(fs.readFileSync(path.join(root, '_config.yml'), 'utf8')) || {}
const siteUrl = String(config.url || '').replace(/\/$/, '')
const baseUrl = config.baseurl || ''
const title = String(config.title || '')
const description = String(config.description || '').replace(/\s+/g, ' ').trim()

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const toRfc822 = (value) => {
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed.toUTCString()
}

const posts = (fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : [])
  .filter((f) => /\.(md|markdown)$/.test(f))
  .map((fileName) => {
    const parsed = matter(fs.readFileSync(path.join(postsDir, fileName), 'utf8'))
    const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.(md|markdown)$/, '')
    return { slug, meta: parsed.data, excerpt: parsed.content.trim().split('\n\n')[0] || '' }
  })
  .sort((a, b) => String(b.meta.date || '').localeCompare(String(a.meta.date || '')))

const items = posts
  .map((post) => {
    const link = `${siteUrl}${baseUrl}/posts/${post.slug}`
    const pubDate = toRfc822(post.meta.date)
    return [
      '    <item>',
      `      <title>${escapeXml(post.meta.title || post.slug)}</title>`,
      `      <description>${escapeXml(post.meta.description || post.excerpt)}</description>`,
      `      <link>${escapeXml(link)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
      pubDate ? `      <pubDate>${pubDate}</pubDate>` : null,
      '    </item>'
    ]
      .filter(Boolean)
      .join('\n')
  })
  .join('\n')

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <description>${escapeXml(description)}</description>
    <link>${escapeXml(siteUrl + baseUrl)}/</link>
    <atom:link href="${escapeXml(siteUrl + baseUrl)}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, feed)

console.log(`gen-feed: wrote ${path.relative(root, outPath)} (${posts.length} post(s))`)
