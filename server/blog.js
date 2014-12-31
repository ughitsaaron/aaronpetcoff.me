"use strict";

var hbs = require("handlebars"),
    fs = require("fs"),
    hljs = require("highlight.js");

module.exports = function(posts, opts) {

  var index, blog, data, archive, showArchive;

  hbs.registerHelper("title", function() {
    var title = opts.title;

    return title;
  });

  archive = posts;

  posts = posts.filter(function(el, i) {
    return i < opts.maxPostsHome;
  });

  showArchive = posts.length > opts.maxPostsHome ? true : false;

  data = {
    posts : posts,
    showArchive : showArchive
  };

  // build index page
  index = hbs.compile(fs.readFileSync("./templates/default.html", {encoding:"utf-8"}));

  // build blog page
  blog = hbs.compile(fs.readFileSync("./templates/blog.html",{encoding:"utf-8"}));

  hbs.registerPartial("content", blog(data));

  fs.writeFile("./public/index.html", index(blog(data)), function(err) {
    if(err) throw err;

    if(opts.verbose) {
      var colors = require("colors");
      console.log((opts.dirs.public).green + "index.html".green + " written!".green);
    }
  });

  hbs.unregisterPartial("content");
  hbs.unregisterHelper("title");

  // build archive page

  hbs.registerHelper("title", function() {
    var title = "Archive | " + opts.title;

    return title;
  });

  data = {
    posts : archive
  };

  index = hbs.compile(fs.readFileSync("./templates/default.html", {encoding:"utf-8"}));

  // build blog page
  blog = hbs.compile(fs.readFileSync("./templates/blog.html",{encoding:"utf-8"}));

  hbs.registerPartial("content", blog(data));

  fs.writeFile("./public/archive.html", index(blog(data)), function(err) {
    if(err) throw err;

    if(opts.verbose) {
      var colors = require("colors");
      console.log((opts.dirs.public).green + "archive.html".green + " written!".green);
    }
  });

  hbs.unregisterPartial("content");
  hbs.unregisterHelper("title");
};