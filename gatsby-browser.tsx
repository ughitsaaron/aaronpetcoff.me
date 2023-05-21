import React from 'react';
import Layout from './src/layout';
import './src/style.css';

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
