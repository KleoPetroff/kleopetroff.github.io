import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import UnderConstruction from '../components/UnderConstruction'
import { ABOUT_PAGE_MAX_WIDTH } from '../constants/pages'

const SecondPage = () => (
  <Layout maxWidth={ABOUT_PAGE_MAX_WIDTH}>
    <SEO title="About - Kleo Petrov - JavaScript Developer" />
    <UnderConstruction />
  </Layout>
)

export default SecondPage
