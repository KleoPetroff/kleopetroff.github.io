import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Article from '../components/Articles/Article'
import { GraphQLPosts } from '../hooks/usePosts'
import { buildArticlePreview } from '../utils/helpers'
import PageNavigation from '../components/PageNavigation'

interface PostListProps {
  data: GraphQLPosts
  pageContext: {
    currentPage: number
    numberOfPages: number
  }
}

const PostList: React.FunctionComponent<PostListProps> = props => {
  const posts = props.data.allMdx.nodes.map(buildArticlePreview)
  const { currentPage, numberOfPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages

  return (
    <Layout>
      {posts.map(post => (
        <Article key={post.slug} post={post} />
      ))}

      <PageNavigation
        isFirst={isFirst}
        isLast={isLast}
        currentPage={currentPage}
      />
    </Layout>
  )
}

export const query = graphql`
  query PostListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        frontmatter {
          title
          slug
          description
          date
        }
        excerpt
        timeToRead
      }
    }
  }
`
export default PostList
