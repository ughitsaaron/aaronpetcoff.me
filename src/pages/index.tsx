import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { StaticImage } from 'gatsby-plugin-image';

const ProjectList = styled.ul`
  line-height: 1.5;
`;

export default function IndexPage() {
  return (
    <Layout>
      <SEO />
      <StaticImage src="../images/me.jpg" width={450} alt="it's a me" />
      <h1>Hello, my name is Aaron Petcoff.</h1>
      <p>
        i live in brooklyn, new york. i'm originally from{' '}
        <a href="https://www.youtube.com/watch?v=FNFDKm8F4hg">Detroit</a>. i
        work as a software engineer at <a href="https://frame.io">Frame.io</a>,
        an <a href="https://www.adobe.com/">Adobe</a> company.
      </p>
      <p>
        i enjoy dive bars,{' '}
        <a href="https://www.instagram.com/p/CjaUo6sOX2O">live music</a>,
        hockey, writing, and history. the two most influential books i've ever
        read are{' '}
        <a href="https://www.marxists.org/archive/marx/works/1867-c1/index.htm">
          <i>Capital, Vol. 1</i>
        </a>{' '}
        and{' '}
        <a href="https://web.mit.edu/6.001/6.037/sicp.pdf">
          <i>Structure and Interpretation of Computer Programs</i>
        </a>
        .
      </p>
      <p>here are some of the things i've built for the web in my spare time</p>
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
          – an interface for collaboratively mapping the feline guardians of new
          york's most beloved &amp; bathroomless institution
        </li>
      </ProjectList>
      <p>
        you can find out more about me from{' '}
        <a href="https://www.github.com/ughitsaaron">my github</a> and{' '}
        <Link to="/resume">my resume</Link>.
      </p>
      <p>
        you can contact me thru electronic mail at{' '}
        <a href="mailto:xfilesfan69@aol.com">xfilesfan69 [at] aol [dot] com</a>
      </p>
      <StaticImage src="../images/valid.gif" alt="i'm valid" />
    </Layout>
  );
}
