import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import usePosts from '../hooks/usePosts'
import Articles from '../components/Articles'
import PageNavigation from '../components/PageNavigation'

const IndexPage = () => {
  const data = usePosts()

  return (
    <Layout>
      <SEO title="Home" />
      <Articles posts={data} />
      <PageNavigation isFirst={true} isLast={false} currentPage={1} />
    </Layout>
  )
}

export default IndexPage
