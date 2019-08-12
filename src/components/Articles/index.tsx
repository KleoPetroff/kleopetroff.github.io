import React from 'react'
import { Post } from '../../hooks/usePosts'
import Article from './Article'
import styled from 'styled-components'

interface PostsProps {
  posts: Post[]
}

const ArticleWrapper = styled.div`
  max-width: 640px;
  margin: 80px auto 0;

  @media all and (max-width: 949px) {
    padding: 0 20px;
    text-align: center;
  }
`

const Articles: React.FunctionComponent<PostsProps> = ({ posts }) => (
  <ArticleWrapper>
    {posts.map(post => (
      <Article key={post.slug} post={post} />
    ))}
  </ArticleWrapper>
)

export default Articles
