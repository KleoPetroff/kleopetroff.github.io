import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = () => (
  <Layout>
    <SEO title="Archive - Kleo Petrov - JavaScript Developer" />
    <h1>Hi from About</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
