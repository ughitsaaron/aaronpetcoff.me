import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Footer from '../components/footer';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1.1rem;
  line-height: 1.5;
`;

export default function BlogTemplate({ data }) {
  const {
    markdownRemark: { frontmatter, html }
  } = data;

  return (
    <Layout>
      <Container>
        <h1>{frontmatter.title}</h1>
        <h3>{frontmatter.date}</h3>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
      <Footer />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        path
        title
      }
    }
  }
`;
