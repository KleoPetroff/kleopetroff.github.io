import React, { Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'

import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  maxWidth?: number
}

interface MainProps {
  maxWidth: number
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
  
  code[class*="language-"],
  pre[class*="language-"] {
    font-size: 15px;
  }
`

const Main = styled.main<MainProps>`
  flex: 1 0 auto;
  max-width: ${props => props.maxWidth}px;
  margin: 60px auto 0;

  @media all and (max-width: 949px) {
    padding: 0 20px;
    text-align: center;
  }
`

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  maxWidth = 640
}) => {
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
      <Main maxWidth={maxWidth}>{children}</Main>
      <Footer />
    </Fragment>
  )
}

export default Layout
