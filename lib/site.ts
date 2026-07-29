// Site metadata. `data/site.json` is generated from `_config.yml` by
// `scripts/gen-site-config.js` (wired to predev/prebuild), so this module is a
// plain import with no environment branching — the server and the client always
// render identical values.
import siteData from '../data/site.json'

export type SiteConfig = {
  title?: string
  email?: string
  description?: string
  baseurl?: string
  url?: string
  twitter_username?: string
  github_username?: string
}

export function getSiteConfig(): SiteConfig {
  return siteData as SiteConfig
}
