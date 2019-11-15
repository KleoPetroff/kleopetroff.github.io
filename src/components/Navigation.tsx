import React from 'react'
import styled, { css } from 'styled-components'
import { Route } from '../constants/routes'
import { Link } from 'gatsby'

interface NavigationProps {
  routes: Route[]
}

const BaseNavigationLinkStyles = css`
  margin: 0 20px;
  color: #121212;
  text-decoration: none;

  :hover {
    color: #2424ed;
  }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavLink = styled(Link)`
  ${BaseNavigationLinkStyles};
`

const ExternalLink = styled.a`
  ${BaseNavigationLinkStyles};
`

const Navigation: React.FunctionComponent<NavigationProps> = ({ routes }) => (
  <Nav>
    {routes.map((route, index) =>
      route.external ? (
        <ExternalLink
          href={route.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {route.name}
        </ExternalLink>
      ) : (
        <NavLink key={index} to={route.url}>
          {route.name}
        </NavLink>
      )
    )}
  </Nav>
)

export default Navigation
