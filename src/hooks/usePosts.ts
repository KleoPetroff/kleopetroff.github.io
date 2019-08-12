import { graphql, useStaticQuery } from 'gatsby'

interface PostNotes {
  frontmatter: {
    title: string
    slug: string
    description: string
    date: string
  }
  excerpt: string
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
        }
      }
    }
  `)

  return data.allMdx.nodes.map(node => ({
    title: node.frontmatter.title,
    slug: node.frontmatter.slug,
    description: node.frontmatter.description,
    date: node.frontmatter.date,
    excerpt: node.excerpt
  }))
}

export default usePosts
