import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import styled from 'styled-components'

interface PostTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
        date: string
      }
      body: string
    }
  }
}

const Post = styled.div`
  width: 640px;
  margin: 0 auto;
`

const PostTemplate: React.FunctionComponent<PostTemplateProps> = ({
  data: { mdx: post }
}) => (
  <Layout>
    <Post>
      <h1>{post.frontmatter.title}</h1>
      <div>{post.frontmatter.date}</div>
      <MDXRenderer>{post.body}</MDXRenderer>
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
    }
  }
`
