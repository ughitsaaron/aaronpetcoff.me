import express from 'express';
import _ from 'lodash';
import server from './lib/server';
import rss from 'rss';

let router = express.Router(),
  now = new Date();

let feedDetails = {
  title: 'Aaron Petcoff',
  description: 'Aaron Petcoff is a web developer based in Brooklyn, New York',
  link: 'http://aaronpetcoff.me',
  image: 'http://gravatar.com/avatar/e3ae39ab25e0e7d0308cc1a7ebb879ab?size=650',
  copyright: `Copyright (c) ${now.getFullYear()} Aaron Petcoff`,
  author: {
    name: 'Aaron Petcoff',
    email: 'hello@aaronpetcoff.me',
    link: 'http://aaronpetcoff.me'
  }
};

function formatFeedItem(post) {
  return {
    title: post.attributes.title,
    url: `http://aaronpetcoff.me/blog/${post.slug}`,
    categories: post.attributes.tags,
    date: post.attributes.created,
    description: post.attributes.body
  }
}

router.get('/', (req, res) => {
  let feed = new rss(feedDetails);

  server.getAllPosts(`${__dirname}/posts/`)
    .then(posts => {
      posts.forEach(post => feed.item(formatFeedItem(post)));

      res.set('Content-Type', 'text/xml')
      res.send(feed.xml());
    })
});

export default router;
