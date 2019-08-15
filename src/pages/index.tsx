import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import usePosts from '../hooks/usePosts'
import Articles from '../components/Articles'
import PageNavigation from '../components/PageNavigation'

const IndexPage = () => {
  const posts = usePosts()
  const shouldRenderPageNavigation = posts.length > 10

  return (
    <Layout>
      <SEO title="Home" />
      <Articles posts={posts} />
      {shouldRenderPageNavigation && (
        <PageNavigation isFirst={true} isLast={false} currentPage={1} />
      )}
    </Layout>
  )
}

export default IndexPage
