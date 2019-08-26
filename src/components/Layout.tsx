import React, { Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'

import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const GlobalStyled = createGlobalStyle`
  html, body, #___gatsby, div[role="group"][tabindex] {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: "Merriweather", Verdana, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.35;
    color: #121212;
  }

  div[role="group"][tabindex] {
    display: flex;
    flex-direction: column;
  }
`

const Main = styled.main`
  flex: 1 0 auto;
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
    <Fragment>
      <GlobalStyled />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Main>{children}</Main>
      <Footer />
    </Fragment>
  )
}

export default Layout
