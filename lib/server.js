"use strict";

var fs = require("fs"),
    path = require("path"),
    md = require("meta-marked"),
    hljs = require("highlight.js"),
    Promise = require("bluebird");

Promise.promisifyAll(fs);

var server = {};

/**
 * Constructor for post object
 * @param {Object} post
 */

server.Post = function(post) {
  this._id = post._id;
  this.title = post.title;
  this.tags = post.tags;
  this.slug = post.slug;
  this.date = post.date;
  this.body = post.body;
};

/**
 * Returns a promise for data from a directory containing post data
 * @param {String} dir
 * @returns {Promise}
 **/

server.readPostsDir = function(dir) {
  return fs.readdirAsync(dir)
  .then(function(posts) {

    // filter out non markdown files
    posts = posts.filter(function(file) {
      return path.extname(file) === ".md";
    });

    // directory should not be an empty array
    if(!posts.length)
      console.warn("Posts directory is empty");
    else
      return posts;
  });
};

/**
 * Returns a promise for a post
 * @param {Array} files
 * @param {Number} index
 * @returns {Promise}
 **/

server.readPost = function(files, dir, index) {
  var post = {},
      date = files[index].match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0],
      slug = path.basename(files[index], ".md");

  return fs.readFileAsync(dir + files[index], "utf-8")
  .then(function(data) {
    data = md(data, {
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });

    return new server.Post({
      _id: ++index,
      title: data.meta.title,
      tags: data.meta.tags,
      slug: slug,
      date: new Date(date),
      body: data.html
    });
  });
};

/**
 * Returns an array of posts
 * @param {Array} dir
 * @returns {Array}
 **/

server.getPosts = function(dir) {
  return server.readPostsDir(dir)
  .then(function(results) {
    var posts = [], post = {};

    for(var i = 0; i < results.length; i++) {
      post = server.readPost(results, dir, i);
      posts.push(post);
    }

    return Promise.all(posts);
  });
};

module.exports = server;