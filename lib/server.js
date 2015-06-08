"use strict";

let fs = require("fs"),
    path = require("path"),
    md = require("meta-marked"),
    hljs = require("highlight.js"),
    Promise = require("bluebird"),
    server = {};

let readPostsDir, readPost, getPosts;

Promise.promisifyAll(fs);

/**
 * Post class
 * @param {Object} post
 */

class Post {
  constructor(post) {
    this._id    = post._id;
    this.title  = post.title;
    this.current  = post.current;
    this.tags   = post.tags;
    this.slug   = post.slug;
    this.date   = post.date;
    this.body   = post.body;
  }
}

/**
 * Returns a promise for data from a directory containing post data
 * @param {String} dir
 * @returns {Promise}
 **/

readPostsDir = dir => {
  return fs.readdirAsync(dir)
  .then(posts => {

    // filter out non markdown files
    posts = posts.filter(file => path.extname(file) === ".md");

    // directory should not be an empty array
    if(!posts.length) {
      console.warn("Posts directory is empty");
    } else {
      return posts;
    }
  });
};

/**
 * Returns a promise for a post
 * @param {Array} files
 * @param {Number} index
 * @returns {Promise}
 **/

readPost = (files, dir, index) => {
  var date = files[index].match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0],
      slug = path.basename(files[index], ".md");

  return fs.readFileAsync(dir + files[index], "utf-8")
  .then(data => {
    data = md(data, {
      highlight: code => {
        return hljs.highlightAuto(code).value;
      }
    });

    return new Post({
      _id: ++index,
      body: data.html,
      current: "/#/blog/" + slug,
      date: new Date(date),
      slug: slug,
      tags: data.meta.tags,
      title: data.meta.title
    });
  });
};

/**
 * Returns an array of promises for posts
 * @param {Array} dir
 * @returns {Promise}
 **/

getPosts = dir => {
  return readPostsDir(dir)
  .then(results => {
    var posts = [],
        post = {};

    for(let i = 0; i < results.length; i++) {
      post = readPost(results, dir, i);
      posts.push(post);
    }

    return Promise.all(posts)
    .then(posts => {
      posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      return posts;
    });
  });
};

server.Post = Post;
server.readPostsDir = readPostsDir;
server.readPost = readPost;
server.getPosts = getPosts;

module.exports = server;