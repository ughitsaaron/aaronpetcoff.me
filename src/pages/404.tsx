import React from 'react';
import Layout from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';

export default function FourOhFourPage() {
  return (
    <Layout>
      <StaticImage src='../images/snowman.jpg' width={340} alt="it is my son don't you love him?" />
      <h1>wuh whoa</h1>
    </Layout>
  )
}
