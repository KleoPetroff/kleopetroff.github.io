exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic('Failed to create posts', result.errors)
  }

  const posts = result.data.allMdx.nodes

  posts.forEach(post => {
    actions.createPage({
      path: post.frontmatter.slug,
      component: require.resolve('./src/templates/Post.tsx'),
      context: {
        slug: post.frontmatter.slug
      }
    })
  })

  const postsPerPage = 1
  const numberOfPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numberOfPages }).forEach((_, index) => {
    const isFirstPage = index === 0
    const currentPage = index + 1

    if (isFirstPage) return

    actions.createPage({
      path: `/page/${currentPage}`,
      component: require.resolve('./src/templates/PostList.tsx'),
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        currentPage,
        numberOfPages
      }
    })
  })
}
