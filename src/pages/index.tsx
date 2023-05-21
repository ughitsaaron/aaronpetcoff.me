import React from 'react';
import { graphql } from 'gatsby';
import type { PageProps } from 'gatsby';
import type { HomePageQuery } from '../../graphql-types';
import { StaticImage } from 'gatsby-plugin-image';

const IndexPage = ({ data, path }: PageProps<HomePageQuery>) => {
  return (
    <>
      <img
        src={data.markdownRemark.frontmatter.image}
        width={460}
        height={460}
      />
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <StaticImage src="../images/valid.gif" alt="i'm valid" />
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query HomePage {
    markdownRemark(fileAbsolutePath: { regex: "/home/" }) {
      html
      frontmatter {
        image
      }
    }
  }
`;
