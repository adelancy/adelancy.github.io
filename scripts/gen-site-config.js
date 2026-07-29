// Generates data/site.json from _config.yml so the server and the client
// render from exactly the same site metadata. Run before `next dev`/`next build`.
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const root = process.cwd()
const configPath = path.join(root, '_config.yml')
const outPath = path.join(root, 'data', 'site.json')

const KEYS = [
  'title',
  'email',
  'description',
  'baseurl',
  'url',
  'twitter_username',
  'github_username'
]

const config = yaml.load(fs.readFileSync(configPath, 'utf8')) || {}

const site = {}
for (const key of KEYS) {
  const value = config[key]
  if (value === undefined || value === null) continue
  // YAML folded scalars (`>`) keep newlines; collapse them so the string is
  // byte-identical everywhere it is rendered.
  site[key] = typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(site, null, 2) + '\n')

console.log(`gen-site-config: wrote ${path.relative(root, outPath)}`)
