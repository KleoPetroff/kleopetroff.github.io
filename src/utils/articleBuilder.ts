import { Post, PostNote } from '../hooks/usePosts'

export const buildArticlePreview = (node: PostNote): Post => ({
  title: node.frontmatter.title,
  slug: node.frontmatter.slug,
  description: node.frontmatter.description,
  date: node.frontmatter.date,
  excerpt: node.excerpt,
  timeToRead: node.timeToRead
})
