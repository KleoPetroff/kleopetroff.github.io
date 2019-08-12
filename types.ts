declare module '*.png'
declare module 'gatsby-plugin-mdx'

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}
