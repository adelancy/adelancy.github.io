import { getSiteConfig } from '../lib/site'
import IconGithub from './IconGithub'
import IconTwitter from './IconTwitter'

const Footer: React.FC = () => {
  const site = getSiteConfig()
  return (
    <footer className="site-footer border-t">
      <div className="wrapper py-6">
        <h2 className="footer-heading text-xl font-semibold">{site.title}</h2>

        <div className="footer-col-wrapper mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <ul>
              <li>{site.title}</li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <ul className="flex gap-4">
              {site.github_username && (
                <li>
                  <IconGithub username={site.github_username} />
                </li>
              )}
              {site.twitter_username && (
                <li>
                  <IconTwitter username={site.twitter_username} />
                </li>
              )}
            </ul>
          </div>

          <div>
            <p>{site.description}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
