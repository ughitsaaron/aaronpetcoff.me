/* jshint node: true */
import express from 'express';
import _ from 'lodash';
import server from './lib/server';

let api = express.Router();

function getAllPosts() {
  return server.getAllPosts(`${__dirname}/posts/`);
}

function getPostFromSlug(slug) {
  return server.getDirectory(`${__dirname}/posts/`)
    .then(posts => _.sortBy(posts, post => post))
    .then(posts => [server.getId(posts, slug), posts])
    .then(results => server.getPost(slug, results[0], results[1]));
}

function getPostsFromTag(tag) {
  return server.getAllPosts(`${__dirname}/posts/`)
    .filter(post => _.includes(post.attributes.tags, tag));
}

function getPostFromId(id) {
  // get list of posts from the posts directory
  // get the id (index) of the post with matching slug
  // read that post and render it to json
  return server.getDirectory(`${__dirname}/posts/`)
    .then(posts => _.sortBy(posts, post => post))
    .then(posts => [server.getSlug(posts, id), posts])
    .then(results => server.getPost(results[0], id, results[1]));
}

function renderPost(post) {
  return {
    data: post,
    meta: {}
  };
}

function renderPosts(posts) {
  return {
    data: posts,
    meta: {
      total: posts.length
    }
  };
}

function handleError(e) {
  let status = e.errno === -2 ? 400 : null;

  return {
    errors: [{
      id: 0,
      status: status,
      code: e.code
    }]
  }
}

api.get('/posts', (req, res) => {
  let query = req.query,
    hasSlug = _.has(query, 'slug'),
    hasTag = _.has(query, 'tag');

  switch (true) {
    case hasSlug:
      getPostFromSlug(req.query.slug)
        .then(post => res.json(renderPost(post)))
        .catch(e => res.json(handleError(e)));

      return;

    case hasTag:
      getPostsFromTag(req.query.tag)
        .then(posts => res.json(renderPosts(posts)))

      return;

    default:
      getAllPosts()
        .then(posts => res.json(renderPosts(posts)))
  }
});

api.get('/posts/:id', (req, res) => {
  getPostFromId(req.params.id)
    .then(post => res.json({ data: post, meta: {} }))
    .catch(e => res.json({
      errors: [{
        id: 0,
        status: e.status
      }]
    }));
});

export default api;
