import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import type { PageProps } from 'gatsby';
import type { HomePageQuery } from '../../graphql-types';
import { StaticImage } from 'gatsby-plugin-image';

const IndexPage = ({ data }: PageProps<HomePageQuery>) => {
  return (
    <Layout>
      <SEO />
      {data.markdownRemark?.html && (
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      )}
      <StaticImage src="../images/valid.gif" alt="i'm valid" />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query HomePage {
    markdownRemark(frontmatter: { title: { eq: "home" } }) {
      html
    }
  }
`;
