'use strict';

import fs from 'fs';
import path from 'path';
import md from 'meta-marked';
import hljs from 'highlight.js';
import Promise from 'bluebird';
// import request from 'request';
import _ from 'lodash';

let server = {},
  basename = path.basename,
  ext = '.md';

Promise.promisifyAll(fs);
// Promise.promisifyAll(request);

/**
 * Creates a new post
 * @class
 */
class Post {

  /**
   * @constructs Post
   * @param {Object} post - post properties
   */
  constructor(post) {
    // post class properties should cohere to the
    // JSON api spec

    this.type = 'post';
    this.id = parseInt(post.id);

    this.attributes = {
      title: post.title,
      tags: post.tags,
      created: post.date,
      body: post.body,
      slugs: {
        first: post.first,
        last: post.last,
        next: post.next,
        prev: post.prev,
        self: post.current
      }
    };
    // this.attributes.shares = {
    //   facebook: post.facebook,
    //   twitter: post.twitter
    // };
  }
}

/**
 * Read a directory of files from `dir`
 * @param {String} dir
 * @returns {Promise}
 */
function getDirectory(dir) {
  return fs.readdirAsync(dir)
    .then(files => files);
}

/**
 * Gets index of a matching post in array of posts
 * to use as post id
 * @param {Array} posts - an array of slugs
 * @param {String} slug - the article slug to look for
 * @returns {Number} - the index of `slug` in `posts`
 */
function getId(posts, slug) {
  return _.findIndex(posts, post => {
    return basename(post, ext) === slug;
  });
}

/**
 * Get slug
 */
function getSlug(posts, id) {
  return basename(posts[id], ext);
}

/**
 * returns previous post
 */
function getPrevious(posts, slug) {
  let index = getId(posts, slug),
    previous = posts[index - 1];

  if (previous) {
    return basename(previous, ext);
  }
}

/**
 * returns next post
 */
function getNext(posts, slug) {
  let index = getId(posts, slug),
    next = posts[index + 1];

  if (next) {
    return basename(next, ext);
  }
}

/**
 * parse markdown
 */
function parseMarkdown(data) {
  return md(data, {
    highlight: code => hljs.highlightAuto(code).value
  });
}

/**
 * Returns a promise for a post
 * @param {Array} files
 * @param {Number} index
 * @returns {Promise}
 */
function getPost(slug, id, posts) {
  if (slug) {
    // regex matches yyy-mm-dd date format
    let date = _.first(slug.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)),
      post = `${__dirname}/../posts/${slug}.md`;

    return fs.readFileAsync(post, 'utf-8')
      .then(data => {
        let previous = getPrevious(posts, slug),
          next = getNext(posts, slug),
          last = basename(_.last(posts), ext),
          first = basename(_.first(posts), ext),
          postObj = {};

        data = parseMarkdown (data);

        postObj = {
          id: id,
          body: data.html,
          current: `${slug}`,
          date: new Date(date),
          slug: slug,
          tags: data.meta.tags,
          title: data.meta.title,
          first: `${first}`,
          last: `${last}`
        };

        if (previous) {
          postObj.prev = `${previous}`;
        }

        if (next) {
          postObj.next = `${next}`;
        }

        return new Post(postObj);
      })
      .catch(e => {
        throw e;
      });
  }
}

/**
 * Returns an array of promises for posts
 * @param {Array} dir
 * @returns {Promise}
 */
function getAllPosts(dir) {
  return getDirectory(dir)
    .then(posts => _.sortBy(posts, post => post))
    .then(posts => Promise.map(posts, (slug, index) => {
      return getPost(basename(slug, ext), index, posts);
    }));
}

// /**
//  * Returns promise for object of share data
//  * @param {String} site
//  * @param {String} url
//  * @returns {Promise}
//  */
// function getShares(site, url) {
//   let call = site === 'facebook'
//     ? `http://graph.facebook.com/?id=${url}`
//     : site === 'twitter'
//     ? `http://urls.api.twitter.com/1/urls/count.json?url=${url}`
//     : '';

//   return request.getAsync(call);
// }

server.Post = Post;
server.getDirectory = getDirectory;
server.getPost = getPost;
server.getId = getId;
server.getAllPosts = getAllPosts;
server.getPrevious = getPrevious;
server.getNext = getNext;
server.getSlug = getSlug;
// server.getShares = getShares;

export default server;
