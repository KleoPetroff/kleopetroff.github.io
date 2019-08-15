import React from 'react'
import styled from 'styled-components'
import { Route } from '../constants/routes'
import { Link } from 'gatsby'

interface NavigationProps {
  routes: Route[]
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavLink = styled(Link)`
  margin: 0 20px;
  color: #121212;
  text-decoration: none;

  :hover {
    color: #2424ed;
  }
`

const Navigation: React.FunctionComponent<NavigationProps> = ({ routes }) => (
  <Nav>
    {routes.map((route, index) => (
      <NavLink key={index} to={route.url}>
        {route.name}
      </NavLink>
    ))}
  </Nav>
)

export default Navigation
