import React from 'react';
import { graphql, Link } from 'gatsby';
import type { PageProps } from 'gatsby';
import type { BlogPageQuery } from '../../../graphql-types';

const BlogPage = ({ data }: PageProps<BlogPageQuery>) => {
  return (
    <>
      <h3>blog</h3>
      <ul className="blog">
        {data.allMarkdownRemark.edges.map((post) => (
          <li key={post.node.id}>
            <h4>
              <Link to={post.node.fields.slug}>
                {post.node.frontmatter.title}
              </Link>
            </h4>
            <h5>{post.node.frontmatter.date}</h5>
            <p>{post.node.excerpt}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogPage;

export const query = graphql`
  query BlogPage {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/blog/" } }) {
      edges {
        node {
          id
          frontmatter {
            date(fromNow: true)
            title
          }
          fields {
            slug
          }
          excerpt(truncate: true, pruneLength: 75)
        }
      }
    }
  }
`;
