import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { getSiteConfig } from '../lib/site'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const site = getSiteConfig()
  return (
    <div>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
      </Head>
      <Header />

      <main className="wrapper py-8">{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
