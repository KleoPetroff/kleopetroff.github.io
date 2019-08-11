import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'

import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
}

const GlobalStyled = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;
    font-family: "Merriweather", Verdana, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.35;
    color: #121212;
  }
`

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyled />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
