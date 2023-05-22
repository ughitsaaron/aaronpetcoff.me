import React from 'react';
import { graphql } from 'gatsby';
import type { PageProps } from 'gatsby';
import type { BlogPostQuery } from '../graphql-types';

const BlogPost = ({ data, ...rest }: PageProps<BlogPostQuery>) => {
  return (
    <div>
      <h2>{data.markdownRemark.frontmatter.title}</h2>
      <h3>{data.markdownRemark.frontmatter.date}</h3>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </div>
  );
};

export default BlogPost;

export const query = graphql`
  query BlogPost($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(fromNow: true)
        title
      }
    }
  }
`;
