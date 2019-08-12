import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'

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

const Main = styled.main`
  max-width: 640px;
  margin: 80px auto 0;

  @media all and (max-width: 949px) {
    padding: 0 20px;
    text-align: center;
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
      <Main>{children}</Main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}

export default Layout
