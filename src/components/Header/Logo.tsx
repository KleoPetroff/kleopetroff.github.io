import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import hashnodeLogo from '../../images/hashnode.png'

interface LogoProps {
  siteTitle: string
}

const Section = styled.section`
  display: flex;
  flex-direction: column;

  @media all and (max-width: 949px) {
    margin-bottom: 30px;
    align-items: center;
    text-align: center;
  }
`

const LogoText = styled(Link)`
  font-size: 2.3em;
  font-weight: 900;
  color: #121212;
  text-decoration: none;
`

const HashnodeLink = styled.a`
  height: 25px;
  padding-left: 28px;
  color: #00b8d3;
  line-height: 2;
  font-size: 0.9em;
  background-image: url(${hashnodeLogo});
  background-repeat: no-repeat;
  background-position: left center;
  text-decoration: none;

  @media all and (max-width: 949px) {
    background: none;
    padding-left: 0;
  }
`

const Logo: React.FunctionComponent<LogoProps> = ({ siteTitle }) => (
  <Section>
    <LogoText className="logo" to="/" title="Logo text">
      {siteTitle}
    </LogoText>
    <HashnodeLink
      rel="noreferrer noopener"
      className="hashnode"
      target="_blank"
      href="https://hashnode.com/@Kleo"
    >
      Hashnode Evangelist and Top Contributor
    </HashnodeLink>
  </Section>
)

export default Logo
