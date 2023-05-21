import React from 'react';
import type { ReactNode } from 'react';
import SEO from './components/seo';
import { Link } from 'gatsby';

type Props = {
  path: string;
  children: ReactNode;
};

const Layout = ({ children, path }: Props) => {
  return (
    <>
      <SEO />
      <main>{children}</main>
      <footer>
        {['/blog/', '/resume/'].includes(path) && <Link to="/">back home</Link>}
        {/blog\/+./.test(path) && <Link to="/blog">back to blog</Link>}
      </footer>
    </>
  );
};

export default Layout;
