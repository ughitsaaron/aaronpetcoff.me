import React from 'react';
import { graphql, Link } from 'gatsby';
import type { PageProps } from 'gatsby';
import type { BlogPageQuery } from '../../../graphql-types';
import { StaticImage } from 'gatsby-plugin-image';

const BlogPage = ({ data }: PageProps<BlogPageQuery>) => {
  return (
    <>
      <h3>blog</h3>
      <ul>
        {data.allMarkdownRemark.edges.map((post) => (
          <li>
            <h4>
              <Link to={`/blog/`}>{post.node.frontmatter.title}</Link>
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
          frontmatter {
            date(fromNow: true)
            title
          }
          excerpt(truncate: true, pruneLength: 75)
        }
      }
    }
  }
`;
