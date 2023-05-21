import React from 'react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import type { ResumePageQuery } from '../../graphql-types';

const Resume = ({ path, data }: PageProps<ResumePageQuery>) => {
  return (
    <>
      <img
        src={data.markdownRemark.frontmatter.image}
        width={460}
        height={460}
      />
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </>
  );
};

export default Resume;

export const query = graphql`
  query ResumePage {
    markdownRemark(fileAbsolutePath: { regex: "/resume/" }) {
      html
      frontmatter {
        image
      }
    }
  }
`;
