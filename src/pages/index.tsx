import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import usePosts from '../hooks/usePosts'
import Articles from '../components/Articles'
import PageNavigation from '../components/PageNavigation'
import { POSTS_PER_PAGE } from '../constants/pages'

const IndexPage = () => {
  const posts = usePosts()
  const shouldRenderPageNavigation = posts.length > POSTS_PER_PAGE

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
