import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Photo from '../components/photo';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { StaticImage } from 'gatsby-plugin-image';

const validBadge = require('../images/valid.gif');

const ProjectList = styled.ul`
  line-height: 1.5;
`;

export default function IndexPage() {
  return (
    <Layout>
      <SEO />
      <StaticImage src="../images/me.jpg" width={450} alt="it's me with a handsome romanesco" />
      <h1>Hi, my name is Aaron Petcoff</h1>
      <p>
        i'm a software engineer living in Brooklyn and i work at{' '}
        <a href="https://frame.io">Frame.io</a>, an <a href="https://www.adobe.com/">Adobe</a> company.
      </p>
      <p>
        i enjoy seeing live music, writing, and reading sci-fi, history, and
        poetry. i believe social, economic, and global justice are important.
      </p>
      <p>here are some things i've made recently</p>
      <ProjectList>
        <li>
          <a href="https://ughitsaaron.github.io/react-wasm-demo/">
            <strong>react wasm demo</strong>
          </a>{' '}
          – a very simple app to demo WebAssembly inside a React app (
          <a href="https://github.com/ughitsaaron/react-wasm-demo">source</a>)
        </li>
        <li>
          <a href="https://blacknoise.herokuapp.com">
            <strong>blacknoise 💀</strong>
          </a>{' '}
          – an offline-first web app that plays awful noises (
          <a href="https://github.com/ughitsaaron/blacknoise">source</a>)
        </li>
        <li>
          <a href="https://head-n-3340.herokuapp.com">
            <strong>
              <i>head -n 3340</i>
            </strong>
          </a>{' '}
          – a generative text art project (
          <a href="https://github.com/ughitsaaron/head-n-3340">source</a>)
          (exerpt{' '}
          <a href="http://www.gauss-pdf.com/post/166258256316/gpdf247-aaron-petcoff-head-n-3340">
            published by gauss pdf
          </a>
          )
        </li>
        <li>
          <a href="https://ughitsaaron.github.io/damn/">
            <strong>damn.</strong>
          </a>{' '}
          – an app for mimicking the cover of the kendrick lamar record (
          <a href="https://github.com/ughitsaaron/damn">source</a>)
        </li>
        <li>
          <a href="http://propertypraxis.org">
            <strong>property praxis</strong>
          </a>{' '}
          – an interactive map documenting property speculation in detroit (
          <a href="https://github.com/alexbhill/project-pip">source</a>)
        </li>
        <li>
          <a>
            <strong>bodega cats of nyc (w.i.p.)</strong>
          </a>{' '}
          – an interface for mapping &amp; rating the furry &amp; friendly
          felines of new york's most beloved &amp; bathroomless institution
        </li>
      </ProjectList>
      <p>
        you can find out more about me from{' '}
        <a href="https://www.github.com/ughitsaaron">my github</a> and{' '}
        <Link to="/resume">my resume</Link>.
      </p>
      <p>
        you can contact me thru electronic mail at{' '}
        <a href="mailto:hello [at] aaronpetcoff [dot] me">
          hello [at] aaronpetcoff [dot] me
        </a>{' '}
        or on twitter dot com at{' '}
        <a href="https://twitter.com/ughitsaaron">@ughitsaaron</a>.
      </p>
      <p>
        my pgp fingerprint is{' '}
        <a href="/keybase.html">
          A0AA AEA9 9F9E 2E9C 02F7 8B7D 2E8D 39DF 26A5 18BF
        </a>
      </p>
      <img src={validBadge} alt="i'm valid" />
    </Layout>
  );
}
