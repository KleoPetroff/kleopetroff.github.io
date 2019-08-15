import { graphql, useStaticQuery } from 'gatsby'
import { buildArticlePreview } from '../utils/helpers'

export interface PostNote {
  frontmatter: {
    title: string
    slug: string
    description: string
    date: string
  }
  excerpt: string
  timeToRead: number
}

export interface GraphQLPosts {
  allMdx: {
    nodes: PostNote[]
  }
}

export interface Post {
  title: string
  slug: string
  description: string
  date: string
  excerpt: string
  timeToRead: number
}

const usePosts = (): Post[] => {
  const data: GraphQLPosts = useStaticQuery(graphql`
    query Posts {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 10) {
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
  `)

  return data.allMdx.nodes.map(buildArticlePreview)
}

export default usePosts
