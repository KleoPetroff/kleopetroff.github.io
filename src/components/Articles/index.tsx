import React, { Fragment } from 'react'
import { Post } from '../../hooks/usePosts'
import Article from './Article'

interface PostsProps {
  posts: Post[]
}

const Articles: React.FunctionComponent<PostsProps> = ({ posts }) => (
  <Fragment>
    {posts.map(post => (
      <Article key={post.slug} post={post} />
    ))}
  </Fragment>
)

export default Articles
