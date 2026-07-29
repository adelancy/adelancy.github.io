import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Adelancy — Personal Website</title>
        <meta name="description" content="Personal website and blog" />
      </Head>
      <Header />

      <main className="wrapper py-8">{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
