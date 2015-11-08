import express from 'express';
import _ from 'lodash';
import server from './lib/server';

let api = express.Router();

function getAllPosts() {
  return server.getAllPosts(`${__dirname}/posts/`)
}

function getPostFromSlug(slug) {
  return server.getDirectory(`${__dirname}/posts/`)
    .then(posts => _.sortBy(posts, post => post))
    .then(posts => [server.getId(posts, slug), posts])
    .then(results => server.getPost(slug, results[0], results[1]))
}

function getPostsFromTag(tag) {
  return server.getAllPosts(`${__dirname}/posts/`)
    .filter(post => _.includes(post.attributes.tags, tag))
}

function getPostFromId(id) {
  // get list of posts from the posts directory
  // get the id (index) of the post with matching slug
  // read that post and render it to json
  return server.getDirectory(`${__dirname}/posts/`)
    .then(posts => _.sortBy(posts, post => post))
    .then(posts => [server.getSlug(posts, id), posts])
    .then(results => server.getPost(results[0], id, results[1]))
}

function renderPost(post) {
  return {
    data: post,
    meta: {}
  }
}

function renderPosts(posts) {
  return {
    data: posts,
    meta: {
      total: posts.length
    }
  }
}

api.get('/posts', (req, res) => {
  let query = req.query,
    hasQuery = !!Object.keys(query).length,
    hasSlug = _.has(query, 'slug'),
    hasTag = _.has(query, 'tag');

  switch (true) {
    case hasSlug:
      getPostFromSlug(req.query.slug)
        .then(post => res.json(renderPost(post)))
        .catch(() => res.json({}))
      return;

    case hasTag:
      getPostsFromTag(req.query.tag)
        .then(posts => res.json(renderPosts(posts)))
        .catch(() => res.json({}))
      return;

    default:
      getAllPosts()
        .then(posts => res.json(renderPosts(posts)));
  }
});

api.get('/posts/:id', (req, res) => {
  getPostFromId(req.params.id)
    .then(post => res.json({ data: post, meta: {} }));
});

// router.get('/feed', (req, res) => {
//   let year = new Date();
//   let feed = new Feed({
//     title: 'Aaron Petcoff',
//     description: 'Aaron Petcoff is a web developer based out of Brooklyn.',
//     link: 'http://aaronpetcoff.me',
//     image: 'http://aaronpetcoff.me/img/about.jpg',
//     copyright: 'Copyright (c) ' + year.getFullYear() + ' Aaron Petcoff',
//     author: {
//       name: 'Aaron Petcoff',
//       email: 'hello@aaronpetcoff.me',
//       link: 'http://aaronpetcoff.me'
//     }
//   });

//   return server.getAllPosts(__dirname + '/posts/')
//   .then(posts => {
//     posts = posts.filter((value, index) => ++index <= 10);
//     posts.forEach(function(post) {
//       feed.addItem({
//         title: post.title,
//         link: 'http://aaronpetcoff.me/blog/' + post.slug,
//         date: post.date,
//         description: post.body,
//         content: post.body
//       });
//     });

//     res.set('Content-Type', 'text/xml');
//     res.send(feed.render('rss-2.0'));
//   });
// });

export default api;
