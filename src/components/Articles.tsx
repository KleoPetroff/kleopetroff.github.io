import React, { Fragment } from 'react'
import { Post } from '../hooks/usePosts'
import ArticlePreview from './ArticlePreview'

interface PostsProps {
  posts: Post[]
}

const Articles: React.FunctionComponent<PostsProps> = ({ posts }) => (
  <Fragment>
    {posts.map(post => (
      <ArticlePreview key={post.slug} post={post} />
    ))}
  </Fragment>
)

export default Articles
