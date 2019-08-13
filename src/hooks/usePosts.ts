import { graphql, useStaticQuery } from 'gatsby'

interface PostNotes {
  frontmatter: {
    title: string
    slug: string
    description: string
    date: string
  }
  excerpt: string
  timeToRead: number
}

interface GraphQLPosts {
  allMdx: {
    nodes: PostNotes[]
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
      allMdx {
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

  return data.allMdx.nodes.map(node => ({
    title: node.frontmatter.title,
    slug: node.frontmatter.slug,
    description: node.frontmatter.description,
    date: node.frontmatter.date,
    excerpt: node.excerpt,
    timeToRead: node.timeToRead
  }))
}

export default usePosts
