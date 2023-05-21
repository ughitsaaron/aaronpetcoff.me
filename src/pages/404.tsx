import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export default function FourOhFourPage() {
  return (
    <>
      <StaticImage
        src="../images/snowman.jpg"
        width={340}
        alt="it is my son don't you love him?"
      />
      <h1>wuh whoa</h1>
    </>
  );
}
