import React from 'react';
import { graphql, Link } from 'gatsby';
import Footer from '../components/footer';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default function Blog({
  data: {
    allMarkdownRemark: { edges }
  }
}) {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => (
      <p>
        <Link to={edge.node.frontmatter.path}>
          {edge.node.frontmatter.title} - {edge.node.frontmatter.date}
        </Link>
      </p>
    ));

  return (
    <Layout>
      <SEO title="blog" />
      {Posts.length ? <div>{Posts}</div> : <h2>nothing to see here, yet</h2>}
      <Footer />
    </Layout>
  );
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            path
            title
            date
          }
        }
      }
    }
  }
`;
