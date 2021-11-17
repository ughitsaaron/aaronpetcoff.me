import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Footer from '../components/footer';
import { StaticImage } from 'gatsby-plugin-image';

export default function Resume() {
  return (
    <Layout>
      <StaticImage src="../images/me.jpg" width={450} alt="it's me with a handsome romanesco" />
      <div>
        <h2>work</h2>
        <ul>
          <li>
            <h3>senior software engineer, adobe</h3>
            <div>november 2021 – current</div>
          </li>
          <li>
            <h3>senior software engineer, frame.io</h3>
            <div>november 2018 – november 2021</div>
          </li>
          <li>
            <h3>
              software engineer, <i>the new yorker</i>
            </h3>
            <div>september 2016 – november 2018</div>
          </li>
          <li>
            <h3>
              front-end developer, <i>new york</i> magazine
            </h3>
            <div>march 2015 &mdash; august 2016</div>
          </li>
          <li>
            <h3>web developer, new york institute of technology</h3>
            <div>august 2014 &mdash; march 2015</div>
          </li>
          <li>
            <h3>web developer, high level marketing</h3>
            <div>august 2013 &mdash; august 2014</div>
          </li>
        </ul>
        <h2>languages &amp; technologies</h2>
        <p>
          JavaScript, TypeScript, Node, React, Ember, Mocha, Python, GraphQL,
          MongoDB, Postgres, MySQL
        </p>
        <h2>interests</h2>
        <p>
          history, art, poetry, science fiction, socialism, functional
          programming, spanish, live music, mezcal, exercise, cooking
        </p>
        <h2>talks</h2>
        <ul>
          <li>
            <a href="http://ughitsaaron.github.io/slides-manhattanjs-dec-2015/#/">
              "getting started with es6 modules"
            </a>
            . december 2015. manhattan js.
          </li>
        </ul>

        <h2>education</h2>
        <ul>
          <li>
            <h3>wayne state university</h3>
            <div>bachelor of arts, history, 2010</div>
          </li>
        </ul>
      </div>
      <Footer />
    </Layout>
  );
}
