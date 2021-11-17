/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 960px;
  margin: auto;
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 1.1rem;
  color: #212121;
  background-color: #fefefe;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
