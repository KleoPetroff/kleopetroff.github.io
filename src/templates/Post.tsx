import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Meta from '../components/Meta'

interface PostTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
        date: string
      }
      body: string
      timeToRead: number
    }
  }
}

const Post = styled.div`
  width: 700px;
  margin: 0 auto;

  img,
  iframe {
    max-width: 100%;
  }
`

const Title = styled.div`
  margin-bottom: 0;
  font-size: 2.55em;
  font-weight: 900;
`

const Content = styled.div`
  font-size: 1.1em;
  line-height: 1.8;
`

const PostTemplate: React.FunctionComponent<PostTemplateProps> = ({
  data: { mdx: post }
}) => (
  <Layout>
    <Post>
      <Title>{post.frontmatter.title}</Title>
      <Meta timeToRead={post.timeToRead} date={post.frontmatter.date} />
      <Content>
        <MDXRenderer>{post.body}</MDXRenderer>
      </Content>
    </Post>
  </Layout>
)

export default PostTemplate

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      body
      timeToRead
    }
  }
`
