import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import usePosts from '../hooks/usePosts'
import Articles from '../components/Articles'

const IndexPage = () => {
  const data = usePosts()

  return (
    <Layout>
      <SEO title="Home" />
      <Articles posts={data} />
    </Layout>
  )
}

export default IndexPage
