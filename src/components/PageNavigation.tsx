import styled from 'styled-components'
import { Link, GatsbyLinkProps } from 'gatsby'
import React from 'react'

interface PageNavigationProps {
  isFirst: boolean
  isLast: boolean
  currentPage: number
}

interface PageButton {
  moveRight?: boolean
}

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const PageButton = styled(Link)<GatsbyLinkProps<{}> & PageButton>`
  width: 120px;
  font-size: 30px;
  color: #3e3e3e;
  text-align: center;
  border: 1px solid #b7b7b7;
  border-radius: 5px;
  text-decoration: none;
  margin-left: ${props => (props.moveRight ? 'auto' : null)};
  transition: all 0.2s ease-in;

  :hover {
    color: #121212;
    background: #fff;
    border-color: #121212;
  }
`

const PageNavigation: React.FunctionComponent<PageNavigationProps> = ({
  isFirst,
  isLast,
  currentPage
}) => (
  <NavigationWrapper>
    {!isFirst && (
      <PageButton to={currentPage === 2 ? '' : `page/${currentPage - 1}`}>
        ❮
      </PageButton>
    )}
    {!isLast && (
      <PageButton moveRight to={`page/${currentPage + 1}`}>
        ❯
      </PageButton>
    )}
  </NavigationWrapper>
)

export default PageNavigation
