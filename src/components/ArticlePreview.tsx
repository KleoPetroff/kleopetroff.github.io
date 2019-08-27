import React from 'react'
import { Link } from 'gatsby'
import { Post } from '../hooks/usePosts'
import styled from 'styled-components'
import Meta from './Meta'

interface ArticleProps {
  post: Post
}

const Wrapper = styled.article`
  margin-bottom: 50px;
`

const Title = styled.h2`
  font-size: 27px;
  font-weight: 900;
  margin: 0;
`

const TitleLink = styled(Link)`
  transition: all 0.2s ease-out;
  color: #121212;
  text-decoration: none;

  :hover {
    color: #2424ed;
  }
`

const Description = styled.div`
  line-height: 1.5;
  margin: 0.4em 0 0;
`

const ArticlePreview: React.FunctionComponent<ArticleProps> = ({ post }) => (
  <Wrapper>
    <Title>
      <TitleLink to={post.slug}>{post.title}</TitleLink>
    </Title>
    <Meta date={post.date} timeToRead={post.timeToRead} />
    <Description>{post.description}</Description>
  </Wrapper>
)

export default ArticlePreview
