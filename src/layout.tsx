import React from 'react';
import type { ReactNode } from 'react';
import SEO from './components/seo';
import { Link } from 'gatsby';

type Props = {
  path: string;
  children: ReactNode;
};

const Layout = ({ children, path }: Props) => {
  console.log({ path });
  return (
    <>
      <SEO />
      <main>{children}</main>
      {path !== '/' && (
        <div>
          <hr />
          <p>
            <Link to="/">back home</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Layout;
