import Link from 'next/link'
import { getSiteConfig } from '../lib/site'

const Header: React.FC = () => {
  const site = getSiteConfig()
  return (
    <header className="site-header border-b">
      <div className="wrapper py-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold">
          {site.title || 'Site'}
        </Link>

        <nav>
          <Link href="/about" className="mr-4 page-link">
            About
          </Link>
          <Link href="/" className="page-link">
            Posts
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
