import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import Navigation from './Navigation'
import { routes } from '../constants/routes'

interface HeaderProps {
  siteTitle: string
}

const StyledHeader = styled.header`
  max-width: 960px;
  width: 80%;
  margin: 36px auto;
  display: flex;
  justify-content: space-between;

  @media all and (max-width: 949px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const Header: React.FunctionComponent<HeaderProps> = ({ siteTitle = '' }) => (
  <StyledHeader>
    <Logo siteTitle={siteTitle} />
    <Navigation routes={routes} />
  </StyledHeader>
)

export default Header
