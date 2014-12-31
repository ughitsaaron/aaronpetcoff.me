"use strict";

var fs = require("fs"),
    path = require("path"),
    md = require("meta-marked"),
    hljs = require("highlight.js"),
    moment = require("moment"),
    blog = require("./blog.js"),
    singles = require("./singles.js"),
    pages = require("./pages.js");

module.exports = function(opts) {

  var files, posts, dir;

  posts = []; // init empty posts array
  dir = opts.dirs.posts; // declare posts directory

  // create array of markdown files in posts directory
  files = fs.readdirSync(dir).filter(function(file) {
    return path.extname(file) === ".md";
  });

  // convert each md file to json
  files.forEach(function(file) {
    var address, date;

    // store file name to act as address later when writing
    address = path.basename(file,".md");

    file = fs.readFileSync(dir + file, {encoding:"utf-8"});
    
    // use meta-marked to parse md & yaml front-matter
    file = md(file, {
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });

    file.meta.rawDate = file.meta.date;
    file.meta.address = address;
    file.meta.date = opts.date.relative ? moment(file.meta.date).fromNow() : moment(file.meta.date).format(opts.date.format);

    // push each file to posts array
    posts.push(file);
  });

  posts = posts.sort(function(a, b) {
    if(opts.sort.date) {
      if(a.meta.rawDate < b.meta.rawDate) return opts.sort.descending ? 1 : -1;
      if(a.meta.rawDate > b.meta.rawDate) return opts.sort.descending ? -1 : 1;
      return 0;
    } 

    if(opts.sort.title) {
      if(a.meta.title < b.meta.title) return opts.sort.descending ? -1 : 1;
      if(a.meta.title > b.meta.title) return opts.sort.descending ? 1 : -1;
      return 0;
    }
  });

  // clear public/posts to rebuild it from scratch
  var rms = fs.readdirSync(opts.dirs.public + "posts/");
  if(rms.length >= 1) {
    rms.forEach(function(rm) {
      fs.unlink(opts.dirs.public + "posts/" + rm);
    });
  }

  // pass posts and options to singles
  singles(posts, opts);

  // render posts page
  blog(posts, opts);

  // render pages
  pages(opts);
};